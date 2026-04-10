import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@rinjani/shared-ui";
import { AuditLogContent } from "../../ui/audit-log-content";
import { PersonaContextDetails } from "../../ui/persona-context-bar";

export function MyKpiPersonaDemoDialogTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="outline" size="sm" className={className} onClick={() => setOpen(true)}>
        Detail sesi demo
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-hidden sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail sesi demo</DialogTitle>
            <DialogDescription>Persona prototipe dan log audit untuk sesi ini.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="persona" className="min-h-0 flex-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="persona">Persona</TabsTrigger>
              <TabsTrigger value="audit">Log audit</TabsTrigger>
            </TabsList>
            <TabsContent value="persona" className="mt-4 max-h-[min(60vh,24rem)] overflow-y-auto">
              <PersonaContextDetails layout="panel" />
            </TabsContent>
            <TabsContent value="audit" className="mt-4">
              <p className="mb-2 text-xs text-muted-foreground">Jejak aksi dalam sesi prototipe Performance 2.0.</p>
              <AuditLogContent maxEntries={40} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
