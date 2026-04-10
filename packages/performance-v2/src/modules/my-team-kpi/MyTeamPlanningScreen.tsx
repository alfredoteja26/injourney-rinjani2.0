import type { ComponentProps } from "react";
import { Link } from "react-router";
import { Badge, Button, PageHeading, EmployeeBriefCard } from "@rinjani/shared-ui";
import { usePerformanceV2, useDirectReports } from "../../lib/store/performance-v2-store";
import { PersonaContextBar } from "../../ui/persona-context-bar";
import { initialsFromName } from "../my-kpi/my-kpi-employee-brief-card";
import { MyTeamKpiHubMatrix } from "./my-team-kpi-hub-matrix";
import { locationLabelForEmployee, orgUnitNameForEmployee } from "./my-team-kpi-talent-helpers";

const TEAM_PORTFOLIO_STATUS_LABEL: Record<string, string> = {
  NOT_STARTED: "Belum dimulai",
  IN_PROGRESS: "Sedang berjalan",
  SUBMITTED: "Diajukan",
  APPROVED: "Disetujui",
  PARTIAL_APPROVED: "Disetujui sebagian",
};

function statusBadgeVariant(status: string): ComponentProps<typeof Badge>["variant"] {
  switch (status) {
    case "NOT_STARTED":
      return "neutral";
    case "IN_PROGRESS":
      return "warning";
    case "SUBMITTED":
      return "info";
    case "APPROVED":
      return "success";
    case "PARTIAL_APPROVED":
      return "attention";
    default:
      return "neutral";
  }
}

export function MyTeamPlanningScreen() {
  const { state, actingAsEmployeeNumber, approveSubmittedPortfolio, getEmployeeDisplay, getPositionTitleForEmployee } =
    usePerformanceV2();
  const reports = useDirectReports();
  const statuses = state.teamPlanningStatuses;

  if (actingAsEmployeeNumber !== "260101") {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <PageHeading eyebrow="Performance 2.0" title="My Team KPI" description="Konteks atasan diperlukan" />
        <PersonaContextBar />
        <p className="text-sm text-muted-foreground">Buka sebagai Admin (default NIK 260101) atau atur pemetaan sesi.</p>
        <Button variant="outline" asChild>
          <Link to="/performance-v2/my-kpi">Ke My KPI</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <PageHeading eyebrow="Performance 2.0" title="My Team KPI" description="Perencanaan & persetujuan portofolio tim" />
      <PersonaContextBar />
      <MyTeamKpiHubMatrix variant="planning" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((emp) => {
          const row = statuses.find((s) => s.employeeNumber === emp.nik);
          const title = getPositionTitleForEmployee(emp.nik);
          const displayName = getEmployeeDisplay(emp.nik);
          const org =
            orgUnitNameForEmployee(state.employees, state.positions, state.orgUnits, emp.nik) ?? "Divisi HC Strategy";
          const loc = locationLabelForEmployee(state.employees, state.locations, emp.nik);

          return (
            <div
              key={emp.employee_id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <EmployeeBriefCard
                className="rounded-none border-0 shadow-none"
                name={displayName}
                employeeId={<span className="font-mono">NIK {emp.nik}</span>}
                title={title ?? "—"}
                organization={org}
                location={loc}
                assignmentType="primary"
                assignmentLabel="Bawahan langsung"
                initials={initialsFromName(displayName)}
                avatar={
                  emp.avatar ? <img src={emp.avatar} alt="" className="size-full object-cover" /> : undefined
                }
              />
              <div className="space-y-3 border-t border-border bg-muted/20 px-4 py-3">
                {row ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Status portofolio
                      </span>
                      <Badge variant={statusBadgeVariant(row.portfolioStatus)} className="text-[11px]">
                        {TEAM_PORTFOLIO_STATUS_LABEL[row.portfolioStatus] ?? row.portfolioStatus}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg bg-background/80 px-2.5 py-2 ring-1 ring-border/60">
                        <p className="text-muted-foreground">Item KPI</p>
                        <p className="font-semibold tabular-nums text-foreground">{row.totalItems}</p>
                      </div>
                      <div className="rounded-lg bg-background/80 px-2.5 py-2 ring-1 ring-border/60">
                        <p className="text-muted-foreground">Bobot valid</p>
                        <p className={row.weightValid ? "font-semibold text-success" : "font-semibold text-destructive"}>
                          {row.weightValid ? "Ya" : "Tidak"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] leading-5 text-muted-foreground">
                      Bersama {row.totalWeightBersamaPct}% · Unit {row.totalWeightUnitPct}% · Alokasi {row.itemsAllocated} ·
                      Draft {row.itemsDraft}
                    </p>
                    {!row.weightValid && row.weightInvalidDetail ? (
                      <p className="text-xs text-destructive">{row.weightInvalidDetail}</p>
                    ) : null}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/performance-v2/my-team-kpi/member/${emp.nik}`}>Review portofolio</Link>
                      </Button>
                      {row.portfolioStatus === "SUBMITTED" || row.portfolioStatus === "PARTIAL_APPROVED" ? (
                        <Button
                          size="sm"
                          type="button"
                          disabled={!row.weightValid}
                          onClick={() => approveSubmittedPortfolio(emp.nik)}
                        >
                          Setujui yang menunggu
                        </Button>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Tidak ada ringkasan fixture untuk NIK ini.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
