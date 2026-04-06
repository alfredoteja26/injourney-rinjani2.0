/**
 * Analytics Cards Component
 * INJ-TMS-001 | Career Path (Aspiration)
 * 
 * Summary statistics for aspiration consolidation
 * Sprint 6 Implementation
 */

import React, { useMemo } from 'react';
import { User, Users, Target, Building, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { cn } from '../../../components/ui/utils';

interface AnalyticsCardsProps {
  consolidatedAspirations: Array<{
    emp_id: string;
    pos_id: string;
    sources: {
      individual: boolean;
      supervisor: boolean;
      jobHolder: boolean;
      unit: boolean;
    };
    totalSources: number;
  }>;
}

export function AnalyticsCards({ consolidatedAspirations }: AnalyticsCardsProps) {
  const stats = useMemo(() => {
    const totalIndividual = consolidatedAspirations.filter(a => a.sources.individual).length;
    const totalSupervisor = consolidatedAspirations.filter(a => a.sources.supervisor).length;
    const totalJobHolder = consolidatedAspirations.filter(a => a.sources.jobHolder).length;
    const totalUnit = consolidatedAspirations.filter(a => a.sources.unit).length;

    // Unique employees
    const uniqueEmployees = new Set(consolidatedAspirations.map(a => a.emp_id)).size;

    // Employees with >= 2 sources
    const employeeSourceCounts = new Map<string, number>();
    consolidatedAspirations.forEach(asp => {
      const current = employeeSourceCounts.get(asp.emp_id) || 0;
      employeeSourceCounts.set(asp.emp_id, Math.max(current, asp.totalSources));
    });
    const employeesWith2Sources = Array.from(employeeSourceCounts.values()).filter(count => count >= 2).length;

    // Multi-source aspirations
    const multiSourceAspirations = consolidatedAspirations.filter(a => a.totalSources >= 2).length;

    return {
      totalIndividual,
      totalSupervisor,
      totalJobHolder,
      totalUnit,
      uniqueEmployees,
      employeesWith2Sources,
      multiSourceAspirations,
      percentageWith2Sources: uniqueEmployees > 0 ? (employeesWith2Sources / uniqueEmployees * 100) : 0,
    };
  }, [consolidatedAspirations]);

  return (
    <div className="space-y-4">
      {/* Source Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard
          title="Individual"
          value={stats.totalIndividual}
          icon={<User className="w-5 h-5" />}
          bgColor="bg-[var(--color-nine-emerging)]"
          textColor="text-[var(--color-foreground)]"
        />
        <SummaryCard
          title="Supervisor"
          value={stats.totalSupervisor}
          icon={<Users className="w-5 h-5" />}
          bgColor="bg-[var(--color-primary)]"
          textColor="text-[var(--color-primary-foreground)]"
        />
        <SummaryCard
          title="Job Holder"
          value={stats.totalJobHolder}
          icon={<Target className="w-5 h-5" />}
          bgColor="bg-[var(--color-accent)]"
          textColor="text-[var(--color-accent-foreground)]"
        />
        <SummaryCard
          title="Unit"
          value={stats.totalUnit}
          icon={<Building className="w-5 h-5" />}
          bgColor="bg-[var(--color-nine-solid)]"
          textColor="text-[var(--color-foreground)]"
        />
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          title="Total Karyawan"
          value={stats.uniqueEmployees}
          subtitle="dengan minimal 1 aspirasi"
          icon={<User className="w-5 h-5" />}
          iconBg="bg-[var(--color-muted)]"
          iconColor="text-[var(--color-primary)]"
        />
        <MetricCard
          title="Multi-Source Coverage"
          value={stats.employeesWith2Sources}
          subtitle={`${stats.percentageWith2Sources.toFixed(1)}% dari total karyawan`}
          icon={<TrendingUp className="w-5 h-5" />}
          iconBg="bg-[var(--color-muted)]"
          iconColor="text-[var(--color-nine-highpot)]"
          progress={stats.percentageWith2Sources}
          target={90}
        />
        <MetricCard
          title="Aspirasi Multi-Source"
          value={stats.multiSourceAspirations}
          subtitle="≥2 sumber nominasi"
          icon={<Award className="w-5 h-5" />}
          iconBg="bg-[var(--color-muted)]"
          iconColor="text-[var(--color-nine-highpot)]"
        />
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

function SummaryCard({ title, value, icon, bgColor, textColor }: SummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-5 transition-all hover:shadow-lg border border-[var(--color-border)]",
        bgColor,
        textColor
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="opacity-80">{icon}</div>
        <h2 className="text-3xl font-heading font-bold">{value}</h2>
      </div>
      <p className="text-sm font-medium opacity-90">{title}</p>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  progress?: number;
  target?: number;
}

function MetricCard({ title, value, subtitle, icon, iconBg, iconColor, progress, target }: MetricCardProps) {
  return (
    <div
      className="rounded-lg p-5 transition-all hover:shadow-lg bg-[var(--color-card)] border border-[var(--color-border)]"
    >
      <div className="flex items-start gap-3">
        <div
          className={cn("rounded-lg p-3", iconBg, iconColor)}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-xs text-[var(--color-muted-foreground)] mb-1 font-medium">
            {title}
          </p>
          <h3 className="text-2xl font-heading font-bold text-[var(--color-foreground)]">{value}</h3>
          <p className="text-xs text-[var(--color-muted-foreground)] font-body">
            {subtitle}
          </p>
          
          {progress !== undefined && target !== undefined && (
            <div className="mt-3 space-y-1">
              <div className="h-2 rounded-full overflow-hidden bg-[var(--color-muted)]">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    progress >= target ? "bg-[var(--color-nine-highpot)]" : "bg-[var(--color-primary)]"
                  )}
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-muted-foreground)]">
                  Target: {target}%
                </span>
                {progress >= target ? (
                  <span className="text-xs text-[var(--color-nine-highpot)] font-medium">
                    ✓ Target tercapai
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {(target - progress).toFixed(1)}% lagi
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
