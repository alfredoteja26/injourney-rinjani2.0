import { useState } from "react";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Save, 
  Send,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "../../../components/ui/collapsible";
import { AdminLayout } from "../../../components/shell/AdminLayout";
import { toast } from "sonner@2.0.3";
import { ReminderConfig } from "../../../types/idp";
import { cn } from "../../../components/ui/utils";

// Mock Initial Data
const initialConfigs: ReminderConfig[] = [
  {
    type: 'submission',
    is_enabled: true,
    days_trigger: [7, 3, 1],
    channels: ['email', 'push'],
    template_subject: "Reminder: Segera Submit IDP Anda",
    template_body: "Halo {name}, \n\nIni adalah pengingat bahwa batas waktu pengumpulan Individual Development Plan (IDP) Anda tinggal {days_left} hari lagi. Mohon segera lengkapi dan submit IDP Anda sebelum {deadline}.\n\nTerima kasih."
  },
  {
    type: 'approval',
    is_enabled: true,
    days_trigger: [3],
    channels: ['email'],
    template_subject: "Action Required: Approval IDP Bawahan",
    template_body: "Halo {manager_name}, \n\nAnggota tim Anda, {employee_name}, telah mengirimkan IDP untuk disetujui. Mohon review dan berikan persetujuan atau feedback dalam waktu 3x24 jam.\n\nKlik link berikut untuk review: {link}"
  },
  {
    type: 'progress',
    is_enabled: false,
    days_trigger: [30],
    channels: ['email', 'push'],
    template_subject: "Check-in: Update Progress IDP Anda",
    template_body: "Halo {name}, \n\nBagaimana perkembangan pembelajaran Anda bulan ini? Jangan lupa update status aktivitas IDP Anda di sistem agar tercatat dalam penilaian kinerja.\n\nSemangat belajar!"
  }
];

export function ReminderSettingsScreen() {
  const [configs, setConfigs] = useState<ReminderConfig[]>(initialConfigs);
  const [openSections, setOpenSections] = useState<string[]>(['submission', 'approval', 'progress']);
  const [activeTestPreview, setActiveTestPreview] = useState<string | null>(null);

  const toggleSection = (type: string) => {
    setOpenSections(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const updateConfig = (type: string, updates: Partial<ReminderConfig>) => {
    setConfigs(prev => prev.map(c => c.type === type ? { ...c, ...updates } : c));
  };

  const handleSave = () => {
    toast.success("Pengaturan reminder berhasil disimpan");
  };

  const handleReset = () => {
    if(confirm("Reset semua pengaturan ke default system?")) {
      setConfigs(initialConfigs);
      toast.success("Pengaturan di-reset ke default");
    }
  };

  const handleTestSend = (config: ReminderConfig) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Mengirim test reminder ke email Anda...',
        success: 'Test reminder terkirim!',
        error: 'Gagal mengirim reminder'
      }
    );
  };

  const renderSection = (config: ReminderConfig, title: string, description: string) => {
    const isOpen = openSections.includes(config.type);

    return (
      <Card className={cn("border-[var(--color-border)] shadow-sm transition-all", !config.is_enabled && "opacity-75 bg-slate-50")}>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
               <div className={cn("p-2 rounded-lg", config.is_enabled ? "bg-blue-50 text-blue-600" : "bg-slate-200 text-slate-500")}>
                 <Bell className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="text-lg font-heading font-semibold text-[var(--color-text-heading)]">{title}</h3>
                 <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Switch 
                 checked={config.is_enabled}
                 onCheckedChange={(checked) => updateConfig(config.type, { is_enabled: checked })}
               />
               <Button 
                 variant="ghost" 
                 size="icon"
                 onClick={() => toggleSection(config.type)}
               >
                 {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
               </Button>
            </div>
          </div>

          <Collapsible open={isOpen && config.is_enabled}>
             <CollapsibleContent className="pt-6 space-y-6">
                <div className="h-px bg-[var(--color-border)]" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Triggers & Channels */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Waktu Pengiriman (Triggers)</Label>
                      <p className="text-xs text-[var(--color-text-muted)] mb-2">
                        Pilih kapan reminder akan dikirim relatif terhadap deadline/event.
                      </p>
                      
                      {config.type === 'submission' && (
                        <div className="flex flex-wrap gap-2">
                          {[30, 14, 7, 3, 1].map(day => (
                            <div 
                              key={day}
                              onClick={() => {
                                const newDays = config.days_trigger.includes(day)
                                  ? config.days_trigger.filter(d => d !== day)
                                  : [...config.days_trigger, day];
                                updateConfig(config.type, { days_trigger: newDays.sort((a,b) => b-a) });
                              }}
                              className={cn(
                                "cursor-pointer px-3 py-1.5 rounded-full border text-sm font-medium transition-colors",
                                config.days_trigger.includes(day)
                                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                                  : "bg-white border-slate-200 hover:border-slate-300"
                              )}
                            >
                              H-{day}
                            </div>
                          ))}
                        </div>
                      )}

                      {config.type === 'approval' && (
                        <div className="flex items-center gap-3">
                           <span className="text-sm">Kirim reminder setiap</span>
                           <Select 
                             value={String(config.days_trigger[0])}
                             onValueChange={(val) => updateConfig(config.type, { days_trigger: [parseInt(val)] })}
                           >
                             <SelectTrigger className="w-[100px]">
                               <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="1">1 Hari</SelectItem>
                               <SelectItem value="3">3 Hari</SelectItem>
                               <SelectItem value="7">7 Hari</SelectItem>
                             </SelectContent>
                           </Select>
                           <span className="text-sm">setelah submission</span>
                        </div>
                      )}
                      
                      {config.type === 'progress' && (
                         <div className="flex items-center gap-3">
                           <span className="text-sm">Frekuensi Reminder:</span>
                           <Select 
                             value={String(config.days_trigger[0])}
                             onValueChange={(val) => updateConfig(config.type, { days_trigger: [parseInt(val)] })}
                           >
                             <SelectTrigger className="w-[140px]">
                               <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="14">2 Minggu Sekali</SelectItem>
                               <SelectItem value="30">Sebulan Sekali</SelectItem>
                               <SelectItem value="90">3 Bulan Sekali</SelectItem>
                             </SelectContent>
                           </Select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Channel Pengiriman</Label>
                      <div className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`email-${config.type}`} 
                            checked={config.channels.includes('email')}
                            onCheckedChange={(checked) => {
                               const newChannels = checked 
                                ? [...config.channels, 'email']
                                : config.channels.filter(c => c !== 'email');
                               updateConfig(config.type, { channels: newChannels as any });
                            }}
                          />
                          <Label htmlFor={`email-${config.type}`} className="flex items-center gap-2 font-normal cursor-pointer">
                            <Mail className="w-4 h-4 text-slate-500" /> Email
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`push-${config.type}`} 
                            checked={config.channels.includes('push')}
                            onCheckedChange={(checked) => {
                               const newChannels = checked 
                                ? [...config.channels, 'push']
                                : config.channels.filter(c => c !== 'push');
                               updateConfig(config.type, { channels: newChannels as any });
                            }}
                          />
                          <Label htmlFor={`push-${config.type}`} className="flex items-center gap-2 font-normal cursor-pointer">
                            <Smartphone className="w-4 h-4 text-slate-500" /> Push Notif
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Template Preview */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                     <div className="flex items-center justify-between mb-2">
                        <Label className="font-semibold text-slate-700">Template Pesan</Label>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-xs"
                          onClick={() => setActiveTestPreview(activeTestPreview === config.type ? null : config.type)}
                        >
                          {activeTestPreview === config.type ? "Tutup Editor" : "Edit Template"}
                        </Button>
                     </div>
                     
                     {activeTestPreview === config.type ? (
                        <div className="space-y-3">
                          <Input 
                            value={config.template_subject}
                            onChange={(e) => updateConfig(config.type, { template_subject: e.target.value })}
                            placeholder="Subject"
                            className="bg-white"
                          />
                          <Textarea 
                            value={config.template_body}
                            onChange={(e) => updateConfig(config.type, { template_body: e.target.value })}
                            placeholder="Body message..."
                            className="min-h-[120px] bg-white font-mono text-xs"
                          />
                          <p className="text-[10px] text-slate-500">
                            Available variables: &#123;name&#125;, &#123;deadline&#125;, &#123;days_left&#125;, &#123;link&#125;
                          </p>
                        </div>
                     ) : (
                        <div className="bg-white p-3 rounded border border-slate-200 space-y-2">
                          <div className="text-sm font-semibold border-b pb-2 text-slate-800">
                            Subject: {config.template_subject}
                          </div>
                          <div className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                            {config.template_body}
                          </div>
                        </div>
                     )}

                     <div className="pt-2 text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-8"
                          onClick={() => handleTestSend(config)}
                        >
                          <Send className="w-3 h-3 mr-2" />
                          Kirim Test Email
                        </Button>
                     </div>
                  </div>
                </div>
             </CollapsibleContent>
          </Collapsible>
        </div>
      </Card>
    );
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[var(--color-background)] p-6 font-body">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[var(--color-text-heading)]">
                Pengaturan Reminder
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Konfigurasi notifikasi otomatis untuk siklus IDP.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Default
              </Button>
              <Button onClick={handleSave} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
                <Save className="w-4 h-4 mr-2" />
                Simpan Semua
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {renderSection(
              configs.find(c => c.type === 'submission')!, 
              "Reminder Submit IDP", 
              "Dikirim ke karyawan yang belum submit IDP mendekati deadline."
            )}
            
            {renderSection(
              configs.find(c => c.type === 'approval')!, 
              "Reminder Approval Manager", 
              "Dikirim ke manager yang memiliki pending approval IDP bawahan."
            )}
            
            {renderSection(
              configs.find(c => c.type === 'progress')!, 
              "Reminder Update Progress", 
              "Dikirim secara berkala untuk mengingatkan update status aktivitas."
            )}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
