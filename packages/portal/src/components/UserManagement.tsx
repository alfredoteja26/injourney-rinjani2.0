import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Shield, ShieldCheck, Edit, Trash2, MoreVertical, Users, ChevronDown, X, Clock, Eye, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { toast } from "sonner@2.0.3";
import { UserDetailView } from "./UserDetailView";
import { RoleManagementModal } from "./RoleManagementModal";
import { DataChangeApprovalModal } from "./DataChangeApprovalModal";

// Profile pictures array for dummy data
const PROFILE_PICTURES = [
  "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1766066014773-0074bf4911de?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1629507208649-70919ca33793?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1758876204244-930299843f07?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=150&h=150&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1767620275245-70721d786653?w=150&h=150&fit=crop&crop=faces",
];

const getProfilePicture = (index: number) => {
  return PROFILE_PICTURES[index % PROFILE_PICTURES.length];
};

// Mock data for employees with pending requests
const MOCK_EMPLOYEES = [
  {
    id: "EMP-INJ-0000000001",
    name: "Raka Pradana Putra",
    email: "raka.putra@injourney.co.id",
    role: "Admin",
    department: "Technology",
    position: "Senior Software Engineer",
    status: "active",
    pendingRequests: 2,
    lastLogin: "2024-12-25",
    phone: "+6281212345678",
    location: "Jakarta Selatan"
  },
  {
    id: "EMP-INJ-0000000002",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@injourney.co.id",
    role: "User",
    department: "Human Resources",
    position: "HR Manager",
    status: "active",
    pendingRequests: 0,
    lastLogin: "2024-12-24",
    phone: "+6281298765432",
    location: "Jakarta Pusat"
  },
  {
    id: "EMP-INJ-0000000003",
    name: "Budi Santoso",
    email: "budi.santoso@injourney.co.id",
    role: "User",
    department: "Finance",
    position: "Finance Analyst",
    status: "active",
    pendingRequests: 1,
    lastLogin: "2024-12-26",
    phone: "+6281234567890",
    location: "Jakarta Barat"
  },
  {
    id: "EMP-INJ-0000000004",
    name: "Dewi Lestari",
    email: "dewi.lestari@injourney.co.id",
    role: "User",
    department: "Marketing",
    position: "Marketing Executive",
    status: "active",
    pendingRequests: 3,
    lastLogin: "2024-12-23",
    phone: "+6281256789012",
    location: "Tangerang"
  },
  {
    id: "EMP-INJ-0000000005",
    name: "Ahmad Rizki",
    email: "ahmad.rizki@injourney.co.id",
    role: "Admin",
    department: "Operations",
    position: "Operations Manager",
    status: "active",
    pendingRequests: 0,
    lastLogin: "2024-12-26",
    phone: "+6281267890123",
    location: "Jakarta Timur"
  },
];

// Mock pending change requests
const MOCK_PENDING_REQUESTS = [
  {
    id: "REQ-001",
    employeeId: "EMP-INJ-0000000001",
    employeeName: "Raka Pradana Putra",
    fieldName: "Alamat Tetap",
    oldValue: "Apartemen Cempaka Residence Tower B, Unit 15C",
    newValue: "Apartemen Green Ville Tower A, Unit 20B",
    requestDate: "2024-12-24",
    tier: 2,
    supportingDocs: ["KTP_baru.pdf", "Surat_domisili.pdf"],
    reason: "Pindah alamat tempat tinggal"
  },
  {
    id: "REQ-002",
    employeeId: "EMP-INJ-0000000001",
    employeeName: "Raka Pradana Putra",
    fieldName: "Status Pernikahan",
    oldValue: "Single",
    newValue: "Married",
    requestDate: "2024-12-23",
    tier: 2,
    supportingDocs: ["Akta_nikah.pdf"],
    reason: "Perubahan status pernikahan"
  },
  {
    id: "REQ-003",
    employeeId: "EMP-INJ-0000000003",
    employeeName: "Budi Santoso",
    fieldName: "NPWP",
    oldValue: "12.345.678.9-012.000",
    newValue: "98.765.432.1-098.000",
    requestDate: "2024-12-25",
    tier: 2,
    supportingDocs: ["NPWP_baru.pdf"],
    reason: "Update nomor NPWP"
  },
  {
    id: "REQ-004",
    employeeId: "EMP-INJ-0000000004",
    employeeName: "Dewi Lestari",
    fieldName: "Kontak Darurat",
    oldValue: "Ibu Siti - 08123456789",
    newValue: "Suami - 08198765432",
    requestDate: "2024-12-22",
    tier: 2,
    supportingDocs: ["KK_baru.pdf"],
    reason: "Update kontak darurat setelah menikah"
  },
  {
    id: "REQ-005",
    employeeId: "EMP-INJ-0000000004",
    employeeName: "Dewi Lestari",
    fieldName: "Nama Lengkap",
    oldValue: "Dewi Lestari",
    newValue: "Dewi Lestari Wijaya",
    requestDate: "2024-12-21",
    tier: 2,
    supportingDocs: ["KTP_baru.pdf", "Akta_nikah.pdf"],
    reason: "Perubahan nama setelah menikah"
  },
  {
    id: "REQ-006",
    employeeId: "EMP-INJ-0000000004",
    employeeName: "Dewi Lestari",
    fieldName: "Alamat KTP",
    oldValue: "Jl. Sudirman No. 45, Jakarta",
    newValue: "Jl. Thamrin No. 12, Jakarta",
    requestDate: "2024-12-20",
    tier: 2,
    supportingDocs: ["KTP_baru.pdf"],
    reason: "Update sesuai KTP terbaru"
  },
];

interface UserManagementProps {
  onBack: () => void;
}

export default function UserManagement({ onBack }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "Admin" | "User">("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_EMPLOYEES[0] | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof MOCK_PENDING_REQUESTS[0] | null>(null);
  const [currentView, setCurrentView] = useState<"users" | "requests">("users");

  // Filter employees based on search and filters
  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || emp.role === filterRole;
    const matchesDept = filterDepartment === "all" || emp.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesDept;
  });

  // Get unique departments for filter
  const departments = ["all", ...Array.from(new Set(MOCK_EMPLOYEES.map(e => e.department)))];

  // Get pending requests count
  const totalPendingRequests = MOCK_PENDING_REQUESTS.length;

  const handleChangeRole = (employee: typeof MOCK_EMPLOYEES[0]) => {
    setSelectedEmployee(employee);
    setShowRoleModal(true);
  };

  const handleViewProfile = (employee: typeof MOCK_EMPLOYEES[0]) => {
    setSelectedEmployee(employee);
    setShowUserDetail(true);
  };

  const handleReviewRequest = (request: typeof MOCK_PENDING_REQUESTS[0]) => {
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };

  const handleApproveRequest = (requestId: string, comments: string) => {
    toast.success(`Request ${requestId} has been approved`);
    setShowApprovalModal(false);
    setSelectedRequest(null);
  };

  const handleRejectRequest = (requestId: string, comments: string) => {
    toast.error(`Request ${requestId} has been rejected`);
    setShowApprovalModal(false);
    setSelectedRequest(null);
  };

  const getRoleBadgeColor = (role: string) => {
    return role === "Admin" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border";
  };

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case "active":
        return "bg-chart-2/10 text-chart-1 border-chart-2/20";
      case "inactive":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  if (showUserDetail && selectedEmployee) {
    return (
      <UserDetailView 
        employee={selectedEmployee}
        onBack={() => {
          setShowUserDetail(false);
          setSelectedEmployee(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-0">
      {/* Tab Navigation for Users vs Requests with button style */}
      <div className="p-6 bg-card border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentView("users")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all caption"
            style={{
              backgroundColor: currentView === "users" ? "var(--primary)" : "var(--muted)",
              color: currentView === "users" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              fontWeight: currentView === "users" ? "var(--font-weight-semibold)" : "var(--font-weight-normal)"
            }}
          >
            <Users className="w-4 h-4" />
            Users ({MOCK_EMPLOYEES.length})
          </button>
          <button
            onClick={() => setCurrentView("requests")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all caption relative"
            style={{
              backgroundColor: currentView === "requests" ? "var(--primary)" : "var(--muted)",
              color: currentView === "requests" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              fontWeight: currentView === "requests" ? "var(--font-weight-semibold)" : "var(--font-weight-normal)"
            }}
          >
            <Clock className="w-4 h-4" />
            Pending Requests ({totalPendingRequests})
            {totalPendingRequests > 0 && (
              <span 
                className="ml-1 w-5 h-5 rounded-full caption flex items-center justify-center" 
                style={{ 
                  fontSize: 'var(--text-xs)',
                  backgroundColor: currentView === "requests" ? "rgba(255, 255, 255, 0.2)" : "var(--destructive)",
                  color: currentView === "requests" ? "var(--primary-foreground)" : "white"
                }}
              >
                {totalPendingRequests}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content - Remove p-8, add space-y-6 (24px spacing) */}
      <div className="p-6 bg-card space-y-6">
        {currentView === "users" ? (
          <>
            {/* Search and Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or employee ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Role: {filterRole === "all" ? "All" : filterRole}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterRole("all")}>
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("Admin")}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("User")}>
                    User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Dept: {filterDepartment === "all" ? "All" : filterDepartment}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {departments.map(dept => (
                    <DropdownMenuItem 
                      key={dept}
                      onClick={() => setFilterDepartment(dept)}
                    >
                      {dept === "all" ? "All Departments" : dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Users Table */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pending Requests</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee, index) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-muted">
                            <img 
                              src={getProfilePicture(index)} 
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                              {employee.name}
                            </div>
                            <div className="caption text-muted-foreground">
                              {employee.email}
                            </div>
                            <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              {employee.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(employee.role)}>
                          {employee.role === "Admin" ? (
                            <ShieldCheck className="w-3 h-3 mr-1" />
                          ) : (
                            <Shield className="w-3 h-3 mr-1" />
                          )}
                          {employee.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="caption">{employee.department}</span>
                        <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          {employee.position}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {employee.pendingRequests > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-destructive-foreground/10 flex items-center justify-center">
                              <span className="caption text-destructive-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                {employee.pendingRequests}
                              </span>
                            </div>
                            <span className="caption text-destructive-foreground">
                              {employee.pendingRequests} pending
                            </span>
                          </div>
                        ) : (
                          <span className="caption text-muted-foreground">No requests</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="caption text-muted-foreground">{employee.lastLogin}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProfile(employee)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleChangeRole(employee)}>
                              <ShieldCheck className="w-4 h-4 mr-2" />
                              Change Role
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <>
            {/* Pending Requests View */}
            <div className="space-y-4">
              {MOCK_PENDING_REQUESTS.map((request, index) => (
                <div 
                  key={request.id}
                  className="border border-border rounded-lg p-6 bg-card hover:shadow-elevation-sm transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-muted">
                          <img 
                            src={getProfilePicture(index)} 
                            alt={request.employeeName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            {request.employeeName}
                          </div>
                          <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            {request.employeeId}
                          </div>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          Tier {request.tier}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                            Field Name
                          </div>
                          <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            {request.fieldName}
                          </div>
                        </div>
                        <div>
                          <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                            Request Date
                          </div>
                          <div className="caption">
                            {request.requestDate}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                            Current Value
                          </div>
                          <div className="caption bg-muted/50 p-2 rounded border border-border">
                            {request.oldValue}
                          </div>
                        </div>
                        <div>
                          <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                            Requested Value
                          </div>
                          <div className="caption bg-primary/5 p-2 rounded border border-primary/20" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            {request.newValue}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                          Reason
                        </div>
                        <div className="caption">
                          {request.reason}
                        </div>
                      </div>

                      <div>
                        <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                          Supporting Documents ({request.supportingDocs.length})
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {request.supportingDocs.map((doc, idx) => (
                            <Badge key={idx} variant="outline" className="gap-1">
                              📄 {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6">
                      <Button
                        onClick={() => handleReviewRequest(request)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {MOCK_PENDING_REQUESTS.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">No Pending Requests</h3>
                  <p className="caption text-muted-foreground">
                    All data change requests have been processed
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {showRoleModal && selectedEmployee && (
        <RoleManagementModal
          employee={selectedEmployee}
          isOpen={showRoleModal}
          onClose={() => {
            setShowRoleModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}

      {showApprovalModal && selectedRequest && (
        <DataChangeApprovalModal
          request={selectedRequest}
          isOpen={showApprovalModal}
          onClose={() => {
            setShowApprovalModal(false);
            setSelectedRequest(null);
          }}
          onApprove={handleApproveRequest}
          onReject={handleRejectRequest}
        />
      )}
    </div>
  );
}