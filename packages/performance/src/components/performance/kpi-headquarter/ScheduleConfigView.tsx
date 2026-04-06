import React from 'react';
import { ArrowLeft, Save, Edit } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { assessmentCycle } from '../data';
import { cn } from '../../ui/utils';

interface ScheduleConfigViewProps {
  onBack: () => void;
}

export function ScheduleConfigView({ onBack }: ScheduleConfigViewProps) {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
       {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" onClick={onBack}>
             <ArrowLeft className="w-5 h-5" />
           </Button>
           <div>
             <h1 className="text-2xl font-bold tracking-tight text-gray-900">Schedule Configuration 2026</h1>
             <p className="text-muted-foreground">Manage assessment cycle periods and deadlines</p>
           </div>
        </div>
        <Button>
           <Save className="w-4 h-4 mr-2" />
           Save Changes
        </Button>
      </div>

      {/* Timeline Visual */}
      <Card className="bg-gray-900 text-white overflow-hidden">
         <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Timeline View</h3>
            <div className="relative h-16 flex items-center">
               {/* Base Line */}
               <div className="absolute left-0 right-0 h-1 bg-gray-700 top-8" />
               
               {/* Months */}
               <div className="absolute inset-0 flex justify-between text-xs text-gray-400 top-0">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                     <div key={m} className="flex-1 text-center border-l border-gray-800 h-full pt-1">{m}</div>
                  ))}
               </div>

               {/* Phases Blocks */}
               <div className="absolute top-6 h-4 bg-blue-500 rounded-full left-[0%] width-[16%]" style={{ width: '16%' }} title="Goal Setting" />
               <div className="absolute top-6 h-4 bg-green-500 rounded-full left-[25%] width-[8%]" style={{ width: '8%', left: '25%' }} title="Check-In 1" />
               <div className="absolute top-6 h-4 bg-gray-600 rounded-full left-[50%] width-[8%]" style={{ width: '8%', left: '50%' }} title="Check-In 2" />
               <div className="absolute top-6 h-4 bg-gray-600 rounded-full left-[75%] width-[8%]" style={{ width: '8%', left: '75%' }} title="Check-In 3" />
               <div className="absolute top-6 h-4 bg-gray-600 rounded-full left-[87%] width-[13%]" style={{ width: '13%', left: '87%' }} title="Year-End" />
            </div>
         </CardContent>
      </Card>

      <div className="space-y-4">
         {assessmentCycle.map((phase) => (
            <Card key={phase.phase} className={cn("transition-all", phase.status === 'Complete' ? "opacity-75 bg-gray-50" : "bg-white")}>
               <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="flex items-center gap-3 mb-2">
                           <h3 className="font-bold text-lg text-gray-900">{phase.phase}</h3>
                           {phase.status === 'Complete' ? (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Completed</span>
                           ) : (
                              <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Upcoming</span>
                           )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                           <p>Period: <strong>{phase.period}</strong></p>
                           <p>Grace Period: 5 days | Auto-lock: Enabled</p>
                        </div>
                     </div>
                     
                     {phase.status !== 'Complete' && (
                        <Button variant="outline" size="sm">
                           <Edit className="w-4 h-4 mr-2" />
                           Edit
                        </Button>
                     )}
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </div>
  );
}
