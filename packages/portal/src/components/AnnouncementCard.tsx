import React from 'react';
import { GraduationCap, Users, Target, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

interface AnnouncementCardProps {
  category: string;
  date: string;
  title: string;
  description: string;
  ctaText: string;
  onCtaClick?: (e?: React.MouseEvent) => void;
  imageUrl?: string;
  iconType?: 'learning' | 'talent' | 'performance' | 'ai' | 'general';
  categoryColor?: 'learning' | 'talent' | 'performance' | 'ai';
  onImageClick?: (imageUrl: string, e?: React.MouseEvent) => void;
}

// Icon component mapping
const iconComponents = {
  learning: GraduationCap,
  talent: Users,
  performance: Target,
  ai: Sparkles,
  general: TrendingUp,
};

// Category color mapping using design system variables
const categoryColors = {
  learning: {
    bg: 'bg-[#f4fef6]',
    text: 'text-[#007a55]',
    border: 'border-[#00a199]',
    iconBg: 'bg-[rgba(90,226,195,0.2)]',
    iconColor: '#31C6B1',
  },
  talent: {
    bg: 'bg-[#f0f9ff]',
    text: 'text-[#006573]',
    border: 'border-[#006573]',
    iconBg: 'bg-[rgba(0,101,115,0.1)]',
    iconColor: '#006573',
  },
  performance: {
    bg: 'bg-[#f0fdfa]',
    text: 'text-[#00858a]',
    border: 'border-[#00858a]',
    iconBg: 'bg-[rgba(0,133,138,0.1)]',
    iconColor: '#00858A',
  },
  ai: {
    bg: 'bg-[#f0f9ff]',
    text: 'text-[#007595]',
    border: 'border-[rgba(0,184,219,0.2)]',
    iconBg: 'bg-[rgba(0,184,219,0.1)]',
    iconColor: '#00B8DB',
  },
};

export default function AnnouncementCard({
  category,
  date,
  title,
  description,
  ctaText,
  onCtaClick,
  imageUrl,
  iconType = 'learning',
  categoryColor = 'learning',
  onImageClick,
}: AnnouncementCardProps) {
  // Ensure categoryColor is valid, fallback to 'learning' if undefined
  const validCategoryColor = (categoryColor && categoryColors[categoryColor]) ? categoryColor : 'learning';
  const colorScheme = categoryColors[validCategoryColor];
  const IconComponent = iconComponents[iconType] || iconComponents.learning;

  return (
    <div className="bg-white flex gap-[24px] items-start p-[24px] rounded-[16px] w-full border border-[#c4c4c4] hover:border-[var(--accent)] transition-colors">
      {/* Icon or Image - 102x102px */}
      {imageUrl ? (
        <div 
          className="relative rounded-[16px] shrink-0 size-[102px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onImageClick && onImageClick(imageUrl, e);
          }}
        >
          <img
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            src={imageUrl}
          />
        </div>
      ) : (
        <div className={`${colorScheme.iconBg} relative rounded-[16px] shrink-0 size-[102px] flex items-center justify-center`}>
          <IconComponent
            size={48}
            style={{ color: colorScheme.iconColor }}
            strokeWidth={1.5}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col gap-[12px]">
        {/* Badge and Date */}
        <div className="flex gap-[12px] items-center">
          <div className={`${colorScheme.bg} relative rounded-[6px] shrink-0`}>
            <div className="flex items-center justify-center px-[12px] py-[4px] rounded-[inherit]">
              <p className={`font-medium leading-[16px] ${colorScheme.text} text-[12px]`}>{category}</p>
            </div>
            <div aria-hidden="true" className={`absolute border ${colorScheme.border} border-solid inset-0 pointer-events-none rounded-[6px]`} />
          </div>
          <p className="text-[var(--muted-foreground)] text-[12px] leading-[16px]">{date}</p>
        </div>

        {/* Title */}
        <h3 className="text-[var(--foreground)] text-[18px] leading-[26px] font-medium line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[var(--muted-foreground)] text-[14px] leading-[20px] line-clamp-2">
          {description}
        </p>

        {/* CTA Button - Only show if onCtaClick is provided */}
        {onCtaClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCtaClick(e);
            }}
            className="flex gap-[8px] items-center self-start mt-[4px] group hover:opacity-80 transition-opacity"
          >
            <span className="text-[var(--accent)] text-[14px] leading-[20px] font-medium">
              {ctaText}
            </span>
            <ChevronRight 
              size={16} 
              className="text-[var(--accent)] group-hover:translate-x-1 transition-transform" 
            />
          </button>
        )}
      </div>
    </div>
  );
}