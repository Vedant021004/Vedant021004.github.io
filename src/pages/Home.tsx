import { motion } from "framer-motion";
import { MousePointer2, User, Briefcase } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Button } from "../components/ui/Button";

export const Home = () => {
  const dataJson = usePortfolioData();
  
  return (
    <div className="relative min-h-screen bg-white overflow-hidden selection:bg-[#0d99ff]/30 selection:text-black">
      
      {/* Main Playful Typography Area */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 pt-20">
        
        {/* Massive Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center text-[22vw] md:text-[18vw] font-display leading-none tracking-tighter text-black select-none"
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

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-8"
        >
          <p className="text-lg md:text-xl text-gray-700 font-medium tracking-tight">
            Currently building production AI systems with
          </p>

          {/* Pill Buttons */}
          <div className="flex items-center gap-6">
            {/* My Work Pill */}
            <div className="relative group cursor-pointer">
              <div className="pl-14 pr-6 py-3 border-2 border-black rounded-full flex items-center gap-2 hover:bg-black/5 transition-colors bg-white">
                <span className="font-semibold text-black">My work</span>
              </div>
              {/* Overlapping floating icon */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xl -rotate-6 group-hover:rotate-0 transition-transform shadow-lg border border-white/20">
                <span className="text-blue-400">A</span>I.
              </div>
            </div>

            {/* About Me Pill */}
            <div className="px-8 py-3 bg-[#2c2c2c] hover:bg-black text-white rounded-full font-semibold transition-colors cursor-pointer shadow-lg">
              About Me
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
