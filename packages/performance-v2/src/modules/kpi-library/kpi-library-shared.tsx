import { Badge, badgeVariants } from "@rinjani/shared-ui";
import type { VariantProps } from "class-variance-authority";
import type {
  BandJabatanSemantic,
  BscPerspective,
  CapType,
  DictionaryApprovalRecord,
  DictionaryItemStatus,
  DictionaryLockedAttribute,
  DictionarySourceModule,
  DictionaryValidationRecord,
  KpiDictionaryItem,
  MonitoringPeriod,
  Polarity,
} from "../../lib/domain/types";

export const dictionaryLockedAttributeOptions: Array<{ value: DictionaryLockedAttribute; label: string }> = [
  { value: "title", label: "Judul KPI" },
  { value: "description", label: "Deskripsi" },
  { value: "polarity", label: "Polaritas" },
  { value: "targetUnit", label: "Satuan target" },
  { value: "bscPerspective", label: "Perspektif BSC" },
  { value: "monitoringPeriod", label: "Periode monitoring" },
  { value: "capType", label: "Cap realisasi" },
  { value: "formula", label: "Formula" },
];

export const dictionarySourceOptions: Array<{ value: DictionarySourceModule; label: string }> = [
  { value: "DIRECT", label: "Ajukan langsung" },
  { value: "MY_PERFORMANCE", label: "Dari My KPI" },
  { value: "MY_TEAM_PERFORMANCE", label: "Dari My Team KPI" },
  { value: "PERFORMANCE_TREE", label: "Dari KPI Tree" },
];

export const bscPerspectiveOptions: Array<{ value: BscPerspective; label: string }> = [
  { value: "FINANCIAL", label: "Financial" },
  { value: "CUSTOMER", label: "Customer" },
  { value: "INTERNAL_PROCESS", label: "Internal Process" },
  { value: "LEARNING_GROWTH", label: "Learning & Growth" },
];

export const polarityOptions: Array<{ value: Polarity; label: string }> = [
  { value: "POSITIVE", label: "Positive" },
  { value: "NEGATIVE", label: "Negative" },
  { value: "NEUTRAL", label: "Neutral" },
];

export const monitoringPeriodOptions: Array<{ value: MonitoringPeriod; label: string }> = [
  { value: "QUARTERLY", label: "Kuartalan" },
  { value: "SEMESTER", label: "Semester" },
  { value: "ANNUAL", label: "Tahunan" },
];

export const capTypeOptions: Array<{ value: CapType; label: string }> = [
  { value: "NO_CAP", label: "Tanpa cap" },
  { value: "CAPPED_100", label: "Cap 100%" },
  { value: "CAPPED_110", label: "Cap 110%" },
  { value: "CAPPED_120", label: "Cap 120%" },
  { value: "CUSTOM", label: "Custom" },
];

export const functionOptions = [
  "HC Planning",
  "HC Operation",
  "Business Development",
  "Safety & Quality",
  "Customer Experience",
  "Finance Strategy",
] as const;

export const bandOptions: BandJabatanSemantic[] = ["Utama", "Madya", "Muda", "Pratama"];

const dictionaryStatusVariantMap: Record<DictionaryItemStatus, VariantProps<typeof badgeVariants>["variant"]> = {
  DRAFT: "neutral",
  PENDING_VALIDATION: "attention",
  VALIDATED: "info",
  PENDING_APPROVAL: "warning",
  PUBLISHED: "success",
  DEPRECATED: "destructive",
};

const dictionaryStatusLabelMap: Record<DictionaryItemStatus, string> = {
  DRAFT: "Draft",
  PENDING_VALIDATION: "Menunggu validasi",
  VALIDATED: "Tervalidasi",
  PENDING_APPROVAL: "Menunggu approval",
  PUBLISHED: "Published",
  DEPRECATED: "Deprecated",
};

export function DictionaryStatusBadge({ status }: { status: DictionaryItemStatus }) {
  return <Badge variant={dictionaryStatusVariantMap[status]}>{dictionaryStatusLabelMap[status]}</Badge>;
}

export function getDictionaryStatusLabel(status: DictionaryItemStatus) {
  return dictionaryStatusLabelMap[status];
}

export function getSourceModuleLabel(source?: DictionarySourceModule) {
  if (!source) {
    return "Belum ditandai";
  }
  return dictionarySourceOptions.find((option) => option.value === source)?.label ?? source;
}

export function getBscLabel(value?: BscPerspective) {
  if (!value) {
    return "Belum diatur";
  }
  return bscPerspectiveOptions.find((option) => option.value === value)?.label ?? value;
}

export function getCapTypeLabel(value?: CapType) {
  if (!value) {
    return "Belum diatur";
  }
  return capTypeOptions.find((option) => option.value === value)?.label ?? value;
}

export function getMonitoringLabel(value?: MonitoringPeriod) {
  if (!value) {
    return "Belum diatur";
  }
  return monitoringPeriodOptions.find((option) => option.value === value)?.label ?? value;
}

export function getPolarityLabel(value?: Polarity) {
  if (!value) {
    return "Belum diatur";
  }
  return polarityOptions.find((option) => option.value === value)?.label ?? value;
}

export function getLockedAttributeLabel(value: DictionaryLockedAttribute) {
  return dictionaryLockedAttributeOptions.find((option) => option.value === value)?.label ?? value;
}

export function getLatestDictionaryValidation(
  itemId: string,
  records: DictionaryValidationRecord[],
) {
  return [...records]
    .filter((record) => record.dictionaryItemId === itemId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

export function getLatestDictionaryApproval(
  itemId: string,
  records: DictionaryApprovalRecord[],
) {
  return [...records]
    .filter((record) => record.dictionaryItemId === itemId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

export function formatDateTime(value?: string) {
  if (!value) {
    return "Belum tercatat";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function buildDictionaryCode(title: string, perspective: BscPerspective) {
  const prefixMap: Record<BscPerspective, string> = {
    FINANCIAL: "FIN",
    CUSTOMER: "CUS",
    INTERNAL_PROCESS: "OPS",
    LEARNING_GROWTH: "HR",
  };
  const words = title
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.slice(0, 3));
  return `${prefixMap[perspective]}-${words.join("") || "KPI"}`;
}

export function nextDictionaryId(items: KpiDictionaryItem[]) {
  const maxId = items.reduce((highest, item) => {
    const numeric = Number(item.id.replaceAll(/\D/g, ""));
    return Number.isFinite(numeric) ? Math.max(highest, numeric) : highest;
  }, 200);
  return `DIC-${String(maxId + 1).padStart(3, "0")}`;
}
