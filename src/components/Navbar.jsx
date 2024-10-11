import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
       
        <Button color="inherit" component={Link} to="/users" className="navbar-button">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/task-lists" className="navbar-button">
          Task Lists
        </Button>
        <Button color="inherit" component={Link} to="/tasks" className="navbar-button">
          Tasks
        </Button>
        <Button color="inherit" onClick={onLogout} className="navbar-logout">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;