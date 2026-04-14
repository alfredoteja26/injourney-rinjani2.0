import { Link } from "react-router";
import { AlertCircle, ArrowRight, BookOpen, Calendar, CheckCircle2, Clock, FileText, LayoutGrid, Sparkles, TrendingUp, Users } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  FilterRail,
  PageHeader,
  Progress,
  SectionPanel,
  StatCard,
  StatCardGroup,
  StatusBadge,
  cn,
} from "@rinjani/shared-ui";

import { Layout } from "../../components/shell/Layout";
import { DevelopmentHoursRing } from "../../components/idp/DevelopmentHoursRing";
import { type Activity } from "../../components/idp/ActivityCard";
import { mockCourses, mockEmployees, mockIDPActivities, mockIDPCycles, mockIDPRecords } from "../../data/idpData";

export function IDPDashboardScreen() {
  const activeCycle = mockIDPCycles.find((cycle) => cycle.status === "active");
  const currentEmployee = mockEmployees[0];
  const currentIDPRecord = mockIDPRecords.find((record) => record.employee_id === currentEmployee.id && record.cycle_id === activeCycle?.id);

  const activities = currentIDPRecord ? mockIDPActivities.filter((activity) => activity.idp_record_id === currentIDPRecord.id) : [];
  const completedActivities = activities.filter((activity) => activity.status === "completed").length;
  const inProgressActivities = activities.filter((activity) => activity.status === "in_progress").length;
  const activitiesProgress = activities.length > 0 ? (completedActivities / activities.length) * 100 : 0;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const enrichedActivities: Activity[] = activities.map((activity) => {
    const course = activity.course_id ? mockCourses.find((item) => item.id === activity.course_id) : null;
    return {
      id: activity.id,
      title: course?.title || activity.title,
      type: activity.activity_type as "lms_course" | "custom_activity",
      status: activity.status as "not_started" | "in_progress" | "completed",
      duration_hours: activity.duration_hours,
      target_date: activity.target_date,
      priority: activity.priority as "high" | "medium" | "low",
      course_code: course?.code,
      thumbnail_url: course?.thumbnail_url,
    };
  });

  if (!activeCycle) {
    return (
      <Layout>
        <div className="mx-auto max-w-[var(--layout-max-width-workspace)] px-4 pb-10 pt-6 md:px-6 lg:px-8">
          <SectionPanel>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Calendar className="size-10" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Tidak Ada Periode IDP Aktif</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Silakan hubungi HC Admin untuk informasi lebih lanjut mengenai siklus pengembangan yang sedang berjalan.
              </p>
            </div>
          </SectionPanel>
        </div>
      </Layout>
    );
  }

  const isEmptyState = !currentIDPRecord;
  const isBelowMinHours = currentIDPRecord ? currentIDPRecord.total_hours < activeCycle.min_development_hours : false;

  return (
    <Layout>
      <div className="mx-auto max-w-[var(--layout-max-width-workspace)] space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8">
        <PageHeader
          variant="workspace"
          eyebrow="Talent Development"
          title="Development Plan"
          description="Kembangkan potensi terbaikmu dengan rencana aktivitas yang tetap sama, tetapi dibingkai ulang dengan hirarki visual yang lebih konsisten."
          badge={<StatusBadge status="active">IDP {new Date(activeCycle.start_date).getFullYear()} Active</StatusBadge>}
          actions={
            <Button asChild variant="outline">
              <Link to="/talent/idp/team">
                <Users size={16} />
                My Team IDP
              </Link>
            </Button>
          }
        />

        {isEmptyState ? (
          <SectionPanel>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileText className="size-10" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Belum Ada IDP untuk Periode Ini</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Mulai dengan melihat gap analysis Anda untuk menemukan area pengembangan yang dibutuhkan untuk karir Anda.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild>
                  <Link to="/talent/idp/gap-analysis">Lihat Gap Analysis</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/talent/idp/editor">Mulai IDP Baru</Link>
                </Button>
              </div>
            </div>
          </SectionPanel>
        ) : (
          <>
            <StatCardGroup>
              <StatCard
                label="Status IDP"
                value={<StatusBadge status={currentIDPRecord.status}>{currentIDPRecord.status === "approved" ? "Disetujui" : currentIDPRecord.status === "pending_approval" ? "Menunggu Approval" : "Draft"}</StatusBadge>}
                description={
                  currentIDPRecord.status === "approved"
                    ? "IDP Anda telah disetujui. Lanjutkan ke tahap eksekusi."
                    : currentIDPRecord.status === "pending_approval"
                      ? "Menunggu persetujuan dari manager Anda."
                      : "Draft belum disubmit. Lengkapi rencana Anda."
                }
                supportingText={`Terakhir diperbarui: ${formatDate(currentIDPRecord.updated_at)}`}
                icon={<FileText size={18} />}
                tone={currentIDPRecord.status === "approved" ? "success" : currentIDPRecord.status === "pending_approval" ? "warning" : "neutral"}
              />
              <StatCard
                label="Jam Pengembangan"
                value={
                  <div className="flex items-baseline gap-2">
                    <span>{currentIDPRecord.total_hours}</span>
                    <span className="text-base font-medium text-muted-foreground">jam</span>
                  </div>
                }
                description={isBelowMinHours ? `Masih di bawah minimum ${activeCycle.min_development_hours} jam.` : "Total jam sudah memenuhi minimum siklus aktif."}
                supportingText={`Jam selesai: ${currentIDPRecord.completed_hours} jam`}
                icon={<Clock size={18} />}
                tone={isBelowMinHours ? "warning" : "info"}
              />
              <StatCard
                label="Progress Aktivitas"
                value={
                  <div className="flex items-baseline gap-2">
                    <span>{completedActivities}</span>
                    <span className="text-base font-medium text-muted-foreground">/ {activities.length} selesai</span>
                  </div>
                }
                description={`${Math.round(activitiesProgress)}% aktivitas selesai dan ${inProgressActivities} sedang berjalan.`}
                supportingText="Progress tetap sama, hanya penyajian visual yang disejajarkan."
                icon={<CheckCircle2 size={18} />}
                tone={activitiesProgress >= 100 ? "success" : "info"}
              />
            </StatCardGroup>

            <FilterRail
              title="Quick actions"
              description="Aksi yang sudah ada tetap dipertahankan, tetapi dikelompokkan dalam rail yang stabil saat wrap."
            >
              <Button asChild variant="secondary">
                <Link to="/talent/idp/wrapped">
                  <Sparkles size={16} />
                  2026 Wrapped
                </Link>
              </Button>
              <Button asChild>
                <Link to="/talent/idp/editor">{currentIDPRecord.status === "draft" ? "Lanjutkan Draft" : "Edit IDP"}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/talent/idp/gap-analysis">
                  <TrendingUp size={16} />
                  Lihat Gap Analysis
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/talent/idp/catalog">
                  <BookOpen size={16} />
                  Jelajahi Kursus
                </Link>
              </Button>
            </FilterRail>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
              <SectionPanel
                title="Aktivitas prioritas"
                description="Preview aktivitas utama untuk periode berjalan."
                actions={
                  <Button asChild variant="ghost">
                    <Link to={`/idp/detail/${currentIDPRecord.id}`}>
                      Lihat semua
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                }
              >
                <div className="mb-6 flex items-center gap-6 rounded-[20px] border border-border bg-muted/30 p-5">
                  <DevelopmentHoursRing
                    totalHours={currentIDPRecord.completed_hours}
                    minHours={currentIDPRecord.total_hours}
                    size={112}
                    strokeWidth={12}
                    className="shrink-0"
                  />
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={currentIDPRecord.status}>{currentIDPRecord.status_label}</StatusBadge>
                      {isBelowMinHours ? (
                        <StatusBadge status="warning">
                          <AlertCircle className="size-3.5" />
                          Min. {activeCycle.min_development_hours} jam
                        </StatusBadge>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-medium text-foreground">
                        <span>Progress keseluruhan</span>
                        <span>{Math.round(activitiesProgress)}%</span>
                      </div>
                      <Progress value={activitiesProgress} className="h-2.5 bg-muted" indicatorClassName="bg-primary" />
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span>{completedActivities} selesai</span>
                        <span>{inProgressActivities} sedang berjalan</span>
                        <span>{activities.length - completedActivities - inProgressActivities} belum dimulai</span>
                      </div>
                    </div>
                  </div>
                </div>

                {enrichedActivities.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {enrichedActivities.slice(0, 4).map((activity) => (
                      <Link key={activity.id} to="/talent/idp/progress" className="group block">
                        <Card className="h-full overflow-hidden rounded-[20px] border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                          <div className="relative aspect-video bg-muted">
                            {activity.thumbnail_url ? (
                              <img
                                src={activity.thumbnail_url}
                                alt={activity.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                <BookOpen size={32} />
                              </div>
                            )}
                            <div className="absolute left-3 top-3">
                              <StatusBadge
                                status={activity.status}
                                className={cn(
                                  "border-0 bg-background/90 text-foreground shadow-sm backdrop-blur-sm",
                                  activity.status === "completed" && "bg-success text-success-foreground",
                                  activity.status === "in_progress" && "bg-primary text-primary-foreground",
                                )}
                              >
                                {activity.status === "completed" ? "Selesai" : activity.status === "in_progress" ? "Sedang Berjalan" : "Belum Dimulai"}
                              </StatusBadge>
                            </div>
                          </div>
                          <CardContent className="space-y-3 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <StatusBadge status={activity.priority === "high" ? "destructive" : activity.priority === "medium" ? "warning" : "neutral"}>
                                Prioritas {activity.priority}
                              </StatusBadge>
                              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                                {activity.course_code || (activity.type === "lms_course" ? "LMS" : "Custom")}
                              </span>
                            </div>
                            <h3 className="line-clamp-2 text-base font-semibold leading-6 text-foreground transition-colors group-hover:text-primary">
                              {activity.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Clock size={12} />
                                {activity.duration_hours} jam
                              </span>
                              <span className="flex items-center gap-1.5">
                                <LayoutGrid size={12} />
                                {activity.type === "lms_course" ? "Course" : "Activity"}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Calendar size={12} />
                                {formatDate(activity.target_date)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[20px] border border-dashed border-border bg-muted/20 px-6 py-10 text-center">
                    <p className="text-sm text-muted-foreground">Belum ada aktivitas yang ditambahkan.</p>
                    <Button asChild variant="outline" size="sm" className="mt-4">
                      <Link to="/talent/idp/editor">Tambah Aktivitas</Link>
                    </Button>
                  </div>
                )}
              </SectionPanel>

              <SectionPanel title="Timeline periode" description="Tonggak penting siklus tetap sama, tetapi divisualkan dengan ritme yang lebih rapi.">
                <div className="relative pl-3">
                  <div className="absolute bottom-4 left-[17px] top-2 w-px bg-border" />
                  <div className="space-y-8">
                    {[
                      { label: "Pembukaan", date: activeCycle.start_date, status: "completed" },
                      { label: "Batas Submit", date: activeCycle.submission_deadline, status: "current" },
                      { label: "Mid-year Review", date: activeCycle.midyear_checkpoint, status: "upcoming" },
                      { label: "Penutupan", date: activeCycle.end_date, status: "upcoming" },
                    ].map((item) => {
                      const isCompleted = item.status === "completed";
                      const isCurrent = item.status === "current";

                      return (
                        <div key={item.label} className="relative flex gap-4">
                          <div
                            className={cn(
                              "relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-background",
                              isCompleted && "border-primary text-primary",
                              isCurrent && "border-warning text-warning",
                              !isCompleted && !isCurrent && "border-border text-muted-foreground",
                            )}
                          >
                            <div
                              className={cn(
                                "size-2.5 rounded-full",
                                isCompleted && "bg-primary",
                                isCurrent && "bg-warning",
                                !isCompleted && !isCurrent && "bg-border",
                              )}
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className={cn("text-sm font-semibold", isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground")}>
                                {item.label}
                              </h3>
                              {isCurrent ? <StatusBadge status="warning">Current</StatusBadge> : null}
                              {isCompleted ? <StatusBadge status="completed">Completed</StatusBadge> : null}
                            </div>
                            <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </SectionPanel>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
