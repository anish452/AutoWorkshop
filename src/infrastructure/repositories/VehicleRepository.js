const BaseRepository = require('./BaseRepository');

class VehicleRepository extends BaseRepository {
  constructor() {
    super('vehicle');
  }

  async findByRegistration(registrationNumber) {
    return this.prisma.vehicle.findUnique({
      where: { registrationNumber },
      include: { customer: true },
    });
  }

  async findByIdWithRelations(id) {
    return this.prisma.vehicle.findUnique({
      where: { id },
      include: { customer: true, jobs: { include: { department: true } } },
    });
  }

  async findAllWithRelations() {
    return this.prisma.vehicle.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

module.exports = new VehicleRepository();
