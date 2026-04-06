import React, { useState } from 'react';
import { ArrowLeft, Target, Users, CheckCircle2, AlertCircle, ChevronRight, ArrowDownRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Checkbox } from '../../ui/checkbox';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '../../ui/select';
import { kpiBersama, kpiUnit, teamMembers, KPIItem } from '../data';
import { cn } from '../../ui/utils';

interface CascadeKPIViewProps {
  onBack: () => void;
}

export function CascadeKPIView({ onBack }: CascadeKPIViewProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedKPIId, setSelectedKPIId] = useState<string>('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  
  // Combine KPIs for selection
  const availableKPIs = [...kpiBersama, ...kpiUnit];
  const selectedKPI = availableKPIs.find(k => k.id === selectedKPIId);

  const handleMemberToggle = (id: string) => {
    if (selectedMemberIds.includes(id)) {
      setSelectedMemberIds(selectedMemberIds.filter(m => m !== id));
    } else {
      setSelectedMemberIds([...selectedMemberIds, id]);
    }
  };

  const handleSelectAll = () => {
     if (selectedMemberIds.length === teamMembers.length) {
         setSelectedMemberIds([]);
     } else {
         setSelectedMemberIds(teamMembers.map(m => m.nik));
     }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Cascade KPI</h1>
          <p className="text-muted-foreground">Distribute goals to your team members</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left Panel: Configuration Form */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Select Source KPI */}
            <Card className={cn("transition-all", step === 1 ? "ring-2 ring-primary/20" : "")}>
               <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                     <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                        Select Source KPI
                     </CardTitle>
                     {selectedKPI && step === 2 && (
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Change</Button>
                     )}
                  </div>
               </CardHeader>
               <CardContent>
                  {step === 1 ? (
                     <div className="space-y-4">
                        <div className="grid gap-3">
                           {availableKPIs.map(kpi => (
                              <div 
                                 key={kpi.id}
                                 className={cn(
                                    "p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-all flex items-start gap-3",
                                    selectedKPIId === kpi.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200"
                                 )}
                                 onClick={() => setSelectedKPIId(kpi.id)}
                              >
                                 <div className={cn(
                                    "mt-1 w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                                    selectedKPIId === kpi.id ? "border-primary bg-primary" : "border-gray-300"
                                 )}>
                                    {selectedKPIId === kpi.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                       <span className="font-semibold text-gray-900">{kpi.title}</span>
                                       <Badge variant="outline" className={kpi.type === 'BERSAMA' ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-green-50 text-green-700 border-green-200"}>
                                          {kpi.type}
                                       </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex gap-4">
                                       <span>Target: <strong>{kpi.target}</strong></span>
                                       <span>Weight: <strong>{kpi.weight}%</strong></span>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <Button 
                           className="w-full" 
                           disabled={!selectedKPIId}
                           onClick={() => setStep(2)}
                        >
                           Continue to Team Selection <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                     </div>
                  ) : (
                     <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Target className="w-5 h-5 text-gray-500" />
                           <div>
                              <div className="font-semibold text-gray-900">{selectedKPI?.title}</div>
                              <div className="text-xs text-gray-500">Target: {selectedKPI?.target} • Weight: {selectedKPI?.weight}%</div>
                           </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                     </div>
                  )}
               </CardContent>
            </Card>

            {/* Step 2: Select Members & Configure */}
            {step === 2 && (
               <Card className="animate-in fade-in slide-in-from-bottom-2">
                  <CardHeader className="pb-3">
                     <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
                        Distribute to Team
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b">
                           <div className="flex items-center gap-2">
                              <Checkbox 
                                 id="select-all" 
                                 checked={selectedMemberIds.length === teamMembers.length && teamMembers.length > 0}
                                 onCheckedChange={handleSelectAll}
                              />
                              <Label htmlFor="select-all" className="cursor-pointer">Select All Team Members</Label>
                           </div>
                           <span className="text-sm text-muted-foreground">{selectedMemberIds.length} selected</span>
                        </div>
                        
                        <div className="space-y-2">
                           {teamMembers.map(member => (
                              <div 
                                 key={member.nik}
                                 className={cn(
                                    "flex items-center justify-between p-3 rounded-lg border transition-colors",
                                    selectedMemberIds.includes(member.nik) ? "bg-blue-50/50 border-blue-200" : "hover:bg-gray-50 border-gray-100"
                                 )}
                              >
                                 <div className="flex items-center gap-3">
                                    <Checkbox 
                                       id={`member-${member.nik}`}
                                       checked={selectedMemberIds.includes(member.nik)}
                                       onCheckedChange={() => handleMemberToggle(member.nik)}
                                    />
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                          {member.name.split(' ').map(n => n[0]).join('')}
                                       </div>
                                       <div>
                                          <div className="font-medium text-gray-900">{member.name}</div>
                                          <div className="text-xs text-gray-500">{member.position}</div>
                                       </div>
                                    </div>
                                 </div>
                                 
                                 {selectedMemberIds.includes(member.nik) && (
                                    <div className="flex items-center gap-3 animate-in fade-in zoom-in-95">
                                       <div className="text-right">
                                          <Label className="text-[10px] text-muted-foreground uppercase">Target</Label>
                                          <Input className="h-8 w-24 text-sm" placeholder="Target" defaultValue={selectedKPI?.target} />
                                       </div>
                                       <div className="text-right">
                                          <Label className="text-[10px] text-muted-foreground uppercase">Weight</Label>
                                          <div className="relative">
                                             <Input className="h-8 w-20 text-sm pr-6" placeholder="%" defaultValue="10" />
                                             <span className="absolute right-2 top-2 text-xs text-gray-400">%</span>
                                          </div>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-4 border-t flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                           Total Weight Distributed: <strong className="text-gray-900">{selectedMemberIds.length * 10}%</strong>
                        </div>
                        <div className="flex gap-3">
                           <Button variant="outline" onClick={onBack}>Cancel</Button>
                           <Button 
                              disabled={selectedMemberIds.length === 0}
                              onClick={() => { alert('KPI Cascaded Successfully!'); onBack(); }}
                           >
                              <ArrowDownRight className="w-4 h-4 mr-2" />
                              Cascade KPI
                           </Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            )}
         </div>

         {/* Right Panel: Summary/Tips */}
         <div className="space-y-6">
            <Card className="bg-blue-50 border-blue-100">
               <CardHeader>
                  <CardTitle className="text-blue-900 text-base flex items-center gap-2">
                     <AlertCircle className="w-4 h-4" />
                     Cascading Guidelines
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-3 text-sm text-blue-800">
                  <p>
                     When cascading <strong>Shared KPIs (KPI Bersama)</strong>, ensure that the target aligns with the corporate distribution policy.
                  </p>
                  <p>
                     For <strong>Unit KPIs</strong>, you can distribute the target either identically to all members or split it based on individual contribution.
                  </p>
                  <div className="mt-4 p-3 bg-white/50 rounded-lg border border-blue-200">
                     <div className="font-semibold mb-1">Selected Source</div>
                     {selectedKPI ? (
                        <div className="text-xs">
                           <div>{selectedKPI.title}</div>
                           <div>Type: {selectedKPI.type}</div>
                        </div>
                     ) : (
                        <span className="text-gray-400 italic">None selected</span>
                     )}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
