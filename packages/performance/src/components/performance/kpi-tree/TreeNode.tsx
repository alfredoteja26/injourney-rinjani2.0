import React, { useState } from 'react';
import { ChevronRight, ChevronDown, User, Target } from 'lucide-react';
import { KPITreeNode } from '../data';
import { cn } from '../../ui/utils';

interface TreeNodeProps {
  node: KPITreeNode;
  onFocus?: (node: KPITreeNode) => void;
  isLast?: boolean;
  isRoot?: boolean;
}

export function TreeNode({ node, onFocus, isLast = true, isRoot = false }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(node.isExpanded || false);
  const hasChildren = node.children && node.children.length > 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-500';
      case 'at_risk': return 'bg-yellow-500';
      case 'behind': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getScoreColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'text-green-600';
      case 'at_risk': return 'text-yellow-600';
      case 'behind': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="relative">
      {/* Node Row */}
      <div className="relative flex items-center mb-3">
        {/* Connector Lines (Not for Root) */}
        {!isRoot && (
          <>
            {/* Horizontal Line connecting to parent vertical line */}
            <div className="absolute left-[-24px] top-1/2 w-[24px] h-px bg-gray-300 -translate-y-1/2" />
            
            {/* Cover vertical line if last child */}
            {isLast && (
               <div className="absolute left-[-24px] top-1/2 bottom-0 w-px bg-gray-50" /> // bg-gray-50 matches background to hide line? Or just don't draw it in parent?
               // Better strategy: The parent draws the vertical line, and we just draw the horizontal one. 
               // But determining "isLast" to stop the vertical line in parent is easier if handled in parent.
            )}
          </>
        )}

        {/* Card Content */}
        <div 
            className={cn(
                "flex-1 flex items-center gap-3 p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all relative z-10 min-w-[600px]",
                node.isCurrentUser ? "border-blue-300 ring-1 ring-blue-200 bg-blue-50/20" : "border-gray-200"
            )}
        >
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                  "p-1 rounded-md hover:bg-gray-100 text-gray-400 transition-colors flex-shrink-0", 
                  !hasChildren && "invisible"
              )}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onFocus?.(node)}>
                <div className="flex justify-between items-center gap-4">
                    <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 truncate text-base">{node.title}</span>
                            {node.isCurrentUser && (
                                <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] uppercase tracking-wider rounded-full font-bold shadow-sm">
                                    You
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                             <div className="flex items-center gap-1.5 min-w-0">
                                <User className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                                <span className="truncate text-gray-700">{node.owner} <span className="text-gray-400">({node.ownerRole})</span></span>
                             </div>
                             {node.target && (
                                <>
                                    <span className="text-gray-300">•</span>
                                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                                        <Target className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                                        <span>Target: <span className="text-gray-700 font-medium">{node.target}</span></span>
                                    </div>
                                </>
                             )}
                             {node.weight && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 whitespace-nowrap border border-gray-200">
                                    Weight: {node.weight}%
                                </span>
                             )}
                        </div>
                    </div>

                    <div className="flex items-center gap-5 flex-shrink-0 pl-4 border-l border-gray-100">
                         <span className={cn("text-xl font-bold font-mono tracking-tight", getScoreColor(node.status))}>
                            {node.score.toFixed(2)}
                         </span>
                         <div className={cn("w-3 h-3 rounded-full ring-2 ring-white shadow-sm", getStatusColor(node.status))} />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Children Container */}
      {isExpanded && hasChildren && (
          <div className="relative pl-[48px]">
             {/* Continuous vertical line for children */}
             <div className="absolute left-[24px] top-[-20px] bottom-6 w-px bg-gray-300" />
             
             {node.children?.map((child, index) => (
                <div key={child.id} className="relative">
                     {/* Curve for last child to hide the vertical line extension? 
                         Actually, standard approach: 
                         The vertical line spans from top to the horizontal branch of the last child. 
                         If we use a full height line, we need to mask it.
                         Or we just let the line stop at 'bottom-6' which works if the row height is consistent.
                     */}
                     
                    {/* Mask for the vertical line for the last child */}
                    {index === (node.children?.length || 0) - 1 && (
                        <div className="absolute left-[-25px] top-[24px] bottom-0 w-[2px] bg-gray-50/0" /> 
                        // The bg-gray-50/0 doesn't hide anything. 
                        // The 'bottom-6' on the parent vertical line is an approximation. 
                        // A better way is: don't draw one long line. Draw segment per child.
                    )}
                    
                    {/* 
                        Let's try the segment approach in the parent loop?
                        Actually, standard tree lines are:
                        Vertical line from parent down to last child.
                        Horizontal line from vertical line to child.
                    */}
                    
                    <TreeNode 
                        node={child} 
                        isLast={index === (node.children?.length || 0) - 1}
                    />
                </div>
             ))}
          </div>
      )}
    </div>
  );
}
