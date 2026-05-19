import type { WorkerProfileAccessContext as SharedWorkerProfileAccessContext } from "@rinjani/shared-types";

export type WorkerProfileViewerRole =
  | "employee"
  | "manager"
  | "hc_admin"
  | "talent_admin"
  | "talent_committee"
  | "portal_admin";

export type WorkerProfileAccessContext = SharedWorkerProfileAccessContext;

export type WorkerProfileSectionId = "core" | "talent" | "performance" | "governance";

export type WorkerProfileEditState =
  | "hidden"
  | "masked"
  | "read_only"
  | "editable_direct"
  | "editable_with_approval";

export interface ProfileSectionVisibility {
  coreCV: boolean;
  talentInsights: boolean;
  performanceInsights: boolean;
  governanceHistory: boolean;
  exportAvailable: boolean;
}

export interface GovernanceAccessPolicy {
  viewerRole: WorkerProfileViewerRole;
  accessContext: WorkerProfileAccessContext;
  visibility: ProfileSectionVisibility;
  allowedExportSectionIds: WorkerProfileSectionId[];
}

export interface WorkerProfileCore {
  employeeId: string;
  fullName: string;
  preferredName?: string | null;
  corporateEmail?: string | null;
  positionTitle?: string | null;
  organizationName?: string | null;
  companyName?: string | null;
  gradeLabel?: string | null;
  employeeNumber?: string | null;
  photoUrl?: string | null;
  summary?: string | null;
}

export interface TalentInsights {
  talentClassification?: {
    eqsScore: number | null;
    eqsBand?: string | null;
    calculatedAt?: string | null;
    formulaVersion?: string | null;
    cluster?: string | null;
    performanceAxisScore?: number | null;
    capacityAxisScore?: number | null;
    isTopTalent?: boolean;
    riskProfile?: string | null;
    readiness?: string | null;
    eqsComponents?: Array<{
      componentType: string;
      weight: number;
      rawValue: number;
      weightedValue: number;
    }>;
  };
  careerAspiration?: {
    totalAspirations?: number;
    bySource?: Record<string, number>;
    hasAspiration?: boolean;
    pendingReviewCount?: number;
    notes?: string[];
  };
  developmentPlan?: {
    status?: string | null;
    cycleId?: string | null;
    totalHours?: number | null;
    completedHours?: number | null;
    activityCount?: number | null;
    completedActivities?: number | null;
  };
  assessment360?: {
    cycleName?: string | null;
    overallScore?: number | null;
    publishedAt?: string | null;
  };
  jobTender?: {
    activeApplications: number;
    latestStatus?: string | null;
    positions?: string[];
  };
  succession?: {
    positionTitles?: string[];
    readiness?: string[];
  };
}

export interface PerformanceInsights {
  performanceSummary?: {
    latestScore?: number | null;
    latestRating?: string | null;
    reviewPeriod?: string | null;
    history?: Array<{
      period: string;
      rating: string | number;
      score?: number | null;
    }>;
  };
  myKpi?: {
    planningStatus?: string | null;
    totalItems?: number | null;
    approvalState?: string | null;
    monitoringStatus?: string | null;
  };
  myTeamKpi?: {
    pendingVerificationCount?: number | null;
    pendingApprovalCount?: number | null;
    averageAchievement?: number | null;
    riskState?: string | null;
  };
}

export interface WorkerGovernanceHistory {
  reviewCommittee?: {
    proposals: Array<{
      id: string;
      proposalType: string;
      status: string;
      justification: string;
      submittedAt: string;
    }>;
    recommendations: Array<{
      id: string;
      zonasi: string;
      status: string;
      rationale: string;
      submittedAt: string;
    }>;
    decisions: Array<{
      id: string;
      outcome: string;
      rationale: string;
      decidedAt: string;
    }>;
  };
}

export interface ProfileExportPreset {
  id: string;
  label: string;
  sectionIds: WorkerProfileSectionId[];
}

export interface ProfileExportJobSection {
  id: WorkerProfileSectionId;
  label: string;
  records: unknown;
}

export interface ProfileExportJob {
  employeeId: string;
  employeeName: string;
  format: "pdf" | "xlsx";
  presetId: string;
  fileName: string;
  sections: ProfileExportJobSection[];
  metadata: {
    language: string;
    includeSensitiveFields: boolean;
    generatedAt: string;
  };
}

export interface WorkerProfile {
  core: WorkerProfileCore;
  talentInsights: TalentInsights;
  performanceInsights: PerformanceInsights;
  governanceHistory: WorkerGovernanceHistory;
  visibility: ProfileSectionVisibility;
  exportPresets: ProfileExportPreset[];
  deepLinks: Record<string, string>;
}

export interface WorkerProfileBuildInput {
  employeeId: string;
  viewerRole: WorkerProfileViewerRole;
  accessContext: WorkerProfileAccessContext;
  viewerEmployeeId?: string;
}

export interface BuildProfileExportJobInput {
  profile: WorkerProfile;
  format: "pdf" | "xlsx";
  presetId: string;
  includeSectionIds: WorkerProfileSectionId[];
  includeSensitiveFields: boolean;
  language: string;
}

export interface WorkerDirectoryEntry {
  employeeId: string;
  employeeNumber?: string | null;
  email?: string | null;
  name: string;
  companyName?: string | null;
  organizationName?: string | null;
  positionTitle?: string | null;
  sourceTags: string[];
}
