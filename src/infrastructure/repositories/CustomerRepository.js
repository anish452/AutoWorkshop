const BaseRepository = require('./BaseRepository');

class CustomerRepository extends BaseRepository {
  constructor() {
    super('customer');
  }

  async findByIdWithVehicles(id) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: { vehicles: true },
    });
  }

  async findAllWithVehicles() {
    return this.prisma.customer.findMany({
      include: { vehicles: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

module.exports = new CustomerRepository();
