import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '../components/ui/button';
import { AdminLayout } from '../components/shell/AdminLayout';
import { Layout } from '../components/shell/Layout';

interface ComingSoonProps {
  title?: string;
  description?: string;
  moduleName?: string;
  layout?: 'admin' | 'main';
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ 
  title = "Fitur Segera Hadir", 
  description = "Kami sedang bekerja keras untuk menghadirkan fitur ini. Fitur ini akan tersedia dalam pembaruan berikutnya.",
  moduleName,
  layout = 'main'
}) => {
  const navigate = useNavigate();
  const LayoutComponent = layout === 'admin' ? AdminLayout : Layout;

  return (
    <LayoutComponent>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative w-64 h-64 mb-8 rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-white">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1715331998698-09378555bd0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbnN0cnVjdGlvbiUyMG1pbmltYWwlMjBnZW9tZXRyaWMlMjAzZCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjkxMTQ5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Under Construction" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-sm">
              <Construction className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        <div className="max-w-md space-y-4">
          {moduleName && (
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              {moduleName}
            </span>
          )}
          
          <h1 className="text-3xl font-heading font-bold text-heading">
            {title}
          </h1>
          
          <p className="text-body text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="pt-4">
            <Button 
              onClick={() => navigate(-1)} 
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};
