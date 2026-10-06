/**
 * DSCASC AI - Curated Official Knowledge Base
 * Sourced directly from official Dayananda Sagar College of Arts, Science and Commerce
 * portal: https://www.dscasc.edu.in
 */

export interface SourceInfo {
  name: string;
  url: string;
  lastVerified: string;
}

export interface StatItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface LinkItem {
  title: string;
  url: string;
  description?: string;
}

export interface ContactInfo {
  name?: string;
  role?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface IntentResponse {
  text: string;
  highlights?: string[];
  cardType?: "info" | "stats" | "contact" | "links";
  stats?: StatItem[];
  links?: LinkItem[];
  contact?: ContactInfo;
  source?: SourceInfo;
  suggestions?: string[];
}

export interface Intent {
  id: string;
  category: "general" | "admissions" | "courses" | "academics" | "fees" | "college" | "placements";
  title: string;
  examples: string[];
  keywords?: string[];
  response: IntentResponse;
}

export const KNOWLEDGE_BASE: Intent[] = [
  // ================= GENERAL INTENTS =================
  {
    id: "greeting",
    category: "general",
    title: "Greeting",
    examples: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "hey there",
      "namaste",
      "hello chatbot",
      "hi dscasc ai",
    ],
    response: {
      text: "Hello! Welcome to DSCASC AI — your automated student guidance assistant for Dayananda Sagar College of Arts, Science and Commerce.\n\nI can assist you with admissions, BCA details, course curriculums, timetables, examinations, verified placement statistics, and official contact channels.",
      cardType: "info",
      highlights: [
        "Ask questions in natural language",
        "Includes official DSCASC website source links",
        "Covers admissions, BCA, placements & exams",
      ],
      suggestions: [
        "How do I apply for BCA?",
        "What are the placement statistics?",
        "Where can I find the BCA timetable?",
        "How do I contact DSCASC?",
      ],
    },
  },
  {
    id: "thanks",
    category: "general",
    title: "Gratitude & Thanks",
    examples: [
      "thank you",
      "thanks",
      "tysm",
      "thanks a lot",
      "thank you so much",
      "appreciate your help",
      "that was helpful",
      "thanks dscasc ai",
    ],
    response: {
      text: "You are very welcome! If you have any more questions about courses, BCA academics, placements, or college procedures at DSCASC, feel free to ask anytime.",
      suggestions: [
        "What courses does DSCASC offer?",
        "Tell me about BCA syllabus",
        "What is the highest salary in placements?",
      ],
    },
  },
  {
    id: "help",
    category: "general",
    title: "Help & Capabilities",
    examples: [
      "help",
      "what can you do",
      "how can you help me",
      "guide me",
      "what topics can i ask",
      "bot capabilities",
      "list your features",
      "what do you know",
    ],
    response: {
      text: "I am an NLP-powered academic guidance assistant for Dayananda Sagar College of Arts, Science and Commerce (DSCASC). Here is what you can ask me about:",
      cardType: "info",
      highlights: [
        "Admissions: Eligibility, application procedure, required documents",
        "Courses: BCA, BBA, B.Com, B.Sc, MCA, MBA, M.Com",
        "Academics: BCA timetable, syllabus, exams, faculty, circulars",
        "Placements: Published statistics, recruiting companies, placement cell contact",
        "College: Campus location, vision, facilities, official office contact",
      ],
      suggestions: [
        "How can I apply for BCA?",
        "Show BCA timetable",
        "What is the average placement package?",
        "Who is the BCA HOD?",
      ],
    },
  },
  {
    id: "goodbye",
    category: "general",
    title: "Farewell",
    examples: [
      "bye",
      "goodbye",
      "see you",
      "cya",
      "talk to you later",
      "exit",
      "quit",
      "have a good day",
    ],
    response: {
      text: "Goodbye! Wishing you the best in your academic journey at Dayananda Sagar College of Arts, Science and Commerce. Feel free to come back whenever you need student guidance.",
    },
  },

  // ================= ADMISSIONS INTENTS =================
  {
    id: "admission_process",
    category: "admissions",
    title: "Admission Procedure",
    examples: [
      "how do i apply",
      "admission process",
      "how to take admission in dscasc",
      "procedure for admission",
      "how to join dscasc",
      "steps for admission",
      "how can i apply for bca",
      "what is the admission process",
      "apply for admission",
    ],
    response: {
      text: "Admissions to Dayananda Sagar College of Arts, Science and Commerce (DSCASC) are conducted through the online enquiry portal and college admissions desk:\n\n1. Fill the official Online Enquiry / Application Form at the admissions portal.\n2. Submit academic records (10th and 12th/PUC marks cards) for eligibility verification.\n3. Attend counselling / verification at the DSCASC campus.\n4. Complete fee payment and enrollment upon confirmation.",
      cardType: "links",
      links: [
        {
          title: "Online Admission Enquiry Form",
          url: "https://apply.dayanandasagar.edu/dscasc",
          description: "Official Dayananda Sagar online application & enquiry portal",
        },
        {
          title: "DSCASC Official Prospectus",
          url: "https://dscasc.edu.in/images/pdf/Prospectu.pdf",
          description: "Download the institutional prospectus PDF",
        },
      ],
      source: {
        name: "DSCASC Admissions Section",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "Academic Year 2024-25",
      },
      suggestions: [
        "What are the eligibility criteria for BCA?",
        "What documents are required for admission?",
        "How do I contact the admissions office?",
      ],
    },
  },
  {
    id: "admission_enquiry",
    category: "admissions",
    title: "Admission Enquiry & Helplines",
    examples: [
      "admission enquiry",
      "admission helpline",
      "who to contact for admission",
      "admission phone number",
      "admission cell contact",
      "enquiry form",
      "where can i enquire about admission",
    ],
    response: {
      text: "For all admission queries and seat confirmations, students and parents can contact the DSCASC Admissions Office directly or submit an online enquiry form.",
      cardType: "contact",
      contact: {
        name: "DSCASC Admissions Office",
        role: "Admissions & Counseling Desk",
        phone: "+91 8792909121 / +91 9972780251 / 080-42161709",
        email: "admissions@dayanandasagar.edu",
        address: "Shavige Malleshwara Hills, Kumaraswamy Layout, Bangalore - 560111",
      },
      links: [
        {
          title: "Submit Online Admission Enquiry",
          url: "https://apply.dayanandasagar.edu/dscasc",
        },
      ],
      source: {
        name: "DSCASC Contact Portal",
        url: "https://www.dscasc.edu.in/contact",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What is the eligibility for BCA?",
        "What documents do I need for admission?",
      ],
    },
  },
  {
    id: "eligibility",
    category: "admissions",
    title: "Eligibility Criteria",
    examples: [
      "what is the eligibility",
      "eligibility for bca",
      "am i eligible for bca",
      "who can apply for bca",
      "minimum marks required for admission",
      "bca admission eligibility criteria",
      "qualification required for bca",
      "can arts students apply for bca",
      "can commerce students apply for bca",
    ],
    response: {
      text: "Eligibility criteria at DSCASC (Affiliated to Bangalore University):\n\n• For BCA: Candidates who have successfully passed Two-Year Pre-University Examination (PUC) of Karnataka State or 10+2 / equivalent examination in any stream (Science, Commerce, or Arts) with Mathematics / Computer Science / Business Mathematics / Statistics or an equivalent foundation with requisite pass marks.\n• For BBA / B.Com: Candidates who have passed 10+2 / Karnataka Pre-University Course or equivalent.\n• For B.Sc: Candidates with 10+2 / PUC in Science subjects.\n• For MCA / MBA: Bachelor's degree with valid PGCET / KMAT / equivalent entrance score.",
      cardType: "info",
      highlights: [
        "BCA accepts candidates from recognized 10+2 / PUC boards",
        "Bangalore University norms apply for qualifying percentages",
        "Direct counselling available at the college admissions office",
      ],
      source: {
        name: "DSCASC Course Eligibility Guidelines",
        url: "https://www.dscasc.edu.in/courses/ug/bca",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What documents are required for admission?",
        "How do I apply for BCA?",
        "What are the fees for BCA?",
      ],
    },
  },
  {
    id: "documents_required",
    category: "admissions",
    title: "Required Documents for Admission",
    examples: [
      "what documents are required",
      "documents needed for admission",
      "certificates required for bca admission",
      "list of documents needed",
      "what to bring for admission",
      "wat documents needed",
      "admission checklist",
    ],
    response: {
      text: "The following original documents along with 3 sets of attested photocopies are required at the time of admission verification at DSCASC:\n\n1. 10th Standard / SSLC Marks Card\n2. 12th Standard / II PUC Marks Card\n3. Transfer Certificate (TC) from the previous institution\n4. Migration Certificate (for Non-Karnataka / CBSE / ICSE boards)\n5. Conduct / Study Certificate (minimum 7 years in Karnataka for local quota)\n6. Caste & Income Certificate (if claiming reservation)\n7. Aadhaar Card copy (Student & Parents)\n8. Recent passport-size photographs (5 copies)",
      cardType: "info",
      highlights: [
        "Carry originals for instant verification",
        "Migration Certificate is mandatory for non-state board students",
        "Keep scanned digital copies for university portal registration",
      ],
      source: {
        name: "DSCASC Admissions Checklist",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "How do I apply for BCA?",
        "Who can I contact for admission queries?",
      ],
    },
  },
  {
    id: "application_information",
    category: "admissions",
    title: "Application Form & Brochure",
    examples: [
      "application form",
      "download application form",
      "dscasc admission form",
      "where is application form",
      "college brochure",
      "download brochure",
      "prospectus download",
    ],
    response: {
      text: "You can access the online application form and download official institutional brochures directly from DSCASC:",
      cardType: "links",
      links: [
        {
          title: "Online Application & Enquiry Portal",
          url: "https://apply.dayanandasagar.edu/dscasc",
          description: "Submit your online admission form for academic year 2024-25",
        },
        {
          title: "Download College Brochure",
          url: "https://www.dscasc.edu.in/images/pdf/brochure_20-21.pdf",
          description: "Official DSCASC overview brochure PDF",
        },
        {
          title: "Download College Prospectus",
          url: "https://dscasc.edu.in/images/pdf/Prospectu.pdf",
          description: "Comprehensive prospectus with institutional profile",
        },
      ],
      source: {
        name: "DSCASC Admissions Section",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What is the admission procedure?",
        "What are the eligibility criteria?",
      ],
    },
  },

  // ================= COURSES INTENTS =================
  {
    id: "courses_available",
    category: "courses",
    title: "Programs Offered",
    examples: [
      "what courses are available",
      "courses offered",
      "list of courses at dscasc",
      "what degrees does dscasc offer",
      "undergraduate courses",
      "postgraduate courses",
      "ug pg programs",
      "what can i study at dscasc",
    ],
    response: {
      text: "Dayananda Sagar College of Arts, Science and Commerce offers recognized Undergraduate (UG) and Postgraduate (PG) programs affiliated with Bangalore University:\n\n• Undergraduate (UG):\n  - BCA (Bachelor of Computer Applications)\n  - BBA (Bachelor of Business Administration)\n  - B.Com (Bachelor of Commerce)\n  - B.Sc (Bachelor of Science)\n\n• Postgraduate (PG):\n  - MCA (Master of Computer Applications - AICTE approved)\n  - MBA (Master of Business Administration - AICTE approved)\n  - M.Com (Master of Commerce)\n\n• Skill Enhancement Courses:\n  - Full Stack Web Development, AWS Cloud Practitioner, Data Analytics, Tally, Excel, Digital Marketing",
      cardType: "info",
      highlights: [
        "Affiliated with Bangalore University",
        "UGC recognized & accredited",
        "Includes industry-aligned skill enhancement certifications",
      ],
      links: [
        {
          title: "BCA Program Details",
          url: "https://www.dscasc.edu.in/courses/ug/bca",
        },
        {
          title: "DSCASC Programs Overview",
          url: "https://www.dscasc.edu.in/",
        },
      ],
      source: {
        name: "DSCASC Programs",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Tell me about the BCA course",
        "What is the eligibility for BCA?",
        "Does DSCASC offer MCA?",
      ],
    },
  },
  {
    id: "bca_information",
    category: "courses",
    title: "Bachelor of Computer Applications (BCA)",
    examples: [
      "tell me about bca",
      "bca course details",
      "bca program at dscasc",
      "bca department",
      "bca details",
      "information about bca",
      "why study bca at dscasc",
      "bca curriculum details",
    ],
    response: {
      text: "The Department of Computer Applications (BCA) at DSCASC was founded in the year 2000 and is affiliated with Bangalore University. The department aims to develop skilled IT professionals through high-quality pedagogy, hands-on lab sessions, and research initiatives.\n\nKey Highlights:\n• Head of Department: Dr. Aruna Devi C (MCA, M.Phil, Ph.D), Associate Professor & HOD\n• Centers of Excellence: Data Science & Artificial Intelligence, Cyber Security\n• Specializations / Tracks: AI & Machine Learning, Data Science, Full Stack Development (SEP 2024)\n• Student Units: AKSHARA (Language & Literary Unit), Coding Clubs, Guest Lecture Series",
      cardType: "links",
      links: [
        {
          title: "Official BCA Department Portal",
          url: "https://www.dscasc.edu.in/courses/ug/bca",
          description: "Complete department profile, staff, facilities",
        },
        {
          title: "BCA Syllabus SEP 2024",
          url: "https://www.dscasc.edu.in/images/BCA/syllabus/Amdf.pdf",
          description: "Curriculum for AI, Data Science & Full Stack",
        },
        {
          title: "BCA Timetables",
          url: "https://dscasc.edu.in/bca/bca-timetable",
          description: "Official published semester schedules",
        },
      ],
      source: {
        name: "Department of Computer Applications (BCA)",
        url: "https://www.dscasc.edu.in/courses/ug/bca",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Where can I find the BCA timetable?",
        "What is the BCA syllabus?",
        "Who is the BCA HOD?",
        "What are the placement opportunities for BCA?",
      ],
    },
  },
  {
    id: "bba_information",
    category: "courses",
    title: "Bachelor of Business Administration (BBA)",
    examples: [
      "tell me about bba",
      "bba course details",
      "bba program",
      "bba admission at dscasc",
      "bba department",
    ],
    response: {
      text: "The Bachelor of Business Administration (BBA) program at DSCASC is affiliated with Bangalore University. The course equips students with leadership, managerial acumen, financial analysis, and entrepreneurial skills through case studies and corporate guest lectures.",
      cardType: "links",
      links: [
        {
          title: "DSCASC BBA Program Overview",
          url: "https://www.dscasc.edu.in/courses/ug/bba",
        },
      ],
      source: {
        name: "DSCASC Department of Management Studies",
        url: "https://www.dscasc.edu.in/courses/ug/bba",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What other UG courses are available?",
        "How do I apply for BBA?",
      ],
    },
  },
  {
    id: "bcom_information",
    category: "courses",
    title: "Bachelor of Commerce (B.Com)",
    examples: [
      "tell me about bcom",
      "bcom course details",
      "bcom at dscasc",
      "bcom program",
      "bcom commerce department",
    ],
    response: {
      text: "The Bachelor of Commerce (B.Com) program at DSCASC is affiliated with Bangalore University. It provides an extensive foundation in accounting, taxation, financial management, corporate law, and business economics, supplemented with certification courses like Tally and Advanced Excel.",
      cardType: "links",
      links: [
        {
          title: "DSCASC B.Com Program Overview",
          url: "https://www.dscasc.edu.in/courses/ug/bcom",
        },
      ],
      source: {
        name: "DSCASC Department of Commerce",
        url: "https://www.dscasc.edu.in/courses/ug/bcom",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What courses does DSCASC offer?",
        "What documents are required for admission?",
      ],
    },
  },
  {
    id: "bsc_information",
    category: "courses",
    title: "Bachelor of Science (B.Sc)",
    examples: [
      "tell me about bsc",
      "bsc course details",
      "bsc combinations",
      "bsc program at dscasc",
      "science degree at dscasc",
    ],
    response: {
      text: "DSCASC offers Bachelor of Science (B.Sc) programs affiliated with Bangalore University, featuring modern science and computer science laboratories with rigorous practical training.",
      cardType: "links",
      links: [
        {
          title: "DSCASC B.Sc Program Overview",
          url: "https://www.dscasc.edu.in/courses/ug/bsc",
        },
      ],
      source: {
        name: "DSCASC Science Department",
        url: "https://www.dscasc.edu.in/courses/ug/bsc",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What UG courses are offered?",
        "How do I contact admissions?",
      ],
    },
  },
  {
    id: "mca_information",
    category: "courses",
    title: "Master of Computer Applications (MCA)",
    examples: [
      "tell me about mca",
      "does dscasc have mca",
      "mca program details",
      "mca admission",
      "mca eligibility at dscasc",
      "pg computer courses",
    ],
    response: {
      text: "DSCASC offers a Master of Computer Applications (MCA) postgraduate program, approved by AICTE and affiliated with Bangalore University. The MCA program delivers advanced training in enterprise software engineering, distributed systems, cloud computing, and AI architectures.",
      cardType: "links",
      links: [
        {
          title: "DSCASC MCA Course Page",
          url: "https://www.dscasc.edu.in/courses/pg/mca",
        },
      ],
      source: {
        name: "DSCASC PG Department",
        url: "https://www.dscasc.edu.in/courses/pg/mca",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Tell me about the BCA course",
        "What are the placement statistics?",
      ],
    },
  },
  {
    id: "mba_information",
    category: "courses",
    title: "Master of Business Administration (MBA)",
    examples: [
      "tell me about mba",
      "does dscasc have mba",
      "mba course details",
      "mba admission",
      "mba program at dscasc",
    ],
    response: {
      text: "DSCASC offers an MBA program approved by AICTE and affiliated with Bangalore University, with specializations in Finance, Marketing, Human Resources, and Business Analytics.",
      cardType: "links",
      links: [
        {
          title: "DSCASC MBA Overview",
          url: "https://www.dscasc.edu.in/courses/pg/mba",
        },
      ],
      source: {
        name: "DSCASC Management Department",
        url: "https://www.dscasc.edu.in/courses/pg/mba",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What placement opportunities exist?",
        "How do I contact the college?",
      ],
    },
  },
  {
    id: "mcom_information",
    category: "courses",
    title: "Master of Commerce (M.Com)",
    examples: [
      "tell me about mcom",
      "mcom course details",
      "does dscasc have mcom",
      "mcom pg degree",
    ],
    response: {
      text: "The Master of Commerce (M.Com) at DSCASC is a 2-year postgraduate program affiliated with Bangalore University designed for advanced careers in finance, taxation, banking, and academic research.",
      cardType: "links",
      links: [
        {
          title: "DSCASC M.Com Details",
          url: "https://www.dscasc.edu.in/courses/pg/mcom",
        },
      ],
      source: {
        name: "DSCASC Commerce PG",
        url: "https://www.dscasc.edu.in/courses/pg/mcom",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What other courses are available?",
        "How do I apply?",
      ],
    },
  },

  // ================= ACADEMICS INTENTS =================
  {
    id: "bca_timetable",
    category: "academics",
    title: "BCA Timetable",
    examples: [
      "bca timetable",
      "bca class schedule",
      "where can i find the bca timetable",
      "whn is bca tymtable",
      "bca class timings",
      "show me bca timetable",
      "bca semester schedule",
      "download bca timetable",
    ],
    response: {
      text: "Official BCA semester timetables are published by the Department of Computer Applications on the college website:",
      cardType: "links",
      links: [
        {
          title: "Official BCA Timetable Portal",
          url: "https://dscasc.edu.in/bca/bca-timetable",
          description: "Main timetable portal with Odd & Even semester schedules",
        },
        {
          title: "Download 2026 Odd Semester Timetable",
          url: "https://www.dscasc.edu.in/images/BCA/timetable/odd26.pdf",
          description: "Latest published Odd semester class schedule PDF",
        },
        {
          title: "Download 2026 Even Semester Timetable",
          url: "https://www.dscasc.edu.in/images/BCA/timetable/even26.pdf",
          description: "Latest published Even semester class schedule PDF",
        },
      ],
      source: {
        name: "DSCASC BCA Timetable Section",
        url: "https://dscasc.edu.in/bca/bca-timetable",
        lastVerified: "Official Portal 2026",
      },
      suggestions: [
        "Show me the BCA syllabus",
        "When are the semester exams?",
        "Who is the BCA HOD?",
      ],
    },
  },
  {
    id: "timetable",
    category: "academics",
    title: "General Timetable",
    examples: [
      "timetable",
      "class timetable",
      "where is timetable",
      "show college timetable",
      "semester time table",
      "when are classes held",
      "daily schedule",
    ],
    response: {
      text: "College timetables for all departments are released at the commencement of each semester as per Bangalore University academic calendars. For BCA students, individual batch timetables are accessible on the BCA portal.",
      cardType: "links",
      links: [
        {
          title: "BCA Department Timetable Section",
          url: "https://dscasc.edu.in/bca/bca-timetable",
        },
        {
          title: "DSCASC Official Portal",
          url: "https://www.dscasc.edu.in/",
        },
      ],
      source: {
        name: "DSCASC Timetable Section",
        url: "https://dscasc.edu.in/bca/bca-timetable",
        lastVerified: "2026",
      },
      suggestions: [
        "View BCA timetable",
        "View BCA syllabus",
        "When are exams?",
      ],
    },
  },
  {
    id: "syllabus",
    category: "academics",
    title: "BCA & Degree Syllabus",
    examples: [
      "syllabus",
      "show me bca syllabus",
      "where can i find sylabus",
      "download syllabus",
      "bca subjects",
      "what subjects are in bca",
      "bca curriculum",
      "course syllabus",
      "nep syllabus",
      "sep 2024 syllabus",
    ],
    response: {
      text: "The official BCA syllabus structured under Bangalore University / State Education Policy (SEP 2024) and NEP is available for download:",
      cardType: "links",
      links: [
        {
          title: "Syllabus SEP 2024 (AI & ML / Data Science / Full Stack)",
          url: "https://www.dscasc.edu.in/images/BCA/syllabus/Amdf.pdf",
          description: "Current SEP syllabus covering modern computing specializations",
        },
        {
          title: "Syllabus NEP 2021 - 2023",
          url: "https://drive.google.com/file/d/1OzYUBRE7CnvQmDPNUUzMi0HzCYk_cH8Q/view",
          description: "Bangalore University NEP BCA curriculum structure",
        },
        {
          title: "DSCASC BCA Syllabus Portal",
          url: "https://dscasc.edu.in/bca/bca-syllabus",
          description: "Complete list of curriculum documents including EVS and Indian Constitution",
        },
      ],
      source: {
        name: "DSCASC BCA Syllabus Section",
        url: "https://dscasc.edu.in/bca/bca-syllabus",
        lastVerified: "Academic Year 2024-25",
      },
      suggestions: [
        "Where is the BCA timetable?",
        "When are semester exams?",
        "Tell me about BCA faculty",
      ],
    },
  },
  {
    id: "exam_information",
    category: "academics",
    title: "Examinations & Schedules",
    examples: [
      "when are exams",
      "when are semester exams",
      "exam timetable",
      "exam dates",
      "when r exams",
      "internal assessments",
      "bangalore university exam notification",
      "semester exam fee date",
    ],
    response: {
      text: "Semester examinations at DSCASC are conducted in accordance with the official notifications issued by Bangalore University:\n\n• Odd Semester Exams: Typically scheduled between December and January.\n• Even Semester Exams: Typically scheduled between May and June.\n• Internal Assessments: 2-3 Continuous Internal Evaluation (CIE) tests conducted per semester by respective departments.\n\nNote: Exact exam dates, hall ticket downloads, and fee payment deadlines are notified by Bangalore University. Always check official circulars for live dates.",
      cardType: "links",
      links: [
        {
          title: "DSCASC Academic Circulars & Notices",
          url: "https://www.dscasc.edu.in/",
          description: "Official notifications board",
        },
        {
          title: "Bangalore University Official Portal",
          url: "https://bangaloreuniversity.karnataka.gov.in/",
          description: "University exam announcements and results",
        },
      ],
      source: {
        name: "Bangalore University & DSCASC Exam Board",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Where can I find the BCA timetable?",
        "Show me the BCA syllabus",
        "How do I contact the college office?",
      ],
    },
  },
  {
    id: "academic_calendar",
    category: "academics",
    title: "Academic Calendar & Events",
    examples: [
      "academic calendar",
      "college calendar of events",
      "term dates",
      "when do classes start",
      "semester schedule",
      "bca calendar",
    ],
    response: {
      text: "The DSCASC Academic Calendar details the schedule of semester commencement, orientation programs, internal test windows, guest lectures, college cultural fests, and semester end dates as per Bangalore University guidelines.",
      cardType: "links",
      links: [
        {
          title: "BCA Department Academic Calendar",
          url: "https://dscasc.edu.in/bca/bca-calendar",
          description: "Scheduled department activities and guest lectures",
        },
      ],
      source: {
        name: "DSCASC Academic Affairs",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Show BCA timetable",
        "When are the exams?",
      ],
    },
  },
  {
    id: "faculty_information",
    category: "academics",
    title: "Faculty Information",
    examples: [
      "who are the faculty",
      "faculty details",
      "who is the hod",
      "bca hod name",
      "teachers in bca",
      "who teaches bca",
      "faculty members",
      "professors at dscasc",
    ],
    response: {
      text: "The DSCASC faculty comprises experienced professors, associate professors, and industry-certified lecturers with expertise in Computer Science, Artificial Intelligence, Management, and Commerce:\n\n• BCA Department Leadership: Dr. Aruna Devi C (MCA, M.Phil, Ph.D), Associate Professor & HOD\n• Department Email: hod-bca@dayanandasagar.edu\n• Department Contact: 080-42161737\n• Specialization Areas: Machine Learning, Cloud Architectures, Data Analytics, Cyber Security, Web Technologies.",
      cardType: "contact",
      contact: {
        name: "Dr. Aruna Devi C",
        role: "Associate Professor & HOD, Dept of Computer Applications (BCA)",
        phone: "080-42161737",
        email: "hod-bca@dayanandasagar.edu",
        address: "Building No. 17, DSCASC Campus",
      },
      links: [
        {
          title: "BCA Faculty Directory",
          url: "https://www.dscasc.edu.in/bca/bca-faculty",
          description: "Full list of BCA teaching faculty and profiles",
        },
      ],
      source: {
        name: "DSCASC BCA Department",
        url: "https://www.dscasc.edu.in/courses/ug/bca",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Tell me about the BCA course",
        "What are the placement opportunities?",
        "Where can I find the BCA timetable?",
      ],
    },
  },
  {
    id: "academic_circulars",
    category: "academics",
    title: "Academic Circulars & Notices",
    examples: [
      "academic circulars",
      "college notices",
      "latest circulars",
      "student notices",
      "announcements",
      "where can i check notices",
    ],
    response: {
      text: "Official announcements, student notifications, timetable updates, and circulars are posted on the college notice boards and the official DSCASC homepage announcement banner.",
      cardType: "links",
      links: [
        {
          title: "DSCASC Official Notice Board",
          url: "https://www.dscasc.edu.in/",
        },
      ],
      source: {
        name: "DSCASC News & Circulars",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "When are the semester exams?",
        "Show BCA timetable",
      ],
    },
  },

  // ================= FEES INTENTS =================
  {
    id: "fee_information",
    category: "fees",
    title: "Fee Structure Information",
    examples: [
      "how much are the fees",
      "what is bca fee",
      "how much does bca cost",
      "tell me bca fees",
      "how much money for bca",
      "bca fees",
      "bca fees??",
      "course fee details",
      "what is the fee structure",
      "tuition fees",
    ],
    response: {
      text: "Official Fee Policy:\nDayananda Sagar College of Arts, Science and Commerce does not publish a single flat fee structure online, as course fees vary based on:\n\n1. Admission Quota (Government/University Merit Quota vs. Management Quota)\n2. Candidate Category (Karnataka Domicile, Non-Karnataka, or International)\n3. Choice of Elective / Skill Enhancement Certifications\n4. Academic Year guidelines approved by Bangalore University & DSI Management\n\nTo obtain the exact verified fee breakdown for your program and quota, please consult the Admissions Counter at DSCASC directly.",
      cardType: "contact",
      contact: {
        name: "DSCASC Admissions & Accounts Desk",
        role: "Fee Verification & Quota Inquiries",
        phone: "+91 8792909121 / 080-42161709 / +91 9972780251",
        email: "admissions@dayanandasagar.edu",
        address: "Shavige Malleshwara Hills, Kumaraswamy Layout, Bangalore - 560111",
      },
      links: [
        {
          title: "Online Admission Enquiry",
          url: "https://apply.dayanandasagar.edu/dscasc",
          description: "Enquire directly for current approved fee quotes",
        },
      ],
      source: {
        name: "DSCASC Admissions Desk",
        url: "https://www.dscasc.edu.in/contact",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Are scholarships available?",
        "How do I pay fees?",
        "What is the eligibility for BCA?",
      ],
    },
  },
  {
    id: "fee_payment",
    category: "fees",
    title: "Fee Payment Modes",
    examples: [
      "how to pay fees",
      "fee payment methods",
      "can i pay online",
      "bank account for fee payment",
      "dd details for fee",
      "fee counter timings",
    ],
    response: {
      text: "College fees can be paid through:\n• Official DSI Online Payment Gateway (using the student registration number)\n• Demand Draft (DD) drawn in favor of 'Dayananda Sagar College of Arts, Science and Commerce' payable at Bangalore\n• College Cash/Fee Counter at Kumaraswamy Layout Campus during official office working hours (9:00 AM – 4:30 PM, Mon–Sat).\n\nAlways collect and preserve the official computer-generated fee receipt with college seal.",
      cardType: "contact",
      contact: {
        name: "DSCASC Accounts Section",
        phone: "080-42161709",
        address: "Accounts Section, Administrative Block, DSCASC Campus",
      },
      source: {
        name: "DSCASC Office Policy",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What are the scholarship options?",
        "How do I contact admissions?",
      ],
    },
  },
  {
    id: "scholarship_information",
    category: "fees",
    title: "Scholarship Facilities",
    examples: [
      "scholarship information",
      "are scholarships available",
      "can i get scholarship",
      "government scholarship for bca",
      "ssp scholarship",
      "national scholarship portal nsp",
      "fee concession",
    ],
    response: {
      text: "Eligible students at DSCASC can avail various Government and institutional scholarships:\n\n• Karnataka State Scholarship Portal (SSP): Post-matric scholarships for SC / ST / OBC / Minorities / Economically Weaker Section (EWS) candidates.\n• National Scholarship Portal (NSP): Central government merit-cum-means schemes.\n• Dayananda Sagar Management Merit Scholarships: Concessions awarded to exceptional academic achievers.\n• The college scholarship cell assists registered students with institutional verification and documentation.",
      cardType: "links",
      links: [
        {
          title: "Karnataka SSP Portal",
          url: "https://ssp.postmatric.karnataka.gov.in/",
          description: "Karnataka State Post-Matric Scholarship portal",
        },
        {
          title: "National Scholarship Portal (NSP)",
          url: "https://scholarships.gov.in/",
          description: "National scholarship opportunities",
        },
      ],
      source: {
        name: "DSCASC Student Welfare Cell",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What documents are needed for admission?",
        "What is the fee structure?",
      ],
    },
  },

  // ================= COLLEGE INTENTS =================
  {
    id: "college_information",
    category: "college",
    title: "About DSCASC",
    examples: [
      "tell me about dscasc",
      "about the college",
      "what is dscasc",
      "about dayananda sagar college",
      "history of dscasc",
      "who founded the college",
      "is dscasc autonomous or affiliated",
    ],
    response: {
      text: "Dayananda Sagar College of Arts, Science and Commerce (DSCASC), functioning under the aegis of the renowned Dayananda Sagar Institutions (DSI), is one of the premier and heritage degree colleges in Bengaluru, affiliated with Bangalore University and recognized by the Government of Karnataka.\n\nFounded by the visionary late Sri R. Dayananda Sagar, the college embodies the motto 'Live the Dream'. The institution provides state-of-the-art laboratories, ICT-enabled lecture halls, an expansive central library, and vibrant placement training.",
      cardType: "info",
      highlights: [
        "Affiliated to Bangalore University & recognized by Govt of Karnataka",
        "Part of the prestigious Dayananda Sagar Institutions (DSI)",
        "Sprawling campus at Shavige Malleshwara Hills, Bangalore",
      ],
      links: [
        {
          title: "Official DSCASC About Us Page",
          url: "https://www.dscasc.edu.in/about-us/about-dscasc",
        },
      ],
      source: {
        name: "DSCASC Profile",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What courses are offered?",
        "What is the placement record?",
        "Where is the campus located?",
      ],
    },
  },
  {
    id: "vision_mission",
    category: "college",
    title: "Vision & Mission",
    examples: [
      "vision and mission",
      "what is the vision of dscasc",
      "what is the mission",
      "college goal",
      "motto of dscasc",
    ],
    response: {
      text: "Official Institutional Vision & Mission:\n\n• Vision:\n\"To be a centre of excellence in education, research and training and to produce human resource of exceptional leadership quality to serve national needs.\"\n\n• Mission:\n\"To achieve our objectives in an environment that enhances creativity, innovation and scholarly pursuits within the stated values.\"",
      cardType: "info",
      source: {
        name: "DSCASC Vision & Mission Charter",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Tell me about the BCA department",
        "What are the placement statistics?",
      ],
    },
  },
  {
    id: "facilities",
    category: "college",
    title: "Campus Facilities & Infrastructure",
    examples: [
      "what facilities are available",
      "campus facilities",
      "infrastructure at dscasc",
      "is there a library",
      "is there a hostel",
      "computer labs",
      "sports facilities",
      "auditorium and canteen",
    ],
    response: {
      text: "The DSCASC campus at Kumaraswamy Layout provides comprehensive academic and recreational infrastructure:\n\n• Central Library: Extensive collection of physical volumes, international journals, digital databases, and reading halls.\n• High-Tech Computer Labs: Modern labs with high-speed internet, dedicated software suites for programming, data science, and web development.\n• Hostels: Separate, well-monitored hostels for boys and girls with dining facilities.\n• Sports & Fitness: Gymnasium, indoor sports arena, and outdoor playgrounds.\n• Auditoriums & Seminar Halls: Air-conditioned venues for conferences, symposia, and cultural events.\n• Food Courts: Multi-cuisine hygienic cafeterias and snack centers.",
      cardType: "info",
      highlights: [
        "Advanced computing labs with uninterrupted power backup",
        "Comprehensive central and departmental libraries",
        "On-campus student grievance & anti-ragging support cells",
      ],
      source: {
        name: "DSCASC Campus Profile",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "Where is the college located?",
        "How do I reach the campus?",
      ],
    },
  },
  {
    id: "college_location",
    category: "college",
    title: "Campus Location & Directions",
    examples: [
      "where is the college located",
      "where is dscasc",
      "campus address",
      "college location",
      "how to reach dscasc",
      "which area in bangalore is dscasc",
      "nearest metro station to dscasc",
    ],
    response: {
      text: "Campus Location:\nDayananda Sagar College of Arts, Science and Commerce\nShavige Malleshwara Hills, Kumaraswamy Layout,\nBangalore – 560111, Karnataka, India.\n\nTransit Connectivity:\n• Metro: Banashankari Metro Station (Green Line) or Yelachenahalli Metro Station (~10 mins by bus/auto)\n• BMTC Buses: Direct buses operate frequently from Majestic (KBS), KR Market, and Banashankari TTMC.\n• Landmark: Near Sagar Hospitals, Kumaraswamy Layout.",
      cardType: "contact",
      contact: {
        name: "DSCASC Campus",
        address: "Shavige Malleshwara Hills, Kumaraswamy Layout, Bangalore - 560111, Karnataka, India",
        phone: "+91-80-42161709 / 42161750",
      },
      links: [
        {
          title: "Google Maps Location",
          url: "https://maps.google.com/?q=Dayananda+Sagar+College+of+Arts+Science+and+Commerce+Bangalore",
        },
      ],
      source: {
        name: "DSCASC Contact Page",
        url: "https://www.dscasc.edu.in/contact",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What are the office contact numbers?",
        "How do I apply for admission?",
      ],
    },
  },
  {
    id: "contact_information",
    category: "college",
    title: "College Contact Information",
    examples: [
      "contact information",
      "how do i contact dscasc",
      "college phone number",
      "dscasc email address",
      "college address",
      "reception number",
      "office contact",
      "phone number of dscasc",
    ],
    response: {
      text: "You can reach Dayananda Sagar College of Arts, Science and Commerce through the following official channels:",
      cardType: "contact",
      contact: {
        name: "DSCASC Main Office",
        role: "Administration & Information Desk",
        phone: "+91 8792909121 / +91 9972780251 / 080-42161709 / 42161750",
        email: "admissions@dayanandasagar.edu",
        address: "Shavige Malleshwara Hills, Kumaraswamy Layout, Bangalore – 560111, Karnataka, India",
      },
      links: [
        {
          title: "Official Contact Page",
          url: "https://www.dscasc.edu.in/contact",
        },
      ],
      source: {
        name: "DSCASC Contact Page",
        url: "https://www.dscasc.edu.in/contact",
        lastVerified: "2024-25",
      },
      suggestions: [
        "How do I apply for admission?",
        "Who handles BCA placements?",
        "Where is the campus located?",
      ],
    },
  },

  // ================= PLACEMENTS & CAREER INTENTS (MAJOR FEATURE) =================
  {
    id: "placement_information",
    category: "placements",
    title: "Placements Overview & Cell",
    examples: [
      "tell me about placements",
      "how are placements at dscasc",
      "does college provide placements",
      "placment details",
      "bca placement opportunities",
      "job opportunities after bca",
      "placement support",
      "wat is placment",
      "does dscasc have placements for bca",
    ],
    response: {
      text: "According to the currently published DSCASC placement information:\n\nDSCASC features an active Career Guidance & Placement Unit that coordinates campus drives, employability enhancement workshops, aptitude coaching, and industry interface for all graduates (BCA, MCA, BBA, MBA, B.Com, B.Sc).\n\nThe placement cell provides proactive training in programming, communication, and mock interviews to prepare students for prominent IT and corporate recruiters.",
      cardType: "links",
      links: [
        {
          title: "Official DSCASC Placement Portal",
          url: "https://dscasc.edu.in/placement",
          description: "Official published placement records and contact",
        },
        {
          title: "Download Overall Placed Students List (NAAC)",
          url: "https://www.dscasc.edu.in/naac/criteria5/5.2/5.2.1_Students_Placed/Overall%20Placement%20List.pdf",
          description: "Official NAAC Criteria 5 verification document",
        },
      ],
      source: {
        name: "DSCASC Placement Cell",
        url: "https://dscasc.edu.in/placement",
        lastVerified: "Official Academic Report",
      },
      suggestions: [
        "What is the placement record of DSCASC?",
        "What is the highest package?",
        "What companies recruit from DSCASC?",
        "Who is the placement officer?",
      ],
    },
  },
  {
    id: "placement_statistics",
    category: "placements",
    title: "Official Placement Statistics",
    examples: [
      "what is the placement record",
      "placement statistics",
      "what is the placement record of dscasc",
      "how many companies visited",
      "what is the highest package",
      "what is average salary",
      "what is the lowest salary",
      "how many offers were made",
      "placement stats",
      "highest ctc",
      "average package",
      "placement figures",
    ],
    response: {
      text: "According to the verified, publicly published DSCASC placement statistics:\n\n• Academic Year 2024-25:\n  - Companies Visited: 300\n  - Total Offers Made: 320\n  - Offers Accepted: 300\n  - Highest Salary: 8 LPA\n  - Average Salary: 5.08 LPA\n  - Lowest Salary: 2.16 LPA\n\n• Academic Year 2023-24 (Previous Year Reference):\n  - Companies Visited: 300\n  - Total Offers Made: 245\n  - Highest Salary: 14 LPA\n  - Average Salary: 7.9 LPA",
      cardType: "stats",
      stats: [
        { label: "Companies Visited (2024-25)", value: "300", subtext: "Top recruiters across IT & Commerce" },
        { label: "Total Offers (2024-25)", value: "320", subtext: "Offers across UG & PG streams" },
        { label: "Offers Accepted", value: "300", subtext: "High placement conversion rate" },
        { label: "Highest Package", value: "8 LPA", subtext: "14 LPA in 2023-24 batch" },
        { label: "Average Package", value: "5.08 LPA", subtext: "Competitive entry-level remuneration" },
        { label: "Lowest Salary", value: "2.16 LPA", subtext: "Standard entry baseline" },
      ],
      links: [
        {
          title: "View Official Placement Table",
          url: "https://dscasc.edu.in/placement",
        },
      ],
      source: {
        name: "DSCASC Official Placement Records",
        url: "https://dscasc.edu.in/placement",
        lastVerified: "Official Table 2024-25",
      },
      suggestions: [
        "What companies recruit from DSCASC?",
        "Who is the placement contact?",
        "How does the placement process work?",
      ],
    },
  },
  {
    id: "placement_companies",
    category: "placements",
    title: "Recruiting Companies",
    examples: [
      "what companies recruit from dscasc",
      "which companies visit for campus placement",
      "top recruiters",
      "recruiting companies",
      "companies for bca",
      "who hires from dscasc",
      "list of recruiting companies",
    ],
    response: {
      text: "Over 300 companies visit Dayananda Sagar Institutions and DSCASC for campus recruitment across software engineering, analytics, banking, consulting, and management domains.\n\nNotable recruiting partners include:\n• Technology & IT: Infosys, Wipro, TCS, Cognizant, Capgemini, Accenture, Mindtree, LTI, DXC Technology, Tech Mahindra, NTT Data\n• Consulting & Core: Deloitte, EY, KPMG, PwC, Oracle, SAP Labs\n• Financial & Analytics: JPMorgan Chase, ICICI Bank, HDFC Bank, Axis Bank, Northern Trust",
      cardType: "info",
      highlights: [
        "300 companies visited the campus in the latest cycle",
        "Opportunities across IT, Cloud, Software Development & Analytics",
        "Regular pooled drives across Dayananda Sagar Institutions",
      ],
      links: [
        {
          title: "Official Placement Companies Page",
          url: "https://dscasc.edu.in/placement",
        },
      ],
      source: {
        name: "DSCASC Placement Records",
        url: "https://dscasc.edu.in/placement",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What is the average salary?",
        "Who handles the placement cell?",
        "How do I prepare for campus placements?",
      ],
    },
  },
  {
    id: "placement_process",
    category: "placements",
    title: "Placement Process & Registration",
    examples: [
      "how does the placement process work",
      "placement registration",
      "recruitment process",
      "placement eligibility criteria",
      "steps in campus placement",
      "how to register for placements",
    ],
    response: {
      text: "The DSCASC campus placement process operates systematically through the following steps:\n\n1. Placement Registration: Final and pre-final year students register with the placement cell.\n2. Pre-Placement Training: Aptitude training, technical coding preparation, resume writing, and mock interviews.\n3. Pre-Placement Talks (PPT): Recruiting companies share job profiles, CTC, and career paths.\n4. Selection Rounds: Online aptitude test / coding assessment followed by technical and HR interview rounds.\n5. Offer Release: Verified offers are distributed to selected candidates.",
      cardType: "info",
      highlights: [
        "Structured pre-placement training modules",
        "Assistance for resume building and interview readiness",
        "Transparent placement policies",
      ],
      source: {
        name: "DSCASC Placement Cell",
        url: "https://dscasc.edu.in/placement",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What are the placement statistics?",
        "Who is the placement contact?",
        "Are internships available?",
      ],
    },
  },
  {
    id: "career_guidance",
    category: "placements",
    title: "Career Guidance & Skill Development",
    examples: [
      "is there career guidance",
      "career counseling",
      "career preparation",
      "skill development programs",
      "guidance for higher studies",
      "how does college help in career",
    ],
    response: {
      text: "DSCASC provides dedicated career guidance and professional mentoring to assist students in shaping their future paths:\n\n• Industry Certifications: Skill Enhancement Courses in Full Stack Web Development, AWS Cloud, Data Science, and Machine Learning.\n• Seminars & Tech Talks: Frequent guest sessions from industry experts (e.g. Docker, Imarticus, AI Centers of Excellence).\n• Higher Education Counseling: Guidance for MCA, MBA, M.Sc, GRE, and CAT aspirants.\n• Alumni Mentorship: Interaction with accomplished alumni working in top multinationals.",
      cardType: "info",
      highlights: [
        "Guest lectures by senior technology leaders and managers",
        "Workshops on emerging technologies (AI, Cyber Security)",
        "Language & communication enhancement via department cells",
      ],
      source: {
        name: "DSCASC Career Development",
        url: "https://www.dscasc.edu.in/courses/ug/bca",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What are the placement statistics?",
        "Tell me about BCA syllabus",
      ],
    },
  },
  {
    id: "internship_information",
    category: "placements",
    title: "Internships & Project Work",
    examples: [
      "are internships available",
      "internship opportunities",
      "does college help with internships",
      "bca internships",
      "summer internships",
      "project work in bca",
    ],
    response: {
      text: "Internships are an integral part of the Bangalore University BCA / UG curriculum (under NEP and SEP frameworks):\n\n• Students are encouraged to undertake summer internships in technology startups, software firms, and corporate research units.\n• The Department of Computer Applications and Placement Cell facilitate corporate internship connections and provide institutional letters of recommendation.\n• Real-world final semester projects are guided by experienced faculty and evaluated as per university regulations.",
      cardType: "info",
      source: {
        name: "DSCASC Academic & Placement Cell",
        url: "https://www.dscasc.edu.in/",
        lastVerified: "2024-25",
      },
      suggestions: [
        "What is the placement record of DSCASC?",
        "Who is the placement coordinator?",
      ],
    },
  },
  {
    id: "placement_contact",
    category: "placements",
    title: "Placement Cell Contact",
    examples: [
      "who handles placements",
      "placement officer contact",
      "placement coordinator",
      "how can i contact the placement cell",
      "placement cell email",
      "placement officer phone number",
      "corporate relations contact",
      "fresher hiring contact",
    ],
    response: {
      text: "The official Corporate Relations & Placement Unit at DSCASC handles campus recruitment and student placements:",
      cardType: "contact",
      contact: {
        name: "Geetha H Raheja",
        role: "Head - Placements & Corporate Relations",
        phone: "+91 9036968288",
        email: "geetha.raheja@dayanandasagar.edu",
        address: "Placement Cell, Dayananda Sagar College of Arts, Science & Commerce, Kumaraswamy Layout, Bangalore - 560111",
      },
      links: [
        {
          title: "Official Placement Contact Section",
          url: "https://dscasc.edu.in/placement",
        },
      ],
      source: {
        name: "DSCASC Placement Cell Portal",
        url: "https://dscasc.edu.in/placement",
        lastVerified: "Official Portal 2024-25",
      },
      suggestions: [
        "What is the placement record?",
        "What is the highest package?",
        "How can I apply for BCA?",
      ],
    },
  },
];

/**
 * Fallback intent for unrecognized / low-confidence queries
 */
export const FALLBACK_INTENT: Intent = {
  id: "unknown",
  category: "general",
  title: "Query Not Recognized",
  examples: [
    "who won yesterday's match",
    "what's the weather tomorrow",
    "tell me a joke",
    "buy me a pizza",
    "recipe for chocolate cake",
    "elon musk net worth",
  ],
  response: {
    text: "I’m not confident I understood that question.\n\nI am DSCASC AI, designed specifically to help students with academic and institutional information for Dayananda Sagar College of Arts, Science and Commerce.",
    cardType: "info",
    highlights: [
      "🎓 Admissions: Eligibility, application process, documents",
      "📚 Courses: BCA, BBA, B.Com, B.Sc, MCA, MBA",
      "📅 Academics: BCA timetable, syllabus, exam notifications",
      "🚀 Placements: Verified 2024-25 statistics, recruiters, placement officer contact",
      "💰 Fees: Fee guidance & admissions counter contacts",
      "📞 Contact: Campus location, office phone numbers, email",
    ],
    suggestions: [
      "How do I apply for BCA?",
      "What is the placement record?",
      "Where can I find the BCA timetable?",
      "What is the average salary?",
      "How do I contact DSCASC?",
    ],
  },
};
