import clsx from "clsx";
import { User } from "lucide-react";

type NineBoxGridProps = {
  performanceScore: number; // 0-100
  capacityScore: number;    // 0-100
};

export function NineBoxGrid({ performanceScore, capacityScore }: NineBoxGridProps) {
  // Determine Box Coordinates (0, 1, 2)
  // Y-axis: Capacity (Low: 0-33, Med: 34-66, High: 67-100)
  // X-axis: Performance (Low: 0-33, Med: 34-66, High: 67-100)
  
  const getLevel = (score: number) => {
    if (score >= 80) return 2; // High (Adjusted threshold for 5-scale or 100-scale top tier usually smaller?) Let's use standard thirds or user data implied range. Mock data has 82/79.
    if (score >= 60) return 1; // Med
    return 0; // Low
  };

  // Using simple 3-tier cutoffs
  // High: > 75, Med: 45-75, Low: < 45 ?
  // Let's stick to strict thirds (33.33, 66.66) unless we want to match the mock data "High Flyer" with 82/79. 
  // If 79 is High, then cutoff is probably around 70-75.
  
  const x = getLevel(performanceScore);
  const y = getLevel(capacityScore);

  // Grid Definition
  // Rows (Top to Bottom): High Cap (y=2), Med Cap (y=1), Low Cap (y=0)
  // Cols (Left to Right): Low Perf (x=0), Med Perf (x=1), High Perf (x=2)

  const cells = [
    // Row 1 (High Capacity)
    { x: 0, y: 2, label: "Sleeping Tiger", color: "bg-yellow-100 border-yellow-200 text-yellow-800" },
    { x: 1, y: 2, label: "Promotable", color: "bg-green-100 border-green-200 text-green-800" },
    { x: 2, y: 2, label: "High Potential", color: "bg-emerald-100 border-emerald-200 text-emerald-800" },
    
    // Row 2 (Med Capacity)
    { x: 0, y: 1, label: "Sleeping Tiger", color: "bg-yellow-100 border-yellow-200 text-yellow-800" }, // Med Cap + Low Perf
    { x: 1, y: 1, label: "Solid Contributor", color: "bg-blue-100 border-blue-200 text-blue-800" },
    { x: 2, y: 1, label: "Promotable", color: "bg-green-100 border-green-200 text-green-800" }, // High Perf + Med Cap

    // Row 3 (Low Capacity)
    { x: 0, y: 0, label: "Unfit", color: "bg-red-100 border-red-200 text-red-800" },
    { x: 1, y: 0, label: "Solid Contributor", color: "bg-blue-100 border-blue-200 text-blue-800" },
    { x: 2, y: 0, label: "Solid Contributor", color: "bg-blue-100 border-blue-200 text-blue-800" }, // Assumed High Perf + Low Cap
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full aspect-square max-w-[400px] mx-auto grid grid-cols-3 grid-rows-3 gap-1 p-1 bg-muted/20 rounded-lg border border-border">
        {/* Y-Axis Label */}
        <div className="absolute -left-8 top-0 bottom-0 flex items-center justify-center -rotate-90">
            <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Capacity</span>
        </div>
        
        {/* X-Axis Label */}
        <div className="absolute left-0 right-0 -bottom-6 flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Performance</span>
        </div>

        {cells.map((cell, idx) => {
          const isActive = cell.x === x && cell.y === y;
          return (
            <div 
              key={idx}
              className={clsx(
                "relative flex flex-col items-center justify-center p-2 text-center rounded transition-all duration-200",
                cell.color,
                isActive ? "ring-2 ring-primary ring-offset-2 z-10 shadow-lg scale-105" : "opacity-80 hover:opacity-100"
              )}
            >
              <span className="text-[10px] font-bold leading-tight uppercase opacity-70 mb-1 hidden sm:block">
                {cell.label}
              </span>
              
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded">
                   <User className="w-8 h-8 text-foreground drop-shadow-md" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Legend / Status */}
      <div className="mt-4 flex flex-col items-center justify-center gap-1">
         <p className="text-sm font-medium text-foreground">
             Current Position: <span className="font-bold text-primary">{cells.find(c => c.x === x && c.y === y)?.label}</span>
         </p>
         <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Perf: {performanceScore}</span>
            <span>Cap: {capacityScore}</span>
         </div>
      </div>
    </div>
  );
}
