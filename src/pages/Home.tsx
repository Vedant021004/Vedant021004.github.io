import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Bug } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Projects } from "../components/ui/Projects";
import { Certificates } from "../components/ui/Certificates";
import { GitHubRepos } from "../components/ui/GitHubRepos";
import { AboutMe } from "../components/ui/AboutMe";
import antGif from "../assets/ant.gif";

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
        
        {/* Massive Text Container */}
        <div className="flex items-center text-[22vw] md:text-[18vw] font-display leading-none tracking-tighter text-black dark:text-white select-none relative w-full justify-center min-h-[40vh]">
          
          <AnimatePresence mode="wait">
            {!isDark ? (
              /* LIGHT MODE: v-ed-a-nt */
              <motion.div 
                key="light-mode-text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center absolute"
              >
                {/* 'v' with Figma bounding box */}
                <div className="figma-box px-1 md:px-3">
                  <span className="figma-handle figma-handle-tl" />
                  <span className="figma-handle figma-handle-tr" />
                  <span className="figma-handle figma-handle-bl" />
                  <span className="figma-handle figma-handle-br" />
                  v
                </div>
                
                {/* 'ed' */}
                <span className="pb-4">ed</span>
                
                {/* 'a' replaced with red blob */}
                <div className="relative w-[0.8em] h-[0.8em] flex items-center justify-center mx-2 md:mx-4 mt-8">
                  <motion.div 
                    className="absolute inset-0 bg-[#ff3b30] rounded-full" 
                    animate={{ 
                      borderRadius: ["50%", "40% 60% 70% 30%", "60% 40% 30% 70%", "50%"] 
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Cursor icon inside blob */}
                  <motion.div
                    animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-10"
                  >
                    <MousePointer2 className="w-[0.3em] h-[0.3em] text-black fill-black -rotate-12" />
                  </motion.div>
                </div>
                
                {/* 'nt' */}
                <span className="pb-4">nt</span>
              </motion.div>
            ) : (
              /* DARK MODE: ved      ant(bug) */
              <motion.div 
                key="dark-mode-text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center w-full justify-center gap-[2vw] md:gap-[5vw] absolute"
              >
                {/* "ved" slides left */}
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: -20 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="pb-4 relative z-10"
                >
                  ved
                </motion.div>

                {/* The word "ant" stays put, and the bug crawls out of it! */}
                <div className="relative flex items-center">
                  
                  {/* The actual text "ant" */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="text-[10vw] md:text-[6vw] font-mono tracking-tighter relative z-20 bg-[#050505]"
                  >
                    ant
                  </motion.div>

                  {/* The crawling ant GIF emerging from the text */}
                  <motion.div
                    initial={{ x: -50, opacity: 0, scale: 0.5 }}
                    animate={{ 
                      x: [0, 80, 150, 250, 400, typeof window !== "undefined" ? window.innerWidth : 1000], 
                      y: [0, -10, 5, -15, 10, 0],
                      rotate: [0, 10, -5, 15, -10, 0],
                      opacity: [0, 1, 1, 1, 1, 1],
                      scale: 1
                    }}
                    transition={{ 
                      duration: 10, 
                      ease: "linear",
                      times: [0, 0.1, 0.3, 0.5, 0.7, 1],
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: 0.5 // Waits half a second before crawling out
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center text-[#ff3b30]"
                  >
                    <img 
                      src={antGif} 
                      alt="Crawling Ant" 
                      className="w-[20vw] md:w-[12vw] object-contain drop-shadow-2xl"
                    />
                    
                    {/* Speech Bubble "Hi!" */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 2, duration: 0.5, type: "spring" }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 text-[#ff9500] text-2xl md:text-4xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] whitespace-nowrap z-50 w-max"
                    >
                      Hi!
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-500 font-mono text-sm md:text-base mt-2 mb-8 italic"
        >
          * "ved" for smart (from the Vedas) • "ant" for hard work
        </motion.div>

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
