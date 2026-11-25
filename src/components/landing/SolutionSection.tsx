'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Tent, 
  UserCheck, 
  ListOrdered, 
  Stethoscope, 
  Send, 
  HeartHandshake, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Activity
} from 'lucide-react';

export default function SolutionSection() {
  const steps = [
    { num: '01', title: 'Create Camp', desc: 'Configure venue, staff allocation & offline packages', icon: Tent },
    { num: '02', title: 'Register Patient', desc: 'Rapid check-in & unique Nirogya Health ID generation', icon: UserCheck },
    { num: '03', title: 'Live Queue & Vitals', desc: 'Real-time token dispatch & blood pressure triage', icon: ListOrdered },
    { num: '04', title: 'Consultation', desc: 'Physician diagnosis notes & prescription orders', icon: Stethoscope },
    { num: '05', title: 'Specialist Referral', desc: 'Hospital triage & priority appointment generation', icon: Send },
    { num: '06', title: 'Follow-up Tracking', desc: 'ASHA home visits & closed-loop care continuity', icon: HeartHandshake },
  ];

  return (
    <section id="solution" className="py-20 lg:py-28 bg-gradient-to-b from-[#eaf4ff] via-white to-[#f0f7ff] relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#a9c9ee]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#159b8a]/10 border border-[#159b8a]/20 text-xs font-bold text-[#159b8a] uppercase tracking-wider">
            <span>The Connected Care Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172c48] tracking-tight">
            One connected platform.{' '}
            <span className="text-[#159b8a]">Continuous care.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Nirogya unifies the health camp lifecycle from initial venue logistics to long-term post-camp recovery in a single intuitive interface.
          </p>
        </div>

        {/* Patient Journey Visual Timeline (6 Steps) */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-[0_10px_25px_rgba(23,44,72,0.04)] hover:shadow-[0_16px_35px_rgba(23,44,72,0.08)] hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-[#159b8a] font-mono">{st.num}</span>
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#159b8a] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-[#172c48] mb-1">{st.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Differentiator Feature Card: Unfinished Care Tracker */}
        <div className="bg-gradient-to-br from-white via-white to-teal-50/40 rounded-3xl p-8 sm:p-10 lg:p-12 border border-white shadow-[0_25px_60px_rgba(23,44,72,0.08)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Nirogya's Core Innovation</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172c48] tracking-tight">
                Care doesn't end when the camp ends.
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                The <strong>Unfinished Care Tracker</strong> is our flagship continuity engine. Every patient who requires a secondary lab confirmation, hospital referral, or 30-day hypertensive drug refill is automatically queued and assigned to an accredited village health worker (ASHA or Community Health Officer).
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Real-time alerts for overdue diagnostic reviews and specialist referrals',
                  'Village-level ASHA assignment with phone outreach logs',
                  'Complete closed-loop verification before a case is marked resolved',
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#159b8a] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#159b8a] hover:bg-[#117e70] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <span>See Unfinished Care Tracker in Action</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Card Mockup Preview */}
            <div className="lg:col-span-5">
              <div className="bg-[#172c48] text-white rounded-2xl p-5 shadow-xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Live Overdue Alert</span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    Case #UFC-01
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-base font-bold text-white">Gangadharaiah Swamy</h4>
                    <span className="text-xs text-rose-400 font-bold">5 Days Overdue</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">NIR-7901 • Maralawadi Village</p>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 text-xs space-y-1.5">
                  <div className="text-slate-400 font-semibold">Triage Findings:</div>
                  <p className="text-slate-200">
                    Severe uncontrolled hypertension (BP 190/115) + suspected diabetic retinopathy.
                  </p>
                  <div className="text-teal-300 font-medium pt-1">
                    Hospital Referral: District Hospital Victoria
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                  <span>Assigned: <strong>Lakshmi Devi (ASHA)</strong></span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold text-[10px]">
                    Action Required
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
