const BaseRepository = require('./BaseRepository');

class AuditLogRepository extends BaseRepository {
  constructor() {
    super('auditLog');
  }

  async createLog({ action, entityType, entityId, userId, details, ipAddress, createdBy }) {
    return this.prisma.auditLog.create({
      data: {
        action,
        entityType,
        entityId,
        userId,
        details,
        ipAddress,
        createdBy,
      },
    });
  }
}

module.exports = new AuditLogRepository();
