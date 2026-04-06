export type OffboardingStatus = 'ready-to-offboard' | 'in-progress' | 'completed' | 'cancel-resign';

export type TaskStatus = 'to-do' | 'in-progress' | 'done';

export type OffboardingChecklistItem = {
  id: string;
  title: string;
  description: string;
  category: 'document' | 'equipment' | 'access' | 'knowledge-transfer' | 'administrative';
  status: TaskStatus;
  pic?: string;
  picEmail?: string;
  completedBy?: string;
  completedDate?: string;
  notes?: string;
};

export type ResignationInfo = {
  resignationType: 'voluntary' | 'involuntary' | 'retirement' | 'end-of-contract';
  resignationDate: string;
  lastWorkingDate: string;
  reason?: string;
  noticeGiven: boolean;
  noticePeriodDays?: number;
};

export type OffboardingEmployee = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  status: OffboardingStatus;
  resignationInfo?: ResignationInfo;
  checklistItems: OffboardingChecklistItem[];
  progress: number; // percentage
  hasAssets?: boolean;
  hasLoans?: boolean;
  exitInterviewCompleted?: boolean;
  initiatedBy?: string;
  initiatedDate?: string;
  completedDate?: string;
};

export type OffboardingChecklistTemplate = {
  id: string;
  title: string;
  description: string;
  category: 'document' | 'equipment' | 'access' | 'knowledge-transfer' | 'administrative';
  pic: string;
  picEmail: string;
  order: number;
  mandatory: boolean;
};