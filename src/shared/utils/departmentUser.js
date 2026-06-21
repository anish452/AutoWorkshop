const { ROLE_TO_DEPARTMENT } = require('../../domain/enums');

function getUserDepartmentCode(user) {
  if (user?.department?.code) return user.department.code;
  return ROLE_TO_DEPARTMENT[user?.role?.name] || null;
}

function isDepartmentStaff(user) {
  return Boolean(getUserDepartmentCode(user));
}

module.exports = { getUserDepartmentCode, isDepartmentStaff };
