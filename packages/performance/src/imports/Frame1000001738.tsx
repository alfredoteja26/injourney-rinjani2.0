import React from "react";
import svgPaths from "./svg-3yluzjut2f";
import clsx from "clsx";
import imgInjourneyBanner from "figma:asset/a91bbc52876d9799b43bdc0551929d8ac5e2e719.png";
import imgFrame1000001778 from "figma:asset/7e7006a4927bcec25694136f88b3db870eacf73b.png";
import imgFrame1000001779 from "figma:asset/7831b9ec4303df4fbb366388ea0a210b01e2e804.png";
import imgFrame1000001780 from "figma:asset/e8aa5d3a3d822909dd3c274e5ac1c80ef63111a4.png";
import BannerCarousel from "../components/BannerCarousel";
import { useOnboarding } from "../components/onboarding/onboarding-context";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { PendingSurveySection } from "../components/PendingSurveySection";
import { AIChatbot } from "../components/AIChatbot";

function AnnouncementsSectionBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[105.328px] relative shrink-0 w-[1198px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[15px] relative shrink-0 w-[63.961px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">{children}</div>
    </div>
  );
}

function HeadingBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[24px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-0 not-italic text-[#181d27] text-[20px] text-nowrap top-[-1px] whitespace-pre">{children}</p>
    </div>
  );
}
type BackgroundImage20Props = {
  additionalClassNames?: string;
};

function BackgroundImage20({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage20Props>) {
  return (
    <div className={clsx("size-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage19({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative w-full">{children}</div>
    </div>
  );
}

function BackgroundImage18({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative w-full">{children}</div>
    </div>
  );
}

function WelcomeBannerBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[81px] relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[81px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage1Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage17({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[16px] shrink-0 size-[48px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage16Props = {
  additionalClassNames?: string;
};

function BackgroundImage16({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage16Props>) {
  return (
    <div className={clsx("relative rounded-[8px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage15({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[24px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#181d27] text-[16px] text-nowrap top-[-1px] whitespace-pre">{children}</p>
    </div>
  );
}

function BackgroundImage14({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[24px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717680] text-[16px] text-nowrap top-[-1px] whitespace-pre">{children}</p>
    </div>
  );
}

function BackgroundImage13({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[105.328px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage12({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[18px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#717680] text-[12px] text-nowrap top-[0.5px] whitespace-pre">{children}</p>
    </div>
  );
}
type BackgroundImage11Props = {
  additionalClassNames?: string;
};

function BackgroundImage11({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage11Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage10({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage9({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex gap-[17px] items-center justify-center px-[12px] py-[16px] relative w-full">{children}</div>
    </div>
  );
}

function BackgroundImage8({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="size-full">
      <div className="content-stretch flex flex-col items-start p-[17px] relative w-full">{children}</div>
    </div>
  );
}

function ExternalSystemsBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function BackgroundImage7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[16px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <BackgroundImage8>{children}</BackgroundImage8>
    </div>
  );
}

function CardBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <BackgroundImage8>{children}</BackgroundImage8>
    </div>
  );
}

function SpiderwebDiagramBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-white grow h-[732px] min-h-px min-w-px relative rounded-[16px] shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-start p-[24px] relative size-full">{children}</div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dde1e6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_0px_1px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function IconBackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type CardBackgroundImage1Props = {
  additionalClassNames?: string;
};

function CardBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<CardBackgroundImage1Props>) {
  return (
    <div className={clsx("basis-0 bg-white grow min-h-px min-w-px relative rounded-[16px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(254,154,0,0.3)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[17px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function TabBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shadow-[0px_2px_4px_0px_rgba(217,217,217,0.2)] shrink-0">
      <BackgroundImage9>{children}</BackgroundImage9>
    </div>
  );
}

function IconTabBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[48px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="icon tab">{children}</g>
      </svg>
    </div>
  );
}

function IconBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage10>
      <g id="Icon">{children}</g>
    </BackgroundImage10>
  );
}

function CardBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-[#fdfdfd] grow min-h-px min-w-px relative rounded-[16px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" />
      <BackgroundImage8>{children}</BackgroundImage8>
    </div>
  );
}

function ContainerBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(245,245,245,0.5)] relative rounded-[8px] shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex gap-[12px] items-start p-[12px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function BackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-neutral-50 grow h-full min-h-px min-w-px relative rounded-[5px] shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start p-[16px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return (
    <BackgroundImage11 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage11>
  );
}
type BadgeBackgroundImageAndText6Props = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText6({ text, additionalClassNames = "" }: BadgeBackgroundImageAndText6Props) {
  return (
    <div className={clsx("absolute h-[19.328px] rounded-[6px] top-0", additionalClassNames)}>
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.333px] not-italic relative shrink-0 text-[#535862] text-[10px] text-nowrap whitespace-pre">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}
type BadgeBackgroundImageAndText5Props = {
  text: string;
};

function BadgeBackgroundImageAndText5({ text }: BadgeBackgroundImageAndText5Props) {
  return (
    <div className="absolute bg-[rgba(0,188,125,0.1)] h-[19.328px] left-0 rounded-[6px] top-0 w-[60.039px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.333px] not-italic relative shrink-0 text-[#007a55] text-[10px] text-nowrap whitespace-pre">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,188,125,0.2)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}
type BadgeBackgroundImageAndText4Props = {
  text: string;
};

function BadgeBackgroundImageAndText4({ text }: BadgeBackgroundImageAndText4Props) {
  return (
    <div className="absolute bg-[rgba(173,70,255,0.1)] h-[19.328px] left-0 rounded-[6px] top-0 w-[47.281px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.333px] not-italic relative shrink-0 text-[#8200db] text-[10px] text-nowrap whitespace-pre">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(173,70,255,0.2)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}
type IconBackgroundImage2Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage2({ additionalClassNames = "" }: IconBackgroundImage2Props) {
  return (
    <BackgroundImage5 additionalClassNames={clsx("absolute size-[16px] top-[2px]", additionalClassNames)}>
      <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage5>
  );
}
type ParagraphBackgroundImageAndText5Props = {
  text: string;
};

function ParagraphBackgroundImageAndText5({ text }: ParagraphBackgroundImageAndText5Props) {
  return <BackgroundImage12>{text}</BackgroundImage12>;
}
type BadgeBackgroundImageAndText3Props = {
  text: string;
};

function BadgeBackgroundImageAndText3({ text }: BadgeBackgroundImageAndText3Props) {
  return (
    <div className="absolute bg-[rgba(254,154,0,0.1)] h-[19.328px] left-0 rounded-[6px] top-0 w-[80.047px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.333px] not-italic relative shrink-0 text-[#bb4d00] text-[10px] text-nowrap whitespace-pre">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(254,154,0,0.2)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}
type TextBackgroundImageAndText5Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText5({ text, additionalClassNames = "" }: TextBackgroundImageAndText5Props) {
  return (
    <div className={clsx("h-[16.5px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12px] not-italic text-[#717680] text-[11px] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndText7Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText7({ text, additionalClassNames = "" }: BackgroundImageAndText7Props) {
  return (
    <div className={clsx("bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9px] py-[5px] relative", additionalClassNames)}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#181d27] text-[14px] text-nowrap whitespace-pre">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[69px] py-[8px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#181d27] text-[14px] text-nowrap whitespace-pre">{text}</p>
          <IconBackgroundImage1 additionalClassNames="relative shrink-0" />
        </div>
      </div>
    </div>
  );
}
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ additionalClassNames = "" }: IconBackgroundImage1Props) {
  return (
    <BackgroundImage5 additionalClassNames={clsx("size-[16px]", additionalClassNames)}>
      <path d="M10 2H14V6" id="Vector" stroke="var(--stroke-0, #181D27)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M6.66667 9.33333L14 2" id="Vector_2" stroke="var(--stroke-0, #181D27)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p25f66900} id="Vector_3" stroke="var(--stroke-0, #181D27)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage5>
  );
}
type BackgroundImageAndText6Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText6({ text, additionalClassNames = "" }: BackgroundImageAndText6Props) {
  return (
    <div className={clsx("[grid-area:1_/_1] bg-[#f2f4f8] content-stretch flex h-[20.743px] items-center justify-center ml-0 px-[10px] py-[4px] relative rounded-[30px] w-[33.174px]", additionalClassNames)}>
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#878d96] text-[12px] text-nowrap whitespace-pre">{text}</p>
    </div>
  );
}
type BackgroundImageAndText5Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText5({ text, additionalClassNames = "" }: BackgroundImageAndText5Props) {
  return (
    <div className={clsx("[grid-area:1_/_1] bg-[#f2f4f8] content-stretch flex h-[20.743px] items-center justify-center ml-0 px-[10px] py-[4px] relative rounded-[30px] w-[33.174px]", additionalClassNames)}>
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#878d96] text-[12px] text-nowrap tracking-[-0.48px] whitespace-pre">{text}</p>
    </div>
  );
}
type BackgroundImage4Props = {
  text: string;
  text1: string;
};

function BackgroundImage4({ text, text1 }: BackgroundImage4Props) {
  return (
    <BackgroundImage6>
      <div className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[14px]">
        <p className="mb-0">{text}</p>
        <p>{text1}</p>
      </div>
    </BackgroundImage6>
  );
}
type BackgroundImage3Props = {
  text: string;
  text1: string;
  text2: string;
  text3: string;
};

function BackgroundImage3({ text, text1, text2, text3 }: BackgroundImage3Props) {
  return (
    <BackgroundImage6>
      <div className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[0px]">
        <p className="leading-[20px] mb-0 text-[14px]">{text}</p>
        <p className="leading-[20px] text-[14px]">
          {text1}
          <span className="font-['Inter:Medium_Italic',sans-serif] font-medium italic">{text2}</span>
          {text3}
        </p>
      </div>
    </BackgroundImage6>
  );
}
type ParagraphBackgroundImageAndText4Props = {
  text: string;
};

function ParagraphBackgroundImageAndText4({ text }: ParagraphBackgroundImageAndText4Props) {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-[rgba(255,255,255,0.8)] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
    </div>
  );
}
type BadgeBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText2({ text, additionalClassNames = "" }: BadgeBackgroundImageAndText2Props) {
  return (
    <div className={clsx("bg-[rgba(255,255,255,0.2)] h-[20px] relative rounded-[6px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndText4Props = {
  text: string;
};

function BackgroundImageAndText4({ text }: BackgroundImageAndText4Props) {
  return (
    <div className="content-stretch flex gap-[11px] items-center relative rounded-[6px] shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">{text}</p>
      <IconBackgroundImage />
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage5 additionalClassNames="relative shrink-0 size-[16px]">
      <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p287e9400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage5>
  );
}
type ParagraphBackgroundImageAndText3Props = {
  text: string;
};

function ParagraphBackgroundImageAndText3({ text }: ParagraphBackgroundImageAndText3Props) {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-[rgba(255,255,255,0.7)] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText4Props = {
  text: string;
};

function TextBackgroundImageAndText4({ text }: TextBackgroundImageAndText4Props) {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText3Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText3({ text, additionalClassNames = "" }: TextBackgroundImageAndText3Props) {
  return (
    <div className={clsx("content-stretch flex h-[19.5px] items-start relative shrink-0", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-nowrap whitespace-pre">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText2Props = {
  text: string;
};

function ParagraphBackgroundImageAndText2({ text }: ParagraphBackgroundImageAndText2Props) {
  return <BackgroundImage14>{text}</BackgroundImage14>;
}
type ParagraphBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphBackgroundImageAndText1({ text, additionalClassNames = "" }: ParagraphBackgroundImageAndText1Props) {
  return (
    <div className={clsx("content-stretch flex items-center relative shrink-0 w-full", additionalClassNames)}>
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16.5px] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[11px]">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndText1Props = {
  text: string;
};

function HeadingBackgroundImageAndText1({ text }: HeadingBackgroundImageAndText1Props) {
  return <BackgroundImage15>{text}</BackgroundImage15>;
}
type BadgeBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText1({ text, additionalClassNames = "" }: BadgeBackgroundImageAndText1Props) {
  return (
    <div className={clsx("h-[19.328px] relative rounded-[6px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.333px] not-italic relative shrink-0 text-[#535862] text-[10px] text-nowrap whitespace-pre">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
};

function TextBackgroundImageAndText2({ text }: TextBackgroundImageAndText2Props) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#878d96] text-[16px] w-full">{text}</p>
    </div>
  );
}

function BackgroundImage2() {
  return (
    <div className="relative rounded-[120px] shrink-0 size-[120px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[120px] size-full" src={imgFrame1000001780} />
    </div>
  );
}
type BackgroundImage1Props = {
  text: string;
  text1: string;
  text2: string;
};

function BackgroundImage1({ text, text1, text2 }: BackgroundImage1Props) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center not-italic relative shrink-0 w-[288px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] relative shrink-0 text-[#414651] text-[20px] w-full">{text}</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#535862] text-[16px] w-full">{text1}</p>
      <p className="[white-space-collapse:collapse] font-['Inter:Medium',sans-serif] font-medium leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#717680] text-[16px] text-nowrap w-full">{text2}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphBackgroundImageAndText({ text, additionalClassNames = "" }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center relative shrink-0 w-full", additionalClassNames)}>
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16.5px] min-h-px min-w-px not-italic relative shrink-0 text-[#00858a] text-[11px]">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className="h-[24px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#00858a] text-[16px] text-nowrap top-[-1px] whitespace-pre">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <div className={clsx("h-[15px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#00858a] text-[10px] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}
type BadgeBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText({ text, additionalClassNames = "" }: BadgeBackgroundImageAndTextProps) {
  return (
    <div className={clsx("bg-[rgba(223,253,234,0.4)] h-[16px] relative rounded-[6px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#00858a] text-[9px] text-nowrap whitespace-pre">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndText3Props = {
  text: string;
};

function BackgroundImageAndText3({ text }: BackgroundImageAndText3Props) {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#717680] text-[11px] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[18px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#181d27] text-[12px] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
};

function BackgroundImageAndText2({ text }: BackgroundImageAndText2Props) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#717680] text-[10px] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText1({ text, additionalClassNames = "" }: BackgroundImageAndText1Props) {
  return (
    <div className={clsx("h-[15px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#717680] text-[10px] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[15px] top-[2.16px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#717680] text-[10px] text-nowrap top-[0.5px] whitespace-pre">{text}</p>
    </div>
  );
}

function BackgroundImage() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 24 24" className="block size-full">
      <g id="arrow-back">
        <path d={svgPaths.p1af51d00} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </svg>
  );
}

function Container() {
  return (
    <div className="basis-0 bg-[#d5d7da] grow h-px min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 bg-[#d5d7da] grow h-px min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 bg-[#d5d7da] grow h-px min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

export default function Frame({ onProfileClick, userRole = "Admin", userEmail = "dimas@injourney.co.id" }: { onProfileClick?: () => void; userRole?: "Admin" | "User"; userEmail?: string }) {
  const userName = userEmail === "binavia@injourney.co.id" ? "Binavia Wardhani" : "Dimas Sayyid";
  const jobTitle = userEmail === "binavia@injourney.co.id" ? "Group Head Human Capital Strategy" : "VP Human Capital Strategy";
  const directSupervisor = userEmail === "binavia@injourney.co.id" ? "Dimas Sayyid" : "Herdy Harman";
  const supervisorTitle = userEmail === "binavia@injourney.co.id" ? "VP Human Capital Strategy" : "Director of HR and Digital";
  const workUnit = "Direktorat Human Capital";
  const fullUserEmail = userEmail === "binavia@injourney.co.id" ? "binavia@injourney.co.id" : "dimas.sayyid@injourney.id";
  
  // Get onboarding context - wrap in try-catch for safety
  let onboardingContext: any = null;
  try {
    onboardingContext = useOnboarding();
  } catch (e) {
    console.error('Frame: Onboarding context not available', e);
    // Provide fallback so component can still render
    onboardingContext = {
      restartNewEmployeeOnboarding: () => {
        console.warn('Onboarding context not available - cannot restart');
        toast.error('Onboarding tidak tersedia saat ini');
      }
    };
  }
  
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-tl-[16px] w-full">
      <div className="bg-white h-[960px] relative rounded-tl-[16px] shrink-0 w-full">
        <div className="flex flex-col items-end justify-center overflow-clip rounded-[inherit] h-full w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-end justify-center p-[24px] relative size-full" style={{ borderTopLeftRadius: 'var(--radius-xl)' }}>
            <div className="basis-0 content-stretch flex gap-[24px] grow items-center min-h-px min-w-px relative shrink-0 w-full">
              <BannerCarousel />
              <div className="bg-white h-full relative rounded-[16px] shrink-0" data-name="Container">
                <div className="content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
                  <div className="bg-[#00858a] h-[44px] shrink-0 w-full" />
                  <div className="basis-0 content-stretch flex flex-col grow items-center justify-between min-h-px min-w-px p-[24px] relative shrink-0" data-name="Container">
                    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
                      <div className="relative shrink-0 size-[112px]" data-name="Container">
                        <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[1.67772e+07px] size-[112px] top-0" data-name="Primitive.span">
                          <div className="content-stretch flex items-start overflow-clip p-[4px] relative rounded-[inherit] size-full">
                            <div className="basis-0 bg-gradient-to-b from-[#00858a] grow h-[104px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0 to-[#006573]" data-name="Text">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full overflow-hidden">
                                <img 
                                  alt={userName} 
                                  className="object-cover size-full" 
                                  src={userEmail === "binavia@injourney.co.id" ? imgFrame1000001779 : imgFrame1000001778} 
                                />
                              </div>
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
                        </div>
                        <div className="absolute bg-[#5ae2c3] content-stretch flex items-center justify-center left-[84px] p-[4px] rounded-[1.67772e+07px] size-[32px] top-[84px]" data-name="Container">
                          <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px]" />
                          <BackgroundImage5 additionalClassNames="relative shrink-0 size-[16px]">
                            <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #181D27)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #181D27)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </BackgroundImage5>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-[223px]" data-name="Container">
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] min-w-full not-italic relative shrink-0 text-[#181d27] text-[24px] text-center w-[min-content]">{userName}</p>
                        <div className="bg-neutral-100 h-[24.5px] relative rounded-[1.67772e+07px] shrink-0 w-[105.617px]" data-name="Container">
                          <div className="absolute h-[16.5px] left-[12px] top-[4px] w-[21.391px]" data-name="Text">
                            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[11px] not-italic text-[#717680] text-[11px] text-center text-nowrap top-[0.5px] translate-x-[-50%] whitespace-pre">NIK:</p>
                          </div>
                          <div className="absolute h-[16.5px] left-[41.39px] top-[4px] w-[52.227px]" data-name="Text">
                            <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[26px] not-italic text-[#181d27] text-[11px] text-center text-nowrap top-[0.5px] translate-x-[-50%] whitespace-pre">26010001</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[223px]" data-name="Container">
                        <ContainerBackgroundImage>
                          <BackgroundImage16 additionalClassNames="bg-[rgba(0,133,138,0.1)] size-[32px]">
                            <BackgroundImage11 additionalClassNames="relative shrink-0 size-[16px]">
                              <g clipPath="url(#clip0_3_7212)" id="Icon">
                                <path d={svgPaths.p4d64300} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                <path d={svgPaths.p17c50d00} id="Vector_3" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3_7212">
                                  <rect fill="white" height="16" width="16" />
                                </clipPath>
                              </defs>
                            </BackgroundImage11>
                          </BackgroundImage16>
                          <ContainerBackgroundImage1 additionalClassNames="h-[33px] w-[151.266px]">
                            <BackgroundImageAndText1 text="Jabatan" additionalClassNames="w-full" />
                            <TextBackgroundImageAndText text={jobTitle} additionalClassNames="w-full" />
                          </ContainerBackgroundImage1>
                        </ContainerBackgroundImage>
                        <ContainerBackgroundImage>
                          <BackgroundImage16 additionalClassNames="bg-[rgba(49,198,177,0.2)] size-[32px]">
                            <BackgroundImage5 additionalClassNames="relative shrink-0 size-[16px]">
                              <path d={svgPaths.p22ba8b40} id="Vector" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                              <path d={svgPaths.p2ca06d00} id="Vector_2" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            </BackgroundImage5>
                          </BackgroundImage16>
                          <div className="h-[33px] relative shrink-0" data-name="Container">
                            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start relative">
                              <BackgroundImageAndText1 text="Email" additionalClassNames="w-[151.266px]" />
                              <TextBackgroundImageAndText text={fullUserEmail} additionalClassNames="overflow-clip w-[151.266px]" />
                            </div>
                          </div>
                        </ContainerBackgroundImage>
                        <ContainerBackgroundImage>
                          <BackgroundImage16 additionalClassNames="bg-[rgba(0,133,138,0.1)] size-[32px]">
                            <BackgroundImage5 additionalClassNames="relative shrink-0 size-[16px]">
                              <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                              <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            </BackgroundImage5>
                          </BackgroundImage16>
                          <ContainerBackgroundImage1 additionalClassNames="h-[49.5px] w-[151.266px]">
                            <BackgroundImageAndText1 text="Atasan Langsung" additionalClassNames="w-full" />
                            <TextBackgroundImageAndText text={directSupervisor} additionalClassNames="w-full" />
                            <BackgroundImageAndText3 text={supervisorTitle} />
                          </ContainerBackgroundImage1>
                        </ContainerBackgroundImage>
                        <ContainerBackgroundImage>
                          <BackgroundImage16 additionalClassNames="bg-[rgba(0,101,115,0.1)] size-[32px]">
                            <BackgroundImage5 additionalClassNames="relative shrink-0 size-[16px]">
                              <path d={svgPaths.p897d600} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                              <path d={svgPaths.p32a34e80} id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            </BackgroundImage5>
                          </BackgroundImage16>
                          <ContainerBackgroundImage1 additionalClassNames="h-[49.5px] w-[143.266px]">
                            <BackgroundImageAndText1 text="Unit Kerja" additionalClassNames="w-full" />
                            <TextBackgroundImageAndText text={workUnit} additionalClassNames="w-full" />
                            <BackgroundImageAndText3 text="InJourney Holding" />
                          </ContainerBackgroundImage1>
                        </ContainerBackgroundImage>
                      </div>
                    </div>
                    <button 
                      onClick={onProfileClick}
                      className="bg-white content-stretch flex gap-[16px] items-center px-[29px] py-[8px] relative rounded-[6px] shrink-0 cursor-pointer hover:bg-gray-50 transition-colors" 
                      data-name="Button"
                    >
                      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#181d27] text-[14px] text-nowrap whitespace-pre">Lihat Profil Lengkap</p>
                      <BackgroundImage5 additionalClassNames="relative shrink-0 size-[16px]">
                        <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #181D27)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p287e9400} id="Vector_2" stroke="var(--stroke-0, #181D27)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </BackgroundImage5>
                    </button>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[2px_2px_10px_0px_rgba(221,225,230,0.2)]" />
              </div>
            </div>
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Container">
              <CardBackgroundImage>
                <div className="relative shrink-0 w-full" data-name="WelcomeBanner">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative w-full">
                    <BackgroundImage16 additionalClassNames="bg-[rgba(223,253,234,0.4)] size-[40px]">
                      <BackgroundImage10>
                        <g clipPath="url(#clip0_6_2795)" id="Icon">
                          <path d={svgPaths.p98ae080} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d="M16.6665 1.66797V5.0013" id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d="M18.3333 3.33203H15" id="Vector_3" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p2661f400} id="Vector_4" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                        <defs>
                          <clipPath id="clip0_6_2795">
                            <rect fill="white" height="20" width="20" />
                          </clipPath>
                        </defs>
                      </BackgroundImage10>
                    </BackgroundImage16>
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
                        <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
                          <BadgeBackgroundImageAndText text="NEW" additionalClassNames="w-[37.266px]" />
                          <TextBackgroundImageAndText1 text="5 Maret 2026" additionalClassNames="w-[63.836px]" />
                        </div>
                        <HeadingBackgroundImageAndText text="Ask Rinjani AI Chatbot Tersedia!" />
                        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#00858a] text-[11px] w-[287px]">Tanyakan tentang HC policy, KPI, atau talent info kapan saja.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBackgroundImage>
              <CardBackgroundImage>
                <WelcomeBannerBackgroundImage>
                  <BackgroundImage16 additionalClassNames="bg-[rgba(223,253,234,0.4)] size-[40px]">
                    <BackgroundImage10>
                      <g clipPath="url(#clip0_6_2782)" id="Icon">
                        <path d={svgPaths.p22b6df00} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p18740200} id="Vector_3" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_2782">
                          <rect fill="white" height="20" width="20" />
                        </clipPath>
                      </defs>
                    </BackgroundImage10>
                  </BackgroundImage16>
                  <ContainerBackgroundImage2>
                    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
                      <BadgeBackgroundImageAndText text="Performance" additionalClassNames="w-[71.844px]" />
                      <TextBackgroundImageAndText1 text="18 Maret 2026" additionalClassNames="w-[68.57px]" />
                    </div>
                    <HeadingBackgroundImageAndText text="KPI Dictionary Diluncurkan" />
                    <ParagraphBackgroundImageAndText text="450+ standar KPI tersedia dengan formula dan benchmark lengkap." additionalClassNames="px-0 py-px" />
                  </ContainerBackgroundImage2>
                </WelcomeBannerBackgroundImage>
              </CardBackgroundImage>
              <CardBackgroundImage>
                <WelcomeBannerBackgroundImage>
                  <BackgroundImage16 additionalClassNames="bg-[rgba(223,253,234,0.4)] size-[40px]">
                    <IconBackgroundImage3>
                      <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p1b3a69c0} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.pfc72880} id="Vector_3" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </IconBackgroundImage3>
                  </BackgroundImage16>
                  <ContainerBackgroundImage2>
                    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
                      <BadgeBackgroundImageAndText text="Talent" additionalClassNames="w-[42.359px]" />
                      <TextBackgroundImageAndText1 text="15 Maret 2026" additionalClassNames="w-[68.484px]" />
                    </div>
                    <HeadingBackgroundImageAndText text="Succession Planning 2026 Dimulai" />
                    <ParagraphBackgroundImageAndText text="Submit kandidat successor untuk posisi kritis sebelum 30 April." />
                  </ContainerBackgroundImage2>
                </WelcomeBannerBackgroundImage>
              </CardBackgroundImage>
            </div>
          </div>
        </div>
      </div>
      
      {/* Employee Survey Section - Pending Surveys */}
      <PendingSurveySection userRole={userRole} />
      
      <div className="bg-neutral-50 relative shrink-0 w-full">
        <div className="size-full">
          <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
            <div className="bg-gradient-to-r from-[#073dc7] relative rounded-[16px] shrink-0 to-[#31c6b1] w-full">
              <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col gap-[48px] items-start justify-center p-[48px] relative w-full">
                  <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
                    <div className="relative shrink-0 size-[30px]" data-name="noto:party-popper">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
                        <g id="noto:party-popper">
                          <path d={svgPaths.p8fed080} fill="var(--fill-0, #FFC107)" id="Vector" />
                          <path d={svgPaths.p3b6e8a00} fill="var(--fill-0, #FF8F00)" id="Vector_2" />
                          <path d={svgPaths.p30fcd300} fill="var(--fill-0, #FFFDE7)" id="Vector_3" opacity="0.44" />
                          <path d={svgPaths.p343d10b0} fill="url(#paint0_linear_3_6978)" id="Vector_4" />
                          <path d={svgPaths.p38f83200} fill="var(--fill-0, #03A9F4)" id="Vector_5" />
                          <path d={svgPaths.pe381180} fill="var(--fill-0, #F44336)" id="Vector_6" />
                          <path d={svgPaths.pe41bc00} fill="var(--fill-0, #F48FB1)" id="Vector_7" />
                          <path d={svgPaths.p3e55ee80} fill="var(--fill-0, #C92B27)" id="Vector_8" />
                          <path d={svgPaths.p23bf1b00} fill="var(--fill-0, #FFC107)" id="Vector_9" />
                          <path d={svgPaths.p1414ac00} fill="var(--fill-0, #FB8C00)" id="Vector_10" />
                          <path d={svgPaths.pb9fdc00} fill="var(--fill-0, #03A9F4)" id="Vector_11" />
                          <path d={svgPaths.p576a980} fill="var(--fill-0, #FB8C00)" id="Vector_12" />
                          <path d={svgPaths.p1edc7700} fill="var(--fill-0, #FFC107)" id="Vector_13" />
                          <path d={svgPaths.p254dc00} fill="var(--fill-0, #FB8C00)" id="Vector_14" />
                          <path d={svgPaths.p2e2c1f70} fill="var(--fill-0, #F44336)" id="Vector_15" />
                          <path d={svgPaths.p24962400} fill="var(--fill-0, #FB8C00)" id="Vector_16" />
                          <path d={svgPaths.p777c00} fill="var(--fill-0, #F48FB1)" id="Vector_17" />
                          <path d={svgPaths.p1fbc0180} fill="var(--fill-0, #F44336)" id="Vector_18" />
                        </g>
                        <defs>
                          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_6978" x1="17.4338" x2="10.4571" y1="14.4935" y2="18.6795">
                            <stop offset="0.024" stopColor="#8F4700" />
                            <stop offset="1" stopColor="#703E2D" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[20px] text-nowrap text-white whitespace-pre">Happy Birthday To Our Besties</p>
                  </div>
                  <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                    <div className="overflow-x-auto flex gap-[24px] items-center relative shrink-0 w-full">
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-white content-stretch flex gap-[24px] h-full items-start overflow-clip p-[24px] relative rounded-[16px] shadow-[0px_4px_8px_-2px_rgba(10,13,18,0.1),0px_2px_4px_-2px_rgba(10,13,18,0.06)] shrink-0" data-name="Employee Card HBD">
                          <div className="relative rounded-[120px] shrink-0 size-[120px]">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[120px] size-full" src={imgFrame1000001778} />
                          </div>
                          <BackgroundImage1 text={userName} text1={jobTitle} text2="Head Office" />
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-white content-stretch flex gap-[24px] h-full items-start overflow-clip p-[24px] relative rounded-[16px] shadow-[0px_4px_8px_-2px_rgba(10,13,18,0.1),0px_2px_4px_-2px_rgba(10,13,18,0.06)] shrink-0" data-name="Employee Card HBD">
                          <div className="relative rounded-[120px] shrink-0 size-[120px]">
                            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[120px] size-full" src={imgFrame1000001779} />
                          </div>
                          <BackgroundImage1 text="Binavia Wardhani" text1="Senior Officer Human Capital Strategy" text2="Head Office" />
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-white content-stretch flex gap-[24px] h-full items-center overflow-clip p-[24px] relative rounded-[16px] shadow-[0px_4px_8px_-2px_rgba(10,13,18,0.1),0px_2px_4px_-2px_rgba(10,13,18,0.06)] shrink-0" data-name="Employee Card HBD">
                          <BackgroundImage2 />
                          <BackgroundImage1 text="Agung Triatmodjo" text1="CCTV Senior Operator" text2="Kantor Cabang Bandara Soekarno-Hatta" />
                        </div>
                      </div>
                      <div className="bg-white content-stretch flex gap-[24px] items-center overflow-clip p-[24px] relative rounded-[16px] shadow-[0px_4px_8px_-2px_rgba(10,13,18,0.1),0px_2px_4px_-2px_rgba(10,13,18,0.06)] shrink-0" data-name="Employee Card HBD">
                        <BackgroundImage2 />
                        <div className="content-stretch flex flex-col gap-[10px] items-start justify-center not-italic relative shrink-0 w-[288px]">
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] relative shrink-0 text-[#414651] text-[20px] w-full">Hariandika Pranotosetyo</p>
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#535862] text-[16px] w-full">{`Deputy Regional Human Capital Solution & Business Support`}</p>
                          <p className="[white-space-collapse:collapse] font-['Inter:Medium',sans-serif] font-medium leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#717680] text-[16px] text-nowrap w-full">Kantor Regional III-KNO</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative shrink-0 w-full">
        <div className="size-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1324px]" data-name="Container">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[#414651] text-[20px] text-nowrap whitespace-pre">Histori Riwayat Perfoma Anda</p>
            </div>
            <div className="gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[401px] relative shrink-0 w-full" data-name="PerformanceCards">
              <div className="[grid-area:1_/_1] place-self-stretch relative rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0" data-name="Card" style={{ backgroundImage: "linear-gradient(127.974deg, rgb(0, 133, 138) 0%, rgba(0, 133, 138, 0.8) 100%)" }}>
                <BackgroundImage20>
                  <BackgroundImage19>
                    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="PerformanceCards">
                      <BackgroundImage17>
                        <IconBackgroundImage4>
                          <path d="M16 7H22V13" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d={svgPaths.p13253c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </IconBackgroundImage4>
                      </BackgroundImage17>
                      <div className="bg-[rgba(255,255,255,0.2)] h-[20px] relative rounded-[6px] shrink-0 w-[74.438px]" data-name="Badge">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                          <div className="absolute left-[8px] size-[12px] top-[4px]" data-name="Icon">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                              <g id="Icon">
                                <path d="M8 3.5H11V6.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
                                <path d={svgPaths.p3a7e7417} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>
                          </div>
                          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[28px] not-italic text-[12px] text-nowrap text-white top-[2.5px] whitespace-pre">+4.2%</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[7px] items-start px-0 py-[2px] relative shrink-0 w-full" data-name="PerformanceCards">
                      <TextBackgroundImageAndText3 text="Performance Index Anda" additionalClassNames="w-[186.734px]" />
                      <div className="h-[72px] relative shrink-0 w-[242px]" data-name="Container">
                        <div className="absolute h-[72px] left-0 top-0 w-[149.375px]" data-name="Text">
                          <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[72px] left-0 not-italic text-[48px] text-nowrap text-white top-0 whitespace-pre">107.45</p>
                        </div>
                        <div className="absolute h-[24px] left-[157.38px] top-[36px] w-[32.867px]" data-name="Text">
                          <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.6)] text-nowrap top-[-1px] whitespace-pre">/150</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-full" data-name="Container">
                        <TextBackgroundImageAndText4 text="Rating: Berkinerja Sangat Baik" />
                        <ParagraphBackgroundImageAndText3 text="vs 2024" />
                      </div>
                    </div>
                  </BackgroundImage19>
                  <div className="relative rounded-[6px] shrink-0" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Lihat Detail KPI</p>
                      <IconBackgroundImage />
                    </div>
                  </div>
                </BackgroundImage20>
              </div>
              <div className="[grid-area:1_/_2] bg-gradient-to-b from-[#31c6b1] place-self-stretch relative rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#5ae2c3]" data-name="Card">
                <BackgroundImage20>
                  <BackgroundImage19>
                    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="PerformanceCards">
                      <BackgroundImage17>
                        <IconBackgroundImage4>
                          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d={svgPaths.p3c6311f0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d={svgPaths.p3d728000} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </IconBackgroundImage4>
                      </BackgroundImage17>
                      <BadgeBackgroundImageAndText2 text="On Track" additionalClassNames="w-[67.805px]" />
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="PerformanceCards">
                      <TextBackgroundImageAndText3 text="EQS Element" additionalClassNames="w-[155.211px]" />
                      <div className="content-stretch flex gap-[8px] items-end relative shrink-0" data-name="Container">
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[72px] not-italic relative shrink-0 text-[48px] text-nowrap text-white whitespace-pre">85.83</p>
                        <div className="content-stretch flex items-center justify-center pb-[16px] pt-0 px-0 relative shrink-0">
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] text-nowrap whitespace-pre">/100</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-full" data-name="Container">
                        <TextBackgroundImageAndText4 text="Kategori: Baik" />
                        <ParagraphBackgroundImageAndText3 text="vs 2024" />
                      </div>
                    </div>
                  </BackgroundImage19>
                  <div className="relative rounded-[6px] shrink-0" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11px] items-center relative">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Detail Job Fit</p>
                      <IconBackgroundImage />
                    </div>
                  </div>
                </BackgroundImage20>
              </div>
              <div className="[grid-area:1_/_3] place-self-stretch relative rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0" data-name="Card" style={{ backgroundImage: "linear-gradient(127.974deg, rgb(244, 143, 30) 0%, rgb(159, 88, 8) 100%)" }}>
                <div className="size-full">
                  <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
                    <div className="h-[48px] relative shrink-0 w-full" data-name="PerformanceCards">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
                        <BackgroundImage17>
                          <IconBackgroundImage4>
                            <path d={svgPaths.p3ffb6d2c} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d={svgPaths.p2f14bd80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </IconBackgroundImage4>
                        </BackgroundImage17>
                        <BadgeBackgroundImageAndText2 text="Top Talent" additionalClassNames="w-[75.906px]" />
                      </div>
                    </div>
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="PerformanceCards">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between px-0 py-[2px] relative size-full">
                        <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                          <TextBackgroundImageAndText3 text="Posisi 9-Box Anda" additionalClassNames="w-[137.641px]" />
                          <div className="h-[54.5px] relative shrink-0 w-[212.477px]" data-name="Text">
                            <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-0 not-italic text-[20px] text-white top-[-3px] w-[213px]">High Performer - High Potential</p>
                          </div>
                          <div className="h-[33px] relative shrink-0 w-[242px]" data-name="Paragraph">
                            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-[rgba(255,255,255,0.7)] top-[0.5px] w-[190px]">{`Box: Top Talent (Consistently Strong Performance & High Potential)`}</p>
                          </div>
                          <div className="gap-[4px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[92px] relative shrink-0 w-full" data-name="Container">
                            <div className="[grid-area:1_/_1] bg-[rgba(255,255,255,0.2)] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                            <div className="[grid-area:1_/_2] bg-[rgba(255,255,255,0.2)] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                            <div className="[grid-area:1_/_3] bg-white opacity-[0.682] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                            <div className="[grid-area:2_/_1] bg-[rgba(255,255,255,0.2)] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                            <div className="[grid-area:2_/_2] bg-[rgba(255,255,255,0.2)] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                            <div className="[grid-area:2_/_3] bg-[rgba(255,255,255,0.2)] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                            <div className="[grid-area:3_/_1] bg-[rgba(255,255,255,0.2)] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                            <div className="[grid-area:3_/_2] bg-[rgba(255,255,255,0.2)] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                            <div className="[grid-area:3_/_3] bg-[rgba(255,255,255,0.2)] place-self-stretch rounded-[4px] shrink-0" data-name="Container" />
                          </div>
                        </div>
                        <BackgroundImageAndText4 text="Lihat Talent Profile" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="[grid-area:1_/_4] place-self-stretch relative rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0" data-name="Card" style={{ backgroundImage: "linear-gradient(127.974deg, rgb(240, 68, 56) 0%, rgb(231, 0, 11) 100%)" }}>
                <BackgroundImage20 additionalClassNames="overflow-clip rounded-[inherit]">
                  <div className="content-stretch flex flex-col gap-[16px] h-[265.5px] items-start relative shrink-0 w-full" data-name="PerformanceCards">
                    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                      <BackgroundImage17>
                        <IconBackgroundImage4>
                          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M12 8V12" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M12 16H12.01" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </IconBackgroundImage4>
                      </BackgroundImage17>
                      <div className="bg-white h-[20px] relative rounded-[6px] shrink-0 w-[23.523px]" data-name="Badge">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit] size-full">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f04438] text-[12px] text-nowrap whitespace-pre">3</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[11px] items-start px-0 py-[2px] relative shrink-0 w-full" data-name="Container">
                      <TextBackgroundImageAndText3 text="Tindakan Diperlukan" additionalClassNames="w-[154.484px]" />
                      <div className="h-[65.5px] relative shrink-0 w-[124.594px]" data-name="Text">
                        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] left-0 not-italic text-[24px] text-white top-[-4px] w-[125px]">3 approval menunggu</p>
                      </div>
                      <div className="content-stretch flex flex-col gap-[4px] h-[57.5px] items-start relative shrink-0 w-full" data-name="Container">
                        <ParagraphBackgroundImageAndText4 text="• KPI Check-In Q4 2025 (12 pekerja)" />
                        <ParagraphBackgroundImageAndText4 text="• Talent Day posisi Senior Manager" />
                        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
                          <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16.5px] min-h-px min-w-px not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.8)]">• 2 kandidat Job Tender menunggu review</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BackgroundImageAndText4 text="Lihat Semua" />
                </BackgroundImage20>
              </div>
            </div>
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
              <SpiderwebDiagramBackgroundImage>
                <div className="content-stretch flex items-center relative shrink-0 w-full">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                    <div className="[grid-area:1_/_1] content-stretch flex items-center ml-0 mt-0 relative">
                      <div className="flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#252b37] text-[20px] w-[197px]">
                        <p className="leading-[24px]">9 Boxes</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
                  <div className="basis-0 content-stretch flex flex-col gap-[24px] grow h-full items-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 content-stretch flex gap-[24px] grow items-start min-h-px min-w-px relative shrink-0 w-full">
                      <BackgroundImage3 text="Talenta Belum Optimal" text1="(" text2="Sleeping Tiger" text3=")" />
                      <BackgroundImage4 text="Talenta Berbakat" text1="(Promotable)" />
                      <div className="basis-0 bg-[#f4fbf4] grow h-full min-h-px min-w-px relative rounded-[5px] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)] shrink-0">
                        <div className="overflow-clip rounded-[inherit] size-full">
                          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
                            <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[#4bb543] text-[14px] w-[min-content]">
                              <p className="mb-0">Talenta Berpotensi Tinggi</p>
                              <p>(High Potential)</p>
                            </div>
                            <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
                              <div className="content-stretch flex h-[20px] items-center relative shrink-0">
                                <BackgroundImage11 additionalClassNames="relative shrink-0 size-[16px]">
                                  <g id="location-on">
                                    <path d={svgPaths.p10223a00} fill="var(--fill-0, #4BB543)" id="Vector" />
                                  </g>
                                </BackgroundImage11>
                              </div>
                              <div className="content-stretch flex flex-col items-start relative shrink-0">
                                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#4bb543] text-[14px] text-nowrap whitespace-pre">Posisi Anda</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex gap-[24px] grow items-start min-h-px min-w-px relative shrink-0 w-full">
                      <BackgroundImage3 text="Talenta Belum Optimal" text1="(" text2="Sleeping Tiger" text3=")" />
                      <BackgroundImage4 text="Talenta Berbakat" text1="(Promotable)" />
                      <BackgroundImage3 text="Talenta Berbakat" text1="(" text2="Promotable" text3=")" />
                    </div>
                    <div className="basis-0 content-stretch flex gap-[24px] grow items-start min-h-px min-w-px relative shrink-0 w-full">
                      <BackgroundImage3 text="Talenta yang Tidak Sesuai" text1="(" text2="Unfit" text3=")" />
                      <BackgroundImage3 text="Talenta Penyokong" text1="(" text2="Solid Contributor" text3=")" />
                      <BackgroundImage4 text="Talenta Penyokong" text1="(Solid Contributor)" />
                    </div>
                  </div>
                </div>
              </SpiderwebDiagramBackgroundImage>
              <SpiderwebDiagramBackgroundImage>
                <div className="content-stretch flex items-center relative shrink-0 w-full">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                    <div className="[grid-area:1_/_1] content-stretch flex items-center ml-0 mt-0 relative">
                      <div className="flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#535862] text-[20px] w-[197px]">
                        <p className="leading-[24px]">Spider Diagram</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                    <p className="[grid-area:1_/_1] font-['Inter:Medium',sans-serif] font-medium leading-[normal] ml-[288.68px] mt-0 not-italic relative text-[#414651] text-[16px] text-center translate-x-[-50%] w-[59.221px]">Kinerja</p>
                    <p className="[grid-area:1_/_1] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] ml-[487.81px] mt-[125.83px] relative text-[#414651] text-[16px] text-nowrap whitespace-pre">
                      Kesesuaian
                      <br aria-hidden="true" />
                      Kompetensi
                    </p>
                    <p className="[grid-area:1_/_1] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] ml-[480px] mt-[324.33px] relative text-[#414651] text-[16px] text-nowrap whitespace-pre">Experience</p>
                    <p className="[grid-area:1_/_1] font-['Inter:Medium',sans-serif] font-medium leading-[normal] ml-[288.71px] mt-[439.67px] not-italic relative text-[#414651] text-[16px] text-center translate-x-[-50%] w-[84.444px]">Sertifikasi</p>
                    <p className="[grid-area:1_/_1] font-['Inter:Medium',sans-serif] font-medium h-[13.539px] leading-[normal] ml-[52.36px] mt-[330.64px] not-italic relative text-[#414651] text-[16px] text-center translate-x-[-50%] w-[104.718px]">Training</p>
                    <p className="[grid-area:1_/_1] font-['Inter:Medium',sans-serif] font-medium leading-[normal] ml-[53.69px] mt-[126.84px] not-italic relative text-[#414651] text-[16px] text-center translate-x-[-50%] w-[67.994px]">Aspirasi</p>
                    <div className="[grid-area:1_/_1] h-[389.077px] ml-[75.84px] mt-[43.45px] relative w-[426.692px]" data-name="Diagram">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 427 390">
                        <g id="Diagram">
                          <path d={svgPaths.p258bb700} id="Polygon 3" stroke="var(--stroke-0, #717680)" />
                          <path d={svgPaths.p11c73200} id="Polygon 4" stroke="var(--stroke-0, #717680)" />
                          <path d={svgPaths.pa592900} id="Polygon 6" stroke="var(--stroke-0, #717680)" />
                          <path d={svgPaths.pe967600} id="Polygon 7" stroke="var(--stroke-0, #717680)" />
                          <path d={svgPaths.p14ba1480} id="Polygon 5" stroke="var(--stroke-0, #717680)" />
                          <path d={svgPaths.pa7bbba8} id="Vector 12" stroke="var(--stroke-0, #717680)" />
                          <path d={svgPaths.p16e02e00} id="Vector 13" stroke="var(--stroke-0, #717680)" />
                          <path d={svgPaths.p227a1000} id="Vector 14" stroke="var(--stroke-0, #717680)" />
                          <path d={svgPaths.p24faa2c0} id="Vector 15" stroke="var(--stroke-0, #717680)" />
                          <path d="M213.625 195.173V129.111" id="Vector 16" stroke="var(--stroke-0, #717680)" />
                          <line id="Line 136" stroke="var(--stroke-0, #717680)" x1="213.198" x2="213.198" y1="195.012" y2="387.901" />
                        </g>
                      </svg>
                    </div>
                    <div className="[grid-area:1_/_1] h-[232.302px] ml-[101.45px] mt-[106.89px] relative w-[313.371px]" data-name="Blue">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314 233">
                        <g id="Blue">
                          <ellipse cx="3.12591" cy="229.452" fill="var(--fill-0, #717680)" id="Ellipse 40" rx="3.12591" ry="2.85035" />
                          <ellipse cx="187.554" cy="227.315" fill="var(--fill-0, #717680)" id="Ellipse 41" rx="3.12591" ry="2.85035" />
                          <path d={svgPaths.p35c5680} fill="var(--fill-0, white)" fillOpacity="0.2" id="Vector 21" stroke="var(--stroke-0, #252B37)" strokeWidth="2" />
                          <ellipse cx="310.246" cy="195.962" fill="var(--fill-0, #717680)" id="Ellipse 42" rx="3.12591" ry="2.85035" />
                          <ellipse cx="310.246" cy="68.407" fill="var(--fill-0, #717680)" id="Ellipse 43" rx="3.12591" ry="2.85035" />
                          <ellipse cx="96.1218" cy="82.6589" fill="var(--fill-0, #717680)" id="Ellipse 46" rx="3.12591" ry="2.85035" />
                          <ellipse cx="187.554" cy="2.85035" fill="var(--fill-0, #717680)" id="Ellipse 45" rx="3.12591" ry="2.85035" />
                        </g>
                      </svg>
                    </div>
                    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[273.35px] mt-[32.78px] place-items-start relative" data-name="Scale">
                      <BackgroundImageAndText5 text="80" additionalClassNames="mt-[34.57px]" />
                      <BackgroundImageAndText5 text="60" additionalClassNames="mt-[69.56px]" />
                      <BackgroundImageAndText6 text="20" additionalClassNames="mt-[135.7px]" />
                      <BackgroundImageAndText6 text="40" additionalClassNames="mt-[103.71px]" />
                      <BackgroundImageAndText6 text="100" additionalClassNames="mt-0" />
                    </div>
                  </div>
                </div>
              </SpiderwebDiagramBackgroundImage>
            </div>
          </div>
        </div>
      </div>
      <ExternalSystemsBackgroundImage>
        <HeadingBackgroundImage>Akses Sistem Terkait</HeadingBackgroundImage>
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
          <BackgroundImage7>
            <BackgroundImage18>
              <div className="content-stretch flex h-[40px] items-start justify-between relative shrink-0 w-full" data-name="Container">
                <div className="bg-[#1570ef] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
                    <div className="relative shrink-0 size-[40px]" data-name="simple-icons:sap">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                        <g id="simple-icons:sap">
                          <path d={svgPaths.p24dca6c0} fill="var(--fill-0, white)" id="Vector" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px]" />
                </div>
                <ContainerBackgroundImage3>
                  <div className="bg-[#5ae2c3] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
                  </div>
                  <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
                    <BackgroundImageAndText2 text="Connected" />
                  </div>
                </ContainerBackgroundImage3>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] h-[44.5px] items-start relative shrink-0 w-full" data-name="Container">
                <BackgroundImage15>{`SAP HCM & Employee Central (Core HCM)`}</BackgroundImage15>
                <BackgroundImageAndText3 text="Master data pekerja, organizational structure, employee files" />
              </div>
              <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Button">
                <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[6px]" />
                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[73.77px] not-italic text-[#181d27] text-[14px] top-[8.5px] w-[187px]">Buka SAP Employee Central</p>
                <IconBackgroundImage1 additionalClassNames="absolute left-[276.23px] top-[10px]" />
              </div>
            </BackgroundImage18>
          </BackgroundImage7>
          <BackgroundImage7>
            <BackgroundImage18>
              <div className="content-stretch flex h-[40px] items-start justify-between relative shrink-0 w-full" data-name="Container">
                <BackgroundImage16 additionalClassNames="bg-[#f8f9fc] size-[40px]">
                  <BackgroundImage10>
                    <g id="person">
                      <path d={svgPaths.p3a1dbc30} fill="var(--fill-0, #3E4784)" id="Vector" />
                    </g>
                  </BackgroundImage10>
                </BackgroundImage16>
                <ContainerBackgroundImage3>
                  <div className="bg-[#5ae2c3] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
                  </div>
                  <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
                    <BackgroundImageAndText2 text="Connected" />
                  </div>
                </ContainerBackgroundImage3>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] h-[44.5px] items-start relative shrink-0 w-full" data-name="Container">
                <HeadingBackgroundImageAndText1 text="Employee Benefit" />
                <BackgroundImageAndText3 text="Sistem pengaturan dan penyimpanan benefit yang dimiliki pekerja" />
              </div>
              <ButtonBackgroundImageAndText text="Buka Employee Benefit" />
            </BackgroundImage18>
          </BackgroundImage7>
          <BackgroundImage7>
            <BackgroundImage18>
              <div className="content-stretch flex h-[40px] items-start justify-between relative shrink-0 w-full" data-name="Container">
                <BackgroundImage16 additionalClassNames="bg-sky-50 size-[40px]">
                  <BackgroundImage10>
                    <g id="flight">
                      <path d={svgPaths.p3e830380} fill="var(--fill-0, #0086C9)" id="Vector" />
                    </g>
                  </BackgroundImage10>
                </BackgroundImage16>
                <ContainerBackgroundImage3>
                  <div className="bg-[#5ae2c3] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
                  </div>
                  <div className="basis-0 grow h-[15px] min-h-px min-w-px relative shrink-0" data-name="Text">
                    <BackgroundImageAndText2 text="Connected" />
                  </div>
                </ContainerBackgroundImage3>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] h-[44.5px] items-start relative shrink-0 w-full" data-name="Container">
                <HeadingBackgroundImageAndText1 text="Travel Management" />
                <BackgroundImageAndText3 text="Sistem pengaturan akomodasi perjalanan pekerja" />
              </div>
              <ButtonBackgroundImageAndText text="Buka Travel Management" />
            </BackgroundImage18>
          </BackgroundImage7>
        </div>
      </ExternalSystemsBackgroundImage>
      
      <ExternalSystemsBackgroundImage>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="AnnouncementsSection">
          <HeadingBackgroundImage>{`Pengumuman & Informasi Penting`}</HeadingBackgroundImage>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Pengumuman dan Informasi Penting">
          <div className="bg-neutral-100 relative rounded-[16px] shrink-0" data-name="Tab List">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[4px] relative">
              <div className="bg-white h-[29px] relative rounded-[16px] shrink-0" data-name="Primitive.button">
                <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <BackgroundImageAndText7 text="Semua" additionalClassNames="h-full" />
              </div>
              <div className="relative rounded-[16px] shrink-0" data-name="Primitive.button">
                <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <BackgroundImageAndText7 text="Performance" />
              </div>
              <div className="relative rounded-[16px] shrink-0" data-name="Primitive.button">
                <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <BackgroundImageAndText7 text="Talent" />
              </div>
              <div className="relative rounded-[16px] shrink-0" data-name="Primitive.button">
                <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <BackgroundImageAndText7 text="Learning" />
              </div>
              <div className="relative rounded-[16px] shrink-0" data-name="Primitive.button">
                <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                <BackgroundImageAndText7 text="Sistem" />
              </div>
            </div>
          </div>
          <BackgroundImage19>
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex gap-[8px] h-[16.5px] items-center pl-0 pr-[-0.008px] py-0 relative shrink-0 w-full" data-name="Container">
                <Container />
                <TextBackgroundImageAndText5 text="Minggu Ini" additionalClassNames="w-[78.992px]" />
                <Container />
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <BackgroundImage16 additionalClassNames="bg-[rgba(0,133,138,0.1)] size-[40px]">
                      <BackgroundImage10>
                        <g clipPath="url(#clip0_3_7078)" id="Icon">
                          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                        <defs>
                          <clipPath id="clip0_3_7078">
                            <rect fill="white" height="20" width="20" />
                          </clipPath>
                        </defs>
                      </BackgroundImage10>
                    </BackgroundImage16>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[156.617px]" data-name="Container">
                        <BadgeBackgroundImageAndText3 text="Performance" />
                        <BackgroundImageAndText text="18 Maret 2026" additionalClassNames="left-[88.05px] w-[68.57px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="KPI Dictionary Rinjani Telah Diluncurkan - 450+ Standar KPI Tersedia" />
                        <ParagraphBackgroundImageAndText5 text="Akses definisi standar KPI, formula perhitungan, dan benchmark untuk memudahkan goal-setting KPI Anda. Katalog mencakup KPI untuk semua fungsi bisnis." />
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[200.664px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Explore KPI Dictionary</p>
                        <IconBackgroundImage2 additionalClassNames="left-[172.66px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <BackgroundImage16 additionalClassNames="bg-[rgba(0,101,115,0.1)] size-[40px]">
                      <IconBackgroundImage3>
                        <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p18406864} id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </IconBackgroundImage3>
                    </BackgroundImage16>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[123.766px]" data-name="Container">
                        <BadgeBackgroundImageAndText4 text="Talent" />
                        <BackgroundImageAndText text="15 Maret 2026" additionalClassNames="left-[55.28px] w-[68.484px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="Siklus Succession Planning 2026 Semester I Dimulai - Submit Kandidat sebelum 30 April" />
                        <ParagraphBackgroundImageAndText5 text="HCBP dan unit leaders diminta mengidentifikasi successor untuk posisi kritis. Gunakan modul Succession Planning untuk submit kandidat dan jadwalkan Talent Day." />
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[253.461px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Panduan Succession Planning</p>
                        <IconBackgroundImage2 additionalClassNames="left-[225.46px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex gap-[8px] h-[16.5px] items-center relative shrink-0 w-full" data-name="Container">
                <Container1 />
                <TextBackgroundImageAndText5 text="30 Hari Terakhir" additionalClassNames="w-[108.438px]" />
                <Container1 />
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <BackgroundImage16 additionalClassNames="bg-[rgba(90,226,195,0.2)] size-[40px]">
                      <IconBackgroundImage3>
                        <path d={svgPaths.p12946f00} id="Vector" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M18.3333 8.33333V13.3333" id="Vector_2" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p1ead9c00} id="Vector_3" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </IconBackgroundImage3>
                    </BackgroundImage16>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[136.492px]" data-name="Container">
                        <BadgeBackgroundImageAndText5 text="Learning" />
                        <BackgroundImageAndText text="12 Maret 2026" additionalClassNames="left-[68.04px] w-[68.453px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="Individual Learning Dashboard Kini Tersedia - Track Progress Pembelajaran Anda" />
                        <ParagraphBackgroundImageAndText5 text="Pantau learning hours YTD, course completion, certificates, dan learning path personal Anda dalam satu dashboard interaktif." />
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[197.758px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Lihat Dashboard Saya</p>
                        <IconBackgroundImage2 additionalClassNames="left-[169.76px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <BackgroundImage16 additionalClassNames="bg-[rgba(0,101,115,0.1)] size-[40px]">
                      <IconBackgroundImage3>
                        <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p19291480} id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </IconBackgroundImage3>
                    </BackgroundImage16>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[175.297px]" data-name="Container">
                        <BadgeBackgroundImageAndText4 text="Talent" />
                        <BadgeBackgroundImageAndText6 text="BETA" additionalClassNames="left-[55.28px] w-[43.359px]" />
                        <BackgroundImageAndText text="10 Maret 2026" additionalClassNames="left-[106.64px] w-[68.656px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="Job Tender (External Recruitment) Memasuki Fase Beta - 3 Posisi Pilot" />
                        <ParagraphBackgroundImageAndText5 text="Rekrutmen eksternal kini terintegrasi dengan internal marketplace. Pilot dimulai untuk posisi: HR Analyst, Learning Specialist, dan Data Engineer." />
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[161.727px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Lihat Posisi Beta</p>
                        <IconBackgroundImage2 additionalClassNames="left-[133.73px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <BackgroundImage16 additionalClassNames="bg-[rgba(0,133,138,0.1)] size-[40px]">
                      <IconBackgroundImage3>
                        <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </IconBackgroundImage3>
                    </BackgroundImage16>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[151.969px]" data-name="Container">
                        <BadgeBackgroundImageAndText3 text="Performance" />
                        <BackgroundImageAndText text="8 Maret 2026" additionalClassNames="left-[88.05px] w-[63.922px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="KPI Tree Visualization - Lihat Kontribusi KPI Anda terhadap Target Korporat" />
                        <ParagraphBackgroundImageAndText5 text="Fitur KPI Tree memvisualisasikan cascading KPI dari level korporat hingga individual. Pahami bagaimana pekerjaan Anda berkontribusi pada strategic objectives InJourney." />
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[162.086px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Explore KPI Tree</p>
                        <IconBackgroundImage2 additionalClassNames="left-[134.09px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <div className="relative rounded-[8px] shrink-0 size-[40px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 133, 138, 0.1) 0%, rgba(0, 101, 115, 0.1) 100%)" }}>
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                        <BackgroundImage10>
                          <g clipPath="url(#clip0_3_6881)" id="Icon">
                            <path d={svgPaths.p1c138700} id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M16.6667 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M18.3333 3.33333H15" id="Vector_3" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.p2661f400} id="Vector_4" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3_6881">
                              <rect fill="white" height="20" width="20" />
                            </clipPath>
                          </defs>
                        </BackgroundImage10>
                      </div>
                    </div>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[162.945px]" data-name="Container">
                        <div className="absolute bg-[rgba(0,184,219,0.1)] h-[19.328px] left-0 rounded-[6px] top-0 w-[27.82px]" data-name="Badge">
                          <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.333px] not-italic relative shrink-0 text-[#007595] text-[10px] text-nowrap whitespace-pre">AI</p>
                          </div>
                          <div aria-hidden="true" className="absolute border border-[rgba(0,184,219,0.2)] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        </div>
                        <BadgeBackgroundImageAndText6 text="NEW ✨" additionalClassNames="left-[35.82px] w-[55.289px]" />
                        <BackgroundImageAndText text="5 Maret 2026" additionalClassNames="left-[99.11px] w-[63.836px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="Introducing Ask Rinjani - AI Chatbot untuk HR Support 24/7" />
                        <ParagraphBackgroundImageAndText5 text="Tanyakan apa saja tentang HC policy, KPI definitions, talent info, atau learning programs. Ask Rinjani powered by RAG AI siap membantu Anda kapan saja!" />
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[151.18px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Try Ask Rinjani</p>
                        <IconBackgroundImage2 additionalClassNames="left-[123.18px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <BackgroundImage16 additionalClassNames="bg-[rgba(90,226,195,0.2)] size-[40px]">
                      <IconBackgroundImage3>
                        <path d={svgPaths.p2d8c4900} id="Vector" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M18.3333 8.33333V13.3333" id="Vector_2" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p1ead9c00} id="Vector_3" stroke="var(--stroke-0, #31C6B1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </IconBackgroundImage3>
                    </BackgroundImage16>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[130.445px]" data-name="Container">
                        <BadgeBackgroundImageAndText5 text="Learning" />
                        <BackgroundImageAndText text="1 Maret 2026" additionalClassNames="left-[68.04px] w-[62.406px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="Learning Evaluation L1-L2 Kini Digital - Submit Evaluasi Langsung di Rinjani" />
                        <BackgroundImage12>{`Evaluasi program pelatihan (Reaction & Learning) kini dapat disubmit langsung setelah course completion. Hasil evaluasi membantu kami improve kualitas program.`}</BackgroundImage12>
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[171.992px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Submit Evaluation</p>
                        <IconBackgroundImage2 additionalClassNames="left-[143.99px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex gap-[8px] h-[16.5px] items-center pl-0 pr-[-0.008px] py-0 relative shrink-0 w-full" data-name="Container">
                <Container2 />
                <TextBackgroundImageAndText5 text="Lebih dari 30 Hari" additionalClassNames="w-[117.367px]" />
                <Container2 />
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <BackgroundImage16 additionalClassNames="bg-[rgba(0,101,115,0.1)] size-[40px]">
                      <BackgroundImage10>
                        <g clipPath="url(#clip0_3_6962)" id="Icon">
                          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d="M10 6.66667V10" id="Vector_2" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          <path d="M10 13.3333H10.0083" id="Vector_3" stroke="var(--stroke-0, #006573)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </g>
                        <defs>
                          <clipPath id="clip0_3_6962">
                            <rect fill="white" height="20" width="20" />
                          </clipPath>
                        </defs>
                      </BackgroundImage10>
                    </BackgroundImage16>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[139.625px]" data-name="Container">
                        <div className="absolute bg-[rgba(43,127,255,0.1)] h-[19.328px] left-0 rounded-[6px] top-0 w-[50.43px]" data-name="Badge">
                          <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.333px] not-italic relative shrink-0 text-[#1447e6] text-[10px] text-nowrap whitespace-pre">Sistem</p>
                          </div>
                          <div aria-hidden="true" className="absolute border border-[rgba(43,127,255,0.2)] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        </div>
                        <BackgroundImageAndText text="28 Februari 2026" additionalClassNames="left-[58.43px] w-[81.195px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="Rinjani Stage 1 Officially Launched - Welcome to Enhanced ITMS Platform!" />
                        <ParagraphBackgroundImageAndText5 text="Rinjani Enhancement Stage 1 telah selesai! Nikmati 13 modul baru: Performance Management, Talent Suite, Learning Platform, dan Ask Rinjani AI. Terima kasih atas partisipasinya dalam beta testing." />
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[200.641px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">{`What's New in Stage 1`}</p>
                        <IconBackgroundImage2 additionalClassNames="left-[172.64px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
                <CardBackgroundImage2>
                  <AnnouncementsSectionBackgroundImage>
                    <BackgroundImage16 additionalClassNames="bg-[rgba(0,133,138,0.1)] size-[40px]">
                      <IconBackgroundImage3>
                        <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #00858A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </IconBackgroundImage3>
                    </BackgroundImage16>
                    <BackgroundImage13>
                      <div className="absolute h-[19.328px] left-0 top-0 w-[169.156px]" data-name="Container">
                        <BadgeBackgroundImageAndText3 text="Performance" />
                        <BackgroundImageAndText text="25 Februari 2026" additionalClassNames="left-[88.05px] w-[81.109px]" />
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[46px] items-start left-0 top-[27.33px] w-[1142px]" data-name="Container">
                        <HeadingBackgroundImageAndText1 text="Reminder: Mid-Year Check-In KPI 2026 Dijadwalkan Juni-Juli 2026" />
                        <ParagraphBackgroundImageAndText5 text="Pastikan Goal-Setting KPI Q1-Q2 2026 telah complete. Mid-Year Check-In akan dilakukan untuk review progress dan adjustment target jika diperlukan." />
                      </div>
                      <div className="absolute h-[20px] left-0 rounded-[6px] top-[83.83px] w-[177.414px]" data-name="Button">
                        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#00858a] text-[14px] text-nowrap top-[0.5px] whitespace-pre">KPI Calendar 2026</p>
                        <IconBackgroundImage2 additionalClassNames="left-[149.41px]" />
                      </div>
                    </BackgroundImage13>
                  </AnnouncementsSectionBackgroundImage>
                </CardBackgroundImage2>
              </div>
            </div>
          </BackgroundImage19>
        </div>
      </ExternalSystemsBackgroundImage>
      
      {/* Floating Restart New Employee Onboarding Button - Left Side */}
      {onboardingContext && (
        <button
          onClick={() => {
            if (onboardingContext.restartNewEmployeeOnboarding) {
              onboardingContext.restartNewEmployeeOnboarding();
              toast.success("Onboarding dimulai ulang! Wizard akan muncul sebentar lagi.");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 500);
            } else {
              toast.error('Onboarding tidak tersedia saat ini');
            }
          }}
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          color: 'var(--accent-foreground)',
          border: 'none',
          boxShadow: 'var(--elevation-sm), 0px 8px 16px rgba(0, 101, 115, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          fontFamily: 'Inter, sans-serif'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)';
          e.currentTarget.style.boxShadow = 'var(--elevation-sm), 0px 12px 24px rgba(0, 101, 115, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.boxShadow = 'var(--elevation-sm), 0px 8px 16px rgba(0, 101, 115, 0.3)';
        }}
        aria-label="Restart New Employee Onboarding"
        title="Restart New Employee Onboarding"
      >
        <RotateCcw style={{ width: '24px', height: '24px' }} />
      </button>
      )}

      {/* AI Chatbot - Right Side */}
      <AIChatbot />
    </div>
  );
}