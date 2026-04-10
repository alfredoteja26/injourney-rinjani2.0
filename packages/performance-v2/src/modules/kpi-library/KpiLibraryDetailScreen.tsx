import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
  EmptyState,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  MetricCard,
  PageHeading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  toast,
} from "@rinjani/shared-ui";
import type {
  CapType,
  DictionaryApprovalRecord,
  DictionaryLockedAttribute,
  DictionaryValidationRecord,
} from "../../lib/domain/types";
import { usePerformanceV2 } from "../../lib/store/performance-v2-store";
import { PersonaContextBar } from "../../ui/persona-context-bar";
import {
  DictionaryStatusBadge,
  capTypeOptions,
  dictionaryLockedAttributeOptions,
  formatDateTime,
  getBscLabel,
  getCapTypeLabel,
  getLatestDictionaryApproval,
  getLatestDictionaryValidation,
  getLockedAttributeLabel,
  getMonitoringLabel,
  getPolarityLabel,
  getSourceModuleLabel,
} from "./kpi-library-shared";

type DetailMode = "browse" | "validate" | "approve";

function isDetailMode(value: string | null): value is DetailMode {
  return value === "browse" || value === "validate" || value === "approve";
}

export function KpiLibraryDetailScreen() {
  const { kpiId } = useParams<{ kpiId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state,
    actingAsEmployeeNumber,
    getEmployeeDisplay,
    publishDictionaryItem,
    reviewDictionaryApproval,
    userRole,
    validateDictionaryItem,
  } = usePerformanceV2();
  const item = state.dictionaryItems.find((entry) => entry.id === kpiId);

  const mode = isDetailMode(searchParams.get("mode")) ? searchParams.get("mode") : "browse";
  const latestValidation = item ? getLatestDictionaryValidation(item.id, state.dictionaryValidationRecords) : undefined;
  const latestApproval = item ? getLatestDictionaryApproval(item.id, state.dictionaryApprovalRecords) : undefined;
  const usageRows = useMemo(
    () => state.dictionaryUsageRecords.filter((record) => record.dictionaryItemId === item?.id),
    [item?.id, state.dictionaryUsageRecords],
  );
  const validationHistory = useMemo(
    () =>
      state.dictionaryValidationRecords
        .filter((record) => record.dictionaryItemId === item?.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [item?.id, state.dictionaryValidationRecords],
  );
  const approvalHistory = useMemo(
    () =>
      state.dictionaryApprovalRecords
        .filter((record) => record.dictionaryItemId === item?.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [item?.id, state.dictionaryApprovalRecords],
  );

  const [reviewNotes, setReviewNotes] = useState("");
  const [governanceCapType, setGovernanceCapType] = useState<CapType>("NO_CAP");
  const [governanceFixedWeight, setGovernanceFixedWeight] = useState("");
  const [lockedAttributes, setLockedAttributes] = useState<DictionaryLockedAttribute[]>([]);

  useEffect(() => {
    if (!item) {
      return;
    }
    setReviewNotes("");
    setGovernanceCapType(latestApproval?.configuredCapType ?? item.capType);
    setGovernanceFixedWeight(latestApproval?.configuredFixedWeight != null ? String(latestApproval.configuredFixedWeight) : item.fixedWeight != null ? String(item.fixedWeight) : "");
    setLockedAttributes(latestApproval?.configuredLockedAttributes.length ? latestApproval.configuredLockedAttributes : item.lockedAttributes);
  }, [item, latestApproval]);

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <EmptyState
          title="Item Kamus KPI tidak ditemukan"
          description="Periksa kembali tautan yang dibuka atau kembali ke katalog untuk memilih item lain."
          action={
            <Button variant="outline" asChild>
              <Link to="/performance-v2/kpi-library">Kembali ke Kamus KPI</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const canValidate = userRole === "Admin" && item.status === "PENDING_VALIDATION";
  const canApprove = userRole === "Admin" && (item.status === "VALIDATED" || item.status === "PENDING_APPROVAL");
  const canDeprecate = userRole === "Admin" && item.status === "PUBLISHED";

  const similarItemWarning = state.dictionaryItems
    .filter((entry) => entry.id !== item.id && entry.status !== "DEPRECATED")
    .filter((entry) => {
      const titleA = entry.title.toLowerCase();
      const titleB = item.title.toLowerCase();
      return titleA.includes(titleB.slice(0, Math.max(6, Math.floor(titleB.length / 2)))) || titleB.includes(titleA.slice(0, Math.max(6, Math.floor(titleA.length / 2))));
    })
    .map((entry) => entry.id)
    .slice(0, 3);

  function setMode(nextMode: DetailMode) {
    const next = new URLSearchParams(searchParams);
    next.set("mode", nextMode);
    setSearchParams(next);
  }

  function toggleLockedAttribute(attribute: DictionaryLockedAttribute, checked: boolean) {
    setLockedAttributes((current) => {
      if (checked) {
        return Array.from(new Set([...current, attribute]));
      }
      return current.filter((entry) => entry !== attribute);
    });
  }

  function buildValidationRecord(action: DictionaryValidationRecord["action"]) {
    return {
      id: `DVR-${Date.now()}`,
      dictionaryItemId: item.id,
      validatorId: actingAsEmployeeNumber,
      action,
      notes: reviewNotes.trim() || (action === "ACCEPT" ? "Lolos validasi." : "Perlu revisi definisi."),
      similarItemWarning,
      createdAt: new Date().toISOString(),
    } satisfies DictionaryValidationRecord;
  }

  function buildApprovalRecord(action: DictionaryApprovalRecord["action"]) {
    return {
      id: `DAR-${Date.now()}`,
      dictionaryItemId: item.id,
      approverId: actingAsEmployeeNumber,
      action,
      notes: reviewNotes.trim() || "Governance review selesai.",
      configuredLockedAttributes: lockedAttributes,
      configuredCapType: governanceCapType,
      configuredFixedWeight: governanceFixedWeight.trim() === "" ? null : Number(governanceFixedWeight),
      createdAt: new Date().toISOString(),
    } satisfies DictionaryApprovalRecord;
  }

  function handleValidationAccept() {
    validateDictionaryItem(buildValidationRecord("ACCEPT"), "VALIDATED");
    toast.success("Item dipindahkan ke governance publish.");
    setMode("approve");
  }

  function handleValidationReject() {
    validateDictionaryItem(buildValidationRecord("REJECT"), "DRAFT");
    toast.success("Item dikembalikan ke draft untuk revisi.");
    setMode("browse");
  }

  function handleApprovalPublish() {
    reviewDictionaryApproval(buildApprovalRecord("PUBLISH"), "PUBLISHED");
    toast.success("Item diterbitkan ke katalog Kamus KPI.");
  }

  function handleApprovalSendBack() {
    reviewDictionaryApproval(buildApprovalRecord("SEND_BACK_TO_VALIDATION"), "PENDING_VALIDATION");
    toast.success("Item dikembalikan ke validation queue.");
    setMode("validate");
  }

  function handleApprovalReject() {
    reviewDictionaryApproval(buildApprovalRecord("REJECT"), "DRAFT");
    toast.success("Item ditandai draft untuk revisi lanjutan.");
    setMode("browse");
  }

  function handleDeprecate() {
    // Shared approval contract belum punya action enum khusus "DEPRECATE".
    reviewDictionaryApproval(buildApprovalRecord("PUBLISH"), "DEPRECATED");
    toast.success("Item ditandai deprecated.");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <PageHeading
        eyebrow="Performance 2.0"
        title="Detail Kamus KPI"
        description="Review metadata, jejak usage, dan keputusan governance untuk satu item KPI."
      />
      <PersonaContextBar />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Button variant={mode === "browse" ? "default" : "outline"} type="button" onClick={() => setMode("browse")}>
            Overview
          </Button>
          <Button
            variant={mode === "validate" ? "default" : "outline"}
            type="button"
            onClick={() => setMode("validate")}
            disabled={!canValidate && mode !== "validate"}
          >
            Validasi
          </Button>
          <Button
            variant={mode === "approve" ? "default" : "outline"}
            type="button"
            onClick={() => setMode("approve")}
            disabled={!(canApprove || canDeprecate) && mode !== "approve"}
          >
            Governance
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to={`/performance-v2/my-kpi/planning?dictionaryItemId=${item.id}&open=library-import`}>Gunakan di planning</Link>
          </Button>
          {item.status === "VALIDATED" && userRole === "Admin" ? (
            <Button type="button" variant="secondary" onClick={() => publishDictionaryItem(item.id)}>
              Publish cepat
            </Button>
          ) : null}
          <Button variant="outline" asChild>
            <Link to="/performance-v2/kpi-library">Kembali ke katalog</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>
                    {item.id} · {item.code} · {getBscLabel(item.bscPerspective)}
                  </CardDescription>
                </div>
                <DictionaryStatusBadge status={item.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <DescriptionList>
                <DescriptionListItem>
                  <DescriptionTerm>Satuan target</DescriptionTerm>
                  <DescriptionDetails>{item.targetUnit}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Polaritas</DescriptionTerm>
                  <DescriptionDetails>{getPolarityLabel(item.polarity)}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Monitoring</DescriptionTerm>
                  <DescriptionDetails>{getMonitoringLabel(item.monitoringPeriod)}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Cap realisasi</DescriptionTerm>
                  <DescriptionDetails>{getCapTypeLabel(item.capType)}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Submitted from</DescriptionTerm>
                  <DescriptionDetails>{getSourceModuleLabel(item.sourceModule)}</DescriptionDetails>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionTerm>Usage aktif</DescriptionTerm>
                  <DescriptionDetails>{item.usageCount} portfolio</DescriptionDetails>
                </DescriptionListItem>
              </DescriptionList>
              {item.description ? (
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm leading-6 text-foreground">{item.description}</p>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {item.lockedAttributes.length > 0 ? (
                  item.lockedAttributes.map((locked) => (
                    <span key={locked} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {getLockedAttributeLabel(locked)}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Belum ada attribute lock default.</span>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Usage aktif" value={usageRows.filter((row) => row.status === "ACTIVE").length} description="Relasi aktif ke KPI portfolio." />
            <MetricCard label="Riwayat validasi" value={validationHistory.length} description="Jejak review validator." />
            <MetricCard label="Riwayat approval" value={approvalHistory.length} description="Jejak keputusan governance." />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Jejak pemakaian</CardTitle>
              <CardDescription>Referensi siapa saja yang memakai item ini di mock portfolio saat ini.</CardDescription>
            </CardHeader>
            <CardContent>
              {usageRows.length === 0 ? (
                <EmptyState title="Belum ada usage" description="Item ini belum dipakai di KPI planning aktif maupun historis." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Karyawan</TableHead>
                      <TableHead>KPI item</TableHead>
                      <TableHead>Tahun</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{getEmployeeDisplay(row.employeeNumber)}</TableCell>
                        <TableCell>{row.kpiItemId}</TableCell>
                        <TableCell>{row.year}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat validasi</CardTitle>
                <CardDescription>Latest validation: {latestValidation ? formatDateTime(latestValidation.createdAt) : "belum ada"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {validationHistory.length === 0 ? (
                  <p className="text-muted-foreground">Belum ada validation record.</p>
                ) : (
                  validationHistory.map((record) => (
                    <div key={record.id} className="rounded-lg border border-border p-3">
                      <p className="font-medium text-foreground">
                        {record.action} · {getEmployeeDisplay(record.validatorId)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(record.createdAt)}</p>
                      <p className="mt-2 text-muted-foreground">{record.notes}</p>
                      {record.similarItemWarning?.length ? (
                        <p className="mt-2 text-xs text-warning">Similar item warning: {record.similarItemWarning.join(", ")}</p>
                      ) : null}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Riwayat approval</CardTitle>
                <CardDescription>Latest governance: {latestApproval ? formatDateTime(latestApproval.createdAt) : "belum ada"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {approvalHistory.length === 0 ? (
                  <p className="text-muted-foreground">Belum ada approval record.</p>
                ) : (
                  approvalHistory.map((record) => (
                    <div key={record.id} className="rounded-lg border border-border p-3">
                      <p className="font-medium text-foreground">
                        {record.action} · {getEmployeeDisplay(record.approverId)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(record.createdAt)}</p>
                      <p className="mt-2 text-muted-foreground">{record.notes}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Locked attrs: {record.configuredLockedAttributes.length ? record.configuredLockedAttributes.map(getLockedAttributeLabel).join(", ") : "tidak diatur"}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Governance controls</CardTitle>
              <CardDescription>
                {mode === "validate"
                  ? "Mode validasi aktif."
                  : mode === "approve"
                    ? "Mode governance publish aktif."
                    : "Pilih mode validasi atau governance untuk memproses item."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field>
                <FieldLabel htmlFor="review-notes">Catatan review</FieldLabel>
                <Textarea
                  id="review-notes"
                  rows={5}
                  value={reviewNotes}
                  onChange={(event) => setReviewNotes(event.target.value)}
                  placeholder="Tulis alasan, catatan governance, atau instruksi revisi."
                />
                <FieldDescription>Catatan ini dipakai untuk validation record maupun approval record.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="governance-cap">Cap governance</FieldLabel>
                <Select value={governanceCapType} onValueChange={(value) => setGovernanceCapType(value as CapType)}>
                  <SelectTrigger id="governance-cap" aria-label="Pilih cap governance">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {capTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="fixed-weight">Fixed weight</FieldLabel>
                <Input
                  id="fixed-weight"
                  value={governanceFixedWeight}
                  onChange={(event) => setGovernanceFixedWeight(event.target.value)}
                  inputMode="decimal"
                  placeholder="Opsional, mis. 10"
                />
              </Field>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Locked attributes</p>
                <div className="grid gap-2">
                  {dictionaryLockedAttributeOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
                      <Checkbox
                        checked={lockedAttributes.includes(option.value)}
                        onCheckedChange={(checked) => toggleLockedAttribute(option.value, checked === true)}
                        aria-label={`Kunci atribut ${option.label}`}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" disabled={!canValidate} onClick={handleValidationReject}>
                  Tolak validasi
                </Button>
                <Button type="button" disabled={!canValidate} onClick={handleValidationAccept}>
                  Loloskan ke governance
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" disabled={!canApprove} onClick={handleApprovalSendBack}>
                  Kembalikan ke validasi
                </Button>
                <Button type="button" variant="outline" disabled={!canApprove} onClick={handleApprovalReject}>
                  Tolak publish
                </Button>
                <Button type="button" disabled={!canApprove} onClick={handleApprovalPublish}>
                  Publish item
                </Button>
              </div>

              {canDeprecate ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-center">
                      Deprecate item
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deprecate item ini?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Item published akan tetap tampil untuk histori, tetapi tidak direkomendasikan untuk planning baru.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeprecate}>Ya, deprecate</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : null}

              {similarItemWarning.length > 0 ? (
                <div className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm">
                  <p className="font-medium text-foreground">Similar item warning</p>
                  <p className="mt-1 text-muted-foreground">Kandidat item serupa: {similarItemWarning.join(", ")}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
