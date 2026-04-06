import { ArrowUpRight, TrendingUp, AlertCircle, BookOpen } from "lucide-react";

export function MetricsCards() {
  const metrics = [
    {
      title: "Performance Index",
      value: "107.45",
      subtitle: "From Last Quarter",
      change: "+12.5%",
      color: "bg-[#00A199]",
      textColor: "text-white",
    },
    {
      title: "Learning Progress",
      value: "85.83",
      subtitle: "Course Completion",
      change: "+8.2%",
      color: "bg-[#5AE2C3]",
      textColor: "text-white",
    },
    {
      title: "Career Development",
      value: "On Track",
      subtitle: "Next Review: 2 months",
      change: "High",
      color: "bg-[#FE9A00]",
      textColor: "text-white",
    },
    {
      title: "Action Required",
      value: "3 Items",
      subtitle: "Pending Approval",
      change: "Urgent",
      color: "bg-[#F04438]",
      textColor: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`${metric.color} rounded-xl p-6 relative overflow-hidden`}
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <p className={`caption ${metric.textColor}/80`}>{metric.title}</p>
                <h3 className={`${metric.textColor}`}>{metric.value}</h3>
              </div>
              <ArrowUpRight className={`w-5 h-5 ${metric.textColor}/60`} />
            </div>
            
            <div className="space-y-2">
              <p className={`caption ${metric.textColor}/70`}>{metric.subtitle}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className={`w-3 h-3 ${metric.textColor}`} />
                <span className={`caption ${metric.textColor}`}>{metric.change}</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Background Pattern */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}
