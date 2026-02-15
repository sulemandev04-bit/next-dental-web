"use client"

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Mail, Lock, LogIn, Loader2, ArrowLeft } from 'lucide-react';
import handleLogin from './action';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
    >
      {pending ? (
        <><Loader2 className="animate-spin" size={20} /> Signing in...</>
      ) : (
        <><LogIn size={20} /> Sign In</>
      )}
    </button>
  );
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function clientAction(formData: FormData) {
    setError(null);
    const result = await handleLogin(formData);
    if (!result.success) {
      setError(result.error || "Login failed");
    } else {
      alert("Login Successful! Redirecting...");
    }
  }

  return (
    <div className="min-h-screen bg-white md:bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Back to Home Link */}
        <a href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to website
        </a>

        <div className="bg-white md:p-10 md:rounded-3xl md:shadow-2xl md:border md:border-slate-100">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 mt-2">Enter your credentials to manage your dental records.</p>
          </div>

          <form action={clientAction} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  name="email" required type="email" placeholder="dr.smith@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  name="password" required type="password" placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember" className="text-sm text-slate-600 select-none">Stay logged in for 30 days</label>
            </div>

            <SubmitButton />
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account yet? 
              <a href="/auth/register" className="text-blue-600 font-bold ml-1 hover:underline">Create an account</a>
            </p>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Protected by DentalWeb Security</p>
        </div>
      </div>
    </div>
  );
}