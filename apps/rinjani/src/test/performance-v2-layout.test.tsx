import { KpiHqScreen, KpiLibraryScreen, KpiTreeScreen, MyKpiDashboardScreen, MyTeamPlanningScreen } from "@performance-v2";
import { renderPerformanceV2Screen } from "./render-performance-v2-screen";

describe("Performance V2 landing layouts", () => {
  test("renders the My KPI dashboard inside a dashboard hub page frame", () => {
    renderPerformanceV2Screen("/performance-v2/my-kpi", <MyKpiDashboardScreen />);

    const pageFrame = document.querySelector('[data-slot="performance-page-frame"]');

    expect(pageFrame).toBeInTheDocument();
    expect(pageFrame).toHaveAttribute("data-variation", "dashboard-hub");
    expect(pageFrame).toHaveAttribute("data-surface-tone", "system-default");
    expect(pageFrame).toHaveAttribute("data-width-profile", "dashboard");
  });

  test("keeps My Team KPI in the richer dashboard tone instead of the light governance tone", () => {
    renderPerformanceV2Screen("/performance-v2/my-team-kpi/planning", <MyTeamPlanningScreen />);

    const pageFrame = document.querySelector('[data-slot="performance-page-frame"]');

    expect(pageFrame).toBeInTheDocument();
    expect(pageFrame).toHaveAttribute("data-variation", "dashboard-hub");
    expect(pageFrame).toHaveAttribute("data-surface-tone", "system-default");
    expect(pageFrame).toHaveAttribute("data-width-profile", "dashboard");
  });

  test("renders the KPI Tree workspace controls inside a reusable filter rail", () => {
    renderPerformanceV2Screen("/performance-v2/kpi-tree", <KpiTreeScreen />);

    const filterRail = document.querySelector('[data-slot="performance-filter-rail"]');

    expect(filterRail).toBeInTheDocument();
    expect(filterRail).toHaveAttribute("data-rail-layout", "responsive-inline");
  });

  test("keeps KPI HQ as the lightest page variation", () => {
    renderPerformanceV2Screen("/performance-v2/kpi-headquarter", <KpiHqScreen />);

    const pageFrame = document.querySelector('[data-slot="performance-page-frame"]');

    expect(pageFrame).toBeInTheDocument();
    expect(pageFrame).toHaveAttribute("data-variation", "governance-cockpit");
    expect(pageFrame).toHaveAttribute("data-surface-tone", "system-default");
    expect(pageFrame).toHaveAttribute("data-width-profile", "governance");
  });

  test("keeps workspace pages wider than dashboard pages", () => {
    renderPerformanceV2Screen("/performance-v2/kpi-tree", <KpiTreeScreen />);

    const workspaceFrame = document.querySelector('[data-slot="performance-page-frame"]');

    expect(workspaceFrame).toBeInTheDocument();
    expect(workspaceFrame).toHaveAttribute("data-width-profile", "workspace");
  });

  test("anchors the KPI HQ toolbar intro block to the top-left", () => {
    renderPerformanceV2Screen("/performance-v2/kpi-headquarter", <KpiHqScreen />);

    const toolbarHeader = document.querySelector('[data-slot="hq-toolbar-header"]');

    expect(toolbarHeader).toBeInTheDocument();
    expect(toolbarHeader).toHaveAttribute("data-content-alignment", "top-left");
  });

  test("uses a dashboard summary band on My Team KPI", () => {
    renderPerformanceV2Screen("/performance-v2/my-team-kpi/planning", <MyTeamPlanningScreen />);

    const sectionBand = document.querySelector('[data-slot="performance-section-band"]');

    expect(sectionBand).toBeInTheDocument();
    expect(sectionBand).toHaveAttribute("data-band-variation", "dashboard");
    expect(sectionBand).toHaveAttribute("data-band-surface", "system-default");
  });

  test("uses a workspace summary band on KPI Tree", () => {
    renderPerformanceV2Screen("/performance-v2/kpi-tree", <KpiTreeScreen />);

    const sectionBand = document.querySelector('[data-slot="performance-section-band"]');

    expect(sectionBand).toBeInTheDocument();
    expect(sectionBand).toHaveAttribute("data-band-variation", "workspace");
    expect(sectionBand).toHaveAttribute("data-band-surface", "system-default");
  });

  test("uses a workspace summary band on KPI Library", () => {
    renderPerformanceV2Screen("/performance-v2/kpi-library", <KpiLibraryScreen />);

    const sectionBand = document.querySelector('[data-slot="performance-section-band"]');

    expect(sectionBand).toBeInTheDocument();
    expect(sectionBand).toHaveAttribute("data-band-variation", "workspace");
    expect(sectionBand).toHaveAttribute("data-band-surface", "system-default");
  });

  test("uses a governance summary band on KPI HQ", () => {
    renderPerformanceV2Screen("/performance-v2/kpi-headquarter", <KpiHqScreen />);

    const sectionBand = document.querySelector('[data-slot="performance-section-band"]');

    expect(sectionBand).toBeInTheDocument();
    expect(sectionBand).toHaveAttribute("data-band-variation", "governance");
    expect(sectionBand).toHaveAttribute("data-band-surface", "system-default");
  });
});
