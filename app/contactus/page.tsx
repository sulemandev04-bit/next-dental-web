"use client";
import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import contactAction from './action';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar/>
      {/* 1. HEADER SECTION */}
      <section className="bg-slate-50 py-16 md:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Have a question or a dental emergency? Our friendly team is here to 
            assist you. Reach out via phone, email, or the contact form below.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT - Form & Info */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT SIDE: CONTACT FORM */}
          <div className="order-2 lg:order-1">
            <div className="bg-white p-6 px-5 pt-5 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <MessageSquare size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Send us a Message</h2>
              </div>

              <form action={contactAction} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                    <input 
                      type="text"
                      name='name'
                      placeholder="John Doe" 
                      className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                    <input 
                      type="tel"
                      name='number'
                      placeholder="(555) 000-0000" 
                      className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <input 
                    type="email"
                    name='email'
                    placeholder="john@example.com" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                  <textarea 
                    rows={4} 
                    name='message'
                    placeholder="How can we help you today?" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group">
                  Submit Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: INFO & MAP */}
          <div className="order-1 lg:order-2 space-y-10">
            {/* Contact Details Grid */}
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
              <ContactDetail 
                icon={<Phone />} 
                title="Phone Number" 
                detail="+1 (555) 123-4567" 
                subDetail="Emergency: +1 (555) 999-8888"
              />
              <ContactDetail 
                icon={<Mail />} 
                title="Email Address" 
                detail="hello@brightsmile.com" 
                subDetail="support@brightsmile.com"
              />
              <ContactDetail 
                icon={<MapPin />} 
                title="Our Location" 
                detail="123 Dental Street, Suite 500" 
                subDetail="New York, NY 10001"
              />
              <ContactDetail 
                icon={<Clock />} 
                title="Working Hours" 
                detail="Mon - Fri: 9:00 AM - 6:00 PM" 
                subDetail="Sat: 10:00 AM - 2:00 PM"
              />
            </div>

            {/* Responsive Map Embed */}
            <div className="h-75 md:h-100 w-full rounded-3xl overflow-hidden border border-slate-100 shadow-inner bg-slate-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1674512345678!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

// Helper Component for Contact Info
function ContactDetail({ icon, title, detail, subDetail }: { icon: React.ReactNode; title: string; detail: string; subDetail: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-800 text-base">{title}</h3>
        <p className="text-slate-600 text-sm mt-1">{detail}</p>
        <p className="text-slate-400 text-xs mt-0.5">{subDetail}</p>
      </div>
    </div>
  );
}