import { motion } from "framer-motion";
import { GitBranch, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="border-t border-black/5 dark:border-white/5 glass py-8 mt-20 transition-colors duration-500"
  >
    <div className="mx-auto flex w-full max-w-6xl flex-col md:flex-row items-center justify-between gap-6 px-6">
      <div className="flex flex-col items-center md:items-start gap-1">
        <p className="font-display text-lg font-semibold text-black dark:text-white tracking-wide transition-colors">
          VEDANT KAPIL
        </p>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Vedant Kapil. All rights reserved.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <a href="https://github.com/Vedant021004" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-indigo-500 transition-colors">
          <GitBranch className="h-5 w-5" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-indigo-500 transition-colors">
          <Globe className="h-5 w-5" />
        </a>
        <Link to="/admin" className="text-gray-600 hover:text-indigo-500 text-xs transition-colors ml-4 uppercase tracking-widest font-medium border border-black/10 dark:border-white/10 px-3 py-1 rounded-full">
          Admin
        </Link>
      </div>
    </div>
  </motion.footer>
);
