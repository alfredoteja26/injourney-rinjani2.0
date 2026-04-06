import React, { useState, useRef } from "react";
import { Building2, TrendingUp, FileText, Users, Target, ListChecks, Settings, Briefcase, ClipboardList, ChevronRight as LucideChevronRight } from "lucide-react";
import svgPaths from "../imports/svg-8ssvqo528l";
import svgPathsCollapsed from "../imports/svg-dbtoy6iagk";
import patternPaths from "../imports/svg-vmu50jdyfl";
import imgImage295 from "figma:asset/c431b6a1465f2d5e74a13b698b185dc831318ab2.png";
import imgImage from "figma:asset/2291940396e4817f705a7fe6d36e22fae12fd803.png";
import imgImage1 from "figma:asset/974de0e7b8f746cd6c43fe01b8105870ae531cf3.png";
import ProfilePopup from "./ProfilePopup";

interface RinjaniSidebarProps {
  onBackClick?: () => void;
  onProfileClick?: () => void;
}

// Pattern Components
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

// Content Components
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

function Group() {
  return (
    <div className="absolute inset-[12.5%]" data-name="Group">
      <div className="absolute inset-[-6.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
          <g id="Group">
            <path d={svgPaths.p2a619580} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p16afb9e0} id="Vector_2" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconParkOutlineExpandLeft() {
  return (
    <div className="overflow-clip relative size-[20px]" data-name="icon-park-outline:expand-left">
      <Group />
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <LogoKlik />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <IconParkOutlineExpandLeft />
        </div>
      </div>
    </div>
  );
}

interface Frame6Props {
  onCollapseToggle: () => void;
  isExpanded: boolean;
}

function Frame6({ onCollapseToggle, isExpanded }: Frame6Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[232px]">
      <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
        <LogoKlik />
        <button 
          onClick={onCollapseToggle}
          className="absolute top-24 -right-3 z-50 p-1.5 rounded-full bg-[#FF9220] text-white shadow-md hover:bg-[#FF9220]/90 transition-colors border-2 border-[#006573]"
        >
          {isExpanded ? <LucideChevronRight size={14} className="rotate-180" /> : <LucideChevronRight size={14} />}
        </button>
      </div>
    </div>
  );
}

function ChevronRight() {
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

interface Frame10Props {
  onBackClick?: () => void;
}

function Frame10({ onBackClick }: Frame10Props) {
  const handleClick = (e: React.MouseEvent) => {
    if (onBackClick) {
      e.preventDefault();
      onBackClick();
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <ChevronRight />
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Back</p>
      </div>
    </button>
  );
}

function AssignmentInd() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="assignment-ind">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="assignment-ind">
          <path d={svgPaths.p2e2af300} fill="var(--fill-0, #FDFDFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Perfomance() {
  return (
    <div className="bg-[#00858a] relative rounded-[8px] shrink-0" data-name="Perfomance">
      
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <Perfomance />
      
    </div>
  );
}

function Frame15({ onBackClick }: Frame10Props) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame10 onBackClick={onBackClick} />
      <Container />
    </div>
  );
}

function UserPlus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="User plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_89_4119)" id="User plus">
          <path d={svgPaths.p18474200} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_89_4119">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#fdfdfd] w-[167px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">Talent Profiling</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content] text-left">Profiling talent</p>
    </div>
  );
}

function Button3() {
  return (
    <button
      className="relative rounded-[8px] shrink-0 w-full hover:bg-[#00858a]/50 transition-colors"
      data-name="Button"
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <UserPlus />
          <Container4 />
        </div>
      </div>
    </button>
  );
}

function UserCheck() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="User check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_89_4189)" id="User check">
          <path d={svgPaths.p331cdd00} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_89_4189">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#fdfdfd] w-[167px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">9-Box Assessment</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content] text-left">Based on Perfomance</p>
    </div>
  );
}

function Button2() {
  return (
    <button
      className="relative rounded-[8px] shrink-0 w-full hover:bg-[#00858a]/50 transition-colors"
      data-name="Button"
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <UserCheck />
          <Container3 />
        </div>
      </div>
    </button>
  );
}

function SupervisorAccount() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="supervisor-account">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="supervisor-account">
          <path d={svgPaths.p68fec00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#fdfdfd] w-[167px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">Succession Planning</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content] text-left">Longlist Employee</p>
    </div>
  );
}

function Button() {
  return (
    <button
      className="relative rounded-[8px] shrink-0 w-full hover:bg-[#00858a]/50 transition-colors"
      data-name="Button"
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <SupervisorAccount />
          <Container1 />
        </div>
      </div>
    </button>
  );
}

function WorkOutline() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="work-outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="work-outline">
          <path d={svgPaths.p30673700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#fdfdfd] w-[167px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">Job Tender (Internal)</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content] text-left">For internal employee</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full opacity-40 cursor-not-allowed" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <WorkOutline />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function AccountTree() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="account-tree">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="account-tree">
          <path d={svgPaths.p2f850270} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#fdfdfd] w-[167px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">Org. Management</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content]">Organization structure</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full opacity-40 cursor-not-allowed" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <AccountTree />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function ContainerEA() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#fdfdfd] w-[167px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">Enterprise Arch.</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content] text-left">Cost & Strategy</p>
    </div>
  );
}

function ButtonEA() {
  return (
    <button
      className="relative rounded-[8px] shrink-0 w-full hover:bg-[#00858a]/50 transition-colors"
      data-name="Button"
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Building2 className="text-white w-5 h-5" />
          <ContainerEA />
        </div>
      </div>
    </button>
  );
}

function ContainerCA() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#fdfdfd] w-[167px]" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-nowrap whitespace-pre">Career Aspiration</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content] text-left">Career Path</p>
    </div>
  );
}

function ButtonCA() {
  return (
    <button
      className="relative rounded-[8px] shrink-0 w-full hover:bg-[#00858a]/50 transition-colors"
      data-name="Button"
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <TrendingUp className="text-white w-5 h-5" />
          <ContainerCA />
        </div>
      </div>
    </button>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full gap-1">
      {/* Section 1: My Talent Journey */}
      <SectionTitle>My Talent Journey</SectionTitle>
      <MenuItem
        icon={<TrendingUp className="w-5 h-5" />}
        title="Career Aspiration"
        subtitle="Career Path"
      />
      <MenuItem
        icon={<FileText className="w-5 h-5" />}
        title="Development Plan"
        subtitle="IDP & Learning"
      />
      <MenuItem
        icon={<Briefcase className="w-5 h-5" />}
        title="Job Tender Marketplace"
        subtitle="Browse opportunities"
      />

      {/* Section 2: Talent Management */}
      <div className="mt-2">
        <SectionTitle>Talent Management</SectionTitle>
      </div>
      <MenuItem
        icon={<Users className="w-5 h-5" />}
        title="Talent Pool"
        subtitle="Manage talent database"
      />
      <MenuItem
        icon={<SupervisorAccount />}
        title="Succession Planning"
        subtitle="Future leadership"
      />
      <MenuItem
        icon={<Target className="w-5 h-5" />}
        title="Talent Classification"
        subtitle="9-Box & Performance"
      />
      <MenuItem
        icon={<ListChecks className="w-5 h-5" />}
        title="Talent Review"
        subtitle="Assessment & Feedback"
      />

      {/* Section 3: Administration */}
      <div className="mt-2">
        <SectionTitle>Administration</SectionTitle>
      </div>
      <MenuItem
        icon={<Briefcase className="w-5 h-5" />}
        title="Job Tender Headquarter"
        subtitle="Manage job postings"
      />
      <MenuItem
        icon={<ClipboardList className="w-5 h-5" />}
        title="IDP Headquarter"
        subtitle="Development plans HQ"
      />
    </div>
  );
}

function Frame2({ onBackClick }: Frame10Props) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full">
      <Frame15 onBackClick={onBackClick} />
      <Frame14 />
    </div>
  );
}

function Divider() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Divider">
      <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 232 1">
          <g id="Divider">
            <path d="M0 0.5H232" id="line" stroke="var(--stroke-0, #00858A)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SmeIcon() {
  return (
    <div className="absolute bottom-[-4px] right-[-4px] size-[16px]" data-name="sme icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="sme icon">
          <rect fill="var(--fill-0, #00A199)" height="15" rx="7.5" width="15" x="0.5" y="0.5" />
          <rect height="15" rx="7.5" stroke="var(--stroke-0, white)" width="15" x="0.5" y="0.5" />
          <path d={svgPaths.p24c2cd80} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#c1c7cd] content-stretch flex gap-[10px] items-center justify-center relative rounded-[9999px] shrink-0" data-name="Avatar">
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium inset-0 justify-center leading-[0] not-italic text-[1px] text-center text-white">
        <p className="leading-[normal]"> </p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white">
        <p className="leading-[normal]">TA</p>
      </div>
      <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name=".image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgImage} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgImage1} />
        </div>
      </div>
      <SmeIcon />
    </div>
  );
}

function Frame7() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-nowrap">
      <div className="flex flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] justify-start overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-white w-full">
        <p className="[white-space-collapse:collapse] leading-[24px] overflow-ellipsis overflow-hidden text-nowrap text-left">Dimas Sayyid</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-start overflow-ellipsis overflow-hidden relative shrink-0 text-[#fdfdfd] text-[12px] w-full">
        <p className="[white-space-collapse:collapse] leading-[16px] overflow-ellipsis overflow-hidden text-nowrap text-left">dimas@injourney.co.id</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <Avatar />
      <Frame7 />
    </div>
  );
}

function MoreVert() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="more-vert">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="more-vert">
          <path d={svgPaths.pa49a3f0} fill="var(--fill-0, #FDFDFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <Frame9 />
      <MoreVert />
    </div>
  );
}

interface Frame12Props {
  onProfileClick: () => void;
  profileButtonRef: React.RefObject<HTMLButtonElement>;
}

function Frame12({ onProfileClick, profileButtonRef }: Frame12Props) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Divider />
      <button
        ref={profileButtonRef}
        onClick={onProfileClick}
        className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[8px] shrink-0 w-[232px] hover:bg-white/10 transition-colors cursor-pointer p-[8px]"
        data-name="Profil Pekerja"
      >
        <Frame8 />
      </button>
    </div>
  );
}

interface Frame11Props {
  onBackClick?: () => void;
  onProfileClick: () => void;
  profileButtonRef: React.RefObject<HTMLButtonElement>;
}

function Frame11({ onBackClick, onProfileClick, profileButtonRef }: Frame11Props) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-[232px]">
      <Frame2 onBackClick={onBackClick} />
      <Frame12 onProfileClick={onProfileClick} profileButtonRef={profileButtonRef} />
    </div>
  );
}

interface Frame3Props {
  onBackClick?: () => void;
  onCollapseToggle: () => void;
  onProfileClick: () => void;
  profileButtonRef: React.RefObject<HTMLButtonElement>;
  isExpanded: boolean;
}

function Frame3({ onBackClick, onCollapseToggle, onProfileClick, profileButtonRef, isExpanded }: Frame3Props) {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px overflow-clip pb-[16px] pt-[12px] px-[16px] relative shrink-0 z-10">
      <Frame6 onCollapseToggle={onCollapseToggle} isExpanded={isExpanded} />
      <Frame11 onBackClick={onBackClick} onProfileClick={onProfileClick} profileButtonRef={profileButtonRef} />
    </div>
  );
}

export function RinjaniSidebar({ onBackClick, onProfileClick }: RinjaniSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const [profilePopupPosition, setProfilePopupPosition] = useState({ top: 0, left: 0 });

  const handleCollapseToggle = () => {
    setIsExpanded(!isExpanded);
  };

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

  return (
    <>
      <div 
        className={`bg-[#006573] content-stretch flex flex-col gap-[24px] items-start relative h-full transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-[264px]' : 'w-[64px]'
        }`} 
        data-name="Sidebar Platforms"
      >
        {isExpanded ? (
          <>
            <Frame3 
              onBackClick={onBackClick} 
              onCollapseToggle={handleCollapseToggle}
              onProfileClick={handleProfileClick}
              profileButtonRef={profileButtonRef}
              isExpanded={isExpanded}
            />
            <PatternBackground />
          </>
        ) : (
          <CollapsedSidebar 
            onCollapseToggle={handleCollapseToggle}
            onBackClick={onBackClick}
            onProfileClick={handleProfileClick}
            profileButtonRef={profileButtonRef}
          />
        )}
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <ProfilePopup 
          onClose={() => setShowProfilePopup(false)}
          position={profilePopupPosition}
          isAbove={true}
          onProfileClick={() => {
            setShowProfilePopup(false);
            onProfileClick?.();
          }}
        />
      )}
    </>
  );
}

// Collapsed Sidebar Components
interface CollapsedSidebarProps {
  onCollapseToggle: () => void;
  onBackClick?: () => void;
  onProfileClick: () => void;
  profileButtonRef: React.RefObject<HTMLButtonElement>;
}

function CollapsedSidebar({ onCollapseToggle, onBackClick, onProfileClick, profileButtonRef }: CollapsedSidebarProps) {
  return (
    <div className="flex flex-col justify-between h-full pb-[16px] pt-[12px] px-[16px] z-10 relative">
      {/* Logo and Toggle */}
      <div className="flex flex-col gap-[24px] items-center">
        <button onClick={onCollapseToggle} className="relative shrink-0 size-[40px] hover:opacity-80 transition-opacity">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[300%] left-[-235.98%] max-w-none top-[-90%] w-[841.96%]" src={imgImage295} />
          </div>
        </button>

        {/* Back button icon */}
        <button 
          onClick={(e) => {
            if (onBackClick) {
              e.preventDefault();
              onBackClick();
            }
          }}
          className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer p-2"
        >
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <LucideChevronRight />
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-[#00858A] w-full" />

        {/* Menu Icons */}
        <div className="flex flex-col gap-[16px] items-center w-full">
          <button className="bg-[#00858a] p-[8px] rounded-[8px] hover:opacity-80 transition-opacity">
            <UserPlus />
          </button>
          <button className="p-[8px] rounded-[8px] hover:bg-white/10 transition-colors">
            <UserCheck />
          </button>
          <button className="p-[8px] rounded-[8px] hover:bg-white/10 transition-colors">
            <SupervisorAccount />
          </button>
        </div>
      </div>

      {/* Profile - Bottom */}
      <div className="flex flex-col gap-[16px] items-center">
        <div className="h-[1px] bg-[#00858A] w-full" />
        <button
          ref={profileButtonRef}
          onClick={onProfileClick}
          className="p-[2px] rounded-[8px] hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Avatar />
        </button>
      </div>
    </div>
  );
}

// Section Title Component
interface SectionTitleProps {
  children: React.ReactNode;
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <p 
      className="text-white/50 uppercase tracking-wide px-3 py-2 font-semibold"
      style={{ 
        fontSize: 'var(--text-sm)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {children}
    </p>
  );
}

// Menu Item Component
interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  disabled?: boolean;
}

function MenuItem({ icon, title, subtitle, disabled = false }: MenuItemProps) {
  const Component = disabled ? 'div' : 'button';
  
  return (
    <Component
      className={`relative rounded-lg shrink-0 w-full transition-colors ${
        disabled 
          ? 'opacity-40 cursor-not-allowed' 
          : 'hover:bg-white/10 cursor-pointer'
      }`}
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-3 items-center py-2.5 relative w-full px-[12px] py-[8px]">
          <div className="relative shrink-0 size-5 text-white">
            {icon}
          </div>
          <div className="content-stretch flex flex-col gap-1 items-start not-italic relative shrink-0 text-white flex-1">
            <p 
              className="font-semibold leading-6 relative shrink-0 text-nowrap whitespace-pre"
              style={{ 
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {title}
            </p>
            <p 
              className="font-normal leading-5 relative shrink-0 text-left text-white/70"
              style={{ 
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </Component>
  );
}