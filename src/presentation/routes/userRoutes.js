const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/rbac');
const validate = require('../middlewares/validate');
const {
  createUserSchema,
  updateUserSchema,
  createDepartmentSchema,
  updateDepartmentSchema,
  idParamSchema,
} = require('../validators/schemas');

const router = express.Router();

router.use(authenticate, isAdmin);

router.post('/users', validate(createUserSchema), userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', validate(idParamSchema), userController.getUserById);
router.put('/users/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/users/:id', validate(idParamSchema), userController.deleteUser);
router.patch('/users/:id/activate', validate(idParamSchema), userController.activateUser);
router.patch('/users/:id/deactivate', validate(idParamSchema), userController.deactivateUser);

router.post('/departments', validate(createDepartmentSchema), userController.createDepartment);
router.get('/departments', userController.getDepartments);
router.put('/departments/:id', validate(updateDepartmentSchema), userController.updateDepartment);
router.delete('/departments/:id', validate(idParamSchema), userController.deleteDepartment);

module.exports = router;
