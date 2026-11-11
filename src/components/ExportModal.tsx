import React, { useState } from 'react';
import { Download, Copy, Check, X, FileText } from 'lucide-react';
import { useGovernance } from '../context/GovernanceContext';
import { dataModelFields } from '../data/inventoryData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { systems } = useGovernance();
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'summary' | 'inventory_json' | 'datamodel_spec'>('summary');

  if (!isOpen) return null;

  let exportDataString = '';

  if (exportFormat === 'summary') {
    exportDataString = `================================================================
ETDA / AIGC AI GOVERNANCE EXECUTIVE ASSESSMENT REPORT
Generated Date: ${new Date().toISOString()}
================================================================

1. EXECUTIVE OVERVIEW
- Active AI Systems Registered: ${systems.length}
- Standard Frameworks Applied: ETDA GenAI Guideline (Vol 1), ISO/IEC 42001:2023, ISO 23894, NIST AI RMF
- Thai AI Law Alignment: Draft Thai AI Act (65 Sections, Penalties up to 5M THB)

2. MANAGED AI SYSTEMS INVENTORY SUMMARY
${systems
  .map(
    (s) =>
      `[${s.system_id}] ${s.system_name_th}\n  - Owner: ${s.owner_unit} | Mode: ${s.adoption_mode}\n  - Residual Risk: ${s.residual_risk_level} | Track: ${s.governance_track}\n  - Oversight: ${s.human_oversight_level}`
  )
  .join('\n\n')}

3. GOVERNANCE TRACK DISTRIBUTION
- Fast Track (5 Outputs): ${systems.filter((s) => s.governance_track === 'Fast track').length}
- Standard Track (11 Outputs): ${systems.filter((s) => s.governance_track === 'Standard').length}
- Full Track (27 Outputs): ${systems.filter((s) => s.governance_track === 'Full').length}
`;
  } else if (exportFormat === 'inventory_json') {
    exportDataString = JSON.stringify(systems, null, 2);
  } else if (exportFormat === 'datamodel_spec') {
    exportDataString = JSON.stringify(dataModelFields, null, 2);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(exportDataString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#E4E3E0] border-2 border-[#141414] max-w-2xl w-full p-6 space-y-4 shadow-2xl text-[#141414]">
        <div className="flex justify-between items-center border-b border-[#141414] pb-2">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-800" />
            <h3 className="text-sm font-bold uppercase font-mono">EXPORT REPORT / RAW DATA SPECIFICATION</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#D4D3D0] border border-[#141414] text-xs font-mono font-bold cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex gap-2 text-xs font-mono">
          <button
            onClick={() => setExportFormat('summary')}
            className={`px-3 py-1 border font-bold cursor-pointer ${
              exportFormat === 'summary' ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white hover:bg-[#D4D3D0]'
            }`}
          >
            Executive Report (Text)
          </button>
          <button
            onClick={() => setExportFormat('inventory_json')}
            className={`px-3 py-1 border font-bold cursor-pointer ${
              exportFormat === 'inventory_json' ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white hover:bg-[#D4D3D0]'
            }`}
          >
            AI System Inventory (JSON)
          </button>
          <button
            onClick={() => setExportFormat('datamodel_spec')}
            className={`px-3 py-1 border font-bold cursor-pointer ${
              exportFormat === 'datamodel_spec' ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white hover:bg-[#D4D3D0]'
            }`}
          >
            55-Field Data Model Spec (JSON)
          </button>
        </div>

        {/* Data Box */}
        <div className="bg-[#141414] text-[#E4E3E0] p-3 font-mono text-xs overflow-x-auto h-64 border border-[#141414]">
          <pre className="whitespace-pre-wrap leading-relaxed">{exportDataString}</pre>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-[#141414]">
          <span className="text-[10px] font-mono opacity-60">Ready for clipboard or PDF export pipeline</span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 bg-[#141414] text-white hover:bg-black font-mono text-xs font-bold border border-[#141414] flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'คัดลอกสำเร็จ!' : 'Copy Raw Text'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-[#141414] font-mono text-xs font-bold bg-white hover:bg-[#D4D3D0] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
