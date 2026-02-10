import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navConfig = [
  {
    label: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    to: '/dashboard',
    roles: ['Central Admin', 'State Officer', 'Verification Officer'],
  },
  {
    label: 'Beneficiaries',
    icon: <PeopleAltOutlinedIcon />,
    to: '/beneficiaries',
    roles: ['Central Admin', 'State Officer', 'Verification Officer'],
  },
  {
    label: 'Duplicate Detection',
    icon: <WarningAmberOutlinedIcon />,
    to: '/duplicates',
    roles: ['Central Admin', 'State Officer'],
  },
  {
    label: 'Eligibility',
    icon: <FactCheckOutlinedIcon />,
    to: '/eligibility',
    roles: ['Central Admin', 'Verification Officer'],
  },
  {
    label: 'Coordination',
    icon: <HubOutlinedIcon />,
    to: '/coordination',
    roles: ['Central Admin', 'State Officer'],
  },
  {
    label: 'Audit Logs',
    icon: <TimelineOutlinedIcon />,
    to: '/audit-logs',
    roles: ['Central Admin', 'State Officer', 'Verification Officer'],
  },
];

const SidebarNav = ({ collapsed = false }) => {
  const { role } = useAuth();

  return (
    <Stack sx={{ height: '100%', pb: 3 }}>
      <List sx={{ px: 2 }}>
        {navConfig
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.to}
              sx={{
                mb: 1,
                borderRadius: 2,
                color: '#94A3B8',
                '&.active': {
                  bgcolor: '#1E40AF',
                  color: '#FFFFFF',
                  '& .MuiListItemIcon-root': { color: '#FFFFFF' },
                },
                '&:hover': {
                  bgcolor: 'rgba(30, 64, 175, 0.25)',
                  color: '#FFFFFF',
                  '& .MuiListItemIcon-root': { color: '#FFFFFF' },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#94A3B8', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
      </List>

      <Box sx={{ mt: 'auto', px: 2 }}>
        <Typography variant="caption" color="#94A3B8" sx={{ display: 'block', mb: 1 }}>
          Access
        </Typography>
        <ListItemButton
          component={NavLink}
          to="/login"
          sx={{
            borderRadius: 2,
            color: '#94A3B8',
            '&:hover': { bgcolor: 'rgba(148, 163, 184, 0.15)', color: '#FFFFFF' },
          }}
        >
          <ListItemIcon sx={{ color: '#94A3B8', minWidth: 40 }}>
            <LoginOutlinedIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Switch Role" />}
        </ListItemButton>
      </Box>
    </Stack>
  );
};

export default SidebarNav;
