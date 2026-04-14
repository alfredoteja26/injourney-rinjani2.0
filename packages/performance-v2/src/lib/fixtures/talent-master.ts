import type { Company, Employee, Location, OrgUnit, Position } from "@talent/types/talent";

const companyId = "co-injourney-ho";
const companyAp1Cgk = "co-ap1-cgk";
const companyItdc = "co-itdc";
const locId = "loc-jkt";
const locCgk = "loc-cgk";
const locDps = "loc-dps";

export const performanceV2Companies: Company[] = [
  { company_id: companyId, name: "InJourney Group", type: "HOLDING" },
  { company_id: companyAp1Cgk, name: "PT AP I (CGK)", type: "SUBSIDIARY" },
  { company_id: companyItdc, name: "PT InJourney Travel (ITDC)", type: "SUBSIDIARY" },
];

export const performanceV2Locations: Location[] = [
  {
    location_id: locId,
    personal_area: "HO",
    sub_personal_area: "Jakarta",
    city: "Jakarta",
    country: "ID",
  },
  {
    location_id: locCgk,
    personal_area: "CGK",
    sub_personal_area: "Jakarta",
    city: "Jakarta",
    country: "ID",
  },
  {
    location_id: locDps,
    personal_area: "DPS",
    sub_personal_area: "Bali",
    city: "Denpasar",
    country: "ID",
  },
];

export const performanceV2OrgUnits: OrgUnit[] = [
  { org_unit_id: "ou-hc", company_id: companyId, name: "Direktorat Human Capital", parent_org_unit_id: null },
  { org_unit_id: "ou-hc-strat", company_id: companyId, name: "Divisi HC Strategy", parent_org_unit_id: "ou-hc" },
  { org_unit_id: "ou-hc-planning", company_id: companyId, name: "Unit HC Planning", parent_org_unit_id: "ou-hc-strat" },
  { org_unit_id: "ou-cgk-ops", company_id: companyAp1Cgk, name: "Airport Operations CGK", parent_org_unit_id: null },
  { org_unit_id: "ou-itdc-hc", company_id: companyItdc, name: "HC Business Partner ITDC", parent_org_unit_id: null },
];

const posVp = "pos-vp-hc-strat";
const posGhPlanning = "pos-gh-hc-planning";
const posGhPolicy = "pos-gh-hc-policy";
const posGhOd = "pos-gh-org-dev";
const posSeniorOfficerPlanning = "pos-senior-officer-hc-planning";
const posManagerPolicyImplementation = "pos-manager-policy-implementation";
const posLeadPolicyGovernance = "pos-lead-policy-governance";
const posOfficerPolicyMonitoring = "pos-officer-policy-monitoring";

export const performanceV2Positions: Position[] = [
  {
    position_id: posVp,
    title: "VP Human Capital Strategy",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 5,
    band_jabatan: "Band Utama",
    company_id: companyId,
    org_unit_id: "ou-hc-strat",
    location_id: locId,
    status: "FILLED",
    incumbent_employee_id: "emp-260101",
    reports_to_position_id: null,
    job_description: "[TBD]",
  },
  {
    position_id: posGhPlanning,
    title: "Group Head HC Planning & Analytics",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 4,
    band_jabatan: "Band Madya",
    company_id: companyId,
    org_unit_id: "ou-hc-strat",
    location_id: locId,
    status: "FILLED",
    incumbent_employee_id: "emp-260102",
    reports_to_position_id: posVp,
    job_description: "[TBD]",
  },
  {
    position_id: posSeniorOfficerPlanning,
    title: "Senior Officer 1 HC Planning",
    job_family: "HUMAN_RESOURCES",
    position_type: "NON_STRUKTURAL",
    grade_jabatan: 3,
    band_jabatan: "Band Muda",
    company_id: companyId,
    org_unit_id: "ou-hc-planning",
    location_id: locId,
    status: "VACANT",
    incumbent_employee_id: null,
    reports_to_position_id: posGhPlanning,
    job_description: "[TBD]",
  },
  {
    position_id: posGhPolicy,
    title: "Group Head HC Policy & Governance",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 4,
    band_jabatan: "Band Madya",
    company_id: companyId,
    org_unit_id: "ou-hc-strat",
    location_id: locId,
    status: "FILLED",
    incumbent_employee_id: "emp-260103",
    reports_to_position_id: posVp,
    job_description: "[TBD]",
  },
  {
    position_id: posManagerPolicyImplementation,
    title: "Manager Policy Implementation",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 3,
    band_jabatan: "Band Muda",
    company_id: companyId,
    org_unit_id: "ou-hc-strat",
    location_id: locId,
    status: "FILLED",
    incumbent_employee_id: "emp-260105",
    reports_to_position_id: posGhPolicy,
    job_description: "[TBD]",
  },
  {
    position_id: posLeadPolicyGovernance,
    title: "Lead Policy Governance",
    job_family: "HUMAN_RESOURCES",
    position_type: "NON_STRUKTURAL",
    grade_jabatan: 3,
    band_jabatan: "Band Muda",
    company_id: companyId,
    org_unit_id: "ou-hc-strat",
    location_id: locId,
    status: "FILLED",
    incumbent_employee_id: "emp-260106",
    reports_to_position_id: posManagerPolicyImplementation,
    job_description: "[TBD]",
  },
  {
    position_id: posOfficerPolicyMonitoring,
    title: "Officer Policy Monitoring",
    job_family: "HUMAN_RESOURCES",
    position_type: "NON_STRUKTURAL",
    grade_jabatan: 2,
    band_jabatan: "Band Pratama",
    company_id: companyId,
    org_unit_id: "ou-hc-strat",
    location_id: locId,
    status: "FILLED",
    incumbent_employee_id: "emp-260107",
    reports_to_position_id: posLeadPolicyGovernance,
    job_description: "[TBD]",
  },
  {
    position_id: posGhOd,
    title: "Group Head Org Development",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 4,
    band_jabatan: "Band Madya",
    company_id: companyId,
    org_unit_id: "ou-hc-strat",
    location_id: locId,
    status: "FILLED",
    incumbent_employee_id: "emp-260104",
    reports_to_position_id: posVp,
    job_description: "[TBD]",
  },
  {
    position_id: "pos-cgk-ops-head",
    title: "Airport Operations Head CGK",
    job_family: "OPERATIONS",
    position_type: "STRUKTURAL",
    grade_jabatan: 4,
    band_jabatan: "Band Madya",
    company_id: companyAp1Cgk,
    org_unit_id: "ou-cgk-ops",
    location_id: locCgk,
    status: "VACANT",
    incumbent_employee_id: null,
    reports_to_position_id: null,
    job_description: "[TBD]",
  },
  {
    position_id: "pos-itdc-hc-bp",
    title: "HC Business Partner ITDC",
    job_family: "HUMAN_RESOURCES",
    position_type: "STRUKTURAL",
    grade_jabatan: 4,
    band_jabatan: "Band Madya",
    company_id: companyItdc,
    org_unit_id: "ou-itdc-hc",
    location_id: locDps,
    status: "VACANT",
    incumbent_employee_id: null,
    reports_to_position_id: null,
    job_description: "[TBD]",
  },
];

function employee(
  employee_id: string,
  nik: string,
  full_name: string,
  position_id: string | null,
  supervisor_id: string | null,
  avatar?: string
): Employee {
  return {
    employee_id,
    nik,
    full_name,
    employee_type: "PERMANENT",
    company_id: companyId,
    current_position_id: position_id,
    current_grade_jabatan: 4,
    personal_grade_pg: "PG-4",
    job_family_current: "HUMAN_RESOURCES",
    location_id: locId,
    direct_supervisor_employee_id: supervisor_id,
    tenure_months_in_current_grade: 18,
    disciplinary_status: "NONE",
    profile: { email: `${nik}@injourney.co.id` },
    ...(avatar ? { avatar } : {}),
  };
}

const dimasAvatarUrl =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format";
const binaviaAvatarUrl =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&auto=format";

export const performanceV2Employees: Employee[] = [
  employee("emp-260101", "260101", "Dimas Sayyid", posVp, null, dimasAvatarUrl),
  employee("emp-260102", "260102", "Binavia Wardhani", posGhPlanning, "emp-260101", binaviaAvatarUrl),
  employee("emp-260103", "260103", "Fajar Nugraha", posGhPolicy, "emp-260101"),
  employee("emp-260105", "260105", "Arif Prasetyo", posManagerPolicyImplementation, "emp-260103"),
  employee("emp-260106", "260106", "Nadia Putri", posLeadPolicyGovernance, "emp-260105"),
  employee("emp-260107", "260107", "Raka Mahendra", posOfficerPolicyMonitoring, "emp-260106"),
  employee("emp-260104", "260104", "Sinta Maharani", posGhOd, "emp-260101"),
];
