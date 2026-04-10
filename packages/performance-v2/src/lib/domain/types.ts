/** Domain semantics aligned to DIP-1 … DIP-7 (design input packs). */

export type BandJabatanSemantic = "Utama" | "Madya" | "Muda" | "Pratama";
export type JobTypeSemantic = "STRUKTURAL" | "NON_STRUKTURAL";

export type PerformancePhase = "PLANNING" | "MONITORING" | "YEAR_END";
export type PerformancePeriodStatus = "OPEN" | "CLOSED" | "DRAFT";

export type KpiType = "BERSAMA" | "UNIT";
export type Polarity = "POSITIVE" | "NEGATIVE" | "NEUTRAL";
export type TargetType = "FIXED" | "PROGRESSIVE";
export type MonitoringPeriod = "QUARTERLY" | "SEMESTER" | "ANNUAL";
export type CapType = "NO_CAP" | "CAPPED_100" | "CAPPED_110" | "CAPPED_120" | "CUSTOM";
export type BscPerspective = "FINANCIAL" | "CUSTOMER" | "INTERNAL_PROCESS" | "LEARNING_GROWTH";
export type KpiSource = "LIBRARY" | "ADMIN_UPLOAD" | "CUSTOM" | "P_KPI";

export type KpiItemApprovalStatus =
  | "DRAFT"
  | "ALLOCATED"
  | "WAITING_REVIEW"
  | "WAITING_FOR_APPROVAL"
  | "PENDING_CLARIFICATION"
  | "APPROVED"
  | "APPROVED_ADJUSTED"
  | "REJECTED";

export type OwnershipType = "OWNER" | "COLLABORATOR" | "SHARED_OWNER";
export type WeightApprovalStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";

export type PeriodKey = "Q1" | "Q2" | "Q3" | "Q4" | "S1" | "S2" | "ANNUAL";

export type CascadeMethod = "DIRECT" | "INDIRECT";

export type PortfolioStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "APPROVED"
  | "PARTIAL_APPROVED";

export type DictionaryItemStatus =
  | "DRAFT"
  | "PENDING_VALIDATION"
  | "VALIDATED"
  | "PENDING_APPROVAL"
  | "PUBLISHED"
  | "DEPRECATED";

export type DictionarySourceModule = "DIRECT" | "MY_PERFORMANCE" | "MY_TEAM_PERFORMANCE" | "PERFORMANCE_TREE";
export type DictionaryLockedAttribute =
  | "title"
  | "description"
  | "polarity"
  | "targetUnit"
  | "bscPerspective"
  | "monitoringPeriod"
  | "capType"
  | "formula";

export interface PerformancePeriod {
  id: string;
  year: number;
  name?: string;
  phase: PerformancePhase;
  status: PerformancePeriodStatus;
  planningStartDate: string;
  planningEndDate: string;
  monitoringSchedule?: string[];
  yearEndStartDate?: string;
  yearEndEndDate?: string;
  companyScope?: "ALL" | string[];
}

export interface BandKpiFormula {
  id: string;
  bandJabatan: BandJabatanSemantic;
  jobType: JobTypeSemantic;
  kpiBersamaWeightPct: number;
  kpiUnitWeightPct: number;
  year: number;
  effectiveFrom?: string;
}

export interface KpiTarget {
  id: string;
  kpiItemId: string;
  period: PeriodKey;
  targetValue: number;
  year: number;
}

export interface KpiItem {
  id: string;
  code?: string;
  title: string;
  description?: string;
  kpiType: KpiType;
  polarity: Polarity;
  targetType: TargetType;
  targetValue?: number;
  targetUnit: string;
  monitoringPeriod: MonitoringPeriod;
  capType: CapType;
  customCapValue?: number;
  bscPerspective?: BscPerspective;
  formula?: string;
  evidenceRequired?: boolean;
  categoryBasedScoring?: boolean;
  source: KpiSource;
  dictionaryItemId?: string;
  parentKpiId?: string;
  createdAt?: string;
  year: number;
  itemApprovalStatus: KpiItemApprovalStatus;
  /** Owner employee number (DIP) for this row in portfolio context */
  ownerEmployeeNumber: string;
}

export interface KpiOwnership {
  id: string;
  kpiItemId: string;
  employeeNumber: string;
  positionMasterVariantId?: string;
  ownershipType: OwnershipType;
  weightPct: number;
  weightApprovalStatus: WeightApprovalStatus;
  year: number;
  startDate?: string;
  endDate?: string;
}

export interface CascadeRelation {
  id: string;
  parentKpiId: string;
  childKpiId: string;
  cascadeMethod: CascadeMethod;
  accumulationEnabled: boolean;
}

export interface KpiDictionaryItem {
  id: string;
  code: string;
  title: string;
  description?: string;
  kpiType: KpiType;
  bscPerspective: BscPerspective;
  targetUnit: string;
  polarity: Polarity;
  monitoringPeriod: MonitoringPeriod;
  capType: CapType;
  customCapValue?: number;
  fixedWeight?: number | null;
  formula?: string;
  evidenceRequirement?: string;
  lockedAttributes: DictionaryLockedAttribute[];
  applicableFunctions?: string[];
  applicableBandJabatan?: BandJabatanSemantic[];
  status: DictionaryItemStatus;
  usageCount: number;
  submittedBy?: string;
  validatedBy?: string;
  approvedBy?: string;
  sourceModule?: DictionarySourceModule;
  createdAt?: string;
  publishedAt?: string;
  deprecatedAt?: string;
}

export interface DictionaryValidationRecord {
  id: string;
  dictionaryItemId: string;
  validatorId: string;
  action: "ACCEPT" | "REJECT";
  notes: string;
  similarItemWarning?: string[];
  createdAt: string;
}

export interface DictionaryApprovalRecord {
  id: string;
  dictionaryItemId: string;
  approverId: string;
  action: "PUBLISH" | "REJECT" | "SEND_BACK_TO_VALIDATION";
  notes: string;
  configuredLockedAttributes: DictionaryLockedAttribute[];
  configuredCapType?: CapType;
  configuredFixedWeight?: number | null;
  createdAt: string;
}

export interface DictionaryUsageRecord {
  id: string;
  dictionaryItemId: string;
  kpiItemId: string;
  employeeNumber: string;
  year: number;
  status: "ACTIVE" | "HISTORICAL";
}

export interface TeamPlanningStatusRow {
  employeeNumber: string;
  totalItems: number;
  itemsApproved: number;
  itemsDraft: number;
  itemsAllocated: number;
  totalWeightBersamaPct: number;
  totalWeightUnitPct: number;
  weightValid: boolean;
  portfolioStatus: PortfolioStatus;
  weightInvalidDetail?: string;
}

export type RealizationStatus = "DRAFT" | "SUBMITTED" | "VERIFIED" | "REJECTED" | "ADJUSTED";

export interface RealizationEvidence {
  id: string;
  realizationId: string;
  type: "FILE" | "LINK";
  fileName?: string;
  fileUrl?: string;
  linkUrl?: string;
  uploadedAt: string;
}

export interface KpiRealization {
  id: string;
  kpiItemId: string;
  ownershipId: string;
  period: PeriodKey;
  actualValue: number;
  notes?: string;
  status: RealizationStatus;
  submittedAt?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  adjustedValue?: number;
  adjustmentNotes?: string;
  year: number;
  evidence: RealizationEvidence[];
}

export type CheckInWindowStatus = "UPCOMING" | "OPEN" | "CLOSED" | "OVERDUE";

export interface CheckInSchedule {
  id: string;
  performancePeriodId: string;
  period: PeriodKey;
  windowStart: string;
  windowEnd: string;
  deadlineDate: string;
  status: CheckInWindowStatus;
}

export interface KpiScoreRow {
  kpiItemId: string;
  title: string;
  achievementPct: number;
  performanceIndex: number;
  weightPct: number;
  weightedScore: number;
  capApplied: boolean;
}

export interface YearEndManagerFeedback {
  reviewerEmployeeNumber: string;
  reviewerName: string;
  text: string;
  reviewedAt: string;
}

export interface PortfolioScore {
  id: string;
  employeeNumber: string;
  year: number;
  bersamaSubtotal: number;
  unitSubtotal: number;
  finalPI: number;
  finalAchievementPct: number;
  ratingLabel: string;
  itemScores: KpiScoreRow[];
  /** US-MK-013 — umpan balik atasan setelah penilaian (opsional). */
  managerFeedback?: YearEndManagerFeedback;
}

export type KpiChangeRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "REVISION_REQUESTED";

export interface KpiChangeRequest {
  id: string;
  kpiItemId?: string;
  requestType: "CREATE" | "UPDATE" | "DELETE";
  requestedBy: string;
  justification: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  status: KpiChangeRequestStatus;
  reviewedBy?: string;
  reviewNotes?: string;
  createdAt: string;
  reviewedAt?: string;
}

export type AlignmentWarningType =
  | "ORPHAN_KPI"
  | "MISSING_PARENT"
  | "DUPLICATE_SUSPECTED"
  | "WEIGHT_MISMATCH"
  | "UNALLOCATED";

export interface AlignmentWarning {
  id: string;
  type: AlignmentWarningType;
  affectedItemId?: string;
  affectedPositionId?: string;
  description: string;
}

export interface OrgTreeNode {
  organizationId: string;
  name: string;
  type: "COMPANY" | "DIREKTORAT" | "DIVISI" | "UNIT";
  childNodes: OrgTreeNode[];
  positionCount: number;
  kpiCount: number;
  pendingApprovalCount: number;
}

export interface PositionTreeNode {
  positionId: string;
  title: string;
  incumbentEmployeeNumber?: string;
  incumbentName?: string;
  orgUnitId: string;
  bandJabatan: string;
  jobType: JobTypeSemantic;
  kpiItemIds: string[];
  riskStatus: "ON_TRACK" | "AT_RISK" | "OVERDUE" | "NO_DATA";
  ownershipSummary: {
    owner: number;
    collaborator: number;
    sharedOwner: number;
  };
  achievementSummary?: {
    verifiedCount: number;
    submittedCount: number;
    averageAchievementPct?: number;
  };
}

export interface KpiChangeLog {
  id: string;
  kpiItemId?: string;
  positionId?: string;
  changeType:
    | "ITEM_CREATED"
    | "ITEM_UPDATED"
    | "ITEM_DELETED"
    | "OWNERSHIP_CHANGED"
    | "WEIGHT_CHANGED"
    | "TARGET_CHANGED"
    | "CAP_CHANGED"
    | "DICTIONARY_LINKED"
    | "DICTIONARY_UNLINKED"
    | "BULK_UPLOADED";
  changedBy: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  createdAt: string;
}

export interface TreeAnalyticsSummary {
  targetSettingProgressPct: number;
  cascadeHealthPct: number;
  alignmentGapCount: number;
  unallocatedPositionCount: number;
  ownershipDistribution: {
    ownerPct: number;
    sharedOwnerPct: number;
    collaboratorPct: number;
  };
}

export type BulkUploadJobStatus =
  | "VALIDATING"
  | "VALIDATION_COMPLETE"
  | "IMPORTING"
  | "COMPLETE"
  | "FAILED";

export interface BulkUploadJob {
  id: string;
  uploadedBy: string;
  fileName: string;
  status: BulkUploadJobStatus;
  totalRows: number;
  validRows: number;
  errorRows: number;
  errorDetails: { row: number; error: string }[];
  createdAt: string;
  completedAt?: string;
}

export interface HqAdjustmentRequest {
  id: string;
  requestedBy: string;
  type: "KPI_CHANGE" | "WEIGHT_CHANGE" | "TARGET_CHANGE" | "ITEM_ADD" | "ITEM_REMOVE";
  kpiItemId?: string;
  justification: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  status: "PENDING" | "APPROVED" | "REJECTED" | "REVISION_REQUESTED";
  reviewedBy?: string;
  reviewNotes?: string;
  slaDeadline: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface KpiRuleConfig {
  id: string;
  year: number;
  minItemsPerType?: number;
  maxItemsPerType?: number | null;
  minWeightPerItemPct?: number;
  maxWeightPerItemPct?: number;
  globalCapType: "NO_CAP" | "CAPPED_100" | "CAPPED_110" | "CAPPED_120";
  categoryBasedScoringEnabled: boolean;
}

export interface CohortSummary {
  id: string;
  name: string;
  description?: string;
  positionCount: number;
  employeeCount: number;
  attributes?: { key: string; value: string }[];
}

export interface RatingScaleEntry {
  rating: number;
  label: string;
  piMin: number;
  piMax: number;
}

export interface RatingScaleConfig {
  id: string;
  year: number;
  method: "FIXED_RANGE" | "POPULATION_BASED";
  scale: RatingScaleEntry[];
}

export interface CohortAssignment {
  id: string;
  cohortId: string;
  positionId: string;
  assignmentType: "AUTO" | "MANUAL_OVERRIDE";
  assignedBy?: string;
}

export interface CohortThresholdConfig {
  id: string;
  cohortId: string;
  year: number;
  medianPI?: number;
  upperThreshold?: number;
  lowerThreshold?: number;
  method: "CALCULATED" | "MANUAL";
}

export interface CompanyTier {
  id: string;
  tier: 1 | 2 | 3;
  companyId: string;
  companyName: string;
  characteristics: string;
}

export interface KpiBersamaCentralItem {
  id: string;
  title: string;
  dictionaryItemId?: string;
  year: number;
  tierTargets: Array<{
    tierId: string;
    targetValue: number;
    unit: string;
  }>;
}

export interface DeadlineConfig {
  id: string;
  performancePeriodId: string;
  phase: PerformancePhase;
  period?: PeriodKey;
  deadlineDate: string;
  penaltyType: "NONE" | "LATE_FLAG" | "AUTO_ZERO";
  extensionMaxDays?: number;
  extensionMaxRequests?: number;
  autoApproveTimeoutDays?: number;
}

export interface MutationScoringPolicy {
  id: string;
  year: number;
  proRataMethod: "WEIGHTED_AVERAGE" | "LONGEST_DURATION" | "MINIMUM_DURATION";
  minimumDurationMonths: number;
  cutoffDay: number;
  carryOverEnabled: boolean;
}

export interface IndisciplinaryOverride {
  id: string;
  employeeNumber: string;
  year: number;
  overrideType: "EXCLUDE_FROM_POOL" | "CAP_RATING" | "CUSTOM";
  reason: string;
  appliedBy: string;
  createdAt: string;
}

export interface HqAuditLog {
  id: string;
  action:
    | "CONFIG_CHANGED"
    | "PERIOD_OPENED"
    | "PERIOD_CLOSED"
    | "FORCE_FINALIZED"
    | "YEAR_CLOSED"
    | "OVERRIDE_APPLIED"
    | "ADJUSTMENT_REVIEWED";
  entityType: string;
  entityId: string;
  changedBy: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  createdAt: string;
}

export type ExtensionRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ExtensionRequest {
  id: string;
  performancePeriodId: string;
  requestedBy: string;
  reason: string;
  requestedDays: number;
  status: ExtensionRequestStatus;
  reviewedBy?: string;
  newDeadline?: string;
  createdAt: string;
}

export interface PerformanceV2AuditEntry {
  id: string;
  at: string;
  actorEmployeeNumber: string;
  action: string;
  entityType: string;
  entityId?: string;
  detail?: string;
}
