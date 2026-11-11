import { AISystemRecord } from '../types';

export interface DataFieldDefinition {
  field_name: string;
  group_code: string;
  group_name_th: string;
  type: string;
  required: boolean;
  is_calculated?: boolean;
  description_th: string;
  example: string;
}

export const dataModelFields: DataFieldDefinition[] = [
  // Group A: Identity
  { field_name: 'system_id', group_code: 'A', group_name_th: 'กลุ่ม A — การระบุตัวตน', type: 'string', required: true, is_calculated: true, description_th: 'รหัสอ้างอิงระบบ รูปแบบ AIS-YYYY-NNN', example: 'AIS-2025-001' },
  { field_name: 'system_name_th', group_code: 'A', group_name_th: 'กลุ่ม A — การระบุตัวตน', type: 'string', required: true, description_th: 'ชื่อระบบภาษาไทย', example: 'ระบบแชทบอทตอบคำถามพนักงาน HR' },
  { field_name: 'system_name_en', group_code: 'A', group_name_th: 'กลุ่ม A — การระบุตัวตน', type: 'string', required: false, description_th: 'ชื่อระบบภาษาอังกฤษ', example: 'HR Smart Assistant' },
  { field_name: 'short_description', group_code: 'A', group_name_th: 'กลุ่ม A — การระบุตัวตน', type: 'text', required: true, description_th: 'คำอธิบายสรุปหน้าที่ของระบบ 2-3 บรรทัด', example: 'ตอบคำถามสิทธิสวัสดิการพนักงานด้วยเทคโนโลยี RAG + LLM' },
  
  // Group B: Ownership
  { field_name: 'owner_unit', group_code: 'B', group_name_th: 'กลุ่ม B — เจ้าของและความรับผิดชอบ', type: 'string', required: true, description_th: 'หน่วยงาน/ฝ่ายเจ้าของระบบ', example: 'ฝ่ายทรัพยากรบุคคล (HR)' },
  { field_name: 'business_owner', group_code: 'B', group_name_th: 'กลุ่ม B — เจ้าของและความรับผิดชอบ', type: 'string', required: true, description_th: 'ผู้รับผิดชอบเชิงภารกิจ (Name / Position)', example: 'ผู้อำนวยการฝ่าย HR' },
  { field_name: 'technical_owner', group_code: 'B', group_name_th: 'กลุ่ม B — เจ้าของและความรับผิดชอบ', type: 'string', required: true, description_th: 'ผู้รับผิดชอบเชิงเทคนิค', example: 'หัวหน้าทีม AI Transformation' },
  { field_name: 'accountable_executive', group_code: 'B', group_name_th: 'กลุ่ม B — เจ้าของและความรับผิดชอบ', type: 'string', required: true, description_th: 'ผู้บริหารสูงสุดที่รับผิดชอบผลของ AI', example: 'รองกรรมการผู้จัดการ (CHRO)' },
  { field_name: 'data_protection_contact', group_code: 'B', group_name_th: 'กลุ่ม B — เจ้าของและความรับผิดชอบ', type: 'string', required: false, description_th: 'เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO Contact)', example: 'dpo@organization.or.th' },

  // Group C: Purpose & Scope
  { field_name: 'intended_purpose', group_code: 'C', group_name_th: 'กลุ่ม C — วัตถุประสงค์และขอบเขต', type: 'text', required: true, description_th: 'วัตถุประสงค์การใช้งานที่ออกแบบไว้', example: 'ช่วยตอบคำถามระเบียบสวัสดิการเพื่อลดภาระงาน Call Center' },
  { field_name: 'out_of_scope_uses', group_code: 'C', group_name_th: 'กลุ่ม C — วัตถุประสงค์และขอบเขต', type: 'text', required: true, description_th: 'การใช้งานที่ไม่อยู่ในขอบเขต/ข้อห้าม', example: 'ห้ามใช้ประเมินผลการทำงานหรือตัดสินใจให้เงินรางวัล' },
  { field_name: 'user_groups', group_code: 'C', group_name_th: 'กลุ่ม C — วัตถุประสงค์และขอบเขต', type: 'multi-select', required: true, description_th: 'กลุ่มผู้ใช้งานระบบ', example: 'พนักงานประจำ, พนักงานสัญญาจ้าง' },
  { field_name: 'affects_vulnerable_groups', group_code: 'C', group_name_th: 'กลุ่ม C — วัตถุประสงค์และขอบเขต', type: 'boolean', required: true, description_th: 'กระทบกลุ่มเปราะบาง (เด็ก/ผู้สูงอายุ/ผู้ป่วย)', example: 'false' },
  { field_name: 'decision_impact_on_individuals', group_code: 'C', group_name_th: 'กลุ่ม C — วัตถุประสงค์และขอบเขต', type: 'enum', required: true, description_th: 'ระดับผลกระทบต่อสิทธิของบุคคล', example: 'ให้ข้อมูลประกอบ' },

  // Group D: Technology
  { field_name: 'ai_capability_type', group_code: 'D', group_name_th: 'กลุ่ม D — เทคโนโลยีและรูปแบบ', type: 'multi-select', required: true, description_th: 'ประเภทความสามารถของ AI', example: 'สร้างเนื้อหา (Generative), ประมวลผลภาษา' },
  { field_name: 'adoption_mode', group_code: 'D', group_name_th: 'กลุ่ม D — เทคโนโลยีและรูปแบบ', type: 'enum', required: true, description_th: 'รูปแบบการประยุกต์ใช้ (Adopter / Customizer / Maker)', example: 'Customizer' },
  { field_name: 'customization_technique', group_code: 'D', group_name_th: 'กลุ่ม D — เทคโนโลยีและรูปแบบ', type: 'multi-select', required: false, description_th: 'เทคนิคปรับแต่ง (Prompting / RAG / Fine-tuning)', example: 'RAG (Retrieval-Augmented Generation)' },
  { field_name: 'is_generative_ai', group_code: 'D', group_name_th: 'กลุ่ม D — เทคโนโลยีและรูปแบบ', type: 'boolean', required: true, is_calculated: true, description_th: 'เป็นระบบ Generative AI หรือไม่', example: 'true' },
  { field_name: 'is_agentic', group_code: 'D', group_name_th: 'กลุ่ม D — เทคโนโลยีและรูปแบบ', type: 'boolean', required: true, description_th: 'ระบบทำหน้าที่กระทำการแทนผู้ใช้ (Agentic AI)', example: 'false' },

  // Group E: Data
  { field_name: 'uses_personal_data', group_code: 'E', group_name_th: 'กลุ่ม E — การใช้ข้อมูล', type: 'boolean', required: true, description_th: 'ประมวลผลข้อมูลส่วนบุคคล (PII)', example: 'true' },
  { field_name: 'uses_sensitive_data', group_code: 'E', group_name_th: 'กลุ่ม E — การใช้ข้อมูล', type: 'boolean', required: true, description_th: 'ประมวลผลข้อมูลอ่อนไหวตาม PDPA', example: 'false' },
  { field_name: 'lawful_basis', group_code: 'E', group_name_th: 'กลุ่ม E — การใช้ข้อมูล', type: 'multi-select', required: false, description_th: 'ฐานทางกฎหมาย (PDPA Lawful Basis)', example: 'สัญญา (Contract), ประโยชน์ชอบธรรม' },

  // Group F: Legal Role
  { field_name: 'value_chain_role', group_code: 'F', group_name_th: 'กลุ่ม F — บทบาททางกฎหมาย', type: 'multi-select', required: true, description_th: 'บทบาทตาม Value Chain (Provider/Deployer)', example: 'Deployer' },
  { field_name: 'applicable_laws', group_code: 'F', group_name_th: 'กลุ่ม F — บทบาททางกฎหมาย', type: 'ref-multi', required: true, description_th: 'กฎหมายที่ผูกพัน', example: 'PDPA, ร่าง พ.ร.บ. ปัญญาประดิษฐ์ ม.43-47' },

  // Group G: Risk & Governance Track
  { field_name: 'unacceptable_risk_flag', group_code: 'G', group_name_th: 'กลุ่ม G — การจำแนกความเสี่ยง', type: 'boolean', required: true, is_calculated: true, description_th: 'ตรงกับความเสี่ยงต้องห้ามหรือไม่', example: 'false' },
  { field_name: 'inherent_risk_level', group_code: 'G', group_name_th: 'กลุ่ม G — การจำแนกความเสี่ยง', type: 'enum', required: true, is_calculated: true, description_th: 'ระดับความเสี่ยงตั้งต้น ก่อนมีมาตรการ', example: 'Level III' },
  { field_name: 'residual_risk_level', group_code: 'G', group_name_th: 'กลุ่ม G — การจำแนกความเสี่ยง', type: 'enum', required: true, is_calculated: true, description_th: 'ระดับความเสี่ยงคงเหลือ หลังบรรเทา', example: 'Level II' },
  { field_name: 'governance_track', group_code: 'G', group_name_th: 'กลุ่ม G — การจำแนกความเสี่ยง', type: 'enum', required: true, is_calculated: true, description_th: 'เส้นทางการกำกับ (Fast track / Standard / Full)', example: 'Standard' },

  // Group H: Oversight
  { field_name: 'human_oversight_level', group_code: 'H', group_name_th: 'กลุ่ม H — การกำกับโดยมนุษย์', type: 'enum', required: true, description_th: 'ระดับ Human Oversight (in-the-loop / over-the-loop)', example: 'over-the-loop' },
  { field_name: 'user_disclosure_method', group_code: 'H', group_name_th: 'กลุ่ม H — การกำกับโดยมนุษย์', type: 'text', required: true, description_th: 'วิธีเปิดเผยต่อผู้ใช้ว่าใช้งาน AI', example: 'แสดง Banner แจ้งเตือน AI Chatbot ก่อนเริ่มสนทนา' },

  // Group I: Status
  { field_name: 'lifecycle_status', group_code: 'I', group_name_th: 'กลุ่ม I — สถานะและวงจรชีวิต', type: 'enum', required: true, description_th: 'สถานะปัจจุบันของระบบ', example: 'ใช้งานจริง' },

  // Group J & K: Review & Docs
  { field_name: 'last_assessment_date', group_code: 'J', group_name_th: 'กลุ่ม J — การทบทวน', type: 'date', required: true, description_th: 'วันที่ทำการประเมินล่าสุด', example: '2025-01-15' },
  { field_name: 'next_review_due', group_code: 'J', group_name_th: 'กลุ่ม J — การทบทวน', type: 'date', required: true, is_calculated: true, description_th: 'วันกำหนดทบทวนรอบถัดไป', example: '2026-01-15' },
  { field_name: 'completeness_score', group_code: 'K', group_name_th: 'กลุ่ม K — ความสมบูรณ์เอกสาร', type: 'percent', required: true, is_calculated: true, description_th: 'ร้อยละเอกสารสำคัญที่จัดทำเรียบร้อย', example: '91%' },
];

export const mockAISystems: AISystemRecord[] = [
  {
    system_id: 'AIS-2025-001',
    system_name_th: 'ระบบแชทบอทตอบคำถามพนักงาน HR (HR Assistant)',
    system_name_en: 'Internal HR Smart Chatbot',
    short_description: 'ใช้เทคโนโลยี RAG + LLM สืบค้นระเบียบและสวัสดิการขององค์กรเพื่อตอบคำถามพนักงานอัตโนมัติ 24 ชม.',
    owner_unit: 'ฝ่ายบริหารทรัพยากรบุคคล (HR)',
    business_owner: 'นายสมชาย วงศ์ดี (ผอ. ฝ่าย HR)',
    technical_owner: 'นางสาววิภาดา ใจเย็น (Head of Digital)',
    accountable_executive: 'นายวิชัย สุขเกษม (CHRO)',
    data_protection_contact: 'dpo@company.co.th',
    intended_purpose: 'สืบค้นข้อมูลระเบียบ HR และตอบคำถามสวัสดิการทั่วไปแก่พนักงานภายในองค์กร',
    user_groups: ['พนักงานประจำ', 'พนักงานสัญญาจ้าง'],
    affects_vulnerable_groups: false,
    decision_impact_on_individuals: 'ให้ข้อมูลประกอบ',
    ai_capability_type: ['ประมวลผลภาษาธรรมชาติ', 'สร้างเนื้อหา (Generative AI)'],
    adoption_mode: 'Customizer',
    is_generative_ai: true,
    is_agentic: false,
    uses_personal_data: true,
    uses_sensitive_data: false,
    value_chain_role: ['Deployer'],
    unacceptable_risk_flag: false,
    inherent_risk_level: 'Level III',
    residual_risk_level: 'Level II',
    governance_track: 'Standard',
    human_oversight_level: 'over-the-loop',
    lifecycle_status: 'ใช้งานจริง',
    last_assessment_date: '2025-02-10',
    next_review_due: '2026-02-10',
    completeness_score: 92,
  },
  {
    system_id: 'AIS-2025-002',
    system_name_th: 'ระบบประเมินความเสี่ยงและอนุมัติสินเชื่ออัตโนมัติ (Credit Scoring AI)',
    system_name_en: 'AI Financial Credit Risk Scoring',
    short_description: 'วิเคราะห์ประวัติการเงิน สเตทเมนท์ และพฤติกรรมผู้กู้เพื่อประเมินความเสี่ยงและเสนอคำตัดสินสินเชื่อ',
    owner_unit: 'ฝ่ายบริหารความเสี่ยงสินเชื่อ',
    business_owner: 'นายอนันต์ ศรีสุข (VP Credit Risk)',
    technical_owner: 'นายธนกร พัฒนา (Chief Data Scientist)',
    accountable_executive: 'นายประเสริฐ เลิศวณิช (CRO)',
    data_protection_contact: 'dpo@company.co.th',
    intended_purpose: 'ให้คะแนนความน่าเชื่อถือและส่งผลการประเมินเพื่อประกอบการอนุมัติสินเชื่อลูกค้า',
    user_groups: ['ลูกค้าประชาชนทั่วไป', 'ผู้ขอสินเชื่อ'],
    affects_vulnerable_groups: true,
    decision_impact_on_individuals: 'มีผลต่อการตัดสินใจ',
    ai_capability_type: ['การคาดการณ์ (Predictive)', 'การจำแนกประเภท (Classification)'],
    adoption_mode: 'Maker',
    is_generative_ai: false,
    is_agentic: false,
    uses_personal_data: true,
    uses_sensitive_data: true,
    value_chain_role: ['Provider', 'Deployer'],
    unacceptable_risk_flag: false,
    inherent_risk_level: 'Level IV',
    residual_risk_level: 'Level III',
    governance_track: 'Full',
    human_oversight_level: 'in-the-loop',
    lifecycle_status: 'ทดสอบ',
    last_assessment_date: '2025-03-01',
    next_review_due: '2025-09-01',
    completeness_score: 85,
  },
  {
    system_id: 'AIS-2025-003',
    system_name_th: 'เครื่องมือช่วยสรุปรายงานการประชุมและเขียนโค้ด (Copilot for Office)',
    system_name_en: 'Enterprise Office Copilot',
    short_description: 'ซอฟต์แวร์สำเร็จรูป Microsoft 365 Copilot ช่วยสรุปเนื้อหาการประชุม และร่างเอกสารสำนักงาน',
    owner_unit: 'ฝ่ายเทคโนโลยีสารสนเทศ (IT)',
    business_owner: 'นายฉัตรชัย มีสุข (IT Director)',
    technical_owner: 'นายศักดิ์สิทธิ์ เมืองทอง (System Admin)',
    accountable_executive: 'นายฉัตรชัย มีสุข (IT Director)',
    intended_purpose: 'ช่วยสรุปรายงานการประชุม ถอดความเสียง ร่างข้อความอีเมล และร่างเอกสารนำเสนอ',
    user_groups: ['พนักงานทุกระดับ'],
    affects_vulnerable_groups: false,
    decision_impact_on_individuals: 'ไม่กระทบ',
    ai_capability_type: ['สร้างเนื้อหา (Generative AI)'],
    adoption_mode: 'Adopter',
    is_generative_ai: true,
    is_agentic: false,
    uses_personal_data: false,
    uses_sensitive_data: false,
    value_chain_role: ['Deployer'],
    unacceptable_risk_flag: false,
    inherent_risk_level: 'Level II',
    residual_risk_level: 'Level I',
    governance_track: 'Fast track',
    human_oversight_level: 'over-the-loop',
    lifecycle_status: 'ใช้งานจริง',
    last_assessment_date: '2025-01-20',
    next_review_due: '2027-01-20',
    completeness_score: 100,
  },
  {
    system_id: 'AIS-2025-004',
    system_name_th: 'ระบบคัดกรองภาพถ่ายเอกซเรย์ปอดช่วยวินิจฉัยทางการแพทย์ (AI Chest X-Ray)',
    system_name_en: 'AI Radiography Triage System',
    short_description: 'วิเคราะห์ภาพถ่ายเอกซเรย์ทรวงอกเพื่อตรวจหาจุดผิดปกติปอดและจัดลำดับความเร่งด่วนส่งต่อรังสีแพทย์',
    owner_unit: 'ศูนย์บริการการแพทย์ดิจิทัล',
    business_owner: 'นพ.กิตติศักดิ์ เมตตา (ผู้อำนวยการศูนย์แพทย์)',
    technical_owner: 'ดร.พีระพงษ์ สุวรรณ (AI Medical Engineer)',
    accountable_executive: 'ผศ.ดร.นพ.สมศักดิ์ นิมิต (คณบดี/ผู้บริหารโรงพยาบาล)',
    data_protection_contact: 'dpo@hospital.or.th',
    intended_purpose: 'ช่วยรังสีแพทย์ตรวจจับจุดคัดกรองรอยโรคในปอดเพื่อความรวดเร็วในการรักษา',
    user_groups: ['ผู้ป่วย', 'แพทย์และบุคลากรทางการแพทย์'],
    affects_vulnerable_groups: true,
    decision_impact_on_individuals: 'มีผลต่อการตัดสินใจ',
    ai_capability_type: ['การตรวจจับวัตถุ/ภาพ (Computer Vision)'],
    adoption_mode: 'Customizer',
    is_generative_ai: false,
    is_agentic: false,
    uses_personal_data: true,
    uses_sensitive_data: true,
    value_chain_role: ['Deployer'],
    unacceptable_risk_flag: false,
    inherent_risk_level: 'Level IV',
    residual_risk_level: 'Level III',
    governance_track: 'Full',
    human_oversight_level: 'in-the-loop',
    lifecycle_status: 'กำลังพัฒนา',
    last_assessment_date: '2025-02-28',
    next_review_due: '2025-08-28',
    completeness_score: 78,
  }
];

export function determineGovernanceTrack(sys: Partial<AISystemRecord>): 'Fast track' | 'Standard' | 'Full' {
  if (
    sys.unacceptable_risk_flag ||
    sys.residual_risk_level === 'Level IV' ||
    sys.decision_impact_on_individuals === 'ตัดสินใจแทน' ||
    sys.adoption_mode === 'Maker' ||
    sys.is_agentic
  ) {
    return 'Full';
  }

  if (
    sys.residual_risk_level === 'Level III' ||
    sys.uses_personal_data ||
    sys.uses_sensitive_data ||
    sys.affects_vulnerable_groups ||
    sys.adoption_mode === 'Customizer'
  ) {
    return 'Standard';
  }

  return 'Fast track';
}
