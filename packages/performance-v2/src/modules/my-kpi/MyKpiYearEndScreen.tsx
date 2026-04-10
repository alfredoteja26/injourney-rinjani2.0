import { useMemo } from "react";
import { Link } from "react-router";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  AppStickyFooter,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageHeading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@rinjani/shared-ui";
import type { KpiScoreRow } from "../../lib/domain/types";
import {
  getBandFormulaForEmployee,
  portfolioScoreForEmployee,
  usePerformanceV2,
  usePerformanceV2Portfolio,
  validatePlanningSubmit,
} from "../../lib/store/performance-v2-store";
import { MyKpiChangeRequestsPanel } from "./my-kpi-change-requests-panel";
import { MyKpiPersonaDemoDialogTrigger } from "./my-kpi-persona-demo-dialog";
import { MyKpiPhaseMatrix } from "./my-kpi-phase-matrix";
import { portfolioStatusLabelFromItems } from "./my-kpi-portfolio-status";
import { useMyKpiMatrixProfile } from "./use-my-kpi-matrix-profile";
import { PersonaContextBar } from "../../ui/persona-context-bar";

function capLabel(applied: boolean) {
  return applied ? "Ya" : "Tidak";
}

function ScoreTable({ title, description, rows }: { title: string; description?: string; rows: KpiScoreRow[] }) {
  if (rows.length === 0) {
    return null;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>KPI</TableHead>
              <TableHead>Pencapaian %</TableHead>
              <TableHead>PI</TableHead>
              <TableHead>Bobot</TableHead>
              <TableHead>Skor tertimbang</TableHead>
              <TableHead>Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.kpiItemId}>
                <TableCell className="max-w-[200px] font-medium">{row.title}</TableCell>
                <TableCell className="tabular-nums">{row.achievementPct.toFixed(1)}</TableCell>
                <TableCell className="tabular-nums">{row.performanceIndex.toFixed(2)}</TableCell>
                <TableCell className="tabular-nums">{row.weightPct}%</TableCell>
                <TableCell className="tabular-nums">{row.weightedScore.toFixed(3)}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help underline decoration-dotted">{capLabel(row.capApplied)}</span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      {row.capApplied
                        ? "Capaian dibatasi maksimal 100% sesuai konfigurasi."
                        : "Tidak ada cap tambahan yang diterapkan pada baris ini."}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function MyKpiYearEndScreen() {
  const matrixProfile = useMyKpiMatrixProfile();
  const { state, actingAsEmployeeNumber, getEmployeeDisplay, getPositionTitleForEmployee } = usePerformanceV2();
  const { items, bersamaTotal, unitTotal } = usePerformanceV2Portfolio();
  const score = useMemo(() => portfolioScoreForEmployee(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);
  const formula = useMemo(() => getBandFormulaForEmployee(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);
  const planningCheck = useMemo(() => validatePlanningSubmit(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);
  const bersamaItemCount = useMemo(() => items.filter((i) => i.kpiType === "BERSAMA").length, [items]);
  const unitItemCount = useMemo(() => items.filter((i) => i.kpiType === "UNIT").length, [items]);
  const portfolioStatusLabel = useMemo(() => portfolioStatusLabelFromItems(items), [items]);
  const show = score != null;

  const typeByKpiId = useMemo(() => new Map(state.kpiItems.map((k) => [k.id, k.kpiType])), [state.kpiItems]);

  const { bersamaRows, unitRows } = useMemo(() => {
    const b: KpiScoreRow[] = [];
    const u: KpiScoreRow[] = [];
    if (!score) {
      return { bersamaRows: b, unitRows: u };
    }
    for (const r of score.itemScores) {
      const t = typeByKpiId.get(r.kpiItemId);
      if (t === "BERSAMA") {
        b.push(r);
      } else {
        u.push(r);
      }
    }
    return { bersamaRows: b, unitRows: u };
  }, [score, typeByKpiId]);

  const capRule = state.kpiRuleConfig.globalCapType;
  const period = state.performancePeriod;
  const yearEndDesc = `${getEmployeeDisplay(actingAsEmployeeNumber)}${
    getPositionTitleForEmployee(actingAsEmployeeNumber) ? ` · ${getPositionTitleForEmployee(actingAsEmployeeNumber)}` : ""
  } · Ringkasan indeks kinerja akhir periode ${period.name ?? period.id}`;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="mx-auto max-w-7xl space-y-6 p-6 pb-28">
        <PageHeading
          eyebrow={`Performa · Akhir tahun · status ${period.status}`}
          title="Ringkasan penilaian akhir tahun"
          description={yearEndDesc}
          actions={
            <Button variant="outline" size="sm" asChild>
              <Link to="/performance-v2/my-kpi/check-in">Monitoring &amp; check-in</Link>
            </Button>
          }
        />
        <PersonaContextBar />
        <MyKpiPhaseMatrix
          bersamaTargetPct={formula.kpiBersamaWeightPct}
          unitTargetPct={formula.kpiUnitWeightPct}
          bersamaCurrentPct={bersamaTotal}
          unitCurrentPct={unitTotal}
          planningOk={planningCheck.ok}
          profile={matrixProfile}
          bersamaItemCount={bersamaItemCount}
          unitItemCount={unitItemCount}
          portfolioStatusLabel={portfolioStatusLabel}
        />

        {!show ? (
          <p className="text-sm text-muted-foreground">
            Belum ada dataset skor akhir tahun untuk NIK {actingAsEmployeeNumber} dalam prototipe. Contoh tersedia untuk 260102 dan 260103
            (ganti persona di demo).
          </p>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-primary/15 bg-primary/[0.06] md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Agregat portofolio</CardTitle>
                  <CardDescription>
                    US-MK-013 — subtotal per jenis, PI akhir, dan predikat penilaian (read-only, mengikuti data prototipe).
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-end gap-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subtotal KPI Bersama</p>
                    <p className="text-2xl font-semibold tabular-nums">{score!.bersamaSubtotal.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subtotal KPI Unit</p>
                    <p className="text-2xl font-semibold tabular-nums">{score!.unitSubtotal.toFixed(3)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">PI akhir</p>
                    <p className="text-3xl font-bold tabular-nums text-primary">{score!.finalPI.toFixed(3)}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">Predikat</p>
                    <Badge variant="success" className="w-fit text-sm">
                      {score!.ratingLabel}
                    </Badge>
                    <p className="text-xs text-muted-foreground">Pencapaian agregat: {score!.finalAchievementPct}%</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Rumus & kebijakan cap</CardTitle>
                  <CardDescription>US-MK-013 — transparansi perhitungan (teks DIP).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    PI = Σ(PI item × Bobot item) per jenis KPI, lalu Σ(PI jenis × Bobot jenis).
                  </p>
                  <p>
                    Contoh angka pada portofolio ini: subtotal KPI Bersama {score!.bersamaSubtotal.toFixed(2)} + subtotal KPI Unit{" "}
                    {score!.unitSubtotal.toFixed(3)} ≈ PI akhir {score!.finalPI.toFixed(3)} (data prototipe {score!.year}).
                  </p>
                  <p className="font-medium text-foreground">Plafon global portofolio: {capRule.replaceAll("_", " ")}</p>
                </CardContent>
              </Card>
            </div>

            {score!.managerFeedback ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Umpan balik atasan</CardTitle>
                  <CardDescription>
                    {score!.managerFeedback.reviewerName} ·{" "}
                    {new Date(score!.managerFeedback.reviewedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{score!.managerFeedback.text}</p>
                </CardContent>
              </Card>
            ) : null}

            <ScoreTable title="Rincian — KPI Bersama" description="Kontribusi per item pada bagian Bersama." rows={bersamaRows} />
            <ScoreTable title="Rincian — KPI Unit" description="Kontribusi per item pada bagian Unit." rows={unitRows} />
          </>
        )}

        <MyKpiChangeRequestsPanel />

        <AppStickyFooter
          leading={
            <div className="flex min-w-0 items-start gap-2.5 text-left text-sm">
              {show ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
              ) : (
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
              )}
              <div className="min-w-0">
                <p className={show ? "font-medium text-success" : "font-medium text-warning"}>
                  {show && score
                    ? `US-MK-013 — ringkasan read-only: PI akhir ${score.finalPI.toFixed(3)} · ${score.ratingLabel}`
                    : "Pilih persona dengan dataset skor (contoh 260102, 260103) untuk melihat breakdown penuh."}
                </p>
                <p className="text-xs text-muted-foreground">
                  Cap per item, subtotal Bersama/Unit, dan predikat mengikuti kebijakan cap portofolio.{" "}
                  <Link to="/performance-v2/my-kpi/check-in" className="font-medium text-primary underline-offset-4 hover:underline">
                    Kembali ke monitoring &amp; check-in
                  </Link>{" "}
                  untuk melengkapi realisasi.
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
                <Link to="/performance-v2/my-kpi/check-in">Monitoring</Link>
              </Button>
            </>
          }
        />
      </div>
    </TooltipProvider>
  );
}
