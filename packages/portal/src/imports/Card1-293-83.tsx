import svgPaths from "./svg-lp9z9h7ahk";

function Icon() {
  return (
    <div className="absolute inset-[20.83%_8.27%_20.84%_8.34%]" data-name="Icon">
      <div className="absolute inset-[-5.71%_-4%_-5.72%_-4%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.0379 39.0008">
          <g id="Icon">
            <path d={svgPaths.p19af7d80} id="Vector" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            <path d="M51.9969 14.5009V29.5008" id="Vector_2" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            <path d={svgPaths.p17ec3540} id="Vector_3" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-1/2 overflow-clip size-[60px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icon">
      <Icon />
    </div>
  );
}

function BackgroundImage1() {
  return (
    <div className="aspect-[40/40] bg-[rgba(90,226,195,0.2)] relative rounded-[12px] self-stretch shrink-0" data-name="BackgroundImage16">
      <Icon1 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#f4fef6] relative rounded-[6px] shrink-0" data-name="Container">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.333px] not-italic relative shrink-0 text-[#007a55] text-[10px] text-nowrap">Learning</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#00a199] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame">
      <Container />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#717680] text-[10px] text-nowrap">12 Maret 2026</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal h-[46px] not-italic relative shrink-0 text-nowrap w-full" data-name="Frame">
      <p className="absolute leading-[24px] left-0 text-[#181d27] text-[16px] top-[-1px]">Individual Learning Dashboard Kini Tersedia - Track Progress Pembelajaran Anda</p>
      <p className="absolute leading-[18px] left-0 text-[#717680] text-[12px] top-[28.5px]">Pantau learning hours YTD, course completion, certificates, dan learning path personal Anda dalam satu dashboard interaktif.</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute contents inset-[20.83%]" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 1.33333">
            <path d="M0.666665 0.666665H10" id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]" data-name="Vector_2">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00003 10.6667">
            <path d={svgPaths.p23aa9d00} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon2 />
    </div>
  );
}

function BackgroundImage() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16px]" data-name="BackgroundImage11">
      <Icon3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative rounded-[6px] shrink-0" data-name="Frame">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#00858a] text-[14px] text-nowrap">Lihat Dashboard Saya</p>
      <BackgroundImage />
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}

function AnnouncementsSectionBackgroundImage() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="AnnouncementsSectionBackgroundImage">
      <BackgroundImage1 />
      <Frame3 />
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[16px] size-full" data-name="Card 1">
      <AnnouncementsSectionBackgroundImage />
    </div>
  );
}