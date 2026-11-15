import { motion, AnimatePresence } from "framer-motion";
import { X, Keyboard, Sparkles } from "lucide-react";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal = ({ isOpen, onClose }: ShortcutsModalProps) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "⌘ K / Ctrl K", desc: "Open developer command palette" },
    { key: "?", desc: "Toggle keyboard shortcuts cheat-sheet" },
    { key: "R", desc: "Open 20-Second Recruiter Executive Summary" },
    { key: "P", desc: "Launch Interactive Projects Showcase" },
    { key: "ESC", desc: "Close any active modal or inspect drawer" },
    { key: "↑ / ↓", desc: "Navigate command items or architecture nodes" },
    { key: "Enter", desc: "Execute selected command or link" },
  ];

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-[#101216] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl relative z-10 font-mono-tech"
      >
        <div className="p-5 bg-[#15171D] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Keyboard className="w-4 h-4 text-[#7C5CFF]" />
            <span>KEYBOARD SHORTCUTS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-2.5">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#08090B] border border-white/[0.05] text-xs"
            >
              <span className="text-[#9CA3AF] font-sans text-xs">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-[#15171D] border border-white/[0.1] text-[#7C5CFF] text-[11px] font-bold">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#08090B] border-t border-white/[0.06] text-center text-[10px] text-white/40">
          Pro-tip: Try the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) for an easter egg
        </div>
      </motion.div>
    </div>
  );
};
