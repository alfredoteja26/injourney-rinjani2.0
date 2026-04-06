import { useRef, useEffect, useState } from "react";
import svgPaths from "../imports/svg-fqeswxk440";
import imgDimasAvatar from "figma:asset/7e7006a4927bcec25694136f88b3db870eacf73b.png";
import imgBinaviaAvatar from "figma:asset/7831b9ec4303df4fbb366388ea0a210b01e2e804.png";

interface ProfilePopupProps {
  onClose: () => void;
  position?: { top: number; left: number };
  isAbove?: boolean;
  onProfileClick?: () => void;
  onLogout?: () => void;
  userEmail?: string;
  userName?: string;
  jobTitle?: string;
}

function SmeIcon() {
  return (
    <div className="absolute bottom-[-4px] right-[-4px] size-[20px]" data-name="sme icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="sme icon">
          <rect fill="var(--fill-0, #00A199)" height="19" rx="9.5" width="19" x="0.5" y="0.5" />
          <rect height="19" rx="9.5" stroke="var(--stroke-0, white)" width="19" x="0.5" y="0.5" />
          <path d={svgPaths.p3a1f2d00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Avatar({ userEmail }: { userEmail?: string }) {
  const isBinavia = userEmail === "binavia@injourney.co.id";
  const avatarImage = isBinavia ? imgBinaviaAvatar : imgDimasAvatar;
  
  return (
    <div className="bg-[#c1c7cd] content-stretch flex gap-[10px] items-center justify-center relative rounded-[9999px] shrink-0" data-name="Avatar">
      <div className="relative rounded-[9999px] shrink-0 size-[48px]" data-name=".image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={avatarImage} />
        </div>
      </div>
      <SmeIcon />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[21.391px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[11px] not-italic text-[#717680] text-[11px] text-center text-nowrap top-[0.5px] translate-x-[-50%] whitespace-pre">NIK:</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[52.227px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[26px] not-italic text-[#181d27] text-[11px] text-center text-nowrap top-[0.5px] translate-x-[-50%] whitespace-pre">26010001</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-neutral-100 box-border content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative rounded-[1.67772e+07px] shrink-0" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#181d27] text-[16px] text-center text-nowrap whitespace-pre">Dimas Sayyid</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#181d27] text-[12px] text-nowrap whitespace-pre">VP Human Capital Strategy</p>
      <Container />
    </div>
  );
}

function Frame({ userEmail }: { userEmail?: string }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Avatar userEmail={userEmail} />
      <Container1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#f4fef6] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[49.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[49.5px] items-start not-italic relative text-nowrap w-full whitespace-pre">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#717680] text-[10px]">Unit Kerja</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#181d27] text-[12px]">Direktorat Human Capital</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#717680] text-[11px]">InJourney Holding</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(245,245,245,0.5)] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[12px] items-start p-[12px] relative w-full">
          <Container2 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2f8e7e80} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17070980} id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f4fef6] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow h-[33px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[33px] items-start not-italic relative text-nowrap w-full whitespace-pre">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#717680] text-[10px]">Email</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#181d27] text-[12px]">dimas.sayyid@injourney.id</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[rgba(245,245,245,0.5)] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[12px] items-start p-[12px] relative w-full">
          <Container5 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#f4fef6] relative rounded-[8px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start not-italic relative text-nowrap w-full whitespace-pre">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#717680] text-[10px]">Atasan Langsung</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#181d27] text-[12px]">Herdy Harman</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#717680] text-[11px]">Director of HR and Digital</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(245,245,245,0.5)] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[12px] items-start p-[12px] relative w-full">
          <Container8 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container7 />
      <Container10 />
    </div>
  );
}

function ArrowForward() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="arrow-forward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow-forward">
          <path d={svgPaths.p67c480} fill="var(--fill-0, black)" fillOpacity="0.54" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap whitespace-pre">Lihat Profil Lengkap</p>
          <ArrowForward />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-full hover:bg-gray-50 transition-colors cursor-pointer" data-name="Button">
      <ButtonBase />
    </button>
  );
}

function ButtonBase1() {
  return (
    <div className="basis-0 bg-[#d92d20] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[14px] py-[8px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Log Out</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d92d20] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button1({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-full hover:bg-[#b32418] transition-colors cursor-pointer" data-name="Button">
      <ButtonBase1 />
    </button>
  );
}

function Frame1({ onProfileClick, onLogout }: { onProfileClick?: () => void; onLogout?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Button onClick={onProfileClick} />
      <Button1 onClick={onLogout} />
    </div>
  );
}

function Container12({ onProfileClick, onLogout, userEmail }: { onProfileClick?: () => void; onLogout?: () => void; userEmail?: string }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-center p-[16px] relative shrink-0" data-name="Container">
      <Frame userEmail={userEmail} />
      <Container11 />
      <Frame1 onProfileClick={onProfileClick} onLogout={onLogout} />
    </div>
  );
}

export default function ProfilePopup({ onClose, position, isAbove, onProfileClick, onLogout, userEmail }: ProfilePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupHeight, setPopupHeight] = useState(0);

  useEffect(() => {
    if (popupRef.current) {
      setPopupHeight(popupRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Calculate position - if isAbove is true, position above the button
  const getPositionStyle = () => {
    if (!position) return { bottom: '16px' };
    
    if (isAbove) {
      // Position above the button, 8px from left of sidebar
      return {
        bottom: `${window.innerHeight - position.top + 8}px`,
        left: '8px',
      };
    } else {
      // Position to the right of the button
      return {
        top: `${position.top}px`,
        left: `${position.left}px`,
      };
    }
  };

  return (
    <div 
      ref={popupRef}
      className="fixed z-[100] w-[280px]"
      style={getPositionStyle()}
    >
      <div className="bg-white box-border content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Profile Pop Up">
        <Container12 onProfileClick={onProfileClick} onLogout={onLogout} userEmail={userEmail} />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
    </div>
  );
}