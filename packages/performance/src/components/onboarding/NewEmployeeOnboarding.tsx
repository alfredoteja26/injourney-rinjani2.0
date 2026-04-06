import { useOnboarding } from './onboarding-context';
import { NewEmployeeWizard } from './NewEmployeeWizard';
import { NewEmployeeChecklist } from './NewEmployeeChecklist';
import { useNewEmployeeData } from './useNewEmployeeData';

interface NewEmployeeOnboardingProps {
  userEmail: string;
  renderChecklistInSidebar?: boolean; // New prop to control where checklist appears
}

export function NewEmployeeOnboarding({ userEmail, renderChecklistInSidebar = false }: NewEmployeeOnboardingProps) {
  // Wrap hook usage in try-catch for hot reload safety
  let hookData;
  try {
    hookData = useOnboarding();
  } catch (e) {
    console.error('NewEmployeeOnboarding: Context not available', e);
    return null;
  }

  const {
    showNewEmployeeWizard,
    showNewEmployeeChecklist,
    newEmployeeChecklistItems,
    completeNewEmployeeWizard,
    completeChecklistItem,
    dismissChecklist
  } = hookData;

  const { employeeInfo, facilities } = useNewEmployeeData(userEmail);

  const allItemsCompleted = newEmployeeChecklistItems.every(item => item.completed);

  return (
    <>
      {/* Wizard Modal */}
      {showNewEmployeeWizard && (
        <NewEmployeeWizard
          open={showNewEmployeeWizard}
          employeeInfo={employeeInfo}
          facilities={facilities}
          onComplete={completeNewEmployeeWizard}
        />
      )}

      {/* Checklist - Only show popup if not rendering in sidebar */}
      {!renderChecklistInSidebar && showNewEmployeeChecklist && (
        <NewEmployeeChecklist
          items={newEmployeeChecklistItems}
          onItemComplete={completeChecklistItem}
          onDismiss={dismissChecklist}
          canDismiss={allItemsCompleted}
        />
      )}
    </>
  );
}