import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { Layout as AppShell } from "../../components/shell/Layout";
import { MyAssessmentList } from "../../components/360-assessment/MyAssessmentList";
import { AssignedAssessmentList } from "../../components/360-assessment/AssignedAssessmentList";
import { HistoryList } from "../../components/360-assessment/HistoryList";
import { assessorAssignments, currentUser } from "../../lib/360-assessment/data";

export default function Assessment360Page() {
  const [activeTab, setActiveTab] = useState<"my-assessment" | "assigned" | "history">("my-assessment");

  // Calculate pending assignments for badge
  const pendingAssignments = useMemo(() => assessorAssignments.filter(
    a => a.assessor_id === currentUser.id && ['notified', 'in_progress'].includes(a.status)
  ), []);

  const pendingCount = pendingAssignments.length;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
           <h1 className="text-3xl font-bold font-sans text-slate-800">360 Assessment</h1>
           <p className="text-muted-foreground">
             Lihat hasil penilaian dan isi kuesioner yang ditugaskan kepada Anda.
           </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("my-assessment")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors relative whitespace-nowrap
                ${activeTab === "my-assessment" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                }`}
            >
              Penilaian Saya
            </button>
            <button
              onClick={() => setActiveTab("assigned")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors relative flex items-center gap-2 whitespace-nowrap
                ${activeTab === "assigned" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                }`}
            >
              Penilaian yang Ditugaskan
              {pendingCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold leading-none rounded-full bg-destructive text-destructive-foreground">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors relative whitespace-nowrap
                ${activeTab === "history" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                }`}
            >
              Riwayat
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeTab === "my-assessment" && <MyAssessmentList />}
          {activeTab === "assigned" && <AssignedAssessmentList />}
          {activeTab === "history" && <HistoryList />}
        </div>
      </div>
    </AppShell>
  );
}
