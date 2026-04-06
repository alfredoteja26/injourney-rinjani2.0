import React, { useState } from "react";
import { HelpCircle, X, BookOpen, Headphones, Settings, FileText, ExternalLink, Search } from "lucide-react";

interface HelpSupportProps {
  userRole?: "Admin" | "User";
  isOpen: boolean;
  onClose: () => void;
  onNavigateToHCPolicy?: () => void;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: HelpItem[];
  color: string;
}

interface HelpItem {
  title: string;
  description: string;
  url?: string;
  onClick?: () => void;
}

export default function HelpSupport({ 
  userRole = "User", 
  isOpen, 
  onClose,
  onNavigateToHCPolicy 
}: HelpSupportProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: HelpCategory[] = [
    {
      id: "guidebook",
      title: "Guide Book",
      description: "Panduan lengkap penggunaan sistem",
      icon: <BookOpen className="w-6 h-6" />,
      color: "var(--primary)",
      items: [
        {
          title: "Panduan Pengguna Rinjani Portal",
          description: "Cara menggunakan fitur-fitur utama di Rinjani Portal",
          url: "/docs/user-guide.pdf"
        },
        {
          title: "Tutorial KPI Management",
          description: "Langkah-langkah setting dan mengelola KPI",
          url: "/docs/kpi-tutorial.pdf"
        },
        {
          title: "Employee Survey Guide",
          description: "Panduan membuat dan menganalisis employee survey",
          url: "/docs/survey-guide.pdf"
        },
        {
          title: "User Management Manual",
          description: "Cara mengelola user dan role di sistem",
          url: "/docs/user-management.pdf"
        }
      ]
    },
    {
      id: "helpdesk",
      title: "Helpdesk",
      description: "Bantuan teknis dan dukungan pengguna",
      icon: <Headphones className="w-6 h-6" />,
      color: "var(--accent)",
      items: [
        {
          title: "Submit Ticket",
          description: "Buat tiket untuk masalah atau pertanyaan",
          url: "https://helpdesk.injourney.co.id/ticket/new"
        },
        {
          title: "Live Chat Support",
          description: "Chat langsung dengan tim support (Senin-Jumat, 08:00-17:00)",
          url: "https://helpdesk.injourney.co.id/chat"
        },
        {
          title: "My Tickets",
          description: "Lihat status tiket yang pernah dibuat",
          url: "https://helpdesk.injourney.co.id/tickets"
        },
        {
          title: "FAQ",
          description: "Pertanyaan yang sering diajukan",
          url: "https://helpdesk.injourney.co.id/faq"
        }
      ]
    },
    {
      id: "itsm",
      title: "ITSM",
      description: "IT Service Management",
      icon: <Settings className="w-6 h-6" />,
      color: "rgba(0, 101, 115, 1.00)",
      items: [
        {
          title: "Service Catalog",
          description: "Katalog layanan IT yang tersedia",
          url: "#/itsm/catalog"
        },
        {
          title: "Request New Service",
          description: "Ajukan permintaan layanan IT baru",
          url: "#/itsm/request"
        },
        {
          title: "Incident Management",
          description: "Laporkan insiden atau gangguan sistem",
          url: "#/itsm/incident"
        },
        {
          title: "Change Management",
          description: "Ajukan perubahan sistem atau infrastruktur",
          url: "#/itsm/change"
        },
        {
          title: "Asset Management",
          description: "Informasi aset IT perusahaan",
          url: "#/itsm/assets"
        }
      ]
    },
    {
      id: "hc-policy",
      title: "HC Digi Policy",
      description: "Kebijakan dan dokumen Human Capital",
      icon: <FileText className="w-6 h-6" />,
      color: "rgba(90, 226, 195, 1.00)",
      items: [
        {
          title: "Lihat Semua Kebijakan HC",
          description: "Akses dokumen kebijakan HC dengan scope Global atau Entitas",
          onClick: onNavigateToHCPolicy
        },
        {
          title: "Kebijakan Cuti & Absensi",
          description: "Peraturan terkait cuti tahunan, sakit, dan absensi",
          onClick: onNavigateToHCPolicy
        },
        {
          title: "Employee Code of Conduct",
          description: "Kode etik dan perilaku karyawan",
          onClick: onNavigateToHCPolicy
        },
        {
          title: "Compensation & Benefit",
          description: "Kebijakan kompensasi dan tunjangan",
          onClick: onNavigateToHCPolicy
        },
        {
          title: "Performance Management",
          description: "Panduan sistem manajemen kinerja",
          onClick: onNavigateToHCPolicy
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const handleItemClick = (item: HelpItem) => {
    if (item.onClick) {
      item.onClick();
      onClose();
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div 
        className="w-full max-w-5xl shadow-lg rounded-lg overflow-hidden"
        style={{ backgroundColor: "var(--card)", maxHeight: "85vh" }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6" style={{ color: "var(--primary)" }} />
            <div>
              <h3 style={{ color: "var(--foreground)" }}>Bantuan & Dukungan</h3>
              <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                Akses terpusat untuk panduan, helpdesk, ITSM, dan kebijakan HC
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
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

        {/* Search */}
        <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: "var(--muted-foreground)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari panduan, kebijakan, atau layanan..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border"
              style={{
                backgroundColor: "var(--input-background)",
                borderColor: "var(--border)",
                color: "var(--foreground)"
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 200px)" }}>
          {selectedCategory ? (
            // Detailed view of selected category
            <div className="p-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="caption mb-4 flex items-center gap-2 transition-colors"
                style={{ color: "var(--primary)" }}
              >
                ← Kembali ke semua kategori
              </button>
              {(() => {
                const category = categories.find(c => c.id === selectedCategory);
                if (!category) return null;
                return (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${category.color}20`, color: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h3 style={{ color: "var(--foreground)" }}>{category.title}</h3>
                        <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {category.items.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleItemClick(item)}
                          className="w-full p-4 rounded-lg border text-left transition-all hover:shadow-md"
                          style={{
                            backgroundColor: "var(--card)",
                            borderColor: "var(--border)"
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="mb-1" style={{ color: "var(--foreground)" }}>
                                {item.title}
                              </h4>
                              <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                                {item.description}
                              </p>
                            </div>
                            <ExternalLink className="w-5 h-5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            // Categories grid
            <div className="p-6">
              {filteredCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <HelpCircle className="w-12 h-12 mb-3" style={{ color: "var(--muted-foreground)" }} />
                  <p style={{ color: "var(--muted-foreground)" }}>
                    Tidak ada hasil ditemukan
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCategories.map(category => (
                    <div
                      key={category.id}
                      className="border rounded-lg overflow-hidden transition-all hover:shadow-lg"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {/* Category Header */}
                      <div 
                        className="p-4"
                        style={{ backgroundColor: `${category.color}10` }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div style={{ color: category.color }}>
                            {category.icon}
                          </div>
                          <h4 style={{ color: "var(--foreground)" }}>
                            {category.title}
                          </h4>
                        </div>
                        <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                          {category.description}
                        </p>
                      </div>

                      {/* Category Items */}
                      <div className="p-4 space-y-2">
                        {category.items.slice(0, 3).map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleItemClick(item)}
                            className="w-full p-3 rounded-lg text-left transition-colors border"
                            style={{ backgroundColor: "#fafafa", borderColor: "#c4c4c4" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "var(--muted)";
                              e.currentTarget.style.borderColor = "var(--border)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#fafafa";
                              e.currentTarget.style.borderColor = "#c4c4c4";
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="caption mb-1" style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>
                                  {item.title}
                                </p>
                                <p className="caption" style={{ color: "var(--muted-foreground)", fontSize: "var(--text-xs)" }}>
                                  {item.description}
                                </p>
                              </div>
                              <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: category.color }} />
                            </div>
                          </button>
                        ))}
                        {category.items.length > 3 && (
                          <button
                            onClick={() => setSelectedCategory(category.id)}
                            className="w-full p-2 rounded-lg caption text-center transition-colors"
                            style={{ 
                              backgroundColor: "var(--muted)",
                              color: category.color 
                            }}
                          >
                            Lihat {category.items.length - 3} item lainnya →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}