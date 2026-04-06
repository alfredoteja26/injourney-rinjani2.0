import { useState } from 'react';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';

interface OnboardingTestButtonProps {
  userId: string;
}

export function OnboardingTestButton({ userId }: OnboardingTestButtonProps) {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (!confirm('Reset semua progress onboarding? Halaman akan di-refresh.')) {
      return;
    }

    setIsResetting(true);
    
    try {
      // Clear onboarding state
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-cd5e1016/onboarding/${encodeURIComponent(userId)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hasSeenSpotlight: false,
          seenFeatureVersions: [],
          hasCompletedNewEmployeeOnboarding: false,
          newEmployeeChecklistProgress: []
        })
      });

      // Reload page to restart onboarding
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (e) {
      console.error('Failed to reset onboarding', e);
      setIsResetting(false);
      alert('Gagal reset onboarding. Silakan coba lagi.');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleReset}
      disabled={isResetting}
      className="gap-2"
    >
      <RotateCcw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
      {isResetting ? 'Resetting...' : 'Reset Onboarding (Test)'}
    </Button>
  );
}
