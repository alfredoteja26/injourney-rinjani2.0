# Individual Development Plan (IDP) Module

## Overview

The IDP module provides employees with a comprehensive platform to plan, track, and manage their professional development activities. This module is part of the Rinjani Talent Management System and follows the design specifications from the InJourney ecosystem.

## Features

### 1. IDP Dashboard (`/idp`)
- Overview of current IDP status
- Summary cards showing:
  - IDP status (draft, pending approval, approved, etc.)
  - Development hours (completed/total)
  - Activity progress
- Quick actions for common tasks
- Timeline of IDP period milestones
- Activity preview with status indicators

### 2. Gap Analysis (`/idp/gap-analysis`)
- Visual competency gap analysis with radar chart
- Competency listing grouped by severity:
  - Significant gaps (gap ≥ 2 levels)
  - Moderate gaps (gap = 1 level)
  - Achieved (gap = 0)
- Filter by competency cluster (Technical, Soft Skills, Leadership)
- Course recommendations for each competency gap
- Expandable competency details

### 3. Course Recommendations (`/idp/recommendations`)
- AI-recommended courses based on gap analysis
- Courses grouped by competency gap
- Advanced filtering:
  - Competency gap
  - Format (video, workshop, ebook, blended)
  - Duration (<4h, 4-8h, >8h)
- Sorting options (relevance, duration, title)
- Relevance badges (High/Medium/Low)
- Quick add to IDP functionality

### 4. Course Catalog (`/idp/catalog`)
- Complete course library from LMS
- Full-text search across title, code, description
- Multiple view modes (grid/list)
- Comprehensive filtering
- Course detail modal with:
  - Full description
  - Learning objectives
  - Competencies developed
  - Prerequisites
  - Provider information

### 5. IDP Editor (`/idp/editor`)
- Create and edit IDP activities
- Drag-and-drop activity reordering
- Real-time validation:
  - Minimum hours requirement
  - Target date validation
  - Activity count validation
- Activity types:
  - LMS courses
  - Custom activities
- Activity fields:
  - Duration (hours)
  - Target date
  - Priority (high/medium/low)
  - Notes
- Employee notes for manager
- Save draft functionality
- Submit for approval workflow

### 6. Progress Tracker (`/idp/progress`)
- Visual progress overview with circular progress indicator
- Activity checklist with status tracking:
  - Not started
  - In progress
  - Completed
- Filter by status
- Sort by target date, priority, or status
- Date indicators:
  - On track (green)
  - Due soon (amber - ≤7 days)
  - Overdue (red)
- Quick status updates
- Evidence upload for custom activities
- LMS integration links
- Summary statistics:
  - Remaining hours
  - Days until period end
  - Pace indicator (ahead/on track/falling behind)

## Data Model

### Key Entities

1. **IDPCycle**: Annual/semi-annual IDP period
   - Period dates and deadlines
   - Minimum development hours requirement
   - Status (draft/active/closed)

2. **IDPRecord**: Employee's IDP for a specific cycle
   - Status (draft/pending_approval/approved/revision_requested/completed)
   - Total hours and completed hours
   - Employee notes

3. **IDPActivity**: Individual development activity
   - Activity type (LMS course or custom)
   - Duration, target date, priority
   - Status (not_started/in_progress/completed)
   - Notes and evidence

4. **Course**: LMS catalog item
   - Course details (code, title, description)
   - Format (video/workshop/ebook/blended)
   - Competency mappings
   - Recommendation tags

5. **CompetencyGap**: Employee's competency gap analysis
   - Current and required levels
   - Gap severity (none/minor/moderate/significant)
   - Cluster (technical/soft_skills/leadership)

## Navigation Flow

```
IDP Dashboard
├── Gap Analysis
│   └── Course Recommendations
│       ├── Course Catalog
│       └── IDP Editor
├── IDP Editor
│   ├── Course Recommendations
│   ├── Course Catalog
│   └── Submit → IDP Detail
└── Progress Tracker (if approved)
```

## Design System

The module strictly follows the InJourney design system:

### Colors
- Primary Brand: `var(--primary)` - Teal #00858A
- Secondary: `var(--muted)` - Light grey background
- Success: Green for completed activities
- Warning: Amber for pending/warnings
- Danger: Red for critical gaps/overdue

### Typography
- Font Family: Inter (from CSS variables)
- Sizes: Uses CSS variable scale (--text-xs to --text-4xl)
- Weights: Uses CSS variables (--font-weight-*)

### Components
- Cards: White background with subtle shadow
- Buttons: Primary (teal), outline, ghost variants
- Badges: Status indicators with semantic colors
- Progress bars: Visual progress tracking
- Charts: Recharts for radar visualization

### Spacing & Layout
- Consistent padding: p-4, p-6
- Card gaps: gap-4, gap-6
- Responsive grid: 1/2/3 columns based on breakpoint

## Status Badge Colors

| Status | Variant | Color |
|--------|---------|-------|
| approved | default | Teal |
| pending_approval | secondary | Grey |
| draft | outline | Border only |
| revision_requested | destructive | Red |
| completed | default | Teal |

## Priority Badge Colors

| Priority | Color |
|----------|-------|
| high | Red border & text |
| medium | Amber border & text |
| low | Default |

## Validation Rules

### IDP Submission
- Total hours ≥ minimum hours (default: 40)
- At least 1 activity required
- All target dates ≤ cycle end date
- Title required for custom activities

### Activity Tracking
- Completion date required when marking complete
- Evidence upload for completed custom activities
- Progress updates only for approved IDPs

## Sample Data

Sample data is provided in `/data/idpData.ts` with:
- 1 active IDP cycle (IDP 2026)
- 1 employee (Budi Santoso)
- 1 approved IDP record (48 hours, 12 completed)
- 5 activities with mixed statuses
- 5 competency gaps
- 8 courses in catalog

## Future Enhancements

Potential additions based on specifications:
- IDP Detail/Review screen for viewing submitted IDPs
- Approval history timeline
- Manager approval workflow
- Revision request handling
- Certificate integration
- LMS synchronization
- Export to PDF
- Multi-cycle history
- Competency progress over time
- Recommendation algorithm refinement

## Technical Notes

### Dependencies
- React Router for navigation
- Recharts for radar chart visualization
- Lucide React for icons
- Radix UI for accessible components
- Tailwind CSS v4 for styling
- Sonner for toast notifications

### State Management
- Local component state for UI interactions
- Mock data from centralized data files
- Future: Consider Redux/Zustand for global state
- Future: API integration for real-time data

### Performance
- Lazy loading for route-based code splitting
- Responsive images with proper sizing
- Optimized re-renders with React.memo where needed
- Efficient filtering and sorting

## Testing Checklist

- [ ] Navigate through all screens
- [ ] Add/remove activities
- [ ] Filter and sort functionality
- [ ] Form validation
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Status transitions
- [ ] Progress calculations
- [ ] Date validations
- [ ] Toast notifications
- [ ] Accessibility (keyboard navigation, screen readers)
