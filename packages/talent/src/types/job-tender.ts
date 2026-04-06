export type PositionStatus = 'draft' | 'pending_approval' | 'open' | 'closed' | 'cancelled';

export type ApplicationStatus = 
  | 'submitted' 
  | 'screening' 
  | 'shortlisted' 
  | 'interview' 
  | 'offered' 
  | 'accepted' 
  | 'rejected' 
  | 'withdrawn';

export interface Position {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  organizationName: string;
  jobFamilyId: string;
  jobFamilyName: string;
  gradeJabatan: number;
  bandJabatan: string;
  location: string;
  company: string;
  incumbentId?: string;
  incumbentName?: string;
  quota: number;
  status: PositionStatus;
  deadline: string;
  applicantCount: number;
  periodId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScreeningResult {
  eligible: boolean;
  gradeCheck: 'pass' | 'fail';
  jobFamilyCheck: 'pass' | 'fail';
  disciplinaryCheck: 'pass' | 'fail';
}

export interface Application {
  id: string;
  positionId: string;
  positionTitle: string;
  position?: Position; // Optional expanded position data
  employeeId: string;
  status: ApplicationStatus;
  screeningResult?: ScreeningResult;
  eqsScore?: number;
  statementAccepted: boolean;
  submittedAt: string;
  updatedAt: string;
  rejectionReason?: string;
}

export interface SavedJob {
  id: string;
  positionId: string;
  positionTitle: string;
  position?: Position; // Optional expanded position data
  employeeId: string;
  savedAt: string;
  positionStatus: PositionStatus;
  deadline: string;
}

export interface ApplicationTimeline {
  id: string;
  applicationId: string;
  fromStatus?: string;
  toStatus: string;
  changedBy: string;
  changedByName: string;
  notes?: string;
  changedAt: string;
}

export interface TenderPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'closed';
  maxApplications: number;
  posterUrl?: string;
}
