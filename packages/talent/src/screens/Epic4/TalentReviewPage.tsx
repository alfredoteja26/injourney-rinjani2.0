import { useState } from "react";
import { Layout } from "../../components/shell/Layout";
import { Link } from "react-router";
import { Search, Filter, AlertCircle, Calendar, Users, FileText, Gavel, UserCircle2 } from 'lucide-react';
import { eligibleEmployees, periodicReviewCategories } from '../../data/mockTalentReviewData';
import { EligibleEmployeeCard } from '../../components/talent-review/EligibleEmployeeCard';
import { PeriodicReviewDashboard } from '../../components/talent-review/PeriodicReviewDashboard';
import { SupervisorProposalModal } from '../../components/talent-review/SupervisorProposalModal';

export function TalentReviewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string>('ALL');
  const [selectedCompany, setSelectedCompany] = useState<string>('ALL');
  const [showPeriodicDashboard, setShowPeriodicDashboard] = useState(false);
  const [selectedEmployeeForProposal, setSelectedEmployeeForProposal] = useState<string | null>(null);

  // Get filtered employees
  const filteredEmployees = eligibleEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.current_position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCluster = selectedCluster === 'ALL' || emp.cluster === selectedCluster;
    const matchesCompany = selectedCompany === 'ALL' || emp.company_id === selectedCompany;
    
    return matchesSearch && matchesCluster && matchesCompany && emp.is_eligible;
  });

  // Stats
  const totalEligible = eligibleEmployees.filter(e => e.is_eligible).length;
  const positionTenure3y = periodicReviewCategories.find(c => c.category === 'POSITION_TENURE_3Y')?.count || 0;
  const gradeTenure3y = periodicReviewCategories.find(c => c.category === 'GRADE_TENURE_3Y')?.count || 0;
  const contractExpiry = periodicReviewCategories.find(c => c.category === 'CONTRACT_EXPIRY')?.count || 0;

  return (
    <Layout breadcrumbs={[
      { label: "Talent Management", href: "/talent" },
      { label: "Talent Review" }
    ]}>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-muted)' }}>
        {/* Header */}
        <div
          className="border-b"
          style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 style={{ 
                  fontSize: 'var(--text-2xl)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-foreground)'
                }}>
                  Talent Review
                </h1>
                <p style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--color-muted-foreground)',
                  marginTop: '4px'
                }}>
                  Quarterly talent committee agenda management
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPeriodicDashboard(!showPeriodicDashboard)}
                  className="px-4 py-2 rounded"
                  style={{
                    backgroundColor: showPeriodicDashboard ? 'var(--color-primary)' : 'var(--color-card)',
                    color: showPeriodicDashboard ? 'var(--color-primary-foreground)' : 'var(--color-foreground)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Periodic Review
                </button>
                <button
                  className="px-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}
                >
                  <FileText className="inline-block w-4 h-4 mr-2" />
                  TC Sessions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                    Total Eligible
                  </p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-foreground)' }}>
                    {totalEligible}
                  </p>
                </div>
                <Users className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
              </div>
            </div>

            <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                    Position Tenure ≥3Y
                  </p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: '#F04438' }}>
                    {positionTenure3y}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8" style={{ color: '#F04438' }} />
              </div>
            </div>

            <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                    Grade Tenure ≥3Y
                  </p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: '#F79009' }}>
                    {gradeTenure3y}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8" style={{ color: '#F79009' }} />
              </div>
            </div>

            <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                    Contract Expiry
                  </p>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: '#F04438' }}>
                    {contractExpiry}
                  </p>
                </div>
                <Calendar className="w-8 h-8" style={{ color: '#F04438' }} />
              </div>
            </div>
          </div>

          {/* Periodic Dashboard */}
          {showPeriodicDashboard && (
            <div className="mb-6">
              <PeriodicReviewDashboard />
            </div>
          )}

          {/* Role-Based Portal Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link 
              to="/talent/supervisor-portal"
              className="block"
            >
              <div 
                className="p-5 rounded transition-all hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '2px solid var(--color-border)',
                  cursor: 'pointer'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#EFF8FF' }}
                  >
                    <UserCircle2 className="w-6 h-6" style={{ color: '#2E90FA' }} />
                  </div>
                  <div className="flex-1">
                    <h3 style={{ 
                      fontSize: 'var(--text-base)', 
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-foreground)',
                      marginBottom: '4px'
                    }}>
                      Supervisor Portal
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      color: 'var(--color-muted-foreground)',
                      lineHeight: '1.5'
                    }}>
                      Review your team members and submit talent development proposals
                    </p>
                    <p style={{ 
                      fontSize: 'var(--text-xs)', 
                      color: '#2E90FA',
                      marginTop: '8px',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      Access Portal →
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link 
              to="/talent/talent-committee"
              className="block"
            >
              <div 
                className="p-5 rounded transition-all hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '2px solid var(--color-border)',
                  cursor: 'pointer'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FFF4ED' }}
                  >
                    <Gavel className="w-6 h-6" style={{ color: '#F79009' }} />
                  </div>
                  <div className="flex-1">
                    <h3 style={{ 
                      fontSize: 'var(--text-base)', 
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-foreground)',
                      marginBottom: '4px'
                    }}>
                      Talent Committee Portal
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      color: 'var(--color-muted-foreground)',
                      lineHeight: '1.5'
                    }}>
                      Review HC recommendations and make final talent decisions
                    </p>
                    <p style={{ 
                      fontSize: 'var(--text-xs)', 
                      color: '#F79009',
                      marginTop: '8px',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      Access Portal →
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Filters and Search */}
          <div className="p-4 rounded mb-6" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
                <input
                  type="text"
                  placeholder="Search by name, NIK, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--color-input-background)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-foreground)'
                  }}
                />
              </div>

              {/* Cluster Filter */}
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--color-input-background)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-foreground)'
                }}
              >
                <option value="ALL">All Clusters</option>
                <option value="HIGH_POTENTIAL">High Potential</option>
                <option value="PROMOTABLE">Promotable</option>
                <option value="SOLID_CONTRIBUTOR">Solid Contributor</option>
                <option value="SLEEPING_TIGER">Sleeping Tiger</option>
              </select>

              {/* Company Filter */}
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--color-input-background)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-foreground)'
                }}
              >
                <option value="ALL">All Companies</option>
                <option value="CO-INJ">InJourney</option>
                <option value="CO-API">Angkasa Pura Indonesia</option>
                <option value="CO-IAS">Integrasi Aviasi Solusi</option>
              </select>
            </div>
          </div>

          {/* Employee List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ 
                fontSize: 'var(--text-lg)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-foreground)'
              }}>
                Eligible Employees ({filteredEmployees.length})
              </h2>
            </div>

            {filteredEmployees.length === 0 ? (
              <div className="text-center py-12 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <Users className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-muted-foreground)' }} />
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                  No eligible employees found matching your filters
                </p>
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
          </div>
        </div>

        {/* Supervisor Proposal Modal */}
        {selectedEmployeeForProposal && (
          <SupervisorProposalModal
            employeeId={selectedEmployeeForProposal}
            onClose={() => setSelectedEmployeeForProposal(null)}
          />
        )}
      </div>
    </Layout>
  );
}
