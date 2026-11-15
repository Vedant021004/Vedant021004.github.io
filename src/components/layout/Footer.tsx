import { Mail, FileText, ArrowUp, Activity } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#08090B] border-t border-white/[0.08] py-12 px-6 md:px-12 text-xs font-mono-tech relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Branding & Status */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wider text-sm">VEDANT KAPIL</span>
            <span className="text-white/20">•</span>
            <span className="text-[#7C5CFF] font-semibold">AI ENGINEER</span>
          </div>
          <p className="text-[#9CA3AF] text-[11px] text-center md:text-left">
            Designing AI systems that retrieve, reason, orchestrate and ship.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-white/40 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>ALL SYSTEMS OPERATIONAL</span>
            <span>•</span>
            <span>BUILT WITH REACT, TYPESCRIPT, TAILWIND & FRAMER MOTION</span>
          </div>
        </div>

        {/* Middle/Right: Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[#9CA3AF]">
          <a
            href="https://github.com/Vedant021004"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/vedant021004"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:vedantkp79@gmail.com"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-white/40 text-[11px]">
          <span>© {currentYear} VEDANT KAPIL</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[#101216] border border-white/[0.08] hover:border-white/20 text-white/70 hover:text-white transition-colors"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
