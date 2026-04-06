import React, { useState } from 'react';
import { Plus, Search, Filter, ChevronRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { OffboardingEmployee, OffboardingStatus } from './types';
import { OffboardingDetail } from './OffboardingDetail';

interface OffboardingListProps {
  userEmail: string;
  onInitiateNew: () => void;
}

const statusColors = {
  'pending': '#F59E0B',
  'in-progress': '#3B82F6',
  'completed': '#10B981'
};

const statusLabels = {
  'pending': 'Pending',
  'in-progress': 'In Progress',
  'completed': 'Completed'
};

const statusIcons = {
  'pending': Clock,
  'in-progress': AlertCircle,
  'completed': CheckCircle
};

export function OffboardingList({ userEmail, onInitiateNew }: OffboardingListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<OffboardingStatus | 'all'>('all');
  const [selectedOffboarding, setSelectedOffboarding] = useState<OffboardingEmployee | null>(null);

  // Mock data - in production, fetch from API
  const [offboardingList, setOffboardingList] = useState<OffboardingEmployee[]>([
    {
      id: '1',
      name: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@injourney.co.id',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      startDate: '2020-03-15',
      offboardingInitiatedDate: '2025-01-05',
      offboardingTargetDate: '2025-02-05',
      status: 'in-progress',
      checklistItems: [],
      progress: 65,
      initiatedBy: 'hr.admin@injourney.co.id'
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@injourney.co.id',
      position: 'Product Manager',
      department: 'Product',
      startDate: '2019-07-01',
      offboardingInitiatedDate: '2024-12-28',
      offboardingTargetDate: '2025-01-28',
      status: 'completed',
      checklistItems: [],
      progress: 100,
      initiatedBy: 'hr.admin@injourney.co.id'
    }
  ]);

  const filteredList = offboardingList.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleUpdateOffboarding = (updatedOffboarding: OffboardingEmployee) => {
    setOffboardingList(prev => prev.map(item => 
      item.id === updatedOffboarding.id ? updatedOffboarding : item
    ));
    setSelectedOffboarding(updatedOffboarding);
  };

  if (selectedOffboarding) {
    return (
      <OffboardingDetail
        offboarding={selectedOffboarding}
        onBack={() => setSelectedOffboarding(null)}
        onUpdate={handleUpdateOffboarding}
      />
    );
  }

  const statusCounts = {
    all: offboardingList.length,
    pending: offboardingList.filter(item => item.status === 'pending').length,
    'in-progress': offboardingList.filter(item => item.status === 'in-progress').length,
    completed: offboardingList.filter(item => item.status === 'completed').length
  };

  return (
    <div>
      {/* Header with Action Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: '4px'
          }}>
            Active Offboarding Processes
          </h2>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)'
          }}>
            Manage and track all offboarding processes
          </p>
        </div>
        <Button onClick={onInitiateNew}>
          <Plus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Initiate New Offboarding
        </Button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {(['all', 'pending', 'in-progress', 'completed'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              padding: '20px',
              backgroundColor: filterStatus === status ? 'var(--primary)' : 'var(--card)',
              border: '1px solid',
              borderColor: filterStatus === status ? 'var(--primary)' : 'var(--border)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              if (filterStatus !== status) {
                e.currentTarget.style.backgroundColor = 'var(--accent)';
              }
            }}
            onMouseLeave={(e) => {
              if (filterStatus !== status) {
                e.currentTarget.style.backgroundColor = 'var(--card)';
              }
            }}
          >
            <div style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: filterStatus === status ? 'var(--primary-foreground)' : 'var(--foreground)',
              marginBottom: '8px'
            }}>
              {statusCounts[status]}
            </div>
            <div style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: filterStatus === status ? 'var(--primary-foreground)' : 'var(--muted-foreground)'
            }}>
              {status === 'all' ? 'Total' : statusLabels[status]}
            </div>
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: 'var(--muted-foreground)'
            }}
          />
          <Input
            placeholder="Search by name, email, position, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* Offboarding List */}
      {filteredList.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)'
        }}>
          <Filter style={{
            width: '48px',
            height: '48px',
            color: 'var(--muted-foreground)',
            margin: '0 auto 16px',
            opacity: 0.5
          }} />
          <h3 style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)',
            marginBottom: '8px'
          }}>
            No offboarding processes found
          </h3>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            marginBottom: '24px'
          }}>
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Click "Initiate New Offboarding" to start a new process'
            }
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Button onClick={onInitiateNew}>
              <Plus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Initiate New Offboarding
            </Button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {filteredList.map(item => {
            const StatusIcon = statusIcons[item.status];
            const daysUntilTarget = Math.ceil(
              (new Date(item.offboardingTargetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            const isOverdue = daysUntilTarget < 0 && item.status !== 'completed';

            return (
              <button
                key={item.id}
                onClick={() => setSelectedOffboarding(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--card)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--foreground)',
                  flexShrink: 0
                }}>
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Employee Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                    marginBottom: '4px'
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    marginBottom: '8px'
                  }}>
                    {item.position} • {item.department}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)'
                  }}>
                    <span>
                      Target: {new Date(item.offboardingTargetDate).toLocaleDateString('id-ID')}
                    </span>
                    {isOverdue && (
                      <>
                        <span>•</span>
                        <span style={{ color: 'var(--destructive)', fontWeight: 'var(--font-weight-medium)' }}>
                          Overdue by {Math.abs(daysUntilTarget)} days
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div style={{
                  minWidth: '120px',
                  flexShrink: 0
                }}>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                    marginBottom: '8px',
                    textAlign: 'center'
                  }}>
                    Progress
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'var(--muted)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '4px'
                  }}>
                    <div
                      style={{
                        width: `${item.progress}%`,
                        height: '100%',
                        backgroundColor: statusColors[item.status],
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    textAlign: 'center'
                  }}>
                    {item.progress}%
                  </div>
                </div>

                {/* Status Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: `${statusColors[item.status]}20`,
                  borderRadius: 'var(--radius)',
                  minWidth: '140px',
                  flexShrink: 0
                }}>
                  <StatusIcon
                    style={{
                      width: '16px',
                      height: '16px',
                      color: statusColors[item.status]
                    }}
                  />
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: statusColors[item.status]
                  }}>
                    {statusLabels[item.status]}
                  </span>
                </div>

                {/* Arrow */}
                <ChevronRight
                  style={{
                    width: '20px',
                    height: '20px',
                    color: 'var(--muted-foreground)',
                    flexShrink: 0
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
