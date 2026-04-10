import { useMemo, useState } from "react";
import { Link } from "react-router";
import { FileText, Link2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  EmployeeBriefCard,
  Field,
  FieldLabel,
  Input,
  PageHeading,
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
  Textarea,
} from "@rinjani/shared-ui";
import type { KpiRealization } from "../../lib/domain/types";
import { useDirectReports, usePerformanceV2 } from "../../lib/store/performance-v2-store";
import { PersonaContextBar } from "../../ui/persona-context-bar";
import { KpiStatusBadge } from "../../ui/kpi-status-badge";
import { initialsFromName } from "../my-kpi/my-kpi-employee-brief-card";
import { MyTeamKpiHubMatrix } from "./my-team-kpi-hub-matrix";
import { locationLabelForEmployee, orgUnitNameForEmployee } from "./my-team-kpi-talent-helpers";

function targetLabelForRealization(
  state: ReturnType<typeof usePerformanceV2>["state"],
  r: KpiRealization
): string {
  const kpi = state.kpiItems.find((k) => k.id === r.kpiItemId);
  if (!kpi) {
    return "—";
  }
  if (kpi.targetType === "PROGRESSIVE") {
    const t = state.kpiTargets.find((x) => x.kpiItemId === r.kpiItemId && x.period === r.period);
    return t != null ? `${t.targetValue} ${kpi.targetUnit}` : `${kpi.targetUnit} (progresif)`;
  }
  if (kpi.targetValue != null) {
    return `${kpi.targetValue} ${kpi.targetUnit}`;
  }
  return "—";
}

export function MyTeamMonitoringScreen() {
  const { state, actingAsEmployeeNumber, getEmployeeDisplay, getPositionTitleForEmployee, upsertRealization, appendAudit } =
    usePerformanceV2();
  const directReports = useDirectReports();
  const reportNikSet = useMemo(() => new Set(directReports.map((e) => e.nik)), [directReports]);

  const pendingQueue = useMemo(() => {
    return state.realizations.filter((r) => {
      if (r.status !== "SUBMITTED") {
        return false;
      }
      const kpi = state.kpiItems.find((k) => k.id === r.kpiItemId);
      const owner = kpi?.ownerEmployeeNumber;
      return owner != null && reportNikSet.has(owner);
    });
  }, [state.kpiItems, state.realizations, reportNikSet]);

  const pendingByNik = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of pendingQueue) {
      const owner = state.kpiItems.find((k) => k.id === r.kpiItemId)?.ownerEmployeeNumber;
      if (owner) {
        m.set(owner, (m.get(owner) ?? 0) + 1);
      }
    }
    return m;
  }, [pendingQueue, state.kpiItems]);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [detailId, setDetailId] = useState<string | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectNotes, setRejectNotes] = useState("");
  const [adjustValue, setAdjustValue] = useState("");
  const [adjustNotes, setAdjustNotes] = useState("");

  const detailRealization = detailId ? state.realizations.find((r) => r.id === detailId) : undefined;
  const detailKpi = detailRealization ? state.kpiItems.find((k) => k.id === detailRealization.kpiItemId) : undefined;
  const detailOwnerNik = detailKpi?.ownerEmployeeNumber;

  function toggleSelected(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function selectAllPending() {
    setSelectedIds(new Set(pendingQueue.map((r) => r.id)));
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  function verifyRealization(r: KpiRealization) {
    upsertRealization({
      ...r,
      status: "VERIFIED",
      verifiedBy: actingAsEmployeeNumber,
      verifiedAt: new Date().toISOString(),
    });
    appendAudit("VERIFY_REALIZATION", "KpiRealization", r.period, r.id);
    setDetailId(null);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(r.id);
      return next;
    });
  }

  function rejectRealization(r: KpiRealization) {
    const trimmed = rejectNotes.trim();
    if (!trimmed) {
      return;
    }
    upsertRealization({
      ...r,
      status: "REJECTED",
      notes: [r.notes, `Catatan penolakan atasan: ${trimmed}`].filter(Boolean).join("\n\n"),
    });
    appendAudit("REJECT_REALIZATION", "KpiRealization", trimmed.slice(0, 80), r.id);
    setRejectOpen(false);
    setRejectNotes("");
    setDetailId(null);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(r.id);
      return next;
    });
  }

  function adjustAndVerify(r: KpiRealization) {
    const num = Number(adjustValue);
    const note = adjustNotes.trim();
    if (Number.isNaN(num) || !note) {
      return;
    }
    upsertRealization({
      ...r,
      status: "ADJUSTED",
      adjustedValue: num,
      adjustmentNotes: note,
      verifiedBy: actingAsEmployeeNumber,
      verifiedAt: new Date().toISOString(),
    });
    appendAudit("ADJUST_REALIZATION", "KpiRealization", `→ ${num}`, r.id);
    setAdjustValue("");
    setAdjustNotes("");
    setDetailId(null);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(r.id);
      return next;
    });
  }

  function runBatchVerify() {
    const toVerify = pendingQueue.filter((r) => selectedIds.has(r.id));
    const now = new Date().toISOString();
    for (const r of toVerify) {
      upsertRealization({
        ...r,
        status: "VERIFIED",
        verifiedBy: actingAsEmployeeNumber,
        verifiedAt: now,
      });
      appendAudit("VERIFY_REALIZATION", "KpiRealization", r.period, r.id);
    }
    appendAudit("BATCH_VERIFY_REALIZATION", "KpiRealization", `${toVerify.length} entri`);
    setBatchOpen(false);
    clearSelection();
  }

  if (actingAsEmployeeNumber !== "260101") {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <PageHeading eyebrow="Performance 2.0" title="My Team KPI" description="Konteks atasan diperlukan" />
        <PersonaContextBar />
        <Button variant="outline" asChild>
          <Link to="/performance-v2/my-team-kpi/planning">Kembali</Link>
        </Button>
      </div>
    );
  }

  const period = state.performancePeriod;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 pb-28">
      <PageHeading
        eyebrow={`Performance 2.0 · Monitoring · ${period.id}`}
        title="Pantau & verifikasi capaian tim"
        description="Antrian realisasi SUBMITTED dari bawahan langsung — verifikasi per baris, sesuaikan nilai, atau tolak dengan catatan (DIP-4)."
      />
      <PersonaContextBar />
      <MyTeamKpiHubMatrix variant="monitoring" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {directReports.map((emp) => {
          const pending = pendingByNik.get(emp.nik) ?? 0;
          const tone = pending > 0 ? "warning" : "success";
          const displayName = getEmployeeDisplay(emp.nik);
          const org =
            orgUnitNameForEmployee(state.employees, state.positions, state.orgUnits, emp.nik) ?? "Divisi HC Strategy";
          const loc = locationLabelForEmployee(state.employees, state.locations, emp.nik);
          return (
            <div
              key={emp.nik}
              className={`overflow-hidden rounded-2xl border bg-card shadow-sm ${
                pending > 0 ? "border-warning/35 bg-warning-muted/10" : "border-border"
              }`}
            >
              <EmployeeBriefCard
                className="rounded-none border-0 shadow-none"
                name={displayName}
                employeeId={<span className="font-mono">NIK {emp.nik}</span>}
                title={getPositionTitleForEmployee(emp.nik) ?? "—"}
                organization={org}
                location={loc}
                assignmentType="primary"
                assignmentLabel="Monitoring"
                initials={initialsFromName(displayName)}
                avatar={emp.avatar ? <img src={emp.avatar} alt="" className="size-full object-cover" /> : undefined}
              />
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/20 px-4 py-3">
                <Badge variant={tone === "warning" ? "warning" : "success"} className="text-[11px]">
                  {pending > 0 ? `${pending} realisasi menunggu verifikasi` : "Antrian kosong untuk periode ini"}
                </Badge>
                <Button variant="link" className="h-auto p-0 text-xs" asChild>
                  <Link to={`/performance-v2/my-team-kpi/member/${emp.nik}`}>Buka portofolio</Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Antrian verifikasi realisasi</CardTitle>
            <CardDescription>
              Pilih beberapa baris untuk verifikasi massal (semua menjadi VERIFIED). Detail: nilai, target, bukti.
            </CardDescription>
          </div>
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="text-xs text-muted-foreground sm:mr-2">
              Terpilih: <span className="font-semibold tabular-nums text-foreground">{selectedIds.size}</span>
            </p>
            <Button type="button" variant="outline" size="sm" onClick={selectAllPending} disabled={pendingQueue.length === 0}>
              Pilih semua
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={clearSelection} disabled={selectedIds.size === 0}>
              Hapus pilihan
            </Button>
            <Button type="button" size="sm" disabled={selectedIds.size === 0} onClick={() => setBatchOpen(true)}>
              Verifikasi terpilih ({selectedIds.size})
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {pendingQueue.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tidak ada realisasi yang menunggu verifikasi.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" />
                  <TableHead>Bawahan</TableHead>
                  <TableHead>KPI</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Bukti</TableHead>
                  <TableHead className="w-[100px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingQueue.map((r) => {
                  const kpi = state.kpiItems.find((k) => k.id === r.kpiItemId);
                  const owner = kpi?.ownerEmployeeNumber;
                  const title = kpi?.title ?? r.kpiItemId;
                  const target = targetLabelForRealization(state, r);
                  return (
                    <TableRow key={r.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.has(r.id)}
                          onCheckedChange={() => toggleSelected(r.id)}
                          aria-label={`Pilih ${title}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{owner ? getEmployeeDisplay(owner) : "—"}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{title}</TableCell>
                      <TableCell>{r.period}</TableCell>
                      <TableCell className="tabular-nums">{r.actualValue}</TableCell>
                      <TableCell className="text-muted-foreground">{target}</TableCell>
                      <TableCell>{r.evidence.length}</TableCell>
                      <TableCell>
                        <Button type="button" variant="outline" size="sm" onClick={() => setDetailId(r.id)}>
                          Detail
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

      <Button variant="outline" asChild>
        <Link to="/performance-v2/my-team-kpi/planning">Kembali ke perencanaan tim</Link>
      </Button>

      <AlertDialog open={batchOpen} onOpenChange={setBatchOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verifikasi massal?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedIds.size} realisasi akan ditandai VERIFIED atas nama Anda. Tindakan ini untuk prototipe (tanpa notifikasi
              push).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={runBatchVerify}>Ya, verifikasi semua</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={detailId != null} onOpenChange={(open) => !open && setDetailId(null)}>
        <SheetContent side="right" presentation="floating" className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Verifikasi realisasi</SheetTitle>
            <SheetDescription>
              {detailKpi?.title} · {detailRealization?.period}
              {detailOwnerNik ? ` · ${getEmployeeDisplay(detailOwnerNik)}` : ""}
            </SheetDescription>
          </SheetHeader>
          {detailRealization && detailKpi ? (
            <>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-2">
                <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                  <p className="text-muted-foreground">Nilai diajukan</p>
                  <p className="text-lg font-semibold tabular-nums">{detailRealization.actualValue}</p>
                  <p className="mt-2 text-muted-foreground">Target referensi</p>
                  <p className="font-medium">{targetLabelForRealization(state, detailRealization)}</p>
                </div>
                {detailRealization.notes ? (
                  <div>
                    <p className="text-sm font-medium">Catatan bawahan</p>
                    <p className="text-sm text-muted-foreground">{detailRealization.notes}</p>
                  </div>
                ) : null}
                <div>
                  <p className="mb-2 text-sm font-medium">Bukti</p>
                  <ul className="space-y-2">
                    {detailRealization.evidence.map((ev) => (
                      <li
                        key={ev.id}
                        className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                      >
                        {ev.type === "FILE" ? <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden /> : null}
                        {ev.type === "LINK" ? <Link2 className="size-4 shrink-0 text-muted-foreground" aria-hidden /> : null}
                        <span className="min-w-0 truncate">{ev.type === "FILE" ? ev.fileName : ev.linkUrl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <KpiStatusBadge status={detailRealization.status} />
                <div className="space-y-3 rounded-lg border border-dashed border-border p-3">
                  <p className="text-sm font-medium">Sesuaikan & setujui</p>
                  <Field>
                    <FieldLabel htmlFor="adj-val">Nilai disetujui (numerik)</FieldLabel>
                    <Input
                      id="adj-val"
                      value={adjustValue}
                      onChange={(e) => setAdjustValue(e.target.value)}
                      inputMode="decimal"
                      placeholder={String(detailRealization.actualValue)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="adj-note">Alasan penyesuaian</FieldLabel>
                    <Textarea id="adj-note" rows={2} value={adjustNotes} onChange={(e) => setAdjustNotes(e.target.value)} />
                  </Field>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={() => adjustAndVerify(detailRealization)}
                  >
                    Simpan penyesuaian (ADJUSTED)
                  </Button>
                </div>
              </div>
              <SheetFooter className="flex-col gap-2 border-t border-border pt-4 sm:flex-col">
                <Button type="button" className="w-full" onClick={() => verifyRealization(detailRealization)}>
                  Verifikasi (setujui apa adanya)
                </Button>
                <Button type="button" variant="destructive" className="w-full" onClick={() => setRejectOpen(true)}>
                  Tolak dengan catatan
                </Button>
              </SheetFooter>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      <AlertDialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tolak realisasi</AlertDialogTitle>
            <AlertDialogDescription>Catatan wajib untuk bawahan memperbaiki bukti atau nilai.</AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea value={rejectNotes} onChange={(e) => setRejectNotes(e.target.value)} rows={4} placeholder="Alasan penolakan…" />
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={!rejectNotes.trim()}
              onClick={() => {
                if (detailRealization && rejectNotes.trim()) {
                  rejectRealization(detailRealization);
                }
              }}
            >
              Tolak
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
