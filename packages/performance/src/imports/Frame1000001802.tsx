import svgPaths from "./svg-f1b288hf6q";

function Icon() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
            <path d={svgPaths.p2ab2d800} id="Vector" stroke="var(--stroke-0, #181D27)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pb-0 pt-[4px] px-[4px] rounded-[3.35544e+07px] size-[24px] top-[6px]" data-name="Button">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[36px] left-[40px] top-0 w-[123.859px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#181d27] text-[24px] text-nowrap top-[-1px]">Profil Saya</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[36px] relative shrink-0 w-[163.859px]" data-name="Container">
      <Button />
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[101.453px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12.5px] not-italic relative shrink-0 text-[#717680] text-[10px] text-nowrap">Terakhir disinkronkan</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[111.469px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#181d27] text-[12px] text-nowrap">24 Des 2025, 10:30</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[27.5px] relative shrink-0 w-[111.469px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3fb08a80} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.25 1.75V4.66667H9.33333" id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p32253d00} id="Vector_3" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.66667 9.33333H1.75V12.25" id="Vector_4" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[35px] not-italic text-[#181d27] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Sinkronisasi</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-white grow h-[32px] min-h-px min-w-px relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[13px] py-px relative size-full">
          <Icon1 />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center relative shrink-0 w-[244.844px]" data-name="Container">
      <Container1 />
      <Button1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[28px] left-0 top-0 w-[109.891px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#181d27] text-[18px] text-nowrap top-0">Bagian Profil</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[20px] left-0 top-[36px] w-[217.578px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-0">Eksplor profil anda secara menyeluruh</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[88px] items-start left-0 overflow-clip pb-0 pt-[16px] px-[16px] top-0 w-[258px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container6() {
  return <div className="absolute border-[#d5d7da] border-[0px_0px_1px] border-solid h-[88px] left-0 top-0 w-[258px]" data-name="Container" />;
}

function Container7() {
  return (
    <div className="absolute h-[88px] left-0 top-0 w-[258px]" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p14dca900} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p117fc1f0} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[10px] w-[92.797px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#00858a] text-[12px] text-nowrap top-0">DATA PRIBADI</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[8px] top-[4px] w-[51.203px]" data-name="Paragraph">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f04438] text-[12px] text-nowrap">Required</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[24px] left-0 overflow-clip rounded-[4px] top-0 w-[67.203px]" data-name="Container">
      <Paragraph6 />
    </div>
  );
}

function Container9() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[24px] left-0 rounded-[4px] top-0 w-[67.203px]" data-name="Container" />;
}

function TagText() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] h-[24px] left-[142.8px] rounded-[4px] top-[8px] w-[67.203px]" data-name="TagText">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip rounded-[8px] top-0 w-[226px]" data-name="Container">
      <Icon2 />
      <Paragraph5 />
      <TagText />
    </div>
  );
}

function Container11() {
  return <div className="absolute border border-[#00858a] border-solid h-[40px] left-0 rounded-[8px] top-0 w-[226px]" data-name="Container" />;
}

function SidebarItem() {
  return (
    <div className="absolute bg-[rgba(0,133,138,0.05)] h-[40px] left-[16px] rounded-[8px] top-[16px] w-[226px]" data-name="SidebarItem">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3c7a6100} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16.5 7.5V12" id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p33836100} id="Vector_3" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[10px] w-[92.797px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-0">PENDIDIKAN</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[8px] top-[4px] w-[51.203px]" data-name="Paragraph">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f04438] text-[12px] text-nowrap">Required</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[24px] left-0 overflow-clip rounded-[4px] top-0 w-[67.203px]" data-name="Container">
      <Paragraph8 />
    </div>
  );
}

function Container13() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[24px] left-0 rounded-[4px] top-0 w-[67.203px]" data-name="Container" />;
}

function TagText1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] h-[24px] left-[142.8px] rounded-[4px] top-[8px] w-[67.203px]" data-name="TagText">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip rounded-[8px] top-0 w-[226px]" data-name="Container">
      <Icon3 />
      <Paragraph7 />
      <TagText1 />
    </div>
  );
}

function Container15() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[40px] left-0 rounded-[8px] top-0 w-[226px]" data-name="Container" />;
}

function SidebarItem1() {
  return (
    <div className="absolute h-[40px] left-[16px] rounded-[8px] top-[72px] w-[226px]" data-name="SidebarItem">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M9 5.25V15.75" id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2044ea00} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[10px] w-[168px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-0">PEMBELAJARAN</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip rounded-[8px] top-0 w-[226px]" data-name="Container">
      <Icon4 />
      <Paragraph9 />
    </div>
  );
}

function Container17() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[40px] left-0 rounded-[8px] top-0 w-[226px]" data-name="Container" />;
}

function SidebarItem2() {
  return (
    <div className="absolute h-[40px] left-[16px] rounded-[8px] top-[128px] w-[226px]" data-name="SidebarItem">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3a062e00} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p17b0f100} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[10px] w-[168px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-0">RIWAYAT PEKERJAAN</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip rounded-[8px] top-0 w-[226px]" data-name="Container">
      <Icon5 />
      <Paragraph10 />
    </div>
  );
}

function Container19() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[40px] left-0 rounded-[8px] top-0 w-[226px]" data-name="Container" />;
}

function SidebarItem3() {
  return (
    <div className="absolute h-[40px] left-[16px] rounded-[8px] top-[184px] w-[226px]" data-name="SidebarItem">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3a382d00} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p678c080} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2c89dc80} id="Vector_3" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[10px] w-[168px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-0">INFORMASI KEPEGAWAIAN</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip rounded-[8px] top-0 w-[226px]" data-name="Container">
      <Icon6 />
      <Paragraph11 />
    </div>
  );
}

function Container21() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[40px] left-0 rounded-[8px] top-0 w-[226px]" data-name="Container" />;
}

function SidebarItem4() {
  return (
    <div className="absolute h-[40px] left-[16px] rounded-[8px] top-[240px] w-[226px]" data-name="SidebarItem">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2e6f6a00} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p23bfda80} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[10px] w-[168px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-0">KUALIFIKASI</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip rounded-[8px] top-0 w-[226px]" data-name="Container">
      <Icon7 />
      <Paragraph12 />
    </div>
  );
}

function Container23() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[40px] left-0 rounded-[8px] top-0 w-[226px]" data-name="Container" />;
}

function SidebarItem5() {
  return (
    <div className="absolute h-[40px] left-[16px] rounded-[8px] top-[296px] w-[226px]" data-name="SidebarItem">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p305bd600} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 5.25H16.5V9.75" id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[10px] w-[168px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-0">INSIGHTS</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip rounded-[8px] top-0 w-[226px]" data-name="Container">
      <Icon8 />
      <Paragraph13 />
    </div>
  );
}

function Container25() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[40px] left-0 rounded-[8px] top-0 w-[226px]" data-name="Container" />;
}

function SidebarItem6() {
  return (
    <div className="absolute h-[40px] left-[16px] rounded-[8px] top-[352px] w-[226px]" data-name="SidebarItem">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_106_2066)" id="Icon">
          <path d={svgPaths.p5b7598} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1a015a00} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 16.5H15" id="Vector_3" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1058cb10} id="Vector_4" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p17060880} id="Vector_5" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2d3c5f00} id="Vector_6" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_106_2066">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[10px] w-[168px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-0">KONTRIBUSI</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip rounded-[8px] top-0 w-[226px]" data-name="Container">
      <Icon9 />
      <Paragraph14 />
    </div>
  );
}

function Container27() {
  return <div className="absolute border border-[rgba(0,0,0,0)] border-solid h-[40px] left-0 rounded-[8px] top-0 w-[226px]" data-name="Container" />;
}

function SidebarItem7() {
  return (
    <div className="absolute h-[40px] left-[16px] rounded-[8px] top-[408px] w-[226px]" data-name="SidebarItem">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[464px] relative shrink-0 w-full" data-name="Container">
      <SidebarItem />
      <SidebarItem1 />
      <SidebarItem2 />
      <SidebarItem3 />
      <SidebarItem4 />
      <SidebarItem5 />
      <SidebarItem6 />
      <SidebarItem7 />
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="content-stretch flex flex-col h-[766px] items-start overflow-clip relative shrink-0 w-full" data-name="Wrapper3">
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col h-[766px] items-start left-0 overflow-clip top-[88px] w-[258px]" data-name="Container">
      <Wrapper1 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[854px] left-px overflow-clip rounded-[8px] top-px w-[258px]" data-name="Container">
      <Container7 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return <div className="absolute border border-[#d5d7da] border-solid h-[854px] left-px rounded-[8px] top-px w-[258px]" data-name="Container" />;
}

function Container32() {
  return (
    <div className="bg-white h-full relative rounded-[8px] shrink-0 w-[260px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Container30 />
      <Container31 />
    </div>
  );
}

function AccountCircle() {
  return (
    <div className="absolute contents inset-[8.33%]" data-name="account-circle">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.3334 33.3334">
          <path d={svgPaths.pd948700} fill="var(--fill-0, #717680)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <AccountCircle />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[40px] top-[24px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[28px] relative shrink-0 w-[117.688px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#181d27] text-[20px] text-nowrap top-0">Data Pribadi</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Menyajikan informasi mengenai profil anda</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[72px] top-[16px] w-[283.609px]" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[88px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d5d7da] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container35 />
    </div>
  );
}

function NewReleases() {
  return (
    <div className="absolute contents inset-[7.45%_5.56%_7.45%_5.55%]" data-name="new-releases">
      <div className="absolute inset-[7.45%_5.56%_7.45%_5.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3338 20.423">
          <path d={svgPaths.p2b8a5200} fill="var(--fill-0, #00858A)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <NewReleases />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[24px] top-[12px]" data-name="Wrapper2">
      <Icon11 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[825px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#00858a] text-[16px] text-nowrap top-[-1px]">Mohon Perhatian</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[825px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Agar upload evidence terlebih dahulu, baru merubah data</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[48px] left-[40px] top-0 w-[825px]" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Wrapper />
      <Container37 />
    </div>
  );
}

function MyProfile() {
  return (
    <div className="bg-[#eff6ff] h-[80px] relative rounded-[6px] shrink-0 w-full" data-name="MyProfile">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
          <Container38 />
        </div>
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[99.531px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Nama Lengkap</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[107.53px] size-[12px] top-[4px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[119.531px]" data-name="Container">
      <Paragraph19 />
      <Container39 />
    </div>
  );
}

function TextFieldDisableText() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[897px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Raka Pradana Putra</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[20px] left-0 top-[52px] w-[897px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">*Sesuai KTP Huruf Kapital</p>
    </div>
  );
}

function InfoGroup() {
  return (
    <div className="h-[72px] relative shrink-0 w-[897px]" data-name="InfoGroup">
      <Container40 />
      <TextFieldDisableText />
      <Paragraph20 />
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[74.172px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Nama Alias</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_106_2039)" id="Icon">
          <path d={svgPaths.p27b3900} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 2.5L9.5 4.5" id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_106_2039">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#00858a] text-[12px] text-nowrap top-0">Ubah</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[20px] items-center left-[850.55px] top-0 w-[46.453px]" data-name="Container">
      <Icon13 />
      <Paragraph22 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[897px]" data-name="Container">
      <Paragraph21 />
      <Container41 />
    </div>
  );
}

function TextFieldDisableText1() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[897px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Raka</p>
    </div>
  );
}

function InfoGroup1() {
  return (
    <div className="h-[50px] relative shrink-0 w-[897px]" data-name="InfoGroup">
      <Container42 />
      <TextFieldDisableText1 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[86.188px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Tempat Lahir</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[94.19px] size-[12px] top-[4px]" data-name="Container">
      <Icon14 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[106.188px]" data-name="Container">
      <Paragraph23 />
      <Container43 />
    </div>
  );
}

function TextFieldDisableText2() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[440.5px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Jakarta</p>
    </div>
  );
}

function InfoGroup2() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="InfoGroup">
      <Container44 />
      <TextFieldDisableText2 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[89.234px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Tanggal Lahir</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[97.23px] size-[12px] top-[4px]" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[109.234px]" data-name="Container">
      <Paragraph24 />
      <Container45 />
    </div>
  );
}

function TextFieldDisableText3() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[440.5px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">15 Juli 1987</p>
    </div>
  );
}

function InfoGroup3() {
  return (
    <div className="[grid-area:1_/_2] place-self-stretch relative shrink-0" data-name="InfoGroup">
      <Container46 />
      <TextFieldDisableText3 />
    </div>
  );
}

function Container47() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[50px] relative shrink-0 w-[897px]" data-name="Container">
      <InfoGroup2 />
      <InfoGroup3 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[46.234px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Agama</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[54.23px] size-[12px] top-[4px]" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[66.234px]" data-name="Container">
      <Paragraph25 />
      <Container48 />
    </div>
  );
}

function TextFieldDisableText4() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[440.5px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Islam</p>
    </div>
  );
}

function InfoGroup4() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="InfoGroup">
      <Container49 />
      <TextFieldDisableText4 />
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[91.344px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Jenis Kelamin</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[99.34px] size-[12px] top-[4px]" data-name="Container">
      <Icon17 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[111.344px]" data-name="Container">
      <Paragraph26 />
      <Container50 />
    </div>
  );
}

function TextFieldDisableText5() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[440.5px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Tidak Diketahui</p>
    </div>
  );
}

function InfoGroup5() {
  return (
    <div className="[grid-area:1_/_2] place-self-stretch relative shrink-0" data-name="InfoGroup">
      <Container51 />
      <TextFieldDisableText5 />
    </div>
  );
}

function Container52() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[50px] relative shrink-0 w-[897px]" data-name="Container">
      <InfoGroup4 />
      <InfoGroup5 />
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[99.672px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">No Handphone</p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[107.67px] size-[12px] top-[4px]" data-name="Container">
      <Icon18 />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[119.672px]" data-name="Container">
      <Paragraph27 />
      <Container53 />
    </div>
  );
}

function TextFieldDisableText6() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[897px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">+6281212345678</p>
    </div>
  );
}

function InfoGroup6() {
  return (
    <div className="h-[50px] relative shrink-0 w-[897px]" data-name="InfoGroup">
      <Container54 />
      <TextFieldDisableText6 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[23.719px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">NIK</p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[31.72px] size-[12px] top-[4px]" data-name="Container">
      <Icon19 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[43.719px]" data-name="Container">
      <Paragraph28 />
      <Container55 />
    </div>
  );
}

function TextFieldDisableText7() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[897px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">3175091507870001</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[20px] left-0 top-[52px] w-[897px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">*Diisi dengan 16 digit angka</p>
    </div>
  );
}

function InfoGroup7() {
  return (
    <div className="h-[72px] relative shrink-0 w-[897px]" data-name="InfoGroup">
      <Container56 />
      <TextFieldDisableText7 />
      <Paragraph29 />
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[42.234px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">NPWP</p>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[50.23px] size-[12px] top-[4px]" data-name="Container">
      <Icon20 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[62.234px]" data-name="Container">
      <Paragraph30 />
      <Container57 />
    </div>
  );
}

function TextFieldDisableText8() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[897px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">12.345.678.9-012.000</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[20px] left-0 top-[52px] w-[897px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">*Diisi dengan 16 digit angka</p>
    </div>
  );
}

function InfoGroup8() {
  return (
    <div className="h-[72px] relative shrink-0 w-[897px]" data-name="InfoGroup">
      <Container58 />
      <TextFieldDisableText8 />
      <Paragraph31 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[96.688px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Email Korporat</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[104.69px] size-[12px] top-[4px]" data-name="Container">
      <Icon21 />
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[116.688px]" data-name="Container">
      <Paragraph32 />
      <Container59 />
    </div>
  );
}

function TextFieldDisableText9() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[897px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">raka.putra@injourney.co.id</p>
    </div>
  );
}

function InfoGroup9() {
  return (
    <div className="h-[50px] relative shrink-0 w-[897px]" data-name="InfoGroup">
      <Container60 />
      <TextFieldDisableText9 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[87.156px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Alamat (KTP)</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[95.16px] size-[12px] top-[4px]" data-name="Container">
      <Icon22 />
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[107.156px]" data-name="Container">
      <Paragraph33 />
      <Container61 />
    </div>
  );
}

function TextFieldDisableText10() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[897px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Jl. Kemang Raya No. 10 RT 004/RW 006, Mampang Prapatan, Jakarta Selatan, DKI Jakarta 12730</p>
    </div>
  );
}

function InfoGroup10() {
  return (
    <div className="h-[50px] relative shrink-0 w-[897px]" data-name="InfoGroup">
      <Container62 />
      <TextFieldDisableText10 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[96.969px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Alamat (Tetap)</p>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2b283480} id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
          <path d={svgPaths.pbc77700} id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[104.97px] size-[12px] top-[4px]" data-name="Container">
      <Icon23 />
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[116.969px]" data-name="Container">
      <Paragraph34 />
      <Container63 />
    </div>
  );
}

function TextFieldDisableText11() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[897px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Apartemen Cempaka Residence Tower B, Unit 15C, Setiabudi, Jakarta Selatan, DKI Jakarta 12910</p>
    </div>
  );
}

function InfoGroup11() {
  return (
    <div className="h-[50px] relative shrink-0 w-[897px]" data-name="InfoGroup">
      <Container64 />
      <TextFieldDisableText11 />
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[38.547px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Nama</p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_106_2039)" id="Icon">
          <path d={svgPaths.p27b3900} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 2.5L9.5 4.5" id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_106_2039">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#00858a] text-[12px] text-nowrap top-0">Ubah</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[20px] items-center left-[377.05px] top-0 w-[46.453px]" data-name="Container">
      <Icon24 />
      <Paragraph36 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[423.5px]" data-name="Container">
      <Paragraph35 />
      <Container65 />
    </div>
  );
}

function TextFieldDisableText12() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[423.5px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">Bima Pradana</p>
    </div>
  );
}

function InfoGroup12() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="InfoGroup">
      <Container66 />
      <TextFieldDisableText12 />
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[68.531px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">Hubungan</p>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_106_2039)" id="Icon">
          <path d={svgPaths.p27b3900} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 2.5L9.5 4.5" id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_106_2039">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#00858a] text-[12px] text-nowrap top-0">Ubah</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[20px] items-center left-[377.05px] top-0 w-[46.453px]" data-name="Container">
      <Icon25 />
      <Paragraph38 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[423.5px]" data-name="Container">
      <Paragraph37 />
      <Container67 />
    </div>
  );
}

function TextFieldDisableText13() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[423.5px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">emergency_contact</p>
    </div>
  );
}

function InfoGroup13() {
  return (
    <div className="[grid-area:1_/_2] place-self-stretch relative shrink-0" data-name="InfoGroup">
      <Container68 />
      <TextFieldDisableText13 />
    </div>
  );
}

function MyProfile1() {
  return (
    <div className="absolute gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[50px] left-[16px] top-[72px] w-[863px]" data-name="MyProfile">
      <InfoGroup12 />
      <InfoGroup13 />
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[103.703px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717680] text-[14px] text-nowrap top-0">No. Handphone</p>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_106_2039)" id="Icon">
          <path d={svgPaths.p27b3900} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 2.5L9.5 4.5" id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_106_2039">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#00858a] text-[12px] text-nowrap top-0">Ubah</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[20px] items-center left-[103.7px] top-0 w-[46.453px]" data-name="Container">
      <Icon26 />
      <Paragraph40 />
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[150.156px]" data-name="Container">
      <Paragraph39 />
      <Container69 />
    </div>
  );
}

function TextFieldDisableText14() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[150.156px]" data-name="TextFieldDisableText">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#181d27] text-[14px] text-nowrap top-0">+6281311122233</p>
    </div>
  );
}

function InfoGroup14() {
  return (
    <div className="absolute h-[50px] left-[16px] top-[154px] w-[150.156px]" data-name="InfoGroup">
      <Container70 />
      <TextFieldDisableText14 />
    </div>
  );
}

function MyProfile2() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[16px] w-[116.141px]" data-name="MyProfile">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#181d27] text-[16px] text-nowrap top-[-1px]">Kontak Darurat</p>
    </div>
  );
}

function Wrapper2() {
  return (
    <div className="h-[220px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Wrapper3">
      <MyProfile1 />
      <InfoGroup14 />
      <MyProfile2 />
    </div>
  );
}

function Container71() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[222px] items-start p-px relative rounded-[8px] shrink-0 w-[897px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Wrapper2 />
    </div>
  );
}

function MyProfile3() {
  return (
    <div className="content-stretch flex flex-col gap-[26px] items-start relative shrink-0 w-full" data-name="MyProfile">
      <InfoGroup />
      <InfoGroup1 />
      <Container47 />
      <Container52 />
      <InfoGroup6 />
      <InfoGroup7 />
      <InfoGroup8 />
      <InfoGroup9 />
      <InfoGroup10 />
      <InfoGroup11 />
      <Container71 />
    </div>
  );
}

function Wrapper3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Wrapper3">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start p-[16px] relative w-full">
          <MyProfile />
          <MyProfile3 />
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-center overflow-clip px-0 py-px relative rounded-[inherit] size-full">
        <Container36 />
        <Wrapper3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container73() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start min-h-px min-w-px overflow-clip relative rounded-[8px] shrink-0" data-name="Container">
      <Container72 />
    </div>
  );
}

function Container74() {
  return (
    <div className="basis-0 content-stretch flex gap-[24px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Container73 />
    </div>
  );
}

function MyProfile4() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-tl-[24px] shrink-0" data-name="MyProfile">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <Container3 />
          <Container74 />
        </div>
      </div>
    </div>
  );
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

function Avatar() {
  return (
    <div className="bg-[#dffdea] relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <User />
    </div>
  );
}

function Container75() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px not-italic relative shrink-0 text-nowrap" data-name="Container">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#181d27] text-[20px]">Dimas Sayyid</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#535862] text-[14px]">dimas@injourney.co.id</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Avatar />
      <Container75 />
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
          <Frame1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d5d7da] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#717680] text-[14px] text-nowrap">Nama Pekerja</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-w-full relative shrink-0 text-[#252b37] text-[16px] w-[min-content]">Dimas Sayyid</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#717680] text-[14px] text-nowrap">Jabatan</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-w-full relative shrink-0 text-[#252b37] text-[16px] w-[min-content]">Head of Human Capital Strategy</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
          <Frame2 />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="h-full relative shrink-0 w-[300px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container76 />
        <Container77 />
      </div>
      <div aria-hidden="true" className="absolute border-[#d5d7da] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-start relative size-full">
      <MyProfile4 />
      <Container78 />
    </div>
  );
}