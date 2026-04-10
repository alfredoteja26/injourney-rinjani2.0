import { Navigate, Outlet } from "react-router";
import {
  KpiHqScreen,
  KpiLibraryDetailScreen,
  KpiLibraryScreen,
  KpiLibrarySubmitScreen,
  KpiTreeScreen,
  MemberPortfolioScreen,
  MyKpiCheckInScreen,
  MyKpiDashboardScreen,
  MyKpiPlanningScreen,
  MyKpiYearEndScreen,
  MyTeamMonitoringScreen,
  MyTeamPlanningScreen,
  PerformanceV2Provider,
} from "@performance-v2";
import { useSession } from "./session";

function resolveActingEmployeeNumber(email: string | undefined, role: "Admin" | "User"): string | undefined {
  const e = email?.toLowerCase() ?? "";
  if (e.includes("binavia")) {
    return "260102";
  }
  if (e.includes("dimas")) {
    return "260101";
  }
  if (role === "Admin") {
    return "260101";
  }
  return undefined;
}

export function PerformanceV2ShellLayout() {
  const { session } = useSession();
  if (!session) {
    return null;
  }
  const acting = resolveActingEmployeeNumber(session.email, session.role);
  return (
    <PerformanceV2Provider userRole={session.role} actingAsEmployeeNumber={acting}>
      <Outlet />
    </PerformanceV2Provider>
  );
}

export function PerformanceV2IndexRedirect() {
  return <Navigate to="/performance-v2/my-kpi" replace />;
}

export function PerformanceV2MyKpiDashboardPage() {
  return <MyKpiDashboardScreen />;
}

export function PerformanceV2MyKpiPlanningPage() {
  return <MyKpiPlanningScreen />;
}

export function PerformanceV2MyKpiCheckInPage() {
  return <MyKpiCheckInScreen />;
}

export function PerformanceV2MyKpiYearEndPage() {
  return <MyKpiYearEndScreen />;
}

export function PerformanceV2MyTeamPlanningPage() {
  return <MyTeamPlanningScreen />;
}

export function PerformanceV2MyTeamMonitoringPage() {
  return <MyTeamMonitoringScreen />;
}

export function PerformanceV2MemberPortfolioPage() {
  return <MemberPortfolioScreen />;
}

export function PerformanceV2KpiLibraryPage() {
  return <KpiLibraryScreen />;
}

export function PerformanceV2KpiLibrarySubmitPage() {
  return <KpiLibrarySubmitScreen />;
}

export function PerformanceV2KpiLibraryDetailPage() {
  return <KpiLibraryDetailScreen />;
}

export function PerformanceV2KpiTreePage() {
  return <KpiTreeScreen />;
}

export function PerformanceV2KpiHqPage() {
  return <KpiHqScreen />;
}
