import React, { useState } from 'react';
import { Layout } from '../components/shell/Layout';
import { Calendar, FileText, Users, CheckCircle, Clock, XCircle, Gavel, AlertTriangle } from 'lucide-react';
import { 
  hcRecommendations, 
  tcSessions, 
  tcDecisions, 
  eligibleEmployees,
  getPendingRecommendationsForTC,
  getUpcomingTCSessions
} from '../data/mockTalentReviewData';
import { TCRecommendationCard } from '../components/talent-review/TCRecommendationCard';
import { TCSessionCard } from '../components/talent-review/TCSessionCard';
import { TCDecisionModal } from '../components/talent-review/TCDecisionModal';

export default function TalentCommitteePortal() {
  const [activeTab, setActiveTab] = useState<'pending' | 'sessions' | 'decisions'>('pending');
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  // Get pending recommendations
  const pendingRecommendations = getPendingRecommendationsForTC();
  
  // Get upcoming TC sessions
  const upcomingSessions = getUpcomingTCSessions();
  
  // Get completed decisions
  const completedDecisions = tcDecisions;

  // Stats
  const totalPending = pendingRecommendations.length;
  const scheduledSessions = upcomingSessions.length;
  const totalDecisions = completedDecisions.length;
  const approvedCount = completedDecisions.filter(d => d.decision_outcome === 'APPROVED').length;

  return (
    <Layout breadcrumbs={[
      { label: "Talent Management", href: "/talent" },
      { label: "Talent Committee Portal" }
    ]}>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-muted)' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'var(--color-card)' }} className="border-b border-[var(--color-border)]">
          <div className="px-6 py-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Gavel className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                  <h1 style={{ 
                    fontSize: 'var(--text-2xl)', 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-foreground)'
                  }}>
                    Talent Committee Portal
                  </h1>
                </div>
                <p style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--color-muted-foreground)',
                  marginTop: '4px'
                }}>
                  Review HC recommendations and make talent decisions
                </p>
              </div>
              <button
                className="px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}
              >
                <Calendar className="inline-block w-4 h-4 mr-2" />
                Schedule TC Session
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Pending Review
                    </p>
                    <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-warning)' }}>
                      {totalPending}
                    </p>
                  </div>
                  <Clock className="w-8 h-8" style={{ color: 'var(--color-warning)' }} />
                </div>
              </div>

              <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Scheduled Sessions
                    </p>
                    <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary)' }}>
                      {scheduledSessions}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                </div>
              </div>

              <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Decisions Made
                    </p>
                    <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-foreground)' }}>
                      {totalDecisions}
                    </p>
                  </div>
                  <FileText className="w-8 h-8" style={{ color: 'var(--color-muted-foreground)' }} />
                </div>
              </div>

              <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Approved
                    </p>
                    <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-success)' }}>
                      {approvedCount}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        {totalPending > 0 && (
          <div className="px-6 pt-6">
            <div 
              className="p-4 rounded flex items-start gap-3"
              style={{ 
                backgroundColor: 'var(--color-warning-light)',
                border: '1px solid var(--color-warning)'
              }}
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-warning)', marginTop: '2px' }} />
              <div>
                <p style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-warning)',
                  marginBottom: '4px'
                }}>
                  ⚠️ Action Required
                </p>
                <p style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--color-warning)'
                }}>
                  You have {totalPending} recommendation{totalPending > 1 ? 's' : ''} pending TC review. 
                  Next TC session scheduled for {upcomingSessions[0] ? new Date(upcomingSessions[0].session_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD'}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ backgroundColor: 'var(--color-card)' }} className="border-b mt-6 border-[var(--color-border)]">
          <div className="px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('pending')}
                className="px-4 py-3 relative"
                style={{
                  color: activeTab === 'pending' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--text-sm)',
                  borderBottom: activeTab === 'pending' ? '2px solid var(--color-primary)' : 'none'
                }}
              >
                <Clock className="inline-block w-4 h-4 mr-2" />
                Pending Review ({totalPending})
              </button>
              <button
                onClick={() => setActiveTab('sessions')}
                className="px-4 py-3 relative"
                style={{
                  color: activeTab === 'sessions' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--text-sm)',
                  borderBottom: activeTab === 'sessions' ? '2px solid var(--color-primary)' : 'none'
                }}
              >
                <Calendar className="inline-block w-4 h-4 mr-2" />
                TC Sessions ({tcSessions.length})
              </button>
              <button
                onClick={() => setActiveTab('decisions')}
                className="px-4 py-3 relative"
                style={{
                  color: activeTab === 'decisions' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--text-sm)',
                  borderBottom: activeTab === 'decisions' ? '2px solid var(--color-primary)' : 'none'
                }}
              >
                <Gavel className="inline-block w-4 h-4 mr-2" />
                Decisions ({totalDecisions})
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {activeTab === 'pending' && (
            <div>
              <h2 style={{ 
                fontSize: 'var(--text-lg)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-foreground)',
                marginBottom: '16px'
              }}>
                HC Recommendations Pending TC Review
              </h2>

              {pendingRecommendations.length === 0 ? (
                <div className="text-center py-12 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                  <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-muted-foreground)' }} />
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                    No pending recommendations at this time
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {pendingRecommendations.map((recommendation) => (
                    <TCRecommendationCard 
                      key={recommendation.recommendation_id} 
                      recommendation={recommendation}
                      onMakeDecision={() => setSelectedRecommendation(recommendation.recommendation_id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'sessions' && (
            <div>
              <h2 style={{ 
                fontSize: 'var(--text-lg)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-foreground)',
                marginBottom: '16px'
              }}>
                TC Sessions
              </h2>

              {tcSessions.length === 0 ? (
                <div className="text-center py-12 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                  <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-muted-foreground)' }} />
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                    No TC sessions scheduled
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {tcSessions.map((session) => (
                    <TCSessionCard 
                      key={session.session_id} 
                      session={session}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'decisions' && (
            <div>
              <h2 style={{ 
                fontSize: 'var(--text-lg)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-foreground)',
                marginBottom: '16px'
              }}>
                TC Decisions History
              </h2>

              {completedDecisions.length === 0 ? (
                <div className="text-center py-12 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                  <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-muted-foreground)' }} />
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                    No decisions recorded yet
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {completedDecisions.map((decision) => {
                    const employee = eligibleEmployees.find(e => e.employee_id === decision.employee_id);
                    return (
                      <div 
                        key={decision.decision_id}
                        className="p-5 rounded"
                        style={{ 
                          backgroundColor: 'var(--color-card)', 
                          border: '1px solid var(--color-border)'
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 style={{ 
                                fontSize: 'var(--text-lg)', 
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--color-foreground)'
                              }}>
                                {employee?.name || 'Unknown Employee'}
                              </h3>
                              <span 
                                className="px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: 'var(--color-success-light)',
                                  color: 'var(--color-success)',
                                  fontSize: 'var(--text-xs)',
                                  fontWeight: 'var(--font-weight-medium)'
                                }}
                              >
                                {decision.decision_outcome.replace(/_/g, ' ')}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div>
                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                                  Position
                                </p>
                                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                                  {decision.approved_position_id || '-'}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                                  Grade
                                </p>
                                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-foreground)' }}>
                                  {decision.approved_grade || '-'}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                                  Decided Date
                                </p>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-foreground)' }}>
                                  {new Date(decision.decided_at).toLocaleDateString('id-ID')}
                                </p>
                              </div>
                            </div>
                            <div 
                              className="p-3 rounded"
                              style={{ backgroundColor: 'var(--color-muted)' }}
                            >
                              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)', marginBottom: '4px' }}>
                                TC Rationale
                              </p>
                              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-foreground)' }}>
                                {decision.tc_rationale}
                              </p>
                            </div>
                          </div>
                          <button
                            className="ml-6 px-4 py-2 rounded"
                            style={{
                              backgroundColor: 'var(--color-card)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-foreground)',
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-medium)'
                            }}
                          >
                            View BA
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* TC Decision Modal */}
        {selectedRecommendation && (
          <TCDecisionModal
            recommendationId={selectedRecommendation}
            onClose={() => setSelectedRecommendation(null)}
          />
        )}
      </div>
    </Layout>
  );
}
