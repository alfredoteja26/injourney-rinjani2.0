import React, { useState } from "react";
import { FileText, ListChecks, Users, Monitor } from "lucide-react";
import { NewJoinerSubmissions } from "./NewJoinerSubmissions";
import { ChecklistConfiguration } from "./ChecklistConfiguration";
import { NewJoinerResponseTable } from "./NewJoinerResponseTable";
import { OnboardingMonitoringTable } from "./OnboardingMonitoringTable";

interface OnboardingSettingsProps {
  // Add props if needed
}

export function OnboardingSettings(props: OnboardingSettingsProps) {
  const [activeView, setActiveView] = useState<"submissions" | "checklist" | "responses" | "monitoring">("submissions");

  const handleViewResponse = (responseId: string) => {
    alert(`Viewing response details for ID: ${responseId}`);
    // In production, navigate to detailed view
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
          onClick={() => setActiveView("responses")}
          style={{
            padding: '12px 24px',
            backgroundColor: activeView === "responses" ? 'var(--card)' : 'transparent',
            border: 'none',
            borderBottom: activeView === "responses" ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeView === "responses" ? 'var(--foreground)' : 'var(--muted-foreground)',
            fontWeight: activeView === "responses" ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <Users style={{ width: '16px', height: '16px' }} />
          New Joiner Responses
        </button>
        <button
          onClick={() => setActiveView("monitoring")}
          style={{
            padding: '12px 24px',
            backgroundColor: activeView === "monitoring" ? 'var(--card)' : 'transparent',
            border: 'none',
            borderBottom: activeView === "monitoring" ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeView === "monitoring" ? 'var(--foreground)' : 'var(--muted-foreground)',
            fontWeight: activeView === "monitoring" ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <Monitor style={{ width: '16px', height: '16px' }} />
          Monitoring Pekerja Baru
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
      </div>

      {/* Content Area */}
      <div>
        {activeView === "submissions" && (
          <NewJoinerSubmissions />
        )}
        
        {activeView === "responses" && (
          <NewJoinerResponseTable onViewResponse={handleViewResponse} />
        )}
        
        {activeView === "monitoring" && (
          <OnboardingMonitoringTable onViewDetails={(id) => alert(`Melihat detail untuk employee ID: ${id}`)} />
        )}
        
        {activeView === "checklist" && (
          <ChecklistConfiguration />
        )}
      </div>
    </div>
  );
}