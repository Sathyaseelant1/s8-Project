import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';

const logs = [
  {
    id: 1,
    action: 'Verification approved',
    officer: 'Central Admin',
    time: '06 Feb 2026 · 10:45 AM',
    status: 'success',
  },
  {
    id: 2,
    action: 'Duplicate flagged',
    officer: 'State Officer',
    time: '06 Feb 2026 · 09:55 AM',
    status: 'error',
  },
  {
    id: 3,
    action: 'Eligibility pending',
    officer: 'Verification Officer',
    time: '06 Feb 2026 · 09:30 AM',
    status: 'warning',
  },
  {
    id: 4,
    action: 'Audit export generated',
    officer: 'Central Admin',
    time: '05 Feb 2026 · 05:12 PM',
    status: 'info',
  },
];

const statusMap = {
  success: { label: 'Verified', color: 'success' },
  warning: { label: 'Pending', color: 'warning' },
  error: { label: 'Duplicate', color: 'error' },
  info: { label: 'Info', color: 'info' },
};

const AuditLogs = () => {
  return (
    <Stack spacing={2.5}>
      <Box className="page-hero">
        <Typography variant="h2">Audit Logs & Activity Timeline</Typography>
        <Typography color="text.secondary">
          Track every decision with time-stamped, tamper-evident records.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField label="Officer" placeholder="Search officer" fullWidth />
            <TextField label="Date Range" placeholder="Last 7 days" fullWidth />
            <TextField label="Action" placeholder="Approval / Duplicate" fullWidth />
          </Stack>

          <Timeline position="right" sx={{ pl: 0 }}>
            {logs.map((log, index) => (
              <TimelineItem key={log.id}>
                <TimelineSeparator>
                  <TimelineDot color={statusMap[log.status].color} />
                  {index < logs.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Stack spacing={1}>
                    <Typography variant="h4">{log.action}</Typography>
                    <Typography color="text.secondary">
                      {log.officer} · {log.time}
                    </Typography>
                    <Chip
                      label={statusMap[log.status].label}
                      color={statusMap[log.status].color}
                      size="small"
                      sx={{ width: 'fit-content' }}
                    />
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AuditLogs;
