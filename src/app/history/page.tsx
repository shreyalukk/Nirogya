'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { History, Calendar, FileText, ChevronRight, Activity, ArrowUpRight } from 'lucide-react';

export default function HistoryPage() {
  const patientHistory = [
    {
      date: '25 Nov 2026',
      camp: 'Ramanagara Chronic Care Camp (#NC-2026-08)',
      station: 'Doctor Consultation (Dr. Anita Rao)',
      summary: 'BP 168/102 mmHg, RBS 248 mg/dL. Escalated Telmisartan to 40mg. Diet advice provided.',
      outcome: 'Referral for ophthalmic fundus screening',
    },
    {
      date: '18 Nov 2026',
      camp: 'Channapatna Geriatric Camp (#NC-2026-07)',
      station: 'Triage & Screening',
      summary: 'BP 170/100 mmHg, pulse 84 bpm. Patient reported non-compliance with medications.',
      outcome: 'Enrolled in ASHA home-visit tracking roster',
    },
    {
      date: '02 Aug 2026',
      camp: 'Magadi General Health Camp (#NC-2026-04)',
      station: 'General OPD',
      summary: 'Initial screening. First diagnosis of systemic hypertension.',
      outcome: 'Prescribed initial lifestyle management & basic antihypertensives',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Visit History & Longitudinal Health Record"
        subtitle="Multi-camp longitudinal patient records, past prescriptions, and disease trajectories."
        badge="Continuity Record"
        badgeType="teal"
      />

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">Patient: Devamma K. (NIR-8821)</h2>
            <p className="text-xs text-slate-500">64 years • Female • Ramanagara District • Longitudinal File #8821</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 font-semibold self-start sm:self-auto">
            3 Camps Attended (100% Continuity)
          </span>
        </div>

        {/* Timeline */}
        <div className="mt-5 space-y-4">
          {patientHistory.map((visit, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                  {patientHistory.length - index}
                </div>
                {index < patientHistory.length - 1 && (
                  <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-900">{visit.date}</span>
                  <span className="text-[11px] text-slate-500">• {visit.camp}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs">
                  <p className="font-medium text-slate-800">{visit.station}</p>
                  <p className="text-slate-600 mt-1">{visit.summary}</p>
                  <div className="mt-2 text-teal-800 font-semibold text-[11px] flex items-center gap-1">
                    <span>Outcome / Next Steps:</span>
                    <span>{visit.outcome}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
