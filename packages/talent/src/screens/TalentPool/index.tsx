import { useState, useMemo } from "react";
import { Layout } from "../../components/shell/Layout";
import { Sheet } from "../../components/ui/sheet";
import { TalentProfileDetail } from "./TalentProfileDetail";
import { BandSidebar } from "./components/BandSidebar";
import { CandidateRanking } from "./components/CandidateRanking";
import { mockCandidates, mockBands } from "./mockData";
import { TalentPoolCandidate, Band } from "./types";

export function TalentPool() {
  const [selectedCompany, setSelectedCompany] = useState("InJourney Holding");
  const [selectedBand, setSelectedBand] = useState<Band>(mockBands[0]);
  const [selectedCandidate, setSelectedCandidate] = useState<TalentPoolCandidate | null>(null);

  // Filter candidates based on selected Band (using Grade for now)
  // In a real app, this logic might be more complex (e.g., showing candidates eligible FOR this band, not just IN it)
  // For this demo, we'll simulate filtering.
  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(c => {
       // Mock logic: randomly assign candidates to bands if grade is missing or match strictly
       // For demo purposes, we will treat 'grade' in candidate matching the band.name
       // If candidate has no grade, we might show them in all for now or none.
       
       // Strict matching:
       // return c.company === selectedCompany && c.grade === selectedBand.name;

       // Relaxed matching for demo data population:
       // We'll just filter by company mostly, and loosely by grade to ensure we see data.
       const companyMatch = c.company === selectedCompany;
       
       // Since mock data is limited, we might not have exact matches for every band/company combo.
       // Let's ensure we return something if company matches.
       return companyMatch;
    });
  }, [selectedCompany, selectedBand]);

  return (
    <Layout breadcrumbs={[
      { label: "Talent Management", href: "/talent" },
      { label: "Talent Pool", href: "/talent/talent-pool" }
    ]}>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Sidebar: Bands List */}
        <BandSidebar 
          bands={mockBands}
          selectedBandId={selectedBand.id}
          onSelectBand={setSelectedBand}
          selectedCompany={selectedCompany}
          onSelectCompany={setSelectedCompany}
        />

        {/* Right Content: Candidate Ranking */}
        <CandidateRanking 
          band={selectedBand}
          company={selectedCompany}
          candidates={filteredCandidates}
          onViewProfile={setSelectedCandidate}
        />

      </div>

      <Sheet open={Boolean(selectedCandidate)} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedCandidate(null);
        }
      }}>
        {selectedCandidate ? (
          <TalentProfileDetail
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
          />
        ) : null}
      </Sheet>
    </Layout>
  );
}
