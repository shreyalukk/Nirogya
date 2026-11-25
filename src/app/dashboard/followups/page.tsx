'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { MOCK_UNFINISHED_CARE } from '@/data/mockData';
import { AlertTriangle, PhoneCall, CheckCircle2, UserCheck, ShieldAlert, HeartHandshake } from 'lucide-react';

export default function UnfinishedCarePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Unfinished Care Tracker"
        subtitle="Prevent drop-offs after camp day: track pending lab investigations, hospital referrals, and follow-ups."
        badge="Care Continuity"
        badgeType="amber"
      />

      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <HeartHandshake className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Continuity of Care Engine</p>
          <p className="mt-0.5 text-amber-800">
            Most health camp impact is lost when patients leave the venue without follow-up. Nirogya links camp findings to village ASHA facilitators and Community Health Officers (CHO) for guaranteed closed-loop follow-up.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_UNFINISHED_CARE.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm md:text-base">{item.patientName}</span>
                <span className="text-xs font-mono font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {item.patientId}
                </span>
                <span className="text-xs text-slate-500">• {item.village}</span>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  item.severity === 'critical'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {item.severity} • {item.daysOverdue} days overdue
              </span>
            </div>

            <div className="mt-3 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Issue: {item.flagType}</span>
                <span className="text-slate-400 font-normal">({item.campName})</span>
              </div>
              <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {item.notes}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                  {item.phone}
                </span>
                <span className="font-medium text-teal-800">
                  Assigned CHW: {item.assignedHealthWorker}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                  Status: {item.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
