import React, { useState } from 'react';
import { ArrowLeft, Calendar, Upload, Paperclip, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { kpiBersama, kpiUnit, performanceStats } from '../data';
import { cn } from '../../ui/utils';

interface CheckInFormProps {
  onBack: () => void;
}

export function CheckInForm({ onBack }: CheckInFormProps) {
  // Mock form state
  const [activeKpiId, setActiveKpiId] = useState<string | null>(kpiUnit[0].id);

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Check-In 1 - Q1 2026</h1>
          <p className="text-muted-foreground">Periode: 1 Apr - 30 Apr 2026</p>
        </div>
      </div>

      {/* Date & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <Label className="mb-2 block text-muted-foreground">Tanggal Diskusi dengan Atasan *</Label>
            <div className="relative">
               <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
               <Input type="text" value="15 April 2026" className="pl-10" readOnly />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-blue-50 border-blue-100">
           <CardContent className="pt-6 flex justify-between items-center h-full">
              <div className="text-sm font-medium text-blue-800">KPI Achievement Summary (Auto-calculated)</div>
              <div className="flex gap-6">
                 <div>
                    <span className="block text-xs text-blue-600">KPI Bersama (45%)</span>
                    <span className="font-bold text-xl text-blue-900">3.75</span>
                 </div>
                 <div>
                    <span className="block text-xs text-blue-600">KPI Unit (55%)</span>
                    <span className="font-bold text-xl text-blue-900">3.82</span>
                 </div>
                 <div className="pl-6 border-l border-blue-200">
                    <span className="block text-xs text-blue-600">PI Score</span>
                    <span className="font-bold text-xl text-blue-900">{performanceStats.currentPI}</span>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* KPI Update Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Update Realisasi per KPI</h2>
        
        {/* Accordion-like list of KPIs */}
        {kpiUnit.map((kpi) => (
          <Card key={kpi.id} className={cn("overflow-hidden transition-all", activeKpiId === kpi.id ? "ring-2 ring-primary/20" : "")}>
            <div 
               className="p-4 bg-gray-50 border-b flex justify-between items-center cursor-pointer hover:bg-gray-100"
               onClick={() => setActiveKpiId(activeKpiId === kpi.id ? null : kpi.id)}
            >
               <div className="font-medium text-gray-900 flex items-center gap-2">
                 <span className={cn("transition-transform", activeKpiId === kpi.id ? "rotate-90" : "")}>▶</span>
                 {kpi.title} 
                 <span className="text-muted-foreground font-normal ml-2">(Target: {kpi.target})</span>
               </div>
               <div className="text-sm">
                  <span className="text-muted-foreground mr-2">Realisasi Q1:</span>
                  <span className="font-bold">{kpi.actual}</span>
               </div>
            </div>

            {activeKpiId === kpi.id && (
              <CardContent className="p-6 space-y-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <div>
                        <Label>Realisasi Q1</Label>
                        <div className="flex gap-2 mt-1.5">
                           <Input defaultValue={kpi.actual.replace(/[^0-9.]/g, '')} className="w-32" />
                           <div className="flex items-center bg-gray-100 px-3 rounded-md text-gray-500 border">{kpi.unit}</div>
                        </div>
                      </div>

                      <div>
                        <Label>Catatan Pencapaian</Label>
                        <Textarea 
                          className="mt-1.5 min-h-[100px]" 
                          placeholder="Jelaskan pencapaian Anda..."
                          defaultValue="Telah menyelesaikan dokumen HC Strategy 2026-2028 termasuk Workforce Planning Framework."
                        />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div>
                         <Label>Kendala yang Dihadapi</Label>
                         <Textarea 
                           className="mt-1.5 min-h-[100px]" 
                           placeholder="Jelaskan kendala jika ada..."
                         />
                      </div>

                      <div>
                         <Label>Upload Evidence</Label>
                         <div className="mt-1.5 border-2 border-dashed border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer text-center">
                            <Upload className="w-5 h-5 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400">PDF, Excel, Images (max 10MB)</p>
                         </div>
                         <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-md">
                               <Paperclip className="w-4 h-4" />
                               <span>HC_Strategy_2026.pdf</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Discussion Summary */}
      <div className="space-y-4">
         <h2 className="text-lg font-semibold text-gray-900">Ringkasan Diskusi Check-In</h2>
         <Card>
            <CardContent className="p-6">
                <Textarea 
                   className="min-h-[120px] bg-yellow-50/50 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                   placeholder="Catatan diskusi dengan atasan..."
                   defaultValue={`Diskusi dengan Pak Dimas pada 15 April 2026:
- Overall progress on track, terutama untuk strategic documents
- Perlu akselerasi HC Analytics adoption dengan tambahan training
- Action item: Jadwalkan training tambahan untuk 2 unit tersisa`}
                />
            </CardContent>
         </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t">
         <Button variant="outline" onClick={onBack}>Simpan Draft</Button>
         <Button>Submit Check-In</Button>
      </div>
    </div>
  );
}
