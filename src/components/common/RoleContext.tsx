'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  roleTitle: string;
  roleDescription: string;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
}

const roleDetails: Record<UserRole, { title: string; description: string }> = {
  coordinator: {
    title: 'Camp Coordinator',
    description: 'Full oversight: camp planning, staff distribution, live queues, reports & platform settings',
  },
  doctor: {
    title: 'Medical Officer / Doctor',
    description: 'Clinical consultations, review of vitals, referral recommendations & treatment notes',
  },
  triage_nurse: {
    title: 'Triage & Vitals Staff',
    description: 'Patient check-in, BP/Blood Sugar/SpO2 recording, and queue priority assignment',
  },
  health_worker: {
    title: 'Community Health Worker (ASHA/CHO)',
    description: 'Longitudinal follow-ups, unfinished care tracking, village outreach & home visits',
  },
  pharmacist: {
    title: 'Pharmacy & Lab Officer',
    description: 'Medication dispensing, point-of-care rapid testing & stock reconciliation',
  },
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('coordinator');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        roleTitle: roleDetails[role].title,
        roleDescription: roleDetails[role].description,
        isDemoMode,
        setIsDemoMode,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
