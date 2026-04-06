/**
 * Employee Aspiration Progress View
 * Shows list of employees with their aspiration completion status
 * Different requirements based on employee role (Group Head vs Officer)
 */

import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useCareerPath } from '../../../lib/career-path/CareerPathContext';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import type { Employee, Aspiration } from '../../../types/careerPath';

interface EmployeeProgress {
  employee: Employee;
  required: {
    individual: boolean;
    supervisor: boolean;
    jobHolder: boolean;
    unit: boolean;
  };
  completed: {
    individual: boolean;
    supervisor: boolean;
    jobHolder: boolean;
    unit: boolean;
  };
  totalRequired: number;
  totalCompleted: number;
  completionPercentage: number;
}

export function EmployeeAspirationProgressView() {
  const { employees, aspirations, positions } = useCareerPath();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Determine what aspirations are required based on employee role
  const determineRequirements = (employee: Employee) => {
    // Check if employee has supervisor responsibilities (has subordinates)
    const hasSupervisorRole = employees.some(e => e.supervisor_id === employee.id);
    
    // Check if employee is a job holder (incumbent of a position)
    const isJobHolder = positions.some(p => p.incumbent_id === employee.id);
    
    // Check if employee is unit leader (based on grade or position level)
    // Assuming Grade 15+ or specific job families indicate unit leadership
    const isUnitLeader = employee.grade_jabatan >= 15 || 
                         employee.position.toLowerCase().includes('head') ||
                         employee.position.toLowerCase().includes('manager') ||
                         employee.position.toLowerCase().includes('direktur');

    return {
      individual: true, // Everyone must fill individual aspiration
      supervisor: hasSupervisorRole,
      jobHolder: isJobHolder,
      unit: isUnitLeader,
    };
  };

  // Calculate progress for each employee
  const employeeProgress: EmployeeProgress[] = useMemo(() => {
    return employees.map(employee => {
      const required = determineRequirements(employee);
      
      // Check which aspirations they have completed
      const employeeAspirations = aspirations.filter(asp => {
        if (asp.source === 'INDIVIDUAL') {
          return asp.emp_id === employee.id;
        } else if (asp.source === 'SUPERVISOR') {
          return (asp as any).nominator_id === employee.id;
        } else if (asp.source === 'JOB_HOLDER') {
          return (asp as any).nominator_id === employee.id;
        } else if (asp.source === 'UNIT') {
          return (asp as any).nominator_id === employee.id;
        }
        return false;
      });

      const completed = {
        individual: employeeAspirations.some(a => a.source === 'INDIVIDUAL'),
        supervisor: employeeAspirations.some(a => a.source === 'SUPERVISOR'),
        jobHolder: employeeAspirations.some(a => a.source === 'JOB_HOLDER'),
        unit: employeeAspirations.some(a => a.source === 'UNIT'),
      };

      const totalRequired = Object.values(required).filter(Boolean).length;
      const totalCompleted = Object.entries(completed)
        .filter(([key, value]) => required[key as keyof typeof required] && value)
        .length;
      
      const completionPercentage = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0;

      return {
        employee,
        required,
        completed,
        totalRequired,
        totalCompleted,
        completionPercentage,
      };
    });
  }, [employees, aspirations, positions]);

  // Get unique companies
  const companies = useMemo(() => {
    const companySet = new Set(employees.map(e => e.company));
    return Array.from(companySet).sort();
  }, [employees]);

  // Apply filters
  const filteredEmployees = useMemo(() => {
    return employeeProgress.filter(emp => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = emp.employee.name.toLowerCase().includes(query);
        const matchesPosition = emp.employee.position.toLowerCase().includes(query);
        const matchesUnit = emp.employee.unit.toLowerCase().includes(query);
        if (!matchesName && !matchesPosition && !matchesUnit) return false;
      }

      // Company filter
      if (filterCompany !== 'all') {
        if (emp.employee.company !== filterCompany) return false;
      }

      // Status filter
      if (filterStatus !== 'all') {
        if (filterStatus === 'complete' && emp.completionPercentage < 100) return false;
        if (filterStatus === 'incomplete' && emp.completionPercentage >= 100) return false;
        if (filterStatus === 'not-started' && emp.totalCompleted > 0) return false;
      }

      return true;
    });
  }, [employeeProgress, searchQuery, filterCompany, filterStatus]);

  // Stats
  const stats = useMemo(() => {
    const complete = employeeProgress.filter(e => e.completionPercentage === 100).length;
    const partial = employeeProgress.filter(e => e.completionPercentage > 0 && e.completionPercentage < 100).length;
    const notStarted = employeeProgress.filter(e => e.completionPercentage === 0).length;
    
    return {
      total: employeeProgress.length,
      complete,
      partial,
      notStarted,
    };
  }, [employeeProgress]);

  const getStatusIcon = (required: boolean, completed: boolean) => {
    if (!required) {
      return <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>-</span>;
    }
    if (completed) {
      return <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)' }} />;
    }
    return <XCircle className="w-4 h-4" style={{ color: 'var(--color-destructive)' }} />;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'var(--color-success)';
    if (percentage > 0) return 'var(--color-warning)';
    return 'var(--color-destructive)';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2>Daftar Pekerja</h2>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
          Monitor progress pengisian aspirasi karir oleh setiap pekerja berdasarkan role mereka
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className="rounded-lg p-4"
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>Total Pekerja</p>
          <h3 className="mt-2">{stats.total}</h3>
        </div>
        
        <div 
          className="rounded-lg p-4"
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>Complete</p>
          <h3 className="mt-2" style={{ color: 'var(--color-success)' }}>{stats.complete}</h3>
          <p className="caption mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
            {stats.total > 0 ? ((stats.complete / stats.total) * 100).toFixed(0) : 0}%
          </p>
        </div>
        
        <div 
          className="rounded-lg p-4"
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>In Progress</p>
          <h3 className="mt-2" style={{ color: 'var(--color-warning)' }}>{stats.partial}</h3>
          <p className="caption mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
            {stats.total > 0 ? ((stats.partial / stats.total) * 100).toFixed(0) : 0}%
          </p>
        </div>
        
        <div 
          className="rounded-lg p-4"
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>Not Started</p>
          <h3 className="mt-2" style={{ color: 'var(--color-destructive)' }}>{stats.notStarted}</h3>
          <p className="caption mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
            {stats.total > 0 ? ((stats.notStarted / stats.total) * 100).toFixed(0) : 0}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div 
        className="rounded-lg p-4 flex flex-wrap items-center gap-4"
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" 
              style={{ color: 'var(--color-muted-foreground)' }}
            />
            <input
              type="text"
              placeholder="Cari nama, posisi, atau unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-input-background)',
              }}
            />
          </div>
        </div>

        {/* Company Filter */}
        <select
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="px-3 py-2 rounded-lg"
          style={{
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-input-background)',
          }}
        >
          <option value="all">Semua Perusahaan</option>
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg"
          style={{
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-input-background)',
          }}
        >
          <option value="all">Semua Status</option>
          <option value="complete">Complete (100%)</option>
          <option value="incomplete">In Progress</option>
          <option value="not-started">Not Started (0%)</option>
        </select>
      </div>

      {/* Results Count */}
      <div style={{ color: 'var(--color-muted-foreground)', fontSize: 'var(--text-sm)' }}>
        Menampilkan {filteredEmployees.length} dari {employeeProgress.length} pekerja
      </div>

      {/* Employee Table */}
      <div 
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--color-muted)' }}>
                <th className="text-left p-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Pekerja
                </th>
                <th className="text-center p-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Grade
                </th>
                <th className="text-center p-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Individual
                </th>
                <th className="text-center p-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Supervisor
                </th>
                <th className="text-center p-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Job Holder
                </th>
                <th className="text-center p-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Unit
                </th>
                <th className="text-center p-4" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-2" style={{ color: 'var(--color-muted-foreground)' }} />
                    <p style={{ color: 'var(--color-muted-foreground)' }}>
                      {searchQuery || filterCompany !== 'all' || filterStatus !== 'all'
                        ? 'Tidak ada pekerja yang cocok dengan filter'
                        : 'Tidak ada data pekerja'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr 
                    key={emp.employee.id}
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                    className="hover:bg-[var(--color-muted)]"
                  >
                    {/* Employee Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={emp.employee.profile_picture} />
                          <AvatarFallback>
                            {emp.employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--text-sm)' }}>
                            {emp.employee.name}
                          </p>
                          <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                            {emp.employee.position}
                          </p>
                          <p className="caption" style={{ color: 'var(--color-muted-foreground)', fontSize: '11px' }}>
                            {emp.employee.unit}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Grade */}
                    <td className="p-4 text-center">
                      <GradeJabatanBadge grade={emp.employee.grade_jabatan} />
                    </td>

                    {/* Individual */}
                    <td className="p-4 text-center">
                      {getStatusIcon(emp.required.individual, emp.completed.individual)}
                    </td>

                    {/* Supervisor */}
                    <td className="p-4 text-center">
                      {getStatusIcon(emp.required.supervisor, emp.completed.supervisor)}
                    </td>

                    {/* Job Holder */}
                    <td className="p-4 text-center">
                      {getStatusIcon(emp.required.jobHolder, emp.completed.jobHolder)}
                    </td>

                    {/* Unit */}
                    <td className="p-4 text-center">
                      {getStatusIcon(emp.required.unit, emp.completed.unit)}
                    </td>

                    {/* Progress */}
                    <td className="p-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-full max-w-[120px]">
                          <div 
                            className="h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'var(--color-muted)' }}
                          >
                            <div 
                              className="h-full transition-all"
                              style={{
                                width: `${emp.completionPercentage}%`,
                                backgroundColor: getProgressColor(emp.completionPercentage),
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span 
                            style={{ 
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: getProgressColor(emp.completionPercentage),
                            }}
                          >
                            {emp.totalCompleted}/{emp.totalRequired}
                          </span>
                          <span 
                            className="caption"
                            style={{ color: 'var(--color-muted-foreground)' }}
                          >
                            ({emp.completionPercentage.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div 
        className="rounded-lg p-4"
        style={{
          backgroundColor: 'var(--color-muted)',
          border: '1px solid var(--color-border)',
        }}
      >
        <p style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: '8px', fontSize: 'var(--text-sm)' }}>
          Keterangan:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
            <span style={{ fontSize: 'var(--text-xs)' }}>Sudah diisi</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4" style={{ color: 'var(--color-destructive)' }} />
            <span style={{ fontSize: 'var(--text-xs)' }}>Belum diisi (required)</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--color-muted-foreground)', fontSize: 'var(--text-xs)' }}>-</span>
            <span style={{ fontSize: 'var(--text-xs)' }}>Tidak diwajibkan (berdasarkan role)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
