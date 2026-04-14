import { Layout } from "../components/shell/Layout";
import { GreetingRegion } from "../components/home/GreetingRegion";
import { QuickActionsRegion } from "../components/home/QuickActionsRegion";
import { CareerStatusCard } from "../components/home/CareerStatusCard";
import { MyClassificationCard } from "../components/home/MyClassificationCard";
import { AspirationSummaryCard } from "../components/home/AspirationSummaryCard";
import { IDPProgressCard } from "../components/home/IDPProgressCard";
import { JobApplicationsCard } from "../components/home/JobApplicationsCard";
import { TeamSummaryCard } from "../components/home/TeamSummaryCard";
import { PeriodAlertsRegion } from "../components/home/PeriodAlertsRegion";
import { SectionPanel } from "@rinjani/shared-ui";

export function Home() {
  return (
    <Layout>
      <div className="mx-auto max-w-[var(--layout-max-width-dashboard)] space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8">
        <div className="space-y-4">
          <GreetingRegion />
          <SectionPanel
            title="Aksi cepat"
            description="Akses modul yang paling sering dipakai tanpa mengubah alur kerja yang sudah ada."
            contentClassName="pt-0"
          >
            <QuickActionsRegion />
          </SectionPanel>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* Row 1: Career Status (Full Width) */}
          <div className="md:col-span-2">
            <CareerStatusCard />
          </div>

          {/* Row 2: Classification & Aspiration */}
          <div className="md:col-span-1 h-full">
            <MyClassificationCard />
          </div>
          <div className="md:col-span-1 h-full">
            <AspirationSummaryCard />
          </div>

          {/* Row 3: IDP & Job Applications */}
          <div className="md:col-span-1 h-full">
            <IDPProgressCard />
          </div>
          <div className="md:col-span-1 h-full">
            <JobApplicationsCard />
          </div>

          {/* Row 4: Team Summary (Full Width - Line Manager Only) */}
          <div className="md:col-span-2">
            <TeamSummaryCard />
          </div>

        </div>

        {/* Alerts Section */}
        <SectionPanel
          title="Periode & perhatian"
          description="Ringkasan pengingat periode aktif dan agenda yang perlu ditindaklanjuti."
        >
          <PeriodAlertsRegion />
        </SectionPanel>
      </div>
    </Layout>
  );
}
