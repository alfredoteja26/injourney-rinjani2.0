import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "./ui/utils";

// Helper for formatting date
const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};

// Common Form Components
function DatePickerField({ label, date, setDate }: { label: string, date: Date | undefined, setDate: (d: Date | undefined) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border-border bg-input-background text-foreground",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDate(date) : "Pilih tanggal"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="bg-card text-foreground"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SelectField({ label, value, onValueChange, options, placeholder }: { label: string, value: string, onValueChange: (v: string) => void, options: string[], placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-foreground">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full border-border bg-input-background text-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {options.map((opt) => (
            <SelectItem key={opt} value={opt} className="text-popover-foreground focus:bg-accent focus:text-accent-foreground">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface DataEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  fieldLabel?: string;
  fieldValue?: string;
  addDataType?: string;
}

export function DataEditModal({ open, onClose, onSave, fieldLabel, fieldValue, addDataType }: DataEditModalProps) {
  const isAddMode = !!addDataType;
  const title = isAddMode 
    ? (addDataType?.startsWith("Edit") ? addDataType : `Tambah ${addDataType}`) 
    : `Ubah ${fieldLabel}`;

  // Form State
  const [formData, setFormData] = useState<any>({});

  const renderForm = () => {
    // Specific Handling based on Field Label or Data Type
    const type = addDataType || fieldLabel;

    if (type?.includes("Kontak Darurat")) {
        // Simple heuristic: if specific field edit vs full add
        if (!isAddMode) {
             // Single field edit
             return (
                <div className="flex flex-col gap-2">
                  <Label className="text-foreground">{fieldLabel}</Label>
                  <Input 
                    defaultValue={fieldValue}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    placeholder={`Masukkan ${fieldLabel}`}
                    className="border-border bg-input-background text-foreground"
                  />
                </div>
             );
        }
    }
    
    // Default Fallback
    if (!isAddMode) {
      return (
        <div className="flex flex-col gap-2">
          <Label className="text-foreground">Nilai Baru</Label>
          <Input 
            defaultValue={fieldValue}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            placeholder={`Masukkan ${fieldLabel} baru`}
            className="border-border bg-input-background text-foreground"
          />
        </div>
      );
    } 
    
    // Default Add Mode
    return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Judul/Nama</Label>
            <Input 
              placeholder={`Masukkan nama ${addDataType}`}
              className="border-border bg-input-background text-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Deskripsi</Label>
            <Textarea 
              placeholder="Masukkan deskripsi (opsional)"
              className="border-border bg-input-background text-foreground min-h-[100px]"
            />
          </div>
        </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">{title}</DialogTitle>
          <DialogDescription>
            Perubahan pada data ini akan langsung tersimpan tanpa perlu persetujuan admin.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-foreground font-medium">Data Tier 3 - Dapat Diubah Langsung</p>
              <p className="text-xs text-muted-foreground">
                Perubahan akan langsung tersimpan tanpa perlu persetujuan admin.
              </p>
            </div>
          </div>

          {renderForm()}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-muted">Batal</Button>
          <Button onClick={onSave} className="bg-primary text-primary-foreground hover:bg-primary/90">Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DataRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  fieldLabel?: string;
  fieldValue?: string;
  addDataType?: string;
}

export function DataRequestModal({ open, onClose, onSubmit, fieldLabel, fieldValue, addDataType }: DataRequestModalProps) {
  const isAddMode = !!addDataType;
  const title = isAddMode 
    ? (addDataType?.startsWith("Edit") || addDataType?.startsWith("Perubahan") ? `Ajukan ${addDataType}` : `Ajukan Penambahan ${addDataType}`) 
    : `Ajukan Perubahan ${fieldLabel}`;

  const [date1, setDate1] = useState<Date>();
  const [date2, setDate2] = useState<Date>();
  const [formData, setFormData] = useState<any>({});

  const renderForm = () => {
    const type = addDataType || "";

    if (type.includes("Sertifikasi")) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Nama Sertifikasi</Label>
                    <Input placeholder="Contoh: AWS Certified Solutions Architect" className="border-border bg-input-background text-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Penerbit / Institusi</Label>
                    <Input placeholder="Contoh: Amazon Web Services" className="border-border bg-input-background text-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <DatePickerField label="Tanggal Terbit" date={date1} setDate={setDate1} />
                    <DatePickerField label="Berlaku Hingga" date={date2} setDate={setDate2} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Nomor Kredensial (ID)</Label>
                    <Input placeholder="Contoh: 123-456-789" className="border-border bg-input-background text-foreground" />
                </div>
            </div>
        );
    }

    if (type.includes("Bahasa") || type.includes("Kemampuan Bahasa")) {
        return (
            <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Bahasa</Label>
                    <Input placeholder="Contoh: Inggris, Jepang" className="border-border bg-input-background text-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <SelectField 
                        label="Listening (Mendengar)" 
                        value={formData.listening || ""} 
                        onValueChange={(v) => setFormData({...formData, listening: v})}
                        options={["Basic", "Intermediate", "Advanced", "Native"]}
                        placeholder="Pilih Level"
                    />
                    <SelectField 
                        label="Speaking (Berbicara)" 
                        value={formData.speaking || ""} 
                        onValueChange={(v) => setFormData({...formData, speaking: v})}
                        options={["Basic", "Intermediate", "Advanced", "Native"]}
                        placeholder="Pilih Level"
                    />
                    <SelectField 
                        label="Reading (Membaca)" 
                        value={formData.reading || ""} 
                        onValueChange={(v) => setFormData({...formData, reading: v})}
                        options={["Basic", "Intermediate", "Advanced", "Native"]}
                        placeholder="Pilih Level"
                    />
                    <SelectField 
                        label="Writing (Menulis)" 
                        value={formData.writing || ""} 
                        onValueChange={(v) => setFormData({...formData, writing: v})}
                        options={["Basic", "Intermediate", "Advanced", "Native"]}
                        placeholder="Pilih Level"
                    />
                </div>
            </div>
        );
    }

    if (type.includes("Karya Tulis")) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Judul Karya Tulis</Label>
                    <Input placeholder="Masukkan judul..." className="border-border bg-input-background text-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Penerbit / Jurnal</Label>
                    <Input placeholder="Contoh: Jurnal Manajemen Indonesia" className="border-border bg-input-background text-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label className="text-foreground">Tahun Terbit</Label>
                        <Input type="number" placeholder="2024" className="border-border bg-input-background text-foreground" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-foreground">Link / URL (Opsional)</Label>
                        <Input placeholder="https://..." className="border-border bg-input-background text-foreground" />
                    </div>
                </div>
            </div>
        );
    }
    
    if (type.includes("Pengalaman Pembicara") || type.includes("Juri")) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Nama Acara / Kegiatan</Label>
                    <Input placeholder="Masukkan nama acara..." className="border-border bg-input-background text-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Peran</Label>
                    <SelectField 
                        label="Sebagai" 
                        value={formData.role || ""} 
                        onValueChange={(v) => setFormData({...formData, role: v})}
                        options={["Pembicara", "Narasumber", "Juri", "Moderator"]}
                        placeholder="Pilih Peran"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <DatePickerField label="Tanggal Pelaksanaan" date={date1} setDate={setDate1} />
                    <div className="flex flex-col gap-2">
                        <Label className="text-foreground">Penyelenggara</Label>
                        <Input placeholder="Nama penyelenggara" className="border-border bg-input-background text-foreground" />
                    </div>
                </div>
            </div>
        );
    }

    // Default Fallback for Request Mode
    if (!isAddMode) {
       return (
         <>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Nilai Saat Ini</Label>
            <div className="p-3 bg-muted/30 border border-border rounded-md">
              <p className="text-sm text-foreground">{fieldValue || "-"}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Nilai Baru yang Diajukan</Label>
            <Input 
              placeholder={`Masukkan ${fieldLabel} baru`}
              className="border-border bg-input-background text-foreground"
            />
          </div>
         </>
       );
    }

    // Default Add Mode
    return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Judul/Nama</Label>
            <Input 
              placeholder={`Masukkan nama ${addDataType}`}
              className="border-border bg-input-background text-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Institusi/Lembaga</Label>
            <Input 
              placeholder="Masukkan nama institusi"
              className="border-border bg-input-background text-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Deskripsi</Label>
            <Textarea 
              placeholder="Masukkan deskripsi (opsional)"
              className="border-border bg-input-background text-foreground min-h-[80px]"
            />
          </div>
        </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">{title}</DialogTitle>
          <DialogDescription>
             Isi formulir di bawah untuk mengajukan permintaan perubahan data. Permintaan ini memerlukan persetujuan admin.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-amber-900 font-medium">Data Tier 2 - Perlu Persetujuan Admin</p>
              <p className="text-xs text-amber-700">
                Permintaan perubahan akan direview oleh admin terlebih dahulu sebelum diterapkan.
              </p>
            </div>
          </div>

          {renderForm()}

          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Alasan Perubahan/Penambahan</Label>
            <Textarea 
              placeholder="Jelaskan alasan perubahan atau penambahan data ini..."
              className="border-border bg-input-background text-foreground min-h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Upload Bukti Pendukung *</Label>
            <Input 
              type="file"
              className="border-border bg-input-background text-foreground cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Format: PDF, JPG, PNG (Maks. 5MB) - Wajib untuk validasi admin
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-muted">Batal</Button>
          <Button onClick={onSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">Ajukan Permintaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
