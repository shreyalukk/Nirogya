'use client';

import React from 'react';
import Link from 'next/link';
import { HeartPulse, Mail, Phone, MapPin, ShieldCheck, ArrowRight, Github } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer id="contact" className="bg-[#172c48] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#159b8a] to-[#2dd4bf] flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">NIROGYA</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Community healthcare camp coordination and longitudinal continuity platform. One camp. Every patient. Continuous care.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#159b8a]" />
              <span>Field Privacy & Human Clinical Oversight Compliant</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#hero" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#problem" className="hover:text-white transition-colors">The Challenge</a></li>
              <li><a href="#solution" className="hover:text-white transition-colors">Our Solution</a></li>
              <li><Link href="/dashboard" className="text-teal-400 font-semibold hover:underline">Live Operations Dashboard &rarr;</Link></li>
            </ul>
          </div>

          {/* Field Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">Camp Modules</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link href="/queue" className="hover:text-white transition-colors">Live Queue Management</Link></li>
              <li><Link href="/patients" className="hover:text-white transition-colors">Patient Registration</Link></li>
              <li><Link href="/consultations" className="hover:text-white transition-colors">Doctor Consultations</Link></li>
              <li><Link href="/unfinished-care" className="hover:text-white transition-colors">Unfinished Care Tracker</Link></li>
            </ul>
          </div>

          {/* Contact / Inquiries */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">Field Outreach</h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>contact@nirogya.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>+91 80 2800 1200</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Community Health Mission, Ramanagara, Karnataka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nirogya Healthcare Foundation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/settings" className="hover:text-slate-400 transition-colors">Security & RBAC</Link>
            <span className="text-slate-700">•</span>
            <span>Version 0.1 (Field Beta)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
