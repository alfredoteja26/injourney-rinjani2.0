import { useState } from "react";
import { 
  ChevronLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Shield,
  ShieldCheck,
  Clock,
  FileText,
  Edit,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MOCK_DATA } from "../lib/mock-data";

interface UserDetailViewProps {
  employee: {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    position: string;
    status: string;
    pendingRequests: number;
    lastLogin: string;
    phone: string;
    location: string;
  };
  onBack: () => void;
}

export function UserDetailView({ employee, onBack }: UserDetailViewProps) {
  const [activeTab, setActiveTab] = useState("personal");

  // Mock data - in real app, this would be fetched based on employee.id
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const getAddress = (type: string) => {
    const addr = MOCK_DATA.employee_address.find(a => a.address_type === type);
    if (!addr) return "-";
    return `${addr.street_address}, ${addr.district}, ${addr.city}, ${addr.province} ${addr.postal_code}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to User Management
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              
              {/* Basic Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2>{employee.name}</h2>
                  <Badge className={employee.role === "Admin" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border"}>
                    {employee.role === "Admin" ? (
                      <ShieldCheck className="w-3 h-3 mr-1" />
                    ) : (
                      <Shield className="w-3 h-3 mr-1" />
                    )}
                    {employee.role}
                  </Badge>
                  <Badge className="bg-chart-2/10 text-chart-1 border-chart-2/20">
                    {employee.status}
                  </Badge>
                </div>
                
                <div className="caption text-muted-foreground mb-4">
                  {employee.id}
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Position
                      </div>
                      <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {employee.position}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Department
                      </div>
                      <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {employee.department}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Email
                      </div>
                      <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {employee.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Phone
                      </div>
                      <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {employee.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Location
                      </div>
                      <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {employee.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="caption text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Last Login
                      </div>
                      <div className="caption" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                        {employee.lastLogin}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {employee.pendingRequests > 0 && (
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Review Requests ({employee.pendingRequests})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests Alert */}
      {employee.pendingRequests > 0 && (
        <div className="px-8 pt-6">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="caption mb-1" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {employee.pendingRequests} Pending Data Change Request{employee.pendingRequests > 1 ? 's' : ''}
                </div>
                <p className="caption text-muted-foreground">
                  This employee has {employee.pendingRequests} pending data change request{employee.pendingRequests > 1 ? 's' : ''} waiting for admin approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Details */}
      <div className="px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="employment">Employment Details</TabsTrigger>
            <TabsTrigger value="contact">Contact & Address</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            {/* Personal Data Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Personal Data</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Full Name
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_profile.full_name}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Nickname
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_profile.name_alias || "-"}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    NIK
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.id_nik}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Birth Place & Date
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.birth_place}, {formatDate(MOCK_DATA.employee_identification.dt_birth)}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Gender
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.gender === "unknown" ? "Not Specified" : MOCK_DATA.employee_identification.gender}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Religion
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.religion}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Blood Type
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.blood_type.replace("_", " ").toUpperCase()}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Ethnicity
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.ethnicity || "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* Tax & Insurance Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Tax & Insurance Information</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    NPWP
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.id_npwp}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Tax Classification (PPh21)
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.tax_classification_pph21}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    BPJS Ketenagakerjaan
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.id_bpjs_tk}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    BPJS Kesehatan
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.id_bpjs_kes}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employment" className="space-y-6">
            {/* Employment Status */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Employment Status</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Employee ID
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_profile.id_employee}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Employment Type
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.employment_type.toUpperCase()}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Job Class
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.job_class}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Start Date
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {formatDate(MOCK_DATA.employee_identification.dt_start_work)}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Appointed as Employee
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {formatDate(MOCK_DATA.employee_identification.dt_appointed_employee)}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Grade Start Date
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {formatDate(MOCK_DATA.employee_identification.dt_grade_start)}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Retirement Date
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {formatDate(MOCK_DATA.employee_identification.dt_retirement)}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Employment Status
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_profile.employment_status.charAt(0).toUpperCase() + MOCK_DATA.employee_profile.employment_status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            {/* Contact Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Corporate Email
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.corporate_email}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Private Email
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.private_email}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Mobile Phone
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.mobile_phone}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Home Phone
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {MOCK_DATA.employee_identification.home_phone || "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Address Information</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                    Alamat KTP
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {getAddress("alamat_ktp")}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                    Alamat Tetap
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {getAddress("alamat_tetap")}
                  </div>
                </div>

                <div>
                  <div className="caption text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                    Alamat Sementara
                  </div>
                  <div className="caption p-3 bg-muted/50 rounded border border-border">
                    {getAddress("alamat_sementara")}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Documents & Files</h3>
              
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="caption text-muted-foreground">
                  Document management feature coming soon
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
