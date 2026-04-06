import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "@/components/job-tender/PageHeader";
import { ApplicationCard } from "@/components/job-tender/ApplicationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { mockApplications } from "@/data/mockJobTenderData";

import { JobTenderNav } from "@/components/job-tender/JobTenderNav";
import { Layout } from "@/components/shell/Layout";

export default function MyApplications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const filteredApplications = mockApplications.filter(app => {
    if (activeTab === "all") return true;
    return app.status === activeTab;
  });

  const handleViewDetail = (id: string) => {
    navigate(`/my-applications/${id}`);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <JobTenderNav />
        <PageHeader 
          title="My Applications" 
          subtitle="Pantau status aplikasi pekerjaan yang telah Anda ajukan."
          actions={
            <div className="px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium text-stone-600">
              {mockApplications.length} aplikasi aktif
            </div>
          }
        />

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-stone-100 p-1 rounded-lg mb-6 w-full md:w-auto flex overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="screening">Screening</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredApplications.length > 0 ? (
              <div className="grid gap-4">
                {filteredApplications.map((app) => (
                  <ApplicationCard 
                    key={app.id} 
                    application={app} 
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FileText className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">Belum ada aplikasi</h3>
                <p className="text-stone-500 max-w-md mx-auto mb-6">
                  {activeTab === 'all' 
                    ? "Anda belum mengajukan aplikasi untuk posisi apapun saat ini."
                    : `Tidak ada aplikasi dengan status "${activeTab}".`}
                </p>
                {activeTab === 'all' && (
                  <Button 
                    className="bg-primary hover:bg-primary-hover text-white"
                    onClick={() => navigate('/explore')}
                  >
                    Explore Jobs
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
