import React from 'react';
import { User, Building2, Award, TrendingUp, FileCheck, ArrowRight } from 'lucide-react';
import { HCRecommendation, eligibleEmployees, supervisorProposals } from '../../data/mockTalentReviewData';

interface TCRecommendationCardProps {
  recommendation: HCRecommendation;
  onMakeDecision: () => void;
}

export function TCRecommendationCard({ recommendation, onMakeDecision }: TCRecommendationCardProps) {
  const employee = eligibleEmployees.find(e => e.employee_id === recommendation.employee_id);
  const supervisorProposal = supervisorProposals.find(p => p.proposal_id === recommendation.supervisor_proposal_id);

  if (!employee || !supervisorProposal) return null;

  const getZonasiColor = (zonasi: string): { bg: string; color: string } => {
    return zonasi === 'INTERNAL' 
      ? { bg: 'var(--color-primary-light)', color: 'var(--color-primary)' }
      : { bg: 'var(--color-warning-light)', color: 'var(--color-warning)' };
  };

  const zonasiInfo = getZonasiColor(recommendation.zonasi);

  return (
    <div 
      className="p-6 rounded transition-all hover:shadow-md"
      style={{ 
        backgroundColor: 'var(--color-card)', 
        border: '1px solid var(--color-border)'
      }}
    >
      {/* Employee Header */}
      <div className="flex items-start gap-4 mb-5 pb-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
        >
          <User className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
        </div>
        <div className="flex-1">
          <h3 style={{ 
            fontSize: 'var(--text-xl)', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-foreground)',
            marginBottom: '8px'
          }}>
            {employee.name}
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                NIK: {employee.nik}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                {employee.current_position}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                Grade: {employee.current_grade} | PG: {employee.personal_grade}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="px-2 py-0.5 rounded"
                style={{ 
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                {employee.cluster.replace('_', ' ')}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                EQS: {employee.eqs_score.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow: Supervisor → HC → TC */}
      <div className="mb-5">
        <div className="flex items-start gap-4">
          {/* Supervisor Proposal */}
          <div 
            className="flex-1 p-4 rounded"
            style={{ backgroundColor: 'var(--color-success-light)', border: '1px solid var(--color-success)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
              >
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>1</span>
              </div>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-foreground)'
              }}>
                Supervisor Proposal
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                  Proposal Type
                </p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                  {supervisorProposal.proposal_type.replace(/_/g, ' ')}
                </p>
              </div>
              {supervisorProposal.target_position_id && (
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                    Target Position
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                    {supervisorProposal.target_position_id}
                  </p>
                </div>
              )}
            </div>
          </div>

          <ArrowRight className="w-5 h-5 mt-8" style={{ color: 'var(--color-muted-foreground)' }} />

          {/* HC Recommendation */}
          <div 
            className="flex-1 p-4 rounded"
            style={{ backgroundColor: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
              >
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>2</span>
              </div>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-primary)'
              }}>
                HC Recommendation
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)' }}>
                  Zonasi
                </p>
                <span 
                  className="inline-block px-2 py-0.5 rounded"
                  style={{ 
                    backgroundColor: zonasiInfo.bg,
                    color: zonasiInfo.color,
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  {recommendation.zonasi}
                </span>
              </div>
              {recommendation.recommended_position_id && (
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)' }}>
                    Recommended Position
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>
                    {recommendation.recommended_position_id}
                  </p>
                </div>
              )}
              {recommendation.recommended_grade && (
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)' }}>
                    Recommended Grade
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>
                    Grade {recommendation.recommended_grade}
                  </p>
                </div>
              )}
            </div>
          </div>

          <ArrowRight className="w-5 h-5 mt-8" style={{ color: 'var(--color-muted-foreground)' }} />

          {/* TC Decision (Pending) */}
          <div 
            className="flex-1 p-4 rounded"
            style={{ backgroundColor: 'var(--color-warning-light)', border: '1px solid var(--color-warning)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-warning)', color: 'white' }}
              >
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>3</span>
              </div>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-warning)'
              }}>
                TC Decision
              </p>
            </div>
            <div className="text-center py-4">
              <FileCheck className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--color-warning)' }} />
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warning)' }}>
                Awaiting Decision
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HC Rationale */}
      <div 
        className="p-4 rounded mb-5"
        style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
      >
        <p style={{ 
          fontSize: 'var(--text-xs)', 
          color: 'var(--color-muted-foreground)',
          marginBottom: '8px'
        }}>
          HC Rationale
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-foreground)', lineHeight: '1.6' }}>
          {recommendation.hc_rationale}
        </p>
      </div>

      {/* Supervisor Justification */}
      <div 
        className="p-4 rounded mb-5"
        style={{ backgroundColor: '#F9FAFB', border: '1px solid var(--color-border)' }}
      >
        <p style={{ 
          fontSize: 'var(--text-xs)', 
          color: 'var(--color-muted-foreground)',
          marginBottom: '8px'
        }}>
          Supervisor Justification
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-foreground)', lineHeight: '1.6' }}>
          {supervisorProposal.justification}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
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
          View Full Profile
        </button>
        <button
          onClick={onMakeDecision}
          className="px-4 py-2 rounded transition-colors"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-semibold)'
          }}
        >
          Make TC Decision
        </button>
      </div>
    </div>
  );
}
