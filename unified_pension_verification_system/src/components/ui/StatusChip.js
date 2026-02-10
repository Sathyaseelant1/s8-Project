import { Chip } from '@mui/material';

const statusConfig = {
  APPROVED: { color: 'success', label: 'Approved' },
  PENDING: { color: 'warning', label: 'Pending' },
  REJECTED: { color: 'error', label: 'Rejected' },
  Verified: { color: 'success', label: 'Verified' },
  Duplicate: { color: 'error', label: 'Duplicate' },
  Pending: { color: 'warning', label: 'Pending' },
  'Under Review': { color: 'info', label: 'Under Review' },
};

const StatusChip = ({ status }) => {
  const config = statusConfig[status] || { color: 'info', label: status };
  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="filled"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default StatusChip;
