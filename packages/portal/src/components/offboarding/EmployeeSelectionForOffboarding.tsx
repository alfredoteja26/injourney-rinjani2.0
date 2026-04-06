import React, { useState } from 'react';
import { Search, ChevronRight, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  avatar?: string;
}

interface EmployeeSelectionForOffboardingProps {
  onNext: (selectedEmployees: Employee[]) => void;
  onCancel: () => void;
}

export function EmployeeSelectionForOffboarding({
  onNext,
  onCancel
}: EmployeeSelectionForOffboardingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  // Mock active employees - in production, fetch from API
  const allEmployees: Employee[] = [
    {
      id: '1',
      name: 'Binavia Wardhani',
      email: 'binavia.wardhani@injourney.co.id',
      position: 'HC Strategy Senior Officer',
      department: 'Human Capital',
      startDate: '2019-05-20'
    },
    {
      id: '2',
      name: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@injourney.co.id',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      startDate: '2020-03-15'
    },
    {
      id: '3',
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@injourney.co.id',
      position: 'Product Manager',
      department: 'Product',
      startDate: '2019-07-01'
    },
    {
      id: '4',
      name: 'Budi Santoso',
      email: 'budi.santoso@injourney.co.id',
      position: 'Marketing Specialist',
      department: 'Marketing',
      startDate: '2021-01-10'
    },
    {
      id: '5',
      name: 'Dewi Lestari',
      email: 'dewi.lestari@injourney.co.id',
      position: 'HR Officer',
      department: 'Human Capital',
      startDate: '2020-09-20'
    },
    {
      id: '6',
      name: 'Rudi Hartono',
      email: 'rudi.hartono@injourney.co.id',
      position: 'Finance Analyst',
      department: 'Finance',
      startDate: '2018-11-05'
    },
    {
      id: '7',
      name: 'Maya Putri',
      email: 'maya.putri@injourney.co.id',
      position: 'UI/UX Designer',
      department: 'Design',
      startDate: '2021-06-12'
    },
    {
      id: '8',
      name: 'Andi Wijaya',
      email: 'andi.wijaya@injourney.co.id',
      position: 'DevOps Engineer',
      department: 'Engineering',
      startDate: '2020-08-22'
    },
    {
      id: '9',
      name: 'Rina Kusuma',
      email: 'rina.kusuma@injourney.co.id',
      position: 'Content Writer',
      department: 'Marketing',
      startDate: '2022-01-15'
    },
    {
      id: '10',
      name: 'Ahmad Zulfikar',
      email: 'ahmad.zulfikar@injourney.co.id',
      position: 'Business Analyst',
      department: 'Product',
      startDate: '2020-02-10'
    }
  ];

  const filteredEmployees = allEmployees.filter(emp => {
    const query = searchQuery.toLowerCase();
    return (
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.position.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query)
    );
  });

  const handleToggleEmployee = (employee: Employee) => {
    const isSelected = selectedEmployees.some(e => e.id === employee.id);
    if (isSelected) {
      setSelectedEmployees(selectedEmployees.filter(e => e.id !== employee.id));
    } else {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const handleRemoveSelected = (employeeId: string) => {
    setSelectedEmployees(selectedEmployees.filter(e => e.id !== employeeId));
  };

  const handleNext = () => {
    if (selectedEmployees.length > 0) {
      onNext(selectedEmployees);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: '8px'
        }}>
          Select Employees to Offboard
        </h2>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)'
        }}>
          Choose one or more employees to start the offboarding process
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '24px'
      }}>
        {/* Employee List */}
        <div>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '24px' }}>
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
              placeholder="Search employees by name, email, position, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Employee Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {filteredEmployees.map(employee => {
              const isSelected = selectedEmployees.some(e => e.id === employee.id);
              return (
                <button
                  key={employee.id}
                  onClick={() => handleToggleEmployee(employee)}
                  style={{
                    padding: '16px',
                    backgroundColor: isSelected ? 'rgba(0, 133, 138, 0.1)' : 'var(--card)',
                    border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--muted-foreground)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--foreground)',
                      flexShrink: 0
                    }}>
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {employee.name}
                      </div>
                      <div style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--muted-foreground)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {employee.email}
                      </div>
                    </div>
                    {isSelected && (
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          style={{ color: 'var(--primary-foreground)' }}
                        >
                          <path
                            d="M11.667 3.5L5.25 9.917L2.333 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    marginBottom: '4px'
                  }}>
                    {employee.position}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)'
                  }}>
                    {employee.department}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredEmployees.length === 0 && (
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
              <p>No employees found</p>
            </div>
          )}
        </div>

        {/* Selected Employees Sidebar */}
        <div>
          <div style={{
            position: 'sticky',
            top: '24px'
          }}>
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: '16px'
              }}>
                Selected Employees
              </h3>

              {selectedEmployees.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: 'var(--muted-foreground)'
                }}>
                  <p style={{ fontSize: 'var(--text-sm)' }}>
                    No employees selected yet
                  </p>
                </div>
              ) : (
                <>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '24px',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}>
                    {selectedEmployees.map(employee => (
                      <div
                        key={employee.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          backgroundColor: 'var(--muted)',
                          borderRadius: 'var(--radius)'
                        }}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--card)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--foreground)',
                          flexShrink: 0
                        }}>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--foreground)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {employee.name}
                          </div>
                          <div style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {employee.position}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSelected(employee.id);
                          }}
                          style={{
                            padding: '4px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--muted-foreground)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--card)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <X style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: '16px',
                    backgroundColor: 'rgba(0, 133, 138, 0.1)',
                    borderRadius: 'var(--radius)',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)'
                    }}>
                      {selectedEmployees.length} employee{selectedEmployees.length > 1 ? 's' : ''} selected
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <Button
                  onClick={handleNext}
                  disabled={selectedEmployees.length === 0}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  Next: Set Offboarding Details
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </Button>
                <Button
                  variant="outline"
                  onClick={onCancel}
                  style={{ width: '100%' }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}