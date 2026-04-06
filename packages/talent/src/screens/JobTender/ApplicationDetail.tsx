import { useParams, useNavigate } from "react-router";
import { PageHeader } from "@/components/job-tender/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/job-tender/StatusBadge";
import { mockApplications, mockPositions, mockTimelines } from "@/data/mockJobTenderData";
import { Building2, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Layout } from "@/components/shell/Layout";

export default function ApplicationDetail() {
  const { id: applicationId } = useParams();
  const navigate = useNavigate();
  
  const application = mockApplications.find(a => a.id === applicationId);
  const timelines = mockTimelines.filter(t => t.applicationId === applicationId).sort((a, b) => 
    new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime()
  );
  
  // Get extra position details (mock)
  const position = mockPositions.find(p => p.id === application?.positionId);

  if (!application) {
    return (
      <Layout>
        <div>Application not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-stone-500 hover:text-primary pl-0 hover:bg-transparent"
            onClick={() => navigate('/my-applications')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Applications
          </Button>
        </div>

        <div className="space-y-6">
          {/* Header Card */}
          <Card className="border-stone-200 shadow-sm overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className="mb-4">
                    <StatusBadge status={application.status} type="application" className="px-3 py-1 text-sm" />
                  </div>
                  <h1 className="text-2xl font-bold text-stone-900 mb-2">{application.positionTitle}</h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-stone-600 text-sm mb-4">
                    <span className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1.5 text-stone-400" />
                      Human Capital Division
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5 text-stone-400" />
                      Jakarta
                    </span>
                    {position && (
                      <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 text-xs font-medium">
                        Grade {position.gradeJabatan}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right md:text-left flex flex-col justify-between">
                  <div className="text-sm text-stone-500">
                    <span className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-1">Applied On</span>
                    <div className="flex items-center gap-1.5 font-medium text-stone-700">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(application.submittedAt), "d MMMM yyyy, HH:mm", { locale: id })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Section */}
          <Card className="border-stone-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-stone-900">Application Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative pl-4">
                {/* Vertical Line */}
                <div className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-stone-200" />
                
                <div className="space-y-8">
                  {timelines.map((item, index) => (
                    <div key={item.id} className="relative flex gap-6">
                      {/* Dot */}
                      <div className={`z-10 w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${index === 0 ? 'bg-primary ring-4 ring-primary/20' : 'bg-stone-300'}`} />
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4 mb-1">
                          <span className={`font-semibold ${index === 0 ? 'text-primary' : 'text-stone-900'}`}>
                            {item.toStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <span className="text-xs text-stone-400 font-medium">
                            {format(new Date(item.changedAt), "d MMM yyyy, HH:mm", { locale: id })}
                          </span>
                        </div>
                        <p className="text-sm text-stone-600 mb-1">
                          {item.notes || "Status updated"}
                        </p>
                        <p className="text-xs text-stone-400">
                          by {item.changedByName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-50 hover:text-red-600 hover:border-red-200"
              disabled={['rejected', 'withdrawn', 'accepted'].includes(application.status)}
            >
              Withdraw Application
            </Button>
            <Button 
              className="flex-1 bg-white border border-primary text-primary hover:bg-primary-50"
              onClick={() => navigate(`/explore/${application.positionId}`)}
            >
              View Position Details
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
