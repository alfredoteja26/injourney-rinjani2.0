import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Mail, Phone, Calendar, CheckCircle2, Circle, AlertCircle, ChevronDown, ChevronUp, Target, Users } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ScoreCard } from '../shared/ScoreCard';
import { KPIListItem } from '../shared/KPIListItem';
import { KPIDetailsPanel } from '../shared/KPIDetailsPanel';
import { kpiBersama, kpiUnit, checkInHistory, teamMembers, KPIItem } from '../data';
import { cn } from '../../ui/utils';

interface MemberKPIDetailProps {
  memberId: string;
  onBack: () => void;
}

export function MemberKPIDetail({ memberId, onBack }: MemberKPIDetailProps) {
  // Mock fetching member data
  const member = teamMembers.find(m => m.nik === memberId) || teamMembers[0];
  const [expandedBersama, setExpandedBersama] = useState(true);
  const [expandedUnit, setExpandedUnit] = useState(true);
  const [selectedKPI, setSelectedKPI] = useState<KPIItem | null>(null);

  // Use the KPI data from data.ts but pretend it's for this user
  // In a real app, we would fetch KPIs by memberId
  const memberKPIsBersama = kpiBersama; 
  const memberKPIsUnit = kpiUnit;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header / Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold text-lg">Back to Team</span>
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card className="overflow-hidden border-none shadow-md bg-white">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-500 relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
        <div className="px-8 pb-8">
           <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="flex items-end gap-6">
                 <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden relative z-10">
                    <img 
                       src={member.avatar_url || `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=0D8ABC&color=fff`} 
                       alt={member.name}
                       className="w-full h-full object-cover" 
                    />
                 </div>
                 <div className="mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
                    <p className="text-gray-500 font-medium">{member.position} • {member.band}</p>
                 </div>
              </div>
              <div className="flex gap-3 mb-1">
                 <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                 </Button>
                 <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Meeting
                 </Button>
                 <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                 </Button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-gray-100">
              <div className="space-y-1">
                 <div className="text-sm text-gray-500">Employee ID</div>
                 <div className="font-semibold text-gray-900">{member.nik}</div>
              </div>
              <div className="space-y-1">
                 <div className="text-sm text-gray-500">Status</div>
                 <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {member.status}
                 </div>
              </div>
              <div className="space-y-1">
                 <div className="text-sm text-gray-500">Goal Setting</div>
                 <div className="font-semibold text-gray-900 flex items-center gap-2">
                    {member.goalStatus}
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                 </div>
              </div>
              <div className="space-y-1">
                 <div className="text-sm text-gray-500">Latest Check-In</div>
                 <div className="font-semibold text-gray-900">{member.checkInStatus === 'Completed' ? 'Q1 2026' : '-'}</div>
              </div>
           </div>
        </div>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard 
          label="Current PI Score" 
          value={member.piScore} 
          subValue="On Track" 
          variant="primary" 
        />
        <ScoreCard 
          label="Performance Rating" 
          value={member.rating} 
          subValue="Provisional" 
          variant="success" 
        />
        <Card className="bg-white border shadow-sm">
           <CardContent className="p-6 flex flex-col justify-center h-full">
              <div className="text-sm text-muted-foreground font-medium mb-2">Next Action</div>
              <div className="flex justify-between items-center">
                 <div>
                    <div className="text-xl font-bold text-gray-900">Approve Check-In</div>
                    <div className="text-xs text-orange-600 mt-1">Due in 2 days</div>
                 </div>
                 <Button size="sm">Review Now</Button>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* KPI Details Section */}
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Key Performance Indicators</h2>
            <div className="flex gap-2">
               <Button variant="outline" size="sm">Download Report</Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KPI Bersama */}
            <div className="space-y-4">
                <div 
                  className="flex items-center justify-between cursor-pointer group bg-white p-3 rounded-lg border hover:shadow-sm transition-all"
                  onClick={() => setExpandedBersama(!expandedBersama)}
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                           <Target className="w-5 h-5" />
                        </div>
                        <div>
                           <h2 className="font-bold text-gray-900">KPI Bersama</h2>
                           <div className="text-xs text-muted-foreground">Corporate Shared Goals</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-semibold">
                            Weight: 45%
                        </span>
                        {expandedBersama ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                </div>
                
                {expandedBersama && (
                    <div className="space-y-3 pl-2">
                        {memberKPIsBersama.map(kpi => (
                            <KPIListItem 
                                key={kpi.id} 
                                kpi={kpi} 
                                onClick={() => setSelectedKPI(kpi)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* KPI Unit */}
            <div className="space-y-4">
                 <div 
                  className="flex items-center justify-between cursor-pointer group bg-white p-3 rounded-lg border hover:shadow-sm transition-all"
                  onClick={() => setExpandedUnit(!expandedUnit)}
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-cyan-100 p-2 rounded-lg text-cyan-600">
                           <Users className="w-5 h-5" />
                        </div>
                        <div>
                           <h2 className="font-bold text-gray-900">KPI Unit</h2>
                           <div className="text-xs text-muted-foreground">Role Specific Goals</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-semibold">
                            Weight: 55%
                        </span>
                         {expandedUnit ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                </div>
                
                 {expandedUnit && (
                    <div className="space-y-3 pl-2">
                        {memberKPIsUnit.map(kpi => (
                            <KPIListItem 
                                key={kpi.id} 
                                kpi={kpi} 
                                onClick={() => setSelectedKPI(kpi)}
                            />
                        ))}
                    </div>
                )}
            </div>
         </div>
      </div>

      <KPIDetailsPanel 
         isOpen={!!selectedKPI} 
         onClose={() => setSelectedKPI(null)} 
         kpi={selectedKPI} 
      />
    </div>
  );
}
