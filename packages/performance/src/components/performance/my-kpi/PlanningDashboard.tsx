import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, Plus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { ScoreCard } from '../shared/ScoreCard';
import { KPIListItem } from '../shared/KPIListItem';
import { ProgressBar } from '../shared/ProgressBar';
import { kpiBersama, kpiUnit, performanceStats, currentUser } from '../data';
import { cn } from '../../ui/utils';
import { PrototypeWorkflowPanel } from '../shared/PrototypeWorkflowPanel';

interface PlanningDashboardProps {
  onEditKPI: (kpiId?: string) => void;
  onSubmit: () => void;
}

export function PlanningDashboard({ onEditKPI, onSubmit }: PlanningDashboardProps) {
  const [expandedBersama, setExpandedBersama] = useState(true);
  const [expandedUnit, setExpandedUnit] = useState(true);

  // Mock data adjustments for Planning Phase
  const planningKpiUnit = kpiUnit.map(kpi => ({
    ...kpi,
    status: kpi.status === 'Set' ? 'Set' : 'Draft', // Visual adjustment
    score: 0, // No scores in planning
    actual: '-' // No actuals in planning
  }));

  const totalKPIs = kpiBersama.length + planningKpiUnit.length;
  const isWeightBalanced = performanceStats.totalWeight === 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Rinjani</span>
            <span>/</span>
            <span>Performance</span>
            <span>/</span>
            <span className="text-foreground font-medium">Rencana KPI</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My KPI 2026</h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-white px-4 py-2 rounded-lg border shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-sm">
                <div className="font-semibold">{currentUser.name}</div>
                <div className="text-xs text-muted-foreground">{currentUser.position}</div>
              </div>
           </div>
        </div>
      </div>

      <PrototypeWorkflowPanel variant="my-kpi" />

      {/* Rencana KPI Progress Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    📋 RENCANA KPI IN PROGRESS
                 </h2>
                 <p className="text-blue-700 mt-1">Deadline: 28 Feb 2026 (21 days remaining)</p>
              </div>
              <Button onClick={() => onEditKPI()}>Continue Rencana KPI →</Button>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between text-sm text-blue-800 font-medium">
                 <span>Progress</span>
                 <span>65%</span>
              </div>
              <ProgressBar value={65} className="h-2.5" />
           </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="p-4 bg-white rounded-lg border shadow-sm flex items-center justify-between">
            <div>
               <div className="text-sm text-muted-foreground font-medium uppercase">Total KPI</div>
               <div className="text-2xl font-bold text-gray-900">{totalKPIs} / 8</div>
               <div className="text-xs text-muted-foreground mt-1">KPI Drafted</div>
            </div>
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
               <span className="text-xl">📊</span>
            </div>
         </div>

         <div className="p-4 bg-white rounded-lg border shadow-sm flex items-center justify-between">
            <div>
               <div className="text-sm text-muted-foreground font-medium uppercase">Weight Status</div>
               <div className={cn("text-2xl font-bold", isWeightBalanced ? "text-green-600" : "text-yellow-600")}>
                  {performanceStats.totalWeight}% {isWeightBalanced && "✓"}
               </div>
               <div className="text-xs text-muted-foreground mt-1">
                  {isWeightBalanced ? "Balanced" : "Unbalanced"}
               </div>
            </div>
             <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", isWeightBalanced ? "bg-green-100" : "bg-yellow-100")}>
               <span className="text-xl">⚖️</span>
            </div>
         </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-800 flex items-center gap-2">
         <span className="font-semibold">Cascaded from Atasan:</span>
         <span>Dimas Sayyid (VP HC Strategy)</span>
      </div>

      {/* KPI Sections */}
      <div className="grid grid-cols-1 gap-6">
        {/* KPI Bersama (Read Only) */}
        <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer group p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setExpandedBersama(!expandedBersama)}
            >
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">KPI Bersama</h2>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        {performanceStats.kpiBersamaWeight}%
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                       <Lock size={12} /> Cascaded
                    </span>
                </div>
                {expandedBersama ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </div>
            
            {expandedBersama && (
                <div className="space-y-3">
                    {kpiBersama.map(kpi => (
                        <div key={kpi.id} className="opacity-75 relative group">
                           <div className="absolute inset-0 z-10 cursor-not-allowed" title="KPI Bersama cannot be edited"></div>
                           <KPIListItem kpi={{...kpi, status: 'Set' as any}} />
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* KPI Unit (Editable) */}
        <div className="space-y-4">
             <div 
              className="flex items-center justify-between cursor-pointer group p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setExpandedUnit(!expandedUnit)}
            >
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">KPI Unit</h2>
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {performanceStats.kpiUnitWeight}%
                    </span>
                </div>
                 {expandedUnit ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </div>
            
             {expandedUnit && (
                <div className="space-y-3">
                    {planningKpiUnit.map(kpi => (
                        <div key={kpi.id} onClick={() => onEditKPI(kpi.id)}>
                           <KPIListItem kpi={kpi as any} />
                        </div>
                    ))}
                    
                    <Button 
                       variant="outline" 
                       className="w-full border-dashed text-muted-foreground py-8 hover:bg-gray-50 hover:text-primary hover:border-primary transition-all"
                       onClick={() => onEditKPI()}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah KPI Unit
                    </Button>
                </div>
            )}
        </div>
      </div>

      <div className="pt-6 border-t flex justify-end">
         <Button size="lg" onClick={onSubmit} className="w-full md:w-auto">
            Submit untuk Approval
         </Button>
      </div>

    </div>
  );
}
