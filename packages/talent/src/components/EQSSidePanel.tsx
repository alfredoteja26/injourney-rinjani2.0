import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { X, Download, Briefcase, Award, Target, User, Clock, MapPin, Mail, Phone, Heart, Linkedin, Twitter, Instagram, CheckCircle2 } from "lucide-react";
import type { CandidateData } from "../types/talent";
import { 
  getScoreColorClass, 
  getProgressBarColorByComponent, 
  ASPIRATION_WEIGHTS 
} from "../utils/eqsCalculation";

interface EQSSidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: CandidateData | null;
}

export function EQSSidePanel({ open, onOpenChange, candidate }: EQSSidePanelProps) {
  if (!candidate || !candidate.eqs) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl p-0" aria-describedby="employee-profile-description">
        {/* Accessibility - Hidden from visual but accessible to screen readers */}
        <SheetTitle className="sr-only">
          Employee Profile - {candidate.name}
        </SheetTitle>
        <SheetDescription className="sr-only" id="employee-profile-description">
          Comprehensive profile information including EQS breakdown, career history, qualifications, aspirations, and personal information for {candidate.name}
        </SheetDescription>
        
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10">
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={candidate.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2>{candidate.name}</h2>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {candidate.employeeId} • {candidate.currentPosition}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    {candidate.currentCompany}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="eqs" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-6 h-auto p-0">
              <TabsTrigger 
                value="eqs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                EQS Breakdown
              </TabsTrigger>
              <TabsTrigger 
                value="career-history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Career History
              </TabsTrigger>
              <TabsTrigger 
                value="qualifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Qualifications
              </TabsTrigger>
              <TabsTrigger 
                value="career-aspiration"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Career Aspiration
              </TabsTrigger>
              <TabsTrigger 
                value="personal-info"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Personal Info
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: EQS Breakdown */}
            <TabsContent value="eqs" className="mt-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-6 space-y-6">
                  {/* Overall Score */}
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                      Total EQS Score
                    </p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span 
                        className={getScoreColorClass(candidate.eqs.total, 90)}
                        style={{ fontSize: '56px', fontWeight: 'var(--font-weight-semibold)', lineHeight: '1' }}
                      >
                        {candidate.eqs.total.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-2xl)' }}>/90</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4 gap-2">
                      <Download className="w-4 h-4" />
                      Export PDF
                    </Button>
                  </div>

                  {/* Component Breakdown */}
                  <div className="space-y-5">
                    {/* 1. Kinerja (20%) */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Kinerja
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            (Bobot: 20%)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={getScoreColorClass(candidate.eqs.performance, 120)} 
                                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            {candidate.eqs.performance.toFixed(1)}/120
                          </span>
                          <span className="text-muted-foreground ml-2" style={{ fontSize: 'var(--text-sm)' }}>
                            → {candidate.eqs.contributions.performance.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${Math.min(100, (candidate.eqs.performance / 120) * 100)}%`,
                            ...getProgressBarColorByComponent('performance', candidate.eqs.performance, 120)
                          }}
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Rata-rata 3 tahun: {candidate.performanceHistory.map(p => p.rating).join(', ')}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Raw Score: {candidate.eqs.performance.toFixed(1)} × 20% = {candidate.eqs.contributions.performance.toFixed(2)} poin
                        </p>
                      </div>
                    </div>

                    {/* 2. Kompetensi (20%) */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Kompetensi
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            (Bobot: 20%)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={getScoreColorClass(candidate.eqs.competency)} 
                                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            {candidate.eqs.competency.toFixed(1)}/100
                          </span>
                          <span className="text-muted-foreground ml-2" style={{ fontSize: 'var(--text-sm)' }}>
                            → {candidate.eqs.contributions.competency.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${candidate.eqs.competency}%`,
                            ...getProgressBarColorByComponent('competency', candidate.eqs.competency, 100)
                          }}
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Job Fit Score dari Competency Assessment
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Raw Score: {candidate.eqs.competency.toFixed(1)} × 20% = {candidate.eqs.contributions.competency.toFixed(2)} poin
                        </p>
                      </div>
                    </div>

                    {/* 3. Pengalaman (20%) */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Pengalaman Job Family
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            (Bobot: 20%)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={getScoreColorClass(candidate.eqs.experience)} 
                                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            {candidate.eqs.experience.toFixed(1)}/100
                          </span>
                          <span className="text-muted-foreground ml-2" style={{ fontSize: 'var(--text-sm)' }}>
                            → {candidate.eqs.contributions.experience.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${candidate.eqs.experience}%`,
                            ...getProgressBarColorByComponent('experience', candidate.eqs.experience, 100)
                          }}
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          {candidate.experience.yearsInJobFamily} tahun di {candidate.currentJobFamily}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Raw Score: {candidate.eqs.experience.toFixed(1)} × 20% = {candidate.eqs.contributions.experience.toFixed(2)} poin
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Calculation: ({candidate.experience.yearsInJobFamily} years × 10) + unit bonus
                        </p>
                      </div>
                    </div>

                    {/* 4. Aspirasi (10%) */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Aspirasi
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            (Bobot: 10%)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={getScoreColorClass(candidate.eqs.aspiration)} 
                                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            {candidate.eqs.aspiration.toFixed(1)}/100
                          </span>
                          <span className="text-muted-foreground ml-2" style={{ fontSize: 'var(--text-sm)' }}>
                            → {candidate.eqs.contributions.aspiration.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${candidate.eqs.aspiration}%`,
                            ...getProgressBarColorByComponent('aspiration', candidate.eqs.aspiration, 100)
                          }}
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Accumulated Sources: <strong>{
                            candidate.aspirations.sources.length > 0 ? candidate.aspirations.sources.join(', ') : 'None'
                          }</strong>
                        </p>
                        {candidate.aspirations.sources.includes('INDIVIDUAL') && (
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            • Individual Aspiration: +20 poin
                          </p>
                        )}
                        {candidate.aspirations.sources.includes('SUPERVISOR') && (
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            • Supervisor Aspiration: +30 poin
                          </p>
                        )}
                        {candidate.aspirations.sources.includes('JOB_HOLDER') && (
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            • Job Holder Aspiration: +25 poin
                          </p>
                        )}
                        {candidate.aspirations.sources.includes('UNIT') && (
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            • Unit Aspiration: +25 poin
                          </p>
                        )}
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Total: {
                            candidate.aspirations.sources.reduce((sum, current) => sum + (ASPIRATION_WEIGHTS[current] || 0), 0)
                          } poin (capped at 100)
                        </p>
                      </div>
                    </div>

                    {/* 5. Pelatihan & Sertifikasi (10%) */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Pelatihan & Sertifikasi
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            (Bobot: 10%)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={getScoreColorClass(candidate.eqs.training)} 
                                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            {candidate.eqs.training.toFixed(1)}/100
                          </span>
                          <span className="text-muted-foreground ml-2" style={{ fontSize: 'var(--text-sm)' }}>
                            → {candidate.eqs.contributions.training.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${candidate.eqs.training}%`,
                            ...getProgressBarColorByComponent('training', candidate.eqs.training, 100)
                          }}
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          • Pelatihan Penjenjangan: {candidate.training.hasRelevantTraining ? '✓ (50 poin)' : '✗ (0 poin)'} 
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          • Sertifikasi Relevan: {candidate.training.hasRelevantCertification ? '✓ (50 poin)' : '✗ (0 poin)'}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Raw Score: {candidate.eqs.training.toFixed(1)} × 10% = {candidate.eqs.contributions.training.toFixed(2)} poin
                        </p>
                      </div>
                    </div>

                    {/* 6. TES - Talent Evaluation Score (10%) */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            TES (Talent Evaluation Score)
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            (Bobot: 10%)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={getScoreColorClass(candidate.eqs.tes)} 
                                style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                            {candidate.eqs.tes.toFixed(1)}/100
                          </span>
                          <span className="text-muted-foreground ml-2" style={{ fontSize: 'var(--text-sm)' }}>
                            → {candidate.eqs.contributions.tes.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${candidate.eqs.tes}%`,
                            ...getProgressBarColorByComponent('tes', candidate.eqs.tes, 100)
                          }}
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          Skor evaluasi talenta dari TES Engine dengan komponen:
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          • Potensi Kepemimpinan (max 25 poin)
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          • Change Champion Contribution (max 20 poin)
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          • Innovation & Problem Solving (max 20 poin)
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          • Collaboration & Teamwork (max 15 poin)
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          • Strategic Thinking (max 20 poin)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* TAB 2: Career History */}
            <TabsContent value="career-history" className="mt-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="mb-4">Riwayat Penugasan</h3>
                    
                    {candidate.careerHistory && candidate.careerHistory.length > 0 ? (
                      <div className="relative space-y-4 before:absolute before:left-[21px] before:top-2 before:h-[calc(100%-32px)] before:w-0.5 before:bg-border">
                        {candidate.careerHistory.map((assignment, index) => (
                          <div key={assignment.id} className="relative pl-12">
                            {/* Timeline dot */}
                            <div className="absolute left-0 top-2 w-11 h-11 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                              <Briefcase className="w-5 h-5 text-primary" />
                            </div>
                            
                            <div className="p-4 border border-border rounded-lg bg-card">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    {assignment.positionTitle}
                                  </h4>
                                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                    {assignment.company} • {assignment.department}
                                  </p>
                                </div>
                                <Badge variant={assignment.type === "Definitif" ? "default" : "secondary"}>
                                  {assignment.type}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-4 text-muted-foreground mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {assignment.startDate} - {assignment.endDate}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {assignment.location}
                                </div>
                                <Badge variant="outline" style={{ fontSize: 'var(--text-xs)' }}>
                                  {assignment.grade}
                                </Badge>
                              </div>
                              
                              {assignment.supervisor && (
                                <p className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                                  Supervisor: {assignment.supervisor}
                                </p>
                              )}
                              
                              {assignment.keyAchievements && assignment.keyAchievements.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-border">
                                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="mb-2">
                                    Key Achievements:
                                  </p>
                                  <ul className="space-y-1">
                                    {assignment.keyAchievements.map((achievement, idx) => (
                                      <li key={idx} className="text-muted-foreground flex items-start gap-2" style={{ fontSize: 'var(--text-xs)' }}>
                                        <span className="text-green-600 mt-0.5">✓</span>
                                        <span>{achievement}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No career history available</p>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* TAB 3: Qualifications */}
            <TabsContent value="qualifications" className="mt-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-6 space-y-6">
                  {/* Education */}
                  <div>
                    <h3 className="mb-4">Riwayat Pendidikan</h3>
                    {candidate.educationRecords && candidate.educationRecords.length > 0 ? (
                      <div className="space-y-3">
                        {candidate.educationRecords.map((edu) => (
                          <div key={edu.id} className="p-4 border border-border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {edu.level}
                                </h4>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                  {edu.institution}
                                </p>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  {edu.major} • Graduated {edu.graduationYear}
                                </p>
                              </div>
                              {edu.gpa && (
                                <div className="text-right">
                                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    GPA: {edu.gpa.toFixed(2)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No education records</p>
                    )}
                  </div>

                  {/* Training */}
                  <div>
                    <h3 className="mb-4">Riwayat Pelatihan InJourney</h3>
                    {candidate.trainingRecords && candidate.trainingRecords.length > 0 ? (
                      <div className="space-y-3">
                        {candidate.trainingRecords.map((training) => (
                          <div key={training.id} className="p-4 border border-border rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {training.name}
                                </h4>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                  {training.provider} • {training.type}
                                </p>
                              </div>
                              <Badge variant={training.status === "Completed" ? "default" : "secondary"}>
                                {training.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              <span>{training.duration} hours</span>
                              <span>{new Date(training.startDate).toLocaleDateString('id-ID')} - {new Date(training.endDate).toLocaleDateString('id-ID')}</span>
                              {training.score && <span>Score: {training.score}/100</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No training records</p>
                    )}
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="mb-4">Sertifikasi</h3>
                    {candidate.certificationRecords && candidate.certificationRecords.length > 0 ? (
                      <div className="space-y-3">
                        {candidate.certificationRecords.map((cert) => (
                          <div key={cert.id} className="p-4 border border-border rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {cert.name}
                                </h4>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                  Issued by {cert.issuer}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge variant={cert.status === "Valid" ? "default" : cert.status === "Expired" ? "destructive" : "secondary"}>
                                  {cert.status}
                                </Badge>
                                {cert.isRelevant && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Relevant
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-muted-foreground space-y-1" style={{ fontSize: 'var(--text-xs)' }}>
                              <p>Issue Date: {new Date(cert.issueDate).toLocaleDateString('id-ID')}</p>
                              {cert.expiryDate && <p>Expiry Date: {new Date(cert.expiryDate).toLocaleDateString('id-ID')}</p>}
                              {cert.credentialId && <p>Credential ID: {cert.credentialId}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No certifications</p>
                    )}
                  </div>

                  {/* Awards */}
                  <div>
                    <h3 className="mb-4">Penghargaan</h3>
                    {candidate.awardRecords && candidate.awardRecords.length > 0 ? (
                      <div className="space-y-3">
                        {candidate.awardRecords.map((award) => (
                          <div key={award.id} className="p-4 border border-border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                <Award className="w-5 h-5 text-yellow-700" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    {award.name}
                                  </h4>
                                  <Badge variant="outline">{award.level}</Badge>
                                </div>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                  {award.issuer} • {award.category} • {award.year}
                                </p>
                                {award.description && (
                                  <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-sm)' }}>
                                    {award.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No awards</p>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* TAB 4: Career Aspiration */}
            <TabsContent value="career-aspiration" className="mt-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-6 space-y-6">
                  {/* Aspiration Score Breakdown */}
                  <div className="p-4 border border-border rounded-lg bg-card">
                    <h3 className="mb-4">Aspiration Score Calculation</h3>
                    <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                      Skor aspirasi merupakan akumulasi dari semua sumber aspirasi yang tersedia (Max 100).
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(ASPIRATION_WEIGHTS).map(([source, weight]) => {
                        const isActive = candidate.aspirations.sources.includes(source as any);
                        
                        return (
                          <div 
                            key={source} 
                            className={`p-3 rounded-md border ${
                              isActive 
                                ? 'bg-[var(--color-success-light)] border-[var(--color-success)]' 
                                : 'bg-[var(--color-muted)] border-border opacity-60'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                {source}
                              </span>
                              {isActive && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />}
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                                {weight}
                              </span>
                              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>pts</span>
                            </div>
                            <div className={`mt-2 text-xs px-2 py-0.5 rounded-full inline-block ${
                              isActive ? 'bg-[var(--color-success-light)] text-[var(--color-success)]' : 'bg-muted text-muted-foreground'
                            }`}>
                              {isActive ? 'Applied' : 'Missing'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                      <span className="text-sm font-medium">Total Score</span>
                      <span className="text-2xl font-bold text-primary">
                        {Math.min(100, candidate.aspirations.sources.reduce((sum, src) => sum + (ASPIRATION_WEIGHTS[src] || 0), 0))}
                        <span className="text-sm text-muted-foreground font-normal ml-1">/ 100</span>
                      </span>
                    </div>
                  </div>

                  {/* InJourney Aspirations */}
                  <div>
                    <h3 className="mb-4">Aspirasi Karir InJourney</h3>
                    {candidate.careerAspirationInJourney && candidate.careerAspirationInJourney.length > 0 ? (
                      <div className="space-y-3">
                        {candidate.careerAspirationInJourney.map((aspiration) => (
                          <div key={aspiration.id} className="p-4 border border-border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center shrink-0">
                                <Target className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    {aspiration.targetPosition}
                                  </h4>
                                  <Badge variant={aspiration.status === "Active" ? "default" : "secondary"}>
                                    {aspiration.status}
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                  {aspiration.targetCompany} • {aspiration.targetDepartment}
                                </p>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  Grade: {aspiration.targetGrade} • Timeframe: {aspiration.timeframe}
                                </p>
                                
                                {aspiration.mentor && (
                                  <div className="mt-3 pt-3 border-t border-border">
                                    <p style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">
                                      Mentor: {aspiration.mentor}
                                    </p>
                                  </div>
                                )}
                                
                                {aspiration.developmentPlan && aspiration.developmentPlan.length > 0 && (
                                  <div className="mt-3 pt-3 border-t border-border">
                                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="mb-2">
                                      Development Plan:
                                    </p>
                                    <ul className="space-y-1">
                                      {aspiration.developmentPlan.map((plan, idx) => (
                                        <li key={idx} className="text-muted-foreground flex items-start gap-2" style={{ fontSize: 'var(--text-xs)' }}>
                                          <span className="text-primary mt-0.5">•</span>
                                          <span>{plan}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-xs)' }}>
                                  Submitted: {new Date(aspiration.submittedDate).toLocaleDateString('id-ID')} • 
                                  Last Updated: {new Date(aspiration.lastUpdated).toLocaleDateString('id-ID')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No InJourney aspirations</p>
                    )}
                  </div>

                  {/* BUMN Aspiration */}
                  {candidate.careerAspirationBUMN && (
                    <div>
                      <h3 className="mb-4">Aspirasi Karir BUMN</h3>
                      <div className="p-4 border border-border rounded-lg bg-[var(--color-muted)]">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <Briefcase className="w-5 h-5 text-blue-700" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                                {candidate.careerAspirationBUMN.targetPosition}
                              </h4>
                              <Badge variant="outline">{candidate.careerAspirationBUMN.status}</Badge>
                            </div>
                            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                              {candidate.careerAspirationBUMN.targetBUMN}
                            </p>
                            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              Ministry: {candidate.careerAspirationBUMN.targetMinistry} • Readiness: {candidate.careerAspirationBUMN.readiness}
                            </p>
                            
                            {candidate.careerAspirationBUMN.notes && (
                              <div className="mt-3 pt-3 border-t border-border">
                                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }} className="mb-1">
                                  Notes:
                                </p>
                                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                  {candidate.careerAspirationBUMN.notes}
                                </p>
                              </div>
                            )}
                            
                            {candidate.careerAspirationBUMN.reviewer && (
                              <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-xs)' }}>
                                Reviewer: {candidate.careerAspirationBUMN.reviewer}
                              </p>
                            )}
                            
                            <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                              Submitted: {new Date(candidate.careerAspirationBUMN.submittedDate).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Personal Values & Vision */}
                  {candidate.personalValuesVision && (
                    <div>
                      <h3 className="mb-4">Nilai dan Visi Pribadi</h3>
                      <div className="space-y-4">
                        {/* Core Values */}
                        <div className="p-4 border border-border rounded-lg">
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="mb-2">
                            Core Values
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.personalValuesVision.coreValues.map((value, idx) => (
                              <Badge key={idx} variant="outline">{value}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Career Vision */}
                        <div className="p-4 border border-border rounded-lg">
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="mb-2">
                            Career Vision
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            {candidate.personalValuesVision.careerVision}
                          </p>
                        </div>
                        
                        {/* Personal Mission */}
                        <div className="p-4 border border-border rounded-lg">
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="mb-2">
                            Personal Mission
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            {candidate.personalValuesVision.personalMission}
                          </p>
                        </div>
                        
                        {/* Work Style */}
                        <div className="p-4 border border-border rounded-lg">
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="mb-2">
                            Work Style
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.personalValuesVision.workStyle.map((style, idx) => (
                              <Badge key={idx} variant="secondary">{style}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Motivators */}
                        <div className="p-4 border border-border rounded-lg">
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }} className="mb-2">
                            Motivators
                          </p>
                          <ul className="space-y-1">
                            {candidate.personalValuesVision.motivators.map((motivator, idx) => (
                              <li key={idx} className="text-muted-foreground flex items-start gap-2" style={{ fontSize: 'var(--text-sm)' }}>
                                <Heart className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                <span>{motivator}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* TAB 5: Personal Info */}
            <TabsContent value="personal-info" className="mt-0">
              <ScrollArea className="h-[calc(100vh-220px)]">
                {candidate.personalInfo && (
                  <div className="p-6 space-y-6">
                    {/* Identity */}
                    <div>
                      <h3 className="mb-4">Identitas</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Full Name</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.fullName}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>NIK</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.nik}
                            </p>
                          </div>
                          {candidate.personalInfo.nip && (
                            <div>
                              <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>NIP</p>
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                {candidate.personalInfo.nip}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Date of Birth</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {new Date(candidate.personalInfo.dateOfBirth).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Place of Birth</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.placeOfBirth}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Gender</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.gender}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Religion</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.religion}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Marital Status</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.maritalStatus}
                            </p>
                          </div>
                          {candidate.personalInfo.bloodType && (
                            <div>
                              <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Blood Type</p>
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                {candidate.personalInfo.bloodType}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Nationality</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.nationality}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="mb-4">Kontak</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Email (Corporate)</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.email}
                            </p>
                          </div>
                        </div>
                        {candidate.personalInfo.personalEmail && (
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Email (Personal)</p>
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                {candidate.personalInfo.personalEmail}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>Phone Number</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.phoneNumber}
                            </p>
                          </div>
                        </div>
                        {candidate.personalInfo.emergencyContact && (
                          <div className="p-3 bg-[var(--color-muted)] rounded-lg">
                            <p className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>Emergency Contact</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.emergencyContact.name} ({candidate.personalInfo.emergencyContact.relationship})
                            </p>
                            <p style={{ fontSize: 'var(--text-sm)' }} className="text-muted-foreground">
                              {candidate.personalInfo.emergencyContact.phone}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="mb-4">Alamat</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Current Address</p>
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                            {candidate.personalInfo.currentAddress}
                          </p>
                        </div>
                        {candidate.personalInfo.permanentAddress && candidate.personalInfo.permanentAddress !== candidate.personalInfo.currentAddress && (
                          <div>
                            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>Permanent Address</p>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {candidate.personalInfo.permanentAddress}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Family */}
                    {candidate.personalInfo.familyMembers && candidate.personalInfo.familyMembers.length > 0 && (
                      <div>
                        <h3 className="mb-4">Data Keluarga</h3>
                        <div className="space-y-3">
                          {candidate.personalInfo.familyMembers.map((member, idx) => (
                            <div key={idx} className="p-4 border border-border rounded-lg">
                              <div className="flex items-center gap-3 mb-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    {member.name}
                                  </p>
                                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                    {member.relationship}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                <span>DoB: {new Date(member.dateOfBirth).toLocaleDateString('id-ID')}</span>
                                {member.occupation && <span>• {member.occupation}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social Media */}
                    {candidate.personalInfo.socialMedia && (
                      <div>
                        <h3 className="mb-4">Media Sosial</h3>
                        <div className="space-y-3">
                          {candidate.personalInfo.socialMedia.linkedin && (
                            <div className="flex items-center gap-3">
                              <Linkedin className="w-4 h-4 text-blue-600" />
                              <a 
                                href={`https://${candidate.personalInfo.socialMedia.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                                style={{ fontSize: 'var(--text-sm)' }}
                              >
                                {candidate.personalInfo.socialMedia.linkedin}
                              </a>
                            </div>
                          )}
                          {candidate.personalInfo.socialMedia.twitter && (
                            <div className="flex items-center gap-3">
                              <Twitter className="w-4 h-4 text-blue-400" />
                              <a 
                                href={`https://twitter.com/${candidate.personalInfo.socialMedia.twitter.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                                style={{ fontSize: 'var(--text-sm)' }}
                              >
                                {candidate.personalInfo.socialMedia.twitter}
                              </a>
                            </div>
                          )}
                          {candidate.personalInfo.socialMedia.instagram && (
                            <div className="flex items-center gap-3">
                              <Instagram className="w-4 h-4 text-pink-600" />
                              <a 
                                href={`https://instagram.com/${candidate.personalInfo.socialMedia.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                                style={{ fontSize: 'var(--text-sm)' }}
                              >
                                {candidate.personalInfo.socialMedia.instagram}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
