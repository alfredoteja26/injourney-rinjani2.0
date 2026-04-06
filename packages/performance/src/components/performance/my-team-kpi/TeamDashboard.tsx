import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ScoreCard } from '../shared/ScoreCard';
import { teamMembers, teamMetrics, checkInSummaries } from '../data';
import { cn } from '../../ui/utils';

interface TeamDashboardProps {
  onMemberClick: (nik: string) => void;
  onViewPlanning?: () => void;
}

export function TeamDashboard({ onMemberClick, onViewPlanning }: TeamDashboardProps) {
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
            <Button variant="outline" onClick={onViewPlanning}>View Planning Phase</Button>
            <Button>Export Report</Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard 
          label="Team Avg PI Score" 
          value={teamMetrics.avgPiScore} 
          subValue={teamMetrics.avgRating} 
          variant="primary" 
        />
        <ScoreCard 
          label="Check-In 1 Status" 
          value={teamMetrics.checkInCompletion} 
          subValue="Completed" 
          variant="success" 
        />
        <ScoreCard 
          label="Pending Approvals" 
          value={teamMetrics.pendingApprovals} 
          subValue="Items" 
          variant="default" 
        />
      </div>

      {/* Team Performance Overview Table */}
      <Card>
        <CardHeader>
            <CardTitle>Team Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-4">Member</th>
                            <th className="py-3 px-4">Band</th>
                            <th className="py-3 px-4">PI Score</th>
                            <th className="py-3 px-4">PR Rating</th>
                            <th className="py-3 px-4">Trend</th>
                            <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {teamMembers.map((member) => (
                            <tr key={member.nik} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onMemberClick(member.nik)}>
                                <td className="py-3 px-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        {member.name}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-gray-500">{member.band}</td>
                                <td className="py-3 px-4 font-bold text-gray-900">{member.piScore}</td>
                                <td className="py-3 px-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {member.rating}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-gray-500">
                                    <div className="flex items-center gap-1">
                                        {member.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                                        {member.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                                        {member.trend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                                        <span>{member.trendValue}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded text-center text-sm text-gray-500">
                Team Average: <strong>{teamMetrics.avgPiScore}</strong> ({teamMetrics.avgRating})
            </div>
        </CardContent>
      </Card>

      {/* Check-In Summary Cards */}
      <div>
         <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-900">Check-In 1 Summary</h2>
             <Button variant="ghost" className="text-primary text-sm">View All</Button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {checkInSummaries.map((summary) => (
                <Card key={summary.nik} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-bold text-gray-900">{summary.name}</div>
                                <div className="text-xs text-muted-foreground">{summary.date}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-muted-foreground">PI</div>
                                <div className="font-bold text-primary">{summary.pi}</div>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <div className="text-xs font-semibold text-green-700 uppercase tracking-wide">Highlight</div>
                                <p className="text-sm text-gray-600 line-clamp-2">{summary.highlight}</p>
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">Challenge</div>
                                <p className="text-sm text-gray-600 line-clamp-2">{summary.challenge}</p>
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Action Item</div>
                                <p className="text-sm text-gray-600 line-clamp-2">{summary.action}</p>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full text-xs h-8" onClick={() => onMemberClick(summary.nik)}>View Detail</Button>
                    </CardContent>
                </Card>
            ))}
         </div>
      </div>
    </div>
  );
}
