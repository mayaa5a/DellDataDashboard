import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {

    return (
        <div className = "sidebar-container">
            <p className="text">Sidebar Analytics</p>
            <p className="text">Filter</p>
            <p className="text">Favorites?</p>
        </div>
    )
}

export default Sidebar; 