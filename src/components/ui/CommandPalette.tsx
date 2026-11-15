import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Cpu, Layers, FileText, Mail, User, Trophy, ArrowRight, Zap, Code2, Compass, Sparkles } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRecruiter: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: any;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette = ({ isOpen, onClose, onOpenRecruiter }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const commands: CommandItem[] = [
    {
      id: "interactive-projects",
      title: "Interactive Projects Showcase (3D Flip Gallery & Canvas)",
      category: "FAST PATH",
      icon: Sparkles,
      action: () => {
        window.location.href = "/projects.html";
        onClose();
      },
      shortcut: "P",
    },
    {
      id: "recruiter",
      title: "Recruiter Mode (20-Second Executive Summary)",
      category: "FAST PATH",
      icon: Zap,
      action: () => {
        onClose();
        onOpenRecruiter();
      },
      shortcut: "R",
    },
    {
      id: "systems",
      title: "Selected Systems & Flagship Architectures",
      category: "ENGINEERING",
      icon: Cpu,
      action: () => scrollTo("systems"),
      shortcut: "S",
    },
    {
      id: "how-i-build",
      title: "How I Build AI Systems (7-Stage Methodology)",
      category: "ENGINEERING",
      icon: Compass,
      action: () => scrollTo("how-i-build"),
      shortcut: "H",
    },
    {
      id: "stack",
      title: "Technical Stack & Specializations",
      category: "CAPABILITIES",
      icon: Layers,
      action: () => scrollTo("stack"),
      shortcut: "T",
    },
    {
      id: "open-source",
      title: "Open Source Repositories",
      category: "CODE",
      icon: Code2,
      action: () => scrollTo("open-source"),
      shortcut: "O",
    },
    {
      id: "achievements",
      title: "Achievements & CODEWAR 5th Rank",
      category: "VALIDATION",
      icon: Trophy,
      action: () => scrollTo("achievements"),
      shortcut: "A",
    },
    {
      id: "about",
      title: "About Vedant Kapil",
      category: "BACKGROUND",
      icon: User,
      action: () => scrollTo("about"),
    },
    {
      id: "resume",
      title: "Download Resume (PDF)",
      category: "DOCUMENTS",
      icon: FileText,
      action: () => {
        window.open("/resume.pdf", "_blank");
        onClose();
      },
    },
    {
      id: "github",
      title: "View GitHub Profile (@Vedant021004)",
      category: "EXTERNAL",
      icon: Github,
      action: () => {
        window.open("https://github.com/Vedant021004", "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      title: "Connect on LinkedIn",
      category: "EXTERNAL",
      icon: Linkedin,
      action: () => {
        window.open("https://linkedin.com/in/vedant021004", "_blank");
        onClose();
      },
    },
    {
      id: "contact",
      title: "Send Email (vedantkp79@gmail.com)",
      category: "COMMUNICATION",
      icon: Mail,
      action: () => {
        window.location.href = "mailto:vedantkp79@gmail.com";
        onClose();
      },
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-start justify-center pt-24 md:pt-32 px-4 bg-black/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-xl bg-[#101216] border border-[#7C5CFF]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(124,92,255,0.2)] relative z-10 font-mono-tech flex flex-col max-h-[75vh]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/[0.08] flex items-center gap-3 bg-[#15171D]">
          <Search className="w-4 h-4 text-[#7C5CFF]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search systems, stack, links..."
            className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
          />
          <span className="text-[10px] text-white/40 px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">
            ESC
          </span>
        </div>

        {/* Command Items List */}
        <div className="p-2 overflow-y-auto space-y-1 max-h-[50vh]">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-white/40">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = cmd.icon;

              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left text-xs transition-all ${
                    isSelected
                      ? "bg-[#15171D] text-white border border-[#7C5CFF]/40 shadow-sm"
                      : "text-[#9CA3AF] hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#7C5CFF]" : "text-white/40"}`} />
                    <div>
                      <div className="font-semibold text-white">{cmd.title}</div>
                      <div className="text-[10px] text-white/40">{cmd.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {cmd.shortcut && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-white/50 border border-white/[0.08]">
                        {cmd.shortcut}
                      </span>
                    )}
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[#7C5CFF]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="p-3 bg-[#08090B] border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/40">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#7C5CFF]">Developer Command Tool</span>
        </div>
      </motion.div>
    </div>
  );
};
