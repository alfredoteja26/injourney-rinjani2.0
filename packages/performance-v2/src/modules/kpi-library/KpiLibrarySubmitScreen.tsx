import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  PageHeading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  toast,
} from "@rinjani/shared-ui";
import type { BandJabatanSemantic, CapType, BscPerspective, DictionarySourceModule, MonitoringPeriod, Polarity } from "../../lib/domain/types";
import { usePerformanceV2 } from "../../lib/store/performance-v2-store";
import { PersonaContextBar } from "../../ui/persona-context-bar";
import {
  bandOptions,
  bscPerspectiveOptions,
  buildDictionaryCode,
  capTypeOptions,
  dictionarySourceOptions,
  functionOptions,
  monitoringPeriodOptions,
  nextDictionaryId,
  polarityOptions,
} from "./kpi-library-shared";

function isSourceModule(value: string | null): value is DictionarySourceModule {
  return value === "DIRECT" || value === "MY_PERFORMANCE" || value === "MY_TEAM_PERFORMANCE" || value === "PERFORMANCE_TREE";
}

export function KpiLibrarySubmitScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { actingAsEmployeeNumber, state, submitDictionaryItem } = usePerformanceV2();

  const sourceModule = isSourceModule(searchParams.get("source")) ? searchParams.get("source") : "DIRECT";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bscPerspective, setBscPerspective] = useState<BscPerspective>("INTERNAL_PROCESS");
  const [targetUnit, setTargetUnit] = useState("%");
  const [polarity, setPolarity] = useState<Polarity>("POSITIVE");
  const [monitoringPeriod, setMonitoringPeriod] = useState<MonitoringPeriod>("QUARTERLY");
  const [capType, setCapType] = useState<CapType>("NO_CAP");
  const [fixedWeight, setFixedWeight] = useState("");
  const [formula, setFormula] = useState("");
  const [evidenceRequirement, setEvidenceRequirement] = useState("");
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [selectedBands, setSelectedBands] = useState<BandJabatanSemantic[]>([]);

  const suggestedCode = useMemo(() => buildDictionaryCode(title, bscPerspective), [bscPerspective, title]);

  function toggleFunction(option: string, checked: boolean) {
    setSelectedFunctions((current) => {
      if (checked) {
        return Array.from(new Set([...current, option]));
      }
      return current.filter((entry) => entry !== option);
    });
  }

  function toggleBand(option: BandJabatanSemantic, checked: boolean) {
    setSelectedBands((current) => {
      if (checked) {
        return Array.from(new Set([...current, option]));
      }
      return current.filter((entry) => entry !== option);
    });
  }

  function handleSubmit() {
    if (title.trim().length < 6) {
      toast.error("Judul KPI minimal 6 karakter.");
      return;
    }

    const id = nextDictionaryId(state.dictionaryItems);

    submitDictionaryItem({
      id,
      code: `${suggestedCode}-${String(state.dictionaryItems.length + 1).padStart(3, "0")}`,
      title: title.trim(),
      description: description.trim() || undefined,
      kpiType: "UNIT",
      bscPerspective,
      targetUnit: targetUnit.trim(),
      polarity,
      monitoringPeriod,
      capType,
      fixedWeight: fixedWeight.trim() === "" ? null : Number(fixedWeight),
      formula: formula.trim() || undefined,
      evidenceRequirement: evidenceRequirement.trim() || undefined,
      lockedAttributes: [],
      applicableFunctions: selectedFunctions,
      applicableBandJabatan: selectedBands,
      status: "PENDING_VALIDATION",
      usageCount: 0,
      submittedBy: actingAsEmployeeNumber,
      sourceModule,
      createdAt: new Date().toISOString(),
    });

    toast.success("Pengajuan item baru masuk ke validation queue.");
    navigate(`/performance-v2/kpi-library/${id}?mode=validate`);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <PageHeading
        eyebrow="Performance 2.0"
        title="Ajukan item Kamus KPI"
        description="Form pengajuan definisi KPI baru dengan metadata yang cukup untuk validation queue dan governance publish."
      />
      <PersonaContextBar />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Form pengajuan</CardTitle>
            <CardDescription>
              Source module: {dictionarySourceOptions.find((option) => option.value === sourceModule)?.label ?? sourceModule}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <FieldGroup className="grid gap-4 md:grid-cols-2">
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="dictionary-title">Judul KPI</FieldLabel>
                <Input
                  id="dictionary-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Contoh: Training Hours per Employee"
                />
                <FieldDescription>Gunakan judul operasional yang spesifik dan tidak terlalu umum.</FieldDescription>
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel htmlFor="dictionary-description">Deskripsi definisi</FieldLabel>
                <Textarea
                  id="dictionary-description"
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Tuliskan definisi KPI, konteks pemakaian, dan batasan interpretasi."
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="dictionary-bsc">Perspektif BSC</FieldLabel>
                <Select value={bscPerspective} onValueChange={(value) => setBscPerspective(value as BscPerspective)}>
                  <SelectTrigger id="dictionary-bsc">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bscPerspectiveOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="dictionary-unit">Satuan target</FieldLabel>
                <Input
                  id="dictionary-unit"
                  value={targetUnit}
                  onChange={(event) => setTargetUnit(event.target.value)}
                  placeholder="Contoh: %, Jam, Skor"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="dictionary-polarity">Polaritas</FieldLabel>
                <Select value={polarity} onValueChange={(value) => setPolarity(value as Polarity)}>
                  <SelectTrigger id="dictionary-polarity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {polarityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="dictionary-monitoring">Periode monitoring</FieldLabel>
                <Select value={monitoringPeriod} onValueChange={(value) => setMonitoringPeriod(value as MonitoringPeriod)}>
                  <SelectTrigger id="dictionary-monitoring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {monitoringPeriodOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="dictionary-cap">Cap realisasi</FieldLabel>
                <Select value={capType} onValueChange={(value) => setCapType(value as CapType)}>
                  <SelectTrigger id="dictionary-cap">
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
                <FieldLabel htmlFor="dictionary-fixed-weight">Fixed weight (opsional)</FieldLabel>
                <Input
                  id="dictionary-fixed-weight"
                  value={fixedWeight}
                  onChange={(event) => setFixedWeight(event.target.value)}
                  inputMode="decimal"
                  placeholder="Mis. 10"
                />
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel htmlFor="dictionary-formula">Formula</FieldLabel>
                <Textarea
                  id="dictionary-formula"
                  rows={2}
                  value={formula}
                  onChange={(event) => setFormula(event.target.value)}
                  placeholder="Contoh: (Actual / Target) x 100"
                />
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel htmlFor="dictionary-evidence">Kebutuhan evidence</FieldLabel>
                <Textarea
                  id="dictionary-evidence"
                  rows={2}
                  value={evidenceRequirement}
                  onChange={(event) => setEvidenceRequirement(event.target.value)}
                  placeholder="Dokumen, dashboard, atau sistem sumber yang dipakai untuk verifikasi."
                />
              </Field>
            </FieldGroup>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Fungsi yang relevan</p>
              <div className="grid gap-2 md:grid-cols-2">
                {functionOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
                    <Checkbox
                      checked={selectedFunctions.includes(option)}
                      onCheckedChange={(checked) => toggleFunction(option, checked === true)}
                      aria-label={`Pilih fungsi ${option}`}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Band jabatan yang dapat memakai item ini</p>
              <div className="grid gap-2 md:grid-cols-2">
                {bandOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
                    <Checkbox
                      checked={selectedBands.includes(option)}
                      onCheckedChange={(checked) => toggleBand(option, checked === true)}
                      aria-label={`Pilih band ${option}`}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={handleSubmit}>
                Kirim ke validation queue
              </Button>
              <Button variant="outline" asChild>
                <Link to="/performance-v2/kpi-library">Batal</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ringkasan draft</CardTitle>
            <CardDescription>Preview metadata yang akan masuk ke validation queue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <p className="font-medium text-foreground">{title.trim() || "Judul KPI baru"}</p>
              <p className="mt-1 text-muted-foreground">Suggested code: {suggestedCode || "Akan dibuat otomatis"}</p>
            </div>
            <div className="space-y-1 text-muted-foreground">
              <p>Jenis KPI: KPI Unit</p>
              <p>Perspektif: {bscPerspectiveOptions.find((option) => option.value === bscPerspective)?.label}</p>
              <p>Monitoring: {monitoringPeriodOptions.find((option) => option.value === monitoringPeriod)?.label}</p>
              <p>Cap: {capTypeOptions.find((option) => option.value === capType)?.label}</p>
              <p>Band target: {selectedBands.length > 0 ? selectedBands.join(", ") : "Belum dipilih"}</p>
              <p>Fungsi target: {selectedFunctions.length > 0 ? selectedFunctions.join(", ") : "Belum dipilih"}</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="font-medium text-foreground">Catatan alignment</p>
              <p className="mt-1 text-muted-foreground">
                Locked attributes akan dikonfigurasi saat governance publish, bukan pada tahap submit.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
