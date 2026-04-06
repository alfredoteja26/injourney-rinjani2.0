import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, XCircle, AlertCircle, Target, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { teamMembers, kpiBersama, kpiUnit, KPIItem } from '../data';
import { cn } from '../../ui/utils';

interface MemberPlanningDetailProps {
  memberId: string;
  onBack: () => void;
}

export function MemberPlanningDetail({ memberId, onBack }: MemberPlanningDetailProps) {
  const member = teamMembers.find(m => m.nik === memberId) || teamMembers[0];
  const [isApproving, setIsApproving] = useState(false);
  
  // Mock Data: In a real app, we'd fetch specific proposed KPIs for this member
  // For now we use the standard list but add 'proposedTarget' fields conceptually
  const [kpis, setKpis] = useState([...kpiBersama, ...kpiUnit]);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
        setIsApproving(false);
        alert("KPI Plan Approved Successfully!");
        onBack();
    }, 1500);
  };

  const handleReject = () => {
    const reason = prompt("Please enter a reason for rejection:");
    if (reason) {
        alert("KPI Plan Returned for Revision.");
        onBack();
    }
  };

  const totalWeight = kpis.reduce((sum, kpi) => sum + kpi.weight, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold text-lg">Back to Team Planning</span>
        </Button>
      </div>

      {/* Header Card */}
      <Card className="bg-white border-l-4 border-l-blue-600 shadow-sm">
         <CardContent className="p-6">
            <div className="flex justify-between items-start">
               <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600 border-2 border-white shadow-sm">
                     {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                     <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
                     <div className="text-gray-500">{member.position} • {member.band}</div>
                     <div className="flex items-center gap-2 mt-2">
                        <Badge variant={member.goalStatus === 'Approved' ? 'default' : member.goalStatus === 'Submitted' ? 'secondary' : 'outline'} className={
                            member.goalStatus === 'Approved' ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' : 
                            member.goalStatus === 'Submitted' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200' : ''
                        }>
                            {member.goalStatus}
                        </Badge>
                        <span className="text-sm text-muted-foreground">• Last updated 2 days ago</span>
                     </div>
                  </div>
               </div>
               
               {member.goalStatus === 'Submitted' && (
                   <div className="flex gap-3">
                      <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200" onClick={handleReject}>
                         <XCircle className="w-4 h-4 mr-2" />
                         Reject & Revise
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApprove} disabled={isApproving}>
                         {isApproving ? 'Processing...' : (
                            <>
                               <CheckCircle2 className="w-4 h-4 mr-2" />
                               Approve Plan
                            </>
                         )}
                      </Button>
                   </div>
               )}
            </div>
         </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <Card className={cn("border-l-4", totalWeight === 100 ? "border-l-green-500" : "border-l-red-500")}>
            <CardContent className="p-4">
               <div className="text-sm text-gray-500 font-medium">Total Weight</div>
               <div className={cn("text-2xl font-bold", totalWeight === 100 ? "text-green-700" : "text-red-600")}>
                  {totalWeight}%
               </div>
               {totalWeight !== 100 && <div className="text-xs text-red-500 mt-1">Must equal 100%</div>}
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
               <div className="text-sm text-gray-500 font-medium">KPI Items</div>
               <div className="text-2xl font-bold text-gray-900">{kpis.length}</div>
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
               <div className="text-sm text-gray-500 font-medium">Strategic Alignment</div>
               <div className="text-2xl font-bold text-gray-900">100%</div>
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
               <div className="text-sm text-gray-500 font-medium">Period</div>
               <div className="text-2xl font-bold text-gray-900">2026</div>
            </CardContent>
         </Card>
      </div>

      {/* KPI List */}
      <div className="space-y-6">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KPI Bersama Section */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                     <div className="bg-blue-100 p-1.5 rounded text-blue-600"><Target className="w-4 h-4" /></div>
                     KPI Bersama
                  </h3>
                  <Badge variant="secondary">Corporate Mandated</Badge>
               </div>
               
               <div className="space-y-3">
                  {kpis.filter(k => k.type === 'BERSAMA').map(kpi => (
                     <Card key={kpi.id} className="border-gray-200 hover:border-blue-300 transition-colors group">
                        <CardContent className="p-4">
                           <div className="flex justify-between items-start mb-2">
                              <div className="font-semibold text-gray-900 leading-tight w-3/4">{kpi.title}</div>
                              <div className="text-right">
                                 <div className="text-xl font-bold text-gray-900">{kpi.weight}%</div>
                                 <div className="text-[10px] text-gray-500 uppercase font-medium">Weight</div>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-100">
                              <div>
                                 <Label className="text-xs text-muted-foreground">Target</Label>
                                 <div className="font-medium text-sm">{kpi.target}</div>
                              </div>
                              <div>
                                 <Label className="text-xs text-muted-foreground">Unit</Label>
                                 <div className="font-medium text-sm">{kpi.unit}</div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>

            {/* KPI Unit Section */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                     <div className="bg-cyan-100 p-1.5 rounded text-cyan-600"><Users className="w-4 h-4" /></div>
                     KPI Unit
                  </h3>
                  <Badge variant="secondary">Role Specific</Badge>
               </div>
               
               <div className="space-y-3">
                  {kpis.filter(k => k.type === 'UNIT').map(kpi => (
                     <Card key={kpi.id} className="border-gray-200 hover:border-cyan-300 transition-colors group">
                        <CardContent className="p-4">
                           <div className="flex justify-between items-start mb-2">
                              <div className="font-semibold text-gray-900 leading-tight w-3/4">{kpi.title}</div>
                              <div className="text-right">
                                 <div className="text-xl font-bold text-gray-900">{kpi.weight}%</div>
                                 <div className="text-[10px] text-gray-500 uppercase font-medium">Weight</div>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-100">
                              <div>
                                 <Label className="text-xs text-muted-foreground">Target</Label>
                                 <div className="font-medium text-sm">{kpi.target}</div>
                              </div>
                              <div>
                                 <Label className="text-xs text-muted-foreground">Polarity</Label>
                                 <div className="font-medium text-sm capitalize">{kpi.polarity === 'HIGHER_IS_BETTER' ? 'Maximize' : 'Minimize'}</div>
                              </div>
                           </div>

                           {member.goalStatus === 'Submitted' && (
                              <div className="mt-3 pt-3 border-t border-dashed border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Button variant="ghost" size="sm" className="w-full text-xs h-8 text-blue-600">
                                    Edit Target or Weight
                                 </Button>
                              </div>
                           )}
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
