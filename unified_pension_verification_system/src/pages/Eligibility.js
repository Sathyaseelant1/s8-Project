import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StatusChip from '../components/ui/StatusChip';
import { fetchPensioners, updatePensionerStatus } from '../services/apiService';

const Eligibility = () => {
  const [activeProfile, setActiveProfile] = useState(null);
  const [error, setError] = useState('');
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [confirm, setConfirm] = useState({ open: false, status: null });

  useEffect(() => {
    let mounted = true;
    fetchPensioners()
      .then((data) => {
        if (mounted) {
          setRows(data);
          setActiveProfile(data[0] || null);
          setError('');
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredRows = useMemo(() => {
    const search = query.toLowerCase();
    return rows.filter(
      (row) =>
        row.name.toLowerCase().includes(search) ||
        row.uid.toLowerCase().includes(search)
    );
  }, [query, rows]);

  const handleStatusChange = async (status) => {
    if (!activeProfile) return;
    try {
      const updated = await updatePensionerStatus(activeProfile.id, status);
      const next = {
        ...activeProfile,
        status: updated.status,
        active: updated.active,
      };
      setActiveProfile(next);
      setRows((prev) =>
        prev.map((row) => (row.id === next.id ? next : row))
      );
      setToast(`Status updated to ${updated.status}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const requestStatusChange = (status) => {
    setConfirm({ open: true, status });
  };

  const confirmStatusChange = () => {
    if (confirm.status) {
      handleStatusChange(confirm.status);
    }
    setConfirm({ open: false, status: null });
  };

  return (
    <Stack spacing={3}>
      <Box className="page-hero">
        <Typography variant="h2">Eligibility Validation Dashboard</Typography>
        <Typography color="text.secondary">
          Validate schemes, service history, and identity proofs in one view.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h3">Beneficiaries</Typography>
                <TextField
                  placeholder="Search by UID or Name"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <List className="eligibility-list">
                  {filteredRows.map((row) => (
                    <ListItemButton
                      key={row.id}
                      selected={activeProfile?.id === row.id}
                      onClick={() => setActiveProfile(row)}
                    >
                      <ListItemText
                        primary={row.name}
                        secondary={`${row.uid} · ${row.state}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h3">Beneficiary Profile</Typography>
                <Typography variant="h4">{activeProfile?.name}</Typography>
                <Typography color="text.secondary">UID: {activeProfile?.uid}</Typography>
                <Typography color="text.secondary">State: {activeProfile?.state}</Typography>
                {activeProfile && <StatusChip status={activeProfile.status} />}
                <Divider />
                <Typography variant="h3">Linked Schemes</Typography>
                {activeProfile?.schemes.map((scheme) => (
                  <Box key={scheme} className="scheme-row">
                    <Box>
                      <Typography variant="h4">{scheme}</Typography>
                      <Typography color="text.secondary">
                        Eligibility score: 92% · Service ledger verified
                      </Typography>
                    </Box>
                    <StatusChip status={activeProfile.status} />
                  </Box>
                ))}
                <Divider />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => requestStatusChange('APPROVED')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => requestStatusChange('PENDING')}
                  >
                    Mark Pending
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => requestStatusChange('REJECTED')}
                  >
                    Reject
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {!activeProfile && !error ? (
        <Card>
          <CardContent>
            <Typography>No beneficiaries available for validation.</Typography>
          </CardContent>
        </Card>
      ) : null}

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast('')}
        message={toast}
      />

      <Dialog open={confirm.open} onClose={() => setConfirm({ open: false, status: null })}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to set the status to {confirm.status}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm({ open: false, status: null })}>Cancel</Button>
          <Button variant="contained" onClick={confirmStatusChange}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Eligibility;
