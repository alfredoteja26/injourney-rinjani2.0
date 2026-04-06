import React, { useState } from 'react';
import { Settings, Save, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  required: boolean;
  enabled: boolean;
  category: 'personal' | 'contact' | 'employment' | 'emergency' | 'documents';
}

interface NewJoinerFormConfigProps {
  onSave: (fields: FormField[]) => void;
  onClose: () => void;
}

export function NewJoinerFormConfig({ onSave, onClose }: NewJoinerFormConfigProps) {
  const [fields, setFields] = useState<FormField[]>([
    // Personal Information
    { id: 'fullName', label: 'Full Name', type: 'text', required: true, enabled: true, category: 'personal' },
    { id: 'nik', label: 'NIK (ID Number)', type: 'text', required: true, enabled: true, category: 'personal' },
    { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, enabled: true, category: 'personal' },
    { id: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: true, enabled: true, category: 'personal' },
    { id: 'gender', label: 'Gender', type: 'select', required: true, enabled: true, category: 'personal' },
    { id: 'religion', label: 'Religion', type: 'select', required: false, enabled: true, category: 'personal' },
    { id: 'maritalStatus', label: 'Marital Status', type: 'select', required: false, enabled: true, category: 'personal' },
    { id: 'bloodType', label: 'Blood Type', type: 'select', required: false, enabled: false, category: 'personal' },
    
    // Contact Information
    { id: 'personalEmail', label: 'Personal Email', type: 'email', required: true, enabled: true, category: 'contact' },
    { id: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true, enabled: true, category: 'contact' },
    { id: 'currentAddress', label: 'Current Address', type: 'textarea', required: true, enabled: true, category: 'contact' },
    { id: 'permanentAddress', label: 'Permanent Address', type: 'textarea', required: false, enabled: true, category: 'contact' },
    { id: 'npwp', label: 'NPWP (Tax ID)', type: 'text', required: false, enabled: true, category: 'contact' },
    
    // Employment Information
    { id: 'position', label: 'Position', type: 'text', required: true, enabled: true, category: 'employment' },
    { id: 'department', label: 'Department', type: 'select', required: true, enabled: true, category: 'employment' },
    { id: 'startDate', label: 'Start Date', type: 'date', required: true, enabled: true, category: 'employment' },
    { id: 'employmentType', label: 'Employment Type', type: 'select', required: true, enabled: true, category: 'employment' },
    { id: 'workLocation', label: 'Work Location', type: 'select', required: false, enabled: true, category: 'employment' },
    { id: 'reportingTo', label: 'Reporting To', type: 'text', required: false, enabled: true, category: 'employment' },
    
    // Emergency Contact
    { id: 'emergencyContactName', label: 'Emergency Contact Name', type: 'text', required: true, enabled: true, category: 'emergency' },
    { id: 'emergencyContactRelation', label: 'Relationship', type: 'text', required: true, enabled: true, category: 'emergency' },
    { id: 'emergencyContactPhone', label: 'Emergency Contact Phone', type: 'tel', required: true, enabled: true, category: 'emergency' },
    
    // Documents
    { id: 'ktpUpload', label: 'KTP Upload', type: 'text', required: true, enabled: true, category: 'documents' },
    { id: 'kkUpload', label: 'KK Upload', type: 'text', required: false, enabled: true, category: 'documents' },
    { id: 'educationCertificate', label: 'Education Certificate', type: 'text', required: false, enabled: true, category: 'documents' },
    { id: 'cvUpload', label: 'CV Upload', type: 'text', required: false, enabled: false, category: 'documents' }
  ]);

  const handleToggleField = (fieldId: string) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId && !field.required
        ? { ...field, enabled: !field.enabled }
        : field
    ));
  };

  const handleSave = () => {
    onSave(fields);
    onClose();
  };

  const categories = {
    personal: 'Personal Information',
    contact: 'Contact Information',
    employment: 'Employment Information',
    emergency: 'Emergency Contact',
    documents: 'Documents'
  };

  const enabledCount = fields.filter(f => f.enabled).length;
  const totalCount = fields.length;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius)',
              backgroundColor: 'rgba(0, 133, 138, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Settings style={{
                width: '20px',
                height: '20px',
                color: 'var(--primary)'
              }} />
            </div>
            <div>
              <h2 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                marginBottom: '4px'
              }}>
                New Joiner Form Configuration
              </h2>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)'
              }}>
                {enabledCount} of {totalCount} fields enabled
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted-foreground)',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            {Object.entries(categories).map(([categoryKey, categoryLabel]) => {
              const categoryFields = fields.filter(f => f.category === categoryKey);
              return (
                <div key={categoryKey}>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid var(--border)'
                  }}>
                    {categoryLabel}
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '16px'
                  }}>
                    {categoryFields.map(field => (
                      <div
                        key={field.id}
                        style={{
                          padding: '16px',
                          backgroundColor: field.enabled ? 'rgba(0, 133, 138, 0.05)' : 'var(--muted)',
                          border: `1px solid ${field.enabled ? 'rgba(0, 133, 138, 0.2)' : 'var(--border)'}`,
                          borderRadius: 'var(--radius)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          opacity: field.required ? 1 : (field.enabled ? 1 : 0.6),
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            marginBottom: '4px'
                          }}>
                            {field.label}
                          </div>
                          <div style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <span>{field.type}</span>
                            {field.required && (
                              <span style={{
                                padding: '2px 6px',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#EF4444',
                                fontSize: 'var(--text-xs)',
                                fontWeight: 'var(--font-weight-medium)'
                              }}>
                                Required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                          onClick={() => handleToggleField(field.id)}
                          disabled={field.required}
                          style={{
                            position: 'relative',
                            width: '48px',
                            height: '24px',
                            borderRadius: '12px',
                            backgroundColor: field.enabled ? 'var(--primary)' : 'var(--border)',
                            border: 'none',
                            cursor: field.required ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s',
                            opacity: field.required ? 0.5 : 1,
                            flexShrink: 0
                          }}
                        >
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            left: field.enabled ? '26px' : '2px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            transition: 'left 0.2s',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                          }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Save style={{ width: '16px', height: '16px' }} />
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
