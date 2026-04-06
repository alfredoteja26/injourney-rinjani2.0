import { useParams, useNavigate } from "react-router";
import { PageHeader } from "@/components/job-tender/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/job-tender/StatusBadge";
import { mockPositions } from "@/data/mockJobTenderData";
import { Building2, MapPin, Clock, Info, CheckCircle2, Bookmark, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Layout } from "@/components/shell/Layout";

export default function JobDetail() {
  const { id: positionId } = useParams();
  const navigate = useNavigate();
  
  // Mock data fetch
  const position = mockPositions.find(p => p.id === positionId);

  if (!position) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-semibold text-stone-900">Posisi tidak ditemukan</h2>
          <Button variant="link" onClick={() => navigate('/explore')} className="mt-2 text-primary">
            ← Kembali ke Explore Job
          </Button>
        </div>
      </Layout>
    );
  }

  const timeLeft = formatDistanceToNow(new Date(position.deadline), { addSuffix: true, locale: id });
  
  // Mock eligibility check
  const isEligible = true;

  return (
    <Layout>
      <div className="min-h-screen bg-stone-50/50 pb-20">
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Button 
              variant="ghost" 
              className="text-stone-500 hover:text-primary mb-4 -ml-2 h-auto py-1 px-2"
              onClick={() => navigate('/explore')}
            >
              ← Back to Explore
            </Button>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <StatusBadge status={position.status} />
                  <span className="text-sm text-stone-500 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    Deadline: {new Date(position.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">{position.title}</h1>
                <div className="text-lg text-stone-600 flex flex-wrap items-center gap-x-2">
                  <span className="font-medium text-stone-800">{position.organizationName}</span>
                  <span className="text-stone-300">•</span>
                  <span>{position.company}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-stone-200 text-stone-500">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-stone-200 text-stone-500 hover:text-primary">
                  <Bookmark className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-stone-100 text-sm font-medium text-stone-700">
                <MapPin className="w-4 h-4 mr-2 text-stone-500" />
                {position.location}
              </div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-stone-100 text-sm font-medium text-stone-700">
                <Info className="w-4 h-4 mr-2 text-stone-500" />
                Grade {position.gradeJabatan}
              </div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-stone-100 text-sm font-medium text-stone-700">
                <UsersIcon className="w-4 h-4 mr-2 text-stone-500" />
                {position.bandJabatan}
              </div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-orange-50 text-sm font-medium text-orange-700 border border-orange-100">
                <Clock className="w-4 h-4 mr-2" />
                Berakhir {timeLeft}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Job Description</h3>
              <div className="prose prose-stone max-w-none text-stone-600">
                <p>{position.description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Requirements</h3>
              <ul className="space-y-3 text-stone-600">
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-stone-400 rounded-full flex-shrink-0" />
                  <span>Minimal Grade Jabatan {position.gradeJabatan - 1} (maksimal Grade {position.gradeJabatan + 2})</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-stone-400 rounded-full flex-shrink-0" />
                  <span>Pengalaman minimal 2 tahun di bidang {position.jobFamilyName}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-stone-400 rounded-full flex-shrink-0" />
                  <span>Memiliki rating kinerja minimal "Baik" dalam 2 tahun terakhir</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-stone-400 rounded-full flex-shrink-0" />
                  <span>Tidak sedang menjalani hukuman disiplin tingkat sedang atau berat</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200 shadow-none">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-1">Anda eligible untuk posisi ini</h3>
                  <p className="text-green-700 text-sm mb-3">
                    Profil Anda memenuhi persyaratan dasar untuk melamar posisi ini.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-green-800">
                      <CheckCircle2 className="w-4 h-4 mr-2 opacity-60" />
                      Grade Jabatan Match
                    </div>
                    <div className="flex items-center text-green-800">
                      <CheckCircle2 className="w-4 h-4 mr-2 opacity-60" />
                      Job Family Match
                    </div>
                    <div className="flex items-center text-green-800">
                      <CheckCircle2 className="w-4 h-4 mr-2 opacity-60" />
                      Disciplinary Check Pass
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 shadow-lg z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="hidden md:flex items-center text-stone-600 text-sm">
              <UsersIcon className="w-4 h-4 mr-2 text-stone-400" />
              <span className="font-semibold text-stone-900 mr-1">{position.applicantCount}</span> pelamar saat ini
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" size="lg" className="flex-1 md:flex-none border-stone-300">
                Save Job
              </Button>
              <Button size="lg" className="flex-1 md:flex-none bg-primary hover:bg-primary-hover text-white px-8">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Simple icon component for layout
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
