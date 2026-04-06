import svgPaths from "../imports/svg-99srisloqb";
import imgFrame1000001778 from "figma:asset/7e7006a4927bcec25694136f88b3db870eacf73b.png";
import imgFrame1000001779 from "figma:asset/7831b9ec4303df4fbb366388ea0a210b01e2e804.png";
import { Mail, Briefcase, Building2, Users, CreditCard } from "lucide-react";

interface ProfileInfoCardProps {
  userName: string;
  userEmail: string;
  jobTitle: string;
  workUnit?: string;
  userNIK?: string;
  directSupervisor?: string;
  supervisorTitle?: string;
}

function User() {
  return (
    <div className="absolute inset-[20%]" data-name="user">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="user">
          <path d={svgPaths.p2e0e8900} id="Icon" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

export default function ProfileInfoCard({
  userName,
  userEmail,
  jobTitle,
  workUnit = "Direktorat Human Capital",
  userNIK = "26010001",
  directSupervisor = "Herdy Harman",
  supervisorTitle = "Director of HR and Digital",
}: ProfileInfoCardProps) {
  const fullUserEmail = userEmail === "binavia@injourney.co.id" ? "binavia@injourney.co.id" : "dimas.sayyid@injourney.id";
  const photoUrl = userEmail === "binavia@injourney.co.id" ? imgFrame1000001779 : imgFrame1000001778;
  
  return (
    <div className="h-full relative shrink-0 w-[320px] bg-card border-l" style={{ borderColor: "var(--border)" }}>
      <div className="content-stretch flex flex-col items-start relative size-full">
        {/* Header - Foto Profil dan Nama */}
        <div className="relative shrink-0 w-full border-b" style={{ borderColor: "var(--border)" }}>
          <div className="overflow-clip size-full">
            <div className="content-stretch flex flex-col items-center p-[24px] relative w-full gap-[16px]">
              {/* Profile Photo */}
              <div className="relative shrink-0 size-[112px]">
                <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-full size-[112px] top-0">
                  <div className="content-stretch flex items-start overflow-clip p-[4px] relative rounded-[inherit] size-full">
                    <div className="basis-0 bg-gradient-to-b from-[#00858a] grow h-[104px] min-h-px min-w-px relative rounded-full shrink-0 to-[#006573]">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full overflow-hidden rounded-full">
                        <img 
                          alt={userName} 
                          className="object-cover size-full rounded-full" 
                          src={photoUrl} 
                        />
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-0 pointer-events-none rounded-full shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                </div>
              </div>
              
              {/* Nama dan NIK */}
              <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full">
                <h3 style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>{userName}</h3>
                <div className="bg-muted h-[24.5px] relative rounded-full shrink-0 px-3 flex items-center">
                  <div className="flex items-center gap-1">
                    <p className="caption text-muted-foreground" style={{ fontSize: "var(--text-xs)" }}>NIK:</p>
                    <p className="caption" style={{ fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>{userNIK}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Pekerja */}
        <div className="flex-1 relative shrink-0 w-full overflow-y-auto">
          <div className="size-full">
            <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative size-full">
              
              {/* Email */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
                <div className="bg-primary/10 size-[32px] rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={16} style={{ color: "var(--primary)" }} />
                </div>
                <div className="flex-1 content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0">
                  <p className="caption text-muted-foreground" style={{ fontSize: "var(--text-xs)" }}>Email</p>
                  <p className="caption" style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)", wordBreak: "break-word" }}>{fullUserEmail}</p>
                </div>
              </div>

              {/* Jabatan */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
                <div className="bg-chart-3/20 size-[32px] rounded-lg flex items-center justify-center shrink-0">
                  <Briefcase size={16} style={{ color: "var(--chart-3)" }} />
                </div>
                <div className="flex-1 content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0">
                  <p className="caption text-muted-foreground" style={{ fontSize: "var(--text-xs)" }}>Jabatan</p>
                  <p className="caption" style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>{jobTitle}</p>
                </div>
              </div>

              {/* Unit Kerja */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
                <div className="bg-accent/10 size-[32px] rounded-lg flex items-center justify-center shrink-0">
                  <Building2 size={16} style={{ color: "var(--accent)" }} />
                </div>
                <div className="flex-1 content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0">
                  <p className="caption text-muted-foreground" style={{ fontSize: "var(--text-xs)" }}>Unit Kerja</p>
                  <p className="caption" style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>{workUnit}</p>
                  <p className="caption text-muted-foreground" style={{ fontSize: "var(--text-xs)" }}>InJourney Holding</p>
                </div>
              </div>

              {/* Atasan Langsung */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
                <div className="bg-primary/10 size-[32px] rounded-lg flex items-center justify-center shrink-0">
                  <Users size={16} style={{ color: "var(--primary)" }} />
                </div>
                <div className="flex-1 content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0">
                  <p className="caption text-muted-foreground" style={{ fontSize: "var(--text-xs)" }}>Atasan Langsung</p>
                  <p className="caption" style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>{directSupervisor}</p>
                  <p className="caption text-muted-foreground" style={{ fontSize: "var(--text-xs)" }}>{supervisorTitle}</p>
                </div>
              </div>

              {/* Employee ID */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
                <div className="bg-chart-2/20 size-[32px] rounded-lg flex items-center justify-center shrink-0">
                  <CreditCard size={16} style={{ color: "var(--chart-2)" }} />
                </div>
                <div className="flex-1 content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0">
                  <p className="caption text-muted-foreground" style={{ fontSize: "var(--text-xs)" }}>Employee ID</p>
                  <p className="caption" style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>EMP-INJ-{userNIK}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
