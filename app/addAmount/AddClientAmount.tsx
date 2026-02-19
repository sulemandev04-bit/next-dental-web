"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Menu, X, LayoutDashboard, Calendar, PlusCircle, DollarSign, LogOut, BarChart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation'; // Added useRouter to close popup

import useHandleUpdate from '@/component/HandelUpdate';
import AsideBar from '@/component/AsidBar';

interface Appointment {
  id: string;
  name: string;
  email: string;
  dob: Date;
  service: string;
  slot: string;
  notes: string;
  date: Date;
  status: string;
  amount: string;
}

type Appointment2 = {
  id: string;
  status: string;
  name?: string;
  amount?: number;
  date?: string;
};

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AddClientAmount() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const searchParams = useSearchParams();
  const router = useRouter(); // To handle closing the popup
  const editId = searchParams.get("edit");
  const handleUpdate = useHandleUpdate();

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment2 | null>(null);

  // Close popup function
  const closePopup = () => {
    setSelectedAppointment(null);
    router.push('/addAmount'); // Clears the ?edit=id from URL
  };

  useEffect(() => {
    if (!editId) {
      setSelectedAppointment(null);
      return;
    }

    const fetchAppointment = async () => {
      const { data, error } = await supabase
        .from("appointment")
        .select("*")
        .eq("id", editId)
        .single();

      if (error) {
        console.log(error);
      } else {
        setSelectedAppointment(data);
      }
    };

    fetchAppointment();
  }, [editId]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase
      .from('appointment')
      .select('*')
      .eq("status", "Pending");

    if (data) {
      setAppointments(data);
    }
  }

  useEffect(() => {
    fetchDataByDate();
  }, [selectedDate]);

  async function fetchDataByDate() {
    const { data, error } = await supabase
      .from('appointment')
      .select('*')
      .eq("date", selectedDate);

    if (data) {
      setAppointments(data);
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 text-slate-900">
      <AsideBar />

      <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold">Amount Overview</h1>
          <input
            type="date"
            className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </header>

        {/* POPUP MODAL SECTION */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Overlay Background */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={closePopup}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-blue-700">Update Amount</h2>
                <button onClick={closePopup} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="hidden"
                  name="id"
                  value={selectedAppointment.id}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter Amount"
                    className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    defaultValue={selectedAppointment.amount || ""}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    defaultValue={selectedAppointment.status}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={closePopup}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Update Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                <th className="p-4 font-semibold text-sm text-center">Action</th>
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
                  <td className="p-4 font-medium">
                    <span className={`px-2 py-1 rounded text-xs ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium">₹{apt.amount || 0}</td>
                  <td className="p-4 font-medium text-center">
                    <Link href={`/addAmount?edit=${apt.id}`} className='bg-blue-50 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-700 hover:text-white transition-all text-sm font-semibold'>
                      Add Amount
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}