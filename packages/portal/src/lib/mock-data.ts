// Mock data for employee profile
export const MOCK_DATA = {
  employee_profile: {
    id_employee: "EMP-INJ-0000000001",
    old_nip: 1987071521,
    new_nip: 2025000123,
    full_name: "Raka Pradana Putra",
    name_alias: "Raka",
    academic_title: "S.T.",
    corporate_email: "raka.putra@injourney.co.id",
    employment_status: "active",
    leave_type: null,
    photo_blob: {
      file_name: "photo_raka_pradana_putra.png",
      mime_type: "image/png",
      file_id: "FILE-PROFILE-PHOTO-0001",
      url: "https://files.example.local/employee/photo/EMP-INJ-0000000001.png"
    },
    dwh_source_system: "HRIS_MULTI_ENTITY"
  },
  employee_identification: {
    id_employee: "EMP-INJ-0000000001",
    id_nik: "3175091507870001",
    id_npwp: "12.345.678.9-012.000",
    tax_classification_pph21: "K1",
    ptkp_category: "K/1",
    id_kk_number: "3175092001123456",
    birth_place: "Jakarta",
    dt_birth: "1987-07-15",
    dt_start_work: "2012-08-01",
    dt_retirement: "2045-07-15",
    dt_appointed_employee: "2015-08-01",
    dt_grade_start: "2023-01-01",
    employment_type: "pkwtt",
    job_class: "10",
    gender: "unknown",
    ethnicity: "Betawi",
    mobile_phone: "+6281212345678",
    home_phone: "021-5551234",
    private_email: "raka.pradana.putra@gmail.com",
    corporate_email: "raka.putra@injourney.co.id",
    id_bpjs_tk: "1200009876543",
    id_bpjs_kes: "0001234567890",
    blood_type: "o_plus",
    id_insurance: "PRV-INS-88990011",
    id_efin: 123456789012,
    religion: "Islam" // Added manually as it's used in the UI but might be missing in some JSON versions
  },
  employee_address: [
    {
      id_employee: "EMP-INJ-0000000001",
      address_type: "alamat_ktp",
      street_address: "Jl. Kemang Raya No. 10 RT 004/RW 006",
      district: "Mampang Prapatan",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postal_code: "12730",
      country: "Indonesia",
      geo_latitude: -6.260719,
      geo_longitude: 106.813607
    },
    {
      id_employee: "EMP-INJ-0000000001",
      address_type: "alamat_tetap",
      street_address: "Apartemen Cempaka Residence Tower B, Unit 15C",
      district: "Setiabudi",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postal_code: "12910",
      country: "Indonesia",
      geo_latitude: -6.21462,
      geo_longitude: 106.832165
    },
    {
      id_employee: "EMP-INJ-0000000001",
      address_type: "alamat_sementara",
      street_address: "Mess Operasional Bandara, Blok D No. 3",
      district: "Benda",
      city: "Tangerang",
      province: "Banten",
      postal_code: "15125",
      country: "Indonesia",
      geo_latitude: -6.125556,
      geo_longitude: 106.655833
    }
  ],
  employee_education_history: [
    {
      id_employee: "EMP-INJ-0000000001",
      id_education_history: "EDU-EMP-INJ-0000000001-0001",
      education_level_code: "sd",
      education_degree_type: null,
      institution_name: "SD Negeri 01 Kemang",
      institution_country: "Indonesia",
      faculty: null,
      major: null,
      concentration: null,
      dt_start: "1993-07-01",
      dt_end: "1999-06-30",
      education_duration_months: 72,
      final_score: 86.5,
      achievement_notes: "Peringkat 5 besar kelas pada kelas 6.",
      certificate_number: "SD-1999-0101-000123",
      certificate_blob: {
        file_name: "ijazah_sd.pdf",
        mime_type: "application/pdf",
        file_id: "FILE-EDU-SD-0001",
        url: "https://files.example.local/employee/education/EMP-INJ-0000000001/sd.pdf"
      }
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_education_history: "EDU-EMP-INJ-0000000001-0002",
      education_level_code: "smp",
      education_degree_type: null,
      institution_name: "SMP Negeri 12 Jakarta",
      institution_country: "Indonesia",
      faculty: null,
      major: null,
      concentration: null,
      dt_start: "1999-07-01",
      dt_end: "2002-06-30",
      education_duration_months: 36,
      final_score: 88.0,
      achievement_notes: "Aktif di OSIS bidang teknologi informasi.",
      certificate_number: "SMP-2002-1212-000456",
      certificate_blob: {
        file_name: "ijazah_smp.pdf",
        mime_type: "application/pdf",
        file_id: "FILE-EDU-SMP-0001",
        url: "https://files.example.local/employee/education/EMP-INJ-0000000001/smp.pdf"
      }
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_education_history: "EDU-EMP-INJ-0000000001-0003",
      education_level_code: "sma",
      education_degree_type: "ipa",
      institution_name: "SMA Negeri 6 Jakarta",
      institution_country: "Indonesia",
      faculty: null,
      major: "Ilmu Pengetahuan Alam",
      concentration: "Fisika",
      dt_start: "2002-07-01",
      dt_end: "2005-06-30",
      education_duration_months: 36,
      final_score: 90.2,
      achievement_notes: "Juara 2 Lomba Karya Ilmiah Remaja tingkat kota.",
      certificate_number: "SMA-2005-0606-000789",
      certificate_blob: {
        file_name: "ijazah_sma.pdf",
        mime_type: "application/pdf",
        file_id: "FILE-EDU-SMA-0001",
        url: "https://files.example.local/employee/education/EMP-INJ-0000000001/sma.pdf"
      }
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_education_history: "EDU-EMP-INJ-0000000001-0004",
      education_level_code: "s1",
      education_degree_type: "bachelor",
      institution_name: "Institut Teknologi Bandung",
      institution_country: "Indonesia",
      faculty: "Fakultas Teknik Industri",
      major: "Teknik Industri",
      concentration: "Sistem Informasi Industri",
      dt_start: "2005-08-01",
      dt_end: "2010-07-30",
      education_duration_months: 59,
      final_score: 3.47,
      achievement_notes: "Skripsi: Optimasi Penjadwalan Operasional dengan Constraint Programming.",
      certificate_number: "ITB-TI-2010-000321",
      certificate_blob: {
        file_name: "ijazah_s1.pdf",
        mime_type: "application/pdf",
        file_id: "FILE-EDU-S1-0001",
        url: "https://files.example.local/employee/education/EMP-INJ-0000000001/s1.pdf"
      }
    }
  ],
  employee_language_skill: [
    {
      id_employee: "EMP-INJ-0000000001",
      language_name: "Bahasa Indonesia",
      listening_level: "proficient",
      reading_level: "proficient",
      speaking_level: "proficient",
      writing_level: "proficient",
      certificate_level: null,
      certificate_blob: null
    },
    {
      id_employee: "EMP-INJ-0000000001",
      language_name: "English",
      listening_level: "advanced",
      reading_level: "advanced",
      speaking_level: "intermediate",
      writing_level: "advanced",
      certificate_level: "toefl",
      certificate_blob: {
        file_name: "toefl_score_report.pdf",
        mime_type: "application/pdf",
        file_id: "FILE-LANG-TOEFL-0001",
        url: "https://files.example.local/employee/language/EMP-INJ-0000000001/toefl.pdf"
      }
    }
  ],
  employee_family_member: [
    {
      id_employee: "EMP-INJ-0000000001",
      id_family_member: "FAM-EMP-INJ-0000000001-0001",
      full_name: "Nadira Kusuma",
      relationship_type: "spouse",
      gender: "unknown",
      birth_place: "Bandung",
      dt_birth: "1989-03-02",
      id_type: "ktp",
      id_number: "3273010203890002",
      nationality: "Indonesia",
      occupation: "Wirausaha",
      marital_status: "married",
      religion: null,
      dt_marriage: "2016-09-10",
      office_dependent_status: "dependent",
      heir_status: "primary"
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_family_member: "FAM-EMP-INJ-0000000001-0002",
      full_name: "Arka Putra",
      relationship_type: "child",
      gender: "unknown",
      birth_place: "Jakarta",
      dt_birth: "2018-05-21",
      id_type: "kk",
      id_number: "3175092001123456",
      nationality: "Indonesia",
      occupation: null,
      marital_status: "single",
      religion: null,
      dt_marriage: null,
      office_dependent_status: "dependent",
      heir_status: "secondary"
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_family_member: "FAM-EMP-INJ-0000000001-0003",
      full_name: "Bima Pradana",
      relationship_type: "emergency_contact",
      gender: "unknown",
      birth_place: "Jakarta",
      dt_birth: "1963-11-08",
      id_type: "ktp",
      id_number: "3175090811630003",
      nationality: "Indonesia",
      occupation: "Pensiunan",
      marital_status: "married",
      religion: null,
      dt_marriage: "1986-06-21",
      office_dependent_status: null,
      heir_status: null,
      contact: {
        mobile_phone: "+6281311122233",
        street_address: "Jl. H. Nawi No. 25",
        district: "Cilandak",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        postal_code: "12430",
        country: "Indonesia"
      }
    }
  ],
  company: {
    id_company: "COMP-IJH-0001",
    company_name: "PT InJourney Holding",
    company_type: "holding",
    dt_establishment: "2021-10-01",
    dwh_source_system: "HRIS_MULTI_ENTITY"
  },
  org_unit: {
    id_org_unit: "ORG-IJH-01-02-05",
    org_unit_name: "Divisi Transformasi Digital",
    org_level: 2,
    id_parent_org_unit: "ORG-IJH-01-02",
    fk_company_id: "COMP-IJH-0001",
    cost_center: "CC-TRF-0205"
  },
  position_master: {
    id_position_master: "PM-00001234",
    position_master_name: "Senior Business Analyst",
    fk_position_type_id: "PT-GENERAL",
    id_job_family: "JF-DIG-0001",
    id_job_function: "JFN-BA-0003",
    id_grade: "GR-10"
  },
  position_variant: {
    id_position_variant: "PV-00005678",
    fk_position_master_id: "PM-00001234",
    position_variant_name: "Senior Business Analyst - Div. Transformasi Digital",
    fk_org_unit_id: "ORG-IJH-01-02-05",
    id_band: "BD-10A",
    job_class: 10,
    dt_active: "2023-01-01",
    dt_inactive: null,
    max_active_employee: 1,
    is_job_assignment: false
  },
  employee_position_history: [
    {
      id_position_history: "POSH-EMP-INJ-0000000001-0001",
      new_nip: 2025000123,
      employee_name: "Raka Pradana Putra",
      fk_position_variant_id: "PV-00004111",
      position_name: "Business Analyst - Div. Transformasi Digital",
      position_type: "general",
      job_class: 9,
      org_unit_name: "Divisi Transformasi Digital",
      company_name: "PT InJourney Holding",
      dt_position_start: "2019-01-01",
      dt_position_end: "2022-12-31",
      assignment_letter_number: "SK-TRF-BA-2019-00077",
      dt_assignment_letter: "2018-12-20",
      assignment_letter_blob: {
        file_name: "sk_penugasan_2019.pdf",
        mime_type: "application/pdf",
        file_id: "FILE-POSH-0001",
        url: "https://files.example.local/employee/assignment_letter/EMP-INJ-0000000001/2019.pdf"
      }
    },
    {
      id_position_history: "POSH-EMP-INJ-0000000001-0002",
      new_nip: 2025000123,
      employee_name: "Raka Pradana Putra",
      fk_position_variant_id: "PV-00005678",
      position_name: "Senior Business Analyst - Div. Transformasi Digital",
      position_type: "general",
      job_class: 10,
      org_unit_name: "Divisi Transformasi Digital",
      company_name: "PT InJourney Holding",
      dt_position_start: "2023-01-01",
      dt_position_end: null,
      assignment_letter_number: "SK-TRF-SBA-2022-00102",
      dt_assignment_letter: "2022-12-15",
      assignment_letter_blob: {
        file_name: "sk_promosi_2023.pdf",
        mime_type: "application/pdf",
        file_id: "FILE-POSH-0002",
        url: "https://files.example.local/employee/assignment_letter/EMP-INJ-0000000001/2023.pdf"
      }
    }
  ],
  employee_secondary_assignment: [
    {
      id_secondary_assignment: "SEC-EMP-INJ-0000000001-0001",
      new_nip: 2025000123,
      employee_name: "Raka Pradana Putra",
      fk_position_variant_id: "PV-00007777",
      position_name: "Project Lead - Implementasi Portal (Temporary)",
      position_type: "general",
      job_class: 10,
      org_unit_name: "PMO Transformasi",
      company_name: "PT InJourney Holding",
      assignment_letter_number: "SP-TRF-PL-2025-00012",
      dt_assignment_letter: "2025-06-10",
      assignment_letter_blob: {
        file_name: "sp_project_lead_2025.pdf",
        mime_type: "application/pdf",
        file_id: "FILE-SEC-0001",
        url: "https://files.example.local/employee/secondary_assignment/EMP-INJ-0000000001/2025.pdf"
      },
      dt_assignment_start: "2025-06-15",
      dt_assignment_end: "2025-12-31",
      secondary_assignment_type: "job_assignment"
    }
  ],
  employee_performance_history: [
    {
      id_employee: "EMP-INJ-0000000001",
      id_performance_history: "PERF-EMP-INJ-0000000001-2023",
      period_year: 2023,
      period_label: "annual_2023",
      performance_score: 4.25,
      performance_rating: "a",
      pct_kpi_achievement: 103.4,
      dt_assessment: "2023-12-20",
      id_assessor: "EMP-INJ-0000000456"
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_performance_history: "PERF-EMP-INJ-0000000001-2024",
      period_year: 2024,
      period_label: "annual_2024",
      performance_score: 4.10,
      performance_rating: "a",
      pct_kpi_achievement: 101.2,
      dt_assessment: "2024-12-18",
      id_assessor: "EMP-INJ-0000000456"
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_performance_history: "PERF-EMP-INJ-0000000001-2025",
      period_year: 2025,
      period_label: "annual_2025",
      performance_score: 3.95,
      performance_rating: "b",
      pct_kpi_achievement: 98.7,
      dt_assessment: "2025-12-10",
      id_assessor: "EMP-INJ-0000000789"
    }
  ],
  employee_leave_history: [
    {
      id_employee: "EMP-INJ-0000000001",
      id_leave_history: "LEAVE-EMP-INJ-0000000001-0001",
      leave_type: "annual_leave",
      dt_leave_start: "2025-04-08",
      dt_leave_end: "2025-04-10",
      leave_duration_days: 3.0,
      leave_status: "approved",
      leave_reason: "Kegiatan keluarga.",
      id_approver: "EMP-INJ-0000000789"
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_leave_history: "LEAVE-EMP-INJ-0000000001-0002",
      leave_type: "permission",
      dt_leave_start: "2025-09-02",
      dt_leave_end: "2025-09-02",
      leave_duration_days: 0.5,
      leave_status: "approved",
      leave_reason: "Keperluan administrasi.",
      id_approver: "EMP-INJ-0000000789"
    }
  ],
  learning_history: [
    {
      id_employee: "EMP-INJ-0000000001",
      id_learning: "LRN-EMP-INJ-0000000001-0001",
      learning_name: "Pelatihan Penjenjangan Grade 10",
      learning_type: "training",
      is_mandatory: true,
      dt_completion: "2023-03-18",
      dt_expiry: null,
      score: 88.0,
      learning_hours: 24,
      provider: "InJourney Corporate University"
    },
    {
      id_employee: "EMP-INJ-0000000001",
      id_learning: "LRN-EMP-INJ-0000000001-0002",
      learning_name: "Project Management Professional Prep",
      learning_type: "certification",
      is_mandatory: false,
      dt_completion: "2024-08-12",
      dt_expiry: "2027-08-12",
      score: 85.0,
      learning_hours: 40,
      provider: "Vendor Sertifikasi PM"
    }
  ],
  learning_agility_assessment: {
    id_employee: "EMP-INJ-0000000001",
    assessment_period: "q3_2025",
    learning_agility_score: 82.5,
    mental_agility: 84.0,
    people_agility: 80.0,
    change_agility: 83.0,
    results_agility: 81.0,
    dt_assessment: "2025-09-15"
  },
  competency_assessment: [
    {
      id_employee: "EMP-INJ-0000000001",
      assessment_period: "q3_2025",
      job_fit_score: 78.0,
      competency_gap: 0.22,
      assessment_method: "manager",
      dt_assessment: "2025-09-20"
    },
    {
      id_employee: "EMP-INJ-0000000001",
      assessment_period: "q1_2025",
      job_fit_score: 75.5,
      competency_gap: 0.25,
      assessment_method: "self",
      dt_assessment: "2025-03-10"
    }
  ],
  career_aspiration: [
    {
      id_employee: "EMP-INJ-0000000001",
      aspiration_source: "individual",
      id_target_position: "PM-00009999",
      id_target_job_family: "JF-DIG-0001",
      dt_aspiration: "2025-02-14",
      aspiration_notes: "Target berkembang ke peran Lead BA / Solution Analyst dalam 12-18 bulan."
    },
    {
      id_employee: "EMP-INJ-0000000001",
      aspiration_source: "supervisor",
      id_target_position: "PM-00009888",
      id_target_job_family: "JF-DIG-0001",
      dt_aspiration: "2025-02-20",
      aspiration_notes: "Disarankan masuk pipeline Solution Architect (track general)."
    }
  ],
  eqs_score: {
    id_employee: "EMP-INJ-0000000001",
    period: "annual_2025",
    eqs_score: 78.6,
    pct_kinerja_component: 24.0,
    pct_kompetensi_component: 16.0,
    pct_pengalaman_component: 12.0,
    pct_aspirasi_component: 18.5,
    pct_pelatihan_component: 8.0,
    pct_rekam_jejak_component: 5.0,
    id_target_position_master: "PM-00001234"
  },
  nine_box_classification: {
    id_employee: "EMP-INJ-0000000001",
    period: "annual_2025",
    performance_axis_score: 82.0,
    capacity_axis_score: 79.0,
    nine_box_position: 6,
    talent_cluster: "high_flyer"
  },
  talent_pool: {
    id_employee: "EMP-INJ-0000000001",
    id_talent_pool: "TP-2025-DIG-0007",
    dt_entry: "2025-10-01",
    dt_exit: null,
    pool_status: "active",
    ranking: 12,
    is_top_talent: false
  },
  calibration_result: {
    id_employee: "EMP-INJ-0000000001",
    period: "annual_2025",
    pre_calibration_rating: "a",
    post_calibration_rating: "b",
    dt_calibration: "2025-12-18",
    id_calibration_committee: "COM-CAL-2025-TRF-001"
  },
  employee_contract: {
    id_contract: "CTR-EMP-INJ-0000000001-0001",
    id_employee: "EMP-INJ-0000000001",
    contract_number: "PKWTT-IJH-2015-001234",
    contract_type: "pkwtt",
    dt_contract_start: "2015-08-01",
    dt_contract_end: null,
    contract_status: "active",
    contract_renewal_count: 0,
    dt_probation_start: "2015-08-01",
    dt_probation_end: "2015-11-01",
    probation_status: "passed"
  }
};
