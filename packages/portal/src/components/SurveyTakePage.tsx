import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { SurveyForm } from "./SurveyForm";
import { MOCK_SURVEYS } from "./EmployeeSurvey";

interface SurveyTakePageProps {
  surveyId: string;
  onBack: () => void;
}

export default function SurveyTakePage({ surveyId, onBack }: SurveyTakePageProps) {
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
      <div className="max-w-[900px] mx-auto px-6 py-8">
        <SurveyForm survey={survey} onBack={onBack} />
      </div>
    </div>
  );
}
