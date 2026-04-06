import React, { useState, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-xo09mqnjuo";
import NotificationCenter from "./NotificationCenter";
import AppSwitcher from "./AppSwitcher";
import HelpSupport from "./HelpSupport";
import RinjaniSearch from "./RinjaniSearch";
import { ShieldCheck } from "lucide-react";
import type { Notification } from "../types";

function Dashboard() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="dashboard">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="dashboard">
          <path d={svgPaths.p26ffbd00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4({ userRole, userEmail }: { userRole: "Admin" | "User"; userEmail: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#00495d] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-[40px] hover:bg-[#00495d]/80 transition-colors cursor-pointer pointer-events-auto"
      >
        <Dashboard />
      </button>
      <AppSwitcher 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        userRole={userRole}
        userEmail={userEmail}
        userDepartment="Human Capital"
      />
    </div>
  );
}

function Notifications() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="notifications">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="notifications">
          <path d={svgPaths.paf1a280} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2({ userRole, notifications, setNotifications }: { userRole: "Admin" | "User"; notifications: Notification[]; setNotifications: React.Dispatch<React.SetStateAction<Notification[]>> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        id="navbar-notification-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#00495d] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-[40px] hover:bg-[#00495d]/80 transition-colors cursor-pointer pointer-events-auto"
      >
        <Notifications />
      </button>
      <NotificationCenter 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        userRole={userRole}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  );
}

function HeadsetMic() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="headset-mic">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="headset-mic">
          <path d={svgPaths.p110e580} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3({ userRole }: { userRole: "Admin" | "User" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#00495d] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-[40px] hover:bg-[#00495d]/80 transition-colors cursor-pointer pointer-events-auto"
        title="Help & Support"
      >
        <HeadsetMic />
      </button>
      <HelpSupport 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        userRole={userRole}
        onNavigateToHCPolicy={() => {
          window.location.hash = "#/hc-policy";
          setIsOpen(false);
        }}
      />
    </div>
  );
}

function Frame({ userRole, userEmail, notifications, setNotifications }: { userRole: "Admin" | "User"; userEmail: string; notifications: Notification[]; setNotifications: React.Dispatch<React.SetStateAction<Notification[]>> }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 z-50">
      <Frame4 userRole={userRole} userEmail={userEmail} />
      <Frame2 userRole={userRole} notifications={notifications} setNotifications={setNotifications} />
      <Frame3 userRole={userRole} />
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="search">
          <path d={svgPaths.p730dd00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SearchButton({ onOpenSearch }: { onOpenSearch: () => void }) {
  return (
    <div 
      id="navbar-search-btn"
      className="basis-0 bg-[#00495d] grow min-h-px min-w-px relative rounded-[8px] shrink-0 cursor-pointer hover:bg-[#00495d]/80 transition-colors" 
      onClick={onOpenSearch}
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full pointer-events-none">
          <Search />
          <span className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white/70">
            Search
          </span>
        </div>
      </div>
    </div>
  );
}

function NavbarTop({ userRole, userEmail, onRoleChange, notifications, setNotifications }: { userRole: "Admin" | "User"; userEmail: string; onRoleChange: (role: "Admin" | "User") => void; notifications: Notification[]; setNotifications: React.Dispatch<React.SetStateAction<Notification[]>> }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0 z-50" data-name="navbar top">
        <SearchButton onOpenSearch={() => setIsSearchOpen(true)} />
        {/* Role Switcher */}
        <div className="relative">
          <select
            value={userRole}
            onChange={(e) => onRoleChange(e.target.value as "Admin" | "User")}
            className="bg-[#00495d] text-white px-4 py-2 rounded-lg caption hover:bg-[#00495d]/80 transition-colors cursor-pointer appearance-none pr-10"
            style={{ fontWeight: 'var(--font-weight-semibold)' }}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <ShieldCheck className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-white pointer-events-none" />
        </div>
        <Frame userRole={userRole} userEmail={userEmail} notifications={notifications} setNotifications={setNotifications} />
      </div>
      <RinjaniSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onNavigateToPolicy={(policyId) => {
          window.location.hash = "#/hc-policy";
          setIsSearchOpen(false);
        }}
        onNavigateToProfile={(email) => {
          // Store email in URL hash for profile view
          window.location.hash = `#/employee-profile/${email}`;
          setIsSearchOpen(false);
        }}
      />
    </>
  );
}

export function RinjaniHeader({ userRole, userEmail, onRoleChange, notifications, setNotifications }: { userRole: "Admin" | "User"; userEmail?: string; onRoleChange: (role: "Admin" | "User") => void; notifications: Notification[]; setNotifications: React.Dispatch<React.SetStateAction<Notification[]>> }) {
  return (
    <div className="bg-[#006573] relative size-full" data-name="Header">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex items-center justify-end px-[16px] py-[12px] relative size-full">
          <NavbarTop userRole={userRole} userEmail={userEmail || ""} onRoleChange={onRoleChange} notifications={notifications} setNotifications={setNotifications} />
        </div>
      </div>
    </div>
  );
}