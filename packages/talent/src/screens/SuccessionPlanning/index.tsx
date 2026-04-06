import { useState } from "react";
import { Layout } from "../../components/shell/Layout";
import { SuccessionBoard } from "./SuccessionBoard";
import { PositionDetail } from "./PositionDetail";
import { ProfileMatchUp } from "./ProfileMatchUp";
import { TCVoting } from "./TCVoting";
import { BeritaAcara } from "./BeritaAcara";
import { EmployeeSuccessionView } from "./EmployeeSuccessionView";
import { mockPositions, mockCandidates } from "./mockData";
import { Position, Candidate } from "./types";
import { Button } from "../../components/ui/button";
import { User } from "lucide-react";

export function SuccessionPlanning() {
  const [currentView, setCurrentView] = useState<"board" | "detail" | "voting" | "berita_acara" | "employee">("board");
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showMatchUp, setShowMatchUp] = useState(false);
  const [compareCandidates, setCompareCandidates] = useState<Candidate[]>([]);

  // Navigation Handlers
  const handleSelectPosition = (position: Position) => {
    setSelectedPosition(position);
    setCurrentView("detail");
  };

  const handleBackToBoard = () => {
    setCurrentView("board");
    setSelectedPosition(null);
  };

  const handleSubmitShortlist = (rankings: any) => {
    console.log("Submitting rankings", rankings);
    setCurrentView("voting");
  };

  const handleCompare = (candidates: Candidate[]) => {
    setCompareCandidates(candidates.length > 0 ? candidates : mockCandidates); 
    setShowMatchUp(true);
  };

  const handleVoteSubmit = (vote: string, comment: string) => {
    console.log("Vote submitted", vote, comment);
    setCurrentView("berita_acara");
  };

  return (
    <Layout breadcrumbs={[
      { label: "Talent Management", href: "/talent" },
      { label: "Succession Planning", href: "/talent/succession-planning" }
    ]}>
      
      {/* View Switcher for Demo Purposes */}
      <div className="fixed bottom-4 left-20 z-50">
         <Button 
            variant="secondary" 
            size="sm" 
            className="shadow-lg bg-slate-800 text-white hover:bg-slate-700 gap-2"
            onClick={() => setCurrentView(currentView === "employee" ? "board" : "employee")}
         >
           <User className="w-4 h-4" />
           {currentView === "employee" ? "Switch to Admin View" : "Switch to Employee View"}
         </Button>
      </div>

      <div className="h-[calc(100vh-64px)] overflow-hidden">
        {currentView === "board" && (
          <SuccessionBoard 
            positions={mockPositions} 
            onSelectPosition={handleSelectPosition} 
          />
        )}

        {currentView === "detail" && selectedPosition && (
          <PositionDetail 
            position={selectedPosition}
            candidates={mockCandidates} 
            onBack={handleBackToBoard}
            onSubmit={handleSubmitShortlist}
            onCompare={handleCompare}
          />
        )}

        {currentView === "voting" && selectedPosition && (
          <TCVoting 
            position={selectedPosition}
            candidate={mockCandidates[0]} 
            onBack={() => setCurrentView("detail")}
            onSubmit={handleVoteSubmit}
          />
        )}

        {currentView === "berita_acara" && selectedPosition && (
          <BeritaAcara 
            position={selectedPosition}
            onBack={() => setCurrentView("voting")}
            onComplete={handleBackToBoard}
          />
        )}

        {currentView === "employee" && (
          <EmployeeSuccessionView />
        )}

        {/* Modal Overlay for MatchUp */}
        {showMatchUp && selectedPosition && (
          <ProfileMatchUp 
            candidates={compareCandidates} 
            position={selectedPosition}
            onClose={() => setShowMatchUp(false)}
          />
        )}
      </div>
    </Layout>
  );
}
