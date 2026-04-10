import React, { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { kpiTreeData, KPITreeNode } from '../data';
import { TreeNode } from './TreeNode';
import { Card, CardContent } from '../../ui/card';
import { PrototypeWorkflowPanel } from '../shared/PrototypeWorkflowPanel';

export function KPITreeView() {
  const [selectedNode, setSelectedNode] = useState<KPITreeNode | null>(null);

  if (selectedNode) {
     return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setSelectedNode(null)} className="gap-2">
                <span className="text-lg">←</span> Back to Tree
              </Button>
           </div>
           <Card>
              <CardContent className="p-8">
                 <div className="flex justify-between items-start mb-8">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-gray-900">{selectedNode.title}</h2>
                          {selectedNode.isCurrentUser && (
                             <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">YOU</span>
                          )}
                       </div>
                       <p className="text-lg text-muted-foreground">{selectedNode.owner} • {selectedNode.ownerRole}</p>
                    </div>
                    <div className="text-right">
                       <div className="text-4xl font-bold font-mono text-green-600 mb-1">{selectedNode.score.toFixed(2)}</div>
                       <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                          Target: {selectedNode.target || '-'}
                       </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                       <div className="text-sm text-blue-600 font-semibold mb-1">Weight Contribution</div>
                       <div className="text-2xl font-bold text-blue-900">{selectedNode.weight || 0}%</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                       <div className="text-sm text-green-600 font-semibold mb-1">Achievement Status</div>
                       <div className="text-2xl font-bold text-green-900 capitalize">{selectedNode.status.replace('_', ' ')}</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                       <div className="text-sm text-purple-600 font-semibold mb-1">Cascaded To</div>
                       <div className="text-2xl font-bold text-purple-900">{selectedNode.children?.length || 0} Children</div>
                    </div>
                 </div>

                 {selectedNode.children && (
                    <div>
                       <h3 className="text-lg font-bold mb-4">Cascaded Children Performance</h3>
                       <div className="space-y-3">
                          {selectedNode.children.map(child => (
                             <div key={child.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                                <div>
                                   <div className="font-semibold text-gray-900">{child.title}</div>
                                   <div className="text-sm text-gray-500">{child.owner}</div>
                                </div>
                                <span className={`font-bold font-mono text-lg ${
                                   child.status === 'on_track' ? 'text-green-600' :
                                   child.status === 'at_risk' ? 'text-yellow-600' : 'text-red-600'
                                }`}>{child.score}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}
              </CardContent>
           </Card>
        </div>
     )
  }

  return (
    <div className="space-y-6 flex flex-col h-full bg-gray-50/50 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end shrink-0">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Rinjani</span>
            <span className="text-gray-300">/</span>
            <span>Performance</span>
            <span className="text-gray-300">/</span>
            <span className="text-foreground font-medium">KPI Tree</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">KPI Tree 2026</h1>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="bg-white hover:bg-gray-50">
             <Download className="w-4 h-4 mr-2" />
             Export
           </Button>
        </div>
      </div>

      <PrototypeWorkflowPanel variant="tree" />

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl border shadow-sm shrink-0 gap-4">
         <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search KPI, Owner, or Position..." className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
            </div>
            
            <div className="h-6 w-px bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-6 text-sm whitespace-nowrap overflow-x-auto">
               <span className="flex items-center gap-2 font-medium text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-100" /> 
                  On Track
               </span>
               <span className="flex items-center gap-2 font-medium text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 ring-2 ring-yellow-100" /> 
                  At Risk
               </span>
               <span className="flex items-center gap-2 font-medium text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-100" /> 
                  Behind
               </span>
            </div>
         </div>
         
         <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-2">
               <Filter className="w-4 h-4" />
               Filter
            </Button>
         </div>
      </div>

      {/* Tree Canvas */}
      <div className="flex-1 overflow-x-auto pb-10">
         <div className="min-w-[1024px] pr-4">
            <TreeNode node={kpiTreeData} isRoot={true} onFocus={setSelectedNode} />
         </div>
      </div>
    </div>
  );
}
