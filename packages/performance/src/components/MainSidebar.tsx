import React, { useState, useRef, useEffect } from "react";
import { Home, FileText, Settings, Trophy, Users, GraduationCap, ChevronRight, MoreVertical, ShieldCheck } from "lucide-react";
import imgLogo from "figma:asset/c431b6a1465f2d5e74a13b698b185dc831318ab2.png";
import imgDimasAvatar from "figma:asset/7e7006a4927bcec25694136f88b3db870eacf73b.png";
import imgBinaviaAvatar from "figma:asset/7831b9ec4303df4fbb366388ea0a210b01e2e804.png";
import imgCollapseIcon from "figma:asset/eae4ac5cdde79002268cbc71d3c95277be4b5038.png";
import patternPaths from "../imports/svg-vmu50jdyfl";
import ProfilePopup from "./ProfilePopup";
import IconParkOutlineExpandLeft from "../imports/IconParkOutlineExpandLeft";

interface MainSidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  onTalentClick: () => void;
  onPerformanceClick?: () => void;
  currentPage?: "dashboard" | "talent" | "myprofile" | "settings" | "performance";
  onProfileClick?: () => void;
  onLogout?: () => void;
  onSettingsClick?: () => void;
  onDashboardClick?: () => void;
  userRole?: "Admin" | "User";
  userEmail?: string;
}

function SmeIcon() {
  return (
    <div className="absolute bottom-0 right-0 size-[16px]" data-name="sme icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <circle cx="10" cy="10" r="9.5" fill="#00A199" />
          <circle cx="10" cy="10" r="9.5" stroke="white" />
          <path d="M14.5 7L8.5 13L5.5 10" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// Pattern Background Components (same as RinjaniSidebar)
function ClipPathGroup() {
  return (
    <div className="relative size-full" data-name="Clip path group">
      <div className="absolute inset-[-1.24%_-1.24%_-1.23%_-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p316c4170} id="path153" stroke="url(#paint0_linear_89_4153)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4153" x1="22.8681" x2="22.8681" y1="0.551333" y2="45.1857">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#00858A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="relative size-full" data-name="Clip path group">
      <div className="absolute inset-[-1.23%_-1.24%_-1.24%_-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p19e20000} id="path155" stroke="url(#paint0_linear_89_4159)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4159" x1="22.862" x2="22.862" y1="0.551333" y2="45.174">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#00858A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="relative size-full" data-name="Clip path group">
      <div className="absolute inset-[-1.23%_-1.24%_-1.24%_-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p9207e00} id="path157" stroke="url(#paint0_linear_89_4814)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4814" x1="22.869" x2="22.869" y1="0.551596" y2="45.1859">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#00858A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="relative size-full" data-name="Clip path group">
      <div className="absolute inset-[-1.23%_-1.24%_-1.24%_-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p1668de80} id="path159" stroke="url(#paint0_linear_89_4826)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4826" x1="22.8679" x2="22.8679" y1="0.551333" y2="45.1974">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#00858A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="relative size-full" data-name="Clip path group">
      <div className="absolute inset-[-1.24%_-1.23%_-1.23%_-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p2f883600} id="path161" stroke="url(#paint0_linear_89_4838)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4838" x1="22.8679" x2="22.8679" y1="0.551335" y2="45.1857">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#00858A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <div className="relative size-full" data-name="Clip path group">
      <div className="absolute inset-[-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.pa7c4000} id="path163" stroke="url(#paint0_linear_89_4817)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4817" x1="22.869" x2="22.869" y1="0.552482" y2="45.1868">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#00858A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup6() {
  return (
    <div className="relative size-full" data-name="Clip path group">
      <div className="absolute inset-[-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p14ff0e80} id="path165" stroke="url(#paint0_linear_89_4835)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4835" x1="22.869" x2="22.869" y1="0.552482" y2="45.1868">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#00858A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup7() {
  return (
    <div className="relative size-full" data-name="Clip path group">
      <div className="absolute inset-[-1.23%_-1.24%_-1.24%_-1.23%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p22162c00} id="path167" stroke="url(#paint0_linear_89_4811)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4811" x1="22.8737" x2="22.8737" y1="0.551333" y2="45.1857">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#00858A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full">
      <div className="[grid-area:1_/_1] flex h-[44.634px] items-center justify-center ml-0 mt-[16.91%] relative w-[44.633px]">
        <div className="flex-none h-[44.634px] scale-y-[-100%] w-[44.633px]">
          <ClipPathGroup />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[44.623px] items-center justify-center ml-[0.01%] mt-[50.04%] relative w-[44.621px]">
        <div className="flex-none h-[44.623px] scale-y-[-100%] w-[44.621px]">
          <ClipPathGroup1 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[44.634px] items-center justify-center ml-[16.91%] mt-[66.18%] relative w-[44.633px]">
        <div className="flex-none h-[44.634px] scale-y-[-100%] w-[44.633px]">
          <ClipPathGroup2 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[44.646px] items-center justify-center ml-[50.04%] mt-[66.18%] relative w-[44.633px]">
        <div className="flex-none h-[44.646px] scale-y-[-100%] w-[44.633px]">
          <ClipPathGroup3 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[44.634px] items-center justify-center ml-[49.36%] mt-0 relative w-[44.633px]">
        <div className="flex-none h-[44.634px] scale-y-[-100%] w-[44.633px]">
          <ClipPathGroup4 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[44.634px] items-center justify-center ml-[16.23%] mt-0 relative w-[44.633px]">
        <div className="flex-none h-[44.634px] scale-y-[-100%] w-[44.633px]">
          <ClipPathGroup5 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[44.634px] items-center justify-center ml-[66.18%] mt-[49.28%] relative w-[44.633px]">
        <div className="flex-none h-[44.634px] scale-y-[-100%] w-[44.633px]">
          <ClipPathGroup6 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[44.634px] items-center justify-center ml-[66.18%] mt-[16.15%] relative w-[44.645px]">
        <div className="flex-none h-[44.634px] scale-y-[-100%] w-[44.645px]">
          <ClipPathGroup7 />
        </div>
      </div>
    </div>
  );
}

function PatternFrame() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center leading-[0] min-h-px min-w-px overflow-clip relative shrink-0">
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
    </div>
  );
}

function PatternFrame4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center leading-[0] min-h-px min-w-px overflow-clip relative shrink-0">
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
      <Group1 />
    </div>
  );
}

function PatternBackground() {
  return (
    <div className="absolute content-stretch flex h-[1024px] items-center justify-between left-0 top-0 w-[264px] z-0 pointer-events-none">
      <PatternFrame />
      <PatternFrame4 />
    </div>
  );
}

export function MainSidebar({ isExpanded, onToggle, onTalentClick, onPerformanceClick, currentPage, onProfileClick, onLogout, onSettingsClick, onDashboardClick, userRole, userEmail }: MainSidebarProps) {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const [profilePopupPosition, setProfilePopupPosition] = useState({ top: 0, left: 0 });

  const handleProfileClick = () => {
    if (profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      setProfilePopupPosition({
        top: rect.top,
        left: rect.right + 8,
      });
      setShowProfilePopup(!showProfilePopup);
    }
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/", color: "#FDFDFD" },
    { icon: FileText, label: "Onboarding", path: "/onboarding", color: "#FDFDFD" },
    { icon: Settings, label: "Settings", path: "/settings", color: "#FDFDFD" },
  ];

  const expandableItems = [
    { icon: Trophy, label: "Performance", path: "/performance", color: "#FDFDFD" },
    { icon: Users, label: "Talent", path: "/talent-pool", color: "#FDFDFD" },
    { icon: GraduationCap, label: "Learning", path: "/learning", color: "#FDFDFD" },
  ];

  return (
    <>
      <div 
        className={`bg-[#006573] flex flex-col transition-all duration-300 ease-in-out h-full relative ${
          isExpanded ? 'w-[264px]' : 'w-[64px]'
        }`}
      >
        {/* Pattern Background */}
        <PatternBackground />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo and Toggle Button */}
          <div className="flex items-center justify-between px-[16px] py-[12px] shrink-0">
            {isExpanded ? (
              <div className="flex gap-[8px] items-center">
                <div className="relative shrink-0 size-[40px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="Logo" className="absolute h-[300%] left-[-235.98%] max-w-none top-[-90%] w-[841.96%]" src={imgLogo} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] text-[16px] text-white">RINJANI</p>
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] text-[8px] text-neutral-50 w-[82px]">Integrated Talent Management System</p>
                </div>
              </div>
            ) : (
              <button onClick={onToggle} className="relative shrink-0 size-[40px] mx-auto hover:opacity-80 transition-opacity">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="Logo" className="absolute h-[300%] left-[-235.98%] max-w-none top-[-90%] w-[841.96%]" src={imgLogo} />
                </div>
              </button>
            )}
            
            {isExpanded && (
              <button
                onClick={onToggle}
                className="hover:bg-white/10 rounded-md p-1 transition-colors shrink-0 flex items-center justify-center"
              >
                <div className="size-[20px] relative rotate-180">
                  <IconParkOutlineExpandLeft />
                </div>
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-[16px] space-y-[4px] overflow-y-auto">
            {/* Simple Menu Items */}
            {menuItems
              .filter(item => item.label !== "Settings" || userRole === "Admin") // Hide Settings for non-admin users
              .map((item) => {
              const isActive = (item.label === "Dashboard" && currentPage === "dashboard") || (item.label === "Settings" && currentPage === "settings");
              const isDisabled = item.label === "Onboarding";
              
              const handleClick = () => {
                if (isDisabled) return;
                if (item.label === "Settings") {
                  onSettingsClick?.();
                } else if (item.label === "Dashboard") {
                  onDashboardClick?.();
                }
              };
              
              return (
                <button
                  key={item.path}
                  onClick={handleClick}
                  disabled={isDisabled}
                  className={`flex items-center gap-[12px] px-[10px] py-[8px] rounded-[10px] transition-colors w-full relative ${
                    isActive ? 'bg-white/10' : ''
                  } ${isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:bg-white/10'}`}
                >
                  <item.icon className="size-[20px] shrink-0" style={{ color: item.color }} />
                  {isExpanded && (
                    <span className="flex-1 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-white text-left">
                      {item.label}
                    </span>
                  )}
                  {/* Notification Badge for admin pending actions in Settings */}
                  {item.label === "Settings" && userRole === "Admin" && !isExpanded && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F04438] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <div className="h-[1px] bg-white/10 my-[16px]" />

            {/* Expandable Menu Items */}
            {expandableItems.map((item) => {
              const isTalent = item.label === "Talent";
              const isPerformance = item.label === "Performance";
              const isDisabled = item.label === "Learning";
              const isActive = isPerformance && currentPage === "performance";
              
              const handleClick = (e: React.MouseEvent) => {
                if (isDisabled) {
                  e.preventDefault();
                  return;
                }
                if (isTalent) {
                  e.preventDefault();
                  onTalentClick();
                } else if (isPerformance) {
                  e.preventDefault();
                  onPerformanceClick?.();
                }
              };

              return (
                <button
                  key={item.path}
                  onClick={handleClick}
                  className={`flex items-center gap-[12px] px-[10px] py-[8px] rounded-[10px] transition-colors group w-full ${
                    isDisabled ? 'cursor-not-allowed opacity-40' : isActive ? 'bg-white/10' : 'hover:bg-white/10 cursor-pointer'
                  }`}
                >
                  <item.icon className="size-[20px] shrink-0" style={{ color: item.color }} />
                  {isExpanded && (
                    <>
                      <span className="flex-1 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-white text-left">
                        {item.label}
                      </span>
                      <ChevronRight className="size-[16px] text-white shrink-0" />
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Profile Section */}
          <div className="px-[16px] pb-[16px] shrink-0">
            <button
              id="sidebar-profile-btn"
              ref={profileButtonRef}
              onClick={handleProfileClick}
              className={`flex items-center gap-[10px] rounded-[8px] hover:bg-white/10 transition-colors w-full ${
                isExpanded ? 'p-[8px]' : 'p-[8px] justify-center'
              }`}
            >
              <div className="relative shrink-0 size-[40px]">
                <div className="rounded-full overflow-hidden size-full">
                  <img alt="Profile" className="object-cover size-full" src={userEmail === "binavia@injourney.co.id" ? imgBinaviaAvatar : imgDimasAvatar} />
                </div>
                <SmeIcon />
              </div>
              {isExpanded && (
                <>
                  <div className="flex-1 flex flex-col items-start text-left">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-white leading-[20px]">
                      {userEmail === "binavia@injourney.co.id" ? "Binavia Wardhani" : "Dimas Sayyid"}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-white/70 leading-[16px]">{userEmail}</p>
                  </div>
                  <MoreVertical className="size-[20px] text-white shrink-0" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <ProfilePopup 
          onClose={() => setShowProfilePopup(false)}
          position={profilePopupPosition}
          isAbove={true}
          userEmail={userEmail}
          onProfileClick={() => {
            setShowProfilePopup(false);
            onProfileClick?.();
          }}
          onLogout={() => {
            setShowProfilePopup(false);
            onLogout?.();
          }}
        />
      )}
    </>
  );
}