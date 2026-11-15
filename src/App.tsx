import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Stats } from "./pages/Stats";
import { Certificates } from "./pages/Certificates";
import { Admin } from "./pages/Admin";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ResumeChat } from "./components/ui/ResumeChat";
import { RecruiterModal } from "./components/ui/RecruiterModal";
import { CommandPalette } from "./components/ui/CommandPalette";
import { ShortcutsModal } from "./components/ui/ShortcutsModal";

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#08090B] flex flex-col justify-center items-center font-mono-tech"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF] animate-ping" />
          <span className="text-xl md:text-2xl font-bold tracking-widest uppercase text-white font-mono-tech">
            VEDANT KAPIL // AI ENGINEER
          </span>
        </div>
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#7C5CFF]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <div className="text-xs tracking-widest text-[#9CA3AF]">
          INITIALIZING AI ARCHITECTURE ... {progress}%
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Global key bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
        return;
      }
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
        return;
      }
      if (e.key.toLowerCase() === "r" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setRecruiterOpen((prev) => !prev);
        return;
      }
      if (e.key.toLowerCase() === "p" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        window.location.href = "/projects.html";
        return;
      }
    };

    const handleOpenRecruiter = () => setRecruiterOpen(true);
    const handleOpenCommand = () => setCommandOpen(true);
    const handleOpenShortcuts = () => setShortcutsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open_recruiter", handleOpenRecruiter);
    window.addEventListener("open_command", handleOpenCommand);
    window.addEventListener("open_shortcuts", handleOpenShortcuts);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open_recruiter", handleOpenRecruiter);
      window.removeEventListener("open_command", handleOpenCommand);
      window.removeEventListener("open_shortcuts", handleOpenShortcuts);
    };
  }, []);

  return (
    <BrowserRouter>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} key="preloader" />}
      </AnimatePresence>

      <div className={`min-h-screen bg-[#08090B] text-[#F5F5F5] flex flex-col font-sans antialiased selection:bg-[#7C5CFF]/35 selection:text-white ${loading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar
          onOpenRecruiter={() => setRecruiterOpen(true)}
          onOpenCommand={() => setCommandOpen(true)}
        />
        
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/github" element={<Stats />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <ResumeChat />

      {/* Global Modals */}
      <RecruiterModal
        isOpen={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
      />

      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onOpenRecruiter={() => setRecruiterOpen(true)}
      />

      <ShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </BrowserRouter>
  );
}
