'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Settings, Database, Shield, Lock, Key, Server, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & System Configuration"
        subtitle="Manage Supabase connectivity, role-based access control (RBAC), and offline field sync policies."
        badge="Platform Config"
        badgeType="teal"
      />

      {/* Supabase Connectivity Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Database & Backend Integration</h2>
              <p className="text-xs text-slate-500">Supabase (PostgreSQL, Auth & Storage)</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            Mock Data Mode
          </span>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 text-xs text-slate-700 space-y-2 border border-slate-200">
          <p className="font-semibold text-slate-800">Connection Status:</p>
          <p className="text-slate-600">
            The platform is operating with an isolated local demonstration data layer. To activate persistent live storage, populate the following environment variables in <code>.env.local</code>:
          </p>
          <ul className="list-disc pl-5 font-mono text-[11px] text-teal-900 space-y-1">
            <li>NEXT_PUBLIC_SUPABASE_URL=&lt;your-project-url&gt;</li>
            <li>NEXT_PUBLIC_SUPABASE_ANON_KEY=&lt;your-anon-key&gt;</li>
            <li>SUPABASE_SERVICE_ROLE_KEY=&lt;for-admin-operations&gt;</li>
          </ul>
        </div>
      </div>

      {/* Security & Role-Based Permissions Policy */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base">Patient Privacy & Role Access Control (RBAC)</h2>
            <p className="text-xs text-slate-500">PostgreSQL Row-Level Security (RLS) policies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">Row-Level Security (RLS)</h4>
            <p className="text-slate-600">
              Ensures medical officers only access patients within their assigned camp session, and community health workers only access patients within their assigned village clusters.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">Human Clinical Oversight Policy</h4>
            <p className="text-slate-600">
              Strictly prohibits automated clinical decision making or algorithmic prescription generation without explicit human clinician validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
