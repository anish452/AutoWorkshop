export const STATUS_COLORS = {
  PENDING: 'warning',
  ASSIGNED: 'info',
  IN_PROGRESS: 'primary',
  COMPLETED: 'success',
  CANCELLED: 'error',
};

export const STATUS_LABELS = {
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const ROLE_LABELS = {
  ADMIN: 'Admin',
  JOB_ADVISOR: 'Job Advisor',
  MECHANICAL: 'Mechanical',
  ELECTRICAL: 'Electrical',
  BODY_REPAIR: 'Body Repair',
  PAINT: 'Paint',
  GENERAL_INSPECTION: 'General Inspection',
  CUSTOMER: 'Customer',
};

export const ROLES = ['ADMIN', 'JOB_ADVISOR', 'MECHANICAL', 'ELECTRICAL', 'BODY_REPAIR', 'PAINT', 'GENERAL_INSPECTION', 'CUSTOMER'];

export const DEPARTMENT_ROLES = ['MECHANICAL', 'ELECTRICAL', 'BODY_REPAIR', 'PAINT', 'GENERAL_INSPECTION'];

export const isDepartmentRole = (role) => DEPARTMENT_ROLES.includes(role);

export const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
export const formatDateTime = (d) => d ? new Date(d).toLocaleString('en-AU', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

export const getDashboardRoute = (role) => {
  switch (role) {
    case 'ADMIN': return '/dashboard/admin';
    case 'JOB_ADVISOR': return '/dashboard/advisor';
    case 'CUSTOMER': return '/dashboard/customer';
    default: return '/dashboard/department';
  }
};
