import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Avatar,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AssignmentIcon from '@mui/icons-material/Assignment';
//import { styled } from '@mui/material/styles';
import '../styles/Navbar.css'; // Import the CSS file

const Header = ({ isLoggedIn, onLogout }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        onLogout();
        handleMenuClose();
    };

   const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'About', icon: <InfoIcon />, path: '/about' },
        { text: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
        { text: 'Apply for Job', icon: <AssignmentIcon />, path: '/apply-job' },
   ];

   const menuId = 'primary-account-menu';
   const renderMenu = (
       <Menu
           anchorEl={anchorEl}
           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
           id={menuId}
           keepMounted
           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
           open={Boolean(anchorEl)}
           onClose={handleMenuClose}
       >
           {isLoggedIn ? (
               <>
                   <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                       Profile
                   </MenuItem>
                   <MenuItem onClick={handleLogout}>Logout</MenuItem>
               </>
           ) : (
               <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                   Login
               </MenuItem>
           )}
       </Menu>
   );

   const drawer = (
       <Box
           sx={{ width: 250 }}
           role="presentation"
           onClick={() => setDrawerOpen(false)}
           onKeyDown={() => setDrawerOpen(false)}
       >
           <List>
               {menuItems.map((item) => (
                   <ListItem button key={item.text} component={Link} to={item.path}>
                       <ListItemIcon>{item.icon}</ListItemIcon>
                       <ListItemText primary={item.text} />
                   </ListItem>
               ))}
           </List>
       </Box>
   );

   return (
       <AppBar position="static" className="navbar-container">
           <Toolbar>
               <Typography variant="h6" className="navbar-logo">
                   JOB PORTAL
               </Typography>

               {isMobile ? (
                   <>
                       <IconButton
                           size="large"
                           edge="start"
                           color="inherit"
                           aria-label="menu"
                           onClick={() => setDrawerOpen(true)}
                       >
                           <MenuIcon />
                       </IconButton>
                       <Drawer
                           anchor="left"
                           open={drawerOpen}
                           onClose={() => setDrawerOpen(false)}
                       >
                           {drawer}
                       </Drawer>
                   </>
               ) : (
                   <Box sx={{ display: 'flex' }}>
                       {menuItems.map((item) => (
                           <Button
                               key={item.text}
                               color="inherit"
                               component={Link}
                               to={item.path}
                               className="navbar-menu-item"
                               startIcon={item.icon}
                           >
                               {item.text}
                           </Button>
                       ))}
                   </Box>
               )}

               <IconButton
                   size="large"
                   edge="end"
                   aria-label="account of current user"
                   aria-controls={menuId}
                   aria-haspopup="true"
                   onClick={handleProfileMenuOpen}
                   color="inherit"
                   className="navbar-profile-icon"
               >
                   {isLoggedIn ? (
                       <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>U</Avatar>
                   ) : (
                       <AccountCircleIcon />
                   )}
               </IconButton>
           </Toolbar>
           {renderMenu}
       </AppBar>
   );
};

export default Header;
