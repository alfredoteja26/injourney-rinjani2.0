import { EmployeeInfo, CompanyFacility } from './types';

// Mock data - in production this would come from API
export function useNewEmployeeData(userEmail: string) {
  const employeeInfo: EmployeeInfo = {
    position: 'Senior Software Engineer',
    unit: 'Digital Innovation & Technology',
    manager: {
      name: 'Rini Kartika',
      position: 'Engineering Manager',
      email: 'rini.kartika@injourney.id',
    },
    teammates: [
      {
        name: 'Ahmad Zulfikar',
        position: 'Frontend Developer',
        email: 'ahmad.zulfikar@injourney.id',
      },
      {
        name: 'Siti Nurhaliza',
        position: 'Backend Developer',
        email: 'siti.nurhaliza@injourney.id',
      },
      {
        name: 'Budi Santoso',
        position: 'DevOps Engineer',
        email: 'budi.santoso@injourney.id',
      },
      {
        name: 'Maya Indah',
        position: 'UI/UX Designer',
        email: 'maya.indah@injourney.id',
      },
    ]
  };

  const facilities: CompanyFacility[] = [
    // Devices
    {
      id: 'laptop',
      name: 'Laptop Perusahaan',
      description: 'MacBook Pro 14" atau Dell XPS untuk kebutuhan kerja',
      icon: 'laptop',
      category: 'device'
    },
    {
      id: 'mobile',
      name: 'Smartphone',
      description: 'iPhone atau Samsung Galaxy untuk komunikasi bisnis',
      icon: 'laptop',
      category: 'device'
    },
    {
      id: 'accessories',
      name: 'Aksesoris Kerja',
      description: 'Mouse, keyboard, headset, dan monitor tambahan',
      icon: 'laptop',
      category: 'device'
    },
    
    // Benefits
    {
      id: 'health',
      name: 'Asuransi Kesehatan',
      description: 'Coverage lengkap untuk karyawan dan keluarga',
      icon: 'gift',
      category: 'benefit'
    },
    {
      id: 'meal',
      name: 'Tunjangan Makan',
      description: 'Subsidi makan siang dan voucher kantin',
      icon: 'gift',
      category: 'benefit'
    },
    {
      id: 'transport',
      name: 'Tunjangan Transport',
      description: 'Reimbursement atau shuttle karyawan',
      icon: 'gift',
      category: 'benefit'
    },
    {
      id: 'learning',
      name: 'Budget Pembelajaran',
      description: 'Dana untuk kursus, sertifikasi, dan buku',
      icon: 'gift',
      category: 'benefit'
    },
    
    // Access
    {
      id: 'email',
      name: 'Email Perusahaan',
      description: 'Akses ke Microsoft 365 dan email corporate',
      icon: 'key',
      category: 'access'
    },
    {
      id: 'vpn',
      name: 'VPN Access',
      description: 'Akses remote ke sistem internal perusahaan',
      icon: 'key',
      category: 'access'
    },
    {
      id: 'systems',
      name: 'Sistem Internal',
      description: 'HRIS, Project Management, dan tools collaboration',
      icon: 'key',
      category: 'access'
    },
    {
      id: 'building',
      name: 'Akses Gedung',
      description: 'Kartu akses untuk masuk gedung dan ruangan',
      icon: 'key',
      category: 'access'
    },
  ];

  return { employeeInfo, facilities };
}
