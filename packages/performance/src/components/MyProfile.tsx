import React, { useState } from "react";
import svgPaths from "../imports/svg-ld8dbgk7od";
import clsx from "clsx";
import { Lock, FileText, Pencil, Info, RefreshCw, Clock, Plus, CheckCircle, ArrowRight, AlertCircle, User, GraduationCap, BookOpen, Briefcase, FileCheck, Award, TrendingUp, Trophy, Heart, Target, Star, CreditCard, Users } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { DataEditModal, DataRequestModal } from "./DataChangeModals";
import { toast } from "sonner@2.0.3";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { NineBoxGrid } from "./NineBoxGrid";
import ProfileInfoCard from "./ProfileInfoCard";

import { MOCK_DATA } from "../lib/mock-data";

const MOCK_COMPETENCIES = [
  { subject: 'Problem Solving', A: 4.5, fullMark: 5 },
  { subject: 'Leadership', A: 3.8, fullMark: 5 },
  { subject: 'Communication', A: 4.2, fullMark: 5 },
  { subject: 'Teamwork', A: 4.8, fullMark: 5 },
  { subject: 'Adaptability', A: 3.5, fullMark: 5 },
  { subject: 'Technical', A: 4.0, fullMark: 5 },
];

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};

const getAddress = (type: string) => {
  const addr = MOCK_DATA.employee_address.find(a => a.address_type === type);
  if (!addr) return "-";
  return `${addr.street_address}, ${addr.district}, ${addr.city}, ${addr.province} ${addr.postal_code}`;
};

const getEmergencyContact = () => {
  return MOCK_DATA.employee_family_member.find(m => m.relationship_type === "emergency_contact") || {
    full_name: "-",
    relationship_type: "-",
    contact: { mobile_phone: "-" }
  };
};

// Wrapper components
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={clsx("size-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">{children}</div>
    </div>
  );
}

type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("relative shrink-0 size-[24px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("relative shrink-0 size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-muted/5 h-[48px] relative rounded-[6px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-border border-[1.5px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TextFieldDisableText({ text }: { text: string }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[2px] relative size-full">
      <div className="basis-0 flex flex-col font-['Inter'] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-foreground text-[14px]">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

function Update() {
  return (
    <Wrapper1>
      <g id="update">
        <path d={svgPaths.p375b8500} fill="var(--primary)" id="Vector" />
      </g>
    </Wrapper1>
  );
}

type TagTextProps = {
  text: string;
};

function TagText({ text }: TagTextProps) {
  return (
    <div className="bg-destructive/10 relative rounded-[4px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[inherit]">
        <p className="font-['Inter'] font-medium leading-[16px] not-italic relative shrink-0 text-destructive-foreground text-[12px] text-nowrap">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-destructive/20 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

// --- HELPER COMPONENTS ---

type InfoGroupProps = {
  label: string;
  value: string | number;
  helperText?: string;
  onEdit?: () => void;
  className?: string;
  tier?: 1 | 2 | 3 | 4;
  status?: 'pending' | 'approved' | 'rejected';
};

function InfoGroup({ label, value, helperText, onEdit, className = "", tier = 1, status }: InfoGroupProps) {
  const showEdit = tier === 3 && onEdit && !status;
  const showRequest = tier === 2 && onEdit && !status;

  return (
    <div className={clsx("content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full", className)}>
      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full min-h-[24px]">
        <div className="content-stretch flex items-center gap-2 relative shrink-0">
          <div className="flex flex-col font-['Inter'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-muted-foreground text-nowrap">
            <p className="leading-[20px]">{label}</p>
          </div>
          {status === 'pending' && (
             <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-[4px] text-[10px] font-medium border border-yellow-200">
               <Clock size={10} />
               <span>Pending Review</span>
             </div>
          )}
          {!status && tier === 1 && (
            <div className="group relative flex items-center justify-center cursor-help">
               <Lock size={12} className="text-muted-foreground/70" />
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-md border border-border whitespace-nowrap z-50">
                 Data disinkronkan dari Data Warehouse InJourney
               </div>
            </div>
          )}
          {!status && tier === 4 && (
             <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-[4px] text-[10px] font-medium border border-purple-200">
               <Info size={10} />
               <span>Insight</span>
             </div>
          )}
        </div>
        
        {showEdit && (
            <div onClick={onEdit} className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
              <Pencil size={12} className="text-primary" />
              <p className="font-['Inter'] font-medium text-primary text-[12px] leading-[20px]">Ubah</p>
            </div>
        )}
        {showRequest && (
            <div onClick={onEdit} className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
              <FileText size={12} className="text-primary" />
              <p className="font-['Inter'] font-medium text-primary text-[12px] leading-[20px]">Ajukan Perubahan</p>
            </div>
        )}
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <TextFieldDisableText text={String(value || "-")} />
      </div>
      {helperText && (
        <div className="flex flex-col font-['Inter'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-muted-foreground text-[14px] w-full">
          <p className="leading-[20px]">{helperText}</p>
        </div>
      )}
    </div>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-[4px] w-full mb-4">
      <p className="font-['Inter'] font-semibold leading-[24px] text-primary text-[18px]">{title}</p>
      {subtitle && <p className="font-['Inter'] font-normal leading-[20px] text-muted-foreground text-[14px]">{subtitle}</p>}
    </div>
  );
}

function ItemCard({ children, title, subtitle, date, onEdit, tier }: { children?: React.ReactNode; title: string; subtitle?: string; date?: string; onEdit?: () => void; tier?: 1 | 2 | 3 | 4 }) {
  return (
    <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border overflow-hidden">
      <Wrapper3>
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <p className="font-['Inter'] font-semibold text-foreground text-[16px] leading-[24px]">{title}</p>
                {tier === 1 && <Lock size={12} className="text-muted-foreground/70" />}
                {tier === 2 && <FileText size={12} className="text-muted-foreground/70" />}
                {tier === 4 && <Info size={12} className="text-muted-foreground/70" />}
            </div>
            {subtitle && <p className="font-['Inter'] text-muted-foreground text-[14px] leading-[20px]">{subtitle}</p>}
          </div>
          <div className="flex flex-col items-end gap-2">
              {date && <p className="font-['Inter'] font-medium text-primary text-[12px] bg-primary/10 px-2 py-1 rounded-full">{date}</p>}
              {onEdit && (
                  <button onClick={onEdit} className="text-primary text-xs font-medium hover:underline flex items-center gap-1">
                      {tier === 2 ? <><FileText size={10} /> Ajukan Perubahan</> : <><Pencil size={10} /> Ubah</>}
                  </button>
              )}
          </div>
        </div>
        {children && <div className="mt-4 w-full flex flex-col gap-4">{children}</div>}
      </Wrapper3>
    </div>
  );
}

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  hasTag?: boolean;
  onClick: () => void;
};

function SidebarItem({ icon, label, isActive, hasTag, onClick }: SidebarItemProps) {
  const bgClass = isActive ? "bg-primary/5" : "";
  const borderClass = isActive ? "border-primary" : "border-transparent";
  const textColor = isActive ? "text-primary" : "text-foreground";
  
  return (
    <div 
      className={`${bgClass} h-[40px] relative rounded-[8px] shrink-0 w-full cursor-pointer hover:bg-muted transition-colors`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
          {icon}
          <p className={`basis-0 font-['Inter'] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 ${textColor} text-[12px]`}>
            {label}
          </p>
          {hasTag && <TagText text="Required" />}
        </div>
      </div>
      <div aria-hidden="true" className={`absolute border ${borderClass} border-solid inset-0 pointer-events-none rounded-[8px]`} />
    </div>
  );
}

interface MyProfileProps {
  onBack: () => void;
  userRole?: "Admin" | "User";
  userEmail?: string;
  onLogout?: () => void;
}

export default function MyProfile({ onBack, userRole = "Admin", userEmail = "dimas@injourney.co.id", onLogout }: MyProfileProps) {
  const userName = userEmail === "binavia@injourney.co.id" ? "Binavia Wardhani" : "Dimas Sayyid";
  const userNIK = userEmail === "binavia@injourney.co.id" ? "26010002" : "26010001";
  const jobTitle = userEmail === "binavia@injourney.co.id" ? "Group Head Human Capital Strategy" : "VP Human Capital Strategy";
  const workUnit = "Direktorat Human Capital";
  const directSupervisor = userEmail === "binavia@injourney.co.id" ? "Dimas Sayyid" : "Herdy Harman";
  const supervisorTitle = userEmail === "binavia@injourney.co.id" ? "VP Human Capital Strategy" : "Director of HR and Digital";
  
  // Extract first name from full name for name alias
  const firstName = userName.split(" ")[0];
  
  const [activeSection, setActiveSection] = useState<string | "data-pribadi" | "pendidikan" | "pembelajaran" | "riwayat-pekerjaan" | "informasi-kepegawaian" | "kualifikasi" | "insights" | "kontribusi" | "hobi-keahlian" | "minat" | "penghargaan" | "employee-info" | "status-keluarga">("data-pribadi");
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [changesReviewed, setChangesReviewed] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [syncResultModalOpen, setSyncResultModalOpen] = useState(false);
  const [syncResults, setSyncResults] = useState<any[]>([]);
  const [selectedChangeIds, setSelectedChangeIds] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState("24 Des 2025, 10:30");
  const [editingField, setEditingField] = useState<{label: string, value: string, tier: number} | null>(null);
  const [addDataType, setAddDataType] = useState<{type: string, tier: number} | null>(null);

  const handleEditClick = (label: string, value: string | number, tier: number) => {
    setEditingField({ label, value: String(value), tier });
    if (tier === 3) {
      setEditModalOpen(true);
    } else if (tier === 2) {
      setRequestModalOpen(true);
    }
  };

  const handleAddData = (type: string, tier: number) => {
    setAddDataType({ type, tier });
    setEditingField(null);
    if (tier === 3) {
      setEditModalOpen(true);
    } else if (tier === 2) {
      setRequestModalOpen(true);
    }
  };

  const handleSaveEdit = () => {
    const itemName = editingField?.label || addDataType?.type;
    toast.success(`Data "${itemName}" berhasil diperbarui!`);
    setEditModalOpen(false);
    setEditingField(null);
    setAddDataType(null);
  };

  const handleSubmitRequest = () => {
    const itemName = editingField?.label || addDataType?.type;
    toast.success(`Permintaan perubahan "${itemName}" telah diajukan dan menunggu persetujuan admin.`);
    setRequestModalOpen(false);
    setEditingField(null);
    setAddDataType(null);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date().toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
      setLastSyncTime(now);
      
      // Comprehensive list of Tier 1 data fields
      const results = [
        {
          id: "cat_personal",
          category: "Data Pribadi",
          status: "changed",
          fields: [
            { name: "Nama Lengkap", status: "match", value: "RICHARD PAUL" },
            { name: "Tempat Lahir", status: "match", value: "Jakarta" },
            { name: "Tanggal Lahir", status: "match", value: "24 Mei 1980" },
            { name: "Agama", status: "match", value: "Islam" },
            { name: "Jenis Kelamin", status: "match", value: "Laki-laki" },
            { name: "NIK", status: "match", value: "1234567890123456" },
            { name: "NPWP", status: "match", value: "12.345.678.9-012.345" },
            { name: "Email Korporat", status: "match", value: "richard.paul@injourney.id" },
            { 
              name: "Alamat (KTP)", 
              status: "changed", 
              oldValue: "Jl. Merdeka No. 10, Jakarta Pusat", 
              newValue: "Jl. Yos Sudarso No.9, RT.6/RW.13, Rawabadak Utara, Kec. Koja, Jkt Utara, DKI Jakarta 14230" 
            },
            { name: "Alamat (Tetap)", status: "match", value: "Jl. Yos Sudarso No.9, Jakarta Utara" },
          ]
        },
        {
          id: "cat_employment",
          category: "Informasi Kepegawaian",
          status: "unchanged",
          fields: [
            { name: "Perusahaan", status: "match", value: "PT Aviasi Pariwisata Indonesia (Persero)" },
            { name: "Unit Organisasi", status: "match", value: "Human Capital Division" },
            { name: "Posisi", status: "match", value: "Head of Human Capital" },
            { name: "Job Family", status: "match", value: "JF-HC-01" },
            { name: "Grade", status: "match", value: "15" },
            { name: "Cost Center", status: "match", value: "CC-100293" },
          ]
        },
        {
          id: "cat_contract",
          category: "Informasi Kontrak",
          status: "unchanged",
          fields: [
             { name: "Nomor Kontrak", status: "match", value: "KONTRAK/2023/001" },
             { name: "Tipe Kontrak", status: "match", value: "PKWTT" },
             { name: "Mulai Kontrak", status: "match", value: "01 Januari 2023" },
             { name: "Status", status: "match", value: "Aktif" },
          ]
        }
      ];
      setSyncResults(results);
      
      // Auto-select changed categories
      const changedIds = results.filter(r => r.status === 'changed').map(r => r.id);
      setSelectedChangeIds(changedIds);

      setSyncResultModalOpen(true);
    }, 2000);
  };

  const handleToggleChange = (id: string) => {
    setSelectedChangeIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSaveSync = () => {
    const appliedCount = selectedChangeIds.length;
    toast.success(`${appliedCount} data berhasil diperbarui.`);
    setSyncResultModalOpen(false);
  };

  const handleDownloadCV = () => {
    const cvContent = `CURRICULUM VITAE - ${userName}`;
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${userName.replace(/ /g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    switch (activeSection) {
      // 1. DATA PRIBADI
      case "data-pribadi":
        const emergencyContact = getEmergencyContact();
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <Wrapper3>
              <div className="bg-blue-50 relative rounded-[6px] shrink-0 w-full mb-4">
                <div className="size-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                      <Wrapper2>
                        <g id="new-releases">
                          <path d={svgPaths.p591c6c0} fill="var(--primary)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px not-italic relative shrink-0">
                        <p className="font-['Inter'] font-semibold leading-[24px] relative shrink-0 text-primary text-[16px] w-full">Mohon Perhatian</p>
                        <p className="font-['Inter'] font-normal leading-[20px] relative shrink-0 text-foreground text-[14px] w-full">Agar upload evidence terlebih dahulu, baru merubah data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full">
                <InfoGroup label="Nama Lengkap" value={userName} tier={1} onEdit={() => handleEditClick("Nama Lengkap", userName, 1)} helperText="*Sesuai KTP Huruf Kapital" />
                <InfoGroup label="Nama Depan" value={firstName} tier={3} onEdit={() => handleEditClick("Nama Depan", firstName, 3)} />

                <div className="grid grid-cols-2 gap-4 w-full">
                  <InfoGroup label="Tempat Lahir" value={MOCK_DATA.employee_identification.birth_place} tier={1} />
                  <InfoGroup label="Tanggal Lahir" value={formatDate(MOCK_DATA.employee_identification.dt_birth)} tier={1} />
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <InfoGroup label="Agama" value={MOCK_DATA.employee_identification.religion} tier={1} />
                  <InfoGroup label="Jenis Kelamin" value={MOCK_DATA.employee_identification.gender === 'unknown' ? 'Tidak Diketahui' : MOCK_DATA.employee_identification.gender} tier={1} />
                </div>

                <InfoGroup label="No Handphone" value={MOCK_DATA.employee_identification.mobile_phone} tier={1} />
                <InfoGroup label="NIK" value={MOCK_DATA.employee_identification.id_nik} tier={1} helperText="*Diisi dengan 16 digit angka" />
                <InfoGroup label="NPWP" value={MOCK_DATA.employee_identification.id_npwp} tier={1} helperText="*Diisi dengan 16 digit angka" />
                <InfoGroup label="Email Korporat" value={MOCK_DATA.employee_profile.corporate_email} tier={1} />
                <InfoGroup label="Alamat (KTP)" value={getAddress('alamat_ktp')} tier={1} />
                <InfoGroup label="Alamat (Tetap)" value={getAddress('alamat_tetap')} tier={1} />

                <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border mt-4">
                  <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap mb-4">
                      <p className="leading-[24px]">Kontak Darurat</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <InfoGroup label="Nama" value={emergencyContact.full_name} tier={3} onEdit={() => handleEditClick("Nama Kontak Darurat", emergencyContact.full_name, 3)} />
                      <InfoGroup label="Hubungan" value={emergencyContact.relationship_type} tier={3} onEdit={() => handleEditClick("Hubungan Kontak Darurat", emergencyContact.relationship_type, 3)} />
                    </div>
                    <div className="mt-4">
                      <InfoGroup label="No. Handphone" value={emergencyContact.contact.mobile_phone} tier={3} onEdit={() => handleEditClick("No HP Kontak Darurat", emergencyContact.contact.mobile_phone, 3)} />
                    </div>
                  </Wrapper3>
                </div>
              </div>
            </Wrapper3>
          </div>
        );

      // 2. PENDIDIKAN
      case "pendidikan":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <SectionHeader title="Riwayat Pendidikan Formal" subtitle="Daftar riwayat pendidikan formal anda" />
            {MOCK_DATA.employee_education_history
              .sort((a, b) => new Date(b.dt_end).getTime() - new Date(a.dt_end).getTime())
              .map(edu => (
              <ItemCard 
                key={edu.id_education_history} 
                title={edu.institution_name} 
                subtitle={`${edu.education_level_code.toUpperCase()} ${edu.major ? `- ${edu.major}` : ''}`}
                date={`${formatDate(edu.dt_start)} - ${formatDate(edu.dt_end)}`}
                tier={1}
              >
                 <div className="grid grid-cols-2 gap-4">
                   <InfoGroup label="Nilai Akhir" value={edu.final_score} tier={1} />
                   <InfoGroup label="No. Ijazah" value={edu.certificate_number} tier={1} />
                   <InfoGroup label="Konsentrasi" value={edu.concentration || '-'} tier={1} />
                   {edu.achievement_notes && <InfoGroup label="Catatan Prestasi" value={edu.achievement_notes} className="col-span-2" tier={1} />}
                 </div>
              </ItemCard>
            ))}
          </div>
        );

      // 3. PEMBELAJARAN
      case "pembelajaran":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <SectionHeader title="Riwayat Pelatihan" subtitle="Daftar pelatihan yang telah diselesaikan" />
            {MOCK_DATA.learning_history.filter(l => l.learning_type === 'training').map(learn => (
               <ItemCard key={learn.id_learning} title={learn.learning_name} subtitle={learn.provider} date={formatDate(learn.dt_completion)} tier={1}>
                  <div className="grid grid-cols-2 gap-4">
                     <InfoGroup label="Jam Pembelajaran" value={`${learn.learning_hours} jam`} tier={1} />
                     <InfoGroup label="Score" value={learn.score} tier={1} />
                     <InfoGroup label="Mandatory" value={learn.is_mandatory ? 'Wajib' : 'Pilihan'} tier={1} />
                  </div>
               </ItemCard>
            ))}
            {MOCK_DATA.learning_history.filter(l => l.learning_type === 'training').length === 0 && (
               <p className="text-muted-foreground italic">Tidak ada data pelatihan.</p>
            )}
          </div>
        );

      // 4. RIWAYAT PEKERJAAN
      case "riwayat-pekerjaan":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <SectionHeader title="Riwayat Jabatan" />
            {MOCK_DATA.employee_position_history
              .sort((a, b) => new Date(b.dt_position_start).getTime() - new Date(a.dt_position_start).getTime())
              .map(pos => (
                <ItemCard 
                  key={pos.id_position_history} 
                  title={pos.position_name} 
                  subtitle={`${pos.org_unit_name} - ${pos.company_name}`}
                  date={`${formatDate(pos.dt_position_start)} - ${pos.dt_position_end ? formatDate(pos.dt_position_end) : 'Sekarang'}`}
                  tier={1}
                >
                   <div className="grid grid-cols-2 gap-4">
                      <InfoGroup label="Job Class" value={pos.job_class} tier={1} />
                      <InfoGroup label="No. SK Penugasan" value={pos.assignment_letter_number} tier={1} />
                      <InfoGroup label="Tanggal SK" value={formatDate(pos.dt_assignment_letter)} tier={1} />
                   </div>
                </ItemCard>
            ))}
            <div className="border-t border-border my-2"></div>
            <SectionHeader title="Penugasan Sekunder (Temporary/Ad-hoc)" />
            {MOCK_DATA.employee_secondary_assignment.map(sec => (
               <ItemCard 
                  key={sec.id_secondary_assignment} 
                  title={sec.position_name}
                  subtitle={`${sec.org_unit_name} - ${sec.company_name}`}
                  date={`${formatDate(sec.dt_assignment_start)} - ${formatDate(sec.dt_assignment_end)}`}
                  tier={1}
               >
                  <div className="grid grid-cols-2 gap-4">
                      <InfoGroup label="Job Class" value={sec.job_class} tier={1} />
                      <InfoGroup label="No. Surat Perintah" value={sec.assignment_letter_number} tier={1} />
                      <InfoGroup label="Tipe Penugasan" value={sec.secondary_assignment_type === 'job_assignment' ? 'Penugasan Jabatan' : sec.secondary_assignment_type} tier={1} />
                  </div>
               </ItemCard>
            ))}
          </div>
        );

      // 5. INFORMASI KEPEGAWAIAN
      case "informasi-kepegawaian":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <SectionHeader title="Informasi Posisi Saat Ini" />
            <Wrapper3>
              <div className="grid grid-cols-2 gap-6 w-full">
                 <InfoGroup label="Perusahaan" value={MOCK_DATA.company.company_name} tier={1} />
                 <InfoGroup label="Unit Organisasi" value={MOCK_DATA.org_unit.org_unit_name} tier={1} />
                 <InfoGroup label="Posisi (Master)" value={MOCK_DATA.position_master.position_master_name} tier={1} />
                 <InfoGroup label="Posisi (Variant)" value={MOCK_DATA.position_variant.position_variant_name} tier={1} />
                 <InfoGroup label="Job Family" value={MOCK_DATA.position_master.id_job_family} tier={1} />
                 <InfoGroup label="Grade" value={MOCK_DATA.position_master.id_grade} tier={1} />
                 <InfoGroup label="Cost Center" value={MOCK_DATA.org_unit.cost_center} tier={1} />
              </div>
            </Wrapper3>
            <div className="border-t border-border my-2"></div>
            <SectionHeader title="Informasi Kontrak" />
            <Wrapper3>
              <div className="grid grid-cols-2 gap-6 w-full">
                 <InfoGroup label="Nomor Kontrak" value={MOCK_DATA.employee_contract.contract_number} tier={1} />
                 <InfoGroup label="Tipe Kontrak" value={MOCK_DATA.employee_contract.contract_type.toUpperCase()} tier={1} />
                 <InfoGroup label="Mulai Kontrak" value={formatDate(MOCK_DATA.employee_contract.dt_contract_start)} tier={1} />
                 <InfoGroup label="Status" value={MOCK_DATA.employee_contract.contract_status === 'active' ? 'Aktif' : 'Tidak Aktif'} tier={1} />
              </div>
            </Wrapper3>
          </div>
        );

      // 6. KUALIFIKASI
      case "kualifikasi":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
             <SectionHeader title="Sertifikasi Profesional" />
             <button className="flex items-center gap-2 text-primary font-medium text-sm w-fit hover:underline" onClick={() => handleAddData("Sertifikasi", 2)}>
                <Plus size={16} />
                Tambah Sertifikasi
             </button>
             {MOCK_DATA.learning_history.filter(l => l.learning_type === 'certification').map(learn => (
               <ItemCard 
                 key={learn.id_learning} 
                 title={learn.learning_name} 
                 subtitle={learn.provider} 
                 date={formatDate(learn.dt_completion)}
                 tier={2}
                 onEdit={() => handleAddData(`Edit Sertifikasi - ${learn.learning_name}`, 2)}
               >
                  <div className="grid grid-cols-2 gap-4">
                     <InfoGroup label="Berlaku Hingga" value={formatDate(learn.dt_expiry || '')} tier={2} />
                     <InfoGroup label="Score" value={learn.score} tier={2} />
                  </div>
               </ItemCard>
             ))}
             {MOCK_DATA.learning_history.filter(l => l.learning_type === 'certification').length === 0 && (
                <p className="text-muted-foreground italic">Tidak ada data sertifikasi.</p>
             )}
             
             <div className="border-t border-border my-2"></div>

             <SectionHeader title="Kemampuan Bahasa" />
             <button className="flex items-center gap-2 text-primary font-medium text-sm w-fit hover:underline" onClick={() => handleAddData("Kemampuan Bahasa", 2)}>
                <Plus size={16} />
                Tambah Bahasa
             </button>
             {MOCK_DATA.employee_language_skill.map(lang => (
               <ItemCard 
                 key={lang.language_name} 
                 title={lang.language_name}
                 tier={2}
                 onEdit={() => handleAddData(`Edit Bahasa - ${lang.language_name}`, 2)}
               >
                  <div className="grid grid-cols-2 gap-4">
                     <InfoGroup label="Mendengar" value={lang.listening_level} tier={2} />
                     <InfoGroup label="Membaca" value={lang.reading_level} tier={2} />
                     <InfoGroup label="Berbicara" value={lang.speaking_level} tier={2} />
                     <InfoGroup label="Menulis" value={lang.writing_level} tier={2} />
                     {lang.certificate_level && <InfoGroup label="Sertifikat" value={lang.certificate_level} tier={2} />}
                  </div>
               </ItemCard>
             ))}

             <div className="border-t border-border my-2"></div>
             
             <SectionHeader title="Kompetensi" />
             <div className="w-full bg-card rounded-[8px] border border-border p-4 mb-4 flex flex-col items-center">
                <p className="text-sm font-medium text-foreground mb-4">Peta Kompetensi (Skala 1-5)</p>
                <div className="h-[300px] w-full max-w-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_COMPETENCIES}>
                      <PolarGrid stroke="var(--border)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} />
                      <Radar
                        name="Kompetensi"
                        dataKey="A"
                        stroke="var(--primary)"
                        fill="var(--primary)"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {MOCK_DATA.competency_assessment.map((comp, idx) => (
               <ItemCard key={idx} title={`Assessment ${comp.assessment_period.toUpperCase()}`} date={formatDate(comp.dt_assessment)} tier={4}>
                  <div className="grid grid-cols-2 gap-4">
                     <InfoGroup label="Job Fit Score" value={comp.job_fit_score} tier={4} />
                     <InfoGroup label="Gap Kompetensi" value={comp.competency_gap} tier={4} />
                     <InfoGroup label="Metode" value={comp.assessment_method === 'self' ? 'Self Assessment' : 'Manager Assessment'} tier={4} />
                  </div>
               </ItemCard>
             ))}
          </div>
        );

      // 7. INSIGHTS
      case "insights":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <SectionHeader title="Riwayat Kinerja (Tahunan)" />
            {MOCK_DATA.employee_performance_history
              .sort((a, b) => b.period_year - a.period_year)
              .map(perf => (
                <ItemCard key={perf.id_performance_history} title={`Tahun ${perf.period_year}`} date={formatDate(perf.dt_assessment)} tier={1}>
                   <div className="grid grid-cols-2 gap-4">
                      <InfoGroup label="Score" value={perf.performance_score} tier={1} />
                      <InfoGroup label="Rating" value={perf.performance_rating.toUpperCase()} tier={1} />
                      <InfoGroup label="% Pencapaian KPI" value={`${perf.pct_kpi_achievement}%`} tier={1} />
                   </div>
                </ItemCard>
            ))}

            <div className="border-t border-border my-2"></div>
            
            <div className="grid grid-cols-2 gap-6">
               <div className="flex flex-col">
                  <SectionHeader title="Nine Box Grid" />
                  <div className="bg-card rounded-[8px] border border-border p-4 h-full">
                     <NineBoxGrid 
                       performanceScore={MOCK_DATA.nine_box_classification.performance_axis_score} 
                       capacityScore={MOCK_DATA.nine_box_classification.capacity_axis_score} 
                     />
                  </div>
               </div>
               <div>
                  <SectionHeader title="Talent Pool" />
                  <ItemCard title={`Rank: ${MOCK_DATA.talent_pool.ranking}`} subtitle={MOCK_DATA.talent_pool.pool_status.toUpperCase()} tier={4}>
                     <div className="grid grid-cols-1 gap-2">
                        <InfoGroup label="Top Talent" value={MOCK_DATA.talent_pool.is_top_talent ? "Yes" : "No"} tier={4} />
                        <InfoGroup label="Tanggal Masuk" value={formatDate(MOCK_DATA.talent_pool.dt_entry)} tier={4} />
                     </div>
                  </ItemCard>
               </div>
            </div>

            <SectionHeader title="EQS Score" subtitle={`Periode: ${MOCK_DATA.eqs_score.period}`} />
            <Wrapper3>
               <div className="w-full flex items-center justify-between mb-4">
                  <p className="font-bold text-2xl text-primary">{MOCK_DATA.eqs_score.eqs_score}</p>
                  <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-[4px] text-[10px] font-medium border border-purple-200">
                    <Info size={10} />
                    <span>Insight</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Score</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <InfoGroup label="Kinerja Component" value={`${MOCK_DATA.eqs_score.pct_kinerja_component}%`} tier={4} />
                  <InfoGroup label="Kompetensi Component" value={`${MOCK_DATA.eqs_score.pct_kompetensi_component}%`} tier={4} />
                  <InfoGroup label="Pengalaman Component" value={`${MOCK_DATA.eqs_score.pct_pengalaman_component}%`} tier={4} />
                  <InfoGroup label="Aspirasi Component" value={`${MOCK_DATA.eqs_score.pct_aspirasi_component}%`} tier={4} />
               </div>
            </Wrapper3>
            
            <div className="border-t border-border my-2"></div>
            <SectionHeader title="Aspirasi Karir" />
             {MOCK_DATA.career_aspiration.map((asp, idx) => (
               <ItemCard 
                 key={idx} 
                 title={asp.aspiration_source === 'individual' ? 'Aspirasi Individu' : 'Saran Atasan'} 
                 date={formatDate(asp.dt_aspiration)}
                 tier={4}
               >
                 <div className="grid grid-cols-1 gap-4">
                   <InfoGroup label="Target Posisi (ID)" value={asp.id_target_position} tier={4} />
                   <InfoGroup label="Target Job Family" value={asp.id_target_job_family} tier={4} />
                   <InfoGroup label="Catatan" value={asp.aspiration_notes} tier={4} />
                 </div>
               </ItemCard>
             ))}

             <SectionHeader title="Learning Agility" />
             <ItemCard title={`Total Score: ${MOCK_DATA.learning_agility_assessment.learning_agility_score}`} subtitle={`Periode: ${MOCK_DATA.learning_agility_assessment.assessment_period}`} tier={4}>
                <div className="grid grid-cols-2 gap-4">
                   <InfoGroup label="Mental Agility" value={MOCK_DATA.learning_agility_assessment.mental_agility} tier={4} />
                   <InfoGroup label="People Agility" value={MOCK_DATA.learning_agility_assessment.people_agility} tier={4} />
                   <InfoGroup label="Change Agility" value={MOCK_DATA.learning_agility_assessment.change_agility} tier={4} />
                   <InfoGroup label="Results Agility" value={MOCK_DATA.learning_agility_assessment.results_agility} tier={4} />
                </div>
             </ItemCard>
          </div>
        );

      // 8. KONTRIBUSI
      case "kontribusi":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
             <SectionHeader title="Karya Tulis Ilmiah" />
             <button className="flex items-center gap-2 text-primary font-medium text-sm w-fit hover:underline" onClick={() => handleAddData("Karya Tulis", 2)}>
                <Plus size={16} />
                Tambah Karya Tulis
             </button>
             <p className="text-muted-foreground italic text-sm">Belum ada data karya tulis.</p>

             <div className="border-t border-border my-2"></div>
             
             <SectionHeader title="Pengalaman Sebagai Pembicara / Juri" />
             <button className="flex items-center gap-2 text-primary font-medium text-sm w-fit hover:underline" onClick={() => handleAddData("Pengalaman Pembicara/Juri", 2)}>
                <Plus size={16} />
                Tambah Pengalaman
             </button>
             <p className="text-muted-foreground italic text-sm">Belum ada data pengalaman.</p>

             <div className="border-t border-border my-2"></div>
             
             <SectionHeader title="Penugasan Project (Non-Jabatan)" />
              {/* Reuse secondary assignment if needed, or specific project assignments */}
              {MOCK_DATA.employee_secondary_assignment.filter(s => s.secondary_assignment_type !== 'job_assignment').length > 0 ? (
                 MOCK_DATA.employee_secondary_assignment.filter(s => s.secondary_assignment_type !== 'job_assignment').map(sec => (
                   <ItemCard key={sec.id_secondary_assignment} title={sec.position_name} subtitle={sec.org_unit_name} date={formatDate(sec.dt_assignment_start)} tier={1}>
                      <InfoGroup label="Tipe" value={sec.secondary_assignment_type} tier={1} />
                   </ItemCard>
                 ))
              ) : (
                <p className="text-muted-foreground italic text-sm">Belum ada data project.</p>
              )}
          </div>
        );

      // 9. HOBI & KEAHLIAN
      case "hobi-keahlian":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <Wrapper3>
              <SectionHeader title="Hobi & Keahlian" subtitle="Informasi tentang hobi dan keahlian Anda" />
              
              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Hobi</p>
                    </div>
                  </div>
                  <InfoGroup label="Hobi" value="Membaca, Traveling, Fotografi" tier={3} onEdit={() => handleEditClick("Hobi", "Membaca, Traveling, Fotografi", 3)} helperText="*Pisahkan dengan koma" />
                </Wrapper3>
              </div>

              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border mt-4">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Keahlian</p>
                    </div>
                  </div>
                  <InfoGroup label="Keahlian" value="Project Management, Data Analysis, Public Speaking" tier={3} onEdit={() => handleEditClick("Keahlian", "Project Management, Data Analysis, Public Speaking", 3)} helperText="*Pisahkan dengan koma" />
                </Wrapper3>
              </div>
            </Wrapper3>
          </div>
        );

      // 10. MINAT
      case "minat":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <Wrapper3>
              <SectionHeader title="Minat Pengembangan" subtitle="Area dan topik yang ingin Anda kembangkan" />
              
              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Minat Karir</p>
                    </div>
                  </div>
                  <InfoGroup label="Minat Karir" value="Leadership Development, Strategic Planning, Digital Transformation" tier={3} onEdit={() => handleEditClick("Minat Karir", "Leadership Development, Strategic Planning, Digital Transformation", 3)} helperText="*Area yang ingin dikembangkan" />
                </Wrapper3>
              </div>

              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border mt-4">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Bidang Pembelajaran</p>
                    </div>
                  </div>
                  <InfoGroup label="Bidang Pembelajaran" value="AI & Machine Learning, Change Management, Coaching & Mentoring" tier={3} onEdit={() => handleEditClick("Bidang Pembelajaran", "AI & Machine Learning, Change Management, Coaching & Mentoring", 3)} helperText="*Topik yang diminati" />
                </Wrapper3>
              </div>
            </Wrapper3>
          </div>
        );

      // 11. PENGHARGAAN
      case "penghargaan":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <Wrapper3>
              <SectionHeader title="Penghargaan" subtitle="Penghargaan dan prestasi yang telah diraih" />
              
              <div className="space-y-4">
                <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border">
                  <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-['Inter'] font-semibold leading-[20px] text-[14px] text-foreground">Best Employee of the Year 2024</p>
                        <p className="font-['Inter'] font-normal leading-[20px] text-[12px] text-muted-foreground mt-1">PT Injourney • Desember 2024</p>
                        <p className="font-['Inter'] font-normal leading-[20px] text-[12px] text-foreground mt-2">Penghargaan sebagai karyawan terbaik dengan kontribusi luar biasa dalam transformasi digital perusahaan</p>
                      </div>
                    </div>
                  </Wrapper3>
                </div>

                <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border">
                  <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                    <div className="flex items-start gap-3">
                      <Trophy className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-['Inter'] font-semibold leading-[20px] text-[14px] text-foreground">Innovation Award 2023</p>
                        <p className="font-['Inter'] font-normal leading-[20px] text-[12px] text-muted-foreground mt-1">PT Injourney • Juni 2023</p>
                        <p className="font-['Inter'] font-normal leading-[20px] text-[12px] text-foreground mt-2">Penghargaan untuk inovasi sistem HR digital yang meningkatkan efisiensi operasional 40%</p>
                      </div>
                    </div>
                  </Wrapper3>
                </div>

                <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border">
                  <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                    <div className="flex items-start gap-3">
                      <Star className="w-6 h-6 text-chart-2 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-['Inter'] font-semibold leading-[20px] text-[14px] text-foreground">Excellence in Service Award 2022</p>
                        <p className="font-['Inter'] font-normal leading-[20px] text-[12px] text-muted-foreground mt-1">PT Injourney • Desember 2022</p>
                        <p className="font-['Inter'] font-normal leading-[20px] text-[12px] text-foreground mt-2">Penghargaan untuk pelayanan luar biasa kepada internal stakeholders</p>
                      </div>
                    </div>
                  </Wrapper3>
                </div>
              </div>
            </Wrapper3>
          </div>
        );

      // 12. EMPLOYEE INFORMATION
      case "employee-info":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <Wrapper3>
              <SectionHeader title="Informasi Keuangan & Kepegawaian" subtitle="Informasi rekening, dokumen dan kepegawaian" />
              
              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Informasi Keuangan</p>
                    </div>
                  </div>
                  <InfoGroup label="Nomor Rekening Aktif" value="1234567890 (Bank BCA)" tier={2} onEdit={() => handleEditClick("Nomor Rekening Aktif", "1234567890 (Bank BCA)", 2)} />
                </Wrapper3>
              </div>

              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border mt-4">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Dokumen Identitas</p>
                    </div>
                  </div>
                  <InfoGroup label="No. Passport" value="X1234567" tier={2} onEdit={() => handleEditClick("No. Passport", "X1234567", 2)} />
                </Wrapper3>
              </div>

              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border mt-4">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <FileCheck className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Asuransi & BPJS</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <InfoGroup label="Nomor Asuransi" value="AS-2024-001234" tier={2} onEdit={() => handleEditClick("Nomor Asuransi", "AS-2024-001234", 2)} />
                    <InfoGroup label="BPJS Ketenagakerjaan" value="1234567890123" tier={2} onEdit={() => handleEditClick("BPJS Ketenagakerjaan", "1234567890123", 2)} />
                  </div>
                </Wrapper3>
              </div>
            </Wrapper3>
          </div>
        );

      // 13. STATUS KELUARGA
      case "status-keluarga":
        return (
          <div className="p-4 w-full flex flex-col gap-6">
            <Wrapper3>
              <SectionHeader title="Status Keluarga" subtitle="Informasi status pernikahan dan keluarga" />
              
              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Informasi Keluarga</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <InfoGroup label="Status Pernikahan" value="Menikah" tier={2} onEdit={() => handleEditClick("Status Pernikahan", "Menikah", 2)} />
                    <InfoGroup label="Jumlah Anak" value="2" tier={2} onEdit={() => handleEditClick("Jumlah Anak", "2", 2)} />
                  </div>
                  <div className="mt-4">
                    <InfoGroup label="Nama Pasangan" value="Siti Nurhaliza" tier={2} onEdit={() => handleEditClick("Nama Pasangan", "Siti Nurhaliza", 2)} />
                  </div>
                </Wrapper3>
              </div>

              <div className="bg-card relative rounded-[8px] shrink-0 w-full border border-border mt-4">
                <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-primary" />
                    <div className="flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-foreground text-[16px] text-nowrap">
                      <p className="leading-[24px]">Data Anak</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg border border-border">
                      <p className="font-['Inter'] font-semibold leading-[20px] text-[14px] text-foreground">Anak Pertama</p>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <InfoGroup label="Nama" value="Ahmad Zaky" tier={3} />
                        <InfoGroup label="Jenis Kelamin" value="Laki-laki" tier={3} />
                        <InfoGroup label="Tanggal Lahir" value="15 Januari 2018" tier={3} />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border">
                      <p className="font-['Inter'] font-semibold leading-[20px] text-[14px] text-foreground">Anak Kedua</p>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <InfoGroup label="Nama" value="Zahra Alifah" tier={3} />
                        <InfoGroup label="Jenis Kelamin" value="Perempuan" tier={3} />
                        <InfoGroup label="Tanggal Lahir" value="20 Maret 2020" tier={3} />
                      </div>
                    </div>
                  </div>
                </Wrapper3>
              </div>
            </Wrapper3>
          </div>
        );

      default:
        return (
          <div className="relative shrink-0 w-full">
            <Wrapper3>
              <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-full py-[48px]">
                <div className="relative shrink-0 size-[64px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="30" stroke="var(--border)" strokeWidth="2" fill="none"/>
                    <path d="M32 20V32L40 40" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-[8px]">
                  <p className="font-['Inter'] font-semibold leading-[24px] not-italic text-foreground text-[16px]">Coming Soon</p>
                  <p className="font-['Inter'] font-normal leading-[20px] not-italic text-muted-foreground text-[14px] text-center">
                    Konten untuk section ini sedang dalam pengembangan.
                  </p>
                </div>
              </div>
            </Wrapper3>
          </div>
        );
    }
  };

  return (
    <div className="bg-background relative rounded-tl-[24px] size-full">
      {/* Review Changes Popup */}
      {showReviewPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-[8px] w-[600px] max-h-[80vh] overflow-hidden flex flex-col shadow-lg border border-border">
            <div className="content-stretch flex items-center justify-between p-[24px] border-b border-border">
              <p className="font-['Inter'] font-semibold leading-[28px] not-italic text-foreground text-[20px]">Review Perubahan</p>
              <button
                onClick={() => setShowReviewPopup(false)}
                className="relative shrink-0 size-[24px] cursor-pointer hover:bg-muted rounded-full p-1 transition-colors"
              >
                <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-[24px]">
              <div className="content-stretch flex flex-col gap-[16px] w-full">
                {/* Change Item */}
                <div className="bg-muted/10 rounded-[8px] p-[16px] border border-border">
                  <div className="content-stretch flex flex-col gap-[12px]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-[8px]">
                        <Update />
                        <p className="font-['Inter'] font-semibold leading-[20px] not-italic text-foreground text-[14px]">No Handphone</p>
                      </div>
                      <div className="bg-primary/10 px-[8px] py-[4px] rounded-[4px]">
                        <p className="font-['Inter'] font-medium leading-[16px] not-italic text-primary text-[12px]">Pending</p>
                      </div>
                    </div>
                    
                    <div className="content-stretch flex flex-col gap-[8px]">
                      <div className="flex flex-col gap-[4px]">
                        <p className="font-['Inter'] font-normal leading-[20px] not-italic text-muted-foreground text-[14px]">Nilai Lama:</p>
                        <p className="font-['Inter'] font-normal leading-[20px] not-italic text-foreground text-[14px]">0812982100</p>
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <p className="font-['Inter'] font-normal leading-[20px] not-italic text-muted-foreground text-[14px]">Nilai Baru:</p>
                        <p className="font-['Inter'] font-semibold leading-[20px] not-italic text-primary text-[14px]">0812982101</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-[4px]">
                      <p className="font-['Inter'] font-normal leading-[20px] not-italic text-muted-foreground text-[14px]">Alasan Perubahan:</p>
                      <p className="font-['Inter'] font-normal leading-[20px] not-italic text-foreground text-[14px]">Update nomor handphone yang aktif</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="content-stretch flex gap-[16px] items-center justify-end p-[24px] border-t border-border">
              <button
                onClick={() => {
                  setShowReviewPopup(false);
                }}
                className="bg-card relative rounded-[6px] shrink-0 cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-[inherit]">
                  <p className="font-['Inter'] font-semibold leading-[20px] not-italic text-foreground text-[14px] text-center">Tolak</p>
                </div>
                <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none rounded-[6px]" />
              </button>
              <button
                onClick={() => {
                  setChangesReviewed(true);
                  setShowReviewPopup(false);
                }}
                className="bg-primary content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <p className="font-['Inter'] font-semibold leading-[20px] not-italic text-primary-foreground text-[14px] text-center">Setujui</p>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="size-full flex">
        {/* Left Section - Header + Main Content */}
        <div className="flex-1 flex flex-col gap-[16px] p-[24px] pr-0 relative overflow-hidden">
          {/* Header */}
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full pr-[24px]">
            <div className="content-stretch flex items-center gap-[16px] relative shrink-0">
              <button
                onClick={onBack}
                className="relative shrink-0 size-[24px] cursor-pointer hover:bg-muted rounded-full p-1 transition-colors"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p className="font-['Inter'] font-bold leading-[36px] not-italic relative shrink-0 text-foreground text-[24px]">Profil Saya</p>
            </div>
            
            {/* Sync Status */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <p className="font-['Inter'] text-[10px] text-muted-foreground leading-tight">Terakhir disinkronkan</p>
                <p className="font-['Inter'] text-[12px] font-medium text-foreground leading-tight">{lastSyncTime}</p>
              </div>
              <button 
                className="flex items-center gap-2 bg-background border border-border hover:bg-muted text-foreground px-3 py-1.5 rounded-md transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                onClick={handleSync}
                disabled={isSyncing}
              >
                <RefreshCw size={14} className={clsx("text-muted-foreground", isSyncing && "animate-spin")} />
                <span className="font-['Inter'] text-[12px] font-medium">{isSyncing ? 'Menyinkronkan...' : 'Sinkronisasi'}</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full h-full overflow-hidden pr-[24px]">
            {/* Fixed Left Sidebar */}
            <div className="bg-card relative rounded-[8px] shrink-0 w-[260px] h-full flex flex-col shadow-sm border border-border">
              <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full h-full">
                <div className="relative shrink-0 w-full">
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
                      <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 text-foreground text-nowrap w-full">
                        <p className="font-['Inter'] font-semibold leading-[28px] relative shrink-0 text-[18px]">Bagian Profil</p>
                        <p className="font-['Inter'] font-normal leading-[20px] relative shrink-0 text-[12px]">Eksplor profil anda secara menyeluruh</p>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-border border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                </div>
                
                {/* Scrollable Sidebar Items */}
                <div className="relative shrink-0 w-full flex-1 overflow-hidden">
                  <Wrapper3 additionalClassNames="overflow-x-clip overflow-y-auto h-full">
                    <SidebarItem
                      icon={<User size={18} style={{ color: activeSection === "data-pribadi" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="DATA PRIBADI"
                      isActive={activeSection === "data-pribadi"}
                      hasTag={true}
                      onClick={() => setActiveSection("data-pribadi")}
                    />
                    <SidebarItem
                      icon={<GraduationCap size={18} style={{ color: activeSection === "pendidikan" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="PENDIDIKAN"
                      isActive={activeSection === "pendidikan"}
                      hasTag={true}
                      onClick={() => setActiveSection("pendidikan")}
                    />
                    <SidebarItem
                      icon={<BookOpen size={18} style={{ color: activeSection === "pembelajaran" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="PEMBELAJARAN"
                      isActive={activeSection === "pembelajaran"}
                      onClick={() => setActiveSection("pembelajaran")}
                    />
                    <SidebarItem
                      icon={<Briefcase size={18} style={{ color: activeSection === "riwayat-pekerjaan" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="RIWAYAT PEKERJAAN"
                      isActive={activeSection === "riwayat-pekerjaan"}
                      onClick={() => setActiveSection("riwayat-pekerjaan")}
                    />
                    <SidebarItem
                      icon={<FileCheck size={18} style={{ color: activeSection === "informasi-kepegawaian" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="INFORMASI KEPEGAWAIAN"
                      isActive={activeSection === "informasi-kepegawaian"}
                      onClick={() => setActiveSection("informasi-kepegawaian")}
                    />
                    <SidebarItem
                      icon={<Award size={18} style={{ color: activeSection === "kualifikasi" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="KUALIFIKASI"
                      isActive={activeSection === "kualifikasi"}
                      onClick={() => setActiveSection("kualifikasi")}
                    />
                    <SidebarItem
                      icon={<TrendingUp size={18} style={{ color: activeSection === "insights" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="INSIGHTS"
                      isActive={activeSection === "insights"}
                      onClick={() => setActiveSection("insights")}
                    />
                    <SidebarItem
                      icon={<Trophy size={18} style={{ color: activeSection === "kontribusi" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="KONTRIBUSI"
                      isActive={activeSection === "kontribusi"}
                      onClick={() => setActiveSection("kontribusi")}
                    />
                    <SidebarItem
                      icon={<Heart size={18} style={{ color: activeSection === "hobi-keahlian" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="HOBI & KEAHLIAN"
                      isActive={activeSection === "hobi-keahlian"}
                      onClick={() => setActiveSection("hobi-keahlian")}
                    />
                    <SidebarItem
                      icon={<Target size={18} style={{ color: activeSection === "minat" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="MINAT"
                      isActive={activeSection === "minat"}
                      onClick={() => setActiveSection("minat")}
                    />
                    <SidebarItem
                      icon={<Award size={18} style={{ color: activeSection === "penghargaan" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="PENGHARGAAN"
                      isActive={activeSection === "penghargaan"}
                      onClick={() => setActiveSection("penghargaan")}
                    />
                    <SidebarItem
                      icon={<CreditCard size={18} style={{ color: activeSection === "employee-info" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="EMPLOYEE INFO"
                      isActive={activeSection === "employee-info"}
                      onClick={() => setActiveSection("employee-info")}
                    />
                    <SidebarItem
                      icon={<Users size={18} style={{ color: activeSection === "status-keluarga" ? "var(--primary)" : "var(--muted-foreground)" }} />}
                      label="STATUS KELUARGA"
                      isActive={activeSection === "status-keluarga"}
                      onClick={() => setActiveSection("status-keluarga")}
                    />
                  </Wrapper3>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none rounded-[8px]" />
            </div>

            {/* Right Content Area - Scrollable */}
            <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0 overflow-y-auto h-full">
              <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full border border-border bg-card min-h-full">
                <div className="relative shrink-0 w-full">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
                      <div className="relative shrink-0 size-[40px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                          <g id="account-circle">
                            <path d={svgPaths.p34c64240} fill="var(--muted-foreground)" id="Vector" />
                          </g>
                        </svg>
                      </div>
                      <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px not-italic relative shrink-0 text-foreground text-nowrap">
                        <p className="font-['Inter'] font-semibold leading-[28px] relative shrink-0 text-[20px]">
                          {activeSection === "data-pribadi" && "Data Pribadi"}
                          {activeSection === "pendidikan" && "Pendidikan"}
                          {activeSection === "pembelajaran" && "Pembelajaran"}
                          {activeSection === "riwayat-pekerjaan" && "Riwayat Pekerjaan"}
                          {activeSection === "informasi-kepegawaian" && "Informasi Kepegawaian"}
                          {activeSection === "kualifikasi" && "Kualifikasi"}
                          {activeSection === "insights" && "Insights"}
                          {activeSection === "kontribusi" && "Kontribusi"}
                          {activeSection === "hobi-keahlian" && "Hobi & Keahlian"}
                          {activeSection === "minat" && "Minat"}
                          {activeSection === "penghargaan" && "Penghargaan"}
                          {activeSection === "employee-info" && "Employee Information"}
                          {activeSection === "status-keluarga" && "Status Keluarga"}
                        </p>
                        <p className="font-['Inter'] font-normal leading-[20px] relative shrink-0 text-[14px]">Menyajikan informasi mengenai profil anda</p>
                      </div>
                      
                      {changesReviewed && (
                        <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                          <button
                            onClick={() => {
                              toast.success('Perubahan berhasil disimpan!');
                              setChangesReviewed(false);
                            }}
                            className="bg-primary content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                          >
                            <div className="relative shrink-0 size-[20px]">
                              <div className="absolute inset-[0_-5%_-5%_0]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
                                  <g id="save">
                                    <path d={svgPaths.p2a25c900} fill="var(--primary-foreground)" id="Vector" />
                                  </g>
                                </svg>
                              </div>
                            </div>
                            <p className="font-['Inter'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-primary-foreground">Simpan</p>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-border border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                </div>
                {renderContent()}
              </div>
            </div>

          </div>
        </div>
        
        {/* Right Profile Card - Full Height */}
        <ProfileInfoCard
          userName={userName}
          userEmail={userEmail}
          jobTitle={jobTitle}
          workUnit={workUnit}
          userNIK={userNIK}
          directSupervisor={directSupervisor}
          supervisorTitle={supervisorTitle}
        />
      </div>
      
      {/* Edit Modal (Tier 3 - Direct Edit) */}
      <DataEditModal 
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingField(null);
          setAddDataType(null);
        }}
        onSave={handleSaveEdit}
        fieldLabel={editingField?.label}
        fieldValue={editingField?.value}
        addDataType={addDataType?.type}
      />

      {/* Request Change Modal (Tier 2 - Approval Required) */}
      <DataRequestModal 
        open={requestModalOpen}
        onClose={() => {
          setRequestModalOpen(false);
          setEditingField(null);
          setAddDataType(null);
        }}
        onSubmit={handleSubmitRequest}
        fieldLabel={editingField?.label}
        fieldValue={editingField?.value}
        addDataType={addDataType?.type}
      />

      {/* Sync Result Modal */}
      <Dialog open={syncResultModalOpen} onOpenChange={setSyncResultModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-card border-border">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-foreground">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-primary" />
              </div>
              Hasil Sinkronisasi Data
            </DialogTitle>
            <DialogDescription className="sr-only">
              Tinjau hasil sinkronisasi data profil Anda dari Data Warehouse InJourney.
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-6 py-2">
             <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
               <div className="bg-blue-100 rounded-full p-1 mt-0.5 shrink-0">
                  <Info className="h-4 w-4 text-blue-600" />
               </div>
               <div className="text-sm text-blue-900/80">
                 <p className="font-semibold text-blue-900">Sinkronisasi Selesai</p>
                 <p className="mt-1">Data profil Anda telah diperbarui dari Data Warehouse InJourney. Silakan tinjau perubahan di bawah ini sebelum menyimpan.</p>
               </div>
             </div>
          </div>

          <div className="flex flex-col gap-4 p-6 pt-2 max-h-[60vh] overflow-y-auto bg-muted/5">
               {syncResults.map((res) => {
                 // Safe access to fields
                 const fields = res.fields || [];
                 const hasChanges = fields.some((f: any) => f.status === 'changed');
                 
                 return (
                 <div key={res.id} className={clsx(
                    "border rounded-lg overflow-hidden transition-all shadow-sm",
                    hasChanges ? "border-primary/30 bg-background" : "border-border bg-card"
                 )}>
                    {/* Header of the Item */}
                    <div className={clsx(
                      "px-4 py-3 flex items-center justify-between border-b",
                      hasChanges ? "bg-primary/5 border-primary/10" : "bg-muted/30 border-border"
                    )}>
                       <div className="flex items-center gap-3">
                          {hasChanges && (
                            <Checkbox 
                              id={`check-${res.id}`}
                              checked={selectedChangeIds.includes(res.id)}
                              onCheckedChange={() => handleToggleChange(res.id)}
                              className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                          )}
                          <div className="flex flex-col">
                              <label htmlFor={`check-${res.id}`} className={clsx("font-semibold text-sm text-foreground", hasChanges && "cursor-pointer")}>
                                {res.category}
                              </label>
                          </div>
                       </div>
                       
                       {!hasChanges ? (
                         <div className="flex items-center gap-1.5 text-muted-foreground bg-white px-2.5 py-1 rounded-full text-xs font-medium border border-border shadow-sm">
                           <CheckCircle size={14} className="text-green-600" />
                           <span>Terkini</span>
                         </div>
                       ) : (
                         <div className="flex items-center gap-1.5 text-amber-700 bg-white px-2.5 py-1 rounded-full text-xs font-medium border border-amber-200 shadow-sm">
                           <AlertCircle size={14} />
                           <span>Perubahan Ditemukan</span>
                         </div>
                       )}
                    </div>
                    
                    {/* Data List */}
                    <div className="flex flex-col divide-y divide-border">
                        {fields.map((field: any, idx: number) => (
                          <div key={idx} className={clsx(
                            "px-4 py-3 text-sm flex items-start gap-4 transition-colors",
                            field.status === 'changed' ? "bg-amber-50/50" : "hover:bg-muted/5"
                          )}>
                            <div className="flex-1 min-w-[30%]">
                              <p className="text-muted-foreground text-xs font-medium mb-0.5">{field.name}</p>
                              {field.status === 'changed' ? (
                                <div className="flex flex-col gap-1.5 mt-1">
                                  <div className="text-muted-foreground line-through decoration-destructive/40 text-xs">{field.oldValue}</div>
                                  <div className="flex items-center gap-2 text-primary font-medium bg-white border border-primary/20 p-2 rounded-md shadow-sm">
                                    <ArrowRight size={14} className="shrink-0" />
                                    <span>{field.newValue}</span>
                                  </div>
                                </div>
                              ) : (
                                <p className="font-medium text-foreground">{field.value}</p>
                              )}
                            </div>
                            
                            <div className="shrink-0 pt-1">
                                {field.status === 'changed' ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                                    UPDATED
                                  </span>
                                ) : (
                                  <CheckCircle size={16} className="text-green-500/50" />
                                )}
                            </div>
                          </div>
                        ))}
                    </div>
                 </div>
               );
              })}
          </div>

          <DialogFooter className="p-6 pt-4 border-t border-border bg-muted/10 flex-row gap-3 justify-end">
            <Button variant="outline" onClick={() => setSyncResultModalOpen(false)} className="h-10">Batalkan</Button>
            <Button onClick={handleSaveSync} disabled={selectedChangeIds.length === 0} className="h-10 px-6 gap-2 bg-primary hover:bg-primary/90">
              <RefreshCw size={16} className={clsx(isSyncing && "animate-spin")} />
              Terapkan {selectedChangeIds.length} Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
