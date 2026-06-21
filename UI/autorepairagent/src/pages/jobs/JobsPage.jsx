import { useState } from 'react';
import {
  Box, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody,
  TextField, InputAdornment, Typography, CircularProgress, Alert, TablePagination,
  MenuItem, Select, FormControl, InputLabel, Button, Stack, Chip, IconButton
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import StatusChip from '../../components/common/StatusChip';
import JobEditDialog from '../../components/jobs/JobEditDialog';
import { formatDate } from '../../utils/helpers';
import { canEditJob, canDeleteJob, canAdvisorManageJob } from '../../utils/jobPermissions';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const STATUSES = ['ALL', 'PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
const DEPARTMENTS = ['ALL', 'MECHANICAL', 'ELECTRICAL', 'BODY_REPAIR', 'PAINT', 'GENERAL_INSPECTION'];

export default function JobsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { role, user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editJob, setEditJob] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobService.getAll().then(r => r.data.data || r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => jobService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries(['jobs']);
      toast.success('Job updated');
      setEditJob(null);
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to update job'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => jobService.delete(id),
    onSuccess: () => { qc.invalidateQueries(['jobs']); toast.success('Job deleted'); },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to delete job'),
  });

  const jobs = (Array.isArray(data) ? data : data?.jobs || []).filter(j => {
    const matchSearch = `${j.jobNumber} ${j.vehicle?.registrationNumber} ${j.issueDescription}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || j.status === statusFilter;
    const matchDept = deptFilter === 'ALL' || j.department?.code === deptFilter;
    return matchSearch && matchStatus && matchDept;
  });

  return (
    <Box>
      <PageHeader
        title="Jobs"
        subtitle={`${jobs.length} jobs found`}
        action={
          ['ADMIN', 'JOB_ADVISOR'].includes(role) && (
            <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/jobs/create')}>
              Create Job
            </Button>
          )
        }
      />

      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, flexWrap: 'wrap' }}>
            <TextField
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search job number, registration..."
              size="small" sx={{ width: { xs: '100%', sm: 280 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} label="Status">
                {STATUSES.map(s => <MenuItem key={s} value={s}>{s === 'ALL' ? 'All Status' : s.replace('_', ' ')}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Department</InputLabel>
              <Select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} label="Department">
                {DEPARTMENTS.map(d => <MenuItem key={d} value={d}>{d === 'ALL' ? 'All Departments' : d.replace('_', ' ')}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>

          {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}
          {error && <Alert severity="error">Failed to load jobs</Alert>}

          {!isLoading && (
            <Box sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Job Number</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Issue</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(j => (
                    <TableRow key={j.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/jobs/${j.id}`)}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} color="primary">{j.jobNumber}</Typography>
                      </TableCell>
                      <TableCell>{j.vehicle?.registrationNumber || '—'}</TableCell>
                      <TableCell>
                        {j.customer ? `${j.customer.firstName} ${j.customer.lastName}` : j.vehicle?.customer ? `${j.vehicle.customer.firstName} ${j.vehicle.customer.lastName}` : '—'}
                      </TableCell>
                      <TableCell>
                        {j.department?.name && (
                          <Chip label={j.department.name} size="small" variant="outlined" />
                        )}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography variant="body2" noWrap>{j.issueDescription}</Typography>
                      </TableCell>
                      <TableCell><StatusChip status={j.status} /></TableCell>
                      <TableCell>{formatDate(j.createdAt)}</TableCell>
                      <TableCell>
                        {j.assignedUser ? `${j.assignedUser.firstName} ${j.assignedUser.lastName}` : '—'}
                      </TableCell>
                      <TableCell align="right" onClick={e => e.stopPropagation()}>
                        {canEditJob(role, user?.id, j) && (
                          <IconButton size="small" onClick={() => setEditJob(j)}><Edit fontSize="small" /></IconButton>
                        )}
                        {canDeleteJob(role, j) && (
                          <IconButton size="small" color="error" onClick={() => {
                            if (confirm('Delete this job?')) deleteMutation.mutate(j.id);
                          }}><Delete fontSize="small" /></IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {jobs.length === 0 && (
                    <TableRow><TableCell colSpan={9} align="center" sx={{ py: 4 }}>No jobs found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          )}

          <TablePagination
            component="div"
            count={jobs.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }}
          />
        </CardContent>
      </Card>

      <JobEditDialog
        open={Boolean(editJob)}
        onClose={() => setEditJob(null)}
        job={editJob}
        onSave={(data) => updateMutation.mutate({ id: editJob.id, data })}
        isPending={updateMutation.isPending}
        allowDepartmentEdit={editJob ? canAdvisorManageJob(role, editJob) : false}
      />
    </Box>
  );
}
