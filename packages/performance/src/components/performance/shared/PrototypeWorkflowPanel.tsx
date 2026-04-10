import React from 'react';
import { AlertTriangle, CheckCircle2, ClipboardList, GitBranch, History, Library, Settings2 } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { usePerformancePrototype, validatePortfolio } from '../../../lib/performance';

type PrototypeWorkflowPanelVariant = 'my-kpi' | 'my-team' | 'library' | 'tree' | 'hq';

interface PrototypeWorkflowPanelProps {
  variant: PrototypeWorkflowPanelVariant;
}

const statusClassName = 'rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700';

function AuditPreview() {
  const { state } = usePerformancePrototype();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <History className="h-4 w-4 text-[#00858a]" />
        Audit trail terbaru
      </div>
      <div className="space-y-2">
        {state.auditLog.slice(0, 3).map((entry) => (
          <div key={entry.id} className="rounded-md border border-gray-100 bg-gray-50 p-3 text-xs text-gray-700">
            <div className="font-semibold text-gray-900">{entry.target}</div>
            <div>{entry.note}</div>
            <div className="mt-1 text-gray-500">
              {entry.actorName} - {entry.actorRole.replaceAll('_', ' ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyKpiPanel() {
  const { state, submitPlanning, submitRealization } = usePerformancePrototype();
  const validation = validatePortfolio(state);
  const submitted = state.kpiItems.filter((item) => item.approvalStatus === 'WAITING_FOR_APPROVAL').length;
  const approved = state.kpiItems.filter((item) => item.approvalStatus === 'APPROVED').length;
  const realization = state.realizations[0];
  const canAct = state.persona === 'KARYAWAN';

  return (
    <>
      <div className="grid gap-3 md:grid-cols-4">
        <div className={statusClassName}>KPI Bersama: {validation.bersama}% / {state.bandFormula.kpiBersamaWeight}%</div>
        <div className={statusClassName}>KPI Unit: {validation.unit}% / {state.bandFormula.kpiUnitWeight}%</div>
        <div className={statusClassName}>Minimum Bobot Item: {state.ruleConfig.minWeightPerItem}%</div>
        <div className={statusClassName}>Status: {submitted ? 'Menunggu approval' : approved ? 'Approved' : 'Draft'}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={submitPlanning} disabled={!canAct}>Submit Rencana KPI</Button>
        <Button size="sm" variant="outline" onClick={submitRealization} disabled={!canAct}>Submit Realisasi + Evidence</Button>
        {realization?.lateFlag && (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Late flag, bukan auto-zero</Badge>
        )}
      </div>
    </>
  );
}

function MyTeamPanel() {
  const { state, approvePlanning, clarifyPlanning, rejectPlanning, verifyRealization, adjustRealization, cascadeKpi } = usePerformancePrototype();
  const realization = state.realizations[0];
  const canAct = state.persona === 'ATASAN';

  return (
    <>
      <div className="grid gap-3 md:grid-cols-4">
        <div className={statusClassName}>Cascading: direct reports only</div>
        <div className={statusClassName}>Approval: one level</div>
        <div className={statusClassName}>Batch limit: none</div>
        <div className={statusClassName}>Realisasi: {realization?.status ?? 'N/A'}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={approvePlanning} disabled={!canAct}>Approve</Button>
        <Button size="sm" variant="outline" onClick={clarifyPlanning} disabled={!canAct}>Request Clarification</Button>
        <Button size="sm" variant="outline" onClick={rejectPlanning} disabled={!canAct}>Reject</Button>
        <Button size="sm" variant="outline" onClick={cascadeKpi} disabled={!canAct}>Cascade KPI</Button>
        <Button size="sm" variant="outline" onClick={verifyRealization} disabled={!canAct}>Verify Evidence</Button>
        <Button size="sm" variant="outline" onClick={adjustRealization} disabled={!canAct}>Adjust Realisasi</Button>
      </div>
    </>
  );
}

function LibraryPanel() {
  const { state, submitLibraryItem, validateLibraryItem, publishLibraryItem, deprecateLibraryItem } = usePerformancePrototype();
  const submission = state.librarySubmissions[0];
  const canSubmit = state.persona === 'KARYAWAN' || state.persona === 'ATASAN';
  const canValidate = state.persona === 'HC_ADMIN' || state.persona === 'HC_ADMIN_HO';
  const canPublish = state.persona === 'HC_ADMIN_HO';

  return (
    <>
      <div className="grid gap-3 md:grid-cols-4">
        <div className={statusClassName}>Submission: {submission?.status}</div>
        <div className={statusClassName}>Similarity: {submission?.similarityPct}%</div>
        <div className={statusClassName}>Validation SLA: 5 business days</div>
        <div className={statusClassName}>Deprecated: no reactivation in MVP</div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={submitLibraryItem} disabled={!canSubmit}>Submit Item</Button>
        <Button size="sm" variant="outline" onClick={validateLibraryItem} disabled={!canValidate}>Validate</Button>
        <Button size="sm" variant="outline" onClick={publishLibraryItem} disabled={!canPublish}>Publish</Button>
        <Button size="sm" variant="outline" onClick={deprecateLibraryItem} disabled={!canPublish}>Deprecate</Button>
      </div>
    </>
  );
}

function TreePanel() {
  const { state, runTreeBulkDryRun } = usePerformancePrototype();
  const canAct = state.persona === 'HC_ADMIN' || state.persona === 'HC_ADMIN_HO';

  return (
    <>
      <div className="grid gap-3 md:grid-cols-4">
        <div className={statusClassName}>Lazy load: 2 levels</div>
        <div className={statusClassName}>Bulk upload: create only</div>
        <div className={statusClassName}>Export includes achievement data</div>
        <div className={statusClassName}>Warnings: {state.treeWarnings.length}</div>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {state.treeWarnings.map((warning) => (
          <div key={warning.id} className="rounded-md border border-yellow-100 bg-yellow-50 p-3 text-sm text-yellow-900">
            <div className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-4 w-4" />
              {warning.label.replaceAll('_', ' ')}
            </div>
            <div>{warning.kpiTitle} - {warning.owner}</div>
          </div>
        ))}
      </div>
      <Button size="sm" variant="outline" onClick={runTreeBulkDryRun} disabled={!canAct}>Run Bulk Upload Dry Run</Button>
    </>
  );
}

function HqPanel() {
  const { state, saveHqPolicy, forceFinalize, closeYear } = usePerformancePrototype();
  const canAct = state.persona === 'HC_ADMIN_HO';

  return (
    <>
      <div className="grid gap-3 md:grid-cols-4">
        <div className={statusClassName}>Cohorts: up to 4 attributes</div>
        <div className={statusClassName}>Simulation: real + hypothetical</div>
        <div className={statusClassName}>Force finalize: {state.forceFinalized ? 'Applied' : 'Ready'}</div>
        <div className={statusClassName}>Year close: {state.yearClosed ? 'Closed' : 'Open'}</div>
      </div>
      <div className="rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">
        <div className="font-semibold">Embedded scoring calculator</div>
        <div>
          Example: KPI Bersama 3.8 x {state.bandFormula.kpiBersamaWeight}% + KPI Unit 3.6 x {state.bandFormula.kpiUnitWeight}% = 3.68 PI.
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={saveHqPolicy} disabled={!canAct}>Save HQ Policy</Button>
        <Button size="sm" variant="outline" onClick={forceFinalize} disabled={!canAct}>Force Finalize</Button>
        <Button size="sm" variant="outline" onClick={closeYear} disabled={!canAct}>Tutup Tahun</Button>
      </div>
    </>
  );
}

export function PrototypeWorkflowPanel({ variant }: PrototypeWorkflowPanelProps) {
  const icon = {
    'my-kpi': <ClipboardList className="h-5 w-5 text-[#00858a]" />,
    'my-team': <CheckCircle2 className="h-5 w-5 text-[#00858a]" />,
    library: <Library className="h-5 w-5 text-[#00858a]" />,
    tree: <GitBranch className="h-5 w-5 text-[#00858a]" />,
    hq: <Settings2 className="h-5 w-5 text-[#00858a]" />,
  }[variant];

  const title = {
    'my-kpi': 'My KPI workflow spine',
    'my-team': 'My Team approval and verification spine',
    library: 'KPI Library governance spine',
    tree: 'KPI Tree alignment and admin spine',
    hq: 'Markas KPI governance spine',
  }[variant];

  return (
    <Card className="border-[#00858a]/20 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {variant === 'my-kpi' && <MyKpiPanel />}
        {variant === 'my-team' && <MyTeamPanel />}
        {variant === 'library' && <LibraryPanel />}
        {variant === 'tree' && <TreePanel />}
        {variant === 'hq' && <HqPanel />}
        <AuditPreview />
      </CardContent>
    </Card>
  );
}
