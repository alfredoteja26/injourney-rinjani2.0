import { useOnboarding } from './onboarding-context';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function FeatureAnnouncementModal() {
  // Wrap hook usage in try-catch for hot reload safety
  let hookData;
  try {
    hookData = useOnboarding();
  } catch (e) {
    console.error('FeatureAnnouncementModal: Context not available', e);
    return null;
  }
  
  const { showFeatureModal, currentFeature, dismissFeatureModal } = hookData;

  if (!currentFeature) return null;

  return (
    <Dialog open={showFeatureModal} onOpenChange={(open) => {
        if (!open) dismissFeatureModal();
    }}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white gap-0 border-none sm:max-w-[800px]">
        <div className="flex flex-col w-full">
            {/* Header / Title Section */}
            <div className="p-8 text-center bg-background">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                        <span className="font-semibold text-foreground">{currentFeature.title}</span>
                    </div>
                     <div className="w-3 h-3 rounded-full border border-border"></div>
                </div>
                
                <DialogTitle className="text-3xl font-bold text-foreground mb-4">{currentFeature.subtitle || currentFeature.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm leading-relaxed max-w-3xl mx-auto">
                    {currentFeature.description}
                </DialogDescription>
            </div>

            {/* Image / Content Section */}
            <div className="bg-sidebar p-8 flex justify-center items-center min-h-[400px]">
                {currentFeature.image && (
                     <div className="relative rounded-xl overflow-hidden shadow-lg border border-border bg-background w-full max-w-3xl">
                        <ImageWithFallback 
                            src={currentFeature.image}
                            alt={currentFeature.title}
                            className="w-full h-auto object-cover"
                        />
                     </div>
                )}
            </div>
            
            {/* Pagination / Footer */}
             <div className="p-6 bg-background flex justify-center items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-muted"></div>
             </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}