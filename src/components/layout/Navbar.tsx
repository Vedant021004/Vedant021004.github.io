import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GitBranch, Globe, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/certificates", label: "Certificates" },
  { path: "/github", label: "Stats" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 right-0 top-0 z-50 pt-4"
    >
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3 glass rounded-full shadow-sm">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white font-display font-bold transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            V
          </div>
          <span className="font-display text-lg font-semibold tracking-wide text-gray-900 dark:text-white ml-2">
            Vedant
          </span>
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex gap-6 items-center">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all ${
                    isActive ? "text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "text-gray-500 hover:text-black dark:hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 border-l border-black/10 dark:border-white/10 pl-6">
            <button onClick={toggleTheme} className="hover:text-indigo-500 transition-colors">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="https://github.com/Vedant021004" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors">
              <GitBranch className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition-colors">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-[80px] left-4 right-4 glass rounded-3xl p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive ? "text-indigo-500" : "text-gray-500 dark:text-gray-400"
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
