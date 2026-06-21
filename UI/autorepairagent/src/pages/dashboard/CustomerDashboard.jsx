import { Grid, Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import StatusChip from '../../components/common/StatusChip';
import { formatDateTime } from '../../utils/helpers';
import { DirectionsCar, Work } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-customer'],
    queryFn: () => dashboardService.customer().then(r => r.data.data),
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Failed to load your jobs</Alert>;

  const d = data || {};
  const jobs = d.jobs || [];

  return (
    <Box>
      <PageHeader title={`Welcome, ${user?.firstName}`} subtitle="Track your vehicle service jobs" />

      <Grid container spacing={3}>
        {jobs.length === 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Work sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography color="text.secondary">No active service jobs</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {jobs.map(job => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>{job.jobNumber}</Typography>
                    <Typography variant="body2" color="text.secondary">{job.issueDescription}</Typography>
                  </Box>
                  <StatusChip status={job.status} />
                </Box>

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Vehicle</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      <DirectionsCar sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                      {job.vehicle?.registrationNumber || '—'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Department</Typography>
                    <Typography variant="body2" fontWeight={500}>{job.department?.name || '—'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Technician</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {job.assignedUser ? `${job.assignedUser.firstName} ${job.assignedUser.lastName}` : 'Unassigned'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Created</Typography>
                    <Typography variant="body2">{formatDateTime(job.createdAt)}</Typography>
                  </Grid>
                </Grid>

                {job.comments?.length > 0 && (
                  <Box sx={{ mt: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Latest Note</Typography>
                    <Typography variant="body2">{job.comments[job.comments.length - 1].comment}</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
