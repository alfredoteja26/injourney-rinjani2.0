import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { OffboardingEmployee, OffboardingStatus } from './types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface EmployeeOffboardingTableProps {
  employees: OffboardingEmployee[];
  onViewDetail: (employee: OffboardingEmployee) => void;
  onStartOffboarding: (employeeIds: string[]) => void;
  onCompleteOffboarding: (employeeIds: string[]) => void;
  onCancelResign: (employeeId: string) => void;
}

const statusLabels = {
  'ready-to-offboard': 'Ready to Offboard',
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'cancel-resign': 'Cancel Resign'
};

const statusColors = {
  'ready-to-offboard': '#F59E0B',
  'in-progress': '#3B82F6',
  'completed': '#10B981',
  'cancel-resign': '#6B7280'
};

export function EmployeeOffboardingTable({
  employees,
  onViewDetail,
  onStartOffboarding,
  onCompleteOffboarding,
  onCancelResign
}: EmployeeOffboardingTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<OffboardingStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredEmployees.map(emp => emp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkAction = (action: 'start' | 'complete') => {
    if (action === 'start') {
      // Filter only ready-to-offboard employees
      const readyToOffboardIds = selectedIds.filter(id => {
        const emp = employees.find(e => e.id === id);
        return emp?.status === 'ready-to-offboard';
      });
      if (readyToOffboardIds.length > 0) {
        onStartOffboarding(readyToOffboardIds);
        setSelectedIds([]);
      }
    } else if (action === 'complete') {
      // Filter only in-progress employees
      const inProgressIds = selectedIds.filter(id => {
        const emp = employees.find(e => e.id === id);
        return emp?.status === 'in-progress';
      });
      if (inProgressIds.length > 0) {
        onCompleteOffboarding(inProgressIds);
        setSelectedIds([]);
      }
    }
    setShowBulkActions(false);
  };

  const selectedEmployees = employees.filter(emp => selectedIds.includes(emp.id));
  const hasReadyToOffboard = selectedEmployees.some(emp => emp.status === 'ready-to-offboard');
  const hasInProgress = selectedEmployees.some(emp => emp.status === 'in-progress');

  const statusCounts = {
    all: employees.length,
    'ready-to-offboard': employees.filter(e => e.status === 'ready-to-offboard').length,
    'in-progress': employees.filter(e => e.status === 'in-progress').length,
    'completed': employees.filter(e => e.status === 'completed').length,
    'cancel-resign': employees.filter(e => e.status === 'cancel-resign').length
  };

  return (
    <div>
      {/* Header */}
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
            Employee Offboarding
          </h2>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)'
          }}>
            Manage employee offboarding process
          </p>
        </div>
      </div>

      {/* Stats Tabs */}
      <div style={{
        display: 'flex',
        gap: '2px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '24px'
      }}>
        {(['all', 'ready-to-offboard', 'in-progress', 'completed', 'cancel-resign'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              padding: '12px 24px',
              backgroundColor: filterStatus === status ? 'var(--card)' : 'transparent',
              border: 'none',
              borderBottom: filterStatus === status ? '2px solid var(--primary)' : '2px solid transparent',
              color: filterStatus === status ? 'var(--foreground)' : 'var(--muted-foreground)',
              fontWeight: filterStatus === status ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{status === 'all' ? 'All' : statusLabels[status]}</span>
            <span style={{
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: filterStatus === status ? 'var(--primary)' : 'var(--muted)',
              color: filterStatus === status ? 'var(--primary-foreground)' : 'var(--foreground)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              {statusCounts[status]}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Bulk Actions */}
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

        {selectedIds.length > 0 && (
          <DropdownMenu open={showBulkActions} onOpenChange={setShowBulkActions}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions ({selectedIds.length})
                <ChevronDown style={{ width: '16px', height: '16px', marginLeft: '8px' }} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {hasReadyToOffboard && (
                <DropdownMenuItem onClick={() => handleBulkAction('start')}>
                  Start Offboarding
                </DropdownMenuItem>
              )}
              {hasInProgress && (
                <DropdownMenuItem onClick={() => handleBulkAction('complete')}>
                  Complete Offboarding
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
                padding: '12px 16px',
                textAlign: 'left',
                width: '40px'
              }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredEmployees.length && filteredEmployees.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Employee Name
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Position
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Department
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Status
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Progress
              </th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                width: '100px'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={7} style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  color: 'var(--muted-foreground)'
                }}>
                  <Filter style={{
                    width: '48px',
                    height: '48px',
                    margin: '0 auto 16px',
                    opacity: 0.5
                  }} />
                  <p>No employees found</p>
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    transition: 'background-color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => onViewDetail(employee)}
                >
                  <td
                    style={{ padding: '16px' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(employee.id)}
                      onChange={(e) => handleSelectOne(employee.id, e.target.checked)}
                      style={{
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer'
                      }}
                    />
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        flexShrink: 0
                      }}>
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{
                          fontWeight: 'var(--font-weight-medium)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--foreground)',
                          marginBottom: '2px'
                        }}>
                          {employee.name}
                        </div>
                        <div style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--muted-foreground)'
                        }}>
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{
                    padding: '16px',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)'
                  }}>
                    {employee.position}
                  </td>
                  <td style={{
                    padding: '16px',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)'
                  }}>
                    {employee.department}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      backgroundColor: `${statusColors[employee.status]}20`,
                      color: statusColors[employee.status],
                      display: 'inline-block'
                    }}>
                      {statusLabels[employee.status]}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <div style={{
                        width: '100%',
                        maxWidth: '80px',
                        height: '6px',
                        backgroundColor: 'var(--muted)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div
                          style={{
                            width: `${employee.progress}%`,
                            height: '100%',
                            backgroundColor: statusColors[employee.status],
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </div>
                      <span style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--muted-foreground)'
                      }}>
                        {employee.progress}%
                      </span>
                    </div>
                  </td>
                  <td
                    style={{ padding: '16px', textAlign: 'center' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical style={{ width: '16px', height: '16px' }} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetail(employee)}>
                          View Details
                        </DropdownMenuItem>
                        {employee.status === 'ready-to-offboard' && (
                          <DropdownMenuItem onClick={() => onStartOffboarding([employee.id])}>
                            Start Offboarding
                          </DropdownMenuItem>
                        )}
                        {employee.status === 'in-progress' && (
                          <DropdownMenuItem onClick={() => onCompleteOffboarding([employee.id])}>
                            Complete Offboarding
                          </DropdownMenuItem>
                        )}
                        {employee.status !== 'completed' && employee.status !== 'cancel-resign' && (
                          <DropdownMenuItem 
                            onClick={() => onCancelResign(employee.id)}
                            style={{ color: 'var(--destructive)' }}
                          >
                            Cancel Resign
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
