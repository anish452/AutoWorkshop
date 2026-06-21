const { ForbiddenError, NotFoundError } = require('../../shared/errors/AppError');
const { ROLES, ALL_JOBS_ROLES } = require('../../domain/enums');
const { getUserDepartmentCode } = require('../../shared/utils/departmentUser');
const { JobRepository } = require('../../infrastructure/repositories');

const filterJobsByRole = async (req, res, next) => {
  const role = req.user.role.name;

  if (ALL_JOBS_ROLES.includes(role)) {
    req.jobFilter = {};
    return next();
  }

  if (role === ROLES.CUSTOMER) {
    if (!req.user.customerId) {
      return next(new ForbiddenError('Customer profile not linked'));
    }
    req.jobFilter = {
      vehicle: { customerId: req.user.customerId },
    };
    return next();
  }

  const departmentCode = getUserDepartmentCode(req.user);
  if (departmentCode) {
    req.jobFilter = {
      department: { code: departmentCode },
    };
    return next();
  }

  return next(new ForbiddenError('No job access for this role'));
};

const canAccessJob = async (req, res, next) => {
  try {
    const job = await JobRepository.findByIdWithRelations(req.params.id);
    if (!job) {
      return next(new NotFoundError('Job not found'));
    }

    const role = req.user.role.name;

    if (ALL_JOBS_ROLES.includes(role)) {
      req.job = job;
      return next();
    }

    if (role === ROLES.CUSTOMER) {
      if (job.vehicle.customerId !== req.user.customerId) {
        return next(new ForbiddenError('Cannot access this job'));
      }
      req.job = job;
      return next();
    }

    const departmentCode = getUserDepartmentCode(req.user);
    if (departmentCode && job.department.code === departmentCode) {
      req.job = job;
      return next();
    }

    return next(new ForbiddenError('Cannot access this job'));
  } catch (error) {
    next(error);
  }
};

module.exports = { filterJobsByRole, canAccessJob };
