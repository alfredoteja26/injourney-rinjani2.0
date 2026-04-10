import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Badge,
  BarChart,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  MetricCard,
  PageHeading,
  ProgressCluster,
  RankingList,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@rinjani/shared-ui";
import type { CapType, HqAdjustmentRequest, HqAuditLog } from "../../lib/domain/types";
import { usePerformanceV2 } from "../../lib/store/performance-v2-store";
import { PersonaContextBar } from "../../ui/persona-context-bar";

const HQ_SECTIONS = [
  { value: "dashboard", label: "Dashboard" },
  { value: "periods", label: "Periods" },
  { value: "policies", label: "Policies" },
  { value: "adjustments", label: "Adjustments" },
  { value: "year-close", label: "Year Close" },
  { value: "analytics", label: "Analytics" },
  { value: "audit", label: "Audit" },
] as const;

type HqSection = (typeof HQ_SECTIONS)[number]["value"];

const ADJUSTMENT_STATUS_OPTIONS = ["ALL", "PENDING", "APPROVED", "REJECTED", "REVISION_REQUESTED"] as const;
const ADJUSTMENT_TYPE_OPTIONS = ["ALL", "KPI_CHANGE", "WEIGHT_CHANGE", "TARGET_CHANGE", "ITEM_ADD", "ITEM_REMOVE"] as const;
const TIER_OPTIONS = ["ALL", "1", "2", "3"] as const;
const PHASE_OPTIONS = ["ALL", "PLANNING", "MONITORING", "YEAR_END"] as const;

function isSection(value: string | null): value is HqSection {
  return HQ_SECTIONS.some((section) => section.value === value);
}

function formatDate(value?: string) {
  if (!value) {
    return "Belum tersedia";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value?: string) {
  if (!value) {
    return "Belum tersedia";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function daysFromToday(deadline: string) {
  const now = new Date("2026-04-10T00:00:00+07:00");
  const target = new Date(deadline);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function badgeForAdjustmentStatus(status: HqAdjustmentRequest["status"]) {
  switch (status) {
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "destructive";
    case "REVISION_REQUESTED":
      return "warning";
    default:
      return "info";
  }
}

function badgeForAuditAction(action: HqAuditLog["action"]) {
  switch (action) {
    case "FORCE_FINALIZED":
    case "YEAR_CLOSED":
      return "attention";
    case "OVERRIDE_APPLIED":
      return "warning";
    case "ADJUSTMENT_REVIEWED":
      return "info";
    case "PERIOD_OPENED":
    case "PERIOD_CLOSED":
      return "success";
    default:
      return "neutral";
  }
}

function badgeForDeadline(daysLeft: number) {
  if (daysLeft < 0) {
    return { variant: "destructive" as const, label: `Lewat ${Math.abs(daysLeft)} hari` };
  }
  if (daysLeft <= 2) {
    return { variant: "warning" as const, label: `${daysLeft} hari lagi` };
  }
  return { variant: "success" as const, label: `${daysLeft} hari lagi` };
}

function safeNumber(value: string, fallback: number | null = null) {
  const parsed = Number(value);
  if (Number.isFinite(parsed)) {
    return parsed;
  }
  return fallback;
}

function parseOptionalNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseNullableNumber(value: string) {
  if (value.trim() === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function FieldValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

export function KpiHqScreen() {
  const { state, actingAsEmployeeNumber, getEmployeeDisplay, reviewHqAdjustment, updateBandFormula, updateKpiRuleConfig } = usePerformanceV2();
  const [searchParams, setSearchParams] = useSearchParams();

  const section = isSection(searchParams.get("tab")) ? searchParams.get("tab") : "dashboard";
  const yearFilter = searchParams.get("year") ?? String(state.performancePeriod.year);
  const phaseFilter = (searchParams.get("phase") ?? "ALL") as (typeof PHASE_OPTIONS)[number];
  const companyFilter = searchParams.get("companyId") ?? "ALL";
  const statusFilter = (searchParams.get("status") ?? "ALL") as (typeof ADJUSTMENT_STATUS_OPTIONS)[number];
  const requestTypeFilter = (searchParams.get("requestType") ?? "ALL") as (typeof ADJUSTMENT_TYPE_OPTIONS)[number];
  const cohortFilter = searchParams.get("cohortId") ?? "ALL";
  const tierFilter = (searchParams.get("tier") ?? "ALL") as (typeof TIER_OPTIONS)[number];
  const query = searchParams.get("q") ?? "";
  const deferredQuery = useDeferredValue(query);
  const requestId = searchParams.get("requestId");

  const [reviewAction, setReviewAction] = useState<"APPROVED" | "REJECTED" | "REVISION_REQUESTED">("APPROVED");
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [editingFormulaId, setEditingFormulaId] = useState<string | null>(null);
  const [formulaDraft, setFormulaDraft] = useState<{ bersama: string; unit: string }>({ bersama: "", unit: "" });
  const [ruleDraft, setRuleDraft] = useState(() => ({
    minItemsPerType: String(state.kpiRuleConfig.minItemsPerType ?? ""),
    maxItemsPerType: state.kpiRuleConfig.maxItemsPerType == null ? "" : String(state.kpiRuleConfig.maxItemsPerType),
    minWeightPerItemPct: String(state.kpiRuleConfig.minWeightPerItemPct ?? ""),
    maxWeightPerItemPct: String(state.kpiRuleConfig.maxWeightPerItemPct ?? ""),
    globalCapType: state.kpiRuleConfig.globalCapType as CapType,
    categoryBasedScoringEnabled: state.kpiRuleConfig.categoryBasedScoringEnabled,
  }));

  const updateQuery = (patch: Record<string, string | null>) => {
    startTransition(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(patch)) {
          if (value == null || value === "" || value === "ALL") {
            next.delete(key);
          } else {
            next.set(key, value);
          }
        }
        return next;
      });
    });
  };

  const companyNodes = useMemo(
    () => state.orgTreeNodes.filter((node) => node.type === "COMPANY"),
    [state.orgTreeNodes]
  );

  const companyRows = useMemo(() => {
    return state.companyTiers
      .filter((tier) => (companyFilter === "ALL" ? true : tier.companyId === companyFilter))
      .map((tier) => {
        const companyNode = companyNodes.find((node) => node.organizationId === tier.companyId);
        const targetCount = Math.max(1, (companyNode?.positionCount ?? 0) * 4);
        const progressPct = Math.min(100, Math.round(((companyNode?.kpiCount ?? 0) / targetCount) * 100));
        return {
          ...tier,
          positionCount: companyNode?.positionCount ?? 0,
          kpiCount: companyNode?.kpiCount ?? 0,
          pendingApprovalCount: companyNode?.pendingApprovalCount ?? 0,
          progressPct,
        };
      });
  }, [companyFilter, companyNodes, state.companyTiers]);

  const filteredAdjustments = useMemo(() => {
    return state.hqAdjustments.filter((adjustment) => {
      if (statusFilter !== "ALL" && adjustment.status !== statusFilter) {
        return false;
      }
      if (requestTypeFilter !== "ALL" && adjustment.type !== requestTypeFilter) {
        return false;
      }
      if (deferredQuery) {
        const haystack = [
          adjustment.id,
          adjustment.type,
          adjustment.justification,
          adjustment.requestedBy,
          adjustment.reviewNotes ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(deferredQuery.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }, [deferredQuery, requestTypeFilter, state.hqAdjustments, statusFilter]);

  const activeAdjustment = useMemo(
    () => state.hqAdjustments.find((adjustment) => adjustment.id === requestId) ?? null,
    [requestId, state.hqAdjustments]
  );

  const filteredCohorts = useMemo(() => {
    return state.cohorts.filter((cohort) => (cohortFilter === "ALL" ? true : cohort.id === cohortFilter));
  }, [cohortFilter, state.cohorts]);

  const filteredCompanyTiers = useMemo(() => {
    return state.companyTiers.filter((tier) => {
      if (companyFilter !== "ALL" && tier.companyId !== companyFilter) {
        return false;
      }
      if (tierFilter !== "ALL" && String(tier.tier) !== tierFilter) {
        return false;
      }
      return true;
    });
  }, [companyFilter, state.companyTiers, tierFilter]);

  const filteredDeadlines = useMemo(() => {
    return state.deadlineConfigs.filter((deadline) => {
      if (phaseFilter !== "ALL" && deadline.phase !== phaseFilter) {
        return false;
      }
      return true;
    });
  }, [phaseFilter, state.deadlineConfigs]);

  const auditRows = useMemo(() => {
    const stateAuditRows = state.auditLog
      .filter((entry) => entry.entityType === "HqAdjustmentRequest" || entry.entityType === "BandKpiFormula" || entry.entityType === "KpiRuleConfig")
      .map((entry) => ({
        id: entry.id,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId ?? "-",
        changedBy: entry.actorEmployeeNumber,
        createdAt: entry.at,
        detail: entry.detail,
      }));

    const hqRows = state.hqAuditLog.map((entry) => ({
      id: entry.id,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId,
      changedBy: entry.changedBy,
      createdAt: entry.createdAt,
      detail: entry.newValue ? JSON.stringify(entry.newValue) : undefined,
    }));

    return [...hqRows, ...stateAuditRows]
      .filter((entry) => {
        if (!deferredQuery) {
          return true;
        }
        return [entry.id, entry.action, entry.entityType, entry.entityId, entry.changedBy, entry.detail ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(deferredQuery.toLowerCase());
      })
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
  }, [deferredQuery, state.auditLog, state.hqAuditLog]);

  const dashboardMetrics = useMemo(() => {
    const approvedTeams = state.teamPlanningStatuses.filter((row) => row.portfolioStatus === "APPROVED").length;
    const openDeadlines = state.deadlineConfigs.filter((deadline) => daysFromToday(deadline.deadlineDate) >= 0).length;
    const pendingAdjustments = state.hqAdjustments.filter((adjustment) => adjustment.status === "PENDING").length;
    const revisionAdjustments = state.hqAdjustments.filter((adjustment) => adjustment.status === "REVISION_REQUESTED").length;
    const averagePendingApproval = companyRows.length
      ? Math.round(companyRows.reduce((sum, row) => sum + row.pendingApprovalCount, 0) / companyRows.length)
      : 0;

    return {
      planningProgress: Math.round((approvedTeams / Math.max(1, state.teamPlanningStatuses.length)) * 100),
      openDeadlines,
      pendingAdjustments,
      revisionAdjustments,
      averagePendingApproval,
    };
  }, [companyRows, state.deadlineConfigs, state.hqAdjustments, state.teamPlanningStatuses]);

  const analyticsBars = useMemo(
    () =>
      companyRows.map((row) => ({
        label: row.companyName.replace("PT ", "").replace("InJourney ", ""),
        value: Math.min(60, row.progressPct),
        detail: `${row.progressPct}% progress · ${row.pendingApprovalCount} pending approval`,
        tone: row.pendingApprovalCount > 2 ? ("warning" as const) : ("primary" as const),
      })),
    [companyRows]
  );

  const cohortRanking = useMemo(
    () =>
      filteredCohorts.map((cohort) => {
        const threshold = state.cohortThresholdConfigs.find((item) => item.cohortId === cohort.id);
        return {
          label: cohort.name,
          description: cohort.description ?? "Cohort governance aktif",
          value: threshold?.upperThreshold != null ? `${threshold.upperThreshold.toFixed(1)} PI` : "Belum dikalibrasi",
          tone: threshold?.method === "MANUAL" ? ("warning" as const) : ("neutral" as const),
        };
      }),
    [filteredCohorts, state.cohortThresholdConfigs]
  );

  const periodMilestones = useMemo(() => {
    const milestones = [
      {
        label: "Planning window",
        start: state.performancePeriod.planningStartDate,
        end: state.performancePeriod.planningEndDate,
        status: state.performancePeriod.phase === "PLANNING" ? "active" : "complete",
      },
      {
        label: "Monitoring checkpoints",
        start: state.checkInSchedules[0]?.windowStart,
        end: state.checkInSchedules[state.checkInSchedules.length - 1]?.windowEnd,
        status: state.performancePeriod.phase === "MONITORING" ? "active" : state.performancePeriod.phase === "YEAR_END" ? "complete" : "upcoming",
      },
      {
        label: "Year-end scoring",
        start: state.performancePeriod.yearEndStartDate,
        end: state.performancePeriod.yearEndEndDate,
        status: state.performancePeriod.phase === "YEAR_END" ? "active" : "upcoming",
      },
    ];
    return milestones;
  }, [state.checkInSchedules, state.performancePeriod]);

  const saveBandFormula = () => {
    if (!editingFormulaId) {
      return;
    }
    const bersama = safeNumber(formulaDraft.bersama);
    const unit = safeNumber(formulaDraft.unit);
    if (bersama == null || unit == null) {
      return;
    }
    updateBandFormula(editingFormulaId, bersama, unit);
    setEditingFormulaId(null);
  };

  const saveRuleConfig = () => {
    updateKpiRuleConfig({
      minItemsPerType: parseOptionalNumber(ruleDraft.minItemsPerType),
      maxItemsPerType: parseNullableNumber(ruleDraft.maxItemsPerType),
      minWeightPerItemPct: parseOptionalNumber(ruleDraft.minWeightPerItemPct),
      maxWeightPerItemPct: parseOptionalNumber(ruleDraft.maxWeightPerItemPct),
      globalCapType: ruleDraft.globalCapType,
      categoryBasedScoringEnabled: ruleDraft.categoryBasedScoringEnabled,
    });
  };

  const openReviewDialog = (status: "APPROVED" | "REJECTED" | "REVISION_REQUESTED") => {
    setReviewAction(status);
    setReviewDialogOpen(true);
  };

  const submitAdjustmentReview = () => {
    if (!activeAdjustment) {
      return;
    }
    reviewHqAdjustment(activeAdjustment.id, {
      status: reviewAction,
      reviewNotes,
      reviewedAt: new Date().toISOString(),
      reviewedBy: actingAsEmployeeNumber,
    });
    setReviewDialogOpen(false);
    setReviewNotes("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <PageHeading
        eyebrow="Performance 2.0"
        title="KPI Headquarter"
        description="Governance cockpit untuk periode, kebijakan, adjustment, scoring, dan audit lintas perusahaan."
      />
      <PersonaContextBar />

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Periode aktif {state.performancePeriod.year} · fase {state.performancePeriod.phase}
              </p>
              <p className="text-sm text-muted-foreground">
                Gunakan tab dan query-state untuk deep-link review kebijakan, antrian adjustment, dan audit trail.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Field>
                <FieldLabel htmlFor="hq-year">Tahun</FieldLabel>
                <Input id="hq-year" value={yearFilter} onChange={(event) => updateQuery({ year: event.target.value })} />
              </Field>
              <Field>
                <FieldLabel>Fase</FieldLabel>
                <Select value={phaseFilter} onValueChange={(value) => updateQuery({ phase: value })}>
                  <SelectTrigger aria-label="Filter fase">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PHASE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option === "ALL" ? "Semua fase" : option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Perusahaan</FieldLabel>
                <Select value={companyFilter} onValueChange={(value) => updateQuery({ companyId: value })}>
                  <SelectTrigger aria-label="Filter perusahaan">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua perusahaan</SelectItem>
                    {state.companyTiers.map((tier) => (
                      <SelectItem key={tier.companyId} value={tier.companyId}>
                        {tier.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="hq-search">Pencarian</FieldLabel>
                <SearchInput
                  id="hq-search"
                  value={query}
                  onChange={(event) => updateQuery({ q: event.target.value })}
                  placeholder="Cari adjustment, audit, atau cohort"
                  aria-label="Cari data KPI HQ"
                />
              </Field>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={section} onValueChange={(value) => updateQuery({ tab: value })} className="space-y-4">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 rounded-xl bg-muted/60 p-1">
          {HQ_SECTIONS.map((item) => (
            <TabsTrigger key={item.value} value={item.value} className="rounded-lg px-4 py-2">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              label="Planning progress"
              value={`${dashboardMetrics.planningProgress}%`}
              description="Proporsi portofolio bawahan yang sudah berstatus approved."
              trend={`${state.performancePeriod.phase}`}
              trendTone="success"
            />
            <MetricCard
              label="Open deadline"
              value={dashboardMetrics.openDeadlines}
              description="Deadline config yang masih aktif di fase berjalan."
              supportingValue={`Scope ${companyFilter === "ALL" ? "semua perusahaan" : companyFilter}`}
            />
            <MetricCard
              label="Pending adjustment"
              value={dashboardMetrics.pendingAdjustments}
              description="Permintaan yang menunggu review HQ."
              trend={dashboardMetrics.pendingAdjustments > 0 ? "Butuh keputusan" : "Terkendali"}
              trendTone={dashboardMetrics.pendingAdjustments > 0 ? "warning" : "success"}
            />
            <MetricCard
              label="Revisi diminta"
              value={dashboardMetrics.revisionAdjustments}
              description="Adjustment yang harus dikembalikan ke pengusul."
              trend={dashboardMetrics.revisionAdjustments > 0 ? "Follow up" : "0 blocker"}
              trendTone={dashboardMetrics.revisionAdjustments > 0 ? "warning" : "neutral"}
            />
            <MetricCard
              label="Avg pending approval"
              value={dashboardMetrics.averagePendingApproval}
              description="Rata-rata item yang masih menunggu approval per company tier."
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Company governance pulse</CardTitle>
                <CardDescription>Ringkasan progress, pending approval, dan urgensi review lintas entitas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {companyRows.map((row) => (
                  <div key={row.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-foreground">{row.companyName}</p>
                          <Badge variant="neutral">Tier {row.tier}</Badge>
                          <Badge variant={row.pendingApprovalCount > 2 ? "warning" : "success"}>
                            {row.pendingApprovalCount} pending approval
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{row.characteristics}</p>
                      </div>
                      <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                        <FieldValue label="Posisi" value={String(row.positionCount)} />
                        <FieldValue label="KPI" value={String(row.kpiCount)} />
                        <FieldValue label="Progress" value={`${row.progressPct}%`} />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>Arahkan reviewer ke modul governance terkait tanpa keluar dari konteks HQ.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-between" variant="outline" asChild>
                  <Link to="/performance-v2/kpi-library">Buka Kamus KPI</Link>
                </Button>
                <Button className="w-full justify-between" variant="outline" asChild>
                  <Link to="/performance-v2/kpi-tree">Buka KPI Tree</Link>
                </Button>
                <Button className="w-full justify-between" variant="secondary" onClick={() => updateQuery({ tab: "adjustments" })}>
                  Review adjustment queue
                </Button>
                <Button className="w-full justify-between" variant="secondary" onClick={() => updateQuery({ tab: "audit" })}>
                  Audit governance log
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Milestone periode</CardTitle>
                <CardDescription>Timeline fase utama untuk memastikan gating governance tidak bertabrakan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {periodMilestones.map((milestone) => (
                  <div key={milestone.label} className="rounded-xl border border-border bg-muted/20 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-foreground">{milestone.label}</p>
                      <Badge
                        variant={
                          milestone.status === "active"
                            ? "info"
                            : milestone.status === "complete"
                              ? "success"
                              : "neutral"
                        }
                      >
                        {milestone.status === "active" ? "Sedang aktif" : milestone.status === "complete" ? "Selesai" : "Berikutnya"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {formatDate(milestone.start)} - {formatDate(milestone.end)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <ProgressCluster
              items={filteredDeadlines.map((deadline) => {
                const daysLeft = daysFromToday(deadline.deadlineDate);
                return {
                  label: `${deadline.phase}${deadline.period ? ` · ${deadline.period}` : ""}`,
                  value: Math.max(0, Math.min(100, 100 - Math.max(0, daysLeft * 8))),
                  description: `${formatDate(deadline.deadlineDate)} · ${deadline.penaltyType}`,
                  variant: daysLeft < 0 ? "destructive" : daysLeft <= 2 ? "warning" : "success",
                };
              })}
            />
          </div>
        </TabsContent>

        <TabsContent value="periods" className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Periode aktif</CardTitle>
                <CardDescription>Snapshot pengaturan periode dan monitoring cadence sesuai DIP-7.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <FieldValue label="ID periode" value={state.performancePeriod.id} />
                <FieldValue label="Status" value={state.performancePeriod.status} />
                <FieldValue label="Planning" value={`${formatDate(state.performancePeriod.planningStartDate)} - ${formatDate(state.performancePeriod.planningEndDate)}`} />
                <FieldValue label="Year end" value={`${formatDate(state.performancePeriod.yearEndStartDate)} - ${formatDate(state.performancePeriod.yearEndEndDate)}`} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monitoring schedule</CardTitle>
                <CardDescription>Window check-in yang dipakai untuk cadence realisasi dan verifikasi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {state.checkInSchedules.map((schedule) => (
                  <div key={schedule.id} className="rounded-lg border border-border bg-muted/20 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-foreground">{schedule.period}</p>
                      <Badge variant={schedule.status === "OPEN" ? "success" : schedule.status === "CLOSED" ? "neutral" : "warning"}>
                        {schedule.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(schedule.windowStart)} - {formatDate(schedule.windowEnd)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Deadline & extension policy</CardTitle>
              <CardDescription>URL filter `phase` akan menyaring tabel ini untuk review yang lebih fokus.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fase</TableHead>
                    <TableHead>Periode</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Penalty</TableHead>
                    <TableHead>Rule extension</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeadlines.map((deadline) => {
                    const badge = badgeForDeadline(daysFromToday(deadline.deadlineDate));
                    return (
                      <TableRow key={deadline.id}>
                        <TableCell>{deadline.phase}</TableCell>
                        <TableCell>{deadline.period ?? "-"}</TableCell>
                        <TableCell>{formatDate(deadline.deadlineDate)}</TableCell>
                        <TableCell>{deadline.penaltyType}</TableCell>
                        <TableCell>
                          {deadline.extensionMaxDays != null ? `Maks ${deadline.extensionMaxDays} hari` : "Tidak diatur"}
                          {deadline.extensionMaxRequests != null ? ` · ${deadline.extensionMaxRequests} kali` : ""}
                          {deadline.autoApproveTimeoutDays != null ? ` · auto-approve ${deadline.autoApproveTimeoutDays} hari` : ""}
                        </TableCell>
                        <TableCell>
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Band formula editor</CardTitle>
                <CardDescription>Gunakan action store untuk menyesuaikan bobot KPI Bersama dan KPI Unit per band.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Band</TableHead>
                      <TableHead>Job type</TableHead>
                      <TableHead>Bersama</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Effective</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {state.bandFormulas.map((formula) => {
                      const isEditing = editingFormulaId === formula.id;
                      return (
                        <TableRow key={formula.id}>
                          <TableCell>{formula.bandJabatan}</TableCell>
                          <TableCell>{formula.jobType}</TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input
                                value={formulaDraft.bersama}
                                onChange={(event) => setFormulaDraft((current) => ({ ...current, bersama: event.target.value }))}
                                aria-label={`Bobot KPI Bersama untuk ${formula.bandJabatan}`}
                              />
                            ) : (
                              `${formula.kpiBersamaWeightPct}%`
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <Input
                                value={formulaDraft.unit}
                                onChange={(event) => setFormulaDraft((current) => ({ ...current, unit: event.target.value }))}
                                aria-label={`Bobot KPI Unit untuk ${formula.bandJabatan}`}
                              />
                            ) : (
                              `${formula.kpiUnitWeightPct}%`
                            )}
                          </TableCell>
                          <TableCell>{formatDate(formula.effectiveFrom)}</TableCell>
                          <TableCell className="text-right">
                            {isEditing ? (
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={() => setEditingFormulaId(null)}>
                                  Batal
                                </Button>
                                <Button size="sm" onClick={saveBandFormula}>
                                  Simpan
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingFormulaId(formula.id);
                                  setFormulaDraft({
                                    bersama: String(formula.kpiBersamaWeightPct),
                                    unit: String(formula.kpiUnitWeightPct),
                                  });
                                }}
                              >
                                Edit
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Global rule config</CardTitle>
                <CardDescription>Pengaturan validasi portofolio dan scoring default yang persist ke shared store.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldGroup className="sm:grid sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="min-items">Min item per type</FieldLabel>
                    <Input id="min-items" value={ruleDraft.minItemsPerType} onChange={(event) => setRuleDraft((current) => ({ ...current, minItemsPerType: event.target.value }))} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="max-items">Max item per type</FieldLabel>
                    <Input id="max-items" value={ruleDraft.maxItemsPerType} onChange={(event) => setRuleDraft((current) => ({ ...current, maxItemsPerType: event.target.value }))} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="min-weight">Min weight per item</FieldLabel>
                    <Input id="min-weight" value={ruleDraft.minWeightPerItemPct} onChange={(event) => setRuleDraft((current) => ({ ...current, minWeightPerItemPct: event.target.value }))} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="max-weight">Max weight per item</FieldLabel>
                    <Input id="max-weight" value={ruleDraft.maxWeightPerItemPct} onChange={(event) => setRuleDraft((current) => ({ ...current, maxWeightPerItemPct: event.target.value }))} />
                  </Field>
                </FieldGroup>

                <Field>
                  <FieldLabel>Cap global</FieldLabel>
                  <Select value={ruleDraft.globalCapType} onValueChange={(value) => setRuleDraft((current) => ({ ...current, globalCapType: value as CapType }))}>
                    <SelectTrigger aria-label="Pilih cap global">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["NO_CAP", "CAPPED_100", "CAPPED_110", "CAPPED_120"].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Category-based scoring</FieldLabel>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={ruleDraft.categoryBasedScoringEnabled ? "default" : "outline"}
                      onClick={() => setRuleDraft((current) => ({ ...current, categoryBasedScoringEnabled: true }))}
                    >
                      Aktif
                    </Button>
                    <Button
                      type="button"
                      variant={!ruleDraft.categoryBasedScoringEnabled ? "default" : "outline"}
                      onClick={() => setRuleDraft((current) => ({ ...current, categoryBasedScoringEnabled: false }))}
                    >
                      Nonaktif
                    </Button>
                  </div>
                  <FieldDescription>Gunakan toggle ini untuk mensimulasikan aturan global sebelum route-level settings dipisah oleh main agent.</FieldDescription>
                </Field>

                <Button className="w-full" onClick={saveRuleConfig}>
                  Simpan global rules
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rating scale</CardTitle>
                <CardDescription>Konfigurasi score banding untuk year close dan calibration panel.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="info">{state.ratingScaleConfig.method}</Badge>
                  <Badge variant="neutral">FY {state.ratingScaleConfig.year}</Badge>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rating</TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead>PI range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {state.ratingScaleConfig.scale.map((row) => (
                      <TableRow key={row.rating}>
                        <TableCell>{row.rating}</TableCell>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>
                          {row.piMin} - {row.piMax}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cohort & threshold governance</CardTitle>
                <CardDescription>Kalibrasi cohort yang akan dipakai untuk population-based distribution bila diaktifkan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredCohorts.map((cohort) => {
                  const threshold = state.cohortThresholdConfigs.find((item) => item.cohortId === cohort.id);
                  return (
                    <div key={cohort.id} className="rounded-xl border border-border bg-muted/20 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-foreground">{cohort.name}</p>
                        <Badge variant={threshold?.method === "MANUAL" ? "warning" : "success"}>
                          {threshold?.method ?? "Belum diatur"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{cohort.description}</p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Threshold: {threshold?.lowerThreshold ?? "-"} / {threshold?.medianPI ?? "-"} / {threshold?.upperThreshold ?? "-"}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="adjustments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adjustment queue</CardTitle>
              <CardDescription>Review perubahan target, bobot, maupun add/remove item dengan SLA dan catatan reviewer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select value={statusFilter} onValueChange={(value) => updateQuery({ status: value })}>
                    <SelectTrigger aria-label="Filter status adjustment">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ADJUSTMENT_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "ALL" ? "Semua status" : option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Jenis request</FieldLabel>
                  <Select value={requestTypeFilter} onValueChange={(value) => updateQuery({ requestType: value })}>
                    <SelectTrigger aria-label="Filter jenis request">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ADJUSTMENT_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "ALL" ? "Semua request" : option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="adj-search">Cari adjustment</FieldLabel>
                  <SearchInput
                    id="adj-search"
                    value={query}
                    onChange={(event) => updateQuery({ q: event.target.value })}
                    placeholder="Cari ID, justifikasi, atau review note"
                    aria-label="Cari adjustment"
                  />
                </Field>
              </div>

              {filteredAdjustments.length === 0 ? (
                <EmptyState title="Tidak ada adjustment yang cocok" description="Ubah filter status, jenis request, atau kata kunci pencarian." />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>SLA</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Summary</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAdjustments.map((adjustment) => {
                        const deadline = badgeForDeadline(daysFromToday(adjustment.slaDeadline));
                        return (
                          <TableRow key={adjustment.id}>
                            <TableCell className="font-medium text-foreground">{adjustment.id}</TableCell>
                            <TableCell>{getEmployeeDisplay(adjustment.requestedBy)}</TableCell>
                            <TableCell>{adjustment.type}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p>{formatDate(adjustment.slaDeadline)}</p>
                                <Badge variant={deadline.variant}>{deadline.label}</Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={badgeForAdjustmentStatus(adjustment.status)}>{adjustment.status}</Badge>
                            </TableCell>
                            <TableCell className="max-w-sm">
                              <p className="line-clamp-2 text-sm text-muted-foreground">{adjustment.justification}</p>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline" onClick={() => updateQuery({ requestId: adjustment.id })}>
                                Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year-close" className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mutation scoring policy</CardTitle>
                <CardDescription>Rule untuk scoring ketika karyawan mengalami mutasi di tengah tahun.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <FieldValue label="Metode proration" value={state.mutationScoringPolicy.proRataMethod} />
                <FieldValue label="Minimum durasi" value={`${state.mutationScoringPolicy.minimumDurationMonths} bulan`} />
                <FieldValue label="Cutoff day" value={`Tanggal ${state.mutationScoringPolicy.cutoffDay}`} />
                <FieldValue label="Carry over" value={state.mutationScoringPolicy.carryOverEnabled ? "Aktif" : "Nonaktif"} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indisciplinary overrides</CardTitle>
                <CardDescription>Daftar override yang memengaruhi distribution atau cap rating saat year close.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {state.indisciplinaryOverrides.map((override) => (
                  <div key={override.id} className="rounded-xl border border-border bg-muted/20 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">{getEmployeeDisplay(override.employeeNumber)}</p>
                      <Badge variant="warning">{override.overrideType}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{override.reason}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Applied by {getEmployeeDisplay(override.appliedBy)} · {formatDateTime(override.createdAt)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Company tier matrix</CardTitle>
                <CardDescription>Governance target per company tier untuk KPI Bersama dan calibration breadth.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Characteristic</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanyTiers.map((tier) => (
                      <TableRow key={tier.id}>
                        <TableCell>{tier.companyName}</TableCell>
                        <TableCell>
                          <Badge variant="neutral">Tier {tier.tier}</Badge>
                        </TableCell>
                        <TableCell>{tier.characteristics}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPI Bersama central items</CardTitle>
                <CardDescription>Target per tier yang menjadi baseline untuk cascade KPI bersama.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {state.kpiBersamaCentralItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-border bg-muted/20 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <Badge variant="info">{item.dictionaryItemId ?? "Manual governance item"}</Badge>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {item.tierTargets.map((target) => (
                        <div key={target.tierId} className="flex items-center justify-between gap-3">
                          <span>{state.companyTiers.find((tier) => tier.id === target.tierId)?.companyName ?? target.tierId}</span>
                          <span className="font-medium text-foreground">
                            {target.targetValue} {target.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Total cohort"
              value={state.cohorts.length}
              description="Cohort aktif untuk calibration dan governance."
            />
            <MetricCard
              label="Tiered company"
              value={state.companyTiers.length}
              description="Perusahaan dengan tier governance aktif."
            />
            <MetricCard
              label="Central KPI"
              value={state.kpiBersamaCentralItems.length}
              description="Item KPI Bersama yang dikendalikan HQ."
            />
            <MetricCard
              label="Audit entries"
              value={auditRows.length}
              description="Gabungan HQ audit log dan action store terbaru."
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Progress per company</CardTitle>
                <CardDescription>Progress dibangun dari kombinasi org tree, KPI count, dan pending approvals.</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart data={analyticsBars} yAxisLabel="Progress governance" xAxisLabel="Company tier" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calibration readiness</CardTitle>
                <CardDescription>Memantau kesiapan threshold dan ketersediaan anggota cohort.</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressCluster
                  items={state.cohorts.map((cohort) => ({
                    label: cohort.name,
                    value: Math.min(100, Math.round((cohort.employeeCount / Math.max(1, cohort.positionCount)) * 100)),
                    description: `${cohort.employeeCount} employee / ${cohort.positionCount} posisi`,
                    variant: cohort.employeeCount >= cohort.positionCount ? "success" : "warning",
                  }))}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Threshold ranking</CardTitle>
                <CardDescription>Urutan cohort berdasarkan upper threshold yang siap dipakai saat distribution review.</CardDescription>
              </CardHeader>
              <CardContent>
                {cohortRanking.length > 0 ? (
                  <RankingList items={cohortRanking} />
                ) : (
                  <EmptyState title="Belum ada cohort terfilter" description="Pilih cohort yang tersedia atau reset filter cohort." />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk concentration</CardTitle>
                <CardDescription>Rangkuman entitas dengan beban pending approval dan SLA adjustment tertinggi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {companyRows
                  .slice()
                  .sort((left, right) => right.pendingApprovalCount - left.pendingApprovalCount)
                  .map((row) => (
                    <div key={row.id} className="rounded-xl border border-border bg-muted/20 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-foreground">{row.companyName}</p>
                        <Badge variant={row.pendingApprovalCount > 2 ? "warning" : "success"}>
                          {row.pendingApprovalCount} pending
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Tier {row.tier} · {row.progressPct}% governance progress
                      </p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Governance audit trail</CardTitle>
              <CardDescription>Gabungan audit HQ fixture dan action baru yang dihasilkan dari review/konfigurasi modul ini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {auditRows.length === 0 ? (
                <EmptyState title="Audit belum ditemukan" description="Tidak ada entri audit yang cocok dengan query saat ini." />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Waktu</TableHead>
                        <TableHead>Aksi</TableHead>
                        <TableHead>Entity</TableHead>
                        <TableHead>Actor</TableHead>
                        <TableHead>Detail</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditRows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{formatDateTime(row.createdAt)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                row.action in {
                                  CONFIG_CHANGED: true,
                                  PERIOD_OPENED: true,
                                  PERIOD_CLOSED: true,
                                  FORCE_FINALIZED: true,
                                  YEAR_CLOSED: true,
                                  OVERRIDE_APPLIED: true,
                                  ADJUSTMENT_REVIEWED: true,
                                }
                                  ? badgeForAuditAction(row.action as HqAuditLog["action"])
                                  : "neutral"
                              }
                            >
                              {row.action}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{row.entityType}</p>
                              <p className="text-xs text-muted-foreground">{row.entityId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getEmployeeDisplay(row.changedBy)}</TableCell>
                          <TableCell className="max-w-md whitespace-normal text-sm text-muted-foreground">{row.detail ?? "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Sheet open={activeAdjustment != null} onOpenChange={(open) => !open && updateQuery({ requestId: null })}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          {activeAdjustment ? (
            <>
              <SheetHeader className="border-b border-border pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info">{activeAdjustment.type}</Badge>
                  <Badge variant={badgeForAdjustmentStatus(activeAdjustment.status)}>{activeAdjustment.status}</Badge>
                </div>
                <SheetTitle>{activeAdjustment.id}</SheetTitle>
                <SheetDescription>
                  Review permintaan dari {getEmployeeDisplay(activeAdjustment.requestedBy)} dengan SLA {formatDate(activeAdjustment.slaDeadline)}.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FieldValue label="Requested by" value={getEmployeeDisplay(activeAdjustment.requestedBy)} />
                  <FieldValue label="Created at" value={formatDateTime(activeAdjustment.createdAt)} />
                  <FieldValue label="Reviewed by" value={activeAdjustment.reviewedBy ? getEmployeeDisplay(activeAdjustment.reviewedBy) : "Belum direview"} />
                  <FieldValue label="Reviewed at" value={formatDateTime(activeAdjustment.reviewedAt)} />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Justifikasi</p>
                  <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground">
                    {activeAdjustment.justification}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Old value</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted/40 p-3">{JSON.stringify(activeAdjustment.oldValue ?? {}, null, 2)}</pre>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">New value</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted/40 p-3">{JSON.stringify(activeAdjustment.newValue ?? {}, null, 2)}</pre>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <Field>
                  <FieldLabel htmlFor="review-notes">Catatan reviewer</FieldLabel>
                  <Textarea
                    id="review-notes"
                    value={reviewNotes}
                    onChange={(event) => setReviewNotes(event.target.value)}
                    placeholder="Tuliskan alasan approval, rejection, atau permintaan revisi"
                  />
                </Field>
              </div>

              <SheetFooter className="border-t border-border pt-4 sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => openReviewDialog("REVISION_REQUESTED")}>
                    Minta revisi
                  </Button>
                  <Button variant="outline" onClick={() => openReviewDialog("REJECTED")}>
                    Tolak
                  </Button>
                </div>
                <Button onClick={() => openReviewDialog("APPROVED")}>Approve adjustment</Button>
              </SheetFooter>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi review adjustment</DialogTitle>
            <DialogDescription>
              Aksi ini akan mengubah status adjustment menjadi {reviewAction}. Pastikan catatan reviewer sudah sesuai.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={submitAdjustmentReview}>Konfirmasi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
