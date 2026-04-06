import React, { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent } from '../../ui/card';

interface GoalSettingFormProps {
  onBack: () => void;
  initialData?: any;
}

export function GoalSettingForm({ onBack, initialData }: GoalSettingFormProps) {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit KPI Unit</h1>
          <p className="text-muted-foreground">Define your Individual KPI targets and weights</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Judul KPI *</Label>
                <Input 
                  className="mt-1.5" 
                  placeholder="e.g. Organization Design Accuracy" 
                  defaultValue={initialData?.title}
                />
              </div>

              <div>
                <Label className="text-base font-semibold">Deskripsi *</Label>
                <Textarea 
                  className="mt-1.5 min-h-[80px]" 
                  placeholder="Explain the definition and scope of this KPI"
                  defaultValue={initialData?.description}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-semibold">Bobot (%) *</Label>
                  <div className="relative mt-1.5">
                    <Input 
                      type="number" 
                      className="pr-8" 
                      placeholder="0" 
                      defaultValue={initialData?.weight}
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <Label className="text-base font-semibold">Target *</Label>
                  <div className="relative mt-1.5">
                    <Input 
                      type="text" 
                      placeholder="e.g. 95" 
                      defaultValue={initialData?.target}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Polaritas</Label>
                  <RadioGroup defaultValue={initialData?.polarity || "higher"}>
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
                <div>
                  <Label className="text-base font-semibold mb-1.5 block">Periode Monitoring *</Label>
                  <Select defaultValue="semester">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="semester">Semester</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Formula Pengukuran *</Label>
                <Textarea 
                  className="mt-1.5 min-h-[80px]" 
                  placeholder="e.g. (Achieved / Target) x 100%"
                  defaultValue={initialData?.formula}
                />
              </div>

              <div>
                <Label className="text-base font-semibold">Sumber Data / Evidence *</Label>
                <Textarea 
                  className="mt-1.5 min-h-[60px]" 
                  placeholder="Where does the data come from?"
                  defaultValue={initialData?.evidence}
                />
              </div>

              <div>
                 <Label className="text-base font-semibold">Parent KPI (Cascading Source)</Label>
                 <div className="mt-1.5 p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <div className="text-sm font-semibold text-blue-900">📊 HC Strategy Excellence (VP HC Strategy)</div>
                    <div className="text-xs text-blue-700 mt-1">Weight Allocation: 25%</div>
                 </div>
              </div>

            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
           <Button variant="outline" onClick={onBack}>Batalkan</Button>
           <Button>Simpan sebagai Draft</Button>
        </div>
      </div>
    </div>
  );
}
