// Mock data for additional employee profiles
export const EMPLOYEE_PROFILES = {
  "richard@injourney.co.id": {
    employee_profile: {
      id_employee: "EMP-API-0000000002",
      old_nip: 1990082312,
      new_nip: 2020000456,
      full_name: "Richard Kevin",
      name_alias: "Richard",
      academic_title: "S.Kom.",
      corporate_email: "richard@injourney.co.id",
      employment_status: "active",
      leave_type: null,
      photo_blob: null,
      dwh_source_system: "HRIS_MULTI_ENTITY"
    },
    employee_company_assignment: {
      id_employee: "EMP-API-0000000002",
      company_name: "PT API",
      business_unit: "Digital Technology",
      department: "Engineering",
      division: "Software Development",
      section: "Backend Team",
      job_position: "Senior Software Engineer",
      job_function: "Backend Development",
      direct_manager_id: "EMP-API-0000001",
      direct_manager_name: "Budi Santoso"
    },
    employee_education_history: [
      {
        id_employee: "EMP-API-0000000002",
        education_level_code: "s1",
        education_degree_type: "bachelor",
        institution_name: "Universitas Padjadjaran",
        institution_country: "Indonesia",
        faculty: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
        major: "Ilmu Komputer",
        concentration: "Software Engineering",
        dt_start: "2008-08-01",
        dt_end: "2012-07-30",
        final_score: 3.65,
        achievement_notes: "Cum Laude - Skripsi: Implementasi Microservices Architecture"
      },
      {
        id_employee: "EMP-API-0000000002",
        education_level_code: "sma",
        education_degree_type: "ipa",
        institution_name: "SMA Negeri 3 Bandung",
        institution_country: "Indonesia",
        faculty: null,
        major: "Ilmu Pengetahuan Alam",
        concentration: null,
        dt_start: "2005-07-01",
        dt_end: "2008-06-30",
        final_score: 88.5,
        achievement_notes: "Juara 1 Olimpiade Komputer Tingkat Provinsi"
      }
    ],
    employee_work_history: [
      {
        id_employee: "EMP-API-0000000002",
        company_name: "PT Solusi Digital Indonesia",
        job_position: "Junior Developer",
        start_date: "2012-09-01",
        end_date: "2015-12-31",
        job_description: "Mengembangkan aplikasi web menggunakan PHP dan MySQL",
        reason_leaving: "Mencari tantangan baru"
      },
      {
        id_employee: "EMP-API-0000000002",
        company_name: "PT Teknologi Nusantara",
        job_position: "Software Engineer",
        start_date: "2016-01-01",
        end_date: "2020-02-28",
        job_description: "Backend development dengan Node.js dan Python, implementasi RESTful API",
        reason_leaving: "Career advancement"
      },
      {
        id_employee: "EMP-API-0000000002",
        company_name: "PT API",
        job_position: "Senior Software Engineer",
        start_date: "2020-03-01",
        end_date: null,
        job_description: "Lead backend team, arsitektur sistem, code review, mentoring junior developers",
        reason_leaving: null
      }
    ],
    employee_skills: [
      { skill_name: "Backend Development", skill_level: "expert", category: "Technical" },
      { skill_name: "Node.js", skill_level: "expert", category: "Technical" },
      { skill_name: "Python", skill_level: "advanced", category: "Technical" },
      { skill_name: "PostgreSQL", skill_level: "advanced", category: "Technical" },
      { skill_name: "Docker & Kubernetes", skill_level: "intermediate", category: "Technical" },
      { skill_name: "Problem Solving", skill_level: "expert", category: "Soft Skill" }
    ],
    employee_hobbies: [
      { hobby_name: "Coding Open Source Projects", category: "Technology" },
      { hobby_name: "Mountain Hiking", category: "Outdoor" },
      { hobby_name: "Reading Tech Books", category: "Learning" }
    ],
    employee_interests: [
      { interest_name: "Cloud Architecture", description: "Exploring serverless and cloud-native solutions" },
      { interest_name: "Machine Learning", description: "Implementing ML models in production systems" },
      { interest_name: "DevOps Culture", description: "Continuous integration and deployment practices" }
    ],
    employee_awards: [
      {
        award_name: "Best Innovation Award",
        issued_by: "PT API",
        issue_date: "2023-12-15",
        description: "Untuk implementasi sistem monitoring real-time yang meningkatkan uptime 99.9%"
      },
      {
        award_name: "Employee of the Year",
        issued_by: "PT Teknologi Nusantara",
        issue_date: "2019-12-20",
        description: "Kontribusi luar biasa dalam pengembangan platform core banking"
      }
    ]
  },
  "firman@injourney.co.id": {
    employee_profile: {
      id_employee: "EMP-SAR-0000000003",
      old_nip: 1985061015,
      new_nip: 2018000789,
      full_name: "Firman Akbar",
      name_alias: "Firman",
      academic_title: "S.E., M.M.",
      corporate_email: "firman@injourney.co.id",
      employment_status: "active",
      leave_type: null,
      photo_blob: null,
      dwh_source_system: "HRIS_MULTI_ENTITY"
    },
    employee_company_assignment: {
      id_employee: "EMP-SAR-0000000003",
      company_name: "PT Sarinah",
      business_unit: "Marketing & Communications",
      department: "Media Marketing",
      division: "Digital Marketing",
      section: "Content Strategy",
      job_position: "VP Media Marketing",
      job_function: "Strategic Marketing Leadership",
      direct_manager_id: "EMP-SAR-0000001",
      direct_manager_name: "Dewi Kusuma"
    },
    employee_education_history: [
      {
        id_employee: "EMP-SAR-0000000003",
        education_level_code: "s2",
        education_degree_type: "master",
        institution_name: "Universitas Indonesia",
        institution_country: "Indonesia",
        faculty: "Fakultas Ekonomi dan Bisnis",
        major: "Magister Manajemen",
        concentration: "Marketing Management",
        dt_start: "2014-08-01",
        dt_end: "2016-12-30",
        final_score: 3.82,
        achievement_notes: "Thesis: Digital Marketing Transformation in Retail Industry"
      },
      {
        id_employee: "EMP-SAR-0000000003",
        education_level_code: "s1",
        education_degree_type: "bachelor",
        institution_name: "Universitas Airlangga",
        institution_country: "Indonesia",
        faculty: "Fakultas Ekonomi dan Bisnis",
        major: "Manajemen",
        concentration: "Marketing",
        dt_start: "2003-08-01",
        dt_end: "2007-07-30",
        final_score: 3.55,
        achievement_notes: "Best Marketing Campaign Project Award"
      }
    ],
    employee_work_history: [
      {
        id_employee: "EMP-SAR-0000000003",
        company_name: "PT Advertising Prima",
        job_position: "Marketing Executive",
        start_date: "2007-09-01",
        end_date: "2011-12-31",
        job_description: "Mengelola kampanye marketing untuk berbagai brand FMCG",
        reason_leaving: "Promosi ke perusahaan lebih besar"
      },
      {
        id_employee: "EMP-SAR-0000000003",
        company_name: "PT Media Digital Indonesia",
        job_position: "Senior Marketing Manager",
        start_date: "2012-01-01",
        end_date: "2017-12-31",
        job_description: "Memimpin tim digital marketing, mengembangkan strategi content marketing",
        reason_leaving: "Career progression"
      },
      {
        id_employee: "EMP-SAR-0000000003",
        company_name: "PT Sarinah",
        job_position: "VP Media Marketing",
        start_date: "2018-01-15",
        end_date: null,
        job_description: "Memimpin strategi media marketing, mengembangkan brand awareness melalui multi-channel approach",
        reason_leaving: null
      }
    ],
    employee_skills: [
      { skill_name: "Digital Marketing Strategy", skill_level: "expert", category: "Marketing" },
      { skill_name: "Content Marketing", skill_level: "expert", category: "Marketing" },
      { skill_name: "Brand Management", skill_level: "advanced", category: "Marketing" },
      { skill_name: "Social Media Marketing", skill_level: "expert", category: "Marketing" },
      { skill_name: "Marketing Analytics", skill_level: "advanced", category: "Technical" },
      { skill_name: "Team Leadership", skill_level: "expert", category: "Soft Skill" }
    ],
    employee_hobbies: [
      { hobby_name: "Photography", category: "Creative" },
      { hobby_name: "Traveling", category: "Lifestyle" },
      { hobby_name: "Content Creation", category: "Creative" }
    ],
    employee_interests: [
      { interest_name: "Influencer Marketing", description: "Exploring collaboration strategies with micro and macro influencers" },
      { interest_name: "Video Marketing", description: "Short-form video content and storytelling" },
      { interest_name: "Sustainable Marketing", description: "Green marketing and corporate social responsibility" }
    ],
    employee_awards: [
      {
        award_name: "Best Digital Campaign of the Year",
        issued_by: "Indonesia Marketing Association",
        issue_date: "2022-11-10",
        description: "Kampanye #SarinahBerubah yang mencapai 10M+ impressions"
      },
      {
        award_name: "Marketing Excellence Award",
        issued_by: "PT Sarinah",
        issue_date: "2021-12-15",
        description: "Meningkatkan brand awareness PT Sarinah sebesar 150%"
      }
    ]
  },
  "raka.putra@injourney.co.id": {
    employee_profile: {
      id_employee: "EMP-INJ-0000000004",
      old_nip: 1998112520,
      new_nip: 2023000321,
      full_name: "Muhammad Raka Putra",
      name_alias: "Raka",
      academic_title: "S.Si.",
      corporate_email: "raka.putra@injourney.co.id",
      employment_status: "active",
      leave_type: null,
      photo_blob: null,
      dwh_source_system: "HRIS_MULTI_ENTITY"
    },
    employee_company_assignment: {
      id_employee: "EMP-INJ-0000000004",
      company_name: "Injourney Holding",
      business_unit: "Data & Analytics",
      department: "Business Intelligence",
      division: "Data Analytics",
      section: "Analytics Team",
      job_position: "Junior Data Analyst",
      job_function: "Data Analysis & Reporting",
      direct_manager_id: "EMP-INJ-0000002",
      direct_manager_name: "Siti Rahmawati"
    },
    employee_education_history: [
      {
        id_employee: "EMP-INJ-0000000004",
        education_level_code: "s1",
        education_degree_type: "bachelor",
        institution_name: "Institut Teknologi Bandung",
        institution_country: "Indonesia",
        faculty: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
        major: "Statistika",
        concentration: "Data Science",
        dt_start: "2016-08-01",
        dt_end: "2020-07-30",
        final_score: 3.52,
        achievement_notes: "Skripsi: Predictive Analytics for Customer Churn using Machine Learning"
      },
      {
        id_employee: "EMP-INJ-0000000004",
        education_level_code: "sma",
        education_degree_type: "ipa",
        institution_name: "SMA Negeri 8 Jakarta",
        institution_country: "Indonesia",
        faculty: null,
        major: "Ilmu Pengetahuan Alam",
        concentration: null,
        dt_start: "2013-07-01",
        dt_end: "2016-06-30",
        final_score: 87.2,
        achievement_notes: "Peringkat 10 besar angkatan"
      }
    ],
    employee_work_history: [
      {
        id_employee: "EMP-INJ-0000000004",
        company_name: "PT Analytics Indonesia",
        job_position: "Data Analyst Intern",
        start_date: "2020-09-01",
        end_date: "2021-06-30",
        job_description: "Membuat dashboard reporting, analisis data penjualan, dan customer segmentation",
        reason_leaving: "Mencari posisi full-time"
      },
      {
        id_employee: "EMP-INJ-0000000004",
        company_name: "PT Startup Teknologi",
        job_position: "Junior Data Analyst",
        start_date: "2021-07-01",
        end_date: "2023-06-30",
        job_description: "Analisis user behavior, A/B testing, dan product analytics",
        reason_leaving: "Career growth"
      },
      {
        id_employee: "EMP-INJ-0000000004",
        company_name: "Injourney Holding",
        job_position: "Junior Data Analyst",
        start_date: "2023-07-01",
        end_date: null,
        job_description: "Business intelligence reporting, data visualization, dan ad-hoc analysis",
        reason_leaving: null
      }
    ],
    employee_skills: [
      { skill_name: "Data Analysis", skill_level: "advanced", category: "Technical" },
      { skill_name: "Python", skill_level: "advanced", category: "Technical" },
      { skill_name: "SQL", skill_level: "advanced", category: "Technical" },
      { skill_name: "Tableau", skill_level: "intermediate", category: "Technical" },
      { skill_name: "Power BI", skill_level: "intermediate", category: "Technical" },
      { skill_name: "Statistical Analysis", skill_level: "advanced", category: "Technical" }
    ],
    employee_hobbies: [
      { hobby_name: "Data Visualization Projects", category: "Technology" },
      { hobby_name: "Gaming", category: "Entertainment" },
      { hobby_name: "Basketball", category: "Sports" }
    ],
    employee_interests: [
      { interest_name: "Machine Learning", description: "Building predictive models and automation" },
      { interest_name: "Data Engineering", description: "Learning about data pipelines and ETL processes" },
      { interest_name: "Business Analytics", description: "Turning data insights into business strategies" }
    ],
    employee_awards: [
      {
        award_name: "Best Newcomer Award",
        issued_by: "Injourney Holding",
        issue_date: "2024-12-20",
        description: "Kontribusi luar biasa dalam pembuatan dashboard eksekutif yang meningkatkan decision making speed"
      }
    ]
  },
  "dimas@injourney.co.id": {
    employee_profile: {
      id_employee: "EMP-INJ-0000000005",
      old_nip: 1982031008,
      new_nip: 2015000654,
      full_name: "Dimas Sayyid",
      name_alias: "Dimas",
      academic_title: "S.Psi., M.M.",
      corporate_email: "dimas@injourney.co.id",
      employment_status: "active",
      leave_type: null,
      photo_blob: null,
      dwh_source_system: "HRIS_MULTI_ENTITY"
    },
    employee_company_assignment: {
      id_employee: "EMP-INJ-0000000005",
      company_name: "Injourney Holding",
      business_unit: "Human Capital",
      department: "HC Strategy",
      division: "Strategic HR Planning",
      section: "HC Development",
      job_position: "VP Human Capital Strategy",
      job_function: "Strategic HC Leadership",
      direct_manager_id: "EMP-INJ-0000001",
      direct_manager_name: "Direktur HC"
    },
    employee_education_history: [
      {
        id_employee: "EMP-INJ-0000000005",
        education_level_code: "s2",
        education_degree_type: "master",
        institution_name: "Universitas Gadjah Mada",
        institution_country: "Indonesia",
        faculty: "Fakultas Ekonomi dan Bisnis",
        major: "Magister Manajemen",
        concentration: "Human Resource Management",
        dt_start: "2010-08-01",
        dt_end: "2012-12-30",
        final_score: 3.88,
        achievement_notes: "Thesis: Talent Management Strategy in Digital Era - Best Thesis Award"
      },
      {
        id_employee: "EMP-INJ-0000000005",
        education_level_code: "s1",
        education_degree_type: "bachelor",
        institution_name: "Universitas Indonesia",
        institution_country: "Indonesia",
        faculty: "Fakultas Psikologi",
        major: "Psikologi",
        concentration: "Psikologi Industri & Organisasi",
        dt_start: "2000-08-01",
        dt_end: "2004-07-30",
        final_score: 3.72,
        achievement_notes: "Cum Laude - Active in Industrial Psychology Research"
      }
    ],
    employee_work_history: [
      {
        id_employee: "EMP-INJ-0000000005",
        company_name: "PT Konsultan HR Indonesia",
        job_position: "HR Consultant",
        start_date: "2004-09-01",
        end_date: "2008-12-31",
        job_description: "Memberikan konsultasi HR untuk berbagai klien korporat, talent assessment, dan organizational development",
        reason_leaving: "In-house position opportunity"
      },
      {
        id_employee: "EMP-INJ-0000000005",
        company_name: "PT Multinasional Corporation",
        job_position: "Senior HR Manager",
        start_date: "2009-01-01",
        end_date: "2015-08-31",
        job_description: "Mengelola seluruh fungsi HR, talent acquisition, learning & development, dan compensation & benefits",
        reason_leaving: "Leadership role opportunity"
      },
      {
        id_employee: "EMP-INJ-0000000005",
        company_name: "Injourney Holding",
        job_position: "VP Human Capital Strategy",
        start_date: "2015-09-01",
        end_date: null,
        job_description: "Memimpin strategic HR planning, talent management, succession planning, dan HR transformation",
        reason_leaving: null
      }
    ],
    employee_skills: [
      { skill_name: "Strategic HR Planning", skill_level: "expert", category: "HR" },
      { skill_name: "Talent Management", skill_level: "expert", category: "HR" },
      { skill_name: "Organizational Development", skill_level: "expert", category: "HR" },
      { skill_name: "Change Management", skill_level: "advanced", category: "HR" },
      { skill_name: "Leadership Coaching", skill_level: "expert", category: "Soft Skill" },
      { skill_name: "HR Analytics", skill_level: "advanced", category: "Technical" }
    ],
    employee_hobbies: [
      { hobby_name: "Public Speaking", category: "Professional Development" },
      { hobby_name: "Golf", category: "Sports" },
      { hobby_name: "Reading Business Books", category: "Learning" }
    ],
    employee_interests: [
      { interest_name: "People Analytics", description: "Using data to drive HR decisions and improve employee experience" },
      { interest_name: "Future of Work", description: "Exploring hybrid work models and digital transformation in HR" },
      { interest_name: "Employee Wellbeing", description: "Mental health initiatives and work-life integration" }
    ],
    employee_awards: [
      {
        award_name: "HR Leader of the Year",
        issued_by: "Indonesia HR Awards",
        issue_date: "2024-10-15",
        description: "Kepemimpinan luar biasa dalam transformasi digital HR di Injourney Holding"
      },
      {
        award_name: "Best Talent Management Program",
        issued_by: "Asia HR Excellence Awards",
        issue_date: "2023-09-20",
        description: "Program talent development yang meningkatkan employee retention rate hingga 95%"
      },
      {
        award_name: "HR Excellence Award",
        issued_by: "Injourney Holding",
        issue_date: "2022-12-15",
        description: "Implementasi HRIS system yang meningkatkan HR operational efficiency"
      }
    ]
  }
};

// Helper function to get employee data by email
export const getEmployeeDataByEmail = (email: string) => {
  return EMPLOYEE_PROFILES[email as keyof typeof EMPLOYEE_PROFILES] || null;
};