const { UserService } = require('../../application/services');
const asyncHandler = require('../../shared/utils/asyncHandler');

const createUser = asyncHandler(async (req, res) => {
  const ipAddress = req.ip;
  const user = await UserService.createUser(req.body, req.user.id, ipAddress);
  res.status(201).json({ success: true, message: 'User created', data: user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await UserService.getUsers();
  res.json({ success: true, data: users });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  res.json({ success: true, data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await UserService.updateUser(req.params.id, req.body, req.user.id, req.ip);
  res.json({ success: true, message: 'User updated', data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
  await UserService.deleteUser(req.params.id, req.user.id, req.ip);
  res.json({ success: true, message: 'User deleted' });
});

const activateUser = asyncHandler(async (req, res) => {
  const user = await UserService.activateUser(req.params.id, req.user.id, req.ip);
  res.json({ success: true, message: 'User activated', data: user });
});

const deactivateUser = asyncHandler(async (req, res) => {
  const user = await UserService.deactivateUser(req.params.id, req.user.id, req.ip);
  res.json({ success: true, message: 'User deactivated', data: user });
});

const createDepartment = asyncHandler(async (req, res) => {
  const department = await UserService.createDepartment(req.body, req.user.id);
  res.status(201).json({ success: true, message: 'Department created', data: department });
});

const getDepartments = asyncHandler(async (req, res) => {
  const departments = await UserService.getDepartments();
  res.json({ success: true, data: departments });
});

const updateDepartment = asyncHandler(async (req, res) => {
  const department = await UserService.updateDepartment(req.params.id, req.body, req.user.id);
  res.json({ success: true, message: 'Department updated', data: department });
});

const deleteDepartment = asyncHandler(async (req, res) => {
  await UserService.deleteDepartment(req.params.id, req.user.id);
  res.json({ success: true, message: 'Department deleted' });
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  activateUser,
  deactivateUser,
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
