const { CustomerService } = require('../../application/services');
const asyncHandler = require('../../shared/utils/asyncHandler');

const create = asyncHandler(async (req, res) => {
  const customer = await CustomerService.create(req.body, req.user.id, req.ip);
  res.status(201).json({ success: true, message: 'Customer created', data: customer });
});

const getAll = asyncHandler(async (req, res) => {
  const customers = await CustomerService.getAll();
  res.json({ success: true, data: customers });
});

const getById = asyncHandler(async (req, res) => {
  const customer = await CustomerService.getById(req.params.id);
  res.json({ success: true, data: customer });
});

const update = asyncHandler(async (req, res) => {
  const customer = await CustomerService.update(req.params.id, req.body, req.user.id, req.ip);
  res.json({ success: true, message: 'Customer updated', data: customer });
});

const remove = asyncHandler(async (req, res) => {
  await CustomerService.delete(req.params.id, req.user.id, req.ip);
  res.json({ success: true, message: 'Customer deleted' });
});

module.exports = { create, getAll, getById, update, remove };
