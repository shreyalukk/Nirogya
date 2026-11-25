'use client';

import React from 'react';
import { useRole } from './RoleContext';
import { AlertCircle, Database, ShieldAlert, X } from 'lucide-react';

export default function DemoBanner() {
  const { isDemoMode, setIsDemoMode } = useRole();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isDemoMode || dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs md:text-sm text-amber-900 flex items-center justify-between gap-3 shadow-sm">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-xs">
          <Database className="w-3.5 h-3.5" />
          DEMO DATA ACTIVE
        </span>
        <span className="font-medium">
          Showing fictional demonstration data for <strong>Ramanagara Rural Health Camp (#NC-2026-08)</strong>.
        </span>
        <span className="text-amber-700 hidden sm:inline">
          No live patient records or clinical diagnoses are transmitted.
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-700 hover:text-amber-950 p-1 rounded hover:bg-amber-100 transition-colors"
          title="Dismiss warning for this session"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
