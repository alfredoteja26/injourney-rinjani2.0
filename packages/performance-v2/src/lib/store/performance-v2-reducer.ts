import type {
  DictionaryApprovalRecord,
  DictionaryValidationRecord,
  ExtensionRequest,
  HqAdjustmentRequest,
  KpiChangeRequest,
  KpiChangeRequestStatus,
  KpiDictionaryItem,
  KpiItem,
  KpiItemApprovalStatus,
  KpiOwnership,
  KpiRealization,
  KpiTarget,
  PerformanceV2AuditEntry,
  PortfolioScore,
  RealizationEvidence,
} from "../domain/types";
import type { PerformanceV2FixtureBundle } from "../fixtures/initial-state";

export interface PerformanceV2State extends PerformanceV2FixtureBundle {
  auditLog: PerformanceV2AuditEntry[];
}

export type PerformanceV2Action =
  | { type: "APPEND_AUDIT"; entry: PerformanceV2AuditEntry }
  | { type: "RESET_FIXTURES"; bundle: PerformanceV2FixtureBundle }
  | { type: "SET_KPI_ITEM_STATUSES_FOR_EMPLOYEE"; employeeNumber: string; from: KpiItemApprovalStatus; to: KpiItemApprovalStatus }
  | { type: "SET_DICTIONARY_STATUS"; dictionaryId: string; status: PerformanceV2State["dictionaryItems"][number]["status"] }
  | { type: "ADD_DICTIONARY_ITEM"; item: KpiDictionaryItem }
  | { type: "ADD_DICTIONARY_VALIDATION_RECORD"; record: DictionaryValidationRecord; nextStatus: PerformanceV2State["dictionaryItems"][number]["status"] }
  | { type: "ADD_DICTIONARY_APPROVAL_RECORD"; record: DictionaryApprovalRecord; nextStatus: PerformanceV2State["dictionaryItems"][number]["status"] }
  | { type: "UPDATE_OWNERSHIP_WEIGHT"; ownershipId: string; weightPct: number }
  | { type: "UPDATE_KPI_ITEM"; kpiItemId: string; patch: Partial<KpiItem> }
  | { type: "SET_KPI_TARGETS_FOR_ITEM"; kpiItemId: string; targets: KpiTarget[] }
  | { type: "ADD_KPI_FROM_DICTIONARY"; employeeNumber: string; dictionaryItemId: string; newKpiItem: KpiItem; newOwnershipId: string }
  | { type: "SUBMIT_PLANNING_ITEMS"; employeeNumber: string; kpiItemIds: string[] }
  | { type: "UPSERT_REALIZATION"; realization: KpiRealization }
  | { type: "ADD_REALIZATION_EVIDENCE"; realizationId: string; evidence: RealizationEvidence }
  | { type: "REMOVE_REALIZATION_EVIDENCE"; realizationId: string; evidenceId: string }
  | { type: "ADD_EXTENSION_REQUEST"; request: ExtensionRequest }
  | { type: "UPSERT_BULK_UPLOAD_JOB"; job: PerformanceV2State["bulkUploadJobs"][number] }
  | { type: "REVIEW_HQ_ADJUSTMENT"; adjustmentId: string; patch: Partial<HqAdjustmentRequest> }
  | { type: "UPDATE_BAND_FORMULA"; formulaId: string; kpiBersamaWeightPct: number; kpiUnitWeightPct: number }
  | { type: "UPDATE_KPI_RULE_CONFIG"; patch: Partial<PerformanceV2State["kpiRuleConfig"]> }
  | { type: "ADD_CUSTOM_KPI_ITEM"; kpiItem: KpiItem; ownership: KpiOwnership }
  | { type: "COPY_FROM_PREVIOUS_YEAR_MOCK"; employeeNumber: string }
  | {
      type: "RESPOND_WAITING_REVIEW";
      employeeNumber: string;
      kpiItemId: string;
      choice: "REVISE" | "SUBMIT_FOR_APPROVAL";
    }
  | { type: "ADD_KPI_CHANGE_REQUEST"; request: KpiChangeRequest }
  | {
      type: "RESOLVE_KPI_CHANGE_REQUEST_MOCK";
      requestId: string;
      status: Extract<KpiChangeRequestStatus, "APPROVED" | "REJECTED">;
      reviewedByEmployeeNumber: string;
      reviewNotes?: string;
    };

function parseBandSemantic(bandJabatan: string): "Utama" | "Madya" | "Muda" | "Pratama" | null {
  if (bandJabatan.includes("Utama")) {
    return "Utama";
  }
  if (bandJabatan.includes("Madya")) {
    return "Madya";
  }
  if (bandJabatan.includes("Muda")) {
    return "Muda";
  }
  if (bandJabatan.includes("Pratama")) {
    return "Pratama";
  }
  return null;
}

export function getBandFormulaForEmployee(state: PerformanceV2State, employeeNumber: string) {
  const emp = state.employees.find((e) => e.nik === employeeNumber);
  if (!emp?.current_position_id) {
    return state.bandFormulas.find((b) => b.id === "bf-madya-s")!;
  }
  const pos = state.positions.find((p) => p.position_id === emp.current_position_id);
  if (!pos) {
    return state.bandFormulas.find((b) => b.id === "bf-madya-s")!;
  }
  const band = parseBandSemantic(pos.band_jabatan);
  const jobType = pos.position_type;
  const match = state.bandFormulas.find((b) => b.bandJabatan === band && b.jobType === jobType);
  return match ?? state.bandFormulas.find((b) => b.id === "bf-madya-s")!;
}

export function portfolioItemIdsForEmployee(state: PerformanceV2State, employeeNumber: string): string[] {
  return state.ownerships.filter((o) => o.employeeNumber === employeeNumber).map((o) => o.kpiItemId);
}

/** Bobot/target tidak boleh diubah saat menunggu atau sudah disetujui atasan (US-MK-008). */
export function isKpiItemPlanningLockedForEdits(status: KpiItemApprovalStatus): boolean {
  return status === "WAITING_FOR_APPROVAL" || status === "APPROVED";
}

/** Blokir edit bobot/target hingga tanggapan Path B (DIP-1 §5). */
export function isKpiItemBlockedForPlanningTargetOrWeight(item: KpiItem): boolean {
  return isKpiItemPlanningLockedForEdits(item.itemApprovalStatus) || item.itemApprovalStatus === "WAITING_REVIEW";
}

/**
 * Tambah KPI dari kamus/kustom/salin diblokir bila seluruh portofolio sudah terkunci (hanya WFA/APPROVED).
 */
export function isPlanningPortfolioAddKpiBlocked(state: PerformanceV2State, employeeNumber: string): boolean {
  const ids = portfolioItemIdsForEmployee(state, employeeNumber);
  if (ids.length === 0) {
    return false;
  }
  const items = state.kpiItems.filter((k) => ids.includes(k.id));
  return items.every((k) => k.itemApprovalStatus === "WAITING_FOR_APPROVAL" || k.itemApprovalStatus === "APPROVED");
}

export function portfolioScoreForEmployee(
  state: PerformanceV2State,
  employeeNumber: string
): PortfolioScore | undefined {
  return state.portfolioScores.find((s) => s.employeeNumber === employeeNumber);
}

function kpiItemForOwnership(state: PerformanceV2State, ownershipId: string): KpiItem | undefined {
  const own = state.ownerships.find((o) => o.id === ownershipId);
  if (!own) {
    return undefined;
  }
  return state.kpiItems.find((k) => k.id === own.kpiItemId);
}

function targetRowComplete(r: KpiTarget | undefined): boolean {
  return r != null && r.targetValue != null && !Number.isNaN(Number(r.targetValue));
}

export function hasTargetSatisfied(state: PerformanceV2State, item: KpiItem): boolean {
  if (item.targetType === "FIXED") {
    return item.targetValue != null && !Number.isNaN(Number(item.targetValue));
  }
  const rows = state.kpiTargets.filter((t) => t.kpiItemId === item.id);
  if (item.monitoringPeriod === "QUARTERLY") {
    return ["Q1", "Q2", "Q3", "Q4"].every((p) => targetRowComplete(rows.find((r) => r.period === p)));
  }
  if (item.monitoringPeriod === "SEMESTER") {
    return ["S1", "S2"].every((p) => targetRowComplete(rows.find((r) => r.period === p)));
  }
  return targetRowComplete(rows.find((r) => r.period === "ANNUAL"));
}

export function validatePlanningSubmit(state: PerformanceV2State, employeeNumber: string): { ok: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const period = state.performancePeriod;
  if (period.status === "CLOSED") {
    reasons.push("Periode planning ditutup.");
  }
  const ids = portfolioItemIdsForEmployee(state, employeeNumber);
  const items = state.kpiItems.filter((k) => ids.includes(k.id));
  for (const item of items) {
    if (item.itemApprovalStatus === "WAITING_REVIEW") {
      reasons.push(
        `Item "${item.title}" menunggu tanggapan Anda atas usulan atasan — gunakan aksi Kembali ke draf atau Ajukan ke persetujuan.`
      );
    } else if (item.itemApprovalStatus === "ALLOCATED") {
      reasons.push(`Item "${item.title}" masih menunggu target (ALLOCATED).`);
    } else if (
      (item.itemApprovalStatus === "DRAFT" ||
        item.itemApprovalStatus === "APPROVED_ADJUSTED" ||
        item.itemApprovalStatus === "REJECTED") &&
      !hasTargetSatisfied(state, item)
    ) {
      reasons.push(`Target untuk "${item.title}" belum lengkap.`);
    }
  }
  const formula = getBandFormulaForEmployee(state, employeeNumber);
  const ownerships = state.ownerships.filter((o) => o.employeeNumber === employeeNumber);
  let bersama = 0;
  let unit = 0;
  for (const o of ownerships) {
    const k = state.kpiItems.find((x) => x.id === o.kpiItemId);
    if (!k) {
      continue;
    }
    if (k.kpiType === "BERSAMA") {
      bersama += o.weightPct;
    } else {
      unit += o.weightPct;
    }
  }
  if (bersama !== formula.kpiBersamaWeightPct) {
    reasons.push(`Total bobot KPI Bersama harus ${formula.kpiBersamaWeightPct}% (saat ini ${bersama}%).`);
  }
  if (unit !== formula.kpiUnitWeightPct) {
    reasons.push(`Total bobot KPI Unit harus ${formula.kpiUnitWeightPct}% (saat ini ${unit}%).`);
  }
  const minW = state.kpiRuleConfig.minWeightPerItemPct;
  const maxW = state.kpiRuleConfig.maxWeightPerItemPct;
  for (const o of ownerships) {
    const k = state.kpiItems.find((x) => x.id === o.kpiItemId);
    if (!k) {
      continue;
    }
    if (minW != null && o.weightPct < minW) {
      reasons.push(`Bobot "${k.title}" di bawah minimum ${minW}%.`);
    }
    if (maxW != null && o.weightPct > maxW) {
      reasons.push(`Bobot "${k.title}" di atas maksimum ${maxW}%.`);
    }
  }
  const eligibleForSubmit = items.some(
    (item) =>
      item.itemApprovalStatus === "DRAFT" ||
      item.itemApprovalStatus === "APPROVED_ADJUSTED" ||
      item.itemApprovalStatus === "REJECTED"
  );
  if (items.length > 0 && !eligibleForSubmit) {
    reasons.push("Tidak ada item yang siap diajukan (semua sudah menunggu persetujuan atau disetujui).");
  }
  return { ok: reasons.length === 0, reasons };
}

export function performanceV2Reducer(state: PerformanceV2State, action: PerformanceV2Action): PerformanceV2State {
  switch (action.type) {
    case "RESET_FIXTURES":
      return { ...action.bundle, auditLog: [] };
    case "APPEND_AUDIT":
      return { ...state, auditLog: [...state.auditLog, action.entry] };
    case "SET_KPI_ITEM_STATUSES_FOR_EMPLOYEE": {
      const kpiItems = state.kpiItems.map((item) =>
        item.ownerEmployeeNumber === action.employeeNumber && item.itemApprovalStatus === action.from
          ? { ...item, itemApprovalStatus: action.to }
          : item
      );
      return { ...state, kpiItems };
    }
    case "SET_DICTIONARY_STATUS": {
      const dictionaryItems = state.dictionaryItems.map((d) =>
        d.id === action.dictionaryId ? { ...d, status: action.status } : d
      );
      return { ...state, dictionaryItems };
    }
    case "ADD_DICTIONARY_ITEM":
      return { ...state, dictionaryItems: [...state.dictionaryItems, action.item] };
    case "ADD_DICTIONARY_VALIDATION_RECORD": {
      const dictionaryValidationRecords = [...state.dictionaryValidationRecords, action.record];
      const dictionaryItems = state.dictionaryItems.map((item) =>
        item.id === action.record.dictionaryItemId
          ? {
              ...item,
              status: action.nextStatus,
              validatedBy: action.record.validatorId,
            }
          : item
      );
      return { ...state, dictionaryValidationRecords, dictionaryItems };
    }
    case "ADD_DICTIONARY_APPROVAL_RECORD": {
      const dictionaryApprovalRecords = [...state.dictionaryApprovalRecords, action.record];
      const dictionaryItems = state.dictionaryItems.map((item) =>
        item.id === action.record.dictionaryItemId
          ? {
              ...item,
              status: action.nextStatus,
              approvedBy: action.record.approverId,
              publishedAt: action.nextStatus === "PUBLISHED" ? new Date().toISOString() : item.publishedAt,
              deprecatedAt: action.nextStatus === "DEPRECATED" ? new Date().toISOString() : item.deprecatedAt,
            }
          : item
      );
      return { ...state, dictionaryApprovalRecords, dictionaryItems };
    }
    case "UPDATE_OWNERSHIP_WEIGHT": {
      const item = kpiItemForOwnership(state, action.ownershipId);
      if (item && isKpiItemBlockedForPlanningTargetOrWeight(item)) {
        return state;
      }
      const ownerships = state.ownerships.map((o) =>
        o.id === action.ownershipId ? { ...o, weightPct: action.weightPct } : o
      );
      return { ...state, ownerships };
    }
    case "UPDATE_KPI_ITEM": {
      const current = state.kpiItems.find((k) => k.id === action.kpiItemId);
      if (current && isKpiItemBlockedForPlanningTargetOrWeight(current)) {
        return state;
      }
      const kpiItems = state.kpiItems.map((k) => {
        if (k.id !== action.kpiItemId) {
          return k;
        }
        const next = { ...k, ...action.patch };
        if (k.itemApprovalStatus === "ALLOCATED" && (action.patch.targetValue != null || action.patch.targetType)) {
          next.itemApprovalStatus = "DRAFT";
        }
        return next;
      });
      return { ...state, kpiItems };
    }
    case "SET_KPI_TARGETS_FOR_ITEM": {
      const targetItem = state.kpiItems.find((k) => k.id === action.kpiItemId);
      if (targetItem && isKpiItemBlockedForPlanningTargetOrWeight(targetItem)) {
        return state;
      }
      const rest = state.kpiTargets.filter((t) => t.kpiItemId !== action.kpiItemId);
      const kpiItems = state.kpiItems.map((k) => {
        if (k.id !== action.kpiItemId || k.itemApprovalStatus !== "ALLOCATED") {
          return k;
        }
        if (action.targets.length === 0) {
          return k;
        }
        return { ...k, itemApprovalStatus: "DRAFT" as const };
      });
      return { ...state, kpiTargets: [...rest, ...action.targets], kpiItems };
    }
    case "ADD_KPI_FROM_DICTIONARY": {
      if (isPlanningPortfolioAddKpiBlocked(state, action.employeeNumber)) {
        return state;
      }
      return {
        ...state,
        kpiItems: [...state.kpiItems, action.newKpiItem],
        ownerships: [
          ...state.ownerships,
          {
            id: action.newOwnershipId,
            kpiItemId: action.newKpiItem.id,
            employeeNumber: action.employeeNumber,
            ownershipType: "OWNER",
            weightPct: 5,
            weightApprovalStatus: "DRAFT",
            year: action.newKpiItem.year,
          },
        ],
      };
    }
    case "SUBMIT_PLANNING_ITEMS": {
      const idSet = new Set(action.kpiItemIds);
      const kpiItems = state.kpiItems.map((k) =>
        k.ownerEmployeeNumber === action.employeeNumber &&
          idSet.has(k.id) &&
          (k.itemApprovalStatus === "DRAFT" || k.itemApprovalStatus === "APPROVED_ADJUSTED" || k.itemApprovalStatus === "REJECTED")
          ? { ...k, itemApprovalStatus: "WAITING_FOR_APPROVAL" as const }
          : k
      );
      return { ...state, kpiItems };
    }
    case "UPSERT_REALIZATION": {
      const idx = state.realizations.findIndex((r) => r.id === action.realization.id);
      if (idx >= 0) {
        const next = [...state.realizations];
        next[idx] = action.realization;
        return { ...state, realizations: next };
      }
      return { ...state, realizations: [...state.realizations, action.realization] };
    }
    case "ADD_REALIZATION_EVIDENCE": {
      const realizations = state.realizations.map((r) =>
        r.id === action.realizationId ? { ...r, evidence: [...r.evidence, action.evidence] } : r
      );
      return { ...state, realizations };
    }
    case "REMOVE_REALIZATION_EVIDENCE": {
      const realizations = state.realizations.map((r) =>
        r.id === action.realizationId
          ? { ...r, evidence: r.evidence.filter((e) => e.id !== action.evidenceId) }
          : r
      );
      return { ...state, realizations };
    }
    case "ADD_EXTENSION_REQUEST":
      return { ...state, extensionRequests: [...state.extensionRequests, action.request] };
    case "UPSERT_BULK_UPLOAD_JOB": {
      const index = state.bulkUploadJobs.findIndex((job) => job.id === action.job.id);
      if (index === -1) {
        return { ...state, bulkUploadJobs: [...state.bulkUploadJobs, action.job] };
      }
      const next = [...state.bulkUploadJobs];
      next[index] = action.job;
      return { ...state, bulkUploadJobs: next };
    }
    case "REVIEW_HQ_ADJUSTMENT": {
      const hqAdjustments = state.hqAdjustments.map((item) =>
        item.id === action.adjustmentId ? { ...item, ...action.patch } : item
      );
      return { ...state, hqAdjustments };
    }
    case "UPDATE_BAND_FORMULA": {
      const bandFormulas = state.bandFormulas.map((formula) =>
        formula.id === action.formulaId
          ? {
              ...formula,
              kpiBersamaWeightPct: action.kpiBersamaWeightPct,
              kpiUnitWeightPct: action.kpiUnitWeightPct,
            }
          : formula
      );
      return { ...state, bandFormulas };
    }
    case "UPDATE_KPI_RULE_CONFIG":
      return { ...state, kpiRuleConfig: { ...state.kpiRuleConfig, ...action.patch } };
    case "ADD_CUSTOM_KPI_ITEM": {
      const nik = action.ownership.employeeNumber;
      if (isPlanningPortfolioAddKpiBlocked(state, nik)) {
        return state;
      }
      return {
        ...state,
        kpiItems: [...state.kpiItems, action.kpiItem],
        ownerships: [...state.ownerships, action.ownership],
      };
    }
    case "COPY_FROM_PREVIOUS_YEAR_MOCK": {
      if (isPlanningPortfolioAddKpiBlocked(state, action.employeeNumber)) {
        return state;
      }
      const year = state.performancePeriod.year;
      const prevYear = year - 1;
      const t = Date.now();
      const w = state.kpiRuleConfig.minWeightPerItemPct ?? 5;
      const newItems: KpiItem[] = [
        {
          id: `KPI-PY-${t}-1`,
          title: `[${prevYear}] Indeks kepuasan pelanggan internal`,
          kpiType: "UNIT",
          polarity: "POSITIVE",
          targetType: "FIXED",
          targetUnit: "Skor",
          monitoringPeriod: "ANNUAL",
          capType: "CAPPED_100",
          source: "LIBRARY",
          year,
          itemApprovalStatus: "ALLOCATED",
          ownerEmployeeNumber: action.employeeNumber,
        },
        {
          id: `KPI-PY-${t}-2`,
          title: `[${prevYear}] Efisiensi proses HC digital`,
          kpiType: "UNIT",
          polarity: "POSITIVE",
          targetType: "PROGRESSIVE",
          targetUnit: "%",
          monitoringPeriod: "QUARTERLY",
          capType: "NO_CAP",
          source: "CUSTOM",
          year,
          itemApprovalStatus: "ALLOCATED",
          ownerEmployeeNumber: action.employeeNumber,
        },
      ];
      const newOwnerships: KpiOwnership[] = newItems.map((k, i) => ({
        id: `own-py-${t}-${i}`,
        kpiItemId: k.id,
        employeeNumber: action.employeeNumber,
        ownershipType: "OWNER",
        weightPct: w,
        weightApprovalStatus: "DRAFT",
        year,
      }));
      return {
        ...state,
        kpiItems: [...state.kpiItems, ...newItems],
        ownerships: [...state.ownerships, ...newOwnerships],
      };
    }
    case "RESPOND_WAITING_REVIEW": {
      const item = state.kpiItems.find((k) => k.id === action.kpiItemId);
      if (
        !item ||
        item.ownerEmployeeNumber !== action.employeeNumber ||
        item.itemApprovalStatus !== "WAITING_REVIEW"
      ) {
        return state;
      }
      const nextStatus: KpiItemApprovalStatus =
        action.choice === "REVISE" ? "DRAFT" : "WAITING_FOR_APPROVAL";
      const kpiItems = state.kpiItems.map((k) =>
        k.id === action.kpiItemId ? { ...k, itemApprovalStatus: nextStatus } : k
      );
      return { ...state, kpiItems };
    }
    case "ADD_KPI_CHANGE_REQUEST":
      return { ...state, kpiChangeRequests: [...state.kpiChangeRequests, action.request] };
    case "RESOLVE_KPI_CHANGE_REQUEST_MOCK": {
      const kpiChangeRequests = state.kpiChangeRequests.map((r) =>
        r.id === action.requestId
          ? {
              ...r,
              status: action.status,
              reviewedBy: action.reviewedByEmployeeNumber,
              reviewNotes: action.reviewNotes,
              reviewedAt: new Date().toISOString(),
            }
          : r
      );
      return { ...state, kpiChangeRequests };
    }
  }
}
