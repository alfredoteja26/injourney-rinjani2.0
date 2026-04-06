import React from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ScoreCard } from '../shared/ScoreCard';
import { ProgressBar } from '../shared/ProgressBar';
import { teamMembers } from '../data';
import { StatusBadge } from '../shared/StatusBadge';

interface TeamPlanningDashboardProps {
  onViewMonitoring: () => void;
  onCascadeKPI: () => void;
  onMemberClick?: (nik: string) => void;
}

export function TeamPlanningDashboard({ onViewMonitoring, onCascadeKPI, onMemberClick }: TeamPlanningDashboardProps) {
  const approvedCount = teamMembers.filter(m => m.goalStatus === 'Approved').length;
  const pendingCount = teamMembers.filter(m => m.goalStatus === 'Submitted').length;
  const totalCount = teamMembers.length;
  const progress = Math.round((approvedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Rinjani</span>
            <span>/</span>
            <span>Performance</span>
            <span>/</span>
            <span className="text-foreground font-medium">My Team KPI</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Team KPI 2026</h1>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={onViewMonitoring}>View Monitoring Phase</Button>
           <Button onClick={onCascadeKPI}>Cascade KPI</Button>
        </div>
      </div>

      {/* Goal Setting Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    📋 GOAL SETTING PERIOD
                 </h2>
                 <p className="text-blue-700 mt-1">Deadline: 28 Feb 2026</p>
              </div>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between text-sm text-blue-800 font-medium">
                 <span>Team Progress</span>
                 <span>{progress}%</span>
              </div>
              <ProgressBar value={progress} className="h-2.5" />
              <p className="text-xs text-blue-600">{approvedCount} of {totalCount} team members completed goal setting</p>
           </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard 
          label="Team Members" 
          value={totalCount} 
          subValue="Active" 
          variant="default" 
        />
        <ScoreCard 
          label="Approved" 
          value={approvedCount} 
          subValue="Members" 
          variant="success" 
        />
        <ScoreCard 
          label="Pending Approval" 
          value={pendingCount} 
          subValue="Submission" 
          variant="warning" 
        />
      </div>

      {/* Team Members Status */}
      <Card>
        <CardHeader>
            <CardTitle>Team Members Status</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-4">Member</th>
                            <th className="py-3 px-4">Band</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Progress</th>
                            <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {teamMembers.map((member) => (
                            <tr key={member.nik} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        {member.name}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-gray-500">{member.band}</td>
                                <td className="py-3 px-4">
                                    <StatusBadge status={member.goalStatus} />
                                </td>
                                <td className="py-3 px-4 text-gray-500">8/8 KPI</td>
                                <td className="py-3 px-4 text-right">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-primary"
                                        onClick={() => onMemberClick?.(member.nik)}
                                    >
                                        {member.goalStatus === 'Submitted' ? 'Review' : 'View'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
