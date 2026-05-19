// @vitest-environment node

import { buildProfileExportJob, buildWorkerProfile, getWorkerDirectoryEntries } from "../worker-profile/model";

describe("Worker profile canonical model", () => {
  test("shows self profile without governance history for a regular employee", () => {
    const profile = buildWorkerProfile({
      employeeId: "EMP-20002",
      viewerRole: "employee",
      accessContext: "self",
      viewerEmployeeId: "EMP-20002",
    });

    expect(profile.core.employeeId).toBe("EMP-20002");
    expect(profile.visibility.governanceHistory).toBe(false);
    expect(profile.visibility.talentInsights).toBe(true);
    expect(profile.visibility.performanceInsights).toBe(true);
    expect(profile.talentInsights.talentClassification?.eqsScore).toBe(88.75);
    expect(profile.exportPresets.map((preset) => preset.id)).toContain("cv-ringkas");
  });

  test("exposes governance history for talent committee context", () => {
    const profile = buildWorkerProfile({
      employeeId: "EMP-0001",
      viewerRole: "talent_committee",
      accessContext: "committee",
    });

    expect(profile.visibility.governanceHistory).toBe(true);
    expect(profile.governanceHistory.reviewCommittee?.proposals.length).toBeGreaterThan(0);
    expect(profile.governanceHistory.reviewCommittee?.recommendations.length).toBeGreaterThan(0);
  });

  test("filters export sections by access policy even when restricted sections are requested", () => {
    const profile = buildWorkerProfile({
      employeeId: "EMP-20002",
      viewerRole: "portal_admin",
      accessContext: "portal_admin",
    });

    const job = buildProfileExportJob({
      profile,
      format: "xlsx",
      presetId: "admin-review-pack",
      includeSectionIds: ["core", "talent", "performance", "governance"],
      includeSensitiveFields: true,
      language: "id",
    });

    expect(job.format).toBe("xlsx");
    expect(job.sections.map((section) => section.id)).toEqual(["core", "talent", "performance"]);
    expect(job.sections.find((section) => section.id === "governance")).toBeUndefined();
  });

  test("builds a searchable employee directory across portal, talent, and performance sources", () => {
    const entries = getWorkerDirectoryEntries();

    expect(entries.find((entry) => entry.employeeId === "EMP-INJ-0000000005")?.name).toBe("Dimas Sayyid");
    expect(entries.find((entry) => entry.employeeId === "emp-260102")?.name).toBe("Binavia Wardhani");
    expect(entries.find((entry) => entry.employeeId === "EMP-20002")?.positionTitle).toContain("Department Head");
  });

  test("hydrates canonical talent profile for talent pool candidates outside the my-team fixture", () => {
    const profile = buildWorkerProfile({
      employeeId: "emp-ahmad-susanto",
      viewerRole: "talent_admin",
      accessContext: "talent_pool",
    });

    expect(profile.core.fullName).toBe("Ahmad Susanto");
    expect(profile.core.positionTitle).toBe("Sr. Manager HC");
    expect(profile.talentInsights.talentClassification?.eqsScore).toBe(93.5);
    expect(profile.talentInsights.jobTender).toBeUndefined();
  });

  test("hydrates canonical talent profile for succession candidates discussed in succession planning", () => {
    const profile = buildWorkerProfile({
      employeeId: "EMP001",
      viewerRole: "talent_admin",
      accessContext: "succession",
    });

    expect(profile.core.fullName).toBe("Taufik Hidayat");
    expect(profile.core.positionTitle).toBe("VP Human Capital");
    expect(profile.talentInsights.talentClassification?.eqsScore).toBe(98.7);
    expect(profile.performanceInsights.performanceSummary?.history).toHaveLength(3);
  });
});
