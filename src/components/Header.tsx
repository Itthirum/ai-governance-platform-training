import React from 'react';
import { Download, Database, ShieldCheck, Save, RotateCcw } from 'lucide-react';
import { useGovernance } from '../context/GovernanceContext';

interface HeaderProps {
  activeTab: string;
  onOpenExport: () => void;
  systemCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onOpenExport, systemCount }) => {
  const { resetToDefaults } = useGovernance();

  return (
    <header className="h-14 border-b border-[#141414] flex items-center justify-between px-6 bg-[#E4E3E0] shrink-0 text-[#141414]">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#141414]"></div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider">
            AI GOVERNANCE & ASSESSMENT SYSTEM
          </span>
        </div>

        <div className="hidden md:flex gap-6 border-l border-[#141414]/20 pl-6">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold opacity-50">Standard Framework</span>
            <span className="text-xs font-mono font-bold">ETDA / AIGC / ISO 42001</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold opacity-50">Legal Alignment</span>
            <span className="text-xs font-mono font-bold">ร่าง พ.ร.บ. AI ไทย (65 มาตรา)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold opacity-50">Managed Systems</span>
            <span className="text-xs font-mono font-bold">{systemCount} Active Systems</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Persistence Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-amber-100 border border-amber-900 text-[10px] font-mono font-bold text-amber-950">
          <Save className="w-3 h-3 text-amber-800" />
          <span>บันทึกอัตโนมัติ (LocalStorage)</span>
        </div>

        <button
          onClick={resetToDefaults}
          title="รีเซ็ตกลับเป็นข้อมูลตัวอย่างเริ่มต้น"
          className="hidden lg:flex px-2 py-1 bg-white hover:bg-[#D4D3D0] border border-[#141414] text-[10px] font-mono font-bold items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> รีเซ็ต
        </button>

        <button
          onClick={onOpenExport}
          className="px-3 py-1.5 bg-[#141414] text-[#E4E3E0] hover:bg-black text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 border border-[#141414] transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          Export Report / Raw Data
        </button>
      </div>
    </header>
  );
};
