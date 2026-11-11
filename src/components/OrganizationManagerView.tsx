import React, { useState } from 'react';
import { AISystemRecord } from '../types';
import { dataModelFields, determineGovernanceTrack } from '../data/inventoryData';
import { useGovernance, OrgUnit } from '../context/GovernanceContext';
import { Building2, Plus, Edit3, Trash2, Save, Sparkles, CheckCircle2, ChevronRight, Filter, Search, Eye } from 'lucide-react';

export const OrganizationManagerView: React.FC = () => {
  const { systems, orgUnits, addOrgUnit, updateSystem, deleteOrgUnit, deleteSystem } = useGovernance();
  const [activeSubTab, setActiveSubTab] = useState<'org-units' | 'system-editor'>('org-units');

  // New Org State
  const [isAddingOrg, setIsAddingOrg] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgLead, setNewOrgLead] = useState('');
  const [newOrgEmail, setNewOrgEmail] = useState('');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Editing System Modal/Drawer State
  const [editingSystem, setEditingSystem] = useState<AISystemRecord | null>(null);

  // Handle Add New Org Unit
  const handleAddOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName) return;

    const newUnit: OrgUnit = {
      id: `ORG-0${orgUnits.length + 1}`,
      name_th: newOrgName,
      executive_lead: newOrgLead || 'ผู้บริหารประจำหน่วยงาน',
      contact_email: newOrgEmail || 'contact@organization.or.th',
      ai_systems_count: 0,
    };

    addOrgUnit(newUnit);
    setNewOrgName('');
    setNewOrgLead('');
    setNewOrgEmail('');
    setIsAddingOrg(false);
  };

  // Handle Save System Edits
  const handleSaveSystemEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSystem) return;

    updateSystem(editingSystem);
    setEditingSystem(null);
  };

  // Filter orgs & systems
  const filteredOrgs = orgUnits.filter(
    (o) =>
      o.name_th.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.executive_lead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSystems = systems.filter(
    (s) =>
      s.system_name_th.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.owner_unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.system_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Header Banner */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">07.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414]">
                จัดการโครงสร้างหน่วยงาน & เพิ่มเติมข้อมูลระบบ AI (Organization & Use Case Manager)
              </h2>
              <p className="text-xs text-[#141414]/70">
                เพิ่ม/แก้ไขรายชื่อหน่วยงานในองค์กร, ลงทะเบียน Use Case ใหม่ และปรับปรุงข้อกำหนด 55 Fields ได้อิสระ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 border border-[#141414]">
            <button
              onClick={() => setActiveSubTab('org-units')}
              className={`px-3 py-1 font-mono text-xs font-bold cursor-pointer ${
                activeSubTab === 'org-units' ? 'bg-[#141414] text-white' : 'bg-transparent hover:bg-[#D4D3D0]'
              }`}
            >
              จัดการรายชื่อหน่วยงาน ({orgUnits.length})
            </button>
            <button
              onClick={() => setActiveSubTab('system-editor')}
              className={`px-3 py-1 font-mono text-xs font-bold cursor-pointer ${
                activeSubTab === 'system-editor' ? 'bg-[#141414] text-white' : 'bg-transparent hover:bg-[#D4D3D0]'
              }`}
            >
              แก้ไขรายละเอียด Use Case / 55 Fields ({systems.length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white p-2 border border-[#141414] text-xs font-mono">
          <Search className="w-4 h-4 opacity-50 shrink-0" />
          <input
            type="text"
            placeholder="ค้นหาชื่อหน่วยงาน, ชื่อระบบ AI, หรือรหัสอ้างอิง..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F5F4F0] space-y-4">
        {activeSubTab === 'org-units' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b-2 border-[#141414] pb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414]">
                รายชื่อหน่วยงานเจ้าของภารกิจ (Organization Units Registry)
              </span>
              <button
                onClick={() => setIsAddingOrg(true)}
                className="px-3 py-1 bg-[#141414] text-white text-xs font-mono font-bold uppercase flex items-center gap-1 cursor-pointer border border-[#141414]"
              >
                <Plus className="w-3.5 h-3.5" /> เพิ่มหน่วยงานใหม่
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredOrgs.map((unit) => {
                const countInUnit = systems.filter((s) => s.owner_unit.includes(unit.name_th) || unit.name_th.includes(s.owner_unit)).length;

                return (
                  <div key={unit.id} className="p-4 bg-white border border-[#141414] space-y-3 relative group">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-800 px-2 py-0.5">
                        {unit.id}
                      </span>
                      <span className="font-mono text-[10px] font-bold bg-[#141414] text-white px-2 py-0.5">
                        {countInUnit} ระบบ AI
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#141414] font-serif italic">{unit.name_th}</h3>
                      <div className="text-xs text-[#141414]/80 mt-1 space-y-0.5 font-mono">
                        <div>
                          <strong>ผู้รับผิดชอบหลัก:</strong> {unit.executive_lead}
                        </div>
                        <div>
                          <strong>อีเมลติดต่อ:</strong> {unit.contact_email}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#141414]/10 flex justify-between items-center text-[10px] font-mono">
                      <span className="text-emerald-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> สภาพพร้อมประเมิน
                      </span>
                      <button
                        onClick={() => {
                          setActiveSubTab('system-editor');
                          setSearchQuery(unit.name_th);
                        }}
                        className="px-2 py-0.5 border border-[#141414] hover:bg-[#141414] hover:text-white font-bold cursor-pointer transition-colors"
                      >
                        ดูสเปกระบบ AI ของหน่วยงานนี้
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* System Editor & 55 Fields Manager */
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b-2 border-[#141414] pb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414]">
                จัดการสเปกระบบ AI รายตัว (System Spec & 55 Fields Editor)
              </span>
              <span className="text-xs font-mono text-amber-800 font-bold">
                คลิก "แก้ไขข้อกำหนด" เพื่อปรับปรุงข้อมูล 55 Fields
              </span>
            </div>

            <div className="space-y-3">
              {filteredSystems.map((sys) => (
                <div key={sys.system_id} className="p-4 bg-white border border-[#141414] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#141414]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 border border-amber-800 px-2 py-0.5">
                        {sys.system_id}
                      </span>
                      <h3 className="text-sm font-bold text-[#141414] font-serif italic">{sys.system_name_th}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 border font-mono text-[10px] font-bold bg-[#141414] text-white">
                        Track: {sys.governance_track}
                      </span>
                      <button
                        onClick={() => setEditingSystem(sys)}
                        className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white font-mono text-xs font-bold border border-amber-900 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> แก้ไขข้อกำหนด (Edit 55 Fields)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs font-mono bg-[#F5F4F0] p-3 border border-[#141414]/20">
                    <div>
                      <span className="text-[10px] opacity-60 font-bold uppercase block">หน่วยงานเจ้าของ</span>
                      <span className="font-bold text-[#141414]">{sys.owner_unit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] opacity-60 font-bold uppercase block">รูปแบบการประยุกต์ใช้</span>
                      <span className="font-bold text-[#141414]">{sys.adoption_mode}</span>
                    </div>
                    <div>
                      <span className="text-[10px] opacity-60 font-bold uppercase block">Generative AI Profile</span>
                      <span className={`font-bold ${sys.is_generative_ai ? 'text-purple-900' : 'text-slate-700'}`}>
                        {sys.is_generative_ai ? 'ใช่ (Generative AI)' : 'ไม่ใช่ (Non-GenAI)'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] opacity-60 font-bold uppercase block">สถานะวงจรชีวิต</span>
                      <span className="font-bold text-amber-900">{sys.lifecycle_status}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#141414]/80 leading-relaxed font-sans">{sys.short_description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add New Org Unit */}
      {isAddingOrg && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#141414] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#141414] pb-2">
              <h3 className="text-sm font-bold uppercase font-mono flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-700" /> เพิ่มรายชื่อหน่วยงานใหม่
              </h3>
              <button onClick={() => setIsAddingOrg(false)} className="text-xs font-mono font-bold px-2 py-0.5 border border-[#141414]">
                X
              </button>
            </div>

            <form onSubmit={handleAddOrg} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block font-bold text-[10px] uppercase mb-0.5">ชื่อหน่วยงาน/ฝ่ายงาน (ภาษาไทย)</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ฝ่ายบริหารความเสี่ยงและกฎหมาย"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                />
              </div>

              <div>
                <label className="block font-bold text-[10px] uppercase mb-0.5">ผู้บริหารที่รับผิดชอบ (Executive Lead)</label>
                <input
                  type="text"
                  placeholder="เช่น ผู้อำนวยการฝ่ายกฎหมาย"
                  value={newOrgLead}
                  onChange={(e) => setNewOrgLead(e.target.value)}
                  className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                />
              </div>

              <div>
                <label className="block font-bold text-[10px] uppercase mb-0.5">อีเมลติดต่อประจำหน่วยงาน</label>
                <input
                  type="email"
                  placeholder="legal@organization.or.th"
                  value={newOrgEmail}
                  onChange={(e) => setNewOrgEmail(e.target.value)}
                  className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#141414]">
                <button
                  type="button"
                  onClick={() => setIsAddingOrg(false)}
                  className="px-3 py-1.5 border border-[#141414] text-xs font-bold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#141414] text-white text-xs font-bold border border-[#141414]"
                >
                  บันทึกหน่วยงาน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit AI System 55 Fields */}
      {editingSystem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-2 border-[#141414] max-w-2xl w-full p-6 space-y-4 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-[#141414] pb-2">
              <h3 className="text-sm font-bold uppercase font-mono flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-700" /> แก้ไขข้อกำหนด 55 Fields: {editingSystem.system_id}
              </h3>
              <button onClick={() => setEditingSystem(null)} className="text-xs font-mono font-bold px-2 py-0.5 border border-[#141414]">
                X
              </button>
            </div>

            <form onSubmit={handleSaveSystemEdit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[10px] uppercase mb-0.5">ชื่อระบบภาษาไทย</label>
                  <input
                    type="text"
                    value={editingSystem.system_name_th}
                    onChange={(e) => setEditingSystem({ ...editingSystem, system_name_th: e.target.value })}
                    className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[10px] uppercase mb-0.5">หน่วยงานเจ้าของระบบ</label>
                  <select
                    value={editingSystem.owner_unit}
                    onChange={(e) => setEditingSystem({ ...editingSystem, owner_unit: e.target.value })}
                    className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                  >
                    {orgUnits.map((o) => (
                      <option key={o.id} value={o.name_th}>
                        {o.name_th}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[10px] uppercase mb-0.5">คำอธิบายสรุปหน้าที่ (Short Description)</label>
                <textarea
                  rows={2}
                  value={editingSystem.short_description}
                  onChange={(e) => setEditingSystem({ ...editingSystem, short_description: e.target.value })}
                  className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[10px] uppercase mb-0.5">Adoption Mode</label>
                  <select
                    value={editingSystem.adoption_mode}
                    onChange={(e) => setEditingSystem({ ...editingSystem, adoption_mode: e.target.value as any })}
                    className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                  >
                    <option value="Adopter">Adopter</option>
                    <option value="Customizer">Customizer</option>
                    <option value="Maker">Maker</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[10px] uppercase mb-0.5">Residual Risk Level</label>
                  <select
                    value={editingSystem.residual_risk_level}
                    onChange={(e) => setEditingSystem({ ...editingSystem, residual_risk_level: e.target.value as any })}
                    className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                  >
                    <option value="Level I">Level I</option>
                    <option value="Level II">Level II</option>
                    <option value="Level III">Level III</option>
                    <option value="Level IV">Level IV</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[10px] uppercase mb-0.5">สถานะวงจรชีวิต</label>
                  <select
                    value={editingSystem.lifecycle_status}
                    onChange={(e) => setEditingSystem({ ...editingSystem, lifecycle_status: e.target.value as any })}
                    className="w-full p-2 border border-[#141414] bg-[#F5F4F0]"
                  >
                    <option value="เสนอแนวคิด">เสนอแนวคิด</option>
                    <option value="อนุมัติแล้ว">อนุมัติแล้ว</option>
                    <option value="กำลังพัฒนา">กำลังพัฒนา</option>
                    <option value="ทดสอบ">ทดสอบ</option>
                    <option value="ใช้งานจริง">ใช้งานจริง</option>
                    <option value="ระงับชั่วคราว">ระงับชั่วคราว</option>
                    <option value="ยุติการใช้งาน">ยุติการใช้งาน</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[#E4E3E0]/50 border border-[#141414] space-y-2">
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSystem.is_generative_ai}
                    onChange={(e) => setEditingSystem({ ...editingSystem, is_generative_ai: e.target.checked })}
                  />
                  <span>เป็นระบบ Generative AI (เปิดใช้งาน 12 GenAI Risk Profiling)</span>
                </label>

                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSystem.uses_personal_data}
                    onChange={(e) => setEditingSystem({ ...editingSystem, uses_personal_data: e.target.checked })}
                  />
                  <span>มีการประมวลผลข้อมูลส่วนบุคคล (PDPA PII)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#141414]">
                <button
                  type="button"
                  onClick={() => setEditingSystem(null)}
                  className="px-3 py-1.5 border border-[#141414] text-xs font-bold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#141414] text-white text-xs font-bold border border-[#141414] flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> บันทึกการเปลี่ยนแปลง (55 Fields)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
