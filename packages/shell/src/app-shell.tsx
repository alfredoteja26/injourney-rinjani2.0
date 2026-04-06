import type { ReactNode } from "react";
import { createContext, startTransition, useContext, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Bell,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileCheck,
  GitBranch,
  Grid3X3,
  LayoutGrid,
  LineChart,
  Mail,
  Search,
  Settings,
  ShieldCheck,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import type { ModuleManifest, Notification, PlatformManifest, ShellNavigationState, UserRole } from "@rinjani/shared-types";

interface AppShellProps {
  children: ReactNode;
  platforms: PlatformManifest[];
  modules: ModuleManifest[];
  notifications: Notification[];
  userRole: UserRole;
  userEmail: string;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
}

const ShellPresenceContext = createContext(false);

const iconMap = {
  analytics: LineChart,
  briefcase: Briefcase,
  clipboard: ClipboardList,
  file: FileCheck,
  git: GitBranch,
  grid: Grid3X3,
  mail: Mail,
  settings: Settings,
  shield: ShieldCheck,
  target: Target,
  trophy: Trophy,
  users: Users,
  workspace: Building2,
} as const;

function resolveIcon(iconKey: string) {
  return iconMap[iconKey as keyof typeof iconMap] ?? LayoutGrid;
}

function initialsFor(email: string) {
  return email
    .split("@")[0]
    .split(/[._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function useIntegratedShell() {
  return useContext(ShellPresenceContext);
}

export function AppShell({
  children,
  platforms,
  modules,
  notifications,
  userRole,
  userEmail,
  onRoleChange,
  onLogout,
}: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const visiblePlatforms = useMemo(
    () => platforms.filter((platform) => platform.visibleTo.includes(userRole)).sort((left, right) => left.order - right.order),
    [platforms, userRole],
  );

  const visibleModules = useMemo(
    () =>
      modules
        .filter((module) => module.visibleTo.includes(userRole) && !module.hidden)
        .sort((left, right) => left.order - right.order),
    [modules, userRole],
  );

  const currentModule = useMemo(() => {
    return (
      visibleModules
        .sort((left, right) => right.routePath.length - left.routePath.length)
        .find((module) => location.pathname === module.routePath || location.pathname.startsWith(`${module.routePath}/`)) ?? visibleModules[0]
    );
  }, [location.pathname, visibleModules]);

  const currentPlatform =
    visiblePlatforms.find((platform) => platform.id === currentModule?.parentPlatformId) ?? visiblePlatforms[0] ?? platforms[0];

  const navigationState: ShellNavigationState = {
    currentPlatformId: currentPlatform?.id ?? "portal",
    currentModuleId: currentModule?.id ?? "portal-dashboard",
    isSidebarCollapsed,
    notificationCount: notifications.filter((notification) => !notification.read).length,
    currentPageTitle: currentModule?.label,
    shellVariant: "rinjani-talent-light",
  };

  const sidebarGroups = Array.from(
    visibleModules
      .filter((module) => module.parentPlatformId === currentPlatform.id)
      .reduce((map, module) => {
        const group = map.get(module.sidebarGroup) ?? [];
        group.push(module);
        map.set(module.sidebarGroup, group);
        return map;
      }, new Map<string, ModuleManifest[]>()),
  );

  return (
    <ShellPresenceContext.Provider value>
      <div className="flex h-screen overflow-hidden bg-sidebar text-sidebar-foreground">
        <aside
          className={`relative flex h-full flex-col border-r border-sidebar-border/20 bg-sidebar shadow-xl transition-all duration-300 ${
            isSidebarCollapsed ? "w-[88px]" : "w-[320px]"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4">
            <div className={`min-w-0 ${isSidebarCollapsed ? "hidden" : "block"}`}>
              <p className="text-lg font-bold tracking-[0.18em] text-sidebar-foreground">RINJANI</p>
              <p className="text-xs text-sidebar-foreground/70">Integrated Human Capital Management Workspace</p>
            </div>
            <button
              type="button"
              className={`rounded-full border border-sidebar-foreground/10 bg-sidebar-accent text-sidebar-accent-foreground shadow-md transition-colors hover:bg-sidebar-accent/90 ${
                isSidebarCollapsed ? "mx-auto p-2" : "p-2"
              }`}
              onClick={() => setIsSidebarCollapsed((value) => !value)}
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isSidebarCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            </button>
          </div>

          <div className="px-4 pb-4">
            <div className="rounded-3xl border border-sidebar-foreground/10 bg-sidebar-foreground/8 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-sidebar-foreground/55">Current Platform</p>
              <p className="mt-1 text-base font-semibold text-sidebar-foreground">{currentPlatform.label}</p>
              {!isSidebarCollapsed ? <p className="mt-1 text-xs leading-5 text-sidebar-foreground/70">{currentPlatform.description}</p> : null}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-6">
            {sidebarGroups.map(([groupLabel, groupModules]) => (
              <section key={groupLabel} className="mb-6">
                {!isSidebarCollapsed ? (
                  <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-sidebar-foreground/55">{groupLabel}</p>
                ) : (
                  <div className="mb-2 h-px w-8 bg-sidebar-foreground/15 mx-auto" />
                )}
                <div className="space-y-1">
                  {groupModules.map((module) => {
                    const isActive = navigationState.currentModuleId === module.id;
                    const Icon = resolveIcon(module.iconKey);
                    return (
                      <Link
                        key={module.id}
                        to={module.routePath}
                        className={`group flex items-center gap-3 rounded-2xl px-3 py-2 transition-all ${
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
                        }`}
                        title={module.label}
                      >
                        <Icon
                          className={`size-5 shrink-0 ${
                            isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/65 group-hover:text-sidebar-foreground"
                          }`}
                        />
                        {!isSidebarCollapsed ? (
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{module.label}</p>
                            {module.description ? (
                              <p className={`truncate text-xs ${isActive ? "text-sidebar-primary-foreground/75" : "text-sidebar-foreground/60"}`}>
                                {module.description}
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="border-t border-sidebar-foreground/10 px-4 py-4">
            <div className="flex items-center gap-3 rounded-2xl bg-sidebar-foreground/8 p-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sidebar-foreground/12 text-sm font-semibold text-sidebar-foreground">
                {initialsFor(userEmail)}
              </div>
              {!isSidebarCollapsed ? (
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-sidebar-foreground">{userEmail}</p>
                  <p className="text-xs text-sidebar-foreground/65">{userRole}</p>
                </div>
              ) : null}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-sidebar">
          <header className="relative z-20 border-b border-sidebar-border/20 bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-xl bg-white/10 p-2">
                  <LayoutGrid className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{currentModule?.label ?? currentPlatform.label}</p>
                  <p className="truncate text-xs text-primary-foreground/70">{currentPlatform.label}</p>
                </div>
              </div>

              <div className="hidden flex-1 items-center rounded-xl bg-white/10 px-4 py-2 lg:flex">
                <Search className="mr-3 size-4 text-primary-foreground/70" />
                <span className="text-sm text-primary-foreground/75">Search modules, people, or policy</span>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSwitcherOpen((value) => !value)}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/15"
                  >
                    <LayoutGrid className="size-4" />
                    <span className="hidden sm:inline">Platform</span>
                    <ChevronDown className="size-4" />
                  </button>

                  {isSwitcherOpen ? (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-[320px] rounded-2xl border border-border/70 bg-card p-4 text-foreground shadow-xl">
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-foreground">Switch Platform</p>
                        <p className="text-xs text-muted-foreground">Change workspace context while keeping one shared shell.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {visiblePlatforms.map((platform) => {
                          const Icon = resolveIcon(platform.iconKey);
                          const isActive = platform.id === currentPlatform.id;
                          return (
                            <button
                              key={platform.id}
                              type="button"
                              onClick={() => {
                                setIsSwitcherOpen(false);
                                startTransition(() => navigate(platform.defaultRoute));
                              }}
                              className={`rounded-2xl border p-3 text-left transition-colors ${
                                isActive
                                  ? "border-primary/20 bg-primary/5"
                                  : "border-border bg-background hover:bg-muted/60"
                              }`}
                            >
                              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon className="size-5" />
                              </div>
                              <p className="text-sm font-semibold text-foreground">{platform.switcherLabel ?? platform.label}</p>
                              <p className="mt-1 text-xs leading-5 text-muted-foreground">{platform.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>

                <label className="relative hidden sm:block">
                  <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/70" />
                  <select
                    value={userRole}
                    onChange={(event) => onRoleChange(event.target.value as UserRole)}
                    className="rounded-xl border border-white/10 bg-white/10 py-2 pl-10 pr-4 text-sm text-primary-foreground outline-none"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </label>

                <div className="relative rounded-xl bg-white/10 p-2">
                  <Bell className="size-5" />
                  {navigationState.notificationCount > 0 ? (
                    <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[11px] font-bold text-secondary-foreground">
                      {navigationState.notificationCount}
                    </span>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/15"
                >
                  <span className="hidden md:inline">Logout</span>
                  <div className="flex size-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                    {initialsFor(userEmail)}
                  </div>
                </button>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto bg-sidebar">
            <div className="min-h-full rounded-tl-[28px] border border-white/5 bg-background shadow-inner">{children}</div>
          </main>
        </div>
      </div>
    </ShellPresenceContext.Provider>
  );
}
