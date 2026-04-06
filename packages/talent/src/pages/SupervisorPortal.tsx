import React, { useState } from 'react';
import { Layout } from '../components/shell/Layout';
import { Search, Users, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { eligibleEmployees, supervisorProposals, getProposalsByEmployee } from '../data/mockTalentReviewData';
import { EligibleEmployeeCard } from '../components/talent-review/EligibleEmployeeCard';
import { SupervisorProposalModal } from '../components/talent-review/SupervisorProposalModal';
import { ProposalHistoryCard } from '../components/talent-review/ProposalHistoryCard';

export default function SupervisorPortal() {
  const [activeTab, setActiveTab] = useState<'team' | 'proposals'>('team');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployeeForProposal, setSelectedEmployeeForProposal] = useState<string | null>(null);

  // Mock supervisor ID (in real app, this would come from auth)
  const supervisorId = "EMP-0007"; // VP Human Capital

  // Get team members (employees under this supervisor)
  const teamMembers = eligibleEmployees.filter(emp => 
    emp.supervisor_id === supervisorId && emp.is_eligible
  );

  // Filter team members by search
  const filteredTeam = teamMembers.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.current_position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get supervisor's proposals
  const myProposals = supervisorProposals.filter(prop => prop.supervisor_id === supervisorId);
  const pendingProposals = myProposals.filter(p => p.status === 'PENDING_HC');
  const draftProposals = myProposals.filter(p => p.status === 'DRAFT');
  const decidedProposals = myProposals.filter(p => p.status === 'PENDING_TC');

  return (
    <Layout breadcrumbs={[
      { label: "Talent Management", href: "/talent" },
      { label: "Supervisor Portal" }
    ]}>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-muted)' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'var(--color-card)' }} className="border-b border-[var(--color-border)]">
          <div className="px-6 py-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 style={{ 
                  fontSize: 'var(--text-2xl)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-foreground)'
                }}>
                  Supervisor Portal
                </h1>
                <p style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--color-muted-foreground)',
                  marginTop: '4px'
                }}>
                  Review and manage talent development for your team
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Team Members
                    </p>
                    <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-foreground)' }}>
                      {teamMembers.length}
                    </p>
                  </div>
                  <Users className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                </div>
              </div>

              <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Pending Review
                    </p>
                    <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-warning)' }}>
                      {pendingProposals.length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8" style={{ color: 'var(--color-warning)' }} />
                </div>
              </div>

              <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Draft Proposals
                    </p>
                    <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-foreground)' }}>
                      {draftProposals.length}
                    </p>
                  </div>
                  <FileText className="w-8 h-8" style={{ color: 'var(--color-muted-foreground)' }} />
                </div>
              </div>

              <div className="p-4 rounded" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
                      Submitted
                    </p>
                    <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-success)' }}>
                      {decidedProposals.length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ backgroundColor: 'var(--color-card)' }} className="border-b border-[var(--color-border)]">
          <div className="px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('team')}
                className="px-4 py-3 relative"
                style={{
                  color: activeTab === 'team' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--text-sm)',
                  borderBottom: activeTab === 'team' ? '2px solid var(--color-primary)' : 'none'
                }}
              >
                <Users className="inline-block w-4 h-4 mr-2" />
                My Team ({teamMembers.length})
              </button>
              <button
                onClick={() => setActiveTab('proposals')}
                className="px-4 py-3 relative"
                style={{
                  color: activeTab === 'proposals' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--text-sm)',
                  borderBottom: activeTab === 'proposals' ? '2px solid var(--color-primary)' : 'none'
                }}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                My Proposals ({myProposals.length})
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {activeTab === 'team' && (
            <div>
              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
                  <input
                    type="text"
                    placeholder="Search team members..."
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
              </div>

              {/* Team Members List */}
              <div>
                <h2 style={{ 
                  fontSize: 'var(--text-lg)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-foreground)',
                  marginBottom: '16px'
                }}>
                  Team Members ({filteredTeam.length})
                </h2>

                {filteredTeam.length === 0 ? (
                  <div className="text-center py-12 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                    <Users className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-muted-foreground)' }} />
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                      No team members found
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredTeam.map((employee) => (
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
          )}

          {activeTab === 'proposals' && (
            <div>
              {/* Pending HC Review */}
              {pendingProposals.length > 0 && (
                <div className="mb-8">
                  <h2 style={{ 
                    fontSize: 'var(--text-lg)', 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-foreground)',
                    marginBottom: '16px'
                  }}>
                    Pending HC Review ({pendingProposals.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {pendingProposals.map((proposal) => (
                      <ProposalHistoryCard key={proposal.proposal_id} proposal={proposal} />
                    ))}
                  </div>
                </div>
              )}

              {/* Draft Proposals */}
              {draftProposals.length > 0 && (
                <div className="mb-8">
                  <h2 style={{ 
                    fontSize: 'var(--text-lg)', 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-foreground)',
                    marginBottom: '16px'
                  }}>
                    Draft Proposals ({draftProposals.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {draftProposals.map((proposal) => (
                      <ProposalHistoryCard key={proposal.proposal_id} proposal={proposal} />
                    ))}
                  </div>
                </div>
              )}

              {/* Submitted to TC */}
              {decidedProposals.length > 0 && (
                <div className="mb-8">
                  <h2 style={{ 
                    fontSize: 'var(--text-lg)', 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-foreground)',
                    marginBottom: '16px'
                  }}>
                    Submitted to TC ({decidedProposals.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {decidedProposals.map((proposal) => (
                      <ProposalHistoryCard key={proposal.proposal_id} proposal={proposal} />
                    ))}
                  </div>
                </div>
              )}

              {myProposals.length === 0 && (
                <div className="text-center py-12 rounded" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                  <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-muted-foreground)' }} />
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted-foreground)' }}>
                    No proposals submitted yet
                  </p>
                </div>
              )}
            </div>
          )}
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
