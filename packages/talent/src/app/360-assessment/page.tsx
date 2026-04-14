import { useState } from "react";
import { Layout as AppShell } from "../../components/shell/Layout";
import { MyAssessmentList } from "../../components/360-assessment/MyAssessmentList";
import { AssignedAssessmentList } from "../../components/360-assessment/AssignedAssessmentList";
import { HistoryList } from "../../components/360-assessment/HistoryList";
import { assessorAssignments, currentUser } from "../../lib/360-assessment/data";
import {
  Button,
  FilterRail,
  PageHeader,
  StatCard,
  StatCardGroup,
  StatusBadge,
} from "@rinjani/shared-ui";
import { CalendarClock, CheckCircle2, Clock3, ListChecks } from "lucide-react";

export default function Assessment360Page() {
  const [activeTab, setActiveTab] = useState<"my-assessment" | "assigned" | "history">("my-assessment");

  const myAssessmentCount = assessorAssignments.filter((assignment) => assignment.assessee_id === currentUser.id).length;
  const pendingAssignments = assessorAssignments.filter(
    (assignment) => assignment.assessor_id === currentUser.id && ["notified", "in_progress"].includes(assignment.status),
  );
  const pendingCount = pendingAssignments.length;
  const historyCount = assessorAssignments.filter((assignment) => assignment.status === "completed").length;
  const activeCycleCount = assessorAssignments.filter((assignment) => ["notified", "in_progress"].includes(assignment.status)).length;

  const tabs = [
    { value: "my-assessment" as const, label: "Penilaian Saya", count: myAssessmentCount, icon: ListChecks },
    { value: "assigned" as const, label: "Penilaian yang Ditugaskan", count: pendingCount, icon: Clock3 },
    { value: "history" as const, label: "Riwayat", count: historyCount, icon: CheckCircle2 },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-[var(--layout-max-width-workspace)] space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8">
        <PageHeader
          variant="workspace"
          eyebrow="Talent Development"
          title="360 Assessment"
          description="Lihat hasil penilaian, selesaikan assignment yang ditugaskan, dan akses riwayat penilaian dalam satu workspace yang lebih rapi."
          badge={<StatusBadge status={pendingCount > 0 ? "warning" : "completed"}>{pendingCount > 0 ? `${pendingCount} pending` : "All clear"}</StatusBadge>}
        />

        <StatCardGroup>
          <StatCard
            label="Penilaian Saya"
            value={myAssessmentCount}
            description="Assessment yang tersedia untuk Anda sebagai peserta."
            icon={<ListChecks className="size-6" />}
            tone="info"
          />
          <StatCard
            label="Ditugaskan"
            value={pendingCount}
            description="Assignment yang masih perlu diselesaikan."
            icon={<Clock3 className="size-6" />}
            tone={pendingCount > 0 ? "warning" : "success"}
          />
          <StatCard
            label="Riwayat"
            value={historyCount}
            description="Assessment yang sudah selesai dan tercatat."
            icon={<CheckCircle2 className="size-6" />}
            tone="neutral"
          />
          <StatCard
            label="Target Aktif"
            value={activeCycleCount}
            description="Penugasan aktif yang masih berjalan."
            icon={<CalendarClock className="size-6" />}
            tone="info"
          />
        </StatCardGroup>

        <FilterRail
          title="Workspace views"
          description="Gunakan tab berikut untuk berpindah antara penilaian pribadi, tugas yang ditugaskan, dan riwayat."
          actionsClassName="w-full"
        >
          <div className="flex w-full flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <Button
                  key={tab.value}
                  type="button"
                  variant={activeTab === tab.value ? "secondary" : "outline"}
                  onClick={() => setActiveTab(tab.value)}
                  className="justify-start"
                >
                  <Icon className="size-4" />
                  <span>{tab.label}</span>
                  <StatusBadge
                    status={activeTab === tab.value ? "info" : "neutral"}
                    className="ml-1 min-w-5 px-1.5 py-0 text-[10px]"
                  >
                    {tab.count}
                  </StatusBadge>
                </Button>
              );
            })}
          </div>
        </FilterRail>

        <div className="min-h-[400px]">
          {activeTab === "my-assessment" && <MyAssessmentList />}
          {activeTab === "assigned" && <AssignedAssessmentList />}
          {activeTab === "history" && <HistoryList />}
        </div>
      </div>
    </AppShell>
  );
}
