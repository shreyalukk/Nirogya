'use client';

import React from 'react';
import { FileText, Clock, AlertTriangle, ArrowRight, ShieldAlert, Users, Layers } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: FileText,
      badge: 'Data Fragmentation',
      title: 'Disconnected Patient Records',
      description:
        'Health camp registries are scattered across handwritten paper slips, physical registers and personal spreadsheets. Doctors have zero visibility into past vital signs, drug allergies, or prior consultations.',
      stat: 'Over 64%',
      statLabel: 'of rural health camp records are lost within 30 days',
      accentColor: 'from-amber-400 to-amber-600',
      pillBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      icon: Clock,
      badge: 'Operational Bottlenecks',
      title: 'Difficult Camp Coordination',
      description:
        'Uncoordinated queues between registration, blood pressure checks, sugar screening, and doctor tables cause massive overcrowding. Patients wait 3 to 5 hours in hot outdoor tents without triage priority.',
      stat: '3.8 Hours',
      statLabel: 'average patient waiting time without live dispatch',
      accentColor: 'from-[#159b8a] to-[#0f766e]',
      pillBg: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      icon: AlertTriangle,
      badge: 'Broken Care Loop',
      title: 'Lost Post-Camp Follow-ups',
      description:
        'When the camp closes and tents fold, the connection to the patient breaks. Critical hospital referrals, overdue blood sugar re-tests, and hypertensive emergencies are never tracked or resolved.',
      stat: '78% Drop-off',
      statLabel: 'of high-risk patients never receive hospital referral care',
      accentColor: 'from-rose-500 to-rose-700',
      pillBg: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  ];

  return (
    <section id="problem" className="py-20 lg:py-28 bg-[#eaf4ff] relative overflow-hidden">
      {/* Background Soft Lighting Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#c2dcf9]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-xs font-bold text-[#159b8a] uppercase tracking-wider shadow-xs">
            <span>The Reality of Rural Outreach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172c48] tracking-tight">
            Healthcare camps deserve{' '}
            <span className="text-[#159b8a]">better coordination.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Community health camps provide vital care for millions, yet paper registers, isolated desks, and zero follow-up tracking leave patients stranded when the camp ends.
          </p>
        </div>

        {/* 3D-Styled Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/85 backdrop-blur-md rounded-3xl p-7 border border-white/80 shadow-[0_20px_50px_rgba(23,44,72,0.06)] hover:shadow-[0_28px_60px_rgba(23,44,72,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Subtle Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-teal-50 to-transparent rounded-tr-3xl pointer-events-none -z-0" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#eaf4ff] to-white border border-[#a9c9ee]/40 flex items-center justify-center text-[#159b8a] shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#159b8a]" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${prob.pillBg}`}>
                      {prob.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#172c48] mb-3 group-hover:text-[#159b8a] transition-colors">
                    {prob.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                {/* Bottom Callout Metric */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#172c48]">{prob.stat}</span>
                  <span className="text-xs text-slate-500 leading-tight">{prob.statLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
