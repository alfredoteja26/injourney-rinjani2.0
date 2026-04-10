import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import {
  Alert,
  AlertDescription,
  AlertTitle,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  AppStickyFooter,
  PageHeading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SearchInput,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Textarea,
} from "@rinjani/shared-ui";
import { kpiItemFromDictionary, newPortfolioKpiId } from "../../lib/domain/kpi-from-dictionary";
import type { KpiItem, Polarity } from "../../lib/domain/types";
import {
  getBandFormulaForEmployee,
  isPlanningPortfolioAddKpiBlocked,
  usePerformanceV2,
  usePerformanceV2Portfolio,
  validatePlanningSubmit,
  isKpiItemBlockedForPlanningTargetOrWeight,
} from "../../lib/store/performance-v2-store";
import { KpiPlanningDetailSheet } from "./kpi-planning-detail-sheet";
import { KpiPortfolioPanel } from "./kpi-portfolio-panel";
import { MyKpiPersonaDemoDialogTrigger } from "./my-kpi-persona-demo-dialog";
import { MyKpiPhaseMatrix } from "./my-kpi-phase-matrix";
import { portfolioStatusLabelFromItems } from "./my-kpi-portfolio-status";
import { useMyKpiMatrixProfile } from "./use-my-kpi-matrix-profile";
import { PersonaContextBar } from "../../ui/persona-context-bar";

export function MyKpiPlanningScreen() {
  const matrixProfile = useMyKpiMatrixProfile();
  const {
    state,
    actingAsEmployeeNumber,
    getEmployeeDisplay,
    getPositionTitleForEmployee,
    submitPlanning,
    addKpiFromDictionary,
    addCustomKpiItem,
    copyFromPreviousYearMock,
    respondWaitingReview,
    updateOwnershipWeight,
  } = usePerformanceV2();
  const { items, bersamaTotal, unitTotal, ownerships } = usePerformanceV2Portfolio();
  const [submitBanner, setSubmitBanner] = useState<{ variant: "ok" | "err"; text: string } | null>(null);
  const [libSearch, setLibSearch] = useState("");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customUnit, setCustomUnit] = useState("%");
  const [customTarget, setCustomTarget] = useState("90");
  const [customPolarity, setCustomPolarity] = useState<Polarity>("POSITIVE");
  const [customNote, setCustomNote] = useState("");
  const [detailKpi, setDetailKpi] = useState<KpiItem | null>(null);

  const planningCheck = useMemo(() => validatePlanningSubmit(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);
  const formula = useMemo(() => getBandFormulaForEmployee(state, actingAsEmployeeNumber), [state, actingAsEmployeeNumber]);
  const period = state.performancePeriod;
  const year = period.year;
  const prevYear = year - 1;
  const minW = state.kpiRuleConfig.minWeightPerItemPct ?? 5;
  const addKpiBlocked = useMemo(
    () => isPlanningPortfolioAddKpiBlocked(state, actingAsEmployeeNumber),
    [state, actingAsEmployeeNumber]
  );
  const waitingReviewItems = useMemo(
    () => items.filter((i) => i.itemApprovalStatus === "WAITING_REVIEW"),
    [items]
  );

  useEffect(() => {
    if (libraryOpen) {
      setLibSearch("");
    }
  }, [libraryOpen]);

  const libraryMatches = useMemo(() => {
    const q = libSearch.trim().toLowerCase();
    if (q.length < 2) {
      return [];
    }
    return state.dictionaryItems
      .filter((d) => d.status === "PUBLISHED")
      .filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          (d.description?.toLowerCase().includes(q) ?? false)
      )
      .slice(0, 10);
  }, [libSearch, state.dictionaryItems]);

  const portfolioStatusLabel = useMemo(() => portfolioStatusLabelFromItems(items), [items]);
  const bersamaItemCount = useMemo(() => items.filter((i) => i.kpiType === "BERSAMA").length, [items]);
  const unitItemCount = useMemo(() => items.filter((i) => i.kpiType === "UNIT").length, [items]);

  function addFromLibrary(dictionaryId: string) {
    const d = state.dictionaryItems.find((x) => x.id === dictionaryId);
    if (!d) {
      return;
    }
    const dup = items.some((i) => i.dictionaryItemId === d.id);
    if (dup) {
      return;
    }
    const id = newPortfolioKpiId(d.kpiType === "BERSAMA" ? "KPI-B" : "KPI-U");
    const newKpiItem = kpiItemFromDictionary(d, actingAsEmployeeNumber, year, id);
    addKpiFromDictionary({
      employeeNumber: actingAsEmployeeNumber,
      dictionaryItemId: d.id,
      newKpiItem,
      newOwnershipId: `own-${Date.now()}`,
    });
  }

  function saveCustomKpi() {
    const title = customTitle.trim();
    const tv = Number(customTarget);
    if (!title || Number.isNaN(tv)) {
      return;
    }
    const id = newPortfolioKpiId("KPI-C");
    const kpiItem: KpiItem = {
      id,
      title,
      description: customNote.trim() || undefined,
      kpiType: "UNIT",
      polarity: customPolarity,
      targetType: "FIXED",
      targetValue: tv,
      targetUnit: customUnit.trim() || "%",
      monitoringPeriod: "ANNUAL",
      capType: "NO_CAP",
      source: "CUSTOM",
      year,
      itemApprovalStatus: "DRAFT",
      ownerEmployeeNumber: actingAsEmployeeNumber,
    };
    addCustomKpiItem(kpiItem, {
      id: `own-${Date.now()}`,
      kpiItemId: id,
      employeeNumber: actingAsEmployeeNumber,
      ownershipType: "OWNER",
      weightPct: minW,
      weightApprovalStatus: "DRAFT",
      year,
    });
    setCustomTitle("");
    setCustomTarget("90");
    setCustomNote("");
    setCustomOpen(false);
  }

  function runSubmit() {
    const result = submitPlanning(actingAsEmployeeNumber);
    setSubmitDialogOpen(false);
    if (result.ok) {
      setSubmitBanner({
        variant: "ok",
        text: "Rencana KPI berhasil diajukan untuk review. Portofolio terkunci untuk item yang dikirim hingga atasan merespons.",
      });
    } else {
      setSubmitBanner({ variant: "err", text: result.reasons.join(" ") });
    }
  }

  const positionTitle = getPositionTitleForEmployee(actingAsEmployeeNumber);
  const descText = `Selaraskan target kinerja tahunan dengan strategi unit. ${getEmployeeDisplay(actingAsEmployeeNumber)}${
    positionTitle ? ` · ${positionTitle}` : ""
  } · Periode: ${period.name ?? period.id}`;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 pb-28">
      <PageHeading
        eyebrow={`Performa · Perencanaan · status ${period.status}`}
        title={`Rencana KPI ${period.year}`}
        description={descText}
        actions={
          <div className="flex flex-wrap items-center justify-end gap-2">
            {planningCheck.ok ? (
              <Badge variant="success" className="px-3 py-1">
                Siap ajukan
              </Badge>
            ) : (
              <Badge variant="warning" className="px-3 py-1">
                Perlu perbaikan
              </Badge>
            )}
          </div>
        }
      />

      <PersonaContextBar />

      <MyKpiPhaseMatrix
        profile={matrixProfile}
        bersamaTargetPct={formula.kpiBersamaWeightPct}
        unitTargetPct={formula.kpiUnitWeightPct}
        bersamaCurrentPct={bersamaTotal}
        unitCurrentPct={unitTotal}
        planningOk={planningCheck.ok}
        bersamaItemCount={bersamaItemCount}
        unitItemCount={unitItemCount}
        portfolioStatusLabel={portfolioStatusLabel}
      />

      {period.status === "CLOSED" ? (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">Periode Planning Ditutup</div>
      ) : null}

      {!planningCheck.ok ? (
        <Alert variant="destructive">
          <AlertTitle>Pengajuan belum memenuhi syarat</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 list-inside list-disc text-sm">
              {planningCheck.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      ) : null}

      {submitBanner ? (
        <Alert variant={submitBanner.variant === "ok" ? "success" : "destructive"}>
          <AlertTitle>{submitBanner.variant === "ok" ? "Berhasil" : "Tidak dapat mengajukan"}</AlertTitle>
          <AlertDescription>{submitBanner.text}</AlertDescription>
        </Alert>
      ) : null}

      {waitingReviewItems.length > 0 ? (
        <Card id="path-b" className="border-primary/20 bg-primary/[0.04]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Usulan atasan — tinjauan Anda (Path B)</CardTitle>
            <CardDescription>
              Item berikut diajukan atasan untuk portofolio Anda. Pilih Kembali ke draf untuk mengedit, atau Ajukan ke persetujuan untuk
              mengirim ke alur persetujuan (DIP-1 §5).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {waitingReviewItems.map((row) => (
              <div
                key={row.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{row.title}</p>
                  <p className="text-xs text-muted-foreground">Status: menunggu tinjauan bawahan</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => respondWaitingReview(actingAsEmployeeNumber, row.id, "REVISE")}
                  >
                    Kembali ke draf
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => respondWaitingReview(actingAsEmployeeNumber, row.id, "SUBMIT_FOR_APPROVAL")}
                  >
                    Ajukan ke persetujuan
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" disabled={period.status === "CLOSED" || addKpiBlocked}>
              Tambah KPI
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[14rem]">
            <DropdownMenuItem onSelect={() => setLibraryOpen(true)}>Dari Kamus</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCustomOpen(true)}>KPI kustom (Unit)</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCopyOpen(true)}>Salin dari periode lalu</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        {addKpiBlocked ? (
          <p className="text-xs text-muted-foreground">
            Penambahan KPI dinonaktifkan: seluruh portofolio Anda berstatus menunggu persetujuan atau disetujui (baca-saja hingga ada revisi).
          </p>
        ) : null}
      </div>

      <KpiPortfolioPanel
        title="Portofolio KPI"
        description="Sesuaikan bobot per baris; klik judul KPI untuk melihat ringkasan detail (demo)."
        showViewModeToggle
        allowWeightEdit
        layoutVariant="landing"
        hideTotalsFooter
        showLandingToolbar={false}
        onSelectKpi={(item) => setDetailKpi(item)}
      />

      <KpiPlanningDetailSheet
        kpi={detailKpi}
        onClose={() => setDetailKpi(null)}
        detailVariant="planning"
        showWeightSlider={Boolean(
          detailKpi && !isKpiItemBlockedForPlanningTargetOrWeight(detailKpi)
        )}
        onWeightChange={(pct) => {
          if (!detailKpi) {
            return;
          }
          const own = ownerships.find((o) => o.kpiItemId === detailKpi.id);
          if (own) {
            updateOwnershipWeight(own.id, pct);
          }
        }}
      />

      <AppStickyFooter
        leading={
          <div className="flex min-w-0 items-start gap-2.5 text-left text-sm">
            {planningCheck.ok ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
            ) : (
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
            )}
            <div className="min-w-0">
              <p className={planningCheck.ok ? "font-medium text-success" : "font-medium text-warning"}>
                {planningCheck.ok ? "100% valid · siap ajukan" : "Submit diblokir sampai syarat terpenuhi"}
              </p>
              <p className="text-xs text-muted-foreground">SUBMIT DIBLOKIR JIKA TERDAPAT ITEM ALLOCATED TANPA TARGET FINAL.</p>
            </div>
          </div>
        }
        trailing={
          <>
            <MyKpiPersonaDemoDialogTrigger />
            <Button variant="outline" type="button" asChild>
              <Link to="/performance-v2/my-kpi">Kembali ke portofolio</Link>
            </Button>
            <Button type="button" disabled={!planningCheck.ok} onClick={() => setSubmitDialogOpen(true)}>
              Ajukan sekarang
            </Button>
          </>
        }
      />

      <Dialog open={copyOpen} onOpenChange={setCopyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Salin dari periode sebelumnya</DialogTitle>
            <DialogDescription>
              US-MK-004 — prototipe menambahkan dua KPI contoh dari tahun {prevYear} dengan status ALLOCATED (target perlu dilengkapi) dan bobot awal
              minimal per item. Sumber asli (Kamus / Kustom) dipertahankan pada metadata.
            </DialogDescription>
          </DialogHeader>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>[{prevYear}] Indeks kepuasan pelanggan internal</li>
            <li>[{prevYear}] Efisiensi proses HC digital (progresif)</li>
          </ul>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setCopyOpen(false)}>
              Batal
            </Button>
            <Button
              type="button"
              onClick={() => {
                copyFromPreviousYearMock(actingAsEmployeeNumber);
                setCopyOpen(false);
              }}
            >
              Salin ke portofolio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={libraryOpen} onOpenChange={setLibraryOpen}>
        <SheetContent side="right" presentation="floating" className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Cari dari Kamus KPI</SheetTitle>
            <SheetDescription>
              US-MK-002 — ketik minimal 2 karakter; maksimal 10 hasil; atribut terkunci mengikuti definisi kamus.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4">
            <Field>
              <FieldLabel htmlFor="lib-search-sheet">Cari KPI</FieldLabel>
              <SearchInput
                id="lib-search-sheet"
                placeholder="Minimal 2 karakter…"
                value={libSearch}
                onChange={(e) => setLibSearch(e.target.value)}
                className="w-full max-w-none"
              />
              <FieldDescription>Item yang sudah ada di portofolio tidak dapat ditambahkan lagi dari sini.</FieldDescription>
            </Field>
            {libSearch.trim().length > 0 && libSearch.trim().length < 2 ? (
              <p className="text-sm text-muted-foreground">Lanjutkan mengetik (minimal 2 karakter).</p>
            ) : null}
            <ul className="space-y-2 text-sm">
              {libraryMatches.map((d) => {
                const exists = items.some((i) => i.dictionaryItemId === d.id);
                return (
                  <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border px-3 py-2">
                    <div className="min-w-0">
                      <div className="font-medium">
                        {d.code} — {d.title}
                      </div>
                      <div className="text-muted-foreground">
                        {d.bscPerspective} · terkunci: {d.lockedAttributes.join(", ") || "—"}
                      </div>
                    </div>
                    <Button type="button" size="sm" disabled={exists} onClick={() => addFromLibrary(d.id)}>
                      {exists ? "Sudah ada" : "Tambah ke portofolio"}
                    </Button>
                  </li>
                );
              })}
            </ul>
            {libSearch.trim().length >= 2 && libraryMatches.length === 0 ? (
              <p className="text-sm text-muted-foreground">Tidak ada hasil yang cocok.</p>
            ) : null}
          </div>
          <SheetFooter className="flex-col items-stretch gap-2 border-t border-border pt-4 sm:flex-row sm:justify-between">
            <Button type="button" variant="ghost" size="sm" className="w-full sm:w-auto" asChild>
              <Link to="/performance-v2/kpi-library">Buka Kamus KPI</Link>
            </Button>
            <Button type="button" variant="outline" onClick={() => setLibraryOpen(false)}>
              Tutup
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={customOpen} onOpenChange={setCustomOpen}>
        <SheetContent side="right" presentation="floating" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>KPI kustom (Unit)</SheetTitle>
            <SheetDescription>
              US-MK-003 — hanya untuk KPI Unit. Disarankan mencari Kamus terlebih dahulu; formulir ini membuat sumber CUSTOM dengan target tetap
              tahunan.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4">
            <Field>
              <FieldLabel htmlFor="c-title">Judul KPI</FieldLabel>
              <Input id="c-title" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} placeholder="Contoh: Indeks adopsi portal HC" />
            </Field>
            <Field>
              <FieldLabel htmlFor="c-unit">Satuan target</FieldLabel>
              <Input id="c-unit" value={customUnit} onChange={(e) => setCustomUnit(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="c-target">Nilai target</FieldLabel>
              <Input id="c-target" inputMode="decimal" value={customTarget} onChange={(e) => setCustomTarget(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel>Polaritas</FieldLabel>
              <Select value={customPolarity} onValueChange={(v) => setCustomPolarity(v as Polarity)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POSITIVE">Positif (lebih tinggi lebih baik)</SelectItem>
                  <SelectItem value="NEGATIVE">Negatif (lebih rendah lebih baik)</SelectItem>
                  <SelectItem value="NEUTRAL">Netral</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="c-note">Catatan / definisi (opsional)</FieldLabel>
              <Textarea
                id="c-note"
                placeholder="Rumus atau definisi operasional…"
                rows={3}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
              />
            </Field>
          </div>
          <SheetFooter>
            <Button type="button" variant="outline" onClick={() => setCustomOpen(false)}>
              Batal
            </Button>
            <Button type="button" onClick={saveCustomKpi}>
              Simpan ke portofolio
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ajukan rencana KPI?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin mengajukan rencana KPI untuk review? Item yang memenuhi syarat akan berstatus menunggu persetujuan dan
              terkunci hingga atasan merespons.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={runSubmit}>Ya, ajukan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
