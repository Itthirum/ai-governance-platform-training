export interface DocumentSummary {
  id: string;
  title: string;
  subtitle: string;
  source: string;
  year: string;
  keyHighlights: string[];
  coreSections: {
    sectionNum: string;
    sectionTitle: string;
    description: string;
    details: string[];
  }[];
}

export const documentSummaries: DocumentSummary[] = [
  {
    id: 'etda-genai',
    title: 'Generative AI Governance Guideline for Organizations',
    subtitle: 'แนวทางการประยุกต์ใช้ Generative AI อย่างมีธรรมาภิบาลสำหรับองค์กร (Volume 1)',
    source: 'ETDA / AI Governance Center (AIGC)',
    year: 'สิงหาคม 2024 (August 2024)',
    keyHighlights: [
      'คู่มือฉบับแรกของไทยที่เน้นธรรมาภิบาลและการบริหารจัดการความเสี่ยงสำหรับ Generative AI โดยเฉพาะ',
      'อ้างอิงกรอบมาตรฐานสากล NIST AI RMF (Generative AI Profile) ควบคู่กับคู่มือ AI Governance สำหรับผู้บริหารองค์กร',
      'จำแนก 12 ประเด็นความเสี่ยงเฉพาะของ GenAI และแนวทางลดผลกระทบเชิงปฏิบัติ',
      'แบ่ง 3 รูปแบบการประยุกต์ใช้ในองค์กร: Adopter (ผู้นำไปใช้), Customizer (ผู้ปรับแต่ง RAG/Fine-tuning) และ Maker (ผู้สร้าง Foundation Model)',
      'ตัวอย่างจริง 2 Scenarios (HR Chatbot และ Marketing Ad Creation) พร้อมร่างนโยบายการใช้งาน (Acceptable Use Policy: AUP)'
    ],
    coreSections: [
      {
        sectionNum: '01',
        sectionTitle: 'ทำความเข้าใจ Generative AI (What is Generative AI?)',
        description: 'สร้างความเข้าใจพื้นฐาน นิยามศัพท์ เทคโนโลยีเบื้องหลัง และความแตกต่างระหว่าง GenAI กับ Traditional AI',
        details: [
          'นิยาม AI, Machine Learning (ML), Deep Learning (DL) ผ่าน Artificial Neural Network (ANN)',
          'Generative AI: AI ประเภท Deep Learning ที่สร้างเนื้อหาใหม่ (ข้อความ, ภาพ, วิดีโอ, เสียง, ซอร์สโค้ด, โมเดล 3D) ตามข้อความสั่งการ (Prompt)',
          'ข้อแตกต่างสำคัญ: Traditional AI เน้นการทำนาย (Prediction) และจำแนกประเภท (Decision) แต่ GenAI เน้นการสร้างสรรค์เนื้อหาใหม่ (New Content Creation)',
          'องค์ประกอบสำคัญ: Prompt Engineering, Foundation Model และ Large Language Model (LLM)'
        ]
      },
      {
        sectionNum: '02',
        sectionTitle: 'ประโยชน์และข้อจำกัดของ Generative AI (Benefits & Limitations)',
        description: 'การประเมินศักยภาพเพื่อเลือกใช้งานให้ตรงเป้าหมาย และการตระหนักถึงข้อจำกัดทางเทคโนโลยี',
        details: [
          '6 ด้านประโยชน์หลัก: สรุปความ/เรียบเรียง (Content Refinement), สร้างไอเดีย (Ideation), สืบค้นข้อมูล (Information Discovery), เขียนซอร์สโค้ด (Source Code), วิเคราะห์ข้อมูล (Data Analysis), สื่อมัลติมีเดีย (Multimedia)',
          '8 ข้อจำกัดวิกฤต: อาการหลอน (Hallucination/Confabulation), การคิดวิเคราะห์และการตัดสินใจ (Critical Thinking/Judgement), บริบทละเอียดอ่อน/จริยธรรม, ความเชี่ยวชาญเฉพาะด้าน (Domain Expertise), บริบทเฉพาะบุคคล, ความเป็นปัจจุบันของข้อมูล (Real-time Retrieval), การอธิบายผลลัพธ์ (Explainability/Black Box), ความไม่แน่นอนของผลลัพธ์ (Consistent Output)'
        ]
      },
      {
        sectionNum: '03',
        sectionTitle: 'ความเสี่ยงและการบริหารจัดการความเสี่ยง (Risks & Risk Management)',
        description: 'การวิเคราะห์ความเสี่ยง 12 ประเด็นตาม NIST AI RMF GenAI Profile และกรณีศึกษา',
        details: [
          '12 ความเสี่ยง GenAI: 1) CBRN Weapons 2) Confabulation 3) Dangerous/Violent 4) Data Privacy 5) Environmental 6) Human-AI Configuration 7) Information Integrity 8) Information Security 9) Intellectual Property 10) Obscene/Abusive Content 11) Toxicity/Bias 12) Value Chain Integration',
          'แนวทางตอบโต้ 9 มาตรการ: จัดตั้งโครงสร้างกำกับ, ตรวจสอบ compliance, ส่งเสริมจริยธรรม, มี Human Oversight, ร่วมมือข้ามฝ่าย, ยกระดับ Data Governance, ติดตามประเมินผล (Feedback Loop/RAG), ตรวจสอบ Vendor ภายนอก, ตั้งระบบ Cybersecurity'
        ]
      },
      {
        sectionNum: '04',
        sectionTitle: 'แนวทางการนำ GenAI มาประยุกต์ใช้ในองค์กร (Deploying GenAI)',
        description: 'โครงสร้างเทคโนโลยี 4 ชั้น และ 3 รูปแบบการประยุกต์ใช้ตามระดับความซับซ้อน',
        details: [
          '4 เทคโนโลยีชั้นหลัก: 1. Infrastructure (Azure, GCP, AWS) 2. Foundation Model (GPT-4, Claude 3.5, Gemini 1.5, Llama 2) 3. Platforms for Development (Azure AI Studio, Vertex AI, Bedrock) 4. Applications (Copilot, ChatGPT, Firefly)',
          '3 Archetypes: Adopter (ใช้ซอฟต์แวร์สำเร็จรูป Off-the-Shelf), Customizer (นำโมเดลมาปรับแต่งด้วย RAG หรือ Fine-Tuning), Maker (สร้าง/เทรน Foundation Model ขึ้นใหม่ตั้งแต่นับหนึ่ง)'
        ]
      },
      {
        sectionNum: '05',
        sectionTitle: 'ข้อพิจารณาสำหรับธรรมาภิบาล (Key Governance Considerations)',
        description: 'การปรับใช้กรอบธรรมาภิบาลปัญญาประดิษฐ์ 3 ด้านหลัก ให้ครอบคลุม GenAI',
        details: [
          '1. AI Governance Structure: คณะกรรมการ (Council), กำหนด RACI, สร้างทักษะ Prompt Engineering & RAG',
          '2. AI Strategy & Risk Management: เลือกรูปแบบประยุกต์ใช้ที่เหมาะกับ Risk Appetite, กำหนดระดับ Human Oversight',
          '3. AI Operation: เตรียมข้อมูลคุณภาพสูง, สร้างระบบป้องกันความผิดพลาด, ทดสอบระบบอย่างครอบคลุม, จัดทำ Feedback Channels'
        ]
      }
    ]
  },
  {
    id: 'aigc-framework',
    title: 'AI Governance Practice Framework & Train The Trainer Program',
    subtitle: 'กรอบธรรมาภิบาลปัญญาประดิษฐ์และการประเมินผลกระทบ AISIA / Risk Assessment',
    source: 'ศูนย์ธรรมาภิบาลปัญญาประดิษฐ์ (AIGC) / ETDA / AIGPC',
    year: '2024 - 2025',
    keyHighlights: [
      'เชื่อมโยง AI Governance เข้ากับ Data Governance, IT Governance และ Corporate Governance',
      'แมปความสัมพันธ์ระหว่างองค์ประกอบธรรมาภิบาล 3 ด้าน กับหลักจริยธรรม AI 6 ข้อของ สดช. (ONDE)',
      'กระบวนการประเมินผลกระทบระบบ AI (AISIA Process) ตามมาตรฐาน ISO/IEC 42001:2023',
      'สมการประเมินความเสี่ยง Risk = Impact × Likelihood พร้อมเมทริกซ์ 5x5 และเกณฑ์ Risk Appetite',
      'เปรียบเทียบมาตรฐานสากล: ISO 31000, ISO 23894, ISO 42001, NIST AI RMF 1.0 (Govern, Map, Measure, Manage)'
    ],
    coreSections: [
      {
        sectionNum: '01',
        sectionTitle: 'โครงสร้างธรรมาภิบาลปัญญาประดิษฐ์ 3 องค์ประกอบหลัก',
        description: 'การวางระบบกุมทิศทาง (Direction), เฝ้าติดตาม (Monitoring) และประเมินผล (Evaluation)',
        details: [
          '1. AI Governance Structure: คณะกรรมการ AI Council, กำหนดบทบาทระดับนโยบาย (Strategic) และปฏิบัติการ (Implementation), แผนพัฒนาทักษะ (Competency Building)',
          '2. AI Strategy & Risk Management: การกำหนดกลยุทธ์ Responsible AI, สมการยึดถือ "Maximize Benefits and Minimize Negative Impacts", กระบวนการบริหารความเสี่ยง 6 ขั้น',
          '3. AI Operation: กำกับตลอดวงจรชีวิต AI Lifecycle (Design, Data Prep, Model Build, Deploy, Monitor, Evaluate, Retire), การให้บริการอย่างโปร่งใส (AI Service Provision)'
        ]
      },
      {
        sectionNum: '02',
        sectionTitle: 'ความสัมพันธ์กับหลักจริยธรรม AI 6 ประการ (ONDE Ethics Principles)',
        description: 'การกำกับดูแลเพื่อให้ตอบโจทย์จริยธรรมระดับชาติ',
        details: [
          '1) Competitiveness & Sustainable Dev 2) Laws, Ethics & International Standards 3) Transparency & Accountability 4) Security & Privacy 5) Fairness & Diversity 6) Reliability & Robustness'
        ]
      },
      {
        sectionNum: '03',
        sectionTitle: 'กระบวนการประเมินผลกระทบระบบ AI (AISIA Process - ISO 42001)',
        description: 'การวิเคราะห์ผลกระทบต่อบุคคล กลุ่มบุคคล และสังคมอย่างเป็นระบบ',
        details: [
          '8 ขั้นตอน AISIA: 1. System Info 2. Data Info & Quality 3. Algorithm/Model 4. Deployment Environment 5. Relevant Stakeholders 6. Actual/Potential Benefits & Harms 7. Failures, Misuse & Abuse 8. Document & Communication',
          'เหตุการณ์บังคับประเมินใหม่ (Reassessment Triggers): เปลี่ยนวัตถุประสงค์, เพิ่มข้อมูลอ่อนไหว, เพิ่มความซับซ้อน/เปลี่ยนประเภทระบบ, เกิดเหตุการณ์ผิดปกติที่มีนัยสำคัญ'
        ]
      },
      {
        sectionNum: '04',
        sectionTitle: 'กรอบบริหารจัดการความเสี่ยงสากล (ISO 23894 & NIST AI RMF)',
        description: 'การประเมินโอกาสเกิดและความรุนแรงเพื่อกำหนดมาตรการบรรเทาความเสี่ยง (Risk Treatment)',
        details: [
          'Risk Matrix 5x5: Likelihood (1-Rare ถึง 5-Frequent) × Severity (1-Very Low ถึง 5-Extreme)',
          '4 ระดับความเสี่ยง (Risk Levels): Level I (น้อยมาก), Level II (น้อย), Level III (ปานกลาง), Level IV (สูง)',
          'NIST AI RMF 1.0 Function Mapping: Govern (กำกับ), Map (บริบท), Measure (วัดผล), Manage (จัดการ)'
        ]
      }
    ]
  },
  {
    id: 'thai-ai-law',
    title: 'ร่าง พระราชบัญญัติว่าด้วยปัญญาประดิษฐ์ พ.ศ. .... (Draft Thai AI Act)',
    subtitle: 'ร่างกฎหมายแม่บทควบคุมและส่งเสริมการพัฒนาประยุกต์ใช้ปัญญาประดิษฐ์ของประเทศไทย',
    source: 'กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (MDES) / สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA)',
    year: '2024 - 2025 (อยู่ระหว่างกระบวนการยกร่าง)',
    keyHighlights: [
      'กำหนดข้อบังคับใช้กับทั้งการพัฒนา การประยุกต์ใช้ หรือการกระทำที่มีผลกระทบต่อประชาชนในราชอาณาจักร (มีผลอาณาเขตครอบคลุมบริการข้ามแดน)',
      'การจัดตั้ง AI Regulatory Sandbox (โครงการทดสอบระบบปัญญาประดิษฐ์) พร้อมกลไกยกเว้นโทษปรับทางปกครอง/พินัย',
      'แบ่งระดับความเสี่ยง: ความเสี่ยงต้องห้าม/ร้ายแรง (Prohibited AI) และ ความเสี่ยงสูง (High-Risk AI) ตามประเภทกิจการ',
      'ข้อกำหนดความโปร่งใสพิเศษสำหรับ Deepfake, Chatbot และเนื้อหาที่สร้างโดย AI (Machine-readable marking/Labeling)',
      'โทษปรับทางปกครองสูงสุดถึง 5,000,000 บาท และความรับผิดทางแพ่งแบบร่วมกันชดใช้ค่าสินไหมทดแทน'
    ],
    coreSections: [
      {
        sectionNum: 'หมวด 1',
        sectionTitle: 'บททั่วไป (มาตรา 1 - 6)',
        description: 'ขอบเขตการบังคับใช้ ข้อยกเว้น และคำนิยามสำคัญ',
        details: [
          'มาตรา 3: บังคับใช้กับการกระทำที่มีผลกระทบต่อประชาชนในไทย ไม่ว่าจะทำในหรือนอกราชอาณาจักร',
          'มาตรา 4 (ข้อยกเว้น): ไม่บังคับใช้กับการใช้เพื่อประโยชน์ส่วนตน/ครอบครัว, งานศึกษาวิจัยทางการแพทย์/อุดมศึกษาที่ผ่าน จริยธรรมวิจัยในมนุษย์, งานวิจัยก่อนนำออกจำหน่าย',
          'มาตรา 5 (นิยาม): ระบบปัญญาประดิษฐ์, ผู้ให้บริการ (Provider), ผู้ประยุกต์ใช้ (Deployer), เหตุการณ์ร้ายแรง (Serious Incident)'
        ]
      },
      {
        sectionNum: 'หมวด 2',
        sectionTitle: 'การส่งเสริมการพัฒนาและการประยุกต์ใช้ (มาตรา 7 - 32)',
        description: 'โครงสร้างพื้นฐานในการส่งเสริม Sandbox, การแบ่งปันข้อมูล, มาตรฐาน และแนวปฏิบัติที่ดี',
        details: [
          'ส่วนที่ 1 AI Regulatory Sandbox (ม.7-17): การยื่นขอทดสอบ, การผ่อนผันกฎระเบียบที่เป็นอุปสรรคผ่านพระราชกฤษฎีกา, คุ้มครองผู้ทดสอบจากโทษปรับทางปกครอง',
          'ส่วนที่ 2 การแบ่งปันข้อมูล (ม.18-21): ให้ BDI (สถาบันข้อมูลขนาดใหญ่) ทำศูนย์แบ่งปันข้อมูล, ให้ถือว่าการแลกเปลี่ยนข้อมูลภาครัฐเป็นไปตาม PDPA ม.24(4)',
          'ส่วนที่ 3-5 มาตรฐาน บริการสนับสนุน และการกำกับดูแลตนเอง (ม.22-32): การออกตรารับรองมาตรฐาน AI, เครื่องหมายการรับรอง'
        ]
      },
      {
        sectionNum: 'หมวด 3',
        sectionTitle: 'การควบคุมความเสี่ยงจากระบบปัญญาประดิษฐ์ (มาตรา 33 - 50)',
        description: 'มาตรการควบคุมความเสี่ยงร้ายแรง ความเสี่ยงสูง AI ภาครัฐ ความโปร่งใส และการควบคุมสัญญา',
        details: [
          'ส่วนที่ 1 ความเสี่ยงร้ายแรง (ม.33): ห้ามใช้ AI เทคนิคสื่อสารแฝงเร้น (Subliminal/Manipulative) ที่ส่งผลต่อจิตสำนึก หรือการเลือกปฏิบัติโดยไม่เป็นธรรมต่อบุคคลในวงกว้าง',
          'ส่วนที่ 2 ความเสี่ยงสูง (ม.35-40): ตรา พ.ร.ฎ. ควบคุม AI ที่กระทบความมั่นคง สุขภาพ สิ่งแวดล้อม พลังงาน คมนาคม สื่อสาร โครงสร้างพื้นฐาน; หน้าที่ Provider (ม.36) และ Deployer (ม.37); การแต่งตั้งตัวแทนในไทยสำหรับ Provider ต่างประเทศ (ม.40)',
          'ส่วนที่ 3-4 AI ภาครัฐ และ ความโปร่งใส Deepfake/Chatbot (ม.41-47): ผู้สร้าง Deepfake ต้องฝัง Machine-readable mark; ผู้โพสต์สื่อดัดแปลงต้องเปิดเผย (Label); เจ้าของแพลตฟอร์มต้องมีช่องทางรับแจ้งเหตุ',
          'ส่วนที่ 5 คุ้มครองผู้ใช้และสัญญาควบคุม (ม.48-50): ให้อำนาจกำหนดข้อสัญญาควบคุมสำหรับบริการ AI แก่ภาครัฐและหน่วยงานโครงสร้างพื้นฐาน'
        ]
      },
      {
        sectionNum: 'หมวด 4-5',
        sectionTitle: 'การควบคุมดูแล และ การจัดการเหตุการณ์ร้ายแรง (มาตรา 51 - 60)',
        description: 'กลไกการสั่งแก้ไข คำสั่งศาลระงับบริการ และการรับมือวิกฤต',
        details: [
          'มาตรา 51-53: สำนักงานมีหนังสือสั่งแก้ไข หากไม่ปฏิบัติตาม ยื่นคำร้องต่อศาลขอสั่งระงับการให้บริการ หรือสั่ง ISP ระงับการเผยแพร่',
          'มาตรา 54-60: การควบคุมดูแลเหตุการณ์ร้ายแรง (Serious Incident) ที่กระทบความมั่นคง/สาธารณสุข ยับยั้งฉุกเฉิน ยื่นขอคำสั่งศาลเข้าถึงเอกสารทางเทคนิคและซอร์สโค้ด'
        ]
      },
      {
        sectionNum: 'หมวด 6-7',
        sectionTitle: 'การกำกับและบทกำหนดโทษ (มาตรา 61 - 65)',
        description: 'อำนาจหน้าที่สำนักงาน (ETDA) ความรับผิดทางแพ่ง และโทษปรับทางปกครอง',
        details: [
          'มาตรา 62: ความรับผิดทางแพ่ง ชดใช้ค่าสินไหมทดแทนโดยไม่คำนึงถึงความจงใจหรือประมาทเลินเล่อ (Strict Liability)',
          'มาตรา 63 (โทษปรับปกครอง ไม่เกิน 1,000,000 บาท): ฝ่าฝืนคำสั่งแก้ไข/ระงับบริการของสำนักงานตาม ม.51-53',
          'มาตรา 64 (โทษปรับปกครอง ไม่เกิน 5,000,000 บาท): ฝ่าฝืนมาตรการรับมือเหตุการณ์ร้ายแรง ม.54, 57-60',
          'มาตรา 65 (โทษปรับปกครอง ไม่เกิน 3,000,000 บาท): ฝ่าฝืนข้อกำหนดความโปร่งใส Deepfake, Chatbot และการจัดทำรายงานประจำปี ม.43-47'
        ]
      }
    ]
  },
  {
    id: 'data-model-spec',
    title: 'AI Governance Flow & Data Model Specification for AI System Inventory',
    subtitle: 'สเปกตั้งต้นสำหรับพัฒนาเครื่องมือ AI System Inventory & Assessment Tool (ฉบับปรับปรุง)',
    source: 'สเปกการพัฒนาแอปพลิเคชันเพื่อหน่วยงาน (ETDA System Spec)',
    year: '2025 - 2026',
    keyHighlights: [
      'กำหนดโครงสร้างการทำงาน 5 ขั้นตอน (Step 0 ถึง Step 4) เชื่อมโยงระดับองค์กร (Enterprise layer) กับระดับระบบ (System layer)',
      'ตาราง AI System Inventory เป็นแกนกลาง (Central Hub) ผูกข้อมูล 55 Fields ครอบคลุมกลุ่ม A ถึง K',
      'ระบบการจัดเส้นทางแบบสัดส่วน (Proportionality Tracks): Fast track (5 เอกสาร), Standard track (11 เอกสาร), Full track (27 เอกสาร)',
      'การเชื่อมโยงข้อมูลอัตโนมัติจาก AISIA (Section 7-8) เข้าสู่ Risk Register โดยตรงโดยผู้ใช้ไม่ต้องกรอกซ้ำ',
      'กลไกคำนวณระดับการกำกับโดยมนุษย์ (Human Oversight) และเงื่อนไขประเมินใหม่ (Reassessment Triggers 7 ข้อ)'
    ],
    coreSections: [
      {
        sectionNum: 'Step 0',
        sectionTitle: 'ตั้งต้นและวางฐานข้อมูล (Baseline & Inventory)',
        description: 'ประเมินความพร้อมองค์กร 5 ด้าน จัดทำทะเบียนระบบ AI และสำรวจข้อกำหนดกฎหมาย',
        details: [
          'Output O0.1: รายงานผลประเมินความพร้อม (AI Readiness Report)',
          'Output O0.2: ทะเบียนระบบปัญญาประดิษฐ์ (AI System Inventory Table - 55 Fields)',
          'Output O0.3: ทะเบียนข้อกำหนดทางกฎหมายและบทบาทตาม Value Chain (Provider, Deployer, Importer, Distributor)'
        ]
      },
      {
        sectionNum: 'Step 1',
        sectionTitle: 'โครงสร้างการกำกับดูแลระดับองค์กร (AI Governance Structure)',
        description: 'จัดตั้ง AI Council, กำหนด RACI Matrix, ออกนโยบาย AUP และประกาศ Risk Appetite Statement',
        details: [
          'Output O1.1: AI Governance Council Charter',
          'Output O1.2: RACI Matrix (Strategic vs Implementation)',
          'Output O1.3: AI Acceptable Use Policy (AUP) + ภาคผนวก GenAI',
          'Output O1.4: แผนพัฒนาทักษะบุคลากร (Competency Plan)',
          'Output O1.5: ประกาศระดับความเสี่ยงที่ยอมรับได้ (Risk Appetite Statement)'
        ]
      },
      {
        sectionNum: 'Step 2',
        sectionTitle: 'กลยุทธ์ ผลกระทบ และความเสี่ยง (Strategy, Impact & Risk)',
        description: 'คัดเลือก Use Case, ประเมิน AISIA 10 Sections, ประเมินความเสี่ยง Unacceptable & Tolerable Risk',
        details: [
          'Output O2.1: AI Use Case Canvas (Value vs Feasibility)',
          'Output O2.2: AI Roadmap & Architecture Spec',
          'Output O2.3: AI Data Governance Policy',
          'Output O2.4: รายงาน AISIA Report (8+2 Sections: เพิ่ม Deployment Env & Failures/Misuse)',
          'Output O2.5: AI Risk Register & Treatment Plan (6 มิติเดิม + สาขา GenAI 12 ข้อ)',
          'Output O2.6: บันทึกมติการอนุมัติ Go/No-Go Decision Record'
        ]
      },
      {
        sectionNum: 'Step 3',
        sectionTitle: 'ปฏิบัติการตลอดวงจรชีวิต (AI Operation)',
        description: 'ข้อกำหนดเทคนิค, Model/Data Card, การทดสอบ, สัญญา Vendor, การเปิดเผยผู้ใช้, Human Oversight Protocol',
        details: [
          'Output O3.1 - O3.10: System Spec, Data Lineage, Model/Data Card, Testing Report, Third-Party Contract Checklist, Deployment Approval, Disclosure Pack, Human Oversight Protocol, Monitoring Log, Decommissioning Plan'
        ]
      },
      {
        sectionNum: 'Step 4',
        sectionTitle: 'ทบทวนและปรับปรุง (Review & Improve)',
        description: 'ประเมินผลการใช้งานประจำปี ทบทวนเมื่อเข้า Reassessment Triggers 7 ข้อ บันทึก Incident Log',
        details: [
          'Output O4.1: รายงานประเมินผลประจำปี',
          'Output O4.2: บันทึกการทบทวน AISIA/Risk ตาม Trigger',
          'Output O4.3: ทะเบียนเหตุการณ์ผิดปกติและบทเรียน (Incident & Lessons Learned Log)'
        ]
      }
    ]
  },
  {
    id: 'etda-job-redesign',
    title: 'AI Job Redesign Guideline',
    subtitle: 'การออกแบบงานเพื่อรองรับการทำงานร่วมกับเทคโนโลยี AI',
    source: 'สพธอ. (ETDA) / ศูนย์ธรรมาภิบาลปัญญาประดิษฐ์ (AIGC)',
    year: '2026 (Official Guideline)',
    keyHighlights: [
      'กรอบการออกแบบงาน 3 ระดับ: ระดับภาระงาน (Task Level), ระดับตำแหน่งงาน (Job Position Level) และระดับองค์กร (Organizational Level)',
      'การจัดหมวดหมู่ 16 ความสามารถของ AI ตามมาตรฐาน NIST AI Use Taxonomy',
      'กำหนดระดับการใช้ AI สำหรับการออกแบบงาน (AI Level 0 ถึง Level 5) ตั้งแต่คนทำ 100% จนถึงระบบอัตโนมัติเต็มรูปแบบ',
      'กรอบความร่วมมือ 3 รูปแบบ: Human-only, Augmentation (คนร่วม AI) และ Automation (AI ทำแทน)',
      'เมทริกซ์พัฒนาทักษะ AI 3 มิติ (Technical, Responsible/Ethical, Non-technical) สำหรับ Entry, Mid และ Managerial Level',
      'เครื่องมือ AI Use Case Canvas วิเคราะห์ Value vs Feasibility 4 ควอดรันต์'
    ],
    coreSections: [
      {
        sectionNum: '01',
        sectionTitle: 'บทนำและกรอบแนวคิด (Foundations & Conceptual Framework)',
        description: 'ความจำเป็นในการปรับเปลี่ยนโครงสร้างงาน และการยึดหลักคนเป็นศูนย์กลาง (Human-Centered AI)',
        details: [
          'Future of Jobs Report: การเปลี่ยนแปลงโครงสร้างการจ้างงาน 1 ใน 5 ของตำแหน่งงานในปัจจุบัน',
          'เป้าหมายไม่ใช่การลดคน แต่เป็นการยกระดับบทบาทงาน (Job Enrichment) และสร้างคุณค่าใหม่',
          'วงจรการออกแบบงาน: Input (AI Use Case) -> Process (Task Analysis, AI Level Review, Roles & Skills) -> Output (Human-AI Workflow, New JD, Skill Set)'
        ]
      },
      {
        sectionNum: '02',
        sectionTitle: 'การวิเคราะห์ภาระงาน (Task Analysis & NIST 16 Capabilities)',
        description: 'การแตกงานระดับย่อยและจับคู่กับความสามารถ AI',
        details: [
          'ระบุกระบวนการหลัก (Process) และกระบวนการย่อย (Sub-process)',
          'ระบุภาระงานปัจจุบัน (Task As-Is): ใคร ทำอะไร กับอะไร หรือกับใคร',
          'เลือกประเภทความสามารถ AI 16 ประเภทตาม NIST AI Use Taxonomy (สร้างเนื้อหา, สังเคราะห์, ตัดสินใจ, ตรวจจับ, วิเคราะห์ภาพ, คาดการณ์, ฯลฯ)',
          'กำหนดภาระงานใหม่ที่ทำงานร่วมกัน (Task To-Be)'
        ]
      },
      {
        sectionNum: '03',
        sectionTitle: 'ระดับการใช้ AI 6 ระดับ (AI Level 0 to 5 for Job Redesign)',
        description: 'การแบ่งขอบเขตหน้าที่ระหว่างคนและ AI อย่างเป็นรูปธรรม',
        details: [
          'Level 0 (No Automation): คนควบคุม 100% ไม่ใช้ระบบช่วย',
          'Level 1 (Assistance): AI ช่วยร่าง/แนะนำ คนควบคุมและลงมือเอง',
          'Level 2 (Partial Automation): AI ทำงานบางส่วน คนตรวจและกดยืนยัน (Sign-off) ทุกครั้ง',
          'Level 3 (Conditional Automation): AI ทำงานต่อเนื่อง คนเฝ้าระวัง Standby พร้อมเข้าควบคุมเมื่อผิดพลาด',
          'Level 4 (High Automation): AI ทำงานได้เองในกรอบ คนทำหน้าที่ Oversight ตรวจสอบคุณภาพเป็นรอบๆ',
          'Level 5 (Full Automation): AI ทำงานครบทุกขั้นตอน คนกำกับเชิงนโยบายและรับผิดชอบผลลัพธ์ (Accountability)'
        ]
      },
      {
        sectionNum: '04',
        sectionTitle: 'การปรับบทบาทหน้าที่และชุดทักษะ (Job Description & Skill Set)',
        description: 'การเขียน JD ใหม่ และแผน Upskill vs Reskill',
        details: [
          'การปรับปรุง Responsibilities & Duties: ระบุชัดเจนว่างานใด AI ทำ งานใดคนกำกับ/ตัดสินใจ',
          'Upskill: พัฒนาทักษะในสายงานเดิมเพื่อให้ทำงานเร็วขึ้น (เช่น Prompt Engineering)',
          'Reskill: เรียนรู้ทักษะใหม่เพื่อเปลี่ยนไปสู่บทบาทใหม่ (เช่น ตรวจสอบอคติ AI, กำกับ Data Governance)',
          'เกณฑ์ RACI สำหรับ 5 บทบาท: ผู้บริหาร (Executive), เจ้าของกระบวนการ (Process Owner), HR, IT, ผู้ปฏิบัติงาน (Operational Staff)'
        ]
      }
    ]
  },
  {
    id: 'etda-exec-2569',
    title: 'AI Governance Guideline for Executives',
    subtitle: 'แนวทางการประยุกต์ใช้ปัญญาประดิษฐ์อย่างมีธรรมาภิบาล สำหรับผู้บริหารองค์กร (ฉบับปรับปรุง 2569)',
    source: 'สพธอ. (ETDA) / ศูนย์ปฏิบัติการด้านธรรมาภิบาลปัญญาประดิษฐ์ (AIGPC)',
    year: '2569 (2026 Revised Edition)',
    keyHighlights: [
      'คู่มือฉบับปรับปรุง 2569 สำหรับผู้บริหารองค์กร เชื่อมโยง ISO/IEC 42001:2023, ISO 23894 และ NIST AI RMF',
      '3 องค์ประกอบหลัก: โครงสร้างกำกับดูแล (AI Structure), กลยุทธ์ประยุกต์ใช้ (AI Strategy) และการปฏิบัติการ (AI Operation)',
      'การจัดตั้งคณะกรรมการกำกับดูแลการประยุกต์ใช้ AI (AI Governance Council) และ RACI สองระดับ',
      'ระดับการมีส่วนร่วมของมนุษย์ (Level of Human Involvement): In-the-loop, Over-the-loop, Out-of-the-loop',
      'การกำกับวงจรชีวิต 7 ขั้นตอน (AI Lifecycle) และการรับผิดชอบต่อคู่สัญญาภายนอก (Vendor Accountability Clause)',
      'การให้บริการอย่างโปร่งใส: แจ้งเตือน In-app Notification, สิทธิ์ปิดระบบ AI Opt-out และช่องทางร้องเรียน'
    ],
    coreSections: [
      {
        sectionNum: '01',
        sectionTitle: 'โครงสร้างการกำกับดูแล (AI Governance Structure)',
        description: 'การจัดตั้ง AI Governance Council และการบูรณาการเข้ากับกลไกเดิมขององค์กร',
        details: [
          'หน้าที่หลักของสภา AI: กำหนดทิศทาง (Direction), เฝ้าติดตาม (Monitoring), ประเมินผล (Evaluation)',
          'โครงสร้าง 2 ระดับ: ระดับนโยบาย (Strategic Level) vs ระดับปฏิบัติการ (Implementation Level)',
          'บูรณาการร่วมกับ Ethics Board, Data Governance Council, GRC Committee',
          'การพัฒนาสมรรถนะบุคลากร (Competency Building) 3 ด้าน: ธุรกิจ, เทคโนโลยี และการกำกับดูแล'
        ]
      },
      {
        sectionNum: '02',
        sectionTitle: 'กลยุทธ์และการบริหารความเสี่ยง (AI Strategy & Risk Management)',
        description: 'การมองหาโอกาสอย่างมีความรับผิดชอบ และการคุมเสี่ยง 6 ขั้นตอนตาม ISO 23894',
        details: [
          'การกำหนดเป้าหมายตามลำดับความสำคัญและ Risk Appetite ขององค์กร',
          'การบริหารความเสี่ยง 6 ด้าน: คุณภาพข้อมูล, อคติ/เลือกปฏิบัติ, ภัยไซเบอร์ (Poisoning/Evasion Attacks), ความเป็นส่วนตัว (PDPA), กฎหมาย (Non-compliance), ชื่อเสียง/ความเชื่อมั่น',
          '3 ระดับ Human Involvement: In-the-loop (คนตัดสินใจ), Over-the-loop (คนคอยระงับ/แทรกแซง), Out-of-the-loop (อัตโนมัติ พร้อมช่องทางพนักงานสำรอง)'
        ]
      },
      {
        sectionNum: '03',
        sectionTitle: 'การกำกับดูแลตลอดวงจรชีวิต (AI Operation & Lifecycle)',
        description: '7 ขั้นตอนปฏิบัติการและการรักษาความปลอดภัย AI',
        details: [
          'วงจรชีวิต 7 ขั้นตอน: Solution Design -> Data Prep -> Model Building -> Deployment -> Monitoring -> Evaluation -> Retirement',
          '4 แนวทางการสร้างโมเดล: สร้างเองภายใน, Open-source, Pre-trained model, Off-the-shelf product',
          'Data Pipeline: Data Labelling, Provenance, Lineage, Anonymization ป้องกัน Data Breach',
          'การทดสอบโมเดล: Train-Validate-Test ด้วยข้อมูลที่ไม่เคยเห็น และทดสอบข้อยกเว้น (Exceptions/Robustness)',
          'การให้บริการ AI Service: ประกาศนโยบาย AI Usage Policy, แจ้งเตือนผู้ใช้ In-app, ฟังก์ชัน Opt-out ปิด AI, ช่องทาง Incident Management'
        ]
      }
    ]
  }
];
