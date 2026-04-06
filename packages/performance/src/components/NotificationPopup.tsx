import React from "react";
import svgPaths from "../imports/svg-2aia3xzzsc";
import clsx from "clsx";

interface NotificationPopupProps {
  onClose: () => void;
}

type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[16px] relative w-full">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("relative rounded-[8px] shrink-0 size-[32px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function Container1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#d5d7da] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Icon({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <g id="Icon">{children}</g>
    </Wrapper>
  );
}

function Container() {
  return (
    <Wrapper1 additionalClassNames="bg-[rgba(0,133,138,0.1)]">
      <Wrapper>
        <g clipPath="url(#clip0_9_842)" id="Icon">
          <path d={svgPaths.p3eaa2980} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_9_842">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </Wrapper>
    </Wrapper1>
  );
}
type ButtonTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonText({ text, additionalClassNames = "" }: ButtonTextProps) {
  return (
    <div className={clsx("absolute bg-white border border-[#d5d7da] border-solid h-[28px] left-0 rounded-[6px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15.714px] left-[12px] not-italic text-[#181d27] text-[11px] text-nowrap top-[5.14px] whitespace-pre">{text}</p>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphText({ text, additionalClassNames = "" }: ParagraphTextProps) {
  return (
    <div className={clsx("absolute h-[16.5px] left-0 w-[306px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#717680] text-[11px] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
    </div>
  );
}
type TabTextProps = {
  text: string;
};

function TabText({ text }: TabTextProps) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#dde1e6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Wrapper2>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#878d96] text-[16px] text-nowrap whitespace-pre">{text}</p>
      </Wrapper2>
    </div>
  );
}

export default function NotificationPopup({ onClose }: NotificationPopupProps) {
  return (
    <div className="bg-white relative rounded-[16px] size-full" data-name="Notification">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <div className="h-[69px] relative shrink-0 w-full" data-name="NotificationsSidebar">
          <div aria-hidden="true" className="absolute border-[#d5d7da] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-px pt-0 px-[16px] relative size-full">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#181d27] text-[16px] text-nowrap whitespace-pre">{`Notifikasi & Pengingat`}</p>
              <button onClick={onClose} className="cursor-pointer relative rounded-[6px] shrink-0 size-[36px]" data-name="Button">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                  <Icon>
                    <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #717680)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </Icon>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Notification">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
            <div className="content-stretch flex h-[56px] items-start overflow-clip relative shrink-0 w-full">
              <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0" data-name="Tab">
                <div aria-hidden="true" className="absolute border-[#00a199] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
                <Wrapper2>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#121619] text-[16px] text-nowrap whitespace-pre">Semua (8)</p>
                </Wrapper2>
              </div>
              <TabText text="Approval (3)" />
              <TabText text="Deadline (1)" />
              <TabText text="Info (4)" />
            </div>
            <div className="bg-white content-stretch flex flex-col h-[473px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
              <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="NotificationsSidebar">
                <Container1>
                  <div className="content-stretch flex gap-[12px] h-[96.5px] items-start relative shrink-0 w-full" data-name="Container">
                    <Wrapper1 additionalClassNames="bg-[rgba(0,133,138,0.1)]">
                      <Wrapper>
                        <g clipPath="url(#clip0_9_850)" id="Icon">
                          <path d={svgPaths.p26b84380} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </g>
                        <defs>
                          <clipPath id="clip0_9_850">
                            <rect fill="white" height="16" width="16" />
                          </clipPath>
                        </defs>
                      </Wrapper>
                    </Wrapper1>
                    <Wrapper3 additionalClassNames="h-[96.5px]">
                      <div className="absolute h-[36px] left-0 top-0 w-[306px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#181d27] text-[12px] top-[0.5px] w-[280px]">KPI Check-In Q4 2025 dari Binavia Wardhani (Manager HC Strategy) menunggu approval Anda</p>
                      </div>
                      <ParagraphText text="2 jam lalu" additionalClassNames="top-[44px]" />
                      <ButtonText text="Review KPI" additionalClassNames="top-[68.5px] w-[84.273px]" />
                    </Wrapper3>
                  </div>
                </Container1>
                <Container1>
                  <div className="content-stretch flex gap-[12px] h-[96.5px] items-start relative shrink-0 w-full" data-name="Container">
                    <Wrapper1 additionalClassNames="bg-[rgba(90,226,195,0.2)]">
                      <Wrapper>
                        <g clipPath="url(#clip0_9_846)" id="Icon">
                          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </g>
                        <defs>
                          <clipPath id="clip0_9_846">
                            <rect fill="white" height="16" width="16" />
                          </clipPath>
                        </defs>
                      </Wrapper>
                    </Wrapper1>
                    <Wrapper3 additionalClassNames="h-[96.5px]">
                      <div className="absolute h-[36px] left-0 top-0 w-[306px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#181d27] text-[12px] top-[0.5px] w-[303px]">Deadline update Realisasi KPI Q1 2026: 8 hari lagi (25 Maret 2026)</p>
                      </div>
                      <ParagraphText text="Hari ini 09:00" additionalClassNames="top-[44px]" />
                      <ButtonText text="Update Sekarang" additionalClassNames="top-[68.5px] w-[116.859px]" />
                    </Wrapper3>
                  </div>
                </Container1>
                <Container1>
                  <div className="content-stretch flex gap-[12px] h-[114.5px] items-start relative shrink-0 w-full" data-name="Container">
                    <Wrapper1 additionalClassNames="bg-[rgba(0,101,115,0.1)]">
                      <Icon>
                        <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p3b6ee540} id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </Icon>
                    </Wrapper1>
                    <Wrapper3 additionalClassNames="h-[114.5px]">
                      <div className="absolute h-[54px] left-0 top-0 w-[306px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#181d27] text-[12px] top-[0.5px] w-[304px]">{`Talent Day untuk posisi 'Senior Manager Talent Development' dijadwalkan 20 Maret 2026 pukul 14.00 WIB`}</p>
                      </div>
                      <ParagraphText text="Kemarin" additionalClassNames="top-[62px]" />
                      <ButtonText text="Lihat Detail Event" additionalClassNames="top-[86.5px] w-[117.008px]" />
                    </Wrapper3>
                  </div>
                </Container1>
                <Container1>
                  <div className="content-stretch flex gap-[12px] h-[96.5px] items-start relative shrink-0 w-full" data-name="Container">
                    <Container />
                    <Wrapper3 additionalClassNames="h-[96.5px]">
                      <div className="absolute h-[36px] left-0 top-0 w-[306px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#181d27] text-[12px] top-[0.5px] w-[270px]">{`2 kandidat Job Tender untuk posisi 'HR Analyst' menunggu screening Anda`}</p>
                      </div>
                      <ParagraphText text="3 jam lalu" additionalClassNames="top-[44px]" />
                      <ButtonText text="Review Kandidat" additionalClassNames="top-[68.5px] w-[113.43px]" />
                    </Wrapper3>
                  </div>
                </Container1>
                <Container1>
                  <div className="content-stretch flex gap-[12px] h-[96.5px] items-start relative shrink-0 w-full" data-name="Container">
                    <Wrapper1 additionalClassNames="bg-[rgba(0,101,115,0.1)]">
                      <Icon>
                        <path d={svgPaths.pe3a2280} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M14.6667 6.66667V10.6667" id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p34e88d80} id="Vector_3" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </Icon>
                    </Wrapper1>
                    <Wrapper3 additionalClassNames="h-[96.5px]">
                      <div className="absolute h-[36px] left-0 top-0 w-[306px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#181d27] text-[12px] top-[0.5px] w-[271px]">{`Course 'Leadership Excellence Program' dimulai besok. Pastikan Anda hadir!`}</p>
                      </div>
                      <ParagraphText text="5 jam lalu" additionalClassNames="top-[44px]" />
                      <ButtonText text="Lihat Jadwal" additionalClassNames="top-[68.5px] w-[92.031px]" />
                    </Wrapper3>
                  </div>
                </Container1>
                <Container1>
                  <div className="content-stretch flex gap-[12px] h-[96.5px] items-start relative shrink-0 w-full" data-name="Container">
                    <Wrapper1 additionalClassNames="bg-[rgba(0,101,115,0.1)]">
                      <Wrapper>
                        <g clipPath="url(#clip0_9_828)" id="Icon">
                          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </g>
                        <defs>
                          <clipPath id="clip0_9_828">
                            <rect fill="white" height="16" width="16" />
                          </clipPath>
                        </defs>
                      </Wrapper>
                    </Wrapper1>
                    <Wrapper3 additionalClassNames="h-[96.5px]">
                      <div className="absolute h-[36px] left-0 top-0 w-[306px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#181d27] text-[12px] top-[0.5px] w-[288px]">9-Box Talent Assessment cycle 2025 telah selesai. Hasil dapat diakses di Talent Profile</p>
                      </div>
                      <ParagraphText text="2 hari lalu" additionalClassNames="top-[44px]" />
                      <ButtonText text="Lihat Hasil" additionalClassNames="top-[68.5px] w-[80.43px]" />
                    </Wrapper3>
                  </div>
                </Container1>
                <Container1>
                  <div className="content-stretch flex gap-[12px] h-[96.5px] items-start relative shrink-0 w-full" data-name="Container">
                    <Container />
                    <Wrapper3 additionalClassNames="h-[96.5px]">
                      <div className="absolute h-[36px] left-0 top-0 w-[306px]" data-name="Paragraph">
                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#181d27] text-[12px] top-[0.5px] w-[265px]">{`Learning Evaluation L1-L2 untuk program 'Data Analytics Training' menunggu input Anda`}</p>
                      </div>
                      <ParagraphText text="1 hari lalu" additionalClassNames="top-[44px]" />
                      <ButtonText text="Submit Evaluation" additionalClassNames="top-[68.5px] w-[120.281px]" />
                    </Wrapper3>
                  </div>
                </Container1>
                <div className="relative shrink-0 w-full" data-name="Container">
                  <div className="size-full">
                    <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
                      <Wrapper1 additionalClassNames="bg-[rgba(0,101,115,0.1)]">
                        <Wrapper>
                          <g clipPath="url(#clip0_9_822)" id="Icon">
                            <path d={svgPaths.pca5b500} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M13.3333 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M14.6667 2.66667H12" id="Vector_3" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p22966600} id="Vector_4" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9_822">
                              <rect fill="white" height="16" width="16" />
                            </clipPath>
                          </defs>
                        </Wrapper>
                      </Wrapper1>
                      <Wrapper3 additionalClassNames="h-[96.5px]">
                        <div className="absolute content-stretch flex h-[36px] items-start justify-between left-0 top-0 w-[306px]" data-name="Container">
                          <div className="h-[36px] relative shrink-0 w-[245.836px]" data-name="Paragraph">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                              <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#181d27] text-[12px] top-[0.5px] w-[235px]">Ask Rinjani AI Chatbot kini tersedia! Coba tanyakan tentang HC policy atau KPI</p>
                            </div>
                          </div>
                          <div className="h-[18px] relative rounded-[6px] shrink-0 w-[52.164px]" data-name="Badge">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
                              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#535862] text-[9px] text-nowrap whitespace-pre">NEW ✨</p>
                            </div>
                            <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
                          </div>
                        </div>
                        <ParagraphText text="3 hari lalu" additionalClassNames="top-[44px]" />
                        <ButtonText text="Try Now" additionalClassNames="top-[68.5px] w-[70.148px]" />
                      </Wrapper3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03)]" />
    </div>
  );
}
