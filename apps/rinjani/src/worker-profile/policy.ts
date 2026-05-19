import type {
  GovernanceAccessPolicy,
  ProfileSectionVisibility,
  WorkerProfileAccessContext,
  WorkerProfileSectionId,
  WorkerProfileViewerRole,
} from "./types";

const DEFAULT_PRESETS: Record<string, WorkerProfileSectionId[]> = {
  "cv-ringkas": ["core"],
  "talent-profile-summary": ["core", "talent", "performance"],
  "admin-review-pack": ["core", "talent", "performance", "governance"],
};

function buildVisibility(
  viewerRole: WorkerProfileViewerRole,
  accessContext: WorkerProfileAccessContext,
): ProfileSectionVisibility {
  const coreCV = true;
  const exportAvailable = true;

  if (viewerRole === "employee" && accessContext === "self") {
    return {
      coreCV,
      talentInsights: true,
      performanceInsights: true,
      governanceHistory: false,
      exportAvailable,
    };
  }

  if (viewerRole === "manager" && accessContext === "manager") {
    return {
      coreCV,
      talentInsights: true,
      performanceInsights: true,
      governanceHistory: false,
      exportAvailable,
    };
  }

  if (viewerRole === "talent_committee" && accessContext === "committee") {
    return {
      coreCV,
      talentInsights: true,
      performanceInsights: true,
      governanceHistory: true,
      exportAvailable,
    };
  }

  if (viewerRole === "talent_admin" && (accessContext === "talent_pool" || accessContext === "succession" || accessContext === "committee")) {
    return {
      coreCV,
      talentInsights: true,
      performanceInsights: true,
      governanceHistory: true,
      exportAvailable,
    };
  }

  return {
    coreCV,
    talentInsights: true,
    performanceInsights: true,
    governanceHistory: false,
    exportAvailable,
  };
}

export function resolveGovernanceAccessPolicy(
  viewerRole: WorkerProfileViewerRole,
  accessContext: WorkerProfileAccessContext,
): GovernanceAccessPolicy {
  const visibility = buildVisibility(viewerRole, accessContext);
  const allowedExportSectionIds = (["core", "talent", "performance", "governance"] as WorkerProfileSectionId[]).filter((sectionId) => {
    if (sectionId === "core") return visibility.coreCV;
    if (sectionId === "talent") return visibility.talentInsights;
    if (sectionId === "performance") return visibility.performanceInsights;
    return visibility.governanceHistory;
  });

  return {
    viewerRole,
    accessContext,
    visibility,
    allowedExportSectionIds,
  };
}

export function resolvePresetSections(presetId: string): WorkerProfileSectionId[] {
  return DEFAULT_PRESETS[presetId] ?? DEFAULT_PRESETS["cv-ringkas"];
}
