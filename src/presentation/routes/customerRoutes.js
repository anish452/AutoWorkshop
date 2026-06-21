const express = require('express');
const customerController = require('../controllers/customerController');
const authenticate = require('../middlewares/auth');
const { isJobAdvisorOrAdmin } = require('../middlewares/rbac');
const validate = require('../middlewares/validate');
const {
  createCustomerSchema,
  updateCustomerSchema,
  idParamSchema,
} = require('../validators/schemas');

const router = express.Router();

router.use(authenticate, isJobAdvisorOrAdmin);

router.post('/', validate(createCustomerSchema), customerController.create);
router.get('/', customerController.getAll);
router.get('/:id', validate(idParamSchema), customerController.getById);
router.put('/:id', validate(updateCustomerSchema), customerController.update);
router.delete('/:id', validate(idParamSchema), customerController.remove);

module.exports = router;
