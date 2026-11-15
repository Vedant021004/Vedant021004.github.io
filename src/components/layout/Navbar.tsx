import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Zap, Search, Terminal, Sparkles, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenRecruiter: () => void;
  onOpenCommand: () => void;
}

export const Navbar = ({ onOpenRecruiter, onOpenCommand }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "SYSTEMS", href: "#systems" },
    { label: "HOW I BUILD", href: "#how-i-build" },
    { label: "STACK", href: "#stack" },
    { label: "OPEN SOURCE", href: "#open-source" },
    { label: "ACHIEVEMENTS", href: "#achievements" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#08090B]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo / Identity */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#101216] border border-white/[0.1] flex items-center justify-center text-[#7C5CFF] font-mono-tech font-bold text-sm group-hover:border-[#7C5CFF]/60 transition-colors shadow-sm">
              VK
            </div>
            <div className="flex flex-col">
              <span className="font-mono-tech text-xs tracking-wider font-bold text-white group-hover:text-[#7C5CFF] transition-colors">
                VEDANT KAPIL
              </span>
              <span className="text-[10px] font-mono-tech text-white/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AI ENGINEER</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono-tech">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#9CA3AF] hover:text-white transition-colors tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            
            {/* Interactive Projects Showcase Link */}
            <a
              href="/projects.html"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#7C5CFF]/20 hover:bg-[#7C5CFF]/35 border border-[#7C5CFF]/40 text-[#C8F542] text-xs font-mono-tech font-bold transition-all shadow-[0_0_15px_rgba(124,92,255,0.2)] group"
              title="Open Interactive Projects Showcase"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8F542] animate-pulse" />
              <span>PROJECTS</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C8F542] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Quick Command Palette Button */}
            <button
              onClick={onOpenCommand}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101216] border border-white/[0.08] hover:border-white/20 text-[#9CA3AF] hover:text-white text-xs font-mono-tech transition-colors"
              title="Open command palette (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span className="text-[11px]">⌘K</span>
            </button>

            {/* Recruiter View Pill */}
            <button
              onClick={onOpenRecruiter}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#7C5CFF]/15 hover:bg-[#7C5CFF]/25 border border-[#7C5CFF]/30 hover:border-[#7C5CFF]/50 text-[#7C5CFF] text-xs font-mono-tech font-semibold transition-all shadow-[0_0_15px_rgba(124,92,255,0.15)]"
            >
              <Zap className="w-3.5 h-3.5 fill-[#7C5CFF]" />
              <span>RECRUITER VIEW</span>
            </button>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-gray-200 text-xs font-mono-tech font-bold transition-all shadow-sm"
            >
              <span>RESUME</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#101216] border border-white/[0.08] text-white/80 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#08090B] pt-24 pb-8 px-6 flex flex-col justify-between font-mono-tech lg:hidden"
          >
            <div className="space-y-4">
              <div className="text-[11px] text-[#7C5CFF] font-bold tracking-widest uppercase mb-2">
                NAVIGATION
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-2 text-lg text-white hover:text-[#7C5CFF] font-bold border-b border-white/[0.06] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/[0.08]">
              <a
                href="/projects.html"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#3B2BFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#C8F542] animate-pulse" />
                <span>INTERACTIVE PROJECTS SHOWCASE ↗</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRecruiter();
                }}
                className="w-full py-3 rounded-full bg-[#7C5CFF] text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>20-SECOND RECRUITER VIEW</span>
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#101216] text-white border border-white/[0.1] font-bold text-xs flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#7C5CFF]" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>

              <a
                href="https://github.com/Vedant021004"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full text-center text-xs text-[#9CA3AF]"
              >
                GitHub: @Vedant021004
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
