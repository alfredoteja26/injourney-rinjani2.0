import React, { useState } from 'react';
import { Search, ChevronRight, Calendar, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { OffboardingChecklistFlow } from './OffboardingChecklistFlow';
import { OffboardingEmployee } from './types';

interface EmployeeSelectionProps {
  userEmail: string;
  onBack: () => void;
}

type Employee = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  avatar?: string;
};

export function EmployeeSelection({ userEmail, onBack }: EmployeeSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showChecklistFlow, setShowChecklistFlow] = useState(false);
  const [targetDate, setTargetDate] = useState('');

  // Mock employee data - in production, fetch from API
  const employees: Employee[] = [
    {
      id: '1',
      name: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@injourney.co.id',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      startDate: '2020-03-15'
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@injourney.co.id',
      position: 'Product Manager',
      department: 'Product',
      startDate: '2019-07-01'
    },
    {
      id: '3',
      name: 'Budi Santoso',
      email: 'budi.santoso@injourney.co.id',
      position: 'Marketing Specialist',
      department: 'Marketing',
      startDate: '2021-01-10'
    },
    {
      id: '4',
      name: 'Dewi Lestari',
      email: 'dewi.lestari@injourney.co.id',
      position: 'HR Officer',
      department: 'Human Capital',
      startDate: '2020-09-20'
    },
    {
      id: '5',
      name: 'Rudi Hartono',
      email: 'rudi.hartono@injourney.co.id',
      position: 'Finance Analyst',
      department: 'Finance',
      startDate: '2018-11-05'
    }
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    // Set default target date to 30 days from now
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    setTargetDate(defaultDate.toISOString().split('T')[0]);
  };

  const handleProceedToChecklist = () => {
    if (selectedEmployee && targetDate) {
      setShowChecklistFlow(true);
    }
  };

  const handleChecklistComplete = (offboardingData: OffboardingEmployee) => {
    // In production, save to database
    console.log('Offboarding initiated:', offboardingData);
    alert('Offboarding process has been initiated successfully!');
    onBack();
  };

  if (showChecklistFlow && selectedEmployee) {
    return (
      <OffboardingChecklistFlow
        employee={selectedEmployee}
        targetDate={targetDate}
        initiatedBy={userEmail}
        onComplete={handleChecklistComplete}
        onCancel={() => setShowChecklistFlow(false)}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Button 
          variant="ghost" 
          onClick={onBack}
          style={{ marginBottom: '16px' }}
        >
          ← Back to List
        </Button>
        <h2 style={{ 
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: '8px'
        }}>
          Select Employee for Offboarding
        </h2>
        <p style={{ 
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)' 
        }}>
          Pilih karyawan yang akan melalui proses offboarding
        </p>
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '24px'
      }}>
        {/* Employee List */}
        <div>
          {/* Search Bar */}
          <div style={{ marginBottom: '20px', position: 'relative' }}>
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
              placeholder="Search employee by name, email, position, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Employee Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredEmployees.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--muted-foreground)'
              }}>
                <p>No employees found matching your search.</p>
              </div>
            ) : (
              filteredEmployees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => handleSelectEmployee(employee)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: selectedEmployee?.id === employee.id ? 'var(--primary)' : 'var(--card)',
                    border: '1px solid',
                    borderColor: selectedEmployee?.id === employee.id ? 'var(--primary)' : 'var(--border)',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedEmployee?.id !== employee.id) {
                      e.currentTarget.style.backgroundColor = 'var(--accent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedEmployee?.id !== employee.id) {
                      e.currentTarget.style.backgroundColor = 'var(--card)';
                    }
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: selectedEmployee?.id === employee.id ? 'var(--primary-foreground)' : 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-lg)',
                    color: selectedEmployee?.id === employee.id ? 'var(--primary)' : 'var(--foreground)',
                    flexShrink: 0
                  }}>
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Employee Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--text-base)',
                      color: selectedEmployee?.id === employee.id ? 'var(--primary-foreground)' : 'var(--foreground)',
                      marginBottom: '4px'
                    }}>
                      {employee.name}
                    </div>
                    <div style={{ 
                      fontSize: 'var(--text-sm)',
                      color: selectedEmployee?.id === employee.id ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                      marginBottom: '4px'
                    }}>
                      {employee.position}
                    </div>
                    <div style={{ 
                      fontSize: 'var(--text-xs)',
                      color: selectedEmployee?.id === employee.id ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                      display: 'flex',
                      gap: '16px'
                    }}>
                      <span>{employee.department}</span>
                      <span>•</span>
                      <span>{employee.email}</span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <ChevronRight 
                    style={{ 
                      width: '20px',
                      height: '20px',
                      color: selectedEmployee?.id === employee.id ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                      flexShrink: 0
                    }} 
                  />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Selected Employee Details */}
        <div>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '20px'
            }}>
              Offboarding Details
            </h3>

            {selectedEmployee ? (
              <>
                {/* Employee Summary */}
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--muted)',
                  borderRadius: 'var(--radius)',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--primary-foreground)'
                    }}>
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)'
                      }}>
                        {selectedEmployee.name}
                      </div>
                      <div style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)'
                      }}>
                        {selectedEmployee.position}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Department:</span>
                      <span style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                        {selectedEmployee.department}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Start Date:</span>
                      <span style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                        {new Date(selectedEmployee.startDate).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Target Date Selection */}
                <div style={{ marginBottom: '24px' }}>
                  <Label htmlFor="targetDate" style={{ marginBottom: '8px', display: 'block' }}>
                    Target Completion Date <span style={{ color: 'var(--destructive)' }}>*</span>
                  </Label>
                  <div style={{ position: 'relative' }}>
                    <Calendar 
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '16px',
                        height: '16px',
                        color: 'var(--muted-foreground)'
                      }}
                    />
                    <Input
                      id="targetDate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      style={{ paddingLeft: '40px' }}
                    />
                  </div>
                  <p style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                    marginTop: '8px'
                  }}>
                    Tanggal target penyelesaian proses offboarding
                  </p>
                </div>

                {/* Action Buttons */}
                <Button
                  onClick={handleProceedToChecklist}
                  disabled={!targetDate}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <User style={{ width: '16px', height: '16px' }} />
                  Proceed to Checklist
                </Button>
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: 'var(--muted-foreground)'
              }}>
                <User style={{ 
                  width: '48px',
                  height: '48px',
                  margin: '0 auto 16px',
                  opacity: 0.5
                }} />
                <p>Select an employee from the list to begin the offboarding process</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
