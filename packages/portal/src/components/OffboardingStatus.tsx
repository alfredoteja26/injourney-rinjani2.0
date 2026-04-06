import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, FileText, User, Calendar, ChevronDown, ChevronUp, X } from 'lucide-react';

interface OffboardingTask {
  id: string;
  title: string;
  description: string;
  category: 'documentation' | 'handover' | 'assets' | 'access' | 'exit-interview';
  completed: boolean;
  notes?: string;
  requiresNotes: boolean;
}

interface OffboardingStatusProps {
  employeeName?: string;
  lastWorkingDay?: Date;
  offboardingTasks?: OffboardingTask[];
  onTaskComplete?: (taskId: string, notes?: string) => void;
}

export function OffboardingStatus({
  employeeName = "John Doe",
  lastWorkingDay = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  offboardingTasks = [],
  onTaskComplete = () => {}
}: OffboardingStatusProps) {
  const [tasks, setTasks] = useState<OffboardingTask[]>(offboardingTasks.length > 0 ? offboardingTasks : [
    {
      id: '1',
      title: 'Complete Knowledge Transfer Document',
      description: 'Document all ongoing projects, responsibilities, and key contacts',
      category: 'documentation',
      completed: false,
      requiresNotes: true
    },
    {
      id: '2',
      title: 'Handover to Team Lead',
      description: 'Schedule and complete handover meeting with your team lead',
      category: 'handover',
      completed: false,
      requiresNotes: true
    },
    {
      id: '3',
      title: 'Return Company Assets',
      description: 'Return laptop, access card, and any other company property',
      category: 'assets',
      completed: false,
      requiresNotes: false
    },
    {
      id: '4',
      title: 'Update Project Status',
      description: 'Update status of all assigned projects in project management system',
      category: 'documentation',
      completed: false,
      requiresNotes: true
    },
    {
      id: '5',
      title: 'Complete Exit Interview',
      description: 'Attend exit interview with HR department',
      category: 'exit-interview',
      completed: false,
      requiresNotes: false
    },
    {
      id: '6',
      title: 'Archive Personal Files',
      description: 'Remove personal files from company systems and storage',
      category: 'access',
      completed: false,
      requiresNotes: false
    }
  ]);

  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [taskNotes, setTaskNotes] = useState<{ [key: string]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate countdown
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const deadline = lastWorkingDay.getTime();
      const difference = deadline - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [lastWorkingDay]);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleTaskToggle = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (!task.completed && task.requiresNotes && !taskNotes[taskId]?.trim()) {
      setExpandedTask(taskId);
      return;
    }

    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed, notes: taskNotes[taskId] || '' } : t
    );
    setTasks(updatedTasks);
    onTaskComplete(taskId, taskNotes[taskId]);
    
    if (!task.completed && expandedTask === taskId) {
      setExpandedTask(null);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'documentation': 'Dokumentasi',
      'handover': 'Serah Terima',
      'assets': 'Aset Perusahaan',
      'access': 'Akses Sistem',
      'exit-interview': 'Exit Interview'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'documentation': 'var(--primary)',
      'handover': '#F59E0B',
      'assets': '#10B981',
      'access': '#3B82F6',
      'exit-interview': 'var(--accent)'
    };
    return colors[category] || 'var(--muted-foreground)';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: 'var(--background)',
      minHeight: '100vh'
    }}>
      {/* Header with Back Button */}
      <div style={{
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <button
          onClick={() => window.location.hash = ""}
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--foreground)'
          }}
        >
          <X size={20} />
        </button>
        <h1 style={{
          margin: 0,
          color: 'var(--foreground)',
          fontFamily: 'Inter, sans-serif'
        }}>
          Status Offboarding
        </h1>
      </div>

      {/* Main Card Container */}
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden'
      }}>
        {/* Header Section with Warning Banner */}
        <div style={{
          backgroundColor: '#FEF3C7',
          padding: '24px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
          }}>
            <div style={{
              backgroundColor: '#FFF',
              borderRadius: '50%',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertCircle size={24} color="#F59E0B" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                margin: '0 0 8px 0',
                color: '#92400E',
                fontFamily: 'Inter, sans-serif'
              }}>
                Proses Offboarding Aktif
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px',
                color: '#92400E',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                opacity: 0.9
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} />
                  <span>{employeeName}</span>
                </div>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} />
                  <span>Hari Terakhir: {formatDate(lastWorkingDay)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <Clock size={20} color="var(--primary)" />
            <h4 style={{
              margin: 0,
              color: 'var(--foreground)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Waktu Tersisa
            </h4>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px'
          }}>
            {[
              { label: 'Hari', value: timeRemaining.days },
              { label: 'Jam', value: timeRemaining.hours },
              { label: 'Menit', value: timeRemaining.minutes },
              { label: 'Detik', value: timeRemaining.seconds }
            ].map((item, index) => (
              <div key={index} style={{
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: 'var(--text-3xl)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  marginBottom: '4px'
                }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Progress Penyelesaian Tugas
            </span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: 'var(--foreground)'
            }}>
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <div style={{
            height: '8px',
            backgroundColor: 'var(--muted)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progressPercentage}%`,
              backgroundColor: progressPercentage === 100 ? '#10B981' : 'var(--primary)',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{
            marginTop: '12px',
            fontSize: 'var(--text-2xl)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            color: progressPercentage === 100 ? '#10B981' : 'var(--primary)',
            textAlign: 'center'
          }}>
            {Math.round(progressPercentage)}%
          </div>
        </div>

        {/* Tasks Section */}
        <div style={{
          padding: '24px'
        }}>
          <h4 style={{
            margin: '0 0 16px 0',
            color: 'var(--foreground)',
            fontFamily: 'Inter, sans-serif'
          }}>
            Daftar Tugas
          </h4>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  backgroundColor: task.completed ? 'var(--muted)' : 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <button
                    onClick={() => handleTaskToggle(task.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: '2px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {task.completed ? (
                      <CheckCircle2 size={22} color="#10B981" strokeWidth={2.5} />
                    ) : (
                      <Circle size={22} color="var(--muted-foreground)" />
                    )}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: 'var(--text-base)',
                        color: task.completed ? 'var(--muted-foreground)' : 'var(--foreground)',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500
                      }}>
                        {task.title}
                      </span>
                      <span style={{
                        fontSize: 'var(--text-xs)',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: getCategoryColor(task.category) + '20',
                        color: getCategoryColor(task.category),
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500
                      }}>
                        {getCategoryLabel(task.category)}
                      </span>
                    </div>

                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.5
                    }}>
                      {task.description}
                    </p>

                    {task.requiresNotes && (
                      <button
                        onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--primary)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500
                        }}
                      >
                        <FileText size={14} />
                        <span>{task.completed ? 'Lihat Catatan' : 'Tambah Catatan'}</span>
                        {expandedTask === task.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}

                    {/* Expanded Notes Section */}
                    {expandedTask === task.id && task.requiresNotes && (
                      <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        backgroundColor: task.completed ? 'var(--card)' : 'var(--muted)',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)'
                      }}>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--foreground)',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500
                        }}>
                          Catatan / Detail {task.completed ? '(Terkunci)' : ''}
                        </label>
                        <textarea
                          value={task.completed ? task.notes : (taskNotes[task.id] || '')}
                          onChange={(e) => setTaskNotes({ ...taskNotes, [task.id]: e.target.value })}
                          disabled={task.completed}
                          placeholder="Masukkan detail atau catatan terkait tugas ini..."
                          style={{
                            width: '100%',
                            minHeight: '100px',
                            padding: '12px',
                            fontSize: 'var(--text-sm)',
                            fontFamily: 'Inter, sans-serif',
                            color: 'var(--foreground)',
                            backgroundColor: task.completed ? 'var(--muted)' : 'var(--input-background)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            resize: 'vertical',
                            outline: 'none'
                          }}
                        />
                        {!task.completed && (
                          <div style={{
                            marginTop: '8px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            * Catatan diperlukan untuk menyelesaikan tugas ini
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completion Message */}
          {progressPercentage === 100 && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #10B981',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle2 size={24} color="#10B981" />
              <div>
                <div style={{
                  fontSize: 'var(--text-base)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  color: '#047857',
                  marginBottom: '4px'
                }}>
                  Semua Tugas Telah Diselesaikan!
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: '#047857'
                }}>
                  Terima kasih atas dedikasi Anda. Tim HR akan menghubungi Anda untuk langkah selanjutnya.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
