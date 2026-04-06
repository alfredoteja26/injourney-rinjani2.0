import { useParams } from "react-router";
import { CycleDetailLayout } from "../../../../components/360-assessment-hq/CycleDetailLayout";
import { AssessmentResults } from "../../../../components/360-assessment-hq/AssessmentResults";

export default function AssessmentResultsPage() {
  const { id } = useParams();
  
  if (!id) return null;

  return (
    <CycleDetailLayout>
      <AssessmentResults cycleId={id} />
    </CycleDetailLayout>
  );
}
