
"use client";

import { useState } from 'react';

import { Menu, X, LayoutDashboard, Calendar, PlusCircle, DollarSign, LogOut ,BarChart} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function AsideBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname()

  return (
    <div>
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
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href={"/dashboard"}><NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active = {pathname === "/dashboard"} /></Link>
          <Link href={"/viewAllAppointment"}><NavItem icon={<Calendar size={20}/>} label="View Appointments" active = {pathname === "/viewAllAppointment"} /></Link>
          <Link href={"/addAmount"}><NavItem icon={<DollarSign size={20}/>} label="Add Amount" active = {pathname === "/addAmount"} /></Link>
          <Link href={"/graph"}><NavItem icon={<BarChart size={20}/>} label="Graph" active = {pathname === "/graph"}/></Link>
        </nav>

        <div className="p-4 border-t">
          <Link href={"/"} className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full p-2 rounded-lg transition">
            <LogOut size={20} /> <span>Logout</span>
          </Link>
        </div>
      </aside>
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