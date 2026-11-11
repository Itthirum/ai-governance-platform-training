import React, { useState } from 'react';
import { unacceptableRiskChecks, coreRiskDimensions, coreRiskItems, calculateRiskLevel } from '../data/riskData';
import { ShieldAlert, AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw, Zap, Info } from 'lucide-react';

export const RiskAssessorView: React.FC = () => {
  // Unacceptable Risk State (Yes/No)
  const [unacceptableAnswers, setUnacceptableAnswers] = useState<Record<string, boolean>>({
    unacceptable_1: false,
    unacceptable_2: false,
    unacceptable_3: false,
    unacceptable_4: false,
  });

  // GenAI Feature Toggle
  const [isGenAI, setIsGenAI] = useState<boolean>(true);

  // Risk Rating State: item_id -> { likelihood: 1-5, severity: 1-5 }
  const [riskRatings, setRiskRatings] = useState<Record<string, { likelihood: number; severity: number }>>({
    r_data_1: { likelihood: 3, severity: 2 }, // score 6 -> Level II
    r_data_2: { likelihood: 2, severity: 3 }, // score 6 -> Level II
    r_fair_1: { likelihood: 3, severity: 3 }, // score 9 -> Level II
    r_fair_3: { likelihood: 4, severity: 3 }, // score 12 -> Level III
    r_sec_1: { likelihood: 2, severity: 4 },  // score 8 -> Level II
    r_priv_1: { likelihood: 3, severity: 3 }, // score 9 -> Level II
    r_trust_1: { likelihood: 4, severity: 3 },// score 12 -> Level III (Hallucination)
    r_gen_1: { likelihood: 3, severity: 3 },  // IP
  });

  const hasUnacceptableRisk = Object.values(unacceptableAnswers).some((v) => v === true);

  const handleUnacceptableToggle = (id: string, val: boolean) => {
    setUnacceptableAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleRatingChange = (id: string, field: 'likelihood' | 'severity', val: number) => {
    setRiskRatings((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || { likelihood: 1, severity: 1 }),
        [field]: val,
      },
    }));
  };

  // Calculate highest risk level
  type RiskLevel = 'Level I' | 'Level II' | 'Level III' | 'Level IV';
  const levelOrder: Record<RiskLevel, number> = { 'Level I': 1, 'Level II': 2, 'Level III': 3, 'Level IV': 4 };

  const ratedItems = coreRiskItems.filter((item) => !item.isGenAiSpecific || isGenAI);

  let highestLevel: RiskLevel = 'Level I';
  for (const item of ratedItems) {
    const rating = riskRatings[item.id] || { likelihood: 1, severity: 1 };
    const level: RiskLevel = calculateRiskLevel(rating.likelihood, rating.severity);
    if (levelOrder[level] > levelOrder[highestLevel]) {
      highestLevel = level;
    }
  }

  const currentComputedLevel: RiskLevel = hasUnacceptableRisk ? 'Level IV' : highestLevel;

  // Human Oversight & Track Mapping
  let humanOversight = 'Human-out-of-the-loop (สุ่มตรวจ)';
  let governanceTrack = 'Fast track (5 เอกสาร)';
  let levelBadgeColor = 'bg-[#141414] text-white';

  if (hasUnacceptableRisk) {
    humanOversight = 'STOP SERVICE (ไม่อนุญาตให้ใช้งาน)';
    governanceTrack = 'PROHIBITED';
    levelBadgeColor = 'bg-red-800 text-white border-red-900';
  } else if (currentComputedLevel === 'Level IV') {
    humanOversight = 'Human-in-the-loop (มนุษย์ตรวจสอบก่อนทุกกรณี)';
    governanceTrack = 'Full track (27 เอกสาร)';
    levelBadgeColor = 'bg-red-700 text-white border-red-900';
  } else if (currentComputedLevel === 'Level III') {
    humanOversight = 'Human-in-the-loop (มนุษย์รีวิวผลลัพธ์ย้อนหลัง/สุ่มตรวจ)';
    governanceTrack = 'Standard track (11 เอกสาร)';
    levelBadgeColor = 'bg-amber-700 text-white border-amber-900';
  } else if (currentComputedLevel === 'Level II') {
    humanOversight = 'Human-over-the-loop (มนุษย์เฝ้าดูและแทรกแซงได้)';
    governanceTrack = 'Standard track (11 เอกสาร)';
    levelBadgeColor = 'bg-blue-700 text-white border-blue-900';
  } else {
    humanOversight = 'Human-out-of-the-loop (สุ่มตรวจตามรอบ)';
    governanceTrack = 'Fast track (5 เอกสาร)';
    levelBadgeColor = 'bg-emerald-800 text-white border-emerald-900';
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Header Banner */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">04.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414]">
                ประเมินผลกระทบและความเสี่ยงระบบ AI (AISIA & Risk Assessment)
              </h2>
              <p className="text-xs text-[#141414]/70">
                ประเมินด่าน Unacceptable Risk + 6 มิติหลัก และมิติเฉพาะ GenAI ตาม ISO 23894 & NIST AI RMF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold font-mono uppercase flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1 border border-[#141414]">
              <input
                type="checkbox"
                checked={isGenAI}
                onChange={(e) => setIsGenAI(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span>ระบบนี้ใช้ Generative AI (เปิดใช้งาน 12 GenAI Risks)</span>
            </label>
          </div>
        </div>

        {/* Risk Evaluation Outcome Card */}
        <div className="p-3 bg-white border border-[#141414] grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
          <div className="border-r border-[#141414]/20 pr-3">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Unacceptable Risk Status</div>
            <div className={`mt-1 font-mono text-xs font-bold px-2 py-0.5 border inline-flex items-center gap-1 ${
              hasUnacceptableRisk ? 'bg-red-200 text-red-900 border-red-800' : 'bg-emerald-100 text-emerald-900 border-emerald-800'
            }`}>
              {hasUnacceptableRisk ? <ShieldAlert className="w-3.5 h-3.5 text-red-700" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />}
              {hasUnacceptableRisk ? 'FAIL (พบความเสี่ยงต้องห้าม)' : 'PASS (ผ่านด่านสแกน)'}
            </div>
          </div>

          <div className="border-r border-[#141414]/20 pr-3">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Highest Inherent Risk Level</div>
            <div className={`mt-1 text-xs font-mono font-bold px-2 py-0.5 border inline-block ${levelBadgeColor}`}>
              {highestLevel}
            </div>
          </div>

          <div className="border-r border-[#141414]/20 pr-3">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Required Governance Track</div>
            <div className="text-xs font-mono font-bold text-[#141414] mt-1">{governanceTrack}</div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Human Oversight Requirement</div>
            <div className="text-xs font-sans font-bold text-amber-800 mt-1 truncate">{humanOversight}</div>
          </div>
        </div>
      </div>

      {/* Main Assessment List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F5F4F0]">
        {/* SECTION A: Unacceptable Risk */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414] border-b-2 border-[#141414] pb-1 flex justify-between items-center bg-red-50 p-2">
            <span className="flex items-center gap-2 text-red-900">
              <ShieldAlert className="w-4 h-4 text-red-700" />
              SECTION A: ตรวจสอบความเสี่ยงที่ไม่สามารถยอมรับให้เกิดได้ (Unacceptable Risk - GATEKEEPER)
            </span>
            <span className="text-[10px] font-mono font-bold text-red-800">หากตอบ "ใช่" แม้แต่ข้อเดียว ระบบต้องหยุดทันที</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {unacceptableRiskChecks.map((item) => {
              const isChecked = unacceptableAnswers[item.id];
              return (
                <div
                  key={item.id}
                  className={`p-3 border text-xs transition-all ${
                    isChecked ? 'bg-red-100 border-red-800 text-red-950' : 'bg-white border-[#141414]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="font-bold text-sm block">{item.title}</span>
                      <p className="text-[#141414]/80 text-[11px] leading-snug">{item.description}</p>
                      <div className="text-[10px] font-mono opacity-70">ฐานกฎหมาย: {item.legalBasis}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleUnacceptableToggle(item.id, false)}
                        className={`px-3 py-1 border text-xs font-mono font-bold cursor-pointer ${
                          !isChecked ? 'bg-emerald-800 text-white border-emerald-900' : 'bg-white hover:bg-[#D4D3D0]'
                        }`}
                      >
                        ไม่ใช่ (NO)
                      </button>
                      <button
                        onClick={() => handleUnacceptableToggle(item.id, true)}
                        className={`px-3 py-1 border text-xs font-mono font-bold cursor-pointer ${
                          isChecked ? 'bg-red-800 text-white border-red-900 animate-pulse' : 'bg-white hover:bg-red-100 text-red-800'
                        }`}
                      >
                        ใช่ (YES - FAIL)
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION B: Tolerable Risk Assessment */}
        <div className="space-y-4 pt-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414] border-b-2 border-[#141414] pb-1 flex justify-between items-center">
            <span>SECTION B: ตรวจสอบความเสี่ยงที่ยอมรับให้เกิดได้ (Tolerable Risk Matrix - 6 Dimensions + GenAI)</span>
            <span className="text-xs font-mono">Risk = Likelihood (1-5) × Severity (1-5)</span>
          </div>

          <div className="space-y-4">
            {ratedItems.map((item) => {
              const rating = riskRatings[item.id] || { likelihood: 1, severity: 1 };
              const score = rating.likelihood * rating.severity;
              const level = calculateRiskLevel(rating.likelihood, rating.severity);

              let badgeStyle = 'bg-emerald-100 text-emerald-900 border-emerald-800';
              if (level === 'Level IV') badgeStyle = 'bg-red-200 text-red-900 border-red-800 font-bold';
              else if (level === 'Level III') badgeStyle = 'bg-amber-100 text-amber-900 border-amber-800';
              else if (level === 'Level II') badgeStyle = 'bg-blue-100 text-blue-900 border-blue-800';

              return (
                <div key={item.id} className="p-3.5 bg-white border border-[#141414] space-y-2">
                  <div className="flex flex-wrap justify-between items-start gap-2 border-b border-[#141414]/10 pb-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-800 mr-2">
                        {item.dimensionName}
                      </span>
                      {item.isGenAiSpecific && (
                        <span className="text-[9px] font-mono font-bold bg-purple-200 text-purple-900 px-1.5 py-0.2 border border-purple-800 mr-2">
                          GenAI Profile
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-[#141414]">{item.title}</h4>
                      <p className="text-[11px] text-[#141414]/80 mt-0.5">{item.description}</p>
                      <p className="text-[10px] font-sans text-red-700 mt-0.5"><strong>ผลกระทบ:</strong> {item.impactText}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] font-mono opacity-60">Score: {rating.likelihood} × {rating.severity} = {score}</div>
                        <div className={`px-2 py-0.5 border text-xs font-mono font-bold mt-0.5 ${badgeStyle}`}>
                          {level}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating Controls: Likelihood & Severity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F4F0] p-2.5 border border-[#141414]/20 text-xs font-mono">
                    <div>
                      <label className="block text-[10px] font-bold uppercase mb-1">
                        โอกาสที่จะเกิดขึ้น (Likelihood 1-5):
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            onClick={() => handleRatingChange(item.id, 'likelihood', num)}
                            className={`flex-1 py-1 border text-center font-bold cursor-pointer transition-colors ${
                              rating.likelihood === num
                                ? 'bg-[#141414] text-white border-[#141414]'
                                : 'bg-white hover:bg-[#D4D3D0] border-[#141414]/30'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase mb-1">
                        ระดับความรุนแรงของผลกระทบ (Severity 1-5):
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            onClick={() => handleRatingChange(item.id, 'severity', num)}
                            className={`flex-1 py-1 border text-center font-bold cursor-pointer transition-colors ${
                              rating.severity === num
                                ? 'bg-[#141414] text-white border-[#141414]'
                                : 'bg-white hover:bg-[#D4D3D0] border-[#141414]/30'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
