const bcrypt = require('bcrypt');
const prisma = require('../../infrastructure/database/prisma');
const { UserRepository, DepartmentRepository } = require('../../infrastructure/repositories');
const { NotFoundError, ConflictError } = require('../../shared/errors/AppError');
const { sanitizeUser } = require('../../shared/utils');
const AuditService = require('./AuditService');

class UserService {
  async createUser(data, createdBy, ipAddress) {
    const existing = await UserRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError('Email already exists');
    }

    const role = await prisma.role.findUnique({ where: { name: data.roleName } });
    if (!role) throw new NotFoundError('Role not found');

    if (data.departmentId) {
      const dept = await DepartmentRepository.findById(data.departmentId);
      if (!dept) throw new NotFoundError('Department not found');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await UserRepository.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      roleId: role.id,
      departmentId: data.departmentId || null,
      customerId: data.customerId || null,
      createdBy,
    });

    const fullUser = await UserRepository.findByIdWithRelations(user.id);

    await AuditService.log({
      action: 'USER_CREATED',
      entityType: 'User',
      entityId: user.id,
      userId: createdBy,
      details: { email: user.email, role: data.roleName },
      ipAddress,
      createdBy,
    });

    return sanitizeUser(fullUser);
  }

  async getUsers() {
    const users = await UserRepository.findAllWithRelations();
    return users.map(sanitizeUser);
  }

  async getUserById(id) {
    const user = await UserRepository.findByIdWithRelations(id);
    if (!user) throw new NotFoundError('User not found');
    return sanitizeUser(user);
  }

  async updateUser(id, data, updatedBy, ipAddress) {
    const user = await UserRepository.findByIdWithRelations(id);
    if (!user) throw new NotFoundError('User not found');

    const updateData = { updatedBy };

    if (data.email) updateData.email = data.email;
    if (data.firstName) updateData.firstName = data.firstName;
    if (data.lastName) updateData.lastName = data.lastName;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.departmentId !== undefined) updateData.departmentId = data.departmentId;

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    if (data.roleName) {
      const role = await prisma.role.findUnique({ where: { name: data.roleName } });
      if (!role) throw new NotFoundError('Role not found');
      updateData.roleId = role.id;
    }

    await UserRepository.update(id, updateData);
    const updated = await UserRepository.findByIdWithRelations(id);

    await AuditService.log({
      action: 'USER_UPDATED',
      entityType: 'User',
      entityId: id,
      userId: updatedBy,
      details: data,
      ipAddress,
      createdBy: updatedBy,
    });

    return sanitizeUser(updated);
  }

  async deleteUser(id, deletedBy, ipAddress) {
    const user = await UserRepository.findByIdWithRelations(id);
    if (!user) throw new NotFoundError('User not found');

    await UserRepository.delete(id);

    await AuditService.log({
      action: 'USER_DELETED',
      entityType: 'User',
      entityId: id,
      userId: deletedBy,
      details: { email: user.email },
      ipAddress,
      createdBy: deletedBy,
    });
  }

  async activateUser(id, updatedBy, ipAddress) {
    return this.setActiveStatus(id, true, 'USER_ACTIVATED', updatedBy, ipAddress);
  }

  async deactivateUser(id, updatedBy, ipAddress) {
    return this.setActiveStatus(id, false, 'USER_DEACTIVATED', updatedBy, ipAddress);
  }

  async setActiveStatus(id, isActive, action, updatedBy, ipAddress) {
    const user = await UserRepository.findByIdWithRelations(id);
    if (!user) throw new NotFoundError('User not found');

    await UserRepository.update(id, { isActive, updatedBy });
    const updated = await UserRepository.findByIdWithRelations(id);

    await AuditService.log({
      action,
      entityType: 'User',
      entityId: id,
      userId: updatedBy,
      details: { isActive },
      ipAddress,
      createdBy: updatedBy,
    });

    return sanitizeUser(updated);
  }

  async createDepartment(data, createdBy) {
    const existing = await DepartmentRepository.findByCode(data.code);
    if (existing) throw new ConflictError('Department code already exists');

    return DepartmentRepository.create({
      ...data,
      createdBy,
    });
  }

  async getDepartments() {
    return DepartmentRepository.findActive();
  }

  async updateDepartment(id, data, updatedBy) {
    const department = await DepartmentRepository.findById(id);
    if (!department) throw new NotFoundError('Department not found');

    if (data.code && data.code !== department.code) {
      const existing = await DepartmentRepository.findByCode(data.code);
      if (existing) throw new ConflictError('Department code already exists');
    }

    const updateData = { updatedBy };
    if (data.name !== undefined) updateData.name = data.name;
    if (data.code !== undefined) updateData.code = data.code;
    if (data.description !== undefined) updateData.description = data.description;

    return DepartmentRepository.update(id, updateData);
  }

  async deleteDepartment(id, updatedBy) {
    const department = await DepartmentRepository.findById(id);
    if (!department) throw new NotFoundError('Department not found');

    const [userCount, jobCount] = await Promise.all([
      prisma.user.count({ where: { departmentId: id } }),
      prisma.job.count({ where: { departmentId: id } }),
    ]);

    if (userCount > 0 || jobCount > 0) {
      return DepartmentRepository.update(id, { isActive: false, updatedBy });
    }

    return DepartmentRepository.delete(id);
  }
}

module.exports = new UserService();
