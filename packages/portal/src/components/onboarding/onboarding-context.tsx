import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { OnboardingState, NewEmployeeChecklistItem, EmployeeInfo, CompanyFacility } from './types';

interface OnboardingContextType {
  state: OnboardingState;
  restartOnboarding: () => void;
  restartNewEmployeeOnboarding: () => void;
  isLoading: boolean;
  // New Employee Onboarding
  showNewEmployeeWizard: boolean;
  showNewEmployeeChecklist: boolean;
  newEmployeeChecklistItems: NewEmployeeChecklistItem[];
  completeNewEmployeeWizard: () => void;
  completeChecklistItem: (itemId: string) => void;
  dismissChecklist: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children, userId }: { children: React.ReactNode, userId: string | null }) {
  const [state, setState] = useState<OnboardingState>({ 
    hasSeenSpotlight: false, 
    seenFeatureVersions: [],
    hasCompletedNewEmployeeOnboarding: false,
    newEmployeeChecklistProgress: []
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // New Employee Onboarding States
  const [showNewEmployeeWizard, setShowNewEmployeeWizard] = useState(false);
  const [showNewEmployeeChecklist, setShowNewEmployeeChecklist] = useState(false);
  const [checklistItems, setChecklistItems] = useState<NewEmployeeChecklistItem[]>([
    {
      id: 'profile-complete',
      title: 'Lengkapi Profil Anda',
      description: 'Update foto profil dan informasi kontak Anda',
      completed: false,
      pic: 'HR Admin',
      picEmail: 'hr.admin@company.com',
      action: {
        type: 'link',
        label: 'Buka Profil',
        url: '#/myprofile'
      }
    },
    {
      id: 'team-meet',
      title: 'Kenalan dengan Tim',
      description: 'Jadwalkan pertemuan dengan rekan tim Anda',
      completed: false,
      pic: 'HR Manager',
      picEmail: 'hr.manager@company.com',
      action: {
        type: 'function',
        label: 'Lihat Tim',
        onClick: () => { /* View team functionality */ }
      }
    },
    {
      id: 'device-setup',
      title: 'Setup Perangkat Kerja',
      description: 'Konfigurasi laptop dan akun email perusahaan',
      completed: false,
      pic: 'IT Support',
      picEmail: 'it.support@company.com'
    },
    {
      id: 'policy-read',
      title: 'Baca Kebijakan Perusahaan',
      description: 'Pahami peraturan dan nilai-nilai perusahaan',
      completed: false,
      pic: 'HR Admin',
      picEmail: 'hr.admin@company.com',
      action: {
        type: 'link',
        label: 'Baca Kebijakan',
        url: '#/hc-policy'
      }
    },
    {
      id: 'training-complete',
      title: 'Selesaikan Training Dasar',
      description: 'Ikuti modul orientasi dan keamanan informasi',
      completed: false,
      pic: 'Training Coordinator',
      picEmail: 'training@company.com',
      action: {
        type: 'external',
        label: 'Mulai Training',
        url: 'https://training.example.com'
      }
    }
  ]);

  useEffect(() => {
    if (!userId) {
      setShowNewEmployeeWizard(false);
      setShowNewEmployeeChecklist(false);
      return;
    }

    const fetchStatus = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-cd5e1016/onboarding/${encodeURIComponent(userId)}`, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          // Fix: Ensure seenFeatureVersions is an array if API returns null/undefined
          const sanitizedData = {
             hasSeenSpotlight: !!data.hasSeenSpotlight,
             seenFeatureVersions: Array.isArray(data.seenFeatureVersions) ? data.seenFeatureVersions : [],
             hasCompletedNewEmployeeOnboarding: !!data.hasCompletedNewEmployeeOnboarding,
             newEmployeeChecklistProgress: Array.isArray(data.newEmployeeChecklistProgress) ? data.newEmployeeChecklistProgress : []
          };
          setState(sanitizedData);
          
          // Update checklist items with saved progress
          if (sanitizedData.newEmployeeChecklistProgress.length > 0) {
            setChecklistItems(prev => prev.map(item => ({
              ...item,
              completed: sanitizedData.newEmployeeChecklistProgress?.includes(item.id) || false
            })));
          }
          
          // Priority: New Employee Onboarding only
          if (!sanitizedData.hasCompletedNewEmployeeOnboarding) {
            // Show new employee wizard first - checklist will appear after wizard is completed
            setTimeout(() => setShowNewEmployeeWizard(true), 1000);
          } else {
            // If wizard was completed, show checklist if there are incomplete items
            const allItemsCompleted = checklistItems.every(item => 
              sanitizedData.newEmployeeChecklistProgress?.includes(item.id)
            );
            if (!allItemsCompleted) {
              setShowNewEmployeeChecklist(true);
            }
          }
        }
      } catch (e) {
        console.error("Failed to fetch onboarding status", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [userId]);

  const updateState = async (updates: Partial<OnboardingState>) => {
    if (!userId) return;
    
    // Optimistic update
    setState(prev => ({ ...prev, ...updates }));

    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-cd5e1016/onboarding/${encodeURIComponent(userId)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
    } catch (e) {
      console.error("Failed to update onboarding status", e);
    }
  };

  const restartOnboarding = () => {
    updateState({ 
      hasSeenSpotlight: false,
      seenFeatureVersions: [],
      hasCompletedNewEmployeeOnboarding: false,
      newEmployeeChecklistProgress: []
    });
    // Restart new employee onboarding wizard
    setShowNewEmployeeWizard(true);
    setShowNewEmployeeChecklist(false);
  };

  const restartNewEmployeeOnboarding = () => {
    // Reset checklist items to uncompleted
    setChecklistItems(prev => prev.map(item => ({ ...item, completed: false })));
    
    updateState({ 
      hasCompletedNewEmployeeOnboarding: false,
      newEmployeeChecklistProgress: []
    });
    
    // Show wizard immediately
    setShowNewEmployeeWizard(true);
    setShowNewEmployeeChecklist(false);
  };

  const completeNewEmployeeWizard = () => {
    setShowNewEmployeeWizard(false);
    // Show checklist after wizard is completed
    setTimeout(() => setShowNewEmployeeChecklist(true), 500);
    updateState({ hasCompletedNewEmployeeOnboarding: true });
  };

  const completeChecklistItem = (itemId: string) => {
    const updatedItems = checklistItems.map(item => 
      item.id === itemId ? { ...item, completed: true } : item
    );
    setChecklistItems(updatedItems);
    
    // Only save completed item IDs
    const completedIds = updatedItems.filter(item => item.completed).map(item => item.id);
    updateState({ newEmployeeChecklistProgress: completedIds });
  };

  const dismissChecklist = () => {
    setShowNewEmployeeChecklist(false);
  };

  return (
    <OnboardingContext.Provider value={{
      state,
      restartOnboarding,
      restartNewEmployeeOnboarding,
      isLoading,
      // New Employee Onboarding
      showNewEmployeeWizard,
      showNewEmployeeChecklist,
      newEmployeeChecklistItems: checklistItems,
      completeNewEmployeeWizard,
      completeChecklistItem,
      dismissChecklist
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};