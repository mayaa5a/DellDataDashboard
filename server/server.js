//importing required libraries
//loading express library - framework for making api's 
//loading cors middleware - lets frontend (react) talk to backend (dif port)
const express = require('express');
const cors = require('cors');

const path = require('path');
const fs = require('fs');

//creating an express app - used to define routes 
const app = express();
//enables cors for all routes (to prevent frontend from potentially getting blocked when fetching data)
app.use(cors());
//tells express to automatically parse json data 
app.use(express.json());


//load and normalize data 
const dataPath = path.join(__dirname, 'data', 'projects.json');
const raw = fs.readFileSync(dataPath, 'utf-8');
//converts json string into real js object 
let projects = JSON.parse(raw);

//helper methods 


//budget parsing 
const parseBudget = (b) => {
    if (typeof b === 'number') return b; 
    if (!b) return 0; 
    //now changing string to number 
    return Number(String(b).replace(/[^0-9.-]+/g, '')) || 0; 
};

const parseDateToISO = (d) => {
    if (!d) return null; 
    // Accept "DD.MM.YYYY" or "DD/MM/YYYY" or ISO
    if (d.includes('.')){
        const [dd, mm, yyyy] = d.split('.'); 
        return new Date(Number(yyyy), Number(mm) - 1, Number(dd)).toISOString();
    }
    if (d.includes('/')){
        const [dd, mm, yyyy] = d.split('/'); 
        return new Date(Number(yyyy), Number(mm) - 1, Number(dd)).toISOString();
    }
    //fallback 
     const dt = new Date(d);
     return isNaN(dt) ? null : dt.toISOString();
};


