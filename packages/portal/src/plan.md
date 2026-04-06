# MyProfile Implementation Plan

## Design System Rules (CRITICAL)
- **Typography**: Use ONLY 'Inter' font from globals.css via semantic HTML or `var(--text-*)` variables
- **Colors**: Use ONLY CSS variables: `var(--primary)`, `var(--muted-foreground)`, `var(--border)`, etc.
- **NO** hardcoded fonts, colors, or arbitrary spacing values

---

## Tab Structure Update

### Current (3 tabs):
- Perorangan
- Lainnya  
- Organisasi

### New (8 tabs):
1. **Data Pribadi** - `employee_profile`, `employee_identification`, `employee_address`, `employee_family_member`, `employee_medical_*`, `employee_social_media`
2. **Pendidikan** - `employee_education_history`, `employee_language_skill`
3. **Pembelajaran** - `learning_history`
4. **Riwayat Pekerjaan** - `employee_position_history`, `employee_secondary_assignment`, `employee_assignment_history`
5. **Informasi Kepegawaian** - `employee_leave_history`, `employee_disciplinary_history`, `employee_contract`
6. **Kualifikasi** - `competency_assessment`, `learning_agility_assessment`
7. **Insights** - `career_aspiration`, `eqs_score`, `nine_box_classification`, `talent_pool`, `calibration_result`
8. **Kontribusi** - `employee_organization_membership`, `employee_achievement`

---

## Implementation Tasks

### 1. Update Sidebar Navigation
- [x] Change navigation items from 3 to 8 tabs
- [x] Add appropriate icons (User, GraduationCap, BookOpen, Briefcase, FileCheck, Award, TrendingUp, Trophy)
- [x] Keep existing styling/layout

### 2. Create Tab Content Components
Explore new component structures for each data section. Keep existing design patterns.

**Tab 1: Data Pribadi**
- [ ] Sections: Identitas, Kontak, Alamat, Keluarga, Medis, Social Media
- [ ] Tier overrides: alias, religion, phone, email → Tier 3 (editable)

**Tab 2: Pendidikan**
- [ ] Riwayat Pendidikan Formal (Tier 1 - read-only)
- [ ] Kemampuan Bahasa (Tier 2 - request change)

**Tab 3: Pembelajaran**
- [ ] Learning history cards (Tier 1 - read-only)

**Tab 4: Riwayat Pekerjaan**
- [ ] Position history, secondary assignments, assignment history (all Tier 1)

**Tab 5: Informasi Kepegawaian**
- [ ] Contract info, leave history, disciplinary history (all Tier 1)

**Tab 6: Kualifikasi**
- [ ] Competency assessment, learning agility (Tier 1)

**Tab 7: Insights**
- [ ] Career aspiration, EQS, Nine Box, Talent Pool, Calibration (all Tier 4 with purple badge)

**Tab 8: Kontribusi**
- [ ] Organization membership (Tier 3 - editable)
- [ ] Achievements (Tier 2 - request change)

### 3. Maintain Existing Features
- [ ] Keep sync functionality
- [ ] Keep download CV
- [ ] Keep edit/request modals
- [ ] Keep existing layout & styling patterns

---

## Notes
- **DON'T** change overall layout/design
- **DO** reuse existing components (InfoGroup, ItemCard, SectionHeader)
- **DO** explore creating new section-specific components where helpful
- All UI must use design system CSS variables
