import { useState } from 'react';
import {
  Box, Card, CardContent, Grid, Typography, Button, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Chip
} from '@mui/material';
import { Add, Edit, Delete, Business } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { departmentService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { toast } from 'react-toastify';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  code: z.string().min(1, 'Required'),
  description: z.string().optional(),
});

function DeptDialog({ open, onClose, dept }) {
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: dept || { name: '', code: '', description: '' },
  });

  const mutation = useMutation({
    mutationFn: (data) => dept ? departmentService.update(dept.id, data) : departmentService.create(data),
    onSuccess: () => { qc.invalidateQueries(['departments']); toast.success(dept ? 'Department updated' : 'Department created'); onClose(); reset(); },
    onError: (e) => toast.error(e.response?.data?.message || 'Operation failed'),
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontFamily="Space Grotesk">{dept ? 'Edit Department' : 'Create Department'}</DialogTitle>
      <form onSubmit={handleSubmit(d => mutation.mutate(d))}>
        <DialogContent>
          <TextField {...register('name')} label="Department Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
          <TextField {...register('code')} label="Department Code" fullWidth margin="normal" error={!!errors.code} helperText={errors.code?.message} placeholder="e.g. MECHANICAL" />
          <TextField {...register('description')} label="Description" fullWidth margin="normal" multiline rows={3} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? <CircularProgress size={18} /> : (dept ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function DepartmentsPage() {
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['departments'],
    queryFn: () => departmentService.getAll().then(r => r.data.data || r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => departmentService.delete(id),
    onSuccess: () => { qc.invalidateQueries(['departments']); toast.success('Department deleted'); },
    onError: (e) => toast.error(e.response?.data?.message || 'Delete failed'),
  });

  const depts = Array.isArray(data) ? data : data?.departments || [];

  return (
    <Box>
      <PageHeader
        title="Departments"
        subtitle={`${depts.length} departments`}
        action={<Button variant="contained" startIcon={<Add />} onClick={() => { setSelected(null); setDialogOpen(true); }}>Create Department</Button>}
      />

      {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Failed to load departments</Alert>}

      <Grid container spacing={3}>
        {depts.map(d => (
          <Grid item xs={12} sm={6} md={4} key={d.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Business sx={{ color: '#fff', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>{d.name}</Typography>
                      <Chip label={d.code} size="small" variant="outlined" />
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => { setSelected(d); setDialogOpen(true); }}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => { if (confirm('Delete this department?')) deleteMutation.mutate(d.id); }}><Delete fontSize="small" /></IconButton>
                  </Box>
                </Box>
                {d.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{d.description}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {depts.length === 0 && !isLoading && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Business sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography color="text.secondary">No departments yet. Create one to get started.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <DeptDialog open={dialogOpen} onClose={() => setDialogOpen(false)} dept={selected} />
    </Box>
  );
}
