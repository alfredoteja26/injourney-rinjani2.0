import React, { useState } from 'react';
import { Users, ClipboardList, Settings as SettingsIcon } from 'lucide-react';
import { EmployeeSelection } from './EmployeeSelection';
import { OffboardingList } from './OffboardingList';
import { OffboardingChecklistConfig } from './OffboardingChecklistConfig';

interface OffboardingManagementProps {
  userRole?: 'Admin' | 'User';
  userEmail?: string;
}

export function OffboardingManagement({ 
  userRole = 'Admin', 
  userEmail = 'admin@injourney.co.id' 
}: OffboardingManagementProps) {
  const [activeView, setActiveView] = useState<'list' | 'initiate' | 'config'>('list');

  // Only admins can access offboarding management
  if (userRole !== 'Admin') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        color: 'var(--muted-foreground)'
      }}>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: '8px'
        }}>
          Offboarding Management
        </h1>
        <p style={{ 
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)' 
        }}>
          Kelola proses offboarding karyawan dengan sistematis
        </p>
      </div>

      {/* Sub-navigation Tabs */}
      <div style={{ 
        display: 'flex',
        gap: '2px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '32px'
      }}>
        <button
          onClick={() => setActiveView('list')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeView === 'list' ? 'var(--card)' : 'transparent',
            border: 'none',
            borderBottom: activeView === 'list' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeView === 'list' ? 'var(--foreground)' : 'var(--muted-foreground)',
            fontWeight: activeView === 'list' ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <ClipboardList style={{ width: '16px', height: '16px' }} />
          Offboarding List
        </button>
        
        <button
          onClick={() => setActiveView('initiate')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeView === 'initiate' ? 'var(--card)' : 'transparent',
            border: 'none',
            borderBottom: activeView === 'initiate' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeView === 'initiate' ? 'var(--foreground)' : 'var(--muted-foreground)',
            fontWeight: activeView === 'initiate' ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <Users style={{ width: '16px', height: '16px' }} />
          Initiate Offboarding
        </button>

        <button
          onClick={() => setActiveView('config')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeView === 'config' ? 'var(--card)' : 'transparent',
            border: 'none',
            borderBottom: activeView === 'config' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeView === 'config' ? 'var(--foreground)' : 'var(--muted-foreground)',
            fontWeight: activeView === 'config' ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <SettingsIcon style={{ width: '16px', height: '16px' }} />
          Checklist Configuration
        </button>
      </div>

      {/* Content Area */}
      <div>
        {activeView === 'list' && (
          <OffboardingList 
            userEmail={userEmail}
            onInitiateNew={() => setActiveView('initiate')}
          />
        )}
        
        {activeView === 'initiate' && (
          <EmployeeSelection 
            userEmail={userEmail}
            onBack={() => setActiveView('list')}
          />
        )}
        
        {activeView === 'config' && (
          <OffboardingChecklistConfig />
        )}
      </div>
    </div>
  );
}
