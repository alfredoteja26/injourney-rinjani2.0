export interface IDPCycle {
  id: string;
  name: string;
  period_type: 'annual' | 'semi_annual' | 'probation';
  trigger_type?: 'manual' | 'after_performance_planning';
  start_date: string;
  submission_deadline: string;
  midyear_checkpoint?: string;
  end_date: string;
  status: 'draft' | 'active' | 'upcoming' | 'completed' | 'closed';
  min_development_hours: number;
  is_custom_activities_allowed?: boolean;
  is_manager_approval_required?: boolean;
  created_at: string;
  updated_at: string;
}

export interface IDPRecord {
  id: string;
  employee_id: string;
  cycle_id: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'revision_requested' | 'completed';
  total_hours: number;
  completed_hours: number;
  employee_notes?: string;
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface IDPActivity {
  id: string;
  idp_record_id: string;
  course_id?: string;
  activity_type: 'lms_course' | 'custom_activity';
  title: string;
  duration_hours: number;
  target_date: string;
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'completed';
  completion_date?: string;
  evidence_url?: string;
  notes?: string;
  initiated_by?: 'employee' | 'manager' | 'admin';
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  duration_hours: number;
  format: 'video' | 'workshop' | 'ebook' | 'blended';
  provider: string;
  job_families?: string[];
  competencies?: CourseCompetency[];
  level_from?: number;
  level_to?: number;
  thumbnail_url?: string;
  is_active: boolean;
  recommendation_tags?: string[];
}

export interface CourseCompetency {
  competency_id: string;
  competency_name: string;
  level_improvement: string;
}

export interface CompetencyGap {
  employee_id: string;
  competencies: CompetencyGapItem[];
}

export interface CompetencyGapItem {
  competency_id: string;
  competency_name: string;
  current_level: number;
  required_level: number;
  gap: number;
  gap_severity: 'none' | 'minor' | 'moderate' | 'significant';
  cluster?: 'technical' | 'soft_skills' | 'leadership';
}

export interface Employee {
  id: string;
  nik: string;
  name: string;
  email: string;
  current_position_title: string;
  organization_name: string;
  job_family_name: string;
  grade_jabatan: number;
  band_jabatan: string;
  manager_id: string;
  manager_name: string;
  division?: string;
}

// New Types for Admin Features
export interface IDPReasonTag {
  id: string;
  name: string;
  description?: string;
  type: 'standard' | 'custom';
  is_active: boolean;
  usage_count: number;
  created_by?: string;
  created_at: string;
}

export interface CompetencyMapping {
  id: string;
  competency_id: string;
  competency_name: string;
  course_id: string;
  course_name: string;
  course_provider: string;
  level_from: number;
  level_to: number;
  relevance: 'high' | 'medium' | 'low';
  is_mandatory: boolean;
}

export interface ReminderConfig {
  type: 'submission' | 'approval' | 'progress';
  is_enabled: boolean;
  days_trigger: number[]; // e.g., [7, 3, 1] days before deadline
  channels: ('email' | 'push')[];
  template_subject: string;
  template_body: string;
}
