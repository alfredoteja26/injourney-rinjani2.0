import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { FileText, Download, Printer, CheckCircle2, Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

interface BeritaAcaraData {
  positionTitle: string;
  positionDepartment: string;
  positionLevel: string;
  successors: {
    primary?: { id: string; name: string; position: string; readiness: string; };
    secondary?: { id: string; name: string; position: string; readiness: string; };
    tertiary?: { id: string; name: string; position: string; readiness: string; };
  };
  talentDay?: {
    date: Date;
    time: string;
    duration: string;
    location: string;
    attendees: string[];
  };
  decisionDate: Date;
  decisionBy: string;
  notes?: string;
}

interface BeritaAcaraGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: BeritaAcaraData;
  onDownload: () => void;
  onPrint: () => void;
}

export function BeritaAcaraGenerator({
  open,
  onOpenChange,
  data,
  onDownload,
  onPrint
}: BeritaAcaraGeneratorProps) {
  
  const documentNumber = `BA/TSM/${format(data.decisionDate, "yyyy/MM")}/${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Berita Acara - Succession Planning
          </DialogTitle>
          <DialogDescription>
            Official documentation of succession planning decision
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 p-6 bg-white" id="berita-acara-content">
            {/* Header */}
            <div className="text-center space-y-2 border-b-2 border-primary pb-6">
              <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                BERITA ACARA
              </h2>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                KEPUTUSAN SUCCESSION PLANNING
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                Nomor: {documentNumber}
              </p>
            </div>

            {/* Introduction */}
            <div className="space-y-3">
              <p style={{ fontSize: 'var(--text-base)' }} className="leading-relaxed">
                Pada hari ini, <strong>{format(data.decisionDate, "EEEE, dd MMMM yyyy")}</strong>, 
                telah diadakan rapat Talent Management Committee untuk membahas dan menetapkan 
                succession planning untuk posisi:
              </p>
            </div>

            {/* Position Details */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Posisi</p>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {data.positionTitle}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Departemen</p>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {data.positionDepartment}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Level Jabatan</p>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {data.positionLevel}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Tanggal Keputusan</p>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {format(data.decisionDate, "dd MMMM yyyy")}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Succession Decision */}
            <div className="space-y-4">
              <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                KEPUTUSAN SUCCESSION PLANNING
              </h4>
              
              <p style={{ fontSize: 'var(--text-base)' }}>
                Berdasarkan hasil evaluasi talenta, analisis EQS (Executive Qualification Score), 
                dan pertimbangan Talent Management Committee, dengan ini ditetapkan urutan successor 
                untuk posisi tersebut di atas sebagai berikut:
              </p>

              {/* Succession Decision Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground border-b">
                    <tr>
                      <th className="px-4 py-3 font-medium">Urutan</th>
                      <th className="px-4 py-3 font-medium">Nama Kandidat</th>
                      <th className="px-4 py-3 font-medium">Posisi Saat Ini</th>
                      <th className="px-4 py-3 font-medium">Kesiapan (Readiness)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {data.successors.primary && (
                      <tr className="bg-[var(--color-success-light)]">
                        <td className="px-4 py-3 font-medium">Primary Successor</td>
                        <td className="px-4 py-3 font-semibold text-[var(--color-success)]">{data.successors.primary.name}</td>
                        <td className="px-4 py-3">{data.successors.primary.position}</td>
                        <td className="px-4 py-3 text-[var(--color-success)]">{data.successors.primary.readiness}</td>
                      </tr>
                    )}
                    {data.successors.secondary && (
                      <tr>
                        <td className="px-4 py-3 font-medium">Secondary Successor</td>
                        <td className="px-4 py-3 font-semibold">{data.successors.secondary.name}</td>
                        <td className="px-4 py-3">{data.successors.secondary.position}</td>
                        <td className="px-4 py-3">{data.successors.secondary.readiness}</td>
                      </tr>
                    )}
                    {data.successors.tertiary && (
                      <tr>
                        <td className="px-4 py-3 font-medium">Tertiary Successor</td>
                        <td className="px-4 py-3 font-semibold">{data.successors.tertiary.name}</td>
                        <td className="px-4 py-3">{data.successors.tertiary.position}</td>
                        <td className="px-4 py-3">{data.successors.tertiary.readiness}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Talent Day Info */}
            {data.talentDay && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                    INFORMASI TALENT DAY
                  </h4>
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Tanggal & Waktu</p>
                        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                          {format(data.talentDay.date, "dd MMMM yyyy")} • {data.talentDay.time} ({data.talentDay.duration} jam)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Lokasi</p>
                        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                          {data.talentDay.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Peserta</p>
                        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                          {data.talentDay.attendees.length} peserta terjadwal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Additional Notes */}
            {data.notes && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                    CATATAN TAMBAHAN
                  </h4>
                  <p style={{ fontSize: 'var(--text-base)' }} className="text-muted-foreground leading-relaxed">
                    {data.notes}
                  </p>
                </div>
              </>
            )}

            <Separator />

            {/* Footer */}
            <div className="space-y-4">
              <p style={{ fontSize: 'var(--text-base)' }}>
                Demikian Berita Acara ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-2">
                  <p style={{ fontSize: 'var(--text-sm)' }} className="text-muted-foreground">Ditetapkan di:</p>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Jakarta</p>
                </div>
                <div className="space-y-2">
                  <p style={{ fontSize: 'var(--text-sm)' }} className="text-muted-foreground">Tanggal:</p>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {format(data.decisionDate, "dd MMMM yyyy")}
                  </p>
                </div>
              </div>

              <div className="pt-12 space-y-2">
                <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {data.decisionBy}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  Chief Human Resources Officer
                </p>
                <div className="h-16 border-t-2 border-foreground w-48 mt-8" />
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline" onClick={onPrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button onClick={onDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
