import React from 'react';
import { cn } from '../../ui/utils';

type StatusType = 'Draft' | 'Set' | 'Submitted' | 'Approved' | 'Locked' | 'On Track' | 'At Risk' | 'Behind' | 'Pending' | 'Completed' | 'Upcoming';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  let icon = null;

  switch (status) {
    case 'On Track':
    case 'Approved':
    case 'Set':
    case 'Completed':
      bgColor = 'bg-green-100 text-green-800';
      textColor = 'text-green-800';
      break;
    case 'At Risk':
    case 'Submitted':
    case 'Upcoming':
      bgColor = 'bg-yellow-100 text-yellow-800';
      textColor = 'text-yellow-800';
      break;
    case 'Behind':
    case 'Rejected':
      bgColor = 'bg-red-100 text-red-800';
      textColor = 'text-red-800';
      break;
    case 'Draft':
    case 'Pending':
      bgColor = 'bg-gray-100 text-gray-800';
      textColor = 'text-gray-800';
      break;
    default:
      break;
  }

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      bgColor,
      textColor,
      className
    )}>
      {status}
    </span>
  );
}
