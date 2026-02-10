import { Box, Paper, Stack, Typography } from '@mui/material';

const InfoCard = ({ title, value, change, accent = 'primary' }) => {
  return (
    <Paper sx={{ p: 2.5, height: '100%' }}>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.2,
            py: 0.4,
            borderRadius: 999,
            bgcolor: `${accent}.light`,
            color: `${accent}.main`,
            fontSize: 12,
            fontWeight: 600,
            width: 'fit-content',
          }}
        >
          {change}
        </Box>
      </Stack>
    </Paper>
  );
};

export default InfoCard;
