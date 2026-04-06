import svgPaths from "./svg-7gcfxj0r4k";
import imgInjourneyMessage from "figma:asset/0555df0e0c1d85de0cc58056a4c1d890f8040452.png";

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 24 24" className="block size-full">
      <g id="arrow-back">
        <path d={svgPaths.p1af51d00} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </svg>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <div className="basis-0 grow h-[976px] min-h-px min-w-px relative rounded-[24px] shrink-0" data-name="Injourney Message">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[24px] size-full" src={imgInjourneyMessage} />
            <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex flex-col items-center justify-end p-[24px] relative size-full">
                <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full">
                  <div className="basis-0 bg-[rgba(255,255,255,0.1)] grow min-h-px min-w-px relative rounded-[16px] shrink-0">
                    <div className="overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-start p-[16px] relative w-full">
                        <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-white">We are the ecosystem of Indonesia’s aviation and tourism, bringing the nation’s hospitality to the world.</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative self-stretch shrink-0">
                    <div className="aspect-[56/56] basis-0 bg-[rgba(255,255,255,0.1)] grow min-h-px min-w-px overflow-clip relative rounded-[12px] shrink-0">
                      <div className="absolute flex items-center justify-center left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex-none rotate-[180deg]">
                          <div className="relative size-[24px]" data-name="arrow-back">
                            <Helper />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="aspect-[56/56] basis-0 bg-[rgba(255,255,255,0.1)] grow min-h-px min-w-px overflow-clip relative rounded-[12px] shrink-0">
                      <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="arrow-back">
                        <Helper />
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
  );
}