import React, { useState } from 'react';
import { documentSummaries } from '../data/analysisData';
import { ChevronDown, ChevronRight, FileText, CheckCircle2, ShieldAlert, Sparkles, AlertCircle, BookOpen, Layers } from 'lucide-react';

export const SummaryView: React.FC = () => {
  const [activeDocId, setActiveDocId] = useState<string>('etda-genai');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ '01': true, '02': true, '03': true, '04': true, '05': true, 'หมวด 1': true, 'หมวด 3': true });

  const selectedDoc = documentSummaries.find((d) => d.id === activeDocId) || documentSummaries[0];

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Top Banner / Selection */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl font-serif italic font-bold">01.</span>
          <div>
            <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414]">
              วิเคราะห์สรุปเอกสารโครงการทั้งหมด (Comprehensive File Analysis)
            </h2>
            <p className="text-xs text-[#141414]/70">
              การวิเคราะห์เชิงลึกและสรุปสาระสำคัญจากคู่มือ ETDA, สไลด์ AIGC, ร่าง พ.ร.บ. AI ไทย และ สเปก Data Model 55 Fields
            </p>
          </div>
        </div>

        {/* Document Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
          {documentSummaries.map((doc) => {
            const isSelected = doc.id === activeDocId;
            return (
              <button
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={`p-2.5 text-left border text-xs font-bold transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#141414] text-[#E4E3E0] border-[#141414] shadow-sm'
                    : 'bg-white hover:bg-[#D4D3D0]/60 border-[#141414]/30 text-[#141414]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-[#D4D3D0] text-[#141414]">
                    {doc.id.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono opacity-60">{doc.year}</span>
                </div>
                <div className="line-clamp-2 leading-tight font-serif italic text-xs">{doc.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Analysis Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F5F4F0]">
        {/* Document Header Info Card */}
        <div className="p-4 border border-[#141414] bg-white space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#141414]/10 pb-2">
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-700 font-mono tracking-widest">
                SOURCE: {selectedDoc.source}
              </div>
              <h1 className="text-xl font-bold tracking-tight font-serif italic text-[#141414]">
                {selectedDoc.title}
              </h1>
              <p className="text-xs font-medium text-[#141414]/80">{selectedDoc.subtitle}</p>
            </div>
            <div className="px-3 py-1 bg-[#141414] text-[#E4E3E0] font-mono text-xs font-bold">
              {selectedDoc.year}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="p-3 bg-[#E4E3E0]/40 border border-[#141414]/30">
            <div className="text-[10px] uppercase font-bold text-[#141414] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              ข้อสรุปหลักเชิงยุทธศาสตร์ (Key Strategic Executive Takeaways)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans">
              {selectedDoc.keyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white p-2 border border-[#141414]/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-snug">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deep-Dive Sections */}
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414] flex items-center gap-2 border-b-2 border-[#141414] pb-1">
            <BookOpen className="w-4 h-4" />
            โครงสร้างเนื้อหาและการวิเคราะห์เชิงลึก (Section Breakdown & Analysis)
          </div>

          {selectedDoc.coreSections.map((sec) => {
            const isExpanded = expandedSections[sec.sectionNum] ?? true;
            return (
              <div key={sec.sectionNum} className="border border-[#141414] bg-white">
                <button
                  onClick={() => toggleSection(sec.sectionNum)}
                  className="w-full p-3 bg-[#E4E3E0]/50 hover:bg-[#E4E3E0] flex items-center justify-between text-left transition-colors cursor-pointer border-b border-[#141414]/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif italic font-bold text-lg text-amber-800">{sec.sectionNum}.</span>
                    <div>
                      <span className="text-sm font-bold uppercase text-[#141414]">{sec.sectionTitle}</span>
                      <p className="text-xs text-[#141414]/70">{sec.description}</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <div className="p-4 space-y-2 text-xs leading-relaxed bg-white">
                    <ul className="space-y-2 list-disc pl-5">
                      {sec.details.map((item, dIdx) => (
                        <li key={dIdx} className="text-[#141414]/90 font-sans">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Special Highlight Cards: GenAI 12 Risks Matrix (If GenAI Doc selected) */}
        {selectedDoc.id === 'etda-genai' && (
          <div className="border border-[#141414] bg-white p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#141414] pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                12 ประเด็นความเสี่ยง Generative AI (ตาม NIST AI RMF GenAI Profile)
              </h3>
              <span className="text-[10px] font-mono bg-red-100 text-red-800 px-2 py-0.5 font-bold border border-red-800">
                CRITICAL RISK MATRIX
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-mono">
              {[
                { name: '1. CBRN Weapons', th: 'ข้อมูลอันตรายอาวุธเคมี/นิวเคลียร์', risk: 'Critical' },
                { name: '2. Confabulation', th: 'อาการหลอน/ข้อมูลเท็จสมจริง', risk: 'High' },
                { name: '3. Dangerous Content', th: 'คำแนะนำอันตราย/ปลุกปั่นความรุนแรง', risk: 'High' },
                { name: '4. Data Privacy', th: 'ข้อมูลส่วนบุคคลรั่วไหล/PII', risk: 'High' },
                { name: '5. Environmental', th: 'ผลกระทบพลังงาน/คาร์บอนฟุตพริ้นท์', risk: 'Medium' },
                { name: '6. Human-AI Config', th: 'การพึ่งพา AI เกินไป (Overreliance)', risk: 'High' },
                { name: '7. Info Integrity', th: 'ข้อมูลบิดเบือน/ข่าวปลอม (Disinfo)', risk: 'High' },
                { name: '8. Info Security', th: 'Prompt Injection / Data Poisoning', risk: 'Critical' },
                { name: '9. Intellectual Property', th: 'ละเมิดลิขสิทธิ์/สิทธิบัตรซอฟต์แวร์', risk: 'High' },
                { name: '10. Obscene / Abusive', th: 'เนื้อหาลามก/คุกคามทางเพศ', risk: 'High' },
                { name: '11. Toxicity & Bias', th: 'เนื้อหาอคติ/เหยียดเชื้อชาติ/เพศ', risk: 'High' },
                { name: '12. Value Chain Risk', th: 'ความเสี่ยงห่วงโซ่อุปทาน Third-party', risk: 'Medium' },
              ].map((r, i) => (
                <div key={i} className="p-2.5 border border-[#141414]/20 bg-[#E4E3E0]/30 space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span>{r.name}</span>
                    <span className={`text-[9px] px-1 py-0.2 border ${r.risk === 'Critical' ? 'bg-red-200 text-red-900 border-red-800' : 'bg-amber-100 text-amber-900 border-amber-800'}`}>
                      {r.risk}
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-[#141414]/80">{r.th}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Highlight: Governance Flow & Proportional Tracks */}
        {selectedDoc.id === 'data-model-spec' && (
          <div className="border border-[#141414] bg-white p-4 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b border-[#141414] pb-2">
              <Layers className="w-4 h-4 text-blue-700" />
              การจัดเส้นทางสัดส่วนเอกสาร (Proportionality 3 Tracks & 27 Outputs)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 border border-emerald-800 bg-emerald-50 space-y-1.5">
                <div className="font-bold font-mono text-emerald-900 flex justify-between">
                  <span>1. Fast Track</span>
                  <span className="px-1.5 py-0.5 bg-emerald-800 text-white text-[10px]">5 เอกสาร</span>
                </div>
                <p className="text-[11px] font-sans">สำหรับระบบ Adopter + Level I/II + ไม่ใช้ข้อมูลส่วนบุคคล</p>
                <div className="text-[10px] font-mono text-emerald-800 border-t border-emerald-300 pt-1">
                  ผู้อนุมัติ: หัวหน้าหน่วยงานเจ้าของระบบ
                </div>
              </div>

              <div className="p-3 border border-blue-800 bg-blue-50 space-y-1.5">
                <div className="font-bold font-mono text-blue-900 flex justify-between">
                  <span>2. Standard Track</span>
                  <span className="px-1.5 py-0.5 bg-blue-800 text-white text-[10px]">11 เอกสาร</span>
                </div>
                <p className="text-[11px] font-sans">สำหรับระบบ Level II-III หรือใช้ข้อมูลส่วนบุคคล หรือ GenAI Adopter</p>
                <div className="text-[10px] font-mono text-blue-800 border-t border-blue-300 pt-1">
                  ผู้อนุมัติ: ประธานคณะทำงาน AI
                </div>
              </div>

              <div className="p-3 border border-purple-800 bg-purple-50 space-y-1.5">
                <div className="font-bold font-mono text-purple-900 flex justify-between">
                  <span>3. Full Track</span>
                  <span className="px-1.5 py-0.5 bg-purple-800 text-white text-[10px]">27 เอกสาร</span>
                </div>
                <p className="text-[11px] font-sans">สำหรับระบบ Level IV หรือกระทบสิทธิโดยตรง หรือเป็น Maker/Agentic</p>
                <div className="text-[10px] font-mono text-purple-800 border-t border-purple-300 pt-1">
                  ผู้อนุมัติ: คณะกรรมการ AI Governance Council
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
