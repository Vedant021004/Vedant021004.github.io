import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/10 py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <h1 className="font-mono text-sm md:text-base tracking-widest text-black font-semibold">
            Vedant.Kapil
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/about" className="px-4 py-2 border border-black/20 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-black/5 transition-colors">
            <span className="w-6 h-6 bg-black text-white rounded flex items-center justify-center text-xs italic font-serif">B</span>
            My Blog
          </Link>
          <a href="mailto:vedant@example.com" className="px-5 py-2 bg-[#2c2c2c] text-white rounded-full text-sm font-semibold hover:bg-black transition-colors">
            Let's talk
          </a>
        </div>
      </div>
    </motion.header>
  );
};
