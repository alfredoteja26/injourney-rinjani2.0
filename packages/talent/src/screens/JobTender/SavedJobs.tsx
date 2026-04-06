import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "@/components/job-tender/PageHeader";
import { PositionCard } from "@/components/job-tender/PositionCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bookmark } from "lucide-react";
import { mockSavedJobs, mockPositions } from "@/data/mockJobTenderData";
import { Layout } from "@/components/shell/Layout";

import { JobTenderNav } from "@/components/job-tender/JobTenderNav";

export default function SavedJobs() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("deadline");

  // Enrich saved jobs with position data
  const savedJobsList = mockSavedJobs.map(saved => {
    const position = mockPositions.find(p => p.id === saved.positionId);
    return { ...saved, position };
  }).filter(item => item.position); // Filter out any broken links

  // Sort
  const sortedJobs = [...savedJobsList].sort((a, b) => {
    if (sortBy === "deadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    } else {
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    }
  });

  const handleApply = (id: string) => {
    navigate(`/explore/${id}`);
  };

  const handleViewDetail = (id: string) => {
    navigate(`/explore/${id}`);
  };

  const handleRemove = (id: string) => {
    console.log("Remove saved job", id);
    // In real app, call API
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <JobTenderNav />
        <PageHeader 
          title="Saved Jobs" 
          subtitle="Daftar posisi yang Anda simpan untuk dilamar nanti."
          actions={
            <div className="px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium text-stone-600">
              {savedJobsList.length} posisi tersimpan
            </div>
          }
        />

        <div className="space-y-6">
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-500">Urutkan:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] h-9 border-stone-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Batas Waktu (Terdekat)</SelectItem>
                  <SelectItem value="savedDate">Tanggal Simpan (Terbaru)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {sortedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedJobs.map((item) => (
                <PositionCard 
                  key={item.id} 
                  position={item.position!} 
                  isSaved={true}
                  onSave={() => handleRemove(item.positionId)} // Toggle save essentially removes it here
                  onApply={handleApply}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-stone-50 rounded-xl border border-dashed border-stone-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Bookmark className="w-8 h-8 text-stone-300" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Belum ada posisi tersimpan</h3>
              <p className="text-stone-500 max-w-md mx-auto mb-6">
                Simpan posisi yang menarik saat Anda menjelajahi lowongan untuk melamar nanti.
              </p>
              <Button 
                className="bg-primary hover:bg-primary-hover text-white"
                onClick={() => navigate('/explore')}
              >
                Explore Jobs
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
