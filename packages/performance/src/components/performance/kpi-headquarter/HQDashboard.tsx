import React, { useState } from 'react';
import { ArrowRight, Settings, Calendar, Download, Book, AlertTriangle, Info } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ScoreCard } from '../shared/ScoreCard';
import { ProgressBar } from '../shared/ProgressBar';
import { hqMetrics, assessmentCycle, companyMetrics } from '../data';
import { WeightConfigView } from './WeightConfigView';
import { ScheduleConfigView } from './ScheduleConfigView';
import { cn } from '../../ui/utils';
import { PrototypeWorkflowPanel } from '../shared/PrototypeWorkflowPanel';

export function HQDashboard() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'weight' | 'schedule'>('dashboard');

  if (currentView === 'weight') {
    return <WeightConfigView onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'schedule') {
    return <ScheduleConfigView onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Rinjani</span>
            <span>/</span>
            <span>Performance</span>
            <span>/</span>
            <span className="text-foreground font-medium">Markas KPI</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Markas KPI 2026</h1>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border text-sm">
           <span className="text-muted-foreground">Company:</span>
           <select className="bg-transparent font-medium focus:outline-none">
              <option>All Companies</option>
              {companyMetrics.map(c => <option key={c.name}>{c.name}</option>)}
           </select>
        </div>
      </div>

      <PrototypeWorkflowPanel variant="hq" />

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard 
          label="Total Employees" 
          value={hqMetrics.totalEmployees} 
          subValue="Active" 
          variant="default" 
        />
        <ScoreCard 
          label="GS Completion" 
          value={hqMetrics.goalSettingCompletion} 
          subValue="+2.1% YoY" 
          variant="success" 
        />
        <ScoreCard 
          label="Avg PI Score" 
          value={hqMetrics.avgPIScore} 
          subValue="Successful" 
          variant="primary" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Assessment Cycle Progress */}
         <div className="lg:col-span-2 space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle>Assessment Cycle Progress 2026</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {assessmentCycle.map((phase) => (
                        <div key={phase.phase} className="space-y-1">
                           <div className="flex justify-between text-sm">
                              <span className="font-medium text-gray-700">{phase.phase}</span>
                              <span className="text-muted-foreground">{phase.period}</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <ProgressBar value={phase.completion} className="h-2 flex-1" />
                              <span className="text-sm font-bold w-10 text-right">{phase.completion}%</span>
                              {phase.status === 'Complete' ? (
                                 <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Complete</span>
                              ) : (
                                 <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">Upcoming</span>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => setCurrentView('weight')}>
                  <Settings className="w-6 h-6 text-primary" />
                  <span>Weight Config</span>
               </Button>
               <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => setCurrentView('schedule')}>
                  <Calendar className="w-6 h-6 text-primary" />
                  <span>Schedule Config</span>
               </Button>
               <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Download className="w-6 h-6 text-primary" />
                  <span>Reports</span>
               </Button>
               <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Book className="w-6 h-6 text-primary" />
                  <span>Library</span>
               </Button>
            </div>
         </div>

         {/* Alerts & Company Status */}
         <div className="space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                     <span>Alerts</span>
                     <Button variant="ghost" size="sm" className="text-xs h-auto py-1">View All</Button>
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-3">
                  <div className="flex gap-3 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                     <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
                     <div className="text-sm text-yellow-800">
                        <strong>PT TWC Borobudur</strong>: Check-In 1 completion below 80% (75%)
                     </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                     <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
                     <div className="text-sm text-yellow-800">
                        <strong>PT AP II</strong>: Rencana KPI completion below target (92%)
                     </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-blue-50 border border-blue-100 rounded-md">
                     <Info className="w-5 h-5 text-blue-600 shrink-0" />
                     <div className="text-sm text-blue-800">
                        3 KPI Library submissions pending review
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Completion by Company</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-3">
                     {companyMetrics.map((company) => (
                        <div key={company.name} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded cursor-pointer">
                           <span className="truncate flex-1 font-medium">{company.name}</span>
                           <div className="flex items-center gap-3">
                              <span className="text-muted-foreground">{company.ci1}%</span>
                              <div className={cn(
                                 "w-2 h-2 rounded-full",
                                 company.status === 'on_track' ? "bg-green-500" :
                                 company.status === 'at_risk' ? "bg-yellow-500" : "bg-red-500"
                              )} />
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
