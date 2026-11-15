import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

interface Principle {
  quote: string;
  detail: string;
}

interface EngineeringPrinciplesProps {
  principles: Principle[];
}

export const EngineeringPrinciples = ({ principles }: EngineeringPrinciplesProps) => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-mono-tech uppercase tracking-wider mb-4 border border-[#7C5CFF]/25">
          <Compass className="w-3.5 h-3.5" />
          <span>CORE PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
          ENGINEERING PRINCIPLES
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#9CA3AF] max-w-xl font-mono-tech">
          Foundational mental models guiding system design, agent autonomy, and production reliability.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {principles.map((p, idx) => (
          <motion.div
            key={p.quote}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="p-6 md:p-8 rounded-3xl bg-[#101216] border border-white/[0.08] hover:border-[#7C5CFF]/40 transition-all duration-300 card-glow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tech text-[#7C5CFF] mb-4">
                <span>RULE 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]" />
              </div>

              <h3 className="text-xl md:text-2xl font-black text-white font-sans mb-3">
                "{p.quote}"
              </h3>

              <p className="text-sm text-[#9CA3AF] leading-relaxed font-sans">
                {p.detail}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-end text-[10px] font-mono-tech text-white/30">
              PRIN-0{idx + 1}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
