import React, { useState } from 'react';
import { X, User, Building2, Award, TrendingUp, AlertCircle } from 'lucide-react';
import { eligibleEmployees, ReviewProposalType } from '../../data/mockTalentReviewData';

interface SupervisorProposalModalProps {
  employeeId: string;
  onClose: () => void;
}

export function SupervisorProposalModal({ employeeId, onClose }: SupervisorProposalModalProps) {
  const employee = eligibleEmployees.find(e => e.employee_id === employeeId);
  
  const [proposalType, setProposalType] = useState<ReviewProposalType>('PROMOTION_GRADE_JABATAN');
  const [targetPosition, setTargetPosition] = useState('');
  const [targetGrade, setTargetGrade] = useState('');
  const [salaryIncrease, setSalaryIncrease] = useState('');
  const [justification, setJustification] = useState('');

  if (!employee) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting proposal:', {
      employeeId,
      proposalType,
      targetPosition,
      targetGrade,
      salaryIncrease,
      justification
    });
    alert('Proposal submitted successfully!');
    onClose();
  };

  const proposalTypes = [
    { value: 'PROMOTION_GRADE_JABATAN', label: 'Promotion (Position & Grade)', eligible: ['HIGH_POTENTIAL', 'PROMOTABLE'] },
    { value: 'PROMOTION_PERSONAL_GRADE', label: 'Promotion (Personal Grade Only)', eligible: ['HIGH_POTENTIAL', 'PROMOTABLE', 'SOLID_CONTRIBUTOR'] },
    { value: 'ENRICHMENT', label: 'Enrichment / Tour of Duty', eligible: ['HIGH_POTENTIAL', 'PROMOTABLE', 'SOLID_CONTRIBUTOR', 'SLEEPING_TIGER'] },
    { value: 'SALARY_INCREASE', label: 'Salary Increase', eligible: ['HIGH_POTENTIAL', 'PROMOTABLE', 'SOLID_CONTRIBUTOR'] },
    { value: 'ROTATION', label: 'Rotation', eligible: ['HIGH_POTENTIAL', 'PROMOTABLE', 'SOLID_CONTRIBUTOR', 'SLEEPING_TIGER'] },
    { value: 'DEVELOPMENT_PROGRAM', label: 'Development Program', eligible: ['HIGH_POTENTIAL', 'PROMOTABLE', 'SOLID_CONTRIBUTOR', 'SLEEPING_TIGER'] },
    { value: 'DEMOTION_PERSONAL_GRADE', label: 'Demotion (Personal Grade)', eligible: ['UNFIT'] }
  ];

  const isTypeEligible = (type: { eligible: string[] }) => {
    return type.eligible.includes(employee.cluster);
  };

  const maxGradePromotion = employee.cluster === 'HIGH_POTENTIAL' ? 3 : 1;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-lg shadow-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-card)', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-xl)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-foreground)'
            }}>
              Supervisor Talent Review
            </h2>
            <p style={{ 
              fontSize: 'var(--text-sm)', 
              color: 'var(--color-muted-foreground)',
              marginTop: '4px'
            }}>
              Submit aspiration proposal for employee
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
            {/* Employee Info Card */}
            <div 
              className="p-4 rounded mb-6"
              style={{ 
                backgroundColor: 'var(--color-muted)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <User className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="flex-1">
                  <h3 style={{ 
                    fontSize: 'var(--text-lg)', 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-foreground)',
                    marginBottom: '4px'
                  }}>
                    {employee.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
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
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Proposal Type */}
              <div className="mb-6">
                <label style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-foreground)',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Aspiration Type <span style={{ color: 'var(--color-destructive)' }}>*</span>
                </label>
                <div className="space-y-2">
                  {proposalTypes.map((type) => (
                    <label 
                      key={type.value}
                      className={`flex items-start gap-3 p-3 rounded cursor-pointer transition-all ${
                        !isTypeEligible(type) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      style={{
                        backgroundColor: proposalType === type.value ? 'var(--color-primary-light)' : 'var(--color-muted)',
                        border: `1px solid ${proposalType === type.value ? 'var(--color-primary)' : 'var(--color-border)'}`
                      }}
                    >
                      <input
                        type="radio"
                        name="proposalType"
                        value={type.value}
                        checked={proposalType === type.value}
                        onChange={(e) => setProposalType(e.target.value as ReviewProposalType)}
                        disabled={!isTypeEligible(type)}
                        style={{ marginTop: '3px' }}
                      />
                      <div className="flex-1">
                        <span style={{ 
                          fontSize: 'var(--text-sm)', 
                          fontWeight: 'var(--font-weight-medium)',
                          color: 'var(--color-foreground)'
                        }}>
                          {type.label}
                        </span>
                        {type.value === 'PROMOTION_GRADE_JABATAN' && (
                          <p style={{ 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--color-muted-foreground)',
                            marginTop: '2px'
                          }}>
                            Max +{maxGradePromotion} grade for {employee.cluster.replace('_', ' ')}
                          </p>
                        )}
                        {!isTypeEligible(type) && (
                          <p style={{ 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--color-destructive)',
                            marginTop: '2px'
                          }}>
                            Not eligible for current cluster
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Conditional Fields */}
              {(proposalType === 'PROMOTION_GRADE_JABATAN' || proposalType === 'ROTATION') && (
                <div className="mb-6">
                  <label style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-foreground)',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Target Position
                  </label>
                  <select
                    value={targetPosition}
                    onChange={(e) => setTargetPosition(e.target.value)}
                    className="w-full px-4 py-2 rounded"
                    style={{
                      backgroundColor: 'var(--color-input-background)',
                      border: '1px solid var(--color-border)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-foreground)'
                    }}
                  >
                    <option value="">Select target position...</option>
                    <option value="POS-HC-DIR-001">Director SDM (Grade 21)</option>
                    <option value="POS-HC-VP-001">VP Human Capital (Grade 18)</option>
                    <option value="POS-HC-MGR-OPS-001">Manager HR Operations (Grade 15)</option>
                    <option value="POS-FIN-VP-001">VP Finance (Grade 18)</option>
                  </select>
                </div>
              )}

              {(proposalType === 'PROMOTION_GRADE_JABATAN' || proposalType === 'PROMOTION_PERSONAL_GRADE') && (
                <div className="mb-6">
                  <label style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-foreground)',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Target Grade
                  </label>
                  <input
                    type="number"
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    min={employee.current_grade}
                    max={employee.current_grade + maxGradePromotion}
                    className="w-full px-4 py-2 rounded"
                    style={{
                      backgroundColor: 'var(--color-input-background)',
                      border: '1px solid var(--color-border)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-foreground)'
                    }}
                    placeholder={`Current: ${employee.current_grade}, Max: ${employee.current_grade + maxGradePromotion}`}
                  />
                </div>
              )}

              {proposalType === 'SALARY_INCREASE' && (
                <div className="mb-6">
                  <label style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-foreground)',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Salary Increase Percentage
                  </label>
                  <input
                    type="number"
                    value={salaryIncrease}
                    onChange={(e) => setSalaryIncrease(e.target.value)}
                    min={0}
                    max={10}
                    step={0.5}
                    className="w-full px-4 py-2 rounded"
                    style={{
                      backgroundColor: 'var(--color-input-background)',
                      border: '1px solid var(--color-border)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-foreground)'
                    }}
                    placeholder="Max 10%"
                  />
                  <p style={{ 
                    fontSize: 'var(--text-xs)', 
                    color: 'var(--color-muted-foreground)',
                    marginTop: '4px'
                  }}>
                    Maximum salary increase: 10%
                  </p>
                </div>
              )}

              {/* Justification */}
              <div className="mb-6">
                <label style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-foreground)',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Justification <span style={{ color: 'var(--color-destructive)' }}>*</span>
                </label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded resize-none"
                  style={{
                    backgroundColor: 'var(--color-input-background)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-foreground)'
                  }}
                  placeholder="Provide detailed justification for this proposal (minimum 100 characters)..."
                  required
                  minLength={100}
                />
                <p style={{ 
                  fontSize: 'var(--text-xs)', 
                  color: justification.length < 100 ? 'var(--color-destructive)' : 'var(--color-muted-foreground)',
                  marginTop: '4px'
                }}>
                  {justification.length}/500 characters (minimum 100)
                </p>
              </div>

              {/* Info Box */}
              <div 
                className="p-4 rounded mb-6"
                style={{ 
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid var(--color-primary)'
                }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-primary)', marginTop: '2px' }} />
                  <div>
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-primary)',
                      marginBottom: '4px'
                    }}>
                      Important Notes
                    </p>
                    <ul style={{ 
                      fontSize: 'var(--text-xs)', 
                      color: 'var(--color-primary)',
                      paddingLeft: '16px',
                      listStyleType: 'disc'
                    }}>
                      <li>This proposal will be reviewed by HC Admin before being submitted to Talent Committee</li>
                      <li>All proposals must be supported by performance data and competency assessments</li>
                      <li>Approval is subject to TC decision and available budget/positions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded"
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
                  className="px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}
                  disabled={justification.length < 100}
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
