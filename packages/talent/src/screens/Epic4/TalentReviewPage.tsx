import { useState } from "react";
import { Link } from "react-router";
import { AlertCircle, Calendar, FileText, Gavel, UserCircle2, Users } from "lucide-react";

import { Layout } from "../../components/shell/Layout";
import { eligibleEmployees, periodicReviewCategories } from "../../data/mockTalentReviewData";
import { EligibleEmployeeCard } from "../../components/talent-review/EligibleEmployeeCard";
import { PeriodicReviewDashboard } from "../../components/talent-review/PeriodicReviewDashboard";
import { SupervisorProposalModal } from "../../components/talent-review/SupervisorProposalModal";
import {
  Button,
  Card,
  CardContent,
  FilterRail,
  PageHeader,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SectionPanel,
  StatCard,
  StatCardGroup,
  StatusBadge,
} from "@rinjani/shared-ui";

export function TalentReviewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCluster, setSelectedCluster] = useState<string>("ALL");
  const [selectedCompany, setSelectedCompany] = useState<string>("ALL");
  const [showPeriodicDashboard, setShowPeriodicDashboard] = useState(false);
  const [selectedEmployeeForProposal, setSelectedEmployeeForProposal] = useState<string | null>(null);

  const filteredEmployees = eligibleEmployees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.current_position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCluster = selectedCluster === "ALL" || emp.cluster === selectedCluster;
    const matchesCompany = selectedCompany === "ALL" || emp.company_id === selectedCompany;

    return matchesSearch && matchesCluster && matchesCompany && emp.is_eligible;
  });

  const totalEligible = eligibleEmployees.filter((e) => e.is_eligible).length;
  const positionTenure3y = periodicReviewCategories.find((c) => c.category === "POSITION_TENURE_3Y")?.count || 0;
  const gradeTenure3y = periodicReviewCategories.find((c) => c.category === "GRADE_TENURE_3Y")?.count || 0;
  const contractExpiry = periodicReviewCategories.find((c) => c.category === "CONTRACT_EXPIRY")?.count || 0;

  return (
    <Layout
      breadcrumbs={[
        { label: "Talent Management", href: "/talent" },
        { label: "Talent Review" },
      ]}
    >
      <div className="min-h-screen bg-muted/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <PageHeader
            variant="governance"
            eyebrow="Talent Management"
            title="Talent Review"
            description="Quarterly talent committee agenda management"
            badge={<StatusBadge status="in_progress">Committee workspace</StatusBadge>}
            actions={
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  aria-pressed={showPeriodicDashboard}
                  variant={showPeriodicDashboard ? "secondary" : "outline"}
                  onClick={() => setShowPeriodicDashboard((current) => !current)}
                >
                  <Calendar className="size-4" />
                  Periodic Review
                </Button>
                <Button variant="primary">
                  <FileText className="size-4" />
                  TC Sessions
                </Button>
              </div>
            }
          />

          <StatCardGroup>
            <StatCard
              label="Total Eligible"
              value={totalEligible}
              description="Employees available for talent review"
              icon={<Users className="size-6" />}
              tone="info"
            />
            <StatCard
              label="Position Tenure ≥3Y"
              value={positionTenure3y}
              description="Employees flagged for position tenure review"
              icon={<AlertCircle className="size-6" />}
              tone="destructive"
            />
            <StatCard
              label="Grade Tenure ≥3Y"
              value={gradeTenure3y}
              description="Employees flagged for grade tenure review"
              icon={<AlertCircle className="size-6" />}
              tone="warning"
            />
            <StatCard
              label="Contract Expiry"
              value={contractExpiry}
              description="Employees with contract expiry tracking"
              icon={<Calendar className="size-6" />}
              tone="destructive"
            />
          </StatCardGroup>

          {showPeriodicDashboard ? (
            <SectionPanel
              title="Periodic Review Dashboard"
              description="Monitor employees requiring periodic talent review."
              contentClassName="pt-2"
            >
              <PeriodicReviewDashboard />
            </SectionPanel>
          ) : null}

          <SectionPanel
            title="Role-Based Portals"
            description="Access the supervisor and committee entry points without changing the existing workflow."
            contentClassName="pt-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="overflow-hidden border-border/80 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <UserCircle2 className="size-6" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">My Team</h3>
                        <StatusBadge variant="info">Line manager</StatusBadge>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        Monitor action items, team profile, and line-manager insights from one workspace.
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/talent/supervisor-portal">Open My Team</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border/80 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-warning/10 text-warning">
                      <Gavel className="size-6" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">Talent Committee Portal</h3>
                        <StatusBadge variant="warning">Committee</StatusBadge>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        Review HC recommendations and make final talent decisions.
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/talent/talent-committee">Access Portal</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SectionPanel>

          <FilterRail
            title="Filters"
            description="Search and narrow eligible employees by name, NIK, position, cluster, or company."
            actionsClassName="w-full"
          >
            <SearchInput
              aria-label="Search eligible employees"
              className="w-full md:min-w-[18rem] md:flex-1"
              placeholder="Search by name, NIK, or position..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onClear={() => setSearchTerm("")}
            />

            <Select value={selectedCluster} onValueChange={setSelectedCluster}>
              <SelectTrigger className="w-full md:w-56" size="sm">
                <SelectValue placeholder="All Clusters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Clusters</SelectItem>
                <SelectItem value="HIGH_POTENTIAL">High Potential</SelectItem>
                <SelectItem value="PROMOTABLE">Promotable</SelectItem>
                <SelectItem value="SOLID_CONTRIBUTOR">Solid Contributor</SelectItem>
                <SelectItem value="SLEEPING_TIGER">Sleeping Tiger</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full md:w-64" size="sm">
                <SelectValue placeholder="All Companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Companies</SelectItem>
                <SelectItem value="CO-INJ">InJourney</SelectItem>
                <SelectItem value="CO-API">Angkasa Pura Indonesia</SelectItem>
                <SelectItem value="CO-IAS">Integrasi Aviasi Solusi</SelectItem>
              </SelectContent>
            </Select>
          </FilterRail>

          <SectionPanel
            title={`Eligible Employees (${filteredEmployees.length})`}
            description="Only employees flagged eligible for talent review are shown."
            contentClassName="pt-2"
          >
            {filteredEmployees.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
                <Users className="mb-4 size-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No eligible employees found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredEmployees.map((employee) => (
                  <EligibleEmployeeCard
                    key={employee.employee_id}
                    employee={employee}
                    onSubmitProposal={() => setSelectedEmployeeForProposal(employee.employee_id)}
                  />
                ))}
              </div>
            )}
          </SectionPanel>
        </div>

        {selectedEmployeeForProposal ? (
          <SupervisorProposalModal
            employeeId={selectedEmployeeForProposal}
            onClose={() => setSelectedEmployeeForProposal(null)}
          />
        ) : null}
      </div>
    </Layout>
  );
}
