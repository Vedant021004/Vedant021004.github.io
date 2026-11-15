import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, BrainCircuit, Sparkles, Network, Server, Layers, Check } from "lucide-react";

interface TechStackProps {
  techStack: {
    foundation: { name: string; detail: string }[];
    aiMachineLearning: { name: string; detail: string }[];
    llmEngineering: { name: string; detail: string }[];
    orchestration: { name: string; detail: string }[];
    production: { name: string; detail: string }[];
  };
}

export const TechStackSection = ({ techStack }: TechStackProps) => {
  const categories = [
    {
      id: "foundation",
      title: "FOUNDATION",
      subtitle: "Systems & Software Engineering",
      icon: Terminal,
      skills: techStack.foundation || [],
    },
    {
      id: "aiMachineLearning",
      title: "AI / MACHINE LEARNING",
      subtitle: "Modeling & Deep Learning",
      icon: BrainCircuit,
      skills: techStack.aiMachineLearning || [],
    },
    {
      id: "llmEngineering",
      title: "LLM ENGINEERING & RAG",
      subtitle: "Retrieval, Vectors & Inference",
      icon: Sparkles,
      skills: techStack.llmEngineering || [],
      featured: true,
    },
    {
      id: "orchestration",
      title: "ORCHESTRATION & AGENTS",
      subtitle: "LangGraph, MCP & Stateful Graphs",
      icon: Network,
      skills: techStack.orchestration || [],
      featured: true,
    },
    {
      id: "production",
      title: "PRODUCTION & CLOUD",
      subtitle: "FastAPI, Docker & Observability",
      icon: Server,
      skills: techStack.production || [],
    },
  ];

  return (
    <section id="stack" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-mono-tech uppercase tracking-wider mb-4 border border-[#7C5CFF]/25">
          <Layers className="w-3.5 h-3.5" />
          <span>TECHNICAL CAPABILITIES</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
          ENGINEERING STACK
        </h2>
        <p className="mt-4 text-base md:text-lg text-[#9CA3AF] max-w-2xl font-mono-tech">
          Categorized technical toolkit focused on building, scaling, evaluating, and deploying modern generative AI systems.
        </p>
      </div>

      {/* Grid of Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const isLarge = cat.id === "llmEngineering" || cat.id === "orchestration";

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`rounded-3xl bg-[#101216] border p-6 md:p-8 flex flex-col justify-between transition-all duration-300 card-glow ${
                cat.featured
                  ? "border-[#7C5CFF]/40 shadow-[0_0_30px_rgba(124,92,255,0.12)] bg-[#121419]"
                  : "border-white/[0.08] hover:border-white/20"
              } ${isLarge ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#08090B] border border-white/[0.08] text-[#7C5CFF]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-mono-tech font-bold text-white tracking-wider">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-mono-tech text-[#9CA3AF]">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capability Badges List */}
                <div className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-[#08090B]/60 border border-white/[0.05] hover:border-[#7C5CFF]/30 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono-tech font-bold text-white group-hover:text-[#7C5CFF] transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5 leading-relaxed font-sans">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Count Pill */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-tech text-white/40">
                <span>{cat.skills.length} SPECIALIZATIONS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]" />
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
