import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GitBranch, Globe, FileText, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/certificates", label: "Certificates" },
  { path: "/github", label: "Stats" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl"
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-display font-bold transition-transform group-hover:scale-105">
            V
          </div>
          <span className="font-display text-sm font-semibold tracking-wide text-white">
            Vedant
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex gap-6 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-gray-400">
            <a href="https://github.com/Vedant021004" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <GitBranch className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col gap-4">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive ? "text-white" : "text-gray-400"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </motion.header>
  );
};
