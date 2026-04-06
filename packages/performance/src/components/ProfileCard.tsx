import { ArrowRight, Briefcase, Mail, MapPin, User } from "lucide-react";
import imgDimasAvatar from "figma:asset/7e7006a4927bcec25694136f88b3db870eacf73b.png";
import imgBinaviaAvatar from "figma:asset/7831b9ec4303df4fbb366388ea0a210b01e2e804.png";

interface ProfileCardProps {
  userName: string;
  userEmail: string;
  userNIK: string;
  jobTitle: string;
  workUnit: string;
  directSupervisor: string;
  supervisorTitle: string;
  onViewFullProfile?: () => void;
  onLogout?: () => void;
}

export default function ProfileCard({
  userName,
  userEmail,
  userNIK,
  jobTitle,
  workUnit,
  directSupervisor,
  supervisorTitle,
  onViewFullProfile,
  onLogout,
}: ProfileCardProps) {
  const isBinavia = userEmail === "binavia@injourney.co.id";
  const avatarImage = isBinavia ? imgBinaviaAvatar : imgDimasAvatar;
  const initials = userName.split(" ").map(n => n[0]).join("");

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-sm w-full max-w-[320px]">
      {/* Header with gradient */}
      <div className="h-16 bg-gradient-to-r from-primary to-primary/80 rounded-t-lg" />
      
      {/* Profile Content */}
      <div className="px-6 pb-6 -mt-8 space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src={avatarImage} 
              alt={userName}
              className="w-24 h-24 rounded-full border-4 border-white shadow-elevation-md object-cover"
            />
            {/* Checkmark badge */}
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-chart-1 border-4 border-white flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.3333 4L6 11.3333L2.66666 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Name and NIK */}
        <div className="text-center space-y-2">
          <h3 className="text-foreground">{userName}</h3>
          <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
            <span className="caption text-muted-foreground">NIK:</span>
            <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{userNIK}</span>
          </div>
        </div>

        {/* Job Title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="caption text-muted-foreground mb-1">Jabatan</p>
            <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{jobTitle}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="caption text-muted-foreground mb-1">Email</p>
            <p className="caption break-all" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{userEmail}</p>
          </div>
        </div>

        {/* Direct Supervisor */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="caption text-muted-foreground mb-1">Atasan Langsung</p>
            <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{directSupervisor}</p>
            <p className="caption text-muted-foreground">{supervisorTitle}</p>
          </div>
        </div>

        {/* Work Unit */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="caption text-muted-foreground mb-1">Unit Kerja</p>
            <p className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>{workUnit}</p>
            <p className="caption text-muted-foreground">InJourney Holding</p>
          </div>
        </div>

        {/* View Full Profile Button */}
        {onViewFullProfile && (
          <button
            onClick={onViewFullProfile}
            className="w-full py-3 px-4 border border-border rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Lihat Profil Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full py-3 px-4 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <span className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Log Out</span>
          </button>
        )}
      </div>
    </div>
  );
}