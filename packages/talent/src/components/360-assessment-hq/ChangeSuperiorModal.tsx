import { useState } from "react";
import { X, Search, User, ArrowRight } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

interface ChangeSuperiorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangeSuperiorModal({ isOpen, onClose }: ChangeSuperiorModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssessee, setSelectedAssessee] = useState<any>(null);
  const [newSuperior, setNewSuperior] = useState<string>("");
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSearch = () => {
    // Mock search result
    if (searchQuery.toLowerCase().includes("hendra")) {
      setSelectedAssessee({
        name: "Hendra Wijaya",
        position: "Manager IT & Digital",
        currentSuperior: {
          name: "Diana Permata",
          position: "VP Transformasi Digital",
          status: "skipped"
        }
      });
    } else {
      toast.error("Peserta tidak ditemukan (coba cari 'Hendra')");
    }
  };

  const handleSubmit = () => {
    if (!newSuperior || !reason) return;
    toast.success("Atasan berhasil diganti");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Ganti Atasan</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
           <div className="space-y-2">
             <label className="text-sm font-medium">Pilih Siklus</label>
             <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
               <option>Penilaian Kompetensi Manajerial Q1 2026</option>
             </select>
           </div>

           <div className="space-y-2">
             <label className="text-sm font-medium">Cari Peserta</label>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="Nama atau NIK..." 
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
                 className="flex-1 px-3 py-2 border border-input rounded-md"
               />
               <button onClick={handleSearch} className="px-3 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90">
                 <Search size={18} />
               </button>
             </div>
           </div>

           {selectedAssessee && (
             <div className="bg-muted/30 border border-border rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-start gap-3 mb-4">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {selectedAssessee.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{selectedAssessee.name}</div>
                    <div className="text-xs text-muted-foreground">{selectedAssessee.position}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center text-sm">
                  <div className="bg-card border border-border p-2 rounded text-center">
                    <div className="text-xs text-muted-foreground mb-1">Atasan Saat Ini</div>
                    <div className="font-semibold text-destructive">{selectedAssessee.currentSuperior.name}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{selectedAssessee.currentSuperior.position}</div>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground" />
                  <div className="bg-card border border-border p-2 rounded text-center border-dashed border-emerald-300 bg-emerald-50/50">
                    <div className="text-xs text-muted-foreground mb-1">Atasan Baru</div>
                    {newSuperior ? (
                      <div className="font-semibold text-emerald-700">Rudi Santoso</div>
                    ) : (
                      <div className="text-xs italic text-muted-foreground">Belum dipilih</div>
                    )}
                  </div>
                </div>
             </div>
           )}

           {selectedAssessee && (
             <>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Atasan Baru</label>
                 <select 
                   value={newSuperior}
                   onChange={e => setNewSuperior(e.target.value)}
                   className="w-full px-3 py-2 border border-input rounded-md bg-background"
                 >
                   <option value="">-- Pilih Pegawai --</option>
                   <option value="rudy">Rudi Santoso - Acting VP Transformasi Digital</option>
                   <option value="bambang">Bambang Hartono - VP Human Capital</option>
                 </select>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium">Alasan Perubahan <span className="text-destructive">*</span></label>
                 <textarea 
                   value={reason}
                   onChange={e => setReason(e.target.value)}
                   className="w-full px-3 py-2 border border-input rounded-md bg-background h-24 resize-none"
                   placeholder="Jelaskan alasan penggantian..."
                 />
               </div>
             </>
           )}
        </div>

        <div className="p-6 border-t border-border bg-muted/20 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted">
            Batal
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!selectedAssessee || !newSuperior || !reason}
            className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-md hover:bg-primary/90 shadow-sm disabled:opacity-50"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
