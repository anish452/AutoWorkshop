import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Drawer, AppBar, Toolbar, Typography, IconButton, Avatar,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Divider, Menu, MenuItem, Tooltip, Badge, useMediaQuery, useTheme as useMuiTheme,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon, Dashboard, People, DirectionsCar, Work, AdminPanelSettings,
  Business, Brightness4, Brightness7, Logout, Person,
  ChevronLeft
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { ROLE_LABELS, isDepartmentRole } from '../utils/helpers';

const DRAWER_WIDTH = 240;

const getNavItems = (role) => {
  const items = [];

  if (role === 'ADMIN') {
    items.push(
      { label: 'Users', icon: <AdminPanelSettings />, path: '/users' },
      { label: 'Departments', icon: <Business />, path: '/departments' },
      { label: 'Customers', icon: <People />, path: '/customers' },
      { label: 'Vehicles', icon: <DirectionsCar />, path: '/vehicles' },
    );
  } else if (role === 'JOB_ADVISOR') {
    items.push(
      { label: 'Customers', icon: <People />, path: '/customers' },
      { label: 'Vehicles', icon: <DirectionsCar />, path: '/vehicles' },
    );
  } else if (role === 'CUSTOMER') {
    items.push(
      { label: 'My Jobs', icon: <Dashboard />, path: '/dashboard/customer' },
      { label: 'Jobs', icon: <Work />, path: '/jobs' },
    );
  } else if (isDepartmentRole(role)) {
    items.push(
      { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard/department' },
      { label: 'Jobs', icon: <Work />, path: '/jobs' },
    );
  }

  return items;
};

export default function MainLayout() {
  const { user, role, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);

  const navItems = getNavItems(role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 64 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: 2,
          background: 'linear-gradient(135deg, #1976D2, #0D47A1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <DirectionsCar sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        {open && (
          <Box>
            <Typography variant="subtitle1" fontWeight={700} fontFamily="Space Grotesk" lineHeight={1.2}>
              AutoRepair
            </Typography>
            <Typography variant="caption" color="text.secondary" lineHeight={1}>Agent</Typography>
          </Box>
        )}
      </Box>

      <Divider />

      <List sx={{ flex: 1, pt: 1 }}>
        {navItems.map(item => (
          <ListItem key={`${item.path}-${item.label}`} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
              onClick={() => { navigate(item.path); if (isMobile) setOpen(false); }}
              sx={{
                mx: 1, borderRadius: 2,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(25,118,210,0.15), rgba(13,71,161,0.1))',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <Box sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1, borderRadius: 2, bgcolor: 'action.hover' }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.75rem' }}>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
          {open && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Chip label={ROLE_LABELS[role] || role} size="small" color="primary" sx={{ height: 16, fontSize: '0.65rem' }} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="fixed" elevation={0} sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => setOpen(o => !o)} sx={{ mr: 2 }}>
            {open && !isMobile ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" fontFamily="Space Grotesk" fontWeight={700} sx={{ flexGrow: 1 }}>
            AutoRepairAgent
          </Typography>
          <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton onClick={toggleTheme}>
              {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>
          <IconButton onClick={e => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: '0.8rem' }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile'); }}>
              <Person fontSize="small" sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      {isMobile ? (
        <Drawer variant="temporary" open={open} onClose={() => setOpen(false)}
          sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}>
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer variant="permanent" open={open}
          sx={{
            width: open ? DRAWER_WIDTH : 72,
            flexShrink: 0,
            transition: 'width 0.2s',
            '& .MuiDrawer-paper': {
              width: open ? DRAWER_WIDTH : 72,
              transition: 'width 0.2s',
              overflow: 'hidden',
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}>
          <Toolbar />
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, mt: 8, minWidth: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
