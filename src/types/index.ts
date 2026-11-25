export type UserRole = 
  | 'coordinator' 
  | 'doctor' 
  | 'triage_nurse' 
  | 'health_worker' 
  | 'pharmacist';

export interface Camp {
  id: string;
  name: string;
  code: string;
  location: string;
  district: string;
  date: string;
  status: 'active' | 'upcoming' | 'completed';
  targetBeneficiaries: number;
  registeredCount: number;
  completedConsultations: number;
  leadPhysician: string;
}

export interface Patient {
  id: string;
  nirogyaId: string;
  fullName: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  phone: string;
  village: string;
  lastVisitDate: string;
  triageCategory: 'normal' | 'priority' | 'urgent';
  vitals: {
    bp: string;
    bloodSugar: number;
    pulse: number;
    spo2: number;
    bmi: number;
  };
  chronicConditions: string[];
}

export interface QueueItem {
  id: string;
  tokenNumber: number;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  category: 'General OPD' | 'Hypertension / Diabetes' | 'Pediatrics' | 'Ophthalmology' | 'Gynecology';
  stage: 'Registration' | 'Triage / Vitals' | 'Doctor Consultation' | 'Diagnostics / Lab' | 'Pharmacy Dispensing' | 'Completed';
  status: 'waiting' | 'in_progress' | 'completed' | 'referred';
  waitMinutes: number;
  assignedDoctor?: string;
}

export interface UnfinishedCareItem {
  id: string;
  patientId: string;
  patientName: string;
  phone: string;
  village: string;
  campName: string;
  flagType: 'Pending Lab Review' | 'Hospital Referral' | 'Medication Adherence' | 'Critical BP Follow-up';
  daysOverdue: number;
  severity: 'high' | 'medium' | 'critical';
  assignedHealthWorker: string;
  notes: string;
  status: 'open' | 'contacted' | 'resolved';
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle: string;
  iconName: string;
}
