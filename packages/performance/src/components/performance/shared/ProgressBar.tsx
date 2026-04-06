import React from 'react';
import { cn } from '../../ui/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
}

export function ProgressBar({ value, max = 100, className, showValue = false }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  let colorClass = "bg-primary";
  if (percentage < 30) colorClass = "bg-red-500";
  else if (percentage < 70) colorClass = "bg-yellow-500";
  else colorClass = "bg-green-500";

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-1">
        {showValue && <span className="text-xs font-medium text-gray-700">{Math.round(percentage)}%</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className={cn("h-2.5 rounded-full transition-all duration-300", colorClass)} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
