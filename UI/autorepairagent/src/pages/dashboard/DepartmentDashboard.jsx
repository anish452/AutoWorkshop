import { Grid, Card, CardContent, Typography, Box, CircularProgress, Alert, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Work } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../services/api';
import KpiCard from '../../components/dashboard/KpiCard';
import PageHeader from '../../components/common/PageHeader';
import StatusChip from '../../components/common/StatusChip';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/helpers';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_LABELS } from '../../utils/helpers';

export default function DepartmentDashboard() {
  const { role } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-department'],
    queryFn: () => dashboardService.department().then(r => r.data.data),
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Failed to load dashboard</Alert>;

  const d = data || {};

  return (
    <Box>
      <PageHeader title={`${ROLE_LABELS[role] || role} Dashboard`} subtitle="Your assigned jobs and performance" />

      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <KpiCard title="Pending Jobs" value={d.myPendingJobs ?? 0} icon={<Work />} color="warning" />
        </Grid>
        <Grid item xs={6} md={3}>
          <KpiCard title="In Progress" value={d.myInProgressJobs ?? 0} icon={<Work />} color="primary" />
        </Grid>
        <Grid item xs={6} md={3}>
          <KpiCard title="Completed" value={d.myCompletedJobs ?? 0} icon={<Work />} color="success" />
        </Grid>
        <Grid item xs={6} md={3}>
          <KpiCard
            title="Avg. Completion"
            value={d.averageCompletionTimeMinutes ? `${Math.round(d.averageCompletionTimeMinutes)}m` : '—'}
            icon={<Work />}
            color="info"
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>My Assigned Jobs</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Job #</TableCell>
                    <TableCell>Issue</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {d.assignedJobs?.length > 0 ? d.assignedJobs.map(j => (
                    <TableRow key={j.id} hover>
                      <TableCell><Typography variant="body2" fontWeight={600}>{j.jobNumber}</Typography></TableCell>
                      <TableCell>{j.issueDescription}</TableCell>
                      <TableCell>{j.vehicle?.registrationNumber || '—'}</TableCell>
                      <TableCell><StatusChip status={j.status} /></TableCell>
                      <TableCell>{formatDateTime(j.createdAt)}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => navigate(`/jobs/${j.id}`)}>View</Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No jobs assigned</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
