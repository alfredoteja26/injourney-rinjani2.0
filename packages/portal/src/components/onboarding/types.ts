export interface OnboardingState {
  hasSeenSpotlight: boolean;
  seenFeatureVersions: string[];
  hasCompletedNewEmployeeOnboarding?: boolean;
  newEmployeeChecklistProgress?: string[]; // Array of completed checklist item IDs
}

export type NewEmployeeChecklistItem = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  deadline?: string; // ISO date string for task deadline
  pic?: string; // Person In Charge email/name
  picEmail?: string; // PIC email for notifications
  action?: {
    type: 'link' | 'external' | 'function';
    label: string;
    url?: string;
    onClick?: () => void;
  };
};

export type TeamMember = {
  name: string;
  position: string;
  email: string;
  avatar?: string;
};

export type EmployeeInfo = {
  position: string;
  unit: string;
  manager: TeamMember;
  teammates?: TeamMember[];
};

export type CompanyFacility = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'device' | 'benefit' | 'access';
};