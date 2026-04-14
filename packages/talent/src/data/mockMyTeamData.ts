type AssignmentType = "definitif" | "project_assignment" | "talent_mobility";
type TalentCluster =
  | "9box_high_potential"
  | "9box_promotable"
  | "9box_solid_contributor"
  | "9box_sleeping_tiger"
  | "9box_unfit"
  | null;
type EqsBand = "highly_qualified" | "qualified" | "needs_development" | "not_recommended" | null;
type RiskProfile = "low_risk" | "medium_risk" | "high_risk" | "flight_risk" | null;
type MyTeamActionCategory = "idp_pending_approval" | "aspiration_pending_review" | "assessment_pending" | "team_members_flagged";
type Urgency = "normal" | "medium" | "high";
type NineBoxCell = "h-l" | "h-m" | "h-h" | "m-l" | "m-m" | "m-h" | "l-l" | "l-m" | "l-h" | null;

type MyTeamAssignment = {
  id: string;
  user_id: string;
  position_id: string;
  position_title: string;
  assignment_type: AssignmentType;
  label: string;
  subordinate_count: number;
  is_primary: boolean;
  effective_from: string;
  effective_to: string | null;
};

type EqsComponent = {
  component_type: "performance" | "competency" | "experience" | "aspiration" | "training" | "tes";
  weight: number;
  raw_value: number;
  weighted_value: number;
};

type MyTeamMember = {
  employee_id: string;
  nik: string;
  name: string;
  photo_url: string;
  position_title: string;
  grade_jabatan: number;
  band_jabatan: string;
  organization_name: string;
  company_name: string;
  hire_date: string;
  definitive_position_id: string;
  assignment_context: AssignmentType;
  nine_box_cell: NineBoxCell;
  talent_cluster: TalentCluster;
  previous_talent_cluster: TalentCluster;
  eqs_score: number | null;
  eqs_band: EqsBand;
  talent_pool_status: "active" | null;
  risk_profile: RiskProfile;
  is_flagged: boolean;
  flag_reason: "flight_risk" | "underperforming" | "at_risk" | null;
  idp: {
    id: string;
    cycle_id: string;
    status: "approved" | "pending_approval" | "revision_requested" | "draft";
    total_hours: number;
    completed_hours: number;
    activity_count: number;
    completed_activities: number;
    submitted_at: string | null;
  };
  aspirations: {
    total_aspirations: number;
    by_source: Record<"individual" | "supervisor" | "job_holder" | "unit", number>;
    has_aspiration: boolean;
    pending_review_count: number;
  };
  eqs_components: EqsComponent[];
  latest_assessment: {
    id: string;
    cycle_name: string;
    overall_score: number;
    overall_max_score: number;
    published_at: string;
  } | null;
  applications: Array<{
    id: string;
    position_title: string;
    movement_type: string;
    status: string;
    submitted_at: string;
  }>;
};

type MyTeamActionItem = {
  id: string;
  employee_id: string;
  employee_name: string;
  description: string;
  submitted_at?: string;
  deadline?: string;
  urgency: Urgency;
  flag_reason?: string;
  deep_link: string;
};

type MyTeamBacklogItem = {
  id: string;
  type: MyTeamActionCategory;
  employee_id: string;
  employee_name: string;
  description: string;
  created_at: string;
  deadline: string | null;
  urgency: Urgency;
  deep_link: string;
};

type MyTeamCurrentUser = {
  id: string;
  nik: string;
  name: string;
  email: string;
  position_title: string;
  grade_jabatan: number;
  band_jabatan: string;
  organization_name: string;
  company_name: string;
  is_line_manager: boolean;
  assignment_count: number;
};

const currentUser: MyTeamCurrentUser = {
  id: "EMP-10001",
  nik: "INJ-2018-0247",
  name: "Ratna Kusumawati",
  email: "ratna.kusumawati@injourney.id",
  position_title: "VP Human Capital Business Partner",
  grade_jabatan: 22,
  band_jabatan: "VP",
  organization_name: "Direktorat SDM & Digital",
  company_name: "PT InJourney Wahana Mandiri",
  is_line_manager: true,
  assignment_count: 3,
};

const assignments: MyTeamAssignment[] = [
  {
    id: "ASGN-DEF-001",
    user_id: currentUser.id,
    position_id: "POS-VP-HCBP",
    position_title: "VP Human Capital Business Partner",
    assignment_type: "definitif",
    label: "Definitif",
    subordinate_count: 8,
    is_primary: true,
    effective_from: "2023-03-01",
    effective_to: null,
  },
  {
    id: "ASGN-PRJ-001",
    user_id: currentUser.id,
    position_id: "POS-PRJ-RINJANI",
    position_title: "Project Lead - Rinjani 2.0 Migration",
    assignment_type: "project_assignment",
    label: "Project Assignment",
    subordinate_count: 4,
    is_primary: false,
    effective_from: "2025-09-01",
    effective_to: "2026-08-31",
  },
  {
    id: "ASGN-MOB-001",
    user_id: currentUser.id,
    position_id: "POS-MOB-ILCS",
    position_title: "Acting GM HC - PT ILCS",
    assignment_type: "talent_mobility",
    label: "Talent Mobility",
    subordinate_count: 3,
    is_primary: false,
    effective_from: "2026-01-15",
    effective_to: "2026-07-14",
  },
];

const componentMeta = [
  { component_type: "performance", weight: 20, multiplier: 0.205 },
  { component_type: "competency", weight: 20, multiplier: 0.195 },
  { component_type: "experience", weight: 20, multiplier: 0.19 },
  { component_type: "aspiration", weight: 10, multiplier: 0.11 },
  { component_type: "training", weight: 20, multiplier: 0.2 },
  { component_type: "tes", weight: 10, multiplier: 0.1 },
] as const;

function buildDerivedEqsComponents(score: number | null): EqsComponent[] {
  if (score === null) {
    return [];
  }

  return componentMeta.map((component, index) => {
    const weightedValue = Number((score * component.multiplier).toFixed(2));
    const rawValue = Number(((weightedValue / component.weight) * 100).toFixed(1));
    const correctedRawValue = index === componentMeta.length - 1 ? Number((score - componentMeta.slice(0, -1).reduce((total, item) => total + score * item.multiplier, 0)).toFixed(2)) : weightedValue;

    return {
      component_type: component.component_type,
      weight: component.weight,
      raw_value: index === componentMeta.length - 1 ? Number(((correctedRawValue / component.weight) * 100).toFixed(1)) : rawValue,
      weighted_value: index === componentMeta.length - 1 ? correctedRawValue : weightedValue,
    };
  });
}

const eqsComponentOverrides: Record<string, EqsComponent[]> = {
  "EMP-20002": [
    { component_type: "performance", weight: 20, raw_value: 92.0, weighted_value: 18.4 },
    { component_type: "competency", weight: 20, raw_value: 88.5, weighted_value: 17.7 },
    { component_type: "experience", weight: 20, raw_value: 85.0, weighted_value: 17.0 },
    { component_type: "aspiration", weight: 10, raw_value: 95.0, weighted_value: 9.5 },
    { component_type: "training", weight: 20, raw_value: 90.0, weighted_value: 18.0 },
    { component_type: "tes", weight: 10, raw_value: 81.5, weighted_value: 8.15 },
  ],
  "EMP-20004": [
    { component_type: "performance", weight: 20, raw_value: 68.0, weighted_value: 13.6 },
    { component_type: "competency", weight: 20, raw_value: 62.0, weighted_value: 12.4 },
    { component_type: "experience", weight: 20, raw_value: 55.0, weighted_value: 11.0 },
    { component_type: "aspiration", weight: 10, raw_value: 80.0, weighted_value: 8.0 },
    { component_type: "training", weight: 20, raw_value: 72.0, weighted_value: 14.4 },
    { component_type: "tes", weight: 10, raw_value: 59.0, weighted_value: 5.9 },
  ],
  "EMP-20007": [
    { component_type: "performance", weight: 20, raw_value: 55.0, weighted_value: 11.0 },
    { component_type: "competency", weight: 20, raw_value: 42.0, weighted_value: 8.4 },
    { component_type: "experience", weight: 20, raw_value: 60.0, weighted_value: 12.0 },
    { component_type: "aspiration", weight: 10, raw_value: 30.0, weighted_value: 3.0 },
    { component_type: "training", weight: 20, raw_value: 35.5, weighted_value: 7.1 },
    { component_type: "tes", weight: 10, raw_value: 36.0, weighted_value: 3.6 },
  ],
};

const members: MyTeamMember[] = [
  {
    employee_id: "EMP-20001",
    nik: "INJ-2019-0412",
    name: "Bayu Aditya Pratama",
    photo_url: "/avatars/bayu-aditya.jpg",
    position_title: "Department Head HCBP - IAS",
    grade_jabatan: 19,
    band_jabatan: "DH",
    organization_name: "Dept. HCBP IAS",
    company_name: "PT Aviasi Pariwisata Indonesia (Persero)",
    hire_date: "2019-06-15",
    definitive_position_id: "POS-DH-HCBP-IAS",
    assignment_context: "definitif",
    nine_box_cell: "h-m",
    talent_cluster: "9box_promotable",
    previous_talent_cluster: "9box_promotable",
    eqs_score: 81.2,
    eqs_band: "qualified",
    talent_pool_status: "active",
    risk_profile: "low_risk",
    is_flagged: false,
    flag_reason: null,
    idp: { id: "IDP-R-001", cycle_id: "IDP-2026", status: "approved", total_hours: 48, completed_hours: 24, activity_count: 5, completed_activities: 2, submitted_at: "2026-01-10T09:00:00Z" },
    aspirations: { total_aspirations: 5, by_source: { individual: 3, supervisor: 1, job_holder: 1, unit: 0 }, has_aspiration: true, pending_review_count: 0 },
    eqs_components: buildDerivedEqsComponents(81.2),
    latest_assessment: { id: "AR-001", cycle_name: "Penilaian Kinerja Berbasis Perilaku 2025", overall_score: 4.2, overall_max_score: 6.0, published_at: "2025-12-20T10:00:00Z" },
    applications: [],
  },
  {
    employee_id: "EMP-20002",
    nik: "INJ-2017-0189",
    name: "Siti Nurhaliza Putri",
    photo_url: "/avatars/siti-nurhaliza.jpg",
    position_title: "Department Head HCBP - API",
    grade_jabatan: 19,
    band_jabatan: "DH",
    organization_name: "Dept. HCBP API",
    company_name: "PT Angkasa Pura Indonesia (Persero)",
    hire_date: "2017-03-01",
    definitive_position_id: "POS-DH-HCBP-API",
    assignment_context: "definitif",
    nine_box_cell: "h-h",
    talent_cluster: "9box_high_potential",
    previous_talent_cluster: "9box_high_potential",
    eqs_score: 88.75,
    eqs_band: "highly_qualified",
    talent_pool_status: "active",
    risk_profile: "flight_risk",
    is_flagged: true,
    flag_reason: "flight_risk",
    idp: { id: "IDP-R-002", cycle_id: "IDP-2026", status: "approved", total_hours: 52, completed_hours: 40, activity_count: 6, completed_activities: 5, submitted_at: "2026-01-08T08:30:00Z" },
    aspirations: { total_aspirations: 7, by_source: { individual: 3, supervisor: 2, job_holder: 1, unit: 1 }, has_aspiration: true, pending_review_count: 0 },
    eqs_components: eqsComponentOverrides["EMP-20002"],
    latest_assessment: { id: "AR-002", cycle_name: "Penilaian Kinerja Berbasis Perilaku 2025", overall_score: 5.1, overall_max_score: 6.0, published_at: "2025-12-20T10:00:00Z" },
    applications: [{ id: "APP-SUB-001", position_title: "General Manager Human Capital - Holding", movement_type: "PROMOSI", status: "shortlisted", submitted_at: "2026-01-20T09:00:00Z" }],
  },
  {
    employee_id: "EMP-20003",
    nik: "INJ-2020-0533",
    name: "Reza Mahendra",
    photo_url: "/avatars/reza-mahendra.jpg",
    position_title: "Department Head HCBP - TWC",
    grade_jabatan: 19,
    band_jabatan: "DH",
    organization_name: "Dept. HCBP TWC",
    company_name: "PT TWC Borobudur, Prambanan & Ratu Boko",
    hire_date: "2020-08-01",
    definitive_position_id: "POS-DH-HCBP-TWC",
    assignment_context: "definitif",
    nine_box_cell: "m-m",
    talent_cluster: "9box_solid_contributor",
    previous_talent_cluster: "9box_solid_contributor",
    eqs_score: 72.4,
    eqs_band: "qualified",
    talent_pool_status: "active",
    risk_profile: "low_risk",
    is_flagged: false,
    flag_reason: null,
    idp: { id: "IDP-R-003", cycle_id: "IDP-2026", status: "pending_approval", total_hours: 40, completed_hours: 0, activity_count: 4, completed_activities: 0, submitted_at: "2026-02-05T14:00:00Z" },
    aspirations: { total_aspirations: 2, by_source: { individual: 2, supervisor: 0, job_holder: 0, unit: 0 }, has_aspiration: true, pending_review_count: 1 },
    eqs_components: buildDerivedEqsComponents(72.4),
    latest_assessment: null,
    applications: [],
  },
  {
    employee_id: "EMP-20004",
    nik: "INJ-2021-0678",
    name: "Dian Permatasari",
    photo_url: "/avatars/dian-permata.jpg",
    position_title: "Department Head HCBP - ITDC",
    grade_jabatan: 19,
    band_jabatan: "DH",
    organization_name: "Dept. HCBP ITDC",
    company_name: "PT Pengembangan Pariwisata Indonesia (Persero)",
    hire_date: "2021-01-15",
    definitive_position_id: "POS-DH-HCBP-ITDC",
    assignment_context: "definitif",
    nine_box_cell: "m-l",
    talent_cluster: "9box_sleeping_tiger",
    previous_talent_cluster: "9box_sleeping_tiger",
    eqs_score: 65.3,
    eqs_band: "needs_development",
    talent_pool_status: "active",
    risk_profile: "medium_risk",
    is_flagged: true,
    flag_reason: "underperforming",
    idp: { id: "IDP-R-004", cycle_id: "IDP-2026", status: "revision_requested", total_hours: 30, completed_hours: 0, activity_count: 3, completed_activities: 0, submitted_at: "2026-01-28T11:00:00Z" },
    aspirations: { total_aspirations: 3, by_source: { individual: 1, supervisor: 1, job_holder: 0, unit: 1 }, has_aspiration: true, pending_review_count: 1 },
    eqs_components: eqsComponentOverrides["EMP-20004"],
    latest_assessment: null,
    applications: [{ id: "APP-SUB-002", position_title: "Department Head HCBP - HIN", movement_type: "ROTASI", status: "submitted", submitted_at: "2026-02-01T10:00:00Z" }],
  },
  {
    employee_id: "EMP-20005",
    nik: "INJ-2018-0301",
    name: "Ahmad Fauzi Rahman",
    photo_url: "/avatars/ahmad-fauzi.jpg",
    position_title: "Department Head Talent Operations",
    grade_jabatan: 19,
    band_jabatan: "DH",
    organization_name: "Dept. Talent Operations",
    company_name: "PT InJourney Wahana Mandiri",
    hire_date: "2018-04-01",
    definitive_position_id: "POS-DH-TALOPS",
    assignment_context: "definitif",
    nine_box_cell: "m-h",
    talent_cluster: "9box_promotable",
    previous_talent_cluster: "9box_solid_contributor",
    eqs_score: 79.85,
    eqs_band: "qualified",
    talent_pool_status: "active",
    risk_profile: "low_risk",
    is_flagged: false,
    flag_reason: null,
    idp: { id: "IDP-R-005", cycle_id: "IDP-2026", status: "approved", total_hours: 44, completed_hours: 12, activity_count: 4, completed_activities: 1, submitted_at: "2026-01-12T10:00:00Z" },
    aspirations: { total_aspirations: 4, by_source: { individual: 2, supervisor: 1, job_holder: 1, unit: 0 }, has_aspiration: true, pending_review_count: 0 },
    eqs_components: buildDerivedEqsComponents(79.85),
    latest_assessment: { id: "AR-003", cycle_name: "Penilaian Kinerja Berbasis Perilaku 2025", overall_score: 3.8, overall_max_score: 6.0, published_at: "2025-12-20T10:00:00Z" },
    applications: [],
  },
  {
    employee_id: "EMP-20006",
    nik: "INJ-2022-0891",
    name: "Putri Wulandari",
    photo_url: "/avatars/putri-wulan.jpg",
    position_title: "Section Head HC Analytics",
    grade_jabatan: 17,
    band_jabatan: "SH",
    organization_name: "Sect. HC Analytics",
    company_name: "PT InJourney Wahana Mandiri",
    hire_date: "2022-07-01",
    definitive_position_id: "POS-SH-HCANALYTICS",
    assignment_context: "definitif",
    nine_box_cell: null,
    talent_cluster: null,
    previous_talent_cluster: null,
    eqs_score: null,
    eqs_band: null,
    talent_pool_status: null,
    risk_profile: null,
    is_flagged: false,
    flag_reason: null,
    idp: { id: "IDP-R-006", cycle_id: "IDP-2026", status: "draft", total_hours: 0, completed_hours: 0, activity_count: 0, completed_activities: 0, submitted_at: null },
    aspirations: { total_aspirations: 0, by_source: { individual: 0, supervisor: 0, job_holder: 0, unit: 0 }, has_aspiration: false, pending_review_count: 0 },
    eqs_components: [],
    latest_assessment: null,
    applications: [],
  },
  {
    employee_id: "EMP-20007",
    nik: "INJ-2016-0102",
    name: "Hendra Wijaya",
    photo_url: "/avatars/hendra-wijaya.jpg",
    position_title: "Department Head HCBP - Sarinah",
    grade_jabatan: 19,
    band_jabatan: "DH",
    organization_name: "Dept. HCBP Sarinah",
    company_name: "PT Sarinah (Persero)",
    hire_date: "2016-11-01",
    definitive_position_id: "POS-DH-HCBP-SAR",
    assignment_context: "definitif",
    nine_box_cell: "l-l",
    talent_cluster: "9box_unfit",
    previous_talent_cluster: "9box_solid_contributor",
    eqs_score: 45.1,
    eqs_band: "not_recommended",
    talent_pool_status: "active",
    risk_profile: "high_risk",
    is_flagged: true,
    flag_reason: "at_risk",
    idp: { id: "IDP-R-007", cycle_id: "IDP-2026", status: "pending_approval", total_hours: 42, completed_hours: 0, activity_count: 4, completed_activities: 0, submitted_at: "2026-02-07T09:30:00Z" },
    aspirations: { total_aspirations: 1, by_source: { individual: 1, supervisor: 0, job_holder: 0, unit: 0 }, has_aspiration: true, pending_review_count: 0 },
    eqs_components: eqsComponentOverrides["EMP-20007"],
    latest_assessment: null,
    applications: [],
  },
  {
    employee_id: "EMP-20008",
    nik: "INJ-2023-1045",
    name: "Nadia Rahma Azzahra",
    photo_url: "/avatars/nadia-rahma.jpg",
    position_title: "Section Head HC Compliance",
    grade_jabatan: 17,
    band_jabatan: "SH",
    organization_name: "Sect. HC Compliance",
    company_name: "PT InJourney Wahana Mandiri",
    hire_date: "2023-02-01",
    definitive_position_id: "POS-SH-HCCOMPL",
    assignment_context: "definitif",
    nine_box_cell: "l-h",
    talent_cluster: "9box_solid_contributor",
    previous_talent_cluster: "9box_solid_contributor",
    eqs_score: 71.0,
    eqs_band: "qualified",
    talent_pool_status: "active",
    risk_profile: "low_risk",
    is_flagged: false,
    flag_reason: null,
    idp: { id: "IDP-R-008", cycle_id: "IDP-2026", status: "approved", total_hours: 46, completed_hours: 32, activity_count: 5, completed_activities: 3, submitted_at: "2026-01-09T08:00:00Z" },
    aspirations: { total_aspirations: 3, by_source: { individual: 2, supervisor: 1, job_holder: 0, unit: 0 }, has_aspiration: true, pending_review_count: 0 },
    eqs_components: buildDerivedEqsComponents(71.0),
    latest_assessment: null,
    applications: [],
  },
];

const assignmentMembersById: Record<string, string[]> = {
  "ASGN-DEF-001": members.map((member) => member.employee_id),
  "ASGN-PRJ-001": ["EMP-20001", "EMP-20003", "EMP-20006", "EMP-20008"],
  "ASGN-MOB-001": ["EMP-20002", "EMP-20004", "EMP-20007"],
};

const actionItems: Record<MyTeamActionCategory, MyTeamActionItem[]> = {
  idp_pending_approval: [
    {
      id: "ACT-IDP-001",
      employee_id: "EMP-20003",
      employee_name: "Reza Mahendra",
      description: "IDP 2026 menunggu approval line manager.",
      submitted_at: "2026-02-05T14:00:00Z",
      urgency: "normal",
      deep_link: "/talent/idp?employee=EMP-20003",
    },
    {
      id: "ACT-IDP-002",
      employee_id: "EMP-20007",
      employee_name: "Hendra Wijaya",
      description: "IDP 2026 menunggu approval line manager.",
      submitted_at: "2026-02-07T09:30:00Z",
      urgency: "normal",
      deep_link: "/talent/idp?employee=EMP-20007",
    },
  ],
  aspiration_pending_review: [
    {
      id: "ACT-ASP-001",
      employee_id: "EMP-20003",
      employee_name: "Reza Mahendra",
      description: "Aspirasi individual belum di-review untuk Team Aspiration.",
      submitted_at: "2026-01-30T10:00:00Z",
      urgency: "normal",
      deep_link: "/talent/career-aspiration?employee=EMP-20003",
    },
    {
      id: "ACT-ASP-002",
      employee_id: "EMP-20004",
      employee_name: "Dian Permatasari",
      description: "Aspirasi individual belum di-review untuk Team Aspiration.",
      submitted_at: "2026-01-28T15:00:00Z",
      urgency: "normal",
      deep_link: "/talent/career-aspiration?employee=EMP-20004",
    },
  ],
  assessment_pending: [
    {
      id: "ACT-ASM-001",
      employee_id: "EMP-20001",
      employee_name: "Bayu Aditya Pratama",
      description: "Penilaian Kinerja Berbasis Perilaku 2026 belum dimulai.",
      deadline: "2026-02-28T23:59:59Z",
      urgency: "normal",
      deep_link: "/talent/360-assessment?employee=EMP-20001",
    },
    {
      id: "ACT-ASM-002",
      employee_id: "EMP-20002",
      employee_name: "Siti Nurhaliza Putri",
      description: "Penilaian Kinerja Berbasis Perilaku 2026 sedang diisi.",
      deadline: "2026-02-28T23:59:59Z",
      urgency: "normal",
      deep_link: "/talent/360-assessment?employee=EMP-20002",
    },
    {
      id: "ACT-ASM-003",
      employee_id: "EMP-20003",
      employee_name: "Reza Mahendra",
      description: "Penilaian Kinerja Berbasis Perilaku 2026 belum dimulai.",
      deadline: "2026-02-28T23:59:59Z",
      urgency: "normal",
      deep_link: "/talent/360-assessment?employee=EMP-20003",
    },
  ],
  team_members_flagged: [
    {
      id: "ACT-FLAG-001",
      employee_id: "EMP-20002",
      employee_name: "Siti Nurhaliza Putri",
      description: "Flight risk - top talent dengan EQS 88.75, perlu perhatian retensi.",
      urgency: "high",
      flag_reason: "flight_risk",
      deep_link: "/talent/supervisor-portal?tab=team-profile&employee=EMP-20002",
    },
    {
      id: "ACT-FLAG-002",
      employee_id: "EMP-20004",
      employee_name: "Dian Permatasari",
      description: "Underperforming - Sleeping Tiger, EQS 65.30 butuh intervensi.",
      urgency: "medium",
      flag_reason: "underperforming",
      deep_link: "/talent/supervisor-portal?tab=team-profile&employee=EMP-20004",
    },
    {
      id: "ACT-FLAG-003",
      employee_id: "EMP-20007",
      employee_name: "Hendra Wijaya",
      description: "At-risk - 9-Box Unfit dan EQS 45.10, perlu tindak lanjut.",
      urgency: "high",
      flag_reason: "at_risk",
      deep_link: "/talent/supervisor-portal?tab=team-profile&employee=EMP-20007",
    },
  ],
};

const backlogItems: MyTeamBacklogItem[] = [
  { id: "BLG-001", type: "aspiration_pending_review", employee_id: "EMP-20004", employee_name: "Dian Permatasari", description: "Aspirasi individual belum di-review untuk Team Aspiration.", created_at: "2026-01-28T15:00:00Z", deadline: null, urgency: "normal", deep_link: "/talent/career-aspiration?employee=EMP-20004" },
  { id: "BLG-002", type: "aspiration_pending_review", employee_id: "EMP-20003", employee_name: "Reza Mahendra", description: "Aspirasi individual belum di-review untuk Team Aspiration.", created_at: "2026-01-30T10:00:00Z", deadline: null, urgency: "normal", deep_link: "/talent/career-aspiration?employee=EMP-20003" },
  { id: "BLG-003", type: "assessment_pending", employee_id: "EMP-20001", employee_name: "Bayu Aditya Pratama", description: "Penilaian Kinerja Berbasis Perilaku 2026 belum dimulai.", created_at: "2026-01-25T08:00:00Z", deadline: "2026-02-28T23:59:59Z", urgency: "normal", deep_link: "/talent/360-assessment?employee=EMP-20001" },
  { id: "BLG-004", type: "assessment_pending", employee_id: "EMP-20002", employee_name: "Siti Nurhaliza Putri", description: "Penilaian Kinerja Berbasis Perilaku 2026 sedang diisi.", created_at: "2026-01-25T08:00:00Z", deadline: "2026-02-28T23:59:59Z", urgency: "normal", deep_link: "/talent/360-assessment?employee=EMP-20002" },
  { id: "BLG-005", type: "assessment_pending", employee_id: "EMP-20003", employee_name: "Reza Mahendra", description: "Penilaian Kinerja Berbasis Perilaku 2026 belum dimulai.", created_at: "2026-01-25T08:00:00Z", deadline: "2026-02-28T23:59:59Z", urgency: "normal", deep_link: "/talent/360-assessment?employee=EMP-20003" },
  { id: "BLG-006", type: "idp_pending_approval", employee_id: "EMP-20003", employee_name: "Reza Mahendra", description: "IDP 2026 menunggu approval.", created_at: "2026-02-05T14:00:00Z", deadline: "2026-02-20T23:59:59Z", urgency: "normal", deep_link: "/talent/idp?employee=EMP-20003" },
  { id: "BLG-007", type: "team_members_flagged", employee_id: "EMP-20002", employee_name: "Siti Nurhaliza Putri", description: "Flight risk - top talent, perlu perhatian retensi.", created_at: "2026-01-20T10:00:00Z", deadline: null, urgency: "high", deep_link: "/talent/supervisor-portal?tab=team-profile&employee=EMP-20002" },
  { id: "BLG-008", type: "team_members_flagged", employee_id: "EMP-20007", employee_name: "Hendra Wijaya", description: "At-risk - 9-Box Unfit, sedang hukuman disiplin.", created_at: "2026-01-20T10:00:00Z", deadline: null, urgency: "high", deep_link: "/talent/supervisor-portal?tab=team-profile&employee=EMP-20007" },
  { id: "BLG-009", type: "idp_pending_approval", employee_id: "EMP-20007", employee_name: "Hendra Wijaya", description: "IDP 2026 menunggu approval.", created_at: "2026-02-07T09:30:00Z", deadline: "2026-02-20T23:59:59Z", urgency: "normal", deep_link: "/talent/idp?employee=EMP-20007" },
  { id: "BLG-010", type: "team_members_flagged", employee_id: "EMP-20004", employee_name: "Dian Permatasari", description: "Underperforming - Sleeping Tiger, EQS needs development.", created_at: "2026-01-20T10:00:00Z", deadline: null, urgency: "medium", deep_link: "/talent/supervisor-portal?tab=team-profile&employee=EMP-20004" },
];

function getMembersForAssignment(assignmentId: string) {
  const memberIds = assignmentMembersById[assignmentId] ?? assignmentMembersById["ASGN-DEF-001"];
  return members.filter((member) => memberIds.includes(member.employee_id));
}

function getActionItemsForAssignment(assignmentId: string) {
  const memberIds = new Set(getMembersForAssignment(assignmentId).map((member) => member.employee_id));

  return {
    idp_pending_approval: actionItems.idp_pending_approval.filter((item) => memberIds.has(item.employee_id)),
    aspiration_pending_review: actionItems.aspiration_pending_review.filter((item) => memberIds.has(item.employee_id)),
    assessment_pending: actionItems.assessment_pending.filter((item) => memberIds.has(item.employee_id)),
    team_members_flagged: actionItems.team_members_flagged.filter((item) => memberIds.has(item.employee_id)),
  };
}

function getBacklogForAssignment(assignmentId: string) {
  const memberIds = new Set(getMembersForAssignment(assignmentId).map((member) => member.employee_id));
  return backlogItems.filter((item) => memberIds.has(item.employee_id));
}

function getInsightsForAssignment(assignmentId: string) {
  const scopedMembers = getMembersForAssignment(assignmentId);
  const classifiedMembers = scopedMembers.filter((member) => member.talent_cluster);
  const eqsMembers = scopedMembers.filter((member) => member.eqs_score !== null);
  const aspirationMembers = scopedMembers.filter((member) => member.aspirations.has_aspiration);
  const idpApproved = scopedMembers.filter((member) => member.idp.status === "approved").length;

  const clusters: Exclude<TalentCluster, null>[] = [
    "9box_high_potential",
    "9box_promotable",
    "9box_solid_contributor",
    "9box_sleeping_tiger",
    "9box_unfit",
  ];

  const currentDistribution = Object.fromEntries(clusters.map((cluster) => [cluster, classifiedMembers.filter((member) => member.talent_cluster === cluster).length])) as Record<Exclude<TalentCluster, null>, number>;
  const previousDistribution = Object.fromEntries(clusters.map((cluster) => [cluster, classifiedMembers.filter((member) => member.previous_talent_cluster === cluster).length])) as Record<Exclude<TalentCluster, null>, number>;
  const eqsByBand = {
    highly_qualified: eqsMembers.filter((member) => member.eqs_band === "highly_qualified").length,
    qualified: eqsMembers.filter((member) => member.eqs_band === "qualified").length,
    needs_development: eqsMembers.filter((member) => member.eqs_band === "needs_development").length,
    not_recommended: eqsMembers.filter((member) => member.eqs_band === "not_recommended").length,
  };
  const averageEqs = eqsMembers.length ? Number((eqsMembers.reduce((total, member) => total + (member.eqs_score ?? 0), 0) / eqsMembers.length).toFixed(2)) : 0;
  const minEqs = eqsMembers.reduce<MyTeamMember | null>((lowest, member) => {
    if (member.eqs_score === null) return lowest;
    if (!lowest || (lowest.eqs_score ?? 0) > member.eqs_score) return member;
    return lowest;
  }, null);
  const maxEqs = eqsMembers.reduce<MyTeamMember | null>((highest, member) => {
    if (member.eqs_score === null) return highest;
    if (!highest || (highest.eqs_score ?? 0) < member.eqs_score) return member;
    return highest;
  }, null);

  return {
    position_context: assignments.find((assignment) => assignment.id === assignmentId)?.label ?? "Definitif",
    total_subordinates: scopedMembers.length,
    nine_box_distribution: {
      classified_count: classifiedMembers.length,
      unclassified_count: scopedMembers.length - classifiedMembers.length,
      distribution: currentDistribution,
      trend_vs_previous: Object.fromEntries(clusters.map((cluster) => [cluster, currentDistribution[cluster] - previousDistribution[cluster]])) as Record<Exclude<TalentCluster, null>, number>,
    },
    eqs_distribution: {
      calculated_count: eqsMembers.length,
      not_calculated_count: scopedMembers.length - eqsMembers.length,
      average_score: averageEqs,
      by_band: Object.fromEntries(
        Object.entries(eqsByBand).map(([band, count]) => [
          band,
          {
            count,
            percentage: eqsMembers.length ? Number(((count / eqsMembers.length) * 100).toFixed(1)) : 0,
          },
        ]),
      ) as Record<Exclude<EqsBand, null>, { count: number; percentage: number }>,
      min_score: minEqs ? { value: minEqs.eqs_score ?? 0, employee_name: minEqs.name } : null,
      max_score: maxEqs ? { value: maxEqs.eqs_score ?? 0, employee_name: maxEqs.name } : null,
    },
    idp_completion: {
      total_subordinates: scopedMembers.length,
      by_status: {
        approved: scopedMembers.filter((member) => member.idp.status === "approved").length,
        pending_approval: scopedMembers.filter((member) => member.idp.status === "pending_approval").length,
        revision_requested: scopedMembers.filter((member) => member.idp.status === "revision_requested").length,
        draft: scopedMembers.filter((member) => member.idp.status === "draft").length,
      },
      completion_rate: scopedMembers.length ? Number(((idpApproved / scopedMembers.length) * 100).toFixed(1)) : 0,
      average_hours_planned: scopedMembers.length ? Number((scopedMembers.reduce((total, member) => total + member.idp.total_hours, 0) / scopedMembers.length).toFixed(2)) : 0,
      average_hours_completed: scopedMembers.length ? Number((scopedMembers.reduce((total, member) => total + member.idp.completed_hours, 0) / scopedMembers.length).toFixed(2)) : 0,
      hours_completion_rate: scopedMembers.reduce((total, member) => total + member.idp.total_hours, 0)
        ? Number(
            (
              (scopedMembers.reduce((total, member) => total + member.idp.completed_hours, 0) /
                scopedMembers.reduce((total, member) => total + member.idp.total_hours, 0)) *
              100
            ).toFixed(1),
          )
        : 0,
    },
    aspiration_coverage: {
      total_subordinates: scopedMembers.length,
      with_aspiration: aspirationMembers.length,
      without_aspiration: scopedMembers.length - aspirationMembers.length,
      coverage_rate: scopedMembers.length ? Number(((aspirationMembers.length / scopedMembers.length) * 100).toFixed(1)) : 0,
      pending_review: scopedMembers.reduce((total, member) => total + member.aspirations.pending_review_count, 0),
    },
  };
}

const clusterLabels: Record<Exclude<TalentCluster, null>, string> = {
  "9box_high_potential": "High Potential",
  "9box_promotable": "Promotable",
  "9box_solid_contributor": "Solid Contributor",
  "9box_sleeping_tiger": "Sleeping Tiger",
  "9box_unfit": "Unfit",
};

const eqsBandLabels: Record<Exclude<EqsBand, null>, string> = {
  highly_qualified: "Highly Qualified",
  qualified: "Qualified",
  needs_development: "Needs Development",
  not_recommended: "Not Recommended",
};

const actionCategoryLabels: Record<MyTeamActionCategory, string> = {
  idp_pending_approval: "IDP Pending Approval",
  aspiration_pending_review: "Aspiration Pending Review",
  assessment_pending: "360 Assessment Pending",
  team_members_flagged: "Team Members Flagged",
};

export {
  actionCategoryLabels,
  assignments as myTeamAssignments,
  backlogItems as myTeamBacklogItems,
  clusterLabels,
  currentUser as myTeamCurrentUser,
  eqsBandLabels,
  getActionItemsForAssignment,
  getBacklogForAssignment,
  getInsightsForAssignment,
  getMembersForAssignment,
  members as myTeamMembers,
};

export type {
  EqsBand,
  MyTeamActionCategory,
  MyTeamActionItem,
  MyTeamAssignment,
  MyTeamBacklogItem,
  MyTeamCurrentUser,
  MyTeamMember,
  NineBoxCell,
  RiskProfile,
  TalentCluster,
  Urgency,
};
