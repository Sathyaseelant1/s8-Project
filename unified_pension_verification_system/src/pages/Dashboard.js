import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import InfoCard from '../components/ui/InfoCard';
import { fetchPensioners } from '../services/apiService';

const formatCount = (value) => new Intl.NumberFormat('en-IN').format(value || 0);

const normalizeStateName = (value = '') => {
  const cleaned = value.trim().replace(/\s+/g, ' ');
  if (!cleaned) return null;
  return cleaned.replace(/\b\w/g, (ch) => ch.toUpperCase());
};

const knownSchemeAbbreviations = {
  'Tamil Nadu Assured Pension Scheme': 'TAPS',
  'Old Age Pension Scheme': 'OAPS',
  'Destitute Widow Pension Scheme': 'DWPS',
  'Sandhya Suraksha Yojane': 'SSY',
  'Manaswini Pension Scheme': 'MPS',
  'Mythri Pension Scheme': 'MYPS',
  'Agriculture Labour Pension': 'ALP',
  'Widow Pension': 'WP',
  'Sthree Suraksha Scheme': 'SSS',
  'Unified Pension Scheme (UPS)': 'UPS',
  'National Pension System (NPS)': 'NPS',
  'Atal Pension Yojana (APY)': 'APY',
  "Employees' Pension Scheme (EPS)": 'EPS',
};

const toSchemeShortLabel = (name = '') => {
  if (knownSchemeAbbreviations[name]) return knownSchemeAbbreviations[name];

  const match = name.match(/\(([^)]+)\)/);
  if (match?.[1]) return match[1].trim();

  const acronym = name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .join('');
  return acronym || name;
};

const monthKey = (dateString) => {
  if (!dateString) return null;
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const monthLabel = (key) => {
  const [year, month] = key.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleString('en-IN', {
    month: 'short',
    year: '2-digit',
  });
};

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    fetchPensioners()
      .then((data) => {
        if (mounted) {
          setRows(data);
          setError('');
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Failed to load dashboard data');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const {
    summaryStats,
    schemeDistribution,
    stateCounts,
    monthlyVerifications,
  } = useMemo(() => {
    const byUid = new Map();
    const schemeMap = new Map();
    const schemeStateMap = new Map();
    const stateMap = new Map();
    const monthMap = new Map();
    let verifiedCount = 0;
    let pendingCount = 0;

    rows.forEach((row) => {
      byUid.set(row.uid, (byUid.get(row.uid) || 0) + 1);

      const scheme = row.schemes?.[0] || 'Unknown';
      schemeMap.set(scheme, (schemeMap.get(scheme) || 0) + 1);
      const stateName = normalizeStateName(row.state || '');
      if (!stateName) return;

      const stateCountsForScheme = schemeStateMap.get(scheme) || new Map();
      stateCountsForScheme.set(
        stateName,
        (stateCountsForScheme.get(stateName) || 0) + 1
      );
      schemeStateMap.set(scheme, stateCountsForScheme);

      const currentState = stateMap.get(stateName) || { total: 0, active: 0 };
      const nextState = {
        total: currentState.total + 1,
        active: currentState.active + (row.active ? 1 : 0),
      };
      stateMap.set(stateName, nextState);

      const status = String(row.status || '').toUpperCase();
      if (status === 'APPROVED' || status === 'VERIFIED') verifiedCount += 1;
      if (status === 'PENDING') pendingCount += 1;

      const key = monthKey(row.lastVerificationDate || row.startDate);
      if (key) monthMap.set(key, (monthMap.get(key) || 0) + 1);
    });

    const duplicateGroups = [...byUid.values()].filter((count) => count > 1).length;

    const stats = [
      {
        id: 'total',
        label: 'Total Beneficiaries',
        value: formatCount(rows.length),
        change: 'Live',
      },
      {
        id: 'duplicates',
        label: 'Duplicate Cases Detected',
        value: formatCount(duplicateGroups),
        change: 'Live',
      },
      {
        id: 'verified',
        label: 'Verified Pensioners',
        value: formatCount(verifiedCount),
        change: 'Live',
      },
      {
        id: 'pending',
        label: 'Pending Reviews',
        value: formatCount(pendingCount),
        change: 'Live',
      },
    ];

    const schemeData = [...schemeMap.entries()]
      .map(([name, value]) => {
        const stateCountsForScheme = schemeStateMap.get(name) || new Map();
        const topStates = [...stateCountsForScheme.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 2)
          .map(([state]) => state)
          .join(', ');

        return { name, value, topStates: topStates || 'N/A' };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    const statesData = [...stateMap.entries()]
      .map(([state, counts]) => ({
        state,
        total: counts.total,
        active: counts.active,
      }))
      .sort((a, b) => b.total - a.total);

    const monthData = [...monthMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12)
      .map(([key, value]) => ({
        month: monthLabel(key),
        value,
      }));

    return {
      summaryStats: stats,
      schemeDistribution: schemeData,
      stateCounts: statesData,
      monthlyVerifications: monthData,
    };
  }, [rows]);

  return (
    <Stack spacing={3}>
      <Box className="page-hero">
        <Typography variant="h2">National Verification Command Center</Typography>
        <Typography color="text.secondary">
          Real-time intelligence for pension verification across central and state schemes.
        </Typography>
      </Box>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Grid container spacing={2.5} sx={{ m: 0, width: '100%' }}>
        {summaryStats.map((stat, index) => (
          <Grid item xs={12} md={3} key={stat.id}>
            <InfoCard
              title={stat.label}
              value={stat.value}
              change={stat.change}
              accent={index === 1 ? 'warning' : index === 3 ? 'info' : 'success'}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5} sx={{ m: 0, width: '100%' }}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Scheme-wise distribution
            </Typography>
            {loading ? (
              <Stack sx={{ height: 260 }} alignItems="center" justifyContent="center">
                <CircularProgress size={28} />
              </Stack>
            ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={schemeDistribution}>
                <XAxis
                  dataKey="name"
                  tickFormatter={toSchemeShortLabel}
                  interval={0}
                  angle={0}
                  textAnchor="middle"
                  tickMargin={15}
                  height={40}
                />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value, 'Count']}
                  labelFormatter={(label, payload) => {
                    const topStates = payload?.[0]?.payload?.topStates || 'N/A';
                    return `Scheme: ${label} | State: ${topStates}`;
                  }}
                />
                <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              State-wise coverage
            </Typography>
            <List>
              {stateCounts.map((state) => (
                <ListItem key={state.state} divider>
                  <ListItemText
                    primary={state.state}
                    secondary={`Active: ${state.active} / Total: ${state.total}`}
                  />
                  <Typography sx={{ fontWeight: 700 }}>{state.active}</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Monthly verifications
        </Typography>
        {loading ? (
          <Stack sx={{ height: 240 }} alignItems="center" justifyContent="center">
            <CircularProgress size={28} />
          </Stack>
        ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyVerifications}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
        )}
      </Paper>
    </Stack>
  );
};

export default Dashboard;
