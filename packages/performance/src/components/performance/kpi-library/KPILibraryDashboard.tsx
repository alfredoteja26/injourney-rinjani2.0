import React, { useState } from 'react';
import { Search, Filter, Plus, Flame, ArrowRight, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { kpiLibrary, KPILibraryItem, currentUser } from '../data';
import { cn } from '../../ui/utils';
import { SubmitKPIForm } from './SubmitKPIForm';
import { KPIDetailView } from './KPIDetailView';

export function KPILibraryDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedFunction, setSelectedFunction] = useState<string>('HC');
  const [currentView, setCurrentView] = useState<'browse' | 'submit' | 'detail'>('browse');
  const [selectedKPI, setSelectedKPI] = useState<KPILibraryItem | null>(null);

  const filteredKPIs = kpiLibrary.filter(kpi => {
    const matchesSearch = kpi.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          kpi.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || kpi.type === selectedType.toUpperCase();
    // In a real app, function filtering would check against applicable functions
    return matchesSearch && matchesType;
  });

  const handleViewDetail = (kpi: KPILibraryItem) => {
    setSelectedKPI(kpi);
    setCurrentView('detail');
  };

  if (currentView === 'submit') {
    return <SubmitKPIForm onBack={() => setCurrentView('browse')} />;
  }

  if (currentView === 'detail' && selectedKPI) {
    return <KPIDetailView kpi={selectedKPI} onBack={() => setCurrentView('browse')} />;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Rinjani</span>
            <span>/</span>
            <span>Performance</span>
            <span>/</span>
            <span className="text-foreground font-medium">KPI Library</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">KPI Library</h1>
          <p className="text-muted-foreground">Katalog KPI standar InJourney Group</p>
        </div>
        <div className="flex gap-2">
           <Button onClick={() => setCurrentView('submit')}>
             <Plus className="w-4 h-4 mr-2" />
             Submit New KPI
           </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search KPI by keyword..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Type Filter */}
          <div className="flex items-center gap-2 bg-white border px-3 py-1.5 rounded-md text-sm">
             <span className="text-muted-foreground">Type:</span>
             <select 
               className="bg-transparent font-medium focus:outline-none"
               value={selectedType}
               onChange={(e) => setSelectedType(e.target.value)}
             >
                <option value="All">All</option>
                <option value="Bersama">Bersama</option>
                <option value="Unit">Unit</option>
             </select>
          </div>

           {/* Function Filter */}
           <div className="flex items-center gap-2 bg-white border px-3 py-1.5 rounded-md text-sm">
             <span className="text-muted-foreground">Function:</span>
             <select 
               className="bg-transparent font-medium focus:outline-none"
               value={selectedFunction}
               onChange={(e) => setSelectedFunction(e.target.value)}
             >
                <option value="HC">Human Capital</option>
                <option value="Finance">Finance</option>
                <option value="Ops">Operations</option>
             </select>
          </div>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => { setSearchQuery(''); setSelectedType('All'); }}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredKPIs.length} of {kpiLibrary.length} KPIs
      </div>

      {/* KPI List */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Popular KPIs in Human Capital</h2>
        <div className="grid gap-4">
          {filteredKPIs.map(kpi => (
            <Card key={kpi.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetail(kpi)}>
              <CardContent className="p-5">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 text-lg">{kpi.title}</h3>
                          {kpi.type === 'BERSAMA' ? (
                             <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Bersama</Badge>
                          ) : (
                             <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Unit</Badge>
                          )}
                          {kpi.isPopular && <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />}
                       </div>
                       <p className="text-gray-600">{kpi.description}</p>
                       <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                             📈 Used by {kpi.usageCount} employees
                          </span>
                          <span>•</span>
                          <span>Recommended: {kpi.recommendedTarget}</span>
                       </div>
                       <div className="flex gap-2 mt-3">
                          {kpi.tags.map(tag => (
                             <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                {tag}
                             </span>
                          ))}
                       </div>
                    </div>
                    <Button variant="ghost" size="icon">
                       <ArrowRight className="w-5 h-5 text-gray-400" />
                    </Button>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
