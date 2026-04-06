import React, { useState } from "react";
import { FileText, ListChecks } from "lucide-react";
import { NewJoinerSubmissions } from "./NewJoinerSubmissions";
import { ChecklistConfiguration } from "./ChecklistConfiguration";

interface OnboardingSettingsProps {
  // Add props if needed
}

export function OnboardingSettings(props: OnboardingSettingsProps) {
  const [activeView, setActiveView] = useState<"submissions" | "checklist" | "form-settings">("submissions");

  const handleFormSettings = () => {
    setActiveView("form-settings");
  };

  return (
    <div>
      {/* Sub-navigation Tabs */}
      <div style={{ 
        display: 'flex',
        gap: '2px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '32px'
      }}>
        <button
          onClick={() => setActiveView("submissions")}
          style={{
            padding: '12px 24px',
            backgroundColor: activeView === "submissions" ? 'var(--card)' : 'transparent',
            border: 'none',
            borderBottom: activeView === "submissions" ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeView === "submissions" ? 'var(--foreground)' : 'var(--muted-foreground)',
            fontWeight: activeView === "submissions" ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <FileText style={{ width: '16px', height: '16px' }} />
          Form Submissions
        </button>
        <button
          onClick={() => setActiveView("checklist")}
          style={{
            padding: '12px 24px',
            backgroundColor: activeView === "checklist" ? 'var(--card)' : 'transparent',
            border: 'none',
            borderBottom: activeView === "checklist" ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeView === "checklist" ? 'var(--foreground)' : 'var(--muted-foreground)',
            fontWeight: activeView === "checklist" ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <ListChecks style={{ width: '16px', height: '16px' }} />
          Checklist Configuration
        </button>
        {activeView === "form-settings" && (
          <button
            onClick={() => setActiveView("form-settings")}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--card)',
              border: 'none',
              borderBottom: '2px solid var(--primary)',
              color: 'var(--foreground)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FileText style={{ width: '16px', height: '16px' }} />
            Form Settings
          </button>
        )}
      </div>

      {/* Content Area */}
      <div>
        {activeView === "submissions" && (
          <NewJoinerSubmissions onFormSettings={handleFormSettings} />
        )}
        
        {activeView === "checklist" && (
          <ChecklistConfiguration />
        )}
        
        {activeView === "form-settings" && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2>Form Settings</h2>
              <p className="caption" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
                Configure the new joiner form fields and settings
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '32px'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '8px' }}>Form Configuration</h3>
                <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                  The new joiner form includes the following fields:
                </p>
              </div>
              
              <div style={{ 
                display: 'grid',
                gap: '16px',
                padding: '20px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)'
              }}>
                {[
                  { name: "Employee name", required: true },
                  { name: "Email", required: true },
                  { name: "Phone number", required: false },
                  { name: "Additional phone number", required: false },
                  { name: "Place of birth", required: false },
                  { name: "Birthdate", required: true },
                  { name: "Gender", required: false },
                  { name: "Marital status", required: true },
                  { name: "Blood type", required: false },
                  { name: "Religion", required: true },
                ].map((field) => (
                  <div 
                    key={field.name}
                    style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)'
                    }}
                  >
                    <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {field.name}
                    </span>
                    {field.required ? (
                      <span 
                        className="badge"
                        style={{ 
                          padding: '4px 12px',
                          backgroundColor: 'var(--primary)',
                          color: 'var(--primary-foreground)',
                          borderRadius: 'var(--radius)'
                        }}
                      >
                        Required
                      </span>
                    ) : (
                      <span 
                        className="badge"
                        style={{ 
                          padding: '4px 12px',
                          backgroundColor: 'var(--muted)',
                          color: 'var(--muted-foreground)',
                          borderRadius: 'var(--radius)'
                        }}
                      >
                        Optional
                      </span>
                    )}
                  </div>
                ))}
              </div>
              
              <div style={{ 
                marginTop: '24px',
                padding: '16px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)'
              }}>
                <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                  <strong>Note:</strong> Form customization and field management will be available in the next update. 
                  Currently, the form uses a predefined structure optimized for employee onboarding.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
