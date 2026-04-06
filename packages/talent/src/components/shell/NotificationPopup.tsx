import { useState } from "react";
import { X, CheckCircle2, Clock, Info } from "lucide-react";

interface NotificationPopupProps {
  onClose: () => void;
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
    >
      <X size={20} />
    </button>
  );
}

function NotificationsHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-popover sticky top-0 z-10">
      <h3 className="font-sans font-semibold text-base text-foreground">Notifikasi & Pengingat</h3>
      <CloseButton onClick={onClose} />
    </div>
  );
}

function Tab({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 px-4 py-3 text-sm font-medium transition-colors relative
        ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'}
      `}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
      )}
    </button>
  );
}

function TabBar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex items-center border-b border-border bg-popover/50">
      <Tab active={activeTab === 'semua'} label="Semua (8)" onClick={() => setActiveTab('semua')} />
      <Tab active={activeTab === 'approval'} label="Approval (3)" onClick={() => setActiveTab('approval')} />
      <Tab active={activeTab === 'deadline'} label="Deadline (1)" onClick={() => setActiveTab('deadline')} />
      <Tab active={activeTab === 'info'} label="Info (4)" onClick={() => setActiveTab('info')} />
    </div>
  );
}

// Notification Item Components

function NotificationItem({ 
  icon: Icon, 
  iconColorClass, 
  bgClass, 
  message, 
  time, 
  actionLabel, 
  onAction 
}: { 
  icon: any, 
  iconColorClass: string, 
  bgClass: string, 
  message: string, 
  time: string, 
  actionLabel?: string, 
  onAction?: () => void 
}) {
  return (
    <div className="group relative w-full hover:bg-muted/30 transition-colors border-b border-border last:border-0 p-4">
      <div className="flex gap-3 items-start">
        <div className={`shrink-0 size-8 rounded-lg flex items-center justify-center ${bgClass} ${iconColorClass}`}>
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm text-foreground leading-snug line-clamp-2">
            {message}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            {time}
          </p>
          
          {actionLabel && (
            <button 
              onClick={onAction}
              className="mt-2 px-3 py-1.5 rounded-md border border-border bg-background hover:bg-muted transition-colors text-xs font-medium text-foreground"
            >
              {actionLabel}
            </button>
          )}
        </div>
        
        <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4" />
      </div>
    </div>
  );
}

export default function NotificationPopup({ onClose }: NotificationPopupProps) {
  const [activeTab, setActiveTab] = useState('semua');

  return (
    <div className="bg-popover relative rounded-xl shadow-xl border border-border w-full flex flex-col h-full max-h-[calc(100vh-100px)] animate-in fade-in zoom-in-95 duration-200">
      <NotificationsHeader onClose={onClose} />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {activeTab === 'semua' && (
          <>
            <NotificationItem 
              icon={CheckCircle2} 
              iconColorClass="text-primary" 
              bgClass="bg-primary/10"
              message="KPI Check-In Q4 2025 dari Binavia Wardhani (Manager HC Strategy) menunggu approval Anda"
              time="2 jam lalu"
              actionLabel="Review KPI"
            />
            <NotificationItem 
              icon={Clock} 
              iconColorClass="text-secondary" 
              bgClass="bg-secondary/10"
              message="Deadline update Realisasi KPI Q1 2026: 8 hari lagi (25 Maret 2026)"
              time="Hari ini 09:00"
              actionLabel="Update Sekarang"
            />
            <NotificationItem 
              icon={Info} 
              iconColorClass="text-blue-500" 
              bgClass="bg-blue-500/10"
              message="Sistem maintenance terjadwal pada tanggal 30 Maret 2026 pukul 22:00 WIB"
              time="Kemarin"
            />
          </>
        )}
        {activeTab === 'approval' && (
           <NotificationItem 
             icon={CheckCircle2} 
             iconColorClass="text-primary" 
             bgClass="bg-primary/10"
             message="KPI Check-In Q4 2025 dari Binavia Wardhani (Manager HC Strategy) menunggu approval Anda"
             time="2 jam lalu"
             actionLabel="Review KPI"
           />
        )}
        {activeTab === 'deadline' && (
          <NotificationItem 
            icon={Clock} 
            iconColorClass="text-secondary" 
            bgClass="bg-secondary/10"
            message="Deadline update Realisasi KPI Q1 2026: 8 hari lagi (25 Maret 2026)"
            time="Hari ini 09:00"
            actionLabel="Update Sekarang"
          />
        )}
        {activeTab === 'info' && (
          <NotificationItem 
            icon={Clock} 
            iconColorClass="text-secondary" 
            bgClass="bg-secondary/10"
            message="Info item placeholder"
            time="Hari ini 09:00"
          />
        )}
      </div>
    </div>
  );
}
