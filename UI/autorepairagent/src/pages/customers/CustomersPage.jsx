import { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, TextField, InputAdornment, Dialog, DialogTitle, DialogContent,
  DialogActions, Grid, Typography, CircularProgress, Alert, TablePagination, Chip
} from '@mui/material';
import { Add, Search, Edit, Delete, Visibility } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { customerService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/helpers';

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(1, 'Required'),
  address: z.string().optional(),
});

function CustomerDialog({ open, onClose, customer }) {
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', address: '' },
  });

  useEffect(() => {
    if (!open) return;
    reset(customer ? {
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
    } : { firstName: '', lastName: '', email: '', phone: '', address: '' });
  }, [open, customer, reset]);

  const mutation = useMutation({
    mutationFn: (data) => customer
      ? customerService.update(customer.id, data)
      : customerService.create(data),
    onSuccess: () => {
      qc.invalidateQueries(['customers']);
      toast.success(customer ? 'Customer updated' : 'Customer created');
      onClose();
      reset();
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Operation failed'),
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontFamily="Space Grotesk">{customer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
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
              <TextField {...register('phone')} label="Phone" fullWidth error={!!errors.phone} helperText={errors.phone?.message} />
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('address')} label="Address" fullWidth multiline rows={2} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? <CircularProgress size={18} /> : (customer ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function CustomersPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: () => customerService.getAll().then(r => r.data.data || r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => customerService.delete(id),
    onSuccess: () => { qc.invalidateQueries(['customers']); toast.success('Customer deleted'); },
    onError: (e) => toast.error(e.response?.data?.message || 'Delete failed'),
  });

  const customers = (Array.isArray(data) ? data : data?.customers || []).filter(c =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase().includes(search.toLowerCase())
  );

  const paged = customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <PageHeader
        title="Customers"
        subtitle={`${customers.length} total customers`}
        action={<Button variant="contained" startIcon={<Add />} onClick={() => { setSelected(null); setDialogOpen(true); }}>Add Customer</Button>}
      />

      <Card>
        <CardContent>
          <TextField
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search customers..."
            size="small" sx={{ mb: 2, width: 300 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
          />

          {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}
          {error && <Alert severity="error">Failed to load customers</Alert>}

          {!isLoading && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paged.map(c => (
                  <TableRow key={c.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{c.firstName} {c.lastName}</Typography>
                    </TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.email || '—'}</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" noWrap>{c.address || '—'}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => { setSelected(c); setDialogOpen(true); }}><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => {
                        if (confirm('Delete this customer?')) deleteMutation.mutate(c.id);
                      }}><Delete fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {paged.length === 0 && (
                  <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}>No customers found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}

          <TablePagination
            component="div"
            count={customers.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }}
          />
        </CardContent>
      </Card>

      <CustomerDialog open={dialogOpen} onClose={() => setDialogOpen(false)} customer={selected} />
    </Box>
  );
}
