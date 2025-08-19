import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


const Dashboard = () => {

      return (
        <div>
            <Navbar/> 
            <Sidebar />
            <h1>We are in the dashboard</h1>
        </div>
  );

}

export default Dashboard;