import { useRef, useEffect, useState } from "react";
import { LogOut, ArrowRight, User, Mail, Briefcase, MapPin } from "lucide-react";
import imgImage from "figma:asset/2291940396e4817f705a7fe6d36e22fae12fd803.png";
import imgImage1 from "figma:asset/974de0e7b8f746cd6c43fe01b8105870ae531cf3.png";

interface ProfilePopupProps {
  onClose: () => void;
  position?: { top: number; left: number };
  isAbove?: boolean;
}

function SmeIcon() {
  return (
    <div className="absolute bottom-0 right-0 size-5 translate-x-1 translate-y-1">
      <div className="bg-primary rounded-full p-1 border-2 border-white">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-12">
      <div className="rounded-full overflow-hidden size-full ring-2 ring-border">
        <img alt="Profile" className="object-cover size-full" src={imgImage} />
        <img alt="Overlay" className="absolute inset-0 object-cover size-full" src={imgImage1} />
      </div>
      <SmeIcon />
    </div>
  );
}

function ProfileInfo() {
  return (
    <div className="flex flex-col gap-1 items-start justify-center">
      <p className="font-sans font-semibold text-foreground text-base leading-tight">Dimas Sayyid</p>
      <p className="font-sans font-medium text-muted-foreground text-xs leading-tight">VP Human Capital Strategy</p>
      <div className="bg-muted px-3 py-1 rounded-full flex gap-2 items-center mt-1">
        <span className="font-sans text-xs text-muted-foreground">NIK:</span>
        <span className="font-sans text-xs font-semibold text-foreground">26010001</span>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value, subValue }: { icon: any, label: string, value: string, subValue?: string }) {
  return (
    <div className="bg-muted/50 rounded-lg p-3 w-full flex gap-3 items-start">
      <div className="bg-primary/10 rounded-lg p-1.5 shrink-0 text-primary">
        <Icon size={16} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] text-muted-foreground leading-tight mb-0.5">{label}</span>
        <span className="text-xs font-medium text-foreground leading-tight truncate">{value}</span>
        {subValue && (
          <span className="text-[11px] text-muted-foreground leading-tight truncate mt-0.5">{subValue}</span>
        )}
      </div>
    </div>
  );
}

function ProfileActions() {
  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <button className="flex items-center justify-center gap-2 w-full p-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-foreground font-semibold text-sm">
        <span>Lihat Profil Lengkap</span>
        <ArrowRight size={16} className="opacity-50" />
      </button>
      
      <button className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-semibold text-sm shadow-sm">
        <LogOut size={16} />
        <span>Log Out</span>
      </button>
    </div>
  );
}

export default function ProfilePopup({ onClose, position, isAbove }: ProfilePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getPositionStyle = () => {
    if (!position) return { bottom: '16px', left: '8px' };
    
    if (isAbove) {
      return {
        bottom: `${window.innerHeight - position.top + 8}px`,
        left: '8px',
      };
    } else {
      return {
        top: `${position.top}px`,
        left: `${position.left}px`,
      };
    }
  };

  return (
    <div 
      ref={popupRef}
      className="fixed z-[100] w-[300px]"
      style={getPositionStyle()}
    >
      <div className="bg-popover border border-border rounded-xl shadow-xl p-4 flex flex-col gap-4 text-popover-foreground animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex gap-4 items-center border-b border-border pb-4">
          <Avatar />
          <ProfileInfo />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3">
          <InfoItem 
            icon={Briefcase} 
            label="Unit Kerja" 
            value="Direktorat Human Capital" 
            subValue="InJourney Holding"
          />
          <InfoItem 
            icon={Mail} 
            label="Email" 
            value="dimas.sayyid@injourney.id" 
          />
          <InfoItem 
            icon={User} 
            label="Atasan Langsung" 
            value="Herdy Harman" 
            subValue="Director of HR and Digital"
          />
        </div>

        {/* Actions */}
        <ProfileActions />
      </div>
    </div>
  );
}
