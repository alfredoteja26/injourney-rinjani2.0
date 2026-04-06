import React from "react";
import { 
  Building2, 
  TrendingUp, 
  Target, 
  Users, 
  BookOpen, 
  GitBranch, 
  LayoutDashboard 
} from "lucide-react";
import svgPaths from "../imports/svg-8ssvqo528l";
import patternPaths from "../imports/svg-vmu50jdyfl";
import imgImage295 from "figma:asset/c431b6a1465f2d5e74a13b698b185dc831318ab2.png";
import { cn } from "./ui/utils";

interface PerformanceSidebarProps {
  onBackClick: () => void;
  currentPage: 'my-kpi' | 'my-team-kpi' | 'library' | 'tree' | 'headquarter';
  onNavigate: (page: 'my-kpi' | 'my-team-kpi' | 'library' | 'tree' | 'headquarter') => void;
}

// Pattern Components (Reused from RinjaniSidebar for consistency)
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

// Common UI Components

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center not-italic relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">RINJANI</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[8px] text-neutral-50 w-[82px]">Integrated Talent Management System</p>
    </div>
  );
}

function LogoKlik() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Logo Klik">
      <div className="relative shrink-0 size-[40px]" data-name="image 295">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[300%] left-[-235.98%] max-w-none top-[-90%] w-[841.96%]" src={imgImage295} />
        </div>
      </div>
      <Frame13 />
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <div className="relative size-[24px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-right">
          <path d={svgPaths.p2fbe6b00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10({ onBackClick }: { onBackClick: () => void }) {
  return (
    <button 
      onClick={(e) => { e.preventDefault(); onBackClick(); }}
      className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <ChevronRightIcon />
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Back</p>
      </div>
    </button>
  );
}

function PerfomanceIcon() {
    return (
        <div className="relative shrink-0 size-[20px]">
           <LayoutDashboard className="text-[#FDFDFD] w-full h-full" />
        </div>
    )
}

function Perfomance() {
  return (
    <div className="bg-[#00858a] relative rounded-[8px] shrink-0" data-name="Perfomance">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center p-[8px] relative">
        <PerfomanceIcon />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <Perfomance />
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white whitespace-pre-wrap">Performance</p>
    </div>
  );
}

function Frame15({ onBackClick }: { onBackClick: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame10 onBackClick={onBackClick} />
      <Container />
    </div>
  );
}

// Menu Items Logic

interface MenuItemProps {
    label: string;
    subLabel: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}

function MenuItem({ label, subLabel, icon, isActive, onClick }: MenuItemProps) {
    return (
      <button
        onClick={onClick}
        className={cn(
            "relative rounded-[8px] shrink-0 w-full transition-colors",
            isActive ? "bg-[#00858a]" : "hover:bg-[#00858a]/50"
        )}
        data-name="Button"
      >
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
            <div className="relative shrink-0 size-[20px] text-white">
                {icon}
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#fdfdfd] flex-1">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">{label}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content] text-left opacity-90">{subLabel}</p>
            </div>
          </div>
        </div>
      </button>
    );
  }

function Frame14({ currentPage, onNavigate }: { currentPage: string, onNavigate: (page: any) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full gap-[4px]">
      <MenuItem 
        label="My KPI" 
        subLabel="Individual Performance" 
        icon={<Target />} 
        isActive={currentPage === 'my-kpi'}
        onClick={() => onNavigate('my-kpi')}
      />
      <MenuItem 
        label="My Team KPI" 
        subLabel="Team Management" 
        icon={<Users />} 
        isActive={currentPage === 'my-team-kpi'}
        onClick={() => onNavigate('my-team-kpi')}
      />
      <MenuItem 
        label="KPI Library" 
        subLabel="Standard Indicators" 
        icon={<BookOpen />} 
        isActive={currentPage === 'library'}
        onClick={() => onNavigate('library')}
      />
      <MenuItem 
        label="KPI Tree" 
        subLabel="Alignment View" 
        icon={<GitBranch />} 
        isActive={currentPage === 'tree'}
        onClick={() => onNavigate('tree')}
      />
      <MenuItem 
        label="KPI Headquarter" 
        subLabel="Admin & Config" 
        icon={<Building2 />} 
        isActive={currentPage === 'headquarter'}
        onClick={() => onNavigate('headquarter')}
      />
    </div>
  );
}

function Frame2({ onBackClick, currentPage, onNavigate }: any) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full">
      <Frame15 onBackClick={onBackClick} />
      <div className="h-0 relative shrink-0 w-full" data-name="line">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 232 1">
            <path d="M0 0.5H232" id="line" stroke="var(--stroke-0, #00858A)" />
          </svg>
        </div>
      </div>
      <Frame14 currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}

export function PerformanceSidebar({ onBackClick, currentPage, onNavigate }: PerformanceSidebarProps) {
  return (
    <div className="bg-[#006573] box-border content-stretch flex flex-col h-full items-start justify-start overflow-hidden relative shrink-0 w-[264px]">
      <PatternBackground />
      <div className="absolute content-stretch flex flex-col gap-[32px] h-full items-start justify-start left-0 overflow-y-auto overflow-x-hidden p-[16px] top-0 w-[264px] z-[1]">
        <Frame2 onBackClick={onBackClick} currentPage={currentPage} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
