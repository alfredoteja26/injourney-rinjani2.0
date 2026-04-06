# My Team - Screen Design

## Dashboard Screen

### Context References

- Section Spec: [My Team - Section Spec](https://www.notion.so/My-Team-Section-Spec-28dc23a9adbd4f0e901511a52b7557ad?pvs=21)
    - Requirements applied:
        - Position Selector for Line Managers with multiple assignments (Definitif, Project Assignment, Talent Mobility)
        - Summary cards for 4 action categories: IDP Pending Approval, Aspiration Pending Review, 360 Assessment Pending, Team Members Flagged
        - Clickable cards expand to show detail list with deep links to source modules
        - Action Backlog as chronological list of all outstanding items with filter/sort
        - Empty state when no subordinates exist on selected position
    - Constraints applied:
        - Position Selector hidden if only 1 assignment
        - Default selection always Posisi Definitif
        - My Team is entry point/summary only; operational actions via deep links
        - Pagination for backlog > 10 items
    - View coverage: UC-MT-001, UC-MT-002, UC-MT-003, UC-MT-009
- Data Model: [Rinjani Talent - Data Model](https://www.notion.so/Rinjani-Talent-Data-Model-c9438ffdd61f4dadb0cb9eb5fdde3175?pvs=21)
    - Entities used: Employee, IDPRecord, CareerAspiration, AssessorAssignment, TalentPoolCandidate
    - Fields used: [Employee.name](http://Employee.name), Employee.position_title, [Employee.is](http://Employee.is)_flagged, Employee.flag_reason, IDPRecord.status, CareerAspiration.pending_review_count, AssessorAssignment.status, AssessorAssignment.deadline
    - Relationships applied: Line Manager to Employee via ReportingLine filtered by position context; action items derived from IDP, aspiration, assessment, and flag data
- Sample Data: [My Team - Sample Data](https://www.notion.so/My-Team-Sample-Data-4f00e2f56b0c41058681cd956c3f4b00?pvs=21)
    - Example values used:
        - Assignments: "VP Human Capital Business Partner" (Definitif, 8 subordinates), "Project Lead - Rinjani 2.0 Migration" (Project Assignment, 4), "Acting GM HC - PT ILCS" (Talent Mobility, 3)
        - Action counts: IDP Pending Approval = 2, Aspiration Pending Review = 2, Assessment Pending = 3, Flagged = 3
        - Backlog items: 10 items with mixed urgency (high, medium, normal)
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Quickly identify pending actions across all talent management areas for direct reports and take action through deep links
- Success criteria: User can see total pending actions per category at a glance, drill into details, and navigate to source modules within 2 clicks
- Key constraints: Data scoped to selected position context; all actions are read-only summaries with deep links (no inline operations)

### 2) Layout Regions

- Header: Position Selector (conditional) + page title
- Controls Area: None for Action Required; filter + sort for Backlog section
- Main Content: Summary cards (top) + expanded detail list (middle) + Backlog (bottom)
- Secondary Panel: None
- Primary Actions: None (entry point/summary only)
- Secondary Actions: None

### 3) Component Tree

- Screen Container
    - Position Selector Region (conditional: hidden if assignment_count = 1)
        - Selector Component
            - Selected Assignment Display
                - Field: Position Title
                    - Data Source: assignments[selected].position_title
                    - Format Rule: text, medium weight
                    - Null Handling: never null
                - Field: Assignment Type Badge
                    - Data Source: assignments[selected].label
                    - Format Rule: badge; "Definitif" = primary, "Project Assignment" / "Talent Mobility" = secondary
                    - Null Handling: never null
                - Field: Subordinate Count
                    - Data Source: assignments[selected].subordinate_count
                    - Format Rule: text, muted; e.g. "8 bawahan langsung"
                    - Null Handling: show "0 bawahan langsung"
            - Assignment Dropdown (on click)
                - List of assignments; each showing position_title + label badge + subordinate_count
                - Current selection highlighted
                - Switching triggers full data refresh across all tabs
    - Tab Navigation Region
        - Segmented Control: Dashboard | Team Profile | Team Insights
        - Active tab: Dashboard (default on first load)
    - Action Required Region
        - Section Title: "Action Required"
        - Summary Cards Row (horizontal, 4 cards)
            - Card: IDP Pending Approval
                - Field: Count
                    - Data Source: actionItems.idp_pending_approval.count
                    - Format Rule: large metric; emphasis if > 0
                    - Null Handling: show "0"
                - Field: Label
                    - Format Rule: text; "IDP Pending Approval"
                - Field: Icon
                    - Format Rule: contextual icon for IDP
                - Interaction: clickable; expands detail list below
            - Card: Aspiration Pending Review
                - Field: Count
                    - Data Source: actionItems.aspiration_pending_review.count
                    - Format Rule: large metric; emphasis if > 0
                    - Null Handling: show "0"
                - Field: Label
                    - Format Rule: text; "Aspiration Pending Review"
                - Interaction: clickable; expands detail list below
            - Card: 360 Assessment Pending
                - Field: Count
                    - Data Source: actionItems.assessment_pending.count
                    - Format Rule: large metric; emphasis if > 0
                    - Null Handling: show "0"
                - Field: Label
                    - Format Rule: text; "360 Assessment Pending"
                - Interaction: clickable; expands detail list below
            - Card: Team Members Flagged
                - Field: Count
                    - Data Source: [actionItems.team](http://actionItems.team)_members_flagged.count
                    - Format Rule: large metric; destructive emphasis if > 0
                    - Null Handling: show "0"
                - Field: Label
                    - Format Rule: text; "Team Members Flagged"
                - Interaction: clickable; expands detail list below
        - All-Zero Message (conditional: shown when all counts = 0)
            - Message: "Tidak ada action item yang tertunda"
            - Format Rule: muted text, centered
        - Expanded Detail List (conditional: shown when a card is clicked)
            - List Header: selected category name + count
            - List Items
                - Field: Employee Name
                    - Data Source: actionItems.[category].items[].employee_name
                    - Format Rule: text, medium weight
                - Field: Description
                    - Data Source: actionItems.[category].items[].description
                    - Format Rule: text, muted; truncate at 80 chars
                - Field: Date
                    - Data Source: actionItems.[category].items[].submitted_at or .deadline
                    - Format Rule: relative time (e.g. "3 hari lalu") or date if deadline
                - Field: Urgency Indicator
                    - Data Source: actionItems.[category].items[].urgency
                    - Format Rule: badge; "high" = destructive, "medium" = secondary, "normal" = muted
                    - Null Handling: hide indicator
                - Item Action: click row navigates to deep_link
    - Action Backlog Region
        - Section Title: "Backlog"
        - Controls Row
            - Filter: Type - type: multi-select - options: IDP, Aspiration, Assessment, Flagged
            - Sort: Dropdown - options: Terbaru (default), Terlama, Urgency
        - Backlog List
            - Content Presentation: List
            - Item Structure
                - Field: Type Badge
                    - Data Source: backlogItems[].type
                    - Format Rule: badge; "idp_pending_approval" = "IDP", "aspiration_pending_review" = "Aspirasi", "assessment_pending" = "Assessment", "team_members_flagged" = "Flag"
                - Field: Employee Name
                    - Data Source: backlogItems[].employee_name
                    - Format Rule: text, medium weight
                - Field: Description
                    - Data Source: backlogItems[].description
                    - Format Rule: text, single line, truncate at 80 chars
                - Field: Date
                    - Data Source: backlogItems[].created_at
                    - Format Rule: relative time
                - Field: Deadline (conditional)
                    - Data Source: backlogItems[].deadline
                    - Format Rule: date; destructive if past deadline
                    - Null Handling: hide field
                - Field: Urgency
                    - Data Source: backlogItems[].urgency
                    - Format Rule: badge; "high" = destructive, "medium" = secondary, "normal" = muted
            - Item Actions
                - Action: Navigate to source - when: always - result: open deep_link
        - Pagination (conditional: shown if items > 10)
            - Format: "Menampilkan 1-10 dari X item" + next/prev controls

### 4) Data Requirements (Abstract Contract)

**Entities Needed**

- assignments
    - Required fields: id, position_id, position_title, assignment_type, label, subordinate_count, is_primary
    - Optional fields: effective_from, effective_to
    - Derived fields: none
- actionItems
    - Required fields: category counts (idp_pending_approval.count, aspiration_pending_review.count, assessment_pending.count, team_members_flagged.count)
    - Optional fields: items detail arrays
    - Derived fields: total_actions (sum of all counts)
- backlogItems
    - Required fields: id, type, employee_name, description, created_at, urgency, deep_link
    - Optional fields: deadline
    - Derived fields: is_overdue (deadline < now)

**Sorting / Filtering Requirements**

- Default sort: backlogItems by created_at descending (terbaru)
- Filter definitions:
    - Type filter -> backlogItems.type
    - Sort options -> created_at asc/desc, urgency priority

### 5) Interaction States

- Default (Idle): Position Selector shows Definitif; all 4 summary cards visible with current counts; backlog list loaded
- Loading: Skeleton for 4 summary cards + 5 backlog item placeholders; Position Selector disabled
- Empty (No Subordinates - UC-MT-009):
    - Trigger condition: assignments[selected].subordinate_count = 0
    - Message: "Tidak ada bawahan langsung pada posisi ini"
    - Secondary Message (conditional): "Coba pilih posisi lain" (shown if other assignments have subordinates)
    - Primary CTA: none
- Empty (No Backlog Items):
    - Trigger condition: backlogItems.length = 0 after filter
    - Message: "Tidak ada item backlog yang sesuai filter"
    - Primary CTA: "Reset Filter"
- Error:
    - Trigger condition: API failure
    - Message: "Gagal memuat data dashboard. Silakan coba lagi."
    - Recovery action: Retry button

### 6) Responsive Behavior

- Mobile (sm): Summary cards stack 2x2 grid; backlog list full-width; Position Selector as full-width dropdown
- Tablet (md): Summary cards in single row (4 across); backlog list full-width
- Desktop (lg+): Summary cards in single row; backlog with comfortable spacing

### 7) Accessibility and Usability Notes

- Focus order: Position Selector -> Tab Navigation -> Summary Cards (left to right) -> Expanded Detail List -> Backlog Controls -> Backlog Items
- Keyboard interactions: Enter on summary card toggles detail list; Enter on backlog item navigates to deep link; Escape closes expanded detail list
- Labels and helper text: Each summary card has aria-label with category + count; urgency badges have text alternatives

---

## Team Profile Screen

### Context References

- Section Spec: [My Team - Section Spec](https://www.notion.so/My-Team-Section-Spec-28dc23a9adbd4f0e901511a52b7557ad?pvs=21)
    - Requirements applied:
        - Roster of direct reports as searchable, sortable table/list
        - 9-Box Distribution mini grid with interactive cell filtering
        - EQS Summary with band distribution and combined AND filter with 9-Box
        - Click subordinate row to open detail panel
        - 9-Box uses latest published classification; EQS references subordinate's definitive position
    - Constraints applied:
        - Subordinates without 9-Box classification excluded from grid but shown in roster
        - Subordinates without EQS shown as "Belum Dihitung" category
        - 9-Box and EQS filters combinable (AND logic)
    - View coverage: UC-MT-004, UC-MT-005, UC-MT-006
- Data Model: [Rinjani Talent - Data Model](https://www.notion.so/Rinjani-Talent-Data-Model-c9438ffdd61f4dadb0cb9eb5fdde3175?pvs=21)
    - Entities used: Employee, TalentPoolCandidate, EQSScore
    - Fields used: [Employee.name](http://Employee.name), Employee.position_title, Employee.grade_jabatan, [Employee.band](http://Employee.band)_jabatan, [Employee.photo](http://Employee.photo)_url, Employee.hire_date, TalentPoolCandidate.talent_cluster, [EQSScore.total](http://EQSScore.total)_score, EQSScore.eqs_band
    - Relationships applied: Employee -> TalentPoolCandidate (latest period); Employee -> EQSScore (filtered by target_position_id = definitive position)
- Sample Data: [My Team - Sample Data](https://www.notion.so/My-Team-Sample-Data-4f00e2f56b0c41058681cd956c3f4b00?pvs=21)
    - Example values used:
        - Subordinates: 8 total; 7 classified in 9-Box, 1 unclassified (Putri Wulandari)
        - 9-Box distribution: HP=1, Promotable=2, Solid Contributor=2, Sleeping Tiger=1, Unfit=1
        - EQS range: 45.10 (Hendra Wijaya) to 88.75 (Siti Nurhaliza Putri); 1 not calculated
        - EQS bands: Highly Qualified=1, Qualified=4, Needs Development=1, Not Recommended=1
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Understand team composition and talent status at individual and aggregate levels; quickly filter by 9-Box cluster or EQS band
- Success criteria: User can see distribution of team across 9-Box and EQS, find specific subordinates, and drill into individual profiles
- Key constraints: 9-Box grid and EQS band filters work as combined AND filter on roster; unclassified subordinates always visible in roster

### 2) Layout Regions

- Header: Shared Position Selector (persists from Dashboard) + Tab Navigation (Team Profile active)
- Controls Area: Search input + sort dropdown for roster
- Main Content: Distribution panels (9-Box grid + EQS summary) at top; roster table below
- Secondary Panel: Subordinate Detail (opens on row click; see separate screen)
- Primary Actions: None
- Secondary Actions: None

### 3) Component Tree

- Screen Container
    - Position Selector Region (shared; same as Dashboard)
    - Tab Navigation Region (Team Profile active)
    - Distribution Panel Region
        - 9-Box Distribution Section (UC-MT-005)
            - Section Title: "Distribusi 9-Box"
            - 9-Box Mini Grid (3x3)
                - Grid Layout: 3 columns (Low / Medium / High Performance) x 3 rows (High / Medium / Low Potential)
                - Cell Structure (per cell)
                    - Field: Count
                        - Data Source: derived from talentPoolCandidates grouped by 9-box cell
                        - Format Rule: large metric centered
                        - Null Handling: show "0"
                    - Field: Cell Label (tooltip)
                        - Format Rule: 9-box cell name on hover
                    - Interaction: click toggles filter on roster; active cell highlighted; re-click removes filter
                - Cluster Labels (below or beside grid)
                    - High Potential, Promotable, Solid Contributor, Sleeping Tiger, Unfit
                - Unclassified Indicator
                    - Field: Unclassified Count
                        - Data Source: subordinates where talent_cluster = null
                        - Format Rule: muted text; "1 belum terklasifikasi"
                        - Null Handling: hide if 0
        - EQS Summary Section (UC-MT-006)
            - Section Title: "Distribusi EQS"
            - Band Distribution Bars
                - Band: Highly Qualified (>= 85)
                    - Field: Count + Percentage
                        - Data Source: teamInsights.eqs_[distribution.by](http://distribution.by)_band.highly_qualified
                        - Format Rule: horizontal bar + "1 (14.3%)"
                    - Interaction: click toggles filter on roster
                - Band: Qualified (70-84)
                    - Field: Count + Percentage
                        - Data Source: teamInsights.eqs_[distribution.by](http://distribution.by)_band.qualified
                        - Format Rule: horizontal bar + "4 (57.1%)"
                    - Interaction: click toggles filter on roster
                - Band: Needs Development (50-69)
                    - Field: Count + Percentage
                        - Data Source: teamInsights.eqs_[distribution.by](http://distribution.by)_band.needs_development
                        - Format Rule: horizontal bar + "1 (14.3%)"
                    - Interaction: click toggles filter on roster
                - Band: Not Recommended (< 50)
                    - Field: Count + Percentage
                        - Data Source: teamInsights.eqs_[distribution.by](http://distribution.by)_band.not_recommended
                        - Format Rule: horizontal bar, destructive emphasis + "1 (14.3%)"
                    - Interaction: click toggles filter on roster
                - Band: Belum Dihitung
                    - Field: Count
                        - Data Source: teamInsights.eqs_distribution.not_calculated_count
                        - Format Rule: muted text; "1 belum dihitung"
                        - Null Handling: hide if 0
                    - Interaction: click toggles filter on roster
            - Active Filter Indicator
                - Format Rule: chip/tag showing active filters; "9-Box: Promotable AND EQS: Qualified"
                - Clear All action to remove all filters
    - Roster Region (UC-MT-004)
        - Controls Row
            - Search Input: placeholder "Cari berdasarkan nama..."
                - Behavior: real-time filter (filter saat mengetik)
            - Sort Dropdown: options: Nama A-Z (default), Grade, EQS Score, 9-Box Cluster
        - Content Presentation: Table
        - Table Structure
            - Column: Foto
                - Data Source: subordinates[].photo_url
                - Format Rule: avatar circle, 32px
                - Null Handling: show initials
            - Column: Nama
                - Data Source: subordinates[].name
                - Format Rule: text, medium weight
                - Null Handling: never null
            - Column: Posisi
                - Data Source: subordinates[].position_title
                - Format Rule: text, muted
                - Null Handling: never null
            - Column: Grade / Band
                - Data Source: subordinates[].grade_jabatan + subordinates[].band_jabatan
                - Format Rule: text; e.g. "19 / DH"
                - Null Handling: show "-"
            - Column: 9-Box
                - Data Source: subordinates[].talent_cluster
                - Format Rule: badge with cluster label; "High Potential" = primary, "Promotable" = accent, "Solid Contributor" = muted, "Sleeping Tiger" = secondary, "Unfit" = destructive
                - Null Handling: show "Belum tersedia" muted text
            - Column: EQS Score
                - Data Source: subordinates[].eqs_score
                - Format Rule: number with 2 decimals + band badge; Highly Qualified = primary, Qualified = accent, Needs Development = secondary, Not Recommended = destructive
                - Null Handling: show "Belum tersedia" muted text
            - Column: Talent Pool
                - Data Source: subordinates[].talent_pool_status
                - Format Rule: badge; "active" = accent, null = muted
                - Null Handling: show "-"
            - Column: Flag
                - Data Source: subordinates[].is_flagged + subordinates[].flag_reason
                - Format Rule: icon + tooltip; "flight_risk" = secondary icon, "underperforming" = secondary icon, "at_risk" = destructive icon
                - Null Handling: hide (no icon)
        - Item Actions
            - Action: View Detail - when: always - result: open Subordinate Detail panel
        - Results Summary
            - Format: "Menampilkan X dari Y bawahan" (reflects active filters)

### 4) Data Requirements (Abstract Contract)

**Entities Needed**

- subordinates
    - Required fields: employee_id, name, photo_url, position_title, grade_jabatan, band_jabatan, talent_cluster, eqs_score, eqs_band, talent_pool_status, is_flagged, flag_reason
    - Optional fields: hire_date, definitive_position_id, risk_profile
    - Derived fields: cluster_label (mapped from talent_cluster enum to display label)
- talentPoolCandidates
    - Required fields: employee_id, talent_cluster
    - Derived fields: nine_box_cell (mapped from talent_cluster to grid position)
- teamInsights.eqs_distribution
    - Required fields: by_band counts, not_calculated_count
    - Derived fields: percentages (count / calculated_count * 100)

**Sorting / Filtering Requirements**

- Default sort: name ascending (A-Z)
- Filter definitions:
    - 9-Box cell filter -> talentPoolCandidates.talent_cluster mapped to cell
    - EQS band filter -> eqsScores.eqs_band
    - Search filter -> [subordinates.name](http://subordinates.name) (case-insensitive substring match)
    - Filters combine with AND logic

### 5) Interaction States

- Default (Idle): Distribution panels visible with current data; roster shows all subordinates; no filters active
- Loading: Skeleton for 9-Box grid (3x3) + 4 EQS band bars + 5 roster row placeholders
- Empty (No Subordinates):
    - Trigger condition: subordinates.length = 0
    - Message: "Tidak ada bawahan langsung pada posisi ini"
    - Secondary Message: "Coba pilih posisi lain" (conditional)
- Empty (Filter yields no results):
    - Trigger condition: filtered roster = 0 results
    - Message: "Tidak ada bawahan yang sesuai dengan filter"
    - Primary CTA: "Reset Filter"
- Error:
    - Trigger condition: API failure
    - Message: "Gagal memuat data profil tim. Silakan coba lagi."
    - Recovery action: Retry button

### 6) Responsive Behavior

- Mobile (sm): Distribution panels stack vertically (9-Box grid above EQS summary); 9-Box grid 3x3 with horizontal scroll if needed; roster switches to card view (one card per subordinate)
- Tablet (md): Distribution panels side by side (9-Box left, EQS right); roster as table with horizontal scroll
- Desktop (lg+): Distribution panels side by side; full roster table visible

### 7) Accessibility and Usability Notes

- Focus order: Position Selector -> Tab Navigation -> 9-Box Grid (cell by cell, left-to-right top-to-bottom) -> EQS Band Bars (top to bottom) -> Search Input -> Sort Dropdown -> Roster Rows (top to bottom)
- Keyboard interactions: Enter on 9-Box cell toggles filter; Enter on EQS band toggles filter; Enter on roster row opens Subordinate Detail; Escape clears all filters
- Labels and helper text: 9-Box cells have aria-label with cell name + count; EQS bands have aria-label with band name + count + percentage; active filters announced via aria-live region

---

## Subordinate Detail Screen

### Context References

- Section Spec: [My Team - Section Spec](https://www.notion.so/My-Team-Section-Spec-28dc23a9adbd4f0e901511a52b7557ad?pvs=21)
    - Requirements applied:
        - Detail panel with 6 sections: Profile Summary, Talent Status, Career Aspiration Summary, IDP Progress, 360 Assessment, Job Applications
        - EQS breakdown shows 6 components (Kinerja, Kompetensi, Pengalaman, Aspirasi, Pelatihan, TES)
        - All EQS data references subordinate's definitive position
        - Each section has "Lihat Detail" deep link to source module
        - Sections without data show empty state with informative message
    - Constraints applied:
        - Deep links carry employee ID context
        - Panel/slide-over behavior (not full page navigation)
    - View coverage: UC-MT-007
- Data Model: [Rinjani Talent - Data Model](https://www.notion.so/Rinjani-Talent-Data-Model-c9438ffdd61f4dadb0cb9eb5fdde3175?pvs=21)
    - Entities used: Employee, TalentPoolCandidate, EQSScore, EQSComponent, IDPRecord, CareerAspiration, AssessmentResult, Application
    - Fields used: All fields listed in UC-MT-007 acceptance criteria
    - Relationships applied: Employee -> EQSScore (definitive position); EQSScore -> EQSComponent (6 components); Employee -> IDPRecord (active cycle); Employee -> AssessmentResult (latest published)
- Sample Data: [My Team - Sample Data](https://www.notion.so/My-Team-Sample-Data-4f00e2f56b0c41058681cd956c3f4b00?pvs=21)
    - Example values used:
        - EQS breakdown for Siti Nurhaliza (88.75): Kinerja 18.40, Kompetensi 17.70, Pengalaman 17.00, Aspirasi 9.50, Pelatihan 18.00, TES 8.15
        - IDP: Bayu Aditya - approved, 24/48 hours completed, 2/5 activities
        - Assessment: Siti Nurhaliza - 5.1/6.0 (published 2025)
        - Application: Siti Nurhaliza - GM HC Holding (PROMOSI, shortlisted)
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Get a comprehensive view of a single subordinate's talent status and quickly navigate to source modules for action
- Success criteria: User can assess subordinate across all talent dimensions without leaving My Team, then deep link to relevant module for action
- Key constraints: Read-only summary; all operational actions via deep links; EQS always references definitive position

### 2) Layout Regions

- Header: Subordinate profile header (photo, name, position, grade)
- Controls Area: None
- Main Content: 6 stacked sections with expandable/collapsible content
- Secondary Panel: This IS the secondary panel (slide-over from Team Profile roster)
- Primary Actions: None
- Secondary Actions: Close panel

### 3) Component Tree

- Slide-Over Panel Container
    - Panel Header
        - Close Button: top-right corner
        - Profile Summary Section
            - Field: Photo
                - Data Source: subordinates[].photo_url
                - Format Rule: avatar circle, 64px
                - Null Handling: show initials
            - Field: Name
                - Data Source: subordinates[].name
                - Format Rule: heading level 3
            - Field: Position Title
                - Data Source: subordinates[].position_title
                - Format Rule: text, muted
            - Field: Grade / Band
                - Data Source: subordinates[].grade_jabatan + subordinates[].band_jabatan
                - Format Rule: badge; e.g. "Grade 19 / DH"
            - Field: Organization
                - Data Source: subordinates[].organization_name
                - Format Rule: text, muted
            - Field: Company
                - Data Source: subordinates[].company_name
                - Format Rule: text, small, muted
            - Field: Hire Date
                - Data Source: subordinates[].hire_date
                - Format Rule: date; e.g. "Bergabung 15 Jun 2019"
    - Panel Body (scrollable)
        - Section: Talent Status
            - Section Title: "Status Talent"
            - Field: 9-Box Classification
                - Data Source: talentPoolCandidates[].talent_cluster
                - Format Rule: badge with cluster label + visual 9-box mini indicator showing cell position
                - Null Handling: show "Belum terklasifikasi"
            - Field: EQS Score
                - Data Source: eqsScores[].total_score
                - Format Rule: large metric + band badge (e.g. "81.20 - Qualified")
                - Null Handling: show "Belum dihitung"
            - EQS Component Breakdown (6 components)
                - Component: Kinerja
                    - Data Source: eqsComponents[].components where component_type = "performance"
                    - Format Rule: bar chart row; label + raw_value + weighted_value; e.g. "Kinerja: 92.0 (bobot 20%) = 18.40"
                - Component: Kompetensi
                    - Data Source: eqsComponents[].components where component_type = "competency"
                    - Format Rule: same as above
                - Component: Pengalaman
                    - Data Source: eqsComponents[].components where component_type = "experience"
                    - Format Rule: same as above
                - Component: Aspirasi
                    - Data Source: eqsComponents[].components where component_type = "aspiration"
                    - Format Rule: same as above
                - Component: Pelatihan
                    - Data Source: eqsComponents[].components where component_type = "training"
                    - Format Rule: same as above
                - Component: TES
                    - Data Source: eqsComponents[].components where component_type = "tes"
                    - Format Rule: same as above
                - Null Handling (whole breakdown): show "Data EQS belum tersedia" if no eqsComponents
            - Field: Talent Pool Status
                - Data Source: subordinates[].talent_pool_status
                - Format Rule: badge; "active" = accent
                - Null Handling: show "Tidak terdaftar"
            - Field: Risk Profile
                - Data Source: subordinates[].risk_profile
                - Format Rule: badge; "flight_risk" = secondary, "high_risk" = destructive, "medium_risk" = secondary, "low_risk" = accent
                - Null Handling: show "-"
            - Field: Top Talent
                - Data Source: talentPoolCandidates[].is_top_talent
                - Format Rule: badge "Top Talent" if true; hidden if false
            - Deep Link: "Lihat Detail di Talent Pool" -> /talent-pool?employee={employee_id}
        - Section: Career Aspiration Summary
            - Section Title: "Aspirasi Karir"
            - Field: Total Aspirations
                - Data Source: careerAspirationSummary[].total_aspirations
                - Format Rule: metric; e.g. "5 aspirasi"
                - Null Handling: show "0 aspirasi"
            - Field: By Source Breakdown
                - Data Source: careerAspirationSummary[].by_source
                - Format Rule: inline list; e.g. "Individual: 3, Supervisor: 1, Job Holder: 1, Unit: 0"
                - Null Handling: show all sources with 0
            - Empty State:
                - Trigger: total_aspirations = 0
                - Message: "Belum memiliki aspirasi karir"
            - Deep Link: "Lihat Detail di Career Aspiration" -> /career-path/aspiration?employee={employee_id}
        - Section: IDP Progress
            - Section Title: "Individual Development Plan"
            - Field: Status
                - Data Source: idpRecords[].status
                - Format Rule: badge; "approved" = accent, "pending_approval" = secondary, "revision_requested" = secondary, "draft" = muted
                - Null Handling: show "Belum ada IDP"
            - Field: Hours Progress
                - Data Source: idpRecords[].completed_hours / idpRecords[].total_hours
                - Format Rule: progress bar + text; e.g. "24 / 48 jam (50%)"
                - Null Handling: show "0 / 0 jam" if draft or no record
            - Field: Activity Progress
                - Data Source: idpRecords[].completed_activities / idpRecords[].activity_count
                - Format Rule: text; e.g. "2 dari 5 aktivitas selesai"
                - Null Handling: show "0 dari 0 aktivitas"
            - Empty State:
                - Trigger: no idpRecords for employee
                - Message: "Belum membuat IDP untuk periode ini"
            - Deep Link: "Lihat Detail di Development Plan" -> /my-development?employee={employee_id}
        - Section: 360 Assessment
            - Section Title: "360 Assessment"
            - Field: Latest Score
                - Data Source: assessmentResults[].overall_score / assessmentResults[].overall_max_score
                - Format Rule: metric; e.g. "4.2 / 6.0"
                - Null Handling: show "Belum ada hasil assessment"
            - Field: Cycle Name
                - Data Source: assessmentResults[].cycle_name
                - Format Rule: text, muted; e.g. "Penilaian Kinerja Berbasis Perilaku 2025"
            - Field: Published Date
                - Data Source: assessmentResults[].published_at
                - Format Rule: date
            - Empty State:
                - Trigger: no assessmentResults for employee
                - Message: "Belum ada hasil assessment yang dipublikasikan"
            - Deep Link: "Lihat Detail di 360 Assessment" -> /360-assessment?employee={employee_id}
        - Section: Job Applications
            - Section Title: "Aplikasi Jabatan"
            - Field: Application List (if any)
                - Data Source: applications[] filtered by employee_id
                - Format Rule: list items; each showing position_title + movement_type badge + status badge
                - movement_type badge: "PROMOSI" = primary, "ROTASI" = secondary
                - status badge: "shortlisted" = accent, "submitted" = primary, others per Design Tokens status mapping
            - Empty State:
                - Trigger: no applications for employee
                - Message: "Tidak ada aplikasi jabatan aktif"
            - Deep Link: "Lihat Detail di Job Tender" -> /job-tender?employee={employee_id}

### 4) Data Requirements (Abstract Contract)

**Entities Needed**

- subordinate (single)
    - Required fields: employee_id, name, photo_url, position_title, grade_jabatan, band_jabatan, organization_name, company_name, hire_date
    - Derived fields: tenure (calculated from hire_date)
- talentPoolCandidate (single, latest period)
    - Required fields: talent_cluster, is_top_talent, risk_profile
- eqsScore (single, definitive position)
    - Required fields: total_score, eqs_band, is_eligible
    - Optional fields: eligibility_reason
- eqsComponents (array, 6 items)
    - Required fields: component_type, weight, raw_value, weighted_value
- idpRecord (single, active cycle)
    - Required fields: status, total_hours, completed_hours, activity_count, completed_activities
- careerAspirationSummary (single)
    - Required fields: total_aspirations, by_source, has_aspiration
- assessmentResult (single, latest published)
    - Required fields: overall_score, overall_max_score, cycle_name, published_at
- applications (array)
    - Required fields: position_title, movement_type, status

### 5) Interaction States

- Default (Idle): Panel slides in from right; all 6 sections visible and populated
- Loading: Skeleton for header + 6 section placeholders
- Partial Data: Sections with no data show individual empty states; other sections render normally
- Error:
    - Trigger condition: API failure
    - Message: "Gagal memuat detail bawahan. Silakan coba lagi."
    - Recovery action: Retry button
- Close: Panel slides out to right; roster visible again

### 6) Responsive Behavior

- Mobile (sm): Full-screen overlay instead of slide-over; back button at top-left
- Tablet (md): Slide-over panel occupying 50% width
- Desktop (lg+): Slide-over panel occupying 40% width; roster dimmed behind

### 7) Accessibility and Usability Notes

- Focus order: Close Button -> Profile Summary -> Section 1 (Talent Status) -> ... -> Section 6 (Job Applications)
- Keyboard interactions: Escape closes panel; Tab navigates between sections and deep links; Enter on deep link navigates to source module
- Labels and helper text: Panel has aria-label "Detail profil {employee_name}"; each section has clear heading; deep links have descriptive text

---

## Team Insights Screen

### Context References

- Section Spec: [My Team - Section Spec](https://www.notion.so/My-Team-Section-Spec-28dc23a9adbd4f0e901511a52b7557ad?pvs=21)
    - Requirements applied:
        - 4 analytics metrics: 9-Box Distribution Trend, EQS Distribution, IDP Completion Rate, Aspiration Coverage
        - Each metric shows primary number + trend indicator (up/down/stable)
        - 9-Box trend requires minimum 2 periods
        - EQS distribution references definitive position of each subordinate
        - IDP completion calculated from active period
        - Aspiration coverage counts any source (individual, supervisor, job_holder, unit)
    - Constraints applied:
        - Read-only analytics; no actions available
        - Data insufficient for chart shows informative message
    - View coverage: UC-MT-008
- Data Model: [Rinjani Talent - Data Model](https://www.notion.so/Rinjani-Talent-Data-Model-c9438ffdd61f4dadb0cb9eb5fdde3175?pvs=21)
    - Entities used: TalentPoolCandidate, TalentPoolPeriod, EQSScore, IDPRecord, CareerAspiration
    - Fields used: Distribution counts, period comparisons, completion rates
    - Relationships applied: TalentPoolPeriod -> TalentPoolCandidate distribution; EQSScore aggregation by band
- Sample Data: [My Team - Sample Data](https://www.notion.so/My-Team-Sample-Data-4f00e2f56b0c41058681cd956c3f4b00?pvs=21)
    - Example values used:
        - 9-Box trend: 2025 vs 2026 distributions; Promotable +1, Solid Contributor -1, Unfit +1
        - EQS: average 71.94, min 45.10 (Hendra), max 88.75 (Siti Nurhaliza)
        - IDP: 50% completion rate (4/8 approved), hours completion 35.8%
        - Aspiration: 87.5% coverage (7/8 with aspiration), 2 pending review
    - Copy grounded in sample data: yes

### 1) Screen Intent

- Primary user goal: Assess overall talent health of team through analytics and identify areas needing strategic attention
- Success criteria: User can see key talent metrics at a glance with trend indicators and understand team strengths/weaknesses
- Key constraints: Read-only; no export; trends require minimum 2 periods; data freshness dependent on upstream modules

### 2) Layout Regions

- Header: Shared Position Selector + Tab Navigation (Team Insights active)
- Controls Area: None
- Main Content: 4 metric cards/sections in grid layout
- Secondary Panel: None
- Primary Actions: None
- Secondary Actions: None

### 3) Component Tree

- Screen Container
    - Position Selector Region (shared)
    - Tab Navigation Region (Team Insights active)
    - Insights Grid Region
        - Metric Card: 9-Box Distribution Trend
            - Card Title: "Distribusi 9-Box"
            - Subtitle: "Perbandingan periode sekarang vs sebelumnya"
            - Primary Visual: Side-by-side stacked bar chart or grouped comparison
                - Data Source: teamInsights.nine_box_distribution
                - Current Period: TPP-2026 distribution
                - Previous Period: TPP-2025 distribution (from talentPoolPeriods)
                - Format Rule: grouped bars per cluster; chart colors from Design Tokens (chart-1 through chart-5)
            - Trend Summary (per cluster)
                - Field: Cluster Change
                    - Data Source: teamInsights.nine_box_distribution.trend_vs_previous
                    - Format Rule: trend indicator per cluster; "+1" = up arrow accent, "-1" = down arrow secondary, "0" = stable muted
                    - Example: "Promotable +1, Solid Contributor -1, Unfit +1"
            - Classified vs Unclassified
                - Field: classified_count / total
                    - Format Rule: muted text; "7 dari 8 terklasifikasi"
            - Insufficient Data State:
                - Trigger: talentPoolPeriods.length < 2
                - Message: "Data belum cukup untuk menampilkan trend. Minimal 2 periode diperlukan."
                - Fallback: show current period distribution only (no comparison)
        - Metric Card: EQS Distribution
            - Card Title: "Distribusi EQS"
            - Primary Metric: Average EQS Score
                - Data Source: teamInsights.eqs_distribution.average_score
                - Format Rule: large metric; e.g. "71.94"
            - Primary Visual: Histogram or horizontal bar chart by band
                - Data Source: teamInsights.eqs_[distribution.by](http://distribution.by)_band
                - Format Rule: bars per band; chart-1 (HQ), chart-2 (Q), chart-3 (ND), chart-4 (NR)
            - Range Indicator
                - Field: Min/Max
                    - Data Source: teamInsights.eqs_distribution.min_score, max_score
                    - Format Rule: muted text; "Min: 45.10 (Hendra Wijaya) | Max: 88.75 (Siti Nurhaliza Putri)"
            - Not Calculated Count
                - Field: not_calculated_count
                    - Format Rule: muted text; "1 bawahan belum dihitung"
                    - Null Handling: hide if 0
        - Metric Card: IDP Completion Rate
            - Card Title: "Tingkat Penyelesaian IDP"
            - Primary Metric: Completion Rate
                - Data Source: teamInsights.idp_completion.completion_rate
                - Format Rule: large metric + progress ring; e.g. "50%"
            - Status Breakdown
                - Data Source: teamInsights.idp_[completion.by](http://completion.by)_status
                - Format Rule: horizontal stacked bar or mini badges; "Approved: 4, Pending: 2, Revisi: 1, Draft: 1"
            - Hours Summary
                - Field: Average Hours
                    - Data Source: teamInsights.idp_completion.average_hours_planned vs average_hours_completed
                    - Format Rule: text; "Rata-rata: 13.50 / 37.75 jam (35.8%)"
        - Metric Card: Aspiration Coverage
            - Card Title: "Cakupan Aspirasi"
            - Primary Metric: Coverage Rate
                - Data Source: teamInsights.aspiration_coverage.coverage_rate
                - Format Rule: large metric + progress ring; e.g. "87.5%"
            - Coverage Detail
                - Field: With/Without Aspiration
                    - Data Source: teamInsights.aspiration_coverage
                    - Format Rule: text; "7 dari 8 bawahan memiliki aspirasi"
            - Pending Review
                - Field: Pending Review Count
                    - Data Source: teamInsights.aspiration_coverage.pending_review
                    - Format Rule: secondary badge if > 0; "2 menunggu review"
                    - Null Handling: hide if 0

### 4) Data Requirements (Abstract Contract)

**Entities Needed**

- teamInsights (pre-calculated aggregate)
    - Required fields: nine_box_distribution (current + trend), eqs_distribution (by_band, average, min, max), idp_completion (by_status, rates), aspiration_coverage (coverage_rate, pending_review)
    - Derived fields: trend indicators (computed from current vs previous period)
- talentPoolPeriods
    - Required fields: id, name, year, status, nine_box_distribution
    - Minimum: 2 periods for trend display

**Sorting / Filtering Requirements**

- No sorting or filtering; static analytics view
- Position context filter inherited from Position Selector

### 5) Interaction States

- Default (Idle): All 4 metric cards visible with current data and visualizations
- Loading: Skeleton for 4 metric cards with chart placeholders
- Empty (No Subordinates):
    - Trigger condition: subordinates.length = 0
    - Message: "Tidak ada bawahan langsung pada posisi ini"
- Partial Data:
    - Individual cards handle insufficient data internally (e.g. 9-Box trend shows only current if < 2 periods)
- Error:
    - Trigger condition: API failure
    - Message: "Gagal memuat insight tim. Silakan coba lagi."
    - Recovery action: Retry button

### 6) Responsive Behavior

- Mobile (sm): Metric cards stack vertically (1 column); charts simplified to horizontal bars
- Tablet (md): 2x2 grid of metric cards
- Desktop (lg+): 2x2 grid with comfortable spacing; full chart visualizations

### 7) Accessibility and Usability Notes

- Focus order: Position Selector -> Tab Navigation -> Metric Card 1 (9-Box) -> Metric Card 2 (EQS) -> Metric Card 3 (IDP) -> Metric Card 4 (Aspiration)
- Keyboard interactions: Tab navigates between cards; no interactive elements within cards (read-only)
- Labels and helper text: Each chart has aria-label describing the data; trend indicators have text alternatives (e.g. "naik 1" instead of just arrow); color-coded elements always paired with text labels