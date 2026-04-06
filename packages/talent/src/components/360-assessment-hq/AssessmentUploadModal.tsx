import { useState } from "react";
import { Upload, X, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

interface AssessmentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AssessmentUploadModal({ isOpen, onClose }: AssessmentUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setValidationResult(null);
    }
  };

  const handleValidate = () => {
    if (!file) return;
    setIsValidating(true);
    // Mock validation
    setTimeout(() => {
      setIsValidating(false);
      setValidationResult({
        total: 50,
        valid: 47,
        error: 3,
        errors: [
          { row: 12, col: "NIK", val: "99999", msg: "Karyawan tidak ditemukan" },
          { row: 28, col: "Score", val: "7", msg: "Nilai harus 1-6" },
          { row: 35, col: "Score", val: "", msg: "Nilai tidak boleh kosong" }
        ]
      });
    }, 1500);
  };

  const handleImport = () => {
    toast.success("Data berhasil diimpor (47 baris)");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Unggah Assessment</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!validationResult ? (
            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Pilih Siklus</label>
                 <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                   <option>Penilaian Kompetensi Manajerial Q1 2026</option>
                   <option>Penilaian Perilaku AKHLAK 2025</option>
                 </select>
               </div>
               
               <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/30 transition-colors">
                  <FileSpreadsheet className="mx-auto text-muted-foreground mb-4" size={48} />
                  <p className="text-sm font-medium text-foreground mb-1">Drag and drop file Excel/CSV</p>
                  <p className="text-xs text-muted-foreground mb-4">atau klik untuk memilih file</p>
                  <input 
                    type="file" 
                    accept=".xlsx,.csv" 
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary/10 file:text-primary
                      hover:file:bg-primary/20 cursor-pointer"
                  />
                  {file && <p className="mt-2 text-sm font-medium text-primary">{file.name}</p>}
               </div>

               <div className="flex justify-between items-center text-sm">
                 <a href="#" className="text-primary hover:underline">Unduh Template Excel</a>
                 <button 
                   onClick={handleValidate} 
                   disabled={!file || isValidating}
                   className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 font-medium"
                 >
                   {isValidating ? "Memvalidasi..." : "Validasi File"}
                 </button>
               </div>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="grid grid-cols-3 gap-4">
                 <div className="bg-muted p-4 rounded-lg text-center">
                   <div className="text-xs text-muted-foreground uppercase font-bold">Total Baris</div>
                   <div className="text-2xl font-bold">{validationResult.total}</div>
                 </div>
                 <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg text-center border border-emerald-100">
                   <div className="text-xs uppercase font-bold">Valid</div>
                   <div className="text-2xl font-bold">{validationResult.valid}</div>
                 </div>
                 <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-center border border-destructive/20">
                   <div className="text-xs uppercase font-bold">Error</div>
                   <div className="text-2xl font-bold">{validationResult.error}</div>
                 </div>
               </div>

               {validationResult.error > 0 && (
                 <div className="border border-border rounded-lg overflow-hidden">
                   <div className="bg-muted/50 px-4 py-2 border-b border-border text-sm font-medium">Daftar Error</div>
                   <div className="max-h-40 overflow-y-auto">
                     <table className="w-full text-sm">
                       <thead className="bg-background text-muted-foreground">
                         <tr>
                           <th className="px-4 py-2 text-left w-16">Baris</th>
                           <th className="px-4 py-2 text-left">Kolom</th>
                           <th className="px-4 py-2 text-left">Nilai</th>
                           <th className="px-4 py-2 text-left">Pesan</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-border">
                         {validationResult.errors.map((err: any, idx: number) => (
                           <tr key={idx}>
                             <td className="px-4 py-2 text-muted-foreground">{err.row}</td>
                             <td className="px-4 py-2 font-medium">{err.col}</td>
                             <td className="px-4 py-2 font-mono text-xs">{err.val}</td>
                             <td className="px-4 py-2 text-destructive">{err.msg}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>
               )}

               {validationResult.error > 0 && (
                 <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 p-3 rounded-md border border-destructive/20">
                   <AlertCircle size={16} />
                   Perbaiki error pada file Excel dan unggah ulang sebelum melakukan import.
                 </div>
               )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border bg-muted/20 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted">
            Batal
          </button>
          {validationResult && validationResult.error === 0 && (
             <button onClick={handleImport} className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-md hover:bg-primary/90 shadow-sm">
               Import Data
             </button>
          )}
        </div>
      </div>
    </div>
  );
}
