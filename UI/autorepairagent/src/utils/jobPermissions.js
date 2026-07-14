import { isDepartmentRole } from './helpers';

export const JOB_VIEW_ROLES = [
  'ADMIN',
  'JOB_ADVISOR',
  'MECHANICAL',
  'ELECTRICAL',
  'BODY_REPAIR',
  'PAINT',
  'GENERAL_INSPECTION',
  'CUSTOMER',
];

export const canViewJob = (role) => JOB_VIEW_ROLES.includes(role);

export const isJobStarted = (job) => (
  job?.status === 'IN_PROGRESS'
  || job?.status === 'COMPLETED'
  || Boolean(job?.startedAt)
);

export const canAdvisorManageJob = (role, job) => (
  ['ADMIN', 'JOB_ADVISOR'].includes(role) && !isJobStarted(job)
);

export const canAssignedUserEditJob = (role, userId, job) => (
  isJobStarted(job)
  && job?.status === 'IN_PROGRESS'
  && (job?.assignedUserId === userId || job?.assignedUser?.id === userId)
  && isDepartmentRole(role)
);

export const canEditJob = (role, userId, job) => (
  canAdvisorManageJob(role, job) || canAssignedUserEditJob(role, userId, job)
);

export const canDeleteJob = (role, job) => canAdvisorManageJob(role, job);
