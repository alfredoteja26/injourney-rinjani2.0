/**
 * Talent Context Provider
 * Centralized state management for all Talent Management modules
 * 
 * Provides:
 * - Access to mock data
 * - Filtering and search
 * - EQS calculation triggers
 * - Data refresh mechanisms
 */

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type {
  Company,
  Position,
  Employee,
  EQSScore,
  Aspiration,
  TalentPoolCandidate,
  EmployeeClusterAssignment,
  TalentFilters,
  JobFamily,
  TalentCluster,
} from '../../types/talent';

import {
  getCompanies,
  getPositions,
  getEmployees,
  getEQSScores,
  getAspirations,
  getTalentClusterAssignments,
  getCandidatesForPosition,
  filterPositions,
  filterEmployees,
  getPositionById,
  getEmployeeById,
  getEQSScoreByEmployeeAndPosition,
  getAspirationsByEmployee,
  getAspirationsByPosition,
  getTalentClusterByEmployee,
} from './mockData';

// ==================== CONTEXT TYPE ====================

interface TalentContextType {
  // Master Data
  companies: Company[];
  positions: Position[];
  employees: Employee[];
  eqsScores: EQSScore[];
  aspirations: Aspiration[];
  clusterAssignments: EmployeeClusterAssignment[];
  
  // Filters
  filters: TalentFilters;
  setFilters: (filters: Partial<TalentFilters>) => void;
  resetFilters: () => void;
  
  // Filtered Data
  filteredPositions: Position[];
  filteredEmployees: Employee[];
  
  // Selection State
  selectedPosition: Position | null;
  setSelectedPosition: (position: Position | null) => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
  
  // Talent Pool
  getTalentPoolCandidates: (positionId: string) => TalentPoolCandidate[];
  
  // Data Refresh
  refreshEQS: () => void;
  refreshClusters: () => void;
  
  // Getters
  getPosition: (id: string) => Position | undefined;
  getEmployee: (id: string) => Employee | undefined;
  getEQSScore: (employeeId: string, positionId: string) => EQSScore | undefined;
  getEmployeeAspirations: (employeeId: string) => Aspiration[];
  getPositionAspirations: (positionId: string) => Aspiration[];
  getEmployeeCluster: (employeeId: string) => EmployeeClusterAssignment | undefined;
}

// ==================== CONTEXT ====================

const TalentContext = createContext<TalentContextType | undefined>(undefined);

// ==================== PROVIDER ====================

interface TalentProviderProps {
  children: ReactNode;
}

const DEFAULT_FILTERS: TalentFilters = {
  companies: [],
  org_units: [],
  locations: [],
  job_families: [],
  position_status: [],
  employee_type: [],
  ksp_only: false,
  clusters: [],
  readiness_levels: [],
  search_query: '',
};

export function TalentProvider({ children }: TalentProviderProps) {
  // Load all master data
  const [companies] = useState<Company[]>(getCompanies());
  const [positions] = useState<Position[]>(getPositions());
  const [employees] = useState<Employee[]>(getEmployees());
  const [eqsScores] = useState<EQSScore[]>(getEQSScores());
  const [aspirations] = useState<Aspiration[]>(getAspirations());
  const [clusterAssignments] = useState<EmployeeClusterAssignment[]>(getTalentClusterAssignments());
  
  // Filters
  const [filters, setFiltersState] = useState<TalentFilters>(DEFAULT_FILTERS);
  
  // Selection state
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Position | null>(null);
  
  // Update filters (partial update)
  const setFilters = (newFilters: Partial<TalentFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFiltersState(DEFAULT_FILTERS);
  };
  
  // Filtered data based on current filters
  const filteredPositions = useMemo(() => {
    return filterPositions({
      companies: filters.companies,
      job_families: filters.job_families,
      status: filters.position_status,
      ksp_only: filters.ksp_only,
      search: filters.search_query,
    });
  }, [filters]);
  
  const filteredEmployees = useMemo(() => {
    return filterEmployees({
      companies: filters.companies,
      job_families: filters.job_families,
      clusters: filters.clusters,
      search: filters.search_query,
    });
  }, [filters]);
  
  // Talent Pool candidates for a position
  const getTalentPoolCandidates = (positionId: string): TalentPoolCandidate[] => {
    return getCandidatesForPosition(positionId);
  };
  
  // Refresh functions (for future real-time updates)
  const refreshEQS = () => {
    // In production, this would trigger re-calculation
    console.log('Refreshing EQS scores...');
  };
  
  const refreshClusters = () => {
    // In production, this would trigger cluster re-calculation
    console.log('Refreshing talent clusters...');
  };
  
  // Context value
  const value: TalentContextType = {
    // Master Data
    companies,
    positions,
    employees,
    eqsScores,
    aspirations,
    clusterAssignments,
    
    // Filters
    filters,
    setFilters,
    resetFilters,
    
    // Filtered Data
    filteredPositions,
    filteredEmployees,
    
    // Selection State
    selectedPosition,
    setSelectedPosition,
    selectedEmployee,
    setSelectedEmployee,
    
    // Talent Pool
    getTalentPoolCandidates,
    
    // Data Refresh
    refreshEQS,
    refreshClusters,
    
    // Getters
    getPosition: getPositionById,
    getEmployee: getEmployeeById,
    getEQSScore: getEQSScoreByEmployeeAndPosition,
    getEmployeeAspirations: getAspirationsByEmployee,
    getPositionAspirations: getAspirationsByPosition,
    getEmployeeCluster: getTalentClusterByEmployee,
  };
  
  return (
    <TalentContext.Provider value={value}>
      {children}
    </TalentContext.Provider>
  );
}

// ==================== HOOKS ====================

export function useTalent() {
  const context = useContext(TalentContext);
  if (context === undefined) {
    throw new Error('useTalent must be used within a TalentProvider');
  }
  return context;
}

// Convenience hooks for specific data
export function useTalentPool() {
  const { getTalentPoolCandidates, selectedPosition } = useTalent();
  return {
    getCandidates: getTalentPoolCandidates,
    selectedPosition,
  };
}

export function useTalentClassification() {
  const { clusterAssignments, filteredEmployees } = useTalent();
  return {
    clusterAssignments,
    employees: filteredEmployees,
  };
}

export function useTalentFilters() {
  const { filters, setFilters, resetFilters } = useTalent();
  return {
    filters,
    setFilters,
    resetFilters,
  };
}
