'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeType?: 'teal' | 'amber' | 'emerald' | 'blue';
  actionButton?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  badgeType = 'teal',
  actionButton,
}: PageHeaderProps) {
  const badgeClasses = {
    teal: 'bg-teal-50 text-teal-800 border-teal-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    blue: 'bg-sky-50 text-sky-800 border-sky-200',
  }[badgeType];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-6 border-b border-slate-200 mb-6">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {badge && (
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${badgeClasses}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs md:text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>

      {actionButton && (
        <div className="flex items-center gap-2">
          <button
            onClick={actionButton.onClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm font-medium shadow-sm transition-all active:scale-[0.98]"
          >
            {actionButton.icon}
            {actionButton.label}
          </button>
        </div>
      )}
    </div>
  );
}
