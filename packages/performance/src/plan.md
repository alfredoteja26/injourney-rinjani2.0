# Rinjani Performance Prototype - Implementation Plan

## 1. Project Overview
This plan outlines the steps to complete the high-fidelity prototype for the **Rinjani Performance (INJ-BPR)** module. The goal is to create a fully interactive frontend experience covering all user roles (Employee, Manager, Admin) and key workflows (Goal Setting, Monitoring, Evaluation).

## 2. Module Implementation Sequence

### Phase 1: My KPI (Individual Performance) [COMPLETED]
**Status:** Dashboard & Check-In Form (Completed)
- [x] **Goal Setting (Planning Phase)**
    - [x] Create `GoalSettingView.tsx`.
    - [x] Implement "Propose KPI" modal/form.
    - [x] Implement "Submit for Approval" workflow simulation.
- [x] **Year-End Review (Evaluation Phase)**
    - [x] Create `YearEndReviewView.tsx`.
    - [x] Implement Self-Assessment form.
    - [x] Implement Acknowledgment screen.

### Phase 2: My Team KPI (Manager View) [COMPLETED]
**Goal:** Enable managers to monitor team performance, cascade KPIs, and approve submissions.
- [x] **Team Dashboard**
    - [x] Create `TeamDashboard.tsx`.
    - [x] Implement Team Performance Summary cards.
    - [x] Implement Team Member List with status indicators.
- [x] **Team Planning**
    - [x] Create `TeamPlanningDashboard.tsx`.

### Phase 3: KPI Library (Standardization) [COMPLETED]
**Goal:** Centralized repository for standard KPIs.
- [x] **Library Browser**
    - [x] Create `KPILibraryDashboard.tsx`.
    - [x] Implement Search and Filter (by Function, Type).
- [x] **Request New KPI**
    - [x] Create `SubmitKPIForm.tsx`.
- [x] **KPI Detail**
    - [x] Create `KPIDetailView.tsx`.

### Phase 4: KPI Tree (Visualization) [COMPLETED]
**Goal:** Visual hierarchy of performance alignment.
- [x] **Tree Visualization**
    - [x] Create `KPITreeView.tsx`.
    - [x] Implement organizational chart-like view of KPI alignment.
    - [x] Implement Node Details.

### Phase 5: KPI Headquarter (Admin) [COMPLETED]
**Goal:** Configuration and High-level monitoring.
- [x] **HQ Dashboard**
    - [x] Create `HQDashboard.tsx`.
    - [x] Implement company-wide metrics.
- [x] **Configuration**
    - [x] Create `WeightConfigView.tsx` for setting weights.
    - [x] Create `ScheduleConfigView.tsx` for opening/closing cycles.

## 3. Technical Strategy [COMPLETED]

### Shared Components
*   Expand `components/performance/shared/` to include:
    *   `ScoreCard`, `KPIListItem`, `StatusBadge`, `ProgressBar`.

### Data Management
*   Extend `components/performance/data.ts` to include:
    *   Team member profiles and their KPI data.
    *   KPI Library items.
    *   Organization structure for KPI Tree.
    *   HQ Metrics and Configuration data.

### Routing & Navigation
*   Update `MainSidebar.tsx` and `App.tsx` to handle sub-navigation for:
    *   `/performance/my-team`
    *   `/performance/library`
    *   `/performance/tree`
    *   `/performance/hq`

## 4. Next Immediate Step
All phases are completed. The prototype is ready for review.
