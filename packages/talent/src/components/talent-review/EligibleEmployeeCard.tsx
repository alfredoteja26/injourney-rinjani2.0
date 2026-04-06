import React from 'react';
import { User, Building2, Award, TrendingUp, AlertTriangle, Calendar, FileText } from 'lucide-react';
import { EligibleEmployee } from '../../data/mockTalentReviewData';

interface EligibleEmployeeCardProps {
  employee: EligibleEmployee;
  onSubmitProposal: () => void;
}

export function EligibleEmployeeCard({ employee, onSubmitProposal }: EligibleEmployeeCardProps) {
  // Cluster color mapping
  const getClusterColor = (cluster: string): string => {
    switch (cluster) {
      case 'HIGH_POTENTIAL': return 'var(--color-nine-highpot)';
      case 'PROMOTABLE': return 'var(--color-nine-emerging)';
      case 'SOLID_CONTRIBUTOR': return 'var(--color-nine-solid)';
      case 'SLEEPING_TIGER': return 'var(--color-nine-moderate)';
      case 'UNFIT': return 'var(--color-nine-atrisk)';
      default: return 'var(--color-muted)';
    }
  };

  const getClusterLabel = (cluster: string): string => {
    switch (cluster) {
      case 'HIGH_POTENTIAL': return 'High Potential';
      case 'PROMOTABLE': return 'Promotable';
      case 'SOLID_CONTRIBUTOR': return 'Solid Contributor';
      case 'SLEEPING_TIGER': return 'Sleeping Tiger';
      case 'UNFIT': return 'Unfit';
      default: return cluster;
    }
  };

  const getPerformanceColor = (rating: string): string => {
    switch (rating) {
      case 'OUTSTANDING': return 'var(--color-success)';
      case 'ABOVE_TARGET': return '#3B82F6'; // Keep blue for distinction
      case 'ON_TARGET': return 'var(--color-warning)'; // Warning is orange-500, similar to amber
      case 'BELOW_TARGET': return '#F97316'; // Orange-500
      case 'POOR': return 'var(--color-destructive)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getPerformanceLabel = (rating: string): string => {
    switch (rating) {
      case 'OUTSTANDING': return 'Outstanding';
      case 'ABOVE_TARGET': return 'Above Target';
      case 'ON_TARGET': return 'On Target';
      case 'BELOW_TARGET': return 'Below Target';
      case 'POOR': return 'Poor';
      default: return rating;
    }
  };

  return (
    <div 
      className="p-5 rounded transition-all hover:shadow-md"
      style={{ 
        backgroundColor: 'var(--color-card)', 
        border: '1px solid var(--color-border)'
      }}
    >
      <div className="flex items-start justify-between">
        {/* Left Section - Employee Info */}
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
                  {employee.name}
                </h3>
                <span 
                  className="px-2 py-0.5 rounded"
                  style={{ 
                    backgroundColor: getClusterColor(employee.cluster) + '20',
                    color: getClusterColor(employee.cluster),
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  {getClusterLabel(employee.cluster)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
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
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                    Company: {employee.company_id}
                  </span>
                </div>
              </div>

              {/* Review Flags */}
              {(employee.review_flags.position_tenure_3y || 
                employee.review_flags.grade_tenure_3y || 
                employee.review_flags.contract_expiry_soon) && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {employee.review_flags.position_tenure_3y && (
                    <span 
                      className="px-2 py-1 rounded flex items-center gap-1"
                      style={{ 
                        backgroundColor: 'var(--color-danger-light)',
                        color: 'var(--color-destructive)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      Position ≥3 years
                    </span>
                  )}
                  {employee.review_flags.grade_tenure_3y && (
                    <span 
                      className="px-2 py-1 rounded flex items-center gap-1"
                      style={{ 
                        backgroundColor: 'var(--color-warning-light)',
                        color: 'var(--color-warning)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      Grade ≥3 years
                    </span>
                  )}
                  {employee.review_flags.contract_expiry_soon && (
                    <span 
                      className="px-2 py-1 rounded flex items-center gap-1"
                      style={{ 
                        backgroundColor: 'var(--color-danger-light)',
                        color: 'var(--color-destructive)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}
                    >
                      <Calendar className="w-3 h-3" />
                      Contract Expiry: {employee.contract_expiry_date}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Metrics & Actions */}
        <div className="flex flex-col items-end gap-4 ml-6">
          {/* Metrics */}
          <div className="flex gap-6">
            <div className="text-right">
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                EQS Score
              </p>
              <p style={{ 
                fontSize: 'var(--text-xl)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-primary)'
              }}>
                {employee.eqs_score.toFixed(1)}
              </p>
            </div>
            <div className="text-right">
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                Performance
              </p>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                fontWeight: 'var(--font-weight-medium)',
                color: getPerformanceColor(employee.performance_rating)
              }}>
                {getPerformanceLabel(employee.performance_rating)}
              </p>
            </div>
            <div className="text-right">
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                Job Fit
              </p>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-foreground)'
              }}>
                {employee.job_fit_score}%
              </p>
            </div>
          </div>

          {/* Tenure Info */}
          <div className="text-right">
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
              Tenure: {employee.tenure_in_position_years.toFixed(1)}y (position) | {employee.tenure_in_grade_years.toFixed(1)}y (grade)
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onSubmitProposal}
              className="px-4 py-2 rounded transition-colors"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              <FileText className="inline-block w-4 h-4 mr-2" />
              Submit Proposal
            </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
