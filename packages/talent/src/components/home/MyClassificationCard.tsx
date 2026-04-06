import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { cn } from "../ui/utils";
import { homeData } from "../../data/homeData";
import { Link } from "react-router";

export function MyClassificationCard() {
  const { eqsScores, talentPoolCandidate } = homeData;

  const getClusterLabel = (cluster: string) => {
    switch (cluster) {
      case "9box_promotable": return "Promotable";
      case "9box_high_potential": return "High Potential";
      case "9box_solid_contributor": return "Solid Contributor";
      case "9box_sleeping_tiger": return "Sleeping Tiger";
      case "9box_unfit": return "Unfit";
      default: return "Belum Diklasifikasi";
    }
  };

  const getEqsBandColor = (band: string) => {
    switch (band) {
      case "highly_qualified": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "qualified": return "bg-blue-50 text-blue-700 border-blue-200";
      case "needs_development": return "bg-amber-50 text-amber-700 border-amber-200";
      case "not_recommended": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const Mini9Box = ({ cluster }: { cluster: string }) => {
    // 3x3 grid mapping
    // Unfit (1,1) -> Sleeping Tiger (1,3) -> Sleeping Tiger (3,1) etc.
    // Simplifying for visual representation based on logic:
    // 3,3: High Potential
    // 3,2 / 2,3: Promotable
    // 2,2: Solid Contributor
    // ...
    
    // Just a visual representation, logic can be refined
    const activeCell = 
        cluster === "9box_high_potential" ? 8 : // top-right
        cluster === "9box_promotable" ? 5 : // mid-right or top-mid
        cluster === "9box_solid_contributor" ? 4 : // center
        cluster === "9box_sleeping_tiger" ? 1 : // mid-left or bot-mid
        cluster === "9box_unfit" ? 0 : -1; // bot-left

    return (
      <div className="grid grid-cols-3 gap-0.5 w-12 h-12 bg-muted/50 p-0.5 rounded border border-border">
        {Array.from({ length: 9 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "rounded-[1px] transition-colors",
              i === activeCell ? "bg-primary" : "bg-muted-foreground/20"
            )}
          />
        ))}
      </div>
    );
  };

  if (!eqsScores) {
    return (
      <Card className="shadow-sm border-border bg-card h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">Klasifikasi Talent</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Klasifikasi talent belum tersedia untuk periode ini</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to="/talent/talent-mapping" className="block h-full group">
      <Card className="shadow-sm border-border bg-card h-full group-hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            Klasifikasi Talent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 9-Box Section */}
          <div className="flex items-center gap-4">
            <Mini9Box cluster={talentPoolCandidate.talent_cluster} />
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">9-Box Grid</div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {getClusterLabel(talentPoolCandidate.talent_cluster)}
              </Badge>
              <p className="text-[10px] text-muted-foreground mt-1">
                {talentPoolCandidate.period_name}
              </p>
            </div>
          </div>

          <div className="h-px bg-border w-full" />

          {/* EQS Section */}
          <div>
            <div className="flex items-end justify-between mb-2">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">EQS Score</div>
                <div className="text-2xl font-bold text-foreground">{eqsScores.total_score}</div>
              </div>
              <Badge variant="outline" className={cn("mb-1", getEqsBandColor(eqsScores.eqs_band))}>
                {eqsScores.eqs_band.replace("_", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="space-y-3 mt-4">
              {eqsScores.components.map((comp) => (
                <div key={comp.component_type} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{comp.label} <span className="text-[10px] opacity-70">({comp.weight}%)</span></span>
                    <span className="font-medium text-foreground">{comp.weighted_value.toFixed(2)}</span>
                  </div>
                  <Progress 
                    value={(comp.weighted_value / comp.weight) * 100} 
                    className="h-1.5 bg-muted" 
                    indicatorClassName={cn(
                      comp.component_type === "tes" ? "bg-purple-500" :
                      comp.component_type === "performance" ? "bg-emerald-500" :
                      "bg-primary"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
