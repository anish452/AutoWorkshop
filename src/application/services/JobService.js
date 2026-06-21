const prisma = require('../../infrastructure/database/prisma');
const {
  JobRepository,
  VehicleRepository,
  DepartmentRepository,
  AIAnalysisLogRepository,
  UserRepository,
} = require('../../infrastructure/repositories');
const { NotFoundError, ForbiddenError, ValidationError } = require('../../shared/errors/AppError');
const { JOB_STATUS, ALL_JOBS_ROLES } = require('../../domain/enums');
const { isDepartmentStaff } = require('../../shared/utils/departmentUser');
const { generateJobNumber, calculateTimeTakenMinutes } = require('../../shared/utils');
const DeepSeekAIService = require('./DeepSeekAIService');
const AuditService = require('./AuditService');

class JobService {
  isJobStarted(job) {
    return (
      job.status === JOB_STATUS.IN_PROGRESS
      || job.status === JOB_STATUS.COMPLETED
      || job.startedAt != null
    );
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

    const updated = await JobRepository.update(job.id, {
      status: JOB_STATUS.IN_PROGRESS,
      startedAt: new Date(),
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

  async completeJob(job, comments, userId, ipAddress) {
    if (job.status !== JOB_STATUS.IN_PROGRESS && job.status !== JOB_STATUS.ASSIGNED) {
      throw new ValidationError('Job must be in progress or assigned to complete');
    }

    const completedAt = new Date();
    const startedAt = job.startedAt || new Date();
    const timeTakenMinutes = calculateTimeTakenMinutes(startedAt, completedAt);

    await JobRepository.update(job.id, {
      status: JOB_STATUS.COMPLETED,
      completedAt,
      startedAt: job.startedAt || startedAt,
      timeTakenMinutes,
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
      details: { jobNumber: job.jobNumber, comments, timeTakenMinutes },
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
