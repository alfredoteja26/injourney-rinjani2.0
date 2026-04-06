import React, { useState } from 'react';
import { Search, Eye, Calendar, Mail, CheckCircle2, Clock, AlertCircle, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface OnboardingEmployee {
  id: string;
  fullName: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  onboardingStatus: 'not-started' | 'in-progress' | 'completed' | 'overdue';
  checklistProgress: number; // percentage 0-100
  picName: string;
  picEmail: string;
  formSubmitted: boolean;
}

interface OnboardingMonitoringTableProps {
  onViewDetails?: (employeeId: string) => void;
}

export function OnboardingMonitoringTable({ onViewDetails }: OnboardingMonitoringTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | OnboardingEmployee['onboardingStatus']>('all');

  // Mock data - in production, fetch from API
  const [employees, setEmployees] = useState<OnboardingEmployee[]>([
    {
      id: '1',
      fullName: 'Rizky Pratama',
      email: 'rizky.pratama@injourney.co.id',
      position: 'Senior Product Manager',
      department: 'Product',
      joinDate: '2026-02-01',
      onboardingStatus: 'not-started',
      checklistProgress: 0,
      picName: 'Dimas Sayyid',
      picEmail: 'dimas.sayyid@injourney.id',
      formSubmitted: true
    },
    {
      id: '2',
      fullName: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@injourney.co.id',
      position: 'UX Researcher',
      department: 'Design',
      joinDate: '2026-02-03',
      onboardingStatus: 'in-progress',
      checklistProgress: 45,
      picName: 'Binavia Wardhani',
      picEmail: 'binavia@injourney.co.id',
      formSubmitted: true
    },
    {
      id: '3',
      fullName: 'Andi Setiawan',
      email: 'andi.setiawan@injourney.co.id',
      position: 'Data Engineer',
      department: 'Engineering',
      joinDate: '2026-02-05',
      onboardingStatus: 'in-progress',
      checklistProgress: 75,
      picName: 'Dimas Sayyid',
      picEmail: 'dimas.sayyid@injourney.id',
      formSubmitted: true
    },
    {
      id: '4',
      fullName: 'Dewi Lestari',
      email: 'dewi.lestari@injourney.co.id',
      position: 'HR Business Partner',
      department: 'Human Capital',
      joinDate: '2026-02-08',
      onboardingStatus: 'not-started',
      checklistProgress: 0,
      picName: 'Binavia Wardhani',
      picEmail: 'binavia@injourney.co.id',
      formSubmitted: false
    },
    {
      id: '5',
      fullName: 'Budi Santoso',
      email: 'budi.santoso@injourney.co.id',
      position: 'Full Stack Developer',
      department: 'Engineering',
      joinDate: '2026-01-15',
      onboardingStatus: 'overdue',
      checklistProgress: 60,
      picName: 'Dimas Sayyid',
      picEmail: 'dimas.sayyid@injourney.id',
      formSubmitted: true
    },
    {
      id: '6',
      fullName: 'Maya Anggraini',
      email: 'maya.anggraini@injourney.co.id',
      position: 'Marketing Manager',
      department: 'Marketing',
      joinDate: '2026-01-20',
      onboardingStatus: 'completed',
      checklistProgress: 100,
      picName: 'Binavia Wardhani',
      picEmail: 'binavia@injourney.co.id',
      formSubmitted: true
    }
  ]);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || employee.onboardingStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OnboardingEmployee['onboardingStatus']) => {
    const styles = {
      'not-started': {
        bg: 'rgba(107, 114, 128, 0.1)',
        text: '#6B7280',
        border: 'rgba(107, 114, 128, 0.2)',
        label: 'Belum Dimulai'
      },
      'in-progress': {
        bg: 'rgba(0, 133, 138, 0.1)',
        text: '#00858A',
        border: 'rgba(0, 133, 138, 0.2)',
        label: 'Sedang Berjalan'
      },
      'completed': {
        bg: 'rgba(49, 198, 177, 0.1)',
        text: '#31C6B1',
        border: 'rgba(49, 198, 177, 0.2)',
        label: 'Selesai'
      },
      'overdue': {
        bg: 'rgba(240, 68, 56, 0.1)',
        text: '#F04438',
        border: 'rgba(240, 68, 56, 0.2)',
        label: 'Terlambat'
      }
    };

    const style = styles[status];
    
    return (
      <div 
        className="px-3 py-1 rounded-[6px] inline-flex items-center gap-1"
        style={{ 
          backgroundColor: style.bg,
          border: `1px solid ${style.border}`
        }}
      >
        <p 
          className="font-['Inter:Medium',sans-serif] font-medium text-[12px]"
          style={{ color: style.text }}
        >
          {style.label}
        </p>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getStatusIcon = (status: OnboardingEmployee['onboardingStatus']) => {
    const iconProps = { width: 16, height: 16 };
    switch(status) {
      case 'not-started':
        return <Clock {...iconProps} color="#6B7280" />;
      case 'in-progress':
        return <Clock {...iconProps} color="#00858A" />;
      case 'completed':
        return <CheckCircle2 {...iconProps} color="#31C6B1" />;
      case 'overdue':
        return <AlertCircle {...iconProps} color="#F04438" />;
    }
  };

  const handleSendReminder = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      alert(`Reminder email telah dikirim ke ${employee.email}`);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#414651] leading-[27px] mb-2">
          Monitoring Pekerja Baru yang Akan Onboarding
        </h3>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#717680] leading-[20px]">
          Pantau progres onboarding karyawan baru untuk memastikan proses berjalan lancar
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ width: '20px', height: '20px', color: '#717680' }} />
          <Input
            placeholder="Cari berdasarkan nama, email, posisi, atau departemen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            style={{
              border: '1px solid #c4c4c4',
              borderRadius: '8px',
              padding: '8px 12px 8px 40px',
              fontSize: '14px',
              fontFamily: "'Inter:Regular',sans-serif"
            }}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {[
            { value: 'all', label: 'Semua Status' },
            { value: 'not-started', label: 'Belum Dimulai' },
            { value: 'in-progress', label: 'Sedang Berjalan' },
            { value: 'completed', label: 'Selesai' },
            { value: 'overdue', label: 'Terlambat' }
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value as any)}
              className="px-3 py-2 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[12px] transition-all whitespace-nowrap"
              style={{
                backgroundColor: filterStatus === filter.value ? '#00858A' : 'white',
                color: filterStatus === filter.value ? 'white' : '#717680',
                border: `1px solid ${filterStatus === filter.value ? '#00858A' : 'var(--border)'}`,
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { 
            label: 'Total Pekerja Baru', 
            value: employees.length.toString(), 
            color: '#00858A',
            icon: <User width={20} height={20} color="#00858A" />
          },
          { 
            label: 'Belum Dimulai', 
            value: employees.filter(e => e.onboardingStatus === 'not-started').length.toString(), 
            color: '#6B7280',
            icon: <Clock width={20} height={20} color="#6B7280" />
          },
          { 
            label: 'Sedang Berjalan', 
            value: employees.filter(e => e.onboardingStatus === 'in-progress').length.toString(), 
            color: '#00858A',
            icon: <Clock width={20} height={20} color="#00858A" />
          },
          { 
            label: 'Selesai', 
            value: employees.filter(e => e.onboardingStatus === 'completed').length.toString(), 
            color: '#31C6B1',
            icon: <CheckCircle2 width={20} height={20} color="#31C6B1" />
          }
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-[12px] p-4 border"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#717680]">
                {stat.label}
              </p>
              {stat.icon}
            </div>
            <p 
              className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px]"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[12px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F8F9FC' }}>
              <tr>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#414651]">
                  NAMA PEKERJA
                </th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#414651]">
                  POSISI
                </th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#414651]">
                  TANGGAL BERGABUNG
                </th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#414651]">
                  PIC ONBOARDING
                </th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#414651]">
                  PROGRESS
                </th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#414651]">
                  STATUS
                </th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#414651]">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#717680]">
                      Tidak ada data yang ditemukan
                    </p>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr 
                    key={employee.id}
                    className="border-t hover:bg-[#F8F9FC] transition-colors"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#414651]">
                          {employee.fullName}
                        </p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#717680]">
                          {employee.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#414651]">
                          {employee.position}
                        </p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#717680]">
                          {employee.department}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Calendar style={{ width: '14px', height: '14px', color: '#717680' }} />
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#414651]">
                          {formatDate(employee.joinDate)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#414651]">
                          {employee.picName}
                        </p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#717680]">
                          {employee.picEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-[#E9EAEB] rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${employee.checklistProgress}%`,
                                backgroundColor: employee.checklistProgress === 100 ? '#31C6B1' : '#00858A'
                              }}
                            />
                          </div>
                          <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#414651] w-10 text-right">
                            {employee.checklistProgress}%
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(employee.onboardingStatus)}
                        {getStatusBadge(employee.onboardingStatus)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewDetails?.(employee.id)}
                          className="p-2 rounded-lg border hover:bg-[rgba(0,133,138,0.05)] transition-colors"
                          style={{ borderColor: 'var(--border)' }}
                          title="Lihat Detail"
                        >
                          <Eye style={{ width: '16px', height: '16px', color: '#00858A' }} />
                        </button>
                        <button
                          onClick={() => handleSendReminder(employee.id)}
                          className="p-2 rounded-lg border hover:bg-[rgba(0,133,138,0.05)] transition-colors"
                          style={{ borderColor: 'var(--border)' }}
                          title="Kirim Reminder"
                        >
                          <Mail style={{ width: '16px', height: '16px', color: '#00858A' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between">
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#717680]">
          Menampilkan {filteredEmployees.length} dari {employees.length} pekerja baru
        </p>
      </div>
    </div>
  );
}
