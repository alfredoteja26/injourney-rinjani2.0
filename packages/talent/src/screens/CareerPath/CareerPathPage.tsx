/**
 * Career Path Page - Main Entry Point
 * INJ-TMS-001 | Career Path (Aspiration)
 * 
 * Sprint 3: Supervisor Aspiration complete
 * Sprint 4: Job Holder Aspiration complete
 * Sprint 5: Unit Aspiration complete
 * Sprint 6: Admin Consolidation complete
 */

import React from 'react';
import { Layout } from '../../components/shell/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { User, Users, Target, Building, BarChart3 } from 'lucide-react';
import { CareerPathProvider } from '../../lib/career-path/CareerPathContext';
import { ViewToggle } from './components/ViewToggle';
import { IndividualAspirationView } from './IndividualAspiration/IndividualAspirationView';
import { SupervisorAspirationView } from './SupervisorAspiration/SupervisorAspirationView';
import { JobHolderAspirationView } from './JobHolderAspiration/JobHolderAspirationView';
import { UnitAspirationView } from './UnitAspiration/UnitAspirationView';
import { AdminDashboardView } from './Admin/AdminDashboardView';

export function CareerAspirationPage({ embedded = false }: { embedded?: boolean }) {
  const content = (
    <CareerPathProvider>
      {/* Main Page Content */}
      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Header */}
        <div className="bg-[var(--color-card)] border-b border-[var(--color-border)] p-[0px]">
          <div className="flex items-start justify-between gap-4 pt-[0px] pr-[0px] pb-[12px] pl-[0px] p-[0px] mt-[0px] mr-[0px] mb-[6px] ml-[0px]">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-heading font-semibold text-[var(--color-foreground)] font-bold">Career Aspiration</h1>
              <p className="text-sm text-[var(--color-muted-foreground)] font-body max-w-2xl">
                Kelola aspirasi karir karyawan dari berbagai sumber: Individual, Supervisor, Job Holder, dan Unit untuk perencanaan karir yang lebih baik.
              </p>
            </div>
            
            {/* View Toggle (Prototype Feature) */}
            <ViewToggle />
          </div>
        </div>

        <div className="p-6 p-[0px]">
          {/* Main Tabs */}
          <Tabs defaultValue="individual" className="w-full space-y-6">
            <div className="bg-[var(--color-card)] rounded-lg border border-[var(--color-border)] w-fit pt-[0px] pr-[4px] pb-[0px] pl-[0px] mt-[12px] mr-[0px] mb-[24px] ml-[0px] p-[0px]">
              <TabsList 
                className="flex bg-transparent p-0 gap-1 h-auto"
              >
                <TabsTrigger 
                  value="individual"
                  className="gap-2 px-4 py-2 rounded-md data-[state=active]:bg-[var(--color-primary-light)] data-[state=active]:text-[var(--color-primary)] data-[state=active]:shadow-none hover:bg-[var(--color-muted)] transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Individual</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="supervisor"
                  className="gap-2 px-4 py-2 rounded-md data-[state=active]:bg-[var(--color-primary-light)] data-[state=active]:text-[var(--color-primary)] data-[state=active]:shadow-none hover:bg-[var(--color-muted)] transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Supervisor</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="jobholder"
                  className="gap-2 px-4 py-2 rounded-md data-[state=active]:bg-[var(--color-primary-light)] data-[state=active]:text-[var(--color-primary)] data-[state=active]:shadow-none hover:bg-[var(--color-muted)] transition-colors"
                >
                  <Target className="w-4 h-4" />
                  <span className="font-medium">Job Holder</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="unit"
                  className="gap-2 px-4 py-2 rounded-md data-[state=active]:bg-[var(--color-primary-light)] data-[state=active]:text-[var(--color-primary)] data-[state=active]:shadow-none hover:bg-[var(--color-muted)] transition-colors"
                >
                  <Building className="w-4 h-4" />
                  <span className="font-medium">Unit</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="consolidation"
                  className="gap-2 px-4 py-2 rounded-md data-[state=active]:bg-[var(--color-primary-light)] data-[state=active]:text-[var(--color-primary)] data-[state=active]:shadow-none hover:bg-[var(--color-muted)] transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-medium">Aspiration Analytic</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Individual Aspiration Tab Content */}
            <TabsContent value="individual" className="mt-0 focus-visible:outline-none">
              <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] shadow-sm pt-[12px] pr-[24px] pb-[24px] pl-[24px] px-[24px] py-[12px]">
                <IndividualAspirationView />
              </div>
            </TabsContent>

            {/* Supervisor Aspiration Tab Content */}
            <TabsContent value="supervisor" className="mt-0 focus-visible:outline-none">
              <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
                <SupervisorAspirationView />
              </div>
            </TabsContent>

            {/* Job Holder Aspiration Tab Content */}
            <TabsContent value="jobholder" className="mt-0 focus-visible:outline-none">
              <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
                <JobHolderAspirationView />
              </div>
            </TabsContent>

            {/* Unit Aspiration Tab Content */}
            <TabsContent value="unit" className="mt-0 focus-visible:outline-none">
              <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
                <UnitAspirationView />
              </div>
            </TabsContent>

            {/* Aspiration Consolidation Tab Content */}
            <TabsContent value="consolidation" className="mt-0 focus-visible:outline-none">
              <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
                <AdminDashboardView />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CareerPathProvider>
  );

  if (embedded) {
    return content;
  }

  return <Layout>{content}</Layout>;
}
