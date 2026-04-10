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
  Input,
  Textarea,
} from "@rinjani/shared-ui";
import type { ExtensionRequest } from "../../lib/domain/types";
import { usePerformanceV2 } from "../../lib/store/performance-v2-store";

function statusBadgeVariant(status: ExtensionRequest["status"]): "neutral" | "success" | "destructive" | "warning" {
  if (status === "APPROVED") {
    return "success";
  }
  if (status === "REJECTED") {
    return "destructive";
  }
  return "warning";
}

export function MyKpiExtensionRequestsPanel() {
  const { state, actingAsEmployeeNumber, addExtensionRequest } = usePerformanceV2();
  const [reason, setReason] = useState("");
  const [days, setDays] = useState("3");

  const myRequests = useMemo(
    () => state.extensionRequests.filter((request) => request.requestedBy === actingAsEmployeeNumber),
    [actingAsEmployeeNumber, state.extensionRequests]
  );
  const pendingCount = useMemo(() => myRequests.filter((request) => request.status === "PENDING").length, [myRequests]);

  function submitRequest() {
    const requestedDays = Number(days);
    if (!reason.trim() || Number.isNaN(requestedDays) || requestedDays < 1) {
      return;
    }

    addExtensionRequest({
      id: `ext-${Date.now()}`,
      performancePeriodId: state.performancePeriod.id,
      requestedBy: actingAsEmployeeNumber,
      reason: reason.trim(),
      requestedDays,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });

    setReason("");
    setDays("3");
  }

  return (
    <Dialog>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-border/80 bg-muted/30 px-4 py-3">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-foreground">Perpanjangan tenggat</p>
          <p className="text-sm text-muted-foreground">
            Ajukan permohonan perpanjangan lewat modal agar demo monitoring tetap ringkas, dengan jejak request tetap tercatat di store.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {pendingCount > 0 ? <Badge variant="warning">{pendingCount} pending</Badge> : null}
          <DialogTrigger asChild>
            <Button type="button">Ajukan / lihat permohonan</Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Perpanjangan tenggat</DialogTitle>
          <DialogDescription>US-MK-014 — ajukan hari tambahan dengan alasan wajib. Status request masih memakai fixture demo.</DialogDescription>
        </DialogHeader>

        <div className="flex max-h-[calc(90vh-8rem)] flex-col gap-6 overflow-y-auto pr-1">
          <div className="grid gap-4 border-b border-border pb-6 sm:grid-cols-2">
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="ext-reason-modal">Alasan</FieldLabel>
              <Textarea id="ext-reason-modal" value={reason} onChange={(event) => setReason(event.target.value)} rows={3} />
            </Field>
            <Field>
              <FieldLabel htmlFor="ext-days-modal">Hari tambahan</FieldLabel>
              <Input
                id="ext-days-modal"
                type="number"
                min={1}
                value={days}
                onChange={(event) => setDays(event.target.value)}
              />
              <FieldDescription>Contoh: 3 hari kerja.</FieldDescription>
            </Field>
            <div className="flex items-end">
              <Button type="button" onClick={submitRequest} disabled={!reason.trim()}>
                Kirim permohonan
              </Button>
            </div>
          </div>

          {myRequests.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Riwayat permohonan Anda</p>
              <ul className="space-y-3 text-sm">
                {myRequests.map((request) => (
                  <li key={request.id} className="rounded-lg border border-border px-3 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={statusBadgeVariant(request.status)}>{request.status}</Badge>
                      <span className="text-muted-foreground">+{request.requestedDays} hari</span>
                    </div>
                    <p className="mt-2 text-foreground">{request.reason}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Belum ada permohonan perpanjangan untuk NIK ini.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
