import { useState } from "react";
import { Eye, Users, HelpCircle, Star, CheckSquare, Circle, List } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export function SurveyComponentsPreview() {
  const [selectedComponent, setSelectedComponent] = useState<"detail" | "audience" | "questions">("detail");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div 
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: 'var(--radius)', 
            backgroundColor: 'rgba(0, 133, 138, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Eye style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
        </div>
        <div>
          <h3 style={{ color: 'var(--foreground)' }}>Survey Components Preview</h3>
          <p className="caption" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
            Preview komponen-komponen yang digunakan dalam pembuatan survey
          </p>
        </div>
      </div>

      {/* Component Selector */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Button
          variant={selectedComponent === "detail" ? "default" : "ghost"}
          onClick={() => setSelectedComponent("detail")}
          style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          <HelpCircle style={{ width: '16px', height: '16px' }} />
          Survey Detail
        </Button>
        <Button
          variant={selectedComponent === "audience" ? "default" : "ghost"}
          onClick={() => setSelectedComponent("audience")}
          style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          <Users style={{ width: '16px', height: '16px' }} />
          Target Audience
        </Button>
        <Button
          variant={selectedComponent === "questions" ? "default" : "ghost"}
          onClick={() => setSelectedComponent("questions")}
          style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          <List style={{ width: '16px', height: '16px' }} />
          Questions & Answers
        </Button>
      </div>

      {/* Preview Content */}
      <div 
        style={{ 
          backgroundColor: 'var(--muted)', 
          borderRadius: 'var(--radius)', 
          padding: '32px',
          minHeight: '500px'
        }}
      >
        {selectedComponent === "detail" && <SurveyDetailPreview />}
        {selectedComponent === "audience" && <AudiencePreview />}
        {selectedComponent === "questions" && <QuestionsPreview />}
      </div>
    </div>
  );
}

function SurveyDetailPreview() {
  return (
    <div 
      style={{ 
        backgroundColor: 'var(--card)', 
        borderRadius: 'var(--radius)', 
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto',
        border: '1px solid var(--border)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ color: 'var(--foreground)', marginBottom: '8px' }}>Survey Detail</h3>
          <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
            Informasi dasar tentang survey yang akan dibuat
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Survey Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <Label>Judul Survey *</Label>
            <Input 
              placeholder="Contoh: Employee Engagement Q4 2024" 
              defaultValue="Employee Engagement Q4 2024"
            />
          </div>

          {/* Survey Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <Label>Deskripsi Survey</Label>
            <Textarea 
              placeholder="Jelaskan tujuan dan konteks survey ini..."
              defaultValue="Help us understand your experience and engagement at work. This survey will take approximately 5-7 minutes to complete."
              rows={4}
            />
          </div>

          {/* Survey Type and Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label>Tipe Survey *</Label>
              <select 
                style={{ 
                  padding: '8px 12px',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--foreground)',
                  fontFamily: 'Inter, sans-serif'
                }}
                defaultValue="engagement"
              >
                <option value="engagement">Engagement</option>
                <option value="feedback">Feedback</option>
                <option value="development">Development</option>
                <option value="performance">Performance</option>
                <option value="satisfaction">Satisfaction</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label>Status *</Label>
              <select 
                style={{ 
                  padding: '8px 12px',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--foreground)',
                  fontFamily: 'Inter, sans-serif'
                }}
                defaultValue="draft"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <Label>Deadline *</Label>
            <Input 
              type="date" 
              defaultValue="2026-01-31"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AudiencePreview() {
  const [selectedType, setSelectedType] = useState<"company" | "organization" | "employee">("company");

  return (
    <div 
      style={{ 
        backgroundColor: 'var(--card)', 
        borderRadius: 'var(--radius)', 
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto',
        border: '1px solid var(--border)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ color: 'var(--foreground)', marginBottom: '8px' }}>Target Audience</h3>
          <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
            Tentukan siapa yang akan menjadi target responden survey
          </p>
        </div>

        {/* Audience Type Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Label>Pilih Tipe Target *</Label>
          <RadioGroup value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <RadioGroupItem value="company" id="company" />
              <Label htmlFor="company" style={{ cursor: 'pointer', margin: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>Berdasarkan Company</span>
                  <span className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    Target seluruh pekerja di perusahaan tertentu
                  </span>
                </div>
              </Label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <RadioGroupItem value="organization" id="organization" />
              <Label htmlFor="organization" style={{ cursor: 'pointer', margin: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>Berdasarkan Organization/Department</span>
                  <span className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    Target pekerja di organisasi atau departemen tertentu (recursive)
                  </span>
                </div>
              </Label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <RadioGroupItem value="employee" id="employee" />
              <Label htmlFor="employee" style={{ cursor: 'pointer', margin: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>Pilih Employee Spesifik</span>
                  <span className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    Target pekerja tertentu secara manual
                  </span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Selection Preview */}
        <div 
          style={{ 
            padding: '16px', 
            backgroundColor: 'var(--muted)', 
            borderRadius: 'var(--radius)',
            border: '1px dashed var(--border)'
          }}
        >
          {selectedType === "company" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Label>Pilih Company *</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox id="injourney" defaultChecked />
                  <Label htmlFor="injourney" style={{ cursor: 'pointer', margin: 0 }}>
                    PT InJourney Platforms Indonesia
                  </Label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox id="subsidiary1" />
                  <Label htmlFor="subsidiary1" style={{ cursor: 'pointer', margin: 0 }}>
                    PT InJourney Technology
                  </Label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox id="subsidiary2" />
                  <Label htmlFor="subsidiary2" style={{ cursor: 'pointer', margin: 0 }}>
                    PT InJourney Solutions
                  </Label>
                </div>
              </div>
            </div>
          )}

          {selectedType === "organization" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Label>Pilih Organization/Department *</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox id="hc" defaultChecked />
                  <Label htmlFor="hc" style={{ cursor: 'pointer', margin: 0 }}>
                    Direktorat Human Capital (Recursive)
                  </Label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="hc-strategy" />
                    <Label htmlFor="hc-strategy" style={{ cursor: 'pointer', margin: 0 }}>
                      └─ HC Strategy
                    </Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="hc-operations" />
                    <Label htmlFor="hc-operations" style={{ cursor: 'pointer', margin: 0 }}>
                      └─ HC Operations
                    </Label>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox id="tech" />
                  <Label htmlFor="tech" style={{ cursor: 'pointer', margin: 0 }}>
                    Direktorat Technology
                  </Label>
                </div>
              </div>
              <p className="caption" style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                ℹ️ Recursive: Memilih parent organization akan otomatis include semua sub-organization di bawahnya
              </p>
            </div>
          )}

          {selectedType === "employee" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Label>Cari dan Pilih Employee</Label>
              <Input placeholder="Ketik nama atau email employee..." />
              <div 
                style={{ 
                  maxHeight: '200px', 
                  overflowY: 'auto', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px',
                  marginTop: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', backgroundColor: 'var(--card)', borderRadius: 'var(--radius)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="emp1" defaultChecked />
                    <Label htmlFor="emp1" style={{ cursor: 'pointer', margin: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span>Dimas Sayyid</span>
                        <span className="caption" style={{ color: 'var(--muted-foreground)' }}>dimas.sayyid@injourney.id</span>
                      </div>
                    </Label>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', backgroundColor: 'var(--card)', borderRadius: 'var(--radius)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="emp2" defaultChecked />
                    <Label htmlFor="emp2" style={{ cursor: 'pointer', margin: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span>Binavia Wardhani</span>
                        <span className="caption" style={{ color: 'var(--muted-foreground)' }}>binavia@injourney.co.id</span>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Target Summary */}
        <div 
          style={{ 
            padding: '16px', 
            backgroundColor: 'rgba(0, 133, 138, 0.05)', 
            borderRadius: 'var(--radius)',
            border: '1px solid var(--primary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
            <span className="caption" style={{ color: 'var(--foreground)' }}>
              <strong>Estimated Target:</strong> {selectedType === "employee" ? "2" : "500"} employees
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionsPreview() {
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("text");

  const questionTypes = [
    { value: "text", label: "Text Answer", icon: "📝", description: "Pertanyaan dengan jawaban bebas text" },
    { value: "single", label: "Single Choice", icon: "⭕", description: "Pilihan tunggal (radio button)" },
    { value: "multiple", label: "Multiple Choice", icon: "☑️", description: "Pilihan ganda (checkbox) dengan min/max selection" },
    { value: "likert", label: "Likert Scale", icon: "📊", description: "Skala penilaian yang dapat dikonfigurasi" },
    { value: "rating", label: "Star Rating", icon: "⭐", description: "Rating bintang (max 5 bintang)" },
  ];

  return (
    <div 
      style={{ 
        backgroundColor: 'var(--card)', 
        borderRadius: 'var(--radius)', 
        padding: '32px',
        maxWidth: '900px',
        margin: '0 auto',
        border: '1px solid var(--border)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ color: 'var(--foreground)', marginBottom: '8px' }}>Question Types & Answer Formats</h3>
          <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
            Berbagai tipe pertanyaan dan format jawaban yang tersedia
          </p>
        </div>

        {/* Question Type Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Label>Pilih Tipe Pertanyaan</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {questionTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedQuestionType(type.value)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius)',
                  border: selectedQuestionType === type.value ? '2px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: selectedQuestionType === type.value ? 'rgba(0, 133, 138, 0.05)' : 'var(--background)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{type.icon}</span>
                    <span style={{ fontWeight: 600, color: 'var(--foreground)', fontSize: 'var(--text-sm)' }}>{type.label}</span>
                  </div>
                  <span className="caption" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>
                    {type.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Question Preview */}
        <div 
          style={{ 
            padding: '24px', 
            backgroundColor: 'var(--muted)', 
            borderRadius: 'var(--radius)',
            border: '1px dashed var(--border)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label style={{ marginBottom: '4px', display: 'block' }}>Preview</Label>
              <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                Contoh pertanyaan dengan tipe jawaban yang dipilih
              </p>
            </div>

            {selectedQuestionType === "text" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Label>Apa yang paling Anda sukai dari bekerja di perusahaan ini?</Label>
                <Textarea 
                  placeholder="Ketik jawaban Anda di sini..."
                  rows={4}
                  disabled
                />
              </div>
            )}

            {selectedQuestionType === "single" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Label>Seberapa sering Anda merasa termotivasi di tempat kerja?</Label>
                <RadioGroup disabled>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RadioGroupItem value="always" id="always" />
                    <Label htmlFor="always" style={{ cursor: 'pointer', margin: 0 }}>Selalu</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RadioGroupItem value="often" id="often" />
                    <Label htmlFor="often" style={{ cursor: 'pointer', margin: 0 }}>Sering</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RadioGroupItem value="sometimes" id="sometimes" />
                    <Label htmlFor="sometimes" style={{ cursor: 'pointer', margin: 0 }}>Kadang-kadang</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RadioGroupItem value="rarely" id="rarely" />
                    <Label htmlFor="rarely" style={{ cursor: 'pointer', margin: 0 }}>Jarang</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RadioGroupItem value="never" id="never" />
                    <Label htmlFor="never" style={{ cursor: 'pointer', margin: 0 }}>Tidak Pernah</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {selectedQuestionType === "multiple" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Label>Benefit apa saja yang paling penting bagi Anda? (Pilih 2-3 jawaban)</Label>
                  <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    Min: 2 pilihan | Max: 3 pilihan
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="health" disabled />
                    <Label htmlFor="health" style={{ margin: 0 }}>Asuransi Kesehatan</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="bonus" disabled />
                    <Label htmlFor="bonus" style={{ margin: 0 }}>Bonus Performa</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="wfh" disabled />
                    <Label htmlFor="wfh" style={{ margin: 0 }}>Work From Home Flexibility</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="training" disabled />
                    <Label htmlFor="training" style={{ margin: 0 }}>Program Pelatihan & Development</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox id="leave" disabled />
                    <Label htmlFor="leave" style={{ margin: 0 }}>Cuti Tambahan</Label>
                  </div>
                </div>
              </div>
            )}

            {selectedQuestionType === "likert" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Label>Saya merasa dihargai oleh atasan saya</Label>
                  <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    Skala: 1 (Sangat Tidak Setuju) - 5 (Sangat Setuju)
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      disabled
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: '2px solid var(--border)',
                        backgroundColor: 'var(--background)',
                        cursor: 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        color: 'var(--muted-foreground)',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="caption" style={{ color: 'var(--muted-foreground)' }}>Sangat Tidak Setuju</span>
                  <span className="caption" style={{ color: 'var(--muted-foreground)' }}>Sangat Setuju</span>
                </div>
              </div>
            )}

            {selectedQuestionType === "rating" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Label>Berikan rating untuk lingkungan kerja Anda</Label>
                  <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
                    Rating: 1-5 bintang
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      style={{
                        width: '32px',
                        height: '32px',
                        color: 'var(--muted-foreground)',
                        fill: 'none',
                        cursor: 'not-allowed'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Note */}
        <div 
          style={{ 
            padding: '16px', 
            backgroundColor: 'rgba(0, 133, 138, 0.05)', 
            borderRadius: 'var(--radius)',
            border: '1px solid var(--primary)'
          }}
        >
          <p className="caption" style={{ color: 'var(--foreground)' }}>
            <strong>ℹ️ Catatan:</strong> Setiap tipe pertanyaan dapat dikonfigurasi lebih lanjut saat membuat survey, termasuk pengaturan required/optional, validasi, dan custom options.
          </p>
        </div>
      </div>
    </div>
  );
}
