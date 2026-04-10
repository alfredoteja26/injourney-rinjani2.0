import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  ActionChip,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@rinjani/shared-ui";
import type {
  CascadeRelation,
  KpiItem,
  KpiItemApprovalStatus,
  KpiRealization,
  KpiScoreRow,
  KpiTarget,
  PeriodKey,
  Polarity,
} from "../../lib/domain/types";
import {
  getBandFormulaForEmployee,
  isKpiItemBlockedForPlanningTargetOrWeight,
  portfolioScoreForEmployee,
  usePerformanceV2,
  usePerformanceV2Portfolio,
} from "../../lib/store/performance-v2-store";
import { KpiStatusBadge } from "../../ui/kpi-status-badge";

export type PortfolioViewMode = "table" | "list" | "hierarchy";

type PortfolioSectionKey = "BERSAMA" | "UNIT";

const LS_PLANNING_COLS_KEY = "rinjani-performance-v2-portfolio-planning-cols-v1";
const LS_MONITORING_COLS_KEY = "rinjani-performance-v2-portfolio-monitoring-cols-v1";

function portfolioColumnStorageKeys(portfolioOwnerNik: string, viewerNik: string): { planning: string; monitoring: string } {
  const suffix = portfolioOwnerNik === viewerNik ? "" : `-owner-${portfolioOwnerNik}`;
  return {
    planning: `${LS_PLANNING_COLS_KEY}${suffix}`,
    monitoring: `${LS_MONITORING_COLS_KEY}${suffix}`,
  };
}

type TableSort = { columnId: string; direction: "asc" | "desc" } | null;

type PlanningLandingColId =
  | "no"
  | "title"
  | "target"
  | "typeWeight"
  | "itemWeight"
  | "polarity"
  | "bsc"
  | "targetType"
  | "status"
  | "source"
  | "actions";

type MonitoringLandingColId =
  | "no"
  | "title"
  | "target"
  | "itemWeight"
  | "realizations"
  | "verification"
  | "evidence"
  | "polarity"
  | "actions";

const DEFAULT_PLANNING_COL_VISIBILITY: Record<PlanningLandingColId, boolean> = {
  no: true,
  title: true,
  target: true,
  typeWeight: true,
  itemWeight: true,
  polarity: false,
  bsc: false,
  targetType: false,
  status: true,
  source: false,
  actions: true,
};

const DEFAULT_MONITORING_COL_VISIBILITY: Record<MonitoringLandingColId, boolean> = {
  no: true,
  title: true,
  target: true,
  itemWeight: true,
  realizations: true,
  verification: true,
  evidence: true,
  polarity: false,
  actions: true,
};

const PLANNING_STATUS_FILTER_ALL = "__all__";

function loadColVisibility<T extends string>(
  key: string,
  defaults: Record<T, boolean>
): Record<T, boolean> {
  if (typeof window === "undefined") {
    return { ...defaults };
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return { ...defaults };
    }
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    const next = { ...defaults };
    for (const k of Object.keys(defaults) as T[]) {
      if (typeof parsed[k] === "boolean") {
        next[k] = parsed[k];
      }
    }
    return next;
  } catch {
    return { ...defaults };
  }
}

function saveColVisibility(key: string, vis: Record<string, boolean>) {
  try {
    window.localStorage.setItem(key, JSON.stringify(vis));
  } catch {
    /* ignore */
  }
}

function realizationVerificationRollup(rs: KpiRealization[]): string {
  if (rs.length === 0) {
    return "Belum ada entri";
  }
  const d = rs.filter((r) => r.status === "DRAFT").length;
  const s = rs.filter((r) => r.status === "SUBMITTED").length;
  const ok = rs.filter((r) => r.status === "VERIFIED" || r.status === "ADJUSTED").length;
  const parts: string[] = [];
  if (d > 0) {
    parts.push(`${d} draf`);
  }
  if (s > 0) {
    parts.push(`${s} tunggu verif.`);
  }
  if (ok > 0) {
    parts.push(`${ok} OK`);
  }
  return parts.length > 0 ? parts.join(" · ") : rs.map((r) => r.status).join(", ");
}

type StatusChipId = "draft" | "allocated" | "approved" | "waiting";

type MonitoringFilterId = "all" | "draft" | "submitted" | "verified";

function periodSortKey(p: PeriodKey): number {
  const order: PeriodKey[] = ["Q1", "Q2", "Q3", "Q4", "S1", "S2", "ANNUAL"];
  const i = order.indexOf(p);
  return i >= 0 ? i : 99;
}

function itemMatchesMonitoringFilter(item: KpiItem, filter: MonitoringFilterId, employeeReals: KpiRealization[]): boolean {
  if (filter === "all") {
    return true;
  }
  const rs = employeeReals.filter((r) => r.kpiItemId === item.id);
  if (filter === "draft") {
    return rs.some((r) => r.status === "DRAFT");
  }
  if (filter === "submitted") {
    return rs.some((r) => r.status === "SUBMITTED");
  }
  if (filter === "verified") {
    return rs.some((r) => r.status === "VERIFIED" || r.status === "ADJUSTED");
  }
  return true;
}

const CHIP_MATCH: Record<StatusChipId, (s: KpiItemApprovalStatus) => boolean> = {
  draft: (s) => s === "DRAFT",
  allocated: (s) => s === "ALLOCATED",
  approved: (s) => s === "APPROVED" || s === "APPROVED_ADJUSTED",
  waiting: (s) => s === "WAITING_FOR_APPROVAL",
};

function itemMatchesChips(item: KpiItem, chips: Set<StatusChipId>): boolean {
  if (chips.size === 0) {
    return true;
  }
  for (const c of chips) {
    if (CHIP_MATCH[c](item.itemApprovalStatus)) {
      return true;
    }
  }
  return false;
}

function polarityCell(p: Polarity) {
  if (p === "POSITIVE") {
    return <span className="text-emerald-700">↑ Positif</span>;
  }
  if (p === "NEGATIVE") {
    return <span className="text-rose-700">↓ Negatif</span>;
  }
  return <span className="text-muted-foreground">→ Netral</span>;
}

function hierarchyRowsWithDepth(items: KpiItem[]): { item: KpiItem; depth: number }[] {
  const ids = new Set(items.map((i) => i.id));
  const roots = items.filter((i) => !i.parentKpiId || !ids.has(i.parentKpiId));
  const out: { item: KpiItem; depth: number }[] = [];
  const walk = (node: KpiItem, depth: number) => {
    out.push({ item: node, depth });
    for (const c of items.filter((x) => x.parentKpiId === node.id)) {
      walk(c, depth + 1);
    }
  };
  for (const r of roots) {
    walk(r, 0);
  }
  return out;
}

function cascadeHint(
  item: KpiItem,
  cascadeRelations: CascadeRelation[],
  kpiById: Map<string, KpiItem>
): string | null {
  if (!item.parentKpiId) {
    return null;
  }
  const rel = cascadeRelations.find((c) => c.childKpiId === item.id);
  const parent = kpiById.get(item.parentKpiId);
  const method = rel?.cascadeMethod ?? "DIRECT";
  const parentLabel = parent?.title ?? item.parentKpiId;
  return `${method} · induk: ${parentLabel}`;
}

function targetSummary(item: KpiItem, targets: KpiTarget[] | undefined): string {
  if (item.targetType === "PROGRESSIVE") {
    const rows = targets ?? [];
    if (rows.length > 0) {
      const parts = [...rows]
        .sort((a, b) => a.period.localeCompare(b.period))
        .map((t) => `${t.period}: ${t.targetValue}`)
        .slice(0, 4);
      const extra = rows.length > 4 ? "…" : "";
      return `${parts.join(" · ")}${extra}`;
    }
    return "Progresif — lengkapi periode";
  }
  if (item.targetValue != null) {
    return `${item.targetValue} ${item.targetUnit}`;
  }
  return "—";
}

function SortHeaderButton({
  label,
  active,
  direction,
  sortable,
  onClick,
}: {
  label: string;
  active: boolean;
  direction: "asc" | "desc" | undefined;
  sortable: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground disabled:cursor-default disabled:opacity-60"
      disabled={!sortable}
      onClick={onClick}
    >
      {label}
      {sortable ? (
        active ? (
          direction === "asc" ? (
            <ArrowUp className="size-3.5 shrink-0" aria-hidden />
          ) : (
            <ArrowDown className="size-3.5 shrink-0" aria-hidden />
          )
        ) : (
          <ArrowUpDown className="size-3.5 shrink-0 opacity-45" aria-hidden />
        )
      ) : null}
    </button>
  );
}

function planningLandingActions(
  item: KpiItem,
  sectionVariant: "bersama" | "unit",
  ctx: {
    viewContext: "self" | "managerReview";
    phase: "planning" | "monitoring";
    onSelectKpi?: (item: KpiItem) => void;
  }
) {
  if (ctx.viewContext === "managerReview") {
    return (
      <div className="flex flex-col items-start gap-1">
        {ctx.onSelectKpi ? (
          <Button type="button" variant="secondary" size="sm" className="h-8 text-xs" onClick={() => ctx.onSelectKpi?.(item)}>
            Detail
          </Button>
        ) : null}
        {ctx.phase === "monitoring" ? (
          <Button type="button" variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
            <Link to="/performance-v2/my-team-kpi/monitoring">Antrian verifikasi</Link>
          </Button>
        ) : null}
      </div>
    );
  }

  const st = item.itemApprovalStatus;
  if (sectionVariant === "bersama") {
    return (
      <Button type="button" variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
        <Link to="/performance-v2/my-kpi/planning">Detail</Link>
      </Button>
    );
  }
  if (st === "WAITING_REVIEW") {
    return (
      <Button type="button" size="sm" className="h-8 text-xs" asChild>
        <Link to="/performance-v2/my-kpi/planning#path-b">Tinjau usulan</Link>
      </Button>
    );
  }
  if (st === "REJECTED" || st === "PENDING_CLARIFICATION") {
    return (
      <Button type="button" size="sm" className="h-8 text-xs" asChild>
        <Link to="/performance-v2/my-kpi/planning">Sesuaikan &amp; lanjutkan</Link>
      </Button>
    );
  }
  if (st === "WAITING_FOR_APPROVAL") {
    return <span className="text-xs text-muted-foreground">Menunggu atasan</span>;
  }
  if (st === "APPROVED" || st === "APPROVED_ADJUSTED") {
    return <span className="text-xs text-muted-foreground">Disetujui</span>;
  }
  return (
    <Button type="button" variant="secondary" size="sm" className="h-8 text-xs" asChild>
      <Link to="/performance-v2/my-kpi/planning">Kelola perencanaan</Link>
    </Button>
  );
}

function WeightSlider({
  value,
  min,
  max,
  readOnly,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  readOnly: boolean;
  onChange: (v: number) => void;
}) {
  if (readOnly) {
    return <span className="tabular-nums text-sm font-medium">{value}%</span>;
  }
  return (
    <div className="flex min-w-[140px] items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full max-w-[120px] cursor-pointer accent-primary"
        aria-label="Bobot KPI"
      />
      <span className="w-10 shrink-0 tabular-nums text-sm">{value}%</span>
    </div>
  );
}

function ViewModeToggle({
  mode,
  onChange,
}: {
  mode: PortfolioViewMode;
  onChange: (m: PortfolioViewMode) => void;
}) {
  const btn = (m: PortfolioViewMode, label: string) => (
    <button
      key={m}
      type="button"
      aria-pressed={mode === m}
      onClick={() => onChange(m)}
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
        mode === m ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/80 text-muted-foreground hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-background/80 p-1" role="group" aria-label="Mode tampilan portofolio">
      {btn("table", "Tabel")}
      {btn("list", "Daftar")}
      {btn("hierarchy", "Hierarki")}
    </div>
  );
}

export interface KpiPortfolioPanelProps {
  title?: string;
  description?: string;
  showViewModeToggle: boolean;
  allowWeightEdit: boolean;
  /** `monitoring` mengaktifkan kolom realisasi + menu aksi dari baris yang sama dengan perencanaan. */
  phase?: "planning" | "monitoring";
  /** Tabel landing ala Stitch: kolom lengkap, toolbar cari + chip status. */
  layoutVariant?: "default" | "landing";
  /** Sembunyikan footer rumus (dipakai saat ringkasan bobot sudah di atas halaman). */
  hideTotalsFooter?: boolean;
  /** Saat layout landing: tampilkan pencarian + chip filter portofolio. Matikan di perencanaan (kamus punya sheet sendiri). */
  showLandingToolbar?: boolean;
  /** Klik judul KPI (perencanaan / demo detail sheet). */
  onSelectKpi?: (item: KpiItem) => void;
  /** Wajib untuk `phase="monitoring"` — buka sheet atau mulai draf realisasi. */
  onMonitoringRealizationAction?: (
    payload:
      | { kind: "open"; realization: KpiRealization }
      | { kind: "start-draft"; kpiItem: KpiItem; period: PeriodKey }
  ) => void;
  /** Portofolio yang ditampilkan (default: persona aktif). */
  portfolioOwnerEmployeeNumber?: string;
  /** `managerReview` = atasan melihat bawahan: bobot read-only, tanpa tautan ke My KPI planning sendiri. */
  viewContext?: "self" | "managerReview";
}

export function KpiPortfolioPanel({
  title = "Portofolio KPI",
  description = "Kelompok KPI Bersama dan Unit; bobot mengikuti rumus band Anda.",
  showViewModeToggle,
  allowWeightEdit,
  phase = "planning",
  layoutVariant = "default",
  hideTotalsFooter = false,
  showLandingToolbar = true,
  onSelectKpi,
  onMonitoringRealizationAction,
  portfolioOwnerEmployeeNumber,
  viewContext = "self",
}: KpiPortfolioPanelProps) {
  const { state, actingAsEmployeeNumber, updateOwnershipWeight } = usePerformanceV2();
  const ownerNik = portfolioOwnerEmployeeNumber ?? actingAsEmployeeNumber;
  const viewerNik = actingAsEmployeeNumber;
  const colKeys = useMemo(() => portfolioColumnStorageKeys(ownerNik, viewerNik), [ownerNik, viewerNik]);
  const { items, ownerships, bersamaTotal, unitTotal, targetsByKpiItemId } = usePerformanceV2Portfolio(ownerNik);
  const canEditWeights = allowWeightEdit && viewContext === "self" && ownerNik === actingAsEmployeeNumber;
  const [viewMode, setViewMode] = useState<PortfolioViewMode>("table");
  const [landingSearch, setLandingSearch] = useState("");
  const [statusChips, setStatusChips] = useState<Set<StatusChipId>>(() => new Set());
  const [monitoringFilter, setMonitoringFilter] = useState<MonitoringFilterId>("all");

  const [planningColVisibility, setPlanningColVisibility] = useState(() =>
    loadColVisibility(colKeys.planning, DEFAULT_PLANNING_COL_VISIBILITY)
  );
  const [monitoringColVisibility, setMonitoringColVisibility] = useState(() =>
    loadColVisibility(colKeys.monitoring, DEFAULT_MONITORING_COL_VISIBILITY)
  );

  useEffect(() => {
    setPlanningColVisibility(loadColVisibility(colKeys.planning, DEFAULT_PLANNING_COL_VISIBILITY));
    setMonitoringColVisibility(loadColVisibility(colKeys.monitoring, DEFAULT_MONITORING_COL_VISIBILITY));
  }, [colKeys.planning, colKeys.monitoring]);
  const [planningSort, setPlanningSort] = useState<Record<PortfolioSectionKey, TableSort>>({
    BERSAMA: null,
    UNIT: null,
  });
  const [monitoringSort, setMonitoringSort] = useState<Record<PortfolioSectionKey, TableSort>>({
    BERSAMA: null,
    UNIT: null,
  });
  type LocalTableFilters = { title: string; status: string; target: string };
  const [planningTableFilters, setPlanningTableFilters] = useState<Record<PortfolioSectionKey, LocalTableFilters>>({
    BERSAMA: { title: "", status: PLANNING_STATUS_FILTER_ALL, target: "" },
    UNIT: { title: "", status: PLANNING_STATUS_FILTER_ALL, target: "" },
  });
  const [monitoringTableFilters, setMonitoringTableFilters] = useState<Record<PortfolioSectionKey, LocalTableFilters>>({
    BERSAMA: { title: "", status: PLANNING_STATUS_FILTER_ALL, target: "" },
    UNIT: { title: "", status: PLANNING_STATUS_FILTER_ALL, target: "" },
  });
  const [monitoringRowFilter, setMonitoringRowFilter] = useState<Record<PortfolioSectionKey, MonitoringFilterId>>({
    BERSAMA: "all",
    UNIT: "all",
  });

  useEffect(() => {
    saveColVisibility(colKeys.planning, planningColVisibility);
  }, [colKeys.planning, planningColVisibility]);

  useEffect(() => {
    saveColVisibility(colKeys.monitoring, monitoringColVisibility);
  }, [colKeys.monitoring, monitoringColVisibility]);

  const togglePlanningSort = useCallback((section: PortfolioSectionKey, columnId: string) => {
    setPlanningSort((prev) => {
      const cur = prev[section];
      if (!cur || cur.columnId !== columnId) {
        return { ...prev, [section]: { columnId, direction: "asc" } };
      }
      if (cur.direction === "asc") {
        return { ...prev, [section]: { columnId, direction: "desc" } };
      }
      return { ...prev, [section]: null };
    });
  }, []);

  const toggleMonitoringSort = useCallback((section: PortfolioSectionKey, columnId: string) => {
    setMonitoringSort((prev) => {
      const cur = prev[section];
      if (!cur || cur.columnId !== columnId) {
        return { ...prev, [section]: { columnId, direction: "asc" } };
      }
      if (cur.direction === "asc") {
        return { ...prev, [section]: { columnId, direction: "desc" } };
      }
      return { ...prev, [section]: null };
    });
  }, []);

  const formula = useMemo(() => getBandFormulaForEmployee(state, ownerNik), [state, ownerNik]);
  const kpiById = useMemo(() => new Map(state.kpiItems.map((k) => [k.id, k])), [state.kpiItems]);
  const minW = state.kpiRuleConfig.minWeightPerItemPct ?? 5;
  const maxW = state.kpiRuleConfig.maxWeightPerItemPct ?? 40;

  const landingToolbarActive = layoutVariant === "landing" && showLandingToolbar;

  const employeeRealizations = useMemo(
    () =>
      state.realizations.filter((r) => {
        const k = kpiById.get(r.kpiItemId);
        return k?.ownerEmployeeNumber === ownerNik;
      }),
    [ownerNik, kpiById, state.realizations]
  );

  const openCheckInSchedule = useMemo(
    () => state.checkInSchedules.find((s) => s.status === "OPEN"),
    [state.checkInSchedules]
  );

  const filteredItems = useMemo(() => {
    if (layoutVariant !== "landing" || !showLandingToolbar) {
      return items;
    }
    const q = landingSearch.trim().toLowerCase();
    return items.filter((item) => {
      const textOk =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.code?.toLowerCase().includes(q) ?? false);
      if (phase === "monitoring") {
        return textOk && itemMatchesMonitoringFilter(item, monitoringFilter, employeeRealizations);
      }
      return textOk && itemMatchesChips(item, statusChips);
    });
  }, [
    items,
    landingSearch,
    layoutVariant,
    showLandingToolbar,
    statusChips,
    phase,
    monitoringFilter,
    employeeRealizations,
  ]);

  const bersamaItems = useMemo(() => filteredItems.filter((i) => i.kpiType === "BERSAMA"), [filteredItems]);
  const unitItems = useMemo(() => filteredItems.filter((i) => i.kpiType === "UNIT"), [filteredItems]);

  const scoreRows: KpiScoreRow[] | null = portfolioScoreForEmployee(state, ownerNik)?.itemScores ?? null;
  const scoreByKpi = useMemo(() => {
    const m = new Map<string, KpiScoreRow>();
    if (scoreRows) {
      for (const r of scoreRows) {
        m.set(r.kpiItemId, r);
      }
    }
    return m;
  }, [scoreRows]);

  function toggleChip(id: StatusChipId) {
    setStatusChips((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function ownershipFor(kpiId: string) {
    return ownerships.find((o) => o.kpiItemId === kpiId);
  }

  function renderRowCells(row: KpiItem, depth: number) {
    const own = ownershipFor(row.id);
    const w = own?.weightPct ?? 0;
    const hint = cascadeHint(row, state.cascadeRelations, kpiById);
    const targets = targetsByKpiItemId.get(row.id);
    const score = scoreByKpi.get(row.id);
    const indentStyle = depth > 0 ? { paddingLeft: `${12 + depth * 16}px` } : undefined;

    return {
      title: (
        <div className="max-w-[240px]" style={indentStyle}>
          {onSelectKpi ? (
            <button
              type="button"
              className="text-left font-medium leading-snug text-foreground hover:text-primary hover:underline"
              onClick={() => onSelectKpi(row)}
            >
              {row.title}
            </button>
          ) : (
            <p className="font-medium leading-snug">{row.title}</p>
          )}
          {hint ? (
            <Badge variant="neutral" className="mt-1 text-[10px] font-normal">
              {hint}
            </Badge>
          ) : null}
        </div>
      ),
      type: row.kpiType,
      weight: (
        <WeightSlider
          value={w}
          min={minW}
          max={maxW}
          readOnly={!canEditWeights || !own || isKpiItemBlockedForPlanningTargetOrWeight(row)}
          onChange={(v) => own && updateOwnershipWeight(own.id, v)}
        />
      ),
      target: targetSummary(row, targets),
      pi:
        score != null ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help tabular-nums text-sm underline decoration-dotted">{score.weightedScore.toFixed(3)}</span>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              Kontribusi PI tertimbang · pencapaian {score.achievementPct}% · PI {score.performanceIndex} · bobot {score.weightPct}%
            </TooltipContent>
          </Tooltip>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
      status: <KpiStatusBadge status={row.itemApprovalStatus} />,
      source: row.source,
    };
  }

  function realizationRowsForItem(kpiId: string): KpiRealization[] {
    return [...employeeRealizations.filter((r) => r.kpiItemId === kpiId)].sort(
      (a, b) => periodSortKey(a.period) - periodSortKey(b.period)
    );
  }

  function renderMonitoringLandingTable(
    sectionItems: KpiItem[],
    sectionVariant: "bersama" | "unit",
    useHierarchyOrder: boolean,
    sectionKey: PortfolioSectionKey
  ) {
    const jenisLabel =
      sectionVariant === "bersama"
        ? `KPI Bersama (${formula.kpiBersamaWeightPct}%)`
        : `KPI Unit (${formula.kpiUnitWeightPct}%)`;
    const subline =
      sectionVariant === "bersama" ? "KPI Bersama (wajib korporat)" : "KPI Unit (disesuaikan dengan unit)";
    const filters = monitoringTableFilters[sectionKey];
    const rowScope = monitoringRowFilter[sectionKey];
    const sort = monitoringSort[sectionKey];
    const vis = monitoringColVisibility;

    let ordered = useHierarchyOrder ? hierarchyRowsWithDepth(sectionItems) : sectionItems.map((item) => ({ item, depth: 0 }));

    ordered = ordered.filter(({ item }) => {
      if (rowScope !== "all" && !itemMatchesMonitoringFilter(item, rowScope, employeeRealizations)) {
        return false;
      }
      const t = `${item.title} ${item.id} ${item.code ?? ""}`.toLowerCase();
      if (filters.title.trim() && !t.includes(filters.title.trim().toLowerCase())) {
        return false;
      }
      const ts = targetSummary(item, targetsByKpiItemId.get(item.id)).toLowerCase();
      if (filters.target.trim() && !ts.includes(filters.target.trim().toLowerCase())) {
        return false;
      }
      const rollup = realizationVerificationRollup(realizationRowsForItem(item.id)).toLowerCase();
      if (filters.status !== PLANNING_STATUS_FILTER_ALL && !rollup.includes(filters.status.trim().toLowerCase())) {
        return false;
      }
      return true;
    });

    if (sort) {
      const dir = sort.direction === "asc" ? 1 : -1;
      ordered = [...ordered].sort((x, y) => {
        const a = x.item;
        const b = y.item;
        let cmp = 0;
        const ta = targetSummary(a, targetsByKpiItemId.get(a.id));
        const tb = targetSummary(b, targetsByKpiItemId.get(b.id));
        const wa = ownershipFor(a.id)?.weightPct ?? 0;
        const wb = ownershipFor(b.id)?.weightPct ?? 0;
        const rsa = realizationRowsForItem(a.id);
        const rsb = realizationRowsForItem(b.id);
        const va = realizationVerificationRollup(rsa);
        const vb = realizationVerificationRollup(rsb);
        switch (sort.columnId) {
          case "title":
            cmp = a.title.localeCompare(b.title);
            break;
          case "target":
            cmp = ta.localeCompare(tb);
            break;
          case "itemWeight":
            cmp = wa - wb;
            break;
          case "verification":
            cmp = va.localeCompare(vb);
            break;
          default:
            cmp = 0;
        }
        return cmp * dir;
      });
    }

    const colLabel: Record<MonitoringLandingColId, string> = {
      no: "No",
      title: "ID & nama KPI",
      target: "Target",
      itemWeight: "Bobot item",
      realizations: "Realisasi / periode",
      verification: "Status verifikasi",
      evidence: "Bukti",
      polarity: "Polaritas",
      actions: "Aksi",
    };

    const toolbar = (
      <div className="mb-3 flex flex-col gap-2 rounded-lg border border-border/80 bg-muted/20 p-3">
        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-[9rem] flex-1">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Filter by title &amp; ID</span>
            <Input
              value={filters.title}
              onChange={(e) =>
                setMonitoringTableFilters((prev) => ({
                  ...prev,
                  [sectionKey]: { ...prev[sectionKey], title: e.target.value },
                }))
              }
              className="h-8 text-sm"
              placeholder="Judul, kode, atau ID KPI…"
            />
          </div>
          <div className="min-w-[9rem] flex-1">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Filter by target</span>
            <Input
              value={filters.target}
              onChange={(e) =>
                setMonitoringTableFilters((prev) => ({
                  ...prev,
                  [sectionKey]: { ...prev[sectionKey], target: e.target.value },
                }))
              }
              className="h-8 text-sm"
              placeholder="Substring ringkasan target…"
            />
          </div>
          <div className="min-w-[10rem]">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Realization flow</span>
            <Select
              value={rowScope}
              onValueChange={(v) =>
                setMonitoringRowFilter((prev) => ({ ...prev, [sectionKey]: v as MonitoringFilterId }))
              }
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua baris</SelectItem>
                <SelectItem value="draft">Ada draf</SelectItem>
                <SelectItem value="submitted">Menunggu verifikasi</SelectItem>
                <SelectItem value="verified">Terverifikasi / disesuaikan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[10rem]">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Verification text filter</span>
            <Input
              value={filters.status === PLANNING_STATUS_FILTER_ALL ? "" : filters.status}
              onChange={(e) =>
                setMonitoringTableFilters((prev) => ({
                  ...prev,
                  [sectionKey]: {
                    ...prev[sectionKey],
                    status: e.target.value.trim() ? e.target.value : PLANNING_STATUS_FILTER_ALL,
                  },
                }))
              }
              className="h-8 text-sm"
              placeholder="mis. draf, tunggu…"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="h-8 shrink-0 text-xs">
                Kolom tabel
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Kolom terlihat</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(DEFAULT_MONITORING_COL_VISIBILITY) as MonitoringLandingColId[]).map((id) => (
                <DropdownMenuItem
                  key={id}
                  disabled={id === "no" || id === "title" || id === "actions"}
                  onSelect={(ev) => {
                    ev.preventDefault();
                    if (id === "no" || id === "title" || id === "actions") {
                      return;
                    }
                    setMonitoringColVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
                  }}
                >
                  <Checkbox checked={monitoringColVisibility[id]} className="pointer-events-none mr-2" />
                  {colLabel[id]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );

    return (
      <div>
        {toolbar}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {vis.no ? (
                  <TableHead className="w-10">
                    <SortHeaderButton label="No" active={false} direction={undefined} sortable={false} onClick={() => {}} />
                  </TableHead>
                ) : null}
                {vis.title ? (
                  <TableHead>
                    <SortHeaderButton
                      label={colLabel.title}
                      active={sort?.columnId === "title"}
                      direction={sort?.columnId === "title" ? sort.direction : undefined}
                      sortable
                      onClick={() => toggleMonitoringSort(sectionKey, "title")}
                    />
                  </TableHead>
                ) : null}
                {vis.target ? (
                  <TableHead>
                    <SortHeaderButton
                      label={colLabel.target}
                      active={sort?.columnId === "target"}
                      direction={sort?.columnId === "target" ? sort.direction : undefined}
                      sortable
                      onClick={() => toggleMonitoringSort(sectionKey, "target")}
                    />
                  </TableHead>
                ) : null}
                {vis.itemWeight ? (
                  <TableHead>
                    <SortHeaderButton
                      label={colLabel.itemWeight}
                      active={sort?.columnId === "itemWeight"}
                      direction={sort?.columnId === "itemWeight" ? sort.direction : undefined}
                      sortable
                      onClick={() => toggleMonitoringSort(sectionKey, "itemWeight")}
                    />
                  </TableHead>
                ) : null}
                {vis.realizations ? <TableHead>{colLabel.realizations}</TableHead> : null}
                {vis.verification ? (
                  <TableHead>
                    <SortHeaderButton
                      label={colLabel.verification}
                      active={sort?.columnId === "verification"}
                      direction={sort?.columnId === "verification" ? sort.direction : undefined}
                      sortable
                      onClick={() => toggleMonitoringSort(sectionKey, "verification")}
                    />
                  </TableHead>
                ) : null}
                {vis.evidence ? <TableHead className="w-14 text-center">{colLabel.evidence}</TableHead> : null}
                {vis.polarity ? <TableHead>{colLabel.polarity}</TableHead> : null}
                {vis.actions ? <TableHead className="w-12 text-right">{colLabel.actions}</TableHead> : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordered.map(({ item, depth }, idx) => {
                const own = ownershipFor(item.id);
                const w = own?.weightPct ?? 0;
                const targets = targetsByKpiItemId.get(item.id);
                const indent = depth > 0 ? { paddingLeft: `${8 + depth * 14}px` } : undefined;
                const rs = realizationRowsForItem(item.id);
                const evidenceTotal = rs.reduce((acc, r) => acc + r.evidence.length, 0);
                const canStartOpenPeriod =
                  sectionVariant === "unit" &&
                  openCheckInSchedule != null &&
                  !rs.some((r) => r.period === openCheckInSchedule.period);
                const verif = realizationVerificationRollup(rs);

                return (
                  <TableRow key={item.id}>
                    {vis.no ? <TableCell className="tabular-nums text-muted-foreground">{idx + 1}</TableCell> : null}
                    {vis.title ? (
                      <TableCell style={indent}>
                        <p className="font-mono text-xs text-muted-foreground">{item.id}</p>
                        {onSelectKpi ? (
                          <button
                            type="button"
                            className="text-left font-medium leading-snug text-foreground hover:text-primary hover:underline"
                            onClick={() => onSelectKpi(item)}
                          >
                            {item.title}
                          </button>
                        ) : (
                          <p className="font-medium leading-snug">{item.title}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {subline} · {jenisLabel}
                        </p>
                      </TableCell>
                    ) : null}
                    {vis.target ? (
                      <TableCell className="max-w-[200px] text-sm text-muted-foreground">{targetSummary(item, targets)}</TableCell>
                    ) : null}
                    {vis.itemWeight ? <TableCell className="tabular-nums font-medium">{w}%</TableCell> : null}
                    {vis.realizations ? (
                      <TableCell className="min-w-[140px]">
                        {rs.length === 0 ? (
                          <span className="text-sm text-muted-foreground">Belum ada entri</span>
                        ) : (
                          <ul className="space-y-1.5 text-xs">
                            {rs.map((r) => (
                              <li key={r.id} className="flex flex-wrap items-center gap-1">
                                <span className="font-semibold text-foreground">{r.period}</span>
                                <span className="tabular-nums text-muted-foreground">{r.actualValue}</span>
                                <KpiStatusBadge status={r.status} className="px-1.5 py-0 text-[10px]" />
                              </li>
                            ))}
                          </ul>
                        )}
                      </TableCell>
                    ) : null}
                    {vis.verification ? (
                      <TableCell className="max-w-[10rem] text-xs text-muted-foreground">{verif}</TableCell>
                    ) : null}
                    {vis.evidence ? <TableCell className="text-center tabular-nums text-sm">{evidenceTotal}</TableCell> : null}
                    {vis.polarity ? <TableCell className="text-sm">{polarityCell(item.polarity)}</TableCell> : null}
                    {vis.actions ? (
                      <TableCell className="text-right">
                        {sectionVariant === "bersama" ? (
                          <span className="text-xs text-muted-foreground">Dicatat HQ</span>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                aria-label={`Menu realisasi untuk ${item.title}`}
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              {rs.map((r) => (
                                <DropdownMenuItem
                                  key={r.id}
                                  onClick={() => onMonitoringRealizationAction?.({ kind: "open", realization: r })}
                                >
                                  Kelola realisasi {r.period} ({r.status})
                                </DropdownMenuItem>
                              ))}
                              {canStartOpenPeriod && openCheckInSchedule ? (
                                <>
                                  {rs.length > 0 ? <DropdownMenuSeparator /> : null}
                                  <DropdownMenuItem
                                    onClick={() =>
                                      onMonitoringRealizationAction?.({
                                        kind: "start-draft",
                                        kpiItem: item,
                                        period: openCheckInSchedule.period,
                                      })
                                    }
                                  >
                                    + Mulai draf {openCheckInSchedule.period} (jendela terbuka)
                                  </DropdownMenuItem>
                                </>
                              ) : null}
                              {rs.length === 0 && !canStartOpenPeriod ? (
                                <DropdownMenuItem disabled>Tidak ada periode terbuka untuk entri baru</DropdownMenuItem>
                              ) : null}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  function renderPlanningLandingTable(
    sectionItems: KpiItem[],
    sectionVariant: "bersama" | "unit",
    useHierarchyOrder: boolean,
    sectionKey: PortfolioSectionKey
  ) {
    const jenisLabel =
      sectionVariant === "bersama"
        ? `KPI Bersama (${formula.kpiBersamaWeightPct}%)`
        : `KPI Unit (${formula.kpiUnitWeightPct}%)`;
    const subline =
      sectionVariant === "bersama" ? "KPI Bersama (wajib korporat)" : "KPI Unit (disesuaikan dengan unit)";
    const filters = planningTableFilters[sectionKey];
    const sort = planningSort[sectionKey];
    const vis = planningColVisibility;

    let ordered = useHierarchyOrder ? hierarchyRowsWithDepth(sectionItems) : sectionItems.map((item) => ({ item, depth: 0 }));

    ordered = ordered.filter(({ item }) => {
      const t = `${item.title} ${item.id} ${item.code ?? ""}`.toLowerCase();
      if (filters.title.trim() && !t.includes(filters.title.trim().toLowerCase())) {
        return false;
      }
      if (filters.status !== PLANNING_STATUS_FILTER_ALL && item.itemApprovalStatus !== filters.status) {
        return false;
      }
      const ts = targetSummary(item, targetsByKpiItemId.get(item.id)).toLowerCase();
      if (filters.target.trim() && !ts.includes(filters.target.trim().toLowerCase())) {
        return false;
      }
      return true;
    });

    if (sort) {
      const dir = sort.direction === "asc" ? 1 : -1;
      ordered = [...ordered].sort((x, y) => {
        const a = x.item;
        const b = y.item;
        let cmp = 0;
        const ta = targetSummary(a, targetsByKpiItemId.get(a.id));
        const tb = targetSummary(b, targetsByKpiItemId.get(b.id));
        const wa = ownershipFor(a.id)?.weightPct ?? 0;
        const wb = ownershipFor(b.id)?.weightPct ?? 0;
        switch (sort.columnId) {
          case "title":
            cmp = a.title.localeCompare(b.title);
            break;
          case "target":
            cmp = ta.localeCompare(tb);
            break;
          case "itemWeight":
            cmp = wa - wb;
            break;
          case "status":
            cmp = a.itemApprovalStatus.localeCompare(b.itemApprovalStatus);
            break;
          default:
            cmp = 0;
        }
        return cmp * dir;
      });
    }

    const colLabel: Record<PlanningLandingColId, string> = {
      no: "No",
      title: "ID & nama KPI",
      target: "Target",
      typeWeight: "Bobot jenis",
      itemWeight: "Bobot item",
      polarity: "Polaritas",
      bsc: "BSC",
      targetType: "Tipe target",
      status: "Status perencanaan",
      source: "Sumber",
      actions: "Aksi",
    };

    const toolbar = (
      <div className="mb-3 flex flex-col gap-2 rounded-lg border border-border/80 bg-muted/20 p-3">
        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-[9rem] flex-1">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Filter by title &amp; ID</span>
            <Input
              value={filters.title}
              onChange={(e) =>
                setPlanningTableFilters((prev) => ({
                  ...prev,
                  [sectionKey]: { ...prev[sectionKey], title: e.target.value },
                }))
              }
              className="h-8 text-sm"
              placeholder="Judul, kode, atau ID KPI…"
            />
          </div>
          <div className="min-w-[10rem]">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Planning status</span>
            <Select
              value={filters.status}
              onValueChange={(v) =>
                setPlanningTableFilters((prev) => ({
                  ...prev,
                  [sectionKey]: { ...prev[sectionKey], status: v },
                }))
              }
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Semua" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PLANNING_STATUS_FILTER_ALL}>Semua status</SelectItem>
                {(
                  [
                    "DRAFT",
                    "ALLOCATED",
                    "WAITING_REVIEW",
                    "WAITING_FOR_APPROVAL",
                    "PENDING_CLARIFICATION",
                    "APPROVED",
                    "APPROVED_ADJUSTED",
                    "REJECTED",
                  ] as const
                ).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[9rem] flex-1">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Filter by target</span>
            <Input
              value={filters.target}
              onChange={(e) =>
                setPlanningTableFilters((prev) => ({
                  ...prev,
                  [sectionKey]: { ...prev[sectionKey], target: e.target.value },
                }))
              }
              className="h-8 text-sm"
              placeholder="Substring ringkasan target…"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="h-8 shrink-0 text-xs">
                Kolom tabel
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Kolom terlihat</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(DEFAULT_PLANNING_COL_VISIBILITY) as PlanningLandingColId[]).map((id) => (
                <DropdownMenuItem
                  key={id}
                  disabled={id === "no" || id === "title" || id === "actions"}
                  onSelect={(ev) => {
                    ev.preventDefault();
                    if (id === "no" || id === "title" || id === "actions") {
                      return;
                    }
                    setPlanningColVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
                  }}
                >
                  <Checkbox checked={planningColVisibility[id]} className="pointer-events-none mr-2" />
                  {colLabel[id]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );

    return (
      <div>
        {toolbar}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {vis.no ? (
                  <TableHead className="w-10">
                    <SortHeaderButton label="No" active={false} direction={undefined} sortable={false} onClick={() => {}} />
                  </TableHead>
                ) : null}
                {vis.title ? (
                  <TableHead>
                    <SortHeaderButton
                      label={colLabel.title}
                      active={sort?.columnId === "title"}
                      direction={sort?.columnId === "title" ? sort.direction : undefined}
                      sortable
                      onClick={() => togglePlanningSort(sectionKey, "title")}
                    />
                  </TableHead>
                ) : null}
                {vis.target ? (
                  <TableHead>
                    <SortHeaderButton
                      label={colLabel.target}
                      active={sort?.columnId === "target"}
                      direction={sort?.columnId === "target" ? sort.direction : undefined}
                      sortable
                      onClick={() => togglePlanningSort(sectionKey, "target")}
                    />
                  </TableHead>
                ) : null}
                {vis.typeWeight ? <TableHead>{colLabel.typeWeight}</TableHead> : null}
                {vis.itemWeight ? (
                  <TableHead>
                    <SortHeaderButton
                      label={colLabel.itemWeight}
                      active={sort?.columnId === "itemWeight"}
                      direction={sort?.columnId === "itemWeight" ? sort.direction : undefined}
                      sortable
                      onClick={() => togglePlanningSort(sectionKey, "itemWeight")}
                    />
                  </TableHead>
                ) : null}
                {vis.polarity ? <TableHead>{colLabel.polarity}</TableHead> : null}
                {vis.bsc ? <TableHead>{colLabel.bsc}</TableHead> : null}
                {vis.targetType ? <TableHead>{colLabel.targetType}</TableHead> : null}
                {vis.status ? (
                  <TableHead>
                    <SortHeaderButton
                      label={colLabel.status}
                      active={sort?.columnId === "status"}
                      direction={sort?.columnId === "status" ? sort.direction : undefined}
                      sortable
                      onClick={() => togglePlanningSort(sectionKey, "status")}
                    />
                  </TableHead>
                ) : null}
                {vis.source ? <TableHead>{colLabel.source}</TableHead> : null}
                {vis.actions ? <TableHead className="min-w-[7rem]">{colLabel.actions}</TableHead> : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordered.map(({ item, depth }, idx) => {
                const own = ownershipFor(item.id);
                const w = own?.weightPct ?? 0;
                const targets = targetsByKpiItemId.get(item.id);
                const indent = depth > 0 ? { paddingLeft: `${8 + depth * 14}px` } : undefined;

                return (
                  <TableRow key={item.id}>
                    {vis.no ? <TableCell className="tabular-nums text-muted-foreground">{idx + 1}</TableCell> : null}
                    {vis.title ? (
                      <TableCell style={indent}>
                        <p className="font-mono text-xs text-muted-foreground">{item.id}</p>
                        {onSelectKpi ? (
                          <button
                            type="button"
                            className="text-left font-medium leading-snug text-foreground hover:text-primary hover:underline"
                            onClick={() => onSelectKpi(item)}
                          >
                            {item.title}
                          </button>
                        ) : (
                          <p className="font-medium leading-snug">{item.title}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{subline}</p>
                      </TableCell>
                    ) : null}
                    {vis.target ? (
                      <TableCell className="max-w-[200px] text-sm text-muted-foreground">{targetSummary(item, targets)}</TableCell>
                    ) : null}
                    {vis.typeWeight ? <TableCell className="text-sm">{jenisLabel}</TableCell> : null}
                    {vis.itemWeight ? (
                      <TableCell>
                        <WeightSlider
                          value={w}
                          min={minW}
                          max={maxW}
                          readOnly={!canEditWeights || !own || isKpiItemBlockedForPlanningTargetOrWeight(item)}
                          onChange={(v) => own && updateOwnershipWeight(own.id, v)}
                        />
                      </TableCell>
                    ) : null}
                    {vis.polarity ? <TableCell className="text-sm">{polarityCell(item.polarity)}</TableCell> : null}
                    {vis.bsc ? (
                      <TableCell className="text-xs text-muted-foreground">
                        {item.bscPerspective ? item.bscPerspective.replaceAll("_", " ") : "—"}
                      </TableCell>
                    ) : null}
                    {vis.targetType ? <TableCell className="text-xs">{item.targetType}</TableCell> : null}
                    {vis.status ? (
                      <TableCell>
                        <KpiStatusBadge status={item.itemApprovalStatus} />
                      </TableCell>
                    ) : null}
                    {vis.source ? <TableCell className="text-xs">{item.source}</TableCell> : null}
                    {vis.actions ? (
                      <TableCell>{planningLandingActions(item, sectionVariant, { viewContext, phase, onSelectKpi })}</TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  function renderTable(
    sectionItems: KpiItem[],
    useHierarchyOrder: boolean,
    sectionVariant: "bersama" | "unit",
    sectionKey: PortfolioSectionKey
  ) {
    if (layoutVariant === "landing" && viewMode === "table") {
      if (phase === "monitoring") {
        return renderMonitoringLandingTable(sectionItems, sectionVariant, false, sectionKey);
      }
      return renderPlanningLandingTable(sectionItems, sectionVariant, false, sectionKey);
    }
    const ordered = useHierarchyOrder ? hierarchyRowsWithDepth(sectionItems) : sectionItems.map((item) => ({ item, depth: 0 }));
    const showPiCol = Boolean(scoreRows) && phase !== "planning";
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Bobot</TableHead>
              <TableHead>Target</TableHead>
              {showPiCol ? <TableHead>Kontrib. PI</TableHead> : null}
              <TableHead>{phase === "monitoring" ? "Verifikasi (ringkas)" : "Status"}</TableHead>
              <TableHead>Sumber</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordered.map(({ item, depth }) => {
              const c = renderRowCells(item, depth);
              const rs = realizationRowsForItem(item.id);
              const verif = phase === "monitoring" ? realizationVerificationRollup(rs) : null;
              return (
                <TableRow key={item.id}>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.type}</TableCell>
                  <TableCell>{c.weight}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.target}</TableCell>
                  {showPiCol ? <TableCell>{c.pi}</TableCell> : null}
                  <TableCell>
                    {phase === "monitoring" ? (
                      <span className="text-xs text-muted-foreground">{verif}</span>
                    ) : (
                      c.status
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{c.source}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  function renderList(sectionItems: KpiItem[], useHierarchyOrder: boolean) {
    const ordered = useHierarchyOrder ? hierarchyRowsWithDepth(sectionItems) : sectionItems.map((item) => ({ item, depth: 0 }));
    return (
      <ul className="space-y-3">
        {ordered.map(({ item, depth }) => {
          const c = renderRowCells(item, depth);
          return (
            <li
              key={item.id}
              className="rounded-xl border border-border bg-card p-4 shadow-xs"
              style={depth > 0 ? { marginLeft: `${depth * 12}px` } : undefined}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  {c.title}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{c.type}</span>
                    <span>·</span>
                    <span>{c.target}</span>
                    <span>·</span>
                    <span>{c.source}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {c.weight}
                  {phase === "monitoring" ? (
                    <div className="text-xs text-muted-foreground">
                      Verifikasi: {realizationVerificationRollup(realizationRowsForItem(item.id))}
                    </div>
                  ) : (
                    c.status
                  )}
                  {scoreRows && phase !== "planning" ? <div className="text-xs text-muted-foreground">PI: {c.pi}</div> : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  function renderSection(sectionTitle: string, sectionItems: KpiItem[], sectionVariant: "bersama" | "unit") {
    if (sectionItems.length === 0) {
      return null;
    }
    const sectionKey: PortfolioSectionKey = sectionVariant === "bersama" ? "BERSAMA" : "UNIT";
    const panelClass =
      sectionVariant === "bersama"
        ? "rounded-xl border border-primary/15 bg-primary/[0.06] p-4"
        : "rounded-xl border border-border bg-muted/20 p-4";

    return (
      <div className={panelClass}>
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{sectionTitle}</h3>
            {layoutVariant === "landing" && sectionVariant === "bersama" ? (
              <p className="mt-1 text-xs font-medium text-muted-foreground">Read-only — ditetapkan admin (bobot item untuk transparansi)</p>
            ) : null}
          </div>
          {layoutVariant === "landing" && sectionVariant === "unit" && viewContext === "self" && !allowWeightEdit && phase !== "monitoring" ? (
            <Button size="sm" className="shrink-0" asChild>
              <Link to="/performance-v2/my-kpi/planning">+ Tambah KPI Unit</Link>
            </Button>
          ) : null}
        </div>
        {viewMode === "table" ? renderTable(sectionItems, false, sectionVariant, sectionKey) : null}
        {viewMode === "list" ? renderList(sectionItems, false) : null}
        {viewMode === "hierarchy"
          ? layoutVariant === "landing"
            ? phase === "monitoring"
              ? renderMonitoringLandingTable(sectionItems, sectionVariant, true, sectionKey)
              : renderPlanningLandingTable(sectionItems, sectionVariant, true, sectionKey)
            : renderList(sectionItems, true)
          : null}
      </div>
    );
  }

  const bersamaOk = bersamaTotal === formula.kpiBersamaWeightPct;
  const unitOk = unitTotal === formula.kpiUnitWeightPct;

  const chipBtn = (id: StatusChipId, label: string) => {
    const on = statusChips.has(id);
    return (
      <ActionChip
        key={id}
        type="button"
        aria-pressed={on}
        variant={on ? "selected" : "neutral"}
        size="sm"
        onClick={() => toggleChip(id)}
      >
        {label}
      </ActionChip>
    );
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Card className={layoutVariant === "landing" ? "shadow-md" : undefined}>
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            {showViewModeToggle ? <ViewModeToggle mode={viewMode} onChange={setViewMode} /> : null}
          </div>
          {landingToolbarActive ? (
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <SearchInput
                placeholder="Cari nama, kode, atau ID KPI…"
                value={landingSearch}
                onChange={(e) => setLandingSearch(e.target.value)}
                className="max-w-md"
              />
              {phase === "monitoring" ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Realization filter · status entri</span>
                  {(["all", "draft", "submitted", "verified"] as const).map((id) => {
                    const label =
                      id === "all"
                        ? "Semua KPI"
                        : id === "draft"
                          ? "Ada draf"
                          : id === "submitted"
                            ? "Menunggu verifikasi"
                            : "Terverifikasi / disesuaikan";
                    const on = monitoringFilter === id;
                    return (
                      <ActionChip
                        key={id}
                        type="button"
                        aria-pressed={on}
                        variant={on ? "selected" : "neutral"}
                        size="sm"
                        onClick={() => setMonitoringFilter(id)}
                      >
                        {label}
                      </ActionChip>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Planning filter · status item</span>
                  {chipBtn("draft", "Draft")}
                  {chipBtn("allocated", "Allocated")}
                  {chipBtn("approved", "Approved")}
                  {chipBtn("waiting", "Waiting")}
                  {statusChips.size > 0 ? (
                    <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setStatusChips(new Set())}>
                      Reset filter
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-8">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {viewContext === "managerReview"
                ? "Belum ada KPI pada portofolio anggota ini untuk periode ini."
                : "Belum ada KPI pada portofolio Anda untuk periode ini."}
            </p>
          ) : landingToolbarActive && filteredItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tidak ada KPI yang cocok dengan filter atau pencarian.</p>
          ) : (
            <>
              {renderSection("KPI Bersama", bersamaItems, "bersama")}
              {renderSection("KPI Unit", unitItems, "unit")}
            </>
          )}

          {!hideTotalsFooter ? (
            <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm">
              <p className="font-medium text-foreground">Total bobot & rumus band</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {formula.bandJabatan} · {formula.jobType}: wajib KPI Bersama {formula.kpiBersamaWeightPct}% dan KPI Unit{" "}
                {formula.kpiUnitWeightPct}% (sesuai konfigurasi periode).
              </p>
              <div className="mt-3 flex flex-wrap gap-6">
                <div>
                  <span className="text-muted-foreground">KPI Bersama</span>{" "}
                  <span className={bersamaOk ? "font-semibold text-emerald-600" : "font-semibold text-destructive"}>{bersamaTotal}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">KPI Unit</span>{" "}
                  <span className={unitOk ? "font-semibold text-emerald-600" : "font-semibold text-destructive"}>{unitTotal}%</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Batas per item: {minW}%–{maxW}% (aturan portofolio {state.performancePeriod.year})
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
