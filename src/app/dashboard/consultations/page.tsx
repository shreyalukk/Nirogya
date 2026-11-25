'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Stethoscope, ClipboardList, AlertCircle, FileCheck, Pill, ArrowUpRight } from 'lucide-react';

export default function ConsultationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctor Consultations Desk"
        subtitle="Clinical encounter recording, physician notes, diagnosis documentation, and specialist referrals."
        badge="Clinical Station"
        badgeType="teal"
      />

      {/* Clinical Disclaimer Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-xs text-sky-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Human Clinical Oversight Principle</p>
          <p className="mt-0.5 text-sky-800">
            Nirogya never implements automated AI diagnoses or unverified prescriptions. All diagnoses and treatment instructions are entered directly by licensed medical practitioners.
          </p>
        </div>
      </div>

      {/* Active Consultation Workspace Preview */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
              Active Patient: Devamma K. (NIR-8821)
            </span>
            <p className="text-xs text-slate-500 mt-1">64y Female • Ramanagara • Known Hypertension & T2D</p>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full">
            In Doctor Consultation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-semibold block">Triage Blood Pressure</span>
            <span className="text-base font-bold text-rose-700">168/102 mmHg</span>
            <span className="text-[10px] text-rose-600 block">Stage 2 Hypertension</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-semibold block">Random Blood Sugar</span>
            <span className="text-base font-bold text-amber-700">248 mg/dL</span>
            <span className="text-[10px] text-amber-600 block">Fasting required for confirmation</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-semibold block">SpO2 / Pulse</span>
            <span className="text-base font-bold text-slate-800">98% / 88 bpm</span>
            <span className="text-[10px] text-emerald-600 block">Normal Saturation</span>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <strong>Doctor Clinical Notes:</strong> Patient complains of episodic morning occipital headache and bilateral pedal edema for 3 weeks. No history of chest pain. Advised diet modification, salt restriction, and escalated antihypertensive regimen. Referred for dilated eye exam.
        </div>
      </div>
    </div>
  );
}
