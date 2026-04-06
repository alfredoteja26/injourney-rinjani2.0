import svgPaths from "./svg-ld8dbgk7od";
import clsx from "clsx";
import imgImage from "figma:asset/974de0e7b8f746cd6c43fe01b8105870ae531cf3.png";
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={clsx("size-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">{children}</div>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("relative shrink-0 size-[24px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("relative shrink-0 size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[#f2f4f8] h-[48px] relative rounded-[6px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[#dde1e6] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TextFieldDisable({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <div className="content-stretch flex gap-[8px] items-center pl-0 pr-[12px] py-0 relative size-full">{children}</div>
    </Wrapper>
  );
}

function DropdownMenuItem({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[48px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[6px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type Text2Props = {
  text: string;
};

function Text2({ text }: Text2Props) {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-black">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}
type RadioButtonTextProps = {
  text: string;
};

function RadioButtonText({ text }: RadioButtonTextProps) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[16px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="radioButton">
            <circle cx="8" cy="8" fill="var(--fill-0, white)" id="elipse" r="7.25" stroke="var(--stroke-0, #DDE1E6)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#444] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}
type TextFieldDisableTextProps = {
  text: string;
};

function TextFieldDisableText({ text }: TextFieldDisableTextProps) {
  return (
    <Wrapper>
      <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative size-full">
        <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">
          <p className="leading-[20px]">{text}</p>
        </div>
      </div>
    </Wrapper>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Wrapper1>
        <g id="edit">
          <path d={svgPaths.p1ab12600} fill="var(--fill-0, #3267E3)" id="Vector" />
        </g>
      </Wrapper1>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#3267e3] text-[14px] text-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

function Update() {
  return (
    <Wrapper1>
      <g id="update">
        <path d={svgPaths.p375b8500} fill="var(--fill-0, #00A199)" id="Vector" />
      </g>
    </Wrapper1>
  );
}
type TagTextProps = {
  text: string;
};

function TagText({ text }: TagTextProps) {
  return (
    <div className="bg-[#fff4f2] relative rounded-[4px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#cb3a31] text-[12px] text-nowrap">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#eeb4b0] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative rounded-tl-[24px] size-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#444] text-[24px] w-full">Profil Saya</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full">
            <div className="bg-white relative rounded-[8px] shrink-0 w-full">
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
                  <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                    <div className="bg-[#c1c7cd] content-stretch flex gap-[10px] items-center justify-center relative rounded-[9999px] shrink-0 size-[64px]" data-name="Avatar">
                      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium inset-0 justify-center leading-[0] not-italic text-[#121619] text-[1px] text-center">
                        <p className="leading-[normal]"> </p>
                      </div>
                      <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium inset-0 justify-center leading-[0] not-italic text-[#00a199] text-[24px] text-center">
                        <p className="leading-[normal]">DS</p>
                      </div>
                      <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-[9999px] shrink-0" data-name=".image">
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[9999px] size-full" src={imgImage} />
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                      <div className="content-stretch flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#444] text-[14px] text-nowrap">Dimas Sayyid</p>
                      </div>
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444] text-[14px] text-nowrap">Group Head Human Capital Strategy at PT Aviasi Pariwisata Indonesia</p>
                      <div className="content-stretch flex items-center justify-end relative shrink-0">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#878d96] text-[14px] text-nowrap">dimas.sayyid@gmail.com</p>
                      </div>
                    </div>
                    <div className="relative rounded-[6px] shrink-0" data-name="Button">
                      <div className="content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
                        <Wrapper1>
                          <g id="save-alt">
                            <path d={svgPaths.p2fe29c80} fill="var(--fill-0, #444444)" id="Vector" />
                          </g>
                        </Wrapper1>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#444] text-[14px] text-center text-nowrap">Unduh CV</p>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#dde1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#dde1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
            <div className="bg-white relative rounded-[8px] shrink-0 w-[380px]">
              <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
                <div className="relative shrink-0 w-full">
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
                      <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 text-[#444] text-nowrap w-full">
                        <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[28px] relative shrink-0 text-[20px]">Bagian Profil</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px]">Eksplor profil anda secara menyeluruh</p>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-[#dde1e6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                </div>
                <div className="relative shrink-0 w-full">
                  <Wrapper3 additionalClassNames="overflow-x-clip overflow-y-auto">
                    <div className="bg-[#f2fef6] h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdown Menu Item">
                      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
                          <Wrapper2>
                            <g id="account-circle">
                              <path d={svgPaths.p17b35380} fill="var(--fill-0, #00A199)" id="Vector" />
                            </g>
                          </Wrapper2>
                          <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#00a199] text-[14px]">KETERANGAN PERORANGAN</p>
                          <TagText text="Required" />
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#00a199] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    </div>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="description">
                          <path d={svgPaths.p27b27400} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">KETERANGAN LAINNYA</p>
                      <TagText text="Required" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="account-tree">
                          <path d={svgPaths.p1f142c00} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">KETERANGAN ORGANISASI</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="fitness-center">
                          <path d={svgPaths.p62f6580} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">MINAT</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="bar-chart">
                          <path d={svgPaths.p6cfb00} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">KEAHLIAN</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="sports-esports">
                          <path d={svgPaths.pefeb300} fill="var(--fill-0, #878D96)" id="Vector" />
                          <path d={svgPaths.p3e6f5472} fill="var(--fill-0, #878D96)" id="Vector_2" />
                          <path d={svgPaths.p566e780} fill="var(--fill-0, #878D96)" id="Vector_3" />
                          <path d={svgPaths.p28b29580} fill="var(--fill-0, #878D96)" id="Vector_4" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">HOBBY</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="work-outline">
                          <path d={svgPaths.p1eaa6740} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">RIWAYAT JABATAN</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="assessment">
                          <path d={svgPaths.p1f754d00} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">RIWAYAT PERFOMANCE</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="business">
                          <path d={svgPaths.pa678c80} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">KEANGGOTAAN ORGANISASI</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="stars">
                          <path d={svgPaths.p366d4880} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">PENGHARGAAN</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="assignment">
                          <path d={svgPaths.pbcf5600} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">SERTIFIKASI</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="school">
                          <path d={svgPaths.p5112380} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">PENDIDIKAN</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="card-travel">
                          <path d={svgPaths.p271fa280} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">PELATIHAN</p>
                      <TagText text="Required" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="library-books">
                          <path d={svgPaths.p6f19180} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">KARYA TULIS ILMIAH</p>
                      <TagText text="Required" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="mic">
                          <path d={svgPaths.p3398d080} fill="var(--fill-0, #878D96)" id="Vector" />
                          <path d={svgPaths.p9c5ab00} fill="var(--fill-0, #878D96)" id="Vector_2" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">PENGALAMAN SEBAGAI JURI ATAU PEMBICARA</p>
                      <TagText text="Required" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wrapper2>
                        <g id="playlist-add-check">
                          <path d={svgPaths.p3b3e1400} fill="var(--fill-0, #878D96)" id="Vector" />
                        </g>
                      </Wrapper2>
                      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">REFERENSI</p>
                    </DropdownMenuItem>
                  </Wrapper3>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#dde1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </div>
            <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0">
              <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
                <div className="relative shrink-0 w-full">
                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
                      <div className="relative shrink-0 size-[40px]" data-name="account-circle">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                          <g id="account-circle">
                            <path d={svgPaths.p34c64240} fill="var(--fill-0, #878D96)" id="Vector" />
                          </g>
                        </svg>
                      </div>
                      <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-nowrap">
                        <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[28px] relative shrink-0 text-[20px]">Keterangan Perorangan</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px]">Menyajikan informasi mengenai profil anda</p>
                      </div>
                      <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Badge/Status">
                          <Update />
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#444] text-[14px] text-nowrap">1 perubahan</p>
                        </div>
                        <div className="bg-[#00a199] content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
                          <div className="relative shrink-0 size-[20px]" data-name="save">
                            <div className="absolute inset-[0_-5%_-5%_0]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
                                <g id="save">
                                  <path d={svgPaths.p2a25c900} fill="var(--fill-0, white)" id="Vector" />
                                </g>
                              </svg>
                            </div>
                          </div>
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Simpan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border-[#dde1e6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                </div>
                <div className="relative shrink-0 w-full">
                  <Wrapper3>
                    <div className="bg-[#f0f3ff] relative rounded-[6px] shrink-0 w-full" data-name="Section Message">
                      <div className="size-full">
                        <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
                          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="content">
                            <Wrapper2>
                              <g id="new-releases">
                                <path d={svgPaths.p591c6c0} fill="var(--fill-0, #3267E3)" id="Vector" />
                              </g>
                            </Wrapper2>
                            <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px not-italic relative shrink-0" data-name="text">
                              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[24px] relative shrink-0 text-[#193aa3] text-[16px] w-full">Mohon Perhatian</p>
                              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#444] text-[14px] w-full">Agar upload evidence terlebih dahulu, baru merubah data</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Text Edit">
                      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                            <p className="leading-[20px]">Nama Lengkap</p>
                          </div>
                        </div>
                        <Text1 text="Ubah Data" />
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                        <TextFieldDisableText text="Dimas Sayyid" />
                      </div>
                      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#878d96] text-[14px] w-full">
                        <p className="leading-[20px]">*Sesuai KTP Huruf Kapital</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Text Edit">
                      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                            <p className="leading-[20px]">Nama Alias</p>
                          </div>
                        </div>
                        <Text1 text="Ubah Data" />
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                        <TextFieldDisableText text="Dimas Sayyid" />
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                      <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Text Edit">
                        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                          <div className="content-stretch flex items-center relative shrink-0">
                            <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                              <p className="leading-[20px]">Tempat Lahir</p>
                            </div>
                          </div>
                          <Text1 text="Ubah Data" />
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                          <TextFieldDisableText text="Jakarta" />
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Text Edit">
                        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                          <div className="content-stretch flex items-center relative shrink-0">
                            <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                              <p className="leading-[20px]">Tanggal Lahir</p>
                            </div>
                          </div>
                          <Text1 text="Ubah Data" />
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                          <TextFieldDisableText text="22 Oktober 1991" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Text Edit">
                      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                            <p className="leading-[20px]">Agama</p>
                          </div>
                        </div>
                        <Text1 text="Ubah Data" />
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                        <TextFieldDisableText text="Islam" />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Text Edit">
                      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                          <Update />
                          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                            <p className="leading-[20px]">No Handphone</p>
                          </div>
                        </div>
                        <Text1 text="Ubah Data" />
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                        <TextFieldDisableText text="0812982101" />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Text Edit">
                      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                            <p className="leading-[20px]">NIK</p>
                          </div>
                        </div>
                        <Text1 text="Ubah Data" />
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                        <TextFieldDisableText text="3501028581" />
                      </div>
                      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#878d96] text-[14px] w-full">
                        <p className="leading-[20px]">*Diisi dengan 16 digit angka</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Text Edit">
                      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                            <p className="leading-[20px]">NPWP</p>
                          </div>
                        </div>
                        <Text1 text="Ubah Data" />
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                        <TextFieldDisableText text="76829101267582" />
                      </div>
                      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#878d96] text-[14px] w-full">
                        <p className="leading-[20px]">*Diisi dengan 16 digit angka</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Text Edit">
                      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                            <p className="leading-[20px]">Email</p>
                          </div>
                        </div>
                        <Text1 text="Ubah Data" />
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                        <TextFieldDisableText text="dimas.sayyid@injourney.co.id" />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Text Edit">
                      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
                            <p className="leading-[20px]">Alamat</p>
                          </div>
                        </div>
                        <Text1 text="Ubah Data" />
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                        <TextFieldDisableText text="Jl. Bangka No 21A, Kemang, Jakarta Selatan" />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[19px] justify-end leading-[0] not-italic relative shrink-0 text-[#444] text-[14px] w-full">
                        <p className="leading-[20px]">Jenis Kelamin</p>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
                        <RadioButtonText text="Laki-laki" />
                        <RadioButtonText text="Perempuan" />
                      </div>
                    </div>
                    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[172px] relative shrink-0 w-full">
                      <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Text Edit">
                        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                          <Text text="Instagram" />
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                          <TextFieldDisable>
                            <div className="content-stretch flex gap-[8px] h-full items-center justify-center p-[8px] relative shrink-0 w-[48px]" data-name="Prefix">
                              <div aria-hidden="true" className="absolute border-[#dde1e6] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                              <Wrapper1 additionalClassNames="overflow-clip">
                                <g id="Group">
                                  <path d={svgPaths.p128d6040} fill="url(#paint0_radial_33_3352)" id="Vector" />
                                  <path d={svgPaths.p128d6040} fill="url(#paint1_radial_33_3352)" id="Vector_2" />
                                  <path d={svgPaths.p2a9d4e00} fill="var(--fill-0, white)" id="Vector_3" />
                                </g>
                                <defs>
                                  <radialGradient cx="0" cy="0" gradientTransform="translate(5.3125 21.5404) rotate(-90) scale(19.8215 18.4355)" gradientUnits="userSpaceOnUse" id="paint0_radial_33_3352" r="1">
                                    <stop stopColor="#FFDD55" />
                                    <stop offset="0.1" stopColor="#FFDD55" />
                                    <stop offset="0.5" stopColor="#FF543E" />
                                    <stop offset="1" stopColor="#C837AB" />
                                  </radialGradient>
                                  <radialGradient cx="0" cy="0" gradientTransform="translate(-3.35008 1.4407) rotate(78.681) scale(8.86031 36.5225)" gradientUnits="userSpaceOnUse" id="paint1_radial_33_3352" r="1">
                                    <stop stopColor="#3771C8" />
                                    <stop offset="0.128" stopColor="#3771C8" />
                                    <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
                                  </radialGradient>
                                </defs>
                              </Wrapper1>
                            </div>
                            <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">
                              <p className="leading-[normal]">dimas.sayyid</p>
                            </div>
                          </TextFieldDisable>
                        </div>
                      </div>
                      <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Text Edit">
                        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                          <Text text="Facebook" />
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                          <TextFieldDisable>
                            <div className="content-stretch flex gap-[8px] h-full items-center justify-center p-[8px] relative shrink-0 w-[48px]" data-name="Prefix">
                              <div aria-hidden="true" className="absolute border-[#dde1e6] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                              <Wrapper2>
                                <g clipPath="url(#clip0_33_3348)" id="logos:facebook">
                                  <path d={svgPaths.p1fdd2200} fill="var(--fill-0, #1877F2)" id="Vector" />
                                  <path d={svgPaths.p23faaa00} fill="var(--fill-0, white)" id="Vector_2" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_33_3348">
                                    <rect fill="white" height="24" width="24" />
                                  </clipPath>
                                </defs>
                              </Wrapper2>
                            </div>
                            <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">
                              <p className="leading-[normal]">Dimas Sayyid</p>
                            </div>
                          </TextFieldDisable>
                        </div>
                      </div>
                      <div className="[grid-area:2_/_1] content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Text Edit">
                        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                          <Text text="Twitter" />
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                          <TextFieldDisable>
                            <div className="content-stretch flex gap-[8px] h-full items-center justify-center p-[8px] relative shrink-0 w-[48px]" data-name="Prefix">
                              <div aria-hidden="true" className="absolute border-[#dde1e6] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                              <Wrapper2>
                                <g id="streamline-logos:x-twitter-logo-block">
                                  <path clipRule="evenodd" d={svgPaths.p2a062900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
                                </g>
                              </Wrapper2>
                            </div>
                            <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">
                              <p className="leading-[normal]">@dimas.sayyid</p>
                            </div>
                          </TextFieldDisable>
                        </div>
                      </div>
                      <div className="[grid-area:2_/_2] content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Text Edit">
                        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                          <Text text="Linkedin" />
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                          <TextFieldDisable>
                            <div className="content-stretch flex gap-[8px] h-full items-center justify-center p-[8px] relative shrink-0 w-[48px]" data-name="Prefix">
                              <div aria-hidden="true" className="absolute border-[#dde1e6] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                              <Wrapper2 additionalClassNames="overflow-clip">
                                <g id="Group">
                                  <path d={svgPaths.p24edac00} fill="var(--fill-0, white)" id="Vector" />
                                  <path d={svgPaths.p24edac00} fill="var(--fill-0, #0A66C2)" id="Vector_2" />
                                  <path d={svgPaths.pf9a8e00} fill="var(--fill-0, white)" id="Vector_3" />
                                </g>
                              </Wrapper2>
                            </div>
                            <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#444] text-[14px]">
                              <p className="leading-[normal]">Dimas Sayyid</p>
                            </div>
                          </TextFieldDisable>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
                      <Wrapper3 additionalClassNames="overflow-clip rounded-[inherit]">
                        <div className="flex flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#444] text-[16px] text-nowrap">
                          <p className="leading-[24px]">Kontak Darurat</p>
                        </div>
                        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                          <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Text Edit">
                            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                              <Text2 text="Nama" />
                              <Text1 text="Ubah Data" />
                            </div>
                            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                              <TextFieldDisableText text="Reza" />
                            </div>
                          </div>
                          <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Text Edit">
                            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                              <Text2 text="Hubungan" />
                              <Text1 text="Ubah Data" />
                            </div>
                            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                              <TextFieldDisableText text="Kakak" />
                            </div>
                          </div>
                          <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Text Edit">
                            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                              <Text2 text="No. Handphone" />
                              <Text1 text="Ubah Data" />
                            </div>
                            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text Input">
                              <TextFieldDisableText text="081288886262" />
                            </div>
                          </div>
                        </div>
                      </Wrapper3>
                      <div aria-hidden="true" className="absolute border border-[#dde1e6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_0px_1px_0px_rgba(0,0,0,0.25)]" />
                    </div>
                  </Wrapper3>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#dde1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}