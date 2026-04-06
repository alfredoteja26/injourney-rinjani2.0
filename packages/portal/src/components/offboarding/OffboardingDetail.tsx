import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, User, Calendar, Briefcase, Mail, Clock, Save, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { OffboardingEmployee, OffboardingChecklistItem } from './types';

interface OffboardingDetailProps {
  offboarding: OffboardingEmployee;
  onBack: () => void;
  onUpdate: (updated: OffboardingEmployee) => void;
}

const categoryLabels = {
  'document': 'Documents',
  'equipment': 'Equipment',
  'access': 'System Access',
  'knowledge-transfer': 'Knowledge Transfer',
  'administrative': 'Administrative'
};

const categoryColors = {
  'document': '#3B82F6',
  'equipment': '#8B5CF6',
  'access': '#EF4444',
  'knowledge-transfer': '#10B981',
  'administrative': '#F59E0B'
};

const statusColors = {
  'pending': '#F59E0B',
  'in-progress': '#3B82F6',
  'completed': '#10B981'
};

export function OffboardingDetail({ offboarding, onBack, onUpdate }: OffboardingDetailProps) {
  const [checklistItems, setChecklistItems] = useState<OffboardingChecklistItem[]>(
    offboarding.checklistItems.length > 0 ? offboarding.checklistItems : generateMockChecklist()
  );
  const [selectedItem, setSelectedItem] = useState<OffboardingChecklistItem | null>(null);
  const [notes, setNotes] = useState('');

  // Calculate progress
  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  // Determine status based on progress
  const status = progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'pending';

  // Group items by category
  const groupedItems = checklistItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, OffboardingChecklistItem[]>);

  const handleToggleItem = (itemId: string) => {
    const updatedItems = checklistItems.map(item => {
      if (item.id === itemId) {
        const isCompleting = !item.completed;
        return {
          ...item,
          completed: isCompleting,
          completedDate: isCompleting ? new Date().toISOString().split('T')[0] : undefined,
          completedBy: isCompleting ? 'Current User' : undefined,
          notes: isCompleting && notes ? notes : item.notes
        };
      }
      return item;
    });

    setChecklistItems(updatedItems);
    setNotes('');
    setSelectedItem(null);
  };

  const handleSaveProgress = () => {
    const updatedOffboarding: OffboardingEmployee = {
      ...offboarding,
      checklistItems: checklistItems,
      progress: progress,
      status: status
    };

    onUpdate(updatedOffboarding);
    alert('Progress saved successfully!');
  };

  const handleItemClick = (item: OffboardingChecklistItem) => {
    setSelectedItem(item);
    setNotes(item.notes || '');
  };

  const daysUntilTarget = Math.ceil(
    (new Date(offboarding.offboardingTargetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const isOverdue = daysUntilTarget < 0 && status !== 'completed';

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Button variant="ghost" onClick={onBack} style={{ marginBottom: '16px' }}>
          <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Back to List
        </Button>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h2 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: '8px'
            }}>
              Offboarding Process Details
            </h2>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)'
            }}>
              Track and manage the offboarding checklist
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            backgroundColor: `${statusColors[status]}20`,
            borderRadius: 'var(--radius)',
            border: `1px solid ${statusColors[status]}40`
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: statusColors[status]
            }} />
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: statusColors[status]
            }}>
              {status === 'pending' ? 'Pending' : status === 'in-progress' ? 'In Progress' : 'Completed'}
            </span>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '24px'
      }}>
        {/* Main Content */}
        <div>
          {/* Progress Card */}
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                Overall Progress
              </h3>
              <span style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--primary)'
              }}>
                {progress}%
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '12px',
              backgroundColor: 'var(--muted)',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: 'var(--primary)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)'
            }}>
              <span>{completedCount} of {totalCount} tasks completed</span>
              <span>{totalCount - completedCount} remaining</span>
            </div>
          </div>

          {/* Timeline Warning */}
          {isOverdue && (
            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius)',
              marginBottom: '24px'
            }}>
              <Clock style={{
                width: '20px',
                height: '20px',
                color: '#EF4444',
                flexShrink: 0
              }} />
              <div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#EF4444',
                  marginBottom: '4px'
                }}>
                  Process Overdue
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)'
                }}>
                  This offboarding process is overdue by {Math.abs(daysUntilTarget)} days
                </div>
              </div>
            </div>
          )}

          {/* Checklist by Category */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div
                    style={{
                      width: '4px',
                      height: '24px',
                      backgroundColor: categoryColors[category as keyof typeof categoryColors],
                      borderRadius: '2px'
                    }}
                  />
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)'
                  }}>
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)'
                  }}>
                    ({items.filter(i => i.completed).length}/{items.length})
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      style={{
                        padding: '16px',
                        backgroundColor: selectedItem?.id === item.id ? 'var(--accent)' : item.completed ? 'var(--muted)' : 'var(--card)',
                        border: '1px solid',
                        borderColor: selectedItem?.id === item.id ? 'var(--primary)' : 'var(--border)',
                        borderRadius: 'var(--radius)',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleItem(item.id);
                          }}
                          style={{
                            cursor: 'pointer',
                            marginTop: '2px'
                          }}
                        >
                          {item.completed ? (
                            <CheckCircle2
                              style={{
                                width: '24px',
                                height: '24px',
                                color: 'var(--primary)'
                              }}
                            />
                          ) : (
                            <Circle
                              style={{
                                width: '24px',
                                height: '24px',
                                color: 'var(--muted-foreground)'
                              }}
                            />
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: item.completed ? 'var(--muted-foreground)' : 'var(--foreground)',
                            textDecoration: item.completed ? 'line-through' : 'none',
                            marginBottom: '4px'
                          }}>
                            {item.title}
                          </div>
                          <div style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            marginBottom: '8px'
                          }}>
                            {item.description}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)'
                          }}>
                            <span style={{
                              padding: '2px 8px',
                              backgroundColor: 'var(--muted)',
                              borderRadius: 'var(--radius)',
                              fontWeight: 'var(--font-weight-medium)'
                            }}>
                              PIC: {item.pic}
                            </span>
                            {item.completed && item.completedDate && (
                              <>
                                <span>•</span>
                                <span>Completed: {new Date(item.completedDate).toLocaleDateString('id-ID')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)'
          }}>
            <Button onClick={handleSaveProgress} style={{ width: '100%' }}>
              <Save style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Save Progress
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Employee Info Card */}
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            marginBottom: '24px',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '20px'
            }}>
              Employee Information
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--primary-foreground)',
                  flexShrink: 0
                }}>
                  {offboarding.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                    marginBottom: '2px'
                  }}>
                    {offboarding.name}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)'
                  }}>
                    {offboarding.position}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border)'
              }}>
                <InfoRow
                  icon={<Mail style={{ width: '16px', height: '16px' }} />}
                  label="Email"
                  value={offboarding.email}
                />
                <InfoRow
                  icon={<Briefcase style={{ width: '16px', height: '16px' }} />}
                  label="Department"
                  value={offboarding.department}
                />
                <InfoRow
                  icon={<Calendar style={{ width: '16px', height: '16px' }} />}
                  label="Start Date"
                  value={new Date(offboarding.startDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                />
                <InfoRow
                  icon={<Calendar style={{ width: '16px', height: '16px' }} />}
                  label="Initiated Date"
                  value={new Date(offboarding.offboardingInitiatedDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                />
                <InfoRow
                  icon={<Clock style={{ width: '16px', height: '16px' }} />}
                  label="Target Date"
                  value={new Date(offboarding.offboardingTargetDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                />
                <InfoRow
                  icon={<User style={{ width: '16px', height: '16px' }} />}
                  label="Initiated By"
                  value={offboarding.initiatedBy}
                />
              </div>
            </div>
          </div>

          {/* Selected Item Notes */}
          {selectedItem && (
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <MessageSquare style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
                <h4 style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)'
                }}>
                  Add Notes
                </h4>
              </div>

              <Textarea
                placeholder="Add notes or comments for this task..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                style={{ marginBottom: '12px' }}
              />

              {selectedItem.notes && (
                <div style={{
                  padding: '12px',
                  backgroundColor: 'var(--muted)',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  marginTop: '12px'
                }}>
                  <div style={{
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: '4px'
                  }}>
                    Previous Notes:
                  </div>
                  {selectedItem.notes}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    }}>
      <div style={{ color: 'var(--muted-foreground)', marginTop: '2px' }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--muted-foreground)',
          marginBottom: '2px'
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--foreground)',
          wordBreak: 'break-word'
        }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// Generate mock checklist if none exists
function generateMockChecklist(): OffboardingChecklistItem[] {
  return [
    {
      id: '1',
      title: 'Return Company Laptop',
      description: 'Employee must return company-issued laptop and charger',
      category: 'equipment',
      completed: true,
      pic: 'IT Support',
      picEmail: 'it.support@injourney.co.id',
      completedDate: '2025-01-06',
      completedBy: 'Ahmad Fauzi'
    },
    {
      id: '2',
      title: 'Return Access Cards',
      description: 'Return all office access cards and parking cards',
      category: 'equipment',
      completed: true,
      pic: 'Facilities Team',
      picEmail: 'facilities@injourney.co.id',
      completedDate: '2025-01-06'
    },
    {
      id: '3',
      title: 'Disable System Access',
      description: 'Revoke access to all company systems and applications',
      category: 'access',
      completed: true,
      pic: 'IT Support',
      picEmail: 'it.support@injourney.co.id',
      completedDate: '2025-01-07'
    },
    {
      id: '4',
      title: 'Deactivate Email Account',
      description: 'Deactivate corporate email and setup auto-reply',
      category: 'access',
      completed: false,
      pic: 'IT Support',
      picEmail: 'it.support@injourney.co.id'
    },
    {
      id: '5',
      title: 'Knowledge Transfer Session',
      description: 'Complete knowledge transfer to designated team member',
      category: 'knowledge-transfer',
      completed: true,
      pic: 'Department Manager',
      picEmail: 'manager@injourney.co.id',
      completedDate: '2025-01-05'
    },
    {
      id: '6',
      title: 'Sign Resignation Letter',
      description: 'Employee signs official resignation letter',
      category: 'document',
      completed: true,
      pic: 'HR Admin',
      picEmail: 'hr.admin@injourney.co.id',
      completedDate: '2025-01-05'
    },
    {
      id: '7',
      title: 'Complete Exit Interview',
      description: 'Conduct exit interview with HR team',
      category: 'administrative',
      completed: false,
      pic: 'HR Manager',
      picEmail: 'hr.manager@injourney.co.id'
    },
    {
      id: '8',
      title: 'Final Salary Settlement',
      description: 'Process final salary and benefit settlements',
      category: 'administrative',
      completed: false,
      pic: 'Finance Team',
      picEmail: 'finance@injourney.co.id'
    },
    {
      id: '9',
      title: 'Update Company Directory',
      description: 'Remove from company directory and org chart',
      category: 'administrative',
      completed: true,
      pic: 'HR Admin',
      picEmail: 'hr.admin@injourney.co.id',
      completedDate: '2025-01-07'
    },
    {
      id: '10',
      title: 'Handover Document',
      description: 'Complete and sign handover document',
      category: 'document',
      completed: false,
      pic: 'Department Manager',
      picEmail: 'manager@injourney.co.id'
    }
  ];
}
