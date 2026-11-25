'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Bell, AlertTriangle, Info, CheckCircle2, Clock } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Critical Lab Value Flagged',
      message: 'Patient Devamma K. (NIR-8821) blood sugar is 248 mg/dL. Requires doctor re-evaluation before dispensing.',
      time: '12 mins ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pharmacy Stock Alert: Metformin 500mg',
      message: 'Current on-hand stock at Camp #NC-2026-08 is below 40 strips. Requisition dispatched to district hub.',
      time: '34 mins ago',
    },
    {
      id: 3,
      type: 'info',
      title: 'Field Sync Complete',
      message: '142 completed patient records successfully committed to local camp cache and synchronized.',
      time: '1 hour ago',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Camp Broadcasts & Notifications"
        subtitle="Operational announcements, inventory warnings, and critical patient triage alerts."
        badge="Live Alerts"
        badgeType="teal"
      />

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
              item.type === 'critical'
                ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                : item.type === 'warning'
                ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {item.type === 'critical' ? (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : item.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs md:text-sm">{item.title}</h3>
                <span className="text-[11px] text-slate-500">{item.time}</span>
              </div>
              <p className="text-xs mt-1 text-slate-700">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
