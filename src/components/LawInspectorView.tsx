import React, { useState } from 'react';
import { draftAILawSections, globalComparisonMatrix } from '../data/lawData';
import { Scale, ShieldAlert, FileText, Globe, Search, Filter } from 'lucide-react';

export const LawInspectorView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'draft-law' | 'global-matrix'>('draft-law');
  const [lawSearch, setLawSearch] = useState('');
  const [selectedPenalty, setSelectedPenalty] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');

  const filteredSections = draftAILawSections.filter((sec) => {
    const matchesSearch =
      sec.sectionNumber.toLowerCase().includes(lawSearch.toLowerCase()) ||
      sec.title.toLowerCase().includes(lawSearch.toLowerCase()) ||
      sec.summary.toLowerCase().includes(lawSearch.toLowerCase());

    const matchesPenalty = selectedPenalty === 'ALL' || sec.penaltyType === selectedPenalty;
    const matchesRole = selectedRole === 'ALL' || sec.targetRole.includes(selectedRole as any);

    return matchesSearch && matchesPenalty && matchesRole;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Header Banner */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">06.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414]">
                ร่าง พ.ร.บ. ปัญญาประดิษฐ์ และ กฎหมาย AI โลก (Draft Thai AI Act & Global Laws)
              </h2>
              <p className="text-xs text-[#141414]/70">
                เจาะลึก 7 หมวด 65 มาตราของร่าง พ.ร.บ. ปัญญาประดิษฐ์ พ.ศ. .... และเปรียบเทียบมาตรฐานกฎหมายสากล
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 border border-[#141414]">
            <button
              onClick={() => setActiveSubTab('draft-law')}
              className={`px-3 py-1 font-mono text-xs font-bold cursor-pointer ${
                activeSubTab === 'draft-law' ? 'bg-[#141414] text-white' : 'bg-transparent hover:bg-[#D4D3D0]'
              }`}
            >
              ร่าง พ.ร.บ. AI ไทย (65 มาตรา)
            </button>
            <button
              onClick={() => setActiveSubTab('global-matrix')}
              className={`px-3 py-1 font-mono text-xs font-bold cursor-pointer ${
                activeSubTab === 'global-matrix' ? 'bg-[#141414] text-white' : 'bg-transparent hover:bg-[#D4D3D0]'
              }`}
            >
              เมทริกซ์เปรียบเทียบกฎหมายโลก
            </button>
          </div>
        </div>

        {activeSubTab === 'draft-law' && (
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2 border border-[#141414] text-xs font-mono">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search className="w-4 h-4 opacity-50 shrink-0" />
              <input
                type="text"
                placeholder="ค้นหามาตรา, ชื่อหัวข้อ, หรือเนื้อหา..."
                value={lawSearch}
                onChange={(e) => setLawSearch(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold opacity-60">Role Filter:</span>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="p-1 border border-[#141414] bg-[#F5F4F0] font-mono text-[11px]"
              >
                <option value="ALL">All Roles</option>
                <option value="Provider">Provider (ผู้ให้บริการ)</option>
                <option value="Deployer">Deployer (ผู้ประยุกต์ใช้)</option>
                <option value="Platform">Platform (แพลตฟอร์ม)</option>
                <option value="Public Agency">Public Agency (ภาครัฐ)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold opacity-60">Penalty Filter:</span>
              <select
                value={selectedPenalty}
                onChange={(e) => setSelectedPenalty(e.target.value)}
                className="p-1 border border-[#141414] bg-[#F5F4F0] font-mono text-[11px]"
              >
                <option value="ALL">All Penalties</option>
                <option value="ปกครอง (ไม่เกิน 5 ล้าน)">ปกครอง ไม่เกิน 5 ล้านบาท</option>
                <option value="ปกครอง (ไม่เกิน 3 ล้าน)">ปกครอง ไม่เกิน 3 ล้านบาท</option>
                <option value="ปกครอง (ไม่เกิน 1 ล้าน)">ปกครอง ไม่เกิน 1 ล้านบาท</option>
                <option value="แพ่ง">ความรับผิดทางแพ่ง (Strict Liability)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F5F4F0] space-y-4">
        {activeSubTab === 'draft-law' ? (
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414] border-b-2 border-[#141414] pb-1 flex justify-between items-center">
              <span>รายการสรุปสาระสำคัญร่างกฎหมายรายหมวด (Found {filteredSections.length} Items)</span>
              <span className="text-amber-800">พ.ร.บ. ปัญญาประดิษฐ์ พ.ศ. ....</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredSections.map((sec, idx) => {
                let penaltyBadge = 'bg-[#141414] text-white';
                if (sec.penaltyType === 'ปกครอง (ไม่เกิน 5 ล้าน)') penaltyBadge = 'bg-red-800 text-white border-red-950 font-bold';
                else if (sec.penaltyType === 'ปกครอง (ไม่เกิน 3 ล้าน)') penaltyBadge = 'bg-red-700 text-white border-red-900 font-bold';
                else if (sec.penaltyType === 'ปกครอง (ไม่เกิน 1 ล้าน)') penaltyBadge = 'bg-amber-700 text-white border-amber-900';
                else if (sec.penaltyType === 'แพ่ง') penaltyBadge = 'bg-purple-800 text-white border-purple-950';

                return (
                  <div key={idx} className="p-4 bg-white border border-[#141414] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#141414]/10 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 border border-amber-800 px-2 py-0.5">
                          {sec.sectionNumber}
                        </span>
                        <span className="font-mono text-[10px] uppercase text-[#141414]/60 font-bold">
                          {sec.chapterTitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {sec.penaltyType && sec.penaltyType !== 'ไม่มี' && (
                          <span className={`px-2 py-0.5 border font-mono text-[10px] ${penaltyBadge}`}>
                            บทลงโทษ: {sec.penaltyType}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-[#141414] font-serif italic">{sec.title}</h3>
                    <p className="text-xs text-[#141414]/85 leading-relaxed font-sans">{sec.summary}</p>

                    <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono">
                      <span className="opacity-60 font-bold">Target Roles:</span>
                      {sec.targetRole.map((role) => (
                        <span key={role} className="px-1.5 py-0.2 bg-[#E4E3E0] border border-[#141414]/20 text-[#141414]">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Global Comparison Matrix */
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414] border-b-2 border-[#141414] pb-1 flex justify-between items-center">
              <span>เมทริกซ์เปรียบเทียบแนวนโยบายปัญญาประดิษฐ์นานาชาติ (Global AI Law Comparative Matrix)</span>
            </div>

            <div className="border border-[#141414] bg-white overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead className="bg-[#E4E3E0] border-b border-[#141414]">
                  <tr>
                    <th className="p-3 border-r border-[#141414] font-bold">ประเทศ/ภูมิภาค</th>
                    <th className="p-3 border-r border-[#141414] font-bold">ชื่อกฎหมาย / สถานะ</th>
                    <th className="p-3 border-r border-[#141414] font-bold">แนวทางกำกับดูแล (Approach)</th>
                    <th className="p-3 border-r border-[#141414] font-bold">บทบาทที่กำกับ</th>
                    <th className="p-3 font-bold">ข้อกำหนดความโปร่งใส</th>
                  </tr>
                </thead>
                <tbody>
                  {globalComparisonMatrix.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#141414]/20 hover:bg-[#F5F4F0]">
                      <td className="p-3 border-r border-[#141414]/20 font-bold text-amber-900">{item.region}</td>
                      <td className="p-3 border-r border-[#141414]/20 font-bold">{item.framework}</td>
                      <td className="p-3 border-r border-[#141414]/20 font-sans">{item.approach}</td>
                      <td className="p-3 border-r border-[#141414]/20">{item.keyRoles}</td>
                      <td className="p-3 font-sans text-[11px]">{item.transparencyReq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
