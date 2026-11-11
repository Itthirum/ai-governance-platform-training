export interface UnacceptableRiskCheck {
  id: string;
  title: string;
  description: string;
  legalBasis: string;
}

export interface CoreRiskItem {
  id: string;
  dimensionId: number;
  dimensionName: string;
  title: string;
  description: string;
  impactText: string;
  example: string;
  isGenAiSpecific?: boolean;
}

export const unacceptableRiskChecks: UnacceptableRiskCheck[] = [
  {
    id: 'unacceptable_1',
    title: 'ขัดต่อกฎหมายและข้อกำหนดที่บัญญัติไว้ในประเทศไทย (Non-compliance)',
    description: 'ระบบ AI มีลักษณะการทำงานที่ขัดหรือฝ่าฝืนบทบัญญัติทางกฎหมายในไทย เช่น PDPA, พ.ร.บ.คอมพิวเตอร์ หรือกฎหมายเฉพาะอุตสาหกรรม',
    legalBasis: 'ร่าง พ.ร.บ. ปัญญาประดิษฐ์ มาตรา 33 และกฎหมายที่เกี่ยวข้อง',
  },
  {
    id: 'unacceptable_2',
    title: 'ขัดต่อข้อกำหนดในมาตรฐานอุตสาหกรรมและจริยธรรมขององค์กร',
    description: 'ระบบ AI มีความเสี่ยงที่จะขัดต่อเกณฑ์มาตรฐานความปลอดภัยหรือข้อกำหนดจริยธรรมที่องค์กรบังคับใช้',
    legalBasis: 'มาตรฐานอุตสาหกรรม & AI Ethics Policy',
  },
  {
    id: 'unacceptable_3',
    title: 'เทคนิคสื่อสารแฝงเร้นที่ส่งผลต่อการตัดสินใจโดยไม่รู้ตัว (Subliminal/Manipulative Techniques)',
    description: 'อาศัยเทคนิคสื่อสารแฝงเร้นหรือสิ่งเร้าแก่ผู้ใช้งานโดยที่จิตสำนึกไม่ทันรู้ตัว เพื่อบิดเบือนพฤติกรรมหรือการตัดสินใจ',
    legalBasis: 'ร่าง พ.ร.บ. ปัญญาประดิษฐ์ มาตรา 33 (1) / EU AI Act Prohibited List',
  },
  {
    id: 'unacceptable_4',
    title: 'การเลือกปฏิบัติโดยไม่เป็นธรรมต่อบุคคลในวงกว้างจากการประมวลผลข้อมูลจำนวนมาก (Unfair Discrimination at Scale)',
    description: 'ประมวลผลข้อมูลที่ไม่เกี่ยวข้องต่อการพิจารณาคุณสมบัติในการเข้าถึงสิทธิขั้นพื้นฐานโดยตรง ก่อให้เกิดการกีดกันหรือให้ผลร้ายแก่บุคคลในวงกว้าง',
    legalBasis: 'ร่าง พ.ร.บ. ปัญญาประดิษฐ์ มาตรา 33 (2)',
  },
];

export const coreRiskDimensions = [
  { id: 1, name: 'ด้านที่ 1: ข้อมูล (Data Quality & Model Fit)' },
  { id: 2, name: 'ด้านที่ 2: ความเป็นธรรมและการไม่เลือกปฏิบัติ (Fairness)' },
  { id: 3, name: 'ด้านที่ 3: ความมั่นคงปลอดภัยทางไซเบอร์ (Cyber Security)' },
  { id: 4, name: 'ด้านที่ 4: การคุ้มครองความเป็นส่วนตัวและสิทธิ (Privacy & Rights)' },
  { id: 5, name: 'ด้านที่ 5: ความน่าเชื่อถือและชื่อเสียง (Trust & Reputation)' },
  { id: 6, name: 'ด้านที่ 6: ความปลอดภัยต่อชีวิต ร่างกาย จิตใจ (Human Safety)' },
  { id: 7, name: 'ด้านที่ 7: ความเสี่ยงเฉพาะ Generative AI (NIST GenAI Profile)' },
];

export const coreRiskItems: CoreRiskItem[] = [
  // ด้านที่ 1: ข้อมูล
  {
    id: 'r_data_1',
    dimensionId: 1,
    dimensionName: 'ด้านที่ 1: ข้อมูล (Data Quality & Model Fit)',
    title: 'ข้อมูลมีคุณภาพต่ำ (Low Data Quality)',
    description: 'ข้อมูลมีความซ้ำซ้อน ขาดความแม่นยำ ล้าสมัย หรือไม่ครบถ้วน',
    impactText: 'ทำให้การประมวลผลและการตัดสินใจของ AI เกิดข้อผิดพลาด',
    example: 'นำข้อมูลประวัติการทำธุรกรรมเก่าเมื่อ 10 ปีที่แล้วมาใช้โดยไม่ทำความสะอาดข้อมูล',
  },
  {
    id: 'r_data_2',
    dimensionId: 1,
    dimensionName: 'ด้านที่ 1: ข้อมูล (Data Quality & Model Fit)',
    title: 'จำนวนข้อมูลไม่เพียงพอต่อการประมวลผล (Insufficient Data)',
    description: 'มีข้อมูลที่พร้อมใช้งานจำนวนน้อยเกินไปเมื่อเทียบกับเกณฑ์การเทรนโมเดล',
    impactText: 'ลดความถูกต้องและความแม่นยำของผลลัพธ์จาก AI',
    example: 'มีข้อมูลฝึกสอนเพียง 50 แถว ในขณะที่โมเดลต้องการอย่างน้อย 1,000 แถวเพื่อความเสถียร',
  },
  {
    id: 'r_data_3',
    dimensionId: 1,
    dimensionName: 'ด้านที่ 1: ข้อมูล (Data Quality & Model Fit)',
    title: 'โมเดลไม่เหมาะสมกับลักษณะข้อมูล (Underfitting/Overfitting)',
    description: 'เลือกใช้ อัลกอริทึม พื้นฐานเกินไปหรือไม่สอดคล้องกับความซับซ้อนของชุดข้อมูล',
    impactText: 'ผลลัพธ์ไม่ตอบโจทย์การใช้งานจริงในสภาวะแวดล้อมจริง',
    example: 'ใช้ Linear Regression กับข้อมูลที่มีความสัมพันธ์แบบ Non-linear ซับซ้อนสูง',
  },

  // ด้านที่ 2: ความเป็นธรรม
  {
    id: 'r_fair_1',
    dimensionId: 2,
    dimensionName: 'ด้านที่ 2: ความเป็นธรรมและการไม่เลือกปฏิบัติ (Fairness)',
    title: 'ข้อมูลสอน AI ขาดความหลากหลายหรือเอนเอียง (Biased Data)',
    description: 'ชุดข้อมูลขาดการกระจายตัวของกลุ่มประชากรที่ครอบคลุม',
    impactText: 'เกิดผลลัพธ์ที่เป็นอคติ ไม่เป็นธรรม หรือการเลือกปฏิบัติต่อกลุ่มบุคคล',
    example: 'ระบบตรวจจับใบหน้ามีข้อมูลฝึกสอนเป็นคนผิวขาวมากกว่าคนผิวสี',
  },
  {
    id: 'r_fair_2',
    dimensionId: 2,
    dimensionName: 'ด้านที่ 2: ความเป็นธรรมและการไม่เลือกปฏิบัติ (Fairness)',
    title: 'ขาดความตระหนักเรื่องการเลือกปฏิบัติของทีมพัฒนา (Unawareness)',
    description: 'ทีมผู้ออกแบบละเลยการตรวจสอบและปรับแก้ข้อมูลที่มีอคติ',
    impactText: 'เกิดอคติแฝงในขั้นตอนคัดเลือกคุณสมบัติ (Feature Selection) หรือการประเมิน',
    example: 'ทีมพัฒนาละเลยการคัดกรองคำเหยียดเชื้อชาติหรือเพศในชุดข้อมูลภาษา',
  },
  {
    id: 'r_fair_3',
    dimensionId: 2,
    dimensionName: 'ด้านที่ 2: ความเป็นธรรมและการไม่เลือกปฏิบัติ (Fairness)',
    title: 'ขาดการกำหนดระดับการมีส่วนร่วมของมนุษย์ (Lack of Human Oversight)',
    description: 'ไม่มีมาตรการให้มนุษย์รีวิวผลลัพธ์ที่กระทบสิทธิของบุคคล',
    impactText: 'ผู้ใช้งานพึ่งพาการตัดสินใจของ AI มากเกินไป (Overreliance) จนเกิดความเสียหาย',
    example: 'ให้ AI อนุมัติปฏิเสธสินเชื่อหรือคัดเลือกใบสมัครงานโดยไม่มีมนุษย์ตรวจสอบซ้ำ',
  },

  // ด้านที่ 3: ไซเบอร์
  {
    id: 'r_sec_1',
    dimensionId: 3,
    dimensionName: 'ด้านที่ 3: ความมั่นคงปลอดภัยทางไซเบอร์ (Cyber Security)',
    title: 'ระบบจัดเก็บข้อมูลมีช่องโหว่ (Vulnerable Data Storage)',
    description: 'ไม่มีการเข้ารหัสข้อมูล (Encryption) หรือสิทธิ์เข้าถึงไม่รัดกุม',
    impactText: 'เกิดการละเมิดข้อมูล (Data Breach) สูญหาย แก้ไข หรือรั่วไหล',
    example: 'ฐานข้อมูลฝึกสอนโมเดลเปิดรับ Public Access โดยไม่มี Authentication',
  },
  {
    id: 'r_sec_2',
    dimensionId: 3,
    dimensionName: 'ด้านที่ 3: ความมั่นคงปลอดภัยทางไซเบอร์ (Cyber Security)',
    title: 'ขาดกลไกป้องกันการโจมตีปั่นป่วนข้อมูล (Data Poisoning)',
    description: 'ผู้ไม่หวังดีป้อนข้อมูลลวงหรือขยะเข้าสู่กระบวนการฝึกสอน/ปรับแต่งโมเดล',
    impactText: 'โมเดลทำงานผิดพลาด สร้างประตูหลัง (Backdoor) หรือหยุุดทำงาน',
    example: 'แฮกเกอร์ส่งข้อมูลรีวิวหรือคำตอบปลอมจำนวนมากเพื่อให้ LLM จดจำข้อมูลผิดๆ',
  },
  {
    id: 'r_sec_3',
    dimensionId: 3,
    dimensionName: 'ด้านที่ 3: ความมั่นคงปลอดภัยทางไซเบอร์ (Cyber Security)',
    title: 'ขาดกลไกป้องกันการขโมยโมเดล (Model Extraction & Prompt Injection)',
    description: 'ผู้ไม่หวังดีป้อนคำสั่งล่อลวงเพื่อสกัดโครงสร้างโมเดล หรือลักลอบเปลี่ยนพฤติกรรม AI',
    impactText: 'สูญเสียทรัพย์สินทางปัญญา และระบบถูกชักจูงให้ทำตามคำสั่งอันตราย',
    example: 'การโจมตี Prompt Injection เพื่อbypass ข้อจำกัดความปลอดภัยของ Chatbot',
  },

  // ด้านที่ 4: ความเป็นส่วนตัว
  {
    id: 'r_priv_1',
    dimensionId: 4,
    dimensionName: 'ด้านที่ 4: การคุ้มครองความเป็นส่วนตัวและสิทธิ (Privacy & Rights)',
    title: 'ข้อมูลส่วนบุคคลถูกใช้เกินความจำเป็น (Data Misuse)',
    description: 'มีการเก็บรวบรวมข้อมูลส่วนบุคคลหรือข้อมูลตำแหน่งเกินขอบเขตที่สอดคล้องกับวัตถุประสงค์',
    impactText: 'ละเมิดสิทธิและเสรีภาพของเจ้าของข้อมูลตาม PDPA',
    example: 'แอปวิเคราะห์พฤติกรรมลูกค้าแอบเก็บข้อมูลพิกัด GPS แม่นยำตลอด 24 ชั่วโมง',
  },
  {
    id: 'r_priv_2',
    dimensionId: 4,
    dimensionName: 'ด้านที่ 4: การคุ้มครองความเป็นส่วนตัวและสิทธิ (Privacy & Rights)',
    title: 'ใช้ข้อมูลส่วนบุคคลโดยปราศจากความยินยอม/ฐานทางกฎหมาย (Lack of Lawful Basis)',
    description: 'นำข้อมูลเสียง ภาพ หรือเอกสารส่วนบุคคลไปใช้ประมวลผลโดยไม่มีฐาน Consent/Public Interest/Legitimate Interest',
    impactText: 'ผิดกฎหมาย PDPA และสุ่มเสี่ยงต่อการถูกร้องเรียนและโทษปรับทางปกครอง',
    example: 'นำบทสนทนาเสียงของลูกค้ากับ Call Center ไปฝึกสอนโมเดลสาธารณะโดยไม่แจ้ง',
  },

  // ด้านที่ 5: ชื่อเสียง
  {
    id: 'r_trust_1',
    dimensionId: 5,
    dimensionName: 'ด้านที่ 5: ความน่าเชื่อถือและชื่อเสียง (Trust & Reputation)',
    title: 'AI แสดงผลลัพธ์ที่ไม่น่าเชื่อถือหรือให้ข้อมูลผิดพลาด (Hallucination)',
    description: 'AI ให้คำตอบที่ดูสมเหตุสมผลแต่นำเสนอข้อเท็จจริงเท็จ หรืออ้างอิงข้อมูลที่ไม่มีจริง',
    impactText: 'ผู้ใช้ตัดสินใจผิดพลาด องค์กรเสียชื่อเสียง และเกิดความไม่ไว้วางใจ',
    example: 'Chatbot บริการลูกค้าอ้างนโยบายส่วนลดที่ไม่มีอยู่จริงจนเกิดคดีฟ้องร้อง',
  },
  {
    id: 'r_trust_2',
    dimensionId: 5,
    dimensionName: 'ด้านที่ 5: ความน่าเชื่อถือและชื่อเสียง (Trust & Reputation)',
    title: 'ขาดความสามารถในการอธิบายการทำงาน (Lack of Explainability / Black Box)',
    description: 'กลไกและปัจจัยที่ AI ใช้ตัดสินใจมีความซับซ้อนจนผู้พัฒนาไม่สามารถอธิบายเหตุผลได้',
    impactText: 'เกิดปัญหาความโปร่งใส สื่อสารต่อผู้มีส่วนได้เสียไม่ได้เมื่อเกิดข้อร้องเรียน',
    example: 'AI ประเมินผลงานพนักงานให้คะแนนต่ำโดยไม่อาจระบุสาเหตุเชิงดัชนีชี้วัดได้',
  },

  // ด้านที่ 6: ความปลอดภัยต่อชีวิต
  {
    id: 'r_safe_1',
    dimensionId: 6,
    dimensionName: 'ด้านที่ 6: ความปลอดภัยต่อชีวิต ร่างกาย จิตใจ (Human Safety)',
    title: 'ขาดกระบวนการทดสอบความปลอดภัยเข้มงวด (Rigorous Testing Deficit)',
    description: 'ไม่มีการทดสอบข้อมูลกรณีขอบเขตวิกฤต (Edge cases / Exception testing)',
    impactText: 'เกิดข้อผิดพลาดรุนแรงส่งผลกระทบต่อชีวิต ร่างกาย สุขภาพ หรือจิตใจ',
    example: 'กล้อง AI ยานยนต์ไร้คนขับไม่สแกนสัตวเลี้ยงหรือป้ายหยุดในสภาวะหมอกหนา',
  },

  // ด้านที่ 7: Generative AI Specific (NIST GenAI Profile)
  {
    id: 'r_gen_1',
    dimensionId: 7,
    dimensionName: 'ด้านที่ 7: ความเสี่ยงเฉพาะ Generative AI (NIST GenAI Profile)',
    title: 'เนื้อหาละเมิดลิขสิทธิ์และทรัพย์สินทางปัญญา (IP Infringement)',
    description: ' GenAI สกัดหรือสร้างเนื้อหา/ภาพ/โค้ดที่คล้ายคลึงกับผลงานมีลิขสิทธิ์โดยไม่ได้รับอนุญาต',
    impactText: 'สุ่มเสี่ยงการถูกฟ้องร้องละเมิดลิขสิทธิ์ ละเมิดเครื่องหมายการค้า',
    example: 'GenAI สื่อการตลาดสร้างโลโก้หรือตัวละครที่ดัดแปลงมาจากแบรนด์อื่น',
    isGenAiSpecific: true,
  },
  {
    id: 'r_gen_2',
    dimensionId: 7,
    dimensionName: 'ด้านที่ 7: ความเสี่ยงเฉพาะ Generative AI (NIST GenAI Profile)',
    title: 'เนื้อหาบิดเบือน / ข่าวปลอม (Misinformation / Disinformation / Deepfake)',
    description: 'การนำ GenAI ไปสร้างภาพ สื่อ หรือข้อความหลอกลวงที่แนบเนียน',
    impactText: 'ทำลายความน่าเชื่อถือ สื่อสารบิดเบือน และอาจผิดกฎหมายความโปร่งใส ม.43-47',
    example: 'ปลอมแปลงภาพ/เสียงผู้บริหารเพื่อสั่งโอนเงินหรือให้ข่าวเท็จแก่สื่อ',
    isGenAiSpecific: true,
  },
];

export function calculateRiskLevel(likelihood: number, severity: number): 'Level I' | 'Level II' | 'Level III' | 'Level IV' {
  const score = likelihood * severity; // Range 1 to 25
  if (score >= 15) return 'Level IV'; // High / Critical
  if (score >= 10) return 'Level III'; // Moderate
  if (score >= 5) return 'Level II'; // Low
  return 'Level I'; // Minimal
}
