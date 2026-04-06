import React, { useState } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  ChevronLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { IDPView } from './IDPMain';
import { mockCompetencyGaps, mockEmployees, mockCourses } from '../../data/idpData';
import { CompetencyGapItem } from '../../types/idp';

interface GapAnalysisViewProps {
  onNavigate: (view: IDPView) => void;
}

export function GapAnalysisView({ onNavigate }: GapAnalysisViewProps) {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [showGapsOnly, setShowGapsOnly] = useState(false);
  const [expandedGapId, setExpandedGapId] = useState<string | null>(null);

  const employee = mockEmployees[0];
  const competencyGap = mockCompetencyGaps[0];

  // Prepare data for chart
  const chartData = competencyGap.competencies
    .filter(c => selectedCluster === 'all' || c.cluster === selectedCluster)
    .map(c => ({
      subject: c.competency_name,
      A: c.current_level,
      B: c.required_level,
      fullMark: 5,
    }));

  // Filter list data
  const filteredGaps = competencyGap.competencies.filter(c => {
    const clusterMatch = selectedCluster === 'all' || c.cluster === selectedCluster;
    const gapMatch = showGapsOnly ? c.gap > 0 : true;
    return clusterMatch && gapMatch;
  });

  const gapsNeedingDevelopment = filteredGaps.filter(c => c.gap > 0);
  const achievedCompetencies = filteredGaps.filter(c => c.gap === 0);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'significant': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'minor': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'none': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRecommendedCourses = (competencyId: string) => {
    return mockCourses.filter(course => 
      course.competencies?.some(cc => cc.competency_id === competencyId)
    ).slice(0, 2);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 h-full flex flex-col bg-background font-sans">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('DASHBOARD')}
          className="w-fit p-0 hover:bg-transparent text-muted-foreground"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gap Analysis</h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <span>Posisi: <span className="font-medium text-foreground">{employee.current_position_title}</span></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Info className="h-3 w-3" />
                Berdasarkan assessment terakhir: Jan 2026
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-background border-border text-foreground hover:bg-muted">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => onNavigate('RECOMMENDATIONS')} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Lihat Rekomendasi Kursus
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border border-border">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select value={selectedCluster} onValueChange={setSelectedCluster}>
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Select Cluster" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Cluster</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="leadership">Leadership</SelectItem>
              <SelectItem value="soft_skills">Soft Skills</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Switch 
            id="show-gaps" 
            checked={showGapsOnly}
            onCheckedChange={setShowGapsOnly}
          />
          <Label htmlFor="show-gaps" className="text-foreground">Tampilkan hanya gap ≥ 1</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1">
        {/* Radar Chart */}
        <Card className="lg:col-span-2 h-fit border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Competency Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                  <Radar
                    name="Current Level"
                    dataKey="A"
                    stroke="#00495d"
                    fill="#00495d"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Required Level"
                    dataKey="B"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.1}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary opacity-30"></div>
                <span className="text-foreground">Current Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500 opacity-20"></div>
                <span className="text-foreground">Required Level</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gap List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Gaps Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Perlu Pengembangan ({gapsNeedingDevelopment.length})
            </h2>
            <div className="space-y-3">
              {gapsNeedingDevelopment.map((gap) => (
                <GapCard 
                  key={gap.competency_id} 
                  gap={gap} 
                  isExpanded={expandedGapId === gap.competency_id}
                  onToggle={() => setExpandedGapId(expandedGapId === gap.competency_id ? null : gap.competency_id)}
                  getSeverityColor={getSeverityColor}
                  courses={getRecommendedCourses(gap.competency_id)}
                  onNavigate={onNavigate}
                />
              ))}
              {gapsNeedingDevelopment.length === 0 && (
                <div className="text-center py-8 text-muted-foreground bg-muted rounded-lg">
                  Tidak ada kompetensi yang membutuhkan pengembangan di kategori ini.
                </div>
              )}
            </div>
          </div>

          {/* Achieved Section */}
          {!showGapsOnly && achievedCompetencies.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Sudah Tercapai ({achievedCompetencies.length})
              </h2>
              <div className="space-y-3 opacity-70 hover:opacity-100 transition-opacity">
                {achievedCompetencies.map((gap) => (
                  <Card key={gap.competency_id} className="border-border bg-card">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{gap.competency_name}</h3>
                        <p className="text-sm text-muted-foreground">Level {gap.current_level} / {gap.required_level}</p>
                      </div>
                      <Badge className="bg-green-50 text-green-700 border-green-200">Met</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GapCard({ 
  gap, 
  isExpanded, 
  onToggle, 
  getSeverityColor, 
  courses,
  onNavigate
}: { 
  gap: CompetencyGapItem, 
  isExpanded: boolean, 
  onToggle: () => void, 
  getSeverityColor: (s: string) => string,
  courses: any[],
  onNavigate: (view: IDPView) => void
}) {
  return (
    <Card className={`border-border bg-card transition-all ${isExpanded ? 'ring-1 ring-primary border-primary' : ''}`}>
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted transition-colors rounded-t-lg"
        onClick={onToggle}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-medium text-foreground">{gap.competency_name}</h3>
            <Badge variant="outline" className={getSeverityColor(gap.gap_severity)}>
              Gap: {gap.gap} Level
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Current: <span className="font-medium text-foreground">{gap.current_level}</span></span>
            <span>Target: <span className="font-medium text-foreground">{gap.required_level}</span></span>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-2">
          <Separator className="mb-4 bg-border" />
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2 text-foreground">Rekomendasi Kursus</h4>
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courses.map(course => (
                    <div key={course.id} className="border border-border rounded-md p-3 flex gap-3 hover:bg-muted cursor-pointer" onClick={() => onNavigate('RECOMMENDATIONS')}>
                      <div className="h-12 w-12 rounded bg-muted flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${course.thumbnail_url})` }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-foreground">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.duration_hours} jam • {course.format}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada rekomendasi kursus spesifik untuk kompetensi ini.</p>
              )}
            </div>
            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => onNavigate('EDITOR')} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Tambahkan ke IDP
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
