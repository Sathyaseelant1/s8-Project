import { Box, Card, CardContent, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

const Coordination = () => {
  const [tab, setTab] = useState(0);

  return (
    <Stack spacing={2.5}>
      <Box className="page-hero">
        <Typography variant="h2">Central–State Coordination</Typography>
        <Typography color="text.secondary">
          Monitor scheme sync, reconciliation, and data exchange health.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Tabs value={tab} onChange={(event, value) => setTab(value)}>
            <Tab label="Central Schemes" />
            <Tab label="State Schemes" />
          </Tabs>
          <Box sx={{ mt: 3 }}>
            {tab === 0 ? (
              <Stack spacing={2}>
                <Box className="sync-row">
                  <Typography variant="h4">National Pension Ledger</Typography>
                  <Typography color="text.secondary">Last updated: 06 Feb 2026 · 11:20 AM</Typography>
                  <Typography className="sync-status ok">Synced</Typography>
                </Box>
                <Box className="sync-row">
                  <Typography variant="h4">Defense Pension System</Typography>
                  <Typography color="text.secondary">Last updated: 06 Feb 2026 · 10:05 AM</Typography>
                  <Typography className="sync-status warn">Delayed</Typography>
                </Box>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Box className="sync-row">
                  <Typography variant="h4">Kerala State Ledger</Typography>
                  <Typography color="text.secondary">Last updated: 06 Feb 2026 · 11:01 AM</Typography>
                  <Typography className="sync-status ok">Synced</Typography>
                </Box>
                <Box className="sync-row">
                  <Typography variant="h4">Gujarat State Ledger</Typography>
                  <Typography color="text.secondary">Last updated: 06 Feb 2026 · 09:44 AM</Typography>
                  <Typography className="sync-status error">Failed</Typography>
                </Box>
              </Stack>
            )}
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Coordination;
