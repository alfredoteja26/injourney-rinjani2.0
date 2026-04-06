import React from 'react';
import { 
  FileText, 
  Clock, 
  CheckSquare, 
  AlertTriangle, 
  ChevronRight,
  ClipboardList,
  Search,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { IDPView } from './IDPMain';
import { mockIDPCycles, mockIDPRecords, mockIDPActivities } from '../../data/idpData';

interface IDPDashboardProps {
  onNavigate: (view: IDPView) => void;
}

export function IDPDashboard({ onNavigate }: IDPDashboardProps) {
  // Use mock data for emp-001
  const activeCycle = mockIDPCycles[0];
  const currentIDP = mockIDPRecords[0];
  const activities = mockIDPActivities.filter(a => a.idp_record_id === currentIDP.id);
  
  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const totalActivities = activities.length;
  const progressPercentage = (currentIDP.completed_hours / currentIDP.total_hours) * 100;

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Approved</Badge>;
      case 'pending_approval': return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Pending Approval</Badge>;
      case 'draft': return <Badge className="bg-muted text-muted-foreground hover:bg-muted border-border">Draft</Badge>;
      case 'revision_requested': return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">Revision Requested</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-background font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Development Plan</h1>
          <p className="text-muted-foreground italic mb-3">"Kembangkan potensi terbaikmu"</p>
          
          <div className="flex items-center gap-3">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
              {activeCycle.name}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Deadline Submission: <span className="font-medium text-amber-600">28 Feb 2026</span>
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <Card className="shadow-sm border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">IDP Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(currentIDP.status)}
            </div>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(currentIDP.updated_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        {/* Hours Card */}
        <Card className="shadow-sm border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Development Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold text-foreground">{currentIDP.completed_hours}</span>
              <span className="text-sm text-muted-foreground">/ {currentIDP.total_hours} jam</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Min. {activeCycle.min_development_hours} jam</span>
              {currentIDP.total_hours < activeCycle.min_development_hours && (
                <span className="text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Below Minimum
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activities Card */}
        <Card className="shadow-sm border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Activities</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold text-foreground">{completedActivities}</span>
              <span className="text-sm text-muted-foreground">/ {totalActivities} aktivitas</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {activities.filter(a => a.status === 'in_progress').length} sedang berjalan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        {currentIDP.status === 'draft' || currentIDP.status === 'revision_requested' ? (
          <Button onClick={() => onNavigate('EDITOR')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Lanjutkan Draft
          </Button>
        ) : (
          <Button onClick={() => onNavigate('DETAIL')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Lihat IDP Saya
          </Button>
        )}
        
        <Button variant="outline" onClick={() => onNavigate('GAP_ANALYSIS')} className="border-primary text-primary hover:bg-primary/10">
          <ClipboardList className="mr-2 h-4 w-4" />
          Lihat Gap Analysis
        </Button>
        
        <Button variant="outline" onClick={() => onNavigate('CATALOG')} className="bg-background hover:bg-muted text-foreground border-border">
          <Search className="mr-2 h-4 w-4" />
          Jelajahi Kursus
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current IDP Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">IDP Saat Ini</h2>
          
          <Card className="border-border hover:border-primary transition-colors cursor-pointer bg-card" onClick={() => onNavigate('DETAIL')}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-primary">{activeCycle.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Submitted: {new Date(currentIDP.submitted_at || '').toLocaleDateString()}
                  </p>
                </div>
                {getStatusBadge(currentIDP.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 3).map((activity, index) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' : 
                        activity.status === 'in_progress' ? 'bg-amber-500' : 'bg-slate-300'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.activity_type === 'lms_course' ? 'LMS Course' : 'Custom Activity'} • {activity.duration_hours} jam
                        </p>
                      </div>
                    </div>
                    {activity.status === 'completed' && <CheckSquare className="h-4 w-4 text-green-600" />}
                  </div>
                ))}
                {activities.length > 3 && (
                  <p className="text-center text-sm text-muted-foreground">
                    + {activities.length - 3} aktivitas lainnya
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Timeline Periode</h2>
          <div className="relative border-l border-border ml-3 space-y-8 py-2">
            <div className="relative pl-6">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-green-500 ring-4 ring-white" />
              <p className="text-sm font-medium text-foreground">Pembukaan IDP</p>
              <p className="text-xs text-muted-foreground">{new Date(activeCycle.start_date).toLocaleDateString()}</p>
            </div>
            
            <div className="relative pl-6">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-white" />
              <p className="text-sm font-medium text-foreground">Batas Submission</p>
              <p className="text-xs text-muted-foreground">{new Date(activeCycle.submission_deadline).toLocaleDateString()}</p>
            </div>
            
            <div className="relative pl-6">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
              <p className="text-sm font-medium text-muted-foreground">Mid-year Review</p>
              <p className="text-xs text-muted-foreground">{new Date(activeCycle.midyear_checkpoint || '').toLocaleDateString()}</p>
            </div>
            
            <div className="relative pl-6">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
              <p className="text-sm font-medium text-muted-foreground">Penutupan Periode</p>
              <p className="text-xs text-muted-foreground">{new Date(activeCycle.end_date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
