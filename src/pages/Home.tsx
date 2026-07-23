import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Bug } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Projects } from "../components/ui/Projects";
import { Certificates } from "../components/ui/Certificates";
import { GitHubRepos } from "../components/ui/GitHubRepos";
import { AboutMe } from "../components/ui/AboutMe";
import antImg from "../assets/ant.png";

export const Home = () => {
  const { global } = usePortfolioData();
  const [isDark, setIsDark] = useState(
    localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('theme_changed', handleThemeChange);
    return () => window.removeEventListener('theme_changed', handleThemeChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#050505] overflow-hidden selection:bg-[#0d99ff]/30 selection:text-black dark:selection:text-white transition-colors duration-500">
      
      {/* Main Playful Typography Area */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-32">
        
        {/* Massive Text Container (New Logo Layout) */}
        <div className="flex flex-col items-center justify-center relative w-full min-h-[40vh] select-none">
          <div className="flex flex-col items-center relative">
            {/* Main Logo Row */}
            <div className="flex items-center justify-center relative">
              {/* Clean Ant Image */}
              <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1, type: "spring" }}
                 className="w-[30vw] md:w-[18vw] z-20 -mr-[6vw] md:-mr-[4vw] mb-[4vw] md:mb-[2vw]"
              >
                <img 
                  src={antImg} 
                  alt="Ant Logo" 
                  className="w-full h-auto object-contain drop-shadow-2xl dark:invert dark:drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)]" 
                />
              </motion.div>
              
              {/* "ved" Text */}
              <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1, type: "spring", delay: 0.1 }}
                 className="z-10"
              >
                 <h1 className="text-[28vw] md:text-[18vw] font-black text-[#ea6b24] leading-none tracking-tighter m-0 drop-shadow-sm font-display">
                   ved
                 </h1>
              </motion.div>
            </div>
            
            {/* Subtitle */}
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.4 }}
               className="flex flex-col items-center mt-4 md:mt-6 pl-[10vw] md:pl-[6vw]"
            >
               <span className="text-[3vw] md:text-[1.5vw] font-bold text-[#333] dark:text-[#ccc] tracking-[0.15em] leading-tight font-body">
                 INNOVATION & EFFICIENCY
               </span>
               <span className="text-[3vw] md:text-[1.5vw] font-bold text-[#333] dark:text-[#ccc] tracking-[0.15em] leading-tight mt-1 font-body">
                 SOLUTIONS
               </span>
            </motion.div>
          </div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex flex-col items-center gap-8 z-10"
        >
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 font-medium tracking-tight transition-colors">
            {global.currentStatus || "Currently building production AI systems with"}
          </p>

          {/* Pill Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {/* My Work Pill */}
            <a href="#projects" className="relative group cursor-pointer block">
              <div className="pl-14 pr-6 py-3 border-2 border-black dark:border-white rounded-full flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white dark:bg-black">
                <span className="font-semibold text-black dark:text-white transition-colors">My work</span>
              </div>
              {/* Overlapping floating icon */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-bold text-xl -rotate-6 group-hover:rotate-0 transition-transform shadow-lg border border-white/20 dark:border-black/20">
                <span className="text-blue-400 dark:text-blue-600">A</span>I.
              </div>
            </a>

            {/* About Me Pill */}
            <a href="#about" className="px-8 py-3 bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-full font-semibold transition-colors cursor-pointer shadow-sm">
              About Me
            </a>

            {/* Certificates Pill */}
            <a href="#certificates" className="px-8 py-3 bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-full font-semibold transition-colors cursor-pointer shadow-sm">
              Certifications
            </a>

            {/* GitHub Pill */}
            <a href="#github" className="px-8 py-3 bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-full font-semibold transition-colors cursor-pointer shadow-sm">
              Open Source
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <AboutMe />

      {/* Projects Grid Section */}
      <Projects />

      {/* Certificates Section */}
      <Certificates />

      {/* GitHub Repos Section */}
      <GitHubRepos />

    </div>
  );
};
