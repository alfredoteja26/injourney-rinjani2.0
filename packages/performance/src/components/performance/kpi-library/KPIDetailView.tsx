import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { KPILibraryItem } from '../data';

interface KPIDetailViewProps {
  kpi: KPILibraryItem;
  onBack: () => void;
}

export function KPIDetailView({ kpi, onBack }: KPIDetailViewProps) {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
       {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
             <h1 className="text-2xl font-bold tracking-tight text-gray-900">{kpi.title}</h1>
             <Badge variant={kpi.type === 'BERSAMA' ? 'default' : 'secondary'} className={kpi.type === 'BERSAMA' ? 'bg-blue-600' : 'bg-green-600 text-white'}>
                {kpi.type}
             </Badge>
          </div>
          <p className="text-muted-foreground">Code: {kpi.code}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
            <Card>
               <CardContent className="p-6 space-y-6">
                  <div>
                     <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                     <p className="text-gray-600 leading-relaxed">{kpi.description}</p>
                  </div>

                  <div>
                     <h3 className="font-semibold text-gray-900 mb-2">KPI Attributes</h3>
                     <div className="border rounded-md divide-y">
                        <div className="grid grid-cols-2 p-3 bg-gray-50">
                           <span className="text-sm font-medium text-gray-600">Attribute</span>
                           <span className="text-sm font-medium text-gray-600">Value</span>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                           <span className="text-sm text-gray-900">Recommended Target</span>
                           <span className="text-sm text-gray-700">{kpi.recommendedTarget}</span>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                           <span className="text-sm text-gray-900">Target Unit</span>
                           <span className="text-sm text-gray-700">{kpi.unit}</span>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                           <span className="text-sm text-gray-900">Polarity</span>
                           <span className="text-sm text-gray-700">{kpi.polarity} is Better</span>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                           <span className="text-sm text-gray-900">Monitoring Period</span>
                           <span className="text-sm text-gray-700">{kpi.period}</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h3 className="font-semibold text-gray-900 mb-2">Formula Pengukuran</h3>
                     <div className="bg-gray-50 p-4 rounded-md border text-gray-800 font-mono text-sm">
                        {kpi.formula}
                     </div>
                  </div>

                  <div>
                     <h3 className="font-semibold text-gray-900 mb-2">Evidence Requirement</h3>
                     <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-blue-900 text-sm">
                        {kpi.evidence}
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-6">
            <Card>
               <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">Usage Statistics</h3>
                  <div className="space-y-3">
                     <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>📈</span>
                        <span>Currently used by <strong>{kpi.usageCount}</strong> employees</span>
                     </div>
                     <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>⭐</span>
                        <span>Rating: 4.5/5 based on 23 reviews</span>
                     </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => alert("Added to My KPI draft!")}>
                     <Check className="w-4 h-4 mr-2" />
                     Use This KPI
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
