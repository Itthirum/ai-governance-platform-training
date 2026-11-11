import React, { useState } from 'react';
import { AISystemRecord } from '../types';
import { dataModelFields, determineGovernanceTrack } from '../data/inventoryData';
import { useGovernance } from '../context/GovernanceContext';
import { Layers, Search, Filter, Plus, FileText, CheckCircle2, ShieldAlert, ChevronRight, Eye, Sparkles } from 'lucide-react';

export const InventoryExplorerView: React.FC = () => {
  const { systems, addSystem, orgUnits } = useGovernance();
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState<string>('ALL');
  const [selectedSystem, setSelectedSystem] = useState<AISystemRecord | null>(null);
  const [activeGroupTab, setActiveGroupTab] = useState<string>('A');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New System Form state
  const [newSysName, setNewSysName] = useState('');
  const [newSysDesc, setNewSysDesc] = useState('');
  const [newOwner, setNewOwner] = useState('ฝ่ายบริหารทรัพยากรบุคคล (HR)');
  const [newExec, setNewExecutive] = useState('ผู้อำนวยการฝ่าย HR');
  const [newAdoption, setNewAdoption] = useState<'Adopter' | 'Customizer' | 'Maker'>('Customizer');
  const [newIsGenAI, setNewIsGenAI] = useState(true);
  const [newUsesPII, setNewUsesPII] = useState(true);

  const filteredSystems = systems.filter((sys) => {
    const matchesSearch =
      sys.system_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sys.system_name_th.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sys.owner_unit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack = trackFilter === 'ALL' || sys.governance_track === trackFilter;

    return matchesSearch && matchesTrack;
  });

  const handleCreateSystem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSysName) return;

    const calculatedTrack = determineGovernanceTrack({
      adoption_mode: newAdoption,
      is_generative_ai: newIsGenAI,
      uses_personal_data: newUsesPII,
      residual_risk_level: 'Level II',
    });

    const newRecord: AISystemRecord = {
      system_id: `AIS-2026-${String(systems.length + 1).padStart(3, '0')}`,
      system_name_th: newSysName,
      system_name_en: '',
      short_description: newSysDesc || 'ระบบงานใหม่ที่กำลังได้รับการประเมิน',
      owner_unit: newOwner,
      business_owner: 'เจ้าของภารกิจประจำฝ่าย',
      technical_owner: 'วิศวกรประจำโครงการ',
      accountable_executive: newExec,
      intended_purpose: newSysDesc || 'ประยุกต์ใช้ปัญญาประดิษฐ์เพิ่มประสิทธิภาพการทำงาน',
      user_groups: ['บุคลากรภายใน'],
      affects_vulnerable_groups: false,
      decision_impact_on_individuals: 'ให้ข้อมูลประกอบ',
      ai_capability_type: newIsGenAI ? ['สร้างเนื้อหา (Generative AI)'] : ['การคาดการณ์ (Predictive)'],
      adoption_mode: newAdoption,
      is_generative_ai: newIsGenAI,
      is_agentic: false,
      uses_personal_data: newUsesPII,
      uses_sensitive_data: false,
      value_chain_role: ['Deployer'],
      unacceptable_risk_flag: false,
      inherent_risk_level: 'Level II',
      residual_risk_level: 'Level II',
      governance_track: calculatedTrack,
      human_oversight_level: 'over-the-loop',
      lifecycle_status: 'เสนอแนวคิด',
      last_assessment_date: new Date().toISOString().split('T')[0],
      next_review_due: '2027-01-01',
      completeness_score: 45,
    };

    addSystem(newRecord);
    setIsAddingNew(false);
    setSelectedSystem(newRecord);
    setNewSysName('');
    setNewSysDesc('');
  };

  const groupCodes = [
    { code: 'A', name: 'กลุ่ม A — การระบุตัวตน' },
    { code: 'B', name: 'กลุ่ม B — เจ้าของและความรับผิดชอบ' },
    { code: 'C', name: 'กลุ่ม C — วัตถุประสงค์และขอบเขต' },
    { code: 'D', name: 'กลุ่ม D — เทคโนโลยีและรูปแบบ' },
    { code: 'E', name: 'กลุ่ม E — การใช้ข้อมูล' },
    { code: 'F', name: 'กลุ่ม F — บทบาททางกฎหมาย' },
    { code: 'G', name: 'กลุ่ม G — การจำแนกความเสี่ยง' },
    { code: 'H', name: 'กลุ่ม H — การกำกับโดยมนุษย์' },
    { code: 'I', name: 'กลุ่ม I — สถานะและวงจรชีวิต' },
    { code: 'J', name: 'กลุ่ม J — การทบทวน' },
    { code: 'K', name: 'กลุ่ม K — ความสมบูรณ์เอกสาร' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Header Controls */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">05.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414]">
                ทะเบียนระบบปัญญาประดิษฐ์ (AI System Inventory - 55 Fields)
              </h2>
              <p className="text-xs text-[#141414]/70">
                ฐานข้อมูลแม่ (Central Hub) สำหรับบริหารจัดการและจัดเส้นทางกำกับ Fast track (5) / Standard (11) / Full (27)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddingNew(true)}
            className="px-3 py-1.5 bg-[#141414] text-white hover:bg-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border border-[#141414]"
          >
            <Plus className="w-4 h-4" /> ลงทะเบียนระบบ AI ใหม่
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2.5 border border-[#141414]">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <Search className="w-4 h-4 opacity-50 shrink-0" />
            <input
              type="text"
              placeholder="ค้นหารหัสระบบ, ชื่อระบบภาษาไทย, หรือหน่วยงาน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs font-mono bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-bold opacity-60">Governance Track Filter:</span>
            {['ALL', 'Fast track', 'Standard', 'Full'].map((track) => (
              <button
                key={track}
                onClick={() => setTrackFilter(track)}
                className={`px-2 py-0.5 border font-bold cursor-pointer ${
                  trackFilter === track ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white hover:bg-[#D4D3D0] border-[#141414]/30'
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area: High-Density Data Table */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-[#F5F4F0]">
        <div className="flex-1 overflow-y-auto p-4 border-r border-[#141414]/30">
          <div className="border border-[#141414] bg-white">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead className="bg-[#E4E3E0] sticky top-0 border-b border-[#141414]">
                <tr>
                  <th className="p-2.5 border-r border-[#141414] font-bold">UID</th>
                  <th className="p-2.5 border-r border-[#141414] font-bold">ชื่อระบบ (System Name)</th>
                  <th className="p-2.5 border-r border-[#141414] font-bold">หน่วยงาน</th>
                  <th className="p-2.5 border-r border-[#141414] font-bold">Mode</th>
                  <th className="p-2.5 border-r border-[#141414] font-bold">Risk Level</th>
                  <th className="p-2.5 border-r border-[#141414] font-bold">Track</th>
                  <th className="p-2.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSystems.map((sys) => {
                  const isSelected = selectedSystem?.system_id === sys.system_id;
                  let trackBadgeClass = 'bg-emerald-100 text-emerald-900 border-emerald-800';
                  if (sys.governance_track === 'Standard') trackBadgeClass = 'bg-blue-100 text-blue-900 border-blue-800';
                  if (sys.governance_track === 'Full') trackBadgeClass = 'bg-purple-100 text-purple-900 border-purple-800';

                  return (
                    <tr
                      key={sys.system_id}
                      onClick={() => setSelectedSystem(sys)}
                      className={`border-b border-[#141414]/10 hover:bg-[#141414]/5 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#141414]/10 font-bold' : ''
                      }`}
                    >
                      <td className="p-2.5 border-r border-[#141414]/20 font-bold text-amber-900">{sys.system_id}</td>
                      <td className="p-2.5 border-r border-[#141414]/20 font-sans max-w-[200px] truncate">
                        <div className="font-bold">{sys.system_name_th}</div>
                        <div className="text-[10px] text-[#141414]/60">{sys.short_description}</div>
                      </td>
                      <td className="p-2.5 border-r border-[#141414]/20">{sys.owner_unit}</td>
                      <td className="p-2.5 border-r border-[#141414]/20">{sys.adoption_mode}</td>
                      <td className="p-2.5 border-r border-[#141414]/20">
                        <span className={`px-1.5 py-0.5 border text-[10px] font-bold ${
                          sys.residual_risk_level === 'Level IV' ? 'bg-red-200 text-red-900 border-red-800' :
                          sys.residual_risk_level === 'Level III' ? 'bg-amber-100 text-amber-900 border-amber-800' : 'bg-emerald-100 text-emerald-900 border-emerald-800'
                        }`}>
                          {sys.residual_risk_level}
                        </span>
                      </td>
                      <td className="p-2.5 border-r border-[#141414]/20">
                        <span className={`px-1.5 py-0.5 border text-[10px] font-bold ${trackBadgeClass}`}>
                          {sys.governance_track}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        <button className="px-2 py-1 bg-[#141414] text-white text-[10px] uppercase font-bold flex items-center gap-1 ml-auto">
                          <Eye className="w-3 h-3" /> View Spec
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Detail Pane (55 Fields Inspector) */}
        {selectedSystem ? (
          <div className="w-full md:w-[480px] bg-white p-4 border-l border-[#141414] flex flex-col h-full overflow-hidden">
            <div className="border-b border-[#141414] pb-3 shrink-0">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-amber-800 px-2 py-0.5 bg-amber-100 border border-amber-800">
                  {selectedSystem.system_id}
                </span>
                <span className="text-[10px] font-mono bg-[#141414] text-white px-2 py-0.5">
                  Track: {selectedSystem.governance_track}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#141414] mt-2 font-serif italic">{selectedSystem.system_name_th}</h3>
              <p className="text-xs text-[#141414]/80 mt-1">{selectedSystem.short_description}</p>
            </div>

            {/* Field Groups Selector */}
            <div className="flex overflow-x-auto gap-1 border-b border-[#141414]/20 py-2 shrink-0 text-[10px] font-mono">
              {groupCodes.map((g) => (
                <button
                  key={g.code}
                  onClick={() => setActiveGroupTab(g.code)}
                  className={`px-2 py-1 border whitespace-nowrap font-bold cursor-pointer ${
                    activeGroupTab === g.code ? 'bg-[#141414] text-white border-[#141414]' : 'bg-[#E4E3E0] hover:bg-[#D4D3D0] border-[#141414]/20'
                  }`}
                >
                  {g.code}
                </button>
              ))}
            </div>

            {/* Selected Group Fields Listing */}
            <div className="flex-1 overflow-y-auto pt-3 space-y-2 text-xs font-mono">
              <div className="text-[10px] font-bold uppercase text-amber-800 border-b border-[#141414]/20 pb-1">
                {groupCodes.find((g) => g.code === activeGroupTab)?.name}
              </div>

              {dataModelFields
                .filter((f) => f.group_code === activeGroupTab)
                .map((field) => {
                  const val = (selectedSystem as any)[field.field_name];
                  const displayVal = typeof val === 'boolean' ? (val ? 'TRUE' : 'FALSE') : Array.isArray(val) ? val.join(', ') : val || 'N/A';

                  return (
                    <div key={field.field_name} className="p-2 bg-[#F5F4F0] border border-[#141414]/20 space-y-0.5">
                      <div className="flex justify-between font-bold text-[11px] text-[#141414]">
                        <span>{field.field_name}</span>
                        <span className="text-[9px] text-[#141414]/50">{field.type}</span>
                      </div>
                      <div className="text-[10px] text-slate-600">{field.description_th}</div>
                      <div className="p-1 bg-white border border-[#141414]/20 font-bold text-amber-950 mt-1">
                        {displayVal}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex w-[400px] bg-white p-6 border-l border-[#141414] items-center justify-center text-center text-xs text-[#141414]/60 font-mono">
            เลือกรายการระบบ AI ในตารางทางซ้ายเพื่อดูสเปก 55 Fields
          </div>
        )}
      </div>

      {/* New System Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#141414] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#141414] pb-2">
              <h3 className="text-sm font-bold uppercase font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" /> ลงทะเบียนระบบ AI เข้าสู่ AI System Inventory
              </h3>
              <button onClick={() => setIsAddingNew(false)} className="text-xs font-mono font-bold px-2 py-0.5 border border-[#141414]">
                X
              </button>
            </div>

            <form onSubmit={handleCreateSystem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold font-mono text-[10px] uppercase mb-0.5">ชื่อระบบภาษาไทย (System Name)</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ระบบ AI คัดกรองใบสมัครงาน"
                  value={newSysName}
                  onChange={(e) => setNewSysName(e.target.value)}
                  className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                />
              </div>

              <div>
                <label className="block font-bold font-mono text-[10px] uppercase mb-0.5">คำอธิบายย่อ (Short Description)</label>
                <textarea
                  rows={2}
                  placeholder="วัตถุประสงค์และขอบเขตการทำงาน..."
                  value={newSysDesc}
                  onChange={(e) => setNewSysDesc(e.target.value)}
                  className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold font-mono text-[10px] uppercase mb-0.5">หน่วยงานเจ้าของระบบ</label>
                  <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                  />
                </div>
                <div>
                  <label className="block font-bold font-mono text-[10px] uppercase mb-0.5">Adoption Mode</label>
                  <select
                    value={newAdoption}
                    onChange={(e) => setNewAdoption(e.target.value as any)}
                    className="w-full p-2 border border-[#141414] bg-[#F5F4F0] font-mono"
                  >
                    <option value="Adopter">Adopter ( Off-the-Shelf )</option>
                    <option value="Customizer">Customizer ( RAG / Fine-tune )</option>
                    <option value="Maker">Maker ( Pre-train Model )</option>
                  </select>
                </div>
              </div>

              <div className="p-2.5 bg-[#E4E3E0]/40 border border-[#141414] space-y-2">
                <label className="flex items-center gap-2 font-mono font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsGenAI}
                    onChange={(e) => setNewIsGenAI(e.target.checked)}
                  />
                  <span>เป็นระบบ Generative AI (LLM / Image Gen)</span>
                </label>
                <label className="flex items-center gap-2 font-mono font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newUsesPII}
                    onChange={(e) => setNewUsesPII(e.target.checked)}
                  />
                  <span>มีการประมวลผลข้อมูลส่วนบุคคล (PII)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#141414]">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3 py-1.5 border border-[#141414] font-mono text-xs font-bold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#141414] text-white font-mono text-xs font-bold border border-[#141414]"
                >
                  บันทึกทะเบียนระบบ AI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
