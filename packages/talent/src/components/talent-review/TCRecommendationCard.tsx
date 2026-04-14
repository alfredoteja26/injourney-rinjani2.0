import React from 'react';
import { User, Building2, Award, TrendingUp, FileCheck, ArrowRight } from 'lucide-react';
import { HCRecommendation, eligibleEmployees, supervisorProposals } from '../../data/mockTalentReviewData';
import { Badge, Button, StatusBadge } from '@rinjani/shared-ui';

interface TCRecommendationCardProps {
  recommendation: HCRecommendation;
  onMakeDecision: () => void;
}

export function TCRecommendationCard({ recommendation, onMakeDecision }: TCRecommendationCardProps) {
  const employee = eligibleEmployees.find(e => e.employee_id === recommendation.employee_id);
  const supervisorProposal = supervisorProposals.find(p => p.proposal_id === recommendation.supervisor_proposal_id);

  if (!employee || !supervisorProposal) return null;

  return (
    <div className="rounded-[20px] border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Employee Header */}
      <div className="mb-5 flex items-start gap-4 border-b border-border pb-5">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="size-8" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold text-foreground">{employee.name}</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                NIK: {employee.nik}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {employee.current_position}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Grade: {employee.current_grade} | PG: {employee.personal_grade}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status="info">{employee.cluster.replace('_', ' ')}</StatusBadge>
              <span className="text-sm text-muted-foreground">
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
          <div className="flex-1 rounded-[18px] border border-success/20 bg-success/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-success text-xs font-semibold text-success-foreground">
                1
              </div>
              <p className="text-sm font-semibold text-foreground">
                Supervisor Proposal
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Proposal Type</p>
                <p className="text-sm font-medium text-foreground">
                  {supervisorProposal.proposal_type.replace(/_/g, ' ')}
                </p>
              </div>
              {supervisorProposal.target_position_id && (
                <div>
                  <p className="text-xs text-muted-foreground">Target Position</p>
                  <p className="text-sm font-medium text-foreground">
                    {supervisorProposal.target_position_id}
                  </p>
                </div>
              )}
            </div>
          </div>

          <ArrowRight className="mt-8 size-5 text-muted-foreground" />

          {/* HC Recommendation */}
          <div className="flex-1 rounded-[18px] border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                2
              </div>
              <p className="text-sm font-semibold text-primary">
                HC Recommendation
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-primary">Zonasi</p>
                <Badge variant={recommendation.zonasi === 'INTERNAL' ? 'info' : 'warning'}>
                  {recommendation.zonasi}
                </Badge>
              </div>
              {recommendation.recommended_position_id && (
                <div>
                  <p className="text-xs text-primary">Recommended Position</p>
                  <p className="text-sm font-medium text-primary">
                    {recommendation.recommended_position_id}
                  </p>
                </div>
              )}
              {recommendation.recommended_grade && (
                <div>
                  <p className="text-xs text-primary">Recommended Grade</p>
                  <p className="text-sm font-medium text-primary">
                    Grade {recommendation.recommended_grade}
                  </p>
                </div>
              )}
            </div>
          </div>

          <ArrowRight className="mt-8 size-5 text-muted-foreground" />

          {/* TC Decision (Pending) */}
          <div className="flex-1 rounded-[18px] border border-warning/20 bg-warning/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-warning text-xs font-semibold text-warning-foreground">
                3
              </div>
              <p className="text-sm font-semibold text-warning">
                TC Decision
              </p>
            </div>
            <div className="text-center py-4">
              <FileCheck className="mx-auto mb-2 size-8 text-warning" />
              <p className="text-xs text-warning">
                Awaiting Decision
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HC Rationale */}
      <div className="mb-5 rounded-[16px] border border-border bg-muted/40 p-4">
        <p className="mb-2 text-xs text-muted-foreground">HC Rationale</p>
        <p className="text-sm leading-6 text-foreground">
          {recommendation.hc_rationale}
        </p>
      </div>

      {/* Supervisor Justification */}
      <div className="mb-5 rounded-[16px] border border-border bg-background p-4">
        <p className="mb-2 text-xs text-muted-foreground">Supervisor Justification</p>
        <p className="text-sm leading-6 text-foreground">
          {supervisorProposal.justification}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          View Full Profile
        </Button>
        <Button
          onClick={onMakeDecision}
          variant="primary"
        >
          Make TC Decision
        </Button>
      </div>
    </div>
  );
}
