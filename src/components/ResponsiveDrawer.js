import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar
} from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AddCircleOutline, SubjectOutlined } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { format } from 'date-fns';
import { useMediaQueries } from '../helpers/useMediaQueries';

const drawerWidth = 240;
const mobileDrawerWidth = 220;

const ResponsiveDrawer = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isMatched = useMediaQueries('sm');
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <SubjectOutlined color='secondary' />,
      path: '/dashboard'
    },
    {
      text: 'Add Todo',
      icon: <AddCircleOutline color='secondary' />,
      path: '/create'
    }
  ];

  const capitaliseUsername = () => {
    const name = user.displayName.slice(0, 5);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const drawer = (
    <div>
      <div>
        <Typography align='center' sx={{ p: 3 }} variant='h5'>
          My To-do's
        </Typography>
      </div>
      {/* list / links */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={
              location.pathname === item.path ? { background: '#f4f4f4' } : null
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        elevation={0}
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={isMatched ? { display: 'none' } : { flexGrow: 1 }}>
            {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography sx={isMatched ? { display: 'none' } : ''}>
            Welcome, {capitaliseUsername()}
          </Typography>
          <Avatar
            src={user.photoURL}
            sx={isMatched ? { display: 'none' } : { ml: 1.5 }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: mobileDrawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          padding: { sm: '10px', lg: 3 },
          flexGrow: 1,
          // p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />

        {children}
        <Outlet />
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
