import React, { useState, useEffect } from 'react';
import {
  nist16AICapabilities,
  aiLevelsTable,
  initialJobRedesignProfiles,
  etdaExecutivePillars2569,
  jobRolePresetTemplates,
  standard10StepWorkflowTemplates,
  RolePresetTemplate,
  Standard10StepWorkflowTemplate,
} from '../data/jobRedesignData';
import {
  JobRedesignProfile,
  TaskWorkflowItem,
  TrainingPlan,
  SOPCheatSheet,
  WorkshopWorksheet,
  LeanSummary,
} from '../types';
import {
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  GraduationCap,
  FileText,
  Sliders,
  ChevronRight,
  Plus,
  Trash2,
  Download,
  Copy,
  Check,
  Building2,
  HelpCircle,
  TrendingUp,
  Cpu,
  Edit3,
  RotateCcw,
  Printer,
  Search,
  PieChart,
  Clock,
  X,
  Share2,
  Workflow,
  ArrowUp,
  ArrowDown,
  Zap,
  BarChart3,
  ListOrdered,
  Timer,
  AlertTriangle,
  Scale,
  BookOpen,
  CheckSquare,
  Ban,
  Lightbulb,
  Send,
  RefreshCw,
  FileDown,
  Globe,
} from 'lucide-react';

const LOCAL_STORAGE_PROFILES_KEY = 'aigc_job_redesign_profiles_v5';

// Helper function to provide rich default training plan if missing
function getProfileTrainingPlan(profile: JobRedesignProfile): TrainingPlan {
  if (profile.trainingPlan && profile.trainingPlan.modules && profile.trainingPlan.modules.length > 0) {
    return profile.trainingPlan;
  }
  return {
    courseTitle: `หลักสูตรพัฒนาทักษะการปฏิบัติงานร่วมกับ AI สำหรับ: ${profile.jobTitle}`,
    targetAudience: `บุคลากรในสังกัด ${profile.department} (ระดับ ${profile.jobLevel})`,
    modules: [
      {
        week: 'สัปดาห์ที่ 1',
        title: 'พื้นฐาน Generative AI & การเขียน Prompt เฉพาะทาง',
        focus: 'เรียนรู้ธรรมชาติของ AI Models และโครงสร้างคำสั่ง (Role, Task, Context, Output format) ที่ตรงกับกระบวนงาน',
        toolUsed: 'Enterprise Chat Assistant / Workplace AI Co-pilot',
        deliverable: 'คลังคำสั่ง Prompt Template ส่วนบุคคล 5 แบบสำหรับงานประจำวัน',
      },
      {
        week: 'สัปดาห์ที่ 2',
        title: 'การประยุกต์ใช้ AI ในกระบวนงานต้นน้ำและกลางน้ำ',
        focus: 'การสกัดข้อมูลเอกสารอัตโนมัติ (OCR/Parsing), การคำนวณและวิเคราะห์ Matching/Risk Scoring และการสรุปข้อมูล',
        toolUsed: 'Intelligent Document Processing & Workflow Co-pilot',
        deliverable: 'ผลการทดสอบสกัดข้อมูลเอกสารจริงและเปรียบเทียบความแม่นยำกับผลตรวจมือ',
      },
      {
        week: 'สัปดาห์ที่ 3',
        title: 'จริยธรรม AI, การตรวจจับอคติ (Bias) และการคุ้มครองข้อมูล (PDPA)',
        focus: 'ข้อควรระวังตามร่าง พ.ร.บ. AI (ม.43-49), การจัดการข้อมูลส่วนบุคคล และการป้องกันข้อมูลรั่วไหล',
        toolUsed: 'Bias Auditing Checklist & Data Anonymization Tool',
        deliverable: 'แบบประเมินความเสี่ยง PDPA และจริยธรรมประจำกระบวนงาน',
      },
      {
        week: 'สัปดาห์ที่ 4',
        title: 'การกำกับดูแลโดยมนุษย์ (Human Oversight) และการตัดสินใจขั้นสุดท้าย',
        focus: 'การตรวจสอบผลลัพธ์ (Anti-Hallucination), การจัดการเคสข้อยกเว้น และขั้นตอนการลงนามอนุมัติ (Sign-off)',
        toolUsed: 'Exception Review SOP & Human Sign-off Protocol',
        deliverable: 'ใบรับรองความพร้อมการปฏิบัติงานร่วมกับ AI (AI Collaboration Readiness Cert)',
      },
    ],
  };
}

// Helper function to provide rich default SOP cheat sheet if missing
function getProfileSOPCheatSheet(profile: JobRedesignProfile): SOPCheatSheet {
  if (profile.sopCheatSheet && profile.sopCheatSheet.aiResponsibilities) {
    return profile.sopCheatSheet;
  }
  return {
    aiResponsibilities: [
      'สกัดข้อมูลจากเอกสารและไฟล์ดิจิทัล (OCR/Parsing) แปลงเป็นตารางเปรียบเทียบเบื้องต้น',
      'ช่วยร่างข้อความ สรุปประเด็น บันทึกย่อ และตรวจทานคำผิด/ข้อกำหนดมาตรฐาน',
      'แจ้งเตือนกำหนดการ ความเสี่ยง และจุดผิดปกติที่ตรวจพบในระบบอัตโนมัติ',
      'ช่วยประมวลผลตัวเลขและจัดอันดับคะแนนตามสูตรเกณฑ์ที่กำหนด',
    ],
    humanResponsibilities: [
      'ตรวจสอบความถูกต้อง ครบถ้วน และความสมเหตุสมผลของผลลัพธ์จาก AI ทุกครั้งก่อนนำไปใช้',
      'พิจารณาบริบททางธุรกิจ เจรจาต่อรอง และตัดสินใจในเคสที่มีความซับซ้อนหรือข้อยกเว้น',
      'ลงนามอนุมัติขั้นสุดท้าย (Human Sign-off Mandatory) โดยรับผิดชอบต่อผลลัพธ์ตามกฎหมาย 100%',
      'ให้ข้อเสนอแนะเพื่อปรับปรุง Prompt และฐานความรู้ของ AI อย่างต่อเนื่อง',
    ],
    prohibitedActions: [
      'ห้ามนำข้อมูลความลับทางการค้า รหัสผ่าน หรือข้อมูลส่วนบุคคลอ่อนไหว (Sensitive PII) ป้อนเข้าสู่ Public AI เด็ดขาด',
      'ห้ามปล่อยให้ระบบ AI ตัดสิทธิ์ ปฏิเสธ หรือตัดสินผลกระทบต่อบุคคลโดยไม่มีมนุษย์ตรวจสอบ (No Out-of-the-loop)',
      'ห้ามใช้ผลลัพธ์จาก AI โดยไม่ตรวจสอบแหล่งอ้างอิงและตัวเลขข้อเท็จจริง (Anti-Hallucination)',
      'ห้ามใช้ AI ในการสร้างข้อความหรือตัดสินใจที่มีอคติเลือกปฏิบัติด้านเพศ อายุ ศาสนา หรือสถาบันการศึกษา',
    ],
    checklistBeforeApproval: [
      'ตรวจสอบว่าข้อมูลนำเข้า (Input) เป็นฉบับล่าสุดและถูกต้องตามกฎระเบียบ',
      'ตรวจสอบว่าผลลัพธ์จาก AI มีการอ้างอิงแหล่งที่มาชัดเจนและตัวเลขไม่คลาดเคลื่อน',
      'ตรวจสอบว่าไม่มีประเด็นขัดต่อ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) หรือระเบียบองค์กร',
      'บันทึกเหตุผลการอนุมัติหรือการปรับแก้ผลลัพธ์ลงในระบบเพื่อการตรวจสอบย้อนกลับ (Auditability)',
    ],
  };
}

// Helper function to provide rich default workshop worksheet if missing
function getProfileWorkshopWorksheet(profile: JobRedesignProfile): WorkshopWorksheet {
  if (profile.workshopWorksheet && profile.workshopWorksheet.promptExercises) {
    return profile.workshopWorksheet;
  }
  return {
    promptExercises: [
      {
        processStep: 'กระบวนงานช่วงต้นน้ำ (Data Extraction & Intake)',
        taskDescription: `การสั่งให้ AI ช่วยสกัดข้อมูลและจัดระเบียบเอกสารขาเข้าสำหรับงาน ${profile.jobTitle}`,
        examplePromptTemplate: `คุณคือผู้ช่วยผู้เชี่ยวชาญด้าน ${profile.department}
หน้าที่: ช่วยวิเคราะห์เอกสารที่แนบมานี้ และสกัดข้อมูลสำคัญตามโครงสร้าง:
1. รายละเอียดผู้เกี่ยวข้อง / คู่สัญญา
2. ตัวเลข งบประมาณ และเงื่อนไขสำคัญ
3. จุดเสี่ยงหรือรายการผิดปกติที่ต้องระวังเป็นพิเศษ
กฎ: ใช้ข้อมูลจากเอกสารที่ให้เท่านั้น หากไม่พบให้ระบุว่า "ไม่พบข้อมูล" ห้ามคาดเดา`,
        humanReviewChecklist: 'ตรวจทานตัวเลข วันที่ และชื่อเฉพาะว่าตรงกับต้นฉบับ 100%',
      },
      {
        processStep: 'กระบวนงานช่วงกลางน้ำ (Analysis & Synthesis)',
        taskDescription: 'การสั่งให้ AI ช่วยเปรียบเทียบทางเลือกและวิเคราะห์ความคุ้มค่าและความเสี่ยง',
        examplePromptTemplate: `ช่วยเปรียบเทียบข้อมูล 2 ชุดนี้ ในมิติ:
1. ความสอดคล้องกับเกณฑ์มาตรฐานองค์กร
2. ข้อได้เปรียบ / ข้อเสียเปรียบของแต่ละทางเลือก
3. สัญญาณเตือนความเสี่ยงที่อาจเกิดขึ้นตามกฎหมาย
สรุปเป็นตารางเปรียบเทียบพร้อมระบุเหตุผลประกอบอย่างเป็นรูปธรรม`,
        humanReviewChecklist: 'ตรวจสอบว่า AI ไม่แสดงอคติ และไม่มีข้อสรุปที่เอนเอียง',
      },
      {
        processStep: 'กระบวนงานช่วงปลายน้ำ (Executive Briefing & Memo)',
        taskDescription: 'การสั่งให้ AI สรุปสาระสำคัญเป็น One-page Brief เพื่อเสนอผู้บริหารลงนาม',
        examplePromptTemplate: `จัดทำบันทึกข้อความสรุปผู้บริหาร (One-page Executive Memo)
จากผลการวิเคราะห์ข้างต้น โดยระบุ:
- ความเป็นมาและวัตถุประสงค์
- ข้อค้นพบสำคัญ
- ข้อเสนอแนะและทางเลือกในการตัดสินใจ
ภาษา: ภาษาไทยทางการ กระชับ ชัดเจน มีข้อเสนอแนะที่ชัดเจน`,
        humanReviewChecklist: 'ตรวจสอบความถูกต้องของข้อเสนอแนะและเงื่อนไขทางกฎหมายก่อนลงนาม',
      },
    ],
  };
}

// Helper function to synthesize a ready-to-run Google AI Studio system instruction
function generateAIStudioSystemPrompt(profile: JobRedesignProfile): string {
  if (profile.aiStudioPrompt && profile.aiStudioPrompt.trim().length > 60) {
    return profile.aiStudioPrompt;
  }

  const tasksList = profile.tasks
    .map(
      (t, idx) => `### ขั้นตอนที่ ${t.processNumber || idx + 1}: ${t.subProcess} (${t.processPhase || 'กระบวนงาน'})
- **ภาระงานเดิม (As-Is):** ${t.taskAsIs}
- **การทำงานใหม่ร่วมกับ AI (To-Be):** ${t.taskToBe}
- **เทคโนโลยี AI (NIST Capability):** ${t.aiCapability} (AI Level ${t.aiLevel})
- **การกำกับดูแลโดยมนุษย์ (Human Gate / Sign-off):** ${t.governanceControl}
- **เวลาเป้าหมาย:** ${t.durationToBe || 'ลดลง ~' + (t.estimatedTimeSavedPercent || 75) + '%'}`
    )
    .join('\n\n');

  const sop = getProfileSOPCheatSheet(profile);

  return `# Google AI Studio - Master System Instructions
# ระบบต้นแบบ: ${profile.processName || profile.jobTitle}
# สังกัด: ${profile.department} | สอดคล้องตามมาตรฐาน ETDA Lean Solution 2569

## 1. บทบาทและหน้าที่หลัก (Persona & System Purpose)
คุณคือระบบผู้ช่วยปัญญาประดิษฐ์อัจฉริยะ (Intelligent Workflow Co-pilot) ที่ออกแบบตามกรอบ ETDA AI Job Redesign
มีหน้าที่หลักคือ:
${profile.newObjective}

## 2. สายธารกระบวนงานใหม่แบบ Lean (To-Be Workflow)
${tasksList}

## 3. หลักการ Lean 4 เสาหลัก (Lean Tools Applied)
1. **Standard Work (มาตรฐานงาน):** กำหนดช่องข้อมูล แบบฟอร์ม และข้อกำหนดบังคับให้เป็นมาตรฐานเดียวกันทุกครั้ง
2. **One Piece Flow (งานไหลต่อเนื่อง):** ข้อมูลที่ผ่านการตรวจสอบในแต่ละขั้นจะไหลต่อไปยังขั้นถัดไปทันทีโดยไม่ต้องรอรวมเป็นชุดงาน
3. **AI Automation (ระบบอัตโนมัติ):** ใช้ AI สกัดข้อมูล วิเคราะห์ คัดกรอง และประมวลผลแทนมนุษย์ในงานรูทีน
4. **Error Proofing (Poka-Yoke & Governance):** ระบบมีกลไกป้องกันข้อผิดพลาด ป้องกันเลขซ้ำ และมีจุดตรวจทานก่อนลงนาม

## 4. กฎการกำกับดูแลโดยมนุษย์และข้อห้าม (SOP & Safety Guardrails)
- **สิ่งที่ AI ได้รับอนุญาตให้ทำ:**
${sop.aiResponsibilities.map((r) => `  - ${r}`).join('\n')}

- **สิ่งที่มนุษย์ต้องเป็นผู้รับผิดชอบและลงนาม (Human Oversight):**
${sop.humanResponsibilities.map((r) => `  - ${r}`).join('\n')}

- **ข้อห้ามเด็ดขาด (Strictly Prohibited):**
${sop.prohibitedActions.map((r) => `  - ${r}`).join('\n')}

## 5. รูปแบบการตอบสนอง (Expected Output Schema)
เมื่อผู้ใช้งานป้อนข้อมูลหรือเอกสารเข้ามา ให้วิเคราะห์และตอบกลับในรูปแบบ Markdown ที่มีโครงสร้างชัดเจน:
1. 📌 **รหัสงาน / ข้อมูลอ้างอิง (Reference Code)**
2. 📋 **สรุปสาระสำคัญของเอกสาร/คำขอ (Executive Summary)**
3. ⚡ **ผลการประมวลผลและการวิเคราะห์ (AI Analysis & Recommendations)**
4. 🛡️ **รายการตรวจทานความถูกต้อง (Poka-Yoke Checklist):**
   - [ ] ความครบถ้วนของข้อมูล
   - [ ] ความสอดคล้องกับระเบียบ/กฎหมาย
5. ✍️ **สถานะจุดอนุมัติโดยมนุษย์ (Human Sign-off Status):** [รอผู้มีอำนาจตรวจทานและลงนาม]`;
}

// Helper function to synthesize a Vertex AI Multimodal Agent Instruction
function generateVertexAgentStudioPrompt(profile: JobRedesignProfile): string {
  const sop = getProfileSOPCheatSheet(profile);

  const tasksWorkflow = profile.tasks
    .map(
      (t, idx) => `### Step ${t.processNumber || idx + 1}: ${t.subProcess} (${t.processPhase || 'Process Step'})
- As-Is Baseline: ${t.taskAsIs}
- Multimodal Agent Duty: ${t.taskToBe}
- AI Capability: ${t.aiCapability} (AI Level ${t.aiLevel})
- Governance & Safety Gate: ${t.governanceControl}
- Target Lead Time: ${t.durationToBe || 'Instantaneous'} (Effort reduced ~${t.estimatedTimeSavedPercent || 80}%)`
    )
    .join('\n\n');

  return `# Google Cloud Vertex AI Agent Platform - Master Multimodal Agent Instructions
# Target Model: gemini-4-argon | Region: global
# Google Cloud Project ID: project-ef52c00b-7abe-4318-be7
# System: ${profile.processName || profile.jobTitle}
# Framework Compliance: ETDA AI Job Redesign, ISO 42001 & Thai AI Act (2569)

## 1. AGENT IDENTITY & ENTERPRISE ROLE (บทบาทและอัตลักษณ์ของเอเจนต์)
You are an Enterprise Multimodal AI Agent deployed for "${profile.department}" in role: "${profile.jobTitle}".
Your mission:
${profile.newObjective}

## 2. MULTIMODAL PERCEPTION CAPABILITIES (การรับรู้มัลติโมดอล)
- You can process images, scanned PDFs, photographs of physical letters, and electronic forms.
- Visually parse document headers, official garuda/organization emblems, document numbers, date stamps, and signatories.
- Detect signatures: distinguish between handwritten signatures and verified digital signatures/stamps.

## 3. LEAN ONE-PIECE-FLOW WORKFLOW (กระบวนงานแบบไหลต่อเนื่อง ไร้คอขวด)
${tasksWorkflow}

## 4. TOOL / EXTENSION DEFINITIONS (เครื่องมือและ API ที่เอเจนต์เรียกใช้)
1. \`reserve_document_number(dept_id: string, category: string)\`:
   - Issues an instant temporary reserve reference number (e.g. RSV-2569-XXXX) to prevent waiting waste.
2. \`verify_poka_yoke_rules(doc_payload: object)\`:
   - Checks against duplicate document numbers, missing mandatory attachments, or unverified sender identities.
3. \`request_director_signature(memo_summary: string, doc_url: string, urgency: string)\`:
   - Triggers secure notification to the authorized executive for digital signature sign-off.
4. \`generate_official_auto_number(reserve_id: string, signature_proof: string)\`:
   - Locks consecutive official numbering into the central register once signature is confirmed.
5. \`dispatch_edocument_to_destinations(official_doc_id: string, recipient_units: array)\`:
   - Transmits encrypted e-document to internal/external units and captures timestamped delivery receipt.

## 5. ETDA GOVERNANCE & HUMAN-IN-THE-LOOP RULES (กฎธรรมาภิบาลและความปลอดภัย)
- **STRICT HUMAN-IN-THE-LOOP GATE:** Under no circumstances should the agent issue final official approval or dispatch external letters without verified Director Signature (Director Sign Mandatory).
- **PDPA & DATA PROTECTION:** Automatically mask National ID numbers (show only last 4 digits) and redact confidential internal financial data from public-facing summaries.
- **ERROR PROOFING (Poka-Yoke):** If document scan quality is illegible (<70% confidence) or attachments are missing, do not guess; immediately ask the operator to re-upload.
- **AUDIT TRAIL:** Every transaction must generate an immutable log containing Timestamp, User ID, Reserve Code, and Sign-off Status.

## 6. STRUCTURED RESPONSE FORMAT (รูปแบบการตอบกลับสำหรับผู้ใช้งาน)
Whenever a document is ingested, respond with a clean Multimodal Brief:
\`\`\`markdown
### 📋 ผลการประมวลผลเอกสารอัจฉริยะ (Multimodal Ingestion Brief)
- 📌 **รหัสจองเลขชั่วคราว (Reserve Code):** [RSV-2569-XXXX]
- 🏢 **หน่วยงานต้นเรื่อง / ผู้ส่ง:** ...
- 📝 **สาระสำคัญ 3 บรรทัด (Executive Summary):** ...
- 🛡️ **ผลการตรวจสอบความถูกต้อง (Poka-Yoke Check):** [ผ่านเกณฑ์ 100% / พบจุดเตือน]
- ✍️ **สถานะจุดอนุมัติผู้บริหาร (Director Sign Gate):** [รอการลงนามดิจิทัล]
- ⏱️ **เวลาประหยัดได้ตามแผน Lean:** ลดเวลาจากเดิมลง ~${profile.leanSummary?.overallTimeSavedPercent || 85}%
\`\`\``;
}

export const JobRedesignView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'training_pack' | 'capabilities' | 'levels' | 'skills' | 'executive2569'>('profiles');

  // Workflow visual display mode: Lean Solution Board (ETDA Infographic) vs Pipeline Flow vs Detailed Matrix Table vs Analytics Dashboard
  const [workflowViewMode, setWorkflowViewMode] = useState<'lean_board' | 'pipeline' | 'matrix' | 'analytics'>('lean_board');

  // Load profiles from LocalStorage or fallback to pre-seeded 10-step profiles
  const [profiles, setProfiles] = useState<JobRedesignProfile[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load job redesign profiles from storage', e);
    }
    return initialJobRedesignProfiles;
  });

  const [selectedProfileId, setSelectedProfileId] = useState<string>(() => {
    return profiles[0]?.id || initialJobRedesignProfiles[0].id;
  });

  // Save to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    } catch (e) {
      console.error('Failed to save job redesign profiles', e);
    }
  }, [profiles]);

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filter for NIST Capabilities Tab
  const [capCategoryFilter, setCapCategoryFilter] = useState<string>('ALL');
  const filteredCapabilities =
    capCategoryFilter === 'ALL'
      ? nist16AICapabilities
      : nist16AICapabilities.filter((c) => c.category === capCategoryFilter);

  // Copy notification state
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Modal State: AI Studio / Vertex AI Agent Prompt Generator Modal
  const [isAIStudioModalOpen, setIsAIStudioModalOpen] = useState(false);
  const [promptTargetPlatform, setPromptTargetPlatform] = useState<'vertex_multimodal' | 'ai_studio'>('vertex_multimodal');

  // Modal State: Human Review & Edit To-Be Steps Modal (The user's requested feature to let humans inspect & edit!)
  const [isEditAllTasksModalOpen, setIsEditAllTasksModalOpen] = useState(false);
  const [editingTasksList, setEditingTasksList] = useState<TaskWorkflowItem[]>([]);

  // Modal State: AI Process Intake & Lean Redesign Studio (The user's requested form!)
  const [isAILanModalOpen, setIsAILanModalOpen] = useState(false);
  const [aiJobTitle, setAiJobTitle] = useState('');
  const [aiDepartment, setAiDepartment] = useState('');
  const [aiJobLevel, setAiJobLevel] = useState<'Entry Level' | 'Mid-Level' | 'Managerial Level'>('Mid-Level');
  const [aiProcessName, setAiProcessName] = useState('');
  const [rawProcessInput, setRawProcessInput] = useState('');
  const [businessContextInput, setBusinessContextInput] = useState('');
  const [isAnalyzingLean, setIsAnalyzingLean] = useState(false);

  // Modal State: 10-Step Workflow Template Picker
  const [is10StepModalOpen, setIs10StepModalOpen] = useState(false);

  // Modal State: Add New Position (Regular)
  const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false);
  const [positionAddMode, setPositionAddMode] = useState<'template' | 'custom'>('template');
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [newRoleDept, setNewRoleDept] = useState('');
  const [newRoleExecutive, setNewRoleExecutive] = useState('');
  const [newRoleLevel, setNewRoleLevel] = useState<'Entry Level' | 'Mid-Level' | 'Managerial Level'>('Mid-Level');
  const [newRoleOriginalObj, setNewRoleOriginalObj] = useState('');
  const [newRoleNewObj, setNewRoleNewObj] = useState('');
  const [newRoleProcessName, setNewRoleProcessName] = useState('');

  // Modal State: Edit Current Position Info
  const [isEditPositionModalOpen, setIsEditPositionModalOpen] = useState(false);
  const [editRoleTitle, setEditRoleTitle] = useState('');
  const [editRoleDept, setEditRoleDept] = useState('');
  const [editRoleExecutive, setEditRoleExecutive] = useState('');
  const [editRoleLevel, setEditRoleLevel] = useState<'Entry Level' | 'Mid-Level' | 'Managerial Level'>('Mid-Level');
  const [editRoleOriginalObj, setEditRoleOriginalObj] = useState('');
  const [editRoleNewObj, setEditRoleNewObj] = useState('');
  const [editRoleProcessName, setEditRoleProcessName] = useState('');

  // Process / Task Form State (Add / Edit single task)
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [processNumberInput, setProcessNumberInput] = useState<number>(1);
  const [processPhaseInput, setProcessPhaseInput] = useState<
    'ต้นน้ำ (Input & Intake)' | 'กลางน้ำ (Processing & Analysis)' | 'ปลายน้ำ (Review, Decision & Delivery)'
  >('ต้นน้ำ (Input & Intake)');
  const [subProcessInput, setSubProcessInput] = useState('');
  const [durationAsIsInput, setDurationAsIsInput] = useState('1 วัน');
  const [durationToBeInput, setDurationToBeInput] = useState('30 นาที');
  const [taskAsIsInput, setTaskAsIsInput] = useState('');
  const [aiCapInput, setAiCapInput] = useState(nist16AICapabilities[0].name_th);
  const [aiLevelInput, setAiLevelInput] = useState<number>(2);
  const [taskToBeInput, setTaskToBeInput] = useState('');
  const [govControlInput, setGovControlInput] = useState('');
  const [skillsImpactInput, setSkillsImpactInput] = useState<'Upskill' | 'Reskill' | 'None'>('Upskill');
  const [timeSavedInput, setTimeSavedInput] = useState<number>(75);

  // Competency addition input state
  const [newTechCompetency, setNewTechCompetency] = useState('');
  const [newEthicsCompetency, setNewEthicsCompetency] = useState('');
  const [newNonTechCompetency, setNewNonTechCompetency] = useState('');

  const currentProfile = profiles.find((p) => p.id === selectedProfileId) || profiles[0] || initialJobRedesignProfiles[0];

  // Training & SOP helpers for current active profile
  const currentTrainingPlan = getProfileTrainingPlan(currentProfile);
  const currentSOPCheatSheet = getProfileSOPCheatSheet(currentProfile);
  const currentWorkshopWorksheet = getProfileWorkshopWorksheet(currentProfile);

  // Pre-fill samples for AI Intake Form
  const prefillSampleProcesses = (type: 'procurement' | 'hr' | 'cs' | 'accounting' | 'saraban') => {
    if (type === 'saraban') {
      setAiJobTitle('เจ้าหน้าที่สารบรรณและงานเอกสารกลาง');
      setAiDepartment('ฝ่ายสารบรรณและบริหารงานทั่วไป');
      setAiJobLevel('Entry Level');
      setAiProcessName('กระบวนงานรับหนังสือ ออกเลข และจัดส่งเอกสารราชการ/องค์กร (Lean E-Saraban Solution)');
      setRawProcessInput(`1. รับเอกสารผ่าน Line Group ส่งไฟล์หลุดในห้องแชท เอกสารตกหล่นง่าย
2. รอสารบรรณ รอคอยเปิดสมุดทะเบียนออกเลขหนังสือที่โต๊ะสารบรรณ
3. Manual ดำเนินการด้วยมือ พิมพ์ค้นหาและตรวจทานในแฟ้มกระดาษ
4. ออกเลขหนังสือด้วยมือ (Manual) เสี่ยงเลขซ้ำ เลขกระโดด
5. เดินแฟ้มเสนอผู้บริหารลงนามด้วยปากกา และถ่ายเอกสารส่งทางไปรษณีย์`);
    } else if (type === 'procurement') {
      setAiJobTitle('เจ้าหน้าที่จัดซื้อและพัสดุ');
      setAiDepartment('ฝ่ายจัดซื้อและคลังพัสดุ');
      setAiJobLevel('Mid-Level');
      setAiProcessName('กระบวนงานจัดซื้อและตรวจรับพัสดุครบวงจร');
      setRawProcessInput(`1. รับแบบฟอร์มขอซื้อ (PR) ตรวจสอบความถูกต้องของสเปกและงบประมาณด้วยมือ
2. ค้นหารายชื่อผู้ขายในเน็ตและติดต่อขอใบเสนอราคาทีละราย
3. ส่งอีเมลแบบฟอร์ม RFQ และโทรติดตามคู่ค้าให้ส่งเอกสาร
4. เปิดดูใบเสนอราคา PDF ของคู่ค้า 3-5 ราย แล้วคีย์ราคาและเงื่อนไขลงตาราง Excel
5. ตรวจสอบสถานะนิติบุคคลและคดีความของคู่ค้าจากหลายเว็บไซต์ราชการ
6. วิเคราะห์ต้นทุนและต่อรองราคากับผู้ขายตามประสบการณ์
7. ทำบันทึกสรุปผลเปรียบเทียบเสนอผู้จัดการจัดซื้ออนุมัติ
8. คีย์ออกใบสั่งซื้อ PO ในระบบ ERP และส่งเอกสารให้ผู้บริหารลงนาม
9. โทรติดตามสถานะการจัดส่งพัสดุจากโรงงานผู้ผลิต
10. ตรวจรับของ เทียบเอกสาร 3 ใบ (PO, ใบส่งของ, ใบกำกับภาษี) ก่อนส่งฝ่ายบัญชีเบิกจ่าย`);
    } else if (type === 'hr') {
      setAiJobTitle('เจ้าหน้าที่สรรหาและคัดเลือกบุคลากร');
      setAiDepartment('ฝ่ายบริหารทรัพยากรบุคคล (HR)');
      setAiJobLevel('Mid-Level');
      setAiProcessName('กระบวนงานสรรหาและบรรจุพนักงานครบวงจร');
      setRawProcessInput(`1. รับใบขออัตรากำลังจากแผนก นั่งร่างข้อกำหนดหน้าที่ JD
2. แปลงข้อความประกาศและโพสต์ลงเว็บหางาน LinkedIn, JobsDB
3. เปิดไฟล์เรซูเม่ PDF ทีละฉบับ คัดลอกประวัติการศึกษาและงานลง Excel
4. นั่งอ่านเรซูเม่นับร้อยใบเพื่อคัดกรองคุณสมบัติขั้นต่ำด้วยสายตา
5. ให้คะแนนความเหมาะสมของผู้สมัครทีละคนตามความเห็นส่วนบุคคล
6. โทรศัพท์หาผู้สมัครคัดกรองเบื้องต้นและสอบถามความคาดหวังเงินเดือน
7. ทำสไลด์สรุปประวัติผู้สมัครเสนอผู้บริหารสัมภาษณ์
8. ส่งอีเมลและโทรประสานกรรมการและผู้สมัครเพื่อล็อกคิวสัมภาษณ์
9. รวบรวมใบคะแนนสัมภาษณ์กระดาษและโทรตรวจสอบประวัติบุคคลอ้างอิง
10. ร่างสัญญาจ้างงาน ส่งไปรษณีย์ และจัดเตรียมเอกสารปฐมนิเทศ`);
    } else if (type === 'cs') {
      setAiJobTitle('เจ้าหน้าที่บริการลูกค้าและลูกค้าสัมพันธ์');
      setAiDepartment('ฝ่ายบริการลูกค้า (Customer Service)');
      setAiJobLevel('Entry Level');
      setAiProcessName('กระบวนงานตอบข้อซักถามและแก้ไขข้อร้องเรียนลูกค้า');
      setRawProcessInput(`1. รับสายโทรศัพท์ ถามเลขบัตรประชาชนเพื่อยืนยันตัวตนทีละราย
2. นั่งตอบคำถามทั่วไปซ้ำๆ เช่น ตรวจสอบสถานะคำสั่งซื้อ อัตราค่าบริการ
3. รับมือลูกค้าที่โกรธเคืองและพยายามเจรจาให้อารมณ์เย็นลง
4. เปิดหลายโปรแกรมเพื่อค้นหาประวัติการทำรายการย้อนหลัง
5. ถามหัวหน้างานข้างๆ เพื่อหาแนวทางแก้ไขปัญหาที่ไม่เคยพบ
6. จดบันทึกรายละเอียดการสนทนาลงสมุดหรือไฟล์ Excel หลังวางสาย
7. ส่งอีเมลแจ้งแผนกอื่นเพื่อติดตามการแก้ไขปัญหาให้ลูกค้า`);
    } else if (type === 'accounting') {
      setAiJobTitle('นักบัญชีและการเงิน');
      setAiDepartment('ฝ่ายบัญชีและการเงิน');
      setAiJobLevel('Mid-Level');
      setAiProcessName('กระบวนงานตรวจรับใบเสร็จและกระทบยอดบัญชี');
      setRawProcessInput(`1. ตรวจรับใบแจ้งหนี้และใบเสร็จรับเงินฉบับกระดาษ
2. พิมพ์ตัวเลขยอดเงิน วันที่ และเลขประจำตัวผู้เสียภาษีลงโปรแกรมบัญชี
3. ตรวจสอบใบกำกับภาษีว่าถูกต้องตามหลักเกณฑ์สรรพากรหรือไม่
4. ตรวจสอบรายการเดินบัญชีธนาคาร (Bank Statement) กับสมุดรายวัน
5. นั่งตรวจสอบและจับคู่รายการกระทบยอดเงินฝากทีละบรรทัด
6. ทำบันทึกรายการผลต่างที่ไม่ตรงกันและโทรสอบถามแผนกที่เกี่ยวข้อง
7. ปิดงบกระทบยอดเงินฝากธนาคารประจำเดือนเสนอหัวหน้าฝ่ายบัญชี`);
    }
  };

  // Execute AI Lean Process Engine
  const handleExecuteAILanAnalysis = async () => {
    if (!aiJobTitle.trim() || !rawProcessInput.trim()) {
      alert('กรุณากรอกชื่อตำแหน่งงาน และระบุรายการกระบวนงานเดิมอย่างน้อย 2-3 ขั้นตอน');
      return;
    }

    setIsAnalyzingLean(true);

    // Split input into lines
    const processLines = rawProcessInput
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    try {
      const response = await fetch('/api/ai/lean-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: aiJobTitle.trim(),
          department: aiDepartment.trim() || 'ฝ่ายปฏิบัติการ',
          jobLevel: aiJobLevel,
          processName: aiProcessName.trim() || `กระบวนงานหลักสำหรับตำแหน่ง ${aiJobTitle.trim()}`,
          rawProcessList: processLines,
          businessContext: businessContextInput.trim(),
        }),
      });

      const resData = await response.json();

      if (resData.success && resData.data) {
        const aiData = resData.data;
        const newId = `JOB-AI-${Date.now().toString().slice(-4)}`;

        const createdTasks: TaskWorkflowItem[] = (aiData.processes || []).map((p: any, idx: number) => ({
          id: `TASK-${Date.now().toString().slice(-4)}-${idx + 1}`,
          processNumber: p.processNumber || idx + 1,
          processPhase: p.processPhase || (idx < 3 ? 'ต้นน้ำ (Input & Intake)' : idx < 7 ? 'กลางน้ำ (Processing & Analysis)' : 'ปลายน้ำ (Review, Decision & Delivery)'),
          subProcess: p.subProcess || `กระบวนงานที่ ${idx + 1}`,
          jobPosition: aiData.jobTitle || aiJobTitle,
          taskAsIs: p.taskAsIs || 'งานเดิมที่ทำด้วยมือ',
          leanWasteEliminated: p.leanWasteEliminated || 'ลดการพิมพ์ซ้ำและการรอคอย',
          aiCapability: p.aiCapability || 'การสร้างเนื้อหา (Content Generation)',
          aiLevel: typeof p.aiLevel === 'number' ? p.aiLevel : 2,
          collaborationType: p.collaborationType || 'Augmentation',
          taskToBe: p.taskToBe || 'AI ช่วยดำเนินงาน / คนตรวจสอบยืนยันผล',
          governanceControl: p.governanceControl || 'Human Oversight & PDPA Compliance',
          skillsImpact: p.skillsImpact || 'Upskill',
          durationAsIs: p.durationAsIs || '1 วัน',
          durationToBe: p.durationToBe || '20 นาที',
          estimatedTimeSavedPercent: p.estimatedTimeSavedPercent || 75,
        }));

        const newProfile: JobRedesignProfile = {
          id: newId,
          jobTitle: aiData.jobTitle || aiJobTitle.trim(),
          department: aiData.department || aiDepartment.trim() || 'หน่วยงานทั่วไป',
          executiveOwner: 'ผู้บริหารสายงานกำกับดูแล',
          processName: aiData.processName || aiProcessName.trim() || `กระบวนงาน ${aiJobTitle.trim()}`,
          jobLevel: aiJobLevel,
          originalObjective: aiData.originalObjective || 'ปฏิบัติงานตามกระบวนงานเดิมขององค์กร',
          newObjective: aiData.newObjective || 'ยกระดับการทำงานร่วมกับ AI เพื่อความรวดเร็วและแม่นยำ',
          currentTasksCount: createdTasks.length,
          tasks: createdTasks,
          competencies: aiData.competencies || {
            technical: ['การเขียนคำสั่ง Prompt ให้ AI ทำงานตามบริบท', 'การตรวจสอบความถูกต้องของ AI Output'],
            responsibleEthics: ['การปฏิบัติตาม PDPA และร่าง พ.ร.บ. AI', 'การกำกับดูแลโดยมนุษย์ (Human Oversight)'],
            nonTechnical: ['การคิดวิเคราะห์เชิงวิพากษ์ (Critical Thinking)', 'การตัดสินใจในเคสซับซ้อน'],
          },
          leanSummary: aiData.leanSummary,
          trainingPlan: aiData.trainingPlan,
          sopCheatSheet: aiData.sopCheatSheet,
          workshopWorksheet: aiData.workshopWorksheet,
          leanToolsApplied: aiData.leanToolsApplied || {
            standardWork: 'กำหนดขั้นตอนและมาตรฐานการปฏิบัติงานที่ชัดเจน',
            onePieceFlow: 'งานไหลต่อเนื่อง ไม่มีการรอคอย หรือส่งต่องาน',
            automation: 'ระบบอัตโนมัติ ลดการใช้คน ลดเวลา ลดข้อผิดพลาด',
            errorProofing: 'ระบบป้องกันความผิดพลาด ตรวจสอบได้ ทวนสอบได้ (Poka-Yoke)',
          },
          leanSolutionQuote: aiData.leanSolutionQuote || 'ออกแบบกระบวนการใหม่ ให้คุณค่าไหลต่อเนื่อง ลดความสูญเปล่า',
          beforeFooterBadge: aiData.beforeFooterBadge || 'ล่าช้า | รอคอย | เสี่ยงผิดพลาด',
          afterFooterBadge: aiData.afterFooterBadge || 'เร็วขึ้น | ต่อเนื่อง | ปลอดภัย | แม่นยำ',
          aiStudioPrompt: aiData.aiStudioPrompt,
        };

        const updatedProfiles = [newProfile, ...profiles];
        setProfiles(updatedProfiles);
        setSelectedProfileId(newProfile.id);
        setIsAILanModalOpen(false);
        setActiveTab('profiles');
        showToast(`🎉 AI วิเคราะห์และ Lean กระบวนงานสำเร็จ! ลดเวลาได้เฉลี่ย ~${newProfile.leanSummary?.overallTimeSavedPercent || 75}% พร้อมชุดเทมเพลตอบรม`);
      } else {
        // Fallback heuristic engine if API fails
        runFallbackLeanEngine(processLines);
      }
    } catch (err) {
      console.warn('API error, falling back to local Lean Engine:', err);
      runFallbackLeanEngine(processLines);
    } finally {
      setIsAnalyzingLean(false);
    }
  };

  // Local fallback engine in case network is disconnected
  const runFallbackLeanEngine = (processLines: string[]) => {
    const newId = `JOB-AI-${Date.now().toString().slice(-4)}`;
    const createdTasks: TaskWorkflowItem[] = processLines.map((line, idx) => {
      const stepNum = idx + 1;
      const isInput = idx < Math.ceil(processLines.length * 0.35);
      const isOutput = idx >= Math.floor(processLines.length * 0.7);
      const phase = isInput
        ? 'ต้นน้ำ (Input & Intake)'
        : isOutput
        ? 'ปลายน้ำ (Review, Decision & Delivery)'
        : 'กลางน้ำ (Processing & Analysis)';

      const aiCap = isInput
        ? 'การวิเคราะห์ภาพ (Image Analysis / OCR) & การสืบค้นข้อมูล'
        : isOutput
        ? 'การทำงานอัตโนมัติ (Automation) & การสร้างเนื้อหา'
        : 'การตัดสินใจ (Decision Making) & การสังเคราะห์เนื้อหา';

      const level = isInput ? 3 : isOutput ? 4 : 2;

      return {
        id: `TASK-${Date.now().toString().slice(-4)}-${stepNum}`,
        processNumber: stepNum,
        processPhase: phase,
        subProcess: `${stepNum}. ${line.replace(/^\d+[\.\s]*/, '')}`,
        jobPosition: aiJobTitle,
        taskAsIs: `คนลงมือทำด้วยตนเอง: ${line}`,
        leanWasteEliminated: 'ขจัดความสูญเปล่าจากการคีย์ข้อมูลซ้ำและการค้นหาเอกสาร',
        aiCapability: aiCap,
        aiLevel: level,
        collaborationType: level >= 4 ? 'Automation' : 'Augmentation',
        taskToBe: `AI ช่วยประมวลผลและสกัดข้อมูลอัตโนมัติ / เจ้าหน้าที่ตรวจสอบยืนยันผลลัพธ์และลงนามอนุมัติ`,
        governanceControl: 'จัดให้มี Human Sign-off, ตรวจสอบอคติ และปฏิบัติตาม PDPA',
        skillsImpact: stepNum % 2 === 0 ? 'Reskill' : 'Upskill',
        durationAsIs: '1-2 วัน',
        durationToBe: '15-30 นาที',
        estimatedTimeSavedPercent: 75 + (stepNum % 3) * 5,
      };
    });

    const newProfile: JobRedesignProfile = {
      id: newId,
      jobTitle: aiJobTitle.trim(),
      department: aiDepartment.trim() || 'หน่วยงานทั่วไป',
      executiveOwner: 'ผู้บริหารสายงานกำกับดูแล',
      processName: aiProcessName.trim() || `กระบวนงานหลักสำหรับตำแหน่ง ${aiJobTitle.trim()}`,
      jobLevel: aiJobLevel,
      originalObjective: `รับผิดชอบกระบวนงานเดิมจำนวน ${createdTasks.length} ขั้นตอนด้วยการใช้แรงงานคนและเอกสารกระดาษ`,
      newObjective: `ยกระดับสู่การเป็นผู้กำกับดูแลระบบ AI (AI Co-pilot Supervisor), ผู้ตรวจความถูกต้อง และผู้สร้างคุณค่าเชิงกลยุทธ์`,
      currentTasksCount: createdTasks.length,
      tasks: createdTasks,
      competencies: {
        technical: [
          'ทักษะการสั่งงานและเขียนคำสั่ง (Prompt Engineering) ให้ AI ทำงานตามบริบท',
          'การใช้เครื่องมือ AI Workflow Platform และการตรวจสอบผลลัพธ์',
        ],
        responsibleEthics: [
          'การปฏิบัติตามมาตรฐานจริยธรรม AI และ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
          'การจัดให้มี Human Oversight ในขั้นตอนที่มีผลกระทบสำคัญ',
        ],
        nonTechnical: [
          'การคิดวิเคราะห์เชิงวิพากษ์ (Critical Thinking) ในการตัดสินใจขั้นสุดท้าย',
          'การบริหารความสัมพันธ์และการสื่อสารที่มีความเห็นอกเห็นใจ (Empathy)',
        ],
      },
      leanSummary: {
        wasteIdentified: ['การกรอกข้อมูลซ้ำซ้อนในหลายระบบ', 'การรอคอยการอนุมัติแบบกระดาษ', 'ความเหนื่อยล้าจากงาน Routine'],
        overallTimeSavedPercent: 78,
        keyTransformation: 'เปลี่ยนผ่านจากผู้ลงมือทำเอกสารซ้ำซ้อน ➔ ผู้ควบคุมระบบ AI และตัดสินใจเชิงกลยุทธ์',
      },
      leanToolsApplied: {
        standardWork: 'กำหนดขั้นตอนและมาตรฐานการปฏิบัติงานที่ชัดเจน เช่น กำหนดแบบฟอร์มกลางและเงื่อนไขข้อมูลที่ต้องระบุ',
        onePieceFlow: 'งานไหลต่อเนื่อง ไม่มีการรอคอยค้างท่อ หรือส่งต่องานข้ามไปมาแบบไร้ประสิทธิภาพ',
        automation: 'ระบบอัตโนมัติ AI และระบบงานดิจิทัล ลดภาระงานคีย์ข้อมูล ลดเวลาการประมวลผล',
        errorProofing: 'ระบบป้องกันความผิดพลาด ตรวจสอบได้ ทวนสอบได้ มีจุดตรวจทานก่อนการอนุมัติ (Poka-Yoke)',
      },
      leanSolutionQuote: 'ออกแบบกระบวนการใหม่ ให้คุณค่าไหลต่อเนื่อง ลดความสูญเปล่า',
      beforeFooterBadge: 'ล่าช้า | รอคอย | เสี่ยงผิดพลาด',
      afterFooterBadge: 'เร็วขึ้น | ต่อเนื่อง | ปลอดภัย | แม่นยำ',
    };

    const updatedProfiles = [newProfile, ...profiles];
    setProfiles(updatedProfiles);
    setSelectedProfileId(newProfile.id);
    setIsAILanModalOpen(false);
    setActiveTab('profiles');
    showToast(`✨ วิเคราะห์และ Lean กระบวนงานสำเร็จ! ลดเวลาได้เฉลี่ย ~78% พร้อมสร้างผังกระบวนงานให้ทันที`);
  };

  // Move Task / Process Step Up or Down
  const handleMoveTask = (index: number, direction: 'up' | 'down') => {
    const tasks = [...currentProfile.tasks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= tasks.length) return;

    const temp = tasks[index];
    tasks[index] = tasks[targetIndex];
    tasks[targetIndex] = temp;

    // Re-index processNumber
    const reindexedTasks = tasks.map((t, idx) => ({
      ...t,
      processNumber: idx + 1,
    }));

    const updatedProfile = { ...currentProfile, tasks: reindexedTasks };
    setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)));
    showToast(`ปรับลำดับกระบวนงานเรียบร้อยแล้ว`);
  };

  // Duplicate / Clone Profile
  const handleClonePosition = () => {
    const cloneId = `JOB-CLONE-${Date.now().toString().slice(-4)}`;
    const clonedProfile: JobRedesignProfile = {
      ...currentProfile,
      id: cloneId,
      jobTitle: `${currentProfile.jobTitle} (ร่างจำลอง)`,
      tasks: currentProfile.tasks.map((t, idx) => ({
        ...t,
        id: `TASK-${Date.now().toString().slice(-4)}-${idx + 1}`,
      })),
    };

    const updatedList = [clonedProfile, ...profiles];
    setProfiles(updatedList);
    setSelectedProfileId(clonedProfile.id);
    showToast(`โคลนตำแหน่งงานเป็น "${clonedProfile.jobTitle}" สำเร็จ`);
  };

  // Delete Current Profile
  const handleDeletePosition = () => {
    if (profiles.length <= 1) {
      alert('ไม่สามารถลบตำแหน่งงานสุดท้ายได้ กรุณาสร้างหรือคงไว้อย่างน้อย 1 ตำแหน่ง');
      return;
    }

    if (window.confirm(`ยืนยันการลบตำแหน่ง "${currentProfile.jobTitle}" (${currentProfile.id}) ใช่หรือไม่?`)) {
      const remaining = profiles.filter((p) => p.id !== currentProfile.id);
      setProfiles(remaining);
      setSelectedProfileId(remaining[0].id);
      showToast(`ลบตำแหน่งงานเรียบร้อยแล้ว`);
    }
  };

  // Reset to default ETDA baseline profiles (10-step profiles)
  const handleResetToDefaults = () => {
    if (
      window.confirm(
        'คุณต้องการรีเซ็ตตำแหน่งงานทั้งหมดกลับเป็นตัวอย่าง 10 กระบวนงานมาตรฐานตามคู่มือ สพธอ. ETDA หรือไม่? ข้อมูลที่คุณเพิ่มเองจะถูกล้าง'
      )
    ) {
      setProfiles(initialJobRedesignProfiles);
      setSelectedProfileId(initialJobRedesignProfiles[0].id);
      localStorage.removeItem(LOCAL_STORAGE_PROFILES_KEY);
      showToast('รีเซ็ตเป็นชุด 10 กระบวนงานมาตรฐาน ETDA เรียบร้อยแล้ว');
    }
  };

  // Task Add / Edit Submission (Single item)
  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subProcessInput.trim() || !taskAsIsInput.trim()) return;

    const levelObj = aiLevelsTable.find((l) => l.level === aiLevelInput) || aiLevelsTable[2];

    if (editingTaskId) {
      const updatedTasks = currentProfile.tasks.map((t) => {
        if (t.id === editingTaskId) {
          return {
            ...t,
            processNumber: processNumberInput,
            processPhase: processPhaseInput,
            subProcess: subProcessInput.trim(),
            durationAsIs: durationAsIsInput.trim(),
            durationToBe: durationToBeInput.trim(),
            taskAsIs: taskAsIsInput.trim(),
            aiCapability: aiCapInput,
            aiLevel: aiLevelInput,
            collaborationType: levelObj.collaborationGroup,
            taskToBe:
              taskToBeInput.trim() ||
              `AI ช่วยดำเนินการตามภารกิจ / คนตรวจสอบยืนยันผลลัพธ์ (${levelObj.humanResponsibility})`,
            governanceControl:
              govControlInput.trim() ||
              'จัดให้มี Human Oversight ตรวจสอบความถูกต้องและสอดคล้องกับจริยธรรมข้อมูล',
            skillsImpact: skillsImpactInput,
            estimatedTimeSavedPercent: timeSavedInput,
          };
        }
        return t;
      });

      const updatedProfile = { ...currentProfile, tasks: updatedTasks };
      setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)));
      showToast(`แก้ไขกระบวนงาน "${subProcessInput}" เรียบร้อยแล้ว`);
    } else {
      const newProcessNum = currentProfile.tasks.length + 1;
      const newTask: TaskWorkflowItem = {
        id: `TASK-${Date.now().toString().slice(-4)}`,
        processNumber: processNumberInput || newProcessNum,
        processPhase: processPhaseInput,
        subProcess: subProcessInput.trim(),
        durationAsIs: durationAsIsInput.trim() || '1 วัน',
        durationToBe: durationToBeInput.trim() || '30 นาที',
        jobPosition: currentProfile.jobTitle,
        taskAsIs: taskAsIsInput.trim(),
        aiCapability: aiCapInput,
        aiLevel: aiLevelInput,
        collaborationType: levelObj.collaborationGroup,
        taskToBe:
          taskToBeInput.trim() ||
          `AI ช่วยดำเนินการตามภารกิจ / คนตรวจสอบยืนยันผลลัพธ์ (${levelObj.humanResponsibility})`,
        governanceControl:
          govControlInput.trim() ||
          'จัดให้มี Human Oversight ตรวจสอบความถูกต้องและสอดคล้องกับจริยธรรมข้อมูล',
        skillsImpact: skillsImpactInput,
        estimatedTimeSavedPercent: timeSavedInput,
      };

      const updatedProfile = {
        ...currentProfile,
        tasks: [...currentProfile.tasks, newTask],
        currentTasksCount: currentProfile.tasks.length + 1,
      };

      setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)));
      showToast(`เพิ่มกระบวนงานลำดับที่ ${newTask.processNumber} สำเร็จ!`);
    }

    // Reset Form
    setSubProcessInput('');
    setTaskAsIsInput('');
    setTaskToBeInput('');
    setGovControlInput('');
    setDurationAsIsInput('1 วัน');
    setDurationToBeInput('30 นาที');
    setTimeSavedInput(75);
    setIsAddingTask(false);
    setEditingTaskId(null);
  };

  const startEditTask = (task: TaskWorkflowItem) => {
    setEditingTaskId(task.id);
    setProcessNumberInput(task.processNumber || 1);
    setProcessPhaseInput(task.processPhase || 'ต้นน้ำ (Input & Intake)');
    setSubProcessInput(task.subProcess);
    setDurationAsIsInput(task.durationAsIs || '1 วัน');
    setDurationToBeInput(task.durationToBe || '30 นาที');
    setTaskAsIsInput(task.taskAsIs);
    setAiCapInput(task.aiCapability);
    setAiLevelInput(task.aiLevel);
    setTaskToBeInput(task.taskToBe);
    setGovControlInput(task.governanceControl);
    setSkillsImpactInput(task.skillsImpact);
    setTimeSavedInput(task.estimatedTimeSavedPercent ?? 70);
    setIsAddingTask(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('ยืนยันลบกระบวนงานนี้ออกจากกระบวนงานหลัก?')) {
      const remainingTasks = currentProfile.tasks.filter((t) => t.id !== taskId);
      const reindexed = remainingTasks.map((t, idx) => ({ ...t, processNumber: idx + 1 }));
      const updatedProfile = {
        ...currentProfile,
        tasks: reindexed,
        currentTasksCount: reindexed.length,
      };
      setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)));
      showToast('ลบกระบวนงานสำเร็จ');
    }
  };

  // Competency Management
  const handleAddCompetency = (category: 'technical' | 'responsibleEthics' | 'nonTechnical', value: string) => {
    if (!value.trim()) return;
    const currentList = currentProfile.competencies[category] || [];
    if (currentList.includes(value.trim())) return;

    const updatedProfile = {
      ...currentProfile,
      competencies: {
        ...currentProfile.competencies,
        [category]: [...currentList, value.trim()],
      },
    };

    setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)));
    showToast('เพิ่มทักษะเรียบร้อยแล้ว');
  };

  const handleRemoveCompetency = (category: 'technical' | 'responsibleEthics' | 'nonTechnical', indexToRemove: number) => {
    const currentList = currentProfile.competencies[category] || [];
    const updatedProfile = {
      ...currentProfile,
      competencies: {
        ...currentProfile.competencies,
        [category]: currentList.filter((_, idx) => idx !== indexToRemove),
      },
    };

    setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)));
    showToast('ลบทักษะสำเร็จ');
  };

  // Metrics calculation
  const totalTasks = currentProfile.tasks.length;
  const autoTasks = currentProfile.tasks.filter((t) => t.aiLevel >= 4).length;
  const augmentTasks = currentProfile.tasks.filter((t) => t.aiLevel >= 1 && t.aiLevel <= 3).length;
  const humanTasks = currentProfile.tasks.filter((t) => t.aiLevel === 0).length;
  const reskillTasks = currentProfile.tasks.filter((t) => t.skillsImpact === 'Reskill').length;
  const upskillTasks = currentProfile.tasks.filter((t) => t.skillsImpact === 'Upskill').length;

  const autoPct = totalTasks > 0 ? Math.round((autoTasks / totalTasks) * 100) : 0;
  const augmentPct = totalTasks > 0 ? Math.round((augmentTasks / totalTasks) * 100) : 0;
  const humanPct = totalTasks > 0 ? Math.round((humanTasks / totalTasks) * 100) : 0;

  const avgTimeSaved =
    totalTasks > 0
      ? Math.round(
          currentProfile.tasks.reduce((acc, t) => acc + (t.estimatedTimeSavedPercent ?? 70), 0) / totalTasks
        )
      : 0;

  const phaseInCount = currentProfile.tasks.filter((t) => t.processPhase?.includes('ต้นน้ำ')).length;
  const phaseMidCount = currentProfile.tasks.filter((t) => t.processPhase?.includes('กลางน้ำ')).length;
  const phaseOutCount = currentProfile.tasks.filter((t) => t.processPhase?.includes('ปลายน้ำ')).length;

  // Copy Full Training Pack & SOP to Clipboard
  const copyTrainingPack = () => {
    const text = `================================================================
ETDA AI WORKFORCE TRAINING & OPERATIONAL SOP PACKAGE
ชุดเทมเพลตและคู่มือปฏิบัติการสำหรับการอบรมบุคลากรและการใช้งานจริง
ตำแหน่งงาน: ${currentProfile.jobTitle} (${currentProfile.department})
================================================================

[ส่วนที่ 1: แผนการอบรมพัฒนาทักษะ 4 สัปดาห์ (4-Week AI Training Curriculum)]
หลักสูตร: ${currentTrainingPlan.courseTitle}
กลุ่มเป้าหมาย: ${currentTrainingPlan.targetAudience}

${currentTrainingPlan.modules
  .map(
    (m) => `
* ${m.week}: ${m.title}
  - สาระสำคัญที่มุ่งเน้น: ${m.focus}
  - เครื่องมือ AI ที่ใช้ฝึกปฏิบัติ: ${m.toolUsed}
  - ชิ้นงาน/ผลลัพธ์ที่ต้องส่ง (Deliverable): ${m.deliverable}`
  )
  .join('\n')}

----------------------------------------------------------------
[ส่วนที่ 2: คู่มือปฏิบัติการแบบย่อและข้อควรระวัง (SOP Cheat Sheet)]

1. หน้าที่ที่อนุญาตให้ AI ดำเนินการได้ (AI Responsibilities):
${currentSOPCheatSheet.aiResponsibilities.map((r) => `- ${r}`).join('\n')}

2. หน้าที่ของมนุษย์ในการตรวจสอบและรับผิดชอบ (Human Oversight & Decision):
${currentSOPCheatSheet.humanResponsibilities.map((r) => `- ${r}`).join('\n')}

3. ข้อห้ามเด็ดขาดในการใช้ AI ในงานนี้ (Strictly Prohibited Actions):
${currentSOPCheatSheet.prohibitedActions.map((r) => `- [!] ${r}`).join('\n')}

4. เช็คลิสต์ตรวจสอบก่อนลงนามอนุมัติผลงาน (Pre-Approval Checklist):
${currentSOPCheatSheet.checklistBeforeApproval.map((c) => `- [ ] ${c}`).join('\n')}

----------------------------------------------------------------
[ส่วนที่ 3: ใบงานฝึกปฏิบัติและคลังคำสั่ง Prompt Template (Workshop Worksheet)]

${currentWorkshopWorksheet.promptExercises
  .map(
    (ex, idx) => `
[แบบฝึกหัดที่ ${idx + 1}] ขั้นตอน: ${ex.processStep}
- ภารกิจ: ${ex.taskDescription}
- คำสั่งตัวอย่าง (Prompt Template):
"""
${ex.examplePromptTemplate}
"""
- จุดที่มนุษย์ต้องตรวจทาน (Human Review Checklist): ${ex.humanReviewChecklist}`
  )
  .join('\n')}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('คัดลอกชุดเทมเพลตอบรมและคู่มือ SOP ลง Clipboard เรียบร้อยแล้ว!');
    setTimeout(() => setCopied(false), 3000);
  };

  const copyPromptTemplate = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    showToast('คัดลอก Prompt Template ลง Clipboard แล้ว!');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141414] text-white px-4 py-3 shadow-2xl border-2 border-amber-500 font-mono text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/70 shrink-0 space-y-3 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">10.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414] flex items-center gap-2">
                ออกแบบกระบวนงานคนร่วม AI (Business Process & Workflow Redesign Studio)
                <span className="text-[10px] font-mono font-bold bg-amber-800 text-white px-2 py-0.5 border border-amber-900">
                  สพธอ. ETDA / AIGC 2569
                </span>
              </h2>
              <p className="text-xs text-[#141414]/70">
                สร้าง Job และระบุ List กระบวนการทำงานทั้งหมด จากนั้นให้ AI ช่วยวิเคราะห์ Lean Waste, Redesign ผังการทำงาน และจัดทำชุดเทมเพลตอบรมบุคลากร
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap items-center gap-1 bg-white p-1 border border-[#141414] text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'profiles' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              1. สตูดิโอออกแบบกระบวนงาน (Workflow Studio)
            </button>
            <button
              onClick={() => setActiveTab('training_pack')}
              className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'training_pack' ? 'bg-purple-900 text-white' : 'hover:bg-purple-100 text-purple-950'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              2. ชุดเทมเพลตอบรม & คู่มือ SOP (Training Pack)
            </button>
            <button
              onClick={() => setActiveTab('levels')}
              className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'levels' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              3. ระดับ AI Level 0-5
            </button>
            <button
              onClick={() => setActiveTab('capabilities')}
              className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'capabilities' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              4. 16 NIST Capabilities
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'skills' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              5. แผน Upskill vs Reskill
            </button>
            <button
              onClick={() => setActiveTab('executive2569')}
              className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'executive2569' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              6. 3 เสาหลักกำกับ (2569)
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F5F4F0] space-y-6">
        {/* Tab 1: Workflow Studio */}
        {activeTab === 'profiles' && (
          <div className="space-y-6">
            {/* Top Toolbar: Primary Call to Action for AI Intake & Lean Engine */}
            <div className="p-4 bg-white border border-[#141414] shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-900 uppercase flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  เลือกตำแหน่งงาน:
                </span>
                <select
                  value={selectedProfileId}
                  onChange={(e) => setSelectedProfileId(e.target.value)}
                  className="px-3 py-1.5 border border-[#141414] bg-[#F5F4F0] font-bold text-xs cursor-pointer max-w-xs md:max-w-md truncate"
                >
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.jobTitle} [{p.tasks.length} กระบวนงาน]
                    </option>
                  ))}
                </select>

                {/* THE USER'S REQUESTED BUTTON: AI Intake & Lean Process */}
                <button
                  onClick={() => {
                    setAiJobTitle('');
                    setAiDepartment('');
                    setAiProcessName('');
                    setRawProcessInput('');
                    setBusinessContextInput('');
                    setIsAILanModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-linear-to-r from-purple-900 to-indigo-900 hover:from-purple-950 hover:to-indigo-950 text-white font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md ring-2 ring-purple-400/40"
                  title="ใส่รายชื่อกระบวนงานทั้งหมด แล้วให้ AI วิเคราะห์ Lean Process และสร้าง Training Pack ให้ทันที"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>✨ ให้ AI วิเคราะห์ & Lean กระบวนงาน (AI Lean Studio)</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('training_pack')}
                  className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-800 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="เปิดดูชุดเทมเพลตอบรมและคู่มือ SOP ของตำแหน่งนี้"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                  <span>🎓 ชุดเทมเพลตอบรม & SOP</span>
                </button>

                <button
                  onClick={() => setIs10StepModalOpen(true)}
                  className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-[#141414] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                  title="ดึงแม่แบบ 10 กระบวนงานมาตรฐาน ETDA"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>โหลดแม่แบบ 10 ขั้น</span>
                </button>

                <button
                  onClick={() => setIsAddPositionModalOpen(true)}
                  className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-[#141414] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มตำแหน่งเอง</span>
                </button>

                <button
                  onClick={handleClonePosition}
                  title="โคลนตำแหน่งนี้"
                  className="px-2 py-1.5 bg-white hover:bg-zinc-100 border border-[#141414] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-zinc-700" />
                </button>

                <button
                  onClick={handleDeletePosition}
                  title="ลบตำแหน่งนี้"
                  className="px-2 py-1.5 bg-white hover:bg-red-50 text-red-700 border border-red-800 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleResetToDefaults}
                  title="รีเซ็ตเป็นค่าเริ่มต้น ETDA"
                  className="p-1.5 text-zinc-500 hover:text-red-700 hover:bg-zinc-200 border border-zinc-300 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Profile Overview Card */}
            <div className="p-5 bg-white border-2 border-[#141414] shadow-sm space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#141414]/20 pb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono font-bold">
                      {currentProfile.id}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-800 text-[10px] font-mono font-bold">
                      {currentProfile.jobLevel}
                    </span>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-800 text-[10px] font-mono font-bold flex items-center gap-1">
                      <Workflow className="w-3 h-3" />
                      {currentProfile.processName || 'กระบวนงานหลักครบวงจร'}
                    </span>
                    <span className="text-xs font-mono text-[#141414]/70">
                      สังกัด: <strong>{currentProfile.department}</strong>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-serif italic text-[#141414]">
                    {currentProfile.jobTitle}
                  </h3>
                </div>

                {/* Real-time Automation & Lead-time Metrics Strip */}
                <div className="flex flex-wrap items-center gap-2 bg-[#F5F4F0] p-2.5 border border-[#141414]/30 text-center font-mono text-xs">
                  <div className="px-2">
                    <div className="text-[10px] text-zinc-600 uppercase">กระบวนงาน</div>
                    <div className="text-base font-bold text-[#141414]">{totalTasks} ขั้นตอน</div>
                  </div>
                  <div className="w-px h-8 bg-zinc-300" />
                  <div className="px-2">
                    <div className="text-[10px] text-emerald-800 uppercase">Augment (คน+AI)</div>
                    <div className="text-base font-bold text-emerald-700">{augmentPct}%</div>
                  </div>
                  <div className="w-px h-8 bg-zinc-300" />
                  <div className="px-2">
                    <div className="text-[10px] text-purple-800 uppercase">Automate (AI นำ)</div>
                    <div className="text-base font-bold text-purple-700">{autoPct}%</div>
                  </div>
                  <div className="w-px h-8 bg-zinc-300" />
                  <div className="px-2">
                    <div className="text-[10px] text-amber-800 uppercase">ประหยัดเวลาเฉลี่ย</div>
                    <div className="text-base font-bold text-amber-800">~{avgTimeSaved}%</div>
                  </div>
                </div>
              </div>

              {/* Lean Transformation Banner if available */}
              {currentProfile.leanSummary && (
                <div className="p-3 bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-300 space-y-1.5 text-xs">
                  <div className="font-mono font-bold text-purple-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                    <span>ผลการวิเคราะห์ Lean Process Re-engineering:</span>
                    <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.2 border border-emerald-300">
                      ประหยัดเวลา ~{currentProfile.leanSummary.overallTimeSavedPercent}%
                    </span>
                  </div>
                  <p className="text-zinc-700 font-sans leading-relaxed">
                    <strong>การเปลี่ยนผ่านสำคัญ:</strong> {currentProfile.leanSummary.keyTransformation}
                  </p>
                  {currentProfile.leanSummary.wasteIdentified && currentProfile.leanSummary.wasteIdentified.length > 0 && (
                    <div className="text-[11px] text-purple-900 font-mono flex flex-wrap gap-2 pt-0.5">
                      <span className="font-bold">ความสูญเปล่าที่ขจัดได้ (Lean Waste):</span>
                      {currentProfile.leanSummary.wasteIdentified.map((w, idx) => (
                        <span key={idx} className="bg-white px-2 py-0.5 border border-purple-200">
                          ✓ {w}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Original vs Redefined Objective */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3.5 bg-[#F5F4F0] border border-[#141414]/30 space-y-1">
                  <div className="font-mono text-[11px] font-bold text-red-900 uppercase flex items-center justify-between">
                    <span>ภาระงานและบทบาทเดิมก่อนใช้ AI (As-Is Purpose)</span>
                    <span className="text-[10px] text-zinc-500 font-normal">เดิมทีทำอย่างไร</span>
                  </div>
                  <p className="text-[#141414]/85 leading-relaxed">{currentProfile.originalObjective}</p>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-800 space-y-1">
                  <div className="font-mono text-[11px] font-bold text-emerald-950 uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      บทบาทหน้าที่ใหม่เมื่อทำงานร่วมกับ AI (Redefined Role & Duty To-Be)
                    </span>
                    <span className="text-[10px] text-emerald-800 font-normal">บทบาทใหม่ยกระดับ</span>
                  </div>
                  <p className="text-emerald-950 font-medium leading-relaxed">{currentProfile.newObjective}</p>
                </div>
              </div>
            </div>

            {/* Workflow Mode Switcher & Process Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#141414] pb-2">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 border border-[#141414] flex items-center gap-1 font-mono text-xs font-bold">
                  <button
                    onClick={() => setWorkflowViewMode('lean_board')}
                    className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                      workflowViewMode === 'lean_board' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>กระดาน Lean Solution (ตามแบบ ETDA)</span>
                  </button>
                  <button
                    onClick={() => setWorkflowViewMode('pipeline')}
                    className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                      workflowViewMode === 'pipeline' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
                    }`}
                  >
                    <Workflow className="w-3.5 h-3.5" />
                    <span>ผังสายธารกระบวนงาน (Pipeline Flow)</span>
                  </button>
                  <button
                    onClick={() => setWorkflowViewMode('matrix')}
                    className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                      workflowViewMode === 'matrix' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
                    }`}
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>ตารางเปรียบเทียบ (Matrix Table)</span>
                  </button>
                  <button
                    onClick={() => setWorkflowViewMode('analytics')}
                    className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                      workflowViewMode === 'analytics' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>สรุปผลกระทบ (Analytics)</span>
                  </button>
                </div>

                <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-400">
                    ต้นน้ำ: {phaseInCount}
                  </span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-400">
                    กลางน้ำ: {phaseMidCount}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-400">
                    ปลายน้ำ: {phaseOutCount}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 print:hidden">
                <button
                  onClick={() => {
                    setEditingTasksList(JSON.parse(JSON.stringify(currentProfile.tasks)));
                    setIsEditAllTasksModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-[#141414] border border-[#141414] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="เปิดหน้าต่างให้มนุษย์ตรวจทาน แก้ไข เพิ่ม หรือลบขั้นตอน To-Be ได้อย่างอิสระ"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                  <span>✏️ ให้คนตรวจหรือแก้ (Human Edit)</span>
                </button>

                <button
                  onClick={() => setIsAIStudioModalOpen(true)}
                  className="px-3 py-1.5 bg-linear-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="สร้างคำสั่ง System Prompt เพื่อนำไปสร้างระบบใน Google AI Studio ทันที"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>🔮 Prompt สร้างใน AI Studio</span>
                </button>

                <button
                  onClick={() => {
                    setEditingTaskId(null);
                    setProcessNumberInput(currentProfile.tasks.length + 1);
                    setProcessPhaseInput(
                      currentProfile.tasks.length < 3
                        ? 'ต้นน้ำ (Input & Intake)'
                        : currentProfile.tasks.length < 7
                        ? 'กลางน้ำ (Processing & Analysis)'
                        : 'ปลายน้ำ (Review, Decision & Delivery)'
                    );
                    setSubProcessInput('');
                    setTaskAsIsInput('');
                    setTaskToBeInput('');
                    setGovControlInput('');
                    setDurationAsIsInput('1 วัน');
                    setDurationToBeInput('30 นาที');
                    setTimeSavedInput(75);
                    setIsAddingTask(!isAddingTask);
                  }}
                  className="px-3.5 py-1.5 bg-[#141414] hover:bg-zinc-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingTask ? 'ปิดฟอร์ม' : '+ เพิ่มกระบวนงาน'}</span>
                </button>
              </div>
            </div>

            {/* ETDA Lean Solution Board (Matching User's Attached Image) */}
            {workflowViewMode === 'lean_board' && (
              <div className="bg-white border-2 border-[#141414] p-5 md:p-6 shadow-sm space-y-6">
                {/* Header Banner */}
                <div className="text-center space-y-1.5 border-b-2 border-blue-900 pb-4">
                  <div className="inline-block px-3 py-0.5 bg-blue-900 text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                    ETDA Standard · AI Job Redesign & Lean Solution
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 font-serif tracking-tight flex items-center justify-center gap-2">
                    <Zap className="w-7 h-7 text-amber-500 fill-amber-500" />
                    <span>Lean Solution</span>
                  </h2>
                  <p className="text-xs text-zinc-600 font-sans max-w-xl mx-auto">
                    เปรียบเทียบกระบวนการเดิม (Before) สู่กระบวนการใหม่ร่วมกับ AI (After) และเครื่องมือ Lean Tools 4 เสาหลัก
                  </p>
                </div>

                {/* Sub-bar with quick actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-blue-50/70 border border-blue-200">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-950">
                    <Briefcase className="w-4 h-4 text-blue-800" />
                    <span>ตำแหน่ง: {currentProfile.jobTitle}</span>
                    <span className="text-blue-300">|</span>
                    <span className="text-zinc-600 font-sans font-normal">{currentProfile.processName || 'กระบวนงานหลัก'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingTasksList(JSON.parse(JSON.stringify(currentProfile.tasks)));
                        setIsEditAllTasksModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-[#141414] border border-[#141414] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      title="เปิดหน้าต่างให้มนุษย์ตรวจทาน แก้ไข เพิ่ม หรือลบขั้นตอน To-Be ได้อย่างอิสระ"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                      <span>✏️ ให้คนตรวจหรือแก้ (Human Edit)</span>
                    </button>

                    <button
                      onClick={() => setIsAIStudioModalOpen(true)}
                      className="px-3.5 py-1.5 bg-linear-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      title="สร้างคำสั่ง System Prompt เพื่อนำไปสร้างระบบใน Google AI Studio ทันที"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      <span>🔮 สร้าง Prompt สำหรับ AI Studio</span>
                    </button>
                  </div>
                </div>

                {/* 3-Column Layout: Before (Red) -> Transition -> After (Green) -> Lean Tools (Blue) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                  {/* Column 1: เดิม (Before) */}
                  <div className="lg:col-span-4 flex flex-col bg-red-50/30 border-2 border-red-300 rounded-xl overflow-hidden shadow-xs">
                    <div className="bg-red-600 text-white font-mono font-bold text-center py-2.5 text-sm tracking-wide flex items-center justify-center gap-2 shadow-xs">
                      <AlertTriangle className="w-4 h-4" />
                      <span>เดิม (Before)</span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-3">
                        {currentProfile.tasks.map((task, idx) => (
                          <div key={task.id} className="space-y-2">
                            <div className="bg-white border border-red-200 p-3 rounded-lg shadow-2xs flex items-start gap-3">
                              <div className="w-9 h-9 rounded-full bg-red-100 border border-red-300 text-red-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                {idx === 0 ? '📱' : idx === 1 ? '⏳' : idx === 2 ? '✍️' : idx === 3 ? '🔢' : '📄'}
                              </div>
                              <div className="space-y-1 flex-1">
                                <div className="text-[11px] font-mono font-bold text-red-900">
                                  {task.subProcess.includes('.') ? task.subProcess.split('.')[0] + '.' : `${idx + 1}.`} {task.subProcess.includes('.') ? task.subProcess.split('.')[1] : task.subProcess}
                                </div>
                                <p className="text-xs text-zinc-700 leading-relaxed font-sans">{task.taskAsIs}</p>
                                {task.durationAsIs && (
                                  <div className="text-[10px] font-mono text-red-800 flex items-center gap-1 pt-0.5">
                                    <Clock className="w-3 h-3" />
                                    <span>เวลาเดิม: {task.durationAsIs}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {idx < currentProfile.tasks.length - 1 && (
                              <div className="flex justify-center text-red-300 font-bold text-xs">↓</div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Footer Badge Red (Matching image) */}
                      <div className="mt-4 pt-3 border-t border-red-200">
                        <div className="bg-red-600 text-white font-mono font-bold text-center py-2 px-3 rounded-md text-xs flex items-center justify-center gap-2 shadow-xs">
                          <Timer className="w-3.5 h-3.5" />
                          <span>{currentProfile.beforeFooterBadge || 'ล่าช้า | รอคอย | เสี่ยงผิดพลาด'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: ใหม่ (After) */}
                  <div className="lg:col-span-5 flex flex-col bg-emerald-50/30 border-2 border-emerald-400 rounded-xl overflow-hidden shadow-xs">
                    <div className="bg-emerald-700 text-white font-mono font-bold text-center py-2.5 text-sm tracking-wide flex items-center justify-center gap-2 shadow-xs">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>ใหม่ (After)</span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-3">
                        {currentProfile.tasks.map((task, idx) => (
                          <div key={task.id} className="space-y-2">
                            <div className="bg-white border-2 border-emerald-300 p-3 rounded-lg shadow-2xs flex items-start gap-3">
                              <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                {idx === 0 ? '🌐' : idx === 1 ? '📅' : idx === 2 ? '🖋️' : idx === 3 ? '🤖' : '✅'}
                              </div>
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[11px] font-mono font-bold text-emerald-950">
                                    {task.subProcess.includes('.') ? task.subProcess.split('.')[0] + '.' : `${idx + 1}.`} {task.subProcess.includes('.') ? task.subProcess.split('.')[1] : task.subProcess}
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold">
                                    Level {task.aiLevel}
                                  </span>
                                </div>
                                <p className="text-xs text-emerald-950 font-medium leading-relaxed font-sans">{task.taskToBe}</p>
                                <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-mono">
                                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                                    ⚡ เวลาใหม่: {task.durationToBe || 'รวดเร็ว'} (~{task.estimatedTimeSavedPercent || 80}%)
                                  </span>
                                  <span className="text-purple-900 bg-purple-50 px-1.5 py-0.5 border border-purple-200">
                                    🛡️ {task.governanceControl?.slice(0, 36)}...
                                  </span>
                                </div>
                              </div>
                            </div>
                            {idx < currentProfile.tasks.length - 1 && (
                              <div className="flex justify-center text-emerald-400 font-bold text-xs">↓</div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Footer Badge Green (Matching image) */}
                      <div className="mt-4 pt-3 border-t border-emerald-200">
                        <div className="bg-emerald-600 text-white font-mono font-bold text-center py-2 px-3 rounded-md text-xs flex items-center justify-center gap-2 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{currentProfile.afterFooterBadge || 'เร็วขึ้น | ต่อเนื่อง | ปลอดภัย | แม่นยำ'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Lean Tools (4 เสาหลัก) */}
                  <div className="lg:col-span-3 flex flex-col bg-linear-to-b from-blue-950 to-indigo-950 text-white rounded-xl overflow-hidden shadow-sm p-4 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-blue-800 text-amber-300 font-mono font-bold text-sm uppercase">
                      <Cpu className="w-4 h-4" />
                      <span>Lean Tools (4 เสาหลัก)</span>
                    </div>

                    <div className="space-y-3 flex-1 text-xs">
                      {/* Tool 1 */}
                      <div className="space-y-1 bg-white/10 p-3 rounded-lg border border-white/15">
                        <div className="flex items-center justify-between text-amber-300 font-bold font-mono">
                          <span>Standard Work</span>
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                        </div>
                        <p className="text-white/80 text-[11px] leading-relaxed">
                          {currentProfile.leanToolsApplied?.standardWork || 'กำหนดขั้นตอนและมาตรฐานการปฏิบัติงานที่ชัดเจน'}
                        </p>
                      </div>

                      {/* Tool 2 */}
                      <div className="space-y-1 bg-white/10 p-3 rounded-lg border border-white/15">
                        <div className="flex items-center justify-between text-amber-300 font-bold font-mono">
                          <span>One Piece Flow</span>
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                        </div>
                        <p className="text-white/80 text-[11px] leading-relaxed">
                          {currentProfile.leanToolsApplied?.onePieceFlow || 'งานไหลต่อเนื่อง ไม่มีการรอคอย หรือส่งต่องาน'}
                        </p>
                      </div>

                      {/* Tool 3 */}
                      <div className="space-y-1 bg-white/10 p-3 rounded-lg border border-white/15">
                        <div className="flex items-center justify-between text-amber-300 font-bold font-mono">
                          <span>Automation</span>
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                        </div>
                        <p className="text-white/80 text-[11px] leading-relaxed">
                          {currentProfile.leanToolsApplied?.automation || 'ระบบอัตโนมัติ ลดการใช้คน ลดเวลา ลดข้อผิดพลาด'}
                        </p>
                      </div>

                      {/* Tool 4 */}
                      <div className="space-y-1 bg-white/10 p-3 rounded-lg border border-white/15">
                        <div className="flex items-center justify-between text-amber-300 font-bold font-mono">
                          <span>Error Proofing</span>
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                        </div>
                        <p className="text-white/80 text-[11px] leading-relaxed">
                          {currentProfile.leanToolsApplied?.errorProofing || 'ระบบป้องกันความผิดพลาด ตรวจสอบได้ ทวนสอบได้ (Poka-Yoke)'}
                        </p>
                      </div>
                    </div>

                    {/* Bottom AI Studio CTA */}
                    <div className="pt-2 border-t border-blue-800 space-y-2">
                      <button
                        onClick={() => setIsAIStudioModalOpen(true)}
                        className="w-full py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-blue-950 font-mono font-bold text-xs rounded-md flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-blue-950" />
                        <span>เปิดสร้างแอปใน AI Studio ➔</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quotation Footer Banner (Matching bottom of image) */}
                <div className="p-3.5 bg-blue-950 text-white rounded-xl flex items-center justify-center text-center font-serif italic text-sm md:text-base border border-blue-800 shadow-xs">
                  <span className="text-amber-400 font-bold text-lg mr-2">“</span>
                  <span>{currentProfile.leanSolutionQuote || 'ออกแบบกระบวนการใหม่ ให้คุณค่าไหลต่อเนื่อง ลดความสูญเปล่า'}</span>
                  <span className="text-amber-400 font-bold text-lg ml-2">”</span>
                </div>
              </div>
            )}

            {/* Visual Pipeline Flow View */}
            {workflowViewMode === 'pipeline' && (
              <div className="space-y-3">
                {currentProfile.tasks.map((task, index) => {
                  const levelInfo = aiLevelsTable.find((l) => l.level === task.aiLevel) || aiLevelsTable[2];
                  const isFirst = index === 0;
                  const isLast = index === currentProfile.tasks.length - 1;

                  return (
                    <div
                      key={task.id}
                      className="bg-white border-2 border-[#141414] shadow-xs hover:shadow-md transition-shadow relative"
                    >
                      <div className="p-3 bg-[#F5F4F0] border-b border-[#141414]/20 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                            {String(task.processNumber || index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.2 text-[10px] font-mono font-bold border ${
                                  task.processPhase?.includes('ต้นน้ำ')
                                    ? 'bg-blue-100 text-blue-900 border-blue-400'
                                    : task.processPhase?.includes('กลางน้ำ')
                                    ? 'bg-purple-100 text-purple-900 border-purple-400'
                                    : 'bg-emerald-100 text-emerald-900 border-emerald-400'
                                }`}
                              >
                                {task.processPhase || 'กระบวนงาน'}
                              </span>
                              <h4 className="font-bold text-sm text-[#141414]">{task.subProcess}</h4>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 print:hidden">
                          {(task.durationAsIs || task.durationToBe) && (
                            <div className="px-2.5 py-1 bg-amber-50 border border-amber-400 font-mono text-[11px] text-amber-950 font-bold flex items-center gap-1.5">
                              <Timer className="w-3.5 h-3.5 text-amber-700" />
                              <span>
                                {task.durationAsIs || 'เดิม'} ➔ {task.durationToBe || 'ใหม่'} (~
                                {task.estimatedTimeSavedPercent ?? 70}% เวลา)
                              </span>
                            </div>
                          )}

                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${levelInfo.badgeColor}`}
                          >
                            Level {task.aiLevel}: {levelInfo.collaborationGroup}
                          </span>

                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                              task.skillsImpact === 'Reskill'
                                ? 'bg-purple-100 text-purple-950 border-purple-800'
                                : 'bg-blue-100 text-blue-950 border-blue-800'
                            }`}
                          >
                            {task.skillsImpact}
                          </span>

                          <div className="flex items-center border border-zinc-300 bg-white">
                            <button
                              onClick={() => handleMoveTask(index, 'up')}
                              disabled={isFirst}
                              title="เลื่อนขึ้น"
                              className={`p-1 hover:bg-zinc-100 cursor-pointer ${
                                isFirst ? 'opacity-30 cursor-not-allowed' : ''
                              }`}
                            >
                              <ArrowUp className="w-3.5 h-3.5 text-zinc-700" />
                            </button>
                            <div className="w-px h-4 bg-zinc-200" />
                            <button
                              onClick={() => handleMoveTask(index, 'down')}
                              disabled={isLast}
                              title="เลื่อนลง"
                              className={`p-1 hover:bg-zinc-100 cursor-pointer ${
                                isLast ? 'opacity-30 cursor-not-allowed' : ''
                              }`}
                            >
                              <ArrowDown className="w-3.5 h-3.5 text-zinc-700" />
                            </button>
                          </div>

                          <button
                            onClick={() => startEditTask(task)}
                            title="แก้ไข"
                            className="p-1 text-blue-700 hover:bg-blue-50 border border-blue-200 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            title="ลบ"
                            className="p-1 text-red-700 hover:bg-red-50 border border-red-200 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                          <div className="p-3 bg-[#F5F4F0] border border-[#141414]/20 space-y-1">
                            <div className="font-mono text-[10px] font-bold text-red-900 uppercase flex items-center justify-between">
                              <span>กระบวนงานเดิมที่คนเคยทำ (As-Is Process):</span>
                              {task.durationAsIs && (
                                <span className="text-[10px] text-zinc-500 font-normal">
                                  ใช้เวลา: {task.durationAsIs}
                                </span>
                              )}
                            </div>
                            <p className="text-[#141414]/85 leading-relaxed">{task.taskAsIs}</p>
                          </div>

                          <div className="p-3 bg-emerald-50 border border-emerald-800/50 space-y-1">
                            <div className="font-mono text-[10px] font-bold text-emerald-950 uppercase flex items-center justify-between">
                              <span className="flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                                กระบวนงานใหม่ร่วมกับ AI (To-Be Redesign):
                              </span>
                              {task.durationToBe && (
                                <span className="text-[10px] text-emerald-800 font-bold">
                                  เหลือ: {task.durationToBe}
                                </span>
                              )}
                            </div>
                            <p className="text-emerald-950 font-medium leading-relaxed">{task.taskToBe}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-[11px] font-mono">
                          <div className="flex items-start gap-1.5 text-zinc-700">
                            <Cpu className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-[#141414]">NIST AI Capability:</span>{' '}
                              <span>{task.aiCapability}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-1.5 text-zinc-700">
                            <ShieldAlert className="w-3.5 h-3.5 text-red-800 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-[#141414]">จุดควบคุมธรรมาภิบาล (Governance Gate):</span>{' '}
                              <span className="text-red-900 font-medium">{task.governanceControl}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* View Mode 2: Matrix Table */}
            {workflowViewMode === 'matrix' && (
              <div className="bg-white border-2 border-[#141414] p-4 space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-sans">
                    <thead>
                      <tr className="bg-[#141414] text-white font-mono text-[11px]">
                        <th className="p-2.5 border border-[#141414] w-12 text-center">ลำดับ</th>
                        <th className="p-2.5 border border-[#141414] w-28">ช่วง</th>
                        <th className="p-2.5 border border-[#141414] w-48">ชื่องานกระบวนงาน</th>
                        <th className="p-2.5 border border-[#141414] w-36">ระยะเวลา (เดิม ➔ ใหม่)</th>
                        <th className="p-2.5 border border-[#141414]">งานเดิม (As-Is)</th>
                        <th className="p-2.5 border border-[#141414] w-32">NIST Capability</th>
                        <th className="p-2.5 border border-[#141414] w-24 text-center">AI Level</th>
                        <th className="p-2.5 border border-[#141414]">งานใหม่คนร่วม AI (To-Be)</th>
                        <th className="p-2.5 border border-[#141414]">จุดกำกับธรรมาภิบาล</th>
                        <th className="p-2.5 border border-[#141414] w-20 text-center">ทักษะ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProfile.tasks.map((task, idx) => (
                        <tr key={task.id} className="border-b border-[#141414]/20 hover:bg-[#F5F4F0]/80">
                          <td className="p-2 text-center font-mono font-bold bg-[#F5F4F0] border-r border-[#141414]/20">
                            {String(task.processNumber || idx + 1).padStart(2, '0')}
                          </td>
                          <td className="p-2 font-mono text-[10px] text-zinc-700">{task.processPhase}</td>
                          <td className="p-2 font-bold text-[#141414]">{task.subProcess}</td>
                          <td className="p-2 font-mono text-[11px] text-amber-900">
                            <div>{task.durationAsIs || '-'} ➔ {task.durationToBe || '-'}</div>
                            <span className="text-[10px] text-emerald-700 font-bold">
                              ลดลง ~{task.estimatedTimeSavedPercent ?? 70}%
                            </span>
                          </td>
                          <td className="p-2 text-zinc-700 leading-snug">{task.taskAsIs}</td>
                          <td className="p-2 font-mono text-[10px] text-zinc-800">{task.aiCapability}</td>
                          <td className="p-2 text-center font-mono font-bold text-[10px]">
                            <span
                              className={`px-1.5 py-0.5 border ${
                                task.aiLevel >= 4
                                  ? 'bg-purple-100 text-purple-950 border-purple-400'
                                  : task.aiLevel >= 1
                                  ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                                  : 'bg-zinc-200 text-zinc-900 border-zinc-400'
                              }`}
                            >
                              L{task.aiLevel}
                            </span>
                          </td>
                          <td className="p-2 text-emerald-950 font-medium leading-snug bg-emerald-50/40">
                            {task.taskToBe}
                          </td>
                          <td className="p-2 text-red-950 text-[11px] leading-snug">
                            {task.governanceControl}
                          </td>
                          <td className="p-2 text-center font-mono text-[10px]">
                            <span
                              className={`px-1.5 py-0.5 border ${
                                task.skillsImpact === 'Reskill'
                                  ? 'bg-purple-100 text-purple-900 border-purple-500 font-bold'
                                  : 'bg-blue-100 text-blue-900 border-blue-400'
                              }`}
                            >
                              {task.skillsImpact}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* View Mode 3: Analytics */}
            {workflowViewMode === 'analytics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white border border-[#141414] space-y-1">
                    <div className="font-mono text-[11px] text-zinc-500 uppercase">กระบวนงานทั้งหมด</div>
                    <div className="text-2xl font-bold font-mono text-[#141414]">{totalTasks} ขั้นตอน</div>
                    <div className="text-[11px] text-zinc-600">
                      ต้นน้ำ {phaseInCount} | กลางน้ำ {phaseMidCount} | ปลายน้ำ {phaseOutCount}
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-800 space-y-1">
                    <div className="font-mono text-[11px] text-emerald-900 uppercase">Augmentation (คน+AI)</div>
                    <div className="text-2xl font-bold font-mono text-emerald-800">
                      {augmentPct}% ({augmentTasks} ขั้นตอน)
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-800 space-y-1">
                    <div className="font-mono text-[11px] text-purple-900 uppercase">Automation (AI นำ)</div>
                    <div className="text-2xl font-bold font-mono text-purple-800">
                      {autoPct}% ({autoTasks} ขั้นตอน)
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-800 space-y-1">
                    <div className="font-mono text-[11px] text-amber-900 uppercase">ประหยัดเวลาเฉลี่ย</div>
                    <div className="text-2xl font-bold font-mono text-amber-800">~{avgTimeSaved}%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Training & Operational Package (The user's requested training templates!) */}
        {activeTab === 'training_pack' && (
          <div className="space-y-6">
            <div className="p-4 bg-white border border-[#141414] shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-900 text-white flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#141414]">
                    ชุดเทมเพลตอบรม & คู่มือ SOP ปฏิบัติงานสำหรับ: {currentProfile.jobTitle}
                  </h3>
                  <p className="text-xs text-zinc-600">
                    หลักสูตรอบรม 4 สัปดาห์, คู่มือขั้นตอนการทำงานร่วมกับ AI (SOP Cheat Sheet) และใบงานเวิร์กช็อปพร้อมใช้
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyTrainingPack}
                  className="px-3.5 py-1.5 bg-[#141414] hover:bg-zinc-800 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'คัดลอกเอกสารแล้ว!' : 'คัดลอกชุดอบรมทั้งหมด'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-white hover:bg-zinc-100 border border-[#141414] font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-700" />
                  <span>พิมพ์เอกสารอบรม (PDF)</span>
                </button>
              </div>
            </div>

            {/* Section 1: 4-Week Training Curriculum */}
            <div className="bg-white border-2 border-[#141414] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-[#141414]/20 pb-3 gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase bg-purple-100 text-purple-900 border border-purple-300 px-2 py-0.5">
                    ส่วนที่ 1: แผนการอบรม (Training Curriculum)
                  </span>
                  <h4 className="font-bold font-serif italic text-base text-[#141414]">
                    {currentTrainingPlan.courseTitle}
                  </h4>
                </div>
                <span className="text-xs font-mono text-zinc-600">
                  กลุ่มเป้าหมาย: <strong>{currentTrainingPlan.targetAudience}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentTrainingPlan.modules.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F5F4F0] border border-[#141414]/30 space-y-2 flex flex-col justify-between hover:border-purple-800 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-[#141414]/15 pb-1.5">
                        <span className="font-mono font-bold text-xs text-purple-950 bg-white px-2 py-0.5 border border-zinc-300">
                          {m.week}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">โมดูล {idx + 1}/4</span>
                      </div>
                      <h5 className="font-bold text-xs text-[#141414] leading-snug">{m.title}</h5>
                      <p className="text-[11px] text-zinc-700 leading-relaxed font-sans">{m.focus}</p>
                    </div>

                    <div className="pt-2 border-t border-[#141414]/15 space-y-1 text-[10px] font-mono">
                      <div className="text-purple-900">
                        <strong>เครื่องมือ AI:</strong> {m.toolUsed}
                      </div>
                      <div className="text-emerald-800">
                        <strong>ชิ้นงานที่ต้องส่ง:</strong> {m.deliverable}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: SOP Cheat Sheet & Do's and Don'ts */}
            <div className="bg-white border-2 border-[#141414] p-5 space-y-4">
              <div className="border-b border-[#141414]/20 pb-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-950 border border-emerald-300 px-2 py-0.5">
                  ส่วนที่ 2: คู่มือปฏิบัติการแบบย่อ (SOP Cheat Sheet)
                </span>
                <h4 className="font-bold font-serif italic text-base text-[#141414] mt-1">
                  กรอบความรับผิดชอบและข้อควรระวังในการปฏิบัติงานร่วมกับ AI (Human-AI Division of Duty)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                {/* Allowed */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-400 space-y-2">
                  <span className="font-mono text-[11px] font-bold text-emerald-950 block border-b border-emerald-300 pb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    หน้าที่ที่ AI ทำได้ (AI Scope)
                  </span>
                  <ul className="space-y-1.5 text-zinc-800 text-[11px] list-disc list-inside">
                    {currentSOPCheatSheet.aiResponsibilities.map((r, i) => (
                      <li key={i} className="leading-snug">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Human Responsibility */}
                <div className="p-3.5 bg-blue-50/70 border border-blue-400 space-y-2">
                  <span className="font-mono text-[11px] font-bold text-blue-950 block border-b border-blue-300 pb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-700" />
                    หน้าที่ของมนุษย์ (Human Oversight)
                  </span>
                  <ul className="space-y-1.5 text-zinc-800 text-[11px] list-disc list-inside">
                    {currentSOPCheatSheet.humanResponsibilities.map((r, i) => (
                      <li key={i} className="leading-snug font-medium">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prohibited */}
                <div className="p-3.5 bg-red-50/70 border border-red-400 space-y-2">
                  <span className="font-mono text-[11px] font-bold text-red-950 block border-b border-red-300 pb-1 flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5 text-red-700" />
                    ข้อห้ามเด็ดขาด (Strictly Prohibited)
                  </span>
                  <ul className="space-y-1.5 text-red-950 text-[11px] list-disc list-inside">
                    {currentSOPCheatSheet.prohibitedActions.map((r, i) => (
                      <li key={i} className="leading-snug">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Checklist */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-400 space-y-2">
                  <span className="font-mono text-[11px] font-bold text-amber-950 block border-b border-amber-300 pb-1 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-amber-800" />
                    เช็คลิสต์ก่อนลงนามอนุมัติ
                  </span>
                  <ul className="space-y-1.5 text-zinc-800 text-[11px] list-none">
                    {currentSOPCheatSheet.checklistBeforeApproval.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-snug">
                        <input type="checkbox" defaultChecked className="mt-0.5 cursor-pointer shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Workshop Worksheet Template */}
            <div className="bg-white border-2 border-[#141414] p-5 space-y-4">
              <div className="border-b border-[#141414]/20 pb-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-950 border border-blue-300 px-2 py-0.5">
                  ส่วนที่ 3: ใบงานฝึกปฏิบัติเชิงปฏิบัติการ (Workshop Worksheet Template)
                </span>
                <h4 className="font-bold font-serif italic text-base text-[#141414] mt-1">
                  คลังคำสั่ง Prompt Template ตัวอย่างพร้อมใช้ประจำกระบวนงาน
                </h4>
              </div>

              <div className="space-y-4">
                {currentWorkshopWorksheet.promptExercises.map((ex, idx) => (
                  <div key={idx} className="p-4 bg-[#F5F4F0] border border-[#141414]/30 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-xs">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-xs text-[#141414]">{ex.processStep}</span>
                      </div>
                      <button
                        onClick={() => copyPromptTemplate(ex.examplePromptTemplate)}
                        className="px-2.5 py-1 bg-white hover:bg-zinc-100 border border-[#141414] font-mono text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3 text-zinc-700" />
                        <span>คัดลอก Prompt นี้</span>
                      </button>
                    </div>

                    <p className="text-xs text-zinc-700 font-sans">{ex.taskDescription}</p>

                    <div className="p-3 bg-zinc-900 text-zinc-100 font-mono text-[11px] space-y-1 border border-zinc-700 whitespace-pre-wrap rounded-none">
                      {ex.examplePromptTemplate}
                    </div>

                    <div className="text-[11px] font-mono text-red-900 bg-red-50 p-2 border border-red-200">
                      <strong>จุดตรวจทานของมนุษย์ (Human Fact-check):</strong> {ex.humanReviewChecklist}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Levels, Tab 4: Capabilities, Tab 5: Skills, Tab 6: Executive 2569 */}
        {activeTab === 'levels' && (
          <div className="space-y-6">
            <div className="border-b-2 border-[#141414] pb-1 flex items-center justify-between font-mono">
              <span className="text-xs font-bold uppercase tracking-wider text-[#141414]">
                ระดับการใช้ AI สำหรับการออกแบบกระบวนงาน (AI Level for Job Redesign - สพธอ. ETDA)
              </span>
              <span className="text-xs text-amber-800 font-bold">แบ่งออกเป็น 6 ระดับ (Level 0 ถึง Level 5)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiLevelsTable.map((lvl) => (
                <div
                  key={lvl.level}
                  className="p-4 bg-white border border-[#141414] space-y-3 relative hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                    <span className="text-xl font-mono font-bold text-[#141414]">Level {lvl.level}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${lvl.badgeColor}`}
                    >
                      {lvl.collaborationGroup}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif italic font-bold text-sm text-[#141414]">{lvl.name_th}</h3>
                    <div className="text-[11px] font-mono text-[#141414]/60 font-medium">{lvl.name_en}</div>
                  </div>

                  <p className="text-xs text-[#141414]/80 leading-relaxed font-sans">{lvl.description}</p>

                  <div className="p-2.5 bg-[#F5F4F0] border border-[#141414]/20 space-y-1 text-xs">
                    <span className="font-mono text-[10px] font-bold text-amber-900 block">
                      ความรับผิดชอบของผู้ปฏิบัติงาน (Human Duty):
                    </span>
                    <p className="text-[#141414] font-medium">{lvl.humanResponsibility}</p>
                  </div>

                  <div className="text-[11px] text-[#141414]/70 leading-normal font-sans">
                    <strong>เหตุผล:</strong> {lvl.reasoning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'capabilities' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#141414] pb-2">
              <span className="text-xs font-bold uppercase tracking-wider font-mono text-[#141414]">
                หมวดหมู่ความสามารถ AI 16 ประเภท (NIST AI Use Taxonomy อ้างอิง สพธอ. ETDA)
              </span>

              <div className="flex items-center gap-1 bg-white p-1 border border-[#141414] text-[11px] font-mono font-bold">
                {['ALL', 'Creation & Analysis', 'Automation & Decision', 'Perception & Assistance'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCapCategoryFilter(cat)}
                    className={`px-2.5 py-1 cursor-pointer ${
                      capCategoryFilter === cat ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCapabilities.map((cap) => (
                <div
                  key={cap.id}
                  className="bg-white border border-[#141414] p-4 space-y-2.5 relative flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold font-serif italic text-amber-900">{cap.name_th}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 border border-zinc-300 font-bold">
                        {cap.category}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#141414]/60 font-medium">{cap.name_en}</div>
                    <p className="text-xs text-[#141414]/80 leading-relaxed font-sans">{cap.description}</p>
                  </div>

                  <div className="pt-2 border-t border-[#141414]/15 space-y-1 font-mono text-[10px]">
                    <div className="text-emerald-800 font-bold">ตัวอย่างการใช้งาน:</div>
                    <div className="text-zinc-700 font-sans">{cap.example_use}</div>
                    <div className="text-amber-800 font-bold pt-1">ผลลัพธ์ที่ได้:</div>
                    <div className="text-zinc-700 font-sans">{cap.example_output}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="border-b-2 border-[#141414] pb-1 font-mono text-xs font-bold uppercase tracking-wider text-[#141414]">
              กรอบการพัฒนาทักษะปัญญาประดิษฐ์ (AI Skills Framework: Upskill vs Reskill)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border-2 border-blue-800 text-blue-950 space-y-2">
                <span className="font-mono text-xs font-bold uppercase flex items-center gap-1.5 text-blue-900">
                  <TrendingUp className="w-4 h-4 text-blue-800" />
                  การเพิ่มพูนทักษะ (Upskill)
                </span>
                <p className="text-xs leading-relaxed font-sans">
                  การพัฒนาและเพิ่มพูนทักษะของบุคลากรใน <strong>สายงานหรือบทบาทเดิม</strong> เพื่อให้สามารถปฏิบัติงานได้เร็วขึ้น ละเอียดขึ้น หรือใช้เครื่องมือ AI ช่วยทุ่นแรง โดยยังคงอยู่ในเส้นทางอาชีพเดิม
                </p>
              </div>

              <div className="p-4 bg-purple-50 border-2 border-purple-800 text-purple-950 space-y-2">
                <span className="font-mono text-xs font-bold uppercase flex items-center gap-1.5 text-purple-900">
                  <Sparkles className="w-4 h-4 text-purple-800" />
                  การเรียนรู้ทักษะใหม่ (Reskill)
                </span>
                <p className="text-xs leading-relaxed font-sans">
                  การเรียนรู้และพัฒนา <strong>ทักษะชุดใหม่ที่แตกต่างจากเดิมอย่างมีนัยสำคัญ</strong> เพื่อเปลี่ยนไปปฏิบัติงานในบทบาทใหม่ตามโครงสร้างงานที่ AI เข้ามาแทนที่ เช่น ผู้กำกับธรรมาภิบาลข้อมูล AI
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'executive2569' && (
          <div className="space-y-6">
            <div className="border-b-2 border-[#141414] pb-1 font-mono text-xs font-bold uppercase tracking-wider text-[#141414] flex items-center justify-between">
              <span>แนวทางการประยุกต์ใช้ปัญญาประดิษฐ์อย่างมีธรรมาภิบาลสำหรับผู้บริหาร (ฉบับปรับปรุง 2569)</span>
              <span className="text-xs text-amber-800 font-bold">3 องค์ประกอบหลัก (3 Pillars)</span>
            </div>

            <div className="space-y-5">
              {etdaExecutivePillars2569.map((p) => (
                <div key={p.pillarNum} className="p-5 bg-white border border-[#141414] space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#141414]/20 pb-2">
                    <span className="w-8 h-8 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-sm">
                      {p.pillarNum}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold font-serif italic text-[#141414]">{p.pillar}</h3>
                      <div className="text-[10px] font-mono text-amber-800 font-bold">{p.standardsMapping}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-3 bg-[#F5F4F0] border border-[#141414]/20 space-y-2">
                      <span className="font-mono text-[11px] font-bold text-amber-900 block uppercase">
                        สาระสำคัญตามคู่มือ (Key Framework Concepts):
                      </span>
                      <ul className="space-y-1.5 list-disc list-inside text-zinc-800">
                        {p.keyConcepts.map((k, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {k}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-emerald-50 border border-emerald-800/40 space-y-2">
                      <span className="font-mono text-[11px] font-bold text-emerald-950 block uppercase">
                        ผลลัพธ์และเอกสารที่ต้องจัดทำจริง (Operational Deliverables):
                      </span>
                      <ul className="space-y-1.5 list-disc list-inside text-emerald-950">
                        {p.operationalDeliverables.map((o, idx) => (
                          <li key={idx} className="leading-relaxed font-medium">
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: THE USER'S REQUESTED AI PROCESS INTAKE & LEAN STUDIO */}
      {isAILanModalOpen && (
        <div className="fixed inset-0 bg-black/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#E4E3E0] border-2 border-[#141414] max-w-3xl w-full p-6 space-y-4 shadow-2xl text-[#141414] max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#141414] pb-2">
              <div className="flex items-center gap-2 font-mono font-bold text-sm">
                <Sparkles className="w-5 h-5 text-purple-700 animate-pulse" />
                <span>AI Process Intake & Lean Redesign Studio (สร้าง Job และ List กระบวนงาน)</span>
              </div>
              <button
                onClick={() => !isAnalyzingLean && setIsAILanModalOpen(false)}
                className="text-zinc-600 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-700 leading-relaxed">
              ไม่ต้องเพิ่มทีละภาระงาน! เพียงกรอกข้อมูลตำแหน่งงาน และวางรายการกระบวนงานเดิมทั้งหมดที่คนทำอยู่ จากนั้นให้ <strong>Gemini AI</strong> ช่วยวิเคราะห์ความสูญเปล่า (Lean Waste), ออกแบบกระบวนการทำงานใหม่ร่วมกับ AI, และจัดทำชุดเทมเพลตอบรมบุคลากรให้อัตโนมัติ:
            </p>

            <div className="space-y-4 text-xs font-sans">
              {/* Step 1: Role Details */}
              <div className="p-3.5 bg-white border border-[#141414] space-y-3">
                <div className="font-mono font-bold text-xs text-[#141414] border-b border-zinc-200 pb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px]">1</span>
                  <span>ข้อมูลตำแหน่งงาน & ชื่องานหลัก (Job Profile)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono font-bold mb-1">ชื่อตำแหน่งงาน * :</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น เจ้าหน้าที่จัดซื้อ, นักบัญชี"
                      value={aiJobTitle}
                      onChange={(e) => setAiJobTitle(e.target.value)}
                      className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold mb-1">ฝ่าย / สังกัด :</label>
                    <input
                      type="text"
                      placeholder="เช่น ฝ่ายจัดซื้อและคลังสินค้า"
                      value={aiDepartment}
                      onChange={(e) => setAiDepartment(e.target.value)}
                      className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold mb-1">ระดับตำแหน่ง :</label>
                    <select
                      value={aiJobLevel}
                      onChange={(e) => setAiJobLevel(e.target.value as any)}
                      className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs cursor-pointer font-bold"
                    >
                      <option value="Entry Level">ระดับต้น (Entry Level)</option>
                      <option value="Mid-Level">ระดับกลาง (Mid-Level)</option>
                      <option value="Managerial Level">ระดับบริหาร (Managerial Level)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono font-bold mb-1">ชื่อกระบวนงานหลัก (Main Workflow Name):</label>
                  <input
                    type="text"
                    placeholder="เช่น กระบวนงานจัดซื้อจัดจ้างและตรวจรับพัสดุครบวงจร"
                    value={aiProcessName}
                    onChange={(e) => setAiProcessName(e.target.value)}
                    className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs"
                  />
                </div>
              </div>

              {/* Step 2: List of Current Processes */}
              <div className="p-3.5 bg-white border border-[#141414] space-y-3">
                <div className="flex flex-wrap items-center justify-between border-b border-zinc-200 pb-1 gap-2">
                  <div className="font-mono font-bold text-xs text-[#141414] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px]">2</span>
                    <span>ระบุรายการกระบวนงานเดิมทั้งหมดที่ทำอยู่ (Current Process List)</span>
                  </div>

                  {/* Pre-fill Quick Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                    <span className="text-zinc-500 font-bold">ตัวอย่างด่วน:</span>
                    <button
                      type="button"
                      onClick={() => prefillSampleProcesses('saraban')}
                      className="px-2 py-0.5 bg-blue-900 hover:bg-blue-950 text-white border border-blue-950 font-bold cursor-pointer"
                    >
                      ★ งานสารบรรณออกเลข (รูป ETDA)
                    </button>
                    <button
                      type="button"
                      onClick={() => prefillSampleProcesses('procurement')}
                      className="px-2 py-0.5 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 font-bold cursor-pointer"
                    >
                      งานจัดซื้อ (10 ขั้น)
                    </button>
                    <button
                      type="button"
                      onClick={() => prefillSampleProcesses('hr')}
                      className="px-2 py-0.5 bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 font-bold cursor-pointer"
                    >
                      งาน HR (10 ขั้น)
                    </button>
                    <button
                      type="button"
                      onClick={() => prefillSampleProcesses('cs')}
                      className="px-2 py-0.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-bold cursor-pointer"
                    >
                      งานบริการลูกค้า (7 ขั้น)
                    </button>
                    <button
                      type="button"
                      onClick={() => prefillSampleProcesses('accounting')}
                      className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold cursor-pointer"
                    >
                      งานบัญชี (7 ขั้น)
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500">
                  พิมพ์หรือวางข้อความขั้นตอนการทำงานทีละบรรทัด (เช่น ขั้นตอนที่ 1 ถึง 10 หรือมากกว่านั้น) ที่คนทำงานจริงทำอยู่เดิม:
                </p>

                <textarea
                  rows={8}
                  placeholder={`1. รับแบบฟอร์มเอกสารทางอีเมลหรือกระดาษ\n2. เปิดอ่านและตรวจสอบความถูกต้องด้วยสายตา\n3. คีย์ตัวเลขลงในระบบ Excel หรือ ERP\n4. ตรวจสอบประวัติหรือข้อมูลคู่ค้าจากเว็บราชการ\n5. ส่งต่อให้หัวหน้างานพิจารณาและรออนุมัติ\n...`}
                  value={rawProcessInput}
                  onChange={(e) => setRawProcessInput(e.target.value)}
                  className="w-full p-3 border border-[#141414] bg-[#F5F4F0] font-mono text-xs leading-relaxed focus:bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#141414]/20">
                <div className="text-[11px] text-purple-950 font-mono">
                  ✨ Gemini 3.6 Flash จะวิเคราะห์ Lean Wastes + 16 NIST Capabilities + สร้างแผนอบรม 4 สัปดาห์
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isAnalyzingLean}
                    onClick={() => setIsAILanModalOpen(false)}
                    className="px-4 py-2 border border-[#141414] bg-white text-xs font-mono font-bold hover:bg-zinc-100 cursor-pointer"
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="button"
                    disabled={isAnalyzingLean}
                    onClick={handleExecuteAILanAnalysis}
                    className="px-5 py-2 bg-linear-to-r from-purple-900 to-indigo-900 hover:from-purple-950 hover:to-indigo-950 text-white font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isAnalyzingLean ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                        <span>AI กำลังวิเคราะห์ & Lean Process...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>วิเคราะห์ & Lean กระบวนงานด้วย AI ทันที</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: 10-STEP WORKFLOW TEMPLATE PICKER */}
      {is10StepModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#E4E3E0] border-2 border-[#141414] max-w-3xl w-full p-6 space-y-4 shadow-2xl text-[#141414] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#141414] pb-2">
              <div className="flex items-center gap-2 font-mono font-bold text-sm">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>โหลดชุดแม่แบบ 10 กระบวนงานมาตรฐาน (Standard 10-Step Workflow Templates)</span>
              </div>
              <button
                onClick={() => setIs10StepModalOpen(false)}
                className="text-zinc-600 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-700">
              เลือกชุดกระบวนงาน 10 ขั้นตอนที่ออกแบบตามแนวทาง ETDA/AIGC เพื่อนำมาใช้กับตำแหน่งปัจจุบัน (
              <strong>{currentProfile.jobTitle}</strong>) โดยระบบจะเขียนผังกระบวนงานตั้งแต่ต้นน้ำจนถึงปลายน้ำให้ครบถ้วน:
            </p>

            <div className="space-y-3">
              {standard10StepWorkflowTemplates.map((wf) => (
                <div
                  key={wf.templateId}
                  className="p-4 bg-white border border-[#141414] hover:border-amber-800 hover:shadow-md transition-all space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-300 font-bold">
                        {wf.department}
                      </span>
                      <h4 className="font-bold text-sm text-[#141414] mt-1">{wf.templateName}</h4>
                    </div>

                    <button
                      onClick={() => {
                        const newTasks: TaskWorkflowItem[] = wf.tasks.map((t, idx) => ({
                          ...t,
                          id: `TASK-10WF-${Date.now().toString().slice(-4)}-${idx + 1}`,
                          processNumber: idx + 1,
                          jobPosition: currentProfile.jobTitle,
                        }));
                        const updatedProfile: JobRedesignProfile = {
                          ...currentProfile,
                          processName: wf.templateName,
                          tasks: newTasks,
                          currentTasksCount: newTasks.length,
                        };
                        setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)));
                        setIs10StepModalOpen(false);
                        showToast(`นำเข้าชุด "${wf.templateName}" สำเร็จ!`);
                      }}
                      className="px-3.5 py-1.5 bg-[#141414] hover:bg-amber-800 text-white font-mono text-xs font-bold cursor-pointer"
                    >
                      นำเข้าทั้ง 10 กระบวนงานนี้
                    </button>
                  </div>

                  <p className="text-xs text-zinc-600 font-sans">{wf.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-[#141414]/20">
              <button
                onClick={() => setIs10StepModalOpen(false)}
                className="px-4 py-1.5 border border-[#141414] bg-white text-xs font-mono font-bold hover:bg-zinc-100 cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: REGULAR ADD POSITION */}
      {isAddPositionModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#E4E3E0] border-2 border-[#141414] max-w-2xl w-full p-6 space-y-4 shadow-2xl text-[#141414] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#141414] pb-2">
              <div className="flex items-center gap-2 font-mono font-bold text-sm">
                <Briefcase className="w-4 h-4 text-amber-800" />
                <span>เพิ่มตำแหน่งงานใหม่เพื่อออกแบบกระบวนงานร่วมกับ AI</span>
              </div>
              <button
                onClick={() => setIsAddPositionModalOpen(false)}
                className="text-zinc-600 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 border-b border-[#141414]/20 pb-2">
              <button
                type="button"
                onClick={() => setPositionAddMode('template')}
                className={`px-3 py-1.5 text-xs font-mono font-bold cursor-pointer border ${
                  positionAddMode === 'template'
                    ? 'bg-[#141414] text-white border-[#141414]'
                    : 'bg-white hover:bg-zinc-100 border-zinc-400'
                }`}
              >
                1. เลือกจากแม่แบบสำเร็จรูป (Quick Templates)
              </button>
              <button
                type="button"
                onClick={() => setPositionAddMode('custom')}
                className={`px-3 py-1.5 text-xs font-mono font-bold cursor-pointer border ${
                  positionAddMode === 'custom'
                    ? 'bg-[#141414] text-white border-[#141414]'
                    : 'bg-white hover:bg-zinc-100 border-zinc-400'
                }`}
              >
                2. กรอกตำแหน่งงานเองตั้งแต่ต้น (Custom Role)
              </button>
            </div>

            {positionAddMode === 'template' && (
              <div className="space-y-3">
                <p className="text-xs text-zinc-700">
                  เลือกตำแหน่งงานอ้างอิงตามกรอบงาน ETDA / OECD ระบบจะเตรียมกระบวนงานและชุดทักษะเริ่มต้นให้ทันที:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                  {jobRolePresetTemplates.map((tpl) => (
                    <div
                      key={tpl.templateId}
                      className="p-3.5 bg-white border border-[#141414] hover:border-amber-800 hover:shadow-md transition-all space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                          <span>{tpl.category}</span>
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                            {tpl.suggestedLevel}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-[#141414] mt-1">{tpl.jobTitle}</h4>
                        <p className="text-[11px] text-zinc-600 line-clamp-2 mt-1 font-sans">{tpl.newObjective}</p>
                      </div>

                      <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-800 font-bold">
                          {tpl.suggestedTasks.length} ขั้นตอนกระบวนงาน
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newId = `JOB-${Date.now().toString().slice(-4)}`;
                            const createdTasks: TaskWorkflowItem[] = tpl.suggestedTasks.map((st, idx) => ({
                              ...st,
                              id: `TASK-${Date.now().toString().slice(-4)}-${idx + 1}`,
                              processNumber: idx + 1,
                              processPhase:
                                idx < 3
                                  ? 'ต้นน้ำ (Input & Intake)'
                                  : idx < 7
                                  ? 'กลางน้ำ (Processing & Analysis)'
                                  : 'ปลายน้ำ (Review, Decision & Delivery)',
                              durationAsIs: '1-2 วัน',
                              durationToBe: '30 นาที',
                              jobPosition: tpl.jobTitle,
                            }));
                            const newProfile: JobRedesignProfile = {
                              id: newId,
                              jobTitle: tpl.jobTitle,
                              department: tpl.department,
                              executiveOwner: 'ผู้บริหารสายงานกำกับดูแล',
                              jobLevel: tpl.suggestedLevel,
                              processName: `กระบวนงานหลักสำหรับตำแหน่ง ${tpl.jobTitle}`,
                              originalObjective: tpl.originalObjective,
                              newObjective: tpl.newObjective,
                              currentTasksCount: createdTasks.length,
                              tasks: createdTasks,
                              competencies: tpl.competencies,
                            };
                            setProfiles([newProfile, ...profiles]);
                            setSelectedProfileId(newProfile.id);
                            setIsAddPositionModalOpen(false);
                            showToast(`เพิ่มตำแหน่งจากแม่แบบ "${tpl.jobTitle}" สำเร็จ!`);
                          }}
                          className="px-2.5 py-1 bg-[#141414] hover:bg-amber-800 text-white text-[11px] font-mono font-bold cursor-pointer"
                        >
                          ใช้แม่แบบนี้
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {positionAddMode === 'custom' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newRoleTitle.trim()) return;
                  const newId = `JOB-CUSTOM-${Date.now().toString().slice(-4)}`;
                  const newProfile: JobRedesignProfile = {
                    id: newId,
                    jobTitle: newRoleTitle.trim(),
                    department: newRoleDept.trim() || 'ฝ่ายปฏิบัติการและเทคโนโลยี',
                    executiveOwner: newRoleExecutive.trim() || 'ผู้บริหารสายงานกำกับดูแล',
                    jobLevel: newRoleLevel,
                    processName: newRoleProcessName.trim() || `กระบวนงานครบวงจร: ${newRoleTitle.trim()}`,
                    originalObjective: newRoleOriginalObj.trim() || 'รับผิดชอบการปฏิบัติงานตามขั้นตอนเดิมขององค์กร',
                    newObjective: newRoleNewObj.trim() || 'ยกระดับการทำงานร่วมกับระบบปัญญาประดิษฐ์',
                    currentTasksCount: 0,
                    tasks: [],
                    competencies: {
                      technical: ['การเขียนคำสั่ง Prompt ให้ AI ทำงาน', 'การตรวจสอบความถูกต้องของ AI Output'],
                      responsibleEthics: ['การปฏิบัติตามมาตรฐานจริยธรรม AI และ PDPA', 'การจัดให้มี Human Oversight'],
                      nonTechnical: ['การคิดวิเคราะห์เชิงวิพากษ์', 'การตัดสินใจในเคสซับซ้อน'],
                    },
                  };
                  setProfiles([newProfile, ...profiles]);
                  setSelectedProfileId(newProfile.id);
                  setIsAddPositionModalOpen(false);
                  showToast(`เพิ่มตำแหน่งใหม่ "${newProfile.jobTitle}" สำเร็จ!`);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-mono font-bold mb-1">ชื่อตำแหน่งงาน * :</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น เจ้าหน้าที่ตรวจสอบคุณภาพสินค้า"
                    value={newRoleTitle}
                    onChange={(e) => setNewRoleTitle(e.target.value)}
                    className="w-full p-2 border border-[#141414] bg-white text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono font-bold mb-1">ฝ่าย/สังกัด:</label>
                    <input
                      type="text"
                      placeholder="เช่น ฝ่ายควบคุมคุณภาพ"
                      value={newRoleDept}
                      onChange={(e) => setNewRoleDept(e.target.value)}
                      className="w-full p-2 border border-[#141414] bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-mono font-bold mb-1">ผู้บริหารผู้รับผิดชอบ:</label>
                    <input
                      type="text"
                      placeholder="เช่น นายธนา สิทธิเดช"
                      value={newRoleExecutive}
                      onChange={(e) => setNewRoleExecutive(e.target.value)}
                      className="w-full p-2 border border-[#141414] bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-mono font-bold mb-1">ระดับตำแหน่ง:</label>
                    <select
                      value={newRoleLevel}
                      onChange={(e) => setNewRoleLevel(e.target.value as any)}
                      className="w-full p-2 border border-[#141414] bg-white text-xs cursor-pointer font-bold"
                    >
                      <option value="Entry Level">ระดับต้น (Entry Level)</option>
                      <option value="Mid-Level">ระดับกลาง (Mid-Level)</option>
                      <option value="Managerial Level">ระดับบริหาร (Managerial Level)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#141414]/20">
                  <button
                    type="button"
                    onClick={() => setIsAddPositionModalOpen(false)}
                    className="px-3 py-1.5 border border-[#141414] bg-white text-xs font-mono font-bold hover:bg-zinc-100"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#141414] text-white text-xs font-mono font-bold hover:bg-zinc-800"
                  >
                    บันทึกตำแหน่งงาน
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: HUMAN REVIEW & EDIT TO-BE STEPS (ให้คนตรวจหรือแก้) */}
      {isEditAllTasksModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#E4E3E0] border-2 border-[#141414] max-w-4xl w-full p-6 space-y-4 shadow-2xl text-[#141414] max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#141414] pb-2">
              <div className="flex items-center gap-2 font-mono font-bold text-sm">
                <Edit3 className="w-5 h-5 text-amber-800" />
                <span>ตรวจทานและแก้ไขกระบวนการ To-Be โดยมนุษย์ (Human Review & Edit)</span>
              </div>
              <button
                onClick={() => setIsEditAllTasksModalOpen(false)}
                className="text-zinc-600 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-700 leading-relaxed font-sans">
              ท่านสามารถปรับแก้รายละเอียดขั้นตอนที่ AI วิเคราะห์และแนะนำ ปรับเพิ่ม/ลดขั้นตอน แก้ไขบทบาทหน้าที่ของคนและ AI หรือแก้ไขจุดตรวจทานความถูกต้อง (Governance Gate) ได้อย่างอิสระ:
            </p>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {editingTasksList.map((task, idx) => (
                <div key={task.id || idx} className="bg-white border-2 border-[#141414] p-4 space-y-3 rounded-xs shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span className="font-mono font-bold text-xs text-[#141414]">ขั้นตอนที่ {idx + 1}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const updated = [...editingTasksList];
                          const temp = updated[idx];
                          updated[idx] = updated[idx - 1];
                          updated[idx - 1] = temp;
                          setEditingTasksList(updated);
                        }}
                        className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 disabled:opacity-30 cursor-pointer"
                        title="เลื่อนขึ้น"
                      >
                        ▲ ขึ้น
                      </button>
                      <button
                        type="button"
                        disabled={idx === editingTasksList.length - 1}
                        onClick={() => {
                          const updated = [...editingTasksList];
                          const temp = updated[idx];
                          updated[idx] = updated[idx + 1];
                          updated[idx + 1] = temp;
                          setEditingTasksList(updated);
                        }}
                        className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 disabled:opacity-30 cursor-pointer"
                        title="เลื่อนลง"
                      >
                        ▼ ลง
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingTasksList.length <= 1) {
                            alert('ต้องมีอย่างน้อย 1 ขั้นตอน');
                            return;
                          }
                          setEditingTasksList(editingTasksList.filter((_, i) => i !== idx));
                        }}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 cursor-pointer"
                        title="ลบขั้นตอนนี้"
                      >
                        ✕ ลบ
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                    <div className="md:col-span-8">
                      <label className="block font-mono font-bold text-[11px] mb-1">ชื่อขั้นตอนกระบวนงาน * :</label>
                      <input
                        type="text"
                        value={task.subProcess}
                        onChange={(e) => {
                          const updated = [...editingTasksList];
                          updated[idx].subProcess = e.target.value;
                          setEditingTasksList(updated);
                        }}
                        className="w-full p-2 border border-[#141414] bg-[#F5F4F0] font-bold text-xs"
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label className="block font-mono font-bold text-[11px] mb-1">ช่วงกระบวนงาน (Phase):</label>
                      <select
                        value={task.processPhase || 'ต้นน้ำ (Input & Intake)'}
                        onChange={(e) => {
                          const updated = [...editingTasksList];
                          updated[idx].processPhase = e.target.value as any;
                          setEditingTasksList(updated);
                        }}
                        className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs cursor-pointer font-bold"
                      >
                        <option value="ต้นน้ำ (Input & Intake)">ต้นน้ำ (Input & Intake)</option>
                        <option value="กลางน้ำ (Processing & Analysis)">กลางน้ำ (Processing & Analysis)</option>
                        <option value="ปลายน้ำ (Review, Decision & Delivery)">ปลายน้ำ (Review, Decision & Delivery)</option>
                      </select>
                    </div>

                    <div className="md:col-span-6">
                      <label className="block font-mono font-bold text-[11px] mb-1 text-red-900">ภาระงานเดิมที่ทำด้วยมือ (As-Is):</label>
                      <textarea
                        rows={2}
                        value={task.taskAsIs}
                        onChange={(e) => {
                          const updated = [...editingTasksList];
                          updated[idx].taskAsIs = e.target.value;
                          setEditingTasksList(updated);
                        }}
                        className="w-full p-2 border border-red-300 bg-red-50/40 text-xs font-sans"
                      />
                    </div>

                    <div className="md:col-span-6">
                      <label className="block font-mono font-bold text-[11px] mb-1 text-emerald-900">กระบวนงานใหม่ร่วมกับ AI (To-Be):</label>
                      <textarea
                        rows={2}
                        value={task.taskToBe}
                        onChange={(e) => {
                          const updated = [...editingTasksList];
                          updated[idx].taskToBe = e.target.value;
                          setEditingTasksList(updated);
                        }}
                        className="w-full p-2 border border-emerald-400 bg-emerald-50/40 text-xs font-sans font-medium"
                      />
                    </div>

                    <div className="md:col-span-6">
                      <label className="block font-mono font-bold text-[11px] mb-1">ความสามารถ AI (16 NIST Capabilities):</label>
                      <select
                        value={task.aiCapability}
                        onChange={(e) => {
                          const updated = [...editingTasksList];
                          updated[idx].aiCapability = e.target.value;
                          setEditingTasksList(updated);
                        }}
                        className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs cursor-pointer"
                      >
                        {nist16AICapabilities.map((c) => (
                          <option key={c.id} value={c.name_th}>
                            {c.name_th} ({c.name_en})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block font-mono font-bold text-[11px] mb-1">ระดับ AI Level (0-5):</label>
                      <select
                        value={task.aiLevel}
                        onChange={(e) => {
                          const updated = [...editingTasksList];
                          updated[idx].aiLevel = Number(e.target.value);
                          setEditingTasksList(updated);
                        }}
                        className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs cursor-pointer font-bold"
                      >
                        <option value={0}>Level 0 (Human Only)</option>
                        <option value={1}>Level 1 (Basic Assistance)</option>
                        <option value={2}>Level 2 (Augmentation)</option>
                        <option value={3}>Level 3 (Co-pilot Partner)</option>
                        <option value={4}>Level 4 (High Automation)</option>
                        <option value={5}>Level 5 (Full Automation)</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block font-mono font-bold text-[11px] mb-1">เวลา To-Be (ใหม่):</label>
                      <input
                        type="text"
                        value={task.durationToBe || '15 นาที'}
                        onChange={(e) => {
                          const updated = [...editingTasksList];
                          updated[idx].durationToBe = e.target.value;
                          setEditingTasksList(updated);
                        }}
                        className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs font-bold font-mono"
                      />
                    </div>

                    <div className="md:col-span-12">
                      <label className="block font-mono font-bold text-[11px] mb-1 text-purple-900">
                        จุดกำกับดูแลโดยมนุษย์ & ธรรมาภิบาล (Human Sign-off & Governance Gate):
                      </label>
                      <input
                        type="text"
                        value={task.governanceControl}
                        onChange={(e) => {
                          const updated = [...editingTasksList];
                          updated[idx].governanceControl = e.target.value;
                          setEditingTasksList(updated);
                        }}
                        placeholder="เช่น ผู้บริหารตรวจทานและลงนามดิจิทัล / ตรวจสอบความถูกต้องของเลขทะเบียน"
                        className="w-full p-2 border border-purple-300 bg-purple-50/40 text-xs font-sans"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#141414]/20">
              <button
                type="button"
                onClick={() => {
                  const newStepNum = editingTasksList.length + 1;
                  const newTask: TaskWorkflowItem = {
                    id: `TASK-MANUAL-${Date.now().toString().slice(-4)}`,
                    processNumber: newStepNum,
                    processPhase: 'กลางน้ำ (Processing & Analysis)',
                    subProcess: `${newStepNum}. ขั้นตอนใหม่`,
                    jobPosition: currentProfile.jobTitle,
                    taskAsIs: 'ขั้นตอนเดิมที่ทำด้วยมือ',
                    leanWasteEliminated: 'ลดเวลาการคีย์ข้อมูลและการรอคอย',
                    aiCapability: nist16AICapabilities[0].name_th,
                    aiLevel: 2,
                    collaborationType: 'Augmentation',
                    taskToBe: 'AI ช่วยประมวลผล / มนุษย์ตรวจสอบยืนยันผล',
                    governanceControl: 'ตรวจทานความถูกต้องก่อนลงนามอนุมัติ (Human Sign-off)',
                    skillsImpact: 'Upskill',
                    durationAsIs: '1 วัน',
                    durationToBe: '20 นาที',
                    estimatedTimeSavedPercent: 80,
                  };
                  setEditingTasksList([...editingTasksList, newTask]);
                }}
                className="px-3.5 py-1.5 bg-white hover:bg-zinc-100 border border-[#141414] font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ เพิ่มขั้นตอนใหม่</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditAllTasksModalOpen(false)}
                  className="px-4 py-1.5 bg-white hover:bg-zinc-100 border border-[#141414] font-mono text-xs font-bold cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const reindexed = editingTasksList.map((t, i) => ({
                      ...t,
                      processNumber: i + 1,
                    }));
                    const updatedProfile = {
                      ...currentProfile,
                      tasks: reindexed,
                      currentTasksCount: reindexed.length,
                    };
                    const updatedProfiles = profiles.map((p) =>
                      p.id === updatedProfile.id ? updatedProfile : p
                    );
                    setProfiles(updatedProfiles);
                    setIsEditAllTasksModalOpen(false);
                    showToast('🎉 บันทึกการแก้ไขกระบวนการ To-Be เรียบร้อยแล้ว!');
                  }}
                  className="px-5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>บันทึกการเปลี่ยนแปลง (Save Changes)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: AI AGENT PROMPT GENERATOR & DIRECT LAUNCHER (Vertex AI Agent Studio & Google AI Studio) */}
      {isAIStudioModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#E4E3E0] border-2 border-[#141414] max-w-4xl w-full p-6 space-y-4 shadow-2xl text-[#141414] max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#141414] pb-2">
              <div className="flex items-center gap-2 font-mono font-bold text-sm text-blue-950">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                <span>AI Agent Instructions & System Prompt Generator</span>
              </div>
              <button
                onClick={() => setIsAIStudioModalOpen(false)}
                className="text-zinc-600 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Platform Selector Tabs */}
            <div className="flex items-center gap-2 border-b-2 border-[#141414] pb-1 font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => setPromptTargetPlatform('vertex_multimodal')}
                className={`px-3 py-1.5 cursor-pointer flex items-center gap-1.5 border border-[#141414] transition-colors ${
                  promptTargetPlatform === 'vertex_multimodal'
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'bg-white hover:bg-zinc-100 text-blue-950'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>1. Google Cloud Vertex AI Agent Platform (Multimodal gemini-4-argon)</span>
              </button>

              <button
                type="button"
                onClick={() => setPromptTargetPlatform('ai_studio')}
                className={`px-3 py-1.5 cursor-pointer flex items-center gap-1.5 border border-[#141414] transition-colors ${
                  promptTargetPlatform === 'ai_studio'
                    ? 'bg-[#141414] text-white shadow-xs'
                    : 'bg-white hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Google AI Studio (Standard Prompt)</span>
              </button>
            </div>

            {/* Platform 1: Vertex AI Agent Platform Studio (Multimodal) */}
            {promptTargetPlatform === 'vertex_multimodal' && (
              <div className="p-3.5 bg-blue-50 border-2 border-blue-900 rounded-md space-y-2 text-xs">
                <div className="font-mono font-bold text-blue-950 flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-800" />
                    <span>Vertex AI Agent Platform Studio (Multimodal Console)</span>
                  </span>
                  <span className="text-[10px] bg-blue-900 text-white px-2 py-0.5 rounded-sm font-normal">
                    Project: project-ef52c00b-7abe-4318-be7 · Model: gemini-4-argon
                  </span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-blue-950 font-sans leading-relaxed">
                  <li>
                    คลิกปุ่ม <strong>"📋 คัดลอก Multimodal Agent Prompt"</strong> ด้านล่าง
                  </li>
                  <li>
                    คลิกปุ่ม <strong>"🚀 เปิด Vertex AI Agent Studio (Multimodal) ทันที"</strong> เพื่อเปิดคอนโซล Google Cloud ที่ระบุไว้ในอีกหน้าต่าง
                  </li>
                  <li>
                    นำข้อความไปวางในช่อง <strong>Instructions</strong> ใน Agent Platform จากนั้นตั้งค่า Tools/OpenAPI (เช่น การจองเลข, การตรวจสอบ Poka-Yoke, การส่งต่อ E-Document) แล้วทดสอบอัปโหลดไฟล์รูปภาพหรือ PDF ได้ทันที!
                  </li>
                </ol>
              </div>
            )}

            {/* Platform 2: Google AI Studio */}
            {promptTargetPlatform === 'ai_studio' && (
              <div className="p-3.5 bg-purple-50 border-2 border-purple-900 rounded-md space-y-2 text-xs">
                <div className="font-mono font-bold text-purple-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-700" />
                  <span>Google AI Studio (Chat / Prototype Environment):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-purple-950 font-sans leading-relaxed">
                  <li>
                    คลิกปุ่ม <strong>"📋 คัดลอก System Prompt"</strong> ด้านล่าง
                  </li>
                  <li>
                    คลิกปุ่ม <strong>"🚀 เปิด Google AI Studio ในแท็บใหม่"</strong> (จะพาไปยังหน้าสร้าง Chat/Prompt ของ Google AI Studio)
                  </li>
                  <li>
                    นำข้อความไปวางในช่อง <strong>System Instructions</strong> หรือช่องคำสั่ง Prompt แล้วเริ่มทดสอบระบบ To-Be หรือกด <strong>Get Code</strong> เพื่อส่งออกเป็นโค้ดแอปพลิเคชันได้ทันที!
                  </li>
                </ol>
              </div>
            )}

            {/* Prompt Preview Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#141414]">
                  {promptTargetPlatform === 'vertex_multimodal'
                    ? 'Master Multimodal Agent Instructions (สำหรับ Vertex AI Agent Platform):'
                    : 'Master System Instructions (สำหรับ Google AI Studio):'}
                </span>
                <span className="text-zinc-500 font-bold">สำหรับ: {currentProfile.jobTitle}</span>
              </div>
              <textarea
                readOnly
                rows={13}
                value={
                  promptTargetPlatform === 'vertex_multimodal'
                    ? generateVertexAgentStudioPrompt(currentProfile)
                    : generateAIStudioSystemPrompt(currentProfile)
                }
                className="w-full p-3 font-mono text-xs bg-zinc-900 text-zinc-100 border border-black rounded-xs select-all leading-relaxed"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#141414]/20">
              <div className="text-[11px] text-zinc-600 font-mono">
                {promptTargetPlatform === 'vertex_multimodal'
                  ? '* สอดคล้องตามมาตรฐาน ETDA 2569, ISO 42001 และรองรับ OCR ภาพเอกสารและ PDF'
                  : '* ข้อกำหนดสอดคล้องตามมาตรฐาน ETDA Lean Solution 2569 และ PDPA'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const promptText =
                      promptTargetPlatform === 'vertex_multimodal'
                        ? generateVertexAgentStudioPrompt(currentProfile)
                        : generateAIStudioSystemPrompt(currentProfile);
                    navigator.clipboard.writeText(promptText);
                    setCopiedPrompt(true);
                    showToast(
                      promptTargetPlatform === 'vertex_multimodal'
                        ? '📋 คัดลอก Multimodal Agent Prompt สำหรับ Vertex AI สำเร็จ!'
                        : '📋 คัดลอก System Prompt สำหรับ AI Studio สำเร็จ!'
                    );
                    setTimeout(() => setCopiedPrompt(false), 3000);
                  }}
                  className="px-4 py-2 bg-[#141414] hover:bg-zinc-800 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  {copiedPrompt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-300" />}
                  <span>{copiedPrompt ? '✓ คัดลอกสำเร็จแล้ว!' : '📋 คัดลอก Prompt'}</span>
                </button>

                {promptTargetPlatform === 'vertex_multimodal' ? (
                  <a
                    href="https://console.cloud.google.com/agent-platform/studio/multimodal?project=project-ef52c00b-7abe-4318-be7&model=gemini-4-argon&region=global"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-linear-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>🚀 เปิด Vertex AI Agent Studio ทันที</span>
                  </a>
                ) : (
                  <a
                    href="https://aistudio.google.com/prompts/new_chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-linear-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>🚀 เปิด Google AI Studio ในแท็บใหม่</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setIsAIStudioModalOpen(false)}
                  className="px-3 py-2 bg-white hover:bg-zinc-100 border border-[#141414] font-mono text-xs font-bold cursor-pointer"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
