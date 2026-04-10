import { useLocation, useNavigate } from "react-router";

const MY_TEAM_BASE = "/performance-v2/my-team-kpi";

function phaseFromPathname(pathname: string): "planning" | "monitoring" {
  if (pathname.includes(`${MY_TEAM_BASE}/planning`)) {
    return "planning";
  }
  if (pathname.includes(`${MY_TEAM_BASE}/monitoring`)) {
    return "monitoring";
  }
  return "planning";
}

function segmentClass(active: boolean) {
  return [
    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
    active ? "bg-white text-primary shadow-sm" : "text-white/85 hover:bg-white/10 hover:text-white",
  ].join(" ");
}

export function MyTeamKpiPhaseToggle() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const phase = phaseFromPathname(pathname);

  return (
    <div
      className="flex items-center gap-0.5 rounded-xl bg-white/12 p-1 ring-1 ring-white/20"
      role="group"
      aria-label="Fase My Team KPI"
    >
      <button
        type="button"
        className={segmentClass(phase === "planning")}
        aria-pressed={phase === "planning"}
        onClick={() => navigate(`${MY_TEAM_BASE}/planning`)}
      >
        Perencanaan
      </button>
      <button
        type="button"
        className={segmentClass(phase === "monitoring")}
        aria-pressed={phase === "monitoring"}
        onClick={() => navigate(`${MY_TEAM_BASE}/monitoring`)}
      >
        Monitoring
      </button>
    </div>
  );
}
