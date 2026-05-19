import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router";
import {
  buildWorkerProfileHref,
  resolveWorkerProfileAccessContext,
  resolveWorkerProfileBackHref,
  type UserRole,
} from "@rinjani/shared-types";
import {
  Button,
  Checkbox,
  Label,
  PageHeader,
  ProfileSummary,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SectionPanel,
  StatCard,
  StatCardGroup,
  StatusBadge,
  toast,
} from "@rinjani/shared-ui";
import { ArrowLeft, ArrowUpRight, Download, FileSpreadsheet, FileText, FolderSearch, Shield, Sparkles, Trophy, Users } from "lucide-react";

import {
  buildProfileExportJob,
  buildWorkerProfile,
  findWorkerEmployeeIdByEmail,
  getWorkerDirectoryEntries,
} from "./model";
import { downloadWorkerProfileExport } from "./export";
import type { WorkerProfileAccessContext, WorkerProfileSectionId, WorkerProfileViewerRole } from "./types";

function mapUserRoleToViewerRole(userRole: UserRole, accessContext: WorkerProfileAccessContext): WorkerProfileViewerRole {
  if (accessContext === "committee") {
    return "talent_committee";
  }
  if (accessContext === "manager") {
    return "manager";
  }
  if (accessContext === "talent_pool" || accessContext === "succession") {
    return userRole === "Admin" ? "talent_admin" : "manager";
  }
  if (accessContext === "portal_admin") {
    return userRole === "Admin" ? "portal_admin" : "employee";
  }
  return userRole === "Admin" ? "portal_admin" : "employee";
}

function WorkerProfileView({
  employeeId,
  viewerRole,
  accessContext,
  userEmail,
  userRole,
  backHref,
}: {
  employeeId: string;
  viewerRole: WorkerProfileViewerRole;
  accessContext: WorkerProfileAccessContext;
  userEmail: string;
  userRole: UserRole;
  backHref?: string;
}) {
  const navigate = useNavigate();
  const profile = useMemo(
    () =>
      buildWorkerProfile({
        employeeId,
        viewerRole,
        accessContext,
      }),
    [accessContext, employeeId, viewerRole],
  );
  const sectionOptions = useMemo(
    () =>
      [
        { id: "core", label: "Core CV", visible: profile.visibility.coreCV },
        { id: "talent", label: "Talent Insights", visible: profile.visibility.talentInsights },
        { id: "performance", label: "Performance Insights", visible: profile.visibility.performanceInsights },
        { id: "governance", label: "Governance History", visible: profile.visibility.governanceHistory },
      ].filter((section) => section.visible) as Array<{ id: WorkerProfileSectionId; label: string; visible: true }>,
    [profile.visibility],
  );
  const [selectedPresetId, setSelectedPresetId] = useState(profile.exportPresets[0]?.id ?? "cv-ringkas");
  const [selectedSectionIds, setSelectedSectionIds] = useState<WorkerProfileSectionId[]>([]);
  const [includeSensitiveFields, setIncludeSensitiveFields] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<"pdf" | "xlsx" | null>(null);

  useEffect(() => {
    setSelectedPresetId(profile.exportPresets[0]?.id ?? "cv-ringkas");
  }, [profile.exportPresets]);

  useEffect(() => {
    const preset = profile.exportPresets.find((item) => item.id === selectedPresetId) ?? profile.exportPresets[0];
    const visibleIds = new Set(sectionOptions.map((section) => section.id));
    setSelectedSectionIds((preset?.sectionIds ?? []).filter((sectionId) => visibleIds.has(sectionId)));
  }, [profile.exportPresets, sectionOptions, selectedPresetId]);

  useEffect(() => {
    if (!profile.visibility.governanceHistory) {
      setIncludeSensitiveFields(false);
    }
  }, [profile.visibility.governanceHistory]);

  const handleSectionToggle = (sectionId: WorkerProfileSectionId, checked: boolean | "indeterminate") => {
    if (checked !== true) {
      setSelectedSectionIds((current) => current.filter((item) => item !== sectionId));
      return;
    }

    setSelectedSectionIds((current) => (current.includes(sectionId) ? current : [...current, sectionId]));
  };

  const handleExport = async (format: "pdf" | "xlsx") => {
    if (selectedSectionIds.length === 0) {
      toast.error("Select at least one section before exporting.");
      return;
    }

    setExportingFormat(format);

    try {
      const job = buildProfileExportJob({
        profile,
        format,
        presetId: selectedPresetId,
        includeSectionIds: selectedSectionIds,
        includeSensitiveFields,
        language: "id",
      });

      if (job.sections.length === 0) {
        toast.error("No visible sections are available for this export.");
        return;
      }

      await downloadWorkerProfileExport(job);
      toast.success(`${format.toUpperCase()} export downloaded.`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to generate ${format.toUpperCase()} export.`);
    } finally {
      setExportingFormat(null);
    }
  };

  return (
    <div className="mx-auto max-w-[var(--layout-max-width-workspace)] space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8">
      <PageHeader
        variant="workspace"
        eyebrow="Worker Profile"
        title={profile.core.fullName}
        description="Canonical profile view shared by Portal and Talent contexts. Edit policy tetap mengikuti tier existing; yang ditampilkan di sini mengikuti access policy terintegrasi."
        badge={<StatusBadge status={accessContext === "self" ? "info" : "neutral"}>{accessContext.replaceAll("_", " ")}</StatusBadge>}
        actions={
          <>
            {backHref ? (
              <Button variant="outline" asChild>
                <Link to={backHref}>
                  <ArrowLeft className="size-4" />
                  Back to Context
                </Link>
              </Button>
            ) : (
              <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="size-4" />
                Back
              </Button>
            )}
            {userRole === "Admin" ? (
              <Button variant="outline" asChild>
                <Link to="/employee-directory">
                  <Users className="size-4" />
                  Employee Directory
                </Link>
              </Button>
            ) : null}
          </>
        }
      />

      <SectionPanel>
        <ProfileSummary
          name={profile.core.fullName}
          description={profile.core.positionTitle ?? "Position not available"}
          metadata={
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>{profile.core.companyName ?? "Company unavailable"}</span>
              <span>{profile.core.organizationName ?? "Organization unavailable"}</span>
              <span>{profile.core.employeeNumber ?? profile.core.employeeId}</span>
              <span>{profile.core.corporateEmail ?? userEmail}</span>
            </div>
          }
          status={profile.visibility.governanceHistory ? "Governance-enabled" : "Standard access"}
          initials={profile.core.preferredName?.slice(0, 2).toUpperCase() ?? profile.core.fullName.slice(0, 2).toUpperCase()}
          size="md"
        />
      </SectionPanel>

      <StatCardGroup>
        <StatCard
          tone="neutral"
          label="Core CV"
          value={profile.visibility.coreCV ? "Visible" : "Hidden"}
          description="Employee master, employment, and CV content."
          icon={<FolderSearch className="size-6" />}
        />
        <StatCard
          tone="info"
          label="Talent Insights"
          value={profile.visibility.talentInsights ? "Visible" : "Hidden"}
          description="EQS, aspiration, IDP, assessment, and mobility summary."
          icon={<Sparkles className="size-6" />}
        />
        <StatCard
          tone="warning"
          label="Performance Insights"
          value={profile.visibility.performanceInsights ? "Visible" : "Hidden"}
          description="Performance summary and KPI-related profile context."
          icon={<Trophy className="size-6" />}
        />
        <StatCard
          tone={profile.visibility.governanceHistory ? "destructive" : "neutral"}
          label="Governance History"
          value={profile.visibility.governanceHistory ? "Visible" : "Restricted"}
          description="Committee / recommendation / decision history."
          icon={<Shield className="size-6" />}
        />
      </StatCardGroup>

      {profile.visibility.exportAvailable ? (
        <SectionPanel
          title="Export CV"
          description="Preset + custom-light export. The downloaded file always follows the same access policy used by the on-screen profile."
          actions={
            <StatusBadge status="info">
              <Download className="mr-1 size-3.5" />
              Export ready
            </StatusBadge>
          }
        >
          <div className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,16rem)_1fr]">
              <div className="space-y-2">
                <Label htmlFor="worker-profile-export-preset">Preset</Label>
                <Select value={selectedPresetId} onValueChange={setSelectedPresetId}>
                  <SelectTrigger id="worker-profile-export-preset">
                    <SelectValue placeholder="Choose preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {profile.exportPresets.map((preset) => (
                      <SelectItem key={preset.id} value={preset.id}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Included sections</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {sectionOptions.map((section) => (
                    <label
                      key={section.id}
                      className="flex items-start gap-3 rounded-[18px] border border-border bg-background px-4 py-3"
                    >
                      <Checkbox
                        checked={selectedSectionIds.includes(section.id)}
                        onCheckedChange={(checked) => handleSectionToggle(section.id, checked)}
                        aria-label={`Include ${section.label}`}
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{section.label}</p>
                        <p className="text-xs text-muted-foreground">Visible in the current access context.</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {profile.visibility.governanceHistory ? (
              <label className="flex items-start gap-3 rounded-[18px] border border-border bg-background px-4 py-3">
                <Checkbox
                  checked={includeSensitiveFields}
                  onCheckedChange={(checked) => setIncludeSensitiveFields(checked === true)}
                  aria-label="Include sensitive fields"
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Include governance-sensitive fields</p>
                  <p className="text-xs text-muted-foreground">Only available because the current viewer context is governance-authorized.</p>
                </div>
              </label>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => handleExport("pdf")} disabled={exportingFormat !== null}>
                <FileText className="size-4" />
                {exportingFormat === "pdf" ? "Generating PDF..." : "Download PDF"}
              </Button>
              <Button variant="outline" onClick={() => handleExport("xlsx")} disabled={exportingFormat !== null}>
                <FileSpreadsheet className="size-4" />
                {exportingFormat === "xlsx" ? "Generating XLSX..." : "Download XLSX"}
              </Button>
            </div>
          </div>
        </SectionPanel>
      ) : null}

      {profile.visibility.coreCV ? (
        <SectionPanel title="Core CV" description="Primary reference from the existing Portal My Profile experience.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Preferred name</p>
              <p className="mt-2 text-sm font-medium text-foreground">{profile.core.preferredName ?? "-"}</p>
            </div>
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Grade</p>
              <p className="mt-2 text-sm font-medium text-foreground">{profile.core.gradeLabel ?? "-"}</p>
            </div>
          </div>
        </SectionPanel>
      ) : null}

      {profile.visibility.talentInsights ? (
        <SectionPanel title="Talent Insights" description="Summary only; detailed workflows remain in Talent modules.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">EQS</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{profile.talentInsights.talentClassification?.eqsScore ?? "N/A"}</p>
              <p className="mt-1 text-sm text-muted-foreground">{profile.talentInsights.talentClassification?.eqsBand ?? "Band unavailable"}</p>
            </div>
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Aspirations</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{profile.talentInsights.careerAspiration?.totalAspirations ?? 0}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.talentInsights.careerAspiration?.pendingReviewCount ?? 0} pending review
              </p>
            </div>
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">IDP</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{profile.talentInsights.developmentPlan?.status ?? "No plan"}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.talentInsights.developmentPlan?.completedHours ?? 0}/{profile.talentInsights.developmentPlan?.totalHours ?? 0} hours
              </p>
            </div>
          </div>
        </SectionPanel>
      ) : null}

      {profile.visibility.performanceInsights ? (
        <SectionPanel title="Performance Insights" description="Profile-safe performance summary; transactional evidence and approval queues stay in native modules.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Latest review</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{profile.performanceInsights.performanceSummary?.reviewPeriod ?? "Not available"}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Score {profile.performanceInsights.performanceSummary?.latestScore ?? "-"} · {profile.performanceInsights.performanceSummary?.latestRating ?? "-"}
              </p>
            </div>
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">My KPI profile context</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{profile.performanceInsights.myKpi?.planningStatus ?? "Not available"}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.performanceInsights.myKpi?.totalItems ?? 0} tracked items · {profile.performanceInsights.myKpi?.monitoringStatus ?? "No monitoring status"}
              </p>
            </div>
          </div>
        </SectionPanel>
      ) : null}

      {profile.visibility.governanceHistory ? (
        <SectionPanel title="Governance History" description="Restricted section for governance-authorized viewers and contexts only.">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Proposals</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{profile.governanceHistory.reviewCommittee?.proposals.length ?? 0}</p>
            </div>
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Recommendations</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{profile.governanceHistory.reviewCommittee?.recommendations.length ?? 0}</p>
            </div>
            <div className="rounded-[20px] border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">TC decisions</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{profile.governanceHistory.reviewCommittee?.decisions.length ?? 0}</p>
            </div>
          </div>
        </SectionPanel>
      ) : null}
    </div>
  );
}

export function PortalMyWorkerProfilePage({ userRole, userEmail }: { userRole: UserRole; userEmail: string }) {
  const employeeId = findWorkerEmployeeIdByEmail(userEmail);
  if (!employeeId) {
    return <Navigate to="/" replace />;
  }

  return (
    <WorkerProfileView
      employeeId={employeeId}
      viewerRole={mapUserRoleToViewerRole(userRole, "self")}
      accessContext="self"
      userEmail={userEmail}
      userRole={userRole}
      backHref="/"
    />
  );
}

export function PortalWorkerProfilePage({
  userRole,
  userEmail,
  accessContext = "portal_admin",
}: {
  userRole: UserRole;
  userEmail: string;
  accessContext?: WorkerProfileAccessContext;
}) {
  const { employeeId } = useParams();
  const [searchParams] = useSearchParams();
  if (!employeeId) {
    return <Navigate to="/" replace />;
  }

  const resolvedAccessContext = resolveWorkerProfileAccessContext(searchParams.get("context"), accessContext);
  const backHref = resolveWorkerProfileBackHref(searchParams.get("from"));

  return (
    <WorkerProfileView
      employeeId={employeeId}
      viewerRole={mapUserRoleToViewerRole(userRole, resolvedAccessContext)}
      accessContext={resolvedAccessContext}
      userEmail={userEmail}
      userRole={userRole}
      backHref={backHref}
    />
  );
}

export function PortalEmployeeProfileCompatibilityPage({ userRole, userEmail }: { userRole: UserRole; userEmail: string }) {
  const { email } = useParams();
  const employeeId = email ? findWorkerEmployeeIdByEmail(decodeURIComponent(email)) : null;

  if (!employeeId) {
    return <Navigate to="/" replace />;
  }

  return (
    <WorkerProfileView
      employeeId={employeeId}
      viewerRole={mapUserRoleToViewerRole(userRole, "portal_admin")}
      accessContext="portal_admin"
      userEmail={userEmail}
      userRole={userRole}
      backHref="/employee-directory"
    />
  );
}

export function PortalEmployeeDirectoryPage({ userRole, userEmail }: { userRole: UserRole; userEmail: string }) {
  const [query, setQuery] = useState("");
  const entries = useMemo(() => getWorkerDirectoryEntries(), []);
  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return entries;
    }

    return entries.filter((entry) =>
      [entry.name, entry.employeeNumber, entry.email, entry.companyName, entry.organizationName, entry.positionTitle]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized)),
    );
  }, [entries, query]);

  return (
    <div className="mx-auto max-w-[var(--layout-max-width-workspace)] space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8">
      <PageHeader
        eyebrow="Portal Administration"
        title="Employee Directory"
        description="Admin entry point to browse employees and open the canonical Worker Profile / CV view."
        variant="workspace"
        badge={<StatusBadge status="info">{filteredEntries.length} employees</StatusBadge>}
        actions={
          <Button variant="outline" asChild>
            <Link to="/my-profile">
              <ArrowLeft className="size-4" />
              Back to My Profile
            </Link>
          </Button>
        }
      />

      <SectionPanel title="Search" description="Filter by name, employee number, email, company, organization, or position.">
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          onClear={() => setQuery("")}
          placeholder="Search employees..."
        />
      </SectionPanel>

      <SectionPanel title="Employees" description="Directory results inherit Portal admin view policy. Governance history remains restricted unless opened from governance contexts.">
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <div key={entry.employeeId} className="flex flex-col gap-3 rounded-[20px] border border-border bg-background p-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold text-foreground">{entry.name}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.positionTitle ?? "Position unavailable"} · {entry.companyName ?? "Company unavailable"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.employeeNumber ?? entry.employeeId}
                  {entry.email ? ` · ${entry.email}` : ""}
                </p>
              </div>
              <Button asChild>
                <Link to={buildWorkerProfileHref(entry.employeeId, { context: "portal_admin", from: "/employee-directory" })}>
                  Open Profile
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </SectionPanel>
    </div>
  );
}
