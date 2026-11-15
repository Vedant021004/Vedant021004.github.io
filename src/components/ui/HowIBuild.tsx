import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Database, Sparkles, Cpu, Award, Server, Activity, ChevronRight, Check } from "lucide-react";

interface Stage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string[];
}

interface HowIBuildProps {
  stages: Stage[];
}

const STAGE_ICONS: Record<string, any> = {
  "01": HelpCircle,
  "02": Database,
  "03": Sparkles,
  "04": Cpu,
  "05": Award,
  "06": Server,
  "07": Activity,
};

export const HowIBuild = ({ stages }: HowIBuildProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="how-i-build" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-mono-tech uppercase tracking-wider mb-4 border border-[#7C5CFF]/25">
          <Activity className="w-3.5 h-3.5" />
          <span>ENGINEERING METHODOLOGY</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
          HOW I BUILD AI SYSTEMS
        </h2>
        <p className="mt-4 text-base md:text-lg text-[#9CA3AF] max-w-2xl font-mono-tech">
          A disciplined 7-stage engineering lifecycle moving from problem deconstruction to hybrid retrieval, structured reasoning, multi-agent orchestration, and production observability.
        </p>
      </div>

      {/* Sequential Pipeline Cards */}
      <div className="relative">
        
        {/* Vertical Connected Track for Desktop */}
        <div className="hidden lg:block absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-[#7C5CFF] via-white/10 to-[#7C5CFF]" />

        <div className="space-y-6">
          {stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[stage.step] || Cpu;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative rounded-2xl bg-[#101216] border p-6 md:p-8 transition-all duration-300 ${
                  isHovered
                    ? "border-[#7C5CFF] shadow-[0_0_30px_rgba(124,92,255,0.18)] bg-[#15171D]"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  {/* Step Badge & Icon */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[#08090B] border border-white/[0.08] flex items-center justify-center text-[#7C5CFF] font-mono-tech font-bold text-sm shadow-inner">
                      <Icon className="w-5 h-5 text-[#7C5CFF]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-tech font-bold text-[#7C5CFF]">
                          STAGE {stage.step}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-xs font-mono-tech text-white/50">{stage.subtitle}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white font-sans">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 max-w-xl">
                    <p className="text-sm md:text-base text-[#9CA3AF] leading-relaxed font-sans">
                      {stage.description}
                    </p>
                  </div>

                  {/* Key Focus Tags */}
                  <div className="flex flex-wrap lg:flex-col gap-1.5 shrink-0 lg:w-56">
                    {stage.focus.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#9CA3AF] bg-[#08090B] px-2.5 py-1 rounded border border-white/[0.06]"
                      >
                        <Check className="w-3 h-3 text-[#7C5CFF] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
