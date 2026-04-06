import React, { useState } from 'react';
import { EmployeeOffboardingTable } from './EmployeeOffboardingTable';
import { OffboardingDetailPage } from './OffboardingDetailPage';
import { OffboardingChecklistConfig } from './OffboardingChecklistConfig';
import { ConfirmationModal } from './ConfirmationModal';
import { OffboardingEmployee } from './types';
import { Settings as SettingsIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface OffboardingManagementNewProps {
  userRole?: 'Admin' | 'User';
  userEmail?: string;
}

export function OffboardingManagementNew({
  userRole = 'Admin',
  userEmail = 'admin@injourney.co.id'
}: OffboardingManagementNewProps) {
  const [activeView, setActiveView] = useState<'table' | 'detail' | 'config'>('table');
  const [selectedEmployee, setSelectedEmployee] = useState<OffboardingEmployee | null>(null);
  
  // Modal states
  const [showStartModal, setShowStartModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'start' | 'complete';
    employeeIds: string[];
  } | null>(null);

  // Mock data - in production, fetch from API
  const [employees, setEmployees] = useState<OffboardingEmployee[]>([
    {
      id: '1',
      name: 'Binavia Wardhani',
      email: 'binavia.wardhani@injourney.co.id',
      position: 'HC Strategy Senior Officer',
      department: 'Human Capital',
      startDate: '2019-05-20',
      status: 'ready-to-offboard',
      checklistItems: [],
      progress: 0,
      hasAssets: true,
      hasLoans: false,
      exitInterviewCompleted: false
    },
    {
      id: '2',
      name: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@injourney.co.id',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      startDate: '2020-03-15',
      status: 'ready-to-offboard',
      checklistItems: [],
      progress: 0,
      hasAssets: true,
      hasLoans: false,
      exitInterviewCompleted: false
    },
    {
      id: '3',
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@injourney.co.id',
      position: 'Product Manager',
      department: 'Product',
      startDate: '2019-07-01',
      status: 'in-progress',
      checklistItems: [],
      progress: 45,
      hasAssets: true,
      hasLoans: true,
      exitInterviewCompleted: false
    },
    {
      id: '4',
      name: 'Budi Santoso',
      email: 'budi.santoso@injourney.co.id',
      position: 'Marketing Specialist',
      department: 'Marketing',
      startDate: '2021-01-10',
      status: 'ready-to-offboard',
      checklistItems: [],
      progress: 0,
      hasAssets: false,
      hasLoans: false,
      exitInterviewCompleted: false
    },
    {
      id: '5',
      name: 'Dewi Lestari',
      email: 'dewi.lestari@injourney.co.id',
      position: 'HR Officer',
      department: 'Human Capital',
      startDate: '2020-09-20',
      status: 'completed',
      checklistItems: [],
      progress: 100,
      hasAssets: false,
      hasLoans: false,
      exitInterviewCompleted: true
    },
    {
      id: '6',
      name: 'Rudi Hartono',
      email: 'rudi.hartono@injourney.co.id',
      position: 'Finance Analyst',
      department: 'Finance',
      startDate: '2018-11-05',
      status: 'in-progress',
      checklistItems: [],
      progress: 70,
      hasAssets: true,
      hasLoans: false,
      exitInterviewCompleted: true
    },
    {
      id: '7',
      name: 'Maya Putri',
      email: 'maya.putri@injourney.co.id',
      position: 'UI/UX Designer',
      department: 'Design',
      startDate: '2021-06-12',
      status: 'ready-to-offboard',
      checklistItems: [],
      progress: 0,
      hasAssets: true,
      hasLoans: false,
      exitInterviewCompleted: false
    },
    {
      id: '8',
      name: 'Andi Wijaya',
      email: 'andi.wijaya@injourney.co.id',
      position: 'DevOps Engineer',
      department: 'Engineering',
      startDate: '2020-08-22',
      status: 'ready-to-offboard',
      checklistItems: [],
      progress: 0,
      hasAssets: true,
      hasLoans: true,
      exitInterviewCompleted: false
    },
    {
      id: '9',
      name: 'Rina Kusuma',
      email: 'rina.kusuma@injourney.co.id',
      position: 'Content Writer',
      department: 'Marketing',
      startDate: '2022-01-15',
      status: 'ready-to-offboard',
      checklistItems: [],
      progress: 0,
      hasAssets: false,
      hasLoans: false,
      exitInterviewCompleted: false
    },
    {
      id: '10',
      name: 'Ahmad Zulfikar',
      email: 'ahmad.zulfikar@injourney.co.id',
      position: 'Business Analyst',
      department: 'Product',
      startDate: '2020-02-10',
      status: 'ready-to-offboard',
      checklistItems: [],
      progress: 0,
      hasAssets: true,
      hasLoans: false,
      exitInterviewCompleted: false
    }
  ]);

  // Only admins can access offboarding management
  if (userRole !== 'Admin') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        color: 'var(--muted-foreground)'
      }}>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  const handleViewDetail = (employee: OffboardingEmployee) => {
    setSelectedEmployee(employee);
    setActiveView('detail');
  };

  const handleStartOffboarding = (employeeIds: string[]) => {
    setPendingAction({ type: 'start', employeeIds });
    setShowStartModal(true);
  };

  const handleCompleteOffboarding = (employeeIds: string[]) => {
    setPendingAction({ type: 'complete', employeeIds });
    setShowCompleteModal(true);
  };

  const handleCancelResign = (employeeId: string) => {
    if (confirm('Are you sure you want to cancel this resignation?')) {
      setEmployees(prev =>
        prev.map(emp => {
          if (emp.id === employeeId) {
            return { ...emp, status: 'cancel-resign' as const };
          }
          return emp;
        })
      );
      alert('Resignation cancelled successfully!');
    }
  };

  const handleUpdateEmployee = (updated: OffboardingEmployee) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === updated.id ? updated : emp))
    );
    setSelectedEmployee(updated);
  };

  const handleStartOffboardingFromDetail = () => {
    alert('Offboarding started successfully!');
  };

  const handleCompleteOffboardingFromDetail = () => {
    alert('Offboarding completed successfully!');
    setActiveView('table');
  };

  const handleConfirmAction = () => {
    if (pendingAction) {
      if (pendingAction.type === 'start') {
        setEmployees(prev =>
          prev.map(emp => {
            if (pendingAction.employeeIds.includes(emp.id) && emp.status === 'ready-to-offboard') {
              return {
                ...emp,
                status: 'in-progress' as const,
                initiatedDate: new Date().toISOString().split('T')[0]
              };
            }
            return emp;
          })
        );
        alert(`Successfully started offboarding for ${pendingAction.employeeIds.length} employee(s)!`);
      } else if (pendingAction.type === 'complete') {
        setEmployees(prev =>
          prev.map(emp => {
            if (pendingAction.employeeIds.includes(emp.id) && emp.status === 'in-progress') {
              return {
                ...emp,
                status: 'completed' as const,
                progress: 100,
                completedDate: new Date().toISOString().split('T')[0]
              };
            }
            return emp;
          })
        );
        alert(`Successfully completed offboarding for ${pendingAction.employeeIds.length} employee(s)!`);
      }
      setPendingAction(null);
      setShowStartModal(false);
      setShowCompleteModal(false);
    }
  };

  const handleCancelAction = () => {
    setPendingAction(null);
    setShowStartModal(false);
    setShowCompleteModal(false);
  };

  if (activeView === 'detail' && selectedEmployee) {
    return (
      <OffboardingDetailPage
        employee={selectedEmployee}
        onBack={() => {
          setActiveView('table');
          setSelectedEmployee(null);
        }}
        onUpdate={handleUpdateEmployee}
        onStartOffboarding={handleStartOffboardingFromDetail}
        onCompleteOffboarding={handleCompleteOffboardingFromDetail}
      />
    );
  }

  if (activeView === 'config') {
    return (
      <div>
        <Button
          variant="ghost"
          onClick={() => setActiveView('table')}
          style={{ marginBottom: '24px' }}
        >
          ← Back to Offboarding List
        </Button>
        <OffboardingChecklistConfig />
      </div>
    );
  }

  return (
    <div>
      {/* Header with Config Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '24px'
      }}>
        <Button
          variant="outline"
          onClick={() => setActiveView('config')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <SettingsIcon style={{ width: '16px', height: '16px' }} />
          Checklist Configuration
        </Button>
      </div>

      {/* Table View */}
      <EmployeeOffboardingTable
        employees={employees}
        onViewDetail={handleViewDetail}
        onStartOffboarding={handleStartOffboarding}
        onCompleteOffboarding={handleCompleteOffboarding}
        onCancelResign={handleCancelResign}
      />
      
      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showStartModal}
        title="Start Offboarding"
        message={`Are you sure you want to start offboarding for ${pendingAction?.employeeIds.length} employee(s)?`}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
      <ConfirmationModal
        isOpen={showCompleteModal}
        title="Complete Offboarding"
        message={`Are you sure you want to complete offboarding for ${pendingAction?.employeeIds.length} employee(s)? This action cannot be undone.`}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </div>
  );
}