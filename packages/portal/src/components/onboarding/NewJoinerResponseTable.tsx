import React, { useState } from 'react';
import { Search, Eye, Download, Calendar, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface NewJoinerResponse {
  id: string;
  fullName: string;
  email: string;
  position: string;
  department: string;
  submittedAt: string;
  status: 'pending-review' | 'approved' | 'needs-revision';
  formId: string;
}

interface NewJoinerResponseTableProps {
  onViewResponse: (responseId: string) => void;
}

export function NewJoinerResponseTable({ onViewResponse }: NewJoinerResponseTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | NewJoinerResponse['status']>('all');

  // Mock data - in production, fetch from API
  const [responses, setResponses] = useState<NewJoinerResponse[]>([
    {
      id: '1',
      fullName: 'Binavia Wardhani',
      email: 'binavia.wardhani@injourney.co.id',
      position: 'HC Strategy Senior Officer',
      department: 'Human Capital',
      submittedAt: '2026-01-10T14:30:00',
      status: 'approved',
      formId: 'form-001'
    },
    {
      id: '2',
      fullName: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@injourney.co.id',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      submittedAt: '2026-01-11T09:15:00',
      status: 'pending-review',
      formId: 'form-001'
    },
    {
      id: '3',
      fullName: 'Maya Putri',
      email: 'maya.putri@injourney.co.id',
      position: 'UI/UX Designer',
      department: 'Design',
      submittedAt: '2026-01-11T16:45:00',
      status: 'needs-revision',
      formId: 'form-001'
    },
    {
      id: '4',
      fullName: 'Rudi Hartono',
      email: 'rudi.hartono@injourney.co.id',
      position: 'Finance Analyst',
      department: 'Finance',
      submittedAt: '2026-01-12T11:20:00',
      status: 'pending-review',
      formId: 'form-002'
    }
  ]);

  const filteredResponses = responses.filter(response => {
    const matchesSearch = 
      response.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || response.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (responseId: string) => {
    setResponses(prev => prev.map(r => 
      r.id === responseId ? { ...r, status: 'approved' as const } : r
    ));
    alert('Response approved successfully!');
  };

  const handleRequestRevision = (responseId: string) => {
    const reason = prompt('Enter revision reason:');
    if (reason) {
      setResponses(prev => prev.map(r => 
        r.id === responseId ? { ...r, status: 'needs-revision' as const } : r
      ));
      alert('Revision request sent to employee!');
    }
  };

  const handleExportData = () => {
    alert('Exporting all response data to CSV...');
  };

  const statusLabels = {
    'pending-review': 'Pending Review',
    'approved': 'Approved',
    'needs-revision': 'Needs Revision'
  };

  const statusColors = {
    'pending-review': '#F59E0B',
    'approved': '#10B981',
    'needs-revision': '#EF4444'
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: '8px'
        }}>
          New Joiner Responses
        </h2>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)'
        }}>
          Review and approve new employee onboarding forms
        </p>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            color: 'var(--muted-foreground)'
          }} />
          <Input
            placeholder="Search by name, email, position, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '44px' }}
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          style={{
            padding: '8px 12px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
            minWidth: '150px'
          }}
        >
          <option value="all">All Status</option>
          <option value="pending-review">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="needs-revision">Needs Revision</option>
        </select>

        {/* Export Button */}
        <Button
          variant="outline"
          onClick={handleExportData}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Download style={{ width: '16px', height: '16px' }} />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)'
        }}>
          <div style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            marginBottom: '8px'
          }}>
            Total Responses
          </div>
          <div style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)'
          }}>
            {responses.length}
          </div>
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)'
        }}>
          <div style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            marginBottom: '8px'
          }}>
            Pending Review
          </div>
          <div style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: '#F59E0B'
          }}>
            {responses.filter(r => r.status === 'pending-review').length}
          </div>
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)'
        }}>
          <div style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            marginBottom: '8px'
          }}>
            Approved
          </div>
          <div style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: '#10B981'
          }}>
            {responses.filter(r => r.status === 'approved').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              backgroundColor: 'var(--muted)',
              borderBottom: '1px solid var(--border)'
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Employee
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Position
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Department
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Submitted
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Status
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'right',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredResponses.map(response => (
              <tr
                key={response.id}
                style={{
                  borderBottom: '1px solid var(--border)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td style={{ padding: '16px' }}>
                  <div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      marginBottom: '4px'
                    }}>
                      {response.fullName}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Mail style={{ width: '12px', height: '12px' }} />
                      {response.email}
                    </div>
                  </div>
                </td>
                <td style={{
                  padding: '16px',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--foreground)'
                }}>
                  {response.position}
                </td>
                <td style={{
                  padding: '16px',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--foreground)'
                }}>
                  {response.department}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Calendar style={{ width: '12px', height: '12px' }} />
                    {new Date(response.submittedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    backgroundColor: `${statusColors[response.status]}15`,
                    color: statusColors[response.status],
                    display: 'inline-block'
                  }}>
                    {statusLabels[response.status]}
                  </span>
                </td>
                <td style={{
                  padding: '16px',
                  textAlign: 'right'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end'
                  }}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewResponse(response.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye style={{ width: '14px', height: '14px' }} />
                      View
                    </Button>
                    {response.status === 'pending-review' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(response.id)}
                          style={{
                            backgroundColor: '#10B981',
                            borderColor: '#10B981',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRequestRevision(response.id)}
                          style={{
                            borderColor: '#EF4444',
                            color: '#EF4444'
                          }}
                        >
                          Revise
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredResponses.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--muted-foreground)'
          }}>
            <Search style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 16px',
              opacity: 0.5
            }} />
            <p>No responses found</p>
          </div>
        )}
      </div>
    </div>
  );
}
