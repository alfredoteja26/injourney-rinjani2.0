import React from 'react';
import { useNavigate } from 'react-router';
import { AlertCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { AdminLayout } from '../components/shell/AdminLayout';
import { Layout } from '../components/shell/Layout';

interface ErrorStateProps {
  title?: string;
  description?: string;
  code?: string;
  onRetry?: () => void;
  layout?: 'admin' | 'main';
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = "Terjadi Kesalahan", 
  description = "Maaf, kami tidak dapat memuat halaman yang Anda minta. Silakan coba lagi atau kembali ke beranda.",
  code = "404",
  onRetry,
  layout = 'main'
}) => {
  const navigate = useNavigate();
  const LayoutComponent = layout === 'admin' ? AdminLayout : Layout;

  return (
    <LayoutComponent>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative w-64 h-64 mb-8 rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-white group">
          <div className="absolute inset-0 bg-gradient-to-br from-danger/10 to-warning/10 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1556814491-bc96c7ed386d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1hemUlMjBtaW5pbWFsJTIwZ2VvbWV0cmljJTIwM2QlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY5MTE0OTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Error Maze" 
            className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-sm">
              <AlertCircle className="w-10 h-10 text-danger" />
            </div>
          </div>
        </div>

        <div className="max-w-md space-y-4">
          <span className="text-6xl font-black text-slate-200 tracking-tighter select-none">
            {code}
          </span>
          
          <h1 className="text-3xl font-heading font-bold text-heading mt-[-1rem] relative z-10">
            {title}
          </h1>
          
          <p className="text-body text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline"
              size="lg"
              className="gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
            
            {onRetry ? (
              <Button 
                onClick={onRetry} 
                variant="default"
                size="lg"
                className="gap-2 w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <RefreshCw className="w-4 h-4" />
                Coba Lagi
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/')} 
                variant="default"
                size="lg"
                className="gap-2 w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Home className="w-4 h-4" />
                Ke Beranda
              </Button>
            )}
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};
