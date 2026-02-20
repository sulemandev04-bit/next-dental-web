"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean |null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) setIsLoggedIn(!!data.session);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setIsLoggedIn(!!session);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoggedIn === null) return null; // prevent flicker

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg"></div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">
              Bright<span className="text-blue-600">Smile</span>
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {!isLoggedIn ? (
              <>
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                <Link href="/aboutus" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About Us</Link>
                <Link href="/contactus" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact Us</Link>
                <Link href="/services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Services</Link>
                <Link href="/auth/login" className="bg-blue-50 text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-100 transition-all flex items-center gap-2">
                  <Calendar size={18} /> Book Appointment
                </Link>
                <Link href="/auth/login" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors border border-gray-200 px-4 py-2 rounded-lg hover:border-red-100"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-3 shadow-xl">
            {!isLoggedIn ? (
              <>
                <Link href="/" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">Home</Link>
                <Link href="/aboutus" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">About Us</Link>
                <Link href="/contactus" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">Contact Us</Link>
                <Link href="/services" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">Services</Link>
                <div className="pt-4 flex flex-col gap-3">
                  <Link href="/auth/login" className="w-full text-center bg-blue-50 text-blue-600 py-3 rounded-xl font-bold">Book Appointment</Link>
                  <Link href="/auth/login" className="w-full text-center bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg">Login</Link>
                </div>
              </>
            ) : (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 py-3 rounded-xl font-bold"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
