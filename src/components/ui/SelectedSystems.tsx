import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Layers, ArrowUpRight, Cpu, Database, CheckCircle2, ChevronRight, X, Sparkles, BookOpen } from "lucide-react";
import { Github } from "./BrandIcons";
import { InteractivePipelineDiagram } from "./InteractivePipelineDiagram";
import { InteractiveAgentGraph } from "./InteractiveAgentGraph";

interface SelectedSystemsProps {
  systems: any[];
}

export const SelectedSystems = ({ systems }: SelectedSystemsProps) => {
  const [activeModalSystem, setActiveModalSystem] = useState<any | null>(null);

  return (
    <section id="systems" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-white/[0.08] pb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-mono-tech uppercase tracking-wider mb-4 border border-[#7C5CFF]/25">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRODUCTION & PROTOTYPE ARCHITECTURES</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
            SELECTED SYSTEMS
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#9CA3AF] max-w-2xl font-mono-tech">
            Production-oriented AI systems designed with explicit retrieval topologies, agentic orchestration, and measurable evaluation loops.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="/projects.html"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#3B2BFF] hover:from-[#9074FF] hover:to-[#5B4CFF] text-white font-mono-tech text-xs font-bold transition-all shadow-lg hover:shadow-[#7C5CFF]/40 border border-[#C8F542]/30 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8F542] animate-pulse" />
            <span>INTERACTIVE SHOWCASE</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#C8F542]" />
          </a>
          <div className="text-xs font-mono-tech text-white/40 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>VALIDATED ARCHITECTURES</span>
          </div>
        </div>
      </div>

      {/* Systems Stack */}
      <div className="space-y-24">
        {systems.map((system, index) => {
          const isRAG = system.id === "enterprise-rag";
          const isAgentic = system.id === "agentic-ops";

          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl bg-[#101216] border border-white/[0.08] p-6 sm:p-8 md:p-12 hover:border-white/20 transition-all duration-300 card-glow"
            >
              {/* Top Meta Line */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-tech text-[#7C5CFF] font-bold">
                    SYSTEM {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs font-mono-tech text-white/50">{system.category}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#7C5CFF]/15 text-[#7C5CFF] border border-[#7C5CFF]/30 text-xs font-mono-tech font-bold">
                    {system.badge}
                  </span>
                  <span className="text-xs font-mono-tech text-white/40">
                    STATUS: <strong className="text-white/80">{system.statusLabel}</strong>
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-8">
                <a
                  href="/projects.html"
                  className="group/title inline-flex items-center gap-2 hover:text-[#7C5CFF] transition-colors"
                  title="Open this project in Interactive Showcase"
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white group-hover/title:text-[#7C5CFF] font-sans transition-colors">
                    {system.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#7C5CFF] opacity-60 group-hover/title:opacity-100 group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all" />
                </a>
                <p className="text-sm md:text-base text-[#7C5CFF] font-mono-tech">
                  {system.tagline}
                </p>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-sm">
                <div className="p-5 rounded-2xl bg-[#08090B]/60 border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-rose-400 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>THE ENGINEERING PROBLEM</span>
                  </div>
                  <p className="text-[#9CA3AF] leading-relaxed">
                    {system.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#08090B]/60 border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>SYSTEM ARCHITECTURE & SOLUTION</span>
                  </div>
                  <p className="text-[#9CA3AF] leading-relaxed">
                    {system.solution}
                  </p>
                </div>
              </div>

              {/* Interactive Architecture Embed */}
              <div className="mb-10">
                {isRAG && system.pipeline && (
                  <InteractivePipelineDiagram pipeline={system.pipeline} />
                )}
                {isAgentic && (
                  <InteractiveAgentGraph />
                )}
                {!isRAG && !isAgentic && system.pipeline && (
                  <InteractivePipelineDiagram pipeline={system.pipeline} />
                )}
              </div>

              {/* Key Technical Decisions */}
              {system.engineeringDecisions && (
                <div className="mb-8 p-5 rounded-2xl bg-[#15171D] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-mono-tech font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" />
                    <span>KEY ARCHITECTURAL DECISIONS</span>
                  </div>
                  <ul className="space-y-2 text-xs md:text-sm text-[#9CA3AF] font-sans">
                    {system.engineeringDecisions.map((dec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#7C5CFF] font-mono-tech font-bold text-xs mt-0.5">0{idx + 1}</span>
                        <span>{dec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stack & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-2">
                  {system.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono-tech rounded-md bg-[#08090B] border border-white/[0.08] text-[#9CA3AF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <a
                    href="/projects.html"
                    className="px-4 py-2.5 rounded-full bg-[#7C5CFF]/20 hover:bg-[#7C5CFF]/35 text-[#C8F542] border border-[#7C5CFF]/40 text-xs font-mono-tech font-bold flex items-center gap-1.5 transition-all shadow-sm group"
                    title="Open in Interactive 3D/Flip Showcase"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C8F542] animate-pulse" />
                    <span>SHOWCASE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C8F542] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <button
                    onClick={() => setActiveModalSystem(system)}
                    data-cursor="VIEW"
                    className="px-4 py-2.5 rounded-full bg-[#15171D] hover:bg-white/[0.08] text-white border border-white/[0.1] text-xs font-mono-tech flex items-center gap-1.5 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#7C5CFF]" />
                    <span>CASE STUDY</span>
                  </button>

                  {system.githubUrl && (
                    <a
                      href={system.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-[#15171D] hover:bg-white/[0.08] text-white border border-white/[0.1] text-xs font-mono-tech flex items-center gap-1.5 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GITHUB</span>
                    </a>
                  )}

                  {system.demoUrl && (
                    <a
                      href={system.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full bg-[#7C5CFF] hover:bg-[#9074FF] text-white text-xs font-mono-tech font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(124,92,255,0.3)]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Case Study Full Modal / Drawer */}
      <AnimatePresence>
        {activeModalSystem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#101216] border border-white/[0.15] w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-white/[0.08] flex items-start justify-between bg-[#15171D]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#7C5CFF] uppercase mb-2">
                    <span>CASE STUDY ANALYSIS</span>
                    <span>•</span>
                    <span>{activeModalSystem.category}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-sans">
                    {activeModalSystem.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] font-mono-tech mt-1">
                    {activeModalSystem.tagline}
                  </p>
                </div>

                <button
                  onClick={() => setActiveModalSystem(null)}
                  className="p-2 rounded-full bg-[#08090B] hover:bg-white/[0.1] text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 font-sans">
                
                {/* 01 - Problem */}
                <section className="space-y-2">
                  <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#7C5CFF]">
                    01 — THE PROBLEM
                  </h4>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {activeModalSystem.problem}
                  </p>
                </section>

                {/* 02 - Architecture */}
                <section className="space-y-2">
                  <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#7C5CFF]">
                    02 — ARCHITECTURE OVERVIEW
                  </h4>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {activeModalSystem.solution}
                  </p>
                </section>

                {/* 03 - Engineering Decisions */}
                <section className="space-y-3">
                  <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#7C5CFF]">
                    03 — KEY ENGINEERING DECISIONS
                  </h4>
                  <div className="space-y-2">
                    {activeModalSystem.engineeringDecisions?.map((dec: string, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#15171D] border border-white/[0.06] text-xs font-mono-tech text-[#9CA3AF] flex items-start gap-3">
                        <span className="text-[#7C5CFF] font-bold">0{idx + 1}</span>
                        <span>{dec}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 04 - Pipeline Steps */}
                {activeModalSystem.pipeline && (
                  <section className="space-y-3">
                    <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#7C5CFF]">
                      04 — PIPELINE EXECUTION BREAKDOWN
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeModalSystem.pipeline.map((step: any, idx: number) => (
                        <div key={step.name} className="p-3.5 rounded-xl bg-[#08090B] border border-white/[0.06] space-y-1 text-xs font-mono-tech">
                          <div className="text-white font-bold">{idx + 1}. {step.name}</div>
                          <div className="text-[#7C5CFF] text-[11px]">{step.role} · {step.tech}</div>
                          <div className="text-white/60 text-[11px] leading-relaxed font-sans">{step.detail}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 05 - Tech Stack & Links */}
                <section className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {activeModalSystem.techStack?.map((t: string) => (
                      <span key={t} className="px-2.5 py-1 text-xs font-mono-tech rounded bg-[#15171D] border border-white/[0.08] text-[#9CA3AF]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="/projects.html"
                      className="px-4 py-2 rounded-full bg-[#7C5CFF]/20 hover:bg-[#7C5CFF]/35 text-[#C8F542] border border-[#7C5CFF]/40 text-xs font-mono-tech font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C8F542]" />
                      <span>Interactive Showcase</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    {activeModalSystem.githubUrl && (
                      <a
                        href={activeModalSystem.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[#15171D] hover:bg-white/[0.1] text-white border border-white/[0.1] text-xs font-mono-tech flex items-center gap-1.5"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {activeModalSystem.demoUrl && (
                      <a
                        href={activeModalSystem.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[#7C5CFF] hover:bg-[#9074FF] text-white text-xs font-mono-tech font-semibold flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </section>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
