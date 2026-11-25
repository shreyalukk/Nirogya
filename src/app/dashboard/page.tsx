'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRole } from '@/components/common/RoleContext';
import { 
  CURRENT_CAMP, 
  MOCK_QUEUE, 
  MOCK_UNFINISHED_CARE, 
  MOCK_RECENT_PATIENTS 
} from '@/data/mockData';
import { 
  Users, 
  Stethoscope, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Activity, 
  Filter, 
  ShieldCheck, 
  Database, 
  ChevronRight,
  ExternalLink,
  PhoneCall,
  MapPin,
  RefreshCw,
  Search
} from 'lucide-react';

export default function DashboardPage() {
  const { role, roleTitle, isDemoMode } = useRole();
  const [activeQueueFilter, setActiveQueueFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [quickSearchId, setQuickSearchId] = useState<string>('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  // Filtered queue items
  const filteredQueue = MOCK_QUEUE.filter((item) => {
    if (activeQueueFilter !== 'All' && !item.stage.includes(activeQueueFilter)) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        item.patientName.toLowerCase().includes(q) ||
        item.patientId.toLowerCase().includes(q) ||
        item.tokenNumber.toString().includes(q)
      );
    }
    return true;
  });

  const handleQuickPatientLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearchId.trim()) return;
    const found = MOCK_RECENT_PATIENTS.find(
      (p) =>
        p.nirogyaId.toLowerCase() === quickSearchId.trim().toLowerCase() ||
        p.phone.includes(quickSearchId.trim()) ||
        p.fullName.toLowerCase().includes(quickSearchId.trim().toLowerCase())
    );
    if (found) {
      setSearchFeedback(`Found: ${found.fullName} (${found.nirogyaId}) - Triage: ${found.triageCategory.toUpperCase()} - BP: ${found.vitals.bp}`);
    } else {
      setSearchFeedback(`No mock record found for "${quickSearchId}". Try "NIR-8821" or "Devamma".`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & Camp Operation Bar */}
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
                Live Camp Active
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Camp Code: {CURRENT_CAMP.code}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                Role: {roleTitle}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {CURRENT_CAMP.name}
            </h1>
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 mt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{CURRENT_CAMP.location}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{CURRENT_CAMP.district}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/queue"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs md:text-sm font-medium rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <Clock className="w-4 h-4 text-slate-600" />
              Manage Live Queue
            </Link>
            <Link
              href="/patients?action=new"
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs md:text-sm font-semibold rounded-xl shadow-sm transition-all inline-flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              New Patient Registration
            </Link>
          </div>
        </div>

        {/* Camp Progress Velocity Gauge */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Patient Turnout Progress</span>
              <span className="font-semibold text-slate-900">
                {CURRENT_CAMP.registeredCount} / {CURRENT_CAMP.targetBeneficiaries} ({Math.round((CURRENT_CAMP.registeredCount / CURRENT_CAMP.targetBeneficiaries) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((CURRENT_CAMP.registeredCount / CURRENT_CAMP.targetBeneficiaries) * 100))}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Consultations Completed</span>
              <span className="font-semibold text-teal-800">
                {CURRENT_CAMP.completedConsultations} of {CURRENT_CAMP.registeredCount} registered
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((CURRENT_CAMP.completedConsultations / CURRENT_CAMP.registeredCount) * 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end text-xs text-slate-500 gap-2">
            <span>Clinical Lead:</span>
            <span className="font-medium text-slate-800">{CURRENT_CAMP.leadPhysician}</span>
          </div>
        </div>
      </div>

      {/* Backend & Security Transparency Pill */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">Backend Status: </span>
            <span className="text-slate-600">
              Mock Data Layer Active. Supabase credentials have not been configured yet.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500 inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Field Privacy Guard: On
          </span>
          <Link
            href="/settings"
            className="text-teal-700 hover:text-teal-900 font-semibold underline text-xs shrink-0"
          >
            Review Security Settings
          </Link>
        </div>
      </div>

      {/* Operational KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Today</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-900">218</span>
            <span className="text-xs font-medium text-emerald-600">+14 in last hr</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Target: 350 community members</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor Consults</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-900">142</span>
            <span className="text-xs font-medium text-slate-600">65% complete</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Avg 6.2 mins per patient</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Queue</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-900">24</span>
            <span className="text-xs font-medium text-amber-700">Waiting stations</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Max wait time ~14 mins</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Unfinished Care</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-rose-700">3</span>
            <span className="text-xs font-medium text-rose-600 font-semibold">Critical Overdue</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Assigned to ASHA workers</p>
        </div>
      </div>

      {/* Quick Fast Patient Lookup for Field Desk */}
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <form onSubmit={handleQuickPatientLookup} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Quick Patient Lookup: Enter Nirogya ID (e.g. NIR-8821), Phone, or Name..."
              value={quickSearchId}
              onChange={(e) => setQuickSearchId(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs md:text-sm font-semibold transition-colors shrink-0"
          >
            Find Record
          </button>
        </form>
        {searchFeedback && (
          <div className="mt-2 text-xs p-2 rounded bg-teal-50 text-teal-900 border border-teal-200 font-medium">
            {searchFeedback}
          </div>
        )}
      </div>

      {/* Main Grid: Live Queue & Unfinished Care Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Queue Snapshot (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 md:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900 text-base md:text-lg">Live Station Queue</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">
                  {MOCK_QUEUE.length} In Flow
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Real-time token management across camp desks</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'Consultation', 'Lab', 'Vitals', 'Pharmacy'].map((stageFilter) => (
                <button
                  key={stageFilter}
                  onClick={() => setActiveQueueFilter(stageFilter)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    activeQueueFilter === stageFilter
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {stageFilter}
                </button>
              ))}
            </div>
          </div>

          {/* Queue Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-50 text-slate-600 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Token #</th>
                  <th className="py-2.5 px-4">Patient</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Current Station</th>
                  <th className="py-2.5 px-4">Status / Wait</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-sm text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                        #{item.tokenNumber}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{item.patientName}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.patientId} • {item.age}y/{item.gender}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-slate-700 font-medium">{item.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                        <Activity className="w-3.5 h-3.5 text-teal-600" />
                        {item.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {item.status === 'in_progress' ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          In Progress
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
                          <Clock className="w-3 h-3" />
                          Wait ~{item.waitMinutes}m
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/consultations?token=${item.tokenNumber}`}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-900 hover:underline"
                      >
                        Open Desk &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Showing live token flow for Ramanagara Camp</span>
            <Link href="/queue" className="font-semibold text-teal-700 hover:underline flex items-center gap-1">
              Full Queue Operations Display <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Unfinished Care Tracker (Core Value Prop) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 md:p-5 border-b border-slate-200 bg-rose-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-slate-900 text-base">Unfinished Care Alerts</h2>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-800">
                  3 Open
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Patients from previous camps requiring post-camp follow-up or hospital triage.
              </p>
            </div>

            <div className="divide-y divide-slate-100 p-2">
              {MOCK_UNFINISHED_CARE.map((item) => (
                <div key={item.id} className="p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{item.patientName}</span>
                      <span className="text-[11px] text-slate-500 ml-1.5 font-mono">({item.patientId})</span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.severity === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium mt-1">{item.flagType}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{item.notes}</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <PhoneCall className="w-3 h-3 text-slate-400" />
                      {item.phone}
                    </span>
                    <span className="font-semibold text-teal-700">
                      ASHA: {item.assignedHealthWorker.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200">
              <Link
                href="/unfinished-care"
                className="w-full py-2 px-3 rounded-lg bg-white border border-slate-300 hover:border-teal-400 hover:text-teal-700 text-center font-semibold text-xs text-slate-700 block transition-colors"
              >
                Open Longitudinal Follow-up Board &rarr;
              </Link>
            </div>
          </div>

          {/* Screening Yield & Triage Distribution Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">
              Field Screening Yield (Today)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Vital measurements detected during morning triage
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 font-medium">Hypertension Identified (BP &ge; 140/90)</span>
                  <span className="font-bold text-slate-900">38% (83 patients)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: '38%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 font-medium">Elevated Random Blood Sugar (&ge; 200 mg/dL)</span>
                  <span className="font-bold text-slate-900">22% (48 patients)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '22%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 font-medium">Hospital Referral Recommended</span>
                  <span className="font-bold text-slate-900">6.4% (14 patients)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: '16%' }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Clinical Protocol:</span>
              <span className="font-semibold text-slate-800">ICMR / MoHFW Standards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
