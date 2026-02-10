import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { fetchDuplicateGroups } from '../services/apiService';

const Duplicates = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => {
    let mounted = true;
    fetchDuplicateGroups()
      .then((data) => {
        if (mounted) {
          setRows(data);
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

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openCompare = (row) => {
    setSelected(row);
  };

  const closeCompare = () => {
    setSelected(null);
  };

  const handleViewMode = (event, nextMode) => {
    if (nextMode) {
      setViewMode(nextMode);
    }
  };

  return (
    <Stack spacing={2.5}>
      <Box className="page-hero">
        <Typography variant="h2">Duplicate Beneficiary Detection</Typography>
        <Typography color="text.secondary">
          High-risk cases with overlapping schemes and identifiers.
        </Typography>
      </Box>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {rows.length === 0 && !error ? (
        <Card>
          <CardContent>
            <Typography>No duplicate cases found in the current dataset.</Typography>
          </CardContent>
        </Card>
      ) : null}

      <Stack spacing={2}>
        {rows.map((row) => (
          <Card key={row.id} className="warning-card">
            <CardContent>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                justifyContent="space-between"
              >
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <WarningAmberOutlinedIcon color="error" />
                    <Typography variant="h3">{row.name}</Typography>
                  </Stack>
                  <Typography color="text.secondary">
                    UID: {row.uid} · {row.state} · {row.count} record(s)
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {row.schemes.map((scheme) => (
                      <Chip key={scheme} label={scheme} variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton onClick={() => toggleExpand(row.id)}>
                    {expanded[row.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  <Button variant="outlined" onClick={() => openCompare(row)}>
                    Compare Records
                  </Button>
                  <Button variant="contained" color="warning">
                    Send for Review
                  </Button>
                </Stack>
              </Stack>
              <Collapse in={expanded[row.id]} timeout="auto" unmountOnExit>
                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  {row.records.map((record) => (
                    <Box key={record.id} className="scheme-row">
                      <Box>
                        <Typography variant="h4">{record.fullName}</Typography>
                        <Typography color="text.secondary">
                          {record.pensionScheme} · {record.state}
                        </Typography>
                      </Box>
                      <Chip
                        label={record.active ? 'Active' : 'Inactive'}
                        color={record.active ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  ))}
                </Stack>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={Boolean(selected)} onClose={closeCompare} maxWidth="lg" fullWidth>
        <DialogTitle>Duplicate Record Comparison</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Stack spacing={2}>
              <Typography color="text.secondary">
                Aadhaar: {selected.uid} · {selected.state} · {selected.count} record(s)
              </Typography>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewMode}
                size="small"
              >
                <ToggleButton value="cards">Side-by-side</ToggleButton>
                <ToggleButton value="table">Table view</ToggleButton>
              </ToggleButtonGroup>
              {viewMode === 'cards' ? (
                <Box className="compare-scroll">
                  {selected.records.map((record) => (
                    <Box key={record.id} className="compare-card">
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {record.fullName}
                      </Typography>
                      <Typography color="text.secondary">
                        Scheme: {record.pensionScheme}
                      </Typography>
                      <Typography color="text.secondary">
                        State: {record.state}
                      </Typography>
                      <Typography color="text.secondary">
                        Status: {record.active ? 'Active' : 'Inactive'}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box className="compare-table">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Scheme</TableCell>
                        <TableCell>State</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selected.records.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.fullName}</TableCell>
                          <TableCell>{record.pensionScheme}</TableCell>
                          <TableCell>{record.state}</TableCell>
                          <TableCell>{record.active ? 'Active' : 'Inactive'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
              <Typography variant="body2" color="text.secondary">
                Tip: Scroll horizontally to view all records side-by-side without shrinking cards.
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCompare}>Close</Button>
          <Button variant="contained" color="warning">
            Send for Review
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Duplicates;
