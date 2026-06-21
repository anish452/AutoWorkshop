const { VehicleRepository } = require('../../infrastructure/repositories');
const { NotFoundError, ConflictError } = require('../../shared/errors/AppError');
const AuditService = require('./AuditService');

class VehicleService {
  async create(data, createdBy, ipAddress) {
    const existing = await VehicleRepository.findByRegistration(data.registrationNumber);
    if (existing) throw new ConflictError('Registration number already exists');

    const vehicle = await VehicleRepository.create({
      ...data,
      createdBy,
    });

    await AuditService.log({
      action: 'VEHICLE_CREATED',
      entityType: 'Vehicle',
      entityId: vehicle.id,
      userId: createdBy,
      details: { registrationNumber: data.registrationNumber },
      ipAddress,
      createdBy,
    });

    return VehicleRepository.findByIdWithRelations(vehicle.id);
  }

  async getAll() {
    return VehicleRepository.findAllWithRelations();
  }

  async getById(id) {
    const vehicle = await VehicleRepository.findByIdWithRelations(id);
    if (!vehicle) throw new NotFoundError('Vehicle not found');
    return vehicle;
  }

  async update(id, data, updatedBy, ipAddress) {
    const vehicle = await VehicleRepository.findById(id);
    if (!vehicle) throw new NotFoundError('Vehicle not found');

    if (data.registrationNumber && data.registrationNumber !== vehicle.registrationNumber) {
      const existing = await VehicleRepository.findByRegistration(data.registrationNumber);
      if (existing) throw new ConflictError('Registration number already exists');
    }

    await VehicleRepository.update(id, { ...data, updatedBy });
    const updated = await VehicleRepository.findByIdWithRelations(id);

    await AuditService.log({
      action: 'VEHICLE_UPDATED',
      entityType: 'Vehicle',
      entityId: id,
      userId: updatedBy,
      details: data,
      ipAddress,
      createdBy: updatedBy,
    });

    return updated;
  }

  async delete(id, deletedBy, ipAddress) {
    const vehicle = await VehicleRepository.findById(id);
    if (!vehicle) throw new NotFoundError('Vehicle not found');

    await VehicleRepository.delete(id);

    await AuditService.log({
      action: 'VEHICLE_DELETED',
      entityType: 'Vehicle',
      entityId: id,
      userId: deletedBy,
      ipAddress,
      createdBy: deletedBy,
    });
  }
}

module.exports = new VehicleService();
