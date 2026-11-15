import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Sparkles, Terminal, Compass, Zap } from "lucide-react";
import { Github } from "./BrandIcons";
import { HeroArchitectureDiagram } from "./HeroArchitectureDiagram";

interface HeroSectionProps {
  onOpenRecruiter: () => void;
}

export const HeroSection = ({ onOpenRecruiter }: HeroSectionProps) => {
  const techPills = ["LLMs", "RAG", "AGENTS", "LANGGRAPH", "MCP", "FASTAPI", "PGVECTOR"];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 md:px-12 tech-grid overflow-hidden">
      {/* Ambient background glow gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7C5CFF]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Technical Narrative & Positioning */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#101216] border border-white/[0.08] w-fit mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono-tech uppercase tracking-wider text-emerald-400 font-semibold">
              OPEN TO AI / GENAI INTERNSHIPS
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[11px] font-mono-tech text-[#9CA3AF]">
              Mumbai · Navi Mumbai · Delhi NCR · Remote
            </span>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2 mb-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech tracking-widest text-[#7C5CFF] uppercase font-bold">
                SYSTEMS ARCHITECT & BUILDER
              </span>
              <span className="h-px w-12 bg-[#7C5CFF]/30" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F5F5F5] font-sans">
              VEDANT KAPIL
            </h1>

            <div className="text-2xl sm:text-3xl md:text-4xl font-mono-tech font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F5] to-[#7C5CFF]">
              AI ENGINEER
            </div>
          </motion.div>

          {/* Primary Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-[#F5F5F5] font-normal leading-relaxed max-w-2xl mb-3"
          >
            Building intelligent systems with LLMs, RAG, agents and modern AI infrastructure.
          </motion.p>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-sm md:text-base text-[#9CA3AF] font-mono-tech max-w-xl mb-8 leading-relaxed"
          >
            Designing AI systems that retrieve, reason, orchestrate and ship.
          </motion.p>

          {/* Tech Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {techPills.map((pill, idx) => (
              <span
                key={pill}
                className="px-2.5 py-1 text-[11px] font-mono-tech rounded-md bg-[#101216] border border-white/[0.08] text-[#9CA3AF] hover:text-[#7C5CFF] hover:border-[#7C5CFF]/40 transition-colors cursor-default"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="/projects.html"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#3B2BFF] hover:from-[#9074FF] hover:to-[#5B4CFF] text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(124,92,255,0.45)] hover:shadow-[0_0_35px_rgba(124,92,255,0.6)] group border border-[#C8F542]/30"
            >
              <Sparkles className="w-4 h-4 text-[#C8F542] animate-pulse" />
              <span>PROJECTS SHOWCASE</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#C8F542]" />
            </a>

            <a
              href="#systems"
              className="px-6 py-3 rounded-full bg-[#101216] hover:bg-[#15171D] text-[#F5F5F5] border border-white/[0.1] hover:border-white/25 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <span>EXPLORE SYSTEMS</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-[#9CA3AF]" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#101216] hover:bg-[#15171D] text-[#F5F5F5] border border-white/[0.1] hover:border-white/25 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-[#9CA3AF]" />
              <span>VIEW RESUME</span>
            </a>

            <a
              href="https://github.com/Vedant021004"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#101216] hover:bg-[#15171D] text-[#9CA3AF] hover:text-white border border-white/[0.08] hover:border-white/20 text-sm flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>

            <button
              onClick={onOpenRecruiter}
              className="px-4 py-3 rounded-full bg-[#7C5CFF]/10 hover:bg-[#7C5CFF]/20 text-[#7C5CFF] border border-[#7C5CFF]/30 hover:border-[#7C5CFF]/50 text-xs font-mono-tech flex items-center gap-2 transition-all ml-auto md:ml-0"
              title="Quick 20-second summary for engineering recruiters"
            >
              <Zap className="w-3.5 h-3.5 fill-[#7C5CFF]" />
              <span>RECRUITER VIEW (20s)</span>
            </button>
          </motion.div>

        </div>

        {/* Right Column: Interactive AI System Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center"
        >
          <HeroArchitectureDiagram />
        </motion.div>

      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono-tech tracking-widest uppercase">SCROLL</span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
};
