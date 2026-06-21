import { Grid, Card, CardContent, Typography, Box, CircularProgress, Alert, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { People, DirectionsCar, Work, CheckCircle, Cancel, HourglassEmpty, PlayArrow, Person } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { dashboardService, jobService } from '../../services/api';
import KpiCard from '../../components/dashboard/KpiCard';
import PageHeader from '../../components/common/PageHeader';
import StatusChip from '../../components/common/StatusChip';
import { formatDate } from '../../utils/helpers';

const COLORS = ['#1976D2', '#2E7D32', '#ED6C02', '#D32F2F', '#9C27B0'];

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-admin'],
    queryFn: () => dashboardService.admin().then(r => r.data.data),
  });

  const { data: jobsData } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobService.getAll().then(r => r.data.data || r.data),
  });

  const recentJobs = (Array.isArray(jobsData) ? jobsData : jobsData?.jobs || []).slice(0, 10);

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Failed to load dashboard data</Alert>;

  const d = data || {};
  const pieData = [
    { name: 'Pending', value: d.pendingJobs || 0 },
    { name: 'In Progress', value: d.inProgressJobs || 0 },
    { name: 'Completed', value: d.completedJobs || 0 },
    { name: 'Cancelled', value: d.cancelledJobs || 0 },
  ];

  return (
    <Box>
      <PageHeader title="Admin Dashboard" subtitle="System-wide overview and analytics" />

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Total Jobs" value={d.totalJobs} icon={<Work />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Pending" value={d.pendingJobs} icon={<HourglassEmpty />} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="In Progress" value={d.inProgressJobs} icon={<PlayArrow />} color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Completed" value={d.completedJobs} icon={<CheckCircle />} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Cancelled" value={d.cancelledJobs} icon={<Cancel />} color="error" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Total Customers" value={d.totalCustomers} icon={<People />} color="secondary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Total Vehicles" value={d.totalVehicles} icon={<DirectionsCar />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard title="Total Users" value={d.totalUsers} icon={<Person />} color="success" />
        </Grid>

        {/* Jobs by Department */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>
                Jobs by Department
              </Typography>
              {d.jobsByDepartment?.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={d.jobsByDepartment} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1976D2" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Box sx={{ py: 6, textAlign: 'center' }}>
                  <Typography color="text.secondary">No department data yet</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Status Distribution */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>
                Job Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Average Completion Time */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Avg. Completion Time</Typography>
                  <Typography variant="h4" fontFamily="Space Grotesk" fontWeight={700} color="primary.main">
                    {d.averageCompletionTimeMinutes ? `${Math.round(d.averageCompletionTimeMinutes)} min` : '—'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Jobs */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} gutterBottom>
                Recent Jobs
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Job Number</TableCell>
                    <TableCell>Registration</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Issue</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentJobs.length > 0 ? recentJobs.map(job => (
                    <TableRow key={job.id} hover>
                      <TableCell><Typography variant="body2" fontWeight={700}>{job.jobNumber}</Typography></TableCell>
                      <TableCell><Typography variant="body2" fontWeight={600}>{job.vehicle?.registrationNumber || '—'}</Typography></TableCell>
                      <TableCell>{job.department?.name || '—'}</TableCell>
                      <TableCell sx={{ maxWidth: 240 }}><Typography variant="body2" noWrap>{job.issueDescription}</Typography></TableCell>
                      <TableCell><StatusChip status={job.status} /></TableCell>
                      <TableCell>{formatDate(job.createdAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No jobs yet</TableCell>
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
