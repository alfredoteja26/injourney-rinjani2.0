/**
 * Talent Review Workflow Business Logic
 * Based on: PRD-Rinjani-Talent.md
 * 
 * Workflow stages:
 * 1. Supervisor Proposal (Atasan Langsung)
 * 2. HC Recommendation (HC Admin/HCBP)
 * 3. TC Decision (Talent Committee)
 * 4. Berita Acara Generation
 * 
 * Proposal Types:
 * - PROMOTION_GRADE_JABATAN
 * - PROMOTION_PERSONAL_GRADE
 * - DEMOTION_PERSONAL_GRADE
 * - SALARY_INCREASE
 */

import type {
  Employee,
  Position,
  TalentReviewProposal,
  ProposalType,
  ReviewProposalStatus,
  ReviewDecisionOutcome,
} from '../../types/talent';

// ==================== CONSTANTS ====================

export const PROPOSAL_TYPES: Record<ProposalType, { label: string; requiresPosition: boolean; description: string }> = {
  PROMOTION_GRADE_JABATAN: {
    label: "Promosi Grade Jabatan",
    requiresPosition: true,
    description: "Promosi struktural ke posisi dengan grade jabatan lebih tinggi",
  },
  PROMOTION_PERSONAL_GRADE: {
    label: "Promosi Personal Grade",
    requiresPosition: false,
    description: "Kenaikan personal grade tanpa perubahan posisi",
  },
  DEMOTION_PERSONAL_GRADE: {
    label: "Demosi Personal Grade",
    requiresPosition: false,
    description: "Penurunan personal grade (biasanya karena performa)",
  },
  SALARY_INCREASE: {
    label: "Kenaikan Gaji",
    requiresPosition: false,
    description: "Kenaikan gaji tanpa perubahan grade/posisi",
  },
};

export const DECISION_OUTCOMES: Record<ReviewDecisionOutcome, { label: string; color: string; icon: string }> = {
  APPROVED: {
    label: "Disetujui",
    color: "var(--success)",
    icon: "✓",
  },
  APPROVED_WITH_MODIFICATION: {
    label: "Disetujui dengan Modifikasi",
    color: "var(--primary)",
    icon: "✓*",
  },
  DEFERRED: {
    label: "Ditunda",
    color: "var(--warning)",
    icon: "⏸",
  },
  REJECTED: {
    label: "Ditolak",
    color: "var(--destructive)",
    icon: "✗",
  },
};

export const TC_TIERS = {
  TC_TIER_1: {
    label: "TC Tier 1",
    scope: "BoD & BoD-1",
    chairman_role: "Direktur Utama INJ",
  },
  TC_TIER_2: {
    label: "TC Tier 2",
    scope: "BoD-2 & BoD-3",
    chairman_role: "Direktur HC",
  },
  TC_TIER_3: {
    label: "TC Tier 3",
    scope: "BoD-4 ke bawah",
    chairman_role: "Direktur Terkait",
  },
};

// ==================== WORKFLOW VALIDATION ====================

/**
 * Validate supervisor proposal before submission
 */
export function validateSupervisorProposal(proposal: {
  employee_id: string;
  proposal_type: ProposalType;
  target_position_id?: string;
  target_grade_jabatan?: number;
  justification: string;
}): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check required fields
  if (!proposal.employee_id) {
    errors.push("Employee ID wajib diisi");
  }

  if (!proposal.proposal_type) {
    errors.push("Proposal type wajib dipilih");
  }

  if (!proposal.justification || proposal.justification.trim().length < 20) {
    errors.push("Justification minimal 20 karakter");
  }

  // Check type-specific requirements
  const typeConfig = PROPOSAL_TYPES[proposal.proposal_type];
  if (typeConfig.requiresPosition && !proposal.target_position_id) {
    errors.push(`${typeConfig.label} memerlukan target position`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate HC recommendation before submission
 */
export function validateHCRecommendation(recommendation: {
  proposal_id: string;
  recommendation_type: ProposalType;
  recommended_position_id?: string;
  recommended_grade_jabatan?: number;
  recommended_salary_increase?: number;
  hc_notes: string;
}): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check required fields
  if (!recommendation.proposal_id) {
    errors.push("Proposal ID wajib ada");
  }

  if (!recommendation.recommendation_type) {
    errors.push("Recommendation type wajib dipilih");
  }

  if (!recommendation.hc_notes || recommendation.hc_notes.trim().length < 20) {
    errors.push("HC notes minimal 20 karakter");
  }

  // Check type-specific requirements
  const typeConfig = PROPOSAL_TYPES[recommendation.recommendation_type];
  if (typeConfig.requiresPosition && !recommendation.recommended_position_id) {
    errors.push(`${typeConfig.label} memerlukan recommended position`);
  }

  // Validate salary increase percentage
  if (
    recommendation.recommendation_type === "SALARY_INCREASE" &&
    recommendation.recommended_salary_increase !== undefined
  ) {
    if (recommendation.recommended_salary_increase < 0 || recommendation.recommended_salary_increase > 50) {
      errors.push("Salary increase harus antara 0-50%");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate TC decision before submission
 */
export function validateTCDecision(decision: {
  proposal_id: string;
  decision_outcome: ReviewDecisionOutcome;
  rationale: string;
  effective_date?: string;
}): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check required fields
  if (!decision.proposal_id) {
    errors.push("Proposal ID wajib ada");
  }

  if (!decision.decision_outcome) {
    errors.push("Decision outcome wajib dipilih");
  }

  if (!decision.rationale || decision.rationale.trim().length < 20) {
    errors.push("Rationale minimal 20 karakter");
  }

  // Check effective date for approved decisions
  if (
    (decision.decision_outcome === "APPROVED" || decision.decision_outcome === "APPROVED_WITH_MODIFICATION") &&
    !decision.effective_date
  ) {
    errors.push("Effective date wajib untuk keputusan yang disetujui");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ==================== WORKFLOW STATE MACHINE ====================

/**
 * Get allowed next states for a proposal
 */
export function getAllowedNextStates(currentStatus: ReviewProposalStatus): ReviewProposalStatus[] {
  switch (currentStatus) {
    case "DRAFT":
      return ["PENDING_TALENT_COMMITTEE"];
    case "PENDING_TALENT_COMMITTEE":
      return ["DECIDED"];
    case "DECIDED":
      return []; // Terminal state
    default:
      return [];
  }
}

/**
 * Check if proposal can be edited
 */
export function canEditProposal(status: ReviewProposalStatus, role: string): boolean {
  // DRAFT can be edited by supervisor
  if (status === "DRAFT") {
    return role === "SUPERVISOR";
  }
  
  // PENDING can be edited by HC before TC decision
  if (status === "PENDING_TALENT_COMMITTEE") {
    return role === "HC_ADMIN" || role === "HCBP";
  }
  
  // DECIDED cannot be edited
  return false;
}

/**
 * Check if proposal requires HC recommendation before TC decision
 */
export function requiresHCRecommendation(proposalType: ProposalType): boolean {
  // All proposal types require HC recommendation
  return true;
}

// ==================== GRADE/POSITION VALIDATION ====================

/**
 * Validate promotion grade compatibility
 */
export function validatePromotionGrade(
  currentGrade: number,
  targetGrade: number
): {
  valid: boolean;
  reason?: string;
} {
  // Cannot promote to same grade
  if (currentGrade === targetGrade) {
    return {
      valid: false,
      reason: "Grade target sama dengan grade saat ini",
    };
  }

  // Cannot skip more than 2 grades at once
  const gradeDiff = targetGrade - currentGrade;
  if (gradeDiff > 2) {
    return {
      valid: false,
      reason: `Cannot skip more than 2 grades (current: ${currentGrade}, target: ${targetGrade})`,
    };
  }

  // Cannot demote via promotion type
  if (gradeDiff < 0) {
    return {
      valid: false,
      reason: "Gunakan proposal type DEMOTION untuk penurunan grade",
    };
  }

  return {
    valid: true,
  };
}

/**
 * Validate band promotion restrictions
 */
export function validateBandPromotion(
  currentBand: string,
  targetBand: string
): {
  allowed: boolean;
  reason: string;
} {
  // Band promotion ONLY allowed via succession/placement to higher band position
  // NOT via Talent Review proposal
  if (currentBand !== targetBand) {
    return {
      allowed: false,
      reason: "Band promotion hanya melalui suksesi/penempatan ke posisi band lebih tinggi, bukan melalui Talent Review",
    };
  }

  return {
    allowed: true,
    reason: "",
  };
}

// ==================== TC TIER DETERMINATION ====================

/**
 * Determine which TC tier should handle a proposal based on target grade
 */
export function determineTCTier(targetGrade: number): "TC_TIER_1" | "TC_TIER_2" | "TC_TIER_3" {
  // TC Tier 1: BoD & BoD-1 (grade 21+)
  if (targetGrade >= 21) {
    return "TC_TIER_1";
  }

  // TC Tier 2: BoD-2 & BoD-3 (grade 15-20)
  if (targetGrade >= 15) {
    return "TC_TIER_2";
  }

  // TC Tier 3: BoD-4 and below (grade < 15)
  return "TC_TIER_3";
}

// ==================== QUARTERLY TC AGENDA ====================

export interface QuarterlyAgenda {
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  timeline: string;
  agenda_items: string[];
  special_focus: string;
}

export const QUARTERLY_TC_AGENDAS: Record<string, QuarterlyAgenda> = {
  Q1: {
    quarter: "Q1",
    timeline: "April",
    agenda_items: [
      "Talent Review",
      "Succession List",
      "PMS Calibration",
      "Vacant Position",
      "≥3 Years Review",
      "Development Plan",
    ],
    special_focus: "PMS Calibration",
  },
  Q2: {
    quarter: "Q2",
    timeline: "Juli",
    agenda_items: [
      "Talent Review",
      "Succession List",
      "Vacant Position",
      "≥3 Years Review",
      "Development Plan",
      "Salary Increment",
    ],
    special_focus: "Salary Increment",
  },
  Q3: {
    quarter: "Q3",
    timeline: "Oktober",
    agenda_items: [
      "Talent Review",
      "Succession List",
      "Vacant Position",
      "≥3 Years Review",
      "Development Plan",
    ],
    special_focus: "Standard Review",
  },
  Q4: {
    quarter: "Q4",
    timeline: "Januari",
    agenda_items: [
      "Talent Review",
      "Succession List",
      "Vacant Position",
      "≥3 Years Review",
      "Development Plan",
      "Salary Increment",
      "Top Talent Selection",
    ],
    special_focus: "Top Talent Selection",
  },
};

/**
 * Get current quarter based on month
 */
export function getCurrentQuarter(): "Q1" | "Q2" | "Q3" | "Q4" {
  const month = new Date().getMonth() + 1; // 1-12
  
  if (month >= 4 && month <= 6) return "Q1";
  if (month >= 7 && month <= 9) return "Q2";
  if (month >= 10 && month <= 12) return "Q3";
  return "Q4"; // Jan-Mar
}

// ==================== BERITA ACARA GENERATION ====================

/**
 * Check if Berita Acara can be generated
 */
export function canGenerateBeritaAcara(proposals: TalentReviewProposal[]): {
  can_generate: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Need at least 1 decided proposal
  const decidedProposals = proposals.filter(p => p.status === "DECIDED" && p.tc_decision);
  if (decidedProposals.length === 0) {
    reasons.push("Tidak ada proposal yang sudah diputuskan TC");
  }

  // All decided proposals should have rationale
  const missingRationale = decidedProposals.filter(
    p => !p.tc_decision?.rationale || p.tc_decision.rationale.trim().length === 0
  );
  if (missingRationale.length > 0) {
    reasons.push(`${missingRationale.length} proposal decided tanpa rationale`);
  }

  return {
    can_generate: reasons.length === 0,
    reasons,
  };
}

/**
 * Generate Berita Acara content structure
 */
export function generateBeritaAcaraContent(
  tcMeetingId: string,
  proposals: TalentReviewProposal[],
  chairman: Employee,
  secretary: Employee,
  members: Employee[]
): {
  title: string;
  meeting_info: Record<string, any>;
  decisions: {
    item_id: string;
    employee_name: string;
    proposal_summary: string;
    decision: string;
    rationale: string;
  }[];
} {
  const decidedProposals = proposals.filter(p => p.status === "DECIDED" && p.tc_decision);

  return {
    title: `Berita Acara Talent Committee Meeting`,
    meeting_info: {
      tc_meeting_id: tcMeetingId,
      date: new Date().toISOString().split('T')[0],
      chairman: chairman.full_name,
      secretary: secretary.full_name,
      members: members.map(m => m.full_name),
    },
    decisions: decidedProposals.map(p => ({
      item_id: p.proposal_id,
      employee_name: "", // Would be populated from employee data
      proposal_summary: `${PROPOSAL_TYPES[p.proposal_type].label}`,
      decision: DECISION_OUTCOMES[p.tc_decision!.decision_outcome].label,
      rationale: p.tc_decision!.rationale,
    })),
  };
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get proposal status color
 */
export function getProposalStatusColor(status: ReviewProposalStatus): string {
  switch (status) {
    case "DRAFT":
      return "var(--muted)";
    case "PENDING_TALENT_COMMITTEE":
      return "var(--warning)";
    case "DECIDED":
      return "var(--success)";
    default:
      return "var(--muted)";
  }
}

/**
 * Get decision outcome color
 */
export function getDecisionOutcomeColor(outcome: ReviewDecisionOutcome): string {
  return DECISION_OUTCOMES[outcome].color;
}

/**
 * Check if proposal requires urgent attention
 */
export function isProposalUrgent(proposal: TalentReviewProposal, daysSinceSubmission: number): boolean {
  // Pending for more than 30 days
  if (proposal.status === "PENDING_TALENT_COMMITTEE" && daysSinceSubmission > 30) {
    return true;
  }

  return false;
}
