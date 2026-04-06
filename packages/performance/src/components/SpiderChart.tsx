import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export function SpiderChart() {
  const data = [
    { subject: "Leadership", A: 85, fullMark: 100 },
    { subject: "Communication", A: 92, fullMark: 100 },
    { subject: "Technical", A: 78, fullMark: 100 },
    { subject: "Problem Solving", A: 88, fullMark: 100 },
    { subject: "Teamwork", A: 95, fullMark: 100 },
    { subject: "Innovation", A: 82, fullMark: 100 },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-6">
        <h4 className="text-foreground mb-1">Skills Assessment</h4>
        <p className="caption text-muted-foreground">Overall competency evaluation</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
            />
            <Radar 
              name="Skills" 
              dataKey="A" 
              stroke="var(--color-primary)" 
              fill="var(--color-primary)" 
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="caption text-muted-foreground">Your Performance</span>
        </div>
        <button className="caption text-primary hover:underline">View Details</button>
      </div>
    </div>
  );
}
