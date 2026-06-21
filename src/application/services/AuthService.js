const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const { UserRepository } = require('../../infrastructure/repositories');
const { UnauthorizedError } = require('../../shared/errors/AppError');
const { sanitizeUser } = require('../../shared/utils');
const AuditService = require('./AuditService');

class AuthService {
  async login(email, password, ipAddress) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role.name },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    await AuditService.log({
      action: 'LOGIN',
      entityType: 'User',
      entityId: user.id,
      userId: user.id,
      details: { email: user.email },
      ipAddress,
    });

    return {
      token,
      user: sanitizeUser(user),
      role: user.role.name,
    };
  }
}

module.exports = new AuthService();
