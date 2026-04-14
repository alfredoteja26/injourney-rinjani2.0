import type {
  AlignmentWarning,
  BandKpiFormula,
  BulkUploadJob,
  CascadeRelation,
  CheckInSchedule,
  CohortSummary,
  CohortAssignment,
  CohortThresholdConfig,
  CompanyTier,
  DeadlineConfig,
  DictionaryApprovalRecord,
  DictionaryUsageRecord,
  DictionaryValidationRecord,
  ExtensionRequest,
  HqAdjustmentRequest,
  HqAuditLog,
  IndisciplinaryOverride,
  KpiBersamaCentralItem,
  KpiChangeLog,
  KpiChangeRequest,
  KpiDictionaryItem,
  KpiItem,
  KpiOwnership,
  KpiRealization,
  KpiRuleConfig,
  KpiTarget,
  MutationScoringPolicy,
  OrgTreeNode,
  PerformancePeriod,
  PortfolioScore,
  PositionTreeNode,
  RatingScaleConfig,
  TeamPlanningStatusRow,
  TreeAnalyticsSummary,
} from "../domain/types";
import {
  performanceV2Companies,
  performanceV2Employees,
  performanceV2Locations,
  performanceV2OrgUnits,
  performanceV2Positions,
} from "./talent-master";

const YEAR = 2026;
const PERIOD_ID = "PRD-2026";

export interface PerformanceV2FixtureBundle {
  performancePeriod: PerformancePeriod;
  bandFormulas: BandKpiFormula[];
  kpiRuleConfig: KpiRuleConfig;
  kpiItems: KpiItem[];
  ownerships: KpiOwnership[];
  cascadeRelations: CascadeRelation[];
  dictionaryItems: KpiDictionaryItem[];
  dictionaryValidationRecords: DictionaryValidationRecord[];
  dictionaryApprovalRecords: DictionaryApprovalRecord[];
  dictionaryUsageRecords: DictionaryUsageRecord[];
  teamPlanningStatuses: TeamPlanningStatusRow[];
  checkInSchedules: CheckInSchedule[];
  kpiTargets: KpiTarget[];
  extensionRequests: ExtensionRequest[];
  realizations: KpiRealization[];
  portfolioScores: PortfolioScore[];
  kpiChangeRequests: KpiChangeRequest[];
  alignmentWarnings: AlignmentWarning[];
  orgTreeNodes: OrgTreeNode[];
  positionTreeNodes: PositionTreeNode[];
  kpiChangeLogs: KpiChangeLog[];
  treeAnalytics: TreeAnalyticsSummary;
  bulkUploadJobs: BulkUploadJob[];
  hqAdjustments: HqAdjustmentRequest[];
  cohorts: CohortSummary[];
  cohortAssignments: CohortAssignment[];
  cohortThresholdConfigs: CohortThresholdConfig[];
  ratingScaleConfig: RatingScaleConfig;
  companyTiers: CompanyTier[];
  kpiBersamaCentralItems: KpiBersamaCentralItem[];
  deadlineConfigs: DeadlineConfig[];
  mutationScoringPolicy: MutationScoringPolicy;
  indisciplinaryOverrides: IndisciplinaryOverride[];
  hqAuditLog: HqAuditLog[];
  companies: typeof performanceV2Companies;
  orgUnits: typeof performanceV2OrgUnits;
  positions: typeof performanceV2Positions;
  employees: typeof performanceV2Employees;
  locations: typeof performanceV2Locations;
}

let ownSeq = 0;
function own(kpiItemId: string, employeeNumber: string, weightPct: number): KpiOwnership {
  ownSeq += 1;
  return {
    id: `own-${ownSeq}`,
    kpiItemId,
    employeeNumber,
    ownershipType: "OWNER",
    weightPct,
    weightApprovalStatus: "SUBMITTED",
    year: YEAR,
  };
}

function portfolioForDimas(year: number): KpiItem[] {
  return [
    {
      id: "KPI-DM-B-001",
      title: "Customer Satisfaction Index (CSI)",
      description: "KPI Bersama Holding untuk pengalaman layanan grup.",
      kpiType: "BERSAMA",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 4.5,
      targetUnit: "Skala 1-5",
      monitoringPeriod: "ANNUAL",
      capType: "CAPPED_100",
      source: "ADMIN_UPLOAD",
      year,
      itemApprovalStatus: "APPROVED",
      ownerEmployeeNumber: "260101",
    },
    {
      id: "KPI-DM-B-002",
      title: "Revenue Growth",
      description: "Target pertumbuhan pendapatan grup untuk siklus 2026.",
      kpiType: "BERSAMA",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 15,
      targetUnit: "%",
      monitoringPeriod: "ANNUAL",
      capType: "NO_CAP",
      source: "ADMIN_UPLOAD",
      year,
      itemApprovalStatus: "APPROVED",
      ownerEmployeeNumber: "260101",
    },
    {
      id: "KPI-VP-001",
      code: "KPI-VP-001",
      title: "Talent Acquisition Excellence",
      description: "Outcome perekrutan strategis untuk holding.",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "PROGRESSIVE",
      targetUnit: "%",
      monitoringPeriod: "QUARTERLY",
      capType: "NO_CAP",
      source: "P_KPI",
      year,
      itemApprovalStatus: "APPROVED",
      ownerEmployeeNumber: "260101",
    },
    {
      id: "KPI-VP-010",
      code: "KPI-VP-010",
      title: "HC Policy Compliance Rate",
      description: "Tingkat kepatuhan kebijakan HC lintas entitas.",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 95,
      targetUnit: "%",
      monitoringPeriod: "ANNUAL",
      capType: "CAPPED_100",
      source: "P_KPI",
      year,
      itemApprovalStatus: "APPROVED",
      ownerEmployeeNumber: "260101",
    },
    {
      id: "KPI-DM-U-003",
      title: "Leadership Pipeline Readiness",
      description: "Kesiapan succession slate untuk posisi kritikal HC.",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 85,
      targetUnit: "%",
      monitoringPeriod: "SEMESTER",
      capType: "CAPPED_100",
      source: "CUSTOM",
      year,
      itemApprovalStatus: "APPROVED",
      ownerEmployeeNumber: "260101",
    },
  ];
}

function portfolioForFajar(year: number): KpiItem[] {
  return [
    {
      id: "KPI-FJ-B-001",
      title: "Customer Satisfaction Index (CSI)",
      kpiType: "BERSAMA",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 4.2,
      targetUnit: "Skala 1-5",
      monitoringPeriod: "ANNUAL",
      capType: "CAPPED_100",
      source: "ADMIN_UPLOAD",
      year,
      itemApprovalStatus: "WAITING_FOR_APPROVAL",
      ownerEmployeeNumber: "260103",
    },
    {
      id: "KPI-FJ-B-002",
      title: "Revenue Growth",
      kpiType: "BERSAMA",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 12,
      targetUnit: "%",
      monitoringPeriod: "ANNUAL",
      capType: "NO_CAP",
      source: "ADMIN_UPLOAD",
      year,
      itemApprovalStatus: "WAITING_FOR_APPROVAL",
      ownerEmployeeNumber: "260103",
    },
    {
      id: "KPI-MOCK-A",
      code: "KPI-MOCK-A",
      title: "Mock Cluster Policy Governance Readiness",
      description: "Root KPI mock untuk demo hierarchy multi-level di cluster Fajar.",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 100,
      targetUnit: "%",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      source: "CUSTOM",
      year,
      itemApprovalStatus: "ALLOCATED",
      ownerEmployeeNumber: "260103",
    },
    {
      id: "KPI-FN-001",
      code: "KPI-FN-001",
      title: "Policy Document Completion",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 14,
      targetUnit: "Dokumen",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      source: "CUSTOM",
      parentKpiId: "KPI-VP-010",
      year,
      itemApprovalStatus: "WAITING_FOR_APPROVAL",
      ownerEmployeeNumber: "260103",
    },
    {
      id: "KPI-FJ-U-002",
      title: "Regulatory Review Cycle Time",
      kpiType: "UNIT",
      polarity: "NEGATIVE",
      targetType: "FIXED",
      targetValue: 20,
      targetUnit: "Hari",
      monitoringPeriod: "QUARTERLY",
      capType: "NO_CAP",
      source: "CUSTOM",
      year,
      itemApprovalStatus: "DRAFT",
      ownerEmployeeNumber: "260103",
    },
    {
      id: "KPI-FJ-U-003",
      title: "Policy Socialization Coverage",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 90,
      targetUnit: "%",
      monitoringPeriod: "SEMESTER",
      capType: "CAPPED_100",
      source: "CUSTOM",
      year,
      itemApprovalStatus: "DRAFT",
      ownerEmployeeNumber: "260103",
    },
  ];
}

function portfolioForArif(year: number): KpiItem[] {
  return [
    {
      id: "KPI-MOCK-B",
      code: "KPI-MOCK-B",
      title: "Mock Cluster Policy Rollout Coverage",
      description: "Level 2 mock cascade yang diturunkan dari KPI-MOCK-A.",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 95,
      targetUnit: "%",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      source: "CUSTOM",
      parentKpiId: "KPI-MOCK-A",
      year,
      itemApprovalStatus: "WAITING_REVIEW",
      ownerEmployeeNumber: "260105",
    },
  ];
}

function portfolioForNadia(year: number): KpiItem[] {
  return [
    {
      id: "KPI-MOCK-C",
      code: "KPI-MOCK-C",
      title: "Mock Cluster Governance Review Closure",
      description: "Level 3 mock cascade yang diturunkan dari KPI-MOCK-B.",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 24,
      targetUnit: "Review",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      source: "CUSTOM",
      parentKpiId: "KPI-MOCK-B",
      year,
      itemApprovalStatus: "WAITING_FOR_APPROVAL",
      ownerEmployeeNumber: "260106",
    },
  ];
}

function portfolioForRaka(year: number): KpiItem[] {
  return [
    {
      id: "KPI-MOCK-D",
      code: "KPI-MOCK-D",
      title: "Mock Cluster Follow-up Action Timeliness",
      description: "Level 4 mock cascade yang diturunkan dari KPI-MOCK-C.",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 90,
      targetUnit: "%",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      source: "CUSTOM",
      parentKpiId: "KPI-MOCK-C",
      year,
      itemApprovalStatus: "DRAFT",
      ownerEmployeeNumber: "260107",
    },
  ];
}

function portfolioForSinta(year: number): KpiItem[] {
  return [
    {
      id: "KPI-ST-B-001",
      title: "Customer Satisfaction Index (CSI)",
      kpiType: "BERSAMA",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 4.2,
      targetUnit: "Skala 1-5",
      monitoringPeriod: "ANNUAL",
      capType: "CAPPED_100",
      source: "ADMIN_UPLOAD",
      year,
      itemApprovalStatus: "DRAFT",
      ownerEmployeeNumber: "260104",
    },
    {
      id: "KPI-ST-B-002",
      title: "Revenue Growth",
      kpiType: "BERSAMA",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 8,
      targetUnit: "%",
      monitoringPeriod: "ANNUAL",
      capType: "NO_CAP",
      source: "ADMIN_UPLOAD",
      year,
      itemApprovalStatus: "DRAFT",
      ownerEmployeeNumber: "260104",
    },
    {
      id: "KPI-ST-U-001",
      title: "Talent Program Launch Readiness",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 100,
      targetUnit: "%",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      source: "CUSTOM",
      year,
      itemApprovalStatus: "ALLOCATED",
      ownerEmployeeNumber: "260104",
    },
    {
      id: "KPI-ST-U-002",
      title: "OD Framework Adoption",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 85,
      targetUnit: "%",
      monitoringPeriod: "SEMESTER",
      capType: "NO_CAP",
      source: "CUSTOM",
      year,
      itemApprovalStatus: "WAITING_REVIEW",
      ownerEmployeeNumber: "260104",
    },
  ];
}

export function createPerformanceV2FixtureBundle(): PerformanceV2FixtureBundle {
  ownSeq = 0;

  const performancePeriod: PerformancePeriod = {
    id: PERIOD_ID,
    year: YEAR,
    name: "2026",
    phase: "MONITORING",
    status: "OPEN",
    planningStartDate: "2026-01-15",
    planningEndDate: "2026-03-15",
    companyScope: "ALL",
  };

  const bandFormulas: BandKpiFormula[] = [
    { id: "bf-utama-s", bandJabatan: "Utama", jobType: "STRUKTURAL", kpiBersamaWeightPct: 40, kpiUnitWeightPct: 60, year: YEAR },
    { id: "bf-madya-s", bandJabatan: "Madya", jobType: "STRUKTURAL", kpiBersamaWeightPct: 40, kpiUnitWeightPct: 60, year: YEAR },
    { id: "bf-muda-s", bandJabatan: "Muda", jobType: "STRUKTURAL", kpiBersamaWeightPct: 30, kpiUnitWeightPct: 70, year: YEAR },
    { id: "bf-pratama-s", bandJabatan: "Pratama", jobType: "STRUKTURAL", kpiBersamaWeightPct: 20, kpiUnitWeightPct: 80, year: YEAR },
    { id: "bf-ns", bandJabatan: "Utama", jobType: "NON_STRUKTURAL", kpiBersamaWeightPct: 0, kpiUnitWeightPct: 100, year: YEAR },
  ];

  const kpiRuleConfig: KpiRuleConfig = {
    id: "rule-2026",
    year: YEAR,
    minItemsPerType: 3,
    maxItemsPerType: null,
    minWeightPerItemPct: 5,
    maxWeightPerItemPct: 40,
    globalCapType: "CAPPED_110",
    categoryBasedScoringEnabled: true,
  };

  const kpiItems: KpiItem[] = [
    {
      id: "KPI-B-001",
      title: "Customer Satisfaction Index (CSI)",
      kpiType: "BERSAMA",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 4.2,
      targetUnit: "Skala 1-5",
      monitoringPeriod: "ANNUAL",
      capType: "CAPPED_100",
      source: "ADMIN_UPLOAD",
      year: YEAR,
      itemApprovalStatus: "WAITING_FOR_APPROVAL",
      ownerEmployeeNumber: "260102",
    },
    {
      id: "KPI-B-002",
      title: "Revenue Growth",
      kpiType: "BERSAMA",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 12,
      targetUnit: "%",
      monitoringPeriod: "ANNUAL",
      capType: "NO_CAP",
      source: "ADMIN_UPLOAD",
      year: YEAR,
      itemApprovalStatus: "WAITING_FOR_APPROVAL",
      ownerEmployeeNumber: "260102",
    },
    {
      id: "KPI-U-001",
      title: "HC Analytics Dashboard Completion",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "PROGRESSIVE",
      targetUnit: "%",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      evidenceRequired: true,
      source: "LIBRARY",
      dictionaryItemId: "DIC-042",
      year: YEAR,
      itemApprovalStatus: "WAITING_FOR_APPROVAL",
      ownerEmployeeNumber: "260102",
    },
    {
      id: "KPI-U-002",
      title: "Workforce Planning Accuracy",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 90,
      targetUnit: "%",
      monitoringPeriod: "SEMESTER",
      capType: "NO_CAP",
      source: "LIBRARY",
      year: YEAR,
      itemApprovalStatus: "WAITING_REVIEW",
      ownerEmployeeNumber: "260102",
    },
    {
      id: "KPI-U-003",
      title: "Time-to-Fill Critical Positions",
      kpiType: "UNIT",
      polarity: "NEGATIVE",
      targetType: "FIXED",
      targetValue: 45,
      targetUnit: "Hari",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      source: "CUSTOM",
      year: YEAR,
      itemApprovalStatus: "DRAFT",
      ownerEmployeeNumber: "260102",
    },
    {
      id: "KPI-U-004",
      title: "HC Policy Compliance Rate",
      kpiType: "UNIT",
      polarity: "POSITIVE",
      targetType: "FIXED",
      targetValue: 95,
      targetUnit: "%",
      monitoringPeriod: "ANNUAL",
      capType: "CAPPED_100",
      source: "LIBRARY",
      year: YEAR,
      itemApprovalStatus: "ALLOCATED",
      ownerEmployeeNumber: "260102",
    },
    ...portfolioForDimas(YEAR),
    ...portfolioForFajar(YEAR),
    ...portfolioForArif(YEAR),
    ...portfolioForNadia(YEAR),
    ...portfolioForRaka(YEAR),
    ...portfolioForSinta(YEAR),
  ];

  const ownerships: KpiOwnership[] = [
    own("KPI-B-001", "260102", 25),
    own("KPI-B-002", "260102", 15),
    own("KPI-U-001", "260102", 20),
    own("KPI-U-002", "260102", 15),
    own("KPI-U-003", "260102", 15),
    own("KPI-U-004", "260102", 10),
    own("KPI-DM-B-001", "260101", 25),
    own("KPI-DM-B-002", "260101", 15),
    own("KPI-VP-001", "260101", 20),
    own("KPI-VP-010", "260101", 15),
    own("KPI-DM-U-003", "260101", 25),
    own("KPI-FJ-B-001", "260103", 25),
    own("KPI-FJ-B-002", "260103", 15),
    own("KPI-MOCK-A", "260103", 5),
    own("KPI-FN-001", "260103", 20),
    own("KPI-FJ-U-002", "260103", 20),
    own("KPI-FJ-U-003", "260103", 15),
    own("KPI-MOCK-B", "260105", 35),
    own("KPI-MOCK-C", "260106", 40),
    own("KPI-MOCK-D", "260107", 40),
    own("KPI-ST-B-001", "260104", 20),
    own("KPI-ST-B-002", "260104", 20),
    own("KPI-ST-U-001", "260104", 30),
    own("KPI-ST-U-002", "260104", 10),
  ];

  const cascadeRelations: CascadeRelation[] = [
    {
      id: "CAS-001",
      parentKpiId: "KPI-VP-001",
      childKpiId: "KPI-U-001",
      cascadeMethod: "INDIRECT",
      accumulationEnabled: false,
    },
    {
      id: "CAS-002",
      parentKpiId: "KPI-VP-010",
      childKpiId: "KPI-U-004",
      cascadeMethod: "DIRECT",
      accumulationEnabled: false,
    },
    {
      id: "CAS-003",
      parentKpiId: "KPI-VP-010",
      childKpiId: "KPI-FN-001",
      cascadeMethod: "INDIRECT",
      accumulationEnabled: false,
    },
    {
      id: "CAS-004",
      parentKpiId: "KPI-MOCK-A",
      childKpiId: "KPI-MOCK-B",
      cascadeMethod: "DIRECT",
      accumulationEnabled: false,
    },
    {
      id: "CAS-005",
      parentKpiId: "KPI-MOCK-B",
      childKpiId: "KPI-MOCK-C",
      cascadeMethod: "DIRECT",
      accumulationEnabled: false,
    },
    {
      id: "CAS-006",
      parentKpiId: "KPI-MOCK-C",
      childKpiId: "KPI-MOCK-D",
      cascadeMethod: "DIRECT",
      accumulationEnabled: false,
    },
  ];

  const dictionaryItems: KpiDictionaryItem[] = [
    {
      id: "DIC-001",
      code: "FIN-REV-001",
      title: "Revenue Growth",
      kpiType: "UNIT",
      bscPerspective: "FINANCIAL",
      targetUnit: "%",
      polarity: "POSITIVE",
      monitoringPeriod: "ANNUAL",
      capType: "NO_CAP",
      lockedAttributes: ["title", "polarity", "bscPerspective"],
      status: "PUBLISHED",
      usageCount: 142,
    },
    {
      id: "DIC-042",
      code: "HC-ANA-001",
      title: "HC Analytics Dashboard Completion",
      kpiType: "UNIT",
      bscPerspective: "INTERNAL_PROCESS",
      targetUnit: "%",
      polarity: "POSITIVE",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      fixedWeight: null,
      lockedAttributes: ["title", "polarity", "targetUnit"],
      status: "PUBLISHED",
      usageCount: 38,
    },
    {
      id: "DIC-078",
      code: "HC-WFP-003",
      title: "Workforce Planning Accuracy",
      kpiType: "UNIT",
      bscPerspective: "INTERNAL_PROCESS",
      targetUnit: "%",
      polarity: "POSITIVE",
      monitoringPeriod: "SEMESTER",
      capType: "NO_CAP",
      lockedAttributes: ["title"],
      status: "PUBLISHED",
      usageCount: 25,
    },
    {
      id: "DIC-103",
      code: "OPS-SFT-001",
      title: "Zero Accident Rate",
      kpiType: "UNIT",
      bscPerspective: "INTERNAL_PROCESS",
      targetUnit: "Kejadian",
      polarity: "NEGATIVE",
      monitoringPeriod: "QUARTERLY",
      capType: "CAPPED_100",
      fixedWeight: 10,
      lockedAttributes: ["title", "polarity", "targetUnit", "capType"],
      status: "PUBLISHED",
      usageCount: 89,
    },
    {
      id: "DIC-150",
      code: "CUS-SAT-002",
      title: "Net Promoter Score (NPS)",
      kpiType: "UNIT",
      bscPerspective: "CUSTOMER",
      targetUnit: "Skor",
      polarity: "POSITIVE",
      monitoringPeriod: "SEMESTER",
      capType: "CAPPED_120",
      lockedAttributes: ["title", "polarity"],
      status: "PUBLISHED",
      usageCount: 56,
    },
    {
      id: "DIC-099",
      code: "OPS-OLD-001",
      title: "Manual Report Submission Rate",
      kpiType: "UNIT",
      bscPerspective: "INTERNAL_PROCESS",
      targetUnit: "%",
      polarity: "POSITIVE",
      monitoringPeriod: "ANNUAL",
      capType: "NO_CAP",
      lockedAttributes: [],
      status: "DEPRECATED",
      usageCount: 3,
      deprecatedAt: "2025-12-01",
    },
    {
      id: "DIC-201",
      code: "HR-TRN-010",
      title: "Training Hours per Employee",
      kpiType: "UNIT",
      bscPerspective: "LEARNING_GROWTH",
      targetUnit: "Jam",
      polarity: "POSITIVE",
      monitoringPeriod: "ANNUAL",
      capType: "NO_CAP",
      lockedAttributes: [],
      status: "PENDING_VALIDATION",
      usageCount: 0,
      submittedBy: "260102",
      sourceModule: "MY_PERFORMANCE",
    },
    {
      id: "DIC-202",
      code: "HR-ENG-005",
      title: "Employee Engagement Index",
      kpiType: "UNIT",
      bscPerspective: "LEARNING_GROWTH",
      targetUnit: "Skala 1-5",
      polarity: "POSITIVE",
      monitoringPeriod: "ANNUAL",
      capType: "CAPPED_100",
      lockedAttributes: [],
      status: "VALIDATED",
      usageCount: 0,
      submittedBy: "260103",
      sourceModule: "MY_PERFORMANCE",
    },
  ];

  const dictionaryValidationRecords: DictionaryValidationRecord[] = [
    {
      id: "DVR-001",
      dictionaryItemId: "DIC-201",
      validatorId: "260101",
      action: "ACCEPT",
      notes: "Definisi unik, tidak bentrok dengan item published existing.",
      similarItemWarning: ["DIC-150"],
      createdAt: "2026-04-06T10:00:00Z",
    },
    {
      id: "DVR-002",
      dictionaryItemId: "DIC-202",
      validatorId: "260101",
      action: "ACCEPT",
      notes: "Masuk approval queue untuk final governance check.",
      createdAt: "2026-04-07T11:00:00Z",
    },
  ];

  const dictionaryApprovalRecords: DictionaryApprovalRecord[] = [
    {
      id: "DAR-001",
      dictionaryItemId: "DIC-202",
      approverId: "260101",
      action: "SEND_BACK_TO_VALIDATION",
      notes: "Perlu penajaman evidence requirement sebelum publish.",
      configuredLockedAttributes: ["title", "polarity"],
      configuredCapType: "CAPPED_100",
      createdAt: "2026-04-08T09:00:00Z",
    },
  ];

  const dictionaryUsageRecords: DictionaryUsageRecord[] = [
    { id: "DUR-001", dictionaryItemId: "DIC-042", kpiItemId: "KPI-U-001", employeeNumber: "260102", year: YEAR, status: "ACTIVE" },
    { id: "DUR-002", dictionaryItemId: "DIC-042", kpiItemId: "KPI-VP-001", employeeNumber: "260101", year: YEAR, status: "ACTIVE" },
    { id: "DUR-003", dictionaryItemId: "DIC-078", kpiItemId: "KPI-U-002", employeeNumber: "260102", year: YEAR, status: "ACTIVE" },
  ];

  const teamPlanningStatuses: TeamPlanningStatusRow[] = [
    {
      employeeNumber: "260101",
      totalItems: 5,
      itemsApproved: 5,
      itemsDraft: 0,
      itemsAllocated: 0,
      totalWeightBersamaPct: 40,
      totalWeightUnitPct: 60,
      weightValid: true,
      portfolioStatus: "APPROVED",
    },
    {
      employeeNumber: "260102",
      totalItems: 6,
      itemsApproved: 0,
      itemsDraft: 2,
      itemsAllocated: 1,
      totalWeightBersamaPct: 40,
      totalWeightUnitPct: 60,
      weightValid: true,
      portfolioStatus: "SUBMITTED",
    },
    {
      employeeNumber: "260103",
      totalItems: 5,
      itemsApproved: 0,
      itemsDraft: 2,
      itemsAllocated: 0,
      totalWeightBersamaPct: 40,
      totalWeightUnitPct: 55,
      weightValid: false,
      weightInvalidDetail: "KPI Unit 55% dari target 60% — lengkapi 5% sebelum approval.",
      portfolioStatus: "IN_PROGRESS",
    },
    {
      employeeNumber: "260104",
      totalItems: 4,
      itemsApproved: 0,
      itemsDraft: 2,
      itemsAllocated: 1,
      totalWeightBersamaPct: 40,
      totalWeightUnitPct: 40,
      weightValid: false,
      weightInvalidDetail: "Belum ada alokasi KPI Unit penuh dan 1 item masih menunggu review atasan.",
      portfolioStatus: "NOT_STARTED",
    },
  ];

  const checkInSchedules: CheckInSchedule[] = [
    {
      id: "chk-q1",
      performancePeriodId: PERIOD_ID,
      period: "Q1",
      windowStart: "2026-04-01",
      windowEnd: "2026-04-10",
      deadlineDate: "2026-04-10",
      status: "CLOSED",
    },
    {
      id: "chk-q2",
      performancePeriodId: PERIOD_ID,
      period: "Q2",
      windowStart: "2026-07-01",
      windowEnd: "2026-07-10",
      deadlineDate: "2026-07-10",
      status: "OPEN",
    },
  ];

  const kpiTargets: KpiTarget[] = [
    { id: "kt-u001-q1", kpiItemId: "KPI-U-001", period: "Q1", targetValue: 25, year: YEAR },
    { id: "kt-u001-q2", kpiItemId: "KPI-U-001", period: "Q2", targetValue: 50, year: YEAR },
    { id: "kt-u001-q3", kpiItemId: "KPI-U-001", period: "Q3", targetValue: 75, year: YEAR },
    { id: "kt-u001-q4", kpiItemId: "KPI-U-001", period: "Q4", targetValue: 100, year: YEAR },
    { id: "kt-vp001-q1", kpiItemId: "KPI-VP-001", period: "Q1", targetValue: 30, year: YEAR },
    { id: "kt-vp001-q2", kpiItemId: "KPI-VP-001", period: "Q2", targetValue: 55, year: YEAR },
    { id: "kt-vp001-q3", kpiItemId: "KPI-VP-001", period: "Q3", targetValue: 80, year: YEAR },
    { id: "kt-vp001-q4", kpiItemId: "KPI-VP-001", period: "Q4", targetValue: 100, year: YEAR },
  ];

  const extensionRequests: ExtensionRequest[] = [];

  const kpiChangeRequests: KpiChangeRequest[] = [
    {
      id: "KCR-2026-001",
      kpiItemId: "KPI-U-003",
      requestType: "UPDATE",
      requestedBy: "260102",
      justification: "Penyesuaian target Time-to-Fill akibat perubahan definisi posisi kritis (Q3).",
      status: "PENDING",
      createdAt: "2026-05-02T08:00:00.000Z",
    },
    {
      id: "KCR-2026-002",
      requestType: "CREATE",
      requestedBy: "260102",
      justification: "Usulan KPI Unit tambahan untuk program adopsi portal HC (di luar jadwal planning).",
      status: "REJECTED",
      reviewedBy: "260101",
      reviewNotes: "Masukkan ke perencanaan tahun berikutnya; tidak diproses di luar fase.",
      createdAt: "2026-05-10T09:00:00.000Z",
      reviewedAt: "2026-05-11T14:00:00.000Z",
    },
  ];

  const o1 = ownerships.find((o) => o.kpiItemId === "KPI-U-001")!;
  const o3 = ownerships.find((o) => o.kpiItemId === "KPI-U-003")!;
  const o4 = ownerships.find((o) => o.kpiItemId === "KPI-U-004")!;
  const ob1 = ownerships.find((o) => o.kpiItemId === "KPI-B-001")!;
  const of1 = ownerships.find((o) => o.kpiItemId === "KPI-FN-001")!;

  const realizations: KpiRealization[] = [
    {
      id: "REA-B-001",
      kpiItemId: "KPI-B-001",
      ownershipId: ob1.id,
      period: "ANNUAL",
      actualValue: 4.1,
      status: "VERIFIED",
      notes: "Agregat nasional — realisasi KPI Bersama dicatat oleh admin / HQ (bukan input karyawan).",
      year: YEAR,
      evidence: [],
    },
    {
      id: "REA-001",
      kpiItemId: "KPI-U-001",
      ownershipId: o1.id,
      period: "Q1",
      actualValue: 28,
      status: "VERIFIED",
      notes: "Dashboard phase 1 selesai, termasuk modul headcount dan turnover.",
      year: YEAR,
      evidence: [
        {
          id: "ev-1",
          realizationId: "REA-001",
          type: "FILE",
          fileName: "Q1-Dashboard-Screenshot.png",
          uploadedAt: "2026-04-09T10:00:00Z",
        },
        {
          id: "ev-2",
          realizationId: "REA-001",
          type: "LINK",
          linkUrl: "https://analytics.injourney.id/q1-report",
          uploadedAt: "2026-04-09T10:00:00Z",
        },
      ],
    },
    {
      id: "REA-002",
      kpiItemId: "KPI-U-003",
      ownershipId: o3.id,
      period: "Q1",
      actualValue: 42,
      status: "VERIFIED",
      notes: "3 posisi critical terisi rata-rata 42 hari.",
      year: YEAR,
      evidence: [
        {
          id: "ev-3",
          realizationId: "REA-002",
          type: "FILE",
          fileName: "Recruitment-Tracker-Q1.xlsx",
          uploadedAt: "2026-04-09T11:00:00Z",
        },
      ],
    },
    {
      id: "REA-003",
      kpiItemId: "KPI-U-001",
      ownershipId: o1.id,
      period: "Q2",
      actualValue: 55,
      status: "SUBMITTED",
      submittedAt: "2026-07-02T09:00:00Z",
      notes: "In progress: modul compensation dan learning.",
      year: YEAR,
      evidence: [
        {
          id: "ev-q2-a",
          realizationId: "REA-003",
          type: "FILE",
          fileName: "Dashboard-Q2-progress.png",
          uploadedAt: "2026-07-02T08:30:00Z",
        },
        {
          id: "ev-q2-b",
          realizationId: "REA-003",
          type: "LINK",
          linkUrl: "https://analytics.injourney.id/q2-wip",
          uploadedAt: "2026-07-02T08:31:00Z",
        },
      ],
    },
    {
      id: "REA-U4-Q1",
      kpiItemId: "KPI-U-004",
      ownershipId: o4.id,
      period: "Q1",
      actualValue: 88,
      status: "DRAFT",
      notes: "Draf kepatuhan kebijakan — siap dilengkapi bukti.",
      year: YEAR,
      evidence: [],
    },
    {
      id: "REA-010",
      kpiItemId: "KPI-FN-001",
      ownershipId: of1.id,
      period: "Q1",
      actualValue: 60,
      status: "SUBMITTED",
      submittedAt: "2026-04-08T14:00:00Z",
      notes: "Policy review selesai (kirim ulang setelah penolakan).",
      year: YEAR,
      evidence: [
        {
          id: "ev-10a",
          realizationId: "REA-010",
          type: "FILE",
          fileName: "Policy-review-final.pdf",
          uploadedAt: "2026-04-08T13:00:00Z",
        },
        {
          id: "ev-10b",
          realizationId: "REA-010",
          type: "LINK",
          linkUrl: "https://policy.injourney.id/q1-signoff",
          uploadedAt: "2026-04-08T13:05:00Z",
        },
      ],
    },
  ];

  const portfolioScores: PortfolioScore[] = [
    {
      id: "ps-260102",
      employeeNumber: "260102",
      year: YEAR,
      bersamaSubtotal: 1.58,
      unitSubtotal: 2.375,
      finalPI: 3.955,
      finalAchievementPct: 98.2,
      ratingLabel: "Excellent",
      managerFeedback: {
        reviewerEmployeeNumber: "260101",
        reviewerName: "Dimas Sayyid",
        text: "Capaian kuat pada agenda digital HC; pertahankan fokus pipeline talenta untuk semester berikutnya.",
        reviewedAt: "2026-12-15T10:00:00.000Z",
      },
      itemScores: [
        { kpiItemId: "KPI-B-001", title: "Customer Satisfaction Index (CSI)", achievementPct: 97.6, performanceIndex: 3.8, weightPct: 25, weightedScore: 0.95, capApplied: true },
        { kpiItemId: "KPI-B-002", title: "Revenue Growth", achievementPct: 108.3, performanceIndex: 4.2, weightPct: 15, weightedScore: 0.63, capApplied: false },
        { kpiItemId: "KPI-U-001", title: "HC Analytics Dashboard Completion", achievementPct: 100, performanceIndex: 4.0, weightPct: 20, weightedScore: 0.8, capApplied: true },
        { kpiItemId: "KPI-U-002", title: "Workforce Planning Accuracy", achievementPct: 94.4, performanceIndex: 3.6, weightPct: 15, weightedScore: 0.54, capApplied: false },
        { kpiItemId: "KPI-U-003", title: "Time-to-Fill Critical Positions", achievementPct: 106.7, performanceIndex: 4.3, weightPct: 15, weightedScore: 0.645, capApplied: false },
        { kpiItemId: "KPI-U-004", title: "HC Policy Compliance Rate", achievementPct: 97.9, performanceIndex: 3.9, weightPct: 10, weightedScore: 0.39, capApplied: false },
      ],
    },
    {
      id: "ps-260103",
      employeeNumber: "260103",
      year: YEAR,
      bersamaSubtotal: 1.2,
      unitSubtotal: 2.1,
      finalPI: 3.3,
      finalAchievementPct: 91.0,
      ratingLabel: "Successful",
      itemScores: [
        { kpiItemId: "KPI-FJ-B-001", title: "Customer Satisfaction Index (CSI)", achievementPct: 95, performanceIndex: 3.7, weightPct: 25, weightedScore: 0.925, capApplied: true },
        { kpiItemId: "KPI-FJ-B-002", title: "Revenue Growth", achievementPct: 102, performanceIndex: 4.0, weightPct: 15, weightedScore: 0.6, capApplied: false },
        { kpiItemId: "KPI-FN-001", title: "Policy Document Completion", achievementPct: 88, performanceIndex: 3.5, weightPct: 20, weightedScore: 0.7, capApplied: false },
        { kpiItemId: "KPI-FJ-U-002", title: "Regulatory Review Cycle Time", achievementPct: 90, performanceIndex: 3.4, weightPct: 20, weightedScore: 0.68, capApplied: false },
        { kpiItemId: "KPI-FJ-U-003", title: "Policy Socialization Coverage", achievementPct: 96, performanceIndex: 3.8, weightPct: 15, weightedScore: 0.57, capApplied: false },
      ],
    },
  ];

  const alignmentWarnings: AlignmentWarning[] = [
    {
      id: "aw-1",
      type: "ORPHAN_KPI",
      affectedItemId: "KPI-U-003",
      description: 'KPI-U-003 (Binavia, "Time-to-Fill") has no parent alignment',
    },
    {
      id: "aw-2",
      type: "UNALLOCATED",
      affectedPositionId: "pos-senior-officer-hc-planning",
      description: 'Position "Senior Officer 1 HC Planning" has 0 KPI items assigned',
    },
    {
      id: "aw-3",
      type: "WEIGHT_MISMATCH",
      affectedPositionId: "pos-gh-hc-policy",
      description: 'Portofolio Fajar hanya memiliki KPI Unit 55% dari target 60%',
    },
  ];

  const orgTreeNodes: OrgTreeNode[] = [
    {
      organizationId: "co-injourney-ho",
      name: "InJourney Group",
      type: "COMPANY",
      positionCount: 8,
      kpiCount: 24,
      pendingApprovalCount: 10,
      childNodes: [
        {
          organizationId: "ou-hc",
          name: "Direktorat Human Capital",
          type: "DIREKTORAT",
          positionCount: 8,
          kpiCount: 24,
          pendingApprovalCount: 10,
          childNodes: [
            {
              organizationId: "ou-hc-strat",
              name: "Divisi HC Strategy",
              type: "DIVISI",
              positionCount: 8,
              kpiCount: 24,
              pendingApprovalCount: 10,
              childNodes: [
                {
                  organizationId: "ou-hc-planning",
                  name: "Unit HC Planning",
                  type: "UNIT",
                  positionCount: 2,
                  kpiCount: 6,
                  pendingApprovalCount: 4,
                  childNodes: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      organizationId: "co-ap1-cgk",
      name: "PT AP I (CGK)",
      type: "COMPANY",
      positionCount: 1,
      kpiCount: 0,
      pendingApprovalCount: 0,
      childNodes: [],
    },
    {
      organizationId: "co-itdc",
      name: "PT InJourney Travel (ITDC)",
      type: "COMPANY",
      positionCount: 1,
      kpiCount: 0,
      pendingApprovalCount: 0,
      childNodes: [],
    },
  ];

  const positionTreeNodes: PositionTreeNode[] = [
    {
      positionId: "pos-vp-hc-strat",
      title: "VP Human Capital Strategy",
      incumbentEmployeeNumber: "260101",
      incumbentName: "Dimas Sayyid",
      orgUnitId: "ou-hc-strat",
      bandJabatan: "Band Utama",
      jobType: "STRUKTURAL",
      kpiItemIds: ["KPI-DM-B-001", "KPI-DM-B-002", "KPI-VP-001", "KPI-VP-010", "KPI-DM-U-003"],
      riskStatus: "ON_TRACK",
      ownershipSummary: { owner: 5, collaborator: 0, sharedOwner: 0 },
      achievementSummary: { verifiedCount: 2, submittedCount: 0, averageAchievementPct: 98 },
    },
    {
      positionId: "pos-gh-hc-planning",
      title: "Group Head HC Planning & Analytics",
      incumbentEmployeeNumber: "260102",
      incumbentName: "Binavia Wardhani",
      orgUnitId: "ou-hc-strat",
      bandJabatan: "Band Madya",
      jobType: "STRUKTURAL",
      kpiItemIds: ["KPI-B-001", "KPI-B-002", "KPI-U-001", "KPI-U-002", "KPI-U-003", "KPI-U-004"],
      riskStatus: "AT_RISK",
      ownershipSummary: { owner: 6, collaborator: 0, sharedOwner: 0 },
      achievementSummary: { verifiedCount: 3, submittedCount: 1, averageAchievementPct: 94 },
    },
    {
      positionId: "pos-gh-hc-policy",
      title: "Group Head HC Policy & Governance",
      incumbentEmployeeNumber: "260103",
      incumbentName: "Fajar Nugraha",
      orgUnitId: "ou-hc-strat",
      bandJabatan: "Band Madya",
      jobType: "STRUKTURAL",
      kpiItemIds: ["KPI-FJ-B-001", "KPI-FJ-B-002", "KPI-MOCK-A", "KPI-FN-001", "KPI-FJ-U-002", "KPI-FJ-U-003"],
      riskStatus: "AT_RISK",
      ownershipSummary: { owner: 6, collaborator: 0, sharedOwner: 0 },
      achievementSummary: { verifiedCount: 0, submittedCount: 1, averageAchievementPct: 88 },
    },
    {
      positionId: "pos-manager-policy-implementation",
      title: "Manager Policy Implementation",
      incumbentEmployeeNumber: "260105",
      incumbentName: "Arif Prasetyo",
      orgUnitId: "ou-hc-strat",
      bandJabatan: "Band Muda",
      jobType: "STRUKTURAL",
      kpiItemIds: ["KPI-MOCK-B"],
      riskStatus: "ON_TRACK",
      ownershipSummary: { owner: 1, collaborator: 0, sharedOwner: 0 },
      achievementSummary: { verifiedCount: 0, submittedCount: 1, averageAchievementPct: 92 },
    },
    {
      positionId: "pos-lead-policy-governance",
      title: "Lead Policy Governance",
      incumbentEmployeeNumber: "260106",
      incumbentName: "Nadia Putri",
      orgUnitId: "ou-hc-strat",
      bandJabatan: "Band Muda",
      jobType: "NON_STRUKTURAL",
      kpiItemIds: ["KPI-MOCK-C"],
      riskStatus: "ON_TRACK",
      ownershipSummary: { owner: 1, collaborator: 0, sharedOwner: 0 },
      achievementSummary: { verifiedCount: 0, submittedCount: 1, averageAchievementPct: 89 },
    },
    {
      positionId: "pos-officer-policy-monitoring",
      title: "Officer Policy Monitoring",
      incumbentEmployeeNumber: "260107",
      incumbentName: "Raka Mahendra",
      orgUnitId: "ou-hc-strat",
      bandJabatan: "Band Pratama",
      jobType: "NON_STRUKTURAL",
      kpiItemIds: ["KPI-MOCK-D"],
      riskStatus: "NO_DATA",
      ownershipSummary: { owner: 1, collaborator: 0, sharedOwner: 0 },
      achievementSummary: { verifiedCount: 0, submittedCount: 0 },
    },
    {
      positionId: "pos-gh-org-dev",
      title: "Group Head Org Development",
      incumbentEmployeeNumber: "260104",
      incumbentName: "Sinta Maharani",
      orgUnitId: "ou-hc-strat",
      bandJabatan: "Band Madya",
      jobType: "STRUKTURAL",
      kpiItemIds: ["KPI-ST-B-001", "KPI-ST-B-002", "KPI-ST-U-001", "KPI-ST-U-002"],
      riskStatus: "NO_DATA",
      ownershipSummary: { owner: 4, collaborator: 0, sharedOwner: 0 },
      achievementSummary: { verifiedCount: 0, submittedCount: 0 },
    },
    {
      positionId: "pos-senior-officer-hc-planning",
      title: "Senior Officer 1 HC Planning",
      orgUnitId: "ou-hc-planning",
      bandJabatan: "Band Muda",
      jobType: "NON_STRUKTURAL",
      kpiItemIds: [],
      riskStatus: "NO_DATA",
      ownershipSummary: { owner: 0, collaborator: 0, sharedOwner: 0 },
      achievementSummary: { verifiedCount: 0, submittedCount: 0 },
    },
  ];

  const kpiChangeLogs: KpiChangeLog[] = [
    {
      id: "KCL-001",
      kpiItemId: "KPI-U-004",
      positionId: "pos-gh-hc-planning",
      changeType: "DICTIONARY_LINKED",
      changedBy: "260101",
      newValue: { dictionaryItemId: "DIC-042" },
      createdAt: "2026-03-20T10:00:00Z",
    },
    {
      id: "KCL-002",
      positionId: "pos-gh-hc-planning",
      changeType: "BULK_UPLOADED",
      changedBy: "260101",
      newValue: { jobId: "UPL-001", validRows: 42 },
      createdAt: "2026-04-01T08:15:00Z",
    },
  ];

  const treeAnalytics: TreeAnalyticsSummary = {
    targetSettingProgressPct: 78,
    cascadeHealthPct: 85,
    alignmentGapCount: 12,
    unallocatedPositionCount: 5,
    ownershipDistribution: {
      ownerPct: 92,
      sharedOwnerPct: 5,
      collaboratorPct: 3,
    },
  };

  const bulkUploadJobs: BulkUploadJob[] = [
    {
      id: "UPL-001",
      uploadedBy: "260101",
      fileName: "KPI_Batch_Q1_2026.xlsx",
      status: "VALIDATION_COMPLETE",
      totalRows: 45,
      validRows: 42,
      errorRows: 3,
      errorDetails: [
        { row: 12, error: "Position ID not found" },
        { row: 28, error: "Duplicate KPI title for same position" },
        { row: 41, error: "Weight exceeds 40%" },
      ],
      createdAt: "2026-04-01T08:00:00Z",
    },
  ];

  const hqAdjustments: HqAdjustmentRequest[] = [
    {
      id: "ADJ-001",
      requestedBy: "260102",
      type: "WEIGHT_CHANGE",
      justification: "Project prioritas baru dari Direksi",
      status: "PENDING",
      oldValue: { unitWeightPct: 60 },
      newValue: { unitWeightPct: 65 },
      slaDeadline: "2026-04-10",
      createdAt: "2026-04-05T09:00:00Z",
    },
    {
      id: "ADJ-002",
      requestedBy: "260103",
      type: "TARGET_CHANGE",
      justification: "Penyesuaian target akibat kebijakan regulator baru.",
      status: "REVISION_REQUESTED",
      oldValue: { targetValue: 14 },
      newValue: { targetValue: 16 },
      reviewedBy: "260101",
      reviewNotes: "Lampirkan basis justifikasi perubahan target.",
      slaDeadline: "2026-04-12",
      createdAt: "2026-04-06T10:00:00Z",
      reviewedAt: "2026-04-07T08:00:00Z",
    },
  ];

  const cohorts: CohortSummary[] = [
    {
      id: "COH-001",
      name: "BOD-5 Finance",
      description: "Madya Finance cohort untuk rating population-based.",
      positionCount: 24,
      employeeCount: 22,
      attributes: [{ key: "bandJabatan", value: "Madya" }, { key: "jobFamily", value: "Finance" }],
    },
    {
      id: "COH-002",
      name: "BOD-5 Operations",
      description: "Madya Operations cohort lintas company.",
      positionCount: 38,
      employeeCount: 35,
      attributes: [{ key: "bandJabatan", value: "Madya" }, { key: "jobFamily", value: "Operations" }],
    },
    {
      id: "COH-003",
      name: "BOD-6 General",
      description: "Default cohort untuk Band Muda.",
      positionCount: 120,
      employeeCount: 115,
      attributes: [{ key: "bandJabatan", value: "Muda" }],
    },
  ];

  const cohortAssignments: CohortAssignment[] = [
    { id: "COHA-001", cohortId: "COH-001", positionId: "pos-gh-hc-planning", assignmentType: "AUTO" },
    { id: "COHA-002", cohortId: "COH-002", positionId: "pos-gh-hc-policy", assignmentType: "AUTO" },
  ];

  const cohortThresholdConfigs: CohortThresholdConfig[] = [
    { id: "COHT-001", cohortId: "COH-001", year: YEAR, medianPI: 3.2, upperThreshold: 3.8, lowerThreshold: 2.7, method: "CALCULATED" },
    { id: "COHT-002", cohortId: "COH-002", year: YEAR, medianPI: 3.0, upperThreshold: 3.7, lowerThreshold: 2.5, method: "MANUAL" },
  ];

  const ratingScaleConfig: RatingScaleConfig = {
    id: "RATING-2026",
    year: YEAR,
    method: "FIXED_RANGE",
    scale: [
      { rating: 1, label: "Unsuccessful", piMin: 1.0, piMax: 1.49 },
      { rating: 2, label: "Partially Successful", piMin: 1.5, piMax: 2.49 },
      { rating: 3, label: "Successful", piMin: 2.5, piMax: 3.49 },
      { rating: 4, label: "Excellent", piMin: 3.5, piMax: 4.49 },
      { rating: 5, label: "Outstanding", piMin: 4.5, piMax: 5.0 },
    ],
  };

  const companyTiers: CompanyTier[] = [
    { id: "TIER-1-HO", tier: 1, companyId: "co-injourney-ho", companyName: "InJourney Group", characteristics: "High volume, high visibility" },
    { id: "TIER-1-CGK", tier: 1, companyId: "co-ap1-cgk", companyName: "PT AP I (CGK)", characteristics: "Operationally critical hub" },
    { id: "TIER-3-ITDC", tier: 3, companyId: "co-itdc", companyName: "PT InJourney Travel (ITDC)", characteristics: "Regional/supporting entity" },
  ];

  const kpiBersamaCentralItems: KpiBersamaCentralItem[] = [
    {
      id: "KBC-001",
      title: "Customer Satisfaction Index",
      year: YEAR,
      tierTargets: [
        { tierId: "TIER-1-HO", targetValue: 4.5, unit: "Skala 1-5" },
        { tierId: "TIER-1-CGK", targetValue: 4.2, unit: "Skala 1-5" },
        { tierId: "TIER-3-ITDC", targetValue: 4.0, unit: "Skala 1-5" },
      ],
    },
    {
      id: "KBC-002",
      title: "Revenue Growth",
      dictionaryItemId: "DIC-001",
      year: YEAR,
      tierTargets: [
        { tierId: "TIER-1-HO", targetValue: 15, unit: "%" },
        { tierId: "TIER-1-CGK", targetValue: 12, unit: "%" },
        { tierId: "TIER-3-ITDC", targetValue: 8, unit: "%" },
      ],
    },
  ];

  const deadlineConfigs: DeadlineConfig[] = [
    {
      id: "DLC-PLN-2026",
      performancePeriodId: PERIOD_ID,
      phase: "PLANNING",
      deadlineDate: "2026-03-15",
      penaltyType: "LATE_FLAG",
      extensionMaxDays: 14,
      extensionMaxRequests: 2,
    },
    {
      id: "DLC-Q1-2026",
      performancePeriodId: PERIOD_ID,
      phase: "MONITORING",
      period: "Q1",
      deadlineDate: "2026-04-10",
      penaltyType: "LATE_FLAG",
      autoApproveTimeoutDays: 5,
    },
  ];

  const mutationScoringPolicy: MutationScoringPolicy = {
    id: "MSP-2026",
    year: YEAR,
    proRataMethod: "WEIGHTED_AVERAGE",
    minimumDurationMonths: 3,
    cutoffDay: 15,
    carryOverEnabled: true,
  };

  const indisciplinaryOverrides: IndisciplinaryOverride[] = [
    {
      id: "IDO-001",
      employeeNumber: "260104",
      year: YEAR,
      overrideType: "CAP_RATING",
      reason: "Pending disciplinary review for org-policy breach.",
      appliedBy: "260101",
      createdAt: "2026-10-12T11:00:00Z",
    },
  ];

  const hqAuditLog: HqAuditLog[] = [
    {
      id: "HQA-001",
      action: "CONFIG_CHANGED",
      entityType: "BandKpiFormula",
      entityId: "bf-madya-s",
      changedBy: "260101",
      oldValue: { kpiBersamaWeightPct: 45, kpiUnitWeightPct: 55 },
      newValue: { kpiBersamaWeightPct: 40, kpiUnitWeightPct: 60 },
      createdAt: "2026-01-10T09:00:00Z",
    },
    {
      id: "HQA-002",
      action: "ADJUSTMENT_REVIEWED",
      entityType: "HqAdjustmentRequest",
      entityId: "ADJ-002",
      changedBy: "260101",
      newValue: { status: "REVISION_REQUESTED" },
      createdAt: "2026-04-07T08:00:00Z",
    },
  ];

  return {
    performancePeriod,
    bandFormulas,
    kpiRuleConfig,
    kpiItems,
    ownerships,
    cascadeRelations,
    dictionaryItems,
    dictionaryValidationRecords,
    dictionaryApprovalRecords,
    dictionaryUsageRecords,
    teamPlanningStatuses,
    checkInSchedules,
    kpiTargets,
    extensionRequests,
    realizations,
    portfolioScores,
    kpiChangeRequests,
    alignmentWarnings,
    orgTreeNodes,
    positionTreeNodes,
    kpiChangeLogs,
    treeAnalytics,
    bulkUploadJobs,
    hqAdjustments,
    cohorts,
    cohortAssignments,
    cohortThresholdConfigs,
    ratingScaleConfig,
    companyTiers,
    kpiBersamaCentralItems,
    deadlineConfigs,
    mutationScoringPolicy,
    indisciplinaryOverrides,
    hqAuditLog,
    companies: performanceV2Companies,
    orgUnits: performanceV2OrgUnits,
    positions: performanceV2Positions,
    employees: performanceV2Employees,
    locations: performanceV2Locations,
  };
}
