import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

export default function KpiCard({ title, value, icon, color = 'primary', subtitle }) {
  const colorMap = {
    primary: { bg: 'rgba(25,118,210,0.1)', text: '#1976D2' },
    success: { bg: 'rgba(46,125,50,0.1)', text: '#2E7D32' },
    warning: { bg: 'rgba(237,108,2,0.1)', text: '#ED6C02' },
    error: { bg: 'rgba(211,47,47,0.1)', text: '#D32F2F' },
    info: { bg: 'rgba(2,136,209,0.1)', text: '#0288D1' },
    secondary: { bg: 'rgba(13,71,161,0.1)', text: '#0D47A1' },
  };

  const c = colorMap[color] || colorMap.primary;

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h3" fontFamily="Space Grotesk" fontWeight={700}>
              {value ?? '—'}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
            )}
          </Box>
          <Box sx={{
            width: 48, height: 48, borderRadius: 2,
            bgcolor: c.bg, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: c.text,
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
