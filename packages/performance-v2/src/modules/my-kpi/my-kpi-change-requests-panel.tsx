import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldDescription,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@rinjani/shared-ui";
import type { KpiChangeRequest } from "../../lib/domain/types";
import { usePerformanceV2, usePerformanceV2Portfolio } from "../../lib/store/performance-v2-store";

const JUSTIFICATION_MAX = 2000;

function statusBadgeVariant(s: KpiChangeRequest["status"]): "neutral" | "success" | "destructive" | "warning" {
  if (s === "APPROVED") {
    return "success";
  }
  if (s === "REJECTED") {
    return "destructive";
  }
  if (s === "REVISION_REQUESTED") {
    return "warning";
  }
  return "neutral";
}

export function MyKpiChangeRequestsPanel() {
  const {
    state,
    actingAsEmployeeNumber,
    managerEmployeeNumber,
    addKpiChangeRequest,
    resolveKpiChangeRequestMock,
    getEmployeeDisplay,
  } = usePerformanceV2();
  const reviewerNik = managerEmployeeNumber ?? "260101";
  const { items } = usePerformanceV2Portfolio();
  const mine = useMemo(
    () => state.kpiChangeRequests.filter((r) => r.requestedBy === actingAsEmployeeNumber),
    [state.kpiChangeRequests, actingAsEmployeeNumber]
  );
  const pendingCount = useMemo(() => mine.filter((request) => request.status === "PENDING").length, [mine]);

  const [justification, setJustification] = useState("");
  const [requestType, setRequestType] = useState<KpiChangeRequest["requestType"]>("UPDATE");
  const [kpiItemId, setKpiItemId] = useState<string>("");

  function submitRequest() {
    const j = justification.trim();
    if (!j) {
      return;
    }
    const id = `KCR-${Date.now()}`;
    addKpiChangeRequest({
      id,
      kpiItemId: kpiItemId || undefined,
      requestType,
      requestedBy: actingAsEmployeeNumber,
      justification: j,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });
    setJustification("");
    setKpiItemId("");
  }

  return (
    <Dialog>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-border/80 bg-muted/30 px-4 py-3">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-foreground">Permohonan perubahan KPI</p>
          <p className="text-sm text-muted-foreground">
            Di luar fase perencanaan, ajukan perubahan lewat modal dengan justifikasi wajib sesuai DIP-1 §5.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {pendingCount > 0 ? <Badge variant="warning">{pendingCount} pending</Badge> : null}
          <DialogTrigger asChild>
            <Button type="button">Ajukan / lihat permohonan</Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Permohonan perubahan KPI</DialogTitle>
          <DialogDescription>
            Di luar fase perencanaan — ajukan dengan alasan wajib. Tinjauan atasan/admin masih disimulasikan dengan tombol demo.
          </DialogDescription>
        </DialogHeader>

        <div className="flex max-h-[calc(90vh-8rem)] flex-col gap-6 overflow-y-auto pr-1">
          <div className="grid gap-4 border-b border-border pb-6 md:grid-cols-2">
            <Field className="md:col-span-2">
              <FieldLabel>Jenis permohonan</FieldLabel>
              <Select value={requestType} onValueChange={(v) => setRequestType(v as KpiChangeRequest["requestType"])}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPDATE">Ubah KPI / target / bobot</SelectItem>
                  <SelectItem value="CREATE">Tambah KPI baru</SelectItem>
                  <SelectItem value="DELETE">Hapus KPI</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            {requestType !== "CREATE" ? (
              <Field className="md:col-span-2">
                <FieldLabel>KPI terkait (opsional)</FieldLabel>
                <Select value={kpiItemId || "__none__"} onValueChange={(v) => setKpiItemId(v === "__none__" ? "" : v)}>
                  <SelectTrigger className="w-full max-w-md">
                    <SelectValue placeholder="Pilih dari portofolio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">—</SelectItem>
                    {items.map((k) => (
                      <SelectItem key={k.id} value={k.id}>
                        {k.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            ) : null}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="cr-just">Alasan / justifikasi</FieldLabel>
              <Textarea
                id="cr-just"
                rows={4}
                maxLength={JUSTIFICATION_MAX}
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
              />
              <FieldDescription>
                Wajib diisi · {justification.length}/{JUSTIFICATION_MAX}
              </FieldDescription>
            </Field>
            <div>
              <Button type="button" onClick={submitRequest} disabled={!justification.trim()}>
                Kirim permohonan
              </Button>
            </div>
          </div>

          {mine.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Riwayat permohonan Anda</p>
              <ul className="space-y-3 text-sm">
                {mine.map((r) => (
                  <li key={r.id} className="rounded-lg border border-border px-3 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={statusBadgeVariant(r.status)}>{r.status}</Badge>
                      <span className="text-muted-foreground">{r.requestType}</span>
                      {r.kpiItemId ? (
                        <span className="text-xs text-muted-foreground">
                          · {state.kpiItems.find((k) => k.id === r.kpiItemId)?.title ?? r.kpiItemId}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-foreground">{r.justification}</p>
                    {r.reviewNotes ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Catatan peninjau: {r.reviewNotes}
                        {r.reviewedBy ? ` · ${getEmployeeDisplay(r.reviewedBy)}` : null}
                      </p>
                    ) : null}
                    {r.status === "PENDING" ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            resolveKpiChangeRequestMock(r.id, "APPROVED", {
                              reviewNotes: "Disetujui (simulasi demo).",
                              reviewerEmployeeNumber: reviewerNik,
                            })
                          }
                        >
                          Simulasikan setujui
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            resolveKpiChangeRequestMock(r.id, "REJECTED", {
                              reviewNotes: "Ditolak (simulasi demo).",
                              reviewerEmployeeNumber: reviewerNik,
                            })
                          }
                        >
                          Simulasikan tolak
                        </Button>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Belum ada permohonan untuk NIK ini.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
