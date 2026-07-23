import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Stats } from "./pages/Stats";
import { Certificates } from "./pages/Certificates";
import { Admin } from "./pages/Admin";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCursor } from "./components/ui/CustomCursor";

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); 
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loader-overlay z-[200]"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="text-3xl md:text-5xl font-display tracking-widest uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Initializing
        </div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <div className="font-mono text-sm tracking-widest text-white/60">{progress}%</div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} key="preloader" />}
      </AnimatePresence>
      <div className={`min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-white flex flex-col font-body antialiased transition-colors duration-500 ${loading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <main className="flex-1 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/github" element={<Stats />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
