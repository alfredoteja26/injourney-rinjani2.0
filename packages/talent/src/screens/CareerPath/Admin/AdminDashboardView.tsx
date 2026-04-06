/**
 * Admin Dashboard View - Aspiration Consolidation
 * INJ-TMS-001 | Career Path (Aspiration)
 * 
 * Epic 5 | US-AC-01: View Consolidated Aspirations
 * Sprint 6 Implementation
 */

import React, { useState, useMemo } from 'react';
import { useCareerPath } from '../../../lib/career-path/CareerPathContext';
import { AnalyticsCards } from './AnalyticsCards';
import { ConsolidatedAspirationTable } from './ConsolidatedAspirationTable';
import { EmployeeAspirationProgressView } from './EmployeeAspirationProgressView';
import { ExportPanel } from './ExportPanel';
import { Search, Filter, Download, List, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

export function AdminDashboardView() {
  const { aspirations, employees, positions } = useCareerPath();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [showExportPanel, setShowExportPanel] = useState(false);

  // Get unique companies
  const companies = useMemo(() => {
    const companySet = new Set(positions.map(p => p.company));
    return Array.from(companySet).sort();
  }, [positions]);

  // Calculate consolidated aspirations
  const consolidatedAspirations = useMemo(() => {
    // Group aspirations by employee-position combination
    const aspirationMap = new Map<string, {
      emp_id: string;
      pos_id: string;
      sources: {
        individual: boolean;
        supervisor: boolean;
        jobHolder: boolean;
        unit: boolean;
      };
      timestamps: {
        individual?: string;
        supervisor?: string;
        jobHolder?: string;
        unit?: string;
      };
    }>();

    aspirations.forEach(asp => {
      const key = `${asp.emp_id}-${asp.pos_id}`;
      
      if (!aspirationMap.has(key)) {
        aspirationMap.set(key, {
          emp_id: asp.emp_id,
          pos_id: asp.pos_id,
          sources: {
            individual: false,
            supervisor: false,
            jobHolder: false,
            unit: false,
          },
          timestamps: {},
        });
      }

      const item = aspirationMap.get(key)!;
      
      if (asp.source === 'INDIVIDUAL') {
        item.sources.individual = true;
        item.timestamps.individual = asp.submitted;
      } else if (asp.source === 'SUPERVISOR') {
        item.sources.supervisor = true;
        item.timestamps.supervisor = asp.submitted;
      } else if (asp.source === 'JOB_HOLDER') {
        item.sources.jobHolder = true;
        item.timestamps.jobHolder = asp.submitted;
      } else if (asp.source === 'UNIT') {
        item.sources.unit = true;
        item.timestamps.unit = asp.submitted;
      }
    });

    // Convert to array with employee and position details
    return Array.from(aspirationMap.values()).map(item => {
      const employee = employees.find(e => e.id === item.emp_id);
      const position = positions.find(p => p.id === item.pos_id);
      const totalSources = Object.values(item.sources).filter(Boolean).length;

      return {
        ...item,
        employee,
        position,
        totalSources,
      };
    }).filter(item => item.employee && item.position);
  }, [aspirations, employees, positions]);

  // Apply filters
  const filteredAspirations = useMemo(() => {
    return consolidatedAspirations.filter(asp => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesEmployee = asp.employee?.name.toLowerCase().includes(query);
        const matchesPosition = asp.position?.name.toLowerCase().includes(query);
        if (!matchesEmployee && !matchesPosition) return false;
      }

      // Source filter
      if (filterSource !== 'all') {
        if (filterSource === 'individual' && !asp.sources.individual) return false;
        if (filterSource === 'supervisor' && !asp.sources.supervisor) return false;
        if (filterSource === 'jobHolder' && !asp.sources.jobHolder) return false;
        if (filterSource === 'unit' && !asp.sources.unit) return false;
        if (filterSource === 'multi' && asp.totalSources < 2) return false;
      }

      // Company filter
      if (filterCompany !== 'all') {
        if (asp.position?.company !== filterCompany) return false;
      }

      return true;
    });
  }, [consolidatedAspirations, searchQuery, filterSource, filterCompany]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-heading font-semibold text-[var(--color-foreground)]">Aspiration Analytic</h2>
        <p className="text-sm text-[var(--color-muted-foreground)] font-body">
          Analisis dan monitor aspirasi karir dari 4 sumber berbeda dan progress pengisian oleh pekerja
        </p>
      </div>

      {/* View Toggle - Two Tabs */}
      <Tabs defaultValue="aspirations" className="w-full">
        <TabsList className="bg-[var(--color-muted)] w-full max-w-[500px]">
          <TabsTrigger 
            value="aspirations"
            className="gap-2 data-[state=active]:bg-[var(--color-background)] data-[state=active]:text-[var(--color-foreground)] data-[state=active]:shadow-sm"
          >
            <List className="w-4 h-4" />
            <span className="font-medium">Daftar Aspirasi Karir</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="employees"
            className="gap-2 data-[state=active]:bg-[var(--color-background)] data-[state=active]:text-[var(--color-foreground)] data-[state=active]:shadow-sm"
          >
            <Users className="w-4 h-4" />
            <span className="font-medium">Daftar Pekerja</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Aspirations List */}
        <TabsContent value="aspirations" className="mt-6 space-y-6">
          {/* Analytics Cards */}
          <AnalyticsCards consolidatedAspirations={consolidatedAspirations} />

          {/* Filters and Search */}
          <div className="rounded-lg p-4 flex flex-wrap items-center gap-4 bg-[var(--color-card)] border border-[var(--color-border)]">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Cari nama karyawan atau posisi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            </div>

            {/* Source Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--color-muted-foreground)]" />
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="all">Semua Sumber</option>
                <option value="individual">Individual</option>
                <option value="supervisor">Supervisor</option>
                <option value="jobHolder">Job Holder</option>
                <option value="unit">Unit</option>
                <option value="multi">Multi-Source (≥2)</option>
              </select>
            </div>

            {/* Company Filter */}
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="all">Semua Perusahaan</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>

            {/* Export Button */}
            <button
              onClick={() => setShowExportPanel(true)}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)]"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-[var(--color-muted-foreground)] font-body">
            Menampilkan {filteredAspirations.length} dari {consolidatedAspirations.length} aspirasi
          </div>

          {/* Consolidated Table */}
          <ConsolidatedAspirationTable aspirations={filteredAspirations} />
        </TabsContent>

        {/* Tab 2: Employee Progress */}
        <TabsContent value="employees" className="mt-6">
          <EmployeeAspirationProgressView />
        </TabsContent>
      </Tabs>

      {/* Export Panel Modal */}
      {showExportPanel && (
        <ExportPanel
          aspirations={filteredAspirations}
          onClose={() => setShowExportPanel(false)}
        />
      )}
    </div>
  );
}
