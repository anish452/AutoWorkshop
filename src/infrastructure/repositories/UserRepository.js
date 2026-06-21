const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor() {
    super('user');
  }

  async findByEmail(email) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { role: true, department: true, customer: true },
    });
  }

  async findByIdWithRelations(id) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true, department: true, customer: true },
    });
  }

  async findAllWithRelations(where = {}) {
    return this.prisma.user.findMany({
      where,
      include: { role: true, department: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

module.exports = new UserRepository();
