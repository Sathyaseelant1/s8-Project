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
import { NavLink, useNavigate } from 'react-router-dom';
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
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

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
                color: '#0D2250',
                '&.active': {
                  bgcolor: '#DBEAFE',
                  color: '#3B82F6',
                  '& .MuiListItemIcon-root': { color: '#3B82F6' },
                },
                '&:hover': {
                  bgcolor: 'rgba(30, 64, 175, 0.25)',
                  color: '#0D2250',
                  '& .MuiListItemIcon-root': { color: '#0d2250' },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#0d2250', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
      </List>

      <Box sx={{ mt: 'auto', px: 2 }}>
        <Typography variant="caption" color="#0d2250" sx={{ display: 'block', mb: 1 }}>
          Access
        </Typography>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: '#0d2250',
            '&:hover': { bgcolor: 'rgba(148, 163, 184, 0.15)', color: '#0d2250' },
          }}
        >
          <ListItemIcon sx={{ color: '#0d2250', minWidth: 40 }}>
            <LoginOutlinedIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Log Out" />}
        </ListItemButton>
      </Box>
    </Stack>
  );
};

export default SidebarNav;
