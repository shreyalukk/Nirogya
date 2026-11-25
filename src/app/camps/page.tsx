'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { MOCK_CAMPS } from '@/data/mockData';
import { Tent, Calendar, MapPin, Users, CheckCircle, Clock, Plus, Filter, ArrowRight } from 'lucide-react';

export default function CampsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const filteredCamps = MOCK_CAMPS.filter((c) => {
    if (activeTab === 'all') return true;
    return c.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Health Camps Management"
        subtitle="Schedule, configure, and monitor community health camps across rural and semi-urban clusters."
        badge="Field Logistics"
        badgeType="teal"
      />

      {/* Module Overview Notice */}
      <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4 text-xs text-teal-900 flex items-start gap-3">
        <Tent className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Camp Operations Module (Foundation Stage)</p>
          <p className="mt-0.5 text-teal-800">
            This module manages camp logistics, target demographics, station inventory, village leader coordination, and offline sync packages.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {(['all', 'active', 'upcoming', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'bg-teal-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {tab} Camps
          </button>
        ))}
      </div>

      {/* Camp Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCamps.map((camp) => (
          <div key={camp.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {camp.code}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    camp.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : camp.status === 'upcoming'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {camp.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{camp.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {camp.location}
              </p>
              <div className="text-xs text-slate-600 flex items-center gap-1 mb-3">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>{camp.date}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-500 mb-1">
                <span>Beneficiaries Registered:</span>
                <span className="font-bold text-slate-900">{camp.registeredCount} / {camp.targetBeneficiaries}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Lead: {camp.leadPhysician}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
