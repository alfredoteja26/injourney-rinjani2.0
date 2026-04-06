import React, { useState } from "react";
import svgPaths from "./svg-izqa2monp3";
import clsx from "clsx";
import imgImage295 from "figma:asset/c431b6a1465f2d5e74a13b698b185dc831318ab2.png";
import imgInjourneyMessage from "figma:asset/0555df0e0c1d85de0cc58056a4c1d890f8040452.png";
import imgSlide1 from "figma:asset/b74632a06399af372f2f92041724e086ad939295.png";
import imgSlide2 from "figma:asset/29dfb5da3ec9b90e5b2144d2bfebf81a3e3bf34d.png";

interface SignInProps {
  onLogin: (email: string, role: "Admin" | "User") => void;
  onMicrosoftLogin: () => void;
}

function TextFieldDefault({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white h-[48px] relative rounded-[6px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative size-full">{children}</div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dde1e6] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
        <g id="Clip path group">{children}</g>
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative size-full">
      <Wrapper1 additionalClassNames="inset-[-1.36%]">{children}</Wrapper1>
    </div>
  );
}

function Helper5() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 24 24" className="block size-full">
      <g id="arrow-back">
        <path d={svgPaths.p1af51d00} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </svg>
  );
}

function Helper4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-0 mt-[16.91%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[0.01%] mt-[50.03%] relative size-[40.565px]">
        <div className="flex-none scale-y-[-100%] size-[40.565px]">
          <ClipPathGroup1 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[16.91%] mt-[66.18%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup2 />
        </div>
      </div>
      <Helper1 />
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[49.36%] mt-0 relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup3 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[16.23%] mt-0 relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup4 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[66.18%] mt-[49.28%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup5 />
        </div>
      </div>
      <Helper2 />
    </div>
  );
}

function Helper3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-0 mt-[16.91%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[0.01%] mt-[50.04%] relative size-[40.565px]">
        <div className="flex-none scale-y-[-100%] size-[40.565px]">
          <ClipPathGroup1 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[16.91%] mt-[66.18%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup2 />
        </div>
      </div>
      <Helper1 />
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[49.36%] mt-0 relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup3 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[16.23%] mt-0 relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup4 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[66.18%] mt-[49.28%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup5 />
        </div>
      </div>
      <Helper2 />
    </div>
  );
}

function Helper2() {
  return (
    <div className="[grid-area:1_/_1] flex h-[40.575px] items-center justify-center ml-[66.18%] mt-[16.15%] relative w-[40.586px]">
      <div className="flex-none h-[40.575px] scale-y-[-100%] w-[40.586px]">
        <Wrapper>
          <path d={svgPaths.p34e1a880} id="path167" stroke="var(--stroke-0, #00A199)" strokeMiterlimit="10" strokeOpacity="0.06" strokeWidth="1.10267" />
        </Wrapper>
      </div>
    </div>
  );
}

function Helper1() {
  return (
    <div className="[grid-area:1_/_1] flex h-[40.586px] items-center justify-center ml-[50.04%] mt-[66.18%] relative w-[40.575px]">
      <div className="flex-none h-[40.586px] scale-y-[-100%] w-[40.575px]">
        <Wrapper>
          <path d={svgPaths.p3b44b180} id="path159" stroke="var(--stroke-0, #00A199)" strokeMiterlimit="10" strokeOpacity="0.06" strokeWidth="1.10267" />
        </Wrapper>
      </div>
    </div>
  );
}

function Helper() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-0 mt-[16.91%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[0.01%] mt-[50.04%] relative size-[40.565px]">
        <div className="flex-none scale-y-[-100%] size-[40.565px]">
          <ClipPathGroup1 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[16.91%] mt-[66.18%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup2 />
        </div>
      </div>
      <Helper1 />
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[49.36%] mt-[0.01%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup3 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[16.23%] mt-0 relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup4 />
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-[66.18%] mt-[49.28%] relative size-[40.575px]">
        <div className="flex-none scale-y-[-100%] size-[40.575px]">
          <ClipPathGroup5 />
        </div>
      </div>
      <Helper2 />
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <Wrapper>
      <path d={svgPaths.p5f76480} id="path165" stroke="var(--stroke-0, #00A199)" strokeMiterlimit="10" strokeOpacity="0.06" strokeWidth="1.10267" />
    </Wrapper>
  );
}

function ClipPathGroup4() {
  return (
    <Wrapper>
      <path d={svgPaths.p1c30f100} id="path163" stroke="var(--stroke-0, #00A199)" strokeMiterlimit="10" strokeOpacity="0.06" strokeWidth="1.10267" />
    </Wrapper>
  );
}

function ClipPathGroup3() {
  return (
    <div className="relative size-full">
      <Wrapper1 additionalClassNames="inset-[-1.35%_-1.36%_-1.36%_-1.36%]">
        <path d={svgPaths.p4bba100} id="path161" stroke="var(--stroke-0, #00A199)" strokeMiterlimit="10" strokeOpacity="0.06" strokeWidth="1.10267" />
      </Wrapper1>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <Wrapper>
      <path d={svgPaths.p1517f00} id="path157" stroke="var(--stroke-0, #00A199)" strokeMiterlimit="10" strokeOpacity="0.06" strokeWidth="1.10267" />
    </Wrapper>
  );
}

function ClipPathGroup1() {
  return (
    <Wrapper>
      <path d={svgPaths.p2a75280} id="path155" stroke="var(--stroke-0, #00A199)" strokeMiterlimit="10" strokeOpacity="0.06" strokeWidth="1.10267" />
    </Wrapper>
  );
}

function ClipPathGroup() {
  return (
    <Wrapper>
      <path d={svgPaths.p3f7b3600} id="path153" stroke="var(--stroke-0, #00A199)" strokeMiterlimit="10" strokeOpacity="0.06" strokeWidth="1.10267" />
    </Wrapper>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center leading-[0] relative shrink-0">
      <Helper3 />
      <Helper3 />
      <Helper3 />
      <Helper />
      <Helper3 />
      <Helper3 />
      <Helper />
    </div>
  );
}

function Divider() {
  return (
    <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0" data-name="Divider">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 211 1">
          <g id="Divider">
            <path d="M0 0.5H210.5" id="line" stroke="var(--stroke-0, #DDE1E6)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function SignIn({ onLogin, onMicrosoftLogin }: SignInProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentialsPopup, setShowCredentialsPopup] = useState(false);
  
  const slides = [
    {
      image: imgInjourneyMessage,
      text: "We are the ecosystem of Indonesia's aviation and tourism, bringing the nation's hospitality to the world."
    },
    {
      image: imgSlide1,
      text: "Your journey with us contributes to Indonesia's sustainable growth and global presence."
    },
    {
      image: imgSlide2,
      text: "Connecting people, cultures, and destinations through world-class tourism experiences."
    }
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleLogin = () => {
    // Determine role based on email
    if (email && password) {
      const role = email === "dimas@injourney.co.id" ? "Admin" : "User";
      onLogin(email, role);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && password) {
      handleLogin();
    }
  };

  // Check if button should be disabled
  const isLoginDisabled = !email || !password;

  return (
    <div className="bg-white content-stretch flex items-center relative size-full" data-name="Sign In">
      {/* Credentials Popup */}
      {showCredentialsPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={() => setShowCredentialsPopup(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>Demo Credentials</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-muted rounded-lg p-4 border border-border">
                <p className="caption mb-2" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--primary)' }}>Admin Account</p>
                <div className="space-y-1">
                  <p className="caption text-foreground">Email: dimas@injourney.co.id</p>
                  <p className="caption text-foreground">Password: Injourney@2025</p>
                </div>
                <button
                  onClick={() => {
                    setEmail("dimas@injourney.co.id");
                    setPassword("Injourney@2025");
                    setShowCredentialsPopup(false);
                  }}
                  className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity caption"
                  style={{ fontWeight: 'var(--font-weight-semibold)' }}
                >
                  Use Admin Credentials
                </button>
              </div>
              
              <div className="bg-muted rounded-lg p-4 border border-border">
                <p className="caption mb-2" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--primary)' }}>User Account</p>
                <div className="space-y-1">
                  <p className="caption text-foreground">Email: binavia@injourney.co.id</p>
                  <p className="caption text-foreground">Password: Injourney@2025</p>
                </div>
                <button
                  onClick={() => {
                    setEmail("binavia@injourney.co.id");
                    setPassword("Injourney@2025");
                    setShowCredentialsPopup(false);
                  }}
                  className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity caption"
                  style={{ fontWeight: 'var(--font-weight-semibold)' }}
                >
                  Use User Credentials
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowCredentialsPopup(false)}
              className="w-full px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors caption"
              style={{ fontWeight: 'var(--font-weight-semibold)' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className="absolute content-stretch flex h-[1024px] items-end left-0 top-0 w-[797px]" data-name="Kawung">
        <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
          <div className="content-stretch flex items-center leading-[0] relative shrink-0">
            <Helper />
            <Helper />
            <Helper3 />
            <Helper3 />
            <Helper />
            <Helper3 />
            <Helper4 />
          </div>
          <Frame />
          <div className="content-stretch flex items-center leading-[0] relative shrink-0">
            {[...Array(2).keys()].map((_, i) => (
              <Helper4 key={i} />
            ))}
            <Helper />
            <Helper3 />
            <Helper3 />
            <Helper />
            <Helper3 />
          </div>
          <div className="content-stretch flex items-center leading-[0] relative shrink-0">
            <Helper />
            <Helper />
            <Helper3 />
            <Helper3 />
            <Helper />
            <Helper3 />
            <Helper4 />
          </div>
          <div className="content-stretch flex items-center leading-[0] relative shrink-0">
            <Helper3 />
            <Helper />
            <Helper3 />
            <Helper />
            <Helper3 />
            <Helper4 />
            <Helper />
          </div>
          <div className="content-stretch flex items-center leading-[0] relative shrink-0">
            <Helper4 />
            <Helper3 />
            <Helper />
            <Helper3 />
            <Helper4 />
            <Helper />
            <Helper />
          </div>
          <div className="content-stretch flex items-center leading-[0] relative shrink-0">
            <Helper />
            <Helper3 />
            <Helper3 />
            <Helper4 />
            <Helper />
            <Helper />
            <Helper3 />
          </div>
          <Frame />
          <div className="content-stretch flex items-center leading-[0] relative shrink-0">
            <Helper3 />
            <Helper4 />
            <Helper />
            <Helper3 />
            <Helper3 />
            <Helper />
            <Helper3 />
          </div>
        </div>
      </div>
      <div className="basis-0 grow h-[1024px] min-h-px min-w-px relative shrink-0">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-center p-[24px] relative size-full">
            <div className="content-stretch flex flex-col gap-[24px] h-[601px] items-start relative shrink-0 w-[469px]">
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[168px]" data-name="Logo Klik">
                  <div className="relative shrink-0 size-[40px]" data-name="image 295">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[300%] left-[-235.98%] max-w-none top-[-90%] w-[841.96%]" src={imgImage295} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-center not-italic relative shrink-0">
                    <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[#181d27] text-[16px] text-nowrap whitespace-pre">RINJANI</p>
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#717680] text-[8px] w-[82px]">Integrated Talent Management System</p>
                  </div>
                </div>
                <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[52px] not-italic relative shrink-0 text-[#444444] text-[36px] text-center text-nowrap whitespace-pre">Selamat Datang</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#878d96] text-[14px] text-center text-nowrap whitespace-pre">Masukan Email dan Password untuk masuk ke akun Anda</p>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input">
                <div className="flex flex-col font-['IBM_Plex_Sans:Medium',sans-serif] h-[19px] justify-end leading-[0] not-italic relative shrink-0 text-[#444444] text-[14px] w-full">
                  <p className="leading-[normal]">Email</p>
                </div>
                <TextFieldDefault>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukan email"
                    className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#444444] text-[14px] bg-transparent outline-none border-none placeholder:text-[#878d96]"
                  />
                </TextFieldDefault>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input">
                <div className="flex flex-col font-['IBM_Plex_Sans:Medium',sans-serif] h-[19px] justify-end leading-[0] not-italic relative shrink-0 text-[#444444] text-[14px] w-full">
                  <p className="leading-[normal]">Password</p>
                </div>
                <TextFieldDefault>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukan password"
                    className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#444444] text-[14px] bg-transparent outline-none border-none placeholder:text-[#878d96]"
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="relative shrink-0 size-[20px] cursor-pointer"
                    data-name="icn/eyeSlash"
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g id="icn/eyeSlash">
                        <path d={svgPaths.p31771030} fill="var(--fill-0, #878D96)" id="Vector" />
                      </g>
                    </svg>
                  </button>
                </TextFieldDefault>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="content-stretch flex gap-[12px] items-center justify-center overflow-clip relative rounded-[6px] shrink-0" data-name="Button">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#878d96] text-[16px] text-center text-nowrap whitespace-pre">Forgot Password?</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCredentialsPopup(true)}
                  className="caption text-primary hover:underline cursor-pointer"
                  style={{ fontWeight: 'var(--font-weight-medium)' }}
                >
                  View Demo Credentials
                </button>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <button
                  onClick={handleLogin}
                  className={`bg-[#00a199] relative rounded-[6px] shrink-0 w-full transition-colors ${
                    isLoginDisabled 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-[#007d75] cursor-pointer'
                  }`}
                  data-name="Button"
                  disabled={isLoginDisabled}
                >
                  <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex gap-[12px] items-center justify-center px-[24px] py-[8px] relative w-full">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">Sign In</p>
                    </div>
                  </div>
                </button>
                <div className="content-stretch flex gap-[16px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Divider">
                  <Divider />
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#444444] text-[14px] text-nowrap whitespace-pre">Or</p>
                  <Divider />
                </div>
                <button
                  onClick={onMicrosoftLogin}
                  className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-full cursor-pointer"
                  data-name="Button"
                >
                  <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0 hover:bg-gray-50 transition-colors" data-name="_Button base">
                    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex gap-[8px] items-center justify-center px-[18px] py-[10px] relative w-full">
                        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="microsoft">
                          <div className="absolute contents inset-[15.63%]" data-name="microsoft">
                            <div className="absolute bg-[#feba08] inset-[53.13%_15.63%_15.63%_53.13%]" data-name="yeloow" />
                            <div className="absolute bg-[#05a6f0] inset-[53.13%_53.13%_15.63%_15.63%]" data-name="blue" />
                            <div className="absolute bg-[#80bc06] inset-[15.63%_15.63%_53.13%_53.13%]" data-name="green" />
                            <div className="absolute bg-[#f25325] inset-[15.63%_53.13%_53.13%_15.63%]" data-name="red" />
                          </div>
                        </div>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap whitespace-pre">Login via Microsoft Account</p>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
                  </div>
                </button>
              </div>
              
              <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[#344054] text-[14px] text-center w-[min-content]">
                <span>{`Dengan masuk ke platform `}</span>InJourney<span>{`, Anda setuju dengan `}</span>
                <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold">Syarat dan Ketentuan Layanan</span>
                <span>{` kami.`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pl-[48px] pr-[16px] pt-[16px] pb-[16px] relative w-full h-[1024px]">
            <div className="basis-0 grow h-[1024px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Injourney Message">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={slides[currentSlide].image} />
              <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-center justify-end p-[24px] relative size-full">
                  <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full">
                    <div className="basis-0 bg-[rgba(255,255,255,0.1)] grow min-h-px min-w-px relative rounded-[16px] shrink-0">
                      <div className="overflow-clip rounded-[inherit] size-full">
                        <div className="content-stretch flex items-start p-[16px] relative w-full">
                          <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-white">{slides[currentSlide].text}</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[16px] items-start relative self-stretch shrink-0">
                      <button 
                        onClick={handleNextSlide}
                        className="aspect-[56/56] basis-0 bg-[rgba(255,255,255,0.1)] grow min-h-px min-w-px overflow-clip relative rounded-[12px] shrink-0 hover:bg-[rgba(255,255,255,0.2)] transition-colors cursor-pointer"
                      >
                        <div className="absolute flex items-center justify-center left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <div className="flex-none rotate-[180deg]">
                            <div className="relative size-[24px]" data-name="arrow-back">
                              <Helper5 />
                            </div>
                          </div>
                        </div>
                      </button>
                      <button 
                        onClick={handlePrevSlide}
                        className="aspect-[56/56] basis-0 bg-[rgba(255,255,255,0.1)] grow min-h-px min-w-px overflow-clip relative rounded-[12px] shrink-0 hover:bg-[rgba(255,255,255,0.2)] transition-colors cursor-pointer"
                      >
                        <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="arrow-back">
                          <Helper5 />
                        </div>
                      </button>
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