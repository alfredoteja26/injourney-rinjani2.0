import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Save, X } from 'lucide-react';
import { Button } from '../ui/button';
import { OffboardingEmployee, OffboardingChecklistItem, OffboardingChecklistTemplate } from './types';

interface OffboardingChecklistFlowProps {
  employee: {
    id: string;
    name: string;
    email: string;
    position: string;
    department: string;
    startDate: string;
  };
  targetDate: string;
  initiatedBy: string;
  onComplete: (offboardingData: OffboardingEmployee) => void;
  onCancel: () => void;
}

// Mock checklist templates - in production, fetch from API/database
const checklistTemplates: OffboardingChecklistTemplate[] = [
  {
    id: '1',
    title: 'Return Company Laptop',
    description: 'Employee must return company-issued laptop and charger',
    category: 'equipment',
    pic: 'IT Support',
    picEmail: 'it.support@injourney.co.id',
    order: 1,
    mandatory: true
  },
  {
    id: '2',
    title: 'Return Access Cards',
    description: 'Return all office access cards and parking cards',
    category: 'equipment',
    pic: 'Facilities Team',
    picEmail: 'facilities@injourney.co.id',
    order: 2,
    mandatory: true
  },
  {
    id: '3',
    title: 'Disable System Access',
    description: 'Revoke access to all company systems and applications',
    category: 'access',
    pic: 'IT Support',
    picEmail: 'it.support@injourney.co.id',
    order: 3,
    mandatory: true
  },
  {
    id: '4',
    title: 'Deactivate Email Account',
    description: 'Deactivate corporate email and setup auto-reply',
    category: 'access',
    pic: 'IT Support',
    picEmail: 'it.support@injourney.co.id',
    order: 4,
    mandatory: true
  },
  {
    id: '5',
    title: 'Knowledge Transfer Session',
    description: 'Complete knowledge transfer to designated team member',
    category: 'knowledge-transfer',
    pic: 'Department Manager',
    picEmail: 'manager@injourney.co.id',
    order: 5,
    mandatory: true
  },
  {
    id: '6',
    title: 'Sign Resignation Letter',
    description: 'Employee signs official resignation letter',
    category: 'document',
    pic: 'HR Admin',
    picEmail: 'hr.admin@injourney.co.id',
    order: 6,
    mandatory: true
  },
  {
    id: '7',
    title: 'Complete Exit Interview',
    description: 'Conduct exit interview with HR team',
    category: 'administrative',
    pic: 'HR Manager',
    picEmail: 'hr.manager@injourney.co.id',
    order: 7,
    mandatory: true
  },
  {
    id: '8',
    title: 'Final Salary Settlement',
    description: 'Process final salary and benefit settlements',
    category: 'administrative',
    pic: 'Finance Team',
    picEmail: 'finance@injourney.co.id',
    order: 8,
    mandatory: true
  },
  {
    id: '9',
    title: 'Update Company Directory',
    description: 'Remove from company directory and org chart',
    category: 'administrative',
    pic: 'HR Admin',
    picEmail: 'hr.admin@injourney.co.id',
    order: 9,
    mandatory: false
  },
  {
    id: '10',
    title: 'Handover Document',
    description: 'Complete and sign handover document',
    category: 'document',
    pic: 'Department Manager',
    picEmail: 'manager@injourney.co.id',
    order: 10,
    mandatory: true
  }
];

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

export function OffboardingChecklistFlow({
  employee,
  targetDate,
  initiatedBy,
  onComplete,
  onCancel
}: OffboardingChecklistFlowProps) {
  const [checklistItems, setChecklistItems] = useState<OffboardingChecklistItem[]>(
    checklistTemplates
      .sort((a, b) => a.order - b.order)
      .map(template => ({
        id: template.id,
        title: template.title,
        description: template.description,
        category: template.category,
        completed: false,
        pic: template.pic,
        picEmail: template.picEmail
      }))
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Calculate progress
  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  // Group items by category
  const groupedItems = checklistItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, OffboardingChecklistItem[]>);

  const handleToggleItem = (itemId: string) => {
    setChecklistItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleSaveAndContinue = () => {
    const offboardingData: OffboardingEmployee = {
      id: Date.now().toString(),
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      startDate: employee.startDate,
      offboardingInitiatedDate: new Date().toISOString().split('T')[0],
      offboardingTargetDate: targetDate,
      status: 'in-progress',
      checklistItems: checklistItems,
      progress: progress,
      initiatedBy: initiatedBy
    };

    onComplete(offboardingData);
  };

  const categories = Object.keys(groupedItems);
  const filteredCategories = selectedCategory 
    ? categories.filter(cat => cat === selectedCategory)
    : categories;

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--border)'
      }}>
        <div>
          <h2 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: '8px'
          }}>
            Offboarding Checklist
          </h2>
          <div style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            marginBottom: '4px'
          }}>
            {employee.name} - {employee.position}
          </div>
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--muted-foreground)'
          }}>
            Target Date: {new Date(targetDate).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <Button variant="ghost" onClick={onCancel}>
          <X style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Cancel
        </Button>
      </div>

      {/* Progress Bar */}
      <div style={{
        padding: '20px',
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--foreground)'
          }}>
            Overall Progress
          </span>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--primary)'
          }}>
            {completedCount} / {totalCount} completed ({progress}%)
          </span>
        </div>
        
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--muted)',
          borderRadius: '4px',
          overflow: 'hidden'
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
      </div>

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '24px'
      }}>
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius)',
            border: '1px solid',
            borderColor: selectedCategory === null ? 'var(--primary)' : 'var(--border)',
            backgroundColor: selectedCategory === null ? 'var(--primary)' : 'transparent',
            color: selectedCategory === null ? 'var(--primary-foreground)' : 'var(--foreground)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          All Categories
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius)',
              border: '1px solid',
              borderColor: selectedCategory === category ? categoryColors[category as keyof typeof categoryColors] : 'var(--border)',
              backgroundColor: selectedCategory === category ? categoryColors[category as keyof typeof categoryColors] : 'transparent',
              color: selectedCategory === category ? 'white' : 'var(--foreground)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {categoryLabels[category as keyof typeof categoryLabels]}
            <span style={{
              marginLeft: '8px',
              padding: '2px 6px',
              borderRadius: '10px',
              backgroundColor: selectedCategory === category ? 'rgba(255,255,255,0.3)' : 'var(--muted)',
              fontSize: 'var(--text-xs)'
            }}>
              {groupedItems[category].filter(i => i.completed).length}/{groupedItems[category].length}
            </span>
          </button>
        ))}
      </div>

      {/* Checklist Items by Category */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {filteredCategories.map(category => (
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
                ({groupedItems[category].filter(i => i.completed).length}/{groupedItems[category].length})
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {groupedItems[category].map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '16px',
                    backgroundColor: item.completed ? 'var(--muted)' : 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <button
                      onClick={() => handleToggleItem(item.id)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        padding: 0,
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
                    </button>

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
                        gap: '8px',
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Info Alert */}
      <div style={{
        display: 'flex',
        gap: '12px',
        padding: '16px',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: 'var(--radius)',
        marginBottom: '24px'
      }}>
        <AlertCircle style={{
          width: '20px',
          height: '20px',
          color: 'var(--primary)',
          flexShrink: 0,
          marginTop: '2px'
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--foreground)',
            marginBottom: '4px'
          }}>
            Important Information
          </div>
          <div style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)'
          }}>
            You can save this checklist and continue completing it later. The assigned PICs will be notified about their responsibilities.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        paddingTop: '24px',
        borderTop: '1px solid var(--border)'
      }}>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSaveAndContinue}>
          <Save style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Save & Initiate Offboarding
        </Button>
      </div>
    </div>
  );
}
