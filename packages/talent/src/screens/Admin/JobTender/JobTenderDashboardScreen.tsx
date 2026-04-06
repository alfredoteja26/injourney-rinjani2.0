import { useState } from "react";
import { AdminLayout } from "@/components/shell/AdminLayout";
import { PageHeader } from "@/components/job-tender/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  XCircle, 
  Users,
  Plus,
  FileCheck,
  Clock,
  Archive
} from "lucide-react";
import { useNavigate } from "react-router";

// Mock Data based on Sample Data.md
const mockPositions = [
  {
    id: "pos-001",
    title: "Senior Software Engineer",
    organization: "Human Capital Division",
    grade: 15,
    status: "open",
    applicants: 12,
    deadline: "2026-02-15",
  },
  {
    id: "pos-002",
    title: "Finance Manager",
    organization: "Finance Division",
    grade: 18,
    status: "open",
    applicants: 8,
    deadline: "2026-02-28",
  },
  {
    id: "pos-003",
    title: "HR Business Partner",
    organization: "Human Capital Division",
    grade: 16,
    status: "pending_approval",
    applicants: 0,
    deadline: "2026-03-15",
  },
  {
    id: "pos-004",
    title: "Marketing Specialist",
    organization: "Marketing Division",
    grade: 13,
    status: "draft",
    applicants: 0,
    deadline: "-",
  },
  {
    id: "pos-005",
    title: "Legal Counsel",
    organization: "Legal & Compliance Division",
    grade: 17,
    status: "closed",
    applicants: 15,
    deadline: "2026-01-10",
  }
];

const mockStats = {
  total: 12,
  open: 5,
  pending: 3,
  closed: 2
};

export function JobTenderDashboardScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
      case "closed": return "bg-slate-100 text-slate-700 hover:bg-slate-100";
      case "pending_approval": return "bg-orange-100 text-orange-700 hover:bg-orange-100";
      case "draft": return "bg-gray-100 text-gray-700 hover:bg-gray-100";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <PageHeader
          title="Job Tender Headquarters"
          subtitle="Manage internal job postings, approvals, and candidates."
          breadcrumbs={[
            { label: "Administration", href: "#" },
            { label: "Job Tender Headquarters", href: "/talent/admin/job-tender", active: true }
          ]}
          actions={
            <Button className="bg-[#ff9220] hover:bg-[#e78224] text-white gap-2">
              <Plus size={16} />
              Create Position
            </Button>
          }
        />

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Positions</p>
              <h3 className="text-2xl font-bold text-slate-800">{mockStats.total}</h3>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <FileCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Open</p>
              <h3 className="text-2xl font-bold text-slate-800">{mockStats.open}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Pending Approval</p>
              <h3 className="text-2xl font-bold text-slate-800">{mockStats.pending}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">
              <Archive size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Closed</p>
              <h3 className="text-2xl font-bold text-slate-800">{mockStats.closed}</h3>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search positions..." 
              className="pl-10 border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" className="gap-2 text-slate-600 border-slate-200 w-full md:w-auto">
              <Filter size={16} />
              Filter
            </Button>
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-700">Position Title</TableHead>
                <TableHead className="font-semibold text-slate-700">Organization</TableHead>
                <TableHead className="font-semibold text-slate-700">Grade</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700">Applicants</TableHead>
                <TableHead className="font-semibold text-slate-700">Deadline</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPositions.map((position) => (
                <TableRow key={position.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="font-medium text-slate-800">{position.title}</div>
                    <div className="text-xs text-slate-500">{position.id}</div>
                  </TableCell>
                  <TableCell className="text-slate-600">{position.organization}</TableCell>
                  <TableCell className="text-slate-600">{position.grade}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(position.status)} border-0 font-medium`}>
                      {formatStatus(position.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Users size={16} />
                      <span>{position.applicants}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{position.deadline}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Position
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" /> Manage Candidates
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <XCircle className="mr-2 h-4 w-4" /> Close Position
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
