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

export function Home() {
  return (
    <Layout>
      <div className="p-6 space-y-8 max-w-7xl mx-auto font-sans p-[0px]">
        
        {/* Greeting & Header */}
        <div>
          <GreetingRegion />
          <QuickActionsRegion />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
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
        <div className="pt-4 border-t border-border">
          <PeriodAlertsRegion />
        </div>

      </div>
    </Layout>
  );
}
