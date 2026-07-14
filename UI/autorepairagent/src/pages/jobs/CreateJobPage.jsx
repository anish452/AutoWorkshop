import { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button, Typography, Grid, CircularProgress,
  Alert, LinearProgress, Chip, Divider, IconButton, Autocomplete
} from '@mui/material';
import { Psychology, CheckCircle, DirectionsCar, Work, Edit, Delete } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobService, vehicleService } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import StatusChip from '../../components/common/StatusChip';
import JobEditDialog from '../../components/jobs/JobEditDialog';
import { canAdvisorManageJob } from '../../utils/jobPermissions';
import { getApiErrorMessage } from '../../utils/helpers';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  vehicleRegistrationNo: z.string().min(1, 'Vehicle registration is required'),
  description: z.string().min(10, 'Please provide at least 10 characters describing the issue'),
});

export default function CreateJobPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { role } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [editJob, setEditJob] = useState(null);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { vehicleRegistrationNo: '', description: '' },
  });

  const { data: vehiclesData } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getAll().then(r => r.data.data || r.data),
  });

  const vehicles = Array.isArray(vehiclesData) ? vehiclesData : vehiclesData?.vehicles || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => jobService.update(id, data),
    onSuccess: (res) => {
      const updated = res.data.data;
      setResult(prev => prev ? {
        ...prev,
        jobs: prev.jobs.map(j => j.id === updated.id ? updated : j),
      } : prev);
      qc.invalidateQueries(['jobs']);
      toast.success('Job updated');
      setEditJob(null);
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to update job'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => jobService.delete(id),
    onSuccess: (_, id) => {
      setResult(prev => prev ? {
        ...prev,
        jobs: prev.jobs.filter(j => j.id !== id),
      } : prev);
      qc.invalidateQueries(['jobs']);
      toast.success('Job deleted');
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Failed to delete job'),
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      setResult(null);
      setAnalyzing(true);
      const res = await jobService.analyze(data);
      setResult(res.data.data);
      toast.success(res.data.message || 'Jobs created successfully!');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Analysis failed. Please try again.'));
    } finally {
      setAnalyzing(false);
    }
  };

  const DEPT_COLORS = {
    MECHANICAL: 'primary',
    ELECTRICAL: 'warning',
    BODY_REPAIR: 'error',
    PAINT: 'secondary',
    GENERAL_INSPECTION: 'info',
  };

  return (
    <Box>
      <PageHeader
        title="Create Job"
        subtitle="AI-powered complaint analysis and job classification"
        breadcrumbs={[{ label: 'Jobs', href: '/jobs' }, { label: 'Create Job' }]}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Psychology color="primary" />
                <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600}>
                  Complaint Details
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="vehicleRegistrationNo"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={vehicles}
                      getOptionLabel={(option) => (
                        typeof option === 'string'
                          ? option
                          : `${option.registrationNumber} — ${option.make} ${option.model} (${option.year})`
                      )}
                      value={vehicles.find(v => v.registrationNumber === field.value) || field.value || null}
                      onChange={(_, option) => {
                        field.onChange(typeof option === 'string' ? option : option?.registrationNumber || '');
                      }}
                      onInputChange={(_, value, reason) => {
                        if (reason === 'input') field.onChange(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Vehicle Registration Number"
                          fullWidth
                          margin="normal"
                          error={!!errors.vehicleRegistrationNo}
                          helperText={errors.vehicleRegistrationNo?.message || 'Select a registered vehicle or type a registration number'}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <DirectionsCar sx={{ color: 'text.disabled', mr: 1 }} />
                                {params.InputProps.startAdornment}
                              </>
                            ),
                          }}
                          placeholder="e.g. ABC123"
                        />
                      )}
                    />
                  )}
                />

                <TextField
                  {...register('description')}
                  label="Complaint Description"
                  fullWidth
                  multiline
                  rows={6}
                  margin="normal"
                  error={!!errors.description}
                  helperText={errors.description?.message || 'Describe the vehicle issue in detail. Supports multiple issues.'}
                  placeholder="e.g. The engine is making a loud knocking noise when accelerating, and the headlights keep flickering..."
                />

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={analyzing}
                  sx={{ mt: 3, py: 1.5 }}
                  startIcon={analyzing ? <CircularProgress size={18} color="inherit" /> : <Psychology />}
                >
                  {analyzing ? 'AI Analyzing Complaint...' : 'Analyze & Create Jobs'}
                </Button>
              </form>

              {analyzing && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                    AI is classifying your complaint and assigning departments...
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {result && (
          <Grid item xs={12} md={6}>
            {/* AI Analysis Card */}
            <Card sx={{ mb: 2, border: '1px solid', borderColor: 'primary.light' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Psychology color="primary" />
                  <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600}>
                    AI Analysis Result
                  </Typography>
                  <Chip label="Complete" color="success" size="small" icon={<CheckCircle />} />
                </Box>

                {result.analysisLog?.reasoning && (
                  <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">AI Reasoning</Typography>
                    <Typography variant="body2">{result.analysisLog.reasoning}</Typography>
                  </Box>
                )}

                {result.analysisLog?.issues?.map((issue, i) => (
                  <Box key={i} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>{issue.issue}</Typography>
                      <Chip
                        label={issue.department}
                        color={DEPT_COLORS[issue.department] || 'default'}
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">Confidence:</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(issue.confidence || 0) * 100}
                        sx={{ flex: 1, borderRadius: 2, height: 6 }}
                        color={issue.confidence > 0.8 ? 'success' : 'warning'}
                      />
                      <Typography variant="caption" fontWeight={700}>
                        {Math.round((issue.confidence || 0) * 100)}%
                      </Typography>
                    </Box>
                    {issue.explanation && (
                      <Typography variant="caption" color="text.secondary">{issue.explanation}</Typography>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Created Jobs */}
            <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={600} sx={{ mb: 2 }}>
              Created Jobs ({result.jobs?.length || 0})
            </Typography>
            {result.jobs?.map(job => (
              <Card key={job.id} sx={{ mb: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => navigate(`/jobs/${job.id}`)}>
                      <Typography variant="subtitle2" fontWeight={700} color="primary">{job.jobNumber}</Typography>
                      <Typography variant="body2">{job.issueDescription}</Typography>
                      <Typography variant="caption" color="text.secondary">{job.department?.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StatusChip status={job.status} />
                      {canAdvisorManageJob(role, job) && (
                        <>
                          <IconButton size="small" onClick={() => setEditJob(job)}><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" color="error" onClick={() => {
                            if (confirm('Delete this job?')) deleteMutation.mutate(job.id);
                          }}><Delete fontSize="small" /></IconButton>
                        </>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Button variant="outlined" onClick={() => navigate('/jobs')} fullWidth sx={{ mt: 1 }}>
              View All Jobs
            </Button>
          </Grid>
        )}
      </Grid>

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
