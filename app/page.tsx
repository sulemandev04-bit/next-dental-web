import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Star, 
  ArrowRight, 
  Phone, 
  Stethoscope, 
  Sparkles, 
  Activity 
} from 'lucide-react';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';

// --- TypeScript Interfaces ---
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlight?: boolean;
}

// --- Sub-components ---
const FeatureItem = ({ icon, title, desc }: FeatureItemProps) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 p-4">
    <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">{icon}</div>
    <div>
      <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ServiceCard = ({ icon, title, desc, highlight = false }: ServiceCardProps) => (
  <div className={`p-8 rounded-3xl border transition-all duration-300 group ${
    highlight 
      ? 'bg-blue-600 text-white border-blue-600 shadow-2xl scale-105' 
      : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl'
  }`}>
    <div className={`mb-6 inline-block p-4 rounded-2xl ${highlight ? 'bg-blue-500' : 'bg-blue-50 text-blue-600'}`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className={`mb-8 leading-relaxed ${highlight ? 'text-blue-100' : 'text-slate-500'}`}>{desc}</p>
    <button className={`font-bold flex items-center gap-2 group-hover:gap-4 transition-all ${highlight ? 'text-white' : 'text-blue-600'}`}>
      Explore Service <ArrowRight size={18} />
    </button>
  </div>
);

// --- Main Page ---
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar/>
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10 space-y-8">
            <div className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-2 rounded-full shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-600">Accepting New Patients</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
              Your Smile is Our <br />
              <span className="text-blue-600 italic font-medium">Greatest Passion.</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Experience painless dentistry with a touch of luxury. Our award-winning 
              team uses AI-guided technology for more precise results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3">
                Book Appointment <Phone size={20} />
              </button>
              <button className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all">
                Meet the Doctors
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
              alt="Modern Dental Office" 
              className="relative rounded-[2.5rem] shadow-2xl object-cover h-125 w-full"
            />
          </div>
        </div>
      </section>

      {/* TRUST & STATS */}
      <section className="py-16 border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <FeatureItem 
              icon={<ShieldCheck size={28} />} 
              title="Safe & Sterile" 
              desc="Certified surgical-grade hygiene standards." 
            />
            <FeatureItem 
              icon={<Clock size={28} />} 
              title="Quick Booking" 
              desc="Get an appointment within 24-48 hours." 
            />
            <FeatureItem 
              icon={<Award size={28} />} 
              title="Expert Doctors" 
              desc="Over 15+ years of clinical excellence." 
            />
            <FeatureItem 
              icon={<Star size={28} />} 
              title="Top Rated" 
              desc="4.9/5 stars from 2,000+ local patients." 
            />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Specialty Services</h2>
              <p className="text-slate-500 text-lg">We provide a wide range of dental services to ensure your teeth stay healthy and beautiful for life.</p>
            </div>
            <button className="text-blue-600 font-bold flex items-center gap-2 border-b-2 border-blue-600 pb-1">
              View All Services
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <ServiceCard 
              icon={<Stethoscope size={32} />}
              title="General Care" 
              desc="Routine checkups, professional cleanings, and digital X-rays to prevent issues."
            />
            <ServiceCard 
              icon={<Sparkles size={32} />}
              title="Cosmetic Smile" 
              desc="Advanced whitening, porcelain veneers, and bonding for a camera-ready smile."
              highlight
            />
            <ServiceCard 
              icon={<Activity size={32} />}
              title="Oral Surgery" 
              desc="Painless tooth extractions and dental implants using modern sedation techniques."
            />
          </div>
        </div>
      </section>
      <Footer/>

    </main>
  );
}