import {
  Box,
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
import { getDashboardData } from '../services/mockDataService';

const { schemeDistribution, monthlyVerifications, stateCounts, summaryStats } =
  getDashboardData();

const Dashboard = () => {
  return (
    <Stack spacing={3}>
      <Box className="page-hero">
        <Typography variant="h2">National Verification Command Center</Typography>
        <Typography color="text.secondary">
          Real-time intelligence for pension verification across central and state schemes.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
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

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Scheme-wise distribution
            </Typography>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={schemeDistribution}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
                  <ListItemText primary={state.state} secondary="Active beneficiaries" />
                  <Typography sx={{ fontWeight: 700 }}>{state.count}</Typography>
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
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyVerifications}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Stack>
  );
};

export default Dashboard;
