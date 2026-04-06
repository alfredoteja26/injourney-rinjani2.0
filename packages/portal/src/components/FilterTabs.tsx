import { useState } from "react";
import { Calendar, GraduationCap, TrendingUp, Target, Star, FileText } from "lucide-react";

export function FilterTabs() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { icon: Star, label: "All" },
    { icon: GraduationCap, label: "Learning" },
    { icon: TrendingUp, label: "Career" },
    { icon: Target, label: "Performance" },
    { icon: FileText, label: "Documents" },
    { icon: Calendar, label: "Events" },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.label
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="caption">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
