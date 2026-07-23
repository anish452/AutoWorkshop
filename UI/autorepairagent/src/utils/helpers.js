export const STATUS_COLORS = {
  PENDING: 'warning',
  ASSIGNED: 'info',
  IN_PROGRESS: 'primary',
  PAUSED: 'secondary',
  COMPLETED: 'success',
  CANCELLED: 'error',
};

export const STATUS_LABELS = {
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  PAUSED: 'Paused',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const PAUSE_REASONS = {
  TEA_BREAK: 'TEA_BREAK',
  LUNCH_BREAK: 'LUNCH_BREAK',
  PART_PENDING: 'PART_PENDING',
};

export const PAUSE_REASON_LABELS = {
  TEA_BREAK: 'Tea Break',
  LUNCH_BREAK: 'Lunch Break',
  PART_PENDING: 'Part Pending',
};

export const PENDING_JOB_STATUSES = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'PAUSED'];

export const formatMinutes = (minutes) => {
  if (minutes == null) return '—';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
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

export const getApiErrorMessage = (err, fallback = 'Request failed. Please try again.') => {
  if (!err.response) {
    if (err.code === 'ECONNABORTED') {
      return 'Request timed out. The server may be busy — please try again.';
    }
    return 'Cannot reach the API server. Make sure the backend is running on port 3000.';
  }
  return err.response?.data?.message || fallback;
};

export const getDashboardRoute = (role) => {
  switch (role) {
    case 'ADMIN': return '/dashboard/admin';
    case 'JOB_ADVISOR': return '/dashboard/advisor';
    case 'CUSTOMER': return '/dashboard/customer';
    default: return '/dashboard/department';
  }
};
