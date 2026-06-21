import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

export default function PageHeader({ title, subtitle, action, breadcrumbs }) {
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && (
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 1 }}>
          {breadcrumbs.map((b, i) =>
            i < breadcrumbs.length - 1
              ? <Link key={i} color="inherit" href={b.href} underline="hover" variant="body2">{b.label}</Link>
              : <Typography key={i} variant="body2" color="text.primary">{b.label}</Typography>
          )}
        </Breadcrumbs>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontFamily="Space Grotesk" fontWeight={700}>{title}</Typography>
          {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
        </Box>
        {action && <Box>{action}</Box>}
      </Box>
    </Box>
  );
}
