import React, { useState } from 'react';
import { X, User, CheckCircle, XCircle, Clock, AlertTriangle, FileText } from 'lucide-react';
import { hcRecommendations, eligibleEmployees, supervisorProposals, ReviewDecisionOutcome } from '../../data/mockTalentReviewData';

interface TCDecisionModalProps {
  recommendationId: string;
  onClose: () => void;
}

export function TCDecisionModal({ recommendationId, onClose }: TCDecisionModalProps) {
  const recommendation = hcRecommendations.find(r => r.recommendation_id === recommendationId);
  const employee = recommendation ? eligibleEmployees.find(e => e.employee_id === recommendation.employee_id) : null;
  const supervisorProposal = recommendation ? supervisorProposals.find(p => p.proposal_id === recommendation.supervisor_proposal_id) : null;

  const [decisionOutcome, setDecisionOutcome] = useState<ReviewDecisionOutcome>('APPROVED');
  const [approvedPosition, setApprovedPosition] = useState(recommendation?.recommended_position_id || '');
  const [approvedGrade, setApprovedGrade] = useState(recommendation?.recommended_grade?.toString() || '');
  const [approvedSalary, setApprovedSalary] = useState(recommendation?.recommended_salary_increase?.toString() || '');
  const [tcRationale, setTcRationale] = useState('');
  const [generateBA, setGenerateBA] = useState(true);

  if (!recommendation || !employee || !supervisorProposal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('TC Decision:', {
      recommendationId,
      decisionOutcome,
      approvedPosition,
      approvedGrade,
      approvedSalary,
      tcRationale,
      generateBA
    });

    alert(`TC Decision ${decisionOutcome} submitted successfully!${generateBA ? '\n\nBerita Acara will be generated.' : ''}`);
    onClose();
  };

  const decisionOptions = [
    { 
      value: 'APPROVED', 
      label: 'Approved', 
      description: 'Approve as recommended by HC',
      color: 'var(--color-success)',
      bgColor: 'var(--color-success-light)',
      icon: <CheckCircle className="w-5 h-5" />
    },
    { 
      value: 'APPROVED_WITH_MODIFICATION', 
      label: 'Approved with Modification', 
      description: 'Approve with adjustments to recommendation',
      color: 'var(--color-primary)',
      bgColor: 'var(--color-primary-light)',
      icon: <FileText className="w-5 h-5" />
    },
    { 
      value: 'DEFERRED', 
      label: 'Deferred', 
      description: 'Postpone decision pending more information',
      color: 'var(--color-warning)',
      bgColor: 'var(--color-warning-light)',
      icon: <Clock className="w-5 h-5" />
    },
    { 
      value: 'REJECTED', 
      label: 'Rejected', 
      description: 'Reject the recommendation',
      color: 'var(--color-destructive)',
      bgColor: 'var(--color-danger-light)',
      icon: <XCircle className="w-5 h-5" />
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl rounded-lg shadow-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-card)', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between border-b"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-muted)' }}
        >
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-xl)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-foreground)'
            }}>
              Talent Committee Decision
            </h2>
            <p style={{ 
              fontSize: 'var(--text-sm)', 
              color: 'var(--color-muted-foreground)',
              marginTop: '4px'
            }}>
              Review HC recommendation and make final decision
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
            style={{ backgroundColor: 'transparent' }}
          >
            <X className="w-5 h-5" style={{ color: 'var(--color-muted-foreground)' }} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <div className="p-6">
            {/* Employee Summary */}
            <div 
              className="p-5 rounded mb-6"
              style={{ 
                backgroundColor: 'var(--color-muted)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div className="flex items-start gap-4">
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
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                        NIK
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                        {employee.nik}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                        Current Position
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                        {employee.current_position}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                        Grade | Cluster
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                        Grade {employee.current_grade} | {employee.cluster.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                        EQS Score
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>
                        {employee.eqs_score.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                        Performance
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-success)' }}>
                        {employee.performance_rating}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                        Job Fit
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                        {employee.job_fit_score}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HC Recommendation Summary */}
            <div className="mb-6">
              <h3 style={{ 
                fontSize: 'var(--text-base)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-foreground)',
                marginBottom: '12px'
              }}>
                HC Recommendation
              </h3>
              <div 
                className="p-4 rounded"
                style={{ backgroundColor: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}
              >
                <div className="grid grid-cols-3 gap-4 mb-3">
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
                  {recommendation.recommended_salary_increase && (
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)' }}>
                        Salary Increase
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>
                        +{recommendation.recommended_salary_increase}%
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', marginBottom: '4px' }}>
                    HC Rationale
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', lineHeight: '1.6' }}>
                    {recommendation.hc_rationale}
                  </p>
                </div>
              </div>
            </div>

            {/* TC Decision Form */}
            <form onSubmit={handleSubmit}>
              {/* Decision Outcome */}
              <div className="mb-6">
                <label style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-foreground)',
                  display: 'block',
                  marginBottom: '12px'
                }}>
                  TC Decision <span style={{ color: 'var(--color-destructive)' }}>*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {decisionOptions.map((option) => (
                    <label 
                      key={option.value}
                      className="cursor-pointer"
                    >
                      <div 
                        className="p-4 rounded transition-all"
                        style={{
                          backgroundColor: decisionOutcome === option.value ? option.bgColor : 'var(--color-muted)',
                          border: `2px solid ${decisionOutcome === option.value ? option.color : 'var(--color-border)'}`
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="decisionOutcome"
                            value={option.value}
                            checked={decisionOutcome === option.value}
                            onChange={(e) => setDecisionOutcome(e.target.value as ReviewDecisionOutcome)}
                            style={{ marginTop: '3px' }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span style={{ color: option.color }}>
                                {option.icon}
                              </span>
                              <span style={{ 
                                fontSize: 'var(--text-sm)', 
                                fontWeight: 'var(--font-weight-semibold)',
                                color: decisionOutcome === option.value ? option.color : 'var(--color-foreground)'
                              }}>
                                {option.label}
                              </span>
                            </div>
                            <p style={{ 
                              fontSize: 'var(--text-xs)', 
                              color: 'var(--color-muted-foreground)'
                            }}>
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Conditional Fields for Approved/Modified */}
              {(decisionOutcome === 'APPROVED' || decisionOutcome === 'APPROVED_WITH_MODIFICATION') && (
                <div className="mb-6">
                  <h3 style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-foreground)',
                    marginBottom: '12px'
                  }}>
                    Approval Details
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label style={{ 
                        fontSize: 'var(--text-xs)', 
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-foreground)',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        Approved Position
                      </label>
                      <input
                        type="text"
                        value={approvedPosition}
                        onChange={(e) => setApprovedPosition(e.target.value)}
                        className="w-full px-3 py-2 rounded"
                        style={{
                          backgroundColor: 'var(--color-input-background)',
                          border: '1px solid var(--color-border)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-foreground)'
                        }}
                        placeholder="Position ID"
                      />
                    </div>
                    <div>
                      <label style={{ 
                        fontSize: 'var(--text-xs)', 
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-foreground)',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        Approved Grade
                      </label>
                      <input
                        type="number"
                        value={approvedGrade}
                        onChange={(e) => setApprovedGrade(e.target.value)}
                        className="w-full px-3 py-2 rounded"
                        style={{
                          backgroundColor: 'var(--color-input-background)',
                          border: '1px solid var(--color-border)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-foreground)'
                        }}
                        placeholder="Grade"
                      />
                    </div>
                    <div>
                      <label style={{ 
                        fontSize: 'var(--text-xs)', 
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-foreground)',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        Salary Increase %
                      </label>
                      <input
                        type="number"
                        value={approvedSalary}
                        onChange={(e) => setApprovedSalary(e.target.value)}
                        step="0.5"
                        className="w-full px-3 py-2 rounded"
                        style={{
                          backgroundColor: 'var(--color-input-background)',
                          border: '1px solid var(--color-border)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-foreground)'
                        }}
                        placeholder="%"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TC Rationale */}
              <div className="mb-6">
                <label style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-foreground)',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  TC Rationale <span style={{ color: 'var(--color-destructive)' }}>*</span>
                </label>
                <textarea
                  value={tcRationale}
                  onChange={(e) => setTcRationale(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded resize-none"
                  style={{
                    backgroundColor: 'var(--color-input-background)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-foreground)'
                  }}
                  placeholder="Provide detailed rationale for TC decision (minimum 100 characters)..."
                  required
                  minLength={100}
                />
                <p style={{ 
                  fontSize: 'var(--text-xs)', 
                  color: tcRationale.length < 100 ? 'var(--color-destructive)' : 'var(--color-muted-foreground)',
                  marginTop: '4px'
                }}>
                  {tcRationale.length}/500 characters (minimum 100)
                </p>
              </div>

              {/* Generate Berita Acara */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generateBA}
                    onChange={(e) => setGenerateBA(e.target.checked)}
                    style={{ marginTop: '3px' }}
                  />
                  <div>
                    <span style={{ 
                      fontSize: 'var(--text-sm)', 
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-foreground)'
                    }}>
                      Generate Berita Acara (Minutes of Meeting)
                    </span>
                    <p style={{ 
                      fontSize: 'var(--text-xs)', 
                      color: 'var(--color-muted-foreground)',
                      marginTop: '2px'
                    }}>
                      Automatically generate official meeting minutes document for this TC decision
                    </p>
                  </div>
                </label>
              </div>

              {/* Warning Box */}
              <div 
                className="p-4 rounded mb-6"
                style={{ 
                  backgroundColor: '#FFF4ED',
                  border: '1px solid #F79009'
                }}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#F79009', marginTop: '2px' }} />
                  <div>
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      fontWeight: 'var(--font-weight-medium)',
                      color: '#B54708',
                      marginBottom: '4px'
                    }}>
                      Important Notice
                    </p>
                    <ul style={{ 
                      fontSize: 'var(--text-xs)', 
                      color: '#B54708',
                      paddingLeft: '16px',
                      listStyleType: 'disc'
                    }}>
                      <li>TC decision is final and will be recorded in the system</li>
                      <li>All stakeholders will be notified via email</li>
                      <li>Berita Acara will require digital signatures from TC members</li>
                      <li>Decision effective date will be based on TC session date</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-foreground)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}
                  disabled={tcRationale.length < 100}
                >
                  Submit TC Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
