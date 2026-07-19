import { motion } from "framer-motion";
import { Award } from "lucide-react";

// List of certificates available in public/certificates/
const certificates = [
  { file: "google.png", title: "Google Certification" },
  { file: "jp morgan.png", title: "J.P. Morgan Certification" },
  { file: "CS50P.png", title: "Harvard CS50P" },
  { file: "deloitte.png", title: "Deloitte Certification" },
  { file: "tata.png", title: "Tata Certification" },
  { file: "datascience.png", title: "Data Science Certification" },
  { file: "c programming.png", title: "C Programming" },
  { file: "LLM.png", title: "LLM Certification" },
  { file: "openai.jpg", title: "OpenAI Agents and Workflows" }
];

export const Certificates = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400 mb-4">
            <Award className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">Achievements</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
            Certifications
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
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
              className="group relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black p-4 flex items-center justify-center">
                <img 
                  src={`/certificates/${cert.file}`} 
                  alt={cert.title} 
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 border-t border-white/5 bg-gradient-to-b from-transparent to-black/50">
                <h3 className="font-medium text-white tracking-wide">{cert.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
