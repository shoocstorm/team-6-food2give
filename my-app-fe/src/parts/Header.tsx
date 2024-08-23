import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import '../assets/css/header.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    setDrawerOpen(false); // Close drawer after navigation
  };

  return (
    <Box>
      <AppBar position="static" className="header-appbar">
        <Toolbar className="header-toolbar">
          <Typography variant="h6" className="header-title">
            {title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className="header-menu-icon"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List className="drawer-list">
          <ListItem button onClick={() => handleMenuItemClick('/beneficiary')}>
            <ListItemText primary="Beneficiary" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/volunteer')}>
            <ListItemText primary="Volunteer" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/organization')}>
            <ListItemText primary="Organization" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/donor')}>
            <ListItemText primary="Donors" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
