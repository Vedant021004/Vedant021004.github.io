import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { Award, Trophy, Scroll, X, Sparkles, ZoomIn } from "lucide-react";

export type CertificateItem = {
  file: string;
  title: string;
  description?: string;
  category?: string;
};

export const Certificates = () => {
  const { global } = usePortfolioData();
  const certificates: CertificateItem[] = global?.certificates || [];

  const [activeFilter, setActiveFilter] = useState<"All" | "Achievements" | "Certifications">("All");
  const [selectedItem, setSelectedItem] = useState<CertificateItem | null>(null);

  // Helper to get category for each item
  const getItemCategory = (item: CertificateItem): "Achievements" | "Certifications" => {
    if (item.category === "Achievement" || item.category === "Achievements") return "Achievements";
    if (item.category === "Certification" || item.category === "Certifications") return "Certifications";
    const lower = (item.title + " " + (item.description || "")).toLowerCase();
    if (lower.includes("hackathon") || lower.includes("winner") || lower.includes("prize") || lower.includes("award") || lower.includes("achievement")) {
      return "Achievements";
    }
    return "Certifications";
  };

  const filteredItems = certificates.filter((item) => {
    if (activeFilter === "All") return true;
    return getItemCategory(item) === activeFilter;
  });

  const achievementsCount = certificates.filter((c) => getItemCategory(c) === "Achievements").length;
  const certsCount = certificates.filter((c) => getItemCategory(c) === "Certifications").length;

  return (
    <section id="certificates" className="py-20 md:py-28 px-6 md:px-10 max-w-[1600px] mx-auto bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honours & Credentials</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-black dark:text-white flex items-center gap-4">
            <Award className="w-10 h-10 md:w-12 md:h-12 text-[#ea6b24]" />
            Achievements & Certifications
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Hackathons, team competitions, and recognized industry certifications showcasing applied machine learning and engineering.
          </p>
        </div>

        {/* Heading Options / Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 shrink-0">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === "All"
                ? "bg-white dark:bg-white text-black dark:text-black shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            }`}
          >
            All ({certificates.length})
          </button>
          <button
            onClick={() => setActiveFilter("Achievements")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === "Achievements"
                ? "bg-white dark:bg-white text-black dark:text-black shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            Hackathons & Achievements ({achievementsCount})
          </button>
          <button
            onClick={() => setActiveFilter("Certifications")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === "Certifications"
                ? "bg-white dark:bg-white text-black dark:text-black shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Scroll className="w-4 h-4 text-blue-500" />
            Certifications ({certsCount})
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredItems.map((item, index) => {
          const category = getItemCategory(item);
          const isAchievement = category === "Achievements";

          return (
            <motion.div
              key={item.file + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c0c0c] hover:border-black/30 dark:hover:border-white/30 p-4 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div>
                {/* Image Frame */}
                <div className="w-full aspect-[4/3] bg-gray-50 dark:bg-[#151515] rounded-xl overflow-hidden mb-4 relative flex items-center justify-center p-3 border border-black/5 dark:border-white/5">
                  <img
                    src={`/certificates/${item.file}`}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[2px]">
                    <ZoomIn className="w-4 h-4" />
                    <span>Click to view</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isAchievement
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {isAchievement ? <Trophy className="w-3 h-3" /> : <Scroll className="w-3 h-3" />}
                    {isAchievement ? "Hackathon / Achievement" : "Certification"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Bottom detail footer */}
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                <span>View details</span>
                <span className="text-sm font-bold">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 border border-dashed border-black/10 dark:border-white/10 rounded-2xl">
          <p className="text-gray-500 text-sm">No items in this category yet.</p>
        </div>
      )}

      {/* Fullscreen Photo & Description Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0d0d0d] shadow-2xl p-6 md:p-8 text-black dark:text-white flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-2 ${
                      getItemCategory(selectedItem) === "Achievements"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {getItemCategory(selectedItem) === "Achievements" ? (
                      <Trophy className="w-3.5 h-3.5" />
                    ) : (
                      <Scroll className="w-3.5 h-3.5" />
                    )}
                    {getItemCategory(selectedItem) === "Achievements" ? "Hackathon / Achievement" : "Certification"}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-black dark:text-white leading-tight">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-full p-2 text-gray-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Image Box */}
              <div className="w-full bg-gray-50 dark:bg-black rounded-2xl overflow-hidden p-4 md:p-6 mb-6 flex items-center justify-center border border-black/5 dark:border-white/10">
                <img
                  src={`/certificates/${selectedItem.file}`}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Modal Description */}
              {selectedItem.description && (
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 md:p-5 border border-black/5 dark:border-white/5">
                  <h4 className="text-xs uppercase font-semibold text-gray-500 mb-1.5 tracking-wider">About this Milestone</h4>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedItem.description}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
