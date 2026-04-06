import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Position } from "@/types/job-tender";
import { StatusBadge } from "./StatusBadge";
import { Building2, MapPin, Users, Clock, Bookmark } from "lucide-react";
import { cn } from "@/components/ui/utils";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface PositionCardProps {
  position: Position;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onApply?: (id: string) => void;
  onViewDetail?: (id: string) => void;
  className?: string;
  hideApply?: boolean;
}

export function PositionCard({ 
  position, 
  isSaved = false, 
  onSave, 
  onApply, 
  onViewDetail,
  className,
  hideApply = false
}: PositionCardProps) {
  const timeLeft = formatDistanceToNow(new Date(position.deadline), { addSuffix: true, locale: id });
  
  // Determine deadline urgency for styling
  const deadlineDate = new Date(position.deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let deadlineColorClass = "text-muted-foreground";
  if (diffDays <= 3) deadlineColorClass = "text-danger font-medium";
  else if (diffDays <= 7) deadlineColorClass = "text-warning font-medium";

  return (
    <Card className={cn("hover:shadow-md transition-all duration-200 border-border group flex flex-col h-full bg-card", className)}>
      <CardHeader className="p-5 pb-3 flex flex-row items-start justify-between space-y-0">
        <StatusBadge status={position.status} />
        {onSave && (
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8 -mt-1 -mr-2", isSaved ? "text-primary fill-primary" : "text-muted-foreground/70 hover:text-primary")}
            onClick={(e) => {
              e.stopPropagation();
              onSave(position.id);
            }}
          >
            <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="p-5 pt-2 flex-grow">
        <div className="mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1" title={position.title}>
            {position.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground line-clamp-1" title={position.organizationName}>
            {position.organizationName}
          </p>
        </div>
        
        <div className="space-y-2.5 font-body">
          <div className="flex items-center text-sm text-muted-foreground">
            <Building2 className="w-4 h-4 mr-2.5 text-muted-foreground/70 flex-shrink-0" />
            <span className="truncate">{position.company}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2.5 text-muted-foreground/70 flex-shrink-0" />
            <span>{position.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2.5 text-muted-foreground/70 flex-shrink-0" />
            <span>{position.applicantCount} pelamar</span>
          </div>
          <div className={cn("flex items-center text-sm", deadlineColorClass)}>
            <Clock className="w-4 h-4 mr-2.5 flex-shrink-0" />
            <span>Berakhir {timeLeft}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex gap-2 font-body">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-muted text-foreground">
            Grade {position.gradeJabatan}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-muted text-foreground">
            {position.bandJabatan}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 gap-3">
        <Button 
          variant="outline" 
          className="flex-1 border-border hover:bg-accent-subtle hover:text-foreground"
          onClick={() => onViewDetail && onViewDetail(position.id)}
        >
          Detail
        </Button>
        {!hideApply && position.status === 'open' && (
          <Button 
            className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground"
            onClick={() => onApply && onApply(position.id)}
          >
            Apply
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
