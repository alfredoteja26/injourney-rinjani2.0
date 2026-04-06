import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, FileText, Package, Coins, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { OffboardingEmployee, OffboardingChecklistItem, TaskStatus, ResignationInfo } from './types';

interface OffboardingDetailPageProps {
  employee: OffboardingEmployee;
  onBack: () => void;
  onUpdate: (updated: OffboardingEmployee) => void;
  onStartOffboarding?: () => void;
  onCompleteOffboarding?: () => void;
}

const taskStatusLabels = {
  'to-do': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done'
};

const taskStatusColors = {
  'to-do': '#6B7280',
  'in-progress': '#3B82F6',
  'done': '#10B981'
};

export function OffboardingDetailPage({
  employee,
  onBack,
  onUpdate,
  onStartOffboarding,
  onCompleteOffboarding
}: OffboardingDetailPageProps) {
  const [checklistItems, setChecklistItems] = useState<OffboardingChecklistItem[]>(
    employee.checklistItems.length > 0 ? employee.checklistItems : generateDefaultChecklist()
  );
  const [resignationInfo, setResignationInfo] = useState<ResignationInfo>(
    employee.resignationInfo || {
      resignationType: 'voluntary',
      resignationDate: new Date().toISOString().split('T')[0],
      lastWorkingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      noticeGiven: true
    }
  );
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    pic: ''
  });

  // Calculate progress
  const doneCount = checklistItems.filter(item => item.status === 'done').length;
  const totalCount = checklistItems.length;
  const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const canStart = employee.status === 'ready-to-offboard';
  const canComplete = employee.status === 'in-progress' && progress === 100;

  const handleUpdateTaskStatus = (itemId: string, status: TaskStatus) => {
    setChecklistItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          status,
          completedDate: status === 'done' ? new Date().toISOString().split('T')[0] : undefined,
          completedBy: status === 'done' ? 'Current User' : undefined
        };
      }
      return item;
    }));
  };

  const handleDeleteTask = (itemId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setChecklistItems(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.pic) {
      const task: OffboardingChecklistItem = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        category: 'administrative',
        status: 'to-do',
        pic: newTask.pic,
        picEmail: newTask.pic.toLowerCase().replace(/ /g, '.') + '@injourney.co.id'
      };
      setChecklistItems([...checklistItems, task]);
      setNewTask({ title: '', description: '', pic: '' });
      setShowAddTask(false);
    }
  };

  const handleSave = () => {
    const updatedEmployee: OffboardingEmployee = {
      ...employee,
      checklistItems,
      resignationInfo,
      progress
    };
    onUpdate(updatedEmployee);
    alert('Changes saved successfully!');
  };

  const handleStart = () => {
    if (onStartOffboarding) {
      const updatedEmployee: OffboardingEmployee = {
        ...employee,
        status: 'in-progress',
        checklistItems,
        resignationInfo,
        progress,
        initiatedDate: new Date().toISOString().split('T')[0]
      };
      onUpdate(updatedEmployee);
      onStartOffboarding();
    }
  };

  const handleComplete = () => {
    if (confirm('Are you sure you want to complete this offboarding? This action cannot be undone.')) {
      if (onCompleteOffboarding) {
        const updatedEmployee: OffboardingEmployee = {
          ...employee,
          status: 'completed',
          checklistItems: checklistItems.map(item => ({ ...item, status: 'done' as TaskStatus })),
          resignationInfo,
          progress: 100,
          completedDate: new Date().toISOString().split('T')[0]
        };
        onUpdate(updatedEmployee);
        onCompleteOffboarding();
      }
    }
  };

  const picOptions = [
    'HR Admin',
    'HR Manager',
    'IT Support',
    'Department Manager',
    'Finance Team',
    'Facilities Team'
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
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
              Offboarding - {employee.name}
            </h2>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)'
            }}>
              {employee.position} • {employee.department}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {canStart && (
              <Button onClick={handleStart} style={{ backgroundColor: 'var(--primary)' }}>
                Start Offboarding
              </Button>
            )}
            {canComplete && (
              <Button onClick={handleComplete} style={{ backgroundColor: '#10B981' }}>
                Complete Offboarding
              </Button>
            )}
            {!canStart && !canComplete && employee.status === 'in-progress' && (
              <Button variant="outline" onClick={handleSave}>
                <Save style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Alert for incomplete tasks */}
      {employee.status === 'in-progress' && progress < 100 && (
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
            color: '#3B82F6',
            flexShrink: 0
          }} />
          <div>
            <div style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '4px'
            }}>
              Complete all tasks to finish offboarding
            </div>
            <div style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)'
            }}>
              {doneCount} of {totalCount} tasks completed ({progress}%)
            </div>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '24px'
      }}>
        {/* Main Content */}
        <div>
          {/* Resignation Info */}
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '20px'
            }}>
              Resignation Info
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <div>
                <Label htmlFor="resignationType">Resignation Type</Label>
                <Select
                  value={resignationInfo.resignationType}
                  onValueChange={(value: any) =>
                    setResignationInfo({ ...resignationInfo, resignationType: value })
                  }
                  disabled={employee.status === 'completed'}
                >
                  <SelectTrigger id="resignationType" style={{ marginTop: '8px' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voluntary">Voluntary</SelectItem>
                    <SelectItem value="involuntary">Involuntary</SelectItem>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="end-of-contract">End of Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="resignationDate">Resignation Date</Label>
                <Input
                  id="resignationDate"
                  type="date"
                  value={resignationInfo.resignationDate}
                  onChange={(e) =>
                    setResignationInfo({ ...resignationInfo, resignationDate: e.target.value })
                  }
                  style={{ marginTop: '8px' }}
                  disabled={employee.status === 'completed'}
                />
              </div>

              <div>
                <Label htmlFor="lastWorkingDate">Last Working Date</Label>
                <Input
                  id="lastWorkingDate"
                  type="date"
                  value={resignationInfo.lastWorkingDate}
                  onChange={(e) =>
                    setResignationInfo({ ...resignationInfo, lastWorkingDate: e.target.value })
                  }
                  style={{ marginTop: '8px' }}
                  disabled={employee.status === 'completed'}
                />
              </div>

              <div>
                <Label htmlFor="noticePeriodDays">Notice Period (Days)</Label>
                <Input
                  id="noticePeriodDays"
                  type="number"
                  value={resignationInfo.noticePeriodDays || ''}
                  onChange={(e) =>
                    setResignationInfo({
                      ...resignationInfo,
                      noticePeriodDays: parseInt(e.target.value) || undefined
                    })
                  }
                  placeholder="e.g., 30"
                  style={{ marginTop: '8px' }}
                  disabled={employee.status === 'completed'}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <Label htmlFor="reason">Reason (Optional)</Label>
                <Textarea
                  id="reason"
                  value={resignationInfo.reason || ''}
                  onChange={(e) =>
                    setResignationInfo({ ...resignationInfo, reason: e.target.value })
                  }
                  placeholder="Enter resignation reason..."
                  rows={3}
                  style={{ marginTop: '8px' }}
                  disabled={employee.status === 'completed'}
                />
              </div>
            </div>
          </div>

          {/* To Do List */}
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
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}>
                To Do List
              </h3>
              {employee.status !== 'completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddTask(!showAddTask)}
                >
                  <Plus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                  Add Task
                </Button>
              )}
            </div>

            {/* Add Task Form */}
            {showAddTask && (
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <Label htmlFor="newTaskTitle">Task Name</Label>
                    <Input
                      id="newTaskTitle"
                      placeholder="Enter task name"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      style={{ marginTop: '8px' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newTaskDesc">Description</Label>
                    <Textarea
                      id="newTaskDesc"
                      placeholder="Enter task description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      rows={2}
                      style={{ marginTop: '8px' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newTaskPic">PIC</Label>
                    <Select
                      value={newTask.pic}
                      onValueChange={(value) => setNewTask({ ...newTask, pic: value })}
                    >
                      <SelectTrigger id="newTaskPic" style={{ marginTop: '8px' }}>
                        <SelectValue placeholder="Select PIC" />
                      </SelectTrigger>
                      <SelectContent>
                        {picOptions.map((pic) => (
                          <SelectItem key={pic} value={pic}>
                            {pic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Button variant="outline" size="sm" onClick={() => setShowAddTask(false)}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAddTask}
                      disabled={!newTask.title || !newTask.pic}
                    >
                      Add Task
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Task List Table */}
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{
                    backgroundColor: 'var(--muted)',
                    borderBottom: '1px solid var(--border)'
                  }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)'
                    }}>
                      To Do List Name
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      width: '180px'
                    }}>
                      PIC
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      width: '150px'
                    }}>
                      Status
                    </th>
                    {employee.status !== 'completed' && (
                      <th style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                        width: '60px'
                      }}>
                        Delete
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {checklistItems.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <td style={{ padding: '12px' }}>
                        <div>
                          <div style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--foreground)',
                            marginBottom: '4px'
                          }}>
                            {item.title}
                          </div>
                          {item.description && (
                            <div style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--muted-foreground)'
                            }}>
                              {item.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{
                        padding: '12px',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)'
                      }}>
                        {item.pic || '-'}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <Select
                          value={item.status}
                          onValueChange={(value: TaskStatus) =>
                            handleUpdateTaskStatus(item.id, value)
                          }
                          disabled={employee.status === 'completed'}
                        >
                          <SelectTrigger
                            style={{
                              width: '130px',
                              margin: '0 auto',
                              backgroundColor: `${taskStatusColors[item.status]}20`,
                              borderColor: taskStatusColors[item.status],
                              color: taskStatusColors[item.status]
                            }}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="to-do">To Do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      {employee.status !== 'completed' && (
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(item.id)}
                            style={{ color: 'var(--destructive)' }}
                          >
                            <Trash2 style={{ width: '16px', height: '16px' }} />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {checklistItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={employee.status !== 'completed' ? 4 : 3}
                        style={{
                          padding: '40px',
                          textAlign: 'center',
                          color: 'var(--muted-foreground)'
                        }}
                      >
                        No tasks yet. Click "Add Task" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Asset and Loan */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            marginBottom: '16px'
          }}>
            <h4 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '16px'
            }}>
              Assets & Loans
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button variant="outline" size="sm">
                <Package style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                View Assets {employee.hasAssets && `(${Math.floor(Math.random() * 5) + 1})`}
              </Button>
              <Button variant="outline" size="sm">
                <Coins style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                View Loans {employee.hasLoans && `(${Math.floor(Math.random() * 3) + 1})`}
              </Button>
            </div>
          </div>

          {/* Forms */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            marginBottom: '16px'
          }}>
            <h4 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '16px'
            }}>
              Forms
            </h4>
            <Button variant="outline" size="sm" style={{ width: '100%' }}>
              <FileText style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              Exit Interview Form
              {employee.exitInterviewCompleted && (
                <span style={{
                  marginLeft: 'auto',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--text-xs)',
                  backgroundColor: '#10B98120',
                  color: '#10B981'
                }}>
                  Completed
                </span>
              )}
            </Button>
          </div>

          {/* Progress Summary */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)'
          }}>
            <h4 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '16px'
            }}>
              Progress Summary
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)'
                  }}>
                    Tasks Completed
                  </span>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)'
                  }}>
                    {doneCount} / {totalCount}
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

              <div style={{
                padding: '12px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)'
              }}>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '4px'
                }}>
                  Status
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)'
                }}>
                  {employee.status === 'ready-to-offboard' && 'Ready to Offboard'}
                  {employee.status === 'in-progress' && 'In Progress'}
                  {employee.status === 'completed' && 'Completed'}
                  {employee.status === 'cancel-resign' && 'Cancelled'}
                </div>
              </div>

              {employee.initiatedDate && (
                <div style={{
                  padding: '12px',
                  backgroundColor: 'var(--muted)',
                  borderRadius: 'var(--radius)'
                }}>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                    marginBottom: '4px'
                  }}>
                    Started On
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)'
                  }}>
                    {new Date(employee.initiatedDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              )}

              {employee.completedDate && (
                <div style={{
                  padding: '12px',
                  backgroundColor: 'var(--muted)',
                  borderRadius: 'var(--radius)'
                }}>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                    marginBottom: '4px'
                  }}>
                    Completed On
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)'
                  }}>
                    {new Date(employee.completedDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate default checklist
function generateDefaultChecklist(): OffboardingChecklistItem[] {
  return [
    {
      id: '1',
      title: 'Return Company Laptop',
      description: 'Employee must return company-issued laptop and charger',
      category: 'equipment',
      status: 'to-do',
      pic: 'IT Support',
      picEmail: 'it.support@injourney.co.id'
    },
    {
      id: '2',
      title: 'Return Access Cards',
      description: 'Return all office access cards and parking cards',
      category: 'equipment',
      status: 'to-do',
      pic: 'Facilities Team',
      picEmail: 'facilities@injourney.co.id'
    },
    {
      id: '3',
      title: 'Disable System Access',
      description: 'Revoke access to all company systems',
      category: 'access',
      status: 'to-do',
      pic: 'IT Support',
      picEmail: 'it.support@injourney.co.id'
    },
    {
      id: '4',
      title: 'Knowledge Transfer',
      description: 'Complete knowledge transfer session',
      category: 'knowledge-transfer',
      status: 'to-do',
      pic: 'Department Manager',
      picEmail: 'manager@injourney.co.id'
    },
    {
      id: '5',
      title: 'Final Salary Settlement',
      description: 'Process final salary and benefits',
      category: 'administrative',
      status: 'to-do',
      pic: 'Finance Team',
      picEmail: 'finance@injourney.co.id'
    }
  ];
}
