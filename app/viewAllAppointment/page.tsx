
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
import { usePathname } from "next/navigation";
import AsideBar from '@/component/AsidBar';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function DentalDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
 
  
  const pathname = usePathname();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase
      .from('appointment')
      .select('*')

    if (data) {
      setAppointments(data);
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 text-slate-900">
    <AsideBar/>


      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-blue-600">Appointment Overview</h1>
        </header>

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
                  <td className="p-4 font-medium">{apt.amount}</td>
                  
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