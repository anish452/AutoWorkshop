import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline } from '@mui/icons-material';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 3 }}>
      <Typography variant="h1" fontFamily="Space Grotesk" fontWeight={700} color="primary" sx={{ fontSize: '6rem' }}>404</Typography>
      <Typography variant="h5" fontWeight={600} gutterBottom>Page Not Found</Typography>
      <Typography color="text.secondary" gutterBottom>The page you're looking for doesn't exist.</Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>Go Home</Button>
    </Box>
  );
}
