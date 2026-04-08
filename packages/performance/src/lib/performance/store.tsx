import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { initialPerformancePrototypeState } from './fixtures';
import type { AuditLogEntry, PersonaRole, PerformancePrototypeState, WorkflowAction } from './types';

interface PerformancePrototypeContextValue {
  state: PerformancePrototypeState;
  setPersona: (persona: PersonaRole) => void;
  submitPlanning: () => void;
  approvePlanning: () => void;
  clarifyPlanning: () => void;
  rejectPlanning: () => void;
  submitRealization: () => void;
  verifyRealization: () => void;
  adjustRealization: () => void;
  cascadeKpi: () => void;
  submitLibraryItem: () => void;
  validateLibraryItem: () => void;
  publishLibraryItem: () => void;
  deprecateLibraryItem: () => void;
  runTreeBulkDryRun: () => void;
  saveHqPolicy: () => void;
  forceFinalize: () => void;
  closeYear: () => void;
}

const PerformancePrototypeContext = createContext<PerformancePrototypeContextValue | null>(null);

function personaName(persona: PersonaRole): string {
  if (persona === 'ATASAN') return 'Dimas Sayyid';
  if (persona === 'HC_ADMIN' || persona === 'HC_ADMIN_HO') return 'Nadira Paramitha';
  return 'Binavia Wardhani';
}

function createAudit(
  state: PerformancePrototypeState,
  action: WorkflowAction,
  target: string,
  entityType: AuditLogEntry['entityType'],
  note: string,
  oldValue?: string,
  newValue?: string,
): AuditLogEntry {
  return {
    id: `AUD-${state.auditLog.length + 1}`.padStart(7, '0'),
    action,
    actorRole: state.persona,
    actorName: personaName(state.persona),
    target,
    entityType,
    createdAt: new Date().toISOString(),
    note,
    oldValue,
    newValue,
  };
}

function withAudit(
  state: PerformancePrototypeState,
  action: WorkflowAction,
  target: string,
  entityType: AuditLogEntry['entityType'],
  note: string,
  oldValue?: string,
  newValue?: string,
): PerformancePrototypeState {
  const audit = createAudit(state, action, target, entityType, note, oldValue, newValue);
  return {
    ...state,
    auditLog: [audit, ...state.auditLog],
    lastMessage: note,
  };
}

export function validatePortfolio(state: PerformancePrototypeState) {
  const bersama = state.kpiItems
    .filter((item) => item.ownerEmployeeNumber === '260102' && item.kpiType === 'BERSAMA')
    .reduce((total, item) => total + item.weight, 0);
  const unit = state.kpiItems
    .filter((item) => item.ownerEmployeeNumber === '260102' && item.kpiType === 'UNIT')
    .reduce((total, item) => total + item.weight, 0);
  const belowMinimum = state.kpiItems.filter((item) => item.weight < state.ruleConfig.minWeightPerItem);
  const allocatedWithoutTarget = state.kpiItems.filter(
    (item) => item.approvalStatus === 'ALLOCATED' && !item.targetValue,
  );

  return {
    bersama,
    unit,
    isBersamaValid: bersama === state.bandFormula.kpiBersamaWeight,
    isUnitValid: unit === state.bandFormula.kpiUnitWeight,
    isValid:
      bersama === state.bandFormula.kpiBersamaWeight &&
      unit === state.bandFormula.kpiUnitWeight &&
      belowMinimum.length === 0 &&
      allocatedWithoutTarget.length === 0,
    belowMinimum,
    allocatedWithoutTarget,
  };
}

export function PerformancePrototypeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PerformancePrototypeState>(initialPerformancePrototypeState);

  const setPersona = useCallback((persona: PersonaRole) => {
    setState((current) => ({
      ...current,
      persona,
      lastMessage: `Persona switched to ${persona.replaceAll('_', ' ')}.`,
    }));
  }, []);

  const submitPlanning = useCallback(() => {
    setState((current) => {
      const validation = validatePortfolio(current);
      const next = {
        ...current,
        kpiItems: current.kpiItems.map((item) =>
          item.ownerEmployeeNumber === '260102'
            ? { ...item, approvalStatus: validation.isValid ? 'WAITING_FOR_APPROVAL' : 'PENDING_CLARIFICATION' }
            : item,
        ),
      };
      return withAudit(
        next,
        'SUBMIT_PLANNING',
        'Binavia KPI 2026',
        'KPI_PLAN',
        validation.isValid
          ? 'Rencana KPI submitted to Atasan Langsung with valid 40/60 Bobot Jenis.'
          : 'Rencana KPI flagged for clarification because portfolio validation is not complete.',
        'DRAFT',
        validation.isValid ? 'WAITING_FOR_APPROVAL' : 'PENDING_CLARIFICATION',
      );
    });
  }, []);

  const approvePlanning = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          kpiItems: current.kpiItems.map((item) =>
            item.ownerEmployeeNumber === '260102' ? { ...item, approvalStatus: 'APPROVED' } : item,
          ),
        },
        'APPROVE_PLANNING',
        'Binavia KPI 2026',
        'KPI_PLAN',
        'Atasan Langsung approved the submitted Rencana KPI.',
        'WAITING_FOR_APPROVAL',
        'APPROVED',
      ),
    );
  }, []);

  const clarifyPlanning = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          kpiItems: current.kpiItems.map((item) =>
            item.ownerEmployeeNumber === '260102' ? { ...item, approvalStatus: 'PENDING_CLARIFICATION' } : item,
          ),
        },
        'CLARIFY_PLANNING',
        'Binavia KPI 2026',
        'KPI_PLAN',
        'Atasan Langsung requested clarification on target assumptions.',
        'WAITING_FOR_APPROVAL',
        'PENDING_CLARIFICATION',
      ),
    );
  }, []);

  const rejectPlanning = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          kpiItems: current.kpiItems.map((item) =>
            item.ownerEmployeeNumber === '260102' ? { ...item, approvalStatus: 'REJECTED' } : item,
          ),
        },
        'REJECT_PLANNING',
        'Binavia KPI 2026',
        'KPI_PLAN',
        'Atasan Langsung rejected the Rencana KPI and returned it for revision.',
        'WAITING_FOR_APPROVAL',
        'REJECTED',
      ),
    );
  }, []);

  const submitRealization = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          realizations: current.realizations.map((item) =>
            item.id === 'REAL-Q1-001'
              ? { ...item, status: 'SUBMITTED', lateFlag: current.deadlineConfig.penaltyType === 'LATE_FLAG' }
              : item,
          ),
        },
        'SUBMIT_REALIZATION',
        'HC Analytics Dashboard Completion Q1',
        'KPI_REALIZATION',
        'Realisasi submitted with evidence and late flag policy applied.',
        'DRAFT',
        'SUBMITTED',
      ),
    );
  }, []);

  const verifyRealization = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          realizations: current.realizations.map((item) =>
            item.id === 'REAL-Q1-001' ? { ...item, status: 'VERIFIED' } : item,
          ),
        },
        'VERIFY_REALIZATION',
        'HC Analytics Dashboard Completion Q1',
        'KPI_REALIZATION',
        'Atasan Langsung verified the submitted realisasi and evidence.',
        'SUBMITTED',
        'VERIFIED',
      ),
    );
  }, []);

  const adjustRealization = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          realizations: current.realizations.map((item) =>
            item.id === 'REAL-Q1-001' ? { ...item, status: 'ADJUSTED', actualValue: '88%' } : item,
          ),
        },
        'ADJUST_REALIZATION',
        'HC Analytics Dashboard Completion Q1',
        'KPI_REALIZATION',
        'Atasan Langsung adjusted the realization value after evidence review.',
        '85%',
        '88%',
      ),
    );
  }, []);

  const cascadeKpi = useCallback(() => {
    setState((current) =>
      withAudit(
        current,
        'CASCADE_KPI',
        'HC Policy Compliance Rate',
        'KPI_PLAN',
        'KPI cascaded to direct reports only; My Team keeps one-level visibility in this MVP.',
      ),
    );
  }, []);

  const submitLibraryItem = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          librarySubmissions: current.librarySubmissions.map((item) =>
            item.id === 'LIB-SUB-001' ? { ...item, status: 'SUBMITTED' } : item,
          ),
        },
        'SUBMIT_LIBRARY_ITEM',
        'Digital Workforce Adoption Rate',
        'KPI_LIBRARY',
        'Karyawan submitted a KPI Library item; automatic similar-title check found 74% similarity.',
      ),
    );
  }, []);

  const validateLibraryItem = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          librarySubmissions: current.librarySubmissions.map((item) =>
            item.id === 'LIB-SUB-001' ? { ...item, status: 'VALIDATED' } : item,
          ),
        },
        'VALIDATE_LIBRARY_ITEM',
        'Digital Workforce Adoption Rate',
        'KPI_LIBRARY',
        'HC Admin validated the submitted Library item within the 5 business day SLA.',
        'SUBMITTED',
        'VALIDATED',
      ),
    );
  }, []);

  const publishLibraryItem = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          librarySubmissions: current.librarySubmissions.map((item) =>
            item.id === 'LIB-SUB-001' ? { ...item, status: 'PUBLISHED' } : item,
          ),
        },
        'PUBLISH_LIBRARY_ITEM',
        'Digital Workforce Adoption Rate',
        'KPI_LIBRARY',
        'HC Admin HO approved and published the Library item with locked formula and cap type.',
        'VALIDATED',
        'PUBLISHED',
      ),
    );
  }, []);

  const deprecateLibraryItem = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          librarySubmissions: current.librarySubmissions.map((item) =>
            item.id === 'LIB-SUB-001' ? { ...item, status: 'DEPRECATED' } : item,
          ),
        },
        'DEPRECATE_LIBRARY_ITEM',
        'Digital Workforce Adoption Rate',
        'KPI_LIBRARY',
        'HC Admin HO deprecated the Library item. Reactivation is outside MVP; create a new item instead.',
        'PUBLISHED',
        'DEPRECATED',
      ),
    );
  }, []);

  const runTreeBulkDryRun = useCallback(() => {
    setState((current) =>
      withAudit(
        current,
        'TREE_BULK_DRY_RUN',
        'KPI Tree bulk upload',
        'KPI_TREE',
        current.bulkUploadDryRun.message,
      ),
    );
  }, []);

  const saveHqPolicy = useCallback(() => {
    setState((current) =>
      withAudit(
        current,
        'SAVE_HQ_POLICY',
        '2026 Performance Policy',
        'HQ_CONFIG',
        'HQ policy saved: cohorts up to 4 attributes, real/hypothetical threshold simulation, per-year override, embedded scoring calculator.',
      ),
    );
  }, []);

  const forceFinalize = useCallback(() => {
    setState((current) =>
      withAudit(
        { ...current, forceFinalized: true },
        'FORCE_FINALIZE',
        'InJourney Group 2026 planning',
        'PERFORMANCE_PERIOD',
        'HC Admin HO force finalized pending items without second approval, per Prototype++ policy.',
        'Pending',
        'Force finalized',
      ),
    );
  }, []);

  const closeYear = useCallback(() => {
    setState((current) =>
      withAudit(
        {
          ...current,
          yearClosed: true,
          period: { ...current.period, phase: 'CLOSED', status: 'CLOSED' },
        },
        'YEAR_CLOSE',
        'Performance year 2026',
        'PERFORMANCE_PERIOD',
        'HC Admin HO closed the 2026 performance year and locked further mutation.',
        'OPEN',
        'CLOSED',
      ),
    );
  }, []);

  const value = useMemo<PerformancePrototypeContextValue>(
    () => ({
      state,
      setPersona,
      submitPlanning,
      approvePlanning,
      clarifyPlanning,
      rejectPlanning,
      submitRealization,
      verifyRealization,
      adjustRealization,
      cascadeKpi,
      submitLibraryItem,
      validateLibraryItem,
      publishLibraryItem,
      deprecateLibraryItem,
      runTreeBulkDryRun,
      saveHqPolicy,
      forceFinalize,
      closeYear,
    }),
    [
      state,
      setPersona,
      submitPlanning,
      approvePlanning,
      clarifyPlanning,
      rejectPlanning,
      submitRealization,
      verifyRealization,
      adjustRealization,
      cascadeKpi,
      submitLibraryItem,
      validateLibraryItem,
      publishLibraryItem,
      deprecateLibraryItem,
      runTreeBulkDryRun,
      saveHqPolicy,
      forceFinalize,
      closeYear,
    ],
  );

  return <PerformancePrototypeContext.Provider value={value}>{children}</PerformancePrototypeContext.Provider>;
}

export function usePerformancePrototype() {
  const context = useContext(PerformancePrototypeContext);
  if (!context) {
    throw new Error('usePerformancePrototype must be used inside PerformancePrototypeProvider');
  }
  return context;
}
