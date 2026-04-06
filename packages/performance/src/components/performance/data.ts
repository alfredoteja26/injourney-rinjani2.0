export interface KPIItem {
  id: string;
  title: string;
  type: 'BERSAMA' | 'UNIT';
  weight: number;
  target: string;
  actual: string;
  score: number;
  status: 'Draft' | 'Set' | 'Submitted' | 'Approved' | 'Locked';
  unit: string;
  polarity: 'HIGHER_IS_BETTER' | 'LOWER_IS_BETTER';
}

export interface Employee {
  id: string;
  nik: string;
  name: string;
  position: string;
  unit: string;
  company: string;
  band: string;
  avatar_url?: string;
}

export const currentUser: Employee = {
  id: "EMP-260102",
  nik: "260102",
  name: "Binavia Wardhani",
  position: "Group Head HC Planning & Analytics",
  unit: "Direktorat Human Capital",
  company: "PT InJourney Airports (Holding)",
  band: "Madya"
};

export const kpiBersama: KPIItem[] = [
  {
    id: "KPI-B-2026-001",
    title: "EBITDA Consolidated InJourney Group",
    type: "BERSAMA",
    weight: 15,
    target: "15.5 T",
    actual: "3.8 T",
    score: 3.8,
    status: "Set",
    unit: "IDR",
    polarity: "HIGHER_IS_BETTER"
  },
  {
    id: "KPI-B-2026-002",
    title: "Employee Engagement Score",
    type: "BERSAMA",
    weight: 15,
    target: "4.2",
    actual: "4.1",
    score: 4.1,
    status: "Set",
    unit: "Scale 1-5",
    polarity: "HIGHER_IS_BETTER"
  },
  {
    id: "KPI-B-2026-003",
    title: "Human Capital Maturity Index",
    type: "BERSAMA",
    weight: 10,
    target: "Level 4",
    actual: "Level 3.5",
    score: 3.5,
    status: "Set",
    unit: "Level 1-5",
    polarity: "HIGHER_IS_BETTER"
  }
];

export const kpiUnit: KPIItem[] = [
  {
    id: "KPI-U-2026-001",
    title: "HC Analytics Dashboard Delivery",
    type: "UNIT",
    weight: 15,
    target: "100%",
    actual: "85%",
    score: 4.2,
    status: "Set",
    unit: "%",
    polarity: "HIGHER_IS_BETTER"
  },
  {
    id: "KPI-U-2026-002",
    title: "Workforce Planning Accuracy",
    type: "UNIT",
    weight: 15,
    target: "≥90%",
    actual: "92%",
    score: 4.0,
    status: "Set",
    unit: "%",
    polarity: "HIGHER_IS_BETTER"
  },
  {
    id: "KPI-U-2026-003",
    title: "HC Budget Variance",
    type: "UNIT",
    weight: 10,
    target: "≤5%",
    actual: "3.2%",
    score: 4.5,
    status: "Set",
    unit: "%",
    polarity: "LOWER_IS_BETTER"
  },
  {
    id: "KPI-U-2026-004",
    title: "Strategic HC Initiative Completion",
    type: "UNIT",
    weight: 10,
    target: "4",
    actual: "1",
    score: 4.0,
    status: "Set",
    unit: "Initiatives",
    polarity: "HIGHER_IS_BETTER"
  },
  {
    id: "KPI-U-2026-005",
    title: "HR Process Automation Rate",
    type: "UNIT",
    weight: 10,
    target: "60%",
    actual: "45%",
    score: 3.2,
    status: "Draft",
    unit: "%",
    polarity: "HIGHER_IS_BETTER"
  }
];

export const performanceStats = {
  currentPI: 3.79,
  currentRating: "Excellent",
  totalWeight: 100,
  kpiBersamaWeight: 45,
  kpiUnitWeight: 55,
  year: 2026
};

export const checkInHistory = [
  {
    id: "CI-1",
    period: "Q1",
    date: "15 Apr 2026",
    status: "Completed",
    piScore: 3.79
  },
  {
    id: "CI-2",
    period: "Q2",
    date: "10 Jul 2026",
    status: "Upcoming",
    piScore: null
  },
  {
    id: "CI-3",
    period: "Q3",
    date: "10 Oct 2026",
    status: "Upcoming",
    piScore: null
  }
];

export interface TeamMember {
  nik: string;
  name: string;
  position: string;
  band: string;
  status: 'Active' | 'Inactive';
  goalStatus: 'Draft' | 'Submitted' | 'Approved';
  checkInStatus: 'Completed' | 'Upcoming' | 'Overdue';
  piScore: number;
  rating: string;
  trend: 'up' | 'stable' | 'down';
  trendValue: string;
  avatar_url?: string;
  kpis?: KPIItem[];
}

export const teamMembers: TeamMember[] = [
  {
    nik: "260102",
    name: "Binavia Wardhani",
    position: "GH HC Planning & Analytics",
    band: "Madya",
    status: "Active",
    goalStatus: "Approved",
    checkInStatus: "Completed",
    piScore: 3.79,
    rating: "Excellent",
    trend: "stable",
    trendValue: "+0.02"
  },
  {
    nik: "260103",
    name: "Fajar Nugraha",
    position: "GH HC Policy & Governance",
    band: "Madya",
    status: "Active",
    goalStatus: "Approved",
    checkInStatus: "Completed",
    piScore: 3.65,
    rating: "Excellent",
    trend: "up",
    trendValue: "+0.12"
  },
  {
    nik: "260104",
    name: "Sinta Maharani",
    position: "GH Org Development",
    band: "Madya",
    status: "Active",
    goalStatus: "Approved",
    checkInStatus: "Completed",
    piScore: 3.92,
    rating: "Excellent",
    trend: "up",
    trendValue: "+0.15"
  }
];

export const teamMetrics = {
  avgPiScore: 3.79,
  avgRating: "Excellent",
  checkInCompletion: "3/3",
  pendingApprovals: 0
};

export const checkInSummaries = [
  {
    nik: "260102",
    name: "Binavia Wardhani",
    pi: 3.79,
    date: "15 Apr 2026",
    highlight: "HC Strategy document completed ahead of time",
    challenge: "HC Analytics adoption below target",
    action: "Additional training for 2 remaining units"
  },
  {
    nik: "260103",
    name: "Fajar Nugraha",
    pi: 3.65,
    date: "18 Apr 2026",
    highlight: "Streamlined HC operations processes",
    challenge: "Recruitment timeline delays",
    action: "Implement fast-track recruitment"
  },
  {
    nik: "260104",
    name: "Sinta Maharani",
    pi: 3.92,
    date: "20 Apr 2026",
    highlight: "HRIS uptime exceeded target at 99.8%",
    challenge: "Integration with legacy systems",
    action: "Prioritize API development"
  }
];

// KPI Library Data
export interface KPILibraryItem {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'BERSAMA' | 'UNIT';
  unit: string;
  polarity: 'Higher' | 'Lower';
  period: 'Monthly' | 'Quarterly' | 'Semester' | 'Annual';
  formula: string;
  evidence: string;
  recommendedTarget: string;
  tags: string[];
  usageCount: number;
  status: 'Published' | 'In Review' | 'Draft' | 'Rejected';
  isPopular?: boolean;
}

export const kpiLibrary: KPILibraryItem[] = [
  {
    id: "LIB-B-001",
    code: "LIB-B-001",
    title: "EBITDA Group",
    description: "Earnings Before Interest, Taxes, Depreciation, and Amortization for the Group.",
    type: "BERSAMA",
    unit: "IDR (Trillion)",
    polarity: "Higher",
    period: "Annual",
    formula: "Revenue - Expenses (excluding interest, tax, dep, amort)",
    evidence: "Financial Statements",
    recommendedTarget: "2.5T",
    tags: ["financial", "corporate"],
    usageCount: 2450,
    status: "Published",
    isPopular: true
  },
  {
    id: "LIB-U-HC-003",
    code: "LIB-U-HC-003",
    title: "Talent Pipeline Ratio",
    description: "Rasio antara jumlah kandidat suksesor yang siap dengan jumlah posisi kritikal (Key Strategic Position).",
    type: "UNIT",
    unit: "Ratio",
    polarity: "Higher",
    period: "Semester",
    formula: "Jumlah suksesor siap / Jumlah posisi KSP",
    evidence: "Succession Planning Report",
    recommendedTarget: "1:3",
    tags: ["talent", "succession", "HR"],
    usageCount: 89,
    status: "Published",
    isPopular: true
  },
  {
    id: "LIB-U-HC-001",
    code: "LIB-U-HC-001",
    title: "Employee Turnover Rate",
    description: "Persentase karyawan yang keluar per tahun.",
    type: "UNIT",
    unit: "%",
    polarity: "Lower",
    period: "Annual",
    formula: "(Jumlah karyawan keluar / Total karyawan) * 100",
    evidence: "HR Report",
    recommendedTarget: "≤8%",
    tags: ["retention", "HR"],
    usageCount: 245,
    status: "Published",
    isPopular: true
  },
  {
    id: "LIB-U-HC-002",
    code: "LIB-U-HC-002",
    title: "Training Completion Rate",
    description: "Persentase penyelesaian training wajib.",
    type: "UNIT",
    unit: "%",
    polarity: "Higher",
    period: "Semester",
    formula: "(Completed Training / Assigned Training) * 100",
    evidence: "LMS Report",
    recommendedTarget: "≥95%",
    tags: ["learning", "development"],
    usageCount: 312,
    status: "Published",
    isPopular: true
  },
  {
    id: "LIB-U-HC-005",
    code: "LIB-U-HC-005",
    title: "HC Strategy Document Completion",
    description: "Persentase penyelesaian dokumen strategi HC yang selesai.",
    type: "UNIT",
    unit: "%",
    polarity: "Higher",
    period: "Semester",
    formula: "(Dokumen Selesai / Target Dokumen) * 100",
    evidence: "Document Sign-off",
    recommendedTarget: "100%",
    tags: ["strategy", "planning"],
    usageCount: 45,
    status: "Published",
    isPopular: false
  }
];

// KPI Tree Data
export interface KPITreeNode {
  id: string;
  title: string;
  owner: string;
  ownerRole: string;
  score: number;
  status: 'on_track' | 'at_risk' | 'behind';
  weight?: number;
  target?: string;
  children?: KPITreeNode[];
  isExpanded?: boolean;
  isCurrentUser?: boolean;
}

export const kpiTreeData: KPITreeNode = {
  id: "ROOT-001",
  title: "EBITDA Group",
  owner: "Corporate",
  ownerRole: "Shared Goal",
  score: 3.84,
  status: "on_track",
  target: "2.5T",
  isExpanded: true,
  children: [
    {
      id: "DIR-001",
      title: "Human Capital Cost Efficiency",
      owner: "Herdy Harman",
      ownerRole: "Director HR & Digital",
      score: 3.75,
      status: "on_track",
      target: "5% Saving",
      isExpanded: true,
      children: [
        {
          id: "VP-001",
          title: "HC Strategy Excellence",
          owner: "Dimas Sayyid",
          ownerRole: "VP HC Strategy",
          score: 3.82,
          status: "on_track",
          weight: 25,
          target: "95%",
          isCurrentUser: true,
          isExpanded: true,
          children: [
            {
              id: "GH-001",
              title: "HC Strategy Doc Completion",
              owner: "Binavia Wardhani",
              ownerRole: "GH HC Strategy",
              score: 4.20,
              status: "on_track",
              weight: 15
            },
            {
              id: "GH-002",
              title: "Talent Pipeline Ratio",
              owner: "Binavia Wardhani",
              ownerRole: "GH HC Strategy",
              score: 4.00,
              status: "on_track",
              weight: 15
            },
            {
              id: "GH-003",
              title: "Organization Design Accuracy",
              owner: "Binavia Wardhani",
              ownerRole: "GH HC Strategy",
              score: 3.60,
              status: "on_track",
              weight: 10
            },
            {
              id: "GH-004",
              title: "Workforce Planning Accuracy",
              owner: "Binavia Wardhani",
              ownerRole: "GH HC Strategy",
              score: 3.40,
              status: "at_risk",
              weight: 10
            },
            {
              id: "GH-005",
              title: "HC Analytics Dashboard Adoption",
              owner: "Binavia Wardhani",
              ownerRole: "GH HC Strategy",
              score: 3.20,
              status: "at_risk",
              weight: 5
            }
          ]
        },
        {
          id: "VP-002",
          title: "HC Operations Excellence",
          owner: "Fajar Nugraha",
          ownerRole: "GH HC Operations",
          score: 3.65,
          status: "on_track",
          weight: 25,
          children: [
            { id: "GH-OPS-1", title: "Time to Fill Position", owner: "Fajar Nugraha", ownerRole: "GH HC Operations", score: 3.5, status: "on_track" },
            { id: "GH-OPS-2", title: "Employee Turnover Rate", owner: "Fajar Nugraha", ownerRole: "GH HC Operations", score: 3.8, status: "on_track" }
          ]
        },
        {
          id: "VP-003",
          title: "HC Digital Transformation",
          owner: "Sinta Maharani",
          ownerRole: "GH HC Digital",
          score: 3.92,
          status: "on_track",
          weight: 25,
          children: [
            { id: "GH-DIG-1", title: "HRIS System Uptime", owner: "Sinta Maharani", ownerRole: "GH HC Digital", score: 4.2, status: "on_track" },
            { id: "GH-DIG-2", title: "Digital Adoption Rate", owner: "Sinta Maharani", ownerRole: "GH HC Digital", score: 3.8, status: "on_track" }
          ]
        }
      ]
    }
  ]
};

// KPI Headquarter Data
export const hqMetrics = {
  totalEmployees: 6400,
  goalSettingCompletion: "92.9%",
  avgPIScore: 3.45,
  checkInCompletion: "79.4%"
};

export const assessmentCycle = [
  { phase: "Goal Setting", period: "Jan 1 - Feb 28", completion: 93, status: "Complete", locked: true },
  { phase: "Check-In 1", period: "Apr 1 - Apr 30", completion: 79, status: "Complete", locked: true },
  { phase: "Check-In 2", period: "Jul 1 - Jul 31", completion: 0, status: "Upcoming", locked: false },
  { phase: "Check-In 3", period: "Oct 1 - Oct 31", completion: 0, status: "Upcoming", locked: false },
  { phase: "Year-End Review", period: "Nov 15 - Dec 31", completion: 0, status: "Upcoming", locked: false }
];

export const companyMetrics = [
  { name: "PT Aviasi Pariwisata Indonesia (Holding)", gs: 98.0, ci1: 95.2, avgPI: 3.79, status: "on_track" },
  { name: "PT Angkasa Pura I", gs: 95.0, ci1: 80.0, avgPI: 3.52, status: "at_risk" },
  { name: "PT Angkasa Pura II", gs: 92.0, ci1: 78.0, avgPI: 3.48, status: "at_risk" },
  { name: "PT Sarinah", gs: 92.8, ci1: 85.0, avgPI: 3.48, status: "on_track" },
  { name: "PT Hotel Indonesia Natour", gs: 90.0, ci1: 82.0, avgPI: 3.42, status: "at_risk" },
  { name: "PT TWC Borobudur", gs: 88.0, ci1: 75.0, avgPI: 3.35, status: "behind" }
];

export const weightConfig = [
  { band: "Utama", grade: "19-21", type: "Struktural", bersama: 50, unit: 50 },
  { band: "Madya", grade: "16-18", type: "Struktural", bersama: 45, unit: 55 },
  { band: "Muda", grade: "13-15", type: "Struktural", bersama: 40, unit: 60 },
  { band: "Pratama A", grade: "10-12", type: "Struktural", bersama: 35, unit: 65 },
  { band: "Pratama B", grade: "7-9", type: "Struktural", bersama: 30, unit: 70 },
  { band: "General", grade: "1-6", type: "Non-Struktural", bersama: 0, unit: 100 }
];
