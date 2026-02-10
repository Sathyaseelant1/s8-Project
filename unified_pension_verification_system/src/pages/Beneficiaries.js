import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import StatusChip from '../components/ui/StatusChip';
import { fetchPensioners } from '../services/apiService';

const Beneficiaries = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    scheme: '',
    status: '',
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPensioners()
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
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredRows = useMemo(() => {
    const search = query.toLowerCase();
    return rows.filter((row) => {
      const matchesSearch =
        row.name.toLowerCase().includes(search) ||
        row.uid.toLowerCase().includes(search);
      const matchesState = filters.state ? row.state === filters.state : true;
      const matchesScheme = filters.scheme
        ? row.schemes.includes(filters.scheme)
        : true;
      const matchesStatus = filters.status ? row.status === filters.status : true;
      return matchesSearch && matchesState && matchesScheme && matchesStatus;
    });
  }, [query, rows, filters]);

  const states = Array.from(new Set(rows.map((row) => row.state))).sort();
  const schemes = Array.from(
    new Set(rows.flatMap((row) => row.schemes))
  ).sort();
  const statuses = Array.from(new Set(rows.map((row) => row.status))).sort();

  const columns = [
    { field: 'name', headerName: 'Citizen Name', flex: 1.2 },
    { field: 'uid', headerName: 'Unique ID', flex: 1 },
    {
      field: 'schemes',
      headerName: 'Scheme(s)',
      flex: 1.4,
      valueGetter: (params) => params.row.schemes.join(', '),
    },
    { field: 'state', headerName: 'State', flex: 0.8 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
  ];

  return (
    <Stack spacing={2}>
      <Box className="page-hero">
        <Typography variant="h2">Unified Beneficiary Database</Typography>
        <Typography color="text.secondary">
          Search, filter, and triage pension beneficiaries across schemes.
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField
          fullWidth
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
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setFilterOpen(true)}
        >
          Filters
        </Button>
      </Stack>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Typography variant="body2" color="text.secondary">
        Showing {filteredRows.length} result{filteredRows.length === 1 ? '' : 's'}
      </Typography>

      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          disableRowSelectionOnClick
          loading={loading}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            borderColor: 'divider',
          }}
        />
      </Box>

      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <Box sx={{ width: 320, p: 3 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Advanced Filters
          </Typography>
          <Stack spacing={2}>
            <TextField
              select
              label="State"
              value={filters.state}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, state: event.target.value }))
              }
              fullWidth
            >
              <MenuItem value="">All States</MenuItem>
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Scheme"
              value={filters.scheme}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, scheme: event.target.value }))
              }
              fullWidth
            >
              <MenuItem value="">All Schemes</MenuItem>
              {schemes.map((scheme) => (
                <MenuItem key={scheme} value={scheme}>
                  {scheme}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              value={filters.status}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, status: event.target.value }))
              }
              fullWidth
            >
              <MenuItem value="">All Statuses</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={() => setFilterOpen(false)}>
              Apply Filters
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={() =>
                setFilters({
                  state: '',
                  scheme: '',
                  status: '',
                })
              }
            >
              Clear All
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Stack>
  );
};

export default Beneficiaries;
