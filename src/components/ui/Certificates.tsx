import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { Award, Trophy, Scroll, X, Sparkles, ZoomIn, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

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
  
  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to categorize each item
  const getItemCategory = (item: CertificateItem): "Achievements" | "Certifications" => {
    if (item.category === "Achievement" || item.category === "Achievements") return "Achievements";
    if (item.category === "Certification" || item.category === "Certifications") return "Certifications";
    const lower = (item.title + " " + (item.description || "")).toLowerCase();
    if (
      lower.includes("hackathon") ||
      lower.includes("winner") ||
      lower.includes("prize") ||
      lower.includes("award") ||
      lower.includes("achievement") ||
      lower.includes("agents") ||
      lower.includes("llm")
    ) {
      return "Achievements";
    }
    return "Certifications";
  };

  // Slideshow items: items marked as achievements, or top featured items if none specifically marked
  const slideshowItems = certificates.filter((c) => getItemCategory(c) === "Achievements");
  const displaySlides = slideshowItems.length > 0 ? slideshowItems : certificates.slice(0, 5);

  // Auto-play slideshow timer (switches every 4.5 seconds unless paused)
  useEffect(() => {
    if (displaySlides.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [displaySlides.length, isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  };

  // Filtered items for the bottom grid
  const filteredGridItems = certificates.filter((item) => {
    if (activeFilter === "All") return true;
    return getItemCategory(item) === activeFilter;
  });

  const achievementsCount = certificates.filter((c) => getItemCategory(c) === "Achievements").length;
  const certsCount = certificates.filter((c) => getItemCategory(c) === "Certifications").length;

  const currentItem = displaySlides[currentSlide] || displaySlides[0];

  return (
    <section id="certificates" className="py-20 md:py-28 px-6 md:px-10 max-w-[1600px] mx-auto bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Milestones & Validations</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-black dark:text-white flex items-center gap-4">
            <Award className="w-10 h-10 md:w-12 md:h-12 text-[#ea6b24]" />
            Achievements & Certifications
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Live glimpses from hackathons and major technical certifications validating hands-on AI & engineering capability.
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
            Hackathons & Glimpses ({achievementsCount || displaySlides.length})
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

      {/* ========================================================================= */}
      {/* 1. CONTINUOUS SLIDESHOW: GLIMPSES & HACKATHONS WITH DESCRIPTIONS          */}
      {/* ========================================================================= */}
      {displaySlides.length > 0 && (
        <div 
          className="mb-20 rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-gray-50/80 via-white to-gray-100/50 dark:from-[#0b0b0b] dark:via-[#090909] dark:to-[#050505] p-6 md:p-10 shadow-lg relative overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Background Glow Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Slideshow Top Control Bar */}
          <div className="flex items-center justify-between gap-4 mb-6 relative z-10 border-b border-black/5 dark:border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                Hackathon Glimpses & Featured Highlights
              </span>
              <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400">
                {isPaused ? "Paused on hover" : "Auto-playing"}
              </span>
            </div>

            {/* Slideshow Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title={isPaused ? "Resume Auto-play" : "Pause Auto-play"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <span className="font-mono text-xs text-gray-500">
                {String(currentSlide + 1).padStart(2, '0')} / {String(displaySlides.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevSlide}
                  className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-sm"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-sm"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Slide Content */}
          <AnimatePresence mode="wait">
            {currentItem && (
              <motion.div
                key={currentItem.file + currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10"
              >
                {/* Left/Top: Slide Photo */}
                <div 
                  className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] w-full bg-white dark:bg-[#111111] rounded-2xl overflow-hidden p-4 sm:p-6 border border-black/10 dark:border-white/10 relative flex items-center justify-center cursor-pointer shadow-inner group/photo"
                  onClick={() => setSelectedItem(currentItem)}
                >
                  <img
                    src={`/certificates/${currentItem.file}`}
                    alt={currentItem.title}
                    className="max-w-full max-h-full object-contain rounded-lg group-hover/photo:scale-105 transition-transform duration-500"
                  />
                  {/* Photo Overlay Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold shadow-md">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      Hackathon & Milestone
                    </span>
                  </div>
                  {/* Click to expand hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-sm backdrop-blur-[2px]">
                    <ZoomIn className="w-5 h-5" />
                    <span>Click to view full photo</span>
                  </div>
                </div>

                {/* Right/Bottom: Slide Description & Details */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Featured Milestone</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-950 dark:text-white leading-snug mb-4">
                      {currentItem.title}
                    </h3>

                    {/* Detailed Description */}
                    <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl p-5 mb-6">
                      <h4 className="text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">
                        Description & Impact
                      </h4>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {currentItem.description || 
                          "Recognized milestone showcasing engineering excellence, hands-on development, and collaborative technical innovation in production artificial intelligence."}
                      </p>
                    </div>
                  </div>

                  {/* Slide Indicators & Lightbox Trigger */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      {displaySlides.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentSlide(dotIdx)}
                          className={`h-2 rounded-full transition-all ${
                            dotIdx === currentSlide
                              ? "w-8 bg-black dark:bg-white"
                              : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedItem(currentItem)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-85 transition-opacity shadow-sm"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Inspect Photo</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. BOTTOM SECTION: ALL CERTIFICATES & CREDENTIALS GRID                   */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-8 border-b border-black/5 dark:border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <Scroll className="w-6 h-6 text-blue-500" />
            <h3 className="text-2xl font-display font-bold text-black dark:text-white">
              All Credentials & Certifications
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-semibold">
              {filteredGridItems.length}
            </span>
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline-block">
            Click any certificate to inspect full size
          </span>
        </div>

        {/* Grid of Certificates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredGridItems.map((item, index) => {
            const category = getItemCategory(item);
            const isAchievement = category === "Achievements";

            return (
              <motion.div
                key={item.file + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
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
                      <span>View details</span>
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
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug transition-colors line-clamp-2">
                    {item.title}
                  </h4>

                  {/* Description if present */}
                  {item.description && (
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  <span>Inspect</span>
                  <span className="text-sm font-bold">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredGridItems.length === 0 && (
          <div className="text-center py-16 border border-dashed border-black/10 dark:border-white/10 rounded-2xl">
            <p className="text-gray-500 text-sm">No items match the selected filter.</p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. LIGHTBOX MODAL: FULL RESOLUTION PHOTO & EXPANDED DESCRIPTION           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 md:p-8"
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
                    {getItemCategory(selectedItem) === "Achievements" ? "Hackathon / Glimpse" : "Certification"}
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

              {/* Modal Image Display */}
              <div className="w-full bg-gray-50 dark:bg-black rounded-2xl overflow-hidden p-4 md:p-6 mb-6 flex items-center justify-center border border-black/5 dark:border-white/10">
                <img
                  src={`/certificates/${selectedItem.file}`}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-sm"
                />
              </div>

              {/* Modal Description */}
              {selectedItem.description ? (
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-black/5 dark:border-white/5">
                  <h4 className="text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">About this Milestone</h4>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedItem.description}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-xs text-gray-500">
                  Verified credential in software development & machine learning engineering.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
