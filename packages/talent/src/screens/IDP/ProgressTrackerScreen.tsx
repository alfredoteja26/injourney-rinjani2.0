import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  CircleDot,
  ExternalLink,
  Upload,
  AlertTriangle,
  Trophy,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Layout } from "../../components/shell/Layout";
import { 
  mockIDPCycles,
  mockIDPRecords,
  mockIDPActivities,
  mockEmployees 
} from "../../data/idpData";
import { toast } from "sonner@2.0.3";

export function ProgressTrackerScreen() {
  const activeCycle = mockIDPCycles.find(c => c.status === 'active');
  const currentEmployee = mockEmployees[0];
  const currentIDPRecord = mockIDPRecords.find(
    r => r.employee_id === currentEmployee.id && r.cycle_id === activeCycle?.id
  );

  const [activities, setActivities] = useState(
    currentIDPRecord 
      ? mockIDPActivities.filter(a => a.idp_record_id === currentIDPRecord.id)
      : []
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("target_date");

  if (!currentIDPRecord || currentIDPRecord.status !== 'approved') {
    return (
      <Layout>
        <div className="min-h-screen bg-muted/30 p-6">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold">
                IDP Belum Disetujui
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Progress tracking aktif setelah IDP disetujui oleh atasan.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const completedActivities = activities.filter(a => a.status === 'completed');
  const inProgressActivities = activities.filter(a => a.status === 'in_progress');
  const notStartedActivities = activities.filter(a => a.status === 'not_started');

  const overallProgress = activities.length > 0
    ? (completedActivities.length / activities.length) * 100
    : 0;

  const completedHours = completedActivities.reduce((sum, a) => sum + a.duration_hours, 0);
  const totalHours = currentIDPRecord.total_hours;
  const hoursProgress = (completedHours / totalHours) * 100;

  const isAllComplete = activities.length > 0 && completedActivities.length === activities.length;

  const filteredActivities = activities
    .filter(a => {
      if (filterStatus === "all") return true;
      return a.status === filterStatus;
    })
    .sort((a, b) => {
      if (sortBy === "target_date") {
        return new Date(a.target_date).getTime() - new Date(b.target_date).getTime();
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else {
        const statusOrder = { completed: 2, in_progress: 1, not_started: 0 };
        return statusOrder[b.status] - statusOrder[a.status];
      }
    });

  const handleStatusChange = (activityId: string, newStatus: string) => {
    setActivities(activities.map(a => 
      a.id === activityId 
        ? { ...a, status: newStatus as any, completion_date: newStatus === 'completed' ? new Date().toISOString() : a.completion_date }
        : a
    ));
    
    const activity = activities.find(a => a.id === activityId);
    if (newStatus === 'completed') {
      toast.success(`${activity?.title} ditandai selesai!`);
    } else if (newStatus === 'in_progress') {
      toast.success(`${activity?.title} dimulai`);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <CircleDot className="w-5 h-5 text-primary" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getDateIndicator = (targetDate: string, status: string) => {
    if (status === 'completed') return null;
    
    const today = new Date();
    const target = new Date(targetDate);
    const daysUntil = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) {
      return (
        <div className="flex items-center gap-1 text-red-600 text-xs">
          <AlertTriangle className="w-3 h-3" />
          Overdue
        </div>
      );
    } else if (daysUntil <= 7) {
      return (
        <div className="flex items-center gap-1 text-amber-600 text-xs">
          <AlertTriangle className="w-3 h-3" />
          Jatuh tempo dalam {daysUntil} hari
        </div>
      );
    } else {
      return (
        <div className="text-green-600 text-xs">
          On track
        </div>
      );
    }
  };

  const daysRemaining = Math.ceil(
    (new Date(activeCycle!.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const remainingHours = totalHours - completedHours;

  const getPaceIndicator = () => {
    if (isAllComplete) {
      return { label: 'Selesai!', color: 'text-green-600' };
    }
    
    const expectedProgress = ((365 - daysRemaining) / 365) * 100;
    
    if (overallProgress >= expectedProgress + 10) {
      return { label: 'Ahead of schedule', color: 'text-primary' };
    } else if (overallProgress < expectedProgress - 10) {
      return { label: 'Falling behind', color: 'text-amber-600' };
    } else {
      return { label: 'On track', color: 'text-green-600' };
    }
  };

  const pace = getPaceIndicator();

  if (isAllComplete) {
    return (
      <Layout>
        <div className="min-h-screen bg-muted/30 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-green-500">
              <CardContent className="p-12 text-center">
                <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
                <h1 className="text-3xl font-bold">
                  Selamat!
                </h1>
                <h2 className="text-xl font-semibold mt-2">
                  Anda telah menyelesaikan semua aktivitas IDP
                </h2>
                <p className="text-muted-foreground mt-4 text-sm">
                  Total {completedActivities.length} aktivitas · {completedHours} jam pengembangan
                </p>
                
                <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl mx-auto">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">
                      {completedActivities.length}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Aktivitas Selesai
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">
                      {completedHours}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Jam Tercapai
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">
                      {daysRemaining}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Hari Tersisa
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header with Progress Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="var(--muted)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#00495d"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallProgress / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {Math.round(overallProgress)}%
                        </div>
                        <div className="text-muted-foreground text-xs">
                          selesai
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h1 className="text-2xl font-semibold">
                    Progress IDP {activeCycle?.name}
                  </h1>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Jam Selesai
                      </p>
                      <div className="text-xl font-bold">
                        {completedHours} / {totalHours} jam
                      </div>
                      <Progress value={hoursProgress} className="h-2 mt-2" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Aktivitas Selesai
                      </p>
                      <div className="text-xl font-bold">
                        {completedActivities.length} / {activities.length} aktivitas
                      </div>
                      <Progress value={overallProgress} className="h-2 mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <Tabs value={filterStatus} onValueChange={setFilterStatus} className="flex-1">
              <TabsList>
                <TabsTrigger value="all">
                  Semua ({activities.length})
                </TabsTrigger>
                <TabsTrigger value="not_started">
                  Belum Mulai ({notStartedActivities.length})
                </TabsTrigger>
                <TabsTrigger value="in_progress">
                  Sedang Berjalan ({inProgressActivities.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Selesai ({completedActivities.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="target_date">Target Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Activity List */}
          <div className="space-y-3">
            {filteredActivities.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="pt-1">
                      {getStatusIcon(activity.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-semibold">
                              {activity.title}
                            </h3>
                            <Badge variant={activity.activity_type === 'lms_course' ? 'default' : 'outline'}>
                              {activity.activity_type === 'lms_course' ? 'LMS' : 'Custom'}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={
                                activity.priority === 'high'
                                  ? 'border-red-500 text-red-600'
                                  : activity.priority === 'medium'
                                  ? 'border-amber-500 text-amber-600'
                                  : ''
                              }
                            >
                              {activity.priority === 'high' ? 'Tinggi' : activity.priority === 'medium' ? 'Sedang' : 'Rendah'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-muted-foreground text-sm">
                            <span>{activity.duration_hours} jam</span>
                            <span>Target: {formatDate(activity.target_date)}</span>
                            {getDateIndicator(activity.target_date, activity.status)}
                          </div>
                        </div>
                      </div>

                      {activity.status === 'completed' && activity.completion_date && (
                        <div className="text-green-600 mb-2 text-sm">
                          ✓ Selesai pada {formatDate(activity.completion_date)}
                        </div>
                      )}

                      {activity.notes && (
                        <p className="text-muted-foreground mb-3 text-sm">
                          {activity.notes}
                        </p>
                      )}

                      {/* Status Update Buttons */}
                      <div className="flex gap-2">
                        {activity.status === 'not_started' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(activity.id, 'in_progress')}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            Mulai
                          </Button>
                        )}
                        {activity.status === 'in_progress' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(activity.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Tandai Selesai
                          </Button>
                        )}
                        {activity.activity_type === 'lms_course' && (
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Buka di LMS
                          </Button>
                        )}
                        {activity.activity_type === 'custom_activity' && activity.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-1" />
                            Upload Evidence
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {remainingHours}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Jam Tersisa
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {daysRemaining}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Hari hingga Penutupan
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${pace.color}`}>
                    {pace.label}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Pace Indicator
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
