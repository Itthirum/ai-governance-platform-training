import React, { useState } from 'react';
import { BookOpen, HelpCircle, CheckCircle2, ArrowRight, ShieldCheck, FileText, Sparkles, Building2, Layers, AlertTriangle, Scale, Lightbulb, Users, Download, X, Eye, KeyRound, ExternalLink, Globe } from 'lucide-react';

export const UserGuideView: React.FC = () => {
  const [activeGuideTab, setActiveGuideTab] = useState<'step-by-step' | 'glossary' | 'checklist' | 'faq' | 'official-docs'>('step-by-step');
  const [selectedPdf, setSelectedPdf] = useState<'redesign' | 'executive' | null>('redesign');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Header Banner */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">09.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414] flex items-center gap-2">
                คู่มือการใช้งานระบบสำหรับผู้เริ่มต้น (AI Governance Starter Guide)
                <span className="text-[10px] font-mono font-bold bg-emerald-800 text-white px-2 py-0.5 border border-emerald-900">
                  สำหรับผู้ไม่มีพื้นฐานเทคโนโลยี
                </span>
              </h2>
              <p className="text-xs text-[#141414]/70">
                เรียนรู้ขั้นตอนการปฏิบัติตามกรอบ ETDA, ISO 42001 และ ร่าง พ.ร.บ. ปัญญาประดิษฐ์ แบบง่ายทีละขั้นตอน
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 bg-white p-1 border border-[#141414] text-xs font-mono font-bold">
            <button
              onClick={() => setActiveGuideTab('step-by-step')}
              className={`px-3 py-1 cursor-pointer ${
                activeGuideTab === 'step-by-step' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              1. 5 ขั้นตอนปฏิบัติการ (5 Steps)
            </button>
            <button
              onClick={() => setActiveGuideTab('glossary')}
              className={`px-3 py-1 cursor-pointer ${
                activeGuideTab === 'glossary' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              2. ศัพท์พื้นฐานน่ารู้ (Glossary)
            </button>
            <button
              onClick={() => setActiveGuideTab('checklist')}
              className={`px-3 py-1 cursor-pointer ${
                activeGuideTab === 'checklist' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              3. รายการเอกสารที่ต้องเตรียม (Checklist)
            </button>
            <button
              onClick={() => setActiveGuideTab('faq')}
              className={`px-3 py-1 cursor-pointer ${
                activeGuideTab === 'faq' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0]'
              }`}
            >
              4. คำถามที่พบบ่อย (FAQ)
            </button>
            <button
              onClick={() => setActiveGuideTab('official-docs')}
              className={`px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                activeGuideTab === 'official-docs' ? 'bg-[#141414] text-white' : 'hover:bg-[#D4D3D0] text-amber-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              5. คู่มือทางการ สพธอ. (ETDA PDFs)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F5F4F0] space-y-6">
        {/* Intro Highlight Banner */}
        <div className="p-4 bg-amber-50 border-2 border-amber-800 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold font-serif italic text-base">
            <Lightbulb className="w-5 h-5 text-amber-700 shrink-0" />
            <span>AI Governance คืออะไร? และทำไมคนไม่เก่งคอมฯ ถึงต้องทำ?</span>
          </div>
          <p className="text-xs leading-relaxed font-sans">
            <strong>ธรรมาภิบาลปัญญาประดิษฐ์ (AI Governance)</strong> ไม่ใช่เรื่องเทคนิคเขียนโปรแกรมลึกๆ แต่คือ <strong>"การกำหนดคู่มือและกติกาความปลอดภัย"</strong> เมื่อคนในองค์กรนำเทคโนโลยี AI (เช่น ChatGPT, Claude, Copilot หรือระบบอนุมัติอัตโนมัติ) มาใช้งาน เพื่อป้องกันไม่ให้ข้อมูลความลับองค์กรหลุด, ไม่ให้ละเมิดลิขสิทธิ์/PDPA, ไม่ให้ AI ตัดสินใจผิดพลาดจนเกิดความเสียหาย และเพื่อให้สอดคล้องกับร่าง พ.ร.บ. ปัญญาประดิษฐ์ ที่มีโทษปรับสูงถึง 5 ล้านบาท
          </p>
        </div>

        {activeGuideTab === 'step-by-step' && (
          <div className="space-y-6">
            <div className="border-b-2 border-[#141414] pb-1 flex items-center justify-between font-mono">
              <span className="text-xs font-bold uppercase tracking-wider text-[#141414]">
                ลำดับขั้นตอนปฏิบัติการ 5 สเต็ปสำหรับผู้เริ่มต้น (Practical 5-Step Roadmap)
              </span>
              <span className="text-xs text-amber-800 font-bold">ทำตามสเต็ป 1 ถึง 5 เพื่อให้ครบถ้วน 100%</span>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="p-5 bg-white border border-[#141414] space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-sm">
                      1
                    </span>
                    <h3 className="text-sm font-bold font-serif italic text-[#141414]">
                      สำรวจโครงสร้างองค์กร และ ลงทะเบียนระบบ AI (Register AI Inventory)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-800 px-2 py-0.5">
                    เมนู 05 และ 07
                  </span>
                </div>

                <div className="text-xs space-y-2 font-sans leading-relaxed text-[#141414]">
                  <p>
                    <strong>เป้าหมาย:</strong> รวบรวมว่าในองค์กรมีหน่วยงานไหนบ้าง และแต่ละหน่วยงานแอบใช้หรือกำลังพัฒนาระบบ AI ใดอยู่บ้าง
                  </p>
                  <div className="bg-[#F5F4F0] p-3 border border-[#141414]/20 space-y-1 font-mono text-[11px]">
                    <div className="font-bold text-amber-800">วิธีการทำในระบบ:</div>
                    <div>1. ไปที่เมนู <strong>"07. จัดการหน่วยงาน & Use Case"</strong> กดเพิ่มรายชื่อฝ่ายงาน/ผู้บริหารที่รับผิดชอบ</div>
                    <div>2. ไปที่เมนู <strong>"05. ทะเบียนระบบ AI (55 Fields)"</strong> กรอกข้อมูลพื้นฐาน เช่น ชื่อระบบ, เจ้าของระบบ, วัตถุประสงค์</div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 bg-white border border-[#141414] space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-sm">
                      2
                    </span>
                    <h3 className="text-sm font-bold font-serif italic text-[#141414]">
                      สแกนประเมินความพร้อมองค์กร 5 มิติ (Organization Readiness Scan)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-800 px-2 py-0.5">
                    เมนู 02
                  </span>
                </div>

                <div className="text-xs space-y-2 font-sans leading-relaxed text-[#141414]">
                  <p>
                    <strong>เป้าหมาย:</strong> วัดว่าองค์กรของเราพร้อมแค่ไหนด้านนโยบาย, โครงสร้างพื้นฐาน, คุณธรรม/จริยธรรม, และบุคลากร
                  </p>
                  <div className="bg-[#F5F4F0] p-3 border border-[#141414]/20 space-y-1 font-mono text-[11px]">
                    <div className="font-bold text-amber-800">วิธีการทำในระบบ:</div>
                    <div>1. ไปที่เมนู <strong>"02. สแกนความพร้อม 5 มิติ"</strong> ตอบคำถามปรนัยตามสถานะความเป็นจริง</div>
                    <div>2. ระบบจะคำนวณคะแนนสุทธิ 100 คะแนน และบอกจุดแข็ง/จุดที่ต้องปรับปรุงก่อนเริ่มสเกลโครงการ</div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 bg-white border border-[#141414] space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-sm">
                      3
                    </span>
                    <h3 className="text-sm font-bold font-serif italic text-[#141414]">
                      คัดกรองคุณค่า และ ประเมินระดับความเสี่ยง AISIA (Risk Assessment)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-800 px-2 py-0.5">
                    เมนู 03 และ 04
                  </span>
                </div>

                <div className="text-xs space-y-2 font-sans leading-relaxed text-[#141414]">
                  <p>
                    <strong>เป้าหมาย:</strong> แยกแยะว่าโครงการ AI นี้คุ้มค่าหรือไม่ และมีความเสี่ยงส่งผลกระทบต่อสิทธิประชาชนหรือความมั่นคงเพียงใด
                  </p>
                  <div className="bg-[#F5F4F0] p-3 border border-[#141414]/20 space-y-1 font-mono text-[11px]">
                    <div className="font-bold text-amber-800">วิธีการทำในระบบ:</div>
                    <div>1. เมนู <strong>"03. คัดกรอง Use Case"</strong> ประเมินคุณค่าทางธุรกิจและความเป็นไปได้ทางเทคนิค</div>
                    <div>2. เมนู <strong>"04. ประเมินความเสี่ยง AISIA"</strong> ตอบคำถามด้านความปลอดภัย ผลกระทบรายบุคคล และ Generative AI เพื่อรับผลลัพธ์ Track (Fast track / Standard / Full track)</div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-5 bg-white border border-[#141414] space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-sm">
                      4
                    </span>
                    <h3 className="text-sm font-bold font-serif italic text-[#141414]">
                      ตรวจสอบข้อกำหนด ร่าง พ.ร.บ. ปัญญาประดิษฐ์ (Draft Thai AI Act Compliance)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-800 px-2 py-0.5">
                    เมนู 06
                  </span>
                </div>

                <div className="text-xs space-y-2 font-sans leading-relaxed text-[#141414]">
                  <p>
                    <strong>เป้าหมาย:</strong> ตรวจสอบว่าระบบ AI ของเราติดอยู่ในกลุ่ม <strong>"Unacceptable Risk" (มาตรา 43-47)</strong> ที่ห้ามใช้งานเด็ดขาดหรือไม่ และต้องปฏิบัติตามบทลงโทษอย่างไร
                  </p>
                  <div className="bg-[#F5F4F0] p-3 border border-[#141414]/20 space-y-1 font-mono text-[11px]">
                    <div className="font-bold text-amber-800">วิธีการทำในระบบ:</div>
                    <div>1. ไปที่เมนู <strong>"06. ร่าง พ.ร.บ. AI และ กฎหมายโลก"</strong> ตรวจสอบ 65 มาตรา และตารางเปรียบเทียบมาตรฐาน ISO 42001</div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-5 bg-white border border-[#141414] space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-sm">
                      5
                    </span>
                    <h3 className="text-sm font-bold font-serif italic text-[#141414]">
                      ร่างรายงานผู้บริหาร & ประกาศนโยบายด้วย Generative AI (Policy Studio)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-800 px-2 py-0.5">
                    เมนู 08
                  </span>
                </div>

                <div className="text-xs space-y-2 font-sans leading-relaxed text-[#141414]">
                  <p>
                    <strong>เป้าหมาย:</strong> ออกเอกสารนโยบายองค์กร (Policy) และรายงานสรุปเสนอผู้บริหารอย่างมืออาชีพโดยไม่ต้องยกร่างเองตั้งแต่ต้น
                  </p>
                  <div className="bg-[#F5F4F0] p-3 border border-[#141414]/20 space-y-1 font-mono text-[11px]">
                    <div className="font-bold text-amber-800">วิธีการทำในระบบ:</div>
                    <div>1. ไปที่เมนู <strong>"08. GenAI ร่างรายงาน & นโยบาย"</strong> เลือกประเภทเอกสาร และกดปุ่มสร้างด้วย Gemini 3.6 Flash</div>
                    <div>2. คัดกรองหรือดาวน์โหลดเป็นไฟล์ Markdown (.md) เพื่อนำไปเสนออนุมัติในที่ประชุมผู้บริหาร</div>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="p-5 bg-white border border-[#141414] space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#141414]/20 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-sm">
                      6
                    </span>
                    <h3 className="text-sm font-bold font-serif italic text-[#141414]">
                      ETDA Lean Solution & ออกแบบกระบวนงานคนร่วม AI (Process Redesign & AI Studio Prompt)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-800 px-2 py-0.5">
                    เมนู 10
                  </span>
                </div>

                <div className="text-xs space-y-2 font-sans leading-relaxed text-[#141414]">
                  <p>
                    <strong>เป้าหมาย:</strong> ออกแบบกระบวนการทำงานใหม่ตามแม่แบบ <strong>ETDA Lean Solution</strong> (เปรียบเทียบกระบวนการเดิม Before vs กระบวนการใหม่ After ร่วมกับ AI และ Lean Tools 4 เสาหลัก: Standard Work, One Piece Flow, Automation, Error Proofing) พร้อมสร้างคำสั่ง Prompt นำไปสร้างระบบจริงใน Google AI Studio ได้ทันที
                  </p>
                  <div className="bg-[#F5F4F0] p-3 border border-[#141414]/20 space-y-1.5 font-mono text-[11px]">
                    <div className="font-bold text-amber-800">วิธีการทำในระบบ (3 ขั้นตอนง่ายๆ):</div>
                    <div>1. <strong>ป้อนรายการกระบวนงาน (Intake):</strong> กดปุ่ม <em>"✨ ให้ AI วิเคราะห์ & Lean กระบวนงาน"</em> วางรายการงานที่ทำอยู่เดิมทั้งหมดทีละบรรทัด (มีปุ่มตัวอย่างด่วน เช่น งานสารบรรณออกเลข, งานจัดซื้อ, งาน HR, งานบริการลูกค้า) หรือกดปุ่ม <em>"⚡ โหลดแม่แบบ 10 ขั้น"</em></div>
                    <div>2. <strong>AI วิเคราะห์ & ให้คนตรวจแก้:</strong> ระบบจะแสดงผลบน <em>"กระดาน Lean Solution"</em> (Before สีแดง ➔ After สีเขียว ➔ Lean Tools สีน้ำเงิน) ผู้ใช้สามารถกดปุ่ม <em>"✏️ ให้คนตรวจหรือแก้ (Human Edit)"</em> เพื่อปรับแก้ชื่อขั้นตอน ปรับหน้าที่ AI/คน หรือเงื่อนไข Human Sign-off ได้อย่างอิสระ</div>
                    <div>3. <strong>สร้างแอปใน Google AI Studio:</strong> กดปุ่ม <em>"🔮 สร้าง Prompt สำหรับ AI Studio"</em> เพื่อคัดลอก Master System Instructions แล้วคลิกปุ่มเปิด <strong>Google AI Studio ในแท็บใหม่</strong> นำไปวางเพื่อสร้างระบบต้นแบบหรือ Agent พร้อมใช้งานได้ทันที!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeGuideTab === 'glossary' && (
          <div className="space-y-4">
            <div className="border-b-2 border-[#141414] pb-1 font-mono text-xs font-bold uppercase tracking-wider text-[#141414]">
              คำศัพท์พื้นฐาน AI Governance ภาษาคนเข้าใจง่าย (Glossary for Beginners)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs">
              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <span className="font-mono text-xs font-bold text-amber-800 block">1. Generative AI (GenAI) / LLM</span>
                <p className="text-[#141414]/80 leading-relaxed">
                  ปัญญาประดิษฐ์ที่สามารถสร้างเนื้อหาใหม่ได้ เช่น ข้อความ ภาพ หรือโค้ด (ตัวอย่างเช่น ChatGPT, Gemini, Claude, Copilot) ต้องกำกับเรื่องข้อมูลรั่วไหลและการละเมิดลิขสิทธิ์
                </p>
              </div>

              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <span className="font-mono text-xs font-bold text-amber-800 block">2. Adoption Mode (Adopter / Customizer / Maker)</span>
                <p className="text-[#141414]/80 leading-relaxed">
                  รูปแบบการได้มาซึ่ง AI: <strong>Adopter</strong> (ซื้อสำเร็จรูปมาใช้), <strong>Customizer</strong> (เอา AI คนอื่นมาปรับใส่ข้อมูลเรา), <strong>Maker</strong> (สร้าง/เทรนโมเดลเองตั้งแต่ต้น)
                </p>
              </div>

              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <span className="font-mono text-xs font-bold text-amber-800 block">3. Governance Track (Fast / Standard / Full)</span>
                <p className="text-[#141414]/80 leading-relaxed">
                  เส้นทางกำกับดูแล: <strong>Fast track</strong> (เสี่ยงต่ำ ทำเอกสาร 5 ฉบับ), <strong>Standard</strong> (เสี่ยงปานกลาง 11 ฉบับ), <strong>Full track</strong> (เสี่ยงสูง 27 ฉบับ)
                </p>
              </div>

              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <span className="font-mono text-xs font-bold text-amber-800 block">4. Human Oversight (In / Over / Out of the loop)</span>
                <p className="text-[#141414]/80 leading-relaxed">
                  การให้มนุษย์กำกับดูแล: <strong>In-the-loop</strong> (คนต้องกดอนุมัติทุกครั้ง), <strong>Over-the-loop</strong> (คนคอยสุ่มตรวจ), <strong>Out-of-the-loop</strong> (AI ทำงานอัตโนมัติ 100%)
                </p>
              </div>

              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <span className="font-mono text-xs font-bold text-amber-800 block">5. RAG (Retrieval-Augmented Generation)</span>
                <p className="text-[#141414]/80 leading-relaxed">
                  เทคนิคการส่งคลังเอกสารภายในองค์กรให้ AI อ่านก่อนตอบคำถาม เพื่อป้องกันการหลอนคำตอบ (Hallucination)
                </p>
              </div>

              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <span className="font-mono text-xs font-bold text-amber-800 block">6. Unacceptable Risk (Gatekeeper)</span>
                <p className="text-[#141414]/80 leading-relaxed">
                  ความเสี่ยงที่ไม่สามารถยอมรับได้ตามกฎหมาย เช่น การใช้ AI หลอกลวง ล่อลวงเด็ก หรือทำ Social Scoring
                </p>
              </div>
            </div>
          </div>
        )}

        {activeGuideTab === 'checklist' && (
          <div className="space-y-4">
            <div className="border-b-2 border-[#141414] pb-1 font-mono text-xs font-bold uppercase tracking-wider text-[#141414]">
              รายการเอกสารและหลักฐานที่ต้องจัดทำตาม Governance Track (Compliance Deliverable Checklist)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {/* Fast track */}
              <div className="bg-white border border-[#141414] p-4 space-y-3">
                <div className="bg-emerald-100 text-emerald-950 border border-emerald-800 p-2 font-bold text-center">
                  Fast Track (เสี่ยงต่ำ / GenAI ทั่วไป)
                  <div className="text-[10px] font-normal">เอกสารที่ต้องจัดทำ: 5 รายการ</div>
                </div>
                <ul className="space-y-1.5 text-[11px] list-disc list-inside text-[#141414]/90 font-sans">
                  <li>ทะเบียนลงทะเบียนระบบ AI (AI Inventory Record)</li>
                  <li>ข้อตกลงการประมวลผลข้อมูล PDPA (Data Processing Agreement)</li>
                  <li>แนวปฏิบัติการใช้ GenAI สำหรับพนักงาน (GenAI Code of Practice)</li>
                  <li>การบันทึกประวัติการใช้งาน (System Event Logs)</li>
                  <li>คู่มือขั้นตอนปฏิบัติงานมาตรฐาน (Basic SOP)</li>
                </ul>
              </div>

              {/* Standard Track */}
              <div className="bg-white border border-[#141414] p-4 space-y-3">
                <div className="bg-amber-100 text-amber-950 border border-amber-800 p-2 font-bold text-center">
                  Standard Track (เสี่ยงปานกลาง)
                  <div className="text-[10px] font-normal">เอกสารที่ต้องจัดทำ: 11 รายการ</div>
                </div>
                <ul className="space-y-1.5 text-[11px] list-disc list-inside text-[#141414]/90 font-sans">
                  <li>เอกสารจาก Fast Track ทั้ง 5 รายการ</li>
                  <li>รายงานการประเมินผลกระทบด้านความเสี่ยง (AISIA Report)</li>
                  <li>แบบประเมินผลกระทบคุ้มครองข้อมูลส่วนบุคคล (DPIA)</li>
                  <li>ผลการทดสอบความแม่นยำและความเอียงเอียง (Model Performance & Bias Audit)</li>
                  <li>คู่มือระเบียบการควบคุมกำกับโดยมนุษย์ (Human Oversight Protocol)</li>
                  <li>แผนรองรับเหตุวิกฤตและระบบสำรอง (Incident Response Plan)</li>
                  <li>บันทึกข้อตกลงระดับบริการผู้ให้บริการ (Vendor SLA)</li>
                </ul>
              </div>

              {/* Full Track */}
              <div className="bg-white border border-[#141414] p-4 space-y-3">
                <div className="bg-red-100 text-red-950 border border-red-800 p-2 font-bold text-center">
                  Full Track (เสี่ยงสูง / ผลกระทบวงกว้าง)
                  <div className="text-[10px] font-normal">เอกสารที่ต้องจัดทำ: 27 รายการ</div>
                </div>
                <ul className="space-y-1.5 text-[11px] list-disc list-inside text-[#141414]/90 font-sans">
                  <li>เอกสารจาก Standard Track ทั้ง 11 รายการ</li>
                  <li>รายงานการตรวจสอบความปลอดภัยทางไซเบอร์ (Cybersecurity & Red Teaming Report)</li>
                  <li>สถาปัตยกรรมและแผนผังการไหลของข้อมูล (Data Lineage & System Architecture)</li>
                  <li>รายงานการประเมินโดยผู้ตรวจสอบภายนอก (Third-Party ISO 42001 Audit)</li>
                  <li>รายงานความรับผิดชอบและแผนเยียวยาผู้ได้รับผลกระทบ (Redress & Liability Protocol)</li>
                  <li>เอกสารประกอบการยื่นแจ้งขึ้นทะเบียนต่อหน่วยงานกำกับดูแล</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeGuideTab === 'faq' && (
          <div className="space-y-4 font-sans text-xs">
            <div className="border-b-2 border-[#141414] pb-1 font-mono text-xs font-bold uppercase tracking-wider text-[#141414]">
              คำถามที่พบบ่อยสำหรับผู้เริ่มต้น (Frequently Asked Questions)
            </div>

            <div className="space-y-3">
              {/* FAQ: Password Question */}
              <div className="p-4 bg-amber-50 border-2 border-amber-800 space-y-1.5">
                <div className="font-mono font-bold text-amber-950 flex items-center gap-2 text-sm">
                  <KeyRound className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Q: รหัสผ่าน (Password) คืออะไร? ต้องใส่รหัสผ่านเพื่อเข้าใช้งานหรือไม่?</span>
                </div>
                <p className="text-amber-950/90 leading-relaxed font-sans pl-6">
                  <strong>A: ระบบนี้ไม่มีการตั้งรหัสผ่าน (No Password Required)!</strong> ท่านสามารถเปิดใช้งานได้ทันทีโดยไม่ต้องล็อกอินหรือจำรหัสผ่านใดๆ ระบบออกแบบมาให้ผู้บริหารและทีมงานในองค์กรเข้าถึงเครื่องมือวิเคราะห์ บันทึกข้อมูลทะเบียน 55 ฟิลด์ และดาวน์โหลดเอกสารได้สะดวกรวดเร็ว
                </p>
              </div>

              {/* FAQ: Netlify & Page Not Found Question */}
              <div className="p-4 bg-sky-50 border-2 border-sky-800 space-y-1.5">
                <div className="font-mono font-bold text-sky-950 flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-sky-800 shrink-0" />
                  <span>Q: เข้าไปดูใน Netlify อย่างไร หรือเปิดลิงก์แล้วเจอ Error: Page not found เกิดจากอะไร?</span>
                </div>
                <div className="text-sky-950/90 leading-relaxed font-sans pl-6 space-y-1">
                  <p>
                    <strong>A:</strong> สาเหตุหลักที่ทำให้เจอข้อความ <em>"Error: Page not found - The requested URL was not found on this server"</em> มี 2 กรณี:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>
                      <strong>กรณีที่ 1 (การเปิดไฟล์ PDF ในแท็บใหม่):</strong> เกิดจากเบราว์เซอร์พยายามเปิดลิงก์แยกหน้าต่างออกจากระบบพรีวิวของ AI Studio ทำให้ติดข้อจำกัดด้านความปลอดภัยของโดเมน <u>วิธีแก้:</u> ให้ใช้ปุ่ม <strong>"เปิดอ่านในระบบทันที (In-App Reader)"</strong> ในแท็บ <em>"5. คู่มือทางการ สพธอ."</em> หรือกดปุ่ม <strong>"ดาวน์โหลด"</strong> เก็บไว้ในเครื่อง
                    </li>
                    <li>
                      <strong>กรณีที่ 2 (การเข้าผ่าน Netlify):</strong> หากนำแอปไปโฮสต์บน Netlify แล้วกดรีเฟรชหน้าเว็บแล้วเจอ 404 ระบบได้จัดทำไฟล์ <code>_redirects</code> และ <code>netlify.toml</code> ไว้ในระบบแล้ว ทำให้รองรับ SPA Routing บน Netlify ได้ 100%
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <div className="font-mono font-bold text-amber-800">Q: ถ้าเราแค่อนุมัติให้พนักงานใช้ ChatGPT หรือ Claude ทำงานเอกสาร ต้องทำ AI Governance ไหม?</div>
                <p className="text-[#141414]/80 leading-relaxed">
                  <strong>A: ต้องทำครับ!</strong> แม้จะไม่ได้พัฒนา AI เอง แต่องค์กรต้องออก <strong>"ประกาศแนวปฏิบัติการใช้งาน GenAI" (GenAI Code of Practice)</strong> ใน Fast track เพื่อป้องกันไม่ให้พนักงานนำข้อมูลความลับลูกค้า หรือข้อมูลส่วนบุคคล (PDPA) ไปวางใส่ใน AI สาธารณะ
                </p>
              </div>

              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <div className="font-mono font-bold text-amber-800">Q: ข้อมูลที่เราแก้ไขหรือเพิ่มลงในระบบนี้ จะหายไหมเมื่อปิดเบราว์เซอร์?</div>
                <p className="text-[#141414]/80 leading-relaxed">
                  <strong>A: ไม่หายครับ!</strong> ระบบได้รับการอัปเดตให้รองรับการบันทึกข้อมูลอัตโนมัติลงใน <strong>LocalStorage</strong> ของเครื่องคุณทันที เมื่อเปิดกลับมาใหม่ ข้อมูลทะเบียน 55 Fields และรายชื่อหน่วยงานจะยังคงอยู่ครบถ้วน
                </p>
              </div>

              <div className="p-4 bg-white border border-[#141414] space-y-1">
                <div className="font-mono font-bold text-amber-800">Q: ทำอย่างไรจึงจะได้รายงานเสนออนุมัติผู้บริหารอย่างรวดเร็ว?</div>
                <p className="text-[#141414]/80 leading-relaxed">
                  <strong>A:</strong> ไปที่เมนู <strong>"08. GenAI ร่างรายงาน & นโยบาย"</strong> เลือกหน่วยงานของคุณ และกดปุ่มสร้างเอกสาร ระบบจะดึงข้อมูลจากทะเบียน AI ทั้งหมดมาวิเคราะห์และร่างเป็นรายงานทางการภาษาไทยให้ทันที
                </p>
              </div>
            </div>
          </div>
        )}

        {activeGuideTab === 'official-docs' && (
          <div className="space-y-6">
            <div className="border-b-2 border-[#141414] pb-1 font-mono text-xs font-bold uppercase tracking-wider text-[#141414] flex items-center justify-between">
              <span>คลังคู่มือมาตรฐานทางการ สพธอ. (ETDA & AIGC Official Guidelines)</span>
              <span className="text-xs text-amber-800 font-bold">เอกสารต้นฉบับสำหรับการศึกษาเชิงลึก</span>
            </div>

            {/* In-App Reader Notification Banner */}
            <div className="p-3 bg-emerald-50 border border-emerald-800 text-emerald-950 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>ระบบป้องกัน 404:</strong> คุณสามารถเปิดอ่านเอกสารตัวจริงผ่าน <strong>In-App PDF Viewer</strong> ด้านล่างนี้ได้โดยตรง หรือกดปุ่ม <strong>ดาวน์โหลดลงเครื่อง</strong> ได้ทันที
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <button
                  onClick={() => setSelectedPdf('redesign')}
                  className={`px-2.5 py-1 cursor-pointer font-bold border border-emerald-900 ${selectedPdf === 'redesign' ? 'bg-emerald-900 text-white' : 'bg-white hover:bg-emerald-100 text-emerald-950'}`}
                >
                  เปิดเล่ม 1 (Redesign)
                </button>
                <button
                  onClick={() => setSelectedPdf('executive')}
                  className={`px-2.5 py-1 cursor-pointer font-bold border border-emerald-900 ${selectedPdf === 'executive' ? 'bg-emerald-900 text-white' : 'bg-white hover:bg-emerald-100 text-emerald-950'}`}
                >
                  เปิดเล่ม 2 (ผู้บริหาร 2569)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doc 1: AI Job Redesign Guideline */}
              <div className={`bg-white border-2 p-5 space-y-4 flex flex-col justify-between transition-colors ${selectedPdf === 'redesign' ? 'border-purple-800 ring-2 ring-purple-600/30' : 'border-[#141414]'}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-950 border border-purple-800 text-[10px] font-mono font-bold">
                      คู่มือใหม่ล่าสุด (49 หน้า)
                    </span>
                    <span className="text-[10px] font-mono text-[#141414]/60">สพธอ. ETDA / AIGC</span>
                  </div>

                  <h3 className="text-base font-bold font-serif italic text-[#141414]">
                    AI Job Redesign Guideline: การออกแบบงานเพื่อรองรับการทำงานร่วมกับเทคโนโลยี AI
                  </h3>

                  <p className="text-xs text-[#141414]/80 leading-relaxed font-sans">
                    คู่มือแนวปฏิบัติสำหรับฝ่ายทรัพยากรบุคคล (HR) และผู้บริหาร ในการเตรียมความพร้อมองค์กรให้ผสานการทำงานระหว่างคนและ AI (Human-AI Collaboration) อย่างสมดุล โดยยึดหลักคนเป็นศูนย์กลาง
                  </p>

                  <div className="p-3 bg-[#F5F4F0] border border-[#141414]/20 space-y-1.5 text-xs font-sans">
                    <div className="font-mono text-[11px] font-bold text-amber-900 uppercase">
                      สาระสำคัญที่นำมาใส่ในระบบนี้:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-zinc-700">
                      <li><strong>16 NIST AI Capabilities:</strong> หมวดหมู่ความสามารถ AI 16 ประเภท</li>
                      <li><strong>6 AI Levels (0-5):</strong> ตั้งแต่คนทำ 100% จนถึงระบบอัตโนมัติเต็มรูปแบบ</li>
                      <li><strong>3 ระดับผลกระทบ:</strong> Task Level, Job Position Level, Organization Level</li>
                      <li><strong>เมทริกซ์ Upskill vs Reskill:</strong> จำแนกทักษะ Technical, Ethical, Non-tech</li>
                      <li><strong>เครื่องมือ AI Use Case Canvas:</strong> 2x2 Matrix ประเมินคุณค่าและความเป็นไปได้</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#141414]/20 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedPdf('redesign')}
                    className="px-3.5 py-2 bg-purple-900 hover:bg-purple-950 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>เปิดอ่านในระบบทันที (In-App)</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href="/assets/aistudio/AI-Job-Redesign-Guideline_ab2f3f2a.pdf"
                      download="ETDA-AI-Job-Redesign-Guideline.pdf"
                      className="px-3 py-2 bg-white hover:bg-zinc-100 border border-[#141414] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Doc 2: AI Governance Guideline for Executives (2569) */}
              <div className={`bg-white border-2 p-5 space-y-4 flex flex-col justify-between transition-colors ${selectedPdf === 'executive' ? 'border-emerald-800 ring-2 ring-emerald-600/30' : 'border-[#141414]'}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-950 border border-emerald-800 text-[10px] font-mono font-bold">
                      ฉบับปรับปรุง 2569 (81 หน้า)
                    </span>
                    <span className="text-[10px] font-mono text-[#141414]/60">AIGPC / สพธอ. ETDA</span>
                  </div>

                  <h3 className="text-base font-bold font-serif italic text-[#141414]">
                    AI Governance Guideline for Executives (ฉบับปรับปรุง 2569)
                  </h3>

                  <p className="text-xs text-[#141414]/80 leading-relaxed font-sans">
                    แนวทางการประยุกต์ใช้ปัญญาประดิษฐ์อย่างมีธรรมาภิบาลสำหรับผู้บริหารองค์กร สอดรับกับมาตรฐาน ISO/IEC 42001:2023, ISO 23894, NIST AI RMF และหลักการจริยธรรม AI ของ สดช.
                  </p>

                  <div className="p-3 bg-[#F5F4F0] border border-[#141414]/20 space-y-1.5 text-xs font-sans">
                    <div className="font-mono text-[11px] font-bold text-amber-900 uppercase">
                      สาระสำคัญที่นำมาใส่ในระบบนี้:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-zinc-700">
                      <li><strong>โครงสร้างกำกับดูแล (AI Structure):</strong> จัดตั้ง AI Governance Council และแบ่งหน้าที่ระดับนโยบาย vs ปฏิบัติการ</li>
                      <li><strong>การบริหารความเสี่ยง (AI Strategy):</strong> การคุมเสี่ยง 6 ขั้นตอน และระดับ Human Oversight (In/Over/Out-of-the-loop)</li>
                      <li><strong>วงจรชีวิต AI 7 ขั้นตอน (AI Operation):</strong> ออกแบบ, เตรียมข้อมูล Data Pipeline, สอน/ทดสอบ Train-Validate-Test, นำไปใช้, เฝ้าติดตาม, ประเมินผล และยุติการใช้งาน</li>
                      <li><strong>การกำกับดูแลคู่สัญญาภายนอก (Outsource/Vendor):</strong> ตอกย้ำความรับผิดชอบขั้นสุดท้าย (Accountability) ยังคงอยู่ที่องค์กรเสมอ</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#141414]/20 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedPdf('executive')}
                    className="px-3.5 py-2 bg-emerald-900 hover:bg-emerald-950 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>เปิดอ่านในระบบทันที (In-App)</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href="/assets/aistudio/20260821_AI_GUIDELINE_BOOK_F1_5e100f98.pdf"
                      download="ETDA-AI-Governance-Executive-Guideline-2569.pdf"
                      className="px-3 py-2 bg-white hover:bg-zinc-100 border border-[#141414] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded In-App PDF Reader Viewport */}
            {selectedPdf && (
              <div className="p-4 bg-white border-2 border-[#141414] shadow-lg space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#141414]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span className="font-mono text-xs font-bold text-[#141414] flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      กำลังเปิดอ่าน: {selectedPdf === 'redesign' ? 'AI Job Redesign Guideline (49 หน้า)' : 'AI Governance Guideline for Executives ฉบับปรับปรุง 2569 (81 หน้า)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button
                      onClick={() => setSelectedPdf(selectedPdf === 'redesign' ? 'executive' : 'redesign')}
                      className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 border border-[#141414] font-bold cursor-pointer flex items-center gap-1"
                    >
                      สลับไปอ่านเล่ม {selectedPdf === 'redesign' ? '2 (ผู้บริหาร 2569)' : '1 (Job Redesign)'}
                    </button>
                    <a
                      href={selectedPdf === 'redesign' ? '/assets/aistudio/AI-Job-Redesign-Guideline_ab2f3f2a.pdf' : '/assets/aistudio/20260821_AI_GUIDELINE_BOOK_F1_5e100f98.pdf'}
                      download={selectedPdf === 'redesign' ? 'ETDA-AI-Job-Redesign-Guideline.pdf' : 'ETDA-AI-Governance-Executive-Guideline-2569.pdf'}
                      className="px-3 py-1 bg-[#141414] text-white hover:bg-zinc-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      ดาวน์โหลดไฟล์นี้
                    </a>
                    <button
                      onClick={() => setSelectedPdf(null)}
                      className="p-1 hover:bg-zinc-100 border border-[#141414] text-zinc-600 hover:text-black cursor-pointer"
                      title="ปิดหน้าจออ่านเอกสาร"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative w-full h-[650px] bg-zinc-100 border border-[#141414]/30 overflow-hidden">
                  <iframe
                    src={selectedPdf === 'redesign' ? '/assets/aistudio/AI-Job-Redesign-Guideline_ab2f3f2a.pdf#toolbar=1' : '/assets/aistudio/20260821_AI_GUIDELINE_BOOK_F1_5e100f98.pdf#toolbar=1'}
                    className="w-full h-full border-0"
                    title="ETDA Guideline PDF Reader"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                  <span>ทิป: คุณสามารถใช้ลูกกลิ้งเมาส์เลื่อนอ่าน, ซูมเข้า/ออก, พิมพ์ หรือค้นหาคำในเอกสารได้โดยตรง</span>
                  <a
                    href={selectedPdf === 'redesign' ? '/assets/aistudio/AI-Job-Redesign-Guideline_ab2f3f2a.pdf' : '/assets/aistudio/20260821_AI_GUIDELINE_BOOK_F1_5e100f98.pdf'}
                    download
                    className="text-amber-800 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Download className="w-3 h-3" />
                    ดาวน์โหลดเพื่อเปิดใน Adobe Reader / แอปภายนอก
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
