const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const { UnauthorizedError } = require('../../shared/errors/AppError');
const { UserRepository } = require('../../infrastructure/repositories');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access token required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await UserRepository.findByIdWithRelations(decoded.userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedError('User not found or inactive');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new UnauthorizedError(error.message));
    }
    next(error);
  }
};

module.exports = authenticate;
