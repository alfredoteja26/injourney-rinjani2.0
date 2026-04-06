import { useParams } from "react-router";
import { CycleDetailLayout } from "../../../../components/360-assessment-hq/CycleDetailLayout";
import { CompletionMonitoring } from "../../../../components/360-assessment-hq/CompletionMonitoring";

export default function CompletionMonitoringPage() {
  const { id } = useParams();
  
  if (!id) return null;

  return (
    <CycleDetailLayout>
      <CompletionMonitoring cycleId={id} />
    </CycleDetailLayout>
  );
}
