import React from 'react';
import { MapPin, Award, Globe, FileText, ChevronRight } from 'lucide-react';
import { periodicReviewCategories, eligibleEmployees } from '../../data/mockTalentReviewData';

export function PeriodicReviewDashboard() {
  const categories = [
    {
      id: 'POSITION_TENURE_3Y',
      title: 'Position Tenure',
      subtitle: '≥3 Years',
      icon: MapPin,
      color: 'var(--color-danger)',
      bgColor: 'var(--color-danger-light)',
      count: periodicReviewCategories.find(c => c.category === 'POSITION_TENURE_3Y')?.count || 0,
      employees: periodicReviewCategories.find(c => c.category === 'POSITION_TENURE_3Y')?.employee_ids || []
    },
    {
      id: 'GRADE_TENURE_3Y',
      title: 'Grade Tenure',
      subtitle: '≥3 Years',
      icon: Award,
      color: 'var(--color-warning)',
      bgColor: 'var(--color-warning-light)',
      count: periodicReviewCategories.find(c => c.category === 'GRADE_TENURE_3Y')?.count || 0,
      employees: periodicReviewCategories.find(c => c.category === 'GRADE_TENURE_3Y')?.employee_ids || []
    },
    {
      id: 'EXTERNAL_ASSIGNMENT_3Y',
      title: 'External Assignment',
      subtitle: '≥3 Years',
      icon: Globe,
      color: 'var(--color-warning)',
      bgColor: 'var(--color-warning-light)',
      count: periodicReviewCategories.find(c => c.category === 'EXTERNAL_ASSIGNMENT_3Y')?.count || 0,
      employees: periodicReviewCategories.find(c => c.category === 'EXTERNAL_ASSIGNMENT_3Y')?.employee_ids || []
    },
    {
      id: 'CONTRACT_EXPIRY',
      title: 'Contract Expiry',
      subtitle: 'Next 6 months',
      icon: FileText,
      color: 'var(--color-danger)',
      bgColor: 'var(--color-danger-light)',
      count: periodicReviewCategories.find(c => c.category === 'CONTRACT_EXPIRY')?.count || 0,
      employees: periodicReviewCategories.find(c => c.category === 'CONTRACT_EXPIRY')?.employee_ids || []
    }
  ];

  const getEmployeeName = (employeeId: string): string => {
    const employee = eligibleEmployees.find(e => e.employee_id === employeeId);
    return employee?.name || employeeId;
  };

  const getEmployeePosition = (employeeId: string): string => {
    const employee = eligibleEmployees.find(e => e.employee_id === employeeId);
    return employee?.current_position || '';
  };

  return (
    <div 
      className="p-6 rounded"
      style={{ 
        backgroundColor: 'var(--color-card)', 
        border: '1px solid var(--color-border)'
      }}
    >
      <div className="mb-6">
        <h2 style={{ 
          fontSize: 'var(--text-xl)', 
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-foreground)',
          marginBottom: '4px'
        }}>
          Periodic Review Dashboard
        </h2>
        <p style={{ 
          fontSize: 'var(--text-sm)', 
          color: 'var(--color-muted-foreground)'
        }}>
          Monitor employees requiring periodic talent review
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="p-5 rounded transition-all hover:shadow-md cursor-pointer"
              style={{
                backgroundColor: 'var(--color-card)',
                border: `2px solid ${category.bgColor}`
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.bgColor }}
                >
                  <Icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: 'var(--color-muted-foreground)' }} />
              </div>
              
              <div className="mb-1">
                <p style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-foreground)'
                }}>
                  {category.title}
                </p>
                <p style={{ 
                  fontSize: 'var(--text-xs)', 
                  color: 'var(--color-muted-foreground)'
                }}>
                  {category.subtitle}
                </p>
              </div>

              <p style={{ 
                fontSize: 'var(--text-3xl)', 
                fontWeight: 'var(--font-weight-semibold)',
                color: category.color
              }}>
                {category.count}
              </p>

              {category.count > 0 && (
                <button
                  style={{
                    marginTop: '12px',
                    fontSize: 'var(--text-xs)',
                    color: category.color,
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  View Details →
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Alerts Section */}
      <div 
        className="p-4 rounded"
        style={{ 
          backgroundColor: 'var(--color-warning-light)',
          border: '1px solid var(--color-warning)'
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--color-warning-light)' }}
          >
            <FileText className="w-4 h-4" style={{ color: 'var(--color-warning)' }} />
          </div>
          <div className="flex-1">
            <p style={{ 
              fontSize: 'var(--text-sm)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-warning)',
              marginBottom: '8px'
            }}>
              ⚠️ Alerts & Upcoming Actions
            </p>
            <ul style={{ 
              fontSize: 'var(--text-sm)', 
              color: 'var(--color-warning)',
              paddingLeft: '20px'
            }}>
              {periodicReviewCategories.find(c => c.category === 'CONTRACT_EXPIRY')?.count! > 0 && (
                <li>
                  {periodicReviewCategories.find(c => c.category === 'CONTRACT_EXPIRY')?.count} contract employee(s) expiring in next 6 months - requires retention decision
                </li>
              )}
              {periodicReviewCategories.find(c => c.category === 'POSITION_TENURE_3Y')?.count! > 0 && (
                <li>
                  {periodicReviewCategories.find(c => c.category === 'POSITION_TENURE_3Y')?.count} employee(s) reaching 3-year position tenure this quarter - review for rotation/promotion
                </li>
              )}
              {periodicReviewCategories.find(c => c.category === 'GRADE_TENURE_3Y')?.count! > 0 && (
                <li>
                  {periodicReviewCategories.find(c => c.category === 'GRADE_TENURE_3Y')?.count} employee(s) at 3+ years in current grade - evaluate for career progression
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Employee List Preview */}
      <div className="mt-6">
        <h3 style={{ 
          fontSize: 'var(--text-base)', 
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-foreground)',
          marginBottom: '12px'
        }}>
          Employees Requiring Attention
        </h3>
        
        <div className="space-y-2">
          {categories.map(category => 
            category.employees.slice(0, 2).map(empId => (
              <div
                key={empId}
                className="flex items-center justify-between p-3 rounded"
                style={{
                  backgroundColor: category.bgColor,
                  border: `1px solid ${category.color}30`
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-foreground)'
                    }}>
                      {getEmployeeName(empId)}
                    </p>
                    <p style={{ 
                      fontSize: 'var(--text-xs)', 
                      color: 'var(--color-muted-foreground)'
                    }}>
                      {getEmployeePosition(empId)} • {category.title}
                    </p>
                  </div>
                </div>
                <button
                  className="px-3 py-1 rounded"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    border: `1px solid ${category.color}`,
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: category.color
                  }}
                >
                  Review
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
