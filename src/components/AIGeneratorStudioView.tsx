import React, { useState } from 'react';
import { useGovernance } from '../context/GovernanceContext';
import { Sparkles, FileText, Shield, AlertTriangle, Copy, Download, Check, RefreshCw, Send, ChevronRight } from 'lucide-react';

export const AIGeneratorStudioView: React.FC = () => {
  const { systems, orgUnits } = useGovernance();
  const [docType, setDocType] = useState<'report' | 'policy' | 'risk_mitigation' | 'job_redesign'>('report');
  const [selectedUnit, setSelectedUnit] = useState<string>('ฝ่ายบริหารทรัพยากรบุคคล (HR)');
  const [selectedSystemId, setSelectedSystemId] = useState<string>('ALL');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Preset Prompts
  const presets = [
    { label: 'แผน AI Job Redesign ตามคู่มือ สพธอ. 2569', prompt: 'วิเคราะห์ภาระงาน (Task Analysis), จับคู่ 16 NIST AI Capabilities, กำหนด AI Level 0-5, ออกแบบ Human-AI Workflow และจัดทำแผน Upskill vs Reskill' },
    { label: 'เน้นคุ้มครอง PDPA & ป้องกันข้อมูลรั่วไหล', prompt: 'เน้นการคุ้มครองข้อมูลส่วนบุคคล (PDPA), มาตรการป้องกัน Data Leakage ผ่าน RAG/Prompt และการจัดทำ Privacy Notice' },
    { label: 'เน้นข้อกำหนด Fast/Standard Track เอกสาร 11 รายการ', prompt: 'เน้นสรุปการจัดเตรียมเอกสารกำกับดูแลตาม Track ( Fast 5 / Standard 11 / Full 27 รายการ) และลำดับขั้นการอนุมัติ' },
    { label: 'เน้นการป้องกัน Unacceptable Risk ตามร่าง พ.ร.บ. AI', prompt: 'เน้นการกำกับความเสี่ยงที่ไม่สามารถยอมรับได้ (Gatekeeper) ตามร่าง พ.ร.บ. ปัญญาประดิษฐ์ ม.43-47 และบทลงโทษปรับ 5 ล้านบาท' },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMessage('');
    setGeneratedResult('');

    try {
      const systemData = selectedSystemId === 'ALL'
        ? systems.filter((s) => s.owner_unit.includes(selectedUnit) || selectedUnit.includes(s.owner_unit))
        : systems.find((s) => s.system_id === selectedSystemId);

      const response = await fetch('/api/ai/generate-doc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docType,
          unitName: selectedUnit,
          systemData: systemData || systems,
          customPrompt,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedResult(data.text);
      } else {
        setErrorMessage(data.error || 'เกิดข้อผิดพลาดในการประมวลผลด้วย Gemini AI');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'ไม่สามารถเชื่อมต่อเครื่องมือ AI ได้');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedResult) return;
    const blob = new Blob([generatedResult], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AI_Governance_${docType}_${selectedUnit.replace(/\s+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Header Banner */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">08.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414] flex items-center gap-2">
                Generative AI ช่วยทำรายงาน & ออกนโยบาย (AI Governance Policy Studio)
                <span className="text-[10px] font-mono font-bold bg-amber-800 text-white px-2 py-0.5 border border-amber-900">
                  Powered by Gemini 3.6 Flash
                </span>
              </h2>
              <p className="text-xs text-[#141414]/70">
                ประมวลผลข้อมูลระบบ AI และกรอบกฎหมายเพื่อยกร่างรายงานผู้บริหาร, ร่างนโยบายองค์กร และมาตรการความปลอดภัยอัตโนมัติ
              </p>
            </div>
          </div>
        </div>

        {/* Document Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs font-mono">
          <button
            onClick={() => setDocType('report')}
            className={`p-2.5 border text-left font-bold cursor-pointer transition-all flex items-center gap-2 ${
              docType === 'report' ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white hover:bg-[#D4D3D0] border-[#141414]/30'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0 text-amber-400" />
            <div>
              <div>1. รายงานธรรมาภิบาลผู้บริหาร</div>
              <div className="text-[10px] opacity-70 font-normal">Executive Governance Report</div>
            </div>
          </button>

          <button
            onClick={() => setDocType('policy')}
            className={`p-2.5 border text-left font-bold cursor-pointer transition-all flex items-center gap-2 ${
              docType === 'policy' ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white hover:bg-[#D4D3D0] border-[#141414]/30'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0 text-emerald-400" />
            <div>
              <div>2. ร่างประกาศนโยบาย AI</div>
              <div className="text-[10px] opacity-70 font-normal">Organizational AI Policy</div>
            </div>
          </button>

          <button
            onClick={() => setDocType('risk_mitigation')}
            className={`p-2.5 border text-left font-bold cursor-pointer transition-all flex items-center gap-2 ${
              docType === 'risk_mitigation' ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white hover:bg-[#D4D3D0] border-[#141414]/30'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <div>
              <div>3. แผนบริหารความเสี่ยง</div>
              <div className="text-[10px] opacity-70 font-normal">Technical Guardrails Plan</div>
            </div>
          </button>

          <button
            onClick={() => setDocType('job_redesign')}
            className={`p-2.5 border text-left font-bold cursor-pointer transition-all flex items-center gap-2 ${
              docType === 'job_redesign' ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white hover:bg-[#D4D3D0] border-[#141414]/30'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
            <div>
              <div>4. แผน AI Job Redesign</div>
              <div className="text-[10px] opacity-70 font-normal">Workforce & Workflow Plan</div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Studio View Split Layout */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-[#F5F4F0]">
        {/* Left Form Panel */}
        <div className="w-full md:w-[380px] p-4 border-r border-[#141414] bg-white flex flex-col h-full overflow-y-auto shrink-0 space-y-4">
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 border-b border-[#141414]/20 pb-1">
              กำหนดบริบทและข้อมูลระบบ AI
            </div>

            <div>
              <label className="block font-bold text-[10px] uppercase mb-1">เลือกหน่วยงานเป้าหมาย:</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full p-2 border border-[#141414] bg-[#F5F4F0] font-bold text-xs"
              >
                <option value="ภาพรวมองค์กร">ภาพรวมทุกหน่วยงานในองค์กร</option>
                {orgUnits.map((u) => (
                  <option key={u.id} value={u.name_th}>
                    {u.name_th}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[10px] uppercase mb-1">เลือกระบบ AI เฉพาะ (เจาะจง Use Case):</label>
              <select
                value={selectedSystemId}
                onChange={(e) => setSelectedSystemId(e.target.value)}
                className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs"
              >
                <option value="ALL">รวมทุกระบบของหน่วยงานที่เลือก</option>
                {systems.map((s) => (
                  <option key={s.system_id} value={s.system_id}>
                    [{s.system_id}] {s.system_name_th}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[10px] uppercase">คำแนะนำ/ความต้องการเพิ่มเติม (Prompt):</label>
              <textarea
                rows={3}
                placeholder="ระบุข้อเน้นย้ำ เช่น เน้นการจัดเตรียม Fast Track 5 รายการ หรือเน้น PDPA..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full p-2 border border-[#141414] bg-[#F5F4F0] text-xs"
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase opacity-60">ทางลัดความต้องการยอดนิยม:</span>
              <div className="space-y-1">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomPrompt(p.prompt)}
                    className="w-full text-left p-1.5 border border-[#141414]/20 hover:bg-[#E4E3E0] text-[10px] truncate block font-sans"
                  >
                    ⚡ {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-2.5 bg-[#141414] hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-[#141414] disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  กำลังร่างด้วย Gemini 3.6 Flash...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  สร้างเอกสารด้วย Generative AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Preview Output Box */}
        <div className="flex-1 p-6 flex flex-col h-full overflow-hidden bg-[#F5F4F0]">
          <div className="bg-white border border-[#141414] flex-1 flex flex-col overflow-hidden shadow-sm">
            {/* Output Bar */}
            <div className="p-3 border-b border-[#141414] bg-[#E4E3E0]/70 flex justify-between items-center shrink-0 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-800" />
                <span className="font-bold">
                  {docType === 'report' ? 'รายงานผลการประเมินธรรมาภิบาล' : docType === 'policy' ? 'ประกาศนโยบาย AI องค์กร' : 'แผนบริหารความเสี่ยง AI'}
                </span>
              </div>

              {generatedResult && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-white hover:bg-[#D4D3D0] border border-[#141414] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'คัดลอกแล้ว' : 'Copy'}
                  </button>

                  <button
                    onClick={handleDownload}
                    className="px-3 py-1 bg-[#141414] text-white hover:bg-black border border-[#141414] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" /> Download (.md)
                  </button>
                </div>
              )}
            </div>

            {/* Document Content Box */}
            <div className="flex-1 p-6 overflow-y-auto font-sans leading-relaxed text-sm text-[#141414]">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-3 text-center text-xs font-mono">
                  <RefreshCw className="w-8 h-8 animate-spin text-amber-700" />
                  <div className="font-bold">Gemini 3.6 Flash กำลังวิเคราะห์กรอบ ETDA, ISO 42001 & ร่าง พ.ร.บ. AI...</div>
                  <div className="text-slate-500">กำลังยกร่างหัวข้อ โครงสร้างความรับผิดชอบ และมาตรการลดความเสี่ยง</div>
                </div>
              ) : errorMessage ? (
                <div className="p-4 bg-red-100 border border-red-800 text-red-950 font-mono text-xs">
                  <strong>เกิดข้อผิดพลาด:</strong> {errorMessage}
                </div>
              ) : generatedResult ? (
                <div className="prose max-w-none space-y-3 font-sans text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                  {generatedResult}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-slate-500 font-mono text-xs">
                  <Sparkles className="w-10 h-10 text-amber-700/40" />
                  <div className="font-bold text-[#141414]">พร้อมสร้างรายงานหรือนโยบายด้วย Generative AI</div>
                  <p className="max-w-md text-slate-600">
                    เลือกประเภทเอกสารที่ต้องการทางด้านซ้าย ปรับเปลี่ยนข้อกำหนดเพิ่มเติม แล้วกด "สร้างเอกสารด้วย Generative AI"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
