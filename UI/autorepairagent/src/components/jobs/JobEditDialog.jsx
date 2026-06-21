import { useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { departmentService } from '../../services/api';

export default function JobEditDialog({ open, onClose, job, onSave, isPending, allowDepartmentEdit = false }) {
  const { data: depts } = useQuery({
    queryKey: ['departments'],
    queryFn: () => departmentService.getAll().then(r => r.data.data || r.data),
    enabled: open && allowDepartmentEdit,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { issueDescription: '', complaintDescription: '', departmentId: '' },
  });

  useEffect(() => {
    if (!open || !job) return;
    reset({
      issueDescription: job.issueDescription || '',
      complaintDescription: job.complaintDescription || '',
      departmentId: job.department?.id || job.departmentId || '',
    });
  }, [open, job, reset]);

  const deptList = Array.isArray(depts) ? depts : depts?.departments || [];

  const handleFormSubmit = (data) => {
    const payload = { issueDescription: data.issueDescription };
    if (allowDepartmentEdit) {
      payload.complaintDescription = data.complaintDescription;
      if (data.departmentId) payload.departmentId = data.departmentId;
    }
    onSave(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontFamily="Space Grotesk">Edit Job</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {allowDepartmentEdit && (
            <TextField
              {...register('complaintDescription', { required: allowDepartmentEdit ? 'Required' : false })}
              label="Complaint Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!errors.complaintDescription}
              helperText={errors.complaintDescription?.message}
            />
          )}
          <TextField
            {...register('issueDescription', { required: 'Required' })}
            label="Issue Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            error={!!errors.issueDescription}
            helperText={errors.issueDescription?.message}
          />
          {allowDepartmentEdit && (
            <TextField
              {...register('departmentId', { required: allowDepartmentEdit ? 'Required' : false })}
              select
              label="Department"
              fullWidth
              margin="normal"
              error={!!errors.departmentId}
              helperText={errors.departmentId?.message}
            >
              {deptList.map(d => (
                <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
              ))}
            </TextField>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? <CircularProgress size={18} /> : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
