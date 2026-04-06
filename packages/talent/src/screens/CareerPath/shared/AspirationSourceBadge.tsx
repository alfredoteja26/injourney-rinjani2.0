/**
 * Aspiration Source Badge Component
 * Shows the source of aspiration with icon
 */

import React from 'react';
import { User, Briefcase, Target, Building } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import type { AspirationSource } from '../../../types/careerPath';

interface AspirationSourceBadgeProps {
  source: AspirationSource;
  nominator?: string;
  timestamp?: string;
  showTooltip?: boolean;
  compact?: boolean;
}

const SOURCE_CONFIG: Record<AspirationSource, { icon: React.ReactNode; label: string; color: string }> = {
  INDIVIDUAL: {
    icon: <User className="w-3 h-3" />,
    label: "Self",
    color: "var(--color-nine-emerging)"
  },
  SUPERVISOR: {
    icon: <Briefcase className="w-3 h-3" />,
    label: "Supervisor",
    color: "var(--color-primary)"
  },
  JOB_HOLDER: {
    icon: <Target className="w-3 h-3" />,
    label: "Job Holder",
    color: "var(--color-accent)"
  },
  UNIT: {
    icon: <Building className="w-3 h-3" />,
    label: "Unit Leader",
    color: "var(--color-nine-highpot)"
  }
};

export function AspirationSourceBadge({ 
  source, 
  nominator, 
  timestamp, 
  showTooltip = true,
  compact = false
}: AspirationSourceBadgeProps) {
  const config = SOURCE_CONFIG[source];

  if (compact) {
    return (
      <span 
        className="inline-flex items-center gap-1.5"
        style={{ fontSize: 'var(--text-sm)' }}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>
    );
  }

  const badgeContent = (
    <Badge 
      variant="outline"
      className="gap-1.5"
      style={{
        borderColor: config.color,
        backgroundColor: `${config.color.replace(')', '-light)')}`,
        color: config.color
      }}
    >
      {config.icon}
      <span className="badge">{config.label}</span>
    </Badge>
  );

  if (!showTooltip || (!nominator && !timestamp)) {
    return badgeContent;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-1">
            {nominator && (
              <p className="caption">
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Nominated by:</span> {nominator}
              </p>
            )}
            {timestamp && (
              <p className="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                {new Date(timestamp).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}