import React from 'react';
import { cn } from '../../ui/utils';

interface ScoreCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function ScoreCard({ label, value, subValue, variant = 'default', className }: ScoreCardProps) {
  let bgClass = "bg-white";
  let borderClass = "border-gray-200";
  let textClass = "text-gray-900";

  if (variant === 'primary') {
    bgClass = "bg-primary/5";
    borderClass = "border-primary/20";
    textClass = "text-primary";
  } else if (variant === 'success') {
    bgClass = "bg-green-50";
    borderClass = "border-green-200";
    textClass = "text-green-700";
  } else if (variant === 'warning') {
    bgClass = "bg-yellow-50";
    borderClass = "border-yellow-200";
    textClass = "text-yellow-700";
  } else if (variant === 'danger') {
    bgClass = "bg-red-50";
    borderClass = "border-red-200";
    textClass = "text-red-700";
  }

  return (
    <div className={cn("p-4 rounded-lg border shadow-sm flex flex-col items-center justify-center text-center", bgClass, borderClass, className)}>
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{label}</span>
      <span className={cn("text-2xl font-bold", textClass)}>{value}</span>
      {subValue && <span className="text-xs text-muted-foreground mt-1">{subValue}</span>}
    </div>
  );
}
