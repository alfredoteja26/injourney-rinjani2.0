import { useState } from "react";
import { 
  Plus, 
  Tag, 
  Archive, 
  MoreVertical, 
  Pencil, 
  Trash2,
  CheckCircle2,
  XCircle,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import { AdminLayout } from "../../../components/shell/AdminLayout";
import { toast } from "sonner@2.0.3";
import { IDPReasonTag } from "../../../types/idp";

// Mock Data
const initialTags: IDPReasonTag[] = [
  { 
    id: "tag-std-1", 
    name: "Career Aspiration", 
    description: "Pengembangan untuk persiapan karir masa depan atau promosi.", 
    type: "standard", 
    is_active: true, 
    usage_count: 156,
    created_at: "2025-01-01T00:00:00Z"
  },
  { 
    id: "tag-std-2", 
    name: "Performance Improvement", 
    description: "Pengembangan untuk menutup gap kinerja saat ini.", 
    type: "standard", 
    is_active: true, 
    usage_count: 89,
    created_at: "2025-01-01T00:00:00Z"
  },
  { 
    id: "tag-std-3", 
    name: "Gap Fulfillment", 
    description: "Pengembangan wajib untuk memenuhi standar kompetensi posisi.", 
    type: "standard", 
    is_active: true, 
    usage_count: 234,
    created_at: "2025-01-01T00:00:00Z"
  },
  { 
    id: "tag-cust-1", 
    name: "InJourney Society FIRST Class", 
    description: "Program khusus untuk kader pimpinan masa depan InJourney.", 
    type: "custom", 
    is_active: true, 
    usage_count: 45,
    created_by: "Admin HC",
    created_at: "2026-01-10T00:00:00Z"
  },
  { 
    id: "tag-cust-2", 
    name: "Digital Transformation Squad", 
    description: "Tag untuk peserta task force digitalisasi.", 
    type: "custom", 
    is_active: false, 
    usage_count: 12,
    created_by: "Admin HC",
    created_at: "2025-06-15T00:00:00Z"
  }
];

export function ReasonTagManagementScreen() {
  const [tags, setTags] = useState<IDPReasonTag[]>(initialTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<IDPReasonTag | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true
  });

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tag.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const standardTags = filteredTags.filter(t => t.type === 'standard');
  const customTags = filteredTags.filter(t => t.type === 'custom');

  const handleOpenCreate = () => {
    setEditingTag(null);
    setFormData({ name: "", description: "", is_active: true });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (tag: IDPReasonTag) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      description: tag.description || "",
      is_active: tag.is_active
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error("Nama tag wajib diisi");
      return;
    }

    if (editingTag) {
      // Update
      setTags(tags.map(t => t.id === editingTag.id ? {
        ...t,
        name: formData.name,
        description: formData.description,
        is_active: formData.is_active
      } : t));
      toast.success("Tag berhasil diperbarui");
    } else {
      // Create
      const newTag: IDPReasonTag = {
        id: `tag-cust-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        type: 'custom',
        is_active: formData.is_active,
        usage_count: 0,
        created_by: "You",
        created_at: new Date().toISOString()
      };
      setTags([...tags, newTag]);
      toast.success("Custom tag berhasil dibuat");
    }
    setIsDialogOpen(false);
  };

  const handleToggleArchive = (id: string) => {
    setTags(tags.map(t => t.id === id ? { ...t, is_active: !t.is_active } : t));
    toast.success("Status tag diperbarui");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[var(--color-background)] p-6 font-body">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[var(--color-text-heading)]">
                Kelola Reason Tags
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Label alasan pengembangan untuk kategorisasi aktivitas IDP.
              </p>
            </div>
            <Button onClick={handleOpenCreate} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Custom Tag
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <Input 
              placeholder="Cari tag..." 
              className="pl-9 max-w-md bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-8">
            {/* Standard Tags */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                 <h2 className="text-lg font-heading font-semibold text-[var(--color-text-heading)]">Standard Tags</h2>
                 <Badge variant="secondary" className="text-xs">System Default</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {standardTags.map(tag => (
                  <Card key={tag.id} className="bg-slate-50 border-[var(--color-border)] shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="bg-white border-[var(--color-primary)] text-[var(--color-primary)] mb-2">
                          Standard
                        </Badge>
                        <span className="text-xs text-[var(--color-text-muted)]">{tag.usage_count} uses</span>
                      </div>
                      <CardTitle className="text-base font-bold text-[var(--color-text-heading)]">{tag.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[var(--color-text-body)]">{tag.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Custom Tags */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                 <h2 className="text-lg font-heading font-semibold text-[var(--color-text-heading)]">Custom Tags</h2>
                 <Badge className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 text-xs">Editable</Badge>
              </div>
              
              {customTags.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customTags.map(tag => (
                    <Card key={tag.id} className={tag.is_active ? "bg-white" : "bg-slate-50 opacity-75"}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant={tag.is_active ? "default" : "secondary"} className={tag.is_active ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0" : "bg-slate-200 text-slate-600"}>
                            {tag.is_active ? "Active" : "Archived"}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenEdit(tag)}>
                                <Pencil className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleToggleArchive(tag.id)} className={tag.is_active ? "text-amber-600" : "text-emerald-600"}>
                                {tag.is_active ? (
                                  <><Archive className="w-4 h-4 mr-2" /> Archive</>
                                ) : (
                                  <><CheckCircle2 className="w-4 h-4 mr-2" /> Restore</>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-base font-bold text-[var(--color-text-heading)] mt-2">{tag.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-[var(--color-text-body)] mb-3 min-h-[40px]">{tag.description || "Tidak ada deskripsi."}</p>
                        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] border-t pt-3">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag.usage_count} uses
                          </span>
                          <span>Created: {new Date(tag.created_at).toLocaleDateString('id-ID')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border-2 border-dashed border-[var(--color-border)] rounded-lg bg-slate-50">
                  <p className="text-[var(--color-text-muted)]">Belum ada custom tag yang dibuat.</p>
                  <Button variant="link" onClick={handleOpenCreate} className="text-[var(--color-primary)]">
                    Buat tag pertama
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTag ? "Edit Tag" : "Tambah Custom Tag"}</DialogTitle>
              <DialogDescription>
                Tag ini akan tersedia saat assign aktivitas IDP.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Tag <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Contoh: Fast Track Program"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desc">Deskripsi</Label>
                <Textarea 
                  id="desc" 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Jelaskan tujuan penggunaan tag ini..."
                />
              </div>
              
              {editingTag && (
                <div className="flex items-center justify-between rounded-lg border p-3 bg-slate-50">
                  <div className="space-y-0.5">
                    <Label>Status Aktif</Label>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      Tag non-aktif tidak akan muncul di pilihan assignment.
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {formData.is_active ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Archived</Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                    >
                      {formData.is_active ? "Archive" : "Activate"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSave} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
