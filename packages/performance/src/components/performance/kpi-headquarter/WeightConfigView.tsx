import React from 'react';
import { ArrowLeft, Copy, Download, Lock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { weightConfig } from '../data';

interface WeightConfigViewProps {
  onBack: () => void;
}

export function WeightConfigView({ onBack }: WeightConfigViewProps) {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
       {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" onClick={onBack}>
             <ArrowLeft className="w-5 h-5" />
           </Button>
           <div>
             <h1 className="text-2xl font-bold tracking-tight text-gray-900">Weight Configuration</h1>
             <p className="text-muted-foreground">Per Perdir API PD.INJ.03.04/12/2022/A.0022</p>
           </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy to 2027
           </Button>
           <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
           </Button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md flex items-center gap-3 text-yellow-800">
         <Lock className="w-5 h-5" />
         <span><strong>Status: Locked</strong> (Goal Setting completed). Changes for 2027 can be configured starting November 2026.</span>
      </div>

      <Card>
         <CardContent className="p-0">
            <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                     <th className="py-4 px-6">Band Jabatan</th>
                     <th className="py-4 px-6">Grade Range</th>
                     <th className="py-4 px-6">Job Type</th>
                     <th className="py-4 px-6">KPI Bersama</th>
                     <th className="py-4 px-6">KPI Unit</th>
                     <th className="py-4 px-6">Total</th>
                  </tr>
               </thead>
               <tbody className="divide-y">
                  {weightConfig.map((config) => (
                     <tr key={config.band} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{config.band}</td>
                        <td className="py-4 px-6 text-gray-600">{config.grade}</td>
                        <td className="py-4 px-6 text-gray-600">{config.type}</td>
                        <td className="py-4 px-6 font-bold text-blue-600">{config.bersama}%</td>
                        <td className="py-4 px-6 font-bold text-green-600">{config.unit}%</td>
                        <td className="py-4 px-6 font-bold text-gray-900">100%</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </CardContent>
      </Card>

      <Card className="bg-gray-50">
         <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Configuration Info</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
               <div>
                  <div className="text-gray-500 mb-1">Effective Date</div>
                  <div className="font-medium text-gray-900">1 January 2026</div>
               </div>
               <div>
                  <div className="text-gray-500 mb-1">Approved By</div>
                  <div className="font-medium text-gray-900">Herdy Harman (Dir. HR & Digital)</div>
               </div>
               <div>
                  <div className="text-gray-500 mb-1">Approved Date</div>
                  <div className="font-medium text-gray-900">15 December 2025</div>
               </div>
               <div>
                  <div className="text-gray-500 mb-1">Version</div>
                  <div className="font-medium text-gray-900">1.0</div>
               </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
