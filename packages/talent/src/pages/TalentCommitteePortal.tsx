import { useState } from 'react';
import { Layout } from '../components/shell/Layout';
import { Calendar, FileText, CheckCircle, Clock, Gavel, AlertTriangle } from 'lucide-react';
import {
  Button,
  FilterRail,
  PageHeader,
  SectionPanel,
  StatCard,
  StatCardGroup,
  StatusBadge,
} from '@rinjani/shared-ui';
import { 
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

  const decisionBadge = (outcome: string) => {
    switch (outcome) {
      case 'APPROVED':
        return <StatusBadge status="success">Approved</StatusBadge>;
      case 'APPROVED_WITH_MODIFICATION':
        return <StatusBadge status="warning">Modified</StatusBadge>;
      case 'DEFERRED':
        return <StatusBadge status="info">Deferred</StatusBadge>;
      case 'REJECTED':
        return <StatusBadge status="destructive">Rejected</StatusBadge>;
      default:
        return <StatusBadge status="neutral">{outcome.replace(/_/g, ' ')}</StatusBadge>;
    }
  };

  return (
    <Layout breadcrumbs={[
      { label: "Talent Management", href: "/talent" },
      { label: "Talent Committee Portal" }
    ]}>
      <div className="mx-auto max-w-[var(--layout-max-width-workspace)] space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8">
        <PageHeader
          variant="governance"
          eyebrow="Talent Management"
          title="Talent Committee Portal"
          description="Review HC recommendations, track upcoming sessions, and keep the decision history in a more consistent governance cockpit."
          badge={<StatusBadge status={totalPending > 0 ? "warning" : "success"}>{totalPending > 0 ? `${totalPending} pending` : "All clear"}</StatusBadge>}
          actions={
            <Button variant="primary">
              <Calendar className="size-4" />
              Schedule TC Session
            </Button>
          }
        />

        <StatCardGroup>
          <StatCard
            label="Pending Review"
            value={totalPending}
            description="Recommendations that still need TC attention."
            icon={<Clock className="size-6" />}
            tone="warning"
          />
          <StatCard
            label="Scheduled Sessions"
            value={scheduledSessions}
            description="Upcoming TC sessions already planned."
            icon={<Calendar className="size-6" />}
            tone="info"
          />
          <StatCard
            label="Decisions Made"
            value={totalDecisions}
            description="Historical decisions that have been recorded."
            icon={<FileText className="size-6" />}
            tone="neutral"
          />
          <StatCard
            label="Approved"
            value={approvedCount}
            description="Decisions approved without or with minor adjustment."
            icon={<CheckCircle className="size-6" />}
            tone="success"
          />
        </StatCardGroup>

        {totalPending > 0 ? (
          <SectionPanel
            title="Action Required"
            description={`You have ${totalPending} recommendation${totalPending > 1 ? 's' : ''} pending TC review. Next TC session is ${
              upcomingSessions[0]
                ? new Date(upcomingSessions[0].session_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
                : 'TBD'
            }.`}
            actions={<StatusBadge status="warning">Priority</StatusBadge>}
          >
            <div className="flex items-start gap-3 rounded-[20px] border border-warning/20 bg-warning/5 px-4 py-4">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
              <p className="text-sm leading-6 text-warning">
                Action required items should be reviewed before the next committee session.
              </p>
            </div>
          </SectionPanel>
        ) : null}

        <FilterRail
          title="Workspace views"
          description="Switch between pending recommendations, TC sessions, and decision history."
          actionsClassName="w-full"
        >
          <div className="flex w-full flex-wrap gap-2">
            <Button
              type="button"
              onClick={() => setActiveTab('pending')}
              variant={activeTab === 'pending' ? 'secondary' : 'outline'}
            >
              <Clock className="size-4" />
              Pending Review
              <StatusBadge status={activeTab === 'pending' ? 'info' : 'neutral'} className="ml-1 min-w-5 px-1.5 py-0 text-[10px]">
                {totalPending}
              </StatusBadge>
            </Button>
            <Button
              type="button"
              onClick={() => setActiveTab('sessions')}
              variant={activeTab === 'sessions' ? 'secondary' : 'outline'}
            >
              <Calendar className="size-4" />
              TC Sessions
              <StatusBadge status={activeTab === 'sessions' ? 'info' : 'neutral'} className="ml-1 min-w-5 px-1.5 py-0 text-[10px]">
                {tcSessions.length}
              </StatusBadge>
            </Button>
            <Button
              type="button"
              onClick={() => setActiveTab('decisions')}
              variant={activeTab === 'decisions' ? 'secondary' : 'outline'}
            >
              <Gavel className="size-4" />
              Decisions
              <StatusBadge status={activeTab === 'decisions' ? 'info' : 'neutral'} className="ml-1 min-w-5 px-1.5 py-0 text-[10px]">
                {totalDecisions}
              </StatusBadge>
            </Button>
          </div>
        </FilterRail>

        <div className="space-y-6">
          {activeTab === 'pending' && (
            <SectionPanel
              title="HC Recommendations Pending TC Review"
              description="Recommendations from HC that still require a committee decision."
            >
              {pendingRecommendations.length === 0 ? (
                <div className="rounded-[20px] border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
                  <CheckCircle className="mx-auto mb-4 size-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No pending recommendations at this time</p>
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
            </SectionPanel>
          )}

          {activeTab === 'sessions' && (
            <SectionPanel
              title="TC Sessions"
              description="Committee sessions already scheduled or in progress."
            >
              {tcSessions.length === 0 ? (
                <div className="rounded-[20px] border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
                  <Calendar className="mx-auto mb-4 size-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No TC sessions scheduled</p>
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
            </SectionPanel>
          )}

          {activeTab === 'decisions' && (
            <SectionPanel
              title="TC Decisions History"
              description="Historical decisions made by the committee."
            >
              {completedDecisions.length === 0 ? (
                <div className="rounded-[20px] border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
                  <FileText className="mx-auto mb-4 size-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No decisions recorded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {completedDecisions.map((decision) => {
                    const employee = eligibleEmployees.find(e => e.employee_id === decision.employee_id);
                    return (
                      <div 
                        key={decision.decision_id}
                        className="rounded-[20px] border border-border bg-card p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold text-foreground">
                                {employee?.name || 'Unknown Employee'}
                              </h3>
                              {decisionBadge(decision.decision_outcome)}
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div>
                                <p className="text-xs text-muted-foreground">Position</p>
                                <p className="text-sm font-medium text-foreground">
                                  {decision.approved_position_id || '-'}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Grade</p>
                                <p className="text-sm font-medium text-foreground">
                                  {decision.approved_grade || '-'}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Decided Date</p>
                                <p className="text-sm text-foreground">
                                  {new Date(decision.decided_at).toLocaleDateString('id-ID')}
                                </p>
                              </div>
                            </div>
                            <div className="rounded-[16px] border border-border bg-muted/40 p-3">
                              <p className="mb-1 text-xs text-muted-foreground">TC Rationale</p>
                              <p className="text-sm text-foreground">
                                {decision.tc_rationale}
                              </p>
                            </div>
                          </div>
                          <button
                            className="ml-6 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                          >
                            View BA
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </SectionPanel>
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
