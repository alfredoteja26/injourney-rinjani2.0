import { useState } from "react";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex items-center justify-center px-[24px] py-[10px] relative w-full">{children}</div>
    </div>
  );
}

interface SignInMicrosoftProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function SignInMicrosoft({ onLogin, onBack }: SignInMicrosoftProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      // Trigger login with loading screen
      onLogin();
    }
  };

  return (
    <div className="bg-[#f5f5f5] relative size-full" data-name="Sign In Microsoft">
      <div className="absolute bg-white content-stretch flex flex-col gap-[24px] items-end justify-center left-[calc(50%-10px)] overflow-clip p-[48px] rounded-[8px] shadow-[0px_4px_8px_-2px_rgba(10,13,18,0.1),0px_2px_4px_-2px_rgba(10,13,18,0.06)] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[632px]" data-name="Sign In Microsoft">
        <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative shrink-0 w-full">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[36px]" data-name="microsoft">
              <div className="absolute contents inset-[15.63%]" data-name="microsoft">
                <div className="absolute bg-[#feba08] inset-[53.13%_15.63%_15.63%_53.13%]" data-name="yeloow" />
                <div className="absolute bg-[#05a6f0] inset-[53.13%_53.13%_15.63%_15.63%]" data-name="blue" />
                <div className="absolute bg-[#80bc06] inset-[15.63%_15.63%_53.13%_53.13%]" data-name="green" />
                <div className="absolute bg-[#f25325] inset-[15.63%_53.13%_53.13%_15.63%]" data-name="red" />
              </div>
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#717680] text-[24px] text-nowrap">Microsoft</p>
          </div>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#414651] text-[36px] text-nowrap tracking-[-0.72px]">Sign In</p>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input">
          <div className="bg-white h-[48px] relative rounded-[6px] shrink-0 w-full" data-name="textField/default">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative size-full">
                <input
                  type={showPassword ? "password" : "text"}
                  value={showPassword ? password : email}
                  onChange={(e) => showPassword ? setPassword(e.target.value) : setEmail(e.target.value)}
                  placeholder={showPassword ? "Password" : "Email, Phone or Skype"}
                  className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow h-full justify-center min-h-px min-w-px not-italic text-[#878d96] text-[14px] bg-transparent border-none outline-none w-full"
                />
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#dde1e6] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start leading-[20px] not-italic relative shrink-0 text-[14px] w-full">
          <div className="content-stretch flex gap-[10px] items-start relative shrink-0 text-nowrap w-full">
            <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#878d96]">No account?</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#0086c9]">Create one!</p>
          </div>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#0086c9] w-full">Can’t acces your account?</p>
        </div>
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
          <button onClick={onBack} className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-[120px] cursor-pointer" data-name="Button">
            <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="_Button base">
              <Wrapper>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Back</p>
              </Wrapper>
              <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
            </div>
          </button>
          <button onClick={handleNext} className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-[120px] cursor-pointer hover:opacity-90 transition-opacity" data-name="Button">
            <div className="basis-0 bg-[#026aa2] grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="_Button base">
              <Wrapper>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Next</p>
              </Wrapper>
              <div aria-hidden="true" className="absolute border border-[#026aa2] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}