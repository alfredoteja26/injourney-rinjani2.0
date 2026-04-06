import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { homeData } from "../../data/homeData";

export function CareerStatusCard() {
  const { currentUser } = homeData;

  // Calculate tenure roughly
  const effectiveDate = new Date(currentUser.position_effective_date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - effectiveDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);

  const tenureString = `${years} tahun ${months} bulan`;

  return (
    <Card className="shadow-sm border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Status Karir</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground leading-tight mb-1">
              {currentUser.current_position_title || "Data posisi belum tersedia"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentUser.organization_name || "—"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 bg-background text-foreground border-border">
              Band {currentUser.band_jabatan}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-background text-foreground border-border">
              Grade {currentUser.grade_jabatan}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Masa kerja: <span className="font-medium text-foreground">{tenureString}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
