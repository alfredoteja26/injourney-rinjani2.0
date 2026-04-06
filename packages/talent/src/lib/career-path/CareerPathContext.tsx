/**
 * Career Path Context Provider
 * Manages global state for Career Path module
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Employee, Aspiration, Position, ViewContext, UserRole } from '../../types/careerPath';
import {
  getEmployees,
  getPositions,
  getAspirations,
  addAspiration as addAspirationToData,
  getEmployeeById,
  CURRENT_PERIOD
} from './mockData';

interface CareerPathContextType {
  // View state
  currentView: ViewContext;
  setCurrentView: (userId: string, role: UserRole) => void;
  
  // Data
  employees: Employee[];
  positions: Position[];
  aspirations: Aspiration[];
  
  // Actions
  refreshData: () => void;
  submitAspiration: (aspiration: Aspiration) => void;
  
  // Filters (for prototype simplicity)
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CareerPathContext = createContext<CareerPathContextType | undefined>(undefined);

interface CareerPathProviderProps {
  children: ReactNode;
  initialUserId?: string;
  initialRole?: UserRole;
}

export function CareerPathProvider({ 
  children, 
  initialUserId = "EMP004", // Default: Budi Santoso
  initialRole = "EMPLOYEE" 
}: CareerPathProviderProps) {
  // Data state
  const [employees] = useState<Employee[]>(getEmployees());
  const [positions] = useState<Position[]>(getPositions());
  const [aspirations, setAspirations] = useState<Aspiration[]>(getAspirations());
  
  // View state
  const [currentUserId, setCurrentUserId] = useState(initialUserId);
  const [currentRole, setCurrentRole] = useState(initialRole);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Build current view context
  const currentUser = getEmployeeById(currentUserId);
  if (!currentUser) {
    throw new Error(`Employee ${currentUserId} not found`);
  }

  const currentView: ViewContext = {
    role: currentRole,
    userId: currentUserId,
    user: currentUser,
    period: CURRENT_PERIOD
  };

  // Actions
  const setCurrentView = (userId: string, role: UserRole) => {
    setCurrentUserId(userId);
    setCurrentRole(role);
  };

  const refreshData = () => {
    setAspirations(getAspirations());
  };

  const submitAspiration = (aspiration: Aspiration) => {
    addAspirationToData(aspiration);
    setAspirations(getAspirations());
  };

  const value: CareerPathContextType = {
    currentView,
    setCurrentView,
    employees,
    positions,
    aspirations,
    refreshData,
    submitAspiration,
    searchQuery,
    setSearchQuery
  };

  return (
    <CareerPathContext.Provider value={value}>
      {children}
    </CareerPathContext.Provider>
  );
}

// Hook to use the context
export function useCareerPath() {
  const context = useContext(CareerPathContext);
  if (context === undefined) {
    throw new Error('useCareerPath must be used within a CareerPathProvider');
  }
  return context;
}

// Hook to get current user info
export function useCurrentUser() {
  const { currentView } = useCareerPath();
  return currentView.user;
}

// Hook to get current role
export function useCurrentRole() {
  const { currentView } = useCareerPath();
  return currentView.role;
}
