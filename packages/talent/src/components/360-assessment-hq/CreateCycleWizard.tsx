import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { 
  ChevronRight, 
  Check, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  GripVertical,
  AlertCircle
} from "lucide-react";
import { cn } from "../../components/ui/utils";
import { assessmentInstruments, instrumentQuestions, AssessmentInstrument, InstrumentQuestion } from "../../lib/360-assessment-hq/data";
import { format } from "date-fns";
import { toast } from "sonner@2.0.3";

type WizardStep = 1 | 2 | 3;

interface CycleFormData {
  name: string;
  type: "behavioral" | "competency" | "custom";
  startDate: string;
  endDate: string;
  validUntil: string;
  assignmentMethod: "auto" | "manual";
  anonymity: "anonymous" | "identified";
  channels: {
    channel: "superior" | "peer" | "subordinate" | "self";
    count: number;
    weight: number;
    enabled: boolean;
  }[];
  instrumentId: string | null;
  questions: InstrumentQuestion[];
}

const INITIAL_DATA: CycleFormData = {
  name: "",
  type: "behavioral",
  startDate: "",
  endDate: "",
  validUntil: "",
  assignmentMethod: "auto",
  anonymity: "anonymous",
  channels: [
    { channel: "superior", count: 1, weight: 40, enabled: true },
    { channel: "peer", count: 3, weight: 30, enabled: true },
    { channel: "subordinate", count: -1, weight: 20, enabled: true },
    { channel: "self", count: 1, weight: 10, enabled: true }
  ],
  instrumentId: null,
  questions: []
};

export function CreateCycleWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<CycleFormData>(INITIAL_DATA);

  // --- Step 1 Logic ---
  const totalWeight = formData.channels.reduce((sum, c) => c.enabled ? sum + c.weight : sum, 0);
  const isStep1Valid = 
    formData.name && 
    formData.startDate && 
    formData.endDate && 
    totalWeight === 100;

  const handleChannelChange = (idx: number, field: keyof typeof formData.channels[0], value: any) => {
    const newChannels = [...formData.channels];
    newChannels[idx] = { ...newChannels[idx], [field]: value };
    setFormData({ ...formData, channels: newChannels });
  };

  // --- Step 2 Logic ---
  const handleInstrumentSelect = (instrument: AssessmentInstrument) => {
    setFormData({
      ...formData,
      instrumentId: instrument.id,
      // Load questions for the selected instrument (mock logic)
      questions: instrumentQuestions.filter(q => q.instrument_id === instrument.id)
    });
  };

  const isStep2Valid = !!formData.instrumentId;

  // --- Step 3 Logic ---
  const totalQuestionWeight = formData.questions.reduce((sum, q) => sum + q.weight, 0);
  const isStep3Valid = totalQuestionWeight === 100 && formData.questions.length > 0;

  const handleEqualizeWeights = () => {
    const count = formData.questions.length;
    if (count === 0) return;
    
    const baseWeight = Math.floor(100 / count);
    const remainder = 100 % count;
    
    const newQuestions = formData.questions.map((q, idx) => ({
      ...q,
      weight: baseWeight + (idx < remainder ? 1 : 0)
    }));
    
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleQuestionChange = (idx: number, field: keyof InstrumentQuestion, value: any) => {
    const newQuestions = [...formData.questions];
    newQuestions[idx] = { ...newQuestions[idx], [field]: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSave = () => {
    if (!isStep3Valid) return;
    
    // In real app, API call here
    toast.success("Siklus penilaian berhasil dibuat (Draft)");
    navigate("/talent/360-assessment-hq");
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header & Stepper */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-sans text-slate-800 mb-6">Buat Assessment Baru</h1>
        <div className="flex items-center w-full">
          <StepIndicator step={1} currentStep={step} label="Informasi Assessment" />
          <div className={cn("flex-1 h-px mx-4", step > 1 ? "bg-primary" : "bg-border")} />
          <StepIndicator step={2} currentStep={step} label="Pilih Instrumen" />
          <div className={cn("flex-1 h-px mx-4", step > 2 ? "bg-primary" : "bg-border")} />
          <StepIndicator step={3} currentStep={step} label="Review Pertanyaan" />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6 min-h-[400px]">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Judul Assessment <span className="text-destructive">*</span></label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Contoh: Penilaian Perilaku AKHLAK 2026"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Jenis Assessment <span className="text-destructive">*</span></label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="behavioral">Perilaku (Behavioral)</option>
                  <option value="competency">Kompetensi (Competency)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium">Pembuat</label>
                 <input type="text" value="Ratna Kusuma" disabled className="w-full px-3 py-2 border border-input rounded-md bg-muted text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tanggal Mulai <span className="text-destructive">*</span></label>
                <input 
                  type="date" 
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tanggal Selesai <span className="text-destructive">*</span></label>
                <input 
                  type="date" 
                  value={formData.endDate}
                  onChange={e => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
              </div>
            </div>

            <div className="h-px bg-border my-6" />

            {/* Channel Config */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Konfigurasi Channel Evaluator</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left w-[40px]">Aktif</th>
                      <th className="px-4 py-3 text-left">Channel</th>
                      <th className="px-4 py-3 text-left w-[200px]">Jumlah Evaluator</th>
                      <th className="px-4 py-3 text-left w-[150px]">Bobot (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {formData.channels.map((ch, idx) => (
                      <tr key={ch.channel} className={cn(!ch.enabled && "opacity-50 bg-muted/20")}>
                        <td className="px-4 py-3 text-center">
                           <input 
                             type="checkbox" 
                             checked={ch.enabled}
                             onChange={e => handleChannelChange(idx, "enabled", e.target.checked)}
                             className="rounded border-input text-primary focus:ring-primary"
                           />
                        </td>
                        <td className="px-4 py-3 font-medium capitalize">{ch.channel}</td>
                        <td className="px-4 py-3">
                           {ch.channel === "superior" ? (
                             <span className="text-muted-foreground">1 (Fixed)</span>
                           ) : ch.channel === "self" ? (
                             <span className="text-muted-foreground">1 (Fixed)</span>
                           ) : ch.channel === "subordinate" ? (
                             <span className="text-muted-foreground">Semua Bawahan Langsung</span>
                           ) : (
                             <input 
                               type="number" 
                               value={ch.count}
                               onChange={e => handleChannelChange(idx, "count", parseInt(e.target.value))}
                               className="w-20 px-2 py-1 border border-input rounded-md text-center"
                               min={1} max={10}
                               disabled={!ch.enabled}
                             />
                           )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="relative">
                            <input 
                              type="number" 
                              value={ch.weight}
                              onChange={e => handleChannelChange(idx, "weight", parseInt(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-input rounded-md pr-6 text-right"
                              min={0} max={100}
                              disabled={!ch.enabled}
                            />
                            <span className="absolute right-2 top-1.5 text-muted-foreground">%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/30 border-t border-border font-medium">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right">Total Bobot:</td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn(
                          "font-bold",
                          totalWeight !== 100 ? "text-destructive" : "text-emerald-600"
                        )}>
                          {totalWeight}%
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {totalWeight !== 100 && (
                <div className="flex items-center gap-2 text-destructive text-sm mt-2">
                  <AlertCircle size={16} />
                  Total bobot harus sama dengan 100%
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Metode Penetapan Assessor</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input 
                      type="radio" 
                      name="assignmentMethod" 
                      value="auto"
                      checked={formData.assignmentMethod === "auto"}
                      onChange={() => setFormData({...formData, assignmentMethod: "auto"})}
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <div className="font-medium text-sm">Otomatis</div>
                      <div className="text-xs text-muted-foreground">Berdasarkan struktur organisasi (Reporting Line)</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input 
                      type="radio" 
                      name="assignmentMethod" 
                      value="manual"
                      checked={formData.assignmentMethod === "manual"}
                      onChange={() => setFormData({...formData, assignmentMethod: "manual"})}
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <div className="font-medium text-sm">Manual</div>
                      <div className="text-xs text-muted-foreground">Admin menetapkan penilai satu per satu</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">Kebijakan Anonimitas</label>
                 <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input 
                      type="radio" 
                      name="anonymity" 
                      value="anonymous"
                      checked={formData.anonymity === "anonymous"}
                      onChange={() => setFormData({...formData, anonymity: "anonymous"})}
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <div className="font-medium text-sm">Anonim (Anonymous)</div>
                      <div className="text-xs text-muted-foreground">Nama penilai tidak ditampilkan di laporan</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <input 
                      type="radio" 
                      name="anonymity" 
                      value="identified"
                      checked={formData.anonymity === "identified"}
                      onChange={() => setFormData({...formData, anonymity: "identified"})}
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <div className="font-medium text-sm">Teridentifikasi (Identified)</div>
                      <div className="text-xs text-muted-foreground">Nama penilai ditampilkan di laporan</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold">Pilih Template Instrumen</h3>
               <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                 <Plus size={16} /> Buat Instrumen Baru
               </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {assessmentInstruments.map(inst => (
                 <div 
                   key={inst.id}
                   onClick={() => handleInstrumentSelect(inst)}
                   className={cn(
                     "border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md relative",
                     formData.instrumentId === inst.id 
                       ? "border-primary bg-primary/5 ring-1 ring-primary" 
                       : "border-border bg-card hover:border-primary/50"
                   )}
                 >
                   <div className="flex justify-between items-start mb-2">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide",
                        inst.assessment_type === "behavioral" ? "bg-purple-100 text-purple-700" :
                        inst.assessment_type === "competency" ? "bg-indigo-100 text-indigo-700" :
                        "bg-gray-100 text-gray-700"
                      )}>
                        {inst.assessment_type}
                      </span>
                      {inst.is_template && (
                        <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded font-medium">Template</span>
                      )}
                   </div>
                   <h4 className="font-bold text-foreground mb-1 line-clamp-2 min-h-[48px]">{inst.name}</h4>
                   <p className="text-xs text-muted-foreground line-clamp-2 mb-4 h-8">{inst.description || "Tidak ada deskripsi"}</p>
                   
                   <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/50 pt-3">
                      <div>
                        <span className="font-bold text-foreground block">{inst.total_questions}</span>
                        Pertanyaan
                      </div>
                      <div>
                        <span className="font-bold text-foreground block">{inst.scale_points} Point</span>
                        Skala ({inst.scale_min_label} - {inst.scale_max_label})
                      </div>
                   </div>

                   {formData.instrumentId === inst.id && (
                     <div className="absolute top-3 right-3 size-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-sm">
                       <Check size={14} strokeWidth={3} />
                     </div>
                   )}
                 </div>
               ))}
             </div>
          </div>
        )}

        {step === 3 && (
           <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                 <div>
                   <h3 className="text-lg font-semibold">Daftar Pertanyaan</h3>
                   <p className="text-sm text-muted-foreground">Review dan atur bobot pertanyaan.</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <button 
                      onClick={handleEqualizeWeights}
                      className="px-3 py-1.5 text-xs font-medium bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 rounded-md transition-colors"
                    >
                      Sama Ratakan Bobot
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md flex items-center gap-1">
                      <Plus size={14} /> Tambah
                    </button>
                 </div>
              </div>

              <div className="space-y-4">
                {formData.questions.map((q, idx) => (
                  <div key={idx} className="bg-muted/10 border border-border rounded-lg p-4 flex gap-4 group hover:bg-muted/20 transition-colors">
                     <div className="mt-2 text-muted-foreground cursor-grab active:cursor-grabbing">
                       <GripVertical size={18} />
                     </div>
                     <div className="size-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                       {idx + 1}
                     </div>
                     <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            value={q.competency_name}
                            onChange={e => handleQuestionChange(idx, "competency_name", e.target.value)}
                            className="text-xs font-semibold px-2 py-1 bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none transition-colors w-full"
                            placeholder="Kompetensi"
                          />
                          <input 
                            type="text" 
                            value={q.behavior_indicator}
                            onChange={e => handleQuestionChange(idx, "behavior_indicator", e.target.value)}
                            className="text-xs text-muted-foreground px-2 py-1 bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none transition-colors w-full italic"
                            placeholder="Indikator Perilaku"
                          />
                        </div>
                        <textarea 
                          value={q.question_text}
                          onChange={e => handleQuestionChange(idx, "question_text", e.target.value)}
                          className="w-full text-sm font-medium bg-transparent border border-transparent hover:border-border focus:border-primary rounded p-2 focus:outline-none resize-none"
                          rows={2}
                        />
                     </div>
                     <div className="w-[100px] shrink-0 flex flex-col items-end gap-2">
                        <div className="relative w-20">
                           <input 
                             type="number"
                             value={q.weight}
                             onChange={e => handleQuestionChange(idx, "weight", parseInt(e.target.value) || 0)}
                             className="w-full px-2 py-1 text-right text-sm font-bold border border-input rounded focus:ring-1 focus:ring-primary"
                           />
                           <span className="absolute right-6 top-1.5 text-xs text-muted-foreground">%</span>
                        </div>
                        <button className="text-muted-foreground hover:text-destructive p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                 <div className="flex items-center gap-2">
                   <span className="text-sm font-medium text-muted-foreground">Total Bobot Soal:</span>
                   <span className={cn(
                     "text-lg font-bold",
                     totalQuestionWeight !== 100 ? "text-destructive" : "text-emerald-600"
                   )}>
                     {totalQuestionWeight}%
                   </span>
                 </div>
              </div>
              {totalQuestionWeight !== 100 && (
                <div className="text-right text-xs text-destructive font-medium mt-1">
                  Total bobot harus 100%
                </div>
              )}
           </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-40 flex justify-end md:pl-[300px] transition-all">
         <div className="max-w-5xl w-full mx-auto flex justify-end gap-3">
            {step === 1 ? (
              <button 
                onClick={() => navigate("/talent/360-assessment-hq")}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                Batal
              </button>
            ) : (
              <button 
                onClick={() => setStep((s) => Math.max(1, s - 1) as WizardStep)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-2"
              >
                <ChevronLeft size={16} /> Kembali
              </button>
            )}

            {step < 3 ? (
              <button 
                onClick={() => setStep((s) => Math.min(3, s + 1) as WizardStep)}
                disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                Lanjutkan <ChevronRight size={16} />
              </button>
            ) : (
              <button 
                onClick={handleSave}
                disabled={!isStep3Valid}
                className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <Check size={16} /> Simpan Assessment
              </button>
            )}
         </div>
      </div>
    </div>
  );
}

function StepIndicator({ step, currentStep, label }: { step: number, currentStep: number, label: string }) {
  const status = step === currentStep ? "active" : step < currentStep ? "completed" : "pending";
  
  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "size-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
        status === "active" ? "bg-primary text-white shadow-md ring-2 ring-primary/20" :
        status === "completed" ? "bg-primary/20 text-primary" :
        "bg-muted text-muted-foreground"
      )}>
        {status === "completed" ? <Check size={16} strokeWidth={3} /> : step}
      </div>
      <span className={cn(
        "text-sm font-medium hidden md:inline-block",
        status === "active" ? "text-foreground" :
        status === "completed" ? "text-foreground" :
        "text-muted-foreground"
      )}>
        {label}
      </span>
    </div>
  );
}
