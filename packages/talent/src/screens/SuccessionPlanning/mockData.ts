import { Position, SuccessionPlan, Candidate } from "./types";

export const mockPositions: Position[] = [
  {
    id: "pos-dir-sdm",
    title: "Director SDM",
    division: "Human Capital Division",
    grade: "Band V",
    type: "ksp",
    vacancyStatus: "vacant",
    candidateCount: 2,
    minCandidates: 3,
    tcTier: "tier_1",
    hasSuccessionPlan: true
  },
  {
    id: "pos-vp-finance",
    title: "VP Finance",
    division: "Finance Division",
    grade: "Band IV",
    type: "ksp",
    incumbent: "John Doe",
    retirementDate: "2026-06-01",
    vacancyStatus: "vacant_soon",
    candidateCount: 4, // Updated to match candidates array
    minCandidates: 3,
    tcTier: "tier_1",
    hasSuccessionPlan: true
  },
  {
    id: "pos-head-legal",
    title: "Head of Legal",
    division: "Legal Division",
    grade: "Band III",
    type: "struktural",
    vacancyStatus: "to_review",
    reviewDueDate: "2026-02-15",
    candidateCount: 3,
    minCandidates: 3,
    tcTier: "tier_2",
    hasSuccessionPlan: true
  },
  {
    id: "pos-gm-ops",
    title: "GM Operations",
    division: "Operations Division",
    grade: "Band III",
    type: "struktural",
    vacancyStatus: "filled",
    successorName: "Ahmad Susanto",
    approvedDate: "2025-12-15",
    candidateCount: 4,
    minCandidates: 3,
    tcTier: "tier_2",
    hasSuccessionPlan: true
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    employeeId: "EMP001",
    name: "Taufik Hidayat",
    avatar: "TH",
    currentPosition: "VP Human Capital",
    currentGrade: "Band III",
    eqsScore: 98.7,
    isTopTalent: true,
    riskProfile: "low",
    readiness: "ready_now",
    ranking: "primary",
    matchScore: 95,
    gapCount: 2,
    competencies: {
      "Global Business Savvy": 3,
      "Leading Change": 3,
      "Driving Innovation": 2,
      "Building Strategic Partnership": 3,
      "Strategic Orientation": 3,
      "Customer Focus": 3,
      "Driving Execution": 2,
      "Digital Leadership": 1,
      "Managing Diversity": 1,
      "Developing Org Capabilities": 2
    },
    performanceHistory: [
      { year: 2024, score: 95, rating: "Exceptional" },
      { year: 2023, score: 92, rating: "Exceeds" },
      { year: 2022, score: 88, rating: "Exceeds" }
    ],
    careerHistory: [
      { role: "VP Human Capital", company: "InJourney", duration: "2022 - Present" },
      { role: "GM HR", company: "PT Sarinah", duration: "2019 - 2022" },
      { role: "Manager HR", company: "PT API", duration: "2015 - 2019" }
    ],
    education: [
      { degree: "MBA", institution: "Universitas Indonesia", year: "2014" },
      { degree: "S1 Psikologi", institution: "UGM", year: "2008" }
    ],
    aspirations: {
      individual: "Director SDM",
      supervisor: "Ready for promotion",
      unit: "Recommended"
    },
    gaps: [
      { competency: "Digital Leadership", severity: "minor", gap: -1 },
      { competency: "Managing Diversity", severity: "minor", gap: -1 }
    ]
  },
  {
    id: "cand-2",
    employeeId: "EMP002",
    name: "Siti Aminah",
    avatar: "SA",
    currentPosition: "Manager HR Operations",
    currentGrade: "Band III",
    eqsScore: 91.2,
    isTopTalent: false,
    riskProfile: "medium",
    readiness: "ready_short_term",
    ranking: "secondary",
    matchScore: 88,
    gapCount: 3,
    competencies: {
      "Global Business Savvy": 2,
      "Leading Change": 2,
      "Driving Innovation": 2,
      "Building Strategic Partnership": 2,
      "Strategic Orientation": 1,
      "Customer Focus": 2,
      "Driving Execution": 2,
      "Digital Leadership": 1,
      "Managing Diversity": 1,
      "Developing Org Capabilities": 2
    },
    performanceHistory: [
      { year: 2024, score: 88, rating: "Exceeds" },
      { year: 2023, score: 88, rating: "Exceeds" },
      { year: 2022, score: 82, rating: "Meets" }
    ],
    careerHistory: [
      { role: "Manager HR Operations", company: "InJourney", duration: "2021 - Present" },
      { role: "Supervisor HR", company: "InJourney", duration: "2018 - 2021" }
    ],
    education: [
      { degree: "S2 Manajemen SDM", institution: "Unpad", year: "2017" },
      { degree: "S1 Manajemen", institution: "Unpad", year: "2012" }
    ],
    aspirations: {
      individual: "VP Human Capital",
      supervisor: "Potential for growth",
      unit: "Recommended with development"
    },
    gaps: [
      { competency: "Strategic Orientation", severity: "critical", gap: -1 },
      { competency: "Digital Leadership", severity: "minor", gap: -1 },
      { competency: "Managing Diversity", severity: "minor", gap: -1 }
    ]
  },
  {
    id: "cand-3",
    employeeId: "EMP003",
    name: "Budi Santoso",
    avatar: "BS",
    currentPosition: "Senior Specialist HC",
    currentGrade: "Band II",
    eqsScore: 85.4,
    isTopTalent: false,
    riskProfile: "high",
    readiness: "ready_long_term",
    ranking: "tertiary",
    matchScore: 78,
    gapCount: 6,
    competencies: {
      "Global Business Savvy": 1,
      "Leading Change": 1,
      "Driving Innovation": 2,
      "Building Strategic Partnership": 1,
      "Strategic Orientation": 1,
      "Customer Focus": 2,
      "Driving Execution": 1,
      "Digital Leadership": 1,
      "Managing Diversity": 2,
      "Developing Org Capabilities": 2
    },
    performanceHistory: [
      { year: 2024, score: 82, rating: "Meets" },
      { year: 2023, score: 85, rating: "Meets" },
      { year: 2022, score: 80, rating: "Meets" }
    ],
    careerHistory: [
      { role: "Senior Specialist HC", company: "InJourney", duration: "2022 - Present" },
      { role: "Specialist HC", company: "InJourney", duration: "2019 - 2021" }
    ],
    education: [
      { degree: "S1 Psikologi", institution: "Unair", year: "2015" }
    ],
    aspirations: {
      individual: "Manager HR",
      supervisor: "Needs more exposure",
      unit: "Keep in current role"
    },
    gaps: [
      { competency: "Leading Change", severity: "critical", gap: -1 },
      { competency: "Strategic Orientation", severity: "critical", gap: -1 },
      { competency: "Global Business Savvy", severity: "minor", gap: -1 },
      { competency: "Building Strategic Partnership", severity: "minor", gap: -1 },
      { competency: "Driving Execution", severity: "minor", gap: -1 },
      { competency: "Digital Leadership", severity: "minor", gap: -1 }
    ]
  },
  {
    id: "cand-4",
    employeeId: "EMP004",
    name: "Citra Dewi",
    avatar: "CD",
    currentPosition: "Manager Finance",
    currentGrade: "Band III",
    eqsScore: 82.1,
    isTopTalent: false,
    riskProfile: "medium",
    readiness: "ready_long_term",
    ranking: null,
    matchScore: 75,
    gapCount: 4,
    competencies: {
      "Global Business Savvy": 1,
      "Leading Change": 1,
      "Driving Innovation": 1,
      "Building Strategic Partnership": 2,
      "Strategic Orientation": 1,
      "Customer Focus": 2,
      "Driving Execution": 2,
      "Digital Leadership": 1,
      "Managing Diversity": 2,
      "Developing Org Capabilities": 1
    },
    performanceHistory: [
      { year: 2024, score: 80, rating: "Meets" },
      { year: 2023, score: 82, rating: "Meets" },
      { year: 2022, score: 78, rating: "Meets" }
    ],
    careerHistory: [
       { role: "Manager Finance", company: "InJourney", duration: "2020 - Present" },
       { role: "Asst Manager Finance", company: "InJourney", duration: "2017 - 2020" }
    ],
    education: [
      { degree: "S1 Akuntansi", institution: "UI", year: "2016" }
    ],
    aspirations: {
       individual: "VP Finance",
       supervisor: "Needs development",
       unit: "Monitor"
    },
    gaps: [
       { competency: "Global Business Savvy", severity: "critical", gap: -1 },
       { competency: "Leading Change", severity: "critical", gap: -1 }
    ]
  }
];

export const mockRequirementCompetencies = {
  "Global Business Savvy": 2,
  "Leading Change": 2,
  "Driving Innovation": 2,
  "Building Strategic Partnership": 2,
  "Strategic Orientation": 2,
  "Customer Focus": 2,
  "Driving Execution": 2,
  "Digital Leadership": 2,
  "Managing Diversity": 2,
  "Developing Org Capabilities": 2
};
