import { EMPLOYEE_PROFILES } from "@portal/lib/employee-profiles";
import {
  getRecommendationsByEmployee,
  getProposalsByEmployee,
  getTCDecisionsByEmployee,
} from "@talent/data/mockTalentReviewData";
import {
  myTeamMembers,
  type MyTeamMember,
} from "@talent/data/mockMyTeamData";
import { mockCandidates as talentPoolCandidates } from "@talent/screens/TalentPool/mockData";
import { mockCandidates as successionCandidates } from "@talent/screens/SuccessionPlanning/mockData";
import {
  performanceV2Companies,
  performanceV2Employees,
  performanceV2OrgUnits,
  performanceV2Positions,
} from "@performance-v2/lib/fixtures/talent-master";

import { resolveGovernanceAccessPolicy, resolvePresetSections } from "./policy";
import type {
  BuildProfileExportJobInput,
  ProfileExportJob,
  ProfileExportPreset,
  WorkerDirectoryEntry,
  WorkerProfile,
  WorkerProfileBuildInput,
  WorkerProfileCore,
  WorkerProfileSectionId,
} from "./types";

type PortalProfileRecord = (typeof EMPLOYEE_PROFILES)[keyof typeof EMPLOYEE_PROFILES];

const exportPresets: ProfileExportPreset[] = [
  { id: "cv-ringkas", label: "CV Ringkas", sectionIds: ["core"] },
  { id: "talent-profile-summary", label: "Talent Profile Summary", sectionIds: ["core", "talent", "performance"] },
  { id: "admin-review-pack", label: "Admin Review Pack", sectionIds: ["core", "talent", "performance", "governance"] },
];

function titleCase(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function portalRecords(): Array<{ email: string; record: PortalProfileRecord }> {
  return Object.entries(EMPLOYEE_PROFILES).map(([email, record]) => ({ email, record }));
}

function getPortalProfileByEmployeeId(employeeId: string) {
  return portalRecords().find(({ record }) => record.employee_profile.id_employee === employeeId) ?? null;
}

function getTalentMemberByEmployeeId(employeeId: string): MyTeamMember | null {
  return myTeamMembers.find((member) => member.employee_id === employeeId) ?? null;
}

function getTalentPoolCandidateByEmployeeId(employeeId: string) {
  return talentPoolCandidates.find((candidate) => candidate.employee_id === employeeId) ?? null;
}

function getSuccessionCandidateByEmployeeId(employeeId: string) {
  return successionCandidates.find((candidate) => candidate.employeeId === employeeId) ?? null;
}

function getPerformanceEmployeeByEmployeeId(employeeId: string) {
  return performanceV2Employees.find((employee) => employee.employee_id === employeeId) ?? null;
}

function getCompanyName(companyId: string | null | undefined) {
  return performanceV2Companies.find((company) => company.company_id === companyId)?.name ?? null;
}

function getPosition(positionId: string | null | undefined) {
  return performanceV2Positions.find((position) => position.position_id === positionId) ?? null;
}

function getOrgUnitName(orgUnitId: string | null | undefined) {
  return performanceV2OrgUnits.find((orgUnit) => orgUnit.org_unit_id === orgUnitId)?.name ?? null;
}

function buildCoreFromPortal(employeeId: string): WorkerProfileCore | null {
  const portalProfile = getPortalProfileByEmployeeId(employeeId);
  if (!portalProfile) {
    return null;
  }

  const { email, record } = portalProfile;
  return {
    employeeId: record.employee_profile.id_employee,
    employeeNumber: String(record.employee_profile.new_nip ?? record.employee_profile.old_nip ?? ""),
    fullName: record.employee_profile.full_name,
    preferredName: record.employee_profile.name_alias,
    corporateEmail: record.employee_profile.corporate_email ?? email,
    positionTitle: record.employee_company_assignment.job_position,
    organizationName:
      record.employee_company_assignment.department ??
      record.employee_company_assignment.division ??
      record.employee_company_assignment.business_unit,
    companyName: record.employee_company_assignment.company_name,
    summary: record.employee_company_assignment.job_function ?? null,
    photoUrl: null,
  };
}

function buildCoreFromTalent(employeeId: string): WorkerProfileCore | null {
  const member = getTalentMemberByEmployeeId(employeeId);
  if (!member) {
    return null;
  }

  return {
    employeeId: member.employee_id,
    employeeNumber: member.nik,
    fullName: member.name,
    preferredName: member.name.split(" ")[0] ?? member.name,
    corporateEmail: null,
    positionTitle: member.position_title,
    organizationName: member.organization_name,
    companyName: member.company_name,
    gradeLabel: `${member.band_jabatan} / ${member.grade_jabatan}`,
    summary: member.assignment_context,
    photoUrl: member.photo_url,
  };
}

function buildCoreFromTalentPool(employeeId: string): WorkerProfileCore | null {
  const candidate = getTalentPoolCandidateByEmployeeId(employeeId);
  if (!candidate) {
    return null;
  }

  return {
    employeeId: candidate.employee_id,
    fullName: candidate.name,
    preferredName: candidate.name.split(" ")[0] ?? candidate.name,
    corporateEmail: candidate.personal_info.email,
    positionTitle: candidate.position,
    organizationName: candidate.unit,
    companyName: candidate.company,
    gradeLabel: candidate.grade,
    summary: candidate.job_family,
    photoUrl: candidate.avatar_url ?? null,
  };
}

function buildCoreFromSuccession(employeeId: string): WorkerProfileCore | null {
  const candidate = getSuccessionCandidateByEmployeeId(employeeId);
  if (!candidate) {
    return null;
  }

  return {
    employeeId: candidate.employeeId,
    fullName: candidate.name,
    preferredName: candidate.name.split(" ")[0] ?? candidate.name,
    corporateEmail: null,
    positionTitle: candidate.currentPosition,
    organizationName: null,
    companyName: null,
    gradeLabel: candidate.currentGrade ?? null,
    summary: candidate.readiness.replaceAll("_", " "),
    photoUrl: null,
  };
}

function buildCoreFromPerformance(employeeId: string): WorkerProfileCore | null {
  const employee = getPerformanceEmployeeByEmployeeId(employeeId);
  if (!employee) {
    return null;
  }

  const position = getPosition(employee.current_position_id);
  return {
    employeeId: employee.employee_id,
    employeeNumber: employee.nik,
    fullName: employee.full_name,
    preferredName: employee.full_name.split(" ")[0] ?? employee.full_name,
    corporateEmail: employee.profile?.email ?? null,
    positionTitle: position?.title ?? employee.current_position_title ?? null,
    organizationName: getOrgUnitName(position?.org_unit_id ?? null),
    companyName: getCompanyName(employee.company_id),
    gradeLabel: employee.personal_grade_pg,
    summary: employee.current_department ?? null,
    photoUrl: employee.avatar ?? null,
  };
}

function buildCore(employeeId: string): WorkerProfileCore {
  return (
    buildCoreFromTalent(employeeId) ??
    buildCoreFromTalentPool(employeeId) ??
    buildCoreFromSuccession(employeeId) ??
    buildCoreFromPortal(employeeId) ??
    buildCoreFromPerformance(employeeId) ?? {
      employeeId,
      fullName: employeeId,
    }
  );
}

function buildTalentInsights(employeeId: string) {
  const member = getTalentMemberByEmployeeId(employeeId);
  const talentPoolCandidate = getTalentPoolCandidateByEmployeeId(employeeId);
  const successionCandidate = getSuccessionCandidateByEmployeeId(employeeId);

  if (member) {
    return {
      talentClassification: {
        eqsScore: member.eqs_score,
        eqsBand: member.eqs_band,
        calculatedAt: member.latest_assessment?.published_at ?? null,
        formulaVersion: "existing-fixture",
        cluster: member.talent_cluster,
        isTopTalent: member.talent_cluster === "9box_high_potential",
        riskProfile: member.risk_profile,
        eqsComponents: member.eqs_components.map((component) => ({
          componentType: component.component_type,
          weight: component.weight,
          rawValue: component.raw_value,
          weightedValue: component.weighted_value,
        })),
      },
      careerAspiration: {
        totalAspirations: member.aspirations.total_aspirations,
        bySource: member.aspirations.by_source,
        hasAspiration: member.aspirations.has_aspiration,
        pendingReviewCount: member.aspirations.pending_review_count,
      },
      developmentPlan: {
        status: titleCase(member.idp.status),
        cycleId: member.idp.cycle_id,
        totalHours: member.idp.total_hours,
        completedHours: member.idp.completed_hours,
        activityCount: member.idp.activity_count,
        completedActivities: member.idp.completed_activities,
      },
      assessment360: member.latest_assessment
        ? {
            cycleName: member.latest_assessment.cycle_name,
            overallScore: member.latest_assessment.overall_score,
            publishedAt: member.latest_assessment.published_at,
          }
        : undefined,
      jobTender: {
        activeApplications: member.applications.length,
        latestStatus: member.applications[0]?.status ?? null,
        positions: member.applications.map((application) => application.position_title),
      },
      succession: undefined,
    };
  }

  if (talentPoolCandidate) {
    return {
      talentClassification: {
        eqsScore: talentPoolCandidate.eqs_score.total_score,
        eqsBand: talentPoolCandidate.eqs_score.eqs_band,
        calculatedAt: talentPoolCandidate.eqs_score.calculated_at,
        formulaVersion: "talent-pool-fixture",
        cluster: talentPoolCandidate.talent_cluster,
        isTopTalent: talentPoolCandidate.is_top_talent,
        riskProfile: talentPoolCandidate.risk_profile,
        eqsComponents: talentPoolCandidate.eqs_score.components.map((component) => ({
          componentType: component.component_type,
          weight: component.weight,
          rawValue: component.raw_value,
          weightedValue: component.weighted_value,
        })),
      },
      careerAspiration: {
        totalAspirations: [talentPoolCandidate.aspiration.individual, talentPoolCandidate.aspiration.supervisor, talentPoolCandidate.aspiration.unit].filter(Boolean).length,
        bySource: {
          individual: talentPoolCandidate.aspiration.individual ? 1 : 0,
          supervisor: talentPoolCandidate.aspiration.supervisor ? 1 : 0,
          unit: talentPoolCandidate.aspiration.unit ? 1 : 0,
        },
        hasAspiration: Boolean(
          talentPoolCandidate.aspiration.individual ||
            talentPoolCandidate.aspiration.supervisor ||
            talentPoolCandidate.aspiration.unit,
        ),
        pendingReviewCount: talentPoolCandidate.is_hcbp_shortlisted ? 1 : 0,
      },
      developmentPlan: {
        status: talentPoolCandidate.training.length > 0 ? "Available" : "No Plan",
        cycleId: null,
        totalHours: talentPoolCandidate.training.reduce((total, training) => total + training.hours, 0),
        completedHours: talentPoolCandidate.training
          .filter((training) => training.status === "completed")
          .reduce((total, training) => total + training.hours, 0),
        activityCount: talentPoolCandidate.training.length,
        completedActivities: talentPoolCandidate.training.filter((training) => training.status === "completed").length,
      },
      assessment360: undefined,
      jobTender: undefined,
      succession: {
        readinessLabel: "Ready Now",
        targetPositions: talentPoolCandidate.is_hcbp_shortlisted ? [talentPoolCandidate.position] : [],
      },
    };
  }

  if (successionCandidate) {
    return {
      talentClassification: {
        eqsScore: successionCandidate.eqsScore,
        eqsBand:
          successionCandidate.eqsScore >= 90
            ? "highly_qualified"
            : successionCandidate.eqsScore >= 80
              ? "qualified"
              : "needs_development",
        calculatedAt: null,
        formulaVersion: "succession-fixture",
        cluster: successionCandidate.isTopTalent ? "9box_high_potential" : null,
        isTopTalent: successionCandidate.isTopTalent,
        riskProfile: successionCandidate.riskProfile,
        eqsComponents: [],
      },
      careerAspiration: {
        totalAspirations: [
          successionCandidate.aspirations?.individual,
          successionCandidate.aspirations?.supervisor,
          successionCandidate.aspirations?.unit,
        ].filter(Boolean).length,
        bySource: {
          individual: successionCandidate.aspirations?.individual ? 1 : 0,
          supervisor: successionCandidate.aspirations?.supervisor ? 1 : 0,
          unit: successionCandidate.aspirations?.unit ? 1 : 0,
        },
        hasAspiration: Boolean(
          successionCandidate.aspirations?.individual ||
            successionCandidate.aspirations?.supervisor ||
            successionCandidate.aspirations?.unit,
        ),
        pendingReviewCount: successionCandidate.ranking ? 0 : 1,
      },
      developmentPlan: {
        status: successionCandidate.readiness.replaceAll("_", " "),
        cycleId: null,
        totalHours: 0,
        completedHours: 0,
        activityCount: successionCandidate.gaps?.length ?? 0,
        completedActivities: 0,
      },
      assessment360: undefined,
      jobTender: undefined,
      succession: {
        readinessLabel: successionCandidate.readiness.replaceAll("_", " "),
        targetPositions: successionCandidate.aspirations?.individual ? [successionCandidate.aspirations.individual] : [],
      },
    };
  }

  return {
    talentClassification: undefined,
    careerAspiration: undefined,
    developmentPlan: undefined,
    assessment360: undefined,
    jobTender: undefined,
    succession: undefined,
  };
}

function buildPerformanceInsights(employeeId: string) {
  const member = getTalentMemberByEmployeeId(employeeId);
  const successionCandidate = getSuccessionCandidateByEmployeeId(employeeId);

  if (member) {
    return {
      performanceSummary: {
        latestScore: member.latest_assessment?.overall_score ?? null,
        latestRating: member.eqs_band ? titleCase(member.eqs_band) : null,
        reviewPeriod: member.latest_assessment?.cycle_name ?? null,
        history: member.latest_assessment
          ? [
              {
                period: member.latest_assessment.cycle_name,
                rating: member.latest_assessment.overall_score,
                score: member.latest_assessment.overall_score,
              },
            ]
          : [],
      },
      myKpi: {
        planningStatus: titleCase(member.idp.status),
        totalItems: member.idp.activity_count,
        approvalState: titleCase(member.idp.status),
        monitoringStatus: member.latest_assessment ? "Published" : "Pending",
      },
      myTeamKpi: undefined,
    };
  }

  if (successionCandidate) {
    return {
      performanceSummary: {
        latestScore: successionCandidate.performanceHistory?.[0]?.score ?? null,
        latestRating: successionCandidate.performanceHistory?.[0]?.rating ?? null,
        reviewPeriod: successionCandidate.performanceHistory?.[0]?.year?.toString() ?? null,
        history:
          successionCandidate.performanceHistory?.map((item) => ({
            period: String(item.year),
            rating: item.rating,
            score: item.score,
          })) ?? [],
      },
      myKpi: undefined,
      myTeamKpi: undefined,
    };
  }

  return {
    performanceSummary: undefined,
    myKpi: undefined,
    myTeamKpi: undefined,
  };
}

function buildGovernanceHistory(employeeId: string) {
  return {
    reviewCommittee: {
      proposals: getProposalsByEmployee(employeeId).map((proposal) => ({
        id: proposal.proposal_id,
        proposalType: proposal.proposal_type,
        status: proposal.status,
        justification: proposal.justification,
        submittedAt: proposal.submitted_at,
      })),
      recommendations: getRecommendationsByEmployee(employeeId).map((recommendation) => ({
        id: recommendation.recommendation_id,
        zonasi: recommendation.zonasi,
        status: recommendation.status,
        rationale: recommendation.hc_rationale,
        submittedAt: recommendation.submitted_at,
      })),
      decisions: getTCDecisionsByEmployee(employeeId).map((decision) => ({
        id: decision.decision_id,
        outcome: decision.decision_outcome,
        rationale: decision.tc_rationale,
        decidedAt: decision.decided_at,
      })),
    },
  };
}

function buildDeepLinks(employeeId: string, core: WorkerProfileCore) {
  const email = core.corporateEmail ? encodeURIComponent(core.corporateEmail) : null;
  return {
    self: `/worker-profile/${employeeId}`,
    portalProfile: email ? `/employee-profile/${email}` : `/worker-profile/${employeeId}`,
    myProfile: "/my-profile",
    talentTeam: `/talent/supervisor-portal?tab=team-profile&employee=${employeeId}`,
    talentPool: `/talent/talent-pool?employee=${employeeId}`,
    succession: `/talent/succession-planning?employee=${employeeId}`,
    committee: `/talent/talent-committee?employee=${employeeId}`,
  };
}

export function buildWorkerProfile(input: WorkerProfileBuildInput): WorkerProfile {
  const policy = resolveGovernanceAccessPolicy(input.viewerRole, input.accessContext);
  const core = buildCore(input.employeeId);
  const talentInsights = buildTalentInsights(input.employeeId);
  const performanceInsights = buildPerformanceInsights(input.employeeId);
  const governanceHistory = buildGovernanceHistory(input.employeeId);

  return {
    core,
    talentInsights,
    performanceInsights,
    governanceHistory,
    visibility: policy.visibility,
    exportPresets,
    deepLinks: buildDeepLinks(input.employeeId, core),
  };
}

function maybePushDirectoryEntry(
  map: Map<string, WorkerDirectoryEntry>,
  entry: WorkerDirectoryEntry,
) {
  const existing = map.get(entry.employeeId);
  if (!existing) {
    map.set(entry.employeeId, entry);
    return;
  }

  map.set(entry.employeeId, {
    ...existing,
    employeeNumber: existing.employeeNumber ?? entry.employeeNumber,
    email: existing.email ?? entry.email,
    companyName: existing.companyName ?? entry.companyName,
    organizationName: existing.organizationName ?? entry.organizationName,
    positionTitle: existing.positionTitle ?? entry.positionTitle,
    sourceTags: Array.from(new Set([...existing.sourceTags, ...entry.sourceTags])),
  });
}

export function getWorkerDirectoryEntries(): WorkerDirectoryEntry[] {
  const map = new Map<string, WorkerDirectoryEntry>();

  for (const { email, record } of portalRecords()) {
    maybePushDirectoryEntry(map, {
      employeeId: record.employee_profile.id_employee,
      employeeNumber: String(record.employee_profile.new_nip ?? record.employee_profile.old_nip ?? ""),
      email,
      name: record.employee_profile.full_name,
      companyName: record.employee_company_assignment.company_name,
      organizationName:
        record.employee_company_assignment.department ??
        record.employee_company_assignment.division ??
        record.employee_company_assignment.business_unit,
      positionTitle: record.employee_company_assignment.job_position,
      sourceTags: ["portal"],
    });
  }

  for (const member of myTeamMembers) {
    maybePushDirectoryEntry(map, {
      employeeId: member.employee_id,
      employeeNumber: member.nik,
      email: null,
      name: member.name,
      companyName: member.company_name,
      organizationName: member.organization_name,
      positionTitle: member.position_title,
      sourceTags: ["talent"],
    });
  }

  for (const candidate of talentPoolCandidates) {
    maybePushDirectoryEntry(map, {
      employeeId: candidate.employee_id,
      employeeNumber: candidate.employee_id,
      email: candidate.personal_info.email,
      name: candidate.name,
      companyName: candidate.company,
      organizationName: candidate.unit,
      positionTitle: candidate.position,
      sourceTags: ["talent-pool"],
    });
  }

  for (const candidate of successionCandidates) {
    maybePushDirectoryEntry(map, {
      employeeId: candidate.employeeId,
      employeeNumber: candidate.employeeId,
      email: null,
      name: candidate.name,
      companyName: null,
      organizationName: null,
      positionTitle: candidate.currentPosition,
      sourceTags: ["succession"],
    });
  }

  for (const employee of performanceV2Employees) {
    const position = getPosition(employee.current_position_id);
    maybePushDirectoryEntry(map, {
      employeeId: employee.employee_id,
      employeeNumber: employee.nik,
      email: employee.profile?.email ?? null,
      name: employee.full_name,
      companyName: getCompanyName(employee.company_id),
      organizationName: getOrgUnitName(position?.org_unit_id ?? null),
      positionTitle: position?.title ?? null,
      sourceTags: ["performance-v2"],
    });
  }

  return Array.from(map.values()).sort((left, right) => left.name.localeCompare(right.name));
}

export function findWorkerDirectoryEntryByEmployeeId(employeeId: string) {
  return getWorkerDirectoryEntries().find((entry) => entry.employeeId === employeeId) ?? null;
}

export function findWorkerDirectoryEntryByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return getWorkerDirectoryEntries().find((entry) => entry.email?.trim().toLowerCase() === normalized) ?? null;
}

const emailFallbackByAddress: Record<string, string> = {
  "binavia@injourney.co.id": "emp-260102",
  "dimas.sayyid@injourney.id": "EMP-INJ-0000000005",
};

export function findWorkerEmployeeIdByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return findWorkerDirectoryEntryByEmail(normalized)?.employeeId ?? emailFallbackByAddress[normalized] ?? null;
}

function buildSectionRecords(profile: WorkerProfile, sectionId: WorkerProfileSectionId) {
  if (sectionId === "core") {
    return profile.core;
  }
  if (sectionId === "talent") {
    return profile.talentInsights;
  }
  if (sectionId === "performance") {
    return profile.performanceInsights;
  }
  return profile.governanceHistory;
}

function sectionLabel(sectionId: WorkerProfileSectionId) {
  if (sectionId === "core") return "Core CV";
  if (sectionId === "talent") return "Talent Insights";
  if (sectionId === "performance") return "Performance Insights";
  return "Governance History";
}

export function buildProfileExportJob(input: BuildProfileExportJobInput): ProfileExportJob {
  const presetSections = resolvePresetSections(input.presetId);
  const requestedSections = input.includeSectionIds.length > 0 ? input.includeSectionIds : presetSections;
  const allowedSections = requestedSections.filter((sectionId) =>
    (["core", "talent", "performance", "governance"] as WorkerProfileSectionId[]).includes(sectionId),
  );
  const visibleSections = allowedSections.filter((sectionId) => {
    if (sectionId === "core") return input.profile.visibility.coreCV;
    if (sectionId === "talent") return input.profile.visibility.talentInsights;
    if (sectionId === "performance") return input.profile.visibility.performanceInsights;
    return input.profile.visibility.governanceHistory;
  });

  return {
    employeeId: input.profile.core.employeeId,
    employeeName: input.profile.core.fullName,
    format: input.format,
    presetId: input.presetId,
    fileName: `${input.profile.core.fullName.replace(/\s+/g, "-").toLowerCase()}-${input.presetId}.${input.format}`,
    sections: visibleSections.map((sectionId) => ({
      id: sectionId,
      label: sectionLabel(sectionId),
      records: buildSectionRecords(input.profile, sectionId),
    })),
    metadata: {
      language: input.language,
      includeSensitiveFields: input.includeSensitiveFields,
      generatedAt: new Date().toISOString(),
    },
  };
}
