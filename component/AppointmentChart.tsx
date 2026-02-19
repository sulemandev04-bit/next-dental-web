"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AsideBar from './AsidBar';

interface AppointmentItem {
  date: string;
  service: string;
  amount: number;
  patients: number;
}

const AppointmentDashboard = ({ data }: { data: AppointmentItem[] }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <AsideBar/>
      {/* Centered Container for better readability on large screens */}
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="text-center md:text-left border-b border-gray-200 pb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700">
            Appointment Analytics
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Performance metrics and service breakdown
          </p>
        </header>

        {/* Vertical Stack of Charts */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* Graph 1: Services */}
          <section className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Services by Date
            </h2>
            <div className="h-75 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={data} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="category" dataKey="service" fontSize={12} tickLine={false} />
                  <YAxis type="category" dataKey="date" width={80} fontSize={12} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="amount" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Graph 2: Revenue */}
          <section className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-green-500 rounded-full"></span>
              Total Revenue
            </h2>
            <div className="h-75 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={data} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" tickFormatter={(val) => `${val / 1000}k`} fontSize={12} />
                  <YAxis type="category" dataKey="date" width={80} fontSize={12} tickLine={false} />
                  <Tooltip formatter={(val) => `₹${val}`} />
                  <Bar dataKey="amount" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Graph 3: Patients */}
          <section className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-yellow-500 rounded-full"></span>
              Total Patients
            </h2>
            <div className="h-75 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={data} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" allowDecimals={false} fontSize={12} />
                  <YAxis type="category" dataKey="date" width={80} fontSize={12} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="patients" fill="#eab308" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AppointmentDashboard;