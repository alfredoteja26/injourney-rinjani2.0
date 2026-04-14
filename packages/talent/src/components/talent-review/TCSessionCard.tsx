import React from 'react';
import { Calendar, Users, FileText, Clock, CheckCircle, MapPin } from 'lucide-react';
import { TCSession, eligibleEmployees } from '../../data/mockTalentReviewData';
import { Badge, Button, StatusBadge } from '@rinjani/shared-ui';

interface TCSessionCardProps {
  session: TCSession;
}

export function TCSessionCard({ session }: TCSessionCardProps) {
  const getStatusColor = (status: string): { variant: React.ComponentProps<typeof StatusBadge>['status']; icon: React.ReactNode; label: string } => {
    switch (status) {
      case 'NOT_STARTED':
        return {
          variant: 'neutral',
          label: 'Not Started',
          icon: <Clock className="w-4 h-4" />
        };
      case 'SCHEDULED':
        return {
          variant: 'info',
          label: 'Scheduled',
          icon: <Calendar className="w-4 h-4" />
        };
      case 'IN_PROGRESS':
        return {
          variant: 'warning',
          label: 'In Progress',
          icon: <Clock className="w-4 h-4" />
        };
      case 'COMPLETED':
        return {
          variant: 'success',
          label: 'Completed',
          icon: <CheckCircle className="w-4 h-4" />
        };
      default:
        return {
          variant: 'neutral',
          label: status.replace(/_/g, ' '),
          icon: <Clock className="w-4 h-4" />
        };
    }
  };

  const statusInfo = getStatusColor(session.status);

  return (
    <div className="rounded-[20px] border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {session.session_quarter} {session.session_year} - TC {session.tc_tier.replace('_', ' ')}
            </h3>
            <StatusBadge status={statusInfo.variant as any} className="flex items-center gap-1">
              {statusInfo.icon}
              {statusInfo.label}
            </StatusBadge>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="flex items-start gap-2">
              <Calendar className="mt-1 size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Session Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(session.session_date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(session.session_date).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} WIB
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Users className="mt-1 size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Agenda Items</p>
                <p className="text-sm font-medium text-foreground">
                  {session.agenda_items.length} employees
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="mt-1 size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Berita Acara</p>
                <p className="text-sm font-medium text-foreground">
                  {session.berita_acara_id || 'Not generated'}
                </p>
              </div>
            </div>
          </div>

          {/* Committee Members */}
          <div className="rounded-[16px] border border-border bg-muted/40 p-3">
            <p className="mb-2 text-xs text-muted-foreground">Committee Members</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="info">
                Ketua: {session.chairman_id}
              </StatusBadge>
              {session.members.map((member, index) => (
                <Badge key={index} variant="neutral">
                  {member}
                </Badge>
              ))}
              <Badge variant="neutral">
                Sekretaris: {session.secretary_id}
              </Badge>
            </div>
          </div>

          {/* Agenda Items Preview */}
          {session.agenda_items.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs text-muted-foreground">Employees on Agenda</p>
              <div className="flex flex-wrap gap-2">
                {session.agenda_items.slice(0, 5).map((empId) => {
                  const emp = eligibleEmployees.find(e => e.employee_id === empId);
                  return (
                    <Badge key={empId} variant="neutral">
                      {emp?.name || empId}
                    </Badge>
                  );
                })}
                {session.agenda_items.length > 5 && (
                  <Badge variant="neutral">
                    +{session.agenda_items.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-6">
          {session.status === 'SCHEDULED' && (
            <Button className="whitespace-nowrap">
              Start Session
            </Button>
          )}
          {session.status === 'COMPLETED' && session.berita_acara_id && (
            <Button className="whitespace-nowrap">
              View Berita Acara
            </Button>
          )}
          <Button variant="outline" className="whitespace-nowrap">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
