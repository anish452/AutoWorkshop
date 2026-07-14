import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Grid, Typography, Button, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  List, ListItem, Chip, LinearProgress
} from '@mui/material';
import { PlayArrow, CheckCircle, ArrowBack, Psychology, Edit, Delete } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import StatusChip from '../../components/common/StatusChip';
import JobEditDialog from '../../components/jobs/JobEditDialog';
import { formatDateTime } from '../../utils/helpers';
import { canEditJob, canDeleteJob, canAdvisorManageJob } from '../../utils/jobPermissions';
import { isDepartmentRole } from '../../utils/helpers';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

function InfoRow({ label, value }) {
  return (
    <Box sx={{ display: 'flex', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary" sx={{ width: 160, flexShrink: 0 }}>{label}</Typography>
      <Typography variant="body2" fontWeight={500} sx={{ flex: 1, whiteSpace: 'pre-wrap' }}>{value || '—'}</Typography>
    </Box>
  );
}

function getAnalysisIssues(job) {
  const logIssues = job?.aiAnalysisLog?.issues;
  if (Array.isArray(logIssues) && logIssues.length > 0) return logIssues;

  if (job?.issueDescription) {
    return [{
      issue: job.issueDescription,
      department: job.department?.code || job.department?.name,
      confidence: job.confidence ?? 0,
      explanation: job.aiExplanation || 'Classification recorded for this job',
    }];
  }

  return [];
}

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role, user } = useAuth();
  const qc = useQueryClient();
  const [completeOpen, setCompleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [comment, setComment] = useState('');

  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobService.getById(id).then(r => r.data.data),
  });

  const startMutation = useMutation({
    mutationFn: () => jobService.start(id),
    onSuccess: () => { qc.invalidateQueries(['job', id]); toast.success('Job started!'); },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to start job'),
  });

  const completeMutation = useMutation({
    mutationFn: () => jobService.complete(id, { comments: comment }),
    onSuccess: () => {
      qc.invalidateQueries(['job', id]);
      toast.success('Job completed!');
      setCompleteOpen(false);
      setComment('');
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to complete job'),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => jobService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries(['job', id]);
      qc.invalidateQueries(['jobs']);
      toast.success('Job updated');
      setEditOpen(false);
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to update job'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => jobService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries(['jobs']);
      toast.success('Job deleted');
      navigate('/jobs');
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to delete job'),
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (error) {
    const message = error.response?.status === 403
      ? 'You do not have permission to view this job.'
      : error.response?.status === 404
        ? 'Job not found.'
        : 'Failed to load job details.';
    return (
      <Box>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/jobs')} sx={{ mb: 2 }}>
          Back to Jobs
        </Button>
        <Alert severity="error">{message}</Alert>
      </Box>
    );
  }
  if (!job) return <Alert severity="warning">Job not found</Alert>;

  const userId = user?.id;
  const isAssignedToUser = job.assignedUserId === userId || job.assignedUser?.id === userId;
  const canAct = isDepartmentRole(role) && isAssignedToUser;
  const showEdit = canEditJob(role, userId, job);
  const showDelete = canDeleteJob(role, job);
  const advisorEdit = canAdvisorManageJob(role, job);
  const analysisIssues = getAnalysisIssues(job);
  const analysisSummary = job.aiAnalysisLog?.rawResponse
    || job.aiAnalysisLog?.complaintDescription
    || job.complaintDescription;

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/jobs')} sx={{ mb: 2 }}>
        Back to Jobs
      </Button>

      <PageHeader
        title={job.jobNumber}
        subtitle={job.issueDescription}
        breadcrumbs={[{ label: 'Jobs', href: '/jobs' }, { label: job.jobNumber }]}
        action={
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {showEdit && (
              <Button variant="outlined" startIcon={<Edit />} onClick={() => setEditOpen(true)}>
                Edit Job
              </Button>
            )}
            {showDelete && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => { if (confirm('Delete this job?')) deleteMutation.mutate(); }}
                disabled={deleteMutation.isPending}
              >
                Delete
              </Button>
            )}
            {canAct && job.status === 'ASSIGNED' && (
              <Button
                variant="contained"
                color="success"
                startIcon={<PlayArrow />}
                onClick={() => startMutation.mutate()}
                disabled={startMutation.isPending}
              >
                Start Job
              </Button>
            )}
            {canAct && job.status === 'IN_PROGRESS' && (
              <Button
                variant="contained"
                startIcon={<CheckCircle />}
                onClick={() => setCompleteOpen(true)}
              >
                Complete Job
              </Button>
            )}
          </Box>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600}>Job Information</Typography>
                <StatusChip status={job.status} />
              </Box>
              <InfoRow label="Job Number" value={job.jobNumber} />
              <InfoRow label="Department" value={job.department?.name} />
              <InfoRow label="Complaint" value={job.complaintDescription} />
              <InfoRow label="Issue" value={job.issueDescription} />
              <InfoRow label="Assigned To" value={job.assignedUser ? `${job.assignedUser.firstName} ${job.assignedUser.lastName}` : 'Unassigned'} />
              <InfoRow label="Created" value={formatDateTime(job.createdAt)} />
              <InfoRow label="Started" value={formatDateTime(job.startedAt)} />
              <InfoRow label="Completed" value={formatDateTime(job.completedAt)} />
              {job.timeTakenMinutes != null && (
                <InfoRow label="Time Taken" value={`${job.timeTakenMinutes} minutes`} />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>Vehicle</Typography>
              <InfoRow label="Registration" value={job.vehicle?.registrationNumber} />
              <InfoRow label="Make / Model" value={job.vehicle ? `${job.vehicle.make} ${job.vehicle.model}` : null} />
              <InfoRow label="Year" value={job.vehicle?.year} />
              <InfoRow label="Chassis" value={job.vehicle?.chassisNumber} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>Customer</Typography>
              <InfoRow label="Name" value={job.vehicle?.customer ? `${job.vehicle.customer.firstName} ${job.vehicle.customer.lastName}` : null} />
              <InfoRow label="Phone" value={job.vehicle?.customer?.phone} />
              <InfoRow label="Email" value={job.vehicle?.customer?.email} />
            </CardContent>
          </Card>
        </Grid>

        {(job.aiAnalysisLog || job.aiExplanation || job.confidence != null) && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Psychology color="primary" />
                  <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600}>AI Analysis</Typography>
                </Box>
                {analysisSummary && (
                  <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Original Complaint
                    </Typography>
                    <Typography variant="body2">{analysisSummary}</Typography>
                  </Box>
                )}
                {analysisIssues.map((issue, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, gap: 1, flexWrap: 'wrap' }}>
                      <Typography variant="body2" fontWeight={600}>{issue.issue}</Typography>
                      <Chip
                        label={`${Math.round((issue.confidence || 0) * 100)}%`}
                        size="small"
                        color="primary"
                      />
                    </Box>
                    {issue.department && (
                      <Chip label={issue.department} size="small" variant="outlined" sx={{ mb: 0.5 }} />
                    )}
                    <LinearProgress
                      variant="determinate"
                      value={(issue.confidence || 0) * 100}
                      sx={{ borderRadius: 2, height: 6, mb: 0.5 }}
                    />
                    <Typography variant="caption" color="text.secondary">{issue.explanation}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>
                Comments & Notes
              </Typography>
              {job.comments?.length > 0 ? (
                <List dense>
                  {job.comments.map((c, i) => (
                    <ListItem key={i} sx={{ px: 0, alignItems: 'flex-start' }}>
                      <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, width: '100%' }}>
                        <Typography variant="body2">{c.comment}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.user ? `${c.user.firstName} ${c.user.lastName}` : ''} {formatDateTime(c.createdAt)}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary" variant="body2">No comments yet</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={completeOpen} onClose={() => setCompleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontFamily="Space Grotesk">Complete Job</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please add completion notes before marking this job as complete.
          </Typography>
          {job.startedAt && (
            <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, mb: 2 }}>
              <Typography variant="body2">
                Started: {formatDateTime(job.startedAt)}
              </Typography>
            </Box>
          )}
          <TextField
            value={comment}
            onChange={e => setComment(e.target.value)}
            label="Completion Notes"
            multiline rows={4}
            fullWidth
            placeholder="Describe what was done to resolve the issue..."
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCompleteOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            disabled={completeMutation.isPending}
            onClick={() => completeMutation.mutate()}
          >
            {completeMutation.isPending ? <CircularProgress size={18} /> : 'Mark Complete'}
          </Button>
        </DialogActions>
      </Dialog>

      <JobEditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        job={job}
        onSave={(data) => updateMutation.mutate(data)}
        isPending={updateMutation.isPending}
        allowDepartmentEdit={advisorEdit}
      />
    </Box>
  );
}
