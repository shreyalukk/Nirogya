'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { MOCK_RECENT_PATIENTS } from '@/data/mockData';
import { UserPlus, Search, Filter, ShieldCheck, HeartPulse, FileText } from 'lucide-react';

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = MOCK_RECENT_PATIENTS.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nirogyaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients Directory & Registration"
        subtitle="Rapid camp registration, unique Nirogya health ID assignment, and demographic profiling."
        badge="Beneficiary Registry"
        badgeType="teal"
      />

      {/* Fast search & Filter */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Nirogya ID, name, or village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredPatients.length} registered beneficiaries (Demo sample)
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 text-slate-600 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Nirogya ID</th>
                <th className="py-2.5 px-4">Patient Name</th>
                <th className="py-2.5 px-4">Age / Gender</th>
                <th className="py-2.5 px-4">Village / Location</th>
                <th className="py-2.5 px-4">Vitals Snapshot</th>
                <th className="py-2.5 px-4">Triage Priority</th>
                <th className="py-2.5 px-4">Chronic Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-mono font-bold text-teal-800">{patient.nirogyaId}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{patient.fullName}</td>
                  <td className="py-3 px-4 text-slate-600">{patient.age}y / {patient.gender}</td>
                  <td className="py-3 px-4 text-slate-600">{patient.village}</td>
                  <td className="py-3 px-4 text-xs font-mono">
                    BP {patient.vitals.bp} • RBS {patient.vitals.bloodSugar} mg/dL
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        patient.triageCategory === 'urgent'
                          ? 'bg-rose-100 text-rose-800'
                          : patient.triageCategory === 'priority'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {patient.triageCategory}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-700">
                    {patient.chronicConditions.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
