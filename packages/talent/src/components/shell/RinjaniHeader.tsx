import { useState, useRef, useEffect } from "react";
import { Search, LayoutGrid, Bell, Headset, Mic } from "lucide-react";
import PlatformPopup from "./PlatformPopup";
import NotificationPopup from "./NotificationPopup";
import FaqPopup from "./FaqPopup";

function HeaderSearch() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="basis-0 bg-white/10 grow min-h-px min-w-px relative rounded-lg shrink-0">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-2 items-center px-4 py-2 relative w-full">
          <Search className="text-primary-foreground/70 w-5 h-5" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="font-sans font-medium leading-6 not-italic bg-transparent outline-none relative shrink-0 text-base text-primary-foreground placeholder:text-primary-foreground/70 w-full"
          />
        </div>
      </div>
    </div>
  );
}

function PlatformButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        popupRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-2 relative rounded-lg shrink-0 size-10 hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto text-primary-foreground"
      >
        <LayoutGrid className="w-6 h-6" />
      </button>
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 top-[calc(100%+8px)] w-[360px] z-[100]"
          style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
        >
          <PlatformPopup />
        </div>
      )}
    </div>
  );
}

function NotificationsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        popupRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-2 relative rounded-lg shrink-0 size-10 hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto text-primary-foreground"
      >
        <Bell className="w-6 h-6" />
      </button>
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 top-[calc(100%+8px)] w-[428px] z-[100]"
          style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
        >
          <NotificationPopup onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}

function FaqButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        popupRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-50">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-2 relative rounded-lg shrink-0 size-10 hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto text-primary-foreground"
      >
        <Headset className="w-6 h-6" />
      </button>
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 top-[calc(100%+8px)] w-[360px] z-[100]"
        >
          <FaqPopup />
        </div>
      )}
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="content-stretch flex gap-4 items-center relative shrink-0 z-50">
      <PlatformButton />
      <NotificationsButton />
      <FaqButton />
    </div>
  );
}

function NavbarTop() {
  return (
    <div className="basis-0 content-stretch flex gap-4 grow items-center min-h-px min-w-px relative shrink-0 z-50" data-name="navbar top">
      <HeaderSearch />
      <ActionButtons />
    </div>
  );
}

export function RinjaniHeader() {
  return (
    <div className="bg-primary relative size-full" data-name="Header">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex items-center justify-end px-4 py-3 relative size-full">
          <NavbarTop />
        </div>
      </div>
    </div>
  );
}
