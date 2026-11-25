'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '../common/RoleContext';
import { 
  LayoutDashboard, 
  Tent, 
  Users, 
  UserPlus, 
  ListOrdered, 
  Stethoscope, 
  AlertTriangle, 
  History, 
  Bell, 
  BarChart3, 
  FileText, 
  Settings,
  HeartPulse,
  ChevronRight,
  ShieldAlert,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { role, roleTitle } = useRole();

  const navigationItems = [
    {
      title: 'Operations & Flow',
      items: [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['coordinator', 'doctor', 'triage_nurse', 'health_worker', 'pharmacist'] },
        { href: '/camps', label: 'Health Camps', icon: Tent, roles: ['coordinator', 'triage_nurse', 'health_worker'] },
        { href: '/queue', label: 'Live Queue', icon: ListOrdered, roles: ['coordinator', 'doctor', 'triage_nurse', 'pharmacist'] },
        { href: '/patients', label: 'Patients', icon: UserPlus, roles: ['coordinator', 'doctor', 'triage_nurse', 'health_worker'] },
        { href: '/consultations', label: 'Consultations', icon: Stethoscope, roles: ['coordinator', 'doctor', 'pharmacist'] },
      ],
    },
    {
      title: 'Care Continuity',
      items: [
        { 
          href: '/unfinished-care', 
          label: 'Unfinished Care', 
          icon: AlertTriangle, 
          roles: ['coordinator', 'doctor', 'health_worker'],
          badge: '3 Critical'
        },
        { href: '/history', label: 'Patient Visit History', icon: History, roles: ['coordinator', 'doctor', 'health_worker'] },
        { href: '/notifications', label: 'Camp Notifications', icon: Bell, roles: ['coordinator', 'doctor', 'triage_nurse', 'health_worker', 'pharmacist'] },
      ],
    },
    {
      title: 'Administration & Impact',
      items: [
        { href: '/staff', label: 'Staff & Volunteers', icon: Users, roles: ['coordinator'] },
        { href: '/analytics', label: 'Impact & Analytics', icon: BarChart3, roles: ['coordinator', 'doctor'] },
        { href: '/reports', label: 'Reports & Exports', icon: FileText, roles: ['coordinator', 'doctor'] },
        { href: '/settings', label: 'Settings & Security', icon: Settings, roles: ['coordinator'] },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800 bg-slate-950/60">
          <Link href="/dashboard" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-teal-900/40 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-white tracking-wider flex items-center gap-1.5">
                NIROGYA
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">
                  Care
                </span>
              </span>
              <span className="text-[10px] text-teal-400 font-medium truncate max-w-[145px]">
                One camp. Every patient.
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Role Capsule */}
        <div className="p-3 mx-3 my-2 rounded-lg bg-slate-800/70 border border-slate-700/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">Current Role</span>
            <span className="text-[10px] text-slate-400">Live Scoped</span>
          </div>
          <p className="text-xs font-semibold text-white mt-0.5 truncate">{roleTitle}</p>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
          {navigationItems.map((group) => {
            return (
              <div key={group.title}>
                <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  {group.title}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const hasAccess = item.roles.includes(role);
                    const Icon = item.icon;

                    if (!hasAccess) {
                      return (
                        <div
                          key={item.href}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-600 cursor-not-allowed select-none opacity-50"
                          title={`Locked for ${roleTitle} role`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-slate-600" />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-500">
                            Restricted
                          </span>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-teal-700 text-white font-semibold shadow-sm'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-400/80'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info: Field Sync & Offline readiness */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Security Layer</span>
            <span className="text-teal-400 font-mono text-[10px]">RLS Ready</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Nirogya v0.1 • Field-first Platform
          </div>
        </div>
      </aside>
    </>
  );
}
