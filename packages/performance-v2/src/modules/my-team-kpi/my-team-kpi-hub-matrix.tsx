import { useMemo, type ReactNode } from "react";
import { Building2, CalendarRange, CheckCircle2, ClipboardList, ShieldCheck, Users } from "lucide-react";
import {
  Badge,
  EmployeeBriefCard,
  MetricCard,
} from "@rinjani/shared-ui";
import type { KpiRealization, PortfolioStatus } from "../../lib/domain/types";
import { useDirectReports, usePerformanceV2 } from "../../lib/store/performance-v2-store";
import { initialsFromName } from "../my-kpi/my-kpi-employee-brief-card";
import { locationLabelForEmployee, orgUnitNameForEmployee } from "./my-team-kpi-talent-helpers";

export type MyTeamKpiHubVariant = "planning" | "monitoring";

function formatIdDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) {
    return iso;
  }
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function statusCountsForTeam(
  reportNikSet: Set<string>,
  statuses: { employeeNumber: string; portfolioStatus: PortfolioStatus; weightValid: boolean }[]
) {
  const rows = statuses.filter((s) => reportNikSet.has(s.employeeNumber));
  let approved = 0;
  let awaitingManager = 0;
  let inFlight = 0;
  let invalidWeight = 0;
  for (const r of rows) {
    if (!r.weightValid) {
      invalidWeight += 1;
    }
    switch (r.portfolioStatus) {
      case "APPROVED":
        approved += 1;
        break;
      case "SUBMITTED":
      case "PARTIAL_APPROVED":
        awaitingManager += 1;
        break;
      case "NOT_STARTED":
      case "IN_PROGRESS":
        inFlight += 1;
        break;
      default:
        break;
    }
  }
  return { approved, awaitingManager, inFlight, invalidWeight, covered: rows.length };
}

type BriefFooterProps = { children: ReactNode };

function BriefFooter({ children }: BriefFooterProps) {
  return (
    <div className="border-t border-border bg-muted/25 px-4 py-3 text-xs leading-relaxed text-muted-foreground">{children}</div>
  );
}

export function MyTeamKpiHubMatrix({ variant }: { variant: MyTeamKpiHubVariant }) {
  const {
    state,
    actingAsEmployeeNumber,
    managerEmployeeNumber,
    getEmployeeDisplay,
    getPositionTitleForEmployee,
  } = usePerformanceV2();
  const directReports = useDirectReports();
  const period = state.performancePeriod;

  const reportNikSet = useMemo(() => new Set(directReports.map((e) => e.nik)), [directReports]);

  const pendingQueue = useMemo(() => {
    return state.realizations.filter((r: KpiRealization) => {
      if (r.status !== "SUBMITTED") {
        return false;
      }
      const kpi = state.kpiItems.find((k) => k.id === r.kpiItemId);
      const owner = kpi?.ownerEmployeeNumber;
      return owner != null && reportNikSet.has(owner);
    });
  }, [state.kpiItems, state.realizations, reportNikSet]);

  const membersWithQueue = useMemo(() => {
    const s = new Set<string>();
    for (const r of pendingQueue) {
      const owner = state.kpiItems.find((k) => k.id === r.kpiItemId)?.ownerEmployeeNumber;
      if (owner) {
        s.add(owner);
      }
    }
    return s.size;
  }, [pendingQueue, state.kpiItems]);

  const openCheckIn = useMemo(
    () => state.checkInSchedules.find((c) => c.status === "OPEN"),
    [state.checkInSchedules]
  );

  const planningStats = useMemo(
    () => statusCountsForTeam(reportNikSet, state.teamPlanningStatuses),
    [reportNikSet, state.teamPlanningStatuses]
  );

  const viewerEmp = state.employees.find((e) => e.nik === actingAsEmployeeNumber);
  const viewerName = getEmployeeDisplay(actingAsEmployeeNumber);
  const viewerTitle = getPositionTitleForEmployee(actingAsEmployeeNumber) ?? "—";
  const viewerOrg =
    orgUnitNameForEmployee(state.employees, state.positions, state.orgUnits, actingAsEmployeeNumber) ?? "—";
  const viewerLoc = locationLabelForEmployee(state.employees, state.locations, actingAsEmployeeNumber);

  const managerNik = managerEmployeeNumber;
  const managerEmp = managerNik ? state.employees.find((e) => e.nik === managerNik) : undefined;
  const managerName = managerNik ? getEmployeeDisplay(managerNik) : null;
  const managerTitle = managerNik ? getPositionTitleForEmployee(managerNik) ?? "—" : null;
  const managerOrg = managerNik
    ? orgUnitNameForEmployee(state.employees, state.positions, state.orgUnits, managerNik) ?? "—"
    : null;

  const planningEnd = formatIdDate(period.planningEndDate);
  const planningStart = formatIdDate(period.planningStartDate);
  const completionRate =
    directReports.length > 0 ? Math.round((planningStats.approved / directReports.length) * 100) : 0;

  return (
    <section className="space-y-5" aria-label="Ringkasan tim & metrik">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <EmployeeBriefCard
            className="rounded-none border-0 shadow-none"
            name={viewerName}
            employeeId={<span className="font-mono">NIK {actingAsEmployeeNumber}</span>}
            title={viewerTitle}
            organization={viewerOrg}
            location={viewerLoc}
            assignmentType="primary"
            assignmentLabel="Anda · atasan tim"
            initials={initialsFromName(viewerName)}
            avatar={
              viewerEmp?.avatar ? (
                <img src={viewerEmp.avatar} alt="" className="size-full object-cover" />
              ) : undefined
            }
          />
          <BriefFooter>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                <Users className="size-3.5 shrink-0 text-primary" aria-hidden />
                {directReports.length} bawahan langsung
              </span>
              <span className="text-border">·</span>
              <span>
                Periode <span className="font-medium text-foreground">{period.name ?? period.year}</span> · fase aktif{" "}
                <Badge variant="info" className="align-middle text-[10px]">
                  {period.phase === "PLANNING" ? "Perencanaan" : period.phase === "MONITORING" ? "Monitoring" : "Akhir tahun"}
                </Badge>
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-5">
              Matriks ini merangkum portofolio & antrian verifikasi untuk lingkup tim di bawah NIK Anda — selaras dengan DIP My
              Team KPI.
            </p>
          </BriefFooter>
        </div>

        {managerNik && managerName ? (
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <EmployeeBriefCard
              className="rounded-none border-0 shadow-none"
              name={managerName}
              employeeId={<span className="font-mono">NIK {managerNik}</span>}
              title={managerTitle ?? "—"}
              organization={managerOrg ?? "—"}
              location={managerEmp ? locationLabelForEmployee(state.employees, state.locations, managerNik) : undefined}
              assignmentType="primary"
              assignmentLabel="Linier atasan"
              initials={initialsFromName(managerName)}
              avatar={
                managerEmp?.avatar ? (
                  <img src={managerEmp.avatar} alt="" className="size-full object-cover" />
                ) : undefined
              }
            />
            <BriefFooter>
              <div className="flex flex-wrap items-center gap-2">
                <ShieldCheck className="size-3.5 shrink-0 text-secondary" aria-hidden />
                <span>
                  Garis pelaporan formal · keputusan kebijakan korporat & eskalasi persetujuan mengikuti struktur di atas Anda.
                </span>
              </div>
            </BriefFooter>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-dashed border-primary/25 bg-gradient-to-br from-primary/[0.07] via-card to-card shadow-sm">
            <div className="flex items-start gap-4 p-4">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                aria-hidden
              >
                <Building2 className="size-6 opacity-90" />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold text-foreground">Linier atasan</p>
                <p className="text-xs leading-5 text-muted-foreground">
                  Tidak ada atasan langsung pada master posisi untuk peran ini (puncak unit / holding). Gunakan jadwal periode
                  di bawah sebagai sumber kebenaran tata waktu perencanaan.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="neutral" className="text-[10px]">
                    {period.id}
                  </Badge>
                  <Badge variant="neutral" className="text-[10px]">
                    Status {period.status}
                  </Badge>
                </div>
              </div>
            </div>
            <BriefFooter>
              <div className="flex items-start gap-2">
                <CalendarRange className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                <span>
                  Jendela perencanaan: <span className="font-medium text-foreground">{planningStart}</span>
                  {" → "}
                  <span className="font-medium text-foreground">{planningEnd}</span>
                </span>
              </div>
            </BriefFooter>
          </div>
        )}
      </div>

      {variant === "planning" ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Tim langsung"
            value={directReports.length}
            description="Karyawan dengan atasan = Anda di fixture talent."
            supportingValue={`${planningStats.covered} dari ${directReports.length} punya baris status perencanaan`}
          />
          <MetricCard
            className="border-success/20 bg-success-muted/15"
            label="Perencanaan disetujui"
            value={planningStats.approved}
            description="Portofolio berstatus disetujui penuh — siap dieksekusi di monitoring."
            trend={`${completionRate}% tim`}
            trendTone="success"
            supportingValue={
              planningStats.awaitingManager > 0
                ? `${planningStats.awaitingManager} masih menunggu tindakan persetujuan Anda`
                : "Tidak ada antrian persetujuan aktif"
            }
          />
          <MetricCard
            className="border-primary/20 bg-primary/[0.04]"
            label="Menunggu Anda"
            value={planningStats.awaitingManager}
            description="Diajukan atau disetujui sebagian — bobot valid diperlukan sebelum menyetujui sisa."
            trend={planningStats.invalidWeight > 0 ? `${planningStats.invalidWeight} bobot invalid` : undefined}
            trendTone={planningStats.invalidWeight > 0 ? "warning" : "neutral"}
            supportingValue={`${planningStats.inFlight} rekan masih menyusun / belum mengajukan`}
          />
          <MetricCard
            label="Tutup perencanaan"
            value={planningEnd}
            description="Tanggal penutupan jendela pengajuan portofolio (sumber: periode kinerja)."
            supportingValue={`Mulai ${planningStart} · id periode ${period.id}`}
          />
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Anggota tim"
            value={directReports.length}
            description="Lingkup verifikasi realisasi & pantauan capaian."
          />
          <MetricCard
            className="border-primary/25 bg-primary/[0.05]"
            label="Antrian verifikasi"
            value={pendingQueue.length}
            description="Entri realisasi SUBMITTED milik KPI bawahan langsung."
            trend={membersWithQueue > 0 ? `${membersWithQueue} orang berkontribusi` : undefined}
            trendTone="warning"
            supportingValue={pendingQueue.length === 0 ? "Tidak ada pekerjaan verifikasi tertunda" : undefined}
          />
          <MetricCard
            label="Jendela check-in aktif"
            value={openCheckIn ? openCheckIn.period : "—"}
            description={
              openCheckIn
                ? `Buka ${formatIdDate(openCheckIn.windowStart)} – ${formatIdDate(openCheckIn.windowEnd)}`
                : "Tidak ada jadwal check-in berstatus OPEN pada fixture."
            }
            supportingValue={
              openCheckIn?.deadlineDate
                ? `Deadline entri: ${formatIdDate(openCheckIn.deadlineDate)}`
                : undefined
            }
          />
          <MetricCard
            label="Cadangan perencanaan"
            value={planningStats.approved}
            description="Bawahan dengan portofolio sudah disetujui — dasar target untuk verifikasi monitoring."
            supportingValue={
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-success" aria-hidden />
                Baseline disepakati sebelum eksekusi kuartal
              </span>
            }
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/80 bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
        <ClipboardList className="size-4 shrink-0 text-primary" aria-hidden />
        <span>
          <span className="font-medium text-foreground">My Team KPI Matrix</span>
          {variant === "planning"
            ? " — fokus persetujuan portofolio, validitas bobot, dan penutupan fase perencanaan."
            : " — fokus antrian verifikasi realisasi, jadwal check-in, dan konsistensi capaian terhadap portofolio yang disetujui."}
        </span>
      </div>
    </section>
  );
}
