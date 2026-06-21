const BaseRepository = require('./BaseRepository');

class DepartmentRepository extends BaseRepository {
  constructor() {
    super('department');
  }

  async findByCode(code) {
    return this.prisma.department.findUnique({ where: { code } });
  }

  async findActive() {
    return this.prisma.department.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}

module.exports = new DepartmentRepository();
