// components/AppointmentBarChart.js
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AppointmentBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          dy={10}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <Tooltip 
          cursor={{ fill: '#f3f4f6' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
        />
        <Bar 
          dataKey="count" 
          fill="#0ea5e9" // Dental sky blue
          radius={[6, 6, 0, 0]} 
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}