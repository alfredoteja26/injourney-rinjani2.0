import { useState } from "react";
import { ArrowLeft, GraduationCap, Briefcase, Heart, Lightbulb, Award, Star, User } from "lucide-react";
import { getEmployeeDataByEmail } from "../lib/employee-profiles";

interface PublicProfileViewProps {
  email: string;
  onBack: () => void;
}

type ProfileSection = "pendidikan" | "riwayat-pekerjaan" | "hobi-keahlian" | "minat" | "penghargaan";

const getEducationLevelLabel = (code: string) => {
  const levels: { [key: string]: string } = {
    sd: "SD",
    smp: "SMP",
    sma: "SMA",
    s1: "S1",
    s2: "S2",
    s3: "S3"
  };
  return levels[code] || code.toUpperCase();
};

const getSkillLevelLabel = (level: string) => {
  const levels: { [key: string]: string } = {
    beginner: "Pemula",
    intermediate: "Menengah",
    advanced: "Mahir",
    expert: "Ahli"
  };
  return levels[level] || level;
};

const getSkillLevelColor = (level: string) => {
  const colors: { [key: string]: { bg: string; text: string } } = {
    beginner: { bg: "var(--muted)", text: "var(--muted-foreground)" },
    intermediate: { bg: "var(--primary)", text: "var(--primary-foreground)" },
    advanced: { bg: "var(--primary)", text: "var(--primary-foreground)" },
    expert: { bg: "var(--primary)", text: "var(--primary-foreground)" }
  };
  return colors[level] || colors.beginner;
};

export default function PublicProfileView({ email, onBack }: PublicProfileViewProps) {
  const [activeSection, setActiveSection] = useState<ProfileSection>("pendidikan");
  const employeeData = getEmployeeDataByEmail(email);

  if (!employeeData) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p style={{ color: "var(--muted-foreground)" }}>
          Employee data not found for {email}
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-lg"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)"
          }}
        >
          Kembali
        </button>
      </div>
    );
  }

  const { 
    employee_profile, 
    employee_company_assignment,
    employee_education_history = [],
    employee_work_history = [],
    employee_skills = [],
    employee_hobbies = [],
    employee_interests = [],
    employee_awards = []
  } = employeeData;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Sekarang";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatDateShort = (dateString: string | null | undefined) => {
    if (!dateString) return "Sekarang";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} tahun ${remainingMonths} bulan`;
    } else if (years > 0) {
      return `${years} tahun`;
    } else {
      return `${remainingMonths} bulan`;
    }
  };

  const menuItems = [
    { id: "pendidikan" as ProfileSection, label: "PENDIDIKAN", icon: GraduationCap },
    { id: "riwayat-pekerjaan" as ProfileSection, label: "RIWAYAT PEKERJAAN", icon: Briefcase },
    { id: "hobi-keahlian" as ProfileSection, label: "HOBI & KEAHLIAN", icon: Heart },
    { id: "minat" as ProfileSection, label: "MINAT", icon: Lightbulb },
    { id: "penghargaan" as ProfileSection, label: "PENGHARGAAN", icon: Award },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "pendidikan":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6" style={{ color: "var(--primary)" }} />
              <h3 style={{ color: "var(--foreground)" }}>Riwayat Pendidikan</h3>
            </div>
            
            {employee_education_history.length > 0 ? (
              <div className="space-y-6">
                {employee_education_history.map((edu, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)"
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "var(--primary)" }}
                        >
                          <GraduationCap className="w-6 h-6" style={{ color: "var(--primary-foreground)" }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span 
                              className="px-2 py-0.5 rounded caption"
                              style={{ 
                                backgroundColor: "var(--primary)",
                                color: "var(--primary-foreground)"
                              }}
                            >
                              {getEducationLevelLabel(edu.education_level_code)}
                            </span>
                          </div>
                          <h4 style={{ color: "var(--foreground)" }}>
                            {edu.institution_name}
                          </h4>
                          {edu.major && (
                            <p style={{ color: "var(--foreground)" }}>
                              {edu.major}
                              {edu.concentration && ` - ${edu.concentration}`}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="caption shrink-0" style={{ color: "var(--muted-foreground)" }}>
                        {formatDateShort(edu.dt_start)} - {formatDateShort(edu.dt_end)}
                      </p>
                    </div>
                    
                    {edu.faculty && (
                      <p className="caption mb-2" style={{ color: "var(--muted-foreground)" }}>
                        📚 {edu.faculty}
                      </p>
                    )}
                    
                    {edu.final_score && (
                      <p className="caption mb-2" style={{ color: "var(--muted-foreground)" }}>
                        📊 IPK/Nilai: <strong style={{ color: "var(--foreground)" }}>{edu.final_score}</strong>
                      </p>
                    )}
                    
                    {edu.achievement_notes && (
                      <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                        🏆 {edu.achievement_notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8" style={{ backgroundColor: "var(--muted)", borderRadius: "8px" }}>
                <p style={{ color: "var(--muted-foreground)" }}>Belum ada data pendidikan</p>
              </div>
            )}
          </div>
        );

      case "riwayat-pekerjaan":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6" style={{ color: "var(--primary)" }} />
              <h3 style={{ color: "var(--foreground)" }}>Riwayat Pekerjaan</h3>
            </div>
            
            {employee_work_history.length > 0 ? (
              <div className="space-y-6">
                {employee_work_history.map((work, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)"
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "var(--primary)" }}
                        >
                          <Briefcase className="w-6 h-6" style={{ color: "var(--primary-foreground)" }} />
                        </div>
                        <div>
                          <h4 style={{ color: "var(--foreground)" }}>
                            {work.job_position}
                          </h4>
                          <p style={{ color: "var(--foreground)" }}>
                            {work.company_name}
                          </p>
                          <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                            {calculateDuration(work.start_date, work.end_date)}
                          </p>
                        </div>
                      </div>
                      <p className="caption shrink-0" style={{ color: "var(--muted-foreground)" }}>
                        {formatDateShort(work.start_date)} - {formatDateShort(work.end_date)}
                      </p>
                    </div>
                    
                    {work.job_description && (
                      <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                        {work.job_description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8" style={{ backgroundColor: "var(--muted)", borderRadius: "8px" }}>
                <p style={{ color: "var(--muted-foreground)" }}>Belum ada riwayat pekerjaan</p>
              </div>
            )}
          </div>
        );

      case "hobi-keahlian":
        return (
          <div className="space-y-6">
            {/* Skills Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6" style={{ color: "var(--primary)" }} />
                <h3 style={{ color: "var(--foreground)" }}>Keahlian</h3>
              </div>
              
              {employee_skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {employee_skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-lg border flex items-center justify-between"
                      style={{ 
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)"
                      }}
                    >
                      <div>
                        <p style={{ color: "var(--foreground)" }}>{skill.skill_name}</p>
                        <p className="caption" style={{ color: "var(--muted-foreground)" }}>{skill.category}</p>
                      </div>
                      <span 
                        className="px-3 py-1 rounded caption shrink-0"
                        style={{
                          backgroundColor: getSkillLevelColor(skill.skill_level).bg,
                          color: getSkillLevelColor(skill.skill_level).text
                        }}
                      >
                        {getSkillLevelLabel(skill.skill_level)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8" style={{ backgroundColor: "var(--muted)", borderRadius: "8px" }}>
                  <p style={{ color: "var(--muted-foreground)" }}>Belum ada data keahlian</p>
                </div>
              )}
            </div>

            {/* Hobbies Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6" style={{ color: "var(--primary)" }} />
                <h3 style={{ color: "var(--foreground)" }}>Hobi</h3>
              </div>
              
              {employee_hobbies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {employee_hobbies.map((hobby, index) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-lg border"
                      style={{ 
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)"
                      }}
                    >
                      <p style={{ color: "var(--foreground)" }}>{hobby.hobby_name}</p>
                      <p className="caption" style={{ color: "var(--muted-foreground)" }}>{hobby.category}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8" style={{ backgroundColor: "var(--muted)", borderRadius: "8px" }}>
                  <p style={{ color: "var(--muted-foreground)" }}>Belum ada data hobi</p>
                </div>
              )}
            </div>
          </div>
        );

      case "minat":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6" style={{ color: "var(--primary)" }} />
              <h3 style={{ color: "var(--foreground)" }}>Minat</h3>
            </div>
            
            {employee_interests.length > 0 ? (
              <div className="space-y-4">
                {employee_interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)"
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        <Lightbulb className="w-5 h-5" style={{ color: "var(--primary-foreground)" }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1" style={{ color: "var(--foreground)" }}>
                          {interest.interest_name}
                        </h4>
                        <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                          {interest.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8" style={{ backgroundColor: "var(--muted)", borderRadius: "8px" }}>
                <p style={{ color: "var(--muted-foreground)" }}>Belum ada data minat</p>
              </div>
            )}
          </div>
        );

      case "penghargaan":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6" style={{ color: "var(--primary)" }} />
              <h3 style={{ color: "var(--foreground)" }}>Penghargaan</h3>
            </div>
            
            {employee_awards.length > 0 ? (
              <div className="space-y-4">
                {employee_awards.map((award, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)"
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        <Award className="w-6 h-6" style={{ color: "var(--primary-foreground)" }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 style={{ color: "var(--foreground)" }}>
                            {award.award_name}
                          </h4>
                          <p className="caption shrink-0 ml-4" style={{ color: "var(--muted-foreground)" }}>
                            {formatDate(award.issue_date)}
                          </p>
                        </div>
                        <p className="caption mb-2" style={{ color: "var(--muted-foreground)" }}>
                          🏢 Diberikan oleh: <strong style={{ color: "var(--foreground)" }}>{award.issued_by}</strong>
                        </p>
                        <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8" style={{ backgroundColor: "var(--muted)", borderRadius: "8px" }}>
                <p style={{ color: "var(--muted-foreground)" }}>Belum ada penghargaan</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full" style={{ backgroundColor: "var(--background)" }}>
      {/* Left Sidebar - Navigation */}
      <div 
        className="w-64 border-r flex flex-col shrink-0"
        style={{ 
          backgroundColor: "var(--card)",
          borderColor: "var(--border)"
        }}
      >
        {/* Back Button */}
        <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors"
            style={{
              color: "var(--foreground)"
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Profil Saya</span>
          </button>
        </div>

        {/* Profile Section Header */}
        <div className="p-4">
          <h4 style={{ color: "var(--foreground)" }}>Bagian Profil</h4>
          <p className="caption mt-1" style={{ color: "var(--muted-foreground)" }}>
            Eksplorasi profil publik pekerja
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="flex items-center gap-3 w-full px-3 py-2.5 mb-1 rounded-lg transition-all"
                style={{
                  backgroundColor: isActive ? "var(--primary)" : "transparent",
                  color: isActive ? "var(--primary-foreground)" : "var(--foreground)"
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="caption">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Employee Info */}
        <div 
          className="border-b p-6"
          style={{ 
            backgroundColor: "var(--card)",
            borderColor: "var(--border)"
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <p className="caption" style={{ color: "var(--muted-foreground)" }}>
              Terakhir diperbarui
            </p>
            <p className="caption" style={{ color: "var(--muted-foreground)" }}>
              {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <span className="text-2xl" style={{ color: "var(--primary-foreground)" }}>
                {employee_profile.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <h3 className="mb-1" style={{ color: "var(--foreground)" }}>
                {employee_profile.full_name}
              </h3>
              <p style={{ color: "var(--muted-foreground)" }}>
                {employee_profile.corporate_email}
              </p>
              <div className="mt-3 p-3 rounded-lg inline-block" style={{ backgroundColor: "var(--muted)" }}>
                <p className="caption mb-1" style={{ color: "var(--muted-foreground)" }}>
                  Nama Pekerja
                </p>
                <p style={{ color: "var(--foreground)" }}>
                  {employee_profile.full_name}
                </p>
                <p className="caption mt-2 mb-1" style={{ color: "var(--muted-foreground)" }}>
                  Jabatan
                </p>
                <p style={{ color: "var(--foreground)" }}>
                  {employee_company_assignment.job_position}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
