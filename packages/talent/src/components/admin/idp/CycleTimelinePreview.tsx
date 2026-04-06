import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import { format, differenceInDays, addDays, isWithinInterval } from 'date-fns';
import { id } from 'date-fns/locale';

interface CycleTimelinePreviewProps {
  startDate?: string;
  submissionDeadline?: string;
  midyearCheckpoint?: string;
  endDate?: string;
  className?: string;
}

export function CycleTimelinePreview({
  startDate,
  submissionDeadline,
  midyearCheckpoint,
  endDate,
  className
}: CycleTimelinePreviewProps) {
  const today = new Date();
  
  if (!startDate || !endDate) {
    return (
      <Card className={cn("bg-[var(--color-secondary)]/30 border-dashed", className)}>
        <CardContent className="flex items-center justify-center h-40 text-[var(--color-text-muted)] text-sm">
          Pilih tanggal mulai dan selesai untuk melihat preview timeline
        </CardContent>
      </Card>
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const deadline = submissionDeadline ? new Date(submissionDeadline) : undefined;
  const midyear = midyearCheckpoint ? new Date(midyearCheckpoint) : undefined;
  
  const totalDuration = differenceInDays(end, start);
  
  const getPosition = (date: Date) => {
    const days = differenceInDays(date, start);
    return Math.max(0, Math.min(100, (days / totalDuration) * 100));
  };

  const isCurrent = (date?: Date) => {
    if (!date) return false;
    // Simple check if today is close to the date (within 2 days)
    return Math.abs(differenceInDays(today, date)) < 2;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <h4 className="font-heading font-semibold text-sm mb-6 text-[var(--color-text-heading)]">Timeline Preview</h4>
        
        <div className="relative h-20 mt-2">
          {/* Main Line */}
          <div className="absolute top-4 left-0 right-0 h-1.5 bg-slate-100 rounded-full w-full"></div>
          
          {/* Active Progress (if started) */}
          {today > start && today < end && (
            <div 
              className="absolute top-4 left-0 h-1.5 bg-[var(--color-primary)]/20 rounded-full" 
              style={{ width: `${getPosition(today)}%` }}
            ></div>
          )}

          {/* Start Point */}
          <div className="absolute top-2.5 left-0 flex flex-col items-center" style={{ left: '0%' }}>
            <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white shadow-sm z-10"></div>
            <div className="mt-2 flex flex-col items-start">
              <span className="text-[10px] font-bold text-[var(--color-text-heading)] uppercase tracking-wider">Start</span>
              <span className="text-[10px] text-[var(--color-text-muted)] whitespace-nowrap">
                {format(start, 'd MMM yyyy', { locale: id })}
              </span>
            </div>
          </div>

          {/* Submission Deadline */}
          {deadline && (
            <div 
              className="absolute top-2 left-0 flex flex-col items-center" 
              style={{ left: `${getPosition(deadline)}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-5 h-5 rounded-full bg-red-500 border-4 border-white shadow-sm z-10 flex items-center justify-center">
              </div>
              <div className="mt-2 flex flex-col items-center">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-1 rounded">Deadline</span>
                <span className="text-[10px] text-[var(--color-text-muted)] whitespace-nowrap">
                  {format(deadline, 'd MMM', { locale: id })}
                </span>
              </div>
            </div>
          )}

          {/* Mid-year Checkpoint */}
          {midyear && (
            <div 
              className="absolute top-2.5 left-0 flex flex-col items-center" 
              style={{ left: `${getPosition(midyear)}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-sm z-10"></div>
              <div className="mt-2 flex flex-col items-center pt-6"> {/* Pushed down to avoid collision */}
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Mid-Year</span>
                <span className="text-[10px] text-[var(--color-text-muted)] whitespace-nowrap">
                  {format(midyear, 'd MMM', { locale: id })}
                </span>
              </div>
            </div>
          )}

          {/* End Point */}
          <div className="absolute top-2.5 right-0 flex flex-col items-end" style={{ right: '0%' }}>
            <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white shadow-sm z-10"></div>
            <div className="mt-2 flex flex-col items-end">
              <span className="text-[10px] font-bold text-[var(--color-text-heading)] uppercase tracking-wider">End</span>
              <span className="text-[10px] text-[var(--color-text-muted)] whitespace-nowrap">
                {format(end, 'd MMM yyyy', { locale: id })}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4 text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-4">
           {deadline && (
             <div className="flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full bg-red-500"></span>
               <span>Durasi Submit: <strong>{differenceInDays(deadline, start)} hari</strong></span>
             </div>
           )}
           <div className="flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-slate-300"></span>
             <span>Total Durasi: <strong>{Math.round(totalDuration / 30)} bulan</strong></span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
