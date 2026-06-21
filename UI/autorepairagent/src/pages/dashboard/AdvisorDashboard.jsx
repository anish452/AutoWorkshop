import { Grid, Card, CardContent, Typography, Box, CircularProgress, Alert, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Work, Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardService } from '../../services/api';
import KpiCard from '../../components/dashboard/KpiCard';
import PageHeader from '../../components/common/PageHeader';
import StatusChip from '../../components/common/StatusChip';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const COLORS = ['#ED6C02', '#1976D2', '#2E7D32', '#D32F2F'];

export default function AdvisorDashboard() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-advisor'],
    queryFn: () => dashboardService.jobAdvisor().then(r => r.data.data),
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Failed to load dashboard</Alert>;

  const d = data || {};
  const pieData = [
    { name: 'Pending', value: d.pendingJobs || 0 },
    { name: 'In Progress', value: d.inProgressJobs || 0 },
    { name: 'Completed', value: d.completedJobs || 0 },
    { name: 'Cancelled', value: d.cancelledJobs || 0 },
  ];

  return (
    <Box>
      <PageHeader
        title="Job Advisor Dashboard"
        subtitle="Manage and track all service jobs"
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/jobs/create')}>
            Create Job
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <KpiCard title="Total Jobs" value={d.totalJobs} icon={<Work />} color="primary" />
        </Grid>
        <Grid item xs={6} md={3}>
          <KpiCard title="Today's Jobs" value={d.todayJobs} icon={<Work />} color="info" />
        </Grid>
        <Grid item xs={6} md={3}>
          <KpiCard title="Open Jobs" value={d.openJobs} icon={<Work />} color="warning" />
        </Grid>
        <Grid item xs={6} md={3}>
          <KpiCard title="Completed" value={d.completedJobs} icon={<Work />} color="success" />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>Job Status</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={3}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>Recent Jobs</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Job #</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {d.recentJobs?.length > 0 ? d.recentJobs.map(j => (
                    <TableRow key={j.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/jobs/${j.id}`)}>
                      <TableCell><Typography variant="body2" fontWeight={600}>{j.jobNumber}</Typography></TableCell>
                      <TableCell>{j.vehicle?.registrationNumber || '—'}</TableCell>
                      <TableCell>{j.department?.name || '—'}</TableCell>
                      <TableCell><StatusChip status={j.status} /></TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No jobs yet</TableCell>
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
