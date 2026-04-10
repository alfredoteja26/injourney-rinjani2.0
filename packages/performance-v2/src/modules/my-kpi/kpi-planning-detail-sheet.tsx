import type { ReactNode } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@rinjani/shared-ui";
import type { KpiItem, KpiRealization, KpiTarget } from "../../lib/domain/types";
import {
  isKpiItemBlockedForPlanningTargetOrWeight,
  usePerformanceV2,
  usePerformanceV2Portfolio,
} from "../../lib/store/performance-v2-store";
import { KpiStatusBadge } from "../../ui/kpi-status-badge";
import { initialsFromName } from "./my-kpi-employee-brief-card";

function monitoringLabel(p: KpiItem["monitoringPeriod"]) {
  if (p === "QUARTERLY") return "Kuartalan";
  if (p === "SEMESTER") return "Semesteran";
  return "Tahunan";
}

function targetSummaryText(item: KpiItem, targets: KpiTarget[] | undefined): string {
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

function polarityLabel(p: KpiItem["polarity"]): string {
  if (p === "POSITIVE") return "Positif — lebih tinggi lebih baik";
  if (p === "NEGATIVE") return "Negatif — lebih rendah lebih baik";
  return "Netral — on target";
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-0.5 border-b border-border/60 py-2 last:border-0 sm:grid-cols-[minmax(8rem,40%)_1fr] sm:gap-3">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

export interface KpiPlanningDetailSheetProps {
  kpi: KpiItem | null;
  onClose: () => void;
  /** `planning` = fokus status pengajuan; `monitoring` = fokus verifikasi realisasi */
  detailVariant?: "planning" | "monitoring";
  showWeightSlider?: boolean;
  onWeightChange?: (pct: number) => void;
}

export function KpiPlanningDetailSheet({
  kpi,
  onClose,
  detailVariant = "planning",
  showWeightSlider = false,
  onWeightChange,
}: KpiPlanningDetailSheetProps) {
  const { state, getEmployeeDisplay } = usePerformanceV2();
  const { ownerships, targetsByKpiItemId } = usePerformanceV2Portfolio();
  const own = kpi ? ownerships.find((o) => o.kpiItemId === kpi.id) : undefined;
  const itemWeightPct = own?.weightPct ?? 0;
  const targetSummary = kpi ? targetSummaryText(kpi, targetsByKpiItemId.get(kpi.id)) : "";
  const minW = state.kpiRuleConfig.minWeightPerItemPct ?? 5;
  const maxW = state.kpiRuleConfig.maxWeightPerItemPct ?? 40;
  const weightLocked = kpi ? isKpiItemBlockedForPlanningTargetOrWeight(kpi) : true;

  const emp = kpi ? state.employees.find((e) => e.nik === kpi.ownerEmployeeNumber) : undefined;
  const supervisor = emp?.direct_supervisor_employee_id
    ? state.employees.find((e) => e.employee_id === emp.direct_supervisor_employee_id)
    : undefined;
  const managerName = supervisor ? getEmployeeDisplay(supervisor.nik) : null;
  const managerInitials = managerName ? initialsFromName(managerName) : "?";
  const ownerName = kpi ? getEmployeeDisplay(kpi.ownerEmployeeNumber) : "";
  const ownerInitials = kpi ? initialsFromName(ownerName) : "?";
  const jenisLine =
    kpi?.kpiType === "BERSAMA" ? "KPI Bersama (wajib korporat)" : "KPI Unit (disesuaikan dengan unit / kamus / kustom)";
  const deskripsi = kpi
    ? kpi.description ??
      (kpi.title.includes("Strategic") || kpi.title.includes("strategis")
        ? "Mengukur efisiensi waktu dan penggunaan sumber daya dalam implementasi proyek strategis unit selama periode berjalan."
        : `Definisi operasional untuk "${kpi.title}" pada periode ${kpi.year} (prototipe demo).`)
    : "";

  const realizations: KpiRealization[] = kpi
    ? state.realizations.filter((r) => r.kpiItemId === kpi.id).sort((a, b) => a.period.localeCompare(b.period))
    : [];

  const sheetLabel =
    detailVariant === "monitoring" ? "Detail KPI — monitoring" : "Detail KPI — perencanaan";

  return (
    <Sheet open={kpi !== null} onOpenChange={(o) => !o && onClose()}>
      {kpi ? (
        <SheetContent
          side="right"
          presentation="floating"
          className="flex w-full flex-col gap-0 overflow-y-auto border-border p-0 sm:max-w-lg"
        >
          <SheetHeader className="space-y-3 border-b border-border bg-card px-6 py-5 text-left">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{sheetLabel}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {detailVariant === "monitoring" ? (
                    <Badge variant="neutral" className="text-[10px]">
                      Verifikasi realisasi
                    </Badge>
                  ) : (
                    <KpiStatusBadge status={kpi.itemApprovalStatus} />
                  )}
                  {kpi.source === "ADMIN_UPLOAD" ? (
                    <Badge variant="neutral" className="text-[10px]">
                      Terkunci korporat
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
            <SheetTitle className="pr-8 text-left text-xl font-semibold leading-tight text-foreground">{kpi.title}</SheetTitle>
            {kpi.code ? <p className="text-xs font-mono text-muted-foreground">{kpi.code}</p> : null}
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-5 px-6 py-5">
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Ringkasan</h3>
              <Card className="border-border shadow-none">
                <CardContent className="space-y-2 p-4 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Deskripsi: </span>
                    {deskripsi}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Jenis KPI: </span>
                    {jenisLine}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Bobot item: </span>
                    <span className="tabular-nums font-semibold text-foreground">{itemWeightPct.toFixed(2)}%</span>
                  </p>
                  {showWeightSlider && detailVariant === "planning" && own && onWeightChange && !weightLocked ? (
                    <div className="rounded-md border border-border bg-muted/30 px-3 py-2">
                      <p className="mb-2 text-xs font-medium text-foreground">Sesuaikan bobot item</p>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={minW}
                          max={maxW}
                          value={itemWeightPct}
                          onChange={(e) => onWeightChange(Number(e.target.value))}
                          className="h-2 max-w-[200px] flex-1 cursor-pointer accent-primary"
                          aria-label="Bobot item"
                        />
                        <span className="w-12 tabular-nums text-sm font-medium">{itemWeightPct}%</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Rentang {minW}%–{maxW}% sesuai kebijakan portofolio.
                      </p>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Atribut KPI (lengkap)</h3>
              <Card className="border-border shadow-none">
                <CardContent className="p-4">
                  <dl>
                    <DetailRow label="ID" value={<span className="font-mono text-xs">{kpi.id}</span>} />
                    <DetailRow label="Tahun" value={String(kpi.year)} />
                    <DetailRow label="Tipe KPI" value={kpi.kpiType} />
                    <DetailRow label="Sumber" value={kpi.source} />
                    {kpi.dictionaryItemId ? (
                      <DetailRow label="ID kamus" value={<span className="font-mono text-xs">{kpi.dictionaryItemId}</span>} />
                    ) : null}
                    <DetailRow label="Polaritas" value={polarityLabel(kpi.polarity)} />
                    <DetailRow label="Tipe target" value={kpi.targetType} />
                    <DetailRow label="Satuan target" value={kpi.targetUnit} />
                    <DetailRow label="Nilai target (tetap)" value={kpi.targetValue != null ? String(kpi.targetValue) : "—"} />
                    <DetailRow label="Ringkasan target" value={targetSummary} />
                    <DetailRow label="Frekuensi monitoring" value={monitoringLabel(kpi.monitoringPeriod)} />
                    <DetailRow label="Tipe cap" value={kpi.capType.replaceAll("_", " ")} />
                    {kpi.customCapValue != null ? (
                      <DetailRow label="Nilai cap kustom" value={String(kpi.customCapValue)} />
                    ) : null}
                    {kpi.bscPerspective ? <DetailRow label="Perspektif BSC" value={kpi.bscPerspective.replaceAll("_", " ")} /> : null}
                    <DetailRow
                      label="Bukti wajib"
                      value={kpi.evidenceRequired ? "Ya — lampiran wajib saat check-in" : "Tidak"}
                    />
                    <DetailRow
                      label="Skor berbasis kategori"
                      value={kpi.categoryBasedScoring ? "Ya" : "Tidak"}
                    />
                    {kpi.formula ? <DetailRow label="Rumus / catatan" value={kpi.formula} /> : null}
                    {kpi.parentKpiId ? (
                      <DetailRow label="Induk (cascade)" value={<span className="font-mono text-xs">{kpi.parentKpiId}</span>} />
                    ) : null}
                    {kpi.createdAt ? <DetailRow label="Dibuat" value={kpi.createdAt} /> : null}
                    {detailVariant === "planning" ? (
                      <DetailRow
                        label="Status perencanaan"
                        value={<KpiStatusBadge status={kpi.itemApprovalStatus} />}
                      />
                    ) : null}
                  </dl>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Target &amp; monitoring</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                <Card className="border-border shadow-none">
                  <CardContent className="p-3">
                    <p className="text-[10px] font-semibold uppercase text-muted-foreground">Target nilai</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">{targetSummary}</p>
                    <p className="text-[11px] text-muted-foreground">Referensi periode</p>
                  </CardContent>
                </Card>
                <Card className="border-border shadow-none">
                  <CardContent className="p-3">
                    <p className="text-[10px] font-semibold uppercase text-muted-foreground">Metrik</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{kpi.targetUnit}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {kpi.targetType === "PROGRESSIVE" ? "Target progresif per periode" : "Target tetap"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border shadow-none">
                  <CardContent className="p-3">
                    <p className="text-[10px] font-semibold uppercase text-muted-foreground">Frekuensi</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{monitoringLabel(kpi.monitoringPeriod)}</p>
                    <p className="text-[11px] text-muted-foreground">Check-in</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {detailVariant === "monitoring" && realizations.length > 0 ? (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Realisasi &amp; verifikasi</h3>
                <Card className="border-border shadow-none">
                  <CardContent className="space-y-2 p-4 text-sm">
                    <ul className="space-y-2">
                      {realizations.map((r) => (
                        <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2 last:border-0">
                          <span className="font-medium text-foreground">{r.period}</span>
                          <span className="tabular-nums text-muted-foreground">Aktual: {r.actualValue}</span>
                          <KpiStatusBadge status={r.status} className="text-[10px]" />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            ) : null}

            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Kepemilikan</h3>
              <Card className="border-border shadow-none">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-semibold text-primary ring-2 ring-primary/15">
                      {emp?.avatar ? <img src={emp.avatar} alt="" className="size-full object-cover" /> : ownerInitials}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Pemilik KPI</p>
                      <p className="text-sm font-semibold text-foreground">{ownerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t border-border pt-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {managerInitials}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Atasan langsung</p>
                      <p className="text-sm font-semibold text-foreground">{managerName ?? "—"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {detailVariant === "planning" ? (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Linimasa perencanaan (demo)</h3>
                <ul className="space-y-3 border-l-2 border-border pl-4 text-sm">
                  <li>
                    <p className="font-semibold text-foreground">STATUS: {kpi.itemApprovalStatus.replaceAll("_", " ")}</p>
                    <p className="text-xs text-muted-foreground">Status pengajuan / persetujuan rencana</p>
                  </li>
                </ul>
              </section>
            ) : null}
          </div>

          <SheetFooter className="flex flex-row justify-end gap-2 border-t border-border bg-muted px-6 py-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Tutup
            </Button>
          </SheetFooter>
        </SheetContent>
      ) : null}
    </Sheet>
  );
}
