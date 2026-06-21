import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Grid, Typography, Button, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider,
  List, ListItem, ListItemText, Chip, LinearProgress
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
      <Typography variant="body2" fontWeight={500}>{value || '—'}</Typography>
    </Box>
  );
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
  if (error) return <Alert severity="error">Failed to load job</Alert>;
  if (!job) return <Alert severity="warning">Job not found</Alert>;

  const canAct = isDepartmentRole(role);
  const userId = user?.id;
  const showEdit = canEditJob(role, userId, job);
  const showDelete = canDeleteJob(role, job);
  const advisorEdit = canAdvisorManageJob(role, job);

  return (
    <Box>
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
        {/* Job Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600}>Job Information</Typography>
                <StatusChip status={job.status} />
              </Box>
              <InfoRow label="Job Number" value={job.jobNumber} />
              <InfoRow label="Department" value={job.department?.name} />
              <InfoRow label="Assigned To" value={job.assignedUser ? `${job.assignedUser.firstName} ${job.assignedUser.lastName}` : 'Unassigned'} />
              <InfoRow label="Created" value={formatDateTime(job.createdAt)} />
              <InfoRow label="Started" value={formatDateTime(job.startedAt)} />
              <InfoRow label="Completed" value={formatDateTime(job.completedAt)} />
              {job.timeTakenMinutes && (
                <InfoRow label="Time Taken" value={`${job.timeTakenMinutes} minutes`} />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Vehicle & Customer */}
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

        {/* AI Analysis */}
        {job.aiAnalysisLog && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Psychology color="primary" />
                  <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600}>AI Analysis</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, mb: 2 }}>
                  <Typography variant="body2">{job.aiAnalysisLog.reasoning}</Typography>
                </Box>
                {job.aiAnalysisLog.issues?.map((issue, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={600}>{issue.issue}</Typography>
                      <Chip label={`${Math.round((issue.confidence || 0) * 100)}%`} size="small" color="primary" />
                    </Box>
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

        {/* Comments */}
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

      {/* Complete Job Dialog */}
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
