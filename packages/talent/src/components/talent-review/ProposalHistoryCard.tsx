import React from 'react';
import { User, Calendar, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { SupervisorProposal, eligibleEmployees } from '../../data/mockTalentReviewData';

interface ProposalHistoryCardProps {
  proposal: SupervisorProposal;
}

export function ProposalHistoryCard({ proposal }: ProposalHistoryCardProps) {
  const employee = eligibleEmployees.find(e => e.employee_id === proposal.employee_id);

  const getProposalTypeLabel = (type: string): string => {
    switch (type) {
      case 'PROMOTION_GRADE_JABATAN': return 'Promotion (Position & Grade)';
      case 'PROMOTION_PERSONAL_GRADE': return 'Promotion (Personal Grade)';
      case 'DEMOTION_PERSONAL_GRADE': return 'Demotion (Personal Grade)';
      case 'SALARY_INCREASE': return 'Salary Increase';
      case 'ENRICHMENT': return 'Enrichment / Tour of Duty';
      case 'ROTATION': return 'Rotation';
      case 'DEVELOPMENT_PROGRAM': return 'Development Program';
      default: return type;
    }
  };

  const getStatusColor = (status: string): { bg: string; color: string; icon: React.ReactNode } => {
    switch (status) {
      case 'DRAFT':
        return {
          bg: 'var(--color-muted)',
          color: 'var(--color-muted-foreground)',
          icon: <FileText className="w-4 h-4" />
        };
      case 'PENDING_HC':
        return {
          bg: 'var(--color-warning-light)',
          color: 'var(--color-warning)',
          icon: <Clock className="w-4 h-4" />
        };
      case 'PENDING_TC':
        return {
          bg: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          icon: <Clock className="w-4 h-4" />
        };
      case 'DECIDED':
        return {
          bg: 'var(--color-success-light)',
          color: 'var(--color-success)',
          icon: <CheckCircle className="w-4 h-4" />
        };
      default:
        return {
          bg: 'var(--color-muted)',
          color: 'var(--color-muted-foreground)',
          icon: <AlertCircle className="w-4 h-4" />
        };
    }
  };

  const statusInfo = getStatusColor(proposal.status);

  return (
    <div 
      className="p-5 rounded transition-all hover:shadow-md"
      style={{ 
        backgroundColor: 'var(--color-card)', 
        border: '1px solid var(--color-border)'
      }}
    >
      <div className="flex items-start justify-between">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary-light)' }}
            >
              <User className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 style={{ 
                  fontSize: 'var(--text-lg)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-foreground)'
                }}>
                  {employee?.name || 'Unknown Employee'}
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
                  {proposal.status.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                    Proposal Type
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                    {getProposalTypeLabel(proposal.proposal_type)}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                    Current Position
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                    {employee?.current_position || '-'}
                  </p>
                </div>
                {proposal.target_position_id && (
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Target Position
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>
                      {proposal.target_position_id}
                    </p>
                  </div>
                )}
                {proposal.target_grade && (
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Target Grade
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                      Grade {proposal.target_grade} (from {employee?.current_grade})
                    </p>
                  </div>
                )}
                {proposal.salary_increase_percentage && (
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Salary Increase
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-success)' }}>
                      +{proposal.salary_increase_percentage}%
                    </p>
                  </div>
                )}
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                    Submitted Date
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-foreground)' }}>
                    {new Date(proposal.submitted_at).toLocaleDateString('id-ID', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Justification */}
              <div 
                className="p-3 rounded"
                style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
              >
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)', marginBottom: '4px' }}>
                  Justification
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-foreground)', lineHeight: '1.5' }}>
                  {proposal.justification}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col items-end gap-2 ml-6">
          <button
            className="px-4 py-2 rounded transition-colors"
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
          {proposal.status === 'DRAFT' && (
            <button
              className="px-4 py-2 rounded transition-colors"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
