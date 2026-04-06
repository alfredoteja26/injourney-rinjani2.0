import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, Upload, Link as LinkIcon, X, Calendar, User, Tag, GraduationCap, Users, Target, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";
import { announcementStorage, Announcement } from "../utils/announcementStorage";

const PLATFORM_OPTIONS = [
  { value: "performance", label: "Performance" },
  { value: "talent", label: "Talent" },
  { value: "learning", label: "Learning" },
  { value: "sistem", label: "Sistem" },
  { value: "all", label: "Semua Platform" }
];

const ICON_OPTIONS = [
  { value: "learning", label: "Learning", icon: GraduationCap, color: "#31C6B1", bgColor: "rgba(90,226,195,0.2)" },
  { value: "talent", label: "Talent", icon: Users, color: "#006573", bgColor: "rgba(0,101,115,0.1)" },
  { value: "performance", label: "Performance", icon: Target, color: "#00858A", bgColor: "rgba(0,133,138,0.1)" },
  { value: "ai", label: "AI & Innovation", icon: Sparkles, color: "#00B8DB", bgColor: "rgba(0,184,219,0.1)" },
  { value: "general", label: "General", icon: TrendingUp, color: "#31C6B1", bgColor: "rgba(90,226,195,0.2)" }
];

const PROFILE_COLORS = [
  "#FF5722", "#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#00BCD4", "#FF9800", "#E91E63"
];

export function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    platform: [] as string[],
    title: "",
    description: "",
    iconType: "learning" as 'learning' | 'talent' | 'performance' | 'ai' | 'general',
    linkAttachment: "",
    imageUrl: "",
    imageFile: null as File | null
  });

  const resetForm = () => {
    setFormData({
      platform: [],
      title: "",
      description: "",
      iconType: "learning",
      linkAttachment: "",
      imageUrl: "",
      imageFile: null
    });
    setEditingId(null);
    setShowForm(false);
    setShowPreview(false);
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      platform: announcement.platform,
      title: announcement.title,
      description: announcement.description,
      iconType: announcement.iconType || "learning",
      linkAttachment: announcement.linkAttachment || "",
      imageUrl: announcement.imageUrl || "",
      imageFile: null
    });
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      setAnnouncements(announcements.filter(a => a.id !== id));
      toast.success("Pengumuman berhasil dihapus");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || formData.platform.length === 0) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    const now = new Date();
    const timestamp = now.toLocaleDateString("id-ID", { 
      day: "2-digit", 
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    if (editingId) {
      // Update existing
      setAnnouncements(announcements.map(a => 
        a.id === editingId 
          ? {
              ...a,
              ...formData,
              categoryColor: formData.iconType as 'learning' | 'talent' | 'performance' | 'ai',
              timestamp: a.timestamp // Keep original timestamp
            }
          : a
      ));
      toast.success("Pengumuman berhasil diperbarui");
    } else {
      // Create new
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        categoryColor: formData.iconType as 'learning' | 'talent' | 'performance' | 'ai',
        timestamp,
        status: "active",
        createdBy: "admin@danantara.com"
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      toast.success("Pengumuman berhasil dibuat");
    }

    resetForm();
  };

  const handlePlatformToggle = (platform: string) => {
    if (platform === "all") {
      setFormData({
        ...formData,
        platform: formData.platform.includes("all") ? [] : ["all"]
      });
    } else {
      const newPlatforms = formData.platform.includes(platform)
        ? formData.platform.filter(p => p !== platform && p !== "all")
        : [...formData.platform.filter(p => p !== "all"), platform];
      setFormData({ ...formData, platform: newPlatforms });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageFile: file,
          imageUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const categoryData = ICON_OPTIONS.find(c => c.value === formData.iconType);

  useEffect(() => {
    const storedAnnouncements = announcementStorage.getAnnouncements();
    setAnnouncements(storedAnnouncements);
  }, []);

  useEffect(() => {
    announcementStorage.setAnnouncements(announcements);
  }, [announcements]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ 
            fontSize: "var(--text-2xl)", 
            fontWeight: "var(--font-weight-semibold)", 
            color: "var(--foreground)",
            marginBottom: "8px"
          }}>
            Announcement Management
          </h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
            Buat dan kelola pengumuman penting untuk berbagai platform
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                backgroundColor: "var(--primary)",
                color: "white",
                borderRadius: "var(--radius)",
                border: "none",
                cursor: "pointer",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)"
              }}
            >
              <Plus style={{ width: "16px", height: "16px" }} />
              Buat Pengumuman Baru
            </Button>
          )}
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ 
              fontSize: "var(--text-lg)", 
              fontWeight: "var(--font-weight-semibold)", 
              color: "var(--foreground)" 
            }}>
              {editingId ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
            </h3>
            <button
              onClick={resetForm}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: "var(--muted-foreground)"
              }}
            >
              <X style={{ width: "20px", height: "20px" }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Platform Selection */}
            <div>
              <label style={{ 
                display: "block", 
                fontSize: "var(--text-sm)", 
                fontWeight: "var(--font-weight-medium)", 
                color: "var(--foreground)",
                marginBottom: "8px"
              }}>
                Platform Target <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {PLATFORM_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handlePlatformToggle(option.value)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "var(--radius)",
                      border: `1px solid ${formData.platform.includes(option.value) ? "var(--primary)" : "var(--border)"}`,
                      backgroundColor: formData.platform.includes(option.value) ? "rgba(37, 99, 235, 0.1)" : "var(--background)",
                      color: formData.platform.includes(option.value) ? "var(--primary)" : "var(--foreground)",
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-weight-medium)",
                      cursor: "pointer"
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title and Category */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "2fr 1fr", 
              gap: "16px" 
            }}>
              <div>
                <label style={{ 
                  display: "block", 
                  fontSize: "var(--text-sm)", 
                  fontWeight: "var(--font-weight-medium)", 
                  color: "var(--foreground)",
                  marginBottom: "8px"
                }}>
                  Judul Pengumuman <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan judul pengumuman"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    fontSize: "var(--text-sm)"
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: "block", 
                  fontSize: "var(--text-sm)", 
                  fontWeight: "var(--font-weight-medium)", 
                  color: "var(--foreground)",
                  marginBottom: "8px"
                }}>
                  Kategori
                </label>
                <select
                  value={formData.iconType}
                  onChange={(e) => setFormData({ ...formData, iconType: e.target.value as 'learning' | 'talent' | 'performance' | 'ai' | 'general' })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    fontSize: "var(--text-sm)"
                  }}
                >
                  {ICON_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ 
                display: "block", 
                fontSize: "var(--text-sm)", 
                fontWeight: "var(--font-weight-medium)", 
                color: "var(--foreground)",
                marginBottom: "8px"
              }}>
                Deskripsi / Sub Judul <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Masukkan deskripsi pengumuman"
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "var(--text-sm)",
                  resize: "vertical"
                }}
              />
            </div>

            {/* Link Attachment */}
            <div>
              <label style={{ 
                display: "block", 
                fontSize: "var(--text-sm)", 
                fontWeight: "var(--font-weight-medium)", 
                color: "var(--foreground)",
                marginBottom: "8px"
              }}>
                Link Attachment (Opsional)
              </label>
              <div style={{ position: "relative" }}>
                <LinkIcon style={{ 
                  position: "absolute", 
                  left: "12px", 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "var(--muted-foreground)"
                }} />
                <input
                  type="url"
                  value={formData.linkAttachment}
                  onChange={(e) => setFormData({ ...formData, linkAttachment: e.target.value })}
                  placeholder="https://example.com"
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 36px",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    fontSize: "var(--text-sm)"
                  }}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label style={{ 
                display: "block", 
                fontSize: "var(--text-sm)", 
                fontWeight: "var(--font-weight-medium)", 
                color: "var(--foreground)",
                marginBottom: "8px"
              }}>
                Gambar Pengumuman (Opsional)
              </label>
              <div style={{
                border: "2px dashed var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                textAlign: "center",
                backgroundColor: "var(--background)"
              }}>
                {formData.imageUrl ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        borderRadius: "var(--radius)",
                        marginBottom: "12px"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: "", imageFile: null })}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#EF4444",
                        color: "white",
                        border: "none",
                        borderRadius: "var(--radius)",
                        fontSize: "var(--text-sm)",
                        cursor: "pointer"
                      }}
                    >
                      Hapus Gambar
                    </button>
                  </div>
                ) : (
                  <label style={{ cursor: "pointer" }}>
                    <Upload style={{ 
                      width: "48px", 
                      height: "48px", 
                      color: "var(--muted-foreground)",
                      margin: "0 auto 12px"
                    }} />
                    <p style={{ 
                      fontSize: "var(--text-sm)", 
                      color: "var(--muted-foreground)",
                      marginBottom: "8px"
                    }}>
                      Klik untuk upload gambar atau drag & drop
                    </p>
                    <p style={{ 
                      fontSize: "var(--text-xs)", 
                      color: "var(--muted-foreground)"
                    }}>
                      PNG, JPG up to 5MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: "10px 16px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  cursor: "pointer"
                }}
              >
                Batal
              </button>
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  borderRadius: "var(--radius)",
                  border: "none",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  cursor: "pointer"
                }}
              >
                {editingId ? "Perbarui Pengumuman" : "Buat Pengumuman"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      {!showForm && (
        <div style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          overflow: "hidden"
        }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--muted)",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
            gap: "16px",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--muted-foreground)",
            textTransform: "uppercase"
          }}>
            <div>Pengumuman</div>
            <div>Platform</div>
            <div>Kategori</div>
            <div>Tanggal</div>
            <div>Aksi</div>
          </div>

          {announcements.length === 0 ? (
            <div style={{
              padding: "48px 20px",
              textAlign: "center",
              color: "var(--muted-foreground)"
            }}>
              <p>Belum ada pengumuman. Klik "Buat Pengumuman Baru" untuk memulai.</p>
            </div>
          ) : (
            announcements.map(announcement => (
              <div
                key={announcement.id}
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--border)",
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
                  gap: "16px",
                  alignItems: "center",
                  backgroundColor: announcement.status === "archived" ? "var(--muted)" : "transparent"
                }}
              >
                <div>
                  <div style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--foreground)",
                    marginBottom: "4px"
                  }}>
                    {announcement.title}
                  </div>
                  <div style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--muted-foreground)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    {announcement.description.substring(0, 50)}{announcement.description.length > 50 ? '...' : ''}
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {announcement.platform.includes("all") ? (
                    <span style={{
                      fontSize: "var(--text-xs)",
                      padding: "2px 8px",
                      borderRadius: "var(--radius)",
                      backgroundColor: "var(--muted)",
                      color: "var(--foreground)"
                    }}>
                      Semua
                    </span>
                  ) : (
                    announcement.platform.map(p => (
                      <span
                        key={p}
                        style={{
                          fontSize: "var(--text-xs)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius)",
                          backgroundColor: "var(--muted)",
                          color: "var(--foreground)"
                        }}
                      >
                        {PLATFORM_OPTIONS.find(opt => opt.value === p)?.label}
                      </span>
                    ))
                  )}
                </div>

                <div>
                  <span style={{
                    fontSize: "var(--text-xs)",
                    padding: "4px 8px",
                    borderRadius: "var(--radius)",
                    backgroundColor: ICON_OPTIONS.find(c => c.value === announcement.iconType)?.bgColor || 'var(--muted)',
                    color: ICON_OPTIONS.find(c => c.value === announcement.iconType)?.color || 'var(--foreground)'
                  }}>
                    {ICON_OPTIONS.find(c => c.value === announcement.iconType)?.label || 'General'}
                  </span>
                </div>

                <div style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--muted-foreground)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <Calendar style={{ width: "12px", height: "12px" }} />
                  {announcement.timestamp.split(" ")[0]} {announcement.timestamp.split(" ")[1]} {announcement.timestamp.split(" ")[2]}
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleEdit(announcement)}
                    style={{
                      padding: "6px",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      cursor: "pointer"
                    }}
                    title="Edit"
                  >
                    <Edit2 style={{ width: "14px", height: "14px" }} />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    style={{
                      padding: "6px",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--background)",
                      color: "#EF4444",
                      cursor: "pointer"
                    }}
                    title="Delete"
                  >
                    <Trash2 style={{ width: "14px", height: "14px" }} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}