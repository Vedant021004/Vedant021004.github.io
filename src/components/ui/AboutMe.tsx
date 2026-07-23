import { motion } from "framer-motion";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { User } from "lucide-react";

export const AboutMe = () => {
  const { global } = usePortfolioData();

  return (
    <section id="about" className="py-16 md:py-32 px-6 md:px-10 max-w-[1600px] mx-auto bg-white dark:bg-[#050505] transition-colors duration-500">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Left: Huge Figma-style Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-[#f5f5f5] dark:bg-[#111] rounded-[2rem] p-8 flex flex-col justify-end overflow-hidden group"
        >
          {/* Decorative Figma Box */}
          <div className="absolute inset-4 border-2 border-black/10 dark:border-white/10 rounded-[1.5rem] pointer-events-none z-10 transition-colors group-hover:border-[#0d99ff] duration-500">
            <span className="absolute -top-1 -left-1 w-2 h-2 bg-white dark:bg-black border-2 border-black/10 dark:border-white/10 group-hover:border-[#0d99ff]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-white dark:bg-black border-2 border-black/10 dark:border-white/10 group-hover:border-[#0d99ff]" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white dark:bg-black border-2 border-black/10 dark:border-white/10 group-hover:border-[#0d99ff]" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white dark:bg-black border-2 border-black/10 dark:border-white/10 group-hover:border-[#0d99ff]" />
          </div>

          {/* Actual Image */}
          <img 
            src={global.profileImage || "/me.png"} 
            alt="Vedant Kapil" 
            className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />
          
          <div className="relative z-20 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-black/10 dark:border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-black dark:text-white font-semibold text-lg">Vedant Kapil</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">AI Engineer & Builder</p>
          </div>
        </motion.div>

        {/* Right: Typography and Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-8">
            <User className="w-10 h-10 text-[#ff3b30]" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-black dark:text-white transition-colors">
              About Me.
            </h2>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-8 leading-tight transition-colors">
            {global.aboutTitle ? global.aboutTitle.split('\\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            )) : "I build AI systems that solve real problems."}
          </h3>

          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 transition-colors">
            <p leading-relaxed>
              {global.aboutText1 || "I am a passionate AI engineer and full-stack developer dedicated to building production-ready generative AI agents. My background bridges the gap between deep machine learning research and practical software engineering."}
            </p>
            <p leading-relaxed>
              {global.aboutText2 || "When I'm not training models or architecting new systems, I'm contributing to open-source projects, writing technical blogs, and constantly pushing the boundaries of what's possible with modern web and AI technologies."}
            </p>
          </div>

          <div className="mt-12">
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:bg-[#ff3b30] dark:hover:bg-[#ff3b30] hover:text-white transition-colors group"
            >
              <span>Download Resume</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
