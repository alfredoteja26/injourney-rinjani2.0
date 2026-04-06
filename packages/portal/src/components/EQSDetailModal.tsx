import React from 'react';
import { X } from 'lucide-react';
import { EQSChart, EQSRadialChart } from './EQSChart';

interface EQSDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    totalScore: number;
    period: string;
    kinerja: number;
    kompetensi: number;
    pengalaman: number;
    aspirasi: number;
  };
}

export function EQSDetailModal({ isOpen, onClose, data }: EQSDetailModalProps) {
  if (!isOpen) return null;

  // Default data jika tidak ada
  const eqsData = data || {
    totalScore: 85.83,
    period: 'Q4 2025',
    kinerja: 85,
    kompetensi: 82,
    pengalaman: 88,
    aspirasi: 87
  };

  // Calculate category based on score
  const getCategory = (score: number) => {
    if (score >= 90) return { label: 'Sangat Baik', color: '#00858A' };
    if (score >= 80) return { label: 'Baik', color: '#31C6B1' };
    if (score >= 70) return { label: 'Cukup', color: '#F48F1E' };
    return { label: 'Perlu Perbaikan', color: '#E74C3C' };
  };

  const category = getCategory(eqsData.totalScore);

  const components = [
    { 
      label: 'Kinerja Component', 
      value: eqsData.kinerja, 
      color: '#00858A',
      description: 'Mengukur hasil kerja dan pencapaian target yang telah ditetapkan'
    },
    { 
      label: 'Kompetensi Component', 
      value: eqsData.kompetensi, 
      color: '#31C6B1',
      description: 'Mengukur hard skills dan technical capabilities yang dimiliki'
    },
    { 
      label: 'Pengalaman Component', 
      value: eqsData.pengalaman, 
      color: '#F48F1E',
      description: 'Mengukur pengalaman kerja, tenure, dan exposure yang telah dilalui'
    },
    { 
      label: 'Aspirasi Component', 
      value: eqsData.aspirasi, 
      color: '#9B59B6',
      description: 'Mengukur career aspiration, growth mindset, dan ambition untuk berkembang'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
        style={{ backgroundColor: 'var(--background, #FFFFFF)' }}
      >
        {/* Header */}
        <div 
          className="sticky top-0 z-10 flex items-center justify-between p-6 border-b"
          style={{ 
            backgroundColor: 'var(--background, #FFFFFF)',
            borderColor: 'var(--border, #E5E7EB)'
          }}
        >
          <div>
            <h2 
              className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] leading-[32px]"
              style={{ color: 'var(--foreground, #181D27)' }}
            >
              Detail EQS Score
            </h2>
            <p 
              className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] mt-1"
              style={{ color: 'var(--muted-foreground, #717680)' }}
            >
              Periode: {eqsData.period}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[8px] transition-colors hover:bg-[rgba(0,0,0,0.05)]"
            aria-label="Close"
          >
            <X size={24} style={{ color: 'var(--muted-foreground, #717680)' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Total Score Section */}
          <div 
            className="rounded-[12px] p-6 mb-6"
            style={{ 
              background: 'linear-gradient(127.974deg, #31C6B1 0%, #5AE2C3 100%)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-['Inter:Regular',sans-serif] text-[14px] text-white opacity-90 mb-2">
                  Total EQS Score
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[48px] leading-[56px] text-white">
                    {eqsData.totalScore}
                  </span>
                  <span className="font-['Inter:Regular',sans-serif] text-[24px] text-white opacity-60">
                    /100
                  </span>
                </div>
              </div>
              <div 
                className="px-4 py-2 rounded-[8px]"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white">
                  {category.label}
                </p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Radar Chart */}
            <div 
              className="rounded-[12px] p-6 border"
              style={{ 
                backgroundColor: 'var(--card, #FFFFFF)',
                borderColor: 'var(--border, #E5E7EB)'
              }}
            >
              <h3 
                className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[24px] mb-4"
                style={{ color: 'var(--foreground, #181D27)' }}
              >
                Visualisasi Komponen
              </h3>
              <div className="flex justify-center">
                <div 
                  className="rounded-[12px] p-4"
                  style={{ background: 'linear-gradient(127.974deg, #31C6B1 0%, #5AE2C3 100%)' }}
                >
                  <EQSRadialChart 
                    kinerja={eqsData.kinerja}
                    kompetensi={eqsData.kompetensi}
                    pengalaman={eqsData.pengalaman}
                    aspirasi={eqsData.aspirasi}
                    size={240}
                  />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div 
              className="rounded-[12px] p-6 border"
              style={{ 
                backgroundColor: 'var(--card, #FFFFFF)',
                borderColor: 'var(--border, #E5E7EB)'
              }}
            >
              <h3 
                className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[24px] mb-4"
                style={{ color: 'var(--foreground, #181D27)' }}
              >
                Perbandingan Komponen
              </h3>
              <div 
                className="rounded-[12px] p-6"
                style={{ background: 'linear-gradient(127.974deg, #00858A 0%, rgba(0, 133, 138, 0.8) 100%)' }}
              >
                <EQSChart 
                  kinerja={eqsData.kinerja}
                  kompetensi={eqsData.kompetensi}
                  pengalaman={eqsData.pengalaman}
                  aspirasi={eqsData.aspirasi}
                  size="large"
                />
              </div>
            </div>
          </div>

          {/* Component Details */}
          <div 
            className="rounded-[12px] p-6 border"
            style={{ 
              backgroundColor: 'var(--card, #FFFFFF)',
              borderColor: 'var(--border, #E5E7EB)'
            }}
          >
            <h3 
              className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] leading-[24px] mb-4"
              style={{ color: 'var(--foreground, #181D27)' }}
            >
              Detail Komponen
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {components.map((component, index) => (
                <div 
                  key={index}
                  className="rounded-[8px] p-4 border"
                  style={{ 
                    backgroundColor: 'var(--card, #FFFFFF)',
                    borderColor: 'var(--border, #E5E7EB)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-[12px] h-[12px] rounded-full"
                        style={{ backgroundColor: component.color }}
                      />
                      <h4 
                        className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[20px]"
                        style={{ color: 'var(--foreground, #181D27)' }}
                      >
                        {component.label}
                      </h4>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span 
                        className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] leading-[32px]"
                        style={{ color: component.color }}
                      >
                        {component.value}
                      </span>
                      <span 
                        className="font-['Inter:Regular',sans-serif] text-[14px]"
                        style={{ color: 'var(--muted-foreground, #717680)' }}
                      >
                        %
                      </span>
                    </div>
                  </div>
                  <p 
                    className="font-['Inter:Regular',sans-serif] text-[12px] leading-[18px]"
                    style={{ color: 'var(--muted-foreground, #717680)' }}
                  >
                    {component.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div 
                      className="w-full h-[8px] rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--border, #E5E7EB)' }}
                    >
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${component.value}%`,
                          backgroundColor: component.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Information Box */}
          <div 
            className="rounded-[12px] p-4 mt-6"
            style={{ 
              backgroundColor: 'rgba(159, 89, 182, 0.1)',
              borderLeft: '4px solid #9B59B6'
            }}
          >
            <div className="flex gap-3">
              <div 
                className="flex items-center justify-center w-[20px] h-[20px] rounded-full shrink-0 mt-0.5"
                style={{ backgroundColor: '#9B59B6' }}
              >
                <span className="font-['Inter:Semi_Bold',sans-serif] text-[12px] text-white">i</span>
              </div>
              <div>
                <h4 
                  className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[20px] mb-1"
                  style={{ color: '#9B59B6' }}
                >
                  Tentang EQS Score
                </h4>
                <p 
                  className="font-['Inter:Regular',sans-serif] text-[12px] leading-[18px]"
                  style={{ color: 'var(--foreground, #181D27)' }}
                >
                  EQS (Employee Quality Score) adalah metrik komprehensif yang mengukur kualitas karyawan berdasarkan 4 komponen utama: 
                  Kinerja, Kompetensi, Pengalaman, dan Aspirasi. Score ini digunakan untuk talent management, succession planning, dan 
                  career development planning.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-[8px] font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors"
              style={{ 
                backgroundColor: 'var(--secondary, #F3F4F6)',
                color: 'var(--secondary-foreground, #414651)'
              }}
            >
              Tutup
            </button>
            <button
              className="px-6 py-3 rounded-[8px] font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white transition-opacity hover:opacity-90"
              style={{ 
                background: 'linear-gradient(127.974deg, #00858A 0%, rgba(0, 133, 138, 0.8) 100%)'
              }}
              onClick={() => {
                // Future: Export to PDF or print
                alert('Fitur export akan segera tersedia');
              }}
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
