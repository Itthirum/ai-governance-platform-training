import React, { useState } from 'react';
import { useCaseQuestions } from '../data/useCaseData';
import { Target, RotateCcw, ArrowRight, Zap, Sparkles, AlertCircle } from 'lucide-react';

export const UseCaseAssessorView: React.FC = () => {
  const [useCaseName, setUseCaseName] = useState('ระบบแชทบอทตอบคำถามสวัสดิการ HR (HR Chatbot)');
  const [useCaseDesc, setUseCaseDesc] = useState('ใช้ RAG และ LLM ช่วยพนักงานสืบค้นสวัสดิการขององค์กรตลอด 24 ชม.');

  const [answers, setAnswers] = useState<Record<string, number>>({
    val_1: 2, val_2: 1, val_3: 4, val_4: 4, val_5: 3, val_6: 3, // Value
    feas_1: 4, feas_2: 4, feas_3: 3, feas_4: 4, feas_5: 4,     // Feasibility
  });

  const valueQuestions = useCaseQuestions.filter((q) => q.category === 'value');
  const feasibilityQuestions = useCaseQuestions.filter((q) => q.category === 'feasibility');

  const handleSelectScore = (id: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [id]: score }));
  };

  // Calculations
  const valueScores = valueQuestions.map((q) => answers[q.id] || 0).filter((s) => s > 0);
  const avgValue = valueScores.length > 0 ? (valueScores.reduce((a, b) => a + b, 0) / valueScores.length) : 0;

  const feasScores = feasibilityQuestions.map((q) => answers[q.id] || 0).filter((s) => s > 0);
  const avgFeasibility = feasScores.length > 0 ? (feasScores.reduce((a, b) => a + b, 0) / feasScores.length) : 0;

  // Quadrant Determination
  let quadrant = 'Pending Assessment';
  let quadrantBg = 'bg-slate-100 text-slate-800 border-slate-400';
  let archetypeSuggestion = 'Adopter (Off-the-shelf)';

  if (avgValue >= 3.0 && avgFeasibility >= 3.0) {
    quadrant = 'HIGH VALUE + HIGH FEASIBILITY (Quick Win)';
    quadrantBg = 'bg-emerald-100 text-emerald-900 border-emerald-800';
    archetypeSuggestion = 'Customizer (RAG) หรือ Adopter';
  } else if (avgValue >= 3.0 && avgFeasibility < 3.0) {
    quadrant = 'HIGH VALUE + LOW FEASIBILITY (Strategic Transformation)';
    quadrantBg = 'bg-amber-100 text-amber-900 border-amber-800';
    archetypeSuggestion = 'Customizer (Fine-Tuning) หรือ Maker';
  } else if (avgValue < 3.0 && avgFeasibility >= 3.0) {
    quadrant = 'LOW VALUE + HIGH FEASIBILITY (Tactical Utility)';
    quadrantBg = 'bg-blue-100 text-blue-900 border-blue-800';
    archetypeSuggestion = 'Adopter (Off-the-Shelf)';
  } else if (avgValue < 3.0 && avgFeasibility < 3.0) {
    quadrant = 'LOW VALUE + LOW FEASIBILITY (Low Priority / Re-evaluate)';
    quadrantBg = 'bg-red-100 text-red-900 border-red-800';
    archetypeSuggestion = 'ควรทบทวนหรือยกเลิกโครงการ';
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Header Banner */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">03.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414]">
                ประเมินคุณค่าและความเป็นไปได้ (AI Use Case Canvas - O2.1)
              </h2>
              <p className="text-xs text-[#141414]/70">
                ประเมินมิติ Value vs Feasibility เพื่อจัดลำดับความสำคัญและเลือกรูปแบบการประยุกต์ใช้ (Adopter / Customizer / Maker)
              </p>
            </div>
          </div>
        </div>

        {/* Use Case Title Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-3 border border-[#141414]">
          <div>
            <label className="text-[10px] font-mono font-bold uppercase block text-[#141414]/70 mb-0.5">Use Case Name</label>
            <input
              type="text"
              value={useCaseName}
              onChange={(e) => setUseCaseName(e.target.value)}
              className="w-full text-xs font-bold p-1.5 border border-[#141414] bg-[#F5F4F0]"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono font-bold uppercase block text-[#141414]/70 mb-0.5">Short Description</label>
            <input
              type="text"
              value={useCaseDesc}
              onChange={(e) => setUseCaseDesc(e.target.value)}
              className="w-full text-xs p-1.5 border border-[#141414] bg-[#F5F4F0]"
            />
          </div>
        </div>

        {/* Quadrant Canvas Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-white border border-[#141414] space-y-1">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Value Score (1-5)</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono font-bold text-amber-800">{avgValue.toFixed(2)}</span>
              <span className="text-xs font-mono opacity-60">/ 5.00</span>
            </div>
            <div className="w-full bg-[#E4E3E0] h-1.5 border border-[#141414]/20">
              <div className="bg-amber-800 h-full" style={{ width: `${(avgValue / 5) * 100}%` }}></div>
            </div>
          </div>

          <div className="p-3 bg-white border border-[#141414] space-y-1">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Feasibility Score (1-5)</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono font-bold text-emerald-800">{avgFeasibility.toFixed(2)}</span>
              <span className="text-xs font-mono opacity-60">/ 5.00</span>
            </div>
            <div className="w-full bg-[#E4E3E0] h-1.5 border border-[#141414]/20">
              <div className="bg-emerald-800 h-full" style={{ width: `${(avgFeasibility / 5) * 100}%` }}></div>
            </div>
          </div>

          <div className="p-3 bg-white border border-[#141414] space-y-1">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Quadrant & Adoption Archetype</div>
            <div className={`mt-0.5 px-2 py-0.5 border text-xs font-mono font-bold truncate ${quadrantBg}`}>
              {quadrant}
            </div>
            <div className="text-[10px] font-mono font-bold text-[#141414]/80 mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-600" /> แนะนำ: {archetypeSuggestion}
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F5F4F0]">
        {/* Value Section */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414] border-b-2 border-[#141414] pb-1 flex justify-between items-center">
            <span>PART 1: การประเมินคุณค่าที่ได้รับ (Business Value - 6 Items)</span>
            <span className="text-amber-800 font-mono">Avg Score: {avgValue.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {valueQuestions.map((q) => {
              const current = answers[q.id] || 0;
              return (
                <div key={q.id} className="p-3 bg-white border border-[#141414] space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-[#141414]">{q.title}</span>
                    <span className="text-xs font-mono font-bold text-amber-800">{current} / 5</span>
                  </div>
                  <p className="text-[11px] text-[#141414]/70 leading-snug">{q.description}</p>

                  <div className="space-y-1">
                    {q.options.map((opt) => (
                      <button
                        key={opt.score}
                        onClick={() => handleSelectScore(q.id, opt.score)}
                        className={`w-full text-left p-1.5 text-[11px] border cursor-pointer transition-colors flex items-center justify-between ${
                          current === opt.score
                            ? 'bg-[#141414] text-white border-[#141414]'
                            : 'bg-[#F5F4F0] hover:bg-[#E4E3E0] border-[#141414]/20'
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        <span className="font-mono font-bold text-[10px] ml-2 shrink-0">{opt.score} pts</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feasibility Section */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#141414] border-b-2 border-[#141414] pb-1 flex justify-between items-center">
            <span>PART 2: การประเมินความเป็นไปได้ (Development Feasibility - 5 Items)</span>
            <span className="text-emerald-800 font-mono">Avg Score: {avgFeasibility.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {feasibilityQuestions.map((q) => {
              const current = answers[q.id] || 0;
              return (
                <div key={q.id} className="p-3 bg-white border border-[#141414] space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-[#141414]">{q.title}</span>
                    <span className="text-xs font-mono font-bold text-emerald-800">{current} / 5</span>
                  </div>
                  <p className="text-[11px] text-[#141414]/70 leading-snug">{q.description}</p>

                  <div className="space-y-1">
                    {q.options.map((opt) => (
                      <button
                        key={opt.score}
                        onClick={() => handleSelectScore(q.id, opt.score)}
                        className={`w-full text-left p-1.5 text-[11px] border cursor-pointer transition-colors flex items-center justify-between ${
                          current === opt.score
                            ? 'bg-[#141414] text-white border-[#141414]'
                            : 'bg-[#F5F4F0] hover:bg-[#E4E3E0] border-[#141414]/20'
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        <span className="font-mono font-bold text-[10px] ml-2 shrink-0">{opt.score} pts</span>
                      </button>
                    ))}
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
