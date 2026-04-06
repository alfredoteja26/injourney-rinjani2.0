import { Link, useParams } from "react-router";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Printer,
  History,
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Layout } from "../../components/shell/Layout";
import { 
  mockIDPCycles,
  mockIDPRecords,
  mockIDPActivities,
  mockEmployees,
  mockCourses
} from "../../data/idpData";

export function IDPDetailScreen() {
  const { id } = useParams<{ id: string }>();
  
  const currentIDPRecord = mockIDPRecords.find(r => r.id === id);
  const activeCycle = mockIDPCycles.find(c => c.id === currentIDPRecord?.cycle_id);
  const currentEmployee = mockEmployees.find(e => e.id === currentIDPRecord?.employee_id);
  
  const activities = currentIDPRecord 
    ? mockIDPActivities.filter(a => a.idp_record_id === currentIDPRecord.id)
    : [];

  // Enriched activities with course data
  const enrichedActivities = activities.map(activity => {
    const course = activity.course_id ? mockCourses.find(c => c.id === activity.course_id) : null;
    return { ...activity, course };
  });

  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const totalHours = currentIDPRecord?.total_hours || 0;
  const completedHours = currentIDPRecord?.completed_hours || 0;
  const progress = totalHours > 0 ? (completedHours / totalHours) * 100 : 0;

  // Mock Timeline Data
  const timelineEvents = [
    {
      id: 1,
      event: "IDP Disetujui",
      date: "2026-01-28T10:15:00Z",
      actor: "Dewi Kartika (Atasan)",
      note: "Rencana pengembangan yang solid. Setuju untuk dilaksanakan.",
      status: "approved"
    },
    {
      id: 2,
      event: "Revisi Diminta",
      date: "2026-01-26T14:00:00Z",
      actor: "Dewi Kartika (Atasan)",
      note: "Mohon tambahkan aktivitas yang berkaitan dengan Digital Literacy.",
      status: "revision_requested"
    },
    {
      id: 3,
      event: "IDP Disubmit",
      date: "2026-01-25T14:30:00Z",
      actor: "Budi Santoso",
      note: "-",
      status: "pending_approval"
    },
    {
      id: 4,
      event: "Draft Dibuat",
      date: "2026-01-20T09:00:00Z",
      actor: "Budi Santoso",
      note: "-",
      status: "draft"
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending_approval': return 'secondary';
      case 'draft': return 'outline';
      case 'revision_requested': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Disetujui';
      case 'pending_approval': return 'Menunggu Persetujuan';
      case 'draft': return 'Draft';
      case 'revision_requested': return 'Perlu Revisi';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatShortDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!currentIDPRecord) {
    return (
      <Layout>
        <div className="min-h-screen bg-muted p-6 flex items-center justify-center">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
              <h3 className="text-lg font-semibold">IDP Tidak Ditemukan</h3>
              <Button asChild className="mt-4" variant="outline">
                <Link to="/talent/idp">Kembali ke Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Region */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link to="/talent/idp" className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-2 text-sm">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Dashboard
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold font-sans">
                  IDP {activeCycle?.name}
                </h1>
                <Badge variant={getStatusBadgeVariant(currentIDPRecord.status)} className="h-7 text-sm px-3">
                  {getStatusLabel(currentIDPRecord.status)}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                {currentIDPRecord.submitted_at 
                  ? `Disubmit pada ${formatDate(currentIDPRecord.submitted_at)}` 
                  : 'Belum disubmit'}
              </p>
            </div>
            
            <div className="flex gap-3">
              {currentIDPRecord.status === 'revision_requested' && (
                <Button asChild className="bg-amber-600 hover:bg-amber-700">
                  <Link to="/talent/idp/editor">
                    <FileText className="w-4 h-4 mr-2" />
                    Revisi IDP
                  </Link>
                </Button>
              )}
              <Button variant="outline" className="bg-background">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" className="bg-background">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Alert Banner for Revision */}
          {currentIDPRecord.status === 'revision_requested' && (
            <Card className="border-amber-500 bg-amber-50">
              <CardContent className="p-4 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-800">Revisi Diperlukan</h4>
                  <p className="text-amber-700 mt-1 text-sm">
                    "Mohon tambahkan aktivitas yang berkaitan dengan Digital Literacy."
                  </p>
                  <p className="text-amber-600 text-xs mt-2">
                    — Dewi Kartika, 26 Jan 2026
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-muted-foreground text-xs font-medium uppercase mb-1">
                      Total Jam
                    </div>
                    <div className="text-2xl font-bold flex items-baseline gap-1">
                      {totalHours} 
                      <span className="text-sm font-normal text-muted-foreground">jam</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-muted-foreground text-xs font-medium uppercase mb-1">
                      Aktivitas
                    </div>
                    <div className="text-2xl font-bold flex items-baseline gap-1">
                      {activities.length}
                      <span className="text-sm font-normal text-muted-foreground">items</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-muted-foreground text-xs font-medium uppercase mb-1">
                      Progress
                    </div>
                    <div className="text-2xl font-bold flex items-baseline gap-1">
                      {Math.round(progress)}%
                    </div>
                    <Progress value={progress} className="h-1 mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Activity List */}
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Aktivitas Pengembangan</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {enrichedActivities.map((activity, index) => (
                      <div key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-muted-foreground text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="font-normal border-border bg-background">
                                    {activity.activity_type === 'lms_course' ? 'LMS Course' : 'Custom'}
                                  </Badge>
                                  <h4 className="font-semibold text-foreground">
                                    {activity.title}
                                  </h4>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {activity.duration_hours} jam
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Target: {formatShortDate(activity.target_date)}
                                  </span>
                                </div>
                              </div>
                              <Badge 
                                variant={activity.status === 'completed' ? 'default' : 'secondary'}
                                className={activity.status === 'completed' ? 'bg-emerald-600' : ''}
                              >
                                {activity.status === 'completed' ? 'Selesai' : 
                                 activity.status === 'in_progress' ? 'Berjalan' : 'Belum Mulai'}
                              </Badge>
                            </div>

                            {/* Additional Info */}
                            {activity.notes && (
                              <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground italic">
                                "{activity.notes}"
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Employee Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Catatan Karyawan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {currentIDPRecord.employee_notes || "Tidak ada catatan."}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar: Timeline */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-muted-foreground" />
                    <CardTitle>Riwayat Status</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l border-border ml-3 space-y-8 pl-6 py-2">
                    {timelineEvents.map((event, idx) => (
                      <div key={event.id} className="relative">
                        <div className={`
                          absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 border-white
                          ${idx === 0 ? 'bg-primary ring-4 ring-primary/20' : 'bg-muted-foreground'}
                        `} />
                        
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold text-foreground">
                            {event.event}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(event.date)}
                          </span>
                          
                          <div className="flex items-center gap-2 mt-1 text-xs font-medium text-foreground">
                            <User className="w-3 h-3" />
                            {event.actor}
                          </div>

                          {event.note && event.note !== "-" && (
                            <div className="mt-2 text-xs p-2 bg-muted border border-border rounded text-muted-foreground">
                              "{event.note}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50 border-dashed border-border">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Butuh bantuan terkait IDP?
                  </p>
                  <Button variant="link" className="text-primary h-auto p-0">
                    Hubungi HC Admin
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
