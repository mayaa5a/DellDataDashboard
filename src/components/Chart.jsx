import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chartData } from '../data/mockData';

{/* add more charts: maybe pie, bar, etc */}
{/* change code to stop hard coding data and use the actual mock data in server file  */}

const Chart = () => {
    return (
        <div className="chart-container">
        <LineChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
       </LineChart>
        </div>
    );
};

export default Chart;