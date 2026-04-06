import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface MandatorySurveyTestButtonProps {
  userEmail: string;
}

export function MandatorySurveyTestButton({ userEmail }: MandatorySurveyTestButtonProps) {
  const handleTriggerSurvey = () => {
    // Clear the completed surveys for current user to trigger mandatory survey again
    const completedSurveys = JSON.parse(localStorage.getItem('completedMandatorySurveys') || '{}');
    if (completedSurveys[userEmail]) {
      delete completedSurveys[userEmail];
      localStorage.setItem('completedMandatorySurveys', JSON.stringify(completedSurveys));
    }
    
    // Reload page to trigger survey check
    alert('Mandatory survey will appear after page reload. Please refresh the page.');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-foreground mb-1">Test Mandatory Survey</h3>
          <p className="text-sm text-muted-foreground">
            Trigger mandatory survey untuk melihat preview. Survey akan muncul setelah page reload.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleTriggerSurvey}
          className="gap-2 shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          Trigger Survey
        </Button>
      </div>
    </div>
  );
}
