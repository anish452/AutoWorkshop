const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authenticate = require('../middlewares/auth');
const { authorize, isDepartmentUser } = require('../middlewares/rbac');
const { ROLES } = require('../../domain/enums');

const router = express.Router();

router.get(
  '/admin',
  authenticate,
  authorize(ROLES.ADMIN),
  dashboardController.admin
);

router.get(
  '/job-advisor',
  authenticate,
  authorize(ROLES.ADMIN, ROLES.JOB_ADVISOR),
  dashboardController.jobAdvisor
);

router.get(
  '/department',
  authenticate,
  isDepartmentUser,
  dashboardController.department
);

router.get(
  '/customer',
  authenticate,
  authorize(ROLES.CUSTOMER),
  dashboardController.customer
);

module.exports = router;
