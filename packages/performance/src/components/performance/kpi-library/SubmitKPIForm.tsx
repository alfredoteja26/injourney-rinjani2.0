import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';

interface SubmitKPIFormProps {
  onBack: () => void;
}

export function SubmitKPIForm({ onBack }: SubmitKPIFormProps) {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
       {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Submit New KPI to Library</h1>
          <p className="text-muted-foreground">Propose a standard KPI for organization-wide usage</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
         <Card>
            <CardContent className="p-6 space-y-6">
               <div className="space-y-2">
                  <Label>Judul KPI *</Label>
                  <Input placeholder="e.g. Employee Experience Score" />
               </div>

               <div className="space-y-2">
                  <Label>Deskripsi *</Label>
                  <Textarea placeholder="Explain the definition..." className="min-h-[100px]" />
               </div>

               <div className="space-y-3">
                  <Label>Type *</Label>
                  <RadioGroup defaultValue="unit">
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bersama" id="bersama" />
                        <Label htmlFor="bersama">KPI Bersama</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unit" id="unit" />
                        <Label htmlFor="unit">KPI Unit</Label>
                     </div>
                  </RadioGroup>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label>Recommended Target *</Label>
                     <Input placeholder="e.g. 4.2" />
                  </div>
                  <div className="space-y-2">
                     <Label>Target Unit *</Label>
                     <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Select Unit" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="percent">%</SelectItem>
                           <SelectItem value="scale">Scale 1-5</SelectItem>
                           <SelectItem value="idr">IDR</SelectItem>
                           <SelectItem value="ratio">Ratio</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                     <Label>Polarity</Label>
                     <RadioGroup defaultValue="higher">
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem value="higher" id="higher" />
                           <Label htmlFor="higher">Higher is Better</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem value="lower" id="lower" />
                           <Label htmlFor="lower">Lower is Better</Label>
                        </div>
                     </RadioGroup>
                  </div>
                  <div className="space-y-2">
                     <Label>Monitoring Period</Label>
                     <Select defaultValue="semester">
                        <SelectTrigger>
                           <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="quarterly">Quarterly</SelectItem>
                           <SelectItem value="semester">Semester</SelectItem>
                           <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <div className="space-y-2">
                  <Label>Formula Pengukuran *</Label>
                  <Textarea placeholder="e.g. (A / B) * 100" />
               </div>

               <div className="space-y-4">
                  <Label>Applicable Functions *</Label>
                  <div className="grid grid-cols-2 gap-2">
                     <div className="flex items-center space-x-2">
                        <Checkbox id="hc" />
                        <Label htmlFor="hc" className="font-normal">Human Capital</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="ops" />
                        <Label htmlFor="ops" className="font-normal">Operations</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="fin" />
                        <Label htmlFor="fin" className="font-normal">Finance</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="it" />
                        <Label htmlFor="it" className="font-normal">IT</Label>
                     </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <Label>Evidence Requirement</Label>
                  <Textarea placeholder="Required documents..." />
               </div>
            </CardContent>
         </Card>

         <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onBack}>Batalkan</Button>
            <Button onClick={() => { alert('Submitted for review!'); onBack(); }}>Submit KPI</Button>
         </div>
      </div>
    </div>
  );
}
