const { DashboardService } = require('../../application/services');
const asyncHandler = require('../../shared/utils/asyncHandler');

const admin = asyncHandler(async (req, res) => {
  const data = await DashboardService.getAdminDashboard();
  res.json({ success: true, data });
});

const jobAdvisor = asyncHandler(async (req, res) => {
  const data = await DashboardService.getJobAdvisorDashboard();
  res.json({ success: true, data });
});

const department = asyncHandler(async (req, res) => {
  const data = await DashboardService.getDepartmentDashboard(req.user);
  res.json({ success: true, data });
});

const customer = asyncHandler(async (req, res) => {
  const data = await DashboardService.getCustomerDashboard(req.user);
  res.json({ success: true, data });
});

module.exports = { admin, jobAdvisor, department, customer };
