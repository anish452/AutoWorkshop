const { VehicleService } = require('../../application/services');
const asyncHandler = require('../../shared/utils/asyncHandler');

const create = asyncHandler(async (req, res) => {
  const vehicle = await VehicleService.create(req.body, req.user.id, req.ip);
  res.status(201).json({ success: true, message: 'Vehicle created', data: vehicle });
});

const getAll = asyncHandler(async (req, res) => {
  const vehicles = await VehicleService.getAll();
  res.json({ success: true, data: vehicles });
});

const getById = asyncHandler(async (req, res) => {
  const vehicle = await VehicleService.getById(req.params.id);
  res.json({ success: true, data: vehicle });
});

const update = asyncHandler(async (req, res) => {
  const vehicle = await VehicleService.update(req.params.id, req.body, req.user.id, req.ip);
  res.json({ success: true, message: 'Vehicle updated', data: vehicle });
});

const remove = asyncHandler(async (req, res) => {
  await VehicleService.delete(req.params.id, req.user.id, req.ip);
  res.json({ success: true, message: 'Vehicle deleted' });
});

module.exports = { create, getAll, getById, update, remove };
