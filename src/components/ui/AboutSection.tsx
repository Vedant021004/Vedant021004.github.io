import { motion } from "framer-motion";
import { User, MapPin, GraduationCap, Sparkles, FileText, Mail, CheckCircle2 } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

interface AboutSectionProps {
  profile: any;
}

export const AboutSection = ({ profile }: AboutSectionProps) => {
  const exploring = ["LLMs", "RAG Systems", "Agentic AI", "LangGraph", "Model Context Protocol (MCP)", "AI Infrastructure & Vector DBs"];

  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-mono-tech uppercase tracking-wider mb-4 border border-[#7C5CFF]/25">
          <User className="w-3.5 h-3.5" />
          <span>BACKGROUND & POSITIONING</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
          ABOUT VEDANT KAPIL
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Profile Card / Photo on Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 rounded-3xl bg-[#101216] border border-white/[0.08] p-6 space-y-6 card-glow"
        >
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#08090B] border border-white/[0.08] relative group">
            <img
              src="/me.png"
              alt="Vedant Kapil"
              className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xs font-mono-tech text-[#7C5CFF] font-bold">ENGINEER & RESEARCHER</div>
              <div className="text-lg font-bold text-white">Vedant Kapil</div>
            </div>
          </div>

          {/* Quick Details List */}
          <div className="space-y-3 text-xs font-mono-tech">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#08090B]/60 border border-white/[0.05]">
              <span className="text-white/50 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7C5CFF]" /> LOCATION
              </span>
              <span className="text-white">Mumbai · Navi Mumbai · Remote</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#08090B]/60 border border-white/[0.05]">
              <span className="text-white/50 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-[#7C5CFF]" /> EDUCATION
              </span>
              <span className="text-white">B.E. Computer Engineering</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#08090B]/60 border border-white/[0.05]">
              <span className="text-white/50 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> STATUS
              </span>
              <span className="text-emerald-400 font-semibold">Open to AI Internships</span>
            </div>
          </div>
        </motion.div>

        {/* Concise Engineering Profile on Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-8 font-sans"
        >
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Computer Engineering student focused on AI systems, LLM orchestration, and production-ready intelligent architectures.
            </h3>
            
            <p className="text-base text-[#9CA3AF] leading-relaxed">
              I specialize in bridging the gap between state-of-the-art machine learning models and deterministic, reliable software systems. Rather than treating LLMs as magical black boxes, I engineer explicit retrieval pipelines, stateful graph supervisors, and strict automated evaluation benchmarks.
            </p>
          </div>

          {/* Currently Exploring Grid */}
          <div className="space-y-3">
            <div className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#7C5CFF]">
              CURRENT ACTIVE TECHNICAL FOCUS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {exploring.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-3 rounded-xl bg-[#101216] border border-white/[0.06] text-xs font-mono-tech text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFF] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Action Links */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#7C5CFF] hover:bg-[#9074FF] text-white text-xs font-mono-tech font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(124,92,255,0.3)]"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW RESUME (PDF)</span>
            </a>

            <a
              href="https://github.com/Vedant021004"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#101216] hover:bg-[#15171D] text-white border border-white/[0.1] text-xs font-mono-tech flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>

            <a
              href="https://linkedin.com/in/vedant021004"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#101216] hover:bg-[#15171D] text-white border border-white/[0.1] text-xs font-mono-tech flex items-center gap-2 transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>
          </div>

        </motion.div>

      </div>

    </section>
  );
};
