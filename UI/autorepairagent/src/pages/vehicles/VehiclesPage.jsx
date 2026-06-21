import { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, TextField, InputAdornment, Dialog, DialogTitle, DialogContent,
  DialogActions, Grid, Typography, CircularProgress, Alert, TablePagination, MenuItem
} from '@mui/material';
import { Add, Search, Edit, Delete } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { vehicleService, customerService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { toast } from 'react-toastify';

const schema = z.object({
  registrationNumber: z.string().min(1, 'Required'),
  chassisNumber: z.string().optional(),
  make: z.string().min(1, 'Required'),
  model: z.string().min(1, 'Required'),
  year: z.coerce.number().min(1900).max(2100),
  customerId: z.string().min(1, 'Required'),
});

function VehicleDialog({ open, onClose, vehicle }) {
  const qc = useQueryClient();
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => customerService.getAll().then(r => r.data.data || r.data),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { registrationNumber: '', chassisNumber: '', make: '', model: '', year: new Date().getFullYear(), customerId: '' },
  });

  useEffect(() => {
    if (!open) return;
    reset(vehicle ? {
      registrationNumber: vehicle.registrationNumber || '',
      chassisNumber: vehicle.chassisNumber || '',
      make: vehicle.make || '',
      model: vehicle.model || '',
      year: vehicle.year || new Date().getFullYear(),
      customerId: vehicle.customer?.id || vehicle.customerId || '',
    } : {
      registrationNumber: '', chassisNumber: '', make: '', model: '', year: new Date().getFullYear(), customerId: '',
    });
  }, [open, vehicle, reset]);

  const mutation = useMutation({
    mutationFn: (data) => vehicle ? vehicleService.update(vehicle.id, data) : vehicleService.create(data),
    onSuccess: () => { qc.invalidateQueries(['vehicles']); toast.success(vehicle ? 'Vehicle updated' : 'Vehicle created'); onClose(); reset(); },
    onError: (e) => toast.error(e.response?.data?.message || 'Operation failed'),
  });

  const customerList = Array.isArray(customers) ? customers : customers?.customers || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontFamily="Space Grotesk">{vehicle ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
      <form onSubmit={handleSubmit(d => mutation.mutate(d))}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={6}>
              <TextField {...register('registrationNumber')} label="Registration Number" fullWidth error={!!errors.registrationNumber} helperText={errors.registrationNumber?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField {...register('chassisNumber')} label="Chassis Number" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField {...register('make')} label="Make" fullWidth error={!!errors.make} helperText={errors.make?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField {...register('model')} label="Model" fullWidth error={!!errors.model} helperText={errors.model?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField {...register('year')} label="Year" type="number" fullWidth error={!!errors.year} helperText={errors.year?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField {...register('customerId')} select label="Customer" fullWidth error={!!errors.customerId} helperText={errors.customerId?.message}>
                {customerList.map(c => (
                  <MenuItem key={c.id} value={c.id}>{c.firstName} {c.lastName}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? <CircularProgress size={18} /> : (vehicle ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function VehiclesPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getAll().then(r => r.data.data || r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => vehicleService.delete(id),
    onSuccess: () => { qc.invalidateQueries(['vehicles']); toast.success('Vehicle deleted'); },
    onError: (e) => toast.error(e.response?.data?.message || 'Delete failed'),
  });

  const vehicles = (Array.isArray(data) ? data : data?.vehicles || []).filter(v =>
    `${v.registrationNumber} ${v.make} ${v.model} ${v.chassisNumber}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Vehicles"
        subtitle={`${vehicles.length} registered vehicles`}
        action={<Button variant="contained" startIcon={<Add />} onClick={() => { setSelected(null); setDialogOpen(true); }}>Add Vehicle</Button>}
      />
      <Card>
        <CardContent>
          <TextField
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by registration, make, model..."
            size="small" sx={{ mb: 2, width: 350 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
          />
          {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}
          {error && <Alert severity="error">Failed to load vehicles</Alert>}
          {!isLoading && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Registration</TableCell>
                  <TableCell>Chassis</TableCell>
                  <TableCell>Make / Model</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(v => (
                  <TableRow key={v.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={700}>{v.registrationNumber}</Typography></TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{v.chassisNumber || '—'}</Typography></TableCell>
                    <TableCell>{v.make} {v.model}</TableCell>
                    <TableCell>{v.year}</TableCell>
                    <TableCell>{v.customer ? `${v.customer.firstName} ${v.customer.lastName}` : '—'}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => { setSelected(v); setDialogOpen(true); }}><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => { if (confirm('Delete this vehicle?')) deleteMutation.mutate(v.id); }}><Delete fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {vehicles.length === 0 && (
                  <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}>No vehicles found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
          <TablePagination component="div" count={vehicles.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={rowsPerPage} onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }} />
        </CardContent>
      </Card>
      <VehicleDialog open={dialogOpen} onClose={() => setDialogOpen(false)} vehicle={selected} />
    </Box>
  );
}
