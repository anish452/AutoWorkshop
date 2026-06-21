import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Lock } from '@mui/icons-material';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 3 }}>
      <Lock sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
      <Typography variant="h4" fontFamily="Space Grotesk" fontWeight={700} gutterBottom>403 — Access Denied</Typography>
      <Typography color="text.secondary" gutterBottom>You don't have permission to access this page.</Typography>
      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>Go Back</Button>
    </Box>
  );
}
