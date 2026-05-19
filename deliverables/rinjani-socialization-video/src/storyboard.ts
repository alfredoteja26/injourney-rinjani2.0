export const scenes = [
  {
    key: "opening",
    title: "Rinjani 2.0",
    eyebrow: "Human Capital Operating System",
    body: "One integrated experience for Portal, Talent, and Performance.",
    frames: 180,
  },
  {
    key: "why",
    title: "From scattered module reviews to one product story",
    eyebrow: "Why this matters",
    body: "Rinjani 2.0 removes fragmented shells, duplicated navigation, and disconnected HR journeys.",
    frames: 270,
  },
  {
    key: "integrated",
    title: "A single shell for the employee lifecycle",
    eyebrow: "Integrated review surface",
    body: "One login, one global header, one platform switcher, and route ownership that keeps every module in context.",
    frames: 300,
  },
  {
    key: "platforms",
    title: "Three platforms, one operating rhythm",
    eyebrow: "Portal + Talent + Performance",
    body: "Employee services, growth journeys, and KPI governance now sit inside one connected prototype.",
    frames: 360,
  },
  {
    key: "governance",
    title: "Designed for employees, leaders, and HQ",
    eyebrow: "Role-based socialization",
    body: "The same experience supports self-service, team decisions, talent committee review, and headquarter monitoring.",
    frames: 330,
  },
  {
    key: "adoption",
    title: "Socialize the change as a new way of working",
    eyebrow: "Adoption message",
    body: "Use Rinjani 2.0 to review flows end to end, align decisions earlier, and reduce handoff friction.",
    frames: 240,
  },
  {
    key: "close",
    title: "Rinjani 2.0 is the shared review surface",
    eyebrow: "Next step",
    body: "Align on the journey, then validate each module through the integrated prototype.",
    frames: 120,
  },
] as const;

export type SceneKey = (typeof scenes)[number]["key"];

export const sceneStarts = scenes.reduce<Record<SceneKey, number>>((acc, scene, index) => {
  const prior = scenes.slice(0, index).reduce((sum, item) => sum + item.frames, 0);
  acc[scene.key] = prior;
  return acc;
}, {} as Record<SceneKey, number>);
