// @vitest-environment node

import {
  buildWorkerProfileHref,
  resolveWorkerProfileAccessContext,
  resolveWorkerProfileBackHref,
} from "@rinjani/shared-types";

describe("Worker profile navigation contract", () => {
  test("builds canonical worker profile href with context and encoded return path", () => {
    expect(
      buildWorkerProfileHref("EMP-20002", {
        context: "manager",
        from: "/talent/supervisor-portal?tab=team-profile&employee=EMP-20002",
      }),
    ).toBe(
      "/worker-profile/EMP-20002?context=manager&from=%2Ftalent%2Fsupervisor-portal%3Ftab%3Dteam-profile%26employee%3DEMP-20002",
    );
  });

  test("falls back to a safe access context when the requested one is invalid", () => {
    expect(resolveWorkerProfileAccessContext("committee", "portal_admin")).toBe("committee");
    expect(resolveWorkerProfileAccessContext("unknown", "portal_admin")).toBe("portal_admin");
  });

  test("only accepts in-app back links", () => {
    expect(resolveWorkerProfileBackHref("/talent/talent-pool?employee=emp-ahmad-susanto")).toBe(
      "/talent/talent-pool?employee=emp-ahmad-susanto",
    );
    expect(resolveWorkerProfileBackHref("https://example.com/escape")).toBeUndefined();
  });
});
