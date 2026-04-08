import React from 'react';
import { ShieldCheck, UserCog } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';
import { usePerformancePrototype, type PersonaRole } from '../../../lib/performance';

const personaLabels: Record<PersonaRole, string> = {
  KARYAWAN: 'Karyawan',
  ATASAN: 'Atasan Langsung',
  HC_ADMIN: 'HC Admin',
  HC_ADMIN_HO: 'HC Admin HO',
};

export function PrototypePersonaBar() {
  const { state, setPersona } = usePerformancePrototype();

  return (
    <Card className="m-6 mb-0 border-[#00858a]/20 bg-white shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-[#00858a] text-white hover:bg-[#00858a]">Prototype++</Badge>
            <span className="text-sm font-semibold text-gray-900">DIP-canonical Performance workflow</span>
            <span className="text-sm text-muted-foreground">
              Madya Struktural: {state.bandFormula.kpiBersamaWeight}% KPI Bersama / {state.bandFormula.kpiUnitWeight}% KPI Unit
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-[#00858a]" />
            <span>{state.lastMessage}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <UserCog className="h-4 w-4 text-[#00858a]" />
            Persona
          </div>
          <select
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00858a]/40"
            value={state.persona}
            onChange={(event) => setPersona(event.target.value as PersonaRole)}
          >
            {Object.entries(personaLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
