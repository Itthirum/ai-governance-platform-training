export interface UseCaseEvaluationItem {
  id: string;
  category: 'value' | 'feasibility';
  dimension: string;
  title: string;
  description: string;
  options: { label: string; score: number }[];
}

export const useCaseQuestions: UseCaseEvaluationItem[] = [
  // VALUE DIMENSIONS
  {
    id: 'val_1',
    category: 'value',
    dimension: 'Customer & Revenue Growth',
    title: '1. การเพิ่มขึ้นของรายได้ (Revenue Growth)',
    description: 'การนำ AI Use Case มาใช้งานส่งผลต่อการเพิ่มขึ้นของรายได้มากน้อยเพียงใด',
    options: [
      { label: 'ไม่ก่อให้เกิดรายได้เพิ่มเติม (0% ต่อปี)', score: 1 },
      { label: 'สร้างรายได้เพิ่มขึ้นเล็กน้อย (0-5% ต่อปี)', score: 2 },
      { label: 'สร้างรายได้เพิ่มขึ้นปานกลาง (5-20% ต่อปี)', score: 3 },
      { label: 'สร้างรายได้เพิ่มขึ้นอย่างมีนัยสำคัญ (20-100% ต่อปี)', score: 4 },
      { label: 'รายได้รวมเพิ่มขึ้นแบบทวีคูณ (มากกว่า 100% ต่อปี)', score: 5 },
    ],
  },
  {
    id: 'val_2',
    category: 'value',
    dimension: 'Customer & Revenue Growth',
    title: '2. การขยายฐานลูกค้าใหม่ (Customer Acquisition)',
    description: 'การนำ AI Use Case มาใช้งานส่งผลต่อการขยายฐานลูกค้าใหม่ขององค์กรมากน้อยเพียงใด',
    options: [
      { label: 'ไม่ส่งผลต่อการขยายฐานลูกค้าใหม่ (0% ต่อปี)', score: 1 },
      { label: 'ฐานลูกค้าเพิ่มขึ้นเล็กน้อย (0-5% ต่อปี)', score: 2 },
      { label: 'ฐานลูกค้าเพิ่มขึ้นปานกลาง (5-20% ต่อปี)', score: 3 },
      { label: 'ฐานลูกค้าเพิ่มขึ้นอย่างมีนัยสำคัญ (20-100% ต่อปี)', score: 4 },
      { label: 'ฐานลูกค้าเพิ่มขึ้นแบบทวีคูณ (มากกว่า 100% ต่อปี)', score: 5 },
    ],
  },
  {
    id: 'val_3',
    category: 'value',
    dimension: 'Operational Efficiency',
    title: '3. การลดต้นทุนและเวลาดำเนินงาน (Cost & Time Savings)',
    description: 'การนำ AI Use Case มาใช้งานส่งผลต่อการลดต้นทุนและเวลาในกระบวนการทำงานมากน้อยเพียงใด',
    options: [
      { label: 'ไม่ส่งผลต่อการลดต้นทุน (0% ต่อปี)', score: 1 },
      { label: 'ต้นทุนลดลงเล็กน้อย (0-5% ต่อปี)', score: 2 },
      { label: 'ต้นทุนลดลงปานกลาง (5-10% ต่อปี)', score: 3 },
      { label: 'ต้นทุนลดลงค่อนข้างมาก (10-25% ต่อปี)', score: 4 },
      { label: 'ต้นทุนลดลงอย่างมาก (มากกว่า 25% ต่อปี)', score: 5 },
    ],
  },
  {
    id: 'val_4',
    category: 'value',
    dimension: 'Operational Efficiency',
    title: '4. การลดอัตราความผิดพลาด (Error Reduction)',
    description: 'การนำ AI Use Case มาใช้งานส่งผลต่อการลดเปอร์เซ็นต์ความคลาดเคลื่อนในกระบวนการมากน้อยเพียงใด',
    options: [
      { label: 'ไม่ส่งผลต่อการลดความผิดพลาด (0% ต่อปี)', score: 1 },
      { label: 'ความคลาดเคลื่อนลดลงเล็กน้อย (0-2% ต่อปี)', score: 2 },
      { label: 'ความคลาดเคลื่อนลดลงปานกลาง (2-5% ต่อปี)', score: 3 },
      { label: 'ความคลาดเคลื่อนลดลงมาก (5-10% ต่อปี)', score: 4 },
      { label: 'ความคลาดเคลื่อนลดลงมากที่สุด (มากกว่า 10% ต่อปี)', score: 5 },
    ],
  },
  {
    id: 'val_5',
    category: 'value',
    dimension: 'Innovation & Brand',
    title: '5. ความผูกพันในแบรนด์และความพึงพอใจ (Brand Loyalty & Satisfaction)',
    description: 'ส่งผลต่อระดับความจงรักภักดีและความพึงพอใจของลูกค้ามากน้อยเพียงใด',
    options: [
      { label: 'ไม่ส่งผลให้เพิ่มขึ้น', score: 1 },
      { label: 'เพิ่มขึ้นเล็กน้อย', score: 2 },
      { label: 'เพิ่มขึ้นปานกลาง', score: 3 },
      { label: 'เพิ่มขึ้นมาก', score: 4 },
      { label: 'เพิ่มขึ้นมากที่สุด', score: 5 },
    ],
  },
  {
    id: 'val_6',
    category: 'value',
    dimension: 'Innovation & Brand',
    title: '6. ความสามารถในการแข่งขัน (Competitive Advantage)',
    description: 'ส่งผลต่อความสามารถในการแข่งขันของสินค้า/บริการในตลาดมากน้อยเพียงใด',
    options: [
      { label: 'ไม่ส่งผลต่อการแข่งขัน', score: 1 },
      { label: 'เพิ่มความสามารถในการแข่งขันเล็กน้อย', score: 2 },
      { label: 'เพิ่มความสามารถในการแข่งขันปานกลาง', score: 3 },
      { label: 'เพิ่มความสามารถในการแข่งขันมาก', score: 4 },
      { label: 'เพิ่มความสามารถในการแข่งขันมากที่สุด (เป็นผู้นำตลาด)', score: 5 },
    ],
  },

  // FEASIBILITY DIMENSIONS
  {
    id: 'feas_1',
    category: 'feasibility',
    dimension: 'Data Feasibility',
    title: '1. ความพร้อมด้านข้อมูล (Data Readiness)',
    description: 'องค์กรมีความพร้อมของชุดข้อมูลในการพัฒนา Use Case นี้มากน้อยเพียงใด',
    options: [
      { label: 'ไม่มีข้อมูลเลย', score: 1 },
      { label: 'มีข้อมูล แต่ข้อมูลไม่มีคุณภาพ', score: 2 },
      { label: 'มีข้อมูล และข้อมูลบางส่วนมีคุณภาพ', score: 3 },
      { label: 'มีข้อมูล และข้อมูลส่วนมากมีคุณภาพ', score: 4 },
      { label: 'มีข้อมูล และข้อมูลทั้งหมดมีคุณภาพพร้อมใช้', score: 5 },
    ],
  },
  {
    id: 'feas_2',
    category: 'feasibility',
    dimension: 'Data Privacy & Risk',
    title: '2. ระดับความเสี่ยงด้านข้อมูลส่วนบุคคล (Data Privacy Level)',
    description: 'จำเป็นต้องอาศัยข้อมูลส่วนบุคคล (PII) หรือข้อมูลอ่อนไหว (Sensitive Data) มากน้อยเพียงใด',
    options: [
      { label: 'ใช่ 100% เป็นข้อมูลส่วนบุคคล/อ่อนไหว (เสี่ยงสูงสุด)', score: 1 },
      { label: 'ใช่ 75% เป็นข้อมูลส่วนบุคคล/อ่อนไหว', score: 2 },
      { label: 'ใช่ 50% เป็นข้อมูลส่วนบุคคล/อ่อนไหว', score: 3 },
      { label: 'ใช่ 25% เป็นข้อมูลส่วนบุคคล/อ่อนไหว', score: 4 },
      { label: 'ไม่จำเป็นต้องใช้ข้อมูลส่วนบุคคลหรือข้อมูลอ่อนไหวเลย', score: 5 },
    ],
  },
  {
    id: 'feas_3',
    category: 'feasibility',
    dimension: 'Tech & Infrastructure',
    title: '3. ความเพียงพอของโครงสร้างพื้นฐาน (IT/AI Infrastructure)',
    description: 'องค์กรมีฮาร์ดแวร์ ซอฟต์แวร์ คลาวด์ และเครื่องมือ AI เพียงพอในการพัฒนาและติดตั้งหรือไม่',
    options: [
      { label: 'ไม่มีโครงสร้างพื้นฐานรองรับเลย', score: 1 },
      { label: 'มีโครงสร้างพื้นฐาน แต่รองรับได้น้อยกว่า 25%', score: 2 },
      { label: 'มีโครงสร้างพื้นฐาน และเพียงพอสำหรับการพัฒนาบางส่วน (50%)', score: 3 },
      { label: 'มีโครงสร้างพื้นฐาน เพียงพอเกือบทั้งหมด (75%)', score: 4 },
      { label: 'มีโครงสร้างพื้นฐาน และเพียงพอสำหรับการพัฒนาเต็มรูปแบบ (100%)', score: 5 },
    ],
  },
  {
    id: 'feas_4',
    category: 'feasibility',
    dimension: 'Process Change Ease',
    title: '4. ความง่ายในการปรับเปลี่ยนกระบวนการทำงาน (Process Adaptability)',
    description: 'กระบวนงานเดิมสามารถปรับเปลี่ยนเพื่อรองรับระบบ AI ได้ง่ายเพียงใด',
    options: [
      { label: 'ไม่สามารถเปลี่ยนแปลงกระบวนการทำงานได้เลย', score: 1 },
      { label: 'สามารถเปลี่ยนแปลงกระบวนการทำงานได้ยากมาก', score: 2 },
      { label: 'สามารถเปลี่ยนแปลงกระบวนการทำงานได้ง่ายปานกลาง', score: 3 },
      { label: 'สามารถเปลี่ยนแปลงกระบวนการทำงานได้ค่อนข้างง่าย', score: 4 },
      { label: 'สามารถเปลี่ยนแปลงกระบวนการทำงานได้ง่ายที่สุด', score: 5 },
    ],
  },
  {
    id: 'feas_5',
    category: 'feasibility',
    dimension: 'Organizational Culture',
    title: '5. ความเต็มใจในการยอมรับการเปลี่ยนแปลง (Change Acceptance)',
    description: 'บุคลากรในองค์กรมีความเต็มใจและพร้อมยอมรับการใช้งาน AI มากน้อยเพียงใด',
    options: [
      { label: 'บุคลากรเกือบทั้งหมดไม่มีความเต็มใจยอมรับการเปลี่ยนแปลง', score: 1 },
      { label: 'บุคลากรส่วนน้อยมีความเต็มใจยอมรับการเปลี่ยนแปลง', score: 2 },
      { label: 'บุคลากรบางกลุ่มมีความเต็มใจยอมรับการเปลี่ยนแปลง', score: 3 },
      { label: 'บุคลากรส่วนมากมีความเต็มใจยอมรับการเปลี่ยนแปลง', score: 4 },
      { label: 'บุคลากรทั้งหมดมีความเต็มใจและตื่นตัวในการนำ AI มาใช้', score: 5 },
    ],
  },
];
