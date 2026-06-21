import { useState } from 'react';
import {
  Box, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, TextField, InputAdornment, Dialog, DialogTitle, DialogContent,
  DialogActions, Grid, Typography, CircularProgress, Alert, TablePagination,
  MenuItem, Button, Chip
} from '@mui/material';
import { Add, Search, Edit, Delete, ToggleOn, ToggleOff } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userService, departmentService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { toast } from 'react-toastify';
import { ROLES, ROLE_LABELS } from '../../utils/helpers';

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Min 6 characters').optional().or(z.literal('')),
  roleName: z.string().min(1, 'Required'),
  departmentId: z.string().optional().nullable(),
});

function UserDialog({ open, onClose, user }) {
  const qc = useQueryClient();
  const { data: depts } = useQuery({
    queryKey: ['departments'],
    queryFn: () => departmentService.getAll().then(r => r.data.data || r.data),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: user ? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      roleName: user.role?.name || user.role || '',
      departmentId: user.department?.id || null,
    } : { firstName: '', lastName: '', email: '', phone: '', password: '', roleName: '', departmentId: null },
  });

  const mutation = useMutation({
    mutationFn: (data) => user ? userService.update(user.id, data) : userService.create(data),
    onSuccess: () => { qc.invalidateQueries(['users']); toast.success(user ? 'User updated' : 'User created'); onClose(); reset(); },
    onError: (e) => toast.error(e.response?.data?.message || 'Operation failed'),
  });

  const deptList = Array.isArray(depts) ? depts : depts?.departments || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontFamily="Space Grotesk">{user ? 'Edit User' : 'Create User'}</DialogTitle>
      <form onSubmit={handleSubmit(d => mutation.mutate(d))}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={6}>
              <TextField {...register('firstName')} label="First Name" fullWidth error={!!errors.firstName} helperText={errors.firstName?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField {...register('lastName')} label="Last Name" fullWidth error={!!errors.lastName} helperText={errors.lastName?.message} />
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('email')} label="Email" type="email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('phone')} label="Phone" fullWidth />
            </Grid>
            {!user && (
              <Grid item xs={12}>
                <TextField {...register('password')} label="Password" type="password" fullWidth error={!!errors.password} helperText={errors.password?.message} />
              </Grid>
            )}
            <Grid item xs={6}>
              <TextField {...register('roleName')} select label="Role" fullWidth error={!!errors.roleName} helperText={errors.roleName?.message}>
                {ROLES.map(r => <MenuItem key={r} value={r}>{ROLE_LABELS[r]}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField {...register('departmentId')} select label="Department" fullWidth>
                <MenuItem value="">None</MenuItem>
                {deptList.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? <CircularProgress size={18} /> : (user ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function UsersPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll().then(r => r.data.data || r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => userService.delete(id),
    onSuccess: () => { qc.invalidateQueries(['users']); toast.success('User deleted'); },
    onError: (e) => toast.error(e.response?.data?.message || 'Delete failed'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }) => active ? userService.deactivate(id) : userService.activate(id),
    onSuccess: () => { qc.invalidateQueries(['users']); toast.success('User status updated'); },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to update status'),
  });

  const users = (Array.isArray(data) ? data : data?.users || []).filter(u =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Users"
        subtitle={`${users.length} system users`}
        action={<Button variant="contained" startIcon={<Add />} onClick={() => { setSelected(null); setDialogOpen(true); }}>Create User</Button>}
      />
      <Card>
        <CardContent>
          <TextField
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search users..." size="small" sx={{ mb: 2, width: 300 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
          />
          {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}
          {error && <Alert severity="error">Failed to load users</Alert>}
          {!isLoading && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(u => (
                  <TableRow key={u.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600}>{u.firstName} {u.lastName}</Typography></TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell><Chip label={ROLE_LABELS[u.role?.name || u.role] || u.role?.name || u.role} size="small" variant="outlined" /></TableCell>
                    <TableCell>{u.department?.name || '—'}</TableCell>
                    <TableCell>
                      <Chip
                        label={u.isActive ? 'Active' : 'Inactive'}
                        color={u.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => { setSelected(u); setDialogOpen(true); }}><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" color={u.isActive ? 'warning' : 'success'} onClick={() => toggleMutation.mutate({ id: u.id, active: u.isActive })}>
                        {u.isActive ? <ToggleOff fontSize="small" /> : <ToggleOn fontSize="small" />}
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => { if (confirm('Delete this user?')) deleteMutation.mutate(u.id); }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}>No users found</TableCell></TableRow>}
              </TableBody>
            </Table>
          )}
          <TablePagination component="div" count={users.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={rowsPerPage} onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }} />
        </CardContent>
      </Card>
      <UserDialog open={dialogOpen} onClose={() => setDialogOpen(false)} user={selected} />
    </Box>
  );
}
