const BaseRepository = require('./BaseRepository');

class JobRepository extends BaseRepository {
  constructor() {
    super('job');
  }

  getUserSelect() {
    return {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      isActive: true,
      roleId: true,
      departmentId: true,
      customerId: true,
      createdAt: true,
      updatedAt: true,
      createdBy: true,
      updatedBy: true,
      role: true,
    };
  }

  getJobIncludes() {
    return {
      vehicle: { include: { customer: true } },
      department: true,
      assignedUser: { select: this.getUserSelect() },
      comments: {
        include: { user: { select: this.getUserSelect() } },
        orderBy: { createdAt: 'desc' },
      },
      aiAnalysisLog: true,
    };
  }

  async findByIdWithRelations(id) {
    return this.prisma.job.findUnique({
      where: { id },
      include: this.getJobIncludes(),
    });
  }

  async findManyWithRelations(where = {}) {
    return this.prisma.job.findMany({
      where,
      include: this.getJobIncludes(),
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByDepartment(departmentId) {
    return this.findManyWithRelations({ departmentId });
  }

  async getAverageCompletionTime(where = {}) {
    const result = await this.prisma.job.aggregate({
      where: { ...where, status: 'COMPLETED', timeTakenMinutes: { not: null } },
      _avg: { timeTakenMinutes: true },
    });
    return result._avg.timeTakenMinutes || 0;
  }

  async countByStatus(where = {}) {
    const statuses = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    const counts = await Promise.all(
      statuses.map((status) =>
        this.prisma.job.count({ where: { ...where, status } })
      )
    );
    return statuses.reduce((acc, status, i) => {
      acc[status] = counts[i];
      return acc;
    }, {});
  }

  async countByDepartment() {
    const departments = await this.prisma.department.findMany();
    const counts = await Promise.all(
      departments.map((dept) =>
        this.prisma.job.count({ where: { departmentId: dept.id } })
      )
    );
    return departments.map((dept, i) => ({
      department: dept.name,
      code: dept.code,
      count: counts[i],
    }));
  }
}

module.exports = new JobRepository();
