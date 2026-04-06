import { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Building2, Users, Award, Laptop, Gift, Key, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { EmployeeInfo, CompanyFacility } from './types';

interface NewEmployeeWizardProps {
  open: boolean;
  onComplete: () => void;
  employeeInfo: EmployeeInfo;
  facilities: CompanyFacility[];
  companyName?: string;
}

export function NewEmployeeWizard({ 
  open, 
  onComplete, 
  employeeInfo, 
  facilities,
  companyName = "Injourney Holding"
}: NewEmployeeWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getFacilityIcon = (icon: string) => {
    const icons: Record<string, any> = {
      'laptop': Laptop,
      'gift': Gift,
      'key': Key,
    };
    return icons[icon] || Award;
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-4xl p-0 overflow-hidden bg-card gap-0 border-border sm:max-w-[900px]"
        hideClose={true}
      >
        <div className="flex flex-col w-full min-h-[600px]">
          {/* Step 1: Welcome */}
          {currentStep === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center flex-1 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
              <div className="mb-8 relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground">🎉</span>
                </div>
              </div>
              
              <h1 className="text-foreground mb-4">
                Selamat Bergabung!
              </h1>
              
              <div className="mb-6 space-y-2">
                <p className="text-muted-foreground max-w-2xl">
                  Selamat datang di <span className="text-primary font-semibold">{companyName}</span>
                </p>
                <p className="text-muted-foreground max-w-2xl">
                  Kami sangat senang Anda bergabung dengan tim kami. Mari kami kenalkan Anda dengan lingkungan kerja baru Anda.
                </p>
              </div>

              <div className="flex gap-2 mt-8">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentStep 
                        ? 'w-8 bg-primary' 
                        : idx < currentStep 
                        ? 'w-8 bg-primary/50' 
                        : 'w-8 bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Position & Team */}
          {currentStep === 1 && (
            <div className="flex flex-col p-8 flex-1">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-foreground">Informasi Posisi & Tim Anda</h2>
                </div>
                <p className="text-muted-foreground caption">
                  Berikut adalah detail posisi dan tim kerja Anda
                </p>
              </div>

              <div className="grid gap-6 flex-1">
                {/* Position Card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <label className="text-muted-foreground block mb-1">Posisi</label>
                      <h3 className="text-foreground">{employeeInfo.position}</h3>
                    </div>
                  </div>
                </div>

                {/* Unit Card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <label className="text-muted-foreground block mb-1">Unit Kerja</label>
                      <h3 className="text-foreground">{employeeInfo.unit}</h3>
                    </div>
                  </div>
                </div>

                {/* Manager Card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {employeeInfo.manager.avatar ? (
                        <img 
                          src={employeeInfo.manager.avatar} 
                          alt={employeeInfo.manager.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-primary-foreground font-semibold">
                            {employeeInfo.manager.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="text-muted-foreground block mb-1">Atasan Langsung</label>
                      <h4 className="text-foreground mb-1">{employeeInfo.manager.name}</h4>
                      <p className="caption text-muted-foreground">{employeeInfo.manager.position}</p>
                      <p className="caption text-primary">{employeeInfo.manager.email}</p>
                    </div>
                  </div>
                </div>

                {/* Teammates */}
                {employeeInfo.teammates && employeeInfo.teammates.length > 0 && (
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <label className="text-muted-foreground block mb-4">Rekan Tim Anda</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {employeeInfo.teammates.slice(0, 4).map((teammate, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          {teammate.avatar ? (
                            <img 
                              src={teammate.avatar} 
                              alt={teammate.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center flex-shrink-0">
                              <span className="text-primary-foreground caption font-semibold">
                                {teammate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="caption font-semibold text-foreground truncate">{teammate.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{teammate.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6 justify-center">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentStep 
                        ? 'w-8 bg-primary' 
                        : idx < currentStep 
                        ? 'w-8 bg-primary/50' 
                        : 'w-8 bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Facilities & Devices */}
          {currentStep === 2 && (
            <div className="flex flex-col p-8 flex-1">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-foreground">Fasilitas & Perangkat</h2>
                </div>
                <p className="text-muted-foreground caption">
                  Ini adalah fasilitas dan perangkat yang dapat Anda gunakan
                </p>
              </div>

              <div className="grid gap-4 flex-1 overflow-y-auto">
                {/* Devices */}
                <div>
                  <h4 className="text-foreground mb-3 flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-primary" />
                    Perangkat Kerja
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {facilities.filter(f => f.category === 'device').map((facility) => {
                      const Icon = getFacilityIcon(facility.icon);
                      return (
                        <div key={facility.id} className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="caption font-semibold text-foreground mb-1">{facility.name}</p>
                              <p className="text-xs text-muted-foreground">{facility.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-foreground mb-3 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-accent" />
                    Benefit & Fasilitas
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {facilities.filter(f => f.category === 'benefit').map((facility) => {
                      const Icon = getFacilityIcon(facility.icon);
                      return (
                        <div key={facility.id} className="p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1">
                              <p className="caption font-semibold text-foreground mb-1">{facility.name}</p>
                              <p className="text-xs text-muted-foreground">{facility.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Access */}
                <div>
                  <h4 className="text-foreground mb-3 flex items-center gap-2">
                    <Key className="w-4 h-4 text-chart-1" />
                    Akses & Sistem
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {facilities.filter(f => f.category === 'access').map((facility) => {
                      const Icon = getFacilityIcon(facility.icon);
                      return (
                        <div key={facility.id} className="p-4 rounded-lg border border-border bg-card hover:border-chart-1/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-chart-1" />
                            </div>
                            <div className="flex-1">
                              <p className="caption font-semibold text-foreground mb-1">{facility.name}</p>
                              <p className="text-xs text-muted-foreground">{facility.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6 justify-center">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentStep 
                        ? 'w-8 bg-primary' 
                        : idx < currentStep 
                        ? 'w-8 bg-primary/50' 
                        : 'w-8 bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Next Steps */}
          {currentStep === 3 && (
            <div className="flex flex-col items-center justify-center p-12 text-center flex-1 bg-gradient-to-br from-accent/5 via-primary/5 to-background">
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Award className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              
              <h2 className="text-foreground mb-4">
                Siap Memulai Perjalanan Anda!
              </h2>
              
              <div className="mb-6 space-y-3 max-w-2xl">
                <p className="text-muted-foreground">
                  Anda telah menyelesaikan orientasi awal. Selanjutnya, ada beberapa langkah penting yang perlu Anda selesaikan.
                </p>
                <p className="text-foreground font-semibold">
                  Checklist orientasi akan muncul di pojok kanan bawah layar Anda untuk membantu memandu langkah selanjutnya.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-3xl">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <p className="caption font-semibold text-foreground mb-1">Kenali Tim</p>
                  <p className="text-xs text-muted-foreground">Berkenalan dengan rekan kerja Anda</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Laptop className="w-5 h-5 text-accent" />
                  </div>
                  <p className="caption font-semibold text-foreground mb-1">Setup Perangkat</p>
                  <p className="text-xs text-muted-foreground">Konfigurasi tools & aplikasi</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-5 h-5 text-chart-1" />
                  </div>
                  <p className="caption font-semibold text-foreground mb-1">Pelajari Budaya</p>
                  <p className="text-xs text-muted-foreground">Pahami nilai perusahaan</p>
                </div>
              </div>

              <div className="flex gap-2 mt-8">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentStep 
                        ? 'w-8 bg-primary' 
                        : idx < currentStep 
                        ? 'w-8 bg-primary/50' 
                        : 'w-8 bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="p-6 border-t border-border bg-card flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Kembali
            </Button>
            
            <div className="caption text-muted-foreground">
              Langkah {currentStep + 1} dari {totalSteps}
            </div>
            
            <Button
              onClick={handleNext}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {currentStep === totalSteps - 1 ? 'Selesai' : 'Lanjut'}
              {currentStep !== totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
