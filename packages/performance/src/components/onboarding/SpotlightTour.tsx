import React, { useState, useEffect, useRef } from 'react';
import { useOnboarding } from './onboarding-context';
import { createPortal } from 'react-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { SpotlightStep } from './types';

const steps: SpotlightStep[] = [
  {
    targetId: 'sidebar-profile-btn',
    title: 'Informasi Profil',
    description: 'Informasi Anda akan ditampilkan disini.',
    position: 'right'
  },
  {
    targetId: 'navbar-search-btn',
    title: 'Pencarian Cepat',
    description: 'Cari fitur, dokumen, atau rekan kerja dengan mudah disini.',
    position: 'bottom'
  },
  {
    targetId: 'navbar-notification-btn',
    title: 'Notifikasi',
    description: 'Pantau update terbaru dan tugas yang perlu diselesaikan.',
    position: 'bottom'
  }
];

export function SpotlightTour() {
  // Wrap hook usage in try-catch for hot reload safety
  let hookData;
  try {
    hookData = useOnboarding();
  } catch (e) {
    console.error('SpotlightTour: Context not available', e);
    return null;
  }
  
  const { showSpotlight, completeSpotlight } = hookData;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (!showSpotlight) return;

    const updateRect = () => {
      const element = document.getElementById(currentStep.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // If element not found, retry briefly then skip or error
        // For now, we'll try to find it on next render or assume it's hidden
      }
    };

    updateRect();
    
    // Resize observer
    const resizeObserver = new ResizeObserver(updateRect);
    const element = document.getElementById(currentStep.targetId);
    if (element) resizeObserver.observe(element);
    
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true); // Capture scroll events

    return () => {
      if (element) resizeObserver.unobserve(element);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
      resizeObserver.disconnect();
    };
  }, [showSpotlight, currentStepIndex, currentStep.targetId]);

  if (!showSpotlight || !targetRect) return null;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      completeSpotlight();
    }
  };

  const handleSkip = () => {
    completeSpotlight();
  };

  // Calculate tooltip position
  let tooltipStyle: React.CSSProperties = { position: 'absolute' };
  const spacing = 16;
  const tooltipWidth = 320;

  if (currentStep.position === 'right') {
    tooltipStyle.top = targetRect.top + (targetRect.height / 2) - 100;
    tooltipStyle.left = targetRect.right + spacing;
  } else if (currentStep.position === 'bottom') {
    tooltipStyle.top = targetRect.bottom + spacing;
    tooltipStyle.left = targetRect.left - (tooltipWidth / 2) + (targetRect.width / 2);
    // Boundary check left
    if (tooltipStyle.left < 20) tooltipStyle.left = 20;
  } else if (currentStep.position === 'top') {
    tooltipStyle.bottom = window.innerHeight - targetRect.top + spacing;
    tooltipStyle.left = targetRect.left;
  } else {
    tooltipStyle.top = targetRect.top;
    tooltipStyle.right = window.innerWidth - targetRect.left + spacing;
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden">
      {/* Dark Overlay with cutout */}
      <div 
        className="absolute inset-0 transition-all duration-500 ease-in-out"
        style={{
          // Using box-shadow to create the "cutout" effect
          // The shadow is extremely large
          boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.75)`,
          borderRadius: '8px',
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
          pointerEvents: 'none'
        }}
      />
      
      {/* Highlight Ring */}
      <div 
        className="absolute border-2 border-white rounded-lg animate-pulse pointer-events-none transition-all duration-300"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
        }}
      />

      {/* Tooltip Card */}
      <div 
        className="absolute transition-all duration-300 z-[10000]"
        style={{ ...tooltipStyle, width: tooltipWidth }}
      >
        <Card className="shadow-2xl border-none animate-in fade-in zoom-in-95 duration-300">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-bold text-primary">{currentStep.title}</CardTitle>
            <button onClick={handleSkip} className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{currentStep.description}</p>
            
            {/* Pagination Dots */}
            <div className="flex gap-1.5 mt-4 justify-center">
                {steps.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-2 w-2 rounded-full transition-colors ${idx === currentStepIndex ? 'bg-primary' : 'bg-muted'}`}
                    />
                ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
             <Button variant="ghost" onClick={handleSkip} size="sm" className="text-muted-foreground hover:text-foreground px-2">
                Lewati
             </Button>
             <Button onClick={handleNext} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {currentStepIndex === steps.length - 1 ? "Selesai" : "Lanjutkan"}
             </Button>
          </CardFooter>
        </Card>
      </div>
    </div>,
    document.body
  );
}