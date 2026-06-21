import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, TextField, Button, Typography, InputAdornment,
  IconButton, FormControlLabel, Checkbox, Alert, CircularProgress, Divider
} from '@mui/material';
import { Visibility, VisibilityOff, DirectionsCar } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { getDashboardRoute } from '../../utils/helpers';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      setLoading(true);
      const user = await login(data.email, data.password);
      const role = user?.role?.name || user?.role;
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate(getDashboardRoute(role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #42A5F5 100%)',
      p: 2,
    }}>
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(6)].map((_, i) => (
          <Box key={i} sx={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            width: `${120 + i * 80}px`,
            height: `${120 + i * 80}px`,
            top: `${10 + i * 12}%`,
            left: `${5 + i * 15}%`,
          }} />
        ))}
      </Box>

      <Card sx={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 64, height: 64, borderRadius: 3,
              background: 'linear-gradient(135deg, #1976D2, #0D47A1)',
              mb: 2,
            }}>
              <DirectionsCar sx={{ color: '#fff', fontSize: 34 }} />
            </Box>
            <Typography variant="h4" fontFamily="Space Grotesk" fontWeight={700} gutterBottom>
              AutoRepairAgent
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI Powered Vehicle Service Job Classification
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register('email')}
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="email"
            />
            <TextField
              {...register('password')}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(s => !s)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <FormControlLabel
                control={<Checkbox {...register('remember')} size="small" />}
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Forgot password?
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 3, py: 1.5 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            Demo: admin@autorepair.com / Password123!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
