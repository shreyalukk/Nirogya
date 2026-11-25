'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { MOCK_QUEUE } from '@/data/mockData';
import { ListOrdered, Clock, Activity, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

export default function QueuePage() {
  const [stationFilter, setStationFilter] = useState('All');

  const stations = ['All', 'Registration', 'Triage / Vitals', 'Doctor Consultation', 'Diagnostics / Lab', 'Pharmacy Dispensing'];

  const filteredQueue = MOCK_QUEUE.filter(
    (item) => stationFilter === 'All' || item.stage === stationFilter
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Camp Queue & Token Management"
        subtitle="Manage flow bottlenecks, route patient tokens between stations, and track wait times."
        badge="Real-time Dispatch"
        badgeType="teal"
      />

      {/* Station Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {stations.map((st) => (
          <button
            key={st}
            onClick={() => setStationFilter(st)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              stationFilter === st
                ? 'bg-teal-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Queue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQueue.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                Token #{item.tokenNumber}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  item.status === 'in_progress'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {item.status.replace('_', ' ')}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-sm">{item.patientName}</h3>
            <p className="text-xs text-slate-500">{item.patientId} • {item.age}y/{item.gender}</p>

            <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Station:</span>
                <span className="font-semibold text-slate-900">{item.stage}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Category:</span>
                <span className="text-slate-800">{item.category}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Wait Duration:</span>
                <span className="font-medium text-amber-700">{item.waitMinutes} mins</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
