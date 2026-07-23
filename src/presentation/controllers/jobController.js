const { JobService } = require('../../application/services');
const asyncHandler = require('../../shared/utils/asyncHandler');

const analyze = asyncHandler(async (req, res) => {
  const result = await JobService.analyzeAndCreateJobs(req.body, req.user.id, req.ip);
  res.status(201).json({
    success: true,
    message: `${result.jobs.length} job(s) created from AI analysis`,
    data: result,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const jobs = await JobService.getJobs(req.jobFilter || {});
  res.json({ success: true, data: jobs });
});

const getById = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.job });
});

const start = asyncHandler(async (req, res) => {
  const job = await JobService.startJob(req.job, req.user.id, req.ip);
  res.json({ success: true, message: 'Job started', data: job });
});

const complete = asyncHandler(async (req, res) => {
  const job = await JobService.completeJob(req.job, req.body.comments, req.user.id, req.ip);
  res.json({ success: true, message: 'Job completed', data: job });
});

const pause = asyncHandler(async (req, res) => {
  const job = await JobService.pauseJob(req.job, req.body.reason, req.user.id, req.ip);
  res.json({ success: true, message: 'Job paused', data: job });
});

const resume = asyncHandler(async (req, res) => {
  const job = await JobService.resumeJob(req.job, req.user.id, req.ip);
  res.json({ success: true, message: 'Job resumed', data: job });
});

const update = asyncHandler(async (req, res) => {
  const job = await JobService.updateJob(req.job, req.body, req.user, req.ip);
  res.json({ success: true, message: 'Job updated', data: job });
});

const remove = asyncHandler(async (req, res) => {
  await JobService.deleteJob(req.job, req.user, req.ip);
  res.json({ success: true, message: 'Job deleted' });
});

module.exports = { analyze, getAll, getById, start, pause, resume, complete, update, remove };
