import { useState } from "react";
import { 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  Search, 
  Filter, 
  Calendar,
  Building2,
  User,
  Clock,
  ChevronDown,
  X,
  AlertCircle
} from "lucide-react";
import { Badge } from "./ui/badge";

interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  scope: "Global" | "Entity";
  entity?: string;
  version: string;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  downloadCount: number;
  viewCount: number;
  fileSize: string;
  status: "Active" | "Draft" | "Archived";
  description: string;
}

interface AuditLog {
  id: string;
  documentId: string;
  documentTitle: string;
  action: "upload" | "download" | "view";
  user: string;
  timestamp: string;
  ipAddress?: string;
}

interface HCDigiPolicyProps {
  userRole?: "Admin" | "User";
  userEmail?: string;
  onBack: () => void;
}

export default function HCDigiPolicy({ 
  userRole = "User",
  userEmail = "dimas@injourney.co.id",
  onBack 
}: HCDigiPolicyProps) {
  const [activeTab, setActiveTab] = useState<"documents" | "audit">("documents");
  const [searchQuery, setSearchQuery] = useState("");
  const [scopeFilter, setScopeFilter] = useState<"all" | "Global" | "Entity">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<PolicyDocument | null>(null);

  // Mock data
  const [documents] = useState<PolicyDocument[]>([
    {
      id: "1",
      title: "Kebijakan Cuti Tahunan 2025",
      category: "Leave & Attendance",
      scope: "Global",
      version: "2.1",
      uploadedBy: "Dimas Sayyid",
      uploadDate: "2024-12-01",
      lastModified: "2024-12-15",
      downloadCount: 156,
      viewCount: 423,
      fileSize: "2.4 MB",
      status: "Active",
      description: "Peraturan lengkap mengenai cuti tahunan, cuti sakit, dan cuti khusus untuk seluruh karyawan"
    },
    {
      id: "2",
      title: "Employee Code of Conduct",
      category: "Code of Conduct",
      scope: "Global",
      version: "3.0",
      uploadedBy: "Binavia Wardhani",
      uploadDate: "2024-11-20",
      lastModified: "2024-12-10",
      downloadCount: 289,
      viewCount: 756,
      fileSize: "3.1 MB",
      status: "Active",
      description: "Kode etik dan perilaku yang wajib dipatuhi oleh seluruh karyawan PT Aviasi Pariwisata Indonesia"
    },
    {
      id: "3",
      title: "Compensation & Benefit Policy - Jakarta",
      category: "Compensation",
      scope: "Entity",
      entity: "PT Aviasi Pariwisata Indonesia - Jakarta",
      version: "1.5",
      uploadedBy: "Dimas Sayyid",
      uploadDate: "2024-10-15",
      lastModified: "2024-11-25",
      downloadCount: 98,
      viewCount: 234,
      fileSize: "1.8 MB",
      status: "Active",
      description: "Kebijakan kompensasi dan benefit khusus untuk entitas Jakarta"
    },
    {
      id: "4",
      title: "Performance Management Guidelines",
      category: "Performance",
      scope: "Global",
      version: "2.0",
      uploadedBy: "Dimas Sayyid",
      uploadDate: "2024-09-01",
      lastModified: "2024-10-20",
      downloadCount: 178,
      viewCount: 512,
      fileSize: "2.9 MB",
      status: "Active",
      description: "Panduan lengkap sistem manajemen kinerja, KPI, dan performance review"
    },
    {
      id: "5",
      title: "Work From Home Policy - Bali",
      category: "Work Arrangement",
      scope: "Entity",
      entity: "PT Aviasi Pariwisata Indonesia - Bali",
      version: "1.2",
      uploadedBy: "Binavia Wardhani",
      uploadDate: "2024-08-10",
      lastModified: "2024-09-15",
      downloadCount: 67,
      viewCount: 145,
      fileSize: "1.2 MB",
      status: "Active",
      description: "Kebijakan work from home khusus untuk entitas Bali"
    },
    {
      id: "6",
      title: "Draft - Employee Wellness Program",
      category: "Wellness",
      scope: "Global",
      version: "0.9",
      uploadedBy: "Binavia Wardhani",
      uploadDate: "2024-12-20",
      lastModified: "2024-12-28",
      downloadCount: 12,
      viewCount: 34,
      fileSize: "1.5 MB",
      status: "Draft",
      description: "Draft kebijakan program kesejahteraan karyawan (belum berlaku)"
    }
  ]);

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      documentId: "1",
      documentTitle: "Kebijakan Cuti Tahunan 2025",
      action: "download",
      user: "Ahmad Zulfikar",
      timestamp: "2024-12-29 10:23:45",
      ipAddress: "192.168.1.45"
    },
    {
      id: "2",
      documentId: "2",
      documentTitle: "Employee Code of Conduct",
      action: "view",
      user: "Binavia Wardhani",
      timestamp: "2024-12-29 09:15:22",
      ipAddress: "192.168.1.67"
    },
    {
      id: "3",
      documentId: "1",
      documentTitle: "Kebijakan Cuti Tahunan 2025",
      action: "upload",
      user: "Dimas Sayyid",
      timestamp: "2024-12-15 14:30:00",
      ipAddress: "192.168.1.10"
    },
    {
      id: "4",
      documentId: "3",
      documentTitle: "Compensation & Benefit Policy - Jakarta",
      action: "download",
      user: "Herdy Harman",
      timestamp: "2024-12-28 16:45:10",
      ipAddress: "192.168.1.89"
    }
  ]);

  const categories = [
    "all",
    "Leave & Attendance",
    "Code of Conduct",
    "Compensation",
    "Performance",
    "Work Arrangement",
    "Wellness"
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScope = scopeFilter === "all" || doc.scope === scopeFilter;
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    return matchesSearch && matchesScope && matchesCategory;
  });

  const getStatusBadge = (status: PolicyDocument["status"]) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
      case "Draft":
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>;
      case "Archived":
        return <Badge variant="destructive" className="bg-destructive-foreground/10 text-destructive-foreground border-destructive-foreground/20">Archived</Badge>;
    }
  };

  const getStatusColor = (status: PolicyDocument["status"]) => {
    switch (status) {
      case "Active":
        return "var(--primary)";
      case "Draft":
        return "var(--muted-foreground)";
      case "Archived":
        return "var(--destructive-foreground)";
    }
  };

  const getActionIcon = (action: AuditLog["action"]) => {
    switch (action) {
      case "upload":
        return <Upload className="w-4 h-4" />;
      case "download":
        return <Download className="w-4 h-4" />;
      case "view":
        return <Eye className="w-4 h-4" />;
    }
  };

  const handleDownload = (doc: PolicyDocument) => {
    // Add watermark and download logic here
    console.log(`Downloading ${doc.title} with watermark for ${userEmail}`);
    alert(`File "${doc.title}" akan diunduh dengan watermark:\n"Downloaded by ${userEmail} on ${new Date().toLocaleString()}"`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <div 
        className="border-b sticky top-0 z-10"
        style={{ 
          backgroundColor: "var(--card)",
          borderColor: "var(--border)"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: "var(--muted)",
                  color: "var(--muted-foreground)"
                }}
              >
                ← Kembali
              </button>
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8" style={{ color: "var(--primary)" }} />
                <div>
                  <h2 style={{ color: "var(--foreground)" }}>HC Digi Policy</h2>
                  <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                    Dokumen Kebijakan Human Capital dengan Audit Trail
                  </p>
                </div>
              </div>
            </div>

            {userRole === "Admin" && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)"
                }}
              >
                <Upload className="w-4 h-4" />
                Upload Dokumen
              </button>
            )}
          </div>

          {/* Tabs - Employee Survey Style */}
          <div className="border-b" style={{ borderColor: "var(--border)" }}>
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("documents")}
                className={`pb-3 px-1 relative transition-colors ${
                  activeTab === "documents"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ 
                  fontWeight: activeTab === "documents" ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                  color: activeTab === "documents" ? "var(--foreground)" : "var(--muted-foreground)"
                }}
              >
                Dokumen Kebijakan
                {activeTab === "documents" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: "var(--primary)" }} />
                )}
              </button>
              <button
                onClick={() => setActiveTab("audit")}
                className={`pb-3 px-1 relative transition-colors ${
                  activeTab === "audit"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ 
                  fontWeight: activeTab === "audit" ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                  color: activeTab === "audit" ? "var(--foreground)" : "var(--muted-foreground)"
                }}
              >
                Audit Log
                {activeTab === "audit" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: "var(--primary)" }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Spacing 24px */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {activeTab === "documents" ? (
          <div className="space-y-6">
            {/* Filters */}
            <div className="p-6 rounded-lg space-y-4" style={{ backgroundColor: "var(--card)" }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: "var(--muted-foreground)" }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari dokumen kebijakan..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border"
                  style={{
                    backgroundColor: "var(--input-background)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)"
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                  <span className="caption" style={{ color: "var(--muted-foreground)" }}>Scope:</span>
                  {(["all", "Global", "Entity"] as const).map(scope => (
                    <button
                      key={scope}
                      onClick={() => setScopeFilter(scope)}
                      className="badge px-3 py-1 rounded-lg transition-colors"
                      style={{
                        backgroundColor: scopeFilter === scope ? "var(--primary)" : "var(--muted)",
                        color: scopeFilter === scope ? "var(--primary-foreground)" : "var(--muted-foreground)"
                      }}
                    >
                      {scope === "all" ? "Semua" : scope}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="caption" style={{ color: "var(--muted-foreground)" }}>Kategori:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="badge px-3 py-1 rounded-lg border"
                    style={{
                      backgroundColor: "var(--input-background)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)"
                    }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "Semua Kategori" : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map(doc => (
                <div
                  key={doc.id}
                  className="border rounded-lg p-4 transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)"
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${getStatusColor(doc.status)}20` }}
                    >
                      <FileText className="w-6 h-6" style={{ color: getStatusColor(doc.status) }} />
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>

                  <h4 className="mb-2" style={{ color: "var(--foreground)" }}>
                    {doc.title}
                  </h4>

                  <p className="caption mb-3" style={{ color: "var(--muted-foreground)" }}>
                    {doc.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 caption" style={{ color: "var(--muted-foreground)" }}>
                      <Building2 className="w-4 h-4" />
                      <span className="badge px-2 py-0.5 rounded" style={{ backgroundColor: doc.scope === "Global" ? "var(--primary)" : "var(--accent)", color: "white" }}>
                        {doc.scope}
                      </span>
                      {doc.entity && <span>{doc.entity}</span>}
                    </div>

                    <div className="flex items-center gap-2 caption" style={{ color: "var(--muted-foreground)" }}>
                      <User className="w-4 h-4" />
                      <span>v{doc.version} • {doc.uploadedBy}</span>
                    </div>

                    <div className="flex items-center gap-2 caption" style={{ color: "var(--muted-foreground)" }}>
                      <Calendar className="w-4 h-4" />
                      <span>{doc.lastModified}</span>
                    </div>

                    <div className="flex items-center gap-4 caption" style={{ color: "var(--muted-foreground)" }}>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {doc.viewCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {doc.downloadCount}
                      </span>
                      <span>{doc.fileSize}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDocument(doc)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors caption"
                      style={{
                        backgroundColor: "var(--muted)",
                        color: "var(--foreground)"
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      Lihat
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors caption"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--primary-foreground)"
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Unduh
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Audit Log Tab
          <div className="space-y-4">
            <div 
              className="p-4 rounded-lg border flex items-start gap-3"
              style={{ 
                backgroundColor: "rgba(0, 133, 138, 0.1)",
                borderColor: "var(--primary)"
              }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: "var(--primary)" }} />
              <div>
                <h4 style={{ color: "var(--foreground)" }}>Audit Trail Aktif</h4>
                <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                  Semua aktivitas upload, download, dan view dokumen tercatat dengan IP address dan timestamp
                </p>
              </div>
            </div>

            <div 
              className="border rounded-lg overflow-hidden"
              style={{ 
                backgroundColor: "var(--card)",
                borderColor: "var(--border)"
              }}
            >
              <table className="w-full">
                <thead style={{ backgroundColor: "var(--muted)" }}>
                  <tr>
                    <th className="caption px-4 py-3 text-left" style={{ color: "var(--muted-foreground)" }}>Waktu</th>
                    <th className="caption px-4 py-3 text-left" style={{ color: "var(--muted-foreground)" }}>Aksi</th>
                    <th className="caption px-4 py-3 text-left" style={{ color: "var(--muted-foreground)" }}>Dokumen</th>
                    <th className="caption px-4 py-3 text-left" style={{ color: "var(--muted-foreground)" }}>User</th>
                    <th className="caption px-4 py-3 text-left" style={{ color: "var(--muted-foreground)" }}>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr 
                      key={log.id}
                      className="border-t transition-colors"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="caption px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                        {log.timestamp}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div style={{ color: "var(--primary)" }}>
                            {getActionIcon(log.action)}
                          </div>
                          <span className="badge" style={{ color: "var(--foreground)" }}>
                            {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="caption px-4 py-3" style={{ color: "var(--foreground)" }}>
                        {log.documentTitle}
                      </td>
                      <td className="caption px-4 py-3" style={{ color: "var(--foreground)" }}>
                        {log.user}
                      </td>
                      <td className="caption px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                        {log.ipAddress}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <div 
            className="w-full max-w-4xl rounded-lg overflow-hidden"
            style={{ backgroundColor: "var(--card)", maxHeight: "90vh" }}
          >
            <div 
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <h3 style={{ color: "var(--foreground)" }}>{selectedDocument.title}</h3>
                <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                  Version {selectedDocument.version} • {selectedDocument.category}
                </p>
              </div>
              <button
                onClick={() => setSelectedDocument(null)}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: "var(--muted)",
                  color: "var(--muted-foreground)"
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6" style={{ maxHeight: "70vh", overflow: "auto" }}>
              <div 
                className="p-8 rounded-lg text-center"
                style={{ backgroundColor: "var(--muted)" }}
              >
                <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--primary)" }} />
                <p style={{ color: "var(--foreground)" }}>
                  Preview dokumen: {selectedDocument.title}
                </p>
                <p className="caption mt-2" style={{ color: "var(--muted-foreground)" }}>
                  {selectedDocument.description}
                </p>
                <div className="mt-6 space-y-2">
                  <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                    📄 File Size: {selectedDocument.fileSize}
                  </p>
                  <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                    🔒 Watermark akan ditambahkan saat download: "Downloaded by {userEmail}"
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="mt-6 px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  }}
                >
                  <Download className="w-5 h-5" />
                  Download dengan Watermark
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal (Admin only) */}
      {showUploadModal && userRole === "Admin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div 
            className="w-full max-w-2xl rounded-lg overflow-hidden"
            style={{ backgroundColor: "var(--card)" }}
          >
            <div 
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <h3 style={{ color: "var(--foreground)" }}>Upload Dokumen Kebijakan</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: "var(--muted)",
                  color: "var(--muted-foreground)"
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                Upload form akan tersedia untuk Admin HC/IT
              </p>
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center"
                style={{ borderColor: "var(--border)" }}
              >
                <Upload className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--muted-foreground)" }} />
                <p style={{ color: "var(--foreground)" }}>Drag & drop file atau klik untuk upload</p>
                <p className="caption mt-2" style={{ color: "var(--muted-foreground)" }}>
                  PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}