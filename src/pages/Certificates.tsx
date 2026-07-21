import { motion } from "framer-motion";
import { Award } from "lucide-react";

import { usePortfolioData } from "../hooks/usePortfolioData";

export const Certificates = () => {
  const data = usePortfolioData();
  const certificates = data.global?.certificates || [];

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-cyan-500 dark:text-cyan-400 mb-4 transition-colors">
            <Award className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">Achievements</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-black dark:text-white mb-4 transition-colors">
            Certifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl transition-colors">
            Continuous learning and professional validations across AI, Data Science, and Software Engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.file}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 overflow-hidden transition-colors"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-white dark:bg-black p-4 flex items-center justify-center transition-colors">
                <img 
                  src={`/certificates/${cert.file}`} 
                  alt={cert.title} 
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 border-t border-black/10 dark:border-white/5 bg-gradient-to-b from-transparent to-black/5 dark:to-black/50 transition-colors">
                <h3 className="font-medium text-black dark:text-white tracking-wide transition-colors">{cert.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
