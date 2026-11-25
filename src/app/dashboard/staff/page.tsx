'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Users, Shield, Stethoscope, HeartHandshake, Pill, Activity, Check } from 'lucide-react';

export default function StaffPage() {
  const staffMembers = [
    { name: 'Dr. Anita Rao', role: 'Medical Officer (Lead)', specialty: 'Community Medicine', station: 'Doctor Desk 1', status: 'Active' },
    { name: 'Dr. Suresh Patil', role: 'Physician', specialty: 'General Medicine & Diabetology', station: 'Doctor Desk 2', status: 'Active' },
    { name: 'Sister Mary Varghese', role: 'Staff Nurse', specialty: 'Triage & Vital Signs', station: 'Triage Desk', status: 'Active' },
    { name: 'Lakshmi Devi', role: 'ASHA Facilitator', specialty: 'Village Outreach & Follow-up', station: 'Community Tracking', status: 'On Field' },
    { name: 'Ravi Kumar', role: 'Pharmacist', specialty: 'Drug Dispensing & Logistics', station: 'Pharmacy Counter', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff & Volunteer Management"
        subtitle="Organize camp medical officers, triage nurses, ASHA facilitators, and logistics volunteers."
        badge="Field Team"
        badgeType="teal"
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 text-sm">Deployed Camp Personnel (#NC-2026-08)</h2>
          <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-semibold">5 Members On Duty</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 text-slate-600 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Name</th>
                <th className="py-2.5 px-4">Role & Designation</th>
                <th className="py-2.5 px-4">Specialty / Desk</th>
                <th className="py-2.5 px-4">Assigned Station</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffMembers.map((staff, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900">{staff.name}</td>
                  <td className="py-3 px-4 text-slate-700">{staff.role}</td>
                  <td className="py-3 px-4 text-slate-600">{staff.specialty}</td>
                  <td className="py-3 px-4 font-medium text-teal-800">{staff.station}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      {staff.status}
                    </span>
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
