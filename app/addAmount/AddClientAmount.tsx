
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
type Appointment2 = {
  id: string;
  status: string;
  name?: string;
  amount?: number;
  date?: string;
};


import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Menu, X, LayoutDashboard, Calendar, PlusCircle, DollarSign, LogOut,BarChart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import useHandleUpdate from '@/component/HandelUpdate';


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AddClientAmount() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const handleUpdate = useHandleUpdate();

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment2|null>(null);

  useEffect(() => {
    if (!editId) return;

    const fetchAppointment = async () => {
      const { data, error } = await supabase
        .from("appointment") // table name check karein
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
      .eq("status", "Pending")

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
      .eq("date", selectedDate)

    if (data) {
     setAppointments(data);
      
    }
    
  }

  return (
    <div className="flex h-screen bg-gray-50 text-slate-900">
      {/* Mobile Toggle - Three Dots/Menu */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-full"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}>
        <div className="p-6 font-bold text-2xl text-blue-600">DentalFlow</div>
        
        {/* <nav className="flex-1 px-4 space-y-2">
          <Link href={"/dashboard"}><NavItem icon={<LayoutDashboard size={20}/>} label="View Appointments" active={pathname === "/dashboard"}/></Link>
          <Link href={"/appointment"}><NavItem icon={<PlusCircle size={20}/>} label="Create Appointment" active={pathname === "/appointment"} /></Link>
          <Link href={"/addAmount"}><NavItem icon={<DollarSign size={20}/>} label="Add Amount" active={pathname === "/addAmount"}/></Link>
          <Link href={"graph"}><NavItem icon={<BarChart size={20}/>} label="Graph" active={pathname === "/graph"}/></Link>
        </nav> */}

        <div className="p-4 border-t">
          <Link href={"/"} className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full p-2 rounded-lg transition">
            <LogOut size={20} /> <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
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

        <div>
    

        {/* Form show only if editId exists */}
        {selectedAppointment && (
            <form onSubmit={handleUpdate} className="space-y-4 mb-10">
            <input
                type="hidden"
                name="id"
                value={selectedAppointment.id}
            />

            <input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                className="border p-2 w-full"
                defaultValue={selectedAppointment.amount || ""}
            />

            <select
                name="status"
                className="border p-2 w-full"
                defaultValue={selectedAppointment.status}
            >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>

            <button className="bg-green-500 text-white px-4 py-2 rounded">
                Update
            </button>
            </form>
        )}
    </div>
    

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
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
                <th className="p-4 font-semibold text-sm">Action</th>
                
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
                  <td className="p-4 font-medium"><Link href={`/addAmount?edit=${apt.id}`} className='text-blue-700 hover:text-blue-500'>Add Amount</Link></td>
                  
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
function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
      {icon} <span className="font-medium">{label}</span>
    </div>
  );
}