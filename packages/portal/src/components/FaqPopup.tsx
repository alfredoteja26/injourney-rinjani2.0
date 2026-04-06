import svgPaths from "../imports/svg-sig063ny5z";

function MenuBook() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="menu-book">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu-book">
          <path d={svgPaths.p4550080} fill="var(--fill-0, #00858A)" id="Vector" />
          <path d={svgPaths.p238ca200} fill="var(--fill-0, #00858A)" id="Vector_2" />
          <path d={svgPaths.p29c35172} fill="var(--fill-0, #00858A)" id="Vector_3" />
          <path d={svgPaths.p1a264580} fill="var(--fill-0, #00858A)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#f4fef6] box-border content-stretch flex gap-[10px] items-center p-[8px] relative rounded-[8px] shrink-0">
      <MenuBook />
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-[#161d2b]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-left w-full">Guide Book</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-left w-full">Akses Portal Tanya-Jawab untuk bertanya terkait fitur aplikasi yang anda gunakan</p>
    </div>
  );
}

function Frame() {
  return (
    <button className="bg-white relative shrink-0 w-full hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Frame3 />
          <Frame4 />
        </div>
      </div>
    </button>
  );
}

function Call() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="call">
          <path d={svgPaths.p2c9f80c0} fill="var(--fill-0, #00858A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#f4fef6] box-border content-stretch flex gap-[10px] items-center p-[8px] relative rounded-[8px] shrink-0">
      <Call />
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-[#161d2b]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-left w-full">Helpdesk</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-left w-full">Ada pertanyaan seputar penggunaan apliaksi? Silahkan hubungi Helpdesk kami via WhatsApp</p>
    </div>
  );
}

function Frame1() {
  return (
    <button className="bg-white relative shrink-0 w-full hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Frame5 />
          <Frame6 />
        </div>
      </div>
    </button>
  );
}

function Warning() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="warning">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="warning">
          <path d={svgPaths.p2217ae80} fill="var(--fill-0, #00858A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#f4fef6] box-border content-stretch flex gap-[10px] items-center p-[8px] relative rounded-[8px] shrink-0">
      <Warning />
    </div>
  );
}

function Frame8() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-[#161d2b]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-left w-full">IT Service Management</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-left w-full">Menemukan masalah pada aplikasi Rinjani? Silahkan lapor kami</p>
    </div>
  );
}

function Frame2() {
  return (
    <button className="bg-white relative shrink-0 w-full hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center p-[12px] relative w-full">
          <Frame7 />
          <Frame8 />
        </div>
      </div>
    </button>
  );
}

export default function FaqPopup() {
  return (
    <div className="relative rounded-[6px] size-full shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03)]" data-name="FAQ">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame />
        <Frame1 />
        <Frame2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}