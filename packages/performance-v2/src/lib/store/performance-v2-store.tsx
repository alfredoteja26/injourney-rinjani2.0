import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import type { UserRole } from "@rinjani/shared-types";
import type {
  DictionaryApprovalRecord,
  DictionaryValidationRecord,
  ExtensionRequest,
  KpiChangeRequest,
  KpiDictionaryItem,
  KpiItem,
  KpiItemApprovalStatus,
  KpiOwnership,
  KpiRealization,
  KpiTarget,
  PerformanceV2AuditEntry,
  RealizationEvidence,
} from "../domain/types";
import { createPerformanceV2FixtureBundle } from "../fixtures/initial-state";
import {
  getBandFormulaForEmployee,
  hasTargetSatisfied,
  isKpiItemBlockedForPlanningTargetOrWeight,
  isKpiItemPlanningLockedForEdits,
  isPlanningPortfolioAddKpiBlocked,
  performanceV2Reducer,
  portfolioItemIdsForEmployee,
  portfolioScoreForEmployee,
  validatePlanningSubmit,
  type PerformanceV2State,
} from "./performance-v2-reducer";

export type { PerformanceV2State };
export {
  getBandFormulaForEmployee,
  hasTargetSatisfied,
  isKpiItemBlockedForPlanningTargetOrWeight,
  isKpiItemPlanningLockedForEdits,
  isPlanningPortfolioAddKpiBlocked,
  portfolioItemIdsForEmployee,
  portfolioScoreForEmployee,
  validatePlanningSubmit,
} from "./performance-v2-reducer";

let auditSeq = 0;

function nextAuditId() {
  auditSeq += 1;
  return `audit-${auditSeq}`;
}

interface PerformanceV2ContextValue {
  state: PerformanceV2State;
  actingAsEmployeeNumber: string;
  userRole: UserRole;
  /** Manager nik when acting as Dimas */
  managerEmployeeNumber: string | null;
  appendAudit: (action: string, entityType: string, detail?: string, entityId?: string) => void;
  approveSubmittedPortfolio: (subordinateNumber: string) => void;
  publishDictionaryItem: (dictionaryId: string) => void;
  submitDictionaryItem: (item: KpiDictionaryItem) => void;
  validateDictionaryItem: (record: DictionaryValidationRecord, nextStatus: PerformanceV2State["dictionaryItems"][number]["status"]) => void;
  reviewDictionaryApproval: (record: DictionaryApprovalRecord, nextStatus: PerformanceV2State["dictionaryItems"][number]["status"]) => void;
  resetDemoState: () => void;
  getEmployeeDisplay: (employeeNumber: string) => string;
  getPositionTitleForEmployee: (employeeNumber: string) => string | undefined;
  updateOwnershipWeight: (ownershipId: string, weightPct: number) => void;
  updateKpiItem: (kpiItemId: string, patch: Partial<KpiItem>) => void;
  setKpiTargetsForItem: (kpiItemId: string, targets: KpiTarget[]) => void;
  addKpiFromDictionary: (params: {
    employeeNumber: string;
    dictionaryItemId: string;
    newKpiItem: KpiItem;
    newOwnershipId: string;
  }) => void;
  submitPlanning: (employeeNumber: string) => { ok: boolean; reasons: string[] };
  upsertRealization: (realization: KpiRealization, opts?: { skipAudit?: boolean }) => void;
  respondWaitingReview: (employeeNumber: string, kpiItemId: string, choice: "REVISE" | "SUBMIT_FOR_APPROVAL") => void;
  addKpiChangeRequest: (request: KpiChangeRequest) => void;
  resolveKpiChangeRequestMock: (
    requestId: string,
    status: "APPROVED" | "REJECTED",
    opts?: { reviewNotes?: string; reviewerEmployeeNumber?: string }
  ) => void;
  addRealizationEvidence: (realizationId: string, evidence: RealizationEvidence) => void;
  removeRealizationEvidence: (realizationId: string, evidenceId: string) => void;
  addExtensionRequest: (request: ExtensionRequest) => void;
  reviewHqAdjustment: (
    adjustmentId: string,
    patch: Partial<PerformanceV2State["hqAdjustments"][number]>
  ) => void;
  updateBandFormula: (formulaId: string, kpiBersamaWeightPct: number, kpiUnitWeightPct: number) => void;
  updateKpiRuleConfig: (patch: Partial<PerformanceV2State["kpiRuleConfig"]>) => void;
  upsertBulkUploadJob: (job: PerformanceV2State["bulkUploadJobs"][number]) => void;
  addCustomKpiItem: (kpiItem: KpiItem, ownership: KpiOwnership) => void;
  copyFromPreviousYearMock: (employeeNumber: string) => void;
}

const PerformanceV2Context = createContext<PerformanceV2ContextValue | null>(null);

function findEmployeeNumberForSession(actingAsEmployeeNumber: string | undefined, userRole: UserRole): string {
  if (actingAsEmployeeNumber) {
    return actingAsEmployeeNumber;
  }
  return userRole === "Admin" ? "260101" : "260102";
}

function planningSubmitEligibleStatus(status: KpiItemApprovalStatus): boolean {
  return status === "DRAFT" || status === "APPROVED_ADJUSTED" || status === "REJECTED";
}

export function PerformanceV2Provider({
  children,
  actingAsEmployeeNumber,
  userRole,
}: {
  children: ReactNode;
  actingAsEmployeeNumber?: string;
  userRole: UserRole;
}) {
  const initial = useMemo(() => ({ ...createPerformanceV2FixtureBundle(), auditLog: [] as PerformanceV2AuditEntry[] }), []);
  const [state, dispatch] = useReducer(performanceV2Reducer, initial);

  const resolvedActing = findEmployeeNumberForSession(actingAsEmployeeNumber, userRole);
  const managerEmployeeNumber = resolvedActing === "260101" ? null : "260101";

  const getEmployeeDisplay = useCallback(
    (employeeNumber: string) => state.employees.find((e) => e.nik === employeeNumber)?.full_name ?? employeeNumber,
    [state.employees]
  );

  const getPositionTitleForEmployee = useCallback(
    (employeeNumber: string) => {
      const emp = state.employees.find((e) => e.nik === employeeNumber);
      if (!emp?.current_position_id) {
        return undefined;
      }
      return state.positions.find((p) => p.position_id === emp.current_position_id)?.title;
    },
    [state.employees, state.positions]
  );

  const appendAudit = useCallback(
    (actionLabel: string, entityType: string, detail?: string, entityId?: string) => {
      const entry: PerformanceV2AuditEntry = {
        id: nextAuditId(),
        at: new Date().toISOString(),
        actorEmployeeNumber: resolvedActing,
        action: actionLabel,
        entityType,
        entityId,
        detail,
      };
      dispatch({ type: "APPEND_AUDIT", entry });
    },
    [resolvedActing]
  );

  const approveSubmittedPortfolio = useCallback(
    (subordinateNumber: string) => {
      dispatch({
        type: "SET_KPI_ITEM_STATUSES_FOR_EMPLOYEE",
        employeeNumber: subordinateNumber,
        from: "WAITING_FOR_APPROVAL",
        to: "APPROVED",
      });
      appendAudit("APPROVE_PORTFOLIO", "KpiItem", `Subordinate ${subordinateNumber}`, subordinateNumber);
    },
    [appendAudit]
  );

  const publishDictionaryItem = useCallback(
    (dictionaryId: string) => {
      dispatch({ type: "SET_DICTIONARY_STATUS", dictionaryId, status: "PUBLISHED" });
      appendAudit("PUBLISH_DICTIONARY", "KpiDictionaryItem", dictionaryId, dictionaryId);
    },
    [appendAudit]
  );

  const submitDictionaryItem = useCallback(
    (item: KpiDictionaryItem) => {
      dispatch({ type: "ADD_DICTIONARY_ITEM", item });
      appendAudit("SUBMIT_DICTIONARY", "KpiDictionaryItem", item.title, item.id);
    },
    [appendAudit]
  );

  const validateDictionaryItem = useCallback(
    (record: DictionaryValidationRecord, nextStatus: PerformanceV2State["dictionaryItems"][number]["status"]) => {
      dispatch({ type: "ADD_DICTIONARY_VALIDATION_RECORD", record, nextStatus });
      appendAudit("VALIDATE_DICTIONARY", "DictionaryValidationRecord", record.notes, record.dictionaryItemId);
    },
    [appendAudit]
  );

  const reviewDictionaryApproval = useCallback(
    (record: DictionaryApprovalRecord, nextStatus: PerformanceV2State["dictionaryItems"][number]["status"]) => {
      dispatch({ type: "ADD_DICTIONARY_APPROVAL_RECORD", record, nextStatus });
      appendAudit("REVIEW_DICTIONARY_APPROVAL", "DictionaryApprovalRecord", record.action, record.dictionaryItemId);
    },
    [appendAudit]
  );

  const resetDemoState = useCallback(() => {
    auditSeq = 0;
    dispatch({ type: "RESET_FIXTURES", bundle: createPerformanceV2FixtureBundle() });
  }, []);

  const updateOwnershipWeight = useCallback((ownershipId: string, weightPct: number) => {
    dispatch({ type: "UPDATE_OWNERSHIP_WEIGHT", ownershipId, weightPct });
  }, []);

  const updateKpiItem = useCallback((kpiItemId: string, patch: Partial<KpiItem>) => {
    dispatch({ type: "UPDATE_KPI_ITEM", kpiItemId, patch });
  }, []);

  const setKpiTargetsForItem = useCallback((kpiItemId: string, targets: KpiTarget[]) => {
    dispatch({ type: "SET_KPI_TARGETS_FOR_ITEM", kpiItemId, targets });
  }, []);

  const addKpiFromDictionary = useCallback(
    (params: {
      employeeNumber: string;
      dictionaryItemId: string;
      newKpiItem: KpiItem;
      newOwnershipId: string;
    }) => {
      dispatch({
        type: "ADD_KPI_FROM_DICTIONARY",
        employeeNumber: params.employeeNumber,
        dictionaryItemId: params.dictionaryItemId,
        newKpiItem: params.newKpiItem,
        newOwnershipId: params.newOwnershipId,
      });
      appendAudit("ADD_KPI_FROM_LIBRARY", "KpiItem", params.dictionaryItemId, params.newKpiItem.id);
    },
    [appendAudit]
  );

  const submitPlanning = useCallback(
    (employeeNumber: string) => {
      const validation = validatePlanningSubmit(state, employeeNumber);
      if (!validation.ok) {
        return validation;
      }
      const portfolioIds = portfolioItemIdsForEmployee(state, employeeNumber);
      const kpiItemIds = portfolioIds.filter((id) => {
        const k = state.kpiItems.find((x) => x.id === id);
        return k && k.ownerEmployeeNumber === employeeNumber && planningSubmitEligibleStatus(k.itemApprovalStatus);
      });
      if (kpiItemIds.length === 0) {
        return { ok: false, reasons: ["Tidak ada item yang siap dikirim untuk persetujuan."] };
      }
      dispatch({ type: "SUBMIT_PLANNING_ITEMS", employeeNumber, kpiItemIds });
      appendAudit("SUBMIT_PLANNING", "Portfolio", employeeNumber, employeeNumber);
      return { ok: true, reasons: [] };
    },
    [appendAudit, state]
  );

  const upsertRealization = useCallback(
    (realization: KpiRealization, opts?: { skipAudit?: boolean }) => {
      dispatch({ type: "UPSERT_REALIZATION", realization });
      if (!opts?.skipAudit) {
        appendAudit("UPSERT_REALIZATION", "KpiRealization", realization.period, realization.id);
      }
    },
    [appendAudit]
  );

  const respondWaitingReview = useCallback(
    (employeeNumber: string, kpiItemId: string, choice: "REVISE" | "SUBMIT_FOR_APPROVAL") => {
      dispatch({ type: "RESPOND_WAITING_REVIEW", employeeNumber, kpiItemId, choice });
      appendAudit(
        choice === "REVISE" ? "WAITING_REVIEW_REVISE" : "WAITING_REVIEW_SUBMIT",
        "KpiItem",
        kpiItemId,
        kpiItemId
      );
    },
    [appendAudit]
  );

  const addKpiChangeRequest = useCallback(
    (request: KpiChangeRequest) => {
      dispatch({ type: "ADD_KPI_CHANGE_REQUEST", request });
      appendAudit("KPI_CHANGE_REQUEST", "KpiChangeRequest", request.justification.slice(0, 80), request.id);
    },
    [appendAudit]
  );

  const resolveKpiChangeRequestMock = useCallback(
    (
      requestId: string,
      status: "APPROVED" | "REJECTED",
      opts?: { reviewNotes?: string; reviewerEmployeeNumber?: string }
    ) => {
      const reviewer = opts?.reviewerEmployeeNumber ?? managerEmployeeNumber ?? resolvedActing;
      dispatch({
        type: "RESOLVE_KPI_CHANGE_REQUEST_MOCK",
        requestId,
        status,
        reviewedByEmployeeNumber: reviewer,
        reviewNotes: opts?.reviewNotes,
      });
      appendAudit(
        status === "APPROVED" ? "KPI_CHANGE_APPROVED_MOCK" : "KPI_CHANGE_REJECTED_MOCK",
        "KpiChangeRequest",
        requestId,
        requestId
      );
    },
    [appendAudit, managerEmployeeNumber, resolvedActing]
  );

  const addRealizationEvidence = useCallback(
    (realizationId: string, evidence: RealizationEvidence) => {
      dispatch({ type: "ADD_REALIZATION_EVIDENCE", realizationId, evidence });
      appendAudit("ADD_REALIZATION_EVIDENCE", "RealizationEvidence", evidence.id, realizationId);
    },
    [appendAudit]
  );

  const removeRealizationEvidence = useCallback(
    (realizationId: string, evidenceId: string) => {
      dispatch({ type: "REMOVE_REALIZATION_EVIDENCE", realizationId, evidenceId });
      appendAudit("REMOVE_REALIZATION_EVIDENCE", "RealizationEvidence", evidenceId, realizationId);
    },
    [appendAudit]
  );

  const addExtensionRequest = useCallback(
    (request: ExtensionRequest) => {
      dispatch({ type: "ADD_EXTENSION_REQUEST", request });
      appendAudit("EXTENSION_REQUEST", "ExtensionRequest", request.reason, request.id);
    },
    [appendAudit]
  );

  const reviewHqAdjustment = useCallback(
    (adjustmentId: string, patch: Partial<PerformanceV2State["hqAdjustments"][number]>) => {
      dispatch({ type: "REVIEW_HQ_ADJUSTMENT", adjustmentId, patch });
      appendAudit("REVIEW_HQ_ADJUSTMENT", "HqAdjustmentRequest", adjustmentId, adjustmentId);
    },
    [appendAudit]
  );

  const updateBandFormula = useCallback(
    (formulaId: string, kpiBersamaWeightPct: number, kpiUnitWeightPct: number) => {
      dispatch({ type: "UPDATE_BAND_FORMULA", formulaId, kpiBersamaWeightPct, kpiUnitWeightPct });
      appendAudit("UPDATE_BAND_FORMULA", "BandKpiFormula", `${kpiBersamaWeightPct}/${kpiUnitWeightPct}`, formulaId);
    },
    [appendAudit]
  );

  const updateKpiRuleConfig = useCallback(
    (patch: Partial<PerformanceV2State["kpiRuleConfig"]>) => {
      dispatch({ type: "UPDATE_KPI_RULE_CONFIG", patch });
      appendAudit("UPDATE_KPI_RULE_CONFIG", "KpiRuleConfig", JSON.stringify(patch));
    },
    [appendAudit]
  );

  const upsertBulkUploadJob = useCallback(
    (job: PerformanceV2State["bulkUploadJobs"][number]) => {
      dispatch({ type: "UPSERT_BULK_UPLOAD_JOB", job });
      appendAudit("UPSERT_BULK_UPLOAD_JOB", "BulkUploadJob", job.status, job.id);
    },
    [appendAudit]
  );

  const addCustomKpiItem = useCallback(
    (kpiItem: KpiItem, ownership: KpiOwnership) => {
      dispatch({ type: "ADD_CUSTOM_KPI_ITEM", kpiItem, ownership });
      appendAudit("ADD_CUSTOM_KPI", "KpiItem", kpiItem.title, kpiItem.id);
    },
    [appendAudit]
  );

  const copyFromPreviousYearMock = useCallback(
    (employeeNumber: string) => {
      dispatch({ type: "COPY_FROM_PREVIOUS_YEAR_MOCK", employeeNumber });
      appendAudit("COPY_PREVIOUS_YEAR_MOCK", "Portfolio", employeeNumber, employeeNumber);
    },
    [appendAudit]
  );

  const value = useMemo<PerformanceV2ContextValue>(
    () => ({
      state,
      actingAsEmployeeNumber: resolvedActing,
      userRole,
      managerEmployeeNumber,
      appendAudit,
      approveSubmittedPortfolio,
      publishDictionaryItem,
      submitDictionaryItem,
      validateDictionaryItem,
      reviewDictionaryApproval,
      resetDemoState,
      getEmployeeDisplay,
      getPositionTitleForEmployee,
      updateOwnershipWeight,
      updateKpiItem,
      setKpiTargetsForItem,
      addKpiFromDictionary,
      submitPlanning,
      upsertRealization,
      respondWaitingReview,
      addKpiChangeRequest,
      resolveKpiChangeRequestMock,
      addRealizationEvidence,
      removeRealizationEvidence,
      addExtensionRequest,
      reviewHqAdjustment,
      updateBandFormula,
      updateKpiRuleConfig,
      upsertBulkUploadJob,
      addCustomKpiItem,
      copyFromPreviousYearMock,
    }),
    [
      state,
      resolvedActing,
      userRole,
      managerEmployeeNumber,
      appendAudit,
      approveSubmittedPortfolio,
      publishDictionaryItem,
      submitDictionaryItem,
      validateDictionaryItem,
      reviewDictionaryApproval,
      resetDemoState,
      getEmployeeDisplay,
      getPositionTitleForEmployee,
      updateOwnershipWeight,
      updateKpiItem,
      setKpiTargetsForItem,
      addKpiFromDictionary,
      submitPlanning,
      upsertRealization,
      respondWaitingReview,
      addKpiChangeRequest,
      resolveKpiChangeRequestMock,
      addRealizationEvidence,
      removeRealizationEvidence,
      addExtensionRequest,
      reviewHqAdjustment,
      updateBandFormula,
      updateKpiRuleConfig,
      upsertBulkUploadJob,
      addCustomKpiItem,
      copyFromPreviousYearMock,
    ]
  );

  return <PerformanceV2Context.Provider value={value}>{children}</PerformanceV2Context.Provider>;
}

export function usePerformanceV2() {
  const ctx = useContext(PerformanceV2Context);
  if (!ctx) {
    throw new Error("usePerformanceV2 must be used within PerformanceV2Provider");
  }
  return ctx;
}

export function usePerformanceV2Portfolio(employeeNumber?: string) {
  const { state, getEmployeeDisplay, getPositionTitleForEmployee, actingAsEmployeeNumber } = usePerformanceV2();
  const nik =
    employeeNumber != null && String(employeeNumber).trim() !== "" ? String(employeeNumber).trim() : actingAsEmployeeNumber;
  const items = useMemo(() => {
    const ids = new Set(state.ownerships.filter((o) => o.employeeNumber === nik).map((o) => o.kpiItemId));
    return state.kpiItems.filter((k) => ids.has(k.id));
  }, [state.kpiItems, state.ownerships, nik]);
  const ownerships = useMemo(() => state.ownerships.filter((o) => o.employeeNumber === nik), [state.ownerships, nik]);
  const bersamaTotal = useMemo(
    () => ownerships.filter((o) => state.kpiItems.find((k) => k.id === o.kpiItemId)?.kpiType === "BERSAMA").reduce((s, o) => s + o.weightPct, 0),
    [ownerships, state.kpiItems]
  );
  const unitTotal = useMemo(
    () => ownerships.filter((o) => state.kpiItems.find((k) => k.id === o.kpiItemId)?.kpiType === "UNIT").reduce((s, o) => s + o.weightPct, 0),
    [ownerships, state.kpiItems]
  );
  const targetsByKpiItemId = useMemo(() => {
    const map = new Map<string, typeof state.kpiTargets>();
    for (const t of state.kpiTargets) {
      const list = map.get(t.kpiItemId) ?? [];
      list.push(t);
      map.set(t.kpiItemId, list);
    }
    return map;
  }, [state.kpiTargets]);
  return { items, ownerships, bersamaTotal, unitTotal, getEmployeeDisplay, getPositionTitleForEmployee, targetsByKpiItemId };
}

export function useDirectReports() {
  const { state, actingAsEmployeeNumber } = usePerformanceV2();
  return useMemo(() => {
    const mgr = state.employees.find((e) => e.nik === actingAsEmployeeNumber);
    if (!mgr) {
      return [];
    }
    return state.employees.filter((e) => e.direct_supervisor_employee_id === mgr.employee_id);
  }, [state.employees, actingAsEmployeeNumber]);
}
