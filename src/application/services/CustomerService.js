const { CustomerRepository } = require('../../infrastructure/repositories');
const { NotFoundError } = require('../../shared/errors/AppError');
const AuditService = require('./AuditService');

class CustomerService {
  async create(data, createdBy, ipAddress) {
    const customer = await CustomerRepository.create({
      ...data,
      createdBy,
    });

    await AuditService.log({
      action: 'CUSTOMER_CREATED',
      entityType: 'Customer',
      entityId: customer.id,
      userId: createdBy,
      details: { name: `${data.firstName} ${data.lastName}` },
      ipAddress,
      createdBy,
    });

    return customer;
  }

  async getAll() {
    return CustomerRepository.findAllWithVehicles();
  }

  async getById(id) {
    const customer = await CustomerRepository.findByIdWithVehicles(id);
    if (!customer) throw new NotFoundError('Customer not found');
    return customer;
  }

  async update(id, data, updatedBy, ipAddress) {
    const customer = await CustomerRepository.findById(id);
    if (!customer) throw new NotFoundError('Customer not found');

    const updated = await CustomerRepository.update(id, { ...data, updatedBy });

    await AuditService.log({
      action: 'CUSTOMER_UPDATED',
      entityType: 'Customer',
      entityId: id,
      userId: updatedBy,
      details: data,
      ipAddress,
      createdBy: updatedBy,
    });

    return updated;
  }

  async delete(id, deletedBy, ipAddress) {
    const customer = await CustomerRepository.findById(id);
    if (!customer) throw new NotFoundError('Customer not found');

    await CustomerRepository.delete(id);

    await AuditService.log({
      action: 'CUSTOMER_DELETED',
      entityType: 'Customer',
      entityId: id,
      userId: deletedBy,
      ipAddress,
      createdBy: deletedBy,
    });
  }
}

module.exports = new CustomerService();
