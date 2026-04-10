import { Badge, Card, CardContent, Progress } from "@rinjani/shared-ui";
import type { KpiItem } from "../../lib/domain/types";

export interface MyKpiHubWeightCardsProps {
  bersamaTargetPct: number;
  unitTargetPct: number;
  bersamaCurrentPct: number;
  unitCurrentPct: number;
  planningGateOk: boolean;
}

export function MyKpiHubWeightCards({
  bersamaTargetPct,
  unitTargetPct,
  bersamaCurrentPct,
  unitCurrentPct,
  planningGateOk,
}: MyKpiHubWeightCardsProps) {
  const bersamaValid = bersamaCurrentPct === bersamaTargetPct;
  const unitValid = unitCurrentPct === unitTargetPct;
  const totalPct = bersamaCurrentPct + unitCurrentPct;
  const totalValid = bersamaValid && unitValid && totalPct === 100;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-primary/10 bg-gradient-to-br from-primary/[0.07] to-transparent">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">KPI Bersama</p>
            <Badge variant={bersamaValid ? "success" : "warning"}>{bersamaValid ? "Valid" : "Sesuaikan"}</Badge>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">
            {bersamaCurrentPct}% <span className="text-sm font-normal text-muted-foreground">/ {bersamaTargetPct}% wajib</span>
          </p>
          <Progress value={Math.min(100, (bersamaCurrentPct / Math.max(1, bersamaTargetPct)) * 100)} className="h-2" />
          <p className="text-xs text-muted-foreground">Bobot korporat — diset lewat admin / kamus bersama.</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">KPI Unit</p>
            <Badge variant={unitValid ? "success" : "warning"}>{unitValid ? "Valid" : "Sesuaikan"}</Badge>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">
            {unitCurrentPct}% <span className="text-sm font-normal text-muted-foreground">/ {unitTargetPct}% wajib</span>
          </p>
          <Progress value={Math.min(100, (unitCurrentPct / Math.max(1, unitTargetPct)) * 100)} className="h-2" />
          <p className="text-xs text-muted-foreground">Disesuaikan dengan atasan di perencanaan.</p>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary text-primary-foreground shadow-md">
        <CardContent className="space-y-2 p-4">
          <p className="text-sm font-semibold opacity-95">Total bobot portofolio</p>
          <p className="text-3xl font-bold tabular-nums">{totalPct}%</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              {totalValid && planningGateOk ? "Siap ajukan" : "Perlu tindakan"}
            </span>
          </div>
          <p className="text-xs leading-relaxed opacity-90">
            Pengajuan aktif hanya jika rumus band terpenuhi dan tidak ada item ALLOCATED tanpa target final.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function countByStatus(items: KpiItem[], predicate: (s: KpiItem["itemApprovalStatus"]) => boolean) {
  return items.filter((i) => predicate(i.itemApprovalStatus)).length;
}

export function MyKpiHubStatusGrid({ items }: { items: KpiItem[] }) {
  const draft = countByStatus(items, (s) => s === "DRAFT");
  const allocated = countByStatus(items, (s) => s === "ALLOCATED");
  const approved = countByStatus(items, (s) => s === "APPROVED" || s === "APPROVED_ADJUSTED");
  const waiting = countByStatus(items, (s) => s === "WAITING_FOR_APPROVAL");

  const cells = [
    { label: "Jumlah KPI", value: items.length, tone: "neutral" as const },
    { label: "Status: Draft", value: draft, tone: "neutral" as const },
    { label: "Status: Allocated", value: allocated, tone: "attention" as const },
    { label: "Status: Disetujui", value: approved, tone: "success" as const },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cells.map((c) => (
        <Card
          key={c.label}
          className={
            c.tone === "attention"
              ? "border-secondary/30 bg-secondary/10"
              : c.tone === "success"
                ? "border-success/25 bg-success-muted/40"
                : ""
          }
        >
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{c.value}</p>
            {c.label.startsWith("Status") ? <p className="mt-1 text-[11px] text-muted-foreground">item</p> : null}
          </CardContent>
        </Card>
      ))}
      <Card className="sm:col-span-2 lg:col-span-4">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Menunggu persetujuan atasan</p>
            <p className="text-lg font-semibold tabular-nums">{waiting} item</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function MyKpiHubReadinessBar({ ok, detail }: { ok: boolean; detail: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
        ok ? "border-success/30 bg-success-muted/50 text-foreground" : "border-warning/30 bg-warning-muted/40 text-foreground"
      }`}
    >
      <span className="text-lg" aria-hidden>
        {ok ? "✓" : "!"}
      </span>
      <div>
        <p className="font-semibold">{ok ? "Kesiapan submit: valid" : "Kesiapan submit: perlu perbaikan"}</p>
        <p className="text-xs opacity-90">{detail}</p>
      </div>
    </div>
  );
}
