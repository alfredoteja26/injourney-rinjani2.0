import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { AlertTriangle, CheckCircle2, FileText, Link2, Trash2 } from "lucide-react";
import {
  AppStickyFooter,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  PageHeading,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Textarea,
} from "@rinjani/shared-ui";
import type { KpiItem, KpiRealization, PeriodKey } from "../../lib/domain/types";
import {
  getBandFormulaForEmployee,
  usePerformanceV2,
  usePerformanceV2Portfolio,
  validatePlanningSubmit,
} from "../../lib/store/performance-v2-store";
import { KpiPlanningDetailSheet } from "./kpi-planning-detail-sheet";
import { KpiPortfolioPanel } from "./kpi-portfolio-panel";
import { MyKpiPersonaDemoDialogTrigger } from "./my-kpi-persona-demo-dialog";
import { MyKpiPhaseMatrix } from "./my-kpi-phase-matrix";
import { portfolioStatusLabelFromItems } from "./my-kpi-portfolio-status";
import { useMyKpiMatrixProfile } from "./use-my-kpi-matrix-profile";
import { useMyKpiMonitoringMatrix } from "./use-my-kpi-monitoring-matrix";
import { MyKpiChangeRequestsPanel } from "./my-kpi-change-requests-panel";
import { PersonaContextBar } from "../../ui/persona-context-bar";

const NOTES_MAX = 2000;

function ProgressiveTargetActualBars({
  kpiItemId,
  targets,
  realizations,
  unit,
}: {
  kpiItemId: string;
  targets: { period: PeriodKey; targetValue: number }[];
  realizations: KpiRealization[];
  unit: string;
}) {
  const rows = [...targets].sort((a, b) => a.period.localeCompare(b.period));
  const mine = realizations.filter((r) => r.kpiItemId === kpiItemId);
  const maxVal = Math.max(
    1,
    ...rows.map((t) => t.targetValue),
    ...mine.map((r) => r.actualValue)
  );
  return (
    <div className="rounded-lg border border-border/80 bg-muted/20 p-3">
      <p className="text-xs font-medium text-foreground">Target vs realisasi (progresif)</p>
      <div className="mt-3 flex h-24 gap-2">
        {rows.map((t) => {
          const r = mine.find((x) => x.period === t.period);
          const av = r?.actualValue ?? 0;
          const tp = Math.min(100, Math.round((t.targetValue / maxVal) * 100));
          const ap = Math.min(100, Math.round((av / maxVal) * 100));
          return (
            <div key={t.period} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="flex h-[5rem] w-full max-w-[3.5rem] items-end justify-center gap-1">
                <div
                  className="w-2 min-h-[3px] rounded-t bg-primary/35"
                  style={{ height: `${tp}%` }}
                  title={`Target ${t.period}: ${t.targetValue} ${unit}`}
                />
                <div
                  className="w-2 min-h-[3px] rounded-t bg-primary"
                  style={{ height: `${ap}%` }}
                  title={`Realisasi ${t.period}: ${av} ${unit}`}
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{t.period}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">Batang pudar = target · batang penuh = realisasi · {unit}</p>
    </div>
  );
}

export function MyKpiCheckInScreen() {
  const matrixProfile = useMyKpiMatrixProfile();
  const {
    state,
    actingAsEmployeeNumber,
    getEmployeeDisplay,
    getPositionTitleForEmployee,
    upsertRealization,
    addRealizationEvidence,
    removeRealizationEvidence,
    addExtensionRequest,
  } = usePerformanceV2();
  const { items, bersamaTotal, unitTotal, ownerships } = usePerformanceV2Portfolio();
  const monMatrix = useMyKpiMonitoringMatrix();
  const formula = useMemo(() => getBandFormulaForEmployee(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);
  const planningCheck = useMemo(() => validatePlanningSubmit(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);
  const { bersamaItemCount, unitItemCount } = monMatrix;
  const portfolioStatusLabel = useMemo(() => portfolioStatusLabelFromItems(items), [items]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeRealizationId, setActiveRealizationId] = useState<string | null>(null);
  /** Sampai baris baru muncul di store setelah upsert (satu frame). */
  const [bootstrapRealization, setBootstrapRealization] = useState<KpiRealization | null>(null);
  const [formActual, setFormActual] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [mockLink, setMockLink] = useState("");
  const [extReason, setExtReason] = useState("");
  const [extDays, setExtDays] = useState("3");
  const [detailKpi, setDetailKpi] = useState<KpiItem | null>(null);
  const activeRealizationRef = useRef<KpiRealization | undefined>(undefined);

  const activeRealization = useMemo(() => {
    if (!activeRealizationId) {
      return undefined;
    }
    const fromState = state.realizations.find((r) => r.id === activeRealizationId);
    if (fromState) {
      return fromState;
    }
    return bootstrapRealization?.id === activeRealizationId ? bootstrapRealization : undefined;
  }, [activeRealizationId, bootstrapRealization, state.realizations]);

  useEffect(() => {
    if (!bootstrapRealization) {
      return;
    }
    if (state.realizations.some((r) => r.id === bootstrapRealization.id)) {
      setBootstrapRealization(null);
    }
  }, [bootstrapRealization, state.realizations]);
  const activeKpi = activeRealization ? state.kpiItems.find((k) => k.id === activeRealization.kpiItemId) : undefined;
  activeRealizationRef.current = activeRealization;

  const targetHint = useMemo(() => {
    if (!activeRealization || !activeKpi) {
      return null;
    }
    if (activeKpi.targetType === "PROGRESSIVE") {
      const t = state.kpiTargets.find(
        (x) => x.kpiItemId === activeRealization.kpiItemId && x.period === activeRealization.period
      );
      return t != null ? `Target kuartal ${activeRealization.period}: ${t.targetValue} ${activeKpi.targetUnit}` : null;
    }
    if (activeKpi.targetValue != null) {
      return `Target: ${activeKpi.targetValue} ${activeKpi.targetUnit}`;
    }
    return null;
  }, [activeRealization, activeKpi, state.kpiTargets]);

  const evidenceRequired = Boolean(activeKpi?.evidenceRequired);
  const activeEvidence = activeRealization?.evidence ?? [];
  const submitBlockedByEvidence = evidenceRequired && activeEvidence.length === 0;

  useEffect(() => {
    if (!sheetOpen) {
      return;
    }
    const r = activeRealizationRef.current;
    if (!r || r.status !== "DRAFT") {
      return;
    }
    const t = window.setTimeout(() => {
      const latest = activeRealizationRef.current;
      if (!latest || latest.id !== r.id || latest.status !== "DRAFT") {
        return;
      }
      const num = Number(formActual);
      if (Number.isNaN(num)) {
        return;
      }
      upsertRealization(
        {
          ...latest,
          actualValue: num,
          notes: formNotes.trim() || undefined,
          status: "DRAFT",
        },
        { skipAudit: true }
      );
    }, 2000);
    return () => window.clearTimeout(t);
  }, [formNotes, formActual, sheetOpen, upsertRealization]);

  const openRealizationDrawer = useCallback((row: KpiRealization) => {
    const k = state.kpiItems.find((x) => x.id === row.kpiItemId);
    if (k?.kpiType === "BERSAMA") {
      return;
    }
    setBootstrapRealization(null);
    setActiveRealizationId(row.id);
    setFormActual(String(row.actualValue));
    setFormNotes(row.notes ?? "");
    setMockLink("");
    setSheetOpen(true);
  }, [state.kpiItems]);

  const handleMonitoringRealizationAction = useCallback(
    (
      payload:
        | { kind: "open"; realization: KpiRealization }
        | { kind: "start-draft"; kpiItem: KpiItem; period: PeriodKey }
    ) => {
      if (payload.kind === "open") {
        openRealizationDrawer(payload.realization);
        return;
      }
      const { kpiItem, period } = payload;
      const own = ownerships.find((o) => o.kpiItemId === kpiItem.id && o.employeeNumber === actingAsEmployeeNumber);
      if (!own) {
        return;
      }
      const id = `REA-${Date.now()}`;
      const newRow: KpiRealization = {
        id,
        kpiItemId: kpiItem.id,
        ownershipId: own.id,
        period,
        actualValue: 0,
        status: "DRAFT",
        year: kpiItem.year,
        evidence: [],
      };
      upsertRealization(newRow);
      setBootstrapRealization(newRow);
      setActiveRealizationId(newRow.id);
      setFormActual("0");
      setFormNotes("");
      setMockLink("");
      setSheetOpen(true);
    },
    [actingAsEmployeeNumber, openRealizationDrawer, ownerships, upsertRealization]
  );

  function persistRealization(partial: { status: "DRAFT" | "SUBMITTED" }) {
    if (!activeRealization) {
      return;
    }
    const num = Number(formActual);
    if (Number.isNaN(num)) {
      return;
    }
    if (partial.status === "SUBMITTED") {
      const k = state.kpiItems.find((x) => x.id === activeRealization.kpiItemId);
      if (k?.evidenceRequired && activeRealization.evidence.length === 0) {
        return;
      }
    }
    upsertRealization({
      ...activeRealization,
      actualValue: num,
      notes: formNotes.trim() || undefined,
      status: partial.status,
      submittedAt: partial.status === "SUBMITTED" ? new Date().toISOString() : activeRealization.submittedAt,
    });
    if (partial.status === "SUBMITTED") {
      setSheetOpen(false);
    }
  }

  function attachMockLink() {
    if (!activeRealization || !mockLink.trim()) {
      return;
    }
    const id = `ev-${Date.now()}`;
    addRealizationEvidence(activeRealization.id, {
      id,
      realizationId: activeRealization.id,
      type: "LINK",
      linkUrl: mockLink.trim(),
      uploadedAt: new Date().toISOString(),
    });
    setMockLink("");
  }

  function attachMockFile() {
    if (!activeRealization) {
      return;
    }
    const id = `ev-${Date.now()}`;
    addRealizationEvidence(activeRealization.id, {
      id,
      realizationId: activeRealization.id,
      type: "FILE",
      fileName: `Lampiran-mock-${id.slice(-6)}.pdf`,
      uploadedAt: new Date().toISOString(),
    });
  }

  function submitExtensionRequest() {
    const days = Number(extDays);
    if (!extReason.trim() || Number.isNaN(days) || days < 1) {
      return;
    }
    addExtensionRequest({
      id: `ext-${Date.now()}`,
      performancePeriodId: state.performancePeriod.id,
      requestedBy: actingAsEmployeeNumber,
      reason: extReason.trim(),
      requestedDays: days,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });
    setExtReason("");
    setExtDays("3");
  }

  const period = state.performancePeriod;
  const checkInDesc = `${getEmployeeDisplay(actingAsEmployeeNumber)}${
    getPositionTitleForEmployee(actingAsEmployeeNumber) ? ` · ${getPositionTitleForEmployee(actingAsEmployeeNumber)}` : ""
  } · Isi realisasi dari tabel portofolio (menu ⋮ per baris).`;

  const footerOk = monMatrix.jumlahDrafRealisasi === 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 pb-28">
      <PageHeading
        eyebrow={`Performa · Monitoring · status ${period.status}`}
        title="Monitoring & check-in"
        description={checkInDesc}
      />
      <PersonaContextBar />
      <MyKpiPhaseMatrix
        variant="monitoring"
        bersamaTargetPct={formula.kpiBersamaWeightPct}
        unitTargetPct={formula.kpiUnitWeightPct}
        bersamaCurrentPct={bersamaTotal}
        unitCurrentPct={unitTotal}
        planningOk={planningCheck.ok}
        profile={matrixProfile}
        bersamaItemCount={bersamaItemCount}
        unitItemCount={unitItemCount}
        portfolioStatusLabel={portfolioStatusLabel}
        monitoring={{
          checkInSchedules: monMatrix.checkInSchedules,
          lastClosedPeriodLabel: monMatrix.lastClosedPeriodLabel,
          lastPeriodAchievementSummary: monMatrix.lastPeriodAchievementSummary,
          jumlahDrafRealisasi: monMatrix.jumlahDrafRealisasi,
          jumlahMenungguVerifikasi: monMatrix.jumlahMenungguVerifikasi,
          openPeriodLabel: monMatrix.openPeriodLabel,
          openPeriodCountdownLabel: monMatrix.openPeriodCountdownLabel,
          verificationFlowLabel: monMatrix.verificationFlowLabel,
          nextUpcomingSchedule: monMatrix.nextUpcomingSchedule,
        }}
      />

      <KpiPortfolioPanel
        phase="monitoring"
        title="Portofolio KPI — monitoring"
        description="Tabel yang sama dengan perencanaan; kolom disesuaikan untuk periode realisasi, bukti, dan aksi ⋮ (buka / mulai draf)."
        showViewModeToggle
        allowWeightEdit={false}
        layoutVariant="landing"
        hideTotalsFooter
        showLandingToolbar
        onMonitoringRealizationAction={handleMonitoringRealizationAction}
        onSelectKpi={(item) => setDetailKpi(item)}
      />

      <KpiPlanningDetailSheet
        kpi={detailKpi}
        onClose={() => setDetailKpi(null)}
        detailVariant="monitoring"
      />

      <Card>
        <CardHeader>
          <CardTitle>Perpanjangan tenggat (mock)</CardTitle>
          <CardDescription>Ajukan permohonan perpanjangan — US-MK-014; tercatat di store.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="ext-reason">Alasan</FieldLabel>
            <Textarea id="ext-reason" value={extReason} onChange={(e) => setExtReason(e.target.value)} rows={3} />
          </Field>
          <Field>
            <FieldLabel htmlFor="ext-days">Hari tambahan</FieldLabel>
            <Input id="ext-days" type="number" min={1} value={extDays} onChange={(e) => setExtDays(e.target.value)} />
            <FieldDescription>Contoh: 3 hari kerja.</FieldDescription>
          </Field>
          <div className="flex items-end">
            <Button type="button" onClick={submitExtensionRequest}>
              Kirim permohonan
            </Button>
          </div>
        </CardContent>
      </Card>

      {state.extensionRequests.filter((x) => x.requestedBy === actingAsEmployeeNumber).length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Permohonan Anda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {state.extensionRequests
              .filter((x) => x.requestedBy === actingAsEmployeeNumber)
              .map((x) => (
                <div key={x.id} className="rounded-lg border border-border px-3 py-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="neutral">{x.status}</Badge>
                    <span className="text-muted-foreground">+{x.requestedDays} hari</span>
                  </div>
                  <p className="mt-1">{x.reason}</p>
                </div>
              ))}
          </CardContent>
        </Card>
      ) : null}

      <MyKpiChangeRequestsPanel />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" presentation="floating" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Realisasi {activeRealization?.period}</SheetTitle>
            <SheetDescription>
              {activeRealization ? state.kpiItems.find((k) => k.id === activeRealization.kpiItemId)?.title : null}
            </SheetDescription>
          </SheetHeader>
          {activeRealization && activeKpi ? (
            <>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-2">
                {targetHint ? <p className="text-sm text-muted-foreground">{targetHint}</p> : null}
                {activeKpi.targetType === "PROGRESSIVE" && activeKpi.monitoringPeriod === "QUARTERLY" ? (
                  <ProgressiveTargetActualBars
                    kpiItemId={activeKpi.id}
                    targets={state.kpiTargets
                      .filter((x) => x.kpiItemId === activeKpi.id)
                      .map((x) => ({ period: x.period, targetValue: x.targetValue }))}
                    realizations={state.realizations}
                    unit={activeKpi.targetUnit}
                  />
                ) : null}
                <Field>
                  <FieldLabel htmlFor="act-val">Nilai aktual</FieldLabel>
                  <Input id="act-val" value={formActual} onChange={(e) => setFormActual(e.target.value)} inputMode="decimal" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="act-notes">Catatan progres</FieldLabel>
                  <Textarea
                    id="act-notes"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value.slice(0, NOTES_MAX))}
                    rows={4}
                    maxLength={NOTES_MAX}
                  />
                  <FieldDescription>
                    {formNotes.length}/{NOTES_MAX} karakter (US-MK-011). Autosave draf ke store setelah ±2 detik tanpa mengetik.
                  </FieldDescription>
                </Field>
                <div className="rounded-lg border border-border/80 bg-muted/30 p-3 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Catatan per periode</p>
                  <p className="mt-1">
                    Untuk periode {activeRealization.period}, catatan terbaru tersimpan pada realisasi ini. Riwayat lintas periode dapat
                    dibaca dari kolom portofolio monitoring.
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Bukti (US-MK-010)</p>
                  {activeEvidence.length > 0 ? (
                    <ul className="mb-3 space-y-2">
                      {activeEvidence.map((ev) => (
                        <li
                          key={ev.id}
                          className="flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            {ev.type === "FILE" ? <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden /> : null}
                            {ev.type === "LINK" ? <Link2 className="size-4 shrink-0 text-muted-foreground" aria-hidden /> : null}
                            <span className="truncate">{ev.type === "FILE" ? ev.fileName : ev.linkUrl}</span>
                          </span>
                          {activeRealization.status === "DRAFT" ? (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="shrink-0"
                              aria-label="Hapus bukti"
                              onClick={() => removeRealizationEvidence(activeRealization.id, ev.id)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mb-2 text-sm text-muted-foreground">Belum ada bukti.</p>
                  )}
                  {evidenceRequired ? (
                    <p className="mb-2 text-xs font-medium text-warning">Bukti wajib sebelum kirim realisasi.</p>
                  ) : null}
                  <Field>
                    <FieldLabel htmlFor="mock-link">Tautan bukti</FieldLabel>
                    <Input
                      id="mock-link"
                      value={mockLink}
                      onChange={(e) => setMockLink(e.target.value)}
                      placeholder="https://…"
                      disabled={activeRealization.status !== "DRAFT"}
                    />
                  </Field>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={activeRealization.status !== "DRAFT"}
                      onClick={attachMockLink}
                    >
                      Tambah tautan
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={activeRealization.status !== "DRAFT"}
                      onClick={attachMockFile}
                    >
                      Tambah file (mock)
                    </Button>
                  </div>
                </div>
              </div>
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={activeRealization.status !== "DRAFT"}
                  onClick={() => persistRealization({ status: "DRAFT" })}
                >
                  Simpan draf
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  disabled={activeRealization.status !== "DRAFT" || submitBlockedByEvidence}
                  onClick={() => persistRealization({ status: "SUBMITTED" })}
                >
                  Kirim realisasi
                </Button>
                {submitBlockedByEvidence && activeRealization.status === "DRAFT" ? (
                  <p className="text-center text-xs text-warning">Tambahkan minimal satu bukti untuk mengirim.</p>
                ) : null}
                {activeRealization.status !== "DRAFT" ? (
                  <p className="text-center text-xs text-muted-foreground">Hanya draf yang dapat diubah di prototipe ini.</p>
                ) : null}
              </SheetFooter>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      <AppStickyFooter
        leading={
          <div className="flex min-w-0 items-start gap-2.5 text-left text-sm">
            {footerOk ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
            ) : (
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
            )}
            <div className="min-w-0">
              <p className={footerOk ? "font-medium text-success" : "font-medium text-warning"}>
                {footerOk
                  ? "Tidak ada draf Unit yang tertinggal — gunakan menu ⋮ pada tabel untuk tiap KPI."
                  : `${monMatrix.jumlahDrafRealisasi} draf realisasi KPI Unit belum dikirim.`}
              </p>
              <p className="text-xs text-muted-foreground">
                KPI Bersama: input oleh admin. Bukti wajib mematuhi flag per item.{" "}
                <Link to="/performance-v2/my-kpi/year-end" className="font-medium text-primary underline-offset-4 hover:underline">
                  Lihat breakdown skor akhir tahun
                </Link>
                .
              </p>
            </div>
          </div>
        }
        trailing={
          <>
            <MyKpiPersonaDemoDialogTrigger />
            <Button variant="outline" type="button" asChild>
              <Link to="/performance-v2/my-kpi">Kembali ke portofolio</Link>
            </Button>
            <Button variant="outline" type="button" asChild>
              <Link to="/performance-v2/my-kpi/year-end">Ringkasan akhir tahun</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
