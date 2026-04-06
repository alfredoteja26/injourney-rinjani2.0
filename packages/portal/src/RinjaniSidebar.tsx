import { Link, useLocation } from "react-router";
import { useState, useRef } from "react";
import { 
  Target, 
  ClipboardList, 
  Briefcase, 
  Users, 
  GitBranch, 
  Grid3X3, 
  FileCheck, 
  Building, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical 
} from "lucide-react";
import patternBg from "figma:asset/4dfc7b04f7c110e53adb631e9c207269b8e06297.png";
import imgLogo from "figma:asset/c431b6a1465f2d5e74a13b698b185dc831318ab2.png";
import imgAvatar from "figma:asset/2291940396e4817f705a7fe6d36e22fae12fd803.png";
import imgAvatar1 from "figma:asset/974de0e7b8f746cd6c43fe01b8105870ae531cf3.png";
import ProfilePopup from "./ProfilePopup";

interface RinjaniSidebarProps {
  onBackClick?: () => void;
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

function PatternBackground() {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-plus-lighter"
      style={{
        backgroundImage: `url(${patternBg})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '150px',
        backgroundPosition: 'top center'
      }}
    />
  );
}

// --- Navigation Data & Components ---

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
  description?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navigationGroups: NavGroup[] = [
  {
    title: "My Talent Journey",
    items: [
      { label: "Career Aspiration", path: "/career-aspiration", icon: Target, description: "Kelola Aspirasi Karir Pekerja" },
      { label: "Development Plan", path: "/idp", icon: ClipboardList, description: "Individual Development" },
      { label: "Job Tender Marketplace", path: "/explore", icon: Briefcase, description: "Internal Job Opportunities" }
    ]
  },
  {
    title: "Talent Management",
    items: [
      { label: "Talent Pool", path: "/talent-pool", icon: Users, description: "Profiling talent" },
      { label: "Succession Planning", path: "/succession-planning", icon: GitBranch, description: "Longlist Employee" },
      { label: "Talent Classification", path: "/talent-mapping", icon: Grid3X3, description: "Performance Assessment" },
      { label: "Talent Review", path: "/talent-review", icon: FileCheck, description: "Periodic Review" }
    ]
  },
  {
    title: "Administration",
    items: [
      { label: "Job Tender Headquarters", path: "/admin/job-tender", icon: Briefcase, description: "Manage Tenders" },
      { label: "IDP Headquarters", path: "/admin/idp", icon: ClipboardList, description: "IDP Administration" }
    ]
  }
];

function NavLink({ item, isCollapsed }: { item: NavItem; isCollapsed: boolean }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.path);

  return (
    <Link
      to={item.path}
      className={`
        relative group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' 
          : 'text-neutral-50 hover:bg-white/10 hover:text-white'
        }
      `}
      title={isCollapsed ? item.label : undefined}
    >
      <item.icon 
        size={20} 
        strokeWidth={1.5}
        className={`shrink-0 ${isActive ? 'text-accent' : 'text-neutral-200 group-hover:text-white'}`} 
      />
      
      {!isCollapsed && (
        <div className="flex flex-col min-w-0">
          <span className="font-body text-sm font-medium leading-tight truncate">
            {item.label}
          </span>
          {item.description && (
            <span className="font-body text-xs text-white/60 leading-tight truncate mt-0.5">
              {item.description}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

// --- Layout Components ---

export function RinjaniSidebar({ onBackClick }: RinjaniSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const [profilePopupPosition, setProfilePopupPosition] = useState({ top: 0, left: 0 });

  const handleCollapseToggle = () => setIsExpanded(!isExpanded);

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

  return (
    <>
      <aside 
        className={`
          relative h-full flex flex-col bg-[#006573] text-white transition-all duration-300 ease-in-out shadow-xl z-50
          ${isExpanded ? 'w-[250px]' : 'w-[64px]'}
        `}
      >
        {/* Background Pattern */}
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
              <button onClick={handleCollapseToggle} className="relative shrink-0 size-[40px] mx-auto hover:opacity-80 transition-opacity">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="Logo" className="absolute h-[300%] left-[-235.98%] max-w-none top-[-90%] w-[841.96%]" src={imgLogo} />
                </div>
              </button>
            )}
          </div>

          {/* Floating Toggle Button (Restored) */}
          <button 
            onClick={handleCollapseToggle}
            className="absolute top-24 -right-3 z-50 p-1.5 rounded-full bg-accent text-white shadow-md hover:bg-accent-hover transition-colors border-2 border-[#006573]"
          >
            {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          {/* Back Navigation (If expanded) */}
          {isExpanded && onBackClick && (
            <div className="px-3 mt-2 mb-4">
              <button 
                onClick={onBackClick}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group w-full"
              >
                <div className="p-1 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors">
                  <ChevronLeft size={14} />
                </div>
                <span className="font-heading font-semibold text-sm">Back to Main Menu</span>
              </button>
            </div>
          )}

          {/* Navigation Items (Scrollable) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {navigationGroups.map((group, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                {isExpanded ? (
                  <h3 className="px-3 mb-2 font-heading text-sm font-bold uppercase tracking-wider text-white/50">
                    {group.title}
                  </h3>
                ) : (
                  <div className="h-px w-8 bg-white/10 mx-auto mb-2" />
                )}
                
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <NavLink key={item.path} item={item} isCollapsed={!isExpanded} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* User Profile Section (Fixed Bottom) */}
          <div className="px-[12px] pb-[16px] shrink-0">
            <button
              ref={profileButtonRef}
              onClick={handleProfileClick}
              className={`
                flex items-center gap-[10px] rounded-[8px] hover:bg-white/10 transition-colors w-full 
                ${isExpanded ? 'p-[8px]' : 'p-[8px] justify-center'}
              `}
            >
              <div className="relative shrink-0 size-[40px]">
                <div className="rounded-full overflow-hidden size-full">
                  <img alt="Profile" className="object-cover size-full" src={imgAvatar} />
                  <img alt="Profile overlay" className="absolute inset-0 object-cover size-full" src={imgAvatar1} />
                </div>
                <SmeIcon />
              </div>
              
              {isExpanded && (
                <>
                  <div className="flex-1 flex flex-col items-start text-left min-w-0">
                    <p className="font-heading font-semibold text-[14px] text-white leading-[20px] truncate w-full">Dimas Sayyid</p>
                    <p className="font-body font-normal text-[11px] text-white/70 leading-[16px] truncate w-full">dimas@injourney.co.id</p>
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
        />
      )}
    </>
  );
}
