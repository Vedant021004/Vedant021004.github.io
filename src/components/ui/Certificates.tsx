import { motion } from "framer-motion";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { Award } from "lucide-react";

export const Certificates = () => {
  const { global } = usePortfolioData();
  const certificates = global.certificates || [];

  return (
    <section id="certificates" className="py-24 px-6 md:px-10 max-w-[1600px] mx-auto bg-white border-t border-gray-100">
      
      {/* Section Header */}
      <div className="mb-16 flex items-center gap-4">
        <Award className="w-10 h-10 text-black" />
        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-black">
          Certifications
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col items-center text-center"
          >
            {/* Image Box */}
            <div className="w-full aspect-square bg-[#f9f9f9] border-2 border-black/5 rounded-2xl flex items-center justify-center p-6 mb-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:border-black/20">
              <img 
                src={`/certificates/${cert.file}`} 
                alt={cert.title}
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Title */}
            <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">
              {cert.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
