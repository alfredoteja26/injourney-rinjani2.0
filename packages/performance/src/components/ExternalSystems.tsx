import { ExternalLink, Settings } from "lucide-react";
import imgMekari from "figma:asset/0d559df4bd790dc84987d0606774f1cc71eaaed6.png";
import imgSunfish from "figma:asset/593eebcf9f9e4ee6b85ebf855cc630aeee9df9df.png";

export function ExternalSystems() {
  const systems = [
    {
      name: "Mekari",
      description: "Employee data & payroll",
      image: imgMekari,
      status: "Connected",
      bgColor: "bg-[#f5f0ff]",
    },
    {
      name: "Sunfish",
      description: "HR Management System",
      image: imgSunfish,
      status: "Active",
      bgColor: "bg-[#e8f5f4]",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-foreground mb-1">Access Other App</h4>
          <p className="caption text-muted-foreground">Connected integrations</p>
        </div>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-4">
        {systems.map((system, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-lg ${system.bgColor} flex items-center justify-center p-2`}>
              <img src={system.image} alt={system.name} className="w-full h-full object-contain" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h5 className="text-foreground">{system.name}</h5>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="caption text-muted-foreground">{system.description}</p>
            </div>

            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full">
              <span className="caption">{system.status}</span>
            </div>
          </div>
        ))}

        <button className="w-full py-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors caption">
          + Add Integration
        </button>
      </div>
    </div>
  );
}