import { ReadinessQuestion } from '../types';

export const readinessPillars = [
  { id: 1, name: 'Pillar 1: ด้านยุทธศาสตร์และความสามารถองค์กร', shortName: 'Strategy & Capability' },
  { id: 2, name: 'Pillar 2: ด้านบุคลากร', shortName: 'People & Talent' },
  { id: 3, name: 'Pillar 3: ด้านข้อมูล', shortName: 'Data Foundation' },
  { id: 4, name: 'Pillar 4: ด้านโครงสร้างพื้นฐานสารสนเทศ', shortName: 'AI/IT Infrastructure' },
  { id: 5, name: 'Pillar 5: ด้านธรรมาภิบาล', shortName: 'Governance & Risk' },
];

export const readinessQuestions: ReadinessQuestion[] = [
  {
    id: 1,
    pillarId: 1,
    pillar: 'ด้านยุทธศาสตร์และความสามารถองค์กร',
    title: 'การสนับสนุนจากผู้บริหารระดับสูง (Management Support)',
    description: 'องค์กรของท่านมีความสนใจและได้รับการสนับสนุนด้านทรัพยากรจากระดับบริหาร รวมถึงมีแผนปฏิบัติงานในการประยุกต์ใช้ AI (AI Roadmap) หรือไม่',
    note: 'การสนับสนุนด้านทรัพยากร เช่น บุคลากร งบประมาณ | AI Roadmap คือแผนปฏิบัติงานที่กำหนดขั้นตอนดำเนินงานเพื่อบรรลุเป้าหมาย',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'ยังไม่มีความสนใจในการนำ AI มาประยุกต์ใช้ในองค์กร' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'มีความสนใจในการนำ AI มาประยุกต์ใช้ แต่ยังไม่มีหรือจำกัดการสนับสนุนด้านทรัพยากรจากระดับบริหาร' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'มีการสนับสนุนด้านทรัพยากรจากระดับบริหาร แต่ยังไม่มีแผนปฏิบัติงาน (AI Roadmap) ที่ชัดเจน' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'มีการสนับสนุนด้านทรัพยากรจากระดับบริหาร และมีแผนปฏิบัติงานในการประยุกต์ใช้ AI (AI Roadmap) ที่ชัดเจน' },
    ],
  },
  {
    id: 2,
    pillarId: 1,
    pillar: 'ด้านยุทธศาสตร์และความสามารถองค์กร',
    title: 'การยอมรับจากบุคลากรในองค์กร (Employee Acceptance of AI)',
    description: 'พนักงานในองค์กรของท่านยอมรับและมีความเชื่อมั่นในการใช้งานระบบที่ประยุกต์ใช้ AI (AI-based System) หรือไม่',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'พนักงานในองค์กรมีความกังวลต่อการใช้งานระบบที่ประยุกต์ใช้ AI' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'พนักงานในองค์กรใช้งานระบบ AI แต่ยังไม่เชื่อมั่นในผลลัพธ์ที่เกิดขึ้น' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'พนักงานในองค์กรใช้งานระบบ AI และเชื่อมั่นในผลลัพธ์ที่เกิดขึ้น' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'พนักงานในองค์กรใช้งานระบบ AI และเชื่อมั่นในผลลัพธ์ พร้อมทั้งเข้าใจวิธีการใช้งานอย่างมีประสิทธิภาพ' },
    ],
  },
  {
    id: 3,
    pillarId: 1,
    pillar: 'ด้านยุทธศาสตร์และความสามารถองค์กร',
    title: 'วัฒนธรรมการทดลอง (Experimentation Culture)',
    description: 'องค์กรของท่านมีวัฒนธรรมของการทดลองและสร้างสรรค์สิ่งใหม่ เพื่อรองรับการนำ AI มาประยุกต์ใช้งานหรือไม่',
    note: 'Experimentation Culture คือแนวคิดที่ส่งเสริมให้เกิดนวัตกรรมอย่างต่อเนื่อง ผ่านการทดสอบแนวคิดใหม่ๆ อย่างเป็นระบบ',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'องค์กรยังไม่สามารถยอมรับได้ หากการนำ AI มาประยุกต์ใช้ไม่บรรลุตามเป้าหมาย' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'องค์กรยอมรับการใช้งานเฉพาะ AI ที่ผ่านการทดสอบแล้วว่ามีประสิทธิภาพและเชื่อถือได้เท่านั้น' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'องค์กรเข้าใจว่าความสำเร็จของการทำ AI Transformation จำเป็นต้องผ่านกระบวนการทดลองซึ่งอาจไม่บรรลุเป้าหมายได้' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'องค์กรสนับสนุนให้บุคลากรมองหาโอกาสเพื่อทดลองนำ AI มาประยุกต์ใช้ในการทำงานอย่างจริงจัง' },
    ],
  },
  {
    id: 4,
    pillarId: 1,
    pillar: 'ด้านยุทธศาสตร์และความสามารถองค์กร',
    title: 'กรณีการใช้งานทางธุรกิจ (Business Use Case)',
    description: 'องค์กรของท่านมีการวางแผน หรือกำหนดเป้าหมายของการนำ AI ไปประยุกต์ใช้งาน (Use Case) เพื่อสร้างคุณค่าทางธุรกิจหรือไม่',
    note: 'คุณค่าทางธุรกิจครอบคลุมทั้ง Tangible Benefits (รายได้เพิ่ม/ต้นทุนลด) และ Intangible Benefits (ภาพลักษณ์องค์กร)',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'องค์กรยังไม่มีการวางแผน หรือกำหนดเป้าหมายของการนำ AI ไปประยุกต์ใช้งาน (Use Case)' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'มีการวางแผนหรือกำหนดเป้าหมาย Use Case แต่ยังไม่เริ่มดำเนินการนำ AI ไปประยุกต์ใช้' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'เริ่มดำเนินการนำ AI ไปประยุกต์ใช้แล้ว แต่ยังไม่สามารถสร้างคุณค่าทางธุรกิจจาก Use Case นั้นได้' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'เริ่มดำเนินการนำ AI ไปประยุกต์ใช้แล้ว และสามารถสร้างคุณค่าทางธุรกิจจาก Use Case นั้นได้อย่างเป็นรูปธรรม' },
    ],
  },
  {
    id: 5,
    pillarId: 2,
    pillar: 'ด้านบุคลากร',
    title: 'ทักษะและความเข้าใจด้าน AI (AI Literacy)',
    description: 'พนักงานในองค์กรมีทักษะและความเข้าใจพื้นฐานด้าน AI (AI Literacy) เพียงใด',
    note: 'AI Literacy หมายถึง พนักงานมีความรู้พื้นฐาน เข้าใจความสามารถและข้อจำกัดของเทคโนโลยี AI และใช้งานได้ดี',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'ประมาณไม่เกินร้อยละ 25 ของพนักงาน มีทักษะและความเข้าใจด้าน AI' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'ประมาณร้อยละ 25 - 50 ของพนักงาน มีทักษะและความเข้าใจด้าน AI' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'ประมาณร้อยละ 50 - 75 ของพนักงาน มีทักษะและความเข้าใจด้าน AI' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'มากกว่าร้อยละ 75 ของพนักงาน มีทักษะและความเข้าใจด้าน AI' },
    ],
  },
  {
    id: 6,
    pillarId: 2,
    pillar: 'ด้านบุคลากร',
    title: 'ผู้เชี่ยวชาญด้าน AI (AI Talent)',
    description: 'องค์กรของท่านมีผู้เชี่ยวชาญหรือผู้มีทักษะด้าน AI หรือไม่ อย่างไร',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'ไม่มีผู้เชี่ยวชาญหรือผู้มีทักษะด้าน AI ภายในองค์กร' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'มีทักษะเบื้องต้น เช่น เลือกใช้ AI สำเร็จรูป หรือใช้ No-Code/Low-Code Platform เพื่อทำ PoC' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'มีผู้เชี่ยวชาญระดับกลาง เช่น สามารถเขียนโปรแกรมใช้งานโมเดล AI หรือเรียกใช้ API ได้' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'มีผู้เชี่ยวชาญระดับสูง เช่น สามารถเขียนโปรแกรมพัฒนาและเทรนโมเดล AI เองได้' },
    ],
  },
  {
    id: 7,
    pillarId: 3,
    pillar: 'ด้านข้อมูล',
    title: 'คุณภาพข้อมูล (Data Quality)',
    description: 'องค์กรของท่านมีมาตรการในการควบคุมคุณภาพของข้อมูลที่ใช้งานร่วมกับ AI หรือไม่',
    note: 'ตัวอย่างคุณภาพข้อมูล: Accuracy, Completeness, Relevancy, Standard Format และ Timeliness',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'องค์กรยังไม่มีพนักงานที่รับผิดชอบในการดูแลและบริหารจัดการคุณภาพของข้อมูลที่ใช้กับ AI' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'มีพนักงานที่มีหน้าที่รับผิดชอบอย่างไม่เป็นทางการ ในการดูแลคุณภาพข้อมูลที่ใช้กับ AI' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'มีพนักงานที่มีหน้าที่รับผิดชอบอย่างเป็นทางการ ในการดูแลคุณภาพข้อมูลที่ใช้กับ AI' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'มีพนักงานรับผิดชอบเป็นทางการ พร้อมทั้งมีนโยบายและกระบวนการจัดการคุณภาพข้อมูลอย่างเป็นระบบ' },
    ],
  },
  {
    id: 8,
    pillarId: 3,
    pillar: 'ด้านข้อมูล',
    title: 'ข้อมูลอ้างอิง (Reference Data / Single Source of Truth)',
    description: 'องค์กรของท่านมีการรวบรวมข้อมูลจากแหล่งต่างๆ เพื่อเป็นแหล่งข้อมูลเดียวที่ถูกต้องน่าเชื่อถือ (Single Source of Truth) หรือไม่',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'องค์กรยังไม่มี Single Source of Truth สำหรับใช้งานร่วมกับ AI' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'ตระหนักถึงความสำคัญ แต่ยังไม่มี Single Source of Truth ที่พร้อมใช้' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'มี Single Source of Truth ในรูปแบบมาตรฐาน แต่จำกัดการใช้งานเฉพาะบางโครงการ' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'มี Single Source of Truth รองรับการใช้งานทั้งองค์กร พร้อม Data Catalog และ Metadata ที่เป็นปัจจุบัน' },
    ],
  },
  {
    id: 9,
    pillarId: 4,
    pillar: 'ด้านโครงสร้างพื้นฐานสารสนเทศ',
    title: 'โครงสร้างพื้นฐานด้าน AI (AI Infrastructure)',
    description: 'องค์กรของท่านมีโครงสร้างพื้นฐานด้าน AI ที่เหมาะสม เพื่อรองรับการพัฒนา (Development) และการใช้งาน (Deployment) หรือไม่',
    note: 'โครงสร้างพื้นฐาน เช่น GPU Server, Cloud AI Services, On-premise Infrastructure',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'ยังไม่มีโครงสร้างพื้นฐานด้าน AI เพื่อรองรับการพัฒนาและการนำ AI ไปประยุกต์ใช้' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'ตระหนักถึงความสำคัญ แต่ยังไม่มีโครงสร้างพื้นฐานพร้อมใช้งาน' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'มีโครงสร้างพื้นฐานด้าน AI แต่ยังจำกัดการใช้งานเฉพาะบางโครงการหรือบางแผนก' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'มีโครงสร้างพื้นฐานด้าน AI ที่รองรับการใช้งานพัฒนาและเผยแพร่ในทุกโครงการทั่วทั้งองค์กร' },
    ],
  },
  {
    id: 10,
    pillarId: 4,
    pillar: 'ด้านโครงสร้างพื้นฐานสารสนเทศ',
    title: 'โครงสร้างพื้นฐานด้านข้อมูล (Data Infrastructure)',
    description: 'องค์กรของท่านมีโครงสร้างพื้นฐานสำหรับจัดเก็บข้อมูลส่วนกลาง (Central Repository) เพื่อใช้งานร่วมกับ AI หรือไม่',
    note: 'Central Repository เช่น Relational Database, Data Warehouse (Structured), Data Lake (Multi-format)',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'ข้อมูลส่วนใหญ่ขององค์กรยังไม่มีการจัดเก็บในรูปแบบดิจิทัล (Non-digital)' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'จัดเก็บในรูปแบบดิจิทัล แต่กระจายตัวแบบ Standalone (เช่น ไฟล์ Excel ในโฟลเดอร์ส่วนตัว)' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'จัดเก็บร่วมกันที่ส่วนกลางสำหรับบางโครงการ โดยใช้ Relational Database หรือ Data Warehouse' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'จัดเก็บส่วนกลางด้วยเทคโนโลยีที่รองรับหลากหลาย (Database, Data Warehouse, Data Lake) พร้อม Data Dictionary' },
    ],
  },
  {
    id: 11,
    pillarId: 5,
    pillar: 'ด้านธรรมาภิบาล',
    title: 'การกำกับดูแลการประยุกต์ใช้ AI (AI Governance)',
    description: 'องค์กรมีการกำกับดูแลเพื่อให้การประยุกต์ใช้ AI สอดคล้องตามหลักจริยธรรม (AI Ethics Principles) และป้องกันผลกระทบเชิงลบหรือไม่',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'องค์กรยังไม่มีการกำกับดูแลการประยุกต์ใช้ AI ภายในองค์กร' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'ตระหนักถึงความสำคัญ แต่ยังไม่มีการกำกับดูแลการประยุกต์ใช้ AI ภายในองค์กร' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'มีการกำกับดูแลการประยุกต์ใช้ AI แต่ยังไม่มีการกำหนดแนวทางหรือนโยบายอย่างเป็นทางการ' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'มีการกำกับดูแลการประยุกต์ใช้ AI พร้อมทั้งมีการจัดทำนโยบายและแนวปฏิบัติกำกับดูแลอย่างเป็นทางการ' },
    ],
  },
  {
    id: 12,
    pillarId: 5,
    pillar: 'ด้านธรรมาภิบาล',
    title: 'การควบคุมความเสี่ยงจาก AI (AI Risk Control)',
    description: 'องค์กรมีวิธีการประเมินและควบคุมความเสี่ยงจากการประยุกต์ใช้ AI เพื่อป้องกันไม่ให้เกิดผลกระทบโดยไม่ได้ตั้งใจหรือไม่',
    options: [
      { label: 'ตัวเลือกที่ 1', score: 1, text: 'องค์กรยังไม่มีการประเมินและควบคุมความเสี่ยงจากการประยุกต์ใช้ AI' },
      { label: 'ตัวเลือกที่ 2', score: 2, text: 'ตระหนักถึงความสำคัญ แต่ยังไม่มีวิธีการประเมินและควบคุมความเสี่ยงจากการประยุกต์ใช้ AI' },
      { label: 'ตัวเลือกที่ 3', score: 3, text: 'มีวิธีการประเมินและควบคุมความเสี่ยง แต่ยังไม่มีมาตรการหรือแนวทางใช้ร่วมกันภายในองค์กร' },
      { label: 'ตัวเลือกที่ 4', score: 4, text: 'มีวิธีการประเมินและควบคุมความเสี่ยง และมีการกำหนดมาตรการ/แนวทางประเมินความเสี่ยงที่ใช้ร่วมกันทั้งองค์กร' },
    ],
  },
];

export function calculateReadinessScore(answers: Record<number, number>) {
  const totalQuestions = readinessQuestions.length;
  let totalScore = 0;
  let answeredCount = 0;

  const pillarScores: Record<number, { score: number; max: number; count: number }> = {
    1: { score: 0, max: 16, count: 0 },
    2: { score: 0, max: 8, count: 0 },
    3: { score: 0, max: 8, count: 0 },
    4: { score: 0, max: 8, count: 0 },
    5: { score: 0, max: 8, count: 0 },
  };

  readinessQuestions.forEach((q) => {
    const score = answers[q.id] || 0;
    if (score > 0) {
      answeredCount++;
      totalScore += score;
      pillarScores[q.pillarId].score += score;
      pillarScores[q.pillarId].count += 1;
    }
  });

  const maxTotalScore = totalQuestions * 4;
  const percentage = Math.round((totalScore / maxTotalScore) * 100);

  let maturityLevel = 'AI Unaware';
  let levelColor = 'text-red-700 bg-red-100 border-red-800';
  if (percentage >= 80) {
    maturityLevel = 'AI Competent / Leader';
    levelColor = 'text-emerald-800 bg-emerald-100 border-emerald-800';
  } else if (percentage >= 60) {
    maturityLevel = 'AI Ready / Practitioner';
    levelColor = 'text-blue-800 bg-blue-100 border-blue-800';
  } else if (percentage >= 40) {
    maturityLevel = 'AI Aware / Explorer';
    levelColor = 'text-amber-800 bg-amber-100 border-amber-800';
  }

  return {
    totalScore,
    maxTotalScore,
    percentage,
    answeredCount,
    totalQuestions,
    maturityLevel,
    levelColor,
    pillarScores,
  };
}
