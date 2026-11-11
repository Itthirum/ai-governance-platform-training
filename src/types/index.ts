export type ViewTab = 'summary' | 'readiness' | 'usecase' | 'risk' | 'inventory' | 'law' | 'org_manager' | 'ai_generator' | 'guide' | 'job_redesign';

export interface TaskWorkflowItem {
  id: string;
  subProcess: string;
  jobPosition: string;
  taskAsIs: string;
  aiCapability: string;
  aiLevel: number; // 0 to 5
  collaborationType: 'Human-only' | 'Augmentation' | 'Automation';
  taskToBe: string;
  governanceControl: string;
  skillsImpact: 'Upskill' | 'Reskill' | 'None';
  estimatedTimeSavedPercent?: number;
  processNumber?: number;
  processPhase?: 'ต้นน้ำ (Input & Intake)' | 'กลางน้ำ (Processing & Analysis)' | 'ปลายน้ำ (Review, Decision & Delivery)';
  durationAsIs?: string;
  durationToBe?: string;
  leanWasteEliminated?: string;
}

export interface TrainingModule {
  week: string;
  title: string;
  focus: string;
  toolUsed: string;
  deliverable: string;
}

export interface TrainingPlan {
  courseTitle: string;
  targetAudience: string;
  modules: TrainingModule[];
}

export interface SOPCheatSheet {
  aiResponsibilities: string[];
  humanResponsibilities: string[];
  prohibitedActions: string[];
  checklistBeforeApproval: string[];
}

export interface WorkshopExercise {
  processStep: string;
  taskDescription: string;
  examplePromptTemplate: string;
  humanReviewChecklist: string;
}

export interface WorkshopWorksheet {
  promptExercises: WorkshopExercise[];
}

export interface LeanSummary {
  wasteIdentified: string[];
  overallTimeSavedPercent: number;
  keyTransformation: string;
}

export interface LeanToolsApplied {
  standardWork: string;
  onePieceFlow: string;
  automation: string;
  errorProofing: string;
}

export interface JobRedesignProfile {
  id: string;
  jobTitle: string;
  department: string;
  executiveOwner: string;
  processName?: string;
  originalObjective: string;
  newObjective: string;
  currentTasksCount: number;
  tasks: TaskWorkflowItem[];
  competencies: {
    technical: string[];
    responsibleEthics: string[];
    nonTechnical: string[];
  };
  jobLevel: 'Entry Level' | 'Mid-Level' | 'Managerial Level';
  leanSummary?: LeanSummary;
  trainingPlan?: TrainingPlan;
  sopCheatSheet?: SOPCheatSheet;
  workshopWorksheet?: WorkshopWorksheet;
  leanToolsApplied?: LeanToolsApplied;
  aiStudioPrompt?: string;
  leanSolutionQuote?: string;
  beforeFooterBadge?: string;
  afterFooterBadge?: string;
}

export interface ReadinessQuestion {
  id: number;
  pillar: string;
  pillarId: number;
  title: string;
  description: string;
  note?: string;
  options: {
    label: string;
    score: number;
    text: string;
  }[];
}

export interface UseCaseQuestion {
  id: string;
  category: 'value' | 'feasibility';
  dimension: string;
  question: string;
  options: {
    label: string;
    score: number;
  }[];
}

export interface RiskQuestion {
  id: string;
  dimension: string;
  dimensionId: number;
  question: string;
  impactDescription: string;
  examples?: string;
  isGenAIOnly?: boolean;
}

export interface AISystemRecord {
  system_id: string;
  system_name_th: string;
  system_name_en?: string;
  short_description: string;
  owner_unit: string;
  business_owner: string;
  technical_owner: string;
  accountable_executive: string;
  data_protection_contact?: string;
  intended_purpose: string;
  user_groups: string[];
  affects_vulnerable_groups: boolean;
  decision_impact_on_individuals: 'ไม่กระทบ' | 'ให้ข้อมูลประกอบ' | 'มีผลต่อการตัดสินใจ' | 'ตัดสินใจแทน';
  ai_capability_type: string[];
  adoption_mode: 'Adopter' | 'Customizer' | 'Maker';
  is_generative_ai: boolean;
  is_agentic: boolean;
  uses_personal_data: boolean;
  uses_sensitive_data: boolean;
  value_chain_role: ('Provider' | 'Deployer' | 'Importer' | 'Distributor')[];
  unacceptable_risk_flag: boolean;
  inherent_risk_level: 'Level I' | 'Level II' | 'Level III' | 'Level IV';
  residual_risk_level: 'Level I' | 'Level II' | 'Level III' | 'Level IV';
  governance_track: 'Fast track' | 'Standard' | 'Full';
  human_oversight_level: 'in-the-loop' | 'over-the-loop' | 'out-of-the-loop';
  lifecycle_status: 'เสนอแนวคิด' | 'อนุมัติแล้ว' | 'กำลังพัฒนา' | 'ทดสอบ' | 'ใช้งานจริง' | 'ระงับชั่วคราว' | 'ยุติการใช้งาน';
  last_assessment_date: string;
  next_review_due: string;
  completeness_score: number;
}

export interface ThaiAILawSection {
  chapter: number;
  chapterTitle: string;
  sectionNumber: string;
  title: string;
  summary: string;
  penaltyType?: 'ไม่มี' | 'แพ่ง' | 'ปกครอง (ไม่เกิน 1 ล้าน)' | 'ปกครอง (ไม่เกิน 3 ล้าน)' | 'ปกครอง (ไม่เกิน 5 ล้าน)';
  targetRole: ('Provider' | 'Deployer' | 'Importer' | 'Platform' | 'Public Agency')[];
}
