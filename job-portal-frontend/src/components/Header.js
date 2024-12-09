import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Avatar,
  Drawer, List, ListItem, ListItemText, ListItemIcon, Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import { useUserContext } from './UserContext';
import '../styles/Navbar.css';

const Header = () => {
  const { user, clearUser } = useUserContext();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    clearUser();
    navigate('/login', { replace: true });
  };

  // Role-Based Menu Items
  const getMenuItems = () => {
    const sharedLinks = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'About Us', icon: <InfoIcon />, path: '/about' },
      { text: 'Contact Us', icon: <ContactMailIcon />, path: '/contact' }
    ];

    const roleBasedLinks = {
      user: [
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
        { text: 'Job Listings', icon: <WorkIcon />, path: '/JobList' },
        { text: 'Recommended jobs', icon: <WorkIcon />, path: '/JobRecommendations' }
      ],
      recruiter: [
        { text: 'Applications', icon: <WorkIcon />, path: '/JobApplicationsList' },
        { text: 'Recruiter Dashboard', icon: <DashboardIcon />, path: '/recruiter-dashboard' }
      ],
      hr: [
        { text: 'Create Job', icon: <CreateIcon />, path: '/JobPostForm' },
        { text: 'Jobs Posted', icon: <WorkIcon />, path: '/JobApplicationsList' },
        //{ text: 'Create Notification', icon: <CreateIcon />, path: '/create' }
        { text: 'Add Company', icon: <WorkIcon />, path: '/CompanyForm' },
      ]
    };

    return [...sharedLinks, ...(roleBasedLinks[user?.role] || [])];
  };

  return (
    <AppBar position="static" className="navbar-container">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, marginLeft: 2, color: '#eeeeee', fontWeight: 'bold' }}
        >
          WorkWaves
        </Typography>

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          color="inherit"
          onClick={() => navigate('/profile')}
        >
          {user?.name ? (
            <Avatar sx={{ bgcolor: '#457b9d' }}>{user.name[0]}</Avatar>
          ) : (
            <AccountCircleIcon />
          )}
        </IconButton>
      </Toolbar>

      {/* Drawer for Mobile View */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          <List>
            {getMenuItems().map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
