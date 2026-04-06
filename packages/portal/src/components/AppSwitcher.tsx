import React, { useState, useEffect } from "react";
import { Grid3x3, X, Lock, ExternalLink, Search, Building2, User as UserIcon, TrendingUp, BookOpen, DollarSign, Wallet, ShoppingCart, Home as BuildingIcon, Laptop, Wrench, Star } from "lucide-react";
import imgMekari from "figma:asset/0d559df4bd790dc84987d0606774f1cc71eaaed6.png";
import imgSunfish from "figma:asset/593eebcf9f9e4ee6b85ebf855cc630aeee9df9df.png";

interface App {
  id: string;
  name: string;
  description: string;
  icon?: string;
  iconImage?: string;
  url: string;
  category: "hr" | "finance" | "operations" | "it";
  requiredRole?: "Admin" | "User" | "All";
  requiredDepartment?: string[];
  isLocked?: boolean;
  hideAccessInfo?: boolean;
}

interface AppSwitcherProps {
  userRole?: "Admin" | "User";
  userDepartment?: string;
  userEmail?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AppSwitcher({ 
  userRole = "User", 
  userDepartment = "Human Capital",
  userEmail = "",
  isOpen, 
  onClose 
}: AppSwitcherProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "favorites" | App["category"]>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("app-favorites");
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("app-favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (appId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(appId)) {
        newFavorites.delete(appId);
      } else {
        newFavorites.add(appId);
      }
      return newFavorites;
    });
  };

  // Check user-specific access for Sunfish and Mekari
  const canAccessSunfish = userEmail === "dimas@injourney.co.id";
  const canAccessMekari = userEmail === "binavia@injourney.co.id";

  // Mock apps data with access control
  const apps: App[] = [
    {
      id: "rinjani",
      name: "Rinjani Portal",
      description: "Portal utama untuk HR & Talent Management",
      icon: "🏔️",
      url: "/",
      category: "hr",
      requiredRole: "All"
    },
    {
      id: "kpi-system",
      name: "KPI Management",
      description: "Sistem manajemen KPI dan performance review",
      icon: "📊",
      url: "#/kpi",
      category: "hr",
      requiredRole: "All"
    },
    {
      id: "learning",
      name: "Learning Hub",
      description: "Platform pelatihan dan pengembangan karyawan",
      icon: "📚",
      url: "#/learning",
      category: "hr",
      requiredRole: "All"
    },
    {
      id: "finance-portal",
      name: "Finance Portal",
      description: "Portal keuangan dan akuntansi",
      icon: "💰",
      url: "#/finance",
      category: "finance",
      requiredRole: "Admin",
      requiredDepartment: ["Finance", "Accounting"],
      isLocked: userRole !== "Admin" && !["Finance", "Accounting"].includes(userDepartment)
    },
    {
      id: "payroll",
      name: "Payroll System",
      description: "Sistem penggajian dan benefit",
      icon: "💵",
      url: "#/payroll",
      category: "finance",
      requiredRole: "Admin",
      requiredDepartment: ["Human Capital", "Finance"],
      isLocked: userRole !== "Admin" && !["Human Capital", "Finance"].includes(userDepartment)
    },
    {
      id: "procurement",
      name: "Procurement",
      description: "Sistem pengadaan barang dan jasa",
      icon: "🛒",
      url: "#/procurement",
      category: "operations",
      requiredDepartment: ["Procurement", "Operations"],
      isLocked: !["Procurement", "Operations"].includes(userDepartment)
    },
    {
      id: "asset-management",
      name: "Asset Management",
      description: "Manajemen aset perusahaan",
      icon: "🏢",
      url: "#/assets",
      category: "operations",
      requiredRole: "Admin",
      isLocked: userRole !== "Admin"
    },
    {
      id: "itsm",
      name: "IT Service Desk",
      description: "Helpdesk dan service management",
      icon: "🖥️",
      url: "#/itsm",
      category: "it",
      requiredRole: "All"
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      description: "Manajemen infrastruktur IT",
      icon: "🔧",
      url: "#/infrastructure",
      category: "it",
      requiredRole: "Admin",
      requiredDepartment: ["IT", "Digital"],
      isLocked: userRole !== "Admin" && !["IT", "Digital"].includes(userDepartment)
    },
    {
      id: "sunfish",
      name: "Sunfish",
      description: "Sistem HR dan Payroll Sunfish",
      iconImage: imgSunfish,
      url: "https://sunfish.com",
      category: "hr",
      requiredRole: "All",
      isLocked: !canAccessSunfish,
      hideAccessInfo: true
    },
    {
      id: "mekari",
      name: "Mekari",
      description: "Platform HR dan Accounting Mekari",
      iconImage: imgMekari,
      url: "https://mekari.com",
      category: "hr",
      requiredRole: "All",
      isLocked: !canAccessMekari,
      hideAccessInfo: true
    }
  ];

  const categories = [
    { id: "all", label: "Semua", icon: Grid3x3 },
    { id: "favorites", label: "Favorit", icon: Star },
    { id: "hr", label: "HR", icon: UserIcon },
    { id: "finance", label: "Finance", icon: Building2 },
    { id: "operations", label: "Operations", icon: Building2 },
    { id: "it", label: "IT", icon: Building2 }
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "favorites" && favorites.has(app.id)) ||
                           app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Separate favorites and other apps
  const favoriteApps = filteredApps.filter(app => favorites.has(app.id));
  const otherApps = filteredApps.filter(app => !favorites.has(app.id));

  const handleAppClick = (app: App) => {
    if (app.isLocked) return;
    window.location.href = app.url;
  };

  const getAccessInfo = (app: App) => {
    if (app.isLocked) {
      // Special handling for Sunfish and Mekari
      if (app.id === "sunfish") {
        return "Hanya untuk user: Dimas";
      }
      if (app.id === "mekari") {
        return "Hanya untuk user: Binavia";
      }
      
      if (app.requiredRole && userRole !== app.requiredRole) {
        return `Memerlukan role: ${app.requiredRole}`;
      }
      if (app.requiredDepartment && !app.requiredDepartment.includes(userDepartment)) {
        return `Memerlukan department: ${app.requiredDepartment.join(", ")}`;
      }
      return "Akses terbatas";
    }
    return null;
  };

  // Get icon component and color for each app (InJourney color scheme)
  const getAppIcon = (appId: string) => {
    const iconMap: { [key: string]: { Icon: any; color: string } } = {
      "rinjani": { Icon: Grid3x3, color: "#ec3d31" }, // Red like dashboard
      "kpi-system": { Icon: TrendingUp, color: "#00858a" }, // Teal
      "learning": { Icon: BookOpen, color: "#f7941d" }, // Orange
      "finance-portal": { Icon: DollarSign, color: "#ec3d31" }, // Red
      "payroll": { Icon: Wallet, color: "#00858a" }, // Teal
      "procurement": { Icon: ShoppingCart, color: "#f7941d" }, // Orange
      "asset-management": { Icon: BuildingIcon, color: "#ec3d31" }, // Red
      "itsm": { Icon: Laptop, color: "#00858a" }, // Teal
      "infrastructure": { Icon: Wrench, color: "#f7941d" }, // Orange
    };
    
    return iconMap[appId] || { Icon: Grid3x3, color: "#ec3d31" };
  };

  const AppCard = ({ app }: { app: App }) => {
    const isFavorite = favorites.has(app.id);
    
    return (
      <button
        onClick={() => handleAppClick(app)}
        disabled={app.isLocked}
        className={`p-4 rounded-lg border text-left transition-all relative group ${
          app.isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md'
        }`}
        style={{
          backgroundColor: "var(--card)",
          borderColor: app.isLocked ? "var(--border)" : "var(--primary)",
          borderWidth: app.isLocked ? "1px" : "2px"
        }}
      >
        {/* Favorite Star Button */}
        <button
          onClick={(e) => toggleFavorite(app.id, e)}
          className="absolute top-2 right-2 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: isFavorite ? "rgba(255, 193, 7, 0.1)" : "var(--muted)",
            color: isFavorite ? "#FFC107" : "var(--muted-foreground)"
          }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star 
            className="w-4 h-4" 
            style={{ 
              fill: isFavorite ? "#FFC107" : "none",
              stroke: isFavorite ? "#FFC107" : "currentColor"
            }} 
          />
        </button>

        <div className="flex items-start justify-between mb-3">
          {app.iconImage ? (
            <div className="w-10 h-10 flex items-center justify-center rounded-lg overflow-hidden">
              <img 
                src={app.iconImage} 
                alt={app.name} 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  console.error(`Failed to load image for ${app.name}:`, app.iconImage);
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => console.log(`Successfully loaded image for ${app.name}`)}
              />
            </div>
          ) : (
            (() => {
              const { Icon, color } = getAppIcon(app.id);
              return (
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-5 h-5" style={{ color: "white" }} />
                </div>
              );
            })()
          )}
          {app.isLocked ? (
            <Lock className="w-5 h-5" style={{ color: "var(--muted-foreground)" }} />
          ) : (
            <ExternalLink className="w-5 h-5" style={{ color: "var(--primary)" }} />
          )}
        </div>
        
        <h4 className="mb-1 pr-8" style={{ color: "var(--foreground)" }}>
          {app.name}
        </h4>
        
        <p className="caption mb-2" style={{ color: "var(--muted-foreground)" }}>
          {app.description}
        </p>

        {app.isLocked && !app.hideAccessInfo && (
          <div 
            className="caption mt-2 px-2 py-1 rounded inline-block"
            style={{ 
              backgroundColor: "var(--muted)",
              color: "var(--muted-foreground)"
            }}
          >
            🔒 {getAccessInfo(app)}
          </div>
        )}

        {!app.isLocked && (
          <div 
            className="badge mt-2 px-2 py-1 rounded inline-block"
            style={{ 
              backgroundColor: "rgba(0, 133, 138, 0.1)",
              color: "var(--primary)"
            }}
          >
            {app.category.toUpperCase()}
          </div>
        )}
      </button>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div 
        className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden"
        style={{ backgroundColor: "var(--card)", maxHeight: "80vh" }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <Grid3x3 className="w-6 h-6" style={{ color: "var(--primary)" }} />
            <div>
              <h3 style={{ color: "var(--foreground)" }}>Platform Terintegrasi</h3>
              <p className="caption" style={{ color: "var(--muted-foreground)" }}>
                Akses semua aplikasi dari satu tempat
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

        {/* Search and Filter */}
        <div className="p-6 space-y-4" style={{ backgroundColor: "var(--muted)" }}>
          {/* User Info */}
          <div className="flex items-center gap-2 caption" style={{ color: "var(--muted-foreground)" }}>
            <UserIcon className="w-4 h-4" />
            <span>Role: {userRole}</span>
            <span>•</span>
            <Building2 className="w-4 h-4" />
            <span>Department: {userDepartment}</span>
            {favorites.size > 0 && (
              <>
                <span>•</span>
                <Star className="w-4 h-4" style={{ fill: "#FFC107", stroke: "#FFC107" }} />
                <span>{favorites.size} Favorit</span>
              </>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: "var(--muted-foreground)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari aplikasi..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border"
              style={{
                backgroundColor: "var(--input-background)",
                borderColor: "var(--border)",
                color: "var(--foreground)"
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
                className="badge px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2"
                style={{
                  backgroundColor: selectedCategory === category.id ? "var(--primary)" : "var(--card)",
                  color: selectedCategory === category.id ? "var(--primary-foreground)" : "var(--muted-foreground)"
                }}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
                {category.id === "favorites" && favorites.size > 0 && (
                  <span 
                    className="px-1.5 rounded-full caption"
                    style={{ 
                      backgroundColor: selectedCategory === category.id ? "rgba(255, 255, 255, 0.2)" : "var(--muted)",
                      fontSize: "var(--text-xs)"
                    }}
                  >
                    {favorites.size}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: "50vh" }}>
          {filteredApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              {selectedCategory === "favorites" ? (
                <>
                  <Star className="w-12 h-12 mb-3" style={{ color: "var(--muted-foreground)" }} />
                  <p style={{ color: "var(--muted-foreground)" }}>
                    Belum ada aplikasi favorit
                  </p>
                  <p className="caption mt-2" style={{ color: "var(--muted-foreground)" }}>
                    Klik ikon bintang pada aplikasi untuk menambahkan ke favorit
                  </p>
                </>
              ) : (
                <>
                  <Grid3x3 className="w-12 h-12 mb-3" style={{ color: "var(--muted-foreground)" }} />
                  <p style={{ color: "var(--muted-foreground)" }}>
                    Tidak ada aplikasi ditemukan
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Favorites Section - Only show when not filtering by favorites */}
              {selectedCategory !== "favorites" && favoriteApps.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5" style={{ fill: "#FFC107", stroke: "#FFC107" }} />
                    <h4 style={{ color: "var(--foreground)" }}>Aplikasi Favorit</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteApps.map(app => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Apps Section */}
              {otherApps.length > 0 && selectedCategory !== "favorites" && (
                <div>
                  {favoriteApps.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <Grid3x3 className="w-5 h-5" style={{ color: "var(--muted-foreground)" }} />
                      <h4 style={{ color: "var(--foreground)" }}>Semua Aplikasi</h4>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherApps.map(app => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites Only View */}
              {selectedCategory === "favorites" && favoriteApps.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteApps.map(app => (
                    <AppCard key={app.id} app={app} />
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
