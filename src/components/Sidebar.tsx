import React from 'react';
import { ViewTab } from '../types';
import { FileText, CheckSquare, Target, AlertTriangle, Layers, Scale, Sparkles, Building2, Wand2, BookOpen, Users } from 'lucide-react';

interface SidebarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  systemCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, systemCount }) => {
  const tabs: { id: ViewTab; num: string; label: string; sub: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'summary', num: '01', label: 'วิเคราะห์สรุปไฟล์โครงการ', sub: 'Comprehensive File Analysis', icon: FileText },
    { id: 'readiness', num: '02', label: 'ประเมินความพร้อมองค์กร', sub: 'AI Readiness Scan (5 Pillars)', icon: CheckSquare },
    { id: 'usecase', num: '03', label: 'ประเมินคุณค่า Use Case', sub: 'Value & Feasibility Canvas', icon: Target },
    { id: 'risk', num: '04', label: 'ประเมินความเสี่ยง AISIA', sub: 'AISIA & GenAI Risk Register', icon: AlertTriangle },
    { id: 'inventory', num: '05', label: 'ทะเบียนระบบ AI (55 Fields)', sub: 'AI System Inventory Data Model', icon: Layers },
    { id: 'law', num: '06', label: 'ร่าง พ.ร.บ. AI และ กฎหมายโลก', sub: 'Draft Thai AI Act & Global Law', icon: Scale },
    { id: 'org_manager', num: '07', label: 'จัดการหน่วยงาน & Use Case', sub: 'Organization & Spec Manager', icon: Building2 },
    { id: 'ai_generator', num: '08', label: 'GenAI ร่างรายงาน & นโยบาย', sub: 'Gemini Policy & Report Studio', icon: Wand2 },
    { id: 'guide', num: '09', label: 'คู่มือการใช้งานสำหรับมือใหม่', sub: 'Beginner AI Governance Starter', icon: BookOpen },
    { id: 'job_redesign', num: '10', label: 'ออกแบบงานคนร่วม AI', sub: 'ETDA Job Redesign & Workforce', icon: Users },
  ];

  return (
    <aside className="w-72 flex flex-col border-r border-[#141414] bg-[#E4E3E0] shrink-0 text-[#141414] h-full overflow-hidden">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#141414] bg-[#D4D3D0]">
        <div className="text-[10px] uppercase tracking-wider font-bold opacity-60 mb-1">Project Context</div>
        <h1 className="text-lg font-serif italic leading-tight uppercase font-bold text-[#141414]">
          ETDA & AIGC<br />AI Governance Platform
        </h1>
        <div className="text-[10px] font-mono mt-1 text-[#141414]/70">Ver. 2026.1 High-Density Spec</div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 opacity-50">Navigation Modules</div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left p-2.5 border transition-all cursor-pointer flex items-start gap-2.5 ${
                isActive
                  ? 'bg-[#141414] text-[#E4E3E0] border-[#141414]'
                  : 'bg-white/40 hover:bg-[#D4D3D0] border-[#141414]/20 text-[#141414]'
              }`}
            >
              <span className={`font-serif italic text-sm font-bold ${isActive ? 'text-amber-400' : 'text-[#141414]'}`}>
                {tab.num}.
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold leading-snug truncate">{tab.label}</div>
                <div className={`text-[10px] font-mono truncate ${isActive ? 'opacity-70 text-[#E4E3E0]' : 'opacity-60'}`}>
                  {tab.sub}
                </div>
              </div>
            </button>
          );
        })}

        {/* File Distribution Stats Panel */}
        <div className="pt-4 border-t border-[#141414]/20 px-2 space-y-3">
          <div className="text-[10px] uppercase font-bold opacity-60">Source Documents Processed</div>
          <div className="space-y-2 text-[11px] font-mono">
            <div className="space-y-0.5">
              <div className="flex justify-between">
                <span>1. GenAI ETDA Guideline</span>
                <span className="font-bold">63 pgs</span>
              </div>
              <div className="w-full bg-[#C4C3C0] h-1.5 border border-[#141414]/30">
                <div className="bg-[#141414] h-full w-[100%]"></div>
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between">
                <span>2. Train The Trainer Slides</span>
                <span className="font-bold">141 pgs</span>
              </div>
              <div className="w-full bg-[#C4C3C0] h-1.5 border border-[#141414]/30">
                <div className="bg-[#141414] h-full w-[100%]"></div>
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between">
                <span>3. ร่าง พ.ร.บ. AI (65 มาตรา)</span>
                <span className="font-bold">24 pgs</span>
              </div>
              <div className="w-full bg-[#C4C3C0] h-1.5 border border-[#141414]/30">
                <div className="bg-[#141414] h-full w-[100%]"></div>
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between">
                <span>4. Governance Flow & Data Model</span>
                <span className="font-bold">55 fields</span>
              </div>
              <div className="w-full bg-[#C4C3C0] h-1.5 border border-[#141414]/30">
                <div className="bg-[#141414] h-full w-[100%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Engine Monitor */}
        <div className="pt-3 px-2">
          <div className="text-[10px] uppercase font-bold opacity-60 mb-1">Governance Status</div>
          <div className="bg-[#141414] text-[#E4E3E0] p-2.5 font-mono text-[10px] leading-tight space-y-1 border border-[#141414]">
            <div className="text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> VERIFY_RULES: OK
            </div>
            <div>TRACK_LOGIC: 3-TIER ACTIVE</div>
            <div>GENAI_PROFILE: NIST 12 RISKS</div>
            <div>INVENTORY_RECORDS: {systemCount}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#141414] bg-[#141414] text-[#E4E3E0] shrink-0">
        <div className="text-[10px] uppercase font-bold opacity-60">ETDA AIGC Reference</div>
        <div className="text-xs font-mono mt-0.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          aigc@etda.or.th | 02 123 1237
        </div>
      </div>
    </aside>
  );
};
