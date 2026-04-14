import { AlertTriangle, Award, Building2, Calendar, FileText, TrendingUp, User } from "lucide-react";

import { Button, Card, CardContent, StatusBadge } from "@rinjani/shared-ui";
import { EligibleEmployee } from "../../data/mockTalentReviewData";

interface EligibleEmployeeCardProps {
  employee: EligibleEmployee;
  onSubmitProposal: () => void;
}

const clusterMeta: Record<string, { label: string; variant: "info" | "success" | "warning" | "destructive" | "neutral" }> = {
  HIGH_POTENTIAL: { label: "High Potential", variant: "info" },
  PROMOTABLE: { label: "Promotable", variant: "success" },
  SOLID_CONTRIBUTOR: { label: "Solid Contributor", variant: "neutral" },
  SLEEPING_TIGER: { label: "Sleeping Tiger", variant: "warning" },
  UNFIT: { label: "Unfit", variant: "destructive" },
};

const performanceMeta: Record<string, { label: string; variant: "info" | "success" | "warning" | "destructive" | "neutral" }> = {
  OUTSTANDING: { label: "Outstanding", variant: "success" },
  ABOVE_TARGET: { label: "Above Target", variant: "info" },
  ON_TARGET: { label: "On Target", variant: "neutral" },
  BELOW_TARGET: { label: "Below Target", variant: "warning" },
  POOR: { label: "Poor", variant: "destructive" },
};

function getClusterMeta(cluster: string) {
  return clusterMeta[cluster] ?? { label: cluster, variant: "neutral" as const };
}

function getPerformanceMeta(rating: string) {
  return performanceMeta[rating] ?? { label: rating, variant: "neutral" as const };
}

export function EligibleEmployeeCard({ employee, onSubmitProposal }: EligibleEmployeeCardProps) {
  const cluster = getClusterMeta(employee.cluster);
  const performance = getPerformanceMeta(employee.performance_rating);

  return (
    <Card className="overflow-hidden border-border/80 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <User className="size-6" />
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{employee.name}</h3>
                  <StatusBadge variant={cluster.variant}>{cluster.label}</StatusBadge>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 shrink-0" />
                    <span>NIK: {employee.nik}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="size-4 shrink-0" />
                    <span>{employee.current_position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 shrink-0" />
                    <span>
                      Grade: {employee.current_grade} | PG: {employee.personal_grade}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Company: {employee.company_id}</span>
                  </div>
                </div>

                {(employee.review_flags.position_tenure_3y || employee.review_flags.grade_tenure_3y || employee.review_flags.contract_expiry_soon) ? (
                  <div className="flex flex-wrap gap-2">
                    {employee.review_flags.position_tenure_3y ? (
                      <StatusBadge variant="destructive">
                        <AlertTriangle className="size-3.5" />
                        Position ≥3 years
                      </StatusBadge>
                    ) : null}
                    {employee.review_flags.grade_tenure_3y ? (
                      <StatusBadge variant="warning">
                        <AlertTriangle className="size-3.5" />
                        Grade ≥3 years
                      </StatusBadge>
                    ) : null}
                    {employee.review_flags.contract_expiry_soon ? (
                      <StatusBadge variant="destructive">
                        <Calendar className="size-3.5" />
                        Contract expiry: {employee.contract_expiry_date}
                      </StatusBadge>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-4 xl:min-w-[18rem] xl:items-end">
            <div className="grid grid-cols-3 gap-3 sm:min-w-[16rem]">
              <div className="rounded-2xl border border-border bg-muted/30 p-3 text-right">
                <p className="text-xs font-medium text-muted-foreground">EQS Score</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-primary">{employee.eqs_score.toFixed(1)}</p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/30 p-3 text-right">
                <p className="text-xs font-medium text-muted-foreground">Performance</p>
                <div className="mt-2 flex justify-end">
                  <StatusBadge variant={performance.variant}>{performance.label}</StatusBadge>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-muted/30 p-3 text-right">
                <p className="text-xs font-medium text-muted-foreground">Job Fit</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{employee.job_fit_score}%</p>
              </div>
            </div>

            <p className="text-right text-xs font-medium text-muted-foreground">
              Tenure: {employee.tenure_in_position_years.toFixed(1)}y (position) | {employee.tenure_in_grade_years.toFixed(1)}y (grade)
            </p>

            <div className="flex flex-wrap justify-end gap-2">
              <Button onClick={onSubmitProposal}>
                <FileText className="size-4" />
                Submit Proposal
              </Button>
              <Button variant="outline">View Details</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
