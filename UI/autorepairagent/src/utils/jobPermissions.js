import { isDepartmentRole } from './helpers';

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
