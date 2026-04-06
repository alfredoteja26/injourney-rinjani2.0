// Utility untuk manage announcement data di localStorage
import imgTMIINataru from "figma:asset/9b9d42e9c847398a7400713e1c0ab147639d1779.png";
import imgDanantaraPariwisata from "figma:asset/8fe256a21bd8a20c33dba8b9b05f95ea5cd7c5e1.png";
import imgTownhall from "figma:asset/db0e39a5a41035fcf5bfd6a3a6658dd8ec8b07b7.png";
import imgMCU from "figma:asset/651073de38c069297cade0646b6538f28c44da70.png";

export interface Announcement {
  id: string;
  platform: string[];
  title: string;
  description: string;
  iconType?: 'learning' | 'talent' | 'performance' | 'ai' | 'general';
  categoryColor?: 'learning' | 'talent' | 'performance' | 'ai';
  linkAttachment?: string;
  imageUrl?: string;
  timestamp: string;
  status: "active" | "archived";
  createdBy: string;
}

const STORAGE_KEY = "rinjani_announcements";

export const announcementStorage = {
  // Get all announcements
  getAnnouncements(): Announcement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Initialize with defaults if empty
        this.initializeDefaults();
        return this.getAnnouncements();
      }
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading announcements from localStorage:", error);
      return [];
    }
  },

  // Set announcements
  setAnnouncements(announcements: Announcement[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
    } catch (error) {
      console.error("Error saving announcements to localStorage:", error);
    }
  },

  // Get active announcements only
  getActive(): Announcement[] {
    return this.getAnnouncements().filter(a => a.status === "active");
  },

  // Add a new announcement
  add(announcement: Announcement): void {
    const announcements = this.getAnnouncements();
    this.setAnnouncements([announcement, ...announcements]);
  },

  // Update an announcement
  update(id: string, updatedAnnouncement: Announcement): void {
    const announcements = this.getAnnouncements();
    const index = announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      announcements[index] = updatedAnnouncement;
      this.setAnnouncements(announcements);
    }
  },

  // Delete an announcement
  delete(id: string): void {
    const announcements = this.getAnnouncements();
    this.setAnnouncements(announcements.filter(a => a.id !== id));
  },

  // Initialize with default data if empty
  initializeDefaults(): void {
    const defaults: Announcement[] = [
      {
        id: "ann-townhall-2026",
        platform: ["all"],
        title: "InJourney Townhall - 26 Januari 2026",
        description: `Dear Besties,

Saatnya kita kumpul lagi! 
Dalam rangka terus mempererat engagement sekaligus berbagi informasi terbaru mengenai perjalanan kita bersama di InJourney, kami mengundang seluruh Besties untuk hadir pada:

📌 InJourney Townhall
🗓️ Hari/Tanggal: Senin, 26 Januari 2026
⏰ Waktu: 10.00 WIB – selesai
👔 Dresscode : Business Attire 
📍 Tempat: Ruang Rapat Mandalika, Kantor InJourney, Gedung Sarinah Lt. 14

Kehadiran dan partisipasi Besties semua akan bikin acara ini lebih hangat dan bermakna. 🤩

Salam,
HCBP InJourney
"Melayani Sepenuh Hati"`,
        iconType: 'general',
        categoryColor: 'ai',
        imageUrl: imgTownhall,
        timestamp: "2026-01-23T08:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "ann-mcu-2026",
        platform: ["all"],
        title: "Medical Check Up Karyawan InJourney 2026",
        description: `Dear Besties

Sebagai bagian dari komitmen perusahaan dalam membangun Employee Well-Being yang berkelanjutan, kami meyakini bahwa kesehatan karyawan merupakan fondasi utama untuk dapat berkarya secara optimal, produktif, dan seimbang untuk Melayani Sepenuh Hati.

Sehubungan dengan hal tersebut, kami mengundang Besties untuk mengikuti kegiatan Medical Check Up (MCU)  sebagai upaya deteksi dini kondisi kesehatan serta bentuk kepedulian perusahaan terhadap kesejahteraan seluruh karyawan perusahaan.

Adapun pelaksanaan kegiatan MCU akan dilaksanakan pada:

Hari/Tanggal : 24 s.d 31 Januari 2026
Waktu : 07.30 WIB - selesai
Tempat : Klinik Pertamina IHC - Sinabung, Jakarta Selatan
Peserta : Karyawan Tetap, Karyawan Kontrak, Karyawan Talent Mobility
Link Registrasi & Aspirasi Jadwal MCU : https://bit.ly/RegistrasiMCU-INJ 
Guideline Pelaksanaan MCU : https://bit.ly/GuidelineMCU-INJ 

Melalui pelaksanaan MCU ini, diharapkan setiap karyawan dapat lebih mengenali kondisi kesehatannya, sehingga mampu menjaga kualitas hidup, performa kerja, dan keseimbangan antara pekerjaan dan kehidupan pribadi secara lebih baik.😊

Demikian disampaikan, atas perhatiannya diucapkan terima kasih.

Salam sehat,
HCBP InJourney
"Melayani Sepenuh Hati"`,
        iconType: 'general',
        categoryColor: 'performance',
        imageUrl: imgMCU,
        linkAttachment: "https://bit.ly/RegistrasiMCU-INJ",
        timestamp: "2026-01-22T09:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "1",
        platform: ["all"],
        title: "Momen Penuh Makna NATARU 2025-2026 di TMII",
        description: "Rayakan perayaan akhir tahun dengan berbagai kegiatan menarik di Taman Mini Indonesia Indah. Nikmati momen penuh makna bersama keluarga dengan beragam wahana, kuliner, dan pertunjukan seni budaya yang memukau.",
        iconType: 'general',
        categoryColor: 'ai',
        imageUrl: imgTMIINataru,
        timestamp: "2026-01-21T09:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "2",
        platform: ["all"],
        title: "Melihat Potensi Sektor Pariwisata Sebagai Penggerak Ekonomi di 2026",
        description: "Sektor pariwisata Indonesia diprediksi akan menjadi salah satu motor penggerak ekonomi nasional di tahun 2026. Dengan kekayaan budaya dan keindahan alam yang luar biasa, Indonesia siap menyambut lebih banyak wisatawan domestik dan mancanegara.",
        iconType: 'performance',
        categoryColor: 'performance',
        imageUrl: imgDanantaraPariwisata,
        timestamp: "2026-01-20T14:30:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "3",
        platform: ["all"],
        title: "Program Pelatihan Leadership untuk Manager 2026",
        description: "Kami mengundang semua manager untuk mengikuti program pelatihan leadership yang akan diadakan bulan depan. Program ini dirancang untuk meningkatkan kemampuan kepemimpinan dan manajemen tim.",
        iconType: 'learning',
        categoryColor: 'learning',
        imageUrl: "https://images.unsplash.com/photo-1765438863789-1396d28db24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwdHJhaW5pbmclMjBidXNpbmVzc3xlbnwxfHx8fDE3Njg5OTI4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-19T10:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "4",
        platform: ["all"],
        title: "Update Sistem HRIS - Fitur Baru Tersedia",
        description: "Sistem HRIS kami telah diperbarui dengan fitur-fitur baru yang memudahkan pengelolaan data karyawan, absensi, dan penggajian. Silakan login untuk melihat perubahan terbaru.",
        iconType: 'general',
        imageUrl: "https://images.unsplash.com/photo-1758780690553-8bc703fabca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwdXBkYXRlfGVufDF8fHx8MTc2ODk5MzIxMnww&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-18T15:45:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "5",
        platform: ["all"],
        title: "Pengumuman Libur Nasional Februari 2026",
        description: "Berikut adalah jadwal libur nasional untuk bulan Februari 2026. Harap merencanakan pekerjaan Anda dengan baik di sekitar tanggal-tanggal tersebut.",
        iconType: 'general',
        imageUrl: "https://images.unsplash.com/photo-1768508950520-541f4a08758d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFubm91bmNlbWVudHxlbnwxfHx8fDE3Njg5NTgzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-17T09:30:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "6",
        platform: ["all"],
        title: "Talent Review Q1 2026 - Jadwal dan Prosedur",
        description: "Proses talent review untuk Q1 2026 akan dimulai minggu depan. Semua manager diharapkan untuk menyiapkan evaluasi kinerja tim masing-masing.",
        iconType: 'talent',
        categoryColor: 'talent',
        imageUrl: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtZWV0aW5nfGVufDF8fHx8MTc2ODk1NDg4OXww&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-16T11:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "7",
        platform: ["all"],
        title: "Workshop Digital Marketing Strategy",
        description: "Bergabunglah dengan workshop digital marketing strategy yang akan membahas tren terbaru dan best practices dalam pemasaran digital untuk meningkatkan brand awareness perusahaan.",
        iconType: 'learning',
        categoryColor: 'learning',
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0cmFpbmluZ3xlbnwxfHx8fDE3Njg5Njc4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-15T13:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "8",
        platform: ["all"],
        title: "Implementasi AI dalam Proses Bisnis",
        description: "Kami dengan bangga mengumumkan implementasi solusi AI untuk mengoptimalkan berbagai proses bisnis. Teknologi ini akan membantu meningkatkan efisiensi operasional.",
        iconType: 'ai',
        categoryColor: 'ai',
        imageUrl: "https://images.unsplash.com/photo-1744640326166-433469d102f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzY4OTkyODU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-14T10:30:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "9",
        platform: ["all"],
        title: "Performance Review Guidelines 2026",
        description: "Panduan lengkap untuk performance review tahun 2026 telah tersedia. Silakan review dokumen ini untuk memahami kriteria penilaian dan timeline yang berlaku.",
        iconType: 'performance',
        categoryColor: 'performance',
        imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmb3JtYW5jZSUyMHJldmlld3xlbnwxfHx8fDE3Njg5OTI4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-13T14:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "10",
        platform: ["all"],
        title: "Program Employee Wellness - Yoga dan Meditasi",
        description: "Daftarkan diri Anda untuk program wellness mingguan kami yang mencakup sesi yoga dan meditasi. Program ini gratis untuk semua karyawan.",
        iconType: 'general',
        imageUrl: "https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc2ODk0NDM5NXww&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-12T09:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "11",
        platform: ["all"],
        title: "Recruitment Drive - Posisi Terbuka Maret 2026",
        description: "Kami membuka berbagai posisi baru untuk bulan Maret 2026. Referral dari karyawan sangat dihargai dan akan mendapatkan bonus referral.",
        iconType: 'talent',
        categoryColor: 'talent',
        imageUrl: "https://images.unsplash.com/photo-1765020553552-6286dde23660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0bWVudCUyMGhpcmluZyUyMHRlYW18ZW58MXx8fHwxNzY4OTA3NTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-11T16:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "12",
        platform: ["all"],
        title: "Update Kebijakan Work From Home",
        description: "Kebijakan work from home telah diperbarui untuk memberikan fleksibilitas lebih kepada karyawan. Silakan baca dokumen kebijakan terbaru di portal HR.",
        iconType: 'general',
        imageUrl: "https://images.unsplash.com/photo-1586991359975-54500b7d8a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrJTIwZnJvbSUyMGhvbWV8ZW58MXx8fHwxNzY4OTkyODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-10T10:15:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "13",
        platform: ["all"],
        title: "Webinar: Effective Communication in Remote Teams",
        description: "Ikuti webinar tentang komunikasi efektif dalam tim remote. Sesi ini akan membahas tools dan teknik untuk meningkatkan kolaborasi tim virtual.",
        iconType: 'learning',
        categoryColor: 'learning',
        imageUrl: "https://images.unsplash.com/photo-1762784574791-ded574c44c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJpbmFyJTIwb25saW5lJTIwbWVldGluZ3xlbnwxfHx8fDE3Njg5NzgzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-09T13:30:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "14",
        platform: ["all"],
        title: "Town Hall Meeting - Strategic Planning 2026",
        description: "CEO akan memimpin town hall meeting untuk membahas strategic planning dan roadmap perusahaan untuk tahun 2026. Kehadiran semua karyawan sangat diharapkan.",
        iconType: 'general',
        imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3duJTIwaGFsbCUyMG1lZXRpbmd8ZW58MXx8fHwxNzY4OTkxODU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-08T15:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      },
      {
        id: "15",
        platform: ["all"],
        title: "Perayaan Company Culture Day 2026",
        description: "Mari rayakan Company Culture Day dengan berbagai kegiatan seru, kompetisi, dan hadiah menarik. Event ini bertujuan untuk mempererat hubungan antar karyawan.",
        iconType: 'general',
        imageUrl: "https://images.unsplash.com/photo-1628336707631-68131ca720c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY4OTkzMjEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "2026-01-07T08:00:00.000Z",
        status: "active",
        createdBy: "admin@danantara.com"
      }
    ];
    this.setAnnouncements(defaults);
  }
};