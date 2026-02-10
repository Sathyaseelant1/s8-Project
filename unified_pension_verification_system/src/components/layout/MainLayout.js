import { useMemo, useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SidebarNav from '../navigation/SidebarNav';
import BreadcrumbsBar from '../navigation/BreadcrumbsBar';

const drawerWidth = 260;
const collapsedWidth = 84;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role } = useAuth();
  const location = useLocation();

  const drawerSize = useMemo(
    () => (collapsed ? collapsedWidth : drawerWidth),
    [collapsed]
  );

  const toggleCollapse = () => setCollapsed((prev) => !prev);
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleMobile}
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Unified Pension Verification System
              </Typography>
              <Typography variant="body2" color="text.secondary">
                One Nation · One Citizen · One Pension
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
            <Badge color="error" variant="dot">
              <NotificationsOutlinedIcon />
            </Badge>
            <Avatar sx={{ bgcolor: 'primary.main' }}>GA</Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerSize,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerSize,
            overflowX: 'hidden',
            transition: 'width 0.2s ease',
          },
        }}
      >
        <Box sx={{ height: 72, display: 'flex', alignItems: 'center', px: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ bgcolor: '#1E40AF', width: 38, height: 38 }}>UP</Avatar>
            {!collapsed && (
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  UPVS Command
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  v2.1 Pilot
                </Typography>
              </Box>
            )}
          </Stack>
          <IconButton
            onClick={toggleCollapse}
            sx={{ marginLeft: 'auto', color: '#E2E8F0' }}
          >
            {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Box>
        <SidebarNav collapsed={collapsed} />
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobile}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        <SidebarNav />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: { xs: 2, md: 3 },
          mt: '72px',
          ml: { md: `${drawerSize}px` },
          transition: 'margin 0.2s ease',
        }}
      >
        <BreadcrumbsBar pathname={location.pathname} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
