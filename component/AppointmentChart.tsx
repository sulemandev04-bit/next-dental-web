"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AsideBar from '@/component/AsidBar';

interface AppointmentItem {
  date: string;
  service: string;
  amount: number;
  patients: number;
}

const AppointmentDashboard = ({ data }: { data: AppointmentItem[] }) => {
  return (
    <div className="flex">
      <AsideBar />
      <div className="flex-1 p-4 space-y-10 bg-gray-50 min-h-screen ml-64">
        <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">Appointment Analytics</h1>

        {/* Graph 1: Services by Date */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">1. Services by Date</h2>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data} margin={{ left: 50, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="service" />
                <YAxis type="category" dataKey="date" width={100} />
                <Tooltip />
                <Bar dataKey="service" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Graph 2: Revenue by Date (1k, 2k format) */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">2. Total Amount</h2>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data} margin={{ left: 50, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(val) => `${val / 1000}k`} />
                <YAxis type="category" dataKey="date" width={100} />
                <Tooltip formatter={(val) => `₹${val}`} />
                <Bar dataKey="amount" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Graph 3: Patients by Date (2, 4, 6 format) */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">3. Total Patients</h2>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data} margin={{ left: 50, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="date" width={100} />
                <Tooltip />
                <Bar dataKey="patients" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AppointmentDashboard;