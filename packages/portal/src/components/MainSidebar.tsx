import React, { useState, useRef, useEffect } from "react";
import { Home, FileText, Settings, Trophy, Users, GraduationCap, ChevronRight, MoreVertical, ShieldCheck, ClipboardList, ChevronDown, CheckCircle2, Circle, Bell, BarChart3, Mail } from "lucide-react";
import imgLogo from "figma:asset/c431b6a1465f2d5e74a13b698b185dc831318ab2.png";
import imgDimasAvatar from "figma:asset/7e7006a4927bcec25694136f88b3db870eacf73b.png";
import imgBinaviaAvatar from "figma:asset/7831b9ec4303df4fbb366388ea0a210b01e2e804.png";
import imgCollapseIcon from "figma:asset/eae4ac5cdde79002268cbc71d3c95277be4b5038.png";
import patternPaths from "../imports/svg-vmu50jdyfl";
import ProfilePopup from "./ProfilePopup";
import IconParkOutlineExpandLeft from "../imports/IconParkOutlineExpandLeft";
import { NewEmployeeChecklistItem } from "./onboarding/types";

interface MainSidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  onTalentClick: () => void;
  currentPage?: "dashboard" | "talent" | "myprofile" | "settings" | "survey" | "analytics" | "mail";
  onProfileClick?: () => void;
  onLogout?: () => void;
  onSettingsClick?: () => void;
  onDashboardClick?: () => void;
  onSurveyClick?: () => void;
  onAnalyticsClick?: () => void;
  onMailClick?: () => void;
  userRole?: "Admin" | "User";
  userEmail?: string;
  checklistItems?: NewEmployeeChecklistItem[];
  onChecklistItemComplete?: (itemId: string) => void;
  onNotifyPIC?: (itemId: string) => void;
  showChecklist?: boolean;
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

// Pattern Background Components
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
      <div className="absolute inset-[-1.24%_-1.24%_-1.23%_-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p17c5e980} id="path163" stroke="url(#paint0_linear_89_4793)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4793" x1="22.869" x2="22.869" y1="0.552482" y2="45.1868">
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
      <div className="absolute inset-[-1.24%_-1.23%_-1.24%_-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p14ff0e80} id="path165" stroke="url(#paint0_linear_89_4128)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4128" x1="22.869" x2="22.869" y1="0.552482" y2="45.1868">
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
      <div className="absolute inset-[-1.24%_-1.24%_-1.23%_-1.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g id="Clip path group">
            <path d={patternPaths.p22162c00} id="path167" stroke="url(#paint0_linear_89_4144)" strokeMiterlimit="10" strokeOpacity="0.08" strokeWidth="1.10267" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_89_4144" x1="22.8737" x2="22.8737" y1="0.551333" y2="45.1857">
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
      <div className="[grid-area:1_/_1] flex h-[44.623px] items-center justify-center ml-[0.01%] mt-[50.03%] relative w-[44.621px]">
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

export function MainSidebar({ isExpanded, onToggle, onTalentClick, currentPage, onProfileClick, onLogout, onSettingsClick, onDashboardClick, onSurveyClick, onAnalyticsClick, onMailClick, userRole, userEmail, checklistItems, onChecklistItemComplete, onNotifyPIC, showChecklist }: MainSidebarProps) {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isChecklistExpanded, setIsChecklistExpanded] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const [profilePopupPosition, setProfilePopupPosition] = useState({ top: 0, left: 0 });

  const handleProfileClick = () => {
    if (profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      setProfilePopupPosition({
        top: rect.top,
        left: rect.right + 12,
      });
      setShowProfilePopup(!showProfilePopup);
    }
  };

  // Calculate checklist progress
  const completedCount = checklistItems?.filter(item => item.completed).length || 0;
  const totalCount = checklistItems?.length || 0;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const hasIncompleteItems = completedCount < totalCount;

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/", color: "#FDFDFD" },
    { icon: ClipboardList, label: "Survey", path: "/survey", color: "#FDFDFD" },
    ...(userRole === "Admin" ? [{ icon: BarChart3, label: "Analytics", path: "/analytics", color: "#FDFDFD" }] : []),
    ...(userRole === "Admin" ? [{ icon: Mail, label: "Mail", path: "/mail", color: "#FDFDFD" }] : []),
    { icon: Settings, label: "Settings", path: "/settings", color: "#FDFDFD" },
  ];

  const expandableItems = [
    { icon: Trophy, label: "Performance", path: "/performance", color: "#FDFDFD" },
    { icon: Users, label: "Talent", path: "/talent-pool", color: "#FDFDFD" },
    { icon: GraduationCap, label: "Learning", path: "/learning", color: "#FDFDFD" },
  ];

  return (
    <>
      <aside 
        className={`
          relative h-full flex flex-col bg-[#006573] text-white transition-all duration-300 ease-in-out shadow-xl
          ${isExpanded ? 'w-[264px]' : 'w-[64px]'}
        `}
      >
        {/* Pattern Background */}
        <PatternBackground />
        
        {/* Content Layer (z-10 to sit above pattern) */}
        <div className="relative z-10 flex flex-col h-full w-full">
          
          {/* Header Section */}
          <div className="flex items-center justify-between px-[12px] py-[12px] shrink-0">
            {isExpanded ? (
              <div className="flex gap-[8px] items-center">
                <div className="relative shrink-0 size-[40px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="Logo" className="absolute h-[300%] left-[-235.98%] max-w-none top-[-90%] w-[841.96%]" src={imgLogo} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="font-heading font-bold leading-[1.2] text-[16px] text-white">RINJANI</p>
                  <p className="font-body font-medium leading-[1.5] text-[8px] text-neutral-50 w-[82px]">Integrated Talent Management System</p>
                </div>
              </div>
            ) : (
              <button onClick={onToggle} className="relative shrink-0 size-[40px] mx-auto hover:opacity-80 transition-opacity">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="Logo" className="absolute h-[300%] left-[-235.98%] max-w-none top-[-90%] w-[841.96%]" src={imgLogo} />
                </div>
              </button>
            )}
          </div>

          {/* Floating Toggle Button (Yellow) */}
          <button 
            onClick={onToggle}
            className="absolute top-24 -right-3 z-50 p-1.5 rounded-full bg-[#FF9220] text-white shadow-md hover:bg-[#FF9220]/90 transition-colors border-2 border-[#006573]"
          >
            {isExpanded ? <ChevronRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-[16px] space-y-[4px] overflow-y-auto">
            {/* Simple Menu Items */}
            {menuItems
              .filter(item => item.label !== "Settings" || userRole === "Admin") // Hide Settings for non-admin users
              .map((item) => {
              const isActive = (item.label === "Dashboard" && currentPage === "dashboard") || (item.label === "Settings" && currentPage === "settings") || (item.label === "Survey" && currentPage === "survey") || (item.label === "Analytics" && currentPage === "analytics") || (item.label === "Mail" && currentPage === "mail");
              
              const handleClick = () => {
                if (item.label === "Settings") {
                  onSettingsClick?.();
                } else if (item.label === "Dashboard") {
                  onDashboardClick?.();
                } else if (item.label === "Survey") {
                  onSurveyClick?.();
                } else if (item.label === "Analytics") {
                  onAnalyticsClick?.();
                } else if (item.label === "Mail") {
                  onMailClick?.();
                }
              };
              
              return (
                <button
                  key={item.path}
                  onClick={handleClick}
                  className={`flex items-center gap-[12px] px-[10px] py-[8px] rounded-[10px] transition-colors w-full relative ${
                    isActive ? 'bg-white/10' : ''
                  } cursor-pointer hover:bg-white/10`}
                >
                  <item.icon className="size-[20px] shrink-0" style={{ color: item.color }} />
                  {isExpanded && (
                    <span className="flex-1 font-body font-semibold text-[14px] text-white text-left">
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
              const isDisabled = item.label === "Performance" || item.label === "Learning";
              
              const handleClick = (e: React.MouseEvent) => {
                if (isDisabled) {
                  e.preventDefault();
                  return;
                }
                if (isTalent) {
                  e.preventDefault();
                  onTalentClick();
                }
              };

              return (
                <button
                  key={item.path}
                  onClick={handleClick}
                  className={`flex items-center gap-[12px] px-[10px] py-[8px] rounded-[10px] transition-colors group w-full ${
                    isDisabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-white/10 cursor-pointer'
                  }`}
                >
                  <item.icon className="size-[20px] shrink-0" style={{ color: item.color }} />
                  {isExpanded && (
                    <>
                      <span className="flex-1 font-body font-semibold text-[14px] text-white text-left">
                        {item.label}
                      </span>
                      <ChevronRight className="size-[16px] text-white shrink-0" />
                    </>
                  )}
                </button>
              );
            })}

            {/* Checklist Section - Only show if there are incomplete items */}
            {showChecklist && checklistItems && checklistItems.length > 0 && hasIncompleteItems && (
              <>
                <div className="h-[1px] bg-white/10 my-[16px]" />
                
                <div>
                  <button
                    onClick={() => setIsChecklistExpanded(!isChecklistExpanded)}
                    className="flex items-center gap-[12px] px-[10px] py-[8px] rounded-[10px] transition-colors w-full hover:bg-white/10 cursor-pointer relative"
                  >
                    <ClipboardList className="size-[20px] shrink-0 text-white" />
                    {isExpanded && (
                      <>
                        <div className="flex-1 flex flex-col items-start">
                          <span className="font-body font-semibold text-[14px] text-white text-left">
                            Orientasi
                          </span>
                          <span className="font-body font-normal text-[11px] text-white/70 text-left">
                            {completedCount}/{totalCount} selesai
                          </span>
                        </div>
                        <ChevronDown className={`size-[16px] text-white shrink-0 transition-transform ${isChecklistExpanded ? 'rotate-180' : ''}`} />
                      </>
                    )}
                    {/* Badge for incomplete items */}
                    {!isExpanded && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F04438] rounded-full text-[10px] text-white flex items-center justify-center font-semibold">
                        {totalCount - completedCount}
                      </div>
                    )}
                  </button>

                  {/* Checklist Items - Only show when expanded */}
                  {isExpanded && isChecklistExpanded && (
                    <>
                      <div className="mt-2 space-y-1 max-h-64 overflow-y-auto px-2">
                        {checklistItems.map((item) => (
                          <div key={item.id} className="w-full">
                            <button
                              onClick={() => !item.completed && onChecklistItemComplete?.(item.id)}
                              disabled={item.completed}
                              className="w-full flex items-start gap-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors text-left group"
                            >
                              {item.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-[#00A199] shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="w-4 h-4 text-white/50 shrink-0 mt-0.5 group-hover:text-white/80 transition-colors" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className={`font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] ${
                                  item.completed ? 'text-white/50 line-through' : 'text-white'
                                }`}>
                                  {item.title}
                                </p>
                                {item.pic && !item.completed && (
                                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-white/50 mt-0.5">
                                    PIC: {item.pic}
                                  </p>
                                )}
                              </div>
                            </button>
                            {/* Notify PIC Button */}
                            {!item.completed && item.pic && onNotifyPIC && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNotifyPIC(item.id);
                                }}
                                className="ml-8 mt-1 mb-2 px-2 py-1 rounded text-[10px] bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1"
                                style={{
                                  color: 'white',
                                  fontFamily: "'Inter:Medium',sans-serif",
                                  fontWeight: 'var(--font-weight-medium)'
                                }}
                              >
                                <Bell className="w-3 h-3" />
                                Hubungi PIC
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Progress Bar - show when not expanded or collapsed */}
                  {isExpanded && !isChecklistExpanded && (
                    <div className="px-[10px] mt-2">
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00A199] transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
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
      </aside>

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