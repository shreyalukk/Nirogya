'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { BarChart3, TrendingUp, Users, HeartPulse, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Impact & Population Analytics"
        subtitle="Aggregate disease burden, screening yields, gender distributions, and follow-up completion rates."
        badge="Epidemiological Insight"
        badgeType="teal"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Screened Beneficiaries</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">1,240</div>
          <p className="text-xs text-emerald-600 font-medium mt-1">Across 4 camps in Nov 2026</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Previously Undiagnosed NCDs</div>
          <div className="text-3xl font-extrabold text-teal-700 mt-2">29.4%</div>
          <p className="text-xs text-slate-500 mt-1">First-time detection rate for HTN/DM</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Follow-up Resolution Rate</div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">82%</div>
          <p className="text-xs text-slate-500 mt-1">Closed-loop ASHA home verification</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <h3 className="font-bold text-slate-900 text-sm md:text-base mb-3">
          Morbidity & Screening Yield Distribution (Sample Data)
        </h3>
        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1 text-slate-700">
              <span>Hypertension (ICD-10 I10)</span>
              <span className="font-bold">36% (446 patients)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-teal-600 h-2 rounded-full" style={{ width: '36%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-slate-700">
              <span>Type 2 Diabetes Mellitus (ICD-10 E11)</span>
              <span className="font-bold">24% (298 patients)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '24%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-slate-700">
              <span>Ophthalmic Refractive Errors / Cataract</span>
              <span className="font-bold">18% (223 patients)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-sky-500 h-2 rounded-full" style={{ width: '18%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-slate-700">
              <span>Anemia & Nutritional Deficiencies</span>
              <span className="font-bold">15% (186 patients)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
