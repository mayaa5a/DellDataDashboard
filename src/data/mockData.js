//This is sample static data to be used 

//business and financial summaries 
//creating an exportable var summaryData - it is an array of 3 objects
//each represents a piece of business info 
//each object has a key/value pair 
// src/data/mockData.js
export const summaryData = [
  { title: "Total Budget", value: "$100,000" },
  { title: "Burn Rate", value: "$8,500 / month" },
  { title: "Revenue Projection", value: "$50,000 Q4" }
];

// Project Progress
export const projects = [
  { name: "AI Chatbot", milestoneCompletion: 80, health: "On Track" },
  { name: "Fraud Detection", milestoneCompletion: 45, health: "At Risk" },
  { name: "Image Recognition", milestoneCompletion: 60, health: "Delayed" }
];

// AI Model Metrics
export const models = [
  { name: "Model A", accuracy: 0.92, trainingTime: "4h", status: "Deployed" },
  { name: "Model B", accuracy: 0.85, trainingTime: "6h", status: "In Training" },
  { name: "Model C", accuracy: 0.78, trainingTime: "3h", status: "Testing" }
];

// Infrastructure Usage
export const infraMetrics = [
  { server: "AI-Server-01", cpu: 70, memory: 65, gpu: 80 },
  { server: "AI-Server-02", cpu: 50, memory: 40, gpu: 20 },
  { server: "DB-Server", cpu: 30, memory: 50, gpu: 0 }
];

// Support Alerts
export const alerts = [
  { id: 1, project: "Fraud Detection", issue: "Data pipeline error", severity: "High" },
  { id: 2, project: "Image Recognition", issue: "GPU overload", severity: "Medium" },
  { id: 3, project: "AI Chatbot", issue: "Minor bug in prototype", severity: "Low" }
];

// LEGO Prototyping
export const legoData = [
  { kit: "Spike Kit", prototypes: 5, feedbackScore: 4.5 },
  { kit: "Classic Kit", prototypes: 3, feedbackScore: 4.8 }
];

export const chartData = [
  { month: "Jan", revenue: 20000, expenses: 12000 },
  { month: "Feb", revenue: 25000, expenses: 15000 },
  { month: "Mar", revenue: 30000, expenses: 18000 },
];
