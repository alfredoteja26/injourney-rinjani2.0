import type { KpiItem, KpiRealization } from "../../lib/domain/types";

/** Ringkas alur verifikasi realisasi (Unit) — bukan status perencanaan. */
export function monitoringVerificationFlowLabel(unitRealizations: KpiRealization[]): string {
  if (unitRealizations.length === 0) {
    return "Belum ada entri realisasi Unit";
  }
  const draf = unitRealizations.filter((r) => r.status === "DRAFT").length;
  const tunggu = unitRealizations.filter((r) => r.status === "SUBMITTED").length;
  const selesai = unitRealizations.filter((r) => r.status === "VERIFIED" || r.status === "ADJUSTED").length;
  const parts: string[] = [];
  if (draf > 0) {
    parts.push(`${draf} draf`);
  }
  if (tunggu > 0) {
    parts.push(`${tunggu} menunggu verifikasi`);
  }
  if (selesai > 0) {
    parts.push(`${selesai} terverifikasi`);
  }
  return parts.length > 0 ? parts.join(" · ") : "Periksa tabel portofolio";
}

export function portfolioStatusLabelFromItems(items: KpiItem[]): string {
  if (items.length === 0) {
    return "Kosong";
  }
  const st = items.map((i) => i.itemApprovalStatus);
  if (st.some((s) => s === "WAITING_FOR_APPROVAL")) {
    return "Menunggu persetujuan atasan";
  }
  if (st.some((s) => s === "ALLOCATED")) {
    return "Alokasi (allocated)";
  }
  if (st.every((s) => s === "APPROVED" || s === "APPROVED_ADJUSTED")) {
    return "Disetujui";
  }
  return "Draft / penyesuaian";
}

/** Warna teks untuk ringkasan agregat portofolio (label sudah human-readable). */
export function portfolioStatusEmphasisClassName(label: string): string {
  const l = label.toLowerCase();
  if (l === "kosong") {
    return "text-muted-foreground";
  }
  if (l.startsWith("disetujui") && !l.includes("sebagian")) {
    return "text-success";
  }
  if (l.includes("menunggu persetujuan") || l.includes("alokasi")) {
    return "text-warning";
  }
  return "text-warning";
}
