import type { Position, CandidateData } from "../types/talent";
import { 
  calculatePerformanceScore,
  calculateCompetencyScore,
  calculateDisciplinaryScore,
  calculateExperienceScore,
  calculateTrainingScore,
  calculateAspirationScore,
  calculateTotalEQS,
  type EQSComponents
} from "../utils/eqsCalculation";

/**
 * Mock Positions for Succession Planning
 */
export const mockPositions: Position[] = [
  {
    id: "pos-001",
    title: "VP Human Capital Business Partner",
    department: "Human Resources",
    company: "PT Angkasa Pura Indonesia",
    level: "Director",
    gradeGroup: "BoD-1",
    jobFamily: "Human Resources",
    isKSP: true,
    status: "vacant",
    risk: "critical",
    vacancyDate: "2025-10-01",
    successorCount: 0,
    candidateCount: 5,
    lastReviewDate: "2025-09-15"
  },
  {
    id: "pos-002",
    title: "VP Finance",
    department: "Finance",
    company: "PT Angkasa Pura Indonesia",
    level: "Vice President",
    gradeGroup: "BoD-2",
    jobFamily: "Finance & Accounting",
    isKSP: true,
    status: "vacant-soon",
    risk: "high",
    incumbentId: "emp-999",
    incumbentName: "Bambang Hartono",
    retirementDate: "2026-03-01",
    tenureYears: 4.5,
    successorCount: 1,
    candidateCount: 4,
    lastReviewDate: "2025-11-01"
  },
  {
    id: "pos-003",
    title: "Senior Manager HR Operations",
    department: "Human Resources",
    company: "PT Angkasa Pura Indonesia",
    level: "Senior Manager",
    gradeGroup: "BoD-3",
    jobFamily: "Human Resources",
    isKSP: false,
    status: "to-review",
    risk: "medium",
    incumbentId: "emp-888",
    incumbentName: "Sri Mulyani",
    tenureYears: 2.8,
    successorCount: 2,
    candidateCount: 7,
    lastReviewDate: "2024-12-10"
  },
  {
    id: "pos-004",
    title: "Manager Talent Development",
    department: "Human Resources",
    company: "PT Integrasi Aviasi Solusi",
    level: "Manager",
    gradeGroup: "BoD-4",
    jobFamily: "Human Resources",
    isKSP: false,
    status: "filled",
    risk: "low",
    incumbentId: "emp-777",
    incumbentName: "Andi Prasetyo",
    tenureYears: 1.5,
    successorCount: 3,
    candidateCount: 6,
    lastReviewDate: "2025-06-20"
  }
];

/**
 * Helper function to calculate EQS for a candidate
 */
function calculateCandidateEQS(candidate: Omit<CandidateData, "eqs" | "rank">): CandidateData {
  const components: EQSComponents = {
    performance: calculatePerformanceScore(
      candidate.performanceHistory.map(p => p.rating)
    ),
    competency: calculateCompetencyScore(candidate.competency.jobFitScore),
    disciplinary: calculateDisciplinaryScore(candidate.disciplinaryRecord.status),
    experience: calculateExperienceScore(candidate.experience.yearsInJobFamily),
    training: calculateTrainingScore(
      candidate.training.hasRelevantTraining,
      candidate.training.hasRelevantCertification
    ),
    aspiration: calculateAspirationScore(candidate.aspirations.sources)
  };

  const eqs = calculateTotalEQS(components);

  return {
    ...candidate,
    eqs
  };
}

/**
 * Mock Candidates for Position: VP Human Capital Business Partner (pos-001)
 */
const rawCandidatesPos001: Omit<CandidateData, "eqs" | "rank">[] = [
  {
    id: "cand-001",
    employeeId: "EMP12345",
    name: "Budi Santoso",
    email: "budi.santoso@ap1.co.id",
    currentPosition: "Senior Manager HR Operations",
    currentDepartment: "Human Resources",
    currentCompany: "PT Angkasa Pura Indonesia",
    currentGrade: "BoD-3",
    currentJobFamily: "Human Resources",
    targetPositionId: "pos-001",
    
    performanceHistory: [
      { year: 2024, rating: "Outstanding" },
      { year: 2023, rating: "Outstanding" },
      { year: 2022, rating: "Above Target" }
    ],
    
    competency: {
      jobFitScore: 92,
      assessmentDate: "2024-08-15",
      targetPosition: "VP Human Capital Business Partner"
    },
    
    disciplinaryRecord: {
      status: "Clean"
    },
    
    experience: {
      yearsInJobFamily: 8,
      yearsInCompany: 8,
      totalYearsExperience: 12,
      relevantPositions: [
        {
          title: "Senior Manager HR Operations",
          company: "PT Angkasa Pura Indonesia",
          startDate: "2022-01-01",
          endDate: "Present",
          jobFamily: "Human Resources"
        },
        {
          title: "Manager Recruitment",
          company: "PT Angkasa Pura Indonesia",
          startDate: "2019-01-01",
          endDate: "2021-12-31",
          jobFamily: "Human Resources"
        },
        {
          title: "Senior HR Specialist",
          company: "PT Angkasa Pura Indonesia",
          startDate: "2017-01-01",
          endDate: "2018-12-31",
          jobFamily: "Human Resources"
        }
      ]
    },
    
    training: {
      hasRelevantTraining: true,
      hasRelevantCertification: true,
      trainings: [
        {
          name: "Leadership Development Program for Directors",
          type: "Penjenjangan",
          date: "2024-03-15",
          status: "Valid"
        },
        {
          name: "Strategic HR Management",
          type: "Technical",
          date: "2023-09-20",
          status: "Valid"
        }
      ],
      certifications: [
        {
          name: "SHRM-SCP (Senior Certified Professional)",
          issuer: "SHRM",
          issueDate: "2024-01-10",
          expiryDate: "2027-01-10",
          isRelevant: true
        },
        {
          name: "Certified Talent Management Practitioner",
          issuer: "ATD",
          issueDate: "2023-06-15",
          isRelevant: true
        }
      ]
    },
    
    aspirations: {
      sources: ["Supervisor", "Job Holder", "Individual"],
      details: [
        {
          type: "Supervisor",
          nominatedBy: "VP Human Resources",
          date: "2024-11-01"
        },
        {
          type: "Job Holder",
          nominatedBy: "Current VP Human Capital Business Partner",
          date: "2024-10-20"
        },
        {
          type: "Individual",
          date: "2024-09-15"
        }
      ]
    },
    
    awards: {
      highestLevel: "National",
      awardsList: [
        {
          name: "Best HR Leader Award",
          level: "National",
          year: 2024,
          description: "Recognition from HR Excellence Indonesia"
        },
        {
          name: "Innovation Award",
          level: "Company",
          year: 2023,
          description: "For implementing digital HRIS transformation"
        }
      ]
    },
    
    socialContribution: {
      hasContribution: true,
      activities: [
        {
          name: "Volunteer HR Mentor",
          type: "Mentoring",
          date: "2024-06-01",
          description: "Mentoring young professionals in HR field"
        },
        {
          name: "Guest Lecturer",
          type: "Teaching",
          date: "2024-03-15",
          description: "University of Indonesia - HR Management course"
        }
      ]
    },
    
    education: {
      highest: "S2 (Master)",
      institution: "Universitas Indonesia",
      graduationYear: 2015,
      major: "Master of Management - Human Resources"
    },
    
    readiness: "Ready Now",
    keyStrengths: [
      "Strategic HR Planning",
      "Team Leadership & Development",
      "Change Management",
      "Stakeholder Management"
    ],
    developmentAreas: [
      "Financial Acumen for HR",
      "Board-level Presentation Skills"
    ],
    hasDevelopmentPlan: true,
    developmentPlanLastUpdated: "2024-10-01",
    
    // NEW: Extended Data for 5 Tabs
    careerHistory: [
      {
        id: "ch-001",
        type: "Definitif",
        positionTitle: "Senior Manager HR Operations",
        department: "Human Resources",
        company: "PT Angkasa Pura Indonesia",
        location: "Jakarta",
        grade: "BoD-3",
        startDate: "2022-01-01",
        endDate: "Present",
        durationMonths: 36,
        supervisor: "VP Human Resources",
        keyAchievements: [
          "Implemented HRIS digital transformation reducing processing time by 60%",
          "Led talent acquisition strategy resulting in 95% hiring success rate",
          "Developed succession planning framework for critical positions"
        ]
      },
      {
        id: "ch-002",
        type: "Definitif",
        positionTitle: "Manager Recruitment",
        department: "Human Resources",
        company: "PT Angkasa Pura Indonesia",
        location: "Jakarta",
        grade: "BoD-4",
        startDate: "2019-01-01",
        endDate: "2021-12-31",
        durationMonths: 36,
        supervisor: "Senior Manager HR Operations",
        keyAchievements: [
          "Reduced time-to-hire from 90 to 45 days",
          "Established talent pipeline for critical roles"
        ]
      },
      {
        id: "ch-003",
        type: "Secondary Assignment",
        positionTitle: "Project Lead - HR Digital Transformation",
        department: "Corporate Transformation",
        company: "PT Angkasa Pura Indonesia",
        location: "Jakarta",
        grade: "BoD-4",
        startDate: "2020-06-01",
        endDate: "2021-05-31",
        durationMonths: 12,
        supervisor: "VP Corporate Transformation",
        keyAchievements: [
          "Successfully migrated legacy HRIS to cloud-based solution",
          "Trained 500+ employees on new system"
        ]
      }
    ],
    
    educationRecords: [
      {
        id: "edu-001",
        level: "S2 (Master)",
        institution: "Universitas Indonesia",
        major: "Master of Management - Human Resources",
        graduationYear: 2015,
        gpa: 3.85
      },
      {
        id: "edu-002",
        level: "S1 (Bachelor)",
        institution: "Universitas Gadjah Mada",
        major: "Psychology",
        graduationYear: 2012,
        gpa: 3.72
      }
    ],
    
    trainingRecords: [
      {
        id: "tr-001",
        name: "Leadership Development Program for Directors",
        provider: "InJourney",
        type: "Penjenjangan",
        duration: 120,
        startDate: "2024-03-15",
        endDate: "2024-06-15",
        status: "Completed",
        score: 92
      },
      {
        id: "tr-002",
        name: "Strategic HR Management",
        provider: "InJourney",
        type: "Technical",
        duration: 40,
        startDate: "2023-09-20",
        endDate: "2023-09-24",
        status: "Completed",
        score: 88
      },
      {
        id: "tr-003",
        name: "Advanced People Analytics",
        provider: "External",
        type: "Technical",
        duration: 24,
        startDate: "2023-05-10",
        endDate: "2023-05-13",
        status: "Completed",
        score: 90
      }
    ],
    
    certificationRecords: [
      {
        id: "cert-001",
        name: "SHRM-SCP (Senior Certified Professional)",
        issuer: "SHRM",
        issueDate: "2024-01-10",
        expiryDate: "2027-01-10",
        credentialId: "SHRM-24-12345",
        isRelevant: true,
        status: "Valid"
      },
      {
        id: "cert-002",
        name: "Certified Talent Management Practitioner",
        issuer: "ATD",
        issueDate: "2023-06-15",
        credentialId: "ATD-23-67890",
        isRelevant: true,
        status: "Valid"
      }
    ],
    
    awardRecords: [
      {
        id: "aw-001",
        name: "Best HR Leader Award",
        level: "National",
        category: "External",
        year: 2024,
        issuer: "HR Excellence Indonesia",
        description: "Recognition for outstanding contribution in HR transformation"
      },
      {
        id: "aw-002",
        name: "Innovation Award",
        level: "Company",
        category: "Internal",
        year: 2023,
        issuer: "PT Angkasa Pura Indonesia",
        description: "For implementing digital HRIS transformation"
      },
      {
        id: "aw-003",
        name: "Employee of the Year",
        level: "Company",
        category: "Internal",
        year: 2022,
        issuer: "PT Angkasa Pura Indonesia"
      }
    ],
    
    careerAspirationInJourney: [
      {
        id: "ca-001",
        targetPosition: "VP Human Capital Business Partner",
        targetDepartment: "Human Resources",
        targetCompany: "PT Angkasa Pura Indonesia",
        targetGrade: "BoD-1",
        timeframe: "1-2 years",
        status: "Active",
        submittedDate: "2024-01-15",
        lastUpdated: "2024-10-01",
        developmentPlan: [
          "Complete Leadership Development Program for Directors",
          "Gain exposure in strategic workforce planning",
          "Develop board-level presentation skills"
        ],
        mentor: "VP Human Resources"
      }
    ],
    
    careerAspirationBUMN: {
      id: "cab-001",
      targetPosition: "Direktur SDM",
      targetMinistry: "Kementerian BUMN",
      targetBUMN: "PT Pelabuhan Indonesia",
      readiness: "1-2 years",
      status: "Under Review",
      submittedDate: "2024-09-01",
      reviewer: "Komite Talent BUMN",
      notes: "Strong candidate with comprehensive HR experience"
    },
    
    personalValuesVision: {
      coreValues: [
        "Integrity",
        "Excellence",
        "Collaboration",
        "Innovation"
      ],
      careerVision: "To become a strategic HR leader who transforms people management practices and creates sustainable organizational capabilities",
      personalMission: "Empowering people to reach their full potential through effective HR practices and leadership development",
      workStyle: [
        "Strategic thinker",
        "Collaborative leader",
        "Data-driven decision maker",
        "Change catalyst"
      ],
      motivators: [
        "Making meaningful impact on people's careers",
        "Driving organizational transformation",
        "Continuous learning and development",
        "Building high-performing teams"
      ]
    },
    
    personalInfo: {
      fullName: "Budi Santoso, S.Psi., M.M.",
      nik: "3174012345678901",
      nip: "199001152012031001",
      dateOfBirth: "1990-01-15",
      placeOfBirth: "Jakarta",
      gender: "Male",
      religion: "Islam",
      maritalStatus: "Married",
      email: "budi.santoso@ap1.co.id",
      personalEmail: "budi.santoso@gmail.com",
      phoneNumber: "+62 812-3456-7890",
      emergencyContact: {
        name: "Dewi Santoso",
        relationship: "Spouse",
        phone: "+62 813-9876-5432"
      },
      currentAddress: "Jl. Melati No. 123, Kebayoran Baru, Jakarta Selatan 12180",
      permanentAddress: "Jl. Melati No. 123, Kebayoran Baru, Jakarta Selatan 12180",
      familyMembers: [
        {
          name: "Dewi Lestari",
          relationship: "Spouse",
          dateOfBirth: "1992-05-20",
          occupation: "Teacher"
        },
        {
          name: "Ahmad Budi Santoso",
          relationship: "Child",
          dateOfBirth: "2018-08-10"
        },
        {
          name: "Siti Budi Santoso",
          relationship: "Child",
          dateOfBirth: "2020-12-25"
        }
      ],
      socialMedia: {
        linkedin: "linkedin.com/in/budisantoso",
        twitter: "@budisantoso"
      },
      bloodType: "O",
      nationality: "Indonesian"
    }
  },
  
  {
    id: "cand-002",
    employeeId: "EMP23456",
    name: "Siti Rahayu",
    email: "siti.rahayu@ias.co.id",
    currentPosition: "Manager Compensation & Benefits",
    currentDepartment: "Human Resources",
    currentCompany: "PT Integrasi Aviasi Solusi",
    currentGrade: "BoD-4",
    currentJobFamily: "Human Resources",
    targetPositionId: "pos-001",
    
    performanceHistory: [
      { year: 2024, rating: "Above Target" },
      { year: 2023, rating: "Above Target" },
      { year: 2022, rating: "On Target" }
    ],
    
    competency: {
      jobFitScore: 88,
      assessmentDate: "2024-07-20",
      targetPosition: "VP Human Capital Business Partner"
    },
    
    disciplinaryRecord: {
      status: "Clean"
    },
    
    experience: {
      yearsInJobFamily: 6,
      yearsInCompany: 6,
      totalYearsExperience: 9,
      relevantPositions: [
        {
          title: "Manager Compensation & Benefits",
          company: "PT Integrasi Aviasi Solusi",
          startDate: "2021-03-01",
          endDate: "Present",
          jobFamily: "Human Resources"
        },
        {
          title: "Senior HR Analyst",
          company: "PT Integrasi Aviasi Solusi",
          startDate: "2019-01-01",
          endDate: "2021-02-28",
          jobFamily: "Human Resources"
        }
      ]
    },
    
    training: {
      hasRelevantTraining: true,
      hasRelevantCertification: true,
      trainings: [
        {
          name: "Management Development Program",
          type: "Penjenjangan",
          date: "2023-11-10",
          status: "Valid"
        }
      ],
      certifications: [
        {
          name: "CHRP (Certified Human Resources Professional)",
          issuer: "HCMI",
          issueDate: "2023-05-20",
          isRelevant: true
        }
      ]
    },
    
    aspirations: {
      sources: ["Unit", "Individual"],
      details: [
        {
          type: "Unit",
          nominatedBy: "HR Unit Head",
          date: "2024-10-15"
        },
        {
          type: "Individual",
          date: "2024-09-01"
        }
      ]
    },
    
    awards: {
      highestLevel: "Company",
      awardsList: [
        {
          name: "Employee of the Year",
          level: "Company",
          year: 2023,
          description: "Outstanding contribution in C&B transformation"
        }
      ]
    },
    
    socialContribution: {
      hasContribution: true,
      activities: [
        {
          name: "Community HR Workshop",
          type: "Workshop Facilitator",
          date: "2024-04-10",
          description: "Free HR workshop for SMEs"
        }
      ]
    },
    
    education: {
      highest: "S2 (Master)",
      institution: "Institut Teknologi Bandung",
      graduationYear: 2016,
      major: "Master of Business Administration"
    },
    
    readiness: "Ready in 6-12 months",
    readinessGaps: ["Strategic Leadership Experience", "Broader HR Exposure (beyond C&B)"],
    keyStrengths: [
      "Analytical Skills",
      "Process Optimization",
      "Data-driven Decision Making",
      "Attention to Detail"
    ],
    developmentAreas: [
      "Organizational Development",
      "Talent Management Strategy",
      "Executive Presence"
    ],
    hasDevelopmentPlan: true,
    developmentPlanLastUpdated: "2024-09-15"
  },
  
  {
    id: "cand-003",
    employeeId: "EMP34567",
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@ap1.co.id",
    currentPosition: "Senior Manager Strategic Planning",
    currentDepartment: "Corporate Strategy",
    currentCompany: "PT Angkasa Pura Indonesia",
    currentGrade: "BoD-3",
    currentJobFamily: "Strategy & Planning",
    targetPositionId: "pos-001",
    
    performanceHistory: [
      { year: 2024, rating: "Above Target" },
      { year: 2023, rating: "On Target" },
      { year: 2022, rating: "On Target" }
    ],
    
    competency: {
      jobFitScore: 75,
      assessmentDate: "2024-06-10",
      targetPosition: "VP Human Capital Business Partner"
    },
    
    disciplinaryRecord: {
      status: "Clean"
    },
    
    experience: {
      yearsInJobFamily: 2,
      yearsInCompany: 7,
      totalYearsExperience: 10,
      relevantPositions: [
        {
          title: "Senior Manager Strategic Planning",
          company: "PT Angkasa Pura Indonesia",
          startDate: "2022-06-01",
          endDate: "Present",
          jobFamily: "Strategy & Planning"
        },
        {
          title: "Manager Business Development",
          company: "PT Angkasa Pura Indonesia",
          startDate: "2020-01-01",
          endDate: "2022-05-31",
          jobFamily: "Business Development"
        }
      ]
    },
    
    training: {
      hasRelevantTraining: false,
      hasRelevantCertification: false,
      trainings: [
        {
          name: "Strategic Management Course",
          type: "Technical",
          date: "2023-08-20",
          status: "Valid"
        }
      ],
      certifications: []
    },
    
    aspirations: {
      sources: ["Individual", "Supervisor"],
      details: [
        {
          type: "Supervisor",
          nominatedBy: "VP Corporate Strategy",
          date: "2024-10-01"
        },
        {
          type: "Individual",
          date: "2024-08-15"
        }
      ]
    },
    
    awards: {
      highestLevel: "Company",
      awardsList: [
        {
          name: "Best Strategic Initiative",
          level: "Company",
          year: 2023
        }
      ]
    },
    
    socialContribution: {
      hasContribution: false,
      activities: []
    },
    
    education: {
      highest: "S2 (Master)",
      institution: "Universitas Gadjah Mada",
      graduationYear: 2015,
      major: "Master of Strategic Management"
    },
    
    readiness: "Ready in 1-2 years",
    readinessGaps: [
      "Limited HR Experience",
      "Need exposure to HRIS and Talent Management",
      "Labor Relations knowledge gap"
    ],
    keyStrengths: [
      "Strategic Thinking",
      "Business Acumen",
      "Cross-functional Leadership",
      "Project Management"
    ],
    developmentAreas: [
      "HR Functional Knowledge",
      "People Management at Scale",
      "Industrial Relations"
    ],
    hasDevelopmentPlan: true,
    developmentPlanLastUpdated: "2024-08-01",
    riskFactors: ["Different Job Family - requires significant reskilling"]
  }
];

/**
 * Process and rank candidates with EQS calculation
 */
function processCandidates(candidates: Omit<CandidateData, "eqs" | "rank">[]): CandidateData[] {
  // Calculate EQS for all candidates
  const candidatesWithEQS = candidates.map(calculateCandidateEQS);
  
  // Sort by EQS (descending) and assign ranks
  const rankedCandidates = candidatesWithEQS
    .sort((a, b) => (b.eqs?.total || 0) - (a.eqs?.total || 0))
    .map((candidate, index) => ({
      ...candidate,
      rank: index + 1
    }));
  
  return rankedCandidates;
}

/**
 * Export processed candidates by position
 */
export const mockCandidatesByPosition: Record<string, CandidateData[]> = {
  "pos-001": processCandidates(rawCandidatesPos001)
};

/**
 * Get all candidates (flattened)
 */
export const getAllCandidates = (): CandidateData[] => {
  return Object.values(mockCandidatesByPosition).flat();
};

/**
 * Get candidates for a specific position
 */
export const getCandidatesForPosition = (positionId: string): CandidateData[] => {
  return mockCandidatesByPosition[positionId] || [];
};

/**
 * Get position by ID
 */
export const getPositionById = (positionId: string): Position | undefined => {
  return mockPositions.find(p => p.id === positionId);
};