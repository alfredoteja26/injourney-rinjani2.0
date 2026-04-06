import { cn } from "@/components/ui/utils";

interface DevelopmentHoursRingProps {
  totalHours: number;
  minHours?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function DevelopmentHoursRing({ 
  totalHours, 
  minHours = 40, 
  size = 120, 
  strokeWidth = 10,
  className 
}: DevelopmentHoursRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(100, Math.max(0, (totalHours / minHours) * 100));
  const dashOffset = circumference - (percentage / 100) * circumference;
  
  const isBelowMin = totalHours < minHours;
  // Using global CSS variables for colors where possible, or tailwind classes
  // Warning: var(--color-warning) / #ff9220
  // Primary: var(--color-primary) / #00495d
  
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Background Circle */}
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-1000 ease-in-out",
            isBelowMin ? "text-[#00495d]" : "text-[#00495d]" // Always dark teal in design? Or warning color?
          )}
        />
      </svg>
      
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline gap-0.5">
            <span className={cn(
                "text-3xl font-bold leading-none font-sans text-foreground"
            )}>
            {totalHours}
            </span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium uppercase mt-1">
          of {minHours} jam
        </span>
      </div>
    </div>
  );
}
