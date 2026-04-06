import React from 'react';
import { Calendar, Users, FileText, Clock, CheckCircle, MapPin } from 'lucide-react';
import { TCSession, eligibleEmployees } from '../../data/mockTalentReviewData';

interface TCSessionCardProps {
  session: TCSession;
}

export function TCSessionCard({ session }: TCSessionCardProps) {
  const getStatusColor = (status: string): { bg: string; color: string; icon: React.ReactNode } => {
    switch (status) {
      case 'NOT_STARTED':
        return {
          bg: 'var(--color-muted)',
          color: 'var(--color-muted-foreground)',
          icon: <Clock className="w-4 h-4" />
        };
      case 'SCHEDULED':
        return {
          bg: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          icon: <Calendar className="w-4 h-4" />
        };
      case 'IN_PROGRESS':
        return {
          bg: 'var(--color-warning-light)',
          color: 'var(--color-warning)',
          icon: <Clock className="w-4 h-4" />
        };
      case 'COMPLETED':
        return {
          bg: 'var(--color-success-light)',
          color: 'var(--color-success)',
          icon: <CheckCircle className="w-4 h-4" />
        };
      default:
        return {
          bg: 'var(--color-muted)',
          color: 'var(--color-muted-foreground)',
          icon: <Clock className="w-4 h-4" />
        };
    }
  };

  const statusInfo = getStatusColor(session.status);

  return (
    <div 
      className="p-5 rounded transition-all hover:shadow-md"
      style={{ 
        backgroundColor: 'var(--color-card)', 
        border: '1px solid var(--color-border)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 style={{ 
              fontSize: 'var(--text-lg)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-foreground)'
            }}>
              {session.session_quarter} {session.session_year} - TC {session.tc_tier.replace('_', ' ')}
            </h3>
            <span 
              className="px-2 py-1 rounded flex items-center gap-1"
              style={{ 
                backgroundColor: statusInfo.bg,
                color: statusInfo.color,
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              {statusInfo.icon}
              {session.status.replace('_', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 mt-1" style={{ color: 'var(--color-muted-foreground)' }} />
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                  Session Date
                </p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                  {new Date(session.session_date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                  {new Date(session.session_date).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} WIB
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 mt-1" style={{ color: 'var(--color-muted-foreground)' }} />
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                  Agenda Items
                </p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                  {session.agenda_items.length} employees
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 mt-1" style={{ color: 'var(--color-muted-foreground)' }} />
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                  Berita Acara
                </p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                  {session.berita_acara_id || 'Not generated'}
                </p>
              </div>
            </div>
          </div>

          {/* Committee Members */}
          <div 
            className="p-3 rounded"
            style={{ backgroundColor: 'var(--color-muted)' }}
          >
            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--color-muted-foreground)',
              marginBottom: '8px'
            }}>
              Committee Members
            </p>
            <div className="flex flex-wrap gap-2">
              <span 
                className="px-2 py-1 rounded"
                style={{ 
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Ketua: {session.chairman_id}
              </span>
              {session.members.map((member, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 rounded"
                  style={{ 
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-foreground)'
                  }}
                >
                  {member}
                </span>
              ))}
              <span 
                className="px-2 py-1 rounded"
                style={{ 
                  backgroundColor: 'var(--color-muted)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-muted-foreground)'
                }}
              >
                Sekretaris: {session.secretary_id}
              </span>
            </div>
          </div>

          {/* Agenda Items Preview */}
          {session.agenda_items.length > 0 && (
            <div className="mt-4">
              <p style={{ 
                fontSize: 'var(--text-xs)', 
                color: 'var(--color-muted-foreground)',
                marginBottom: '8px'
              }}>
                Employees on Agenda
              </p>
              <div className="flex flex-wrap gap-2">
                {session.agenda_items.slice(0, 5).map((empId) => {
                  const emp = eligibleEmployees.find(e => e.employee_id === empId);
                  return (
                    <span 
                      key={empId}
                      className="px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: 'var(--color-background)',
                        border: '1px solid var(--color-border)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-foreground)'
                      }}
                    >
                      {emp?.name || empId}
                    </span>
                  );
                })}
                {session.agenda_items.length > 5 && (
                  <span 
                    className="px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: 'var(--color-muted)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-muted-foreground)'
                    }}
                  >
                    +{session.agenda_items.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-6">
          {session.status === 'SCHEDULED' && (
            <button
              className="px-4 py-2 rounded transition-colors whitespace-nowrap"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              Start Session
            </button>
          )}
          {session.status === 'COMPLETED' && session.berita_acara_id && (
            <button
              className="px-4 py-2 rounded transition-colors whitespace-nowrap"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              View Berita Acara
            </button>
          )}
          <button
            className="px-4 py-2 rounded transition-colors whitespace-nowrap"
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
