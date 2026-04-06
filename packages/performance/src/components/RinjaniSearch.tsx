import { useState, useEffect } from "react";
import { Search, X, User, FileText, Building2, Calendar, ArrowRight } from "lucide-react";

// Types
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  phone?: string;
  photoUrl?: string;
}

interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  version: string;
  scope: string;
}

interface RinjaniSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPolicy?: (policyId: string) => void;
  onNavigateToProfile?: (email: string) => void;
}

export default function RinjaniSearch({ isOpen, onClose, onNavigateToPolicy, onNavigateToProfile }: RinjaniSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "people" | "policy">("all");
  const [isSearching, setIsSearching] = useState(false);

  // Mock employee data
  const employees: Employee[] = [
    {
      id: "1",
      name: "Binavia Wardhani",
      email: "binavia@injourney.co.id",
      department: "Human Capital",
      role: "Manager HC Strategy",
      phone: "+62 812-3456-7890"
    },
    {
      id: "2",
      name: "Dimas Prakoso",
      email: "dimas@injourney.co.id",
      department: "Digital Technology",
      role: "Senior Software Engineer",
      phone: "+62 813-4567-8901"
    },
    {
      id: "3",
      name: "Sarah Anggraini",
      email: "sarah@injourney.co.id",
      department: "Human Capital",
      role: "HR Specialist",
      phone: "+62 814-5678-9012"
    },
    {
      id: "4",
      name: "Ahmad Zulfikar",
      email: "ahmad@injourney.co.id",
      department: "Finance",
      role: "Finance Manager",
      phone: "+62 815-6789-0123"
    },
    {
      id: "5",
      name: "Dewi Lestari",
      email: "dewi@injourney.co.id",
      department: "Operations",
      role: "Operations Lead",
      phone: "+62 816-7890-1234"
    },
    {
      id: "6",
      name: "Rizki Firmansyah",
      email: "rizki@injourney.co.id",
      department: "Digital Technology",
      role: "Product Manager",
      phone: "+62 817-8901-2345"
    },
    {
      id: "7",
      name: "Richard Kevin",
      email: "richard@injourney.co.id",
      department: "PT API",
      role: "Senior Software Engineer",
      phone: "+62 818-9012-3456"
    },
    {
      id: "8",
      name: "Firman Akbar",
      email: "firman@injourney.co.id",
      department: "PT Sarinah",
      role: "VP Media Marketing",
      phone: "+62 819-0123-4567"
    },
    {
      id: "9",
      name: "Muhammad Raka Putra",
      email: "raka.putra@injourney.co.id",
      department: "Injourney Holding",
      role: "Junior Data Analyst",
      phone: "+62 820-1234-5678"
    },
    {
      id: "10",
      name: "Dimas Sayyid",
      email: "dimas@injourney.co.id",
      department: "Injourney Holding",
      role: "VP Human Capital Strategy",
      phone: "+62 821-2345-6789"
    }
  ];

  // Mock policy documents
  const policies: PolicyDocument[] = [
    {
      id: "pol-001",
      title: "Kebijakan Cuti Tahunan 2025",
      category: "Leave & Absence",
      lastUpdated: "2025-01-15",
      version: "v2.1",
      scope: "All Employees"
    },
    {
      id: "pol-002",
      title: "WFH Policy",
      category: "Work Arrangement",
      lastUpdated: "2025-01-10",
      version: "v3.0",
      scope: "All Employees"
    },
    {
      id: "pol-003",
      title: "Compensation & Benefit Policy",
      category: "Compensation & Benefits",
      lastUpdated: "2025-01-05",
      version: "v1.8",
      scope: "All Employees"
    },
    {
      id: "pol-004",
      title: "SK. Hari Libur Nasional 2026",
      category: "Leave & Absence",
      lastUpdated: "2025-12-28",
      version: "v1.0",
      scope: "All Employees"
    },
    {
      id: "pol-005",
      title: "Performance Management Guidelines",
      category: "Performance",
      lastUpdated: "2024-12-20",
      version: "v1.5",
      scope: "All Employees"
    },
    {
      id: "pol-006",
      title: "Code of Conduct",
      category: "Ethics & Compliance",
      lastUpdated: "2024-12-15",
      version: "v2.0",
      scope: "All Employees"
    },
    {
      id: "pol-007",
      title: "Learning & Development Policy",
      category: "Training & Development",
      lastUpdated: "2024-12-01",
      version: "v1.2",
      scope: "All Employees"
    },
    {
      id: "pol-008",
      title: "Data Privacy & Security",
      category: "Security",
      lastUpdated: "2024-11-28",
      version: "v2.3",
      scope: "All Employees"
    },
    {
      id: "pol-009",
      title: "Recruitment & Onboarding",
      category: "Talent Acquisition",
      lastUpdated: "2024-11-20",
      version: "v1.0",
      scope: "HR & Managers"
    }
  ];

  // Filter results based on search query and selected filter
  const filteredEmployees = employees.filter(emp => {
    if (selectedFilter !== "all" && selectedFilter !== "people") return false;
    if (!searchQuery) return false;
    
    const query = searchQuery.toLowerCase();
    return (
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query)
    );
  });

  const filteredPolicies = policies.filter(policy => {
    if (selectedFilter !== "all" && selectedFilter !== "policy") return false;
    if (!searchQuery) return false;
    
    const query = searchQuery.toLowerCase();
    return (
      policy.title.toLowerCase().includes(query) ||
      policy.category.toLowerCase().includes(query)
    );
  });

  const hasResults = filteredEmployees.length > 0 || filteredPolicies.length > 0;

  // Simulate search delay
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Reset search when closing
  const handleClose = () => {
    setSearchQuery("");
    setSelectedFilter("all");
    onClose();
  };

  // Handle policy click
  const handlePolicyClick = (policyId: string) => {
    if (onNavigateToPolicy) {
      onNavigateToPolicy(policyId);
      handleClose();
    }
  };

  // Handle profile click
  const handleProfileClick = (email: string) => {
    if (onNavigateToProfile) {
      onNavigateToProfile(email);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20" 
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-3xl shadow-lg rounded-lg overflow-hidden"
        style={{ backgroundColor: "var(--card)", maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6" style={{ color: "var(--primary)" }} />
            <div>
              <h3 style={{ color: "var(--foreground)" }}>Rinjani Search</h3>
              <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                Cari profile pekerja atau dokumentasi policy
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: "transparent",
              color: "var(--muted-foreground)"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--muted)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input and Filters */}
        <div className="p-6 space-y-4" style={{ backgroundColor: "var(--muted)" }}>
          {/* Search Input */}
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
              style={{ color: "var(--muted-foreground)" }} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ketik nama pekerja atau judul policy..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border outline-none"
              style={{
                backgroundColor: "var(--input-background)",
                borderColor: "var(--border)",
                color: "var(--foreground)"
              }}
              autoFocus
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className="badge px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: selectedFilter === "all" ? "var(--primary)" : "var(--card)",
                color: selectedFilter === "all" ? "var(--primary-foreground)" : "var(--muted-foreground)"
              }}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedFilter("people")}
              className="badge px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              style={{
                backgroundColor: selectedFilter === "people" ? "var(--primary)" : "var(--card)",
                color: selectedFilter === "people" ? "var(--primary-foreground)" : "var(--muted-foreground)"
              }}
            >
              <User className="w-4 h-4" />
              Pekerja
            </button>
            <button
              onClick={() => setSelectedFilter("policy")}
              className="badge px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              style={{
                backgroundColor: selectedFilter === "policy" ? "var(--primary)" : "var(--card)",
                color: selectedFilter === "policy" ? "var(--primary-foreground)" : "var(--muted-foreground)"
              }}
            >
              <FileText className="w-4 h-4" />
              Policy
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: "50vh" }}>
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "var(--primary)" }}></div>
              <p className="mt-3 caption" style={{ color: "var(--muted-foreground)" }}>
                Mencari...
              </p>
            </div>
          ) : !searchQuery ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="w-12 h-12 mb-3" style={{ color: "var(--muted-foreground)" }} />
              <p style={{ color: "var(--muted-foreground)" }}>
                Mulai ketik untuk mencari pekerja atau policy
              </p>
            </div>
          ) : !hasResults ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="w-12 h-12 mb-3" style={{ color: "var(--muted-foreground)" }} />
              <p style={{ color: "var(--muted-foreground)" }}>
                Tidak ada hasil untuk "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Employee Results */}
              {filteredEmployees.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5" style={{ color: "var(--primary)" }} />
                    <h4 style={{ color: "var(--foreground)" }}>
                      Pekerja ({filteredEmployees.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {filteredEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        onClick={() => handleProfileClick(employee.email)}
                        className="p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer"
                        style={{
                          backgroundColor: "var(--card)",
                          borderColor: "var(--border)"
                        }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "var(--primary)" }}
                          >
                            <span style={{ color: "var(--primary-foreground)" }}>
                              {employee.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </span>
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h5 className="mb-1" style={{ color: "var(--foreground)" }}>
                              {employee.name}
                            </h5>
                            <p className="caption mb-2" style={{ color: "var(--muted-foreground)" }}>
                              {employee.role}
                            </p>
                            <div className="flex flex-wrap gap-3 caption" style={{ color: "var(--muted-foreground)" }}>
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {employee.department}
                              </div>
                              <span>•</span>
                              <span>{employee.email}</span>
                              {employee.phone && (
                                <>
                                  <span>•</span>
                                  <span>{employee.phone}</span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Action */}
                          <ArrowRight className="w-5 h-5 shrink-0" style={{ color: "var(--muted-foreground)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Policy Results */}
              {filteredPolicies.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5" style={{ color: "var(--primary)" }} />
                    <h4 style={{ color: "var(--foreground)" }}>
                      HC Digi Policy ({filteredPolicies.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {filteredPolicies.map((policy) => (
                      <div
                        key={policy.id}
                        onClick={() => handlePolicyClick(policy.id)}
                        className="p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer"
                        style={{
                          backgroundColor: "var(--card)",
                          borderColor: "var(--border)"
                        }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "var(--muted)" }}
                          >
                            <FileText className="w-5 h-5" style={{ color: "var(--primary)" }} />
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h5 className="mb-1" style={{ color: "var(--foreground)" }}>
                              {policy.title}
                            </h5>
                            <div className="flex flex-wrap gap-3 caption" style={{ color: "var(--muted-foreground)" }}>
                              <div 
                                className="px-2 py-0.5 rounded"
                                style={{ backgroundColor: "var(--muted)" }}
                              >
                                {policy.category}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(policy.lastUpdated).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </div>
                              <span>•</span>
                              <span>{policy.version}</span>
                              <span>•</span>
                              <span>{policy.scope}</span>
                            </div>
                          </div>

                          {/* Action */}
                          <ArrowRight className="w-5 h-5 shrink-0" style={{ color: "var(--muted-foreground)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}