import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DataCard from '../components/DataCard';
import Chart from '../components/Chart'


const Dashboard = () => {

       {/*using fake summary data here as a placeholder, will replace with mock data*/}
      const summaryData = [
        { title: "Total Budget", value: "$250,000" },
        { title: "Average ROI", value: "65%" },
        { title: "Projects at Risk", value: 3 }
      ];

      return (
        <div>
            <Navbar/> 
            <Sidebar />
            
            <div className="dashboard-home"> 
            <h1>We are in the dashboard</h1>
                <div className="card-container">
                    {/* Tlooping through each object in summaryData array and returns a new array of React components */}
                     {summaryData.map((item, index) => (
                      <DataCard key={index} title={item.title} value={item.value} />
                    ))}
                </div>

              <Chart/>       
            
            </div>

        </div>
  );

};

export default Dashboard;