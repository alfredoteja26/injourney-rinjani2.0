import { useState } from "react";
import { 
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  Briefcase
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Layout } from "../../components/shell/Layout";
import { cn } from "../../components/ui/utils";

interface SuccessionStatus {
  positionTitle: string;
  division: string;
  status: "approved" | "pending";
  ranking: "primary" | "secondary" | "tertiary";
  date?: string;
}

const mockEmployeeStatus: SuccessionStatus[] = [
  {
    positionTitle: "VP Finance",
    division: "Finance Division",
    status: "approved",
    ranking: "primary",
    date: "15 Jan 2026"
  },
  {
    positionTitle: "Director SDM",
    division: "Human Capital Division",
    status: "pending",
    ranking: "secondary"
  }
];

export function EmployeeSuccessionView() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col h-full bg-neutral-50 p-6">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-800">My Succession Status</h1>
          <p className="text-slate-500">Positions where you have been selected as a potential successor</p>
        </div>

        {mockEmployeeStatus.length > 0 ? (
          <div className="space-y-4">
             {mockEmployeeStatus.map((item, idx) => (
               <Card key={idx} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex flex-col sm:flex-row">
                   <div className={cn(
                     "w-full sm:w-2 shrink-0",
                     item.ranking === "primary" ? "bg-green-500" :
                     item.ranking === "secondary" ? "bg-blue-500" : "bg-amber-500"
                   )} />
                   
                   <CardContent className="flex-1 p-6 flex items-start justify-between gap-4">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <h3 className="font-bold text-lg text-slate-800">{item.positionTitle}</h3>
                         <Badge variant="outline" className={cn(
                           "border-0",
                           item.status === "approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                         )}>
                           {item.status === "approved" ? "Approved by TC" : "Pending Review"}
                         </Badge>
                       </div>
                       <p className="text-slate-500 flex items-center gap-2">
                         <Briefcase className="w-4 h-4" />
                         {item.division}
                       </p>
                     </div>

                     <div className="text-right">
                       <Badge className={cn(
                         "mb-2",
                         item.ranking === "primary" ? "bg-green-500 hover:bg-green-600" :
                         item.ranking === "secondary" ? "bg-blue-500 hover:bg-blue-600" : "bg-amber-500 hover:bg-amber-600"
                       )}>
                         {item.ranking.charAt(0).toUpperCase() + item.ranking.slice(1)} Successor
                       </Badge>
                       {item.date && (
                         <p className="text-xs text-slate-400 flex items-center justify-end gap-1">
                           <CheckCircle2 className="w-3 h-3" />
                           Since {item.date}
                         </p>
                       )}
                       {!item.date && (
                         <p className="text-xs text-slate-400 flex items-center justify-end gap-1">
                           <Clock className="w-3 h-3" />
                           In Process
                         </p>
                       )}
                     </div>
                   </CardContent>
                 </div>
               </Card>
             ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No Active Succession Plans</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              You are not currently listed as a successor for any positions. Continue developing your skills and expressing your career aspirations.
            </p>
            <Button variant="outline" className="mt-6">
              View Career Development
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
