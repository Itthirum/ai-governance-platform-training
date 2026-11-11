import React, { useState } from 'react';
import { readinessQuestions, readinessPillars, calculateReadinessScore } from '../data/readinessData';
import { CheckCircle2, RotateCcw, Award, Info, HelpCircle, ArrowRight } from 'lucide-react';

export const ReadinessScanView: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 3, 2: 3, 3: 2, 4: 3, // Pillar 1
    5: 2, 6: 2,             // Pillar 2
    7: 3, 8: 3,             // Pillar 3
    9: 2, 10: 3,            // Pillar 4
    11: 3, 12: 2,           // Pillar 5
  });

  const [activePillarFilter, setActivePillarFilter] = useState<number | null>(null);

  const scoreResult = calculateReadinessScore(answers);

  const handleSelectOption = (qId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: score }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  const handleFillSample = (level: 'low' | 'mid' | 'high') => {
    const sampleMap: Record<string, Record<number, number>> = {
      low: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1 },
      mid: { 1: 2, 2: 3, 3: 2, 4: 2, 5: 2, 6: 2, 7: 3, 8: 2, 9: 2, 10: 3, 11: 2, 12: 2 },
      high: { 1: 4, 2: 4, 3: 3, 4: 4, 5: 3, 6: 3, 7: 4, 8: 4, 9: 4, 10: 4, 11: 4, 12: 3 },
    };
    setAnswers(sampleMap[level]);
  };

  const filteredQuestions = activePillarFilter
    ? readinessQuestions.filter((q) => q.pillarId === activePillarFilter)
    : readinessQuestions;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white text-[#141414]">
      {/* Top Banner & Control */}
      <div className="p-4 border-b border-[#141414] bg-[#E4E3E0]/60 shrink-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif italic font-bold">02.</span>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-[#141414]">
                แบบประเมินความพร้อมองค์กร 5 ด้าน (AI Readiness Scan)
              </h2>
              <p className="text-xs text-[#141414]/70">
                อ้างอิงกรอบการประเมินความพร้อมในการนำ AI มาใช้งานโดย ETDA และศูนย์ AIGC
              </p>
            </div>
          </div>

          {/* Quick Presets & Reset */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase opacity-60">Sample Presets:</span>
            <button
              onClick={() => handleFillSample('low')}
              className="px-2.5 py-1 bg-white border border-[#141414] hover:bg-[#D4D3D0] text-[10px] font-mono font-bold cursor-pointer"
            >
              Initial Stage
            </button>
            <button
              onClick={() => handleFillSample('mid')}
              className="px-2.5 py-1 bg-white border border-[#141414] hover:bg-[#D4D3D0] text-[10px] font-mono font-bold cursor-pointer"
            >
              Developing
            </button>
            <button
              onClick={() => handleFillSample('high')}
              className="px-2.5 py-1 bg-white border border-[#141414] hover:bg-[#D4D3D0] text-[10px] font-mono font-bold cursor-pointer"
            >
              Advanced
            </button>
            <button
              onClick={handleReset}
              className="px-2.5 py-1 bg-[#141414] text-white hover:bg-black text-[10px] font-mono font-bold cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {/* Score & Maturity Banner Card */}
        <div className="p-3 bg-white border border-[#141414] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-1 border-r border-[#141414]/20 pr-4">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Overall Maturity Score</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-mono font-bold">{scoreResult.totalScore}</span>
              <span className="text-sm font-mono text-[#141414]/60">/ {scoreResult.maxTotalScore} ({scoreResult.percentage}%)</span>
            </div>
            <div className="w-full bg-[#E4E3E0] h-2 mt-1.5 border border-[#141414]/20">
              <div className="bg-[#141414] h-full transition-all duration-300" style={{ width: `${scoreResult.percentage}%` }}></div>
            </div>
          </div>

          <div className="md:col-span-1 border-r border-[#141414]/20 pr-4">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">Maturity Classification</div>
            <div className={`mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 border text-xs font-mono font-bold ${scoreResult.levelColor}`}>
              <Award className="w-3.5 h-3.5" />
              {scoreResult.maturityLevel}
            </div>
            <div className="text-[10px] font-mono opacity-60 mt-1">
              ตอบแล้ว {scoreResult.answeredCount} จาก {scoreResult.totalQuestions} ข้อ
            </div>
          </div>

          <div className="md:col-span-2 space-y-1">
            <div className="text-[10px] font-mono uppercase font-bold text-[#141414]/60">5 Pillars Breakdown</div>
            <div className="grid grid-cols-5 gap-1.5 text-[10px] font-mono">
              {readinessPillars.map((p) => {
                const scoreObj = scoreResult.pillarScores[p.id];
                const pPct = scoreObj.max > 0 ? Math.round((scoreObj.score / scoreObj.max) * 100) : 0;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePillarFilter(activePillarFilter === p.id ? null : p.id)}
                    className={`p-1.5 border text-left cursor-pointer transition-colors ${
                      activePillarFilter === p.id ? 'bg-[#141414] text-white border-[#141414]' : 'bg-[#E4E3E0]/40 border-[#141414]/20 hover:bg-[#E4E3E0]'
                    }`}
                  >
                    <div className="truncate font-bold">{p.shortName}</div>
                    <div className="text-[11px] font-bold mt-0.5">{pPct}%</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pillar Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[10px] font-mono font-bold uppercase opacity-60 mr-1">Filter Pillar:</span>
          <button
            onClick={() => setActivePillarFilter(null)}
            className={`px-2 py-0.5 border text-[11px] font-mono font-bold cursor-pointer ${
              activePillarFilter === null ? 'bg-[#141414] text-white' : 'bg-white hover:bg-[#D4D3D0]'
            }`}
          >
            All Pillars (12)
          </button>
          {readinessPillars.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePillarFilter(p.id)}
              className={`px-2 py-0.5 border text-[11px] font-mono font-bold cursor-pointer ${
                activePillarFilter === p.id ? 'bg-[#141414] text-white' : 'bg-white hover:bg-[#D4D3D0]'
              }`}
            >
              {p.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F5F4F0]">
        {filteredQuestions.map((q) => {
          const currentScore = answers[q.id] || 0;
          return (
            <div key={q.id} className="p-4 border border-[#141414] bg-white space-y-3">
              <div className="flex items-start justify-between gap-3 border-b border-[#141414]/10 pb-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold bg-[#141414] text-white px-2 py-0.5">
                      Q{q.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-800">
                      {q.pillar}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#141414]">{q.title}</h3>
                  <p className="text-xs text-[#141414]/80 leading-relaxed">{q.description}</p>
                  {q.note && (
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2 border border-slate-200 mt-1 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span>{q.note}</span>
                    </div>
                  )}
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-xs font-mono font-bold">
                    Score: <span className="text-amber-700 text-sm">{currentScore}</span> / 4
                  </span>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const isSelected = currentScore === opt.score;
                  return (
                    <button
                      key={opt.score}
                      onClick={() => handleSelectOption(q.id, opt.score)}
                      className={`p-3 text-left border transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-[#141414] text-white border-[#141414] shadow-sm'
                          : 'bg-[#F5F4F0]/60 hover:bg-[#E4E3E0] border-[#141414]/20 text-[#141414]'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
                        isSelected ? 'bg-amber-400 text-[#141414] border-amber-400' : 'bg-white border-[#141414]/40 text-[#141414]'
                      }`}>
                        {opt.score}
                      </span>
                      <div className="flex-1 text-xs font-sans leading-snug">
                        <div className="font-bold text-[10px] uppercase tracking-wider mb-0.5 opacity-80">
                          {opt.label}
                        </div>
                        {opt.text}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
