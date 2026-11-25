'use client';

import React, { useState } from 'react';
import { useRole } from '../common/RoleContext';
import { CURRENT_CAMP } from '@/data/mockData';
import { UserRole } from '@/types';
import { 
  Menu, 
  MapPin, 
  ChevronDown, 
  UserCheck, 
  Bell, 
  Wifi, 
  Plus, 
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Activity,
  HeartHandshake,
  Pill
} from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { role, setRole, roleTitle, roleDescription } = useRole();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [showQuickRegModal, setShowQuickRegModal] = useState(false);

  const rolesList: { id: UserRole; title: string; badge: string; icon: any }[] = [
    { id: 'coordinator', title: 'Camp Coordinator', badge: 'Admin', icon: ShieldCheck },
    { id: 'doctor', title: 'Medical Officer / Doctor', badge: 'Clinical', icon: Stethoscope },
    { id: 'triage_nurse', title: 'Triage & Vitals Staff', badge: 'Field Desk', icon: Activity },
    { id: 'health_worker', title: 'Community Health Worker', badge: 'Field Outreach', icon: HeartHandshake },
    { id: 'pharmacist', title: 'Pharmacy & Lab Officer', badge: 'Dispensing', icon: Pill },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile toggle + Active Camp Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse hidden sm:block" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {CURRENT_CAMP.code}
                </span>
                <span className="text-xs md:text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {CURRENT_CAMP.name}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span className="truncate">{CURRENT_CAMP.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions, Role Switcher, Notifications, Quick Reg */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Offline Sync Status */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs border border-slate-200">
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>Field Sync: Online</span>
          </div>

          {/* Quick Fast Registration Button */}
          <Link
            href="/patients?action=new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs md:text-sm font-medium rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Fast Check-in</span>
            <span className="sm:hidden">Check-in</span>
          </Link>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-teal-300 bg-slate-50 hover:bg-teal-50/50 text-slate-800 text-xs md:text-sm transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                {role.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold leading-tight text-slate-900">{roleTitle}</span>
                <span className="text-[10px] text-teal-700">Role View (Interactive)</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {roleDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setRoleDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-2">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Switch Camp Staff View</p>
                    <p className="text-[11px] text-slate-500">Test role-specific permission scopes and workflows</p>
                  </div>
                  <div className="py-1">
                    {rolesList.map((r) => {
                      const Icon = r.icon;
                      const isActive = role === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            setRole(r.id);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            isActive
                              ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                            <span>{r.title}</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 font-medium">
                            {r.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-1 pt-2 border-t border-slate-100 px-3 py-1 text-[11px] text-slate-400">
                    Active role limits sensitive patient data and unlocks station tools.
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Notifications Link */}
          <Link
            href="/notifications"
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            title="Camp Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </Link>
        </div>
      </div>
    </header>
  );
}
