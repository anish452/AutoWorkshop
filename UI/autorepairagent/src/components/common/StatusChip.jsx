import { Chip } from '@mui/material';
import { STATUS_COLORS, STATUS_LABELS } from '../../utils/helpers';

export default function StatusChip({ status, size = 'small' }) {
  return (
    <Chip
      label={STATUS_LABELS[status] || status}
      color={STATUS_COLORS[status] || 'default'}
      size={size}
      variant="outlined"
    />
  );
}
