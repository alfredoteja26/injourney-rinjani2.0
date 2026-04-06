import React from 'react';
import { Sheet, SheetContent } from '../../ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Globe, Clock, Target, Scale, User, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { KPIItem } from '../data';

interface KPIDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: KPIItem | null;
}

export function KPIDetailsPanel({ isOpen, onClose, kpi }: KPIDetailsPanelProps) {
    if (!kpi) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[500px] sm:w-[600px] p-0 border-l shadow-2xl flex flex-col h-full bg-white">
                <Tabs defaultValue="overview" className="flex flex-col h-full">
                    
                    {/* Sticky Header */}
                    <div className="p-6 border-b bg-white shrink-0">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0 shadow-sm">
                                <Globe className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">KPI Impact</span>
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2.5 py-0.5 h-auto text-[10px] font-bold uppercase tracking-wide">
                                    {kpi.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{kpi.title}</h2>
                            </div>
                        </div>

                        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none space-x-8">
                            {['overview', 'progress', 'realization', 'cascading', 'history'].map(tab => (
                                <TabsTrigger 
                                    key={tab}
                                    value={tab} 
                                    className="capitalize rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none px-1 py-3 text-sm font-medium text-gray-500 data-[state=active]:text-blue-600 bg-transparent transition-all hover:text-gray-900"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto bg-white p-6">
                        <TabsContent value="overview" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 focus-visible:outline-none">
                            {/* Description */}
                            <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <LayoutGrid className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Deskripsi</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Measurement of <strong>{kpi.title}</strong> achievement against the set target of <strong>{kpi.target}</strong>. 
                                    This KPI is critical for the overall performance of the {kpi.type.toLowerCase()} goals and requires consistent monitoring throughout the fiscal year.
                                </p>
                            </div>

                            {/* Grid Attributes */}
                            <div className="grid grid-cols-2 gap-4">
                                <InfoCard label="Perspektif" value="Financial" icon={<LayoutGrid className="w-4 h-4" />} />
                                <InfoCard label="Polaritas" value={kpi.polarity === 'HIGHER_IS_BETTER' ? 'Maximize' : 'Minimize'} icon={<CheckCircle2 className="w-4 h-4" />} />
                                <InfoCard label="Frekuensi" value="Quarterly" icon={<Clock className="w-4 h-4" />} />
                                <InfoCard label="Satuan" value={kpi.unit} icon={<Scale className="w-4 h-4" />} />
                                
                                {/* Highlighted Weight Card */}
                                <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-4 transition-colors hover:bg-blue-50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Target className="w-4 h-4 text-blue-600" />
                                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Bobot</span>
                                    </div>
                                    <div className="text-xl font-bold text-blue-900">{kpi.weight}%</div>
                                </div>

                                <InfoCard label="Peran" value={kpi.type === 'BERSAMA' ? 'Corporate' : 'Individual'} icon={<User className="w-4 h-4" />} />
                                <InfoCard label="Tipe Target" value="Fixed" icon={<Target className="w-4 h-4" />} />
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="progress" className="mt-0 h-full flex items-center justify-center text-gray-400">
                             <div className="text-center">
                                <p>Progress Chart Placeholder</p>
                             </div>
                        </TabsContent>
                        <TabsContent value="realization" className="mt-0 h-full flex items-center justify-center text-gray-400">
                             <div className="text-center">
                                <p>Realization Data Placeholder</p>
                             </div>
                        </TabsContent>
                         <TabsContent value="cascading" className="mt-0 h-full flex items-center justify-center text-gray-400">
                             <div className="text-center">
                                <p>Cascading Tree Placeholder</p>
                             </div>
                        </TabsContent>
                         <TabsContent value="history" className="mt-0 h-full flex items-center justify-center text-gray-400">
                             <div className="text-center">
                                <p>Audit Log Placeholder</p>
                             </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </SheetContent>
        </Sheet>
    );
}

// Helper component for info cards
function InfoCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
   return (
      <div className="rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition-colors bg-white">
         <div className="flex items-center gap-2 mb-2 text-gray-400">
            {icon}
            <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
         </div>
         <div className="text-sm font-bold text-gray-900">{value}</div>
      </div>
   )
}
