import { BookOpen, Phone, AlertTriangle, ExternalLink } from "lucide-react";

function FaqItem({ icon: Icon, title, description, onClick }: { icon: any, title: string, description: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-start gap-3 p-3 w-full text-left hover:bg-muted/50 transition-colors group first:rounded-t-lg last:rounded-b-lg border-b last:border-0 border-border"
    >
      <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon size={20} />
      </div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans font-semibold text-sm text-foreground">{title}</span>
          <ExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
        </div>
        <p className="font-sans text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </button>
  );
}

export default function FaqPopup() {
  return (
    <div className="bg-popover relative rounded-xl shadow-xl border border-border w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="flex flex-col">
        <FaqItem 
          icon={BookOpen} 
          title="Guide Book" 
          description="Akses Portal Tanya-Jawab untuk bertanya terkait fitur aplikasi yang anda gunakan"
        />
        <FaqItem 
          icon={Phone} 
          title="Helpdesk" 
          description="Ada pertanyaan seputar penggunaan aplikasi? Silahkan hubungi Helpdesk kami via WhatsApp"
        />
        <FaqItem 
          icon={AlertTriangle} 
          title="IT Service Management" 
          description="Menemukan masalah pada aplikasi Rinjani? Silahkan lapor kami"
        />
      </div>
    </div>
  );
}
