import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <Link className="nav-text" to="/dashboard">Dashboard</Link> 
      <Link className="nav-text" to="/reports">Reports</Link> 
      <Link className="nav-text" to="/settings">Settings</Link>
    </nav>
  );
};

export default Navbar;
