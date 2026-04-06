import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../ui/utils';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { KPIItem } from '../data';

interface KPIListItemProps {
  kpi: KPIItem;
  onClick?: () => void;
}

export function KPIListItem({ kpi, onClick }: KPIListItemProps) {
  // Parse actual percentage for progress bar if applicable
  let progressValue = 0;
  if (kpi.actual && kpi.target) {
    const actualNum = parseFloat(kpi.actual.replace(/[^0-9.]/g, ''));
    const targetNum = parseFloat(kpi.target.replace(/[^0-9.]/g, ''));
    if (!isNaN(actualNum) && !isNaN(targetNum) && targetNum !== 0) {
      progressValue = (actualNum / targetNum) * 100;
    }
  }

  return (
    <div 
      className="bg-white border rounded-lg p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "w-2 h-2 rounded-full",
              kpi.type === 'BERSAMA' ? "bg-blue-500" : "bg-green-500"
            )} />
            <span className="text-xs font-semibold text-muted-foreground">{kpi.type}</span>
            <StatusBadge status={kpi.status} />
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-1">{kpi.title}</h3>
        </div>
        <div className="text-right">
            <div className="text-sm font-medium text-gray-500">Weight</div>
            <div className="text-lg font-bold text-gray-900">{kpi.weight}%</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
        <div>
          <span className="text-gray-500 block text-xs">Target</span>
          <span className="font-medium">{kpi.target}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs">Actual</span>
          <span className="font-medium">{kpi.actual}</span>
        </div>
        <div>
           <span className="text-gray-500 block text-xs">Score</span>
           <span className="font-bold text-primary">{kpi.score}</span>
        </div>
      </div>
      
      {/* Visual progress bar if it makes sense (e.g. percentage units or parsable numbers) */}
      {(kpi.unit === '%' || kpi.unit.includes('Scale') || !isNaN(parseFloat(kpi.actual))) && (
         <div className="mt-2">
            <div className="flex justify-between text-xs mb-1 text-gray-500">
               <span>Progress</span>
               <span>{Math.round(progressValue)}%</span>
            </div>
            <ProgressBar value={progressValue} className="h-1.5" />
         </div>
      )}
    </div>
  );
}
