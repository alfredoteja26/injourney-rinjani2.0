/**
 * Supervisor Aspiration View
 * Main view for supervisors to assign aspirations to subordinates
 */

import React, { useState, useMemo } from 'react';
import { AlertCircle, Send } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner@2.0.3';
import { useCareerPath } from '../../../lib/career-path/CareerPathContext';
import { getSubordinates } from '../../../lib/career-path/mockData';
import { CompletionRateWidget } from './CompletionRateWidget';
import { SubordinateCard } from './SubordinateCard';
import { AssignAspirationModal } from './AssignAspirationModal';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { EmptyState } from '../shared/EmptyState';
import type { Employee, Position, SupervisorAspiration } from '../../../types/careerPath';

export function SupervisorAspirationView() {
  const { currentView, positions, aspirations, submitAspiration } = useCareerPath();
  
  // State for modal
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showBulkConfirmation, setShowBulkConfirmation] = useState(false);
  
  // Local state for pending aspirations (before bulk submit)
  const [pendingAspirations, setPendingAspirations] = useState<Map<string, Position[]>>(new Map());

  // Get subordinates
  const subordinates = useMemo(() => {
    return getSubordinates(currentView.userId);
  }, [currentView.userId]);

  // Get existing supervisor aspirations
  const existingAspirations = useMemo(() => {
    return aspirations.filter(
      a => a.source === 'SUPERVISOR' && (a as SupervisorAspiration).nominator_id === currentView.userId
    ) as SupervisorAspiration[];
  }, [aspirations, currentView.userId]);

  // Calculate subordinate statuses
  const subordinateStatuses = useMemo(() => {
    return subordinates.map(sub => {
      // Check if ineligible
      const isIneligible = sub.disciplinary_status === 'ACTIVE';
      
      // Check existing + pending aspirations
      const existing = existingAspirations.filter(a => a.emp_id === sub.id);
      const pending = pendingAspirations.get(sub.id) || [];
      const total = existing.length + pending.length;

      return {
        employee: sub,
        aspirationCount: total,
        status: isIneligible ? 'ineligible' : (total > 0 ? 'completed' : 'pending')
      };
    });
  }, [subordinates, existingAspirations, pendingAspirations]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = subordinates.length;
    const ineligible = subordinateStatuses.filter(s => s.status === 'ineligible').length;
    const completed = subordinateStatuses.filter(s => s.status === 'completed').length;
    const pending = subordinateStatuses.filter(s => s.status === 'pending').length;

    return {
      total,
      eligible: total - ineligible,
      ineligible,
      completed,
      pending
    };
  }, [subordinates, subordinateStatuses]);

  // Handle assign aspiration
  const handleAssignAspiration = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  // Handle save aspirations for a subordinate
  const handleSaveAspirations = (positions: Position[]) => {
    if (!selectedEmployee) return;

    const newPending = new Map(pendingAspirations);
    newPending.set(selectedEmployee.id, positions);
    setPendingAspirations(newPending);

    toast.success(`Aspirations saved for ${selectedEmployee.name} (not submitted yet)`);
    setSelectedEmployee(null);
  };

  // Handle bulk submit all pending
  const handleBulkSubmit = () => {
    if (stats.pending === 0) {
      toast.error('All eligible subordinates already have aspirations');
      return;
    }
    setShowBulkConfirmation(true);
  };

  // Confirm bulk submit
  const handleConfirmBulkSubmit = () => {
    let count = 0;

    pendingAspirations.forEach((positions, empId) => {
      positions.forEach((position, index) => {
        const aspiration: SupervisorAspiration = {
          id: `SUP${Date.now()}_${empId}_${index}`,
          emp_id: empId,
          pos_id: position.id,
          type: position.grade_jabatan > currentView.user.grade_jabatan ? 'PROMOSI' : 'ROTASI',
          source: 'SUPERVISOR',
          nominated_by: currentView.userId,
          submitted: new Date().toISOString(),
          status: 'ACTIVE'
        };
        submitAspiration(aspiration);
        count++;
      });
    });

    // Clear pending
    setPendingAspirations(new Map());

    toast.success(`${count} aspirations submitted successfully!`);
    setShowBulkConfirmation(false);
  };

  // Get current selections for modal
  const getCurrentSelections = (employee: Employee): Position[] => {
    const pending = pendingAspirations.get(employee.id) || [];
    const existing = existingAspirations
      .filter(a => a.emp_id === employee.id)
      .map(a => positions.find(p => p.id === a.pos_id))
      .filter(Boolean) as Position[];
    
    return [...existing, ...pending];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground">Supervisor Aspiration</h3>
        <p className="text-sm text-muted-foreground font-body">
          Kelola aspirasi karir untuk bawahan langsung Anda
        </p>
      </div>

      {/* Completion Rate Widget */}
      <CompletionRateWidget
        totalSubordinates={stats.total}
        completedCount={stats.completed}
        pendingCount={stats.pending}
        ineligibleCount={stats.ineligible}
        deadline="30 November 2025"
      />

      {/* Subordinates List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-heading font-medium text-foreground">Daftar Bawahan Langsung</h4>
            <p className="text-xs text-muted-foreground font-body">
              {stats.eligible} bawahan eligible untuk aspirasi
            </p>
          </div>
          {stats.pending > 0 && pendingAspirations.size > 0 && (
            <Button onClick={handleBulkSubmit} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)]">
              <Send className="w-4 h-4 mr-2" />
              Bulk Submit All Pending
            </Button>
          )}
        </div>

        {subordinates.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="No subordinates found"
            description="You don't have any direct reports in the system"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {subordinateStatuses.map(({ employee, aspirationCount, status }) => (
              <SubordinateCard
                key={employee.id}
                employee={employee}
                aspirationCount={aspirationCount}
                status={status as 'pending' | 'completed' | 'ineligible'}
                onAssignAspiration={() => handleAssignAspiration(employee)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Assign Aspiration Modal */}
      {selectedEmployee && (
        <AssignAspirationModal
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          employee={selectedEmployee}
          currentSelections={getCurrentSelections(selectedEmployee)}
          onSave={handleSaveAspirations}
        />
      )}

      {/* Bulk Submit Confirmation */}
      <ConfirmationModal
        isOpen={showBulkConfirmation}
        onClose={() => setShowBulkConfirmation(false)}
        onConfirm={handleConfirmBulkSubmit}
        title="Submit All Pending Aspirations"
        description="You are about to submit all pending aspirations for your subordinates."
        confirmText="Submit All"
        checkboxLabel="I confirm all aspiration assignments are correct"
      >
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground">Summary:</label>
            <ul className="mt-2 space-y-2">
              {Array.from(pendingAspirations.entries()).map(([empId, positions]) => {
                const employee = subordinates.find(s => s.id === empId);
                if (!employee) return null;
                return (
                  <li 
                    key={empId}
                    className="text-sm rounded p-2 bg-[var(--color-muted)] text-[var(--color-foreground)]"
                  >
                    <strong>{employee.name}</strong>: {positions.length} position{positions.length > 1 ? 's' : ''}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
}
