const { ForbiddenError } = require('../../shared/errors/AppError');
const { ROLES, DEPARTMENT_ROLES } = require('../../domain/enums');
const { isDepartmentStaff } = require('../../shared/utils/departmentUser');

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new ForbiddenError('Authentication required'));
  }

  const userRole = req.user.role.name;
  if (!allowedRoles.includes(userRole)) {
    return next(new ForbiddenError('Insufficient permissions'));
  }

  next();
};

const isAdmin = authorize(ROLES.ADMIN);
const isJobAdvisorOrAdmin = authorize(ROLES.ADMIN, ROLES.JOB_ADVISOR);
const isDepartmentUser = (req, res, next) => {
  if (!req.user) {
    return next(new ForbiddenError('Authentication required'));
  }
  if (!isDepartmentStaff(req.user)) {
    return next(new ForbiddenError('Department user access required'));
  }
  next();
};

const isCustomer = authorize(ROLES.CUSTOMER);

module.exports = {
  authorize,
  isAdmin,
  isJobAdvisorOrAdmin,
  isDepartmentUser,
  isCustomer,
};
