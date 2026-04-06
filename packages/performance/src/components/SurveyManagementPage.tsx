import { SurveyManagement } from "./SurveyManagement";

interface SurveyManagementPageProps {
  onBack: () => void;
}

export default function SurveyManagementPage({ onBack }: SurveyManagementPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <SurveyManagement onBack={onBack} />
      </div>
    </div>
  );
}
