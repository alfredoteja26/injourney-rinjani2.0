import { useMemo, useState } from "react";
import { Award, BookOpen, Briefcase, Calendar, GraduationCap, Mail, MapPin, Phone, Target, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { ScrollArea } from "../../components/ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { cn } from "../../components/ui/utils";
import { NineBoxBadge, RiskDot, ShortlistedTag, TopTalentTag, TRProposedTag } from "./components/Badges";
import { TalentPoolCandidate, type EQSBand, type EQSComponent } from "./types";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

interface TalentProfileDetailProps {
  candidate: TalentPoolCandidate;
  onClose: () => void;
}

const eqsBandClassNames: Record<EQSBand, string> = {
  highly_qualified: "border-success/20 bg-success-muted/80 text-success",
  qualified: "border-primary/20 bg-primary/10 text-primary",
  needs_development: "border-warning/20 bg-warning-muted/80 text-warning",
  not_ready: "border-destructive/20 bg-destructive/10 text-destructive",
};

const riskSummaryClassNames = {
  LOW: "border-success/20 bg-success-muted/80 text-success",
  MEDIUM: "border-warning/20 bg-warning-muted/80 text-warning",
  HIGH: "border-destructive/20 bg-destructive/10 text-destructive",
} as const;

function SectionEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[20px] border border-dashed border-border bg-muted/20 px-5 py-8 text-center">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function formatComponentLabel(componentType: EQSComponent["component_type"]) {
  if (componentType === "tes") {
    return "Test";
  }

  return componentType.charAt(0).toUpperCase() + componentType.slice(1);
}

export function TalentProfileDetail({ candidate, onClose }: TalentProfileDetailProps) {
  const [activeTab, setActiveTab] = useState("eqs");
  const eqsComponents = candidate.eqs_score?.components ?? [];
  const hasEqsScore = eqsComponents.length > 0;
  const eqsBandClassName = eqsBandClassNames[candidate.eqs_score.eqs_band] ?? eqsBandClassNames.qualified;

  const radarData = useMemo(
    () =>
      eqsComponents.map((component) => ({
        subject: formatComponentLabel(component.component_type),
        fullMark: 100,
        score: component.raw_value,
      })),
    [eqsComponents],
  );

  return (
    <SheetContent side="right" className="w-full gap-0 border-l p-0 sm:max-w-2xl lg:max-w-3xl">
      <div className="flex min-h-0 flex-1 flex-col bg-background">
        <div className="border-b border-border bg-muted/20 px-6 py-6">
          <SheetHeader className="gap-5 p-0 pr-10">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <Avatar className="h-16 w-16 border border-border bg-card shadow-sm">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=006573&color=fff`} />
                  <AvatarFallback className="bg-primary/10 text-primary">{candidate.avatar_url ?? candidate.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <SheetTitle className="text-2xl font-bold tracking-tight">{candidate.name}</SheetTitle>
                    <SheetDescription className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        {candidate.position}
                      </span>
                      <span>{candidate.company}</span>
                      <span>{candidate.unit}</span>
                    </SheetDescription>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <NineBoxBadge cluster={candidate.talent_cluster} />
                    {candidate.is_top_talent ? <TopTalentTag /> : null}
                    {candidate.is_tr_proposed ? <TRProposedTag /> : null}
                    {candidate.is_hcbp_shortlisted ? <ShortlistedTag /> : null}
                    <Badge variant="outline" className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 font-medium", riskSummaryClassNames[candidate.risk_profile])}>
                      Risk <RiskDot level={candidate.risk_profile} /> {candidate.risk_profile}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[280px]">
                <Card className="rounded-[20px] border-border bg-card p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">EQS score</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight text-primary">{candidate.eqs_score.total_score.toFixed(1)}</span>
                    <span className="text-sm font-medium text-muted-foreground">/ 100</span>
                  </div>
                  <Badge variant="outline" className={cn("mt-3 w-fit px-2.5 py-1 font-medium", eqsBandClassName)}>
                    {candidate.eqs_score.eqs_band.replaceAll("_", " ")}
                  </Badge>
                </Card>
                <Card className="rounded-[20px] border-border bg-card p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Talent profile</p>
                  <div className="mt-3 space-y-3">
                    <DetailField label="Employee ID" value={candidate.employee_id} />
                    <DetailField label="Grade" value={candidate.grade} />
                    <DetailField label="Job family" value={candidate.job_family} />
                  </div>
                </Card>
              </div>
            </div>
          </SheetHeader>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-0 flex-1 flex-col">
          <div className="border-b border-border px-6">
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-none bg-transparent p-0">
              {["EQS", "Career", "Qualification", "Aspiration", "Personal"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent px-0 py-3 pr-4 text-sm font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-6 p-6">
              <TabsContent value="eqs" className="mt-0 space-y-6">
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
                  <Card className="rounded-[24px] border-border bg-card p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total EQS Score</p>
                        <div className="mt-2 flex items-baseline gap-2">
                          <h2 className="text-4xl font-bold tracking-tight text-primary">{candidate.eqs_score.total_score.toFixed(1)}</h2>
                          <span className="text-sm font-medium text-muted-foreground">/ 100</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={cn("px-3 py-1 font-medium", eqsBandClassName)}>
                        {candidate.eqs_score.eqs_band.replaceAll("_", " ")}
                      </Badge>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <DetailField label="Calculated" value={candidate.eqs_score.calculated_at} />
                      <DetailField label="Components" value={`${eqsComponents.length} factors`} />
                    </div>
                  </Card>

                  <Card className="rounded-[24px] border-border bg-card p-4 shadow-sm">
                    {hasEqsScore ? (
                      <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
                            <PolarGrid stroke="var(--border)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name={candidate.name} dataKey="score" stroke="var(--primary)" strokeWidth={2} fill="var(--primary)" fillOpacity={0.18} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <SectionEmptyState
                        title="Visual EQS belum tersedia"
                        description="Komponen EQS untuk kandidat ini belum terisi, jadi radar chart akan muncul setelah data asesmen dilengkapi."
                      />
                    )}
                  </Card>
                </div>

                <Card className="rounded-[24px] border-border bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">Component breakdown</h3>
                      <p className="text-sm text-muted-foreground">Bobot, nilai mentah, dan kontribusi setiap faktor EQS.</p>
                    </div>
                    <Badge variant="outline" className="px-2.5 py-1 font-medium text-muted-foreground">
                      {eqsComponents.length} components
                    </Badge>
                  </div>

                  <div className="mt-5 space-y-3">
                    {hasEqsScore ? (
                      eqsComponents.map((component) => (
                        <div key={component.id} className="rounded-[20px] border border-border bg-background p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-foreground">{formatComponentLabel(component.component_type)}</p>
                              <p className="text-xs text-muted-foreground">Weight {component.weight}%</p>
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                              {component.raw_value}
                              <span className="ml-2 font-normal text-muted-foreground">to {component.weighted_value.toFixed(1)}</span>
                            </p>
                          </div>
                          <Progress value={component.raw_value} className="mt-3 h-2" />
                        </div>
                      ))
                    ) : (
                      <SectionEmptyState
                        title="Belum ada komponen terhitung"
                        description="Score total sudah tersedia, tetapi rincian komponen belum dimuat untuk kandidat ini."
                      />
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="career" className="mt-0 space-y-4">
                {candidate.career_history.length > 0 ? (
                  candidate.career_history.map((job) => (
                    <Card key={job.id} className="rounded-[24px] border-border bg-card p-5 shadow-sm">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold text-foreground">{job.role}</h3>
                            {job.is_current ? <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">Current role</Badge> : null}
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
                          <p className="text-sm text-muted-foreground">{job.duration}</p>
                        </div>
                        <Badge variant="outline" className="w-fit capitalize text-muted-foreground">
                          {job.assignment_type.replaceAll("_", " ")}
                        </Badge>
                      </div>
                      <div className="mt-4 rounded-[20px] border border-border bg-background p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Key achievements</p>
                        <ul className="mt-3 space-y-2">
                          {job.achievements.map((achievement, index) => (
                            <li key={`${job.id}-${index}`} className="text-sm leading-6 text-foreground">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  ))
                ) : (
                  <SectionEmptyState
                    title="Riwayat karier belum tersedia"
                    description="Timeline penugasan dan pencapaian kandidat akan tampil di sini setelah data karier dimuat."
                  />
                )}
              </TabsContent>

              <TabsContent value="qualification" className="mt-0 space-y-6">
                <div className="grid gap-6">
                  <Card className="rounded-[24px] border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <h3 className="text-base font-semibold text-foreground">Education</h3>
                    </div>
                    <div className="mt-4 space-y-3">
                      {candidate.education.length > 0 ? (
                        candidate.education.map((education, index) => (
                          <div key={`${education.institution}-${index}`} className="rounded-[20px] border border-border bg-background p-4">
                            <p className="text-sm font-semibold text-foreground">{education.degree}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{education.institution}</p>
                            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>Year {education.year}</span>
                              <span>GPA {education.gpa}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <SectionEmptyState
                          title="Pendidikan belum tersedia"
                          description="Informasi pendidikan formal kandidat akan tampil pada bagian ini."
                        />
                      )}
                    </div>
                  </Card>

                  <Card className="rounded-[24px] border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <h3 className="text-base font-semibold text-foreground">Certifications</h3>
                    </div>
                    <div className="mt-4 space-y-3">
                      {candidate.certifications.length > 0 ? (
                        candidate.certifications.map((certification, index) => (
                          <div key={`${certification.name}-${index}`} className="rounded-[20px] border border-border bg-background p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{certification.name}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{certification.issuer}</p>
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "w-fit px-2.5 py-1 font-medium",
                                  certification.status === "valid"
                                    ? "border-success/20 bg-success-muted/80 text-success"
                                    : "border-destructive/20 bg-destructive/10 text-destructive",
                                )}
                              >
                                {certification.status}
                              </Badge>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">Validity {certification.validity}</p>
                          </div>
                        ))
                      ) : (
                        <SectionEmptyState
                          title="Sertifikasi belum tersedia"
                          description="Data lisensi dan sertifikasi profesional kandidat akan muncul di sini."
                        />
                      )}
                    </div>
                  </Card>

                  <Card className="rounded-[24px] border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <h3 className="text-base font-semibold text-foreground">Training</h3>
                    </div>
                    <div className="mt-4 space-y-3">
                      {candidate.training.length > 0 ? (
                        candidate.training.map((training, index) => (
                          <div key={`${training.name}-${index}`} className="rounded-[20px] border border-border bg-background p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{training.name}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{training.provider}</p>
                              </div>
                              <Badge variant="outline" className="w-fit px-2.5 py-1 font-medium capitalize text-muted-foreground">
                                {training.status.replaceAll("_", " ")}
                              </Badge>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>{training.hours} hours</span>
                              {training.score !== undefined ? <span>Score {training.score}</span> : null}
                            </div>
                          </div>
                        ))
                      ) : (
                        <SectionEmptyState
                          title="Pelatihan belum tersedia"
                          description="Riwayat pelatihan kandidat akan tampil ketika datanya sudah dilengkapi."
                        />
                      )}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="aspiration" className="mt-0 space-y-6">
                <Card className="rounded-[24px] border-border bg-card p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Aspiration score</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight text-primary">{candidate.aspiration.score}</span>
                        <span className="text-sm font-medium text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary">
                      Talent aspiration
                    </Badge>
                  </div>
                  <Progress value={candidate.aspiration.score} className="mt-5 h-2" />
                </Card>

                <div className="grid gap-4">
                  {[
                    { label: "Individual aspiration", value: candidate.aspiration.individual ?? "Belum ada aspirasi individu yang tercatat." },
                    { label: "Supervisor recommendation", value: candidate.aspiration.supervisor ?? "Belum ada rekomendasi atasan yang tercatat." },
                    { label: "Unit recommendation", value: candidate.aspiration.unit ?? "Belum ada rekomendasi unit yang tercatat." },
                  ].map((entry) => (
                    <Card key={entry.label} className="rounded-[24px] border-border bg-card p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{entry.label}</p>
                      <p className="mt-3 text-sm leading-6 text-foreground">{entry.value}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="personal" className="mt-0 space-y-6">
                <Card className="rounded-[24px] border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-semibold text-foreground">Basic information</h3>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <DetailField label="Date of birth" value={candidate.personal_info.dob} />
                    <DetailField label="Gender" value={candidate.personal_info.gender} />
                    <DetailField label="Hire date" value={candidate.personal_info.hire_date} />
                    <DetailField label="Grade" value={candidate.grade} />
                  </div>
                </Card>

                <Card className="rounded-[24px] border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-semibold text-foreground">Contact details</h3>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3 text-sm text-foreground">
                      <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <span>{candidate.personal_info.email}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-foreground">
                      <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <span>{candidate.personal_info.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <span>{candidate.personal_info.address}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-foreground">
                      <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <span>Joined {candidate.personal_info.hire_date}</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>

        <div className="border-t border-border bg-background px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={onClose}>
              <Target className="mr-2 h-4 w-4" />
              Shortlist
            </Button>
            <Button variant="outline" className="flex-1 border-border">
              View History
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
