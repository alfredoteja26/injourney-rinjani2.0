import {
  startTransition,
  useDeferredValue,
  useMemo,
} from "react";
import { Link, useSearchParams } from "react-router";
import {
  BarChart,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
  EmptyState,
  MetricCard,
  PageHeading,
  ProgressCluster,
  RankingList,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@rinjani/shared-ui";
import type { DictionaryItemStatus, KpiDictionaryItem } from "../../lib/domain/types";
import { usePerformanceV2 } from "../../lib/store/performance-v2-store";
import { PersonaContextBar } from "../../ui/persona-context-bar";
import {
  DictionaryStatusBadge,
  bandOptions,
  bscPerspectiveOptions,
  formatDateTime,
  functionOptions,
  getBscLabel,
  getCapTypeLabel,
  getLatestDictionaryApproval,
  getLatestDictionaryValidation,
  getLockedAttributeLabel,
  getMonitoringLabel,
  getPolarityLabel,
  getSourceModuleLabel,
} from "./kpi-library-shared";

type LibraryTab = "catalog" | "validation" | "approval" | "analytics";
type CatalogView = "card" | "list";

const CATALOG_PAGE_SIZE = 6;
const libraryTabs: LibraryTab[] = ["catalog", "validation", "approval", "analytics"];
const catalogViews: CatalogView[] = ["card", "list"];

function isLibraryTab(value: string | null): value is LibraryTab {
  return value != null && libraryTabs.includes(value as LibraryTab);
}

function isCatalogView(value: string | null): value is CatalogView {
  return value != null && catalogViews.includes(value as CatalogView);
}

function metricPercent(numerator: number, denominator: number) {
  if (denominator === 0) {
    return 0;
  }
  return Math.round((numerator / denominator) * 100);
}

function QueueActionLinks({
  itemId,
  mode,
}: {
  itemId: string;
  mode: "browse" | "validate" | "approve";
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" asChild>
        <Link to={`/performance-v2/kpi-library/${itemId}?mode=${mode}`}>Buka halaman</Link>
      </Button>
      <Button size="sm" asChild>
        <Link to={`/performance-v2/kpi-library?item=${itemId}&panel=${mode}`}>Quick view</Link>
      </Button>
    </div>
  );
}

export function KpiLibraryScreen() {
  const { state, getEmployeeDisplay } = usePerformanceV2();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = isLibraryTab(searchParams.get("tab")) ? searchParams.get("tab") : "catalog";
  const view = isCatalogView(searchParams.get("view")) ? searchParams.get("view") : "card";
  const search = searchParams.get("q") ?? "";
  const deferredSearch = useDeferredValue(search);
  const perspective = searchParams.get("bsc") ?? "ALL";
  const kpiType = searchParams.get("kpiType") ?? "ALL";
  const selectedFunction = searchParams.get("function") ?? "ALL";
  const band = searchParams.get("band") ?? "ALL";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const selectedId = searchParams.get("item");
  const panelMode = searchParams.get("panel") ?? "browse";

  function patchSearchParams(patch: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(patch)) {
      if (value == null || value === "" || value === "ALL") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    startTransition(() => setSearchParams(next));
  }

  const catalogItems = useMemo(() => {
    return state.dictionaryItems
      .filter((item) => item.status === "PUBLISHED" || item.status === "DEPRECATED")
      .filter((item) => {
        const haystack = `${item.id} ${item.code} ${item.title} ${item.description ?? ""}`.toLowerCase();
        const searchOk = deferredSearch.trim().length === 0 || haystack.includes(deferredSearch.trim().toLowerCase());
        const perspectiveOk = perspective === "ALL" || item.bscPerspective === perspective;
        const kpiTypeOk = kpiType === "ALL" || item.kpiType === kpiType;
        const functionOk =
          selectedFunction === "ALL" ||
          item.applicableFunctions?.some((functionName) => functionName === selectedFunction);
        const bandOk = band === "ALL" || item.applicableBandJabatan?.some((entry) => entry === band);
        return searchOk && perspectiveOk && kpiTypeOk && functionOk && bandOk;
      })
      .sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === "PUBLISHED" ? -1 : 1;
        }
        return b.usageCount - a.usageCount;
      });
  }, [band, deferredSearch, kpiType, perspective, selectedFunction, state.dictionaryItems]);

  const pagedCatalogItems = useMemo(() => {
    const startIndex = (page - 1) * CATALOG_PAGE_SIZE;
    return catalogItems.slice(startIndex, startIndex + CATALOG_PAGE_SIZE);
  }, [catalogItems, page]);

  const validationItems = useMemo(
    () =>
      state.dictionaryItems
        .filter((item) => item.status === "PENDING_VALIDATION" || (item.status === "DRAFT" && item.submittedBy))
        .sort((a, b) => `${b.createdAt ?? ""}`.localeCompare(a.createdAt ?? "")),
    [state.dictionaryItems],
  );

  const approvalItems = useMemo(
    () =>
      state.dictionaryItems
        .filter((item) => item.status === "VALIDATED" || item.status === "PENDING_APPROVAL" || item.status === "PUBLISHED" || item.status === "DEPRECATED")
        .sort((a, b) => `${b.publishedAt ?? b.createdAt ?? ""}`.localeCompare(a.publishedAt ?? a.createdAt ?? "")),
    [state.dictionaryItems],
  );

  const analytics = useMemo(() => {
    const total = state.dictionaryItems.length;
    const published = state.dictionaryItems.filter((item) => item.status === "PUBLISHED");
    const deprecated = state.dictionaryItems.filter((item) => item.status === "DEPRECATED");
    const queued = state.dictionaryItems.filter((item) => item.status === "PENDING_VALIDATION" || item.status === "VALIDATED" || item.status === "PENDING_APPROVAL");
    const adopted = state.dictionaryUsageRecords.filter((record) => record.status === "ACTIVE");
    const adoptionByPerspective = bscPerspectiveOptions.map((option) => ({
      label: option.label,
      value: published.filter((item) => item.bscPerspective === option.value).length * 15,
      detail: `${published.filter((item) => item.bscPerspective === option.value).length} item`,
    }));
    const topUsed = [...published]
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5)
      .map((item) => ({
        label: item.title,
        description: `${item.code} · ${getBscLabel(item.bscPerspective)}`,
        value: `${item.usageCount} pemakaian`,
      }));
    const progressItems = [
      {
        label: "Published",
        value: metricPercent(published.length, total),
        description: `${published.length} dari ${total} item aktif di katalog`,
        variant: "success" as const,
      },
      {
        label: "Queue governance",
        value: metricPercent(queued.length, total),
        description: `${queued.length} item sedang divalidasi atau menunggu keputusan`,
        variant: "warning" as const,
      },
      {
        label: "Deprecated",
        value: metricPercent(deprecated.length, total),
        description: `${deprecated.length} item sudah tidak direkomendasikan`,
        variant: "destructive" as const,
      },
    ];
    return {
      total,
      published,
      deprecated,
      queued,
      adopted,
      adoptionByPerspective,
      topUsed,
      progressItems,
    };
  }, [getEmployeeDisplay, state.dictionaryItems, state.dictionaryUsageRecords]);

  const selectedItem = selectedId ? state.dictionaryItems.find((item) => item.id === selectedId) ?? null : null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <PageHeading
        eyebrow="Performance 2.0"
        title="Kamus KPI"
        description="Kelola katalog KPI standar, queue validasi, governance publish, dan insight pemakaian dalam satu workspace."
      />
      <PersonaContextBar />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Item published"
            value={analytics.published.length}
            description="KPI standar siap dipakai ke planning."
            trend={`${metricPercent(analytics.published.length, analytics.total)}%`}
            trendTone="success"
          />
          <MetricCard
            label="Queue governance"
            value={analytics.queued.length}
            description="Menunggu validasi atau keputusan publish."
            trend={`${validationItems.length} validasi`}
            trendTone="warning"
          />
          <MetricCard
            label="Adopsi aktif"
            value={analytics.adopted.length}
            description="Relasi aktif dari Kamus KPI ke portfolio karyawan."
            trend={`${analytics.published.reduce((sum, item) => sum + item.usageCount, 0)} total usage`}
          />
          <MetricCard
            label="Item deprecated"
            value={analytics.deprecated.length}
            description="Masih tampil untuk histori, tidak direkomendasikan untuk planning baru."
            trend={analytics.deprecated.length > 0 ? "Perlu cleanup" : "Terkendali"}
            trendTone={analytics.deprecated.length > 0 ? "destructive" : "success"}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aksi cepat</CardTitle>
            <CardDescription>Pakai deep link agar demo lebih mudah berpindah konteks.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild>
              <Link to="/performance-v2/my-kpi/planning?open=library-import">Gunakan di My KPI</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/performance-v2/kpi-library/submit?source=DIRECT">Ajukan item baru</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/performance-v2/kpi-library?tab=validation">Buka validation queue</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/performance-v2/kpi-library?tab=approval">Buka governance publish</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={(value) => patchSearchParams({ tab: value, page: "1", item: null, panel: null })}>
        <TabsList>
          <TabsTrigger value="catalog">Katalog</TabsTrigger>
          <TabsTrigger value="validation">Validasi</TabsTrigger>
          <TabsTrigger value="approval">Approval</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Browser katalog</CardTitle>
              <CardDescription>
                Cari item published, bandingkan atribut yang dikunci, dan buka quick detail tanpa keluar dari halaman.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
                <SearchInput
                  value={search}
                  onChange={(event) => patchSearchParams({ q: event.target.value, page: "1" })}
                  placeholder="Cari kode, judul, atau kata kunci"
                  aria-label="Cari item kamus KPI"
                />
                <Select value={perspective} onValueChange={(value) => patchSearchParams({ bsc: value, page: "1" })}>
                  <SelectTrigger aria-label="Filter perspektif BSC">
                    <SelectValue placeholder="Semua perspektif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua perspektif</SelectItem>
                    {bscPerspectiveOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={kpiType} onValueChange={(value) => patchSearchParams({ kpiType: value, page: "1" })}>
                  <SelectTrigger aria-label="Filter jenis KPI">
                    <SelectValue placeholder="Semua jenis KPI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua jenis KPI</SelectItem>
                    <SelectItem value="UNIT">KPI Unit</SelectItem>
                    <SelectItem value="BERSAMA">KPI Bersama</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedFunction} onValueChange={(value) => patchSearchParams({ function: value, page: "1" })}>
                  <SelectTrigger aria-label="Filter fungsi">
                    <SelectValue placeholder="Semua fungsi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua fungsi</SelectItem>
                    {functionOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={band} onValueChange={(value) => patchSearchParams({ band: value, page: "1" })}>
                  <SelectTrigger aria-label="Filter band jabatan">
                    <SelectValue placeholder="Semua band" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua band</SelectItem>
                    {bandOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Menampilkan <span className="font-medium text-foreground">{pagedCatalogItems.length}</span> dari{" "}
                  <span className="font-medium text-foreground">{catalogItems.length}</span> item.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={view === "card" ? "default" : "outline"}
                    type="button"
                    onClick={() => patchSearchParams({ view: "card" })}
                  >
                    View kartu
                  </Button>
                  <Button
                    size="sm"
                    variant={view === "list" ? "default" : "outline"}
                    type="button"
                    onClick={() => patchSearchParams({ view: "list" })}
                  >
                    View daftar
                  </Button>
                </div>
              </div>

              {pagedCatalogItems.length === 0 ? (
                <EmptyState
                  title="Tidak ada item yang cocok"
                  description="Ubah kombinasi filter atau hapus kata kunci pencarian untuk melihat lebih banyak item."
                  action={
                    <Button type="button" variant="outline" onClick={() => patchSearchParams({ q: null, bsc: null, kpiType: null, function: null, band: null, page: "1" })}>
                      Reset filter
                    </Button>
                  }
                />
              ) : view === "card" ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {pagedCatalogItems.map((item) => (
                    <Card key={item.id} className="gap-0">
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {item.code} · {getBscLabel(item.bscPerspective)}
                            </CardDescription>
                          </div>
                          <DictionaryStatusBadge status={item.status} />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        <div className="grid gap-2 text-muted-foreground">
                          <div>Monitoring: {getMonitoringLabel(item.monitoringPeriod)}</div>
                          <div>Cap: {getCapTypeLabel(item.capType)}</div>
                          <div>Penggunaan aktif: {item.usageCount}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(item.lockedAttributes.length > 0 ? item.lockedAttributes : ["title"]).slice(0, 3).map((locked) => (
                            <span key={locked} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                              {getLockedAttributeLabel(locked)}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" type="button" onClick={() => patchSearchParams({ item: item.id, panel: "browse" })}>
                            Quick view
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/performance-v2/kpi-library/${item.id}`}>Halaman detail</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Monitoring</TableHead>
                          <TableHead>Penggunaan</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pagedCatalogItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="font-medium text-foreground">{item.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.id} · {item.code} · {getBscLabel(item.bscPerspective)}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DictionaryStatusBadge status={item.status} />
                            </TableCell>
                            <TableCell>{getMonitoringLabel(item.monitoringPeriod)}</TableCell>
                            <TableCell>{item.usageCount}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-2">
                                <Button size="sm" variant="outline" type="button" onClick={() => patchSearchParams({ item: item.id, panel: "browse" })}>
                                  Quick view
                                </Button>
                                <Button size="sm" asChild>
                                  <Link to={`/performance-v2/kpi-library/${item.id}`}>Detail</Link>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Halaman {page} dari {Math.max(1, Math.ceil(catalogItems.length / CATALOG_PAGE_SIZE))}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" type="button" disabled={page <= 1} onClick={() => patchSearchParams({ page: String(page - 1) })}>
                    Sebelumnya
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    disabled={page >= Math.ceil(catalogItems.length / CATALOG_PAGE_SIZE)}
                    onClick={() => patchSearchParams({ page: String(page + 1) })}
                  >
                    Berikutnya
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Validation queue</CardTitle>
              <CardDescription>Item baru dikumpulkan di sini untuk cek duplikasi, kelengkapan definisi, dan sumber pengajuan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {validationItems.length === 0 ? (
                <EmptyState title="Tidak ada item menunggu validasi" description="Semua pengajuan saat ini sudah diproses atau belum ada item baru." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pengajuan</TableHead>
                      <TableHead>Sumber</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Validator terakhir</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validationItems.map((item) => {
                      const lastValidation = getLatestDictionaryValidation(item.id, state.dictionaryValidationRecords);
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.id} · {item.code} · diajukan {item.submittedBy ? getEmployeeDisplay(item.submittedBy) : "tanpa submitter"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{getSourceModuleLabel(item.sourceModule)}</TableCell>
                          <TableCell>
                            <DictionaryStatusBadge status={item.status} />
                          </TableCell>
                          <TableCell>
                            {lastValidation ? (
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <p>{getEmployeeDisplay(lastValidation.validatorId)}</p>
                                <p>{formatDateTime(lastValidation.createdAt)}</p>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">Belum ada review</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <QueueActionLinks itemId={item.id} mode="validate" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Siap publish" value={approvalItems.filter((item) => item.status === "VALIDATED").length} description="Sudah lolos validasi dan menunggu keputusan governance." />
            <MetricCard label="Published aktif" value={approvalItems.filter((item) => item.status === "PUBLISHED").length} description="Sudah dapat digunakan di planning dan tree." />
            <MetricCard label="Lifecycle follow-up" value={approvalItems.filter((item) => item.status === "DEPRECATED").length} description="Item deprecated yang masih perlu cleanup pemakaian." trendTone="destructive" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Governance publish</CardTitle>
              <CardDescription>Review konfigurasi attribute lock, cap, fixed weight, dan keputusan publish atau rollback.</CardDescription>
            </CardHeader>
            <CardContent>
              {approvalItems.length === 0 ? (
                <EmptyState title="Belum ada item governance" description="Item akan muncul di sini setelah lolos validasi atau sudah published." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Governance terakhir</TableHead>
                      <TableHead>Locked attrs</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalItems.map((item) => {
                      const lastApproval = getLatestDictionaryApproval(item.id, state.dictionaryApprovalRecords);
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.id} · {item.code} · {getBscLabel(item.bscPerspective)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DictionaryStatusBadge status={item.status} />
                          </TableCell>
                          <TableCell>
                            {lastApproval ? (
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <p>{lastApproval.action}</p>
                                <p>{formatDateTime(lastApproval.createdAt)}</p>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">Belum ada approval record</span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-52">
                            <div className="flex flex-wrap gap-1">
                              {(lastApproval?.configuredLockedAttributes.length ? lastApproval.configuredLockedAttributes : item.lockedAttributes).slice(0, 3).map((locked) => (
                                <span key={locked} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                                  {getLockedAttributeLabel(locked)}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <QueueActionLinks itemId={item.id} mode="approve" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <ChartContainer
              title="Distribusi published by BSC"
              description="Membantu mengecek apakah katalog terlalu berat di satu perspektif."
            >
              <BarChart data={analytics.adoptionByPerspective} yAxisLabel="Jumlah item (scaled)" xAxisLabel="Perspektif BSC" />
            </ChartContainer>
            <ProgressCluster items={analytics.progressItems} />
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <ChartContainer title="Top used items" description="Item paling sering dipakai di planning aktif.">
              <RankingList items={analytics.topUsed} />
            </ChartContainer>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Governance insight</CardTitle>
                <CardDescription>Ringkasan cepat untuk sesi demo dan review backlog.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="font-medium text-foreground">Queue validasi</p>
                  <p className="mt-1 text-muted-foreground">
                    {validationItems.length} item masih menunggu verifikasi definisi atau cek duplikasi.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="font-medium text-foreground">Approval governance</p>
                  <p className="mt-1 text-muted-foreground">
                    {approvalItems.filter((item) => item.status === "VALIDATED").length} item siap diputuskan untuk publish atau dikembalikan.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="font-medium text-foreground">Pemakaian historis</p>
                  <p className="mt-1 text-muted-foreground">
                    {state.dictionaryUsageRecords.filter((record) => record.status === "HISTORICAL").length} relasi historis tersimpan untuk audit jejak penggunaan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Sheet open={Boolean(selectedItem)} onOpenChange={(open) => !open && patchSearchParams({ item: null, panel: null })}>
        <SheetContent side="right" presentation="floating" className="flex w-full flex-col gap-4 sm:max-w-xl">
          {selectedItem ? (
            <>
              <SheetHeader>
                <SheetTitle>{selectedItem.title}</SheetTitle>
                <SheetDescription>
                  {selectedItem.id} · {selectedItem.code} · panel mode {panelMode}
                </SheetDescription>
              </SheetHeader>
              <DescriptionList>
                <DescriptionListItem>
                  <DescriptionTerm>Status</DescriptionTerm>
                  <DescriptionDetails>
                    <DictionaryStatusBadge status={selectedItem.status} />
                  </DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Perspektif</DescriptionTerm>
                  <DescriptionDetails>{getBscLabel(selectedItem.bscPerspective)}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Monitoring</DescriptionTerm>
                  <DescriptionDetails>{getMonitoringLabel(selectedItem.monitoringPeriod)}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Cap</DescriptionTerm>
                  <DescriptionDetails>{getCapTypeLabel(selectedItem.capType)}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Polaritas</DescriptionTerm>
                  <DescriptionDetails>{getPolarityLabel(selectedItem.polarity)}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Penggunaan</DescriptionTerm>
                  <DescriptionDetails>{selectedItem.usageCount} portfolio aktif</DescriptionDetails>
                </DescriptionListItem>
              </DescriptionList>
              <Separator />
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Locked attributes</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.lockedAttributes.length > 0 ? (
                    selectedItem.lockedAttributes.map((locked) => (
                      <span key={locked} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {getLockedAttributeLabel(locked)}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Belum ada attribute lock default.</span>
                  )}
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <Button variant="outline" asChild>
                  <Link to={`/performance-v2/kpi-library/${selectedItem.id}?mode=${panelMode}`}>Buka halaman penuh</Link>
                </Button>
                <Button asChild>
                  <Link to={`/performance-v2/my-kpi/planning?dictionaryItemId=${selectedItem.id}&open=library-import`}>Gunakan di planning</Link>
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
