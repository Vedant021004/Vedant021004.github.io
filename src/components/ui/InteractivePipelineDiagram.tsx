import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Scissors, Hash, Database, Search, GitMerge, Filter, Cpu, CheckCircle2, Award, ChevronRight, Info } from "lucide-react";

interface PipelineStep {
  name: string;
  role: string;
  tech: string;
  detail: string;
  tradeoff: string;
}

interface InteractivePipelineDiagramProps {
  pipeline: PipelineStep[];
}

const STEP_ICONS: Record<number, any> = {
  0: FileText,
  1: Scissors,
  2: Hash,
  3: Database,
  4: Search,
  5: GitMerge,
  6: Filter,
  7: Cpu,
  8: CheckCircle2,
  9: Award,
};

export const InteractivePipelineDiagram = ({ pipeline }: InteractivePipelineDiagramProps) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(4); // Default to Dense + BM25 Hybrid (key differentiator)
  const currentStep = pipeline[selectedIdx] || pipeline[0];
  const StepIcon = STEP_ICONS[selectedIdx] || Database;

  return (
    <div className="w-full bg-[#101216] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" />
          <h4 className="text-sm font-mono-tech font-bold uppercase tracking-wider text-white">
            INTERACTIVE RETRIEVAL & SYNTHESIS PIPELINE
          </h4>
        </div>
        <span className="text-xs font-mono-tech text-white/40">
          Click or hover any node to inspect engineering tradeoffs
        </span>
      </div>

      {/* Horizontal / Grid Flow of Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 relative">
        {pipeline.map((step, idx) => {
          const isSelected = selectedIdx === idx;
          const NodeIcon = STEP_ICONS[idx] || Database;

          return (
            <button
              key={step.name}
              onClick={() => setSelectedIdx(idx)}
              onMouseEnter={() => setSelectedIdx(idx)}
              data-cursor="INSPECT"
              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-28 transition-all duration-200 relative group ${
                isSelected
                  ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_20px_rgba(124,92,255,0.25)] text-white"
                  : "bg-[#08090B]/60 border-white/[0.08] text-[#9CA3AF] hover:border-white/20 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono-tech text-white/40 font-bold">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <NodeIcon className={`w-3.5 h-3.5 ${isSelected ? "text-[#7C5CFF]" : "text-white/30"}`} />
              </div>

              <div>
                <div className="text-[11px] font-mono-tech font-bold leading-tight group-hover:text-white line-clamp-2">
                  {step.name}
                </div>
                <div className="text-[9px] font-mono-tech text-[#7C5CFF]/80 truncate mt-0.5">
                  {step.tech}
                </div>
              </div>

              {/* Active Pip */}
              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#7C5CFF] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel for Selected Node */}
      <div className="bg-[#15171D] border border-white/[0.1] rounded-xl p-5 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C5CFF]/10 blur-2xl rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Step Title & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#7C5CFF]">
                  <StepIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-tech text-[#7C5CFF] font-bold">
                      STAGE {String(selectedIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-xs font-mono-tech text-white/50">{currentStep.role}</span>
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-white font-mono-tech">
                    {currentStep.name}
                  </h5>
                </div>
              </div>

              <div className="px-3 py-1 rounded-md bg-[#08090B] border border-white/[0.08] text-xs font-mono-tech text-[#7C5CFF] w-fit">
                TECH: {currentStep.tech}
              </div>
            </div>

            {/* Grid of Details & Tradeoffs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs font-mono-tech">
              
              {/* What It Does / Architecture Role */}
              <div className="p-4 rounded-xl bg-[#08090B]/60 border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-1.5 text-white font-bold text-xs uppercase">
                  <Info className="w-3.5 h-3.5 text-[#7C5CFF]" />
                  <span>WHAT IT DOES & WHY IT EXISTS</span>
                </div>
                <p className="text-[#9CA3AF] leading-relaxed font-sans text-sm">
                  {currentStep.detail}
                </p>
              </div>

              {/* Engineering Tradeoff */}
              <div className="p-4 rounded-xl bg-[#08090B]/60 border border-amber-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>ENGINEERING TRADEOFF</span>
                </div>
                <p className="text-[#9CA3AF] leading-relaxed font-sans text-sm">
                  {currentStep.tradeoff}
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
