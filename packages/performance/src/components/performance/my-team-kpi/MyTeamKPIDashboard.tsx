import React, { useState } from 'react';
import { TeamDashboard } from './TeamDashboard';
import { TeamPlanningDashboard } from './TeamPlanningDashboard';
import { MemberKPIDetail } from './MemberKPIDetail';
import { MemberPlanningDetail } from './MemberPlanningDetail';
import { CascadeKPIView } from './CascadeKPIView';

export function MyTeamKPIDashboard() {
  const [currentView, setCurrentView] = useState<'monitoring' | 'planning' | 'cascading'>('monitoring');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedPlanningMember, setSelectedPlanningMember] = useState<string | null>(null);

  if (selectedMember) {
      return (
          <div className="p-6 bg-gray-50/50 min-h-screen">
              <MemberKPIDetail 
                  memberId={selectedMember} 
                  onBack={() => setSelectedMember(null)} 
              />
          </div>
      )
  }

  if (selectedPlanningMember) {
      return (
          <div className="p-6 bg-gray-50/50 min-h-screen">
              <MemberPlanningDetail 
                  memberId={selectedPlanningMember} 
                  onBack={() => setSelectedPlanningMember(null)} 
              />
          </div>
      )
  }

  if (currentView === 'cascading') {
    return (
        <div className="p-6 bg-gray-50/50 min-h-screen">
            <CascadeKPIView 
                onBack={() => setCurrentView('planning')}
            />
        </div>
    );
  }

  if (currentView === 'planning') {
    return (
        <div className="p-6 bg-gray-50/50 min-h-screen">
            <TeamPlanningDashboard 
                onViewMonitoring={() => setCurrentView('monitoring')}
                onCascadeKPI={() => setCurrentView('cascading')}
                onMemberClick={(nik) => setSelectedPlanningMember(nik)}
            />
        </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen">
        <TeamDashboard 
            onMemberClick={(nik) => setSelectedMember(nik)}
            onViewPlanning={() => setCurrentView('planning')}
        />
    </div>
  );
}
