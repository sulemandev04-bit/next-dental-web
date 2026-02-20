
// components/Dashboard.tsx
"use client";
interface Appointment {
  id: string;
  name: string;
  email: string;
  dob: Date;
  service: string;
  slot:string;
  notes:string;
  date:Date;
  status:string;
  amount:string;
}


import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Menu, X, LayoutDashboard, Calendar, PlusCircle, DollarSign, LogOut ,BarChart, Sidebar} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import AsideBar from '@/component/AsidBar';
import { supabase } from '@/lib/supabase';

export default function DentalDashboard() {
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [stats, setStats] = useState({ total: 0, revenue: 0 });
  const pathname = usePathname();

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  async function fetchData() {
    const { data, error } = await supabase
      .from('appointment')
      .select('*')
      .eq("date",selectedDate)

    if (data) {
      setAppointments(data);
      const revenue = data.reduce((acc, curr) => acc + (curr.amount || 0), 0);
      setStats({ total: data.length, revenue });
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 text-slate-900">
      <AsideBar/>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold">Appointment Overview</h1>
          <input 
            type="date" 
            className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard title="Total Appointments" value={stats.total} color="bg-blue-100 text-blue-700" />
          <StatCard title="Today's Revenue" value={`$${stats.revenue}`} color="bg-green-100 text-green-700" />
        </div>

        {/* Graph Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 h-64">
          <h3 className="font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={appointments}>
              <XAxis dataKey="patient_name" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-blue-700 text-white border-b">
              <tr>
                <th className="p-4 font-semibold text-sm">Name</th>
                <th className="p-4 font-semibold text-sm">Email</th>
                <th className="p-4 font-semibold text-sm">D.O.B</th>
                <th className="p-4 font-semibold text-sm">Service</th>
                <th className="p-4 font-semibold text-sm">Slot</th>
                <th className="p-4 font-semibold text-sm">Note</th>
                <th className="p-4 font-semibold text-sm">Date</th>
                <th className="p-4 font-semibold text-sm">Status</th>
                <th className="p-4 font-semibold text-sm">Amount</th>
                
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt: any) => (
                <tr key={apt.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{apt.name}</td>
                  <td className="p-4 font-medium">{apt.email}</td>
                  <td className="p-4 font-medium">{apt.dob}</td>
                  <td className="p-4 font-medium">{apt.service}</td>
                  <td className="p-4 font-medium">{apt.slot}</td>
                  <td className="p-4 font-medium">{apt.notes}</td>
                  <td className="p-4 font-medium">{apt.date}</td>
                  <td className="p-4 font-medium">{apt.status}</td>
                  <td className="p-4 font-medium text-center">₹ {apt.amount || 0}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// Sub-components

function StatCard({ title, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <p className={`text-3xl font-bold ${color.split(' ')[1]}`}>{value}</p>
    </div>
  );
}