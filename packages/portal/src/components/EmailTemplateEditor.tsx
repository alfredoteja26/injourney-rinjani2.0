import React, { useState, useRef } from "react";
import { X, Save, Upload, Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, Mail, AlignLeft, AlignCenter, AlignRight, Underline, ListOrdered } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface EmailTemplate {
  id?: string;
  name: string;
  subject: string;
  logo: string;
  header: string;
  body: string;
  footer: string;
  createdAt?: string;
  updatedAt?: string;
}

interface EmailTemplateEditorProps {
  template?: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onCancel: () => void;
}

// Rich Text Editor Toolbar Component
function TextEditorToolbar({ onFormat, textareaRef }: { onFormat: (format: string) => void; textareaRef: React.RefObject<HTMLTextAreaElement> }) {
  const applyFormat = (format: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    let newText = '';
    let newCursorPos = start;
    
    switch (format) {
      case 'bold':
        newText = `${beforeText}**${selectedText}**${afterText}`;
        newCursorPos = selectedText ? end + 4 : start + 2;
        break;
      case 'italic':
        newText = `${beforeText}*${selectedText}*${afterText}`;
        newCursorPos = selectedText ? end + 2 : start + 1;
        break;
      case 'underline':
        newText = `${beforeText}<u>${selectedText}</u>${afterText}`;
        newCursorPos = selectedText ? end + 7 : start + 3;
        break;
      case 'ul':
        const ulText = selectedText || 'List item';
        newText = `${beforeText}\n• ${ulText}${afterText}`;
        newCursorPos = start + ulText.length + 3;
        break;
      case 'ol':
        const olText = selectedText || 'List item';
        newText = `${beforeText}\n1. ${olText}${afterText}`;
        newCursorPos = start + olText.length + 4;
        break;
      default:
        return;
    }
    
    // Update the textarea value
    textarea.value = newText;
    
    // Trigger the onChange event manually
    const event = new Event('input', { bubbles: true });
    textarea.dispatchEvent(event);
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
    
    onFormat(format);
  };

  return (
    <div className="flex items-center gap-1 p-2 bg-muted/30 border border-[#c4c4c4] rounded-t-md">
      <button
        type="button"
        onClick={() => applyFormat("bold")}
        className="p-1.5 hover:bg-muted rounded"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => applyFormat("italic")}
        className="p-1.5 hover:bg-muted rounded"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => applyFormat("underline")}
        className="p-1.5 hover:bg-muted rounded"
        title="Underline"
      >
        <Underline className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-border mx-1" />
      <button
        type="button"
        onClick={() => applyFormat("alignLeft")}
        className="p-1.5 hover:bg-muted rounded"
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => applyFormat("alignCenter")}
        className="p-1.5 hover:bg-muted rounded"
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => applyFormat("alignRight")}
        className="p-1.5 hover:bg-muted rounded"
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-border mx-1" />
      <button
        type="button"
        onClick={() => applyFormat("ul")}
        className="p-1.5 hover:bg-muted rounded"
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => applyFormat("ol")}
        className="p-1.5 hover:bg-muted rounded"
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
    </div>
  );
}

export function EmailTemplateEditor({ template, onSave, onCancel }: EmailTemplateEditorProps) {
  const [formData, setFormData] = useState<EmailTemplate>({
    id: template?.id,
    name: template?.name || "",
    subject: template?.subject || "",
    logo: template?.logo || "",
    header: template?.header || "",
    body: template?.body || "",
    footer: template?.footer || "",
  });

  // Create refs for each textarea
  const headerRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const footerRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="font-semibold text-foreground" style={{ fontSize: "var(--text-2xl)" }}>
              {template ? "Edit Template Email" : "Buat Template Email Baru"}
            </h2>
            <p className="text-muted-foreground mt-1" style={{ fontSize: "var(--text-sm)" }}>
              Buat dan kelola template email untuk berbagai keperluan
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={handleSubmit}>
              <Save className="w-4 h-4 mr-2" />
              Simpan Template
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Batal
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex">
        {/* Left Side - Editor (1/3) */}
        <div className="w-1/3 border-r border-border bg-card min-h-screen">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Template Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama Template</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Welcome Email"
                required
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Email</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Contoh: Selamat Datang di Perusahaan"
                required
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Perusahaan</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("logo")?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
              {formData.logo && (
                <div className="mt-2 p-2 border border-border rounded-md bg-background">
                  <img src={formData.logo} alt="Logo Preview" className="h-12 object-contain" />
                </div>
              )}
            </div>

            {/* Title (Header) with Text Editor */}
            <div className="space-y-2">
              <Label htmlFor="header">Title*</Label>
              <p className="text-xs text-muted-foreground mb-1">
                Teks Judul Email
              </p>
              <div>
                <TextEditorToolbar onFormat={(format) => console.log(format)} textareaRef={headerRef} />
                <Textarea
                  ref={headerRef}
                  id="header"
                  value={formData.header}
                  onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                  placeholder="Congratulations, you are invited to [stages] stages 🎉 !"
                  rows={3}
                  className="rounded-t-none border-t-0"
                  style={{ borderColor: '#c4c4c4' }}
                />
              </div>
            </div>

            {/* Body with Text Editor */}
            <div className="space-y-2">
              <Label htmlFor="body">Body text*</Label>
              <p className="text-xs text-muted-foreground mb-1">
                Isi Konten Email
              </p>
              <div>
                <TextEditorToolbar onFormat={(format) => console.log(format)} textareaRef={bodyRef} />
                <Textarea
                  ref={bodyRef}
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Dear [candidate_name],&#10;&#10;Congratulations on advancing to the interview stage!..."
                  rows={10}
                  required
                  className="rounded-t-none border-t-0"
                  style={{ borderColor: '#c4c4c4' }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Gunakan [candidate_name], [company], [job_position], dll untuk personalisasi
              </p>
            </div>

            {/* Footer with Text Editor */}
            <div className="space-y-2">
              <Label htmlFor="footer">Footer*</Label>
              <p className="text-xs text-muted-foreground mb-1">
                Teks Footer Email
              </p>
              <div>
                <TextEditorToolbar onFormat={(format) => console.log(format)} textareaRef={footerRef} />
                <Textarea
                  ref={footerRef}
                  id="footer"
                  value={formData.footer}
                  onChange={(e) => setFormData({ ...formData, footer: e.target.value })}
                  placeholder="PT Aviani Pariwisata Indonesia&#10;(Present)&#10;&#10;Gedung Samali Lantai 14 & 16..."
                  rows={4}
                  className="rounded-t-none border-t-0"
                  style={{ borderColor: '#c4c4c4' }}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Side - Preview (2/3) */}
        <div className="w-2/3 bg-muted/20 min-h-screen">
          <div className="p-8">
            <div className="max-w-[700px] mx-auto">
              {/* Preview Label */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground" style={{ fontSize: "var(--text-lg)" }}>
                  Preview Email
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: "var(--text-sm)" }}>
                  Tampilan email yang akan diterima penerima
                </p>
              </div>

              {/* Email Container - Clean Professional Style */}
              <div className="bg-background shadow-lg border border-border overflow-hidden flex flex-col" style={{ minHeight: "800px" }}>
                {/* Email Body - Clean Style */}
                <div className="bg-background flex-1">
                  <div className="px-12 py-10">
                    {/* Logo Section - Centered at Top */}
                    {formData.logo && (
                      <div className="flex justify-center mb-8">
                        <img src={formData.logo} alt="Logo" className="h-16 object-contain" />
                      </div>
                    )}

                    {/* Header/Title Section */}
                    {formData.header && (
                      <div className="mb-6">
                        <h1
                          className="font-semibold text-foreground"
                          style={{ fontSize: "var(--text-2xl)", lineHeight: "1.3" }}
                        >
                          {formData.header}
                        </h1>
                      </div>
                    )}

                    {/* Body Section */}
                    <div className="mb-8">
                      <div
                        className="whitespace-pre-wrap text-foreground"
                        style={{
                          fontSize: "var(--text-base)",
                          lineHeight: "1.7"
                        }}
                      >
                        {formData.body || (
                          <p className="text-muted-foreground italic">
                            Isi email akan muncul di sini. Mulai mengetik di panel editor untuk melihat preview.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Section - Stick to Bottom with Different Background */}
                {formData.footer && (
                  <div className="bg-muted/50 border-t border-border px-12 py-8 mt-auto">
                    <div className="flex items-start justify-between gap-8">
                      {/* Footer Text */}
                      <div className="flex-1">
                        <div
                          className="whitespace-pre-wrap text-foreground"
                          style={{ fontSize: "var(--text-sm)", lineHeight: "1.6" }}
                        >
                          {formData.footer}
                        </div>
                      </div>

                      {/* Logo Only */}
                      {formData.logo && (
                        <div className="flex flex-col items-end">
                          <img src={formData.logo} alt="Logo" className="h-10 object-contain opacity-80" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}