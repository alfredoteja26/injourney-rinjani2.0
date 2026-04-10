import { Badge, Button, cn } from "@rinjani/shared-ui";
import { usePerformanceV2 } from "../lib/store/performance-v2-store";

export function PersonaContextDetails({
  layout = "panel",
  className,
}: {
  layout?: "inline" | "panel";
  className?: string;
}) {
  const { actingAsEmployeeNumber, userRole, getEmployeeDisplay, getPositionTitleForEmployee, managerEmployeeNumber } = usePerformanceV2();
  const title = getPositionTitleForEmployee(actingAsEmployeeNumber);

  if (layout === "inline") {
    return (
      <>
        <Badge variant="neutral">Peran aplikasi: {userRole}</Badge>
        <Badge variant="info">NIK {actingAsEmployeeNumber}</Badge>
        <span className="font-medium text-foreground">{getEmployeeDisplay(actingAsEmployeeNumber)}</span>
        {title ? <span className="text-muted-foreground"> · {title}</span> : null}
        {managerEmployeeNumber ? (
          <span className="text-muted-foreground">
            · Atasan: {getEmployeeDisplay(managerEmployeeNumber)} (NIK {managerEmployeeNumber})
          </span>
        ) : (
          <span className="text-muted-foreground">· Tanpa atasan langsung (puncak hierarki contoh)</span>
        )}
      </>
    );
  }

  return (
    <div className={cn("space-y-3 text-sm", className)}>
      <div className="flex flex-wrap gap-2">
        <Badge variant="neutral">Peran aplikasi: {userRole}</Badge>
        <Badge variant="info">NIK {actingAsEmployeeNumber}</Badge>
      </div>
      <p>
        <span className="font-medium text-foreground">{getEmployeeDisplay(actingAsEmployeeNumber)}</span>
        {title ? <span className="text-muted-foreground"> · {title}</span> : null}
      </p>
      {managerEmployeeNumber ? (
        <p className="text-muted-foreground">
          Atasan: {getEmployeeDisplay(managerEmployeeNumber)} (NIK {managerEmployeeNumber})
        </p>
      ) : (
        <p className="text-muted-foreground">Tanpa atasan langsung (puncak hierarki contoh)</p>
      )}
    </div>
  );
}

export function PersonaContextBar() {
  const { resetDemoState } = usePerformanceV2();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground">Konteks sesi:</span>
        <PersonaContextDetails layout="inline" />
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => resetDemoState()}
        aria-label="Reset seluruh demo Performance 2.0 ke fixture awal"
      >
        Reset Demo Data
      </Button>
    </div>
  );
}
