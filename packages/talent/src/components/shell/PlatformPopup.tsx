import { Trophy, UserCheck, Plane, Heart } from "lucide-react";
import imgImage316 from "figma:asset/39158c7da2bc95c698b92ee12e2898d72da608ec.png";
import imgImage317 from "figma:asset/489eead4d79d8dbc01f01a52ab2526e80e0e2b4f.png";
import imgImage318 from "figma:asset/876ad6ef9d7f7e8388fe3a61763ecc9379933a4f.png";

function PlatformItem({ icon: Icon, image, label, onClick }: { icon?: any, image?: string, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-3 gap-3 rounded-lg border border-border bg-card hover:bg-muted/50 hover:shadow-md transition-all duration-200 cursor-pointer w-full h-full aspect-square"
    >
      <div className="flex items-center justify-center size-10 rounded-lg bg-background p-1 shadow-sm">
        {Icon ? (
          <div className="bg-primary/10 text-primary p-1.5 rounded-md">
            <Icon size={20} />
          </div>
        ) : image ? (
          <img src={image} alt={label} className="w-full h-full object-contain" />
        ) : null}
      </div>
      <span className="font-sans font-medium text-xs text-center text-muted-foreground leading-tight px-1 break-words w-full">
        {label}
      </span>
    </button>
  );
}

export default function PlatformPopup() {
  return (
    <div className="bg-popover relative rounded-xl shadow-xl border border-border p-4 w-full animate-in fade-in zoom-in-95 duration-200">
      <div className="grid grid-cols-3 gap-3">
        <PlatformItem icon={Trophy} label="Performance" />
        <PlatformItem icon={UserCheck} label="Talent" />
        <PlatformItem image={imgImage318} label="SAP" />
        
        <PlatformItem image={imgImage317} label="Mekari" />
        <PlatformItem image={imgImage316} label="Sunfish" />
        <PlatformItem icon={Plane} label="Travel" />
        
        <PlatformItem icon={Heart} label="Employee Benefit" />
      </div>
    </div>
  );
}
