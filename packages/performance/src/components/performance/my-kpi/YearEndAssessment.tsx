import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { performanceStats } from '../data';
import { cn } from '../../ui/utils';

interface YearEndAssessmentProps {
  onBack: () => void;
}

export function YearEndAssessment({ onBack }: YearEndAssessmentProps) {
  const [selectedRating, setSelectedRating] = useState<string>("5");

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Year-End Self Assessment 2026</h1>
          <p className="text-muted-foreground">Evaluation Phase</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Score Summary */}
        <Card className="bg-blue-50 border-blue-200">
           <CardContent className="p-6">
              <h2 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4">Final Performance Score (Auto-calculated)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <span className="block text-xs text-blue-600 mb-1">KPI Bersama (45%)</span>
                    <span className="font-bold text-2xl text-blue-900">3.82</span>
                 </div>
                 <div>
                    <span className="block text-xs text-blue-600 mb-1">KPI Unit (55%)</span>
                    <span className="font-bold text-2xl text-blue-900">3.90</span>
                 </div>
                 <div className="pl-6 border-l border-blue-200">
                    <span className="block text-xs text-blue-600 mb-1">PI Score</span>
                    <span className="font-bold text-2xl text-blue-900">3.86</span>
                    <span className="block text-xs text-blue-700 mt-1">Projected: Excellent</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* Self Assessment Form */}
        <Card>
          <CardContent className="p-6 space-y-8">
            
            {/* Rating Section */}
            <div className="space-y-4">
               <Label className="text-lg font-semibold">Self Assessment Rating *</Label>
               <p className="text-sm text-muted-foreground">Pilih rating yang menurut Anda paling sesuai dengan kinerja Anda tahun ini.</p>
               
               <RadioGroup value={selectedRating} onValueChange={setSelectedRating} className="space-y-3">
                  {[
                    { val: "1", label: "1 - Unsuccessful", desc: "Performance was consistently below expectations." },
                    { val: "2", label: "2 - Partially Successful", desc: "Met some but not all expectations." },
                    { val: "3", label: "3 - Successful", desc: "Consistently met expectations." },
                    { val: "4", label: "4 - Excellent", desc: "Frequently exceeded expectations." },
                    { val: "5", label: "5 - Outstanding", desc: "Consistently exceeded expectations significantly." },
                  ].map((option) => (
                     <div key={option.val} className={cn(
                        "flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer",
                        selectedRating === option.val ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:bg-gray-50"
                     )} onClick={() => setSelectedRating(option.val)}>
                        <RadioGroupItem value={option.val} id={`rating-${option.val}`} className="mt-1" />
                        <div className="flex-1">
                           <Label htmlFor={`rating-${option.val}`} className="font-semibold cursor-pointer">{option.label}</Label>
                           <p className="text-sm text-gray-500 mt-0.5">{option.desc}</p>
                        </div>
                     </div>
                  ))}
               </RadioGroup>
               
               <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-700">
                  Selected: <span className="font-bold">{selectedRating} - {selectedRating === "5" ? "Outstanding" : "..."}</span>
               </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Narrative Section */}
            <div className="space-y-4">
               <Label className="text-lg font-semibold">Self Assessment Narrative</Label>
               
               <div className="space-y-2">
                  <Label className="text-base font-medium">Pencapaian Utama Tahun Ini *</Label>
                  <Textarea 
                    className="min-h-[200px] text-base" 
                    placeholder="Describe your key achievements..."
                    defaultValue={`1. HC Strategy 2026-2028 selesai dan approved BOD
2. Talent Pipeline ratio mencapai 1:3.5 (above target 1:3)
3. HC Analytics Dashboard launch dengan 85% adoption
4. Berkontribusi pada pencapaian EBITDA Group melalui efisiensi workforce yang menghasilkan cost saving Rp 2.5M`}
                  />
               </div>
            </div>

          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
           <Button variant="outline" onClick={onBack}>Simpan Draft</Button>
           <Button size="lg">Submit Self Assessment</Button>
        </div>
      </div>
    </div>
  );
}
