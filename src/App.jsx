import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './App.css';

const App = () => {

  return (
   
    <div className="app-container">
    
    <Router>  


        <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard/>} /> 
            <Route path="/reports" element={<Reports/>} /> 
            <Route path="/settings" element={<Settings/>} />
          
           
          </Routes>
     
    </Router>
    <Sidebar/>
   
    </div>
    
  );
};

export default App;
