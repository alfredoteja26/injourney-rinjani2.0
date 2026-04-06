import React, { useState } from 'react';
import { Calendar, FileText, Package, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
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
import { OffboardingChecklistItem, TaskStatus } from './types';

interface UserOffboardingPreparationProps {
  userEmail: string;
  userName: string;
}

export function UserOffboardingPreparation({
  userEmail,
  userName
}: UserOffboardingPreparationProps) {
  const [exitRequestSubmitted, setExitRequestSubmitted] = useState(false);
  const [exitRequest, setExitRequest] = useState({
    resignationType: 'voluntary' as 'voluntary' | 'retirement' | 'end-of-contract',
    intendedLastDay: '',
    reason: '',
    noticePeriod: 30
  });

  // Mock checklist - in production, fetch from API
  const [myChecklist, setMyChecklist] = useState<OffboardingChecklistItem[]>([
    {
      id: '1',
      title: 'Submit Exit Request Form',
      description: 'Fill and submit your exit request form',
      category: 'document',
      status: 'done',
      pic: 'You'
    },
    {
      id: '2',
      title: 'Knowledge Transfer Documentation',
      description: 'Document all ongoing projects and responsibilities',
      category: 'knowledge-transfer',
      status: 'in-progress',
      pic: 'You'
    },
    {
      id: '3',
      title: 'Handover to Team',
      description: 'Schedule and conduct handover sessions',
      category: 'knowledge-transfer',
      status: 'to-do',
      pic: 'You'
    },
    {
      id: '4',
      title: 'Return Company Assets',
      description: 'Prepare to return laptop, access cards, and other company property',
      category: 'equipment',
      status: 'to-do',
      pic: 'IT Support'
    },
    {
      id: '5',
      title: 'Complete Exit Interview',
      description: 'Participate in exit interview with HR',
      category: 'document',
      status: 'to-do',
      pic: 'HR Admin'
    }
  ]);

  const handleSubmitExitRequest = () => {
    if (exitRequest.intendedLastDay && exitRequest.reason) {
      setExitRequestSubmitted(true);
      // Update first checklist item to done
      setMyChecklist(prev => prev.map((item, idx) => 
        idx === 0 ? { ...item, status: 'done' as TaskStatus } : item
      ));
      alert('Exit request submitted successfully! Your manager will be notified.');
    }
  };

  const handleUpdateTaskStatus = (itemId: string, status: TaskStatus) => {
    setMyChecklist(prev => prev.map(item => 
      item.id === itemId && item.pic === 'You' ? { ...item, status } : item
    ));
  };

  const myTasksCount = myChecklist.filter(item => item.pic === 'You').length;
  const myCompletedCount = myChecklist.filter(item => item.pic === 'You' && item.status === 'done').length;
  const myProgress = myTasksCount > 0 ? Math.round((myCompletedCount / myTasksCount) * 100) : 0;

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
          My Offboarding Preparation
        </h2>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)'
        }}>
          Prepare for your exit and complete necessary tasks
        </p>
      </div>

      {/* Status Banner */}
      {exitRequestSubmitted ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius)',
          marginBottom: '24px'
        }}>
          <CheckCircle2 style={{
            width: '24px',
            height: '24px',
            color: '#10B981',
            flexShrink: 0
          }} />
          <div>
            <div style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '4px'
            }}>
              Exit Request Submitted
            </div>
            <div style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)'
            }}>
              Your exit request has been submitted and is under review. Complete the tasks below to prepare for your transition.
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 'var(--radius)',
          marginBottom: '24px'
        }}>
          <AlertCircle style={{
            width: '24px',
            height: '24px',
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
              Ready to Start Your Exit Process?
            </div>
            <div style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)'
            }}>
              Submit your exit request below to begin the offboarding process.
            </div>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '24px'
      }}>
        {/* Main Content */}
        <div>
          {/* Exit Request Form */}
          {!exitRequestSubmitted && (
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'rgba(0, 133, 138, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText style={{
                    width: '20px',
                    height: '20px',
                    color: 'var(--primary)'
                  }} />
                </div>
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)'
                }}>
                  Submit Exit Request
                </h3>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <Label htmlFor="resignationType">Exit Type</Label>
                  <Select
                    value={exitRequest.resignationType}
                    onValueChange={(value: any) =>
                      setExitRequest({ ...exitRequest, resignationType: value })
                    }
                  >
                    <SelectTrigger id="resignationType" style={{ marginTop: '8px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="voluntary">Voluntary Resignation</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="end-of-contract">End of Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="intendedLastDay">Intended Last Working Day</Label>
                  <Input
                    id="intendedLastDay"
                    type="date"
                    value={exitRequest.intendedLastDay}
                    onChange={(e) =>
                      setExitRequest({ ...exitRequest, intendedLastDay: e.target.value })
                    }
                    min={new Date().toISOString().split('T')[0]}
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Label htmlFor="reason">Reason for Leaving</Label>
                <Textarea
                  id="reason"
                  value={exitRequest.reason}
                  onChange={(e) =>
                    setExitRequest({ ...exitRequest, reason: e.target.value })
                  }
                  placeholder="Please share your reason for leaving (optional but appreciated)"
                  rows={4}
                  style={{ marginTop: '8px' }}
                />
              </div>

              <Button
                onClick={handleSubmitExitRequest}
                disabled={!exitRequest.intendedLastDay || !exitRequest.reason}
                style={{ width: '100%' }}
              >
                Submit Exit Request
              </Button>
            </div>
          )}

          {/* My Tasks */}
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
              marginBottom: '20px'
            }}>
              My Offboarding Tasks
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {myChecklist.map(item => {
                const canUpdate = item.pic === 'You' && exitRequestSubmitted;
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: '16px',
                      backgroundColor: item.status === 'done' ? 'rgba(16, 185, 129, 0.05)' : 'var(--muted)',
                      border: `1px solid ${item.status === 'done' ? 'rgba(16, 185, 129, 0.2)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      {/* Status Icon */}
                      <div style={{ paddingTop: '2px' }}>
                        {item.status === 'done' ? (
                          <CheckCircle2 style={{
                            width: '20px',
                            height: '20px',
                            color: '#10B981'
                          }} />
                        ) : (
                          <Circle style={{
                            width: '20px',
                            height: '20px',
                            color: 'var(--muted-foreground)'
                          }} />
                        )}
                      </div>

                      {/* Task Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: item.status === 'done' ? 'var(--muted-foreground)' : 'var(--foreground)',
                          textDecoration: item.status === 'done' ? 'line-through' : 'none',
                          marginBottom: '4px'
                        }}>
                          {item.title}
                        </div>
                        <div style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--muted-foreground)',
                          marginBottom: '8px'
                        }}>
                          {item.description}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)'
                          }}>
                            Responsible: {item.pic}
                          </span>
                          {item.pic !== 'You' && (
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: 'var(--radius)',
                              fontSize: 'var(--text-xs)',
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              color: '#3B82F6'
                            }}>
                              Waiting for {item.pic}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status Update */}
                      {canUpdate && item.status !== 'done' && (
                        <div>
                          <Select
                            value={item.status}
                            onValueChange={(value: TaskStatus) =>
                              handleUpdateTaskStatus(item.id, value)
                            }
                          >
                            <SelectTrigger style={{
                              width: '140px',
                              fontSize: 'var(--text-xs)',
                              height: '32px'
                            }}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="to-do">To Do</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Progress Card */}
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            marginBottom: '16px',
            position: 'sticky',
            top: '24px'
          }}>
            <h4 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '16px'
            }}>
              My Progress
            </h4>

            <div style={{ marginBottom: '20px' }}>
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
                  {myCompletedCount} / {myTasksCount}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--muted)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${myProgress}%`,
                  height: '100%',
                  backgroundColor: 'var(--primary)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {exitRequest.intendedLastDay && exitRequestSubmitted && (
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)',
                marginBottom: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <Calendar style={{
                    width: '16px',
                    height: '16px',
                    color: 'var(--muted-foreground)'
                  }} />
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)'
                  }}>
                    Last Working Day
                  </span>
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)'
                }}>
                  {new Date(exitRequest.intendedLastDay).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            )}

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
                {exitRequestSubmitted ? 'In Progress' : 'Not Started'}
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(0, 133, 138, 0.05)',
            border: '1px solid rgba(0, 133, 138, 0.2)',
            borderRadius: 'var(--radius)'
          }}>
            <h4 style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              marginBottom: '8px'
            }}>
              Need Help?
            </h4>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
              lineHeight: '1.5',
              marginBottom: '12px'
            }}>
              If you have questions about the offboarding process, contact HR at hr@injourney.co.id
            </p>
            <Button variant="outline" size="sm" style={{ width: '100%' }}>
              Contact HR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
