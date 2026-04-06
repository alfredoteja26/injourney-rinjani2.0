import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { homeData } from "../../data/homeData";
import { Link } from "react-router";

export function JobApplicationsCard() {
  const { applications } = homeData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "submitted": return "bg-blue-100 text-blue-700 border-blue-200";
      case "screening": return "bg-purple-100 text-purple-700 border-purple-200";
      case "interview": return "bg-orange-100 text-orange-700 border-orange-200";
      case "offered": return "bg-teal-100 text-teal-700 border-teal-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (applications.length === 0) {
    return (
      <Card className="shadow-sm border-border bg-card h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">Lamaran Saya</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center space-y-4">
          <p className="text-sm text-muted-foreground">Tidak ada lamaran aktif</p>
          <Link to="/talent/explore" className="text-sm font-medium text-primary hover:underline">
            Jelajahi Lowongan
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to="/talent/my-applications" className="block h-full group">
      <Card className="shadow-sm border-border bg-card h-full group-hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            Lamaran Saya
          </CardTitle>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
             {applications.length} aktif
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
           {applications.map((app) => (
              <div key={app.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                 <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="text-sm font-bold text-foreground line-clamp-1">{app.position_title}</h4>
                    <Badge variant="outline" className={cn("text-[10px] h-5 px-1.5 shrink-0 whitespace-nowrap", getStatusColor(app.status))}>
                       {app.status_label}
                    </Badge>
                 </div>
                 <div className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {app.organization_name}
                 </div>
                 <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <Badge variant="outline" className="text-[10px] px-1 h-4 bg-background border-border text-foreground font-normal">
                       {app.movement_label}
                    </Badge>
                    <span>Submited {new Date(app.submitted_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</span>
                 </div>
              </div>
           ))}
        </CardContent>
      </Card>
    </Link>
  );
}
import { cn } from "../ui/utils";
