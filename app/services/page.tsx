import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, Activity, ShieldCheck, Zap, 
  ArrowUpRight, Play, Check, Plus, 
  ChevronRight, Instagram, Twitter, Facebook,
  Stethoscope, Microscope
} from 'lucide-react';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';

// --- Reusable UI Components ---

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
    {children}
  </span>
);

// --- Main Page Component ---

export default function NextServicesPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFE] text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      <Navbar/>

      {/* 2. BENTO HERO SECTION */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Display Card */}
          <div className="md:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-100 relative overflow-hidden flex flex-col justify-end min-h-112.5">
            <div className="absolute top-10 right-10 hidden md:block">
               <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                  <Microscope size={48} className="text-blue-200" />
               </div>
            </div>
            <div className="relative z-10">
              <Badge>Top Rated Clinic 2026</Badge>
              <h1 className="text-5xl md:text-7xl font-black mt-6 mb-6 tracking-tighter leading-none">
                Modern Care <br />
                <span className="text-blue-600 font-serif italic font-light">Redefined.</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-md leading-relaxed">
                Experience the intersection of artificial intelligence and biological excellence. We don&apos;t just fix teeth; we engineer smiles.
              </p>
            </div>
          </div>

          {/* Side Quick Stats */}
          <div className="md:col-span-4 grid grid-rows-2 gap-4">
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
              <Zap className="text-blue-300" fill="currentColor" />
              <div>
                <div className="text-4xl font-black italic">Same-Day</div>
                <p className="opacity-80 font-medium">Crowns & Veneers</p>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between group cursor-pointer overflow-hidden relative">
              <div className="flex justify-between items-start relative z-10">
                <span className="text-xs font-mono tracking-widest opacity-50 uppercase">Precision</span>
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold relative z-10">AI Guided <br />Diagnostics</h3>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 blur-[50px] opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black tracking-tight mb-4">Our Specializations</h2>
              <p className="text-slate-500">Choose from a range of high-tech treatments tailored to your unique anatomy.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Sparkles className="text-blue-600" />}
              title="Digital Smile Design"
              description="Preview your future smile with our 3D facial mapping software before we touch a single tooth."
              price="349"
            />
            <ServiceCard 
              icon={<Activity className="text-blue-600" />}
              title="Guided Biofilm Therapy"
              description="A state-of-the-art approach to dental hygiene that is 100% pain-free and highly effective."
              price="189"
              isHot
            />
            <ServiceCard 
              icon={<ShieldCheck className="text-blue-600" />}
              title="Robotic Implants"
              description="Achieve 99.9% precision with our robotic-assisted implant placement technology."
              price="1,200"
            />
          </div>
        </div>
      </section>

      {/* 4. CLINICAL TECHNOLOGY DIAGRAM PREVIEW */}
      <section className="bg-slate-900 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
             <h2 className="text-white text-4xl font-bold mb-6">The Technology Behind the Smile</h2>
             <p className="text-slate-400 mb-8 leading-relaxed">We use CBCT (Cone Beam Computed Tomography) to create a high-definition 3D model of your jaw, allowing for safer and faster procedures.</p>
             
          </div>
          <div className="lg:w-1/2 bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-sm">
            <div className="space-y-6">
              <TechRow title="Intraoral Scanning" desc="No more messy molds. Just a fast, digital scan." />
              <TechRow title="Laser Dentistry" desc="Minimal bleeding and zero vibrations." />
              <TechRow title="AI X-Ray Analysis" desc="Detecting issues 2 years before they become visible." />
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

// --- Sub-components (Kept in same file for this demo) ---

function ServiceCard({ icon, title, description, price, isHot = false }: any) {
  return (
    <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] hover:shadow-2xl hover:border-blue-100 transition-all group relative overflow-hidden">
      {isHot && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-1.5 rounded-bl-3xl text-xs font-black">
          POPULAR
        </div>
      )}
      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-2xl font-bold mb-3 tracking-tight">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed mb-8">{description}</p>
      <div className="flex items-center justify-between border-t border-slate-50 pt-6">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">Starts at</span>
          <span className="text-xl font-black text-slate-900">${price}</span>
        </div>
        <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-colors">
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}

function TechRow({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
        <Check size={12} className="text-blue-400" strokeWidth={4} />
      </div>
      <div>
        <h4 className="text-white font-bold">{title}</h4>
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}