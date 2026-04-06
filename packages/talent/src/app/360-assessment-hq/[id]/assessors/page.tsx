import { useParams } from "react-router";
import { CycleDetailLayout } from "../../../../components/360-assessment-hq/CycleDetailLayout";
import { AssessorManagement } from "../../../../components/360-assessment-hq/AssessorManagement";

export default function AssessorManagementPage() {
  const { id } = useParams();
  
  if (!id) return null;

  return (
    <CycleDetailLayout>
      <AssessorManagement cycleId={id} />
    </CycleDetailLayout>
  );
}
