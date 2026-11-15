import { useState, useEffect } from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { HeroSection } from "../components/ui/HeroSection";
import { SelectedSystems } from "../components/ui/SelectedSystems";
import { HowIBuild } from "../components/ui/HowIBuild";
import { TechStackSection } from "../components/ui/TechStackSection";
import { EngineeringPrinciples } from "../components/ui/EngineeringPrinciples";
import { AchievementsSection } from "../components/ui/AchievementsSection";
import { OpenSourceSection } from "../components/ui/OpenSourceSection";
import { AboutSection } from "../components/ui/AboutSection";
import { ContactSection } from "../components/ui/ContactSection";
import { RecruiterModal } from "../components/ui/RecruiterModal";
import { CommandPalette } from "../components/ui/CommandPalette";
import { ShortcutsModal } from "../components/ui/ShortcutsModal";

export const Home = () => {
  const data = usePortfolioData();
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

  // Global Keyboard Shortcuts (⌘K, ?, R, and Konami Code)
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      // ⌘K or Ctrl+K for Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
        return;
      }

      // '?' for Shortcuts Cheat-sheet
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
        return;
      }

      // 'r' or 'R' for Recruiter Mode
      if (e.key.toLowerCase() === "r" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setRecruiterOpen((prev) => !prev);
        return;
      }

      // Check Konami Code
      if (e.key === konamiSequence[konamiIndex] || e.key.toLowerCase() === konamiSequence[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
          setEasterEggActive(true);
          konamiIndex = 0;
          setTimeout(() => setEasterEggActive(false), 5000);
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#F5F5F5] selection:bg-[#7C5CFF]/30 selection:text-white">
      
      {/* Easter Egg Notification Toast */}
      {easterEggActive && (
        <div className="fixed top-20 right-6 z-[150] p-4 rounded-2xl bg-[#15171D] border border-emerald-400 text-xs font-mono-tech shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <div className="text-emerald-400 font-bold">🎮 KONAMI CODE UNLOCKED!</div>
            <div className="text-white/80 text-[11px]">System matrix telemetry accelerated to 100%.</div>
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <HeroSection onOpenRecruiter={() => window.dispatchEvent(new CustomEvent('open_recruiter'))} />

      {/* 2. Flagship Selected Systems with Interactive Diagrams */}
      <SelectedSystems systems={data.flagshipSystems || []} />

      {/* 3. How I Build AI Systems (7 Stages) */}
      <HowIBuild stages={data.howIBuildStages || []} />

      {/* 4. Categorized Tech Stack */}
      <TechStackSection techStack={data.techStack || {}} />

      {/* 5. Engineering Principles */}
      <EngineeringPrinciples principles={data.principles || []} />

      {/* 6. Achievements & Hackathons (CODEWAR 5th Rank) */}
      <AchievementsSection certificates={data.certificates || []} />

      {/* 7. Open Source Repositories */}
      <OpenSourceSection />

      {/* 8. Concise About Section */}
      <AboutSection profile={data.profile || {}} />

      {/* 9. Direct Contact Section */}
      <ContactSection />

    </div>
  );
};
