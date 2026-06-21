const { AuditLogRepository } = require('../../infrastructure/repositories');

class AuditService {
  async log({ action, entityType, entityId, userId, details, ipAddress, createdBy }) {
    return AuditLogRepository.createLog({
      action,
      entityType,
      entityId,
      userId,
      details,
      ipAddress,
      createdBy: createdBy || userId,
    });
  }
}

module.exports = new AuditService();
