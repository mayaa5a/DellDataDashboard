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


//normalizing useful fields

//creating a new project array with all the original contents copied over
projects = projects.map((p, idx) => ({
    //assigning new id 
    id: idx + 1, 
    //copying all the properties from an existing object to a new one
    ...p, 
    budget_num: parseBudget(p.budget),
    date_assigned_iso: parseDateToISO(p.date_assigned),
    projected_finish_iso: parseDateToISO(p.projected_finish),
}));

//ROUTES 

//health check in
//ensuring the server is up and running 
//listening for HTTP GET requests at /api/health url
app.get('/api/health', (req, res) => {
    //setting HTTP response status code to 200 ok
    res.json({ok: true});
}); 


//creating variables representing filters or options you might pass in a request
// All projects with basic filtering, sorting, pagination
app.get('/api/projects', (req, res) => {
  const {
    q,
    status,
    priority,
    sales_rep,
    min_roi,
    max_roi,
    min_accuracy,
    max_accuracy,
    cpu_gte,
    gpu_gte,
    completion_gte,
    from, // ISO or DD.MM.YYYY
    to,   // ISO or DD.MM.YYYY
    sort = 'date_assigned_iso',
    order = 'asc',
    page = 1,
    limit = 25
  } = req.query;

  const asNum = (v) => (v === undefined ? undefined : Number(v));
  const fromISO = parseDateToISO(from);
  const toISO = parseDateToISO(to);
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  let rows = [...projects];

   if (q) {
    const needle = String(q).toLowerCase();
    rows = rows.filter(r =>
      String(r.project_name || '').toLowerCase().includes(needle) ||
      String(r.sales_rep || '').toLowerCase().includes(needle)
    );
  }

  if (status) rows = rows.filter(r => String(r.status).toLowerCase() === String(status).toLowerCase());
  if (priority) rows = rows.filter(r => String(r.priority).toLowerCase() === String(priority).toLowerCase());
  if (sales_rep) rows = rows.filter(r => String(r.sales_rep).toLowerCase() === String(sales_rep).toLowerCase());

  const roiMin = asNum(min_roi);
  const roiMax = asNum(max_roi);
  if (!isNaN(roiMin)) rows = rows.filter(r => Number(r.roi) >= roiMin);
  if (!isNaN(roiMax)) rows = rows.filter(r => Number(r.roi) <= roiMax);

  const accMin = asNum(min_accuracy);
  const accMax = asNum(max_accuracy);
  if (!isNaN(accMin)) rows = rows.filter(r => Number(r.model_accuracy) >= accMin);
  if (!isNaN(accMax)) rows = rows.filter(r => Number(r.model_accuracy) <= accMax);

   const cpuMin = asNum(cpu_gte);
  if (!isNaN(cpuMin)) rows = rows.filter(r => Number(r.cpu_usage) >= cpuMin);

  const gpuMin = asNum(gpu_gte);
  if (!isNaN(gpuMin)) rows = rows.filter(r => Number(r.gpu_usage) >= gpuMin);

  const compMin = asNum(completion_gte);
  if (!isNaN(compMin)) rows = rows.filter(r => Number(r.percent_completion) >= compMin);

  if (fromISO) rows = rows.filter(r => !r.date_assigned_iso || r.date_assigned_iso >= fromISO);
  if (toISO) rows = rows.filter(r => !r.projected_finish_iso || r.projected_finish_iso <= toISO);

  //Sorting
  rows.sort((a, b) => {
    const A = a[sort];
    const B = b[sort];
    if (A === undefined) return 1;
    if (B === undefined) return -1;
    if (A < B) return order === 'asc' ? -1 : 1;
    if (A > B) return order === 'asc' ? 1 : -1;
    return 0;
  });

  //Dividing Info into Pages 
  const total = rows.length;
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  const pageRows = rows.slice(start, end);

  res.json({
    total,
    page: pageNum,
    limit: limitNum,
    results: pageRows
  });
});

//calculating summary metrics for the dashboard 
app.get('/api/summary', (req, res) => {
    const count = projects.length; 
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget_num  || 0), 0);
    const avgROI = projects.reduce((sum, p) => sum + (Number(p.roi) || 0), 0) / Math.max(1, count); 
    const avgAcc = projects.reduce((sum, p) => sum + (Number(p.model_accuracy) || 0), 0) / Math.max(1, count);


    //counts totals by status or priority 
    const byStatus = {};
    const byPriority = {};
    for (const p of projects){
        byStatus[p.status] = (byStatus[p.status] || 0) + 1; 
        byPriority[p.priority] = (byPriority[p.priority] || 0) + 1;
    }

    //simple alerts 
    
    const alerts = projects.filter(p =>
        (String(p.status).toLowerCase() === 'at risk') ||
        (Number(p.cpu_usage) >= 90) ||
        (Number(p.gpu_usage) >= 90) ||
        (Number(p.percent_completion) < 50)
    ).length;

    res.json({
        total_projects: count,
        total_budget: Math.round(totalBudget * 100) / 100,
        avg_roi: Math.round(avgROI * 100) / 100,
        avg_model_accuracy: Math.round(avgAcc * 100) / 100,
        by_status: byStatus,
        by_priority: byPriority,
        alert_count: alerts
    });
});

//starting server 
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});

