import { useState } from "react";
import clsx from "clsx";
import imgImage318 from "figma:asset/876ad6ef9d7f7e8388fe3a61763ecc9379933a4f.png";
import imgMekari from "figma:asset/0d559df4bd790dc84987d0606774f1cc71eaaed6.png";
import imgSunfish from "figma:asset/593eebcf9f9e4ee6b85ebf855cc630aeee9df9df.png";
import svgPaths from "../imports/svg-ph8rbt6vu1";

type ImageProps = {
  additionalClassNames?: string;
};

function Image({ children, additionalClassNames = "" }: React.PropsWithChildren<ImageProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">{children}</div>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Perfomance({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[#00a199] relative rounded-[8px] shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-[8px] relative">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("bg-white place-self-stretch relative rounded-[8px] shrink-0", additionalClassNames)}>
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center p-[13px] relative size-full">{children}</div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

export default function PlatformPopup() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03)] size-full" data-name="Platform">
      <div className="size-full">
        <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] overflow-clip p-[16px] relative size-full">
          <Wrapper additionalClassNames="[grid-area:1_/_1]">
            <Perfomance>
              <Wrapper1>
                <g id="emoji-events">
                  <path d={svgPaths.p21ef2ec0} fill="var(--fill-0, white)" id="Vector" />
                </g>
              </Wrapper1>
            </Perfomance>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px] text-center text-nowrap whitespace-pre">{`Perfomance `}</p>
          </Wrapper>
          <Wrapper additionalClassNames="[grid-area:1_/_2]">
            <Perfomance>
              <Wrapper1>
                <g clipPath="url(#clip0_9_1105)" id="assignment-ind">
                  <path d={svgPaths.p36c69100} fill="var(--fill-0, white)" id="Vector" />
                </g>
                <defs>
                  <clipPath id="clip0_9_1105">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </Wrapper1>
            </Perfomance>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[#535862] text-[14px] text-center w-[min-content]">Talent</p>
          </Wrapper>
          <Wrapper additionalClassNames="[grid-area:2_/_2]">
            <Image additionalClassNames="size-[36px]">
              <img alt="Sunfish" className="absolute h-[100.27%] left-0 max-w-none top-[-0.13%] w-[308.33%]" src={imgSunfish} />
            </Image>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[#535862] text-[14px] text-center w-[min-content]">Sunfish</p>
          </Wrapper>
          <Wrapper additionalClassNames="[grid-area:2_/_1]">
            <Image additionalClassNames="h-[36px] w-[39px]">
              <img alt="Mekari" className="absolute h-full left-0 max-w-none top-0 w-[472.79%]" src={imgMekari} />
            </Image>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[#535862] text-[14px] text-center w-[min-content]">Mekari</p>
          </Wrapper>
          <Wrapper additionalClassNames="[grid-area:1_/_3]">
            <div className="relative shrink-0 size-[36px]" data-name="image 318">
              <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage318} />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[#535862] text-[14px] text-center w-[min-content]">SAP</p>
          </Wrapper>
          <Wrapper additionalClassNames="[grid-area:2_/_3]">
            <div className="relative shrink-0 size-[36px]" data-name="flight">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
                <g id="flight">
                  <path d={svgPaths.pc583d80} fill="var(--fill-0, #026AA2)" id="Vector" />
                </g>
              </svg>
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[#535862] text-[14px] text-center w-[min-content]">Travel</p>
          </Wrapper>
          <Wrapper additionalClassNames="[grid-area:3_/_1]">
            <div className="relative shrink-0 size-[24px]" data-name="person">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="person">
                  <path d={svgPaths.p27177500} fill="var(--fill-0, #5925DC)" id="Vector" />
                </g>
              </svg>
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-full not-italic relative shrink-0 text-[#535862] text-[14px] text-center w-[min-content]">Employee Benefit</p>
          </Wrapper>
        </div>
      </div>
    </div>
  );
}