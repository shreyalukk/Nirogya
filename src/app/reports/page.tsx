'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ReportsPage() {
  const reportsList = [
    { title: 'Ramanagara Health Camp Comprehensive Post-Camp Summary', code: 'REP-NC-2026-08', type: 'PDF / CSV', generated: '25 Nov 2026' },
    { title: 'District Health Office (DHO) NCD Compliance Submission', code: 'DHO-RAM-NOV-26', type: 'Official Govt Template', generated: '20 Nov 2026' },
    { title: 'Unfinished Care & High-Risk Patient Referral Register', code: 'UFC-REG-2026-Q4', type: 'Clinical Audit', generated: '18 Nov 2026' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Compliance Exports"
        subtitle="Generate field camp summaries, government health department submissions, and donor impact statements."
        badge="Reporting & Audits"
        badgeType="teal"
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-sm">Available Camp Report Templates</h2>
          <span className="text-xs text-slate-500">Government & Donor Formats</span>
        </div>

        <div className="divide-y divide-slate-100">
          {reportsList.map((rep, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-bold text-slate-900 text-xs md:text-sm">{rep.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="font-mono">{rep.code}</span>
                  <span>•</span>
                  <span>Format: {rep.type}</span>
                  <span>•</span>
                  <span>Date: {rep.generated}</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Report template "${rep.code}" export initiated. In live Supabase mode, this generates a signed PDF/CSV export.`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-teal-400 bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 text-xs font-semibold transition-colors self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                Export Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
