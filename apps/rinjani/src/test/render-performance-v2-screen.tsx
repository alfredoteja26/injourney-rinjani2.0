import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { PerformanceV2Provider } from "@performance-v2";

export function renderPerformanceV2Screen(routePath: string, routeElement: ReactElement) {
  return render(
    <MemoryRouter initialEntries={[routePath]}>
      <Routes>
        <Route
          path={routePath.replace(/^\//, "")}
          element={<PerformanceV2Provider userRole="Admin">{routeElement}</PerformanceV2Provider>}
        />
      </Routes>
    </MemoryRouter>,
  );
}
