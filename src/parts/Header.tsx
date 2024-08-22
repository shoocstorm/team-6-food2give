import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import '../assets/css/header.css'; // Import the CSS file

interface HeaderProps {
  title: string;
  onButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onButtonClick }) => {
  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" className="header-title">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
