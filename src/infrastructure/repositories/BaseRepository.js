const prisma = require('../database/prisma');

class BaseRepository {
  constructor(model) {
    this.model = model;
    this.prisma = prisma;
  }

  async findById(id, include = {}) {
    return this.prisma[this.model].findUnique({ where: { id }, include });
  }

  async findMany(where = {}, include = {}, orderBy = { createdAt: 'desc' }) {
    return this.prisma[this.model].findMany({ where, include, orderBy });
  }

  async create(data) {
    return this.prisma[this.model].create({ data });
  }

  async update(id, data) {
    return this.prisma[this.model].update({ where: { id }, data });
  }

  async delete(id) {
    return this.prisma[this.model].delete({ where: { id } });
  }

  async count(where = {}) {
    return this.prisma[this.model].count({ where });
  }
}

module.exports = BaseRepository;
