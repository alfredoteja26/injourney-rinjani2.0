import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { 
  GripVertical, 
  Trash2, 
  Edit2, 
  BookOpen, 
  FileText, 
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

export interface DraggableActivityProps {
  id: string;
  index: number;
  activity: any; 
  moveActivity: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  validationError?: string;
}

const ItemTypes = {
  ACTIVITY: 'activity',
};

export function DraggableActivityCard({ 
  id, 
  index, 
  activity, 
  moveActivity,
  onDelete,
  onEdit,
  validationError
}: DraggableActivityProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.ACTIVITY,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveActivity(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ACTIVITY,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const opacity = isDragging ? 0.4 : 1;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Set Date";
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return "text-destructive bg-destructive/10 border-destructive/20";
      case 'medium': return "text-amber-600 bg-amber-50 border-amber-100";
      case 'low': return "text-muted-foreground bg-muted border-border";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  return (
    <Card 
      ref={ref} 
      style={{ opacity }} 
      data-handler-id={handlerId}
      className={cn(
        "mb-4 border cursor-default transition-all group hover:border-primary/50",
        validationError ? "border-destructive bg-destructive/5" : "border-border bg-card"
      )}
    >
      <CardContent className="p-4 flex items-start gap-4">
        {/* Drag Handle */}
        <div className="mt-2 cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing">
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Icon */}
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-1",
          activity.activity_type === 'lms_course' 
            ? "bg-primary/10 text-primary" 
            : "bg-blue-50 text-blue-600"
        )}>
          {activity.activity_type === 'lms_course' ? (
            <BookOpen className="w-5 h-5" />
          ) : (
            <FileText className="w-5 h-5" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {activity.activity_type === 'lms_course' && (
                   <Badge variant="outline" className="h-5 px-1.5 font-mono text-[10px] text-muted-foreground border-border bg-muted">
                     {activity.course_code || "LMS"}
                   </Badge>
                )}
                <h4 className="font-semibold text-foreground text-base truncate">
                  {activity.title}
                </h4>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activity.duration_hours} jam</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className={!activity.target_date ? "text-amber-600 font-medium" : ""}>
                    {formatDate(activity.target_date)}
                  </span>
                </div>
                <Badge variant="outline" className={cn("h-5 px-1.5 uppercase text-[10px]", getPriorityColor(activity.priority))}>
                  {activity.priority} Priority
                </Badge>
              </div>

              {activity.notes && (
                 <p className="text-xs text-muted-foreground mt-2 italic border-l-2 border-border pl-2">
                   "{activity.notes}"
                 </p>
              )}

              {validationError && (
                <div className="flex items-center gap-1.5 text-xs text-destructive font-medium mt-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {validationError}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={() => onEdit(activity.id)}
              >
                 <Edit2 className="w-4 h-4" />
               </Button>
               <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(activity.id)}
              >
                 <Trash2 className="w-4 h-4" />
               </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
