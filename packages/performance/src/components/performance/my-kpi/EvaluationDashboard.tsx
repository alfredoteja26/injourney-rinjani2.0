import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { ScoreCard } from '../shared/ScoreCard';
import { KPIListItem } from '../shared/KPIListItem';
import { kpiBersama, kpiUnit, performanceStats, currentUser } from '../data';

interface EvaluationDashboardProps {
  onStartAssessment: () => void;
}

export function EvaluationDashboard({ onStartAssessment }: EvaluationDashboardProps) {
  const [expandedBersama, setExpandedBersama] = useState(true);
  const [expandedUnit, setExpandedUnit] = useState(true);

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
            <span className="text-foreground font-medium">Year-End Review</span>
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

      {/* Evaluation Banner */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6 flex justify-between items-center">
           <div>
              <h2 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                 🏁 YEAR-END REVIEW OPEN
              </h2>
              <p className="text-purple-700 mt-1">Deadline: 15 Jan 2027 (5 days remaining)</p>
           </div>
           <Button onClick={onStartAssessment} className="bg-purple-600 hover:bg-purple-700">
              Start Self Assessment →
           </Button>
        </CardContent>
      </Card>

      {/* Final Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard 
          label="Final PI Score" 
          value={3.86} 
          subValue="Auto-calculated" 
          variant="primary" 
        />
        <ScoreCard 
          label="Final Rating" 
          value="Outstanding" 
          subValue="Projected" 
          variant="success" 
        />
        <ScoreCard 
          label="Status" 
          value="Self Assess" 
          subValue="In Progress" 
          variant="warning" 
        />
      </div>

       {/* Timeline */}
       <Card>
        <CardContent>
          <div className="relative flex justify-between items-center pt-8 pb-6 px-4">
            <div className="absolute top-11 left-0 right-0 h-1 bg-green-200 -z-10 mx-10"></div>
            
            {["Goal Setting", "Check-In 1", "Check-In 2", "Check-In 3"].map((step) => (
                <div key={step} className="flex flex-col items-center gap-2 z-0">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white border-4 border-white shadow-sm">
                    <CheckCircle2 size={16} />
                </div>
                <div className="text-center">
                    <div className="text-sm font-semibold">{step}</div>
                    <div className="text-xs text-green-600 font-medium">Completed</div>
                </div>
                </div>
            ))}

             <div className="flex flex-col items-center gap-2 z-0">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white border-4 border-white shadow-sm animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-purple-700">Year-End</div>
                <div className="text-xs text-purple-600 font-bold">In Progress</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Sections */}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer group p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setExpandedBersama(!expandedBersama)}
            >
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">KPI Bersama (Final)</h2>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        Score: 3.82
                    </span>
                </div>
                {expandedBersama ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </div>
            
            {expandedBersama && (
                <div className="space-y-3">
                    {kpiBersama.map(kpi => (
                        <KPIListItem key={kpi.id} kpi={{...kpi, score: kpi.score + 0.1, status: 'Locked'}} />
                    ))}
                </div>
            )}
        </div>

        <div className="space-y-4">
             <div 
              className="flex items-center justify-between cursor-pointer group p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setExpandedUnit(!expandedUnit)}
            >
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">KPI Unit (Final)</h2>
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        Score: 3.90
                    </span>
                </div>
                 {expandedUnit ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </div>
            
             {expandedUnit && (
                <div className="space-y-3">
                    {kpiUnit.map(kpi => (
                        <KPIListItem key={kpi.id} kpi={{...kpi, score: kpi.score + 0.2, status: 'Locked'}} />
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
