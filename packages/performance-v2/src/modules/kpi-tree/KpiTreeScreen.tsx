import { startTransition, useDeferredValue, useMemo, type CSSProperties } from "react";
import { Link, useSearchParams } from "react-router";
import { AlertTriangle, BarChart3, Building2, CheckCircle2, FileSpreadsheet, FolderTree, GitBranch, Info, Link2, ShieldAlert, UploadCloud, Users } from "lucide-react";
import {
  Badge,
  BarChart,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  EmptyState,
  MetricCard,
  PageHeading,
  ProgressCluster,
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
  cn,
} from "@rinjani/shared-ui";
import type { AlignmentWarning, BulkUploadJob, CascadeRelation, KpiChangeLog, KpiItem, OrgTreeNode, PositionTreeNode } from "../../lib/domain/types";
import { usePerformanceV2 } from "../../lib/store/performance-v2-store";
import { PersonaContextBar } from "../../ui/persona-context-bar";
import { PerformanceV2FilterRail, PerformanceV2PageFrame, PerformanceV2SectionBand } from "../../ui/performance-v2-page-frame";

type TreeView = "org" | "hierarchy";
type TreeTab = "tree" | "warnings" | "upload" | "analytics";

type PositionSummary = PositionTreeNode & {
  orgUnitName: string;
  companyId?: string;
  companyName?: string;
  directReports: number;
  kpiCount: number;
  waitingApprovalCount: number;
};

type KpiHierarchyNode = {
  id: string;
  item: KpiItem;
  position?: PositionSummary;
  parentId: string | null;
  relationToParent?: CascadeRelation;
  children: KpiHierarchyNode[];
};

type KpiHierarchyModel = {
  roots: KpiHierarchyNode[];
  index: Map<string, KpiHierarchyNode>;
  stats: {
    visibleCount: number;
    rootCount: number;
    relationCount: number;
    bersamaCount: number;
    unitCount: number;
  };
};

const VIEW_OPTIONS: Array<{ value: TreeView; label: string; hint: string }> = [
  { value: "org", label: "Organization View", hint: "Lihat struktur unit, posisi, dan distribusi KPI." },
  { value: "hierarchy", label: "KPI Structure View", hint: "Telusuri struktur KPI parent-child dengan tree hierarkis." },
];

const TAB_OPTIONS: Array<{ value: TreeTab; label: string; icon: typeof FolderTree }> = [
  { value: "tree", label: "Workspace", icon: FolderTree },
  { value: "warnings", label: "Warning & Quality", icon: ShieldAlert },
  { value: "upload", label: "Bulk Upload", icon: UploadCloud },
  { value: "analytics", label: "Analytics", icon: BarChart3 },
];

const WARNING_LABEL: Record<AlignmentWarning["type"], string> = {
  ORPHAN_KPI: "Orphan KPI",
  MISSING_PARENT: "Missing parent",
  DUPLICATE_SUSPECTED: "Duplikasi diduga",
  WEIGHT_MISMATCH: "Mismatch bobot",
  UNALLOCATED: "Belum teralokasi",
};

const RISK_LABEL: Record<PositionTreeNode["riskStatus"], string> = {
  ON_TRACK: "On track",
  AT_RISK: "At risk",
  OVERDUE: "Overdue",
  NO_DATA: "Belum ada data",
};

const RISK_VARIANT: Record<PositionTreeNode["riskStatus"], "success" | "warning" | "destructive" | "neutral"> = {
  ON_TRACK: "success",
  AT_RISK: "warning",
  OVERDUE: "destructive",
  NO_DATA: "neutral",
};

const JOB_STATUS_LABEL: Record<BulkUploadJob["status"], string> = {
  VALIDATING: "Sedang validasi",
  VALIDATION_COMPLETE: "Validasi selesai",
  IMPORTING: "Sedang import",
  COMPLETE: "Import selesai",
  FAILED: "Import gagal",
};

const JOB_STATUS_VARIANT: Record<BulkUploadJob["status"], "info" | "success" | "warning" | "destructive" | "neutral"> = {
  VALIDATING: "info",
  VALIDATION_COMPLETE: "warning",
  IMPORTING: "info",
  COMPLETE: "success",
  FAILED: "destructive",
};

const CHANGE_TYPE_LABEL: Record<KpiChangeLog["changeType"], string> = {
  ITEM_CREATED: "Item dibuat",
  ITEM_UPDATED: "Item diubah",
  ITEM_DELETED: "Item dihapus",
  OWNERSHIP_CHANGED: "Ownership diubah",
  WEIGHT_CHANGED: "Bobot diubah",
  TARGET_CHANGED: "Target diubah",
  CAP_CHANGED: "Cap diubah",
  DICTIONARY_LINKED: "Tersambung ke Kamus KPI",
  DICTIONARY_UNLINKED: "Koneksi Kamus dilepas",
  BULK_UPLOADED: "Bulk upload",
};

function formatDateTime(value?: string) {
  if (!value) {
    return "—";
  }
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function percentText(value?: number) {
  return value == null ? "—" : `${value.toFixed(0)}%`;
}

function compactChangeDetail(log: KpiChangeLog) {
  if (log.changeType === "DICTIONARY_LINKED") {
    return `Dictionary ${String(log.newValue?.dictionaryItemId ?? "—")}`;
  }
  if (log.changeType === "BULK_UPLOADED") {
    return `Job ${String(log.newValue?.jobId ?? "—")} · ${String(log.newValue?.validRows ?? 0)} valid`;
  }
  return Object.keys(log.newValue ?? {}).length > 0 ? JSON.stringify(log.newValue) : "Perubahan tercatat";
}

function statusToneForWarning(type: AlignmentWarning["type"]): "warning" | "destructive" | "info" {
  switch (type) {
    case "UNALLOCATED":
    case "WEIGHT_MISMATCH":
      return "destructive";
    case "ORPHAN_KPI":
      return "warning";
    default:
      return "info";
  }
}

const KPI_TYPE_BADGE_STYLES: Record<KpiItem["kpiType"], CSSProperties> = {
  BERSAMA: {
    borderColor: "color-mix(in srgb, var(--color-kpi-bersama) 22%, white)",
    backgroundColor: "color-mix(in srgb, var(--color-kpi-bersama) 10%, white)",
    color: "var(--color-kpi-bersama)",
  },
  UNIT: {
    borderColor: "color-mix(in srgb, var(--color-kpi-unit) 22%, white)",
    backgroundColor: "color-mix(in srgb, var(--color-kpi-unit) 10%, white)",
    color: "var(--color-kpi-unit)",
  },
};

function formatKpiTypeLabel(type: KpiItem["kpiType"]) {
  return type === "BERSAMA" ? "KPI Bersama" : "KPI Unit";
}

function formatTargetSummary(item: KpiItem) {
  if (item.targetValue == null) {
    return "Belum diatur";
  }
  return `${item.targetValue} ${item.targetUnit}`.trim();
}

function hierarchySearchText(item: KpiItem, position?: PositionSummary) {
  return [
    item.title,
    item.code,
    item.description,
    formatKpiTypeLabel(item.kpiType),
    position?.title,
    position?.incumbentName,
    position?.orgUnitName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function createKpiHierarchyModel({
  items,
  relations,
  itemToPositionId,
  positionMap,
  search,
}: {
  items: KpiItem[];
  relations: CascadeRelation[];
  itemToPositionId: Map<string, string>;
  positionMap: Map<string, PositionSummary>;
  search: string;
}): KpiHierarchyModel {
  const itemMap = new Map(items.map((item) => [item.id, item]));
  const childIdsByParent = new Map<string, Set<string>>();
  const parentIdByChild = new Map<string, string>();
  const relationToParentByChild = new Map<string, CascadeRelation | undefined>();

  function connect(parentId: string, childId: string, relation?: CascadeRelation) {
    if (parentId === childId || !itemMap.has(parentId) || !itemMap.has(childId)) {
      return;
    }
    const existingParent = parentIdByChild.get(childId);
    if (existingParent && existingParent !== parentId) {
      return;
    }
    const siblings = childIdsByParent.get(parentId) ?? new Set<string>();
    siblings.add(childId);
    childIdsByParent.set(parentId, siblings);
    parentIdByChild.set(childId, parentId);
    if (relation && !relationToParentByChild.has(childId)) {
      relationToParentByChild.set(childId, relation);
    }
  }

  for (const item of items) {
    if (item.parentKpiId) {
      connect(item.parentKpiId, item.id);
    }
  }

  for (const relation of relations) {
    connect(relation.parentKpiId, relation.childKpiId, relation);
  }

  const searchTerm = search.trim().toLowerCase();
  const index = new Map<string, KpiHierarchyNode>();

  function buildNode(itemId: string, path: Set<string>): KpiHierarchyNode | null {
    if (path.has(itemId)) {
      return null;
    }
    const item = itemMap.get(itemId);
    if (!item) {
      return null;
    }

    const nextPath = new Set(path);
    nextPath.add(itemId);

    const childNodes = [...(childIdsByParent.get(itemId) ?? [])]
      .map((childId) => buildNode(childId, nextPath))
      .filter((node): node is KpiHierarchyNode => node != null);

    const positionId = itemToPositionId.get(itemId);
    const position = positionId ? positionMap.get(positionId) : undefined;
    const ownMatch = !searchTerm || hierarchySearchText(item, position).includes(searchTerm);

    if (searchTerm && !ownMatch && childNodes.length === 0) {
      return null;
    }

    const node: KpiHierarchyNode = {
      id: itemId,
      item,
      position,
      parentId: parentIdByChild.get(itemId) ?? null,
      relationToParent: relationToParentByChild.get(itemId),
      children: childNodes,
    };

    index.set(itemId, node);
    return node;
  }

  const roots: KpiHierarchyNode[] = [];
  const attachedIds = new Set<string>();

  function rememberBranch(node: KpiHierarchyNode) {
    attachedIds.add(node.id);
    for (const child of node.children) {
      rememberBranch(child);
    }
  }

  const candidateRootIds = items.map((item) => item.id).filter((id) => !parentIdByChild.has(id));
  for (const rootId of candidateRootIds) {
    const rootNode = buildNode(rootId, new Set());
    if (!rootNode) {
      continue;
    }
    roots.push(rootNode);
    rememberBranch(rootNode);
  }

  for (const item of items) {
    if (attachedIds.has(item.id)) {
      continue;
    }
    const detachedNode = buildNode(item.id, new Set());
    if (!detachedNode) {
      continue;
    }
    roots.push(detachedNode);
    rememberBranch(detachedNode);
  }

  let relationCount = 0;
  let bersamaCount = 0;
  let unitCount = 0;

  for (const node of index.values()) {
    relationCount += node.children.length;
    if (node.item.kpiType === "BERSAMA") {
      bersamaCount += 1;
    } else {
      unitCount += 1;
    }
  }

  return {
    roots,
    index,
    stats: {
      visibleCount: index.size,
      rootCount: roots.length,
      relationCount,
      bersamaCount,
      unitCount,
    },
  };
}

export function KpiTreeScreen() {
  const { state, getEmployeeDisplay, getPositionTitleForEmployee, upsertBulkUploadJob } = usePerformanceV2();
  const [searchParams, setSearchParams] = useSearchParams();

  const view = (searchParams.get("view") as TreeView | null) ?? "org";
  const tab = (searchParams.get("tab") as TreeTab | null) ?? "tree";
  const companyId = searchParams.get("companyId") ?? "all";
  const orgUnitId = searchParams.get("orgUnitId") ?? "all";
  const warningType = searchParams.get("warningType") ?? "all";
  const search = searchParams.get("search") ?? "";
  const positionId = searchParams.get("positionId");
  const kpiId = searchParams.get("kpiId");
  const jobId = searchParams.get("jobId") ?? state.bulkUploadJobs[0]?.id ?? "";

  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  function updateParams(patch: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(patch)) {
      if (value == null || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    startTransition(() => setSearchParams(next));
  }

  const orgUnitMap = useMemo(() => new Map(state.orgUnits.map((unit) => [unit.org_unit_id, unit])), [state.orgUnits]);
  const companyMap = useMemo(() => new Map(state.companies.map((company) => [company.company_id, company])), [state.companies]);
  const employeeMap = useMemo(() => new Map(state.employees.map((employee) => [employee.nik, employee])), [state.employees]);
  const positionMasterMap = useMemo(() => new Map(state.positions.map((position) => [position.position_id, position])), [state.positions]);
  const itemMap = useMemo(() => new Map(state.kpiItems.map((item) => [item.id, item])), [state.kpiItems]);
  const portfolioScoreMap = useMemo(() => new Map(state.portfolioScores.map((score) => [score.employeeNumber, score])), [state.portfolioScores]);
  const itemToPositionId = useMemo(() => {
    const result = new Map<string, string>();
    for (const item of state.kpiItems) {
      const employee = employeeMap.get(item.ownerEmployeeNumber);
      if (employee?.current_position_id) {
        result.set(item.id, employee.current_position_id);
      }
    }
    return result;
  }, [employeeMap, state.kpiItems]);

  const orgPathMap = useMemo(() => {
    const map = new Map<string, string[]>();
    function walk(nodes: OrgTreeNode[], path: string[]) {
      for (const node of nodes) {
        const nextPath = [...path, node.name];
        map.set(node.organizationId, nextPath);
        if (node.childNodes.length > 0) {
          walk(node.childNodes, nextPath);
        }
      }
    }
    walk(state.orgTreeNodes, []);
    return map;
  }, [state.orgTreeNodes]);

  const orgUnitDescendantIds = useMemo(() => {
    const descendants = new Map<string, Set<string>>();
    function collect(startId: string) {
      const current = descendants.get(startId);
      if (current) {
        return current;
      }
      const set = new Set<string>([startId]);
      for (const unit of state.orgUnits) {
        if (unit.parent_org_unit_id === startId) {
          const childSet = collect(unit.org_unit_id);
          for (const childId of childSet) {
            set.add(childId);
          }
        }
      }
      descendants.set(startId, set);
      return set;
    }
    for (const unit of state.orgUnits) {
      collect(unit.org_unit_id);
    }
    return descendants;
  }, [state.orgUnits]);

  const positions = useMemo<PositionSummary[]>(() => {
    return state.positionTreeNodes.map((node) => {
      const master = positionMasterMap.get(node.positionId);
      const orgUnit = orgUnitMap.get(node.orgUnitId);
      const company = master?.company_id ? companyMap.get(master.company_id) : undefined;
      const directReports = state.positions.filter((position) => position.reports_to_position_id === node.positionId).length;
      const waitingApprovalCount = node.kpiItemIds.filter((id) => {
        const item = itemMap.get(id);
        return item?.itemApprovalStatus === "WAITING_FOR_APPROVAL" || item?.itemApprovalStatus === "WAITING_REVIEW";
      }).length;
      return {
        ...node,
        orgUnitName: orgUnit?.name ?? node.orgUnitId,
        companyId: master?.company_id,
        companyName: company?.name,
        directReports,
        kpiCount: node.kpiItemIds.length,
        waitingApprovalCount,
      };
    });
  }, [companyMap, itemMap, orgUnitMap, positionMasterMap, state.positionTreeNodes, state.positions]);

  const positionSummaryMap = useMemo(() => new Map(positions.map((position) => [position.positionId, position])), [positions]);

  const filteredPositions = useMemo(() => {
    const selectedOrgSet = orgUnitId !== "all" ? orgUnitDescendantIds.get(orgUnitId) : null;
    return positions.filter((position) => {
      if (companyId !== "all" && position.companyId !== companyId) {
        return false;
      }
      if (selectedOrgSet && !selectedOrgSet.has(position.orgUnitId)) {
        return false;
      }
      if (!deferredSearch) {
        return true;
      }
      const haystack = [
        position.title,
        position.incumbentName,
        position.incumbentEmployeeNumber,
        position.orgUnitName,
        position.companyName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(deferredSearch);
    });
  }, [companyId, deferredSearch, orgUnitDescendantIds, orgUnitId, positions]);

  const selectedPosition = useMemo(
    () => positions.find((position) => position.positionId === positionId) ?? null,
    [positionId, positions]
  );

  const warnings = useMemo(() => {
    return state.alignmentWarnings.filter((warning) => {
      if (warningType !== "all" && warning.type !== warningType) {
        return false;
      }
      if (!deferredSearch) {
        return true;
      }
      const relatedPosition = warning.affectedPositionId ? positions.find((position) => position.positionId === warning.affectedPositionId) : null;
      const relatedItem = warning.affectedItemId ? itemMap.get(warning.affectedItemId) : null;
      const haystack = [warning.description, relatedPosition?.title, relatedPosition?.incumbentName, relatedItem?.title]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(deferredSearch);
    });
  }, [deferredSearch, itemMap, positions, state.alignmentWarnings, warningType]);

  const job = useMemo(() => state.bulkUploadJobs.find((entry) => entry.id === jobId) ?? state.bulkUploadJobs[0] ?? null, [jobId, state.bulkUploadJobs]);

  const hierarchyModel = useMemo(
    () =>
      createKpiHierarchyModel({
        items: state.kpiItems,
        relations: state.cascadeRelations,
        itemToPositionId,
        positionMap: positionSummaryMap,
        search: deferredSearch,
      }),
    [deferredSearch, itemToPositionId, positionSummaryMap, state.cascadeRelations, state.kpiItems]
  );

  const selectedHierarchyNode = useMemo(() => {
    const positionFallback =
      [...hierarchyModel.index.values()].find((node) => positionId != null && node.position?.positionId === positionId) ??
      hierarchyModel.roots[0] ??
      null;

    if (!kpiId) {
      return positionFallback;
    }

    return hierarchyModel.index.get(kpiId) ?? positionFallback;
  }, [hierarchyModel, kpiId, positionId]);

  const activeKpiDialogNode = useMemo(() => {
    if (view !== "hierarchy" || tab !== "tree" || !kpiId) {
      return null;
    }
    return hierarchyModel.index.get(kpiId) ?? null;
  }, [hierarchyModel, kpiId, tab, view]);

  const changeLogsForSelectedPosition = useMemo(() => {
    if (!selectedPosition) {
      return [];
    }
    return state.kpiChangeLogs.filter((log) => log.positionId === selectedPosition.positionId || selectedPosition.kpiItemIds.includes(log.kpiItemId ?? ""));
  }, [selectedPosition, state.kpiChangeLogs]);

  const warningSummary = useMemo(() => {
    const counts = new Map<AlignmentWarning["type"], number>();
    for (const warning of state.alignmentWarnings) {
      counts.set(warning.type, (counts.get(warning.type) ?? 0) + 1);
    }
    return counts;
  }, [state.alignmentWarnings]);

  const analyticsBars = [
    { label: "Owner", value: state.treeAnalytics.ownershipDistribution.ownerPct, detail: `${state.treeAnalytics.ownershipDistribution.ownerPct}% owner`, tone: "primary" as const },
    { label: "Shared", value: state.treeAnalytics.ownershipDistribution.sharedOwnerPct, detail: `${state.treeAnalytics.ownershipDistribution.sharedOwnerPct}% shared owner`, tone: "secondary" as const },
    { label: "Collab", value: state.treeAnalytics.ownershipDistribution.collaboratorPct, detail: `${state.treeAnalytics.ownershipDistribution.collaboratorPct}% collaborator`, tone: "accent" as const },
  ];

  const hotspotPositions = useMemo(() => {
    return [...positions]
      .sort((a, b) => {
        const warningScoreA = state.alignmentWarnings.filter((warning) => warning.affectedPositionId === a.positionId).length;
        const warningScoreB = state.alignmentWarnings.filter((warning) => warning.affectedPositionId === b.positionId).length;
        return warningScoreB - warningScoreA || b.waitingApprovalCount - a.waitingApprovalCount;
      })
      .slice(0, 4);
  }, [positions, state.alignmentWarnings]);

  const workspaceTitle = VIEW_OPTIONS.find((option) => option.value === view)?.label ?? "Organization View";

  function openPosition(nextPositionId: string) {
    updateParams({ positionId: nextPositionId });
  }

  function closePositionSheet() {
    updateParams({ positionId: null });
  }

  function jumpToWarning(warning: AlignmentWarning) {
    updateParams({
      tab: "warnings",
      warningType: warning.type,
      positionId: warning.affectedPositionId ?? itemToPositionId.get(warning.affectedItemId ?? "") ?? null,
      kpiId: warning.affectedItemId ?? null,
    });
  }

  function handleJobAdvance(target: BulkUploadJob["status"]) {
    if (!job) {
      return;
    }
    upsertBulkUploadJob({
      ...job,
      status: target,
      completedAt: target === "COMPLETE" ? new Date().toISOString() : job.completedAt,
    });
  }

  return (
    <PerformanceV2PageFrame variation="workspace-explorer" className="pb-24">
      <PageHeading
        eyebrow="Performance 2.0"
        title="KPI Tree"
        description="Kelola alignment KPI lintas organisasi, cek kualitas cascade, dan monitor bulk upload dari satu workspace."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/performance-v2/kpi-library">Buka Kamus KPI</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/performance-v2/my-kpi">My KPI</Link>
            </Button>
          </div>
        }
      />
      <PersonaContextBar />

      <PerformanceV2SectionBand variation="workspace">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Target setting progress"
            value={`${state.treeAnalytics.targetSettingProgressPct}%`}
            description="Proporsi posisi yang portofolionya sudah memiliki target tahunan."
            trend={`${filteredPositions.length} posisi dalam scope`}
            trendTone="neutral"
          />
          <MetricCard
            label="Cascade health"
            value={`${state.treeAnalytics.cascadeHealthPct}%`}
            description="Kualitas relasi parent-child KPI berdasarkan fixture alignment terkini."
            trend={`${state.cascadeRelations.length} relasi aktif`}
            trendTone="success"
          />
          <MetricCard
            label="Alignment gaps"
            value={state.treeAnalytics.alignmentGapCount}
            description="Warning yang perlu ditindaklanjuti sebelum finalisasi KPI tahunan."
            trend={`${state.alignmentWarnings.length} warning aktif`}
            trendTone="warning"
          />
          <MetricCard
            label="Unallocated positions"
            value={state.treeAnalytics.unallocatedPositionCount}
            description="Posisi tanpa KPI atau posisi yang masih membutuhkan alokasi dari atasan."
            trend={`${positions.filter((position) => position.kpiCount === 0).length} kosong di fixture`}
            trendTone="destructive"
          />
        </section>

        <Card>
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle>Workspace KPI Tree</CardTitle>
                <CardDescription>{workspaceTitle} · state tersimpan di URL agar mudah dipakai saat demo atau review.</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                {VIEW_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={view === option.value ? "primary" : "outline"}
                    onClick={() => updateParams({ view: option.value, tab: "tree" })}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PerformanceV2FilterRail className="md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(13rem,0.9fr))] xl:grid-cols-[minmax(0,1.8fr)_repeat(2,minmax(14rem,0.75fr))]">
              <SearchInput
                placeholder="Cari posisi, incumbent, unit, atau KPI"
                value={search}
                onChange={(event) => updateParams({ search: event.currentTarget.value, positionId: null })}
                onClear={() => updateParams({ search: null })}
                aria-label="Cari dalam KPI Tree"
              />
              <Select value={companyId} onValueChange={(value) => updateParams({ companyId: value, orgUnitId: "all", positionId: null })}>
                <SelectTrigger aria-label="Filter company">
                  <SelectValue placeholder="Semua company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua company</SelectItem>
                  {state.companies.map((company) => (
                    <SelectItem key={company.company_id} value={company.company_id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={orgUnitId} onValueChange={(value) => updateParams({ orgUnitId: value, positionId: null })}>
                <SelectTrigger aria-label="Filter organisasi">
                  <SelectValue placeholder="Semua organisasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua organisasi</SelectItem>
                  {state.orgUnits
                    .filter((unit) => companyId === "all" || unit.company_id === companyId)
                    .map((unit) => (
                      <SelectItem key={unit.org_unit_id} value={unit.org_unit_id}>
                        {unit.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </PerformanceV2FilterRail>
          </CardContent>
        </Card>
      </PerformanceV2SectionBand>

      <Tabs value={tab} onValueChange={(value) => updateParams({ tab: value, warningType: value === "warnings" ? warningType : null })}>
        <TabsList className="h-auto flex-wrap">
          {TAB_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <TabsTrigger key={option.value} value={option.value} className="gap-2">
                <Icon className="size-4" />
                {option.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="tree" className="space-y-4">
          {view === "org" ? (
            <OrganizationWorkspace
              filteredPositions={filteredPositions}
              orgTreeNodes={state.orgTreeNodes}
              positions={positions}
              selectedPositionId={positionId}
              selectedCompanyId={companyId}
              selectedOrgUnitId={orgUnitId}
              orgPathMap={orgPathMap}
              warnings={state.alignmentWarnings}
              onSelectCompany={(nextCompanyId) => updateParams({ companyId: nextCompanyId, orgUnitId: "all", positionId: null })}
              onSelectOrg={(nextOrgUnitId) => updateParams({ orgUnitId: nextOrgUnitId, positionId: null })}
              onSelectPosition={openPosition}
            />
          ) : (
            <HierarchyWorkspace
              hierarchy={hierarchyModel}
              selectedPositionId={positionId}
              selectedKpiId={kpiId}
              onSelectPosition={openPosition}
              onSelectKpi={(nextKpiId) => updateParams({ kpiId: nextKpiId })}
            />
          )}
        </TabsContent>

        <TabsContent value="warnings" className="space-y-4">
          <WarningQualityPanel
            warnings={warnings}
            warningType={warningType}
            warningSummary={warningSummary}
            getItem={(itemId) => (itemId ? itemMap.get(itemId) : undefined)}
            getPosition={(nextPositionId) => positions.find((position) => position.positionId === nextPositionId)}
            getPositionForItem={(itemId) => {
              const nextPositionId = itemToPositionId.get(itemId);
              return nextPositionId ? positions.find((position) => position.positionId === nextPositionId) : undefined;
            }}
            onWarningTypeChange={(value) => updateParams({ warningType: value })}
            onJump={jumpToWarning}
          />
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <BulkUploadPanel
            jobs={state.bulkUploadJobs}
            activeJobId={jobId}
            activeJob={job}
            onSelectJob={(nextJobId) => updateParams({ jobId: nextJobId })}
            onAdvance={handleJobAdvance}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsPanel
            analytics={state.treeAnalytics}
            hotspotPositions={hotspotPositions}
            ownershipBars={analyticsBars}
            onSelectPosition={openPosition}
          />
        </TabsContent>
      </Tabs>

      <Sheet open={selectedPosition != null} onOpenChange={(open) => (!open ? closePositionSheet() : undefined)}>
        <SheetContent side="right" presentation="floating" className="flex w-full flex-col sm:max-w-2xl">
          {selectedPosition ? (
            <PositionDetailSheetContent
              position={selectedPosition}
              items={selectedPosition.kpiItemIds.map((id) => itemMap.get(id)).filter(Boolean) as KpiItem[]}
              warnings={state.alignmentWarnings.filter((warning) => warning.affectedPositionId === selectedPosition.positionId || selectedPosition.kpiItemIds.includes(warning.affectedItemId ?? ""))}
              score={selectedPosition.incumbentEmployeeNumber ? portfolioScoreMap.get(selectedPosition.incumbentEmployeeNumber) : undefined}
              changes={changeLogsForSelectedPosition}
              incumbentDisplay={
                selectedPosition.incumbentEmployeeNumber
                  ? `${getEmployeeDisplay(selectedPosition.incumbentEmployeeNumber)} · ${getPositionTitleForEmployee(selectedPosition.incumbentEmployeeNumber) ?? selectedPosition.title}`
                  : "Posisi belum memiliki incumbent"
              }
              onInspectKpi={(nextKpiId) => updateParams({ tab: "tree", view: "hierarchy", kpiId: nextKpiId })}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={activeKpiDialogNode != null} onOpenChange={(open) => (!open ? updateParams({ kpiId: null }) : undefined)}>
        {activeKpiDialogNode ? (
          <KpiDetailDialog
            node={activeKpiDialogNode}
            hierarchy={hierarchyModel}
            onSelectKpi={(nextKpiId) => updateParams({ kpiId: nextKpiId })}
            onSelectPosition={openPosition}
          />
        ) : null}
      </Dialog>
    </PerformanceV2PageFrame>
  );
}

function OrganizationWorkspace({
  orgTreeNodes,
  positions,
  filteredPositions,
  selectedPositionId,
  selectedCompanyId,
  selectedOrgUnitId,
  orgPathMap,
  warnings,
  onSelectCompany,
  onSelectOrg,
  onSelectPosition,
}: {
  orgTreeNodes: OrgTreeNode[];
  positions: PositionSummary[];
  filteredPositions: PositionSummary[];
  selectedPositionId: string | null;
  selectedCompanyId: string;
  selectedOrgUnitId: string;
  orgPathMap: Map<string, string[]>;
  warnings: AlignmentWarning[];
  onSelectCompany: (companyId: string) => void;
  onSelectOrg: (orgUnitId: string) => void;
  onSelectPosition: (positionId: string) => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <Card>
        <CardHeader>
          <CardTitle>Organization View</CardTitle>
          <CardDescription>Pilih company atau unit untuk memfokuskan posisi yang perlu penataan KPI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {orgTreeNodes.map((node) => (
            <OrgNodeCard
              key={node.organizationId}
              node={node}
              depth={0}
              selectedCompanyId={selectedCompanyId}
              selectedOrgUnitId={selectedOrgUnitId}
              orgPathMap={orgPathMap}
              onSelectCompany={onSelectCompany}
              onSelectOrg={onSelectOrg}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle>Posisi dalam scope</CardTitle>
              <CardDescription>{filteredPositions.length} posisi relevan untuk review alignment dan assignment.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="neutral">
                <Users className="size-3.5" />
                {positions.length} total posisi
              </Badge>
              <Badge variant="warning">
                <ShieldAlert className="size-3.5" />
                {warnings.length} warning aktif
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredPositions.length === 0 ? (
            <EmptyState
              title="Tidak ada posisi dalam filter ini"
              description="Coba longgarkan company, organisasi, atau kata pencarian."
            />
          ) : (
            filteredPositions.map((position) => (
              <button
                key={position.positionId}
                type="button"
                onClick={() => onSelectPosition(position.positionId)}
                className={cn(
                  "w-full rounded-2xl border px-4 py-4 text-left transition-colors hover:bg-muted/30",
                  selectedPositionId === position.positionId ? "border-primary bg-primary/5" : "border-border bg-card"
                )}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground">{position.title}</h3>
                      <Badge variant={RISK_VARIANT[position.riskStatus]}>{RISK_LABEL[position.riskStatus]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {position.incumbentName ?? "Vacant"} {position.incumbentEmployeeNumber ? `· NIK ${position.incumbentEmployeeNumber}` : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {position.companyName ?? "—"} · {position.orgUnitName} · {position.bandJabatan}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs sm:min-w-60">
                    <SummaryChip label="KPI" value={position.kpiCount} />
                    <SummaryChip label="Menunggu" value={position.waitingApprovalCount} tone="warning" />
                    <SummaryChip label="Direct reports" value={position.directReports} />
                  </div>
                </div>
              </button>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function OrgNodeCard({
  node,
  depth,
  selectedCompanyId,
  selectedOrgUnitId,
  orgPathMap,
  onSelectCompany,
  onSelectOrg,
}: {
  node: OrgTreeNode;
  depth: number;
  selectedCompanyId: string;
  selectedOrgUnitId: string;
  orgPathMap: Map<string, string[]>;
  onSelectCompany: (companyId: string) => void;
  onSelectOrg: (orgUnitId: string) => void;
}) {
  const isCompany = node.type === "COMPANY";
  const isSelected = isCompany ? selectedCompanyId === node.organizationId : selectedOrgUnitId === node.organizationId;
  const paddingLeft = depth * 18;
  const breadcrumb = orgPathMap.get(node.organizationId)?.join(" / ");

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => (isCompany ? onSelectCompany(node.organizationId) : onSelectOrg(node.organizationId))}
        className={cn(
          "w-full rounded-xl border px-4 py-3 text-left transition-colors hover:bg-muted/30",
          isSelected ? "border-primary bg-primary/5" : "border-border bg-background"
        )}
        style={{ paddingLeft: 16 + paddingLeft }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {isCompany ? <Building2 className="size-4 text-muted-foreground" /> : <FolderTree className="size-4 text-muted-foreground" />}
              <span className="font-medium text-foreground">{node.name}</span>
              <Badge variant="neutral">{node.type}</Badge>
            </div>
            {breadcrumb ? <p className="text-xs text-muted-foreground">{breadcrumb}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="neutral">{node.positionCount} posisi</Badge>
            <Badge variant="info">{node.kpiCount} KPI</Badge>
            <Badge variant="warning">{node.pendingApprovalCount} pending</Badge>
          </div>
        </div>
      </button>
      {node.childNodes.length > 0 ? (
        <div className="space-y-2">
          {node.childNodes.map((child) => (
            <OrgNodeCard
              key={child.organizationId}
              node={child}
              depth={depth + 1}
              selectedCompanyId={selectedCompanyId}
              selectedOrgUnitId={selectedOrgUnitId}
              orgPathMap={orgPathMap}
              onSelectCompany={onSelectCompany}
              onSelectOrg={onSelectOrg}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HierarchyWorkspace({
  hierarchy,
  selectedPositionId,
  selectedKpiId,
  onSelectPosition,
  onSelectKpi,
}: {
  hierarchy: KpiHierarchyModel;
  selectedPositionId: string | null;
  selectedKpiId: string | null;
  onSelectPosition: (positionId: string) => void;
  onSelectKpi: (kpiId: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardTitle>KPI Structure View</CardTitle>
            <CardDescription>Lihat KPI dalam tree hierarkis, bukan hanya daftar relasi parent-child.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <KpiTypeBadge type="BERSAMA" />
            <KpiTypeBadge type="UNIT" />
            <Badge variant="info">Direct</Badge>
            <Badge variant="neutral">Indirect</Badge>
            <Badge variant="warning">Accumulation</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <SummaryChip label="KPI terlihat" value={hierarchy.stats.visibleCount} />
          <SummaryChip label="Root KPI" value={hierarchy.stats.rootCount} />
          <SummaryChip label="Relasi cascade" value={hierarchy.stats.relationCount} tone="success" />
          <SummaryChip label="Bersama / Unit" value={`${hierarchy.stats.bersamaCount} / ${hierarchy.stats.unitCount}`} />
        </div>

        <div className="flex flex-wrap gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
          <span>Klik judul KPI untuk membuka modal detail relasi.</span>
          <span>KPI Bersama dan KPI Unit dibedakan dengan warna badge.</span>
          <span>Label `Direct`, `Indirect`, dan `Accumulation` tetap tampil di dekat header agar mudah dibaca.</span>
        </div>

        {hierarchy.roots.length > 0 ? (
          <div className="space-y-4">
            {hierarchy.roots.map((node) => (
              <HierarchyTreeBranch
                key={node.id}
                node={node}
                depth={0}
                selectedKpiId={selectedKpiId}
                selectedPositionId={selectedPositionId}
                onSelectKpi={onSelectKpi}
                onSelectPosition={onSelectPosition}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="Belum ada struktur KPI" description="Filter saat ini belum menampilkan node KPI yang bisa dirangkai menjadi tree." />
        )}
      </CardContent>
    </Card>
  );
}

function WarningQualityPanel({
  warnings,
  warningType,
  warningSummary,
  getItem,
  getPosition,
  getPositionForItem,
  onWarningTypeChange,
  onJump,
}: {
  warnings: AlignmentWarning[];
  warningType: string;
  warningSummary: Map<AlignmentWarning["type"], number>;
  getItem: (itemId?: string) => KpiItem | undefined;
  getPosition: (positionId?: string) => PositionSummary | undefined;
  getPositionForItem: (itemId: string) => PositionSummary | undefined;
  onWarningTypeChange: (value: string) => void;
  onJump: (warning: AlignmentWarning) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Warning & quality panel</CardTitle>
            <CardDescription>Drilldown isu alignment sebelum KPI dibuka untuk approval final.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" variant={warningType === "all" ? "primary" : "outline"} onClick={() => onWarningTypeChange("all")}>
                Semua
              </Button>
              {Object.entries(WARNING_LABEL).map(([key, label]) => (
                <Button
                  key={key}
                  type="button"
                  size="sm"
                  variant={warningType === key ? "primary" : "outline"}
                  onClick={() => onWarningTypeChange(key)}
                >
                  {label}
                </Button>
              ))}
            </div>

            {warnings.length === 0 ? (
              <EmptyState title="Tidak ada warning dalam filter ini" description="Scope yang dipilih saat ini terlihat bersih pada fixture demo." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Objek terkait</TableHead>
                    <TableHead className="w-28 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warnings.map((warning) => {
                    const item = getItem(warning.affectedItemId);
                    const position = warning.affectedPositionId
                      ? getPosition(warning.affectedPositionId)
                      : warning.affectedItemId
                        ? getPositionForItem(warning.affectedItemId)
                        : undefined;
                    const relatedLabel = item?.title ?? position?.title ?? "—";
                    return (
                      <TableRow key={warning.id}>
                        <TableCell>
                          <Badge variant={statusToneForWarning(warning.type)}>{WARNING_LABEL[warning.type]}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[32rem] text-sm text-muted-foreground">{warning.description}</TableCell>
                        <TableCell>
                          <div className="font-medium">{relatedLabel}</div>
                          {item?.code ? <div className="text-xs text-muted-foreground">{item.code}</div> : null}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button type="button" size="sm" variant="outline" onClick={() => onJump(warning)}>
                            Sorot
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ringkasan kualitas</CardTitle>
            <CardDescription>Pecahan warning yang paling sering muncul pada scope aktif.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(WARNING_LABEL).map(([type, label]) => (
              <div key={type} className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="size-4 text-warning" />
                    <span className="font-medium text-foreground">{label}</span>
                  </div>
                  <span className="text-lg font-semibold tabular-nums">{warningSummary.get(type as AlignmentWarning["type"]) ?? 0}</span>
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
              Warning dengan level tertinggi saat ini adalah <span className="font-medium text-foreground">weight mismatch</span> dan
              <span className="font-medium text-foreground"> unallocated position</span>.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BulkUploadPanel({
  jobs,
  activeJobId,
  activeJob,
  onSelectJob,
  onAdvance,
}: {
  jobs: BulkUploadJob[];
  activeJobId: string;
  activeJob: BulkUploadJob | null;
  onSelectJob: (jobId: string) => void;
  onAdvance: (target: BulkUploadJob["status"]) => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
      <Card>
        <CardHeader>
          <CardTitle>Bulk upload jobs</CardTitle>
          <CardDescription>Panel dry-run untuk file template KPI lintas posisi.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {jobs.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => onSelectJob(job.id)}
              className={cn(
                "w-full rounded-2xl border px-4 py-4 text-left transition-colors hover:bg-muted/30",
                activeJobId === job.id ? "border-primary bg-primary/5" : "border-border bg-card"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-foreground">{job.fileName}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{formatDateTime(job.createdAt)}</div>
                </div>
                <Badge variant={JOB_STATUS_VARIANT[job.status]}>{JOB_STATUS_LABEL[job.status]}</Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <SummaryChip label="Rows" value={job.totalRows} />
                <SummaryChip label="Valid" value={job.validRows} tone="success" />
                <SummaryChip label="Error" value={job.errorRows} tone={job.errorRows > 0 ? "destructive" : "neutral"} />
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle>Dry-run result</CardTitle>
              <CardDescription>
                {activeJob ? `${activeJob.fileName} · ${JOB_STATUS_LABEL[activeJob.status]}` : "Pilih job untuk melihat detail validasi."}
              </CardDescription>
            </div>
            {activeJob ? <Badge variant={JOB_STATUS_VARIANT[activeJob.status]}>{JOB_STATUS_LABEL[activeJob.status]}</Badge> : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!activeJob ? (
            <EmptyState title="Belum ada job aktif" description="Fixture bulk upload belum tersedia." />
          ) : (
            <>
              <div className="grid gap-3 md:grid-cols-3">
                <SummaryChip label="Valid rows" value={`${activeJob.validRows}/${activeJob.totalRows}`} tone="success" />
                <SummaryChip label="Rows with error" value={activeJob.errorRows} tone={activeJob.errorRows > 0 ? "destructive" : "neutral"} />
                <SummaryChip label="Uploader" value={activeJob.uploadedBy} />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline">
                  <FileSpreadsheet className="size-4" />
                  Unduh template
                </Button>
                {activeJob.status === "VALIDATION_COMPLETE" ? (
                  <Button type="button" onClick={() => onAdvance("IMPORTING")}>
                    Import {activeJob.validRows} baris valid
                  </Button>
                ) : null}
                {activeJob.status === "IMPORTING" ? (
                  <Button type="button" onClick={() => onAdvance("COMPLETE")}>
                    Tandai import selesai
                  </Button>
                ) : null}
                {(activeJob.status === "COMPLETE" || activeJob.status === "FAILED") ? (
                  <Button type="button" variant="outline" onClick={() => onAdvance("VALIDATION_COMPLETE")}>
                    Kembali ke hasil validasi
                  </Button>
                ) : null}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    <TableHead>Validation result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeJob.errorDetails.map((detail) => (
                    <TableRow key={`${activeJob.id}-${detail.row}`}>
                      <TableCell className="tabular-nums">{detail.row}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{detail.error}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsPanel({
  analytics,
  hotspotPositions,
  ownershipBars,
  onSelectPosition,
}: {
  analytics: {
    targetSettingProgressPct: number;
    cascadeHealthPct: number;
    alignmentGapCount: number;
    unallocatedPositionCount: number;
    ownershipDistribution: {
      ownerPct: number;
      sharedOwnerPct: number;
      collaboratorPct: number;
    };
  };
  hotspotPositions: PositionSummary[];
  ownershipBars: Array<{ label: string; value: number; detail: string; tone: "primary" | "secondary" | "accent" }>;
  onSelectPosition: (positionId: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ChartContainer
          title="Health snapshot"
          description="Overview cepat kesiapan target setting, cascade health, dan distribusi ownership."
          legend={[
            { label: "Owner", value: `${analytics.ownershipDistribution.ownerPct}%`, tone: "primary" },
            { label: "Shared owner", value: `${analytics.ownershipDistribution.sharedOwnerPct}%`, tone: "secondary" },
            { label: "Collaborator", value: `${analytics.ownershipDistribution.collaboratorPct}%`, tone: "accent" },
          ]}
        >
          <ProgressCluster
            items={[
              { label: "Target setting progress", value: analytics.targetSettingProgressPct, variant: "primary" },
              { label: "Cascade health", value: analytics.cascadeHealthPct, variant: "success" },
            ]}
          />
        </ChartContainer>

        <ChartContainer title="Ownership distribution" description="Distribusi ownership KPI lintas posisi.">
          <BarChart data={ownershipBars} yAxisLabel="Persentase" xAxisLabel="Role owner" />
        </ChartContainer>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Prioritas tindak lanjut</CardTitle>
            <CardDescription>Posisi yang paling layak dibuka lebih dulu saat demo review alignment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {hotspotPositions.map((position) => (
              <button
                key={position.positionId}
                type="button"
                onClick={() => onSelectPosition(position.positionId)}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/30"
              >
                <div>
                  <div className="font-medium text-foreground">{position.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {position.incumbentName ?? "Vacant"} · {position.orgUnitName}
                  </div>
                </div>
                <Badge variant={RISK_VARIANT[position.riskStatus]}>{RISK_LABEL[position.riskStatus]}</Badge>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alignment cues</CardTitle>
            <CardDescription>Catatan ringkas yang membantu reviewer membaca kondisi portofolio saat ini.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <InsightCard
              icon={CheckCircle2}
              title="Target setting"
              description={`${analytics.targetSettingProgressPct}% posisi sudah punya target tahunan. Fokuskan sisanya pada posisi vacant dan unit baru.`}
            />
            <InsightCard
              icon={Link2}
              title="Cascade health"
              description={`${analytics.cascadeHealthPct}% relasi parent-child terlihat sehat, tetapi masih ada gap alignment yang perlu diresolusikan.`}
            />
            <InsightCard
              icon={AlertTriangle}
              title="Alignment gaps"
              description={`${analytics.alignmentGapCount} gap aktif menandakan masih ada orphan KPI, mismatch bobot, atau posisi tanpa alokasi.`}
            />
            <InsightCard
              icon={Users}
              title="Unallocated positions"
              description={`${analytics.unallocatedPositionCount} posisi perlu assignment KPI sebelum siklus approval tim dimulai.`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PositionDetailSheetContent({
  position,
  items,
  warnings,
  score,
  changes,
  incumbentDisplay,
  onInspectKpi,
}: {
  position: PositionSummary;
  items: KpiItem[];
  warnings: AlignmentWarning[];
  score?: {
    finalPI: number;
    finalAchievementPct: number;
    ratingLabel: string;
  };
  changes: KpiChangeLog[];
  incumbentDisplay: string;
  onInspectKpi: (kpiId: string) => void;
}) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{position.title}</SheetTitle>
        <SheetDescription>{incumbentDisplay}</SheetDescription>
      </SheetHeader>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        <div className="grid gap-3 sm:grid-cols-2">
          <SummaryChip label="Org unit" value={position.orgUnitName} />
          <SummaryChip label="Band" value={position.bandJabatan} />
          <SummaryChip label="KPI aktif" value={position.kpiCount} />
          <SummaryChip label="Risk status" value={RISK_LABEL[position.riskStatus]} tone={RISK_VARIANT[position.riskStatus]} />
        </div>

        {score ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance signal</CardTitle>
              <CardDescription>Ringkasan cepat dari scorecard posisi ini.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              <SummaryChip label="Final PI" value={score.finalPI.toFixed(2)} tone="success" />
              <SummaryChip label="Achievement" value={percentText(score.finalAchievementPct)} />
              <SummaryChip label="Rating" value={score.ratingLabel} />
            </CardContent>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Portfolio KPI</CardTitle>
            <CardDescription>Item KPI yang melekat pada posisi ini. Klik untuk inspect cascade di hierarchy view.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.length === 0 ? (
              <EmptyState title="Belum ada KPI pada posisi ini" description="Posisi ini termasuk kandidat unallocated yang perlu assignment KPI." />
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onInspectKpi(item.id)}
                  className="flex w-full items-start justify-between rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/30"
                >
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.code ?? item.id} · {item.kpiType} · {item.targetValue ?? "—"} {item.targetUnit}
                    </div>
                  </div>
                  <Badge variant={item.dictionaryItemId ? "info" : "neutral"}>{item.dictionaryItemId ? "Linked" : "Custom"}</Badge>
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Alignment notes</CardTitle>
            <CardDescription>Warning dan histori perubahan yang relevan dengan posisi ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {warnings.map((warning) => (
              <div key={warning.id} className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={statusToneForWarning(warning.type)}>{WARNING_LABEL[warning.type]}</Badge>
                  <span className="text-sm text-muted-foreground">{warning.description}</span>
                </div>
              </div>
            ))}
            {changes.map((change) => (
              <div key={change.id} className="rounded-xl border border-border bg-card px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-foreground">{CHANGE_TYPE_LABEL[change.changeType]}</div>
                    <div className="text-xs text-muted-foreground">{compactChangeDetail(change)}</div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>{change.changedBy}</div>
                    <div>{formatDateTime(change.createdAt)}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <SheetFooter className="border-t border-border pt-4">
        <div className="flex w-full flex-wrap justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline">
              Kelola KPI Bersama
            </Button>
            <Button type="button" variant="outline">
              Atur cap realisasi
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline">
              Hubungkan ke Kamus KPI
            </Button>
            <Button type="button">Tambah KPI</Button>
          </div>
        </div>
      </SheetFooter>
    </>
  );
}

function KpiTypeBadge({ type }: { type: KpiItem["kpiType"] }) {
  return (
    <Badge variant="neutral" className="px-1.5 text-[10px] leading-4" style={KPI_TYPE_BADGE_STYLES[type]}>
      {formatKpiTypeLabel(type)}
    </Badge>
  );
}

function KpiDetailDialog({
  node,
  hierarchy,
  onSelectKpi,
  onSelectPosition,
}: {
  node: KpiHierarchyNode;
  hierarchy: KpiHierarchyModel;
  onSelectKpi: (kpiId: string) => void;
  onSelectPosition: (positionId: string) => void;
}) {
  const parentNode = node.parentId ? hierarchy.index.get(node.parentId) ?? null : null;

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">{node.parentId ? "Child KPI" : "Root KPI"}</Badge>
          <KpiTypeBadge type={node.item.kpiType} />
          {node.relationToParent ? (
            <Badge variant={node.relationToParent.cascadeMethod === "DIRECT" ? "info" : "neutral"}>
              <GitBranch className="size-3.5" />
              {node.relationToParent.cascadeMethod}
            </Badge>
          ) : null}
        </div>
        <DialogTitle className="pr-8">{node.item.title}</DialogTitle>
        <DialogDescription>
          {node.item.code ?? node.item.id} · Target {formatTargetSummary(node.item)} · {node.item.monitoringPeriod}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {node.item.description ? (
          <div className="rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">{node.item.description}</div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryChip label="Tipe KPI" value={formatKpiTypeLabel(node.item.kpiType)} />
          <SummaryChip label="Target" value={formatTargetSummary(node.item)} />
          <SummaryChip label="Monitoring" value={node.item.monitoringPeriod} />
          <SummaryChip label="Child KPI" value={node.children.length} />
        </div>

        {node.position ? (
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Owner position</div>
            <button type="button" className="mt-2 text-left" onClick={() => onSelectPosition(node.position!.positionId)}>
              <div className="font-medium text-foreground hover:text-primary">{node.position.title}</div>
              <div className="text-xs text-muted-foreground">
                {node.position.incumbentName ?? "Vacant"} · {node.position.orgUnitName}
              </div>
            </button>
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Parent KPI</div>
            {parentNode ? (
              <button type="button" className="mt-2 w-full rounded-lg border border-border bg-muted/20 px-3 py-3 text-left transition-colors hover:bg-muted/40" onClick={() => onSelectKpi(parentNode.item.id)}>
                <div className="flex flex-wrap items-center gap-2">
                  <KpiTypeBadge type={parentNode.item.kpiType} />
                  {parentNode.relationToParent ? (
                    <Badge variant={parentNode.relationToParent.cascadeMethod === "DIRECT" ? "info" : "neutral"}>
                      {parentNode.relationToParent.cascadeMethod}
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-2 font-medium text-foreground">{parentNode.item.title}</div>
                <div className="text-xs text-muted-foreground">{parentNode.item.code ?? parentNode.item.id}</div>
              </button>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">KPI ini berada di level root.</p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Child KPI</div>
            {node.children.length > 0 ? (
              <div className="mt-2 space-y-2">
                {node.children.map((childNode) => (
                  <button
                    key={childNode.id}
                    type="button"
                    onClick={() => onSelectKpi(childNode.item.id)}
                    className="w-full rounded-lg border border-border bg-muted/20 px-3 py-3 text-left transition-colors hover:bg-muted/40"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <KpiTypeBadge type={childNode.item.kpiType} />
                      {childNode.relationToParent ? (
                        <Badge variant={childNode.relationToParent.cascadeMethod === "DIRECT" ? "info" : "neutral"}>
                          {childNode.relationToParent.cascadeMethod}
                        </Badge>
                      ) : null}
                    </div>
                    <div className="mt-2 font-medium text-foreground">{childNode.item.title}</div>
                    <div className="text-xs text-muted-foreground">{childNode.item.code ?? childNode.item.id}</div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Belum ada child KPI yang terkait.</p>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function HierarchyTreeBranch({
  node,
  depth,
  selectedKpiId,
  selectedPositionId,
  onSelectPosition,
  onSelectKpi,
}: {
  node: KpiHierarchyNode;
  depth: number;
  selectedKpiId: string | null;
  selectedPositionId: string | null;
  onSelectPosition: (positionId: string) => void;
  onSelectKpi: (kpiId: string) => void;
}) {
  const isActive = selectedKpiId === node.item.id || (node.position != null && selectedPositionId === node.position.positionId);
  const metaParts = [
    node.item.code ?? node.item.id,
    node.position?.title,
    node.position?.incumbentName ?? (node.position ? "Vacant" : undefined),
    `Target ${formatTargetSummary(node.item)}`,
    `${node.children.length} child`,
  ].filter(Boolean);

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "rounded-xl border px-3 py-2.5",
          isActive ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card"
        )}
        style={{ marginLeft: depth * 18 }}
      >
        <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="neutral" className="px-1.5 text-[10px] leading-4">
                {node.parentId ? "Child" : "Root"}
              </Badge>
              <KpiTypeBadge type={node.item.kpiType} />
              {node.relationToParent ? (
                <Badge
                  variant={node.relationToParent.cascadeMethod === "DIRECT" ? "info" : "neutral"}
                  className="px-1.5 text-[10px] leading-4"
                >
                  {node.relationToParent.cascadeMethod}
                </Badge>
              ) : null}
            </div>
            <button type="button" onClick={() => onSelectKpi(node.item.id)} className="min-w-0 text-left">
              <div className="truncate text-sm font-semibold text-foreground hover:text-primary">{node.item.title}</div>
            </button>
            <p className="truncate text-[11px] text-muted-foreground">{metaParts.join(" · ")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <Badge variant="neutral" className="px-1.5 text-[10px] leading-4">
              {node.item.monitoringPeriod}
            </Badge>
            {node.position ? (
              <Button type="button" size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => onSelectPosition(node.position!.positionId)}>
                Posisi
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {node.children.length > 0 ? (
        <div
          className="space-y-2 border-l border-border/70 pl-3"
          style={{ marginLeft: depth * 18 + 10 }}
        >
          {node.children.map((childNode) => (
            <HierarchyTreeBranch
              key={childNode.id}
              node={childNode}
              depth={depth + 1}
              selectedKpiId={selectedKpiId}
              selectedPositionId={selectedPositionId}
              onSelectPosition={onSelectPosition}
              onSelectKpi={onSelectKpi}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function LegendRow({
  label,
  description,
  badgeVariant,
}: {
  label: string;
  description: string;
  badgeVariant: "info" | "neutral" | "warning";
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2">
        <Badge variant={badgeVariant}>{label}</Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function InsightCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Info;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-muted p-2 text-muted-foreground">
          <Icon className="size-4" />
        </div>
        <div>
          <div className="font-medium text-foreground">{title}</div>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SummaryChip({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  tone?: "neutral" | "warning" | "success" | "destructive";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-3 py-2",
        tone === "success" && "border-success/30 bg-success/5",
        tone === "warning" && "border-warning/30 bg-warning/5",
        tone === "destructive" && "border-destructive/30 bg-destructive/5",
        tone === "neutral" && "border-border bg-background"
      )}
    >
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
