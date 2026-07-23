const express = require('express');
const jobController = require('../controllers/jobController');
const authenticate = require('../middlewares/auth');
const { isJobAdvisorOrAdmin, isDepartmentUser } = require('../middlewares/rbac');
const { filterJobsByRole, canAccessJob } = require('../middlewares/jobAccess');
const validate = require('../middlewares/validate');
const {
  analyzeJobSchema,
  completeJobSchema,
  pauseJobSchema,
  updateJobSchema,
  idParamSchema,
} = require('../validators/schemas');

const router = express.Router();

router.post(
  '/analyze',
  authenticate,
  isJobAdvisorOrAdmin,
  validate(analyzeJobSchema),
  jobController.analyze
);

router.get(
  '/',
  authenticate,
  filterJobsByRole,
  jobController.getAll
);

router.get(
  '/:id',
  authenticate,
  validate(idParamSchema),
  canAccessJob,
  jobController.getById
);

router.put(
  '/:id',
  authenticate,
  validate(updateJobSchema),
  canAccessJob,
  jobController.update
);

router.delete(
  '/:id',
  authenticate,
  validate(idParamSchema),
  canAccessJob,
  jobController.remove
);

router.post(
  '/:id/start',
  authenticate,
  isDepartmentUser,
  validate(idParamSchema),
  canAccessJob,
  jobController.start
);

router.post(
  '/:id/pause',
  authenticate,
  isDepartmentUser,
  validate(pauseJobSchema),
  canAccessJob,
  jobController.pause
);

router.post(
  '/:id/resume',
  authenticate,
  isDepartmentUser,
  validate(idParamSchema),
  canAccessJob,
  jobController.resume
);

router.post(
  '/:id/complete',
  authenticate,
  isDepartmentUser,
  validate(completeJobSchema),
  canAccessJob,
  jobController.complete
);

module.exports = router;
