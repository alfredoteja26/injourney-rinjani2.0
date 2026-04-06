import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { SurveyAnalytics } from "./SurveyAnalytics";
import { MOCK_SURVEYS } from "./EmployeeSurvey";

interface SurveyAnalyticsPageProps {
  surveyId: string;
  onBack: () => void;
  userRole?: "Admin" | "User";
}

export default function SurveyAnalyticsPage({ surveyId, onBack, userRole = "User" }: SurveyAnalyticsPageProps) {
  const [survey, setSurvey] = useState<typeof MOCK_SURVEYS[0] | null>(null);

  useEffect(() => {
    // Find survey by ID
    const foundSurvey = MOCK_SURVEYS.find(s => s.id === surveyId);
    if (foundSurvey) {
      setSurvey(foundSurvey);
    }
  }, [surveyId]);

  if (!survey) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Survey Not Found</h2>
          <p className="caption text-muted-foreground mb-6">
            The survey you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={onBack} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <SurveyAnalytics survey={survey} onBack={onBack} userRole={userRole} />
      </div>
    </div>
  );
}
