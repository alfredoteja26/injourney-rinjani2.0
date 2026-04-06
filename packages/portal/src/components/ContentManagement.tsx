import { useState, useRef } from "react";
import { Plus, Trash2, Edit2, Image as ImageIcon, Eye, EyeOff, GripVertical, Save, X } from "lucide-react";
import { BannerContentService, BannerContent } from "../lib/banner-content";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import defaultBannerImage from "figma:asset/62ac0bbe164e4ce2984c3a38fe96712f3cd06c91.png";

export default function ContentManagement() {
  const [bannerContents, setBannerContents] = useState<BannerContent[]>(BannerContentService.getAll());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<BannerContent | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    isActive: true,
    order: bannerContents.length + 1,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      isActive: true,
      order: bannerContents.length + 1,
    });
    setPreviewImage("");
    setEditingContent(null);
  };

  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (content: BannerContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      description: content.description,
      imageUrl: content.imageUrl,
      isActive: content.isActive,
      order: content.order,
    });
    setPreviewImage(content.imageUrl);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this banner content?")) {
      BannerContentService.delete(id);
      setBannerContents(BannerContentService.getAll());
      toast.success("Banner content deleted successfully");
    }
  };

  const handleToggleActive = (id: string) => {
    BannerContentService.toggleActive(id);
    setBannerContents(BannerContentService.getAll());
    toast.success("Banner status updated");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setFormData({ ...formData, imageUrl });
        setPreviewImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.imageUrl) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingContent) {
      BannerContentService.update(editingContent.id, formData);
      toast.success("Banner content updated successfully");
    } else {
      BannerContentService.create(formData);
      toast.success("Banner content created successfully");
    }

    setBannerContents(BannerContentService.getAll());
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] text-[20px] text-foreground mb-2">
            Landing Page Banner Management
          </h3>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-muted-foreground">
            Manage banner content that appears on the landing page. Users can swipe through active banners.
          </p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Banner
        </Button>
      </div>

      {/* Banner List */}
      <div className="space-y-4">
        {bannerContents.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[16px] text-foreground mb-2">
              No banner content yet
            </h4>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-muted-foreground mb-4">
              Create your first banner to display on the landing page
            </p>
            <Button onClick={handleCreate} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Banner
            </Button>
          </div>
        ) : (
          bannerContents.map((content) => (
            <div
              key={content.id}
              className="bg-background border border-border rounded-lg p-4 flex items-start gap-4 hover:border-primary/50 transition-colors"
            >
              {/* Drag Handle */}
              <div className="pt-2 cursor-grab active:cursor-grabbing">
                <GripVertical className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Preview Image */}
              <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                {content.imageUrl.startsWith("data:") ? (
                  <img
                    src={content.imageUrl}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageWithFallback
                    src={content.imageUrl}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {!content.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-white">
                      Inactive
                    </span>
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[16px] text-foreground mb-1 truncate">
                  {content.title}
                </h4>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-muted-foreground line-clamp-2 mb-2">
                  {content.description}
                </p>
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <span className="font-['Inter:Medium',sans-serif] font-medium">
                    Order: {content.order}
                  </span>
                  <span>•</span>
                  <span className="font-['Inter:Regular',sans-serif] font-normal">
                    Updated: {new Date(content.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleActive(content.id)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                  title={content.isActive ? "Deactivate" : "Activate"}
                >
                  {content.isActive ? (
                    <Eye className="w-4 h-4 text-primary" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(content)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="p-2 hover:bg-destructive/10 rounded-md transition-colors group"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-destructive group-hover:text-destructive" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] text-[20px]">
              {editingContent ? "Edit Banner Content" : "Create Banner Content"}
            </DialogTitle>
            <DialogDescription>
              {editingContent ? "Edit details for this banner." : "Create a new banner for the landing page."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <Label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-foreground mb-2 block">
                Banner Image *
              </Label>
              <div className="space-y-3">
                {previewImage && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                    {previewImage.startsWith("data:") ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageWithFallback
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  {previewImage ? "Change Image" : "Upload Image"}
                </Button>
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-foreground mb-2 block">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter banner title"
                className="font-['Inter:Regular',sans-serif]"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-foreground mb-2 block">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter banner description"
                rows={3}
                className="font-['Inter:Regular',sans-serif]"
              />
            </div>

            {/* Order */}
            <div>
              <Label htmlFor="order" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-foreground mb-2 block">
                Display Order
              </Label>
              <Input
                id="order"
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="font-['Inter:Regular',sans-serif]"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <Label htmlFor="isActive" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[14px] text-foreground cursor-pointer">
                Active (Display on landing page)
              </Label>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              <Save className="w-4 h-4" />
              {editingContent ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}