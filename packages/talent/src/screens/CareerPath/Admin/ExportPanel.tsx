/**
 * Export Panel Component
 * INJ-TMS-001 | Career Path (Aspiration)
 * 
 * Epic 5 | US-AC-02: Export Aspiration Data
 * Sprint 6 Implementation
 */

import React, { useState } from 'react';
import { X, Download, FileText, Table, CheckCircle2 } from 'lucide-react';
import type { Employee, Position } from '../../../types/careerPath';

interface ExportPanelProps {
  aspirations: Array<{
    emp_id: string;
    pos_id: string;
    employee?: Employee;
    position?: Position;
    sources: {
      individual: boolean;
      supervisor: boolean;
      jobHolder: boolean;
      unit: boolean;
    };
    totalSources: number;
    timestamps: {
      individual?: string;
      supervisor?: string;
      jobHolder?: string;
      unit?: string;
    };
  }>;
  onClose: () => void;
}

type ExportFormat = 'csv' | 'excel' | 'json';
type ExportType = 'full' | 'summary' | 'multi-source';

export function ExportPanel({ aspirations, onClose }: ExportPanelProps) {
  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');
  const [exportType, setExportType] = useState<ExportType>('full');
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);

    // Filter based on export type
    let dataToExport = aspirations;
    if (exportType === 'multi-source') {
      dataToExport = aspirations.filter(a => a.totalSources >= 2);
    }

    // Prepare export data
    const exportData = dataToExport.map(asp => {
      const baseData = {
        'NIK': asp.employee?.nik || '',
        'Nama Karyawan': asp.employee?.name || '',
        'Posisi Saat Ini': asp.employee?.position || '',
        'Grade Jabatan Karyawan': asp.employee?.grade_jabatan || '',
        'Band Jabatan Karyawan': asp.employee?.band_jabatan || '',
        'Perusahaan Karyawan': asp.employee?.company || '',
        'Unit Karyawan': asp.employee?.unit || '',
        'Job Family Karyawan': asp.employee?.job_family || '',
        'Posisi Aspirasi': asp.position?.name || '',
        'Grade Jabatan Posisi': asp.position?.grade_jabatan || '',
        'Band Jabatan Posisi': asp.position?.band_jabatan || '',
        'Perusahaan Posisi': asp.position?.company || '',
        'Unit Posisi': asp.position?.unit || '',
        'Job Family Posisi': asp.position?.job_family || '',
        'Lokasi Posisi': asp.position?.location || '',
        'Status Posisi': asp.position?.status || '',
        'Individual': asp.sources.individual ? 'Ya' : 'Tidak',
        'Supervisor': asp.sources.supervisor ? 'Ya' : 'Tidak',
        'Job Holder': asp.sources.jobHolder ? 'Ya' : 'Tidak',
        'Unit': asp.sources.unit ? 'Ya' : 'Tidak',
        'Total Sumber': asp.totalSources,
      };

      if (includeTimestamps) {
        return {
          ...baseData,
          'Tanggal Individual': asp.timestamps.individual || '-',
          'Tanggal Supervisor': asp.timestamps.supervisor || '-',
          'Tanggal Job Holder': asp.timestamps.jobHolder || '-',
          'Tanggal Unit': asp.timestamps.unit || '-',
        };
      }

      return baseData;
    });

    // Generate file based on format
    setTimeout(() => {
      if (exportFormat === 'csv') {
        downloadCSV(exportData);
      } else if (exportFormat === 'json') {
        downloadJSON(exportData);
      } else {
        // Excel export would require a library like xlsx
        alert('Excel export coming soon! Using CSV for now.');
        downloadCSV(exportData);
      }
      
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  const downloadCSV = (data: any[]) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape quotes and wrap in quotes if contains comma
          return typeof value === 'string' && (value.includes(',') || value.includes('"'))
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `aspirasi-karir-${exportType}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const downloadJSON = (data: any[]) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `aspirasi-karir-${exportType}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getExportCount = () => {
    if (exportType === 'multi-source') {
      return aspirations.filter(a => a.totalSources >= 2).length;
    }
    return aspirations.length;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="rounded-lg max-w-2xl w-full"
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
            >
              <Download className="w-5 h-5" />
            </div>
            <h3>Export Data Aspirasi</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Type */}
          <div>
            <label className="mb-3 block">TIPE DATA</label>
            <div className="grid grid-cols-3 gap-3">
              <ExportTypeCard
                selected={exportType === 'full'}
                onClick={() => setExportType('full')}
                title="Semua Data"
                description="Lengkap dengan detail"
                count={aspirations.length}
              />
              <ExportTypeCard
                selected={exportType === 'summary'}
                onClick={() => setExportType('summary')}
                title="Ringkasan"
                description="Data esensial saja"
                count={aspirations.length}
              />
              <ExportTypeCard
                selected={exportType === 'multi-source'}
                onClick={() => setExportType('multi-source')}
                title="Multi-Source"
                description="≥2 sumber saja"
                count={aspirations.filter(a => a.totalSources >= 2).length}
              />
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="mb-3 block">FORMAT FILE</label>
            <div className="grid grid-cols-3 gap-3">
              <FormatCard
                selected={exportFormat === 'csv'}
                onClick={() => setExportFormat('csv')}
                icon={<FileText className="w-5 h-5" />}
                title="CSV"
                description="Comma-separated"
              />
              <FormatCard
                selected={exportFormat === 'excel'}
                onClick={() => setExportFormat('excel')}
                icon={<Table className="w-5 h-5" />}
                title="Excel"
                description="Microsoft Excel"
              />
              <FormatCard
                selected={exportFormat === 'json'}
                onClick={() => setExportFormat('json')}
                icon={<FileText className="w-5 h-5" />}
                title="JSON"
                description="JavaScript Object"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="mb-3 block">OPSI TAMBAHAN</label>
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: 'var(--color-muted)',
                border: '1px solid var(--color-border)',
              }}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTimestamps}
                  onChange={(e) => setIncludeTimestamps(e.target.checked)}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <div>
                  <p style={{ fontSize: 'var(--text-base)' }}>Include Timestamps</p>
                  <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                    Sertakan tanggal submit untuk setiap sumber
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Export Summary */}
          <div
            className="rounded-lg p-4 flex items-center justify-between"
            style={{
              backgroundColor: 'var(--color-primary-light)',
              border: '1px solid var(--color-primary)',
            }}
          >
            <div>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-foreground)' }}>
                Siap untuk export
              </p>
              <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                {getExportCount()} aspirasi • Format: {exportFormat.toUpperCase()}
              </p>
            </div>
            {exportSuccess && (
              <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--color-nine-highpot)' }} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-between items-center gap-3 p-6 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
            Data untuk Talent Succession Module
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-card)',
                color: 'var(--color-foreground)',
              }}
            >
              Batal
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || getExportCount() === 0}
              className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
              }}
              onMouseEnter={(e) => {
                if (!isExporting && getExportCount() > 0) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              }}
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Exporting...
                </>
              ) : exportSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Success!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export ({getExportCount()})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ExportTypeCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  count: number;
}

function ExportTypeCard({ selected, onClick, title, description, count }: ExportTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-4 text-left transition-all hover:shadow-md"
      style={{
        border: selected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
        backgroundColor: selected ? 'var(--color-primary-light)' : 'var(--color-card)',
      }}
    >
      <p style={{ fontSize: 'var(--text-base)' }}>{title}</p>
      <p className="caption mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
        {description}
      </p>
      <p className="badge mt-2 inline-block" style={{ backgroundColor: 'var(--color-muted)' }}>
        {count} records
      </p>
    </button>
  );
}

interface FormatCardProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FormatCard({ selected, onClick, icon, title, description }: FormatCardProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-4 text-center transition-all hover:shadow-md"
      style={{
        border: selected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
        backgroundColor: selected ? 'var(--color-primary-light)' : 'var(--color-card)',
        color: selected ? 'var(--color-primary)' : 'var(--color-foreground)',
      }}
    >
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <p style={{ fontSize: 'var(--text-base)' }}>{title}</p>
      <p className="caption mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
        {description}
      </p>
    </button>
  );
}
