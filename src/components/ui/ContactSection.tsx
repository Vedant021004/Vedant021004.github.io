import { motion } from "framer-motion";
import { Mail, FileText, ArrowUpRight, Sparkles, MessageSquare } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/[0.08]">
      
      <div className="rounded-3xl bg-gradient-to-b from-[#101216] via-[#121419] to-[#08090B] border border-white/[0.08] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#7C5CFF]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C5CFF]/15 text-[#7C5CFF] text-xs font-mono-tech uppercase tracking-wider border border-[#7C5CFF]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONNECT & COLLABORATE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
            LET'S BUILD SOMETHING INTELLIGENT.
          </h2>

          <p className="text-base sm:text-lg text-[#9CA3AF] font-mono-tech max-w-xl mx-auto leading-relaxed">
            Available for: AI internships · GenAI projects · Applied Research · High-impact engineering collaborations.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            
            <a
              href="mailto:vedantkp79@gmail.com"
              className="px-6 py-3.5 rounded-full bg-[#7C5CFF] hover:bg-[#9074FF] text-white font-mono-tech font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(124,92,255,0.4)]"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL ME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://linkedin.com/in/vedant021004"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#15171D] hover:bg-[#1f232c] text-white border border-white/[0.1] hover:border-white/20 font-mono-tech font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <Linkedin className="w-4 h-4 text-[#7C5CFF]" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
            </a>

            <a
              href="https://github.com/Vedant021004"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#15171D] hover:bg-[#1f232c] text-white border border-white/[0.1] hover:border-white/20 font-mono-tech font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#15171D] hover:bg-[#1f232c] text-white border border-white/[0.1] hover:border-white/20 font-mono-tech font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-[#7C5CFF]" />
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
            </a>

          </div>

          <div className="pt-8 text-xs font-mono-tech text-white/40">
            Current response time: &lt; 24 hours · vedantkp79@gmail.com
          </div>

        </div>

      </div>

    </section>
  );
};
