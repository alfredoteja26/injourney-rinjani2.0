import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rinjani/shared-ui";
import { AuditLogContent } from "./audit-log-content";

/** Kartu inline (opsional); untuk hub portofolio gunakan log lewat dialog Detail sesi demo. */
export function AuditLogPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Log audit (demo)</CardTitle>
        <CardDescription>Jejak aksi dalam sesi prototipe Performance 2.0.</CardDescription>
      </CardHeader>
      <CardContent>
        <AuditLogContent maxEntries={12} />
      </CardContent>
    </Card>
  );
}
