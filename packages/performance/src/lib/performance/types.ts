export type PersonaRole = 'KARYAWAN' | 'ATASAN' | 'HC_ADMIN' | 'HC_ADMIN_HO';

export interface Employee {
  employeeNumber: string;
  displayName: string;
  positionTitle: string;
  organizationName: string;
  bandJabatan: 'Utama' | 'Madya' | 'Muda' | 'Pratama' | 'General';
  jobType: 'STRUKTURAL' | 'NON_STRUKTURAL';
  positionMasterVariantId: string;
  directSupervisorId?: string;
}

export interface PerformancePeriod {
  id: string;
  year: number;
  phase: 'PLANNING' | 'MONITORING_Q1' | 'MONITORING_Q2' | 'MONITORING_Q3' | 'YEAR_END' | 'CLOSED';
  planningDeadline: string;
  monitoringDeadline: string;
  status: 'OPEN' | 'LOCKED' | 'CLOSED';
}

export interface BandKpiFormula {
  id: string;
  bandJabatan: Employee['bandJabatan'];
  jobType: Employee['jobType'];
  kpiBersamaWeight: number;
  kpiUnitWeight: number;
  year: number;
  effectiveFrom: string;
}

export interface KpiRuleConfig {
  id: string;
  year: number;
  minItemsPerType: number;
  maxItemsPerType: number | null;
  minWeightPerItem: number;
  maxWeightPerItem: number;
  globalCapType: 'NO_CAP' | 'CAPPED_100' | 'CAPPED_110' | 'CAPPED_120';
  categoryBasedScoringEnabled: boolean;
}

export interface DeadlineConfig {
  id: string;
  phase: 'PLANNING' | 'MONITORING' | 'YEAR_END';
  deadlineDate: string;
  penaltyType: 'NONE' | 'LATE_FLAG' | 'AUTO_ZERO';
  extensionMaxDays: number;
  extensionMaxRequests: number;
  autoApproveTimeoutDays: number;
}

export interface RatingScaleConfig {
  id: string;
  method: 'FIXED' | 'POPULATION_BASED';
  ranges: Array<{ label: string; min: number; max: number }>;
}

export interface MutationScoringPolicy {
  id: string;
  year: number;
  proRataMethod: 'WEIGHTED_AVERAGE' | 'LONGEST_DURATION' | 'MINIMUM_DURATION';
  minimumDurationMonths: number;
  cutoffDay: number;
  carryOverEnabled: boolean;
}

export type KpiItemApprovalStatus =
  | 'DRAFT'
  | 'ALLOCATED'
  | 'WAITING_REVIEW'
  | 'WAITING_FOR_APPROVAL'
  | 'PENDING_CLARIFICATION'
  | 'APPROVED'
  | 'APPROVED_ADJUSTED'
  | 'REJECTED';

export interface KpiItem {
  id: string;
  title: string;
  kpiType: 'BERSAMA' | 'UNIT';
  source: 'ADMIN_UPLOAD' | 'LIBRARY' | 'CUSTOM' | 'CASCADED';
  targetType: 'FIXED' | 'PROGRESSIVE' | 'QUARTERLY';
  targetValue: string;
  targetUnit: string;
  polarity: 'POSITIVE' | 'NEGATIVE';
  monitoringPeriod: 'MONTHLY' | 'QUARTERLY' | 'SEMESTER' | 'ANNUAL';
  capType: KpiRuleConfig['globalCapType'];
  formula?: string;
  lockedAttributes: string[];
  approvalStatus: KpiItemApprovalStatus;
  weight: number;
  ownerEmployeeNumber: string;
}

export interface KpiOwnership {
  id: string;
  kpiItemId: string;
  employeeNumber: string;
  positionMasterVariantId: string;
  ownershipType: 'OWNER' | 'COLLABORATOR' | 'SHARED_OWNER';
  weight: number;
  weightApprovalStatus: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  year: number;
  startDate: string;
  endDate: string;
}

export interface Evidence {
  id: string;
  type: 'FILE' | 'LINK';
  label: string;
  value: string;
  uploadedBy: string;
}

export interface KpiRealization {
  id: string;
  kpiItemId: string;
  employeeNumber: string;
  period: 'Q1' | 'Q2' | 'Q3' | 'YEAR_END';
  actualValue: string;
  progressNote: string;
  evidence: Evidence[];
  lateFlag: boolean;
  status: 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED' | 'ADJUSTED';
}

export interface KpiScore {
  id: string;
  kpiItemId: string;
  achievementPct: number;
  performanceIndex: number;
  weightedScore: number;
  capApplied: boolean;
  scoringRuleVersion: string;
  year: number;
}

export interface ExtensionRequest {
  id: string;
  performancePeriodId: string;
  requestedBy: string;
  reason: string;
  requestedDays: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewedBy?: string;
  newDeadline?: string;
}

export interface AdjustmentRequest {
  id: string;
  requestedBy: string;
  type: 'KPI_CHANGE' | 'WEIGHT_CHANGE' | 'TARGET_CHANGE' | 'ITEM_ADD' | 'ITEM_REMOVE';
  kpiItemId?: string;
  justification: string;
  oldValue: string;
  newValue: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION_REQUESTED';
  reviewedBy?: string;
  reviewNotes?: string;
  slaDeadline: string;
}

export type WorkflowAction =
  | 'SUBMIT_PLANNING'
  | 'APPROVE_PLANNING'
  | 'CLARIFY_PLANNING'
  | 'REJECT_PLANNING'
  | 'SUBMIT_REALIZATION'
  | 'VERIFY_REALIZATION'
  | 'ADJUST_REALIZATION'
  | 'CASCADE_KPI'
  | 'SUBMIT_LIBRARY_ITEM'
  | 'VALIDATE_LIBRARY_ITEM'
  | 'PUBLISH_LIBRARY_ITEM'
  | 'DEPRECATE_LIBRARY_ITEM'
  | 'TREE_BULK_DRY_RUN'
  | 'FORCE_FINALIZE'
  | 'YEAR_CLOSE'
  | 'SAVE_HQ_POLICY';

export interface WorkflowEvent {
  id: string;
  action: WorkflowAction;
  actorRole: PersonaRole;
  actorName: string;
  target: string;
  createdAt: string;
  note: string;
}

export interface AuditLogEntry extends WorkflowEvent {
  entityType: 'KPI_PLAN' | 'KPI_REALIZATION' | 'KPI_LIBRARY' | 'KPI_TREE' | 'HQ_CONFIG' | 'PERFORMANCE_PERIOD';
  oldValue?: string;
  newValue?: string;
}

export interface LibrarySubmission {
  id: string;
  title: string;
  submittedBy: string;
  status: 'DRAFT' | 'SUBMITTED' | 'VALIDATED' | 'PUBLISHED' | 'REJECTED' | 'DEPRECATED';
  similarityPct: number;
  validationSla: string;
  approvalSla: string;
  capType: KpiRuleConfig['globalCapType'];
  lockedAttributes: string[];
}

export interface TreeAlignmentWarning {
  id: string;
  label: 'ORPHAN_KPI' | 'MISSING_PARENT' | 'DUPLICATE_SUSPECTED' | 'WEIGHT_MISMATCH' | 'UNALLOCATED';
  kpiTitle: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  owner: string;
}

export interface BulkUploadDryRunResult {
  id: string;
  mode: 'CREATE_ONLY';
  totalRows: number;
  validRows: number;
  rejectedRows: number;
  message: string;
}

export interface PerformancePrototypeState {
  persona: PersonaRole;
  employees: Employee[];
  period: PerformancePeriod;
  bandFormula: BandKpiFormula;
  ruleConfig: KpiRuleConfig;
  deadlineConfig: DeadlineConfig;
  ratingScale: RatingScaleConfig;
  mutationPolicy: MutationScoringPolicy;
  kpiItems: KpiItem[];
  ownerships: KpiOwnership[];
  realizations: KpiRealization[];
  scores: KpiScore[];
  extensionRequests: ExtensionRequest[];
  adjustmentRequests: AdjustmentRequest[];
  librarySubmissions: LibrarySubmission[];
  treeWarnings: TreeAlignmentWarning[];
  bulkUploadDryRun: BulkUploadDryRunResult;
  auditLog: AuditLogEntry[];
  forceFinalized: boolean;
  yearClosed: boolean;
  lastMessage: string;
}
