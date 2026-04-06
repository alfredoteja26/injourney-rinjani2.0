import { Link } from "react-router";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Calendar,
  TrendingUp,
  BookOpen,
  AlertCircle,
  PlayCircle,
  Check,
  ChevronRight,
  MoreHorizontal,
  ArrowRight,
  Users,
  Sparkles,
  LayoutGrid
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Layout } from "../../components/shell/Layout";
import { IDPStatusBadge, IDPStatus } from "../../components/idp/IDPStatusBadge";
import { DevelopmentHoursRing } from "../../components/idp/DevelopmentHoursRing";
import { ActivityCard, Activity } from "../../components/idp/ActivityCard";
import { 
  mockIDPCycles, 
  mockIDPRecords, 
  mockIDPActivities,
  mockEmployees,
  mockCourses
} from "../../data/idpData";
import { cn } from "../../components/ui/utils";

export function IDPDashboardScreen() {
  const activeCycle = mockIDPCycles.find(c => c.status === 'active');
  const currentEmployee = mockEmployees[0];
  const currentIDPRecord = mockIDPRecords.find(
    r => r.employee_id === currentEmployee.id && r.cycle_id === activeCycle?.id
  );
  
  const activities = currentIDPRecord 
    ? mockIDPActivities.filter(a => a.idp_record_id === currentIDPRecord.id)
    : [];
  
  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const inProgressActivities = activities.filter(a => a.status === 'in_progress').length;
  
  const activitiesProgress = activities.length > 0
    ? (completedActivities / activities.length) * 100
    : 0;
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const enrichedActivities: Activity[] = activities.map(activity => {
    const course = activity.course_id ? mockCourses.find(c => c.id === activity.course_id) : null;
    return { 
      id: activity.id,
      title: course?.title || activity.title,
      type: activity.activity_type as 'lms_course' | 'custom_activity',
      status: activity.status as 'not_started' | 'in_progress' | 'completed',
      duration_hours: activity.duration_hours,
      target_date: activity.target_date,
      priority: activity.priority as 'high' | 'medium' | 'low',
      course_code: course?.code,
      thumbnail_url: course?.thumbnail_url
    };
  });

  if (!activeCycle) {
    return (
      <Layout>
        <div className="min-h-screen bg-background p-6 font-sans">
          <Card className="max-w-2xl mx-auto shadow-sm border-border">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">
                Tidak Ada Periode IDP Aktif
              </h3>
              <p className="text-muted-foreground text-sm">
                Silakan hubungi HC Admin untuk informasi lebih lanjut.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Determine dashboard state
  const isEmptyState = !currentIDPRecord;
  const isBelowMinHours = currentIDPRecord ? currentIDPRecord.total_hours < activeCycle.min_development_hours : false;

  return (
    <Layout>
      <div className="min-h-screen bg-background md:p-8 font-sans space-y-8 p-[0px]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Development Plan</h1>
              <p className="text-muted-foreground italic mb-3">Kembangkan potensi terbaikmu</p>
              
              <div className="flex items-center gap-4">
                  <Badge className="bg-[#00495d] text-white hover:bg-[#003d4d] px-4 py-1.5 text-sm font-medium rounded-md shadow-sm">
                    IDP {new Date(activeCycle.start_date).getFullYear()} (Active)
                  </Badge>
              </div>
            </div>

            {/* Manager Access Button */}
            <Button variant="outline" asChild className="gap-2 border-border text-foreground hover:bg-muted bg-white shadow-sm">
              <Link to="/talent/idp/team">
                <Users size={16} />
                My Team IDP
              </Link>
            </Button>
          </div>

          {isEmptyState ? (
            /* Empty State */
            <Card className="shadow-sm border-border bg-card">
              <CardContent className="p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                   <FileText className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Belum Ada IDP untuk Periode Ini
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
                  Mulai dengan melihat gap analysis Anda untuk menemukan area pengembangan yang dibutuhkan untuk karir Anda.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 shadow-sm">
                    <Link to="/talent/idp/gap-analysis">Lihat Gap Analysis</Link>
                  </Button>
                  <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                    <Link to="/talent/idp/editor">Mulai IDP Baru</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Summary Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Status Card */}
                <Card className="shadow-sm border-border bg-card h-full">
                  <CardHeader className="pb-2 pt-6 px-6">
                    <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <FileText size={14} />
                      STATUS IDP
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between h-[160px] px-6 pb-6">
                    <div className="mt-2 space-y-4">
                      <div>
                        {currentIDPRecord.status === 'approved' ? (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 px-3 py-1 rounded-sm text-sm font-medium">
                                Disetujui
                            </Badge>
                        ) : currentIDPRecord.status === 'pending_approval' ? (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0 px-3 py-1 rounded-sm text-sm font-medium">
                                Menunggu Approval
                            </Badge>
                        ) : (
                            <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 px-3 py-1 rounded-sm text-sm font-medium">
                                Draft
                            </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                        {currentIDPRecord.status === 'approved' 
                          ? "IDP Anda telah disetujui. Silakan lanjutkan ke tahap eksekusi."
                          : currentIDPRecord.status === 'pending_approval'
                          ? "Menunggu persetujuan dari Manager Anda."
                          : "Draft belum disubmit. Lengkapi rencana Anda."}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-auto">
                      Terakhir diperbarui: {formatDate(currentIDPRecord.updated_at)}
                    </p>
                  </CardContent>
                </Card>

                {/* Hours Card */}
                <Card className="shadow-sm border-border bg-card h-full">
                  <CardHeader className="pb-2 pt-6 px-6">
                    <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Clock size={14} />
                      JAM PENGEMBANGAN
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center h-[160px] px-6 pb-6 gap-6">
                    <div className="shrink-0">
                      <DevelopmentHoursRing 
                        totalHours={currentIDPRecord.completed_hours} 
                        minHours={currentIDPRecord.total_hours} 
                        size={110}
                        strokeWidth={12}
                        className="text-slate-900"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-muted-foreground">
                        Total Planned
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                          {currentIDPRecord.total_hours} <span className="text-base font-normal text-muted-foreground">jam</span>
                      </div>
                      
                      {currentIDPRecord.total_hours < activeCycle.min_development_hours && (
                        <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium mt-1">
                          <AlertCircle size={12} />
                          <span>Min. {activeCycle.min_development_hours} jam</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Activities Card */}
                <Card className="shadow-sm border-border bg-card h-full">
                  <CardHeader className="pb-2 pt-6 px-6">
                    <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      PROGRESS AKTIVITAS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between h-[160px] px-6 pb-6">
                    <div className="mt-2">
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-foreground">
                          {completedActivities}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                          / {activities.length} aktivitas selesai
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress value={activitiesProgress} className="h-2.5 bg-slate-100" indicatorClassName="bg-gradient-to-r from-orange-400 to-amber-500" />
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-muted-foreground">{Math.round(activitiesProgress)}% Complete</span>
                            <span className="text-emerald-600">{inProgressActivities} in progress</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-auto">
                        <Link to="/talent/idp/progress" className="flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                            Lihat Detail <ChevronRight size={14} className="ml-1" />
                        </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions Row */}
              <div className="flex flex-wrap items-center gap-3">
                  <Button asChild className="bg-[#8BC34A] hover:bg-[#7CB342] text-white border-0 shadow-sm h-10 px-5 text-sm font-semibold rounded-md">
                    <Link to="/talent/idp/wrapped">
                        <Sparkles size={16} className="mr-2" />
                        2026 Wrapped
                    </Link>
                  </Button>

                  <Button asChild className="bg-[#00495d] hover:bg-[#003d4d] text-white shadow-sm h-10 px-5 text-sm font-semibold rounded-md">
                    <Link to="/talent/idp/editor">
                        {currentIDPRecord.status === 'draft' ? 'Lanjutkan Draft' : 'Edit IDP'}
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="border-border bg-white hover:bg-slate-50 text-foreground h-10 px-5 text-sm font-medium rounded-md">
                    <Link to="/talent/idp/gap-analysis">
                        <TrendingUp size={16} className="mr-2" />
                        Lihat Gap Analysis
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" asChild className="text-[#00495d] hover:text-[#003d4d] hover:bg-slate-50 h-10 px-5 text-sm font-medium rounded-md">
                    <Link to="/talent/idp/catalog">
                        <BookOpen size={16} className="mr-2" />
                        Jelajahi Kursus
                    </Link>
                  </Button>
              </div>

              {/* Current IDP Preview Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                  {/* Left Column: IDP Activities Grid */}
                  <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-end mb-4">
                          <Link to={`/idp/detail/${currentIDPRecord.id}`} className="text-sm font-medium text-[#00495d] hover:underline flex items-center">
                              Lihat semua <ArrowRight size={14} className="ml-1" />
                          </Link>
                      </div>
                      
                      {enrichedActivities.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {enrichedActivities.slice(0, 4).map((activity) => (
                                  <Link key={activity.id} to="/talent/idp/progress" className="group block">
                                      <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-all h-full bg-card">
                                        <div className="relative aspect-video bg-muted">
                                          {activity.thumbnail_url ? (
                                            <img src={activity.thumbnail_url} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                              <BookOpen size={32} />
                                            </div>
                                          )}
                                          <div className="absolute top-3 left-3">
                                            {activity.status === 'in_progress' && (
                                              <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 text-[10px] px-2 py-0.5 rounded-sm shadow-sm">
                                                Sedang Berjalan
                                              </Badge>
                                            )}
                                            {activity.status === 'completed' && (
                                              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-[10px] px-2 py-0.5 rounded-sm shadow-sm">
                                                Selesai
                                              </Badge>
                                            )}
                                            {activity.status === 'not_started' && (
                                              <Badge variant="secondary" className="bg-white/90 text-slate-700 backdrop-blur-sm text-[10px] px-2 py-0.5 rounded-sm shadow-sm">
                                                Belum Dimulai
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                        <CardContent className="p-4">
                                          <h4 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-[#00495d] transition-colors">
                                            {activity.title}
                                          </h4>
                                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                              <Clock size={12} />
                                              <span>{activity.duration_hours} jam</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <LayoutGrid size={12} />
                                              <span>{activity.type === 'lms_course' ? 'Course' : 'Activity'}</span>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                  </Link>
                              ))}
                          </div>
                      ) : (
                          <div className="border border-dashed border-border rounded-xl p-8 text-center bg-slate-50/50">
                              <p className="text-muted-foreground text-sm mb-4">Belum ada aktivitas yang ditambahkan.</p>
                              <Button size="sm" variant="outline" asChild>
                                  <Link to="/talent/idp/editor">Tambah Aktivitas</Link>
                              </Button>
                          </div>
                      )}
                  </div>

                  {/* Right Column: Timeline */}
                  <div className="lg:col-span-1">
                      <Card className="h-full border-border shadow-sm bg-card">
                          <CardHeader className="pb-4 pt-6 border-b border-border/50">
                              <CardTitle className="text-lg font-bold text-foreground">
                                  Timeline Periode
                              </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-8">
                              <div className="relative pl-3">
                                  {/* Vertical Line */}
                                  <div className="absolute top-2 left-[19px] bottom-4 w-[2px] bg-slate-200" />
                                  
                                  <div className="space-y-10">
                                      {[
                                          { label: 'Pembukaan', date: activeCycle.start_date, status: 'completed' },
                                          { label: 'Batas Submit', date: activeCycle.submission_deadline, status: 'current' },
                                          { label: 'Mid-year Review', date: activeCycle.midyear_checkpoint, status: 'upcoming' },
                                          { label: 'Penutupan', date: activeCycle.end_date, status: 'upcoming' }
                                      ].map((item, idx) => {
                                          const isCompleted = item.status === 'completed';
                                          const isCurrent = item.status === 'current';
                                          
                                          return (
                                              <div key={idx} className="relative flex gap-5 group">
                                                  <div className={cn(
                                                      "relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-[3px] transition-colors bg-white",
                                                      isCompleted ? "border-[#00495d] text-[#00495d]" :
                                                      isCurrent ? "border-[#8BC34A] text-[#8BC34A]" :
                                                      "border-slate-300 text-slate-300"
                                                  )}>
                                                      {isCompleted ? <div className="w-3 h-3 bg-[#00495d] rounded-full" /> : 
                                                       isCurrent ? <div className="w-3 h-3 bg-[#8BC34A] rounded-full animate-pulse" /> :
                                                       null}
                                                  </div>
                                                  
                                                  <div className="pt-1">
                                                      <h4 className={cn(
                                                          "font-bold text-sm leading-none mb-1.5",
                                                          isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                                                      )}>
                                                          {item.label}
                                                      </h4>
                                                      <p className="text-xs text-muted-foreground font-mono">
                                                          {formatDate(item.date)}
                                                      </p>
                                                  </div>
                                              </div>
                                          );
                                      })}
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
