const prisma = require('../../infrastructure/database/prisma');
const {
  JobRepository,
  VehicleRepository,
  DepartmentRepository,
  AIAnalysisLogRepository,
  UserRepository,
} = require('../../infrastructure/repositories');
const { NotFoundError, ForbiddenError, ValidationError } = require('../../shared/errors/AppError');
const { JOB_STATUS, ALL_JOBS_ROLES, PAUSE_REASONS } = require('../../domain/enums');
const { isDepartmentStaff } = require('../../shared/utils/departmentUser');
const { generateJobNumber, calculateTimeTakenMinutes } = require('../../shared/utils');
const DeepSeekAIService = require('./DeepSeekAIService');
const AuditService = require('./AuditService');

class JobService {
  isJobStarted(job) {
    return (
      job.status === JOB_STATUS.IN_PROGRESS
      || job.status === JOB_STATUS.PAUSED
      || job.status === JOB_STATUS.COMPLETED
      || job.startedAt != null
    );
  }

  assertAssignedTechnician(job, userId) {
    if (job.assignedUserId !== userId) {
      throw new ForbiddenError('Only the assigned technician can perform this action');
    }
  }

  validatePauseReason(reason) {
    if (!reason || !Object.values(PAUSE_REASONS).includes(reason)) {
      throw new ValidationError('Invalid pause reason');
    }
  }

  async analyzeAndCreateJobs({ vehicleRegistrationNo, description, customerId }, userId, ipAddress) {
    const vehicle = await VehicleRepository.findByRegistration(vehicleRegistrationNo);
    if (!vehicle) {
      throw new NotFoundError(`Vehicle with registration ${vehicleRegistrationNo} not found`);
    }

    const aiResult = await DeepSeekAIService.analyzeComplaint(description);

    const analysisLog = await AIAnalysisLogRepository.create({
      complaintDescription: description,
      vehicleRegistrationNo,
      rawResponse: aiResult.rawResponse,
      issues: aiResult.issues,
      createdBy: userId,
    });

    const createdJobs = [];

    for (const issue of aiResult.issues) {
      const department = await DepartmentRepository.findByCode(issue.department);
      if (!department) {
        throw new ValidationError(`Department ${issue.department} not found`);
      }

      const jobNumber = await generateJobNumber(prisma);

      const job = await JobRepository.create({
        jobNumber,
        vehicleId: vehicle.id,
        complaintDescription: description,
        issueDescription: issue.issue,
        departmentId: department.id,
        status: JOB_STATUS.PENDING,
        confidence: issue.confidence,
        aiExplanation: issue.explanation,
        aiAnalysisLogId: analysisLog.id,
        createdBy: userId,
      });

      await this.autoAssignJob(job, department.id, userId, ipAddress);

      const fullJob = await JobRepository.findByIdWithRelations(job.id);
      createdJobs.push(fullJob);

      await AuditService.log({
        action: 'JOB_CREATED',
        entityType: 'Job',
        entityId: job.id,
        userId,
        details: {
          jobNumber,
          issue: issue.issue,
          department: department.name,
          confidence: issue.confidence,
        },
        ipAddress,
        createdBy: userId,
      });
    }

    return {
      analysisLog: {
        id: analysisLog.id,
        reasoning: aiResult.reasoning,
        issues: aiResult.issues,
      },
      jobs: createdJobs,
    };
  }

  async autoAssignJob(job, departmentId, assignedBy, ipAddress) {
    const departmentUsers = await UserRepository.findMany({
      departmentId,
      isActive: true,
    });

    if (departmentUsers.length === 0) return job;

    const assignee = departmentUsers[0];

    await JobRepository.update(job.id, {
      assignedUserId: assignee.id,
      status: JOB_STATUS.ASSIGNED,
      updatedBy: assignedBy,
    });

    await prisma.jobAssignment.create({
      data: {
        jobId: job.id,
        userId: assignee.id,
        assignedBy,
        createdBy: assignedBy,
      },
    });

    await AuditService.log({
      action: 'JOB_ASSIGNED',
      entityType: 'Job',
      entityId: job.id,
      userId: assignedBy,
      details: { assignedTo: assignee.id, assignedToEmail: assignee.email },
      ipAddress,
      createdBy: assignedBy,
    });
  }

  async getJobs(filter = {}) {
    return JobRepository.findManyWithRelations(filter);
  }

  async getJobById(id) {
    const job = await JobRepository.findByIdWithRelations(id);
    if (!job) throw new NotFoundError('Job not found');
    return job;
  }

  async startJob(job, userId, ipAddress) {
    if (job.status === JOB_STATUS.COMPLETED || job.status === JOB_STATUS.CANCELLED) {
      throw new ValidationError(`Cannot start job in ${job.status} status`);
    }

    if (job.status === JOB_STATUS.IN_PROGRESS) {
      throw new ValidationError('Job is already in progress');
    }

    if (job.status === JOB_STATUS.PAUSED) {
      throw new ValidationError('Job is paused — use resume instead');
    }

    this.assertAssignedTechnician(job, userId);

    const updated = await JobRepository.update(job.id, {
      status: JOB_STATUS.IN_PROGRESS,
      startedAt: job.startedAt || new Date(),
      pauseReason: null,
      pausedAt: null,
      updatedBy: userId,
    });

    await AuditService.log({
      action: 'JOB_STARTED',
      entityType: 'Job',
      entityId: job.id,
      userId,
      details: { jobNumber: job.jobNumber },
      ipAddress,
      createdBy: userId,
    });

    return JobRepository.findByIdWithRelations(updated.id);
  }

  async pauseJob(job, reason, userId, ipAddress) {
    if (job.status !== JOB_STATUS.IN_PROGRESS) {
      throw new ValidationError('Only in-progress jobs can be paused');
    }

    this.assertAssignedTechnician(job, userId);
    this.validatePauseReason(reason);

    const pausedAt = new Date();

    await prisma.jobPause.create({
      data: {
        jobId: job.id,
        userId,
        reason,
        pausedAt,
        createdBy: userId,
      },
    });

    const updated = await JobRepository.update(job.id, {
      status: JOB_STATUS.PAUSED,
      pauseReason: reason,
      pausedAt,
      updatedBy: userId,
    });

    await AuditService.log({
      action: 'JOB_PAUSED',
      entityType: 'Job',
      entityId: job.id,
      userId,
      details: { jobNumber: job.jobNumber, reason },
      ipAddress,
      createdBy: userId,
    });

    return JobRepository.findByIdWithRelations(updated.id);
  }

  async resumeJob(job, userId, ipAddress) {
    if (job.status !== JOB_STATUS.PAUSED) {
      throw new ValidationError('Only paused jobs can be resumed');
    }

    this.assertAssignedTechnician(job, userId);

    const resumedAt = new Date();
    const activePause = await prisma.jobPause.findFirst({
      where: { jobId: job.id, resumedAt: null },
      orderBy: { pausedAt: 'desc' },
    });

    let pauseDuration = 0;
    if (activePause) {
      pauseDuration = Math.round((resumedAt - new Date(activePause.pausedAt)) / 60000);
      await prisma.jobPause.update({
        where: { id: activePause.id },
        data: {
          resumedAt,
          durationMinutes: pauseDuration,
          updatedBy: userId,
        },
      });
    } else if (job.pausedAt) {
      pauseDuration = Math.round((resumedAt - new Date(job.pausedAt)) / 60000);
    }

    const totalPausedMinutes = (job.totalPausedMinutes || 0) + pauseDuration;

    const updated = await JobRepository.update(job.id, {
      status: JOB_STATUS.IN_PROGRESS,
      pauseReason: null,
      pausedAt: null,
      totalPausedMinutes,
      updatedBy: userId,
    });

    await AuditService.log({
      action: 'JOB_RESUMED',
      entityType: 'Job',
      entityId: job.id,
      userId,
      details: { jobNumber: job.jobNumber, pauseDurationMinutes: pauseDuration },
      ipAddress,
      createdBy: userId,
    });

    return JobRepository.findByIdWithRelations(updated.id);
  }

  async completeJob(job, comments, userId, ipAddress) {
    if (![JOB_STATUS.IN_PROGRESS, JOB_STATUS.ASSIGNED, JOB_STATUS.PAUSED].includes(job.status)) {
      throw new ValidationError('Job must be in progress, paused, or assigned to complete');
    }

    this.assertAssignedTechnician(job, userId);

    const completedAt = new Date();
    let totalPausedMinutes = job.totalPausedMinutes || 0;

    if (job.status === JOB_STATUS.PAUSED && job.pausedAt) {
      const extraPause = Math.round((completedAt - new Date(job.pausedAt)) / 60000);
      totalPausedMinutes += extraPause;

      const activePause = await prisma.jobPause.findFirst({
        where: { jobId: job.id, resumedAt: null },
        orderBy: { pausedAt: 'desc' },
      });

      if (activePause) {
        await prisma.jobPause.update({
          where: { id: activePause.id },
          data: {
            resumedAt: completedAt,
            durationMinutes: extraPause,
            updatedBy: userId,
          },
        });
      }
    }

    const startedAt = job.startedAt || completedAt;
    const timeTakenMinutes = calculateTimeTakenMinutes(startedAt, completedAt, totalPausedMinutes);

    await JobRepository.update(job.id, {
      status: JOB_STATUS.COMPLETED,
      completedAt,
      startedAt: job.startedAt || startedAt,
      timeTakenMinutes,
      totalPausedMinutes,
      completedByUserId: userId,
      pauseReason: null,
      pausedAt: null,
      updatedBy: userId,
    });

    await prisma.jobComment.create({
      data: {
        jobId: job.id,
        userId,
        comment: comments,
        createdBy: userId,
      },
    });

    await AuditService.log({
      action: 'JOB_COMPLETED',
      entityType: 'Job',
      entityId: job.id,
      userId,
      details: { jobNumber: job.jobNumber, comments, timeTakenMinutes, totalPausedMinutes },
      ipAddress,
      createdBy: userId,
    });

    return JobRepository.findByIdWithRelations(job.id);
  }

  async updateJob(job, data, user, ipAddress) {
    const role = user.role.name;
    const started = this.isJobStarted(job);

    if (ALL_JOBS_ROLES.includes(role)) {
      if (started) {
        throw new ForbiddenError('Cannot update job after it has started');
      }

      const updateData = { updatedBy: user.id };
      if (data.issueDescription !== undefined) updateData.issueDescription = data.issueDescription;
      if (data.complaintDescription !== undefined) updateData.complaintDescription = data.complaintDescription;

      if (data.departmentId !== undefined && data.departmentId !== job.departmentId) {
        const department = await DepartmentRepository.findById(data.departmentId);
        if (!department) throw new NotFoundError('Department not found');
        updateData.departmentId = department.id;
      }

      await JobRepository.update(job.id, updateData);

      if (data.departmentId !== undefined && data.departmentId !== job.departmentId) {
        const updatedJob = await JobRepository.findByIdWithRelations(job.id);
        await this.autoAssignJob(updatedJob, data.departmentId, user.id, ipAddress);
      }

      return JobRepository.findByIdWithRelations(job.id);
    }

    if (!isDepartmentStaff(user)) {
      throw new ForbiddenError('Insufficient permissions to update this job');
    }

    if (!started) {
      throw new ForbiddenError('Only job advisors can update jobs before they are started');
    }

    if (job.assignedUserId !== user.id) {
      throw new ForbiddenError('Only the assigned user can update this job');
    }

    if (job.status === JOB_STATUS.COMPLETED || job.status === JOB_STATUS.CANCELLED) {
      throw new ValidationError(`Cannot update job in ${job.status} status`);
    }

    const updateData = { updatedBy: user.id };
    if (data.issueDescription !== undefined) updateData.issueDescription = data.issueDescription;

    await JobRepository.update(job.id, updateData);
    return JobRepository.findByIdWithRelations(job.id);
  }

  async deleteJob(job, user, ipAddress) {
    const role = user.role.name;

    if (!ALL_JOBS_ROLES.includes(role)) {
      throw new ForbiddenError('Only admins and job advisors can delete jobs');
    }

    if (this.isJobStarted(job)) {
      throw new ForbiddenError('Cannot delete job after it has started');
    }

    await JobRepository.delete(job.id);
  }
}

module.exports = new JobService();
