const {
  JobRepository,
  UserRepository,
  CustomerRepository,
  VehicleRepository,
} = require('../../infrastructure/repositories');
const { getUserDepartmentCode } = require('../../shared/utils/departmentUser');

class DashboardService {
  async getAdminDashboard() {
    const [
      totalJobs,
      statusCounts,
      jobsByDepartment,
      avgCompletionTime,
      totalCustomers,
      totalVehicles,
      totalUsers,
    ] = await Promise.all([
      JobRepository.count(),
      JobRepository.countByStatus(),
      JobRepository.countByDepartment(),
      JobRepository.getAverageCompletionTime(),
      CustomerRepository.count(),
      VehicleRepository.count(),
      UserRepository.count(),
    ]);

    return {
      totalJobs,
      pendingJobs: statusCounts.PENDING,
      inProgressJobs: statusCounts.IN_PROGRESS,
      completedJobs: statusCounts.COMPLETED,
      cancelledJobs: statusCounts.CANCELLED,
      assignedJobs: statusCounts.ASSIGNED,
      jobsByDepartment,
      averageCompletionTimeMinutes: Math.round(avgCompletionTime),
      totalCustomers,
      totalVehicles,
      totalUsers,
    };
  }

  async getJobAdvisorDashboard() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayJobs, openJobs, completedJobs, departmentWorkload, recentJobs] = await Promise.all([
      JobRepository.count({ createdAt: { gte: today } }),
      JobRepository.count({ status: { in: ['PENDING', 'ASSIGNED', 'IN_PROGRESS'] } }),
      JobRepository.count({ status: 'COMPLETED' }),
      JobRepository.countByDepartment(),
      JobRepository.findManyWithRelations({}),
    ]);

    return {
      todayJobs,
      openJobs,
      completedJobs,
      departmentWorkload,
      recentJobs: recentJobs.slice(0, 10),
    };
  }

  async getDepartmentDashboard(user) {
    const departmentCode = getUserDepartmentCode(user);
    if (!departmentCode) {
      return {
        myPendingJobs: 0,
        myInProgressJobs: 0,
        myCompletedJobs: 0,
        averageCompletionTimeMinutes: 0,
        assignedJobs: [],
      };
    }

    const filter = { department: { code: departmentCode } };

    const [pending, inProgress, completed, avgTime, assignedJobs] = await Promise.all([
      JobRepository.count({ ...filter, status: { in: ['PENDING', 'ASSIGNED'] } }),
      JobRepository.count({ ...filter, status: 'IN_PROGRESS' }),
      JobRepository.count({ ...filter, status: 'COMPLETED' }),
      JobRepository.getAverageCompletionTime(filter),
      JobRepository.findManyWithRelations({
        department: { code: departmentCode },
        status: { in: ['PENDING', 'ASSIGNED', 'IN_PROGRESS'] },
        OR: [
          { assignedUserId: user.id },
          { assignedUserId: null },
        ],
      }),
    ]);

    return {
      myPendingJobs: pending,
      myInProgressJobs: inProgress,
      myCompletedJobs: completed,
      averageCompletionTimeMinutes: Math.round(avgTime),
      assignedJobs,
    };
  }

  async getCustomerDashboard(user) {
    if (!user.customerId) {
      return { vehicles: [], jobs: [] };
    }

    const [vehicles, jobs] = await Promise.all([
      VehicleRepository.findMany({ customerId: user.customerId }),
      JobRepository.findManyWithRelations({
        vehicle: { customerId: user.customerId },
      }),
    ]);

    return {
      vehicles,
      jobs: jobs.map((job) => ({
        id: job.id,
        jobNumber: job.jobNumber,
        issueDescription: job.issueDescription,
        status: job.status,
        department: job.department.name,
        vehicle: {
          registrationNumber: job.vehicle.registrationNumber,
          make: job.vehicle.make,
          model: job.vehicle.model,
        },
        comments: job.comments,
        startedAt: job.startedAt,
        completedAt: job.completedAt,
        timeTakenMinutes: job.timeTakenMinutes,
      })),
    };
  }
}

module.exports = new DashboardService();
