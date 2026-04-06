import svgPaths from "./svg-vcwvras369";
import imgImageMelihatPotensiSektorPariwisataSebagaiPenggerakEkonomiDi2026 from "figma:asset/8fe256a21bd8a20c33dba8b9b05f95ea5cd7c5e1.png";

function ImageMelihatPotensiSektorPariwisataSebagaiPenggerakEkonomiDi() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[102px]" data-name="Image (Melihat Potensi Sektor Pariwisata Sebagai Penggerak Ekonomi di 2026)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgImageMelihatPotensiSektorPariwisataSebagaiPenggerakEkonomiDi2026} />
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

function Icon() {
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

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon />
    </div>
  );
}

function BackgroundImage() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16px]" data-name="BackgroundImage11">
      <Icon1 />
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
      <ImageMelihatPotensiSektorPariwisataSebagaiPenggerakEkonomiDi />
      <Frame3 />
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[16px] size-full" data-name="Card 2">
      <AnnouncementsSectionBackgroundImage />
    </div>
  );
}