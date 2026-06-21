const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const authenticate = require('../middlewares/auth');
const { isJobAdvisorOrAdmin } = require('../middlewares/rbac');
const validate = require('../middlewares/validate');
const {
  createVehicleSchema,
  updateVehicleSchema,
  idParamSchema,
} = require('../validators/schemas');

const router = express.Router();

router.use(authenticate, isJobAdvisorOrAdmin);

router.post('/', validate(createVehicleSchema), vehicleController.create);
router.get('/', vehicleController.getAll);
router.get('/:id', validate(idParamSchema), vehicleController.getById);
router.put('/:id', validate(updateVehicleSchema), vehicleController.update);
router.delete('/:id', validate(idParamSchema), vehicleController.remove);

module.exports = router;
