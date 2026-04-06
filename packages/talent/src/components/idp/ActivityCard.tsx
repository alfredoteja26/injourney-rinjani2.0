import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, AlertCircle, CheckCircle2, Circle, PlayCircle, FileText } from "lucide-react";
import { cn } from "@/components/ui/utils";

export interface Activity {
  id: string;
  title: string;
  type: 'lms_course' | 'custom_activity';
  status: 'not_started' | 'in_progress' | 'completed';
  duration_hours: number;
  target_date: string;
  priority: 'high' | 'medium' | 'low';
  course_code?: string;
  thumbnail_url?: string;
}

interface ActivityCardProps {
  activity: Activity;
  className?: string;
  onClick?: () => void;
}

export function ActivityCard({ activity, className, onClick }: ActivityCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-emerald-600 fill-emerald-100" size={20} />;
      case 'in_progress': return <PlayCircle className="text-blue-500 fill-blue-50" size={20} />; 
      default: return <Circle className="text-muted-foreground" size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return "text-destructive bg-destructive/10 border-destructive/20";
      case 'medium': return "text-amber-600 bg-amber-50 border-amber-100";
      case 'low': return "text-muted-foreground bg-muted border-border";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <Card 
      className={cn(
        "group hover:shadow-lg transition-all duration-300 border border-border overflow-hidden bg-card flex flex-col h-full rounded-xl cursor-pointer", 
        className
      )}
      onClick={onClick}
    >
        {/* Thumbnail Section */}
        <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
            {activity.thumbnail_url ? (
            <img 
                src={activity.thumbnail_url} 
                alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary opacity-50">
                {activity.type === 'custom_activity' ? (
                <FileText className="w-12 h-12" />
                ) : (
                <BookOpen className="w-12 h-12" />
                )}
            </div>
            )}
            
            {/* Status Badge Overlay */}
            <div className="absolute top-3 left-3 z-10">
                <Badge 
                variant="default"
                className={cn("shadow-sm border-0 backdrop-blur-md", 
                    activity.status === 'completed' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 
                    activity.status === 'in_progress' ? 'bg-blue-500 text-white hover:bg-blue-600' : 
                    'bg-slate-800/70 text-white hover:bg-slate-800/80'
                )}
                >
                {activity.status === 'completed' ? 'Selesai' : 
                    activity.status === 'in_progress' ? 'Sedang Berjalan' : 'Belum Dimulai'}
                </Badge>
            </div>
        </div>

      <CardContent className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center justify-between mb-1">
            <Badge variant="outline" className="font-mono text-[10px] bg-muted border-border text-muted-foreground">
                {activity.course_code || "CUSTOM"}
            </Badge>
            <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider h-5 px-1.5", getPriorityColor(activity.priority))}>
                {activity.priority}
            </Badge>
        </div>

        <h4 className="font-sans font-bold text-base text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {activity.title}
        </h4>
        
        <div className="mt-auto pt-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
            <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{activity.duration_hours} jam</span>
            </div>
            <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{formatDate(activity.target_date)}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
