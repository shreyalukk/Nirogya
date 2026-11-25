'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeartPulse, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'The Problem', href: '#problem' },
    { label: 'Our Solution', href: '#solution' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(23,44,72,0.06)] border-b border-white/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#159b8a] to-[#2dd4bf] flex items-center justify-center text-white shadow-md shadow-[#159b8a]/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-[#172c48] tracking-wider flex items-center gap-1.5">
                NIROGYA
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#159b8a]/15 text-[#159b8a]">
                  Health
                </span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Healthcare Beyond Boundaries
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#172c48]/80 hover:text-[#159b8a] transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#159b8a] transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Launch App / Dashboard */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-[#159b8a] hover:bg-[#117e70] text-white text-sm font-semibold shadow-[0_8px_20px_rgba(21,155,138,0.25)] hover:shadow-[0_12px_24px_rgba(21,155,138,0.35)] transition-all inline-flex items-center gap-2 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#172c48] hover:bg-white/60 rounded-xl"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#172c48] py-2 px-3 rounded-lg hover:bg-[#eaf4ff]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#159b8a] text-white text-center font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
