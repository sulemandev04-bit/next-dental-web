"use client"

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Calendar, Clock, User, Phone, Mail, FileText, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import bookAppointment from './action';


// Submit button component to handle loading state
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg flex items-center gap-2 transition transform active:scale-95"
    >
      {pending ? (
        <><Loader2 className="animate-spin" size={18} /> Processing...</>
      ) : (
        <><CheckCircle2 size={18} /> Confirm Booking</>
      )}
    </button>
  );
}

export default function AppointmentForm() {
  const [step, setStep] = useState(1);
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
      {/* Header & Progress */}
      <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
         <h2 className="text-2xl font-bold text-slate-800 mb-2">My DentalWeb</h2>
         <p className="text-slate-500 text-sm">Professional Dental Care at Your Fingertips</p>
      </div>

      <form action={handleAction} className="p-8">
        {/* Step 1: Personal Info */}
        <div className={step === 1 ? "space-y-6 block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User size={16} /> Full Name
              </label>
              <input name="name" required type="text" placeholder="John Doe" className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
              <input name="dob" required type="date" className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <input name="email" required type="email" placeholder="john@dental.com" className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="button" onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2">
            Next: Details <ChevronRight size={18} />
          </button>
        </div>

        {/* Step 2: Appointment Details */}
        <div className={step === 2 ? "space-y-6 block" : "hidden"}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Service Required</label>
            <select name="service" className="w-full p-3 rounded-lg border border-slate-300 bg-white">
              <option>Checkup & Cleaning</option>
              <option>Cosmetic Dentistry</option>
              <option>Dental Surgery</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Date</label>
              <input name="date" required type="date" className="w-full p-3 rounded-lg border border-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Preferred Slot</label>
              <select name="time" className="w-full p-3 rounded-lg border border-slate-300">
                <option>Morning</option>
                <option>Afternoon</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Medical Notes</label>
            <textarea name="notes" placeholder="Allergies, previous surgeries, etc." rows={3} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          
          <div className="flex gap-4">
            <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold">Back</button>
             <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group">
                  CreateAppoinment 
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}