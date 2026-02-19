"use client"

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { User, Mail, Calendar, Clock, FileText, CheckCircle2, Loader2, Stethoscope } from 'lucide-react';
import bookAppointment from './action';
import AsideBar from '@/component/AsidBar';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition transform active:scale-95"
    >
      {pending ? (
        <><Loader2 className="animate-spin" size={20} /> Processing...</>
      ) : (
        <><CheckCircle2 size={20} /> Confirm Appointment</>
      )}
    </button>
  );
}

export default function AppointmentForm() {
  const [isFinished, setIsFinished] = useState(false);

  async function handleAction(formData: FormData) {
    const result = await bookAppointment(formData);
    if (result.success) {
      setIsFinished(true);
    }
  }

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-12 text-center bg-white rounded-2xl shadow-xl border border-slate-100">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Appointment Requested!</h2>
        <p className="text-slate-600 mt-4 text-lg">We'll contact you within 24 hours to confirm your time slot.</p>
        <button onClick={() => setIsFinished(false)} className="mt-8 text-blue-600 font-semibold hover:underline">Book another appointment</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      
      <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
         <h2 className="text-2xl font-bold text-slate-800 mb-2">My DentalWeb</h2>
         <p className="text-slate-500 text-sm">Fill out the details below to book your visit</p>
      </div>

      <form action={handleAction} className="p-8 space-y-6">
        {/* Patient Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User size={16} className="text-blue-500" /> Full Name
            </label>
            <input name="name" required type="text" placeholder="John Doe" className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
               <Calendar size={16} className="text-blue-500" /> Date of Birth
            </label>
            <input name="dob" required type="date" className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Mail size={16} className="text-blue-500" /> Email Address
          </label>
          <input name="email" required type="email" placeholder="john@example.com" className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <hr className="border-slate-100" />

        {/* Appointment Details Section */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Stethoscope size={16} className="text-blue-500" /> Service Required
          </label>
          <select name="service" className="w-full p-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500">
            <option>Checkup & Cleaning</option>
            <option>Cosmetic Dentistry</option>
            <option>Dental Surgery</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
               <Calendar size={16} className="text-blue-500" /> Preferred Date
            </label>
            <input name="date" required type="date" className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
               <Clock size={16} className="text-blue-500" /> Preferred Slot
            </label>
            <select name="time" className="w-full p-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500">
              <option>Morning</option>
              <option>Afternoon</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <FileText size={16} className="text-blue-500" /> Medical Notes (Optional)
          </label>
          <textarea name="notes" placeholder="Allergies, previous surgeries, or specific concerns..." rows={3} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        
        <SubmitButton />
      </form>
    </div>
  );
}