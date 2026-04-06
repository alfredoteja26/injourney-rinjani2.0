import React, { useState } from 'react';
import { IDPDashboard } from './IDPDashboard';
import { GapAnalysisView } from './GapAnalysisView';
import { RecommendationsList } from './RecommendationsList';
import { CourseCatalog } from './CourseCatalog';
import { IDPEditor } from './IDPEditor';
import { IDPDetail } from './IDPDetail';
import { ProgressTracker } from './ProgressTracker';

export type IDPView = 
  | 'DASHBOARD'
  | 'GAP_ANALYSIS'
  | 'RECOMMENDATIONS'
  | 'CATALOG'
  | 'EDITOR'
  | 'DETAIL'
  | 'PROGRESS';

export function IDPMain() {
  const [currentView, setCurrentView] = useState<IDPView>('DASHBOARD');

  const renderView = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <IDPDashboard onNavigate={setCurrentView} />;
      case 'GAP_ANALYSIS':
        return <GapAnalysisView onNavigate={setCurrentView} />;
      case 'RECOMMENDATIONS':
        return <RecommendationsList onNavigate={setCurrentView} />;
      case 'CATALOG':
        return <CourseCatalog onNavigate={setCurrentView} />;
      case 'EDITOR':
        return <IDPEditor onNavigate={setCurrentView} />;
      case 'DETAIL':
        return <IDPDetail onNavigate={setCurrentView} />;
      case 'PROGRESS':
        return <ProgressTracker onNavigate={setCurrentView} />;
      default:
        return <IDPDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="h-full w-full bg-background overflow-y-auto">
      {renderView()}
    </div>
  );
}
