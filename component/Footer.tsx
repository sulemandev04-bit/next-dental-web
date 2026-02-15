import React from 'react';
import Link from 'next/link';

const BasicFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Brand/Logo */}
          <div className="max-w-xs">
            <h2 className="text-xl font-bold text-blue-600">BrightSmile</h2>
            <p className="mt-2 text-sm text-gray-500">
              Modern dental care you can trust. Dedicated to your comfort and health.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-gray-900">Links</h3>
              <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600">Contact</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-gray-900">Contact</h3>
              <p className="text-sm text-gray-600">+1 234 567 890</p>
              <p className="text-sm text-gray-600">hello@dental.com</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} BrightSmile Dental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BasicFooter;