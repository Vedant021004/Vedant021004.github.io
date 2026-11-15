import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, ExternalLink, X, ZoomIn, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

interface Certificate {
  file: string;
  title: string;
  category?: string;
  featured?: boolean;
  issuer?: string;
  description?: string;
}

interface AchievementsSectionProps {
  certificates: Certificate[];
}

export const AchievementsSection = ({ certificates }: AchievementsSectionProps) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<"All" | "Featured">("Featured");

  const displayedCerts = filter === "Featured" 
    ? certificates.filter(c => c.featured) 
    : certificates;

  const topAchievement = certificates.find(c => c.title.includes("CODEWAR")) || certificates[0];

  return (
    <section id="achievements" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono-tech uppercase tracking-wider mb-4 border border-amber-500/25">
            <Trophy className="w-3.5 h-3.5" />
            <span>EXTERNAL VALIDATION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
            ACHIEVEMENTS & VALIDATIONS
          </h2>
          <p className="mt-3 text-base text-[#9CA3AF] max-w-xl font-mono-tech">
            Hackathon rankings and professional credentials validating hands-on AI systems, algorithms, and engineering execution.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center p-1 rounded-full bg-[#101216] border border-white/[0.08] text-xs font-mono-tech">
          <button
            onClick={() => setFilter("Featured")}
            className={`px-4 py-1.5 rounded-full transition-colors ${
              filter === "Featured" ? "bg-[#7C5CFF] text-white" : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            Featured ({certificates.filter(c => c.featured).length})
          </button>
          <button
            onClick={() => setFilter("All")}
            className={`px-4 py-1.5 rounded-full transition-colors ${
              filter === "All" ? "bg-[#7C5CFF] text-white" : "text-[#9CA3AF] hover:text-white"
            }`}
          >
            All Validations ({certificates.length})
          </button>
        </div>
      </div>

      {/* Flagship Achievement Banner: CODEWAR 24H HACKATHON 5TH RANK */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-r from-[#101216] via-[#15171D] to-[#101216] border border-amber-500/30 p-8 md:p-10 mb-12 shadow-[0_0_40px_rgba(245,158,11,0.08)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-mono-tech text-xs font-bold border border-amber-500/40 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                5TH RANK IN 24H SPRINT
              </span>
              <span className="text-xs font-mono-tech text-white/40">COMPETITIVE HACKATHON</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-sans">
              CODEWAR 24 HOURS HACKATHON — 5TH RANK
            </h3>

            <p className="text-sm md:text-base text-[#9CA3AF] leading-relaxed max-w-2xl font-sans">
              Secured 5th Rank out of numerous collegiate and engineering teams in an intense 24-hour hackathon sprint. Designed and shipped an end-to-end full-stack software application with rigorous architectural constraints under tight countdown deadlines.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono-tech text-white/50">
              <span>TEAM RANK: <strong className="text-white">TOP 5</strong></span>
              <span>•</span>
              <span>DURATION: <strong className="text-white">24 HOURS NON-STOP</strong></span>
              <span>•</span>
              <span>OUTPUT: <strong className="text-white">SHIPPED SYSTEM</strong></span>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <button
              onClick={() => setSelectedCert(topAchievement)}
              data-cursor="VIEW"
              className="relative group rounded-2xl overflow-hidden border border-white/[0.1] bg-[#08090B] p-2 hover:border-amber-400/50 transition-all max-w-[280px]"
            >
              <img
                src={`/certificates/${topAchievement.file}`}
                alt={topAchievement.title}
                className="w-full h-auto rounded-xl object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-mono-tech text-white">
                <ZoomIn className="w-4 h-4 text-amber-400" />
                <span>Inspect Certificate</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Condensed Certificate Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedCerts.map((cert, idx) => (
          <motion.div
            key={cert.file}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => setSelectedCert(cert)}
            data-cursor="VIEW"
            className="p-5 rounded-2xl bg-[#101216] border border-white/[0.08] hover:border-[#7C5CFF]/40 transition-all duration-300 card-glow flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tech mb-3">
                <span className="text-[#7C5CFF] text-[11px] font-bold">
                  {cert.issuer || "VERIFIED"}
                </span>
                <span className="text-white/30 text-[10px]">{cert.category || "CERT"}</span>
              </div>

              <h4 className="text-sm font-bold text-white font-sans line-clamp-2 group-hover:text-[#7C5CFF] transition-colors mb-2">
                {cert.title}
              </h4>

              {cert.description && (
                <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed font-sans">
                  {cert.description}
                </p>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-tech text-white/40 group-hover:text-white transition-colors">
              <span className="text-[11px]">Inspect document</span>
              <ZoomIn className="w-3.5 h-3.5 text-[#7C5CFF]" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Lightbox for Certificate Inspection */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#101216] border border-white/[0.15] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#15171D]">
                <div>
                  <div className="text-xs font-mono-tech text-[#7C5CFF]">{selectedCert.issuer || "VERIFICATION"}</div>
                  <h4 className="text-base font-bold text-white font-sans mt-0.5">{selectedCert.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full bg-[#08090B] hover:bg-white/[0.1] text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Preview */}
              <div className="p-4 bg-[#08090B] flex items-center justify-center max-h-[60vh] overflow-hidden">
                <img
                  src={`/certificates/${selectedCert.file}`}
                  alt={selectedCert.title}
                  className="max-h-[55vh] w-auto object-contain rounded-xl shadow-lg"
                />
              </div>

              {/* Footer info */}
              {selectedCert.description && (
                <div className="p-5 border-t border-white/[0.08] text-xs text-[#9CA3AF] font-sans leading-relaxed">
                  {selectedCert.description}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
