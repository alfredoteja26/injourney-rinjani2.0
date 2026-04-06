import { TalentPoolCandidate, PoolMetrics, Band } from "./types";

export const mockBands: Band[] = [
  { id: "band-1", name: "Band I", level: "Board of Directors", candidate_count: 12, description: "Top executive leadership" },
  { id: "band-2", name: "Band II", level: "Vice President / Head of Division", candidate_count: 28, description: "Strategic division leadership" },
  { id: "band-3", name: "Band III", level: "General Manager / Senior Manager", candidate_count: 45, description: "Operational and tactical management" },
  { id: "band-4", name: "Band IV", level: "Manager", candidate_count: 86, description: "Team leadership and execution" },
  { id: "band-5", name: "Band V", level: "Supervisor / Specialist", candidate_count: 120, description: "Subject matter expertise" }
];

export const mockCandidates: TalentPoolCandidate[] = [
  {
    id: "tpc-001",
    employee_id: "emp-ahmad-susanto",
    name: "Ahmad Susanto",
    avatar_url: "AS",
    position: "Sr. Manager HC",
    unit: "Human Capital",
    company: "InJourney Holding",
    job_family: "Human Capital",
    grade: "Band IV",
    talent_cluster: "9box_high_potential",
    eqs_score: {
      total_score: 93.5,
      eqs_band: "highly_qualified",
      calculated_at: "2026-01-15",
      components: [
        { id: "c1", component_type: "performance", weight: 20, raw_value: 95, weighted_value: 19.0 },
        { id: "c2", component_type: "competency", weight: 20, raw_value: 88, weighted_value: 17.6 },
        { id: "c3", component_type: "experience", weight: 20, raw_value: 92, weighted_value: 18.4 },
        { id: "c4", component_type: "aspiration", weight: 10, raw_value: 100, weighted_value: 10.0 },
        { id: "c5", component_type: "training", weight: 20, raw_value: 85, weighted_value: 17.0 },
        { id: "c6", component_type: "tes", weight: 10, raw_value: 75, weighted_value: 7.5 }
      ]
    },
    is_top_talent: true,
    is_tr_proposed: false,
    is_hcbp_shortlisted: false,
    risk_profile: "LOW",
    career_history: [
      {
        id: "ch-1",
        role: "Sr. Manager HC",
        company: "InJourney Holding",
        duration: "Jan 2023 - Present",
        is_current: true,
        assignment_type: "definisi",
        achievements: ["Led HC transformation", "Implemented new TMS"]
      },
      {
        id: "ch-2",
        role: "Manager HR Ops",
        company: "PT Angkasa Pura I",
        duration: "2019 - 2022",
        is_current: false,
        assignment_type: "definisi",
        achievements: ["Best Employee 2020"]
      }
    ],
    education: [
      { degree: "Master of Management", institution: "Universitas Indonesia", year: 2018, gpa: 3.8 }
    ],
    certifications: [
      { name: "SHRM-SCP", issuer: "SHRM", validity: "2024-2027", status: "valid" }
    ],
    training: [
      { name: "Strategic Leadership", provider: "InJourney Learning", hours: 40, status: "completed", score: 90 }
    ],
    aspiration: {
      individual: "VP Human Capital",
      supervisor: "Ready for promotion",
      unit: "Recommended",
      score: 100
    },
    personal_info: {
      dob: "1985-05-15",
      gender: "Male",
      hire_date: "2015-03-01",
      email: "ahmad.susanto@injourney.id",
      phone: "+6281234567890",
      address: "Jakarta Selatan"
    }
  },
  {
    id: "tpc-002",
    employee_id: "emp-budi-santoso",
    name: "Budi Santoso",
    avatar_url: "BS",
    position: "Manager Finance",
    unit: "Finance",
    company: "InJourney Holding",
    job_family: "Finance",
    grade: "Band III",
    talent_cluster: "9box_high_potential",
    eqs_score: {
      total_score: 91.1,
      eqs_band: "highly_qualified",
      calculated_at: "2026-01-15",
      components: []
    },
    is_top_talent: true,
    is_tr_proposed: true,
    tr_proposal_id: "TR-2026-001",
    is_hcbp_shortlisted: false,
    risk_profile: "MEDIUM",
    career_history: [],
    education: [],
    certifications: [],
    training: [],
    aspiration: { score: 90 },
    personal_info: {
      dob: "1988-08-20",
      gender: "Male",
      hire_date: "2016-07-01",
      email: "budi.s@injourney.id",
      phone: "+628111111111",
      address: "Jakarta Pusat"
    }
  },
  {
    id: "tpc-003",
    employee_id: "emp-citra-dewi",
    name: "Citra Dewi",
    avatar_url: "CD",
    position: "IT Specialist",
    unit: "Information Technology",
    company: "PT Angkasa Pura I",
    job_family: "Information Technology",
    grade: "Band III",
    talent_cluster: "9box_promotable",
    eqs_score: {
      total_score: 88.7,
      eqs_band: "highly_qualified",
      calculated_at: "2026-01-15",
      components: []
    },
    is_top_talent: false,
    is_tr_proposed: false,
    is_hcbp_shortlisted: true,
    shortlist_count: 2,
    risk_profile: "LOW",
    career_history: [],
    education: [],
    certifications: [],
    training: [],
    aspiration: { score: 85 },
    personal_info: {
      dob: "1990-12-10",
      gender: "Female",
      hire_date: "2018-02-15",
      email: "citra.dewi@ap1.co.id",
      phone: "+628122222222",
      address: "Yogyakarta"
    }
  },
  {
    id: "tpc-004",
    employee_id: "emp-dian-permata",
    name: "Dian Permata",
    avatar_url: "DP",
    position: "Legal Analyst",
    unit: "Legal & Compliance",
    company: "PT Angkasa Pura I",
    job_family: "Legal",
    grade: "Band III",
    talent_cluster: "9box_promotable",
    eqs_score: {
      total_score: 85.2,
      eqs_band: "qualified",
      calculated_at: "2026-01-15",
      components: []
    },
    is_top_talent: false,
    is_tr_proposed: true,
    is_hcbp_shortlisted: true,
    shortlist_count: 1,
    risk_profile: "LOW",
    career_history: [],
    education: [],
    certifications: [],
    training: [],
    aspiration: { score: 80 },
    personal_info: {
      dob: "1992-04-05",
      gender: "Female",
      hire_date: "2019-09-01",
      email: "dian.permata@ap1.co.id",
      phone: "+628133333333",
      address: "Semarang"
    }
  },
  {
    id: "tpc-005",
    employee_id: "emp-eko-prasetyo",
    name: "Eko Prasetyo",
    avatar_url: "EP",
    position: "Supervisor Ops",
    unit: "Operations",
    company: "ITDC",
    job_family: "Operations",
    grade: "Band II",
    talent_cluster: "9box_solid_contributor",
    eqs_score: {
      total_score: 82.4,
      eqs_band: "qualified",
      calculated_at: "2026-01-15",
      components: []
    },
    is_top_talent: false,
    is_tr_proposed: false,
    is_hcbp_shortlisted: false,
    risk_profile: "HIGH",
    career_history: [],
    education: [],
    certifications: [],
    training: [],
    aspiration: { score: 70 },
    personal_info: {
      dob: "1987-11-30",
      gender: "Male",
      hire_date: "2014-06-01",
      email: "eko.p@itdc.co.id",
      phone: "+628144444444",
      address: "Bali"
    }
  },
  {
    id: "tpc-006",
    employee_id: "emp-fani-wijaya",
    name: "Fani Wijaya",
    avatar_url: "FW",
    position: "Legal Staff",
    unit: "Legal",
    company: "Sarinah",
    job_family: "Legal",
    grade: "Band II",
    talent_cluster: "9box_sleeping_tiger",
    eqs_score: {
      total_score: 65.3,
      eqs_band: "needs_development",
      calculated_at: "2026-01-15",
      components: []
    },
    is_top_talent: false,
    is_tr_proposed: false,
    is_hcbp_shortlisted: false,
    risk_profile: "HIGH",
    career_history: [],
    education: [],
    certifications: [],
    training: [],
    aspiration: { score: 60 },
    personal_info: {
      dob: "1995-02-28",
      gender: "Female",
      hire_date: "2020-01-10",
      email: "fani.w@sarinah.co.id",
      phone: "+628155555555",
      address: "Jakarta Selatan"
    }
  }
];

export const mockPoolMetrics: PoolMetrics = {
  total_pool: 245,
  top_talent_count: 32,
  avg_eqs: 84.5,
  coverage_percent: 18,
  eqs_distribution: {
    "Highly Qualified": 45,
    "Qualified": 35,
    "Needs Development": 15,
    "Not Ready": 5
  },
  nine_box_distribution: {
    "High Potential": 50,
    "Promotable": 80,
    "Solid Contributor": 90,
    "Sleeping Tiger": 15,
    "Underperformer": 10
  },
  risk_counts: {
    low_successor: 5,
    flight_risk: 12,
    tr_pending: 8
  }
};
