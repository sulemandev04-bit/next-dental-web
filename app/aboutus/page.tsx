import React from 'react';
import { CheckCircle2, Heart, Users, ShieldCheck, Star } from 'lucide-react';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';

// --- Types ---
interface StatProps {
  label: string;
  value: string;
}

const StatBox = ({ label, value }: StatProps) => (
  <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 flex-1">
    <div className="text-2xl md:text-3xl font-bold text-blue-600">{value}</div>
    <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Navbar/>
      
      {/* 1. HERO SECTION - Mobile Responsive Padding */}
      <section className="relative py-16 md:py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Our Mission is Your <br className="hidden sm:block" /> 
            <span className="text-blue-200">Perfect Smile.</span>
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Since 2010, BrightSmile has been at the forefront of dental excellence, 
            combining compassionate care with the latest medical technology.
          </p>
        </div>
      </section>

      {/* 2. THE STORY SECTION - Mobile: Image Top, Text Bottom */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Container - Responsive sizing */}
          <div className="relative order-1 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800" 
              alt="Our Dental Clinic" 
              className="rounded-3xl shadow-xl w-full h-75 md:h-112.5 object-cover"
            />
            {/* Quote Box - Hidden on very small screens, visible from 'sm' up */}
            <div className="absolute -bottom-6 right-4 left-4 sm:left-auto sm:right-5 sm:w-64 p-5 bg-white rounded-2xl shadow-2xl border border-slate-50 hidden sm:block">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-slate-600 italic text-sm">
                "We treat every patient like family. Your comfort is our priority."
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-2">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
              A Decade of Excellence in Modern Dentistry
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We started with a simple idea: that going to the dentist shouldn't be stressful. 
              Over the years, we've helped over 15,000 patients regain their confidence.
            </p>
            
            {/* Feature List - 1 column on mobile, 2 columns on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {["State-of-the-Art Labs", "Certified Orthodontists", "Pain-Free Procedures", "Emergency Support"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-700 text-sm md:text-base font-medium">
                  <CheckCircle2 className="text-green-500 shrink-0" size={20} /> {item}
                </div>
              ))}
            </div>

            {/* Stats - Horizontal scroll on mobile if needed, or flex wrap */}
            <div className="flex gap-3 pt-4">
              <StatBox label="Patients" value="15k+" />
              <StatBox label="Years" value="12+" />
              <StatBox label="Awards" value="08" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES - Stacked on Mobile */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">Why Patients Trust Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueItem 
              icon={<Heart size={28} />} 
              title="Patient First" 
              desc="Everything we do revolves around your comfort and health goals." 
            />
            <ValueItem 
              icon={<Users size={28} />} 
              title="Expert Team" 
              desc="Our doctors are continuous learners, mastering new dental tech every year." 
            />
            <ValueItem 
              icon={<ShieldCheck size={28} />} 
              title="Full Transparency" 
              desc="No hidden costs. We explain every procedure and price upfront." 
            />
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

// Helper for Core Values
function ValueItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
      <div className="text-blue-600 flex justify-center mb-4">{icon}</div>
      <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}