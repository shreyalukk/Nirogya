'use client';

import React from 'react';
import Link from 'next/link';
import MedicalScene from '../3d/MedicalScene';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center"
      style={{
        background: 'linear-gradient(135deg, #b6d4f5 0%, #d8e9fc 45%, #eaf4ff 100%)',
      }}
    >
      {/* Subtle Pastel Ambient Wave Overlays */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-white/40 via-teal-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#a9c9ee]/50 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content Column (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Small Trust-Oriented Subtitle Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_4px_14px_rgba(23,44,72,0.06)] text-xs font-semibold text-[#172c48]">
              <span className="w-2 h-2 rounded-full bg-[#159b8a] animate-pulse" />
              <span>Community Healthcare Coordination Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172c48] tracking-tight leading-[1.12]">
              Healthcare Beyond{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#159b8a] to-[#0f766e]">
                Boundaries.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Connecting communities, healthcare professionals and health camps through one intelligent platform. Making healthcare coordination simpler and follow-up care more accessible.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#159b8a] hover:bg-[#117e70] text-white text-base font-bold shadow-[0_12px_28px_rgba(21,155,138,0.3)] hover:shadow-[0_16px_32px_rgba(21,155,138,0.4)] transition-all flex items-center justify-center gap-2.5 active:scale-95 group"
              >
                <span>Explore Nirogya</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#solution"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/80 hover:bg-white text-[#172c48] border border-white/80 shadow-[0_8px_20px_rgba(23,44,72,0.06)] hover:shadow-[0_12px_24px_rgba(23,44,72,0.1)] text-base font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>How It Works</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-slate-300/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#172c48]">350+</p>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">Villages Covered</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#159b8a]">100%</p>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">Follow-up Tracking</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#172c48]">Offline</p>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">Field-Ready Sync</p>
              </div>
            </div>
          </div>

          {/* Right 3D Medical Scene Column (6 cols on lg) */}
          <div className="lg:col-span-6 relative">
            {/* Interactive 3D Medical Canvas */}
            <div className="relative">
              <MedicalScene />

              {/* Cursor Interaction Hint Floating Capsule */}
              <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/70 shadow-sm text-xs font-semibold text-[#172c48] pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#159b8a] animate-ping" />
                <span>Move cursor to tilt 3D medical scene</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
