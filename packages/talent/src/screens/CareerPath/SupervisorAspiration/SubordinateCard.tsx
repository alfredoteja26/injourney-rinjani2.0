/**
 * Subordinate Card Component
 * Displays subordinate information with aspiration status
 */

import React from 'react';
import { User, AlertTriangle, CheckCircle, Clock, Edit } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { GradeJabatanBadge } from '../shared/GradeJabatanBadge';
import type { Employee } from '../../../types/careerPath';
import { cn } from '../../../components/ui/utils';

interface SubordinateCardProps {
  employee: Employee;
  aspirationCount?: number;
  status: 'pending' | 'completed' | 'ineligible';
  onAssignAspiration: () => void;
  onViewAspirations?: () => void;
}

export function SubordinateCard({
  employee,
  aspirationCount = 0,
  status,
  onAssignAspiration,
  onViewAspirations
}: SubordinateCardProps) {
  const isIneligible = status === 'ineligible';
  const isCompleted = status === 'completed';
  const isPending = status === 'pending';

  return (
    <Card
      className={cn(
        "bg-card transition-all",
        isIneligible && "border-[var(--color-destructive)] border-2 opacity-70",
        isCompleted && "border-[var(--color-success)] border-2",
        isPending && "border-[var(--color-border)] border",
        !isIneligible && !isCompleted && !isPending && "border-[var(--color-border)] border"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="w-14 h-14">
            <AvatarImage src={employee.image} alt={employee.name} />
            <AvatarFallback className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
              <User className="w-7 h-7" />
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Name and NIK */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="truncate font-heading font-medium text-foreground">{employee.name}</h4>
                <p className="text-xs text-muted-foreground font-body">
                  NIK: {employee.nik}
                </p>
              </div>
              
              {/* Status Badge */}
              <div>
                {isCompleted && (
                  <Badge 
                    variant="default"
                    className="bg-[var(--color-success-light)] text-[var(--color-success)] border-[var(--color-success)] border hover:bg-[var(--color-success-light)]"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
                {isPending && (
                  <Badge 
                    variant="default"
                    className="bg-[var(--color-danger-light)] text-[var(--color-destructive)] border-[var(--color-destructive)] border hover:bg-[var(--color-danger-light)]"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
                {isIneligible && (
                  <Badge 
                    variant="destructive"
                    className="bg-[var(--color-danger-light)] text-[var(--color-destructive)] border-[var(--color-destructive)] border"
                  >
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Ineligible
                  </Badge>
                )}
              </div>
            </div>

            {/* Position and Grade */}
            <div className="space-y-2">
              <p className="text-sm text-foreground font-body">
                {employee.position}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <GradeJabatanBadge 
                  grade={employee.grade_jabatan} 
                  band={employee.band_jabatan}
                  variant="secondary"
                />
                <Badge variant="outline" className="bg-[var(--color-muted)] border-[var(--color-border)] text-[var(--color-foreground)]">
                  {employee.job_family}
                </Badge>
              </div>
            </div>

            {/* Company and Unit */}
            <div className="mt-2 flex items-center gap-4">
              <p className="text-xs text-muted-foreground font-body">
                {employee.company}
              </p>
              {employee.unit && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <p className="text-xs text-muted-foreground font-body">
                    {employee.unit}
                  </p>
                </>
              )}
            </div>

            {/* Ineligibility Reason */}
            {isIneligible && employee.disciplinary_status === 'ACTIVE' && (
              <div className="mt-3 rounded p-2 bg-[var(--color-danger-light)] border border-[var(--color-destructive)]">
                <p className="text-xs text-[var(--color-destructive)] font-medium">
                  ⚠️ Sedang menjalani hukuman disiplin
                </p>
              </div>
            )}

            {/* Aspiration Count */}
            {aspirationCount > 0 && !isIneligible && (
              <div className="mt-3 rounded p-2 bg-[var(--color-muted)] border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-muted-foreground)] font-medium">
                  📋 {aspirationCount} aspirasi sudah ditambahkan
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {!isIneligible && (
              <div className="mt-4 flex items-center gap-2">
                <Button
                  onClick={onAssignAspiration}
                  size="sm"
                  variant={isPending ? "default" : "outline"}
                  className={cn(
                    isPending 
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)]" 
                      : "text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
                  )}
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  {aspirationCount > 0 ? 'Edit Aspirations' : 'Add Aspirations'}
                </Button>
                
                {aspirationCount > 0 && onViewAspirations && (
                  <Button
                    onClick={onViewAspirations}
                    size="sm"
                    variant="ghost"
                    className="hover:bg-[var(--color-muted)]"
                  >
                    View Details
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
