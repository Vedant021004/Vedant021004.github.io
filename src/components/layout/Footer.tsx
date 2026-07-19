import { motion } from "framer-motion";
import { GitBranch, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="border-t border-white/5 bg-black py-12"
  >
    <div className="mx-auto flex w-full max-w-6xl flex-col md:flex-row items-center justify-between gap-6 px-6">
      <div className="flex flex-col items-center md:items-start gap-1">
        <p className="font-display text-base font-semibold text-white tracking-wide">
          VEDANT KAPIL
        </p>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Vedant Kapil. All rights reserved.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <a href="https://github.com/Vedant021004" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
          <GitBranch className="h-4 w-4" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
          <Globe className="h-4 w-4" />
        </a>
        <Link to="/admin" className="text-gray-700 hover:text-gray-400 text-xs transition-colors ml-4 uppercase tracking-widest font-medium">
          Admin
        </Link>
      </div>
    </div>
  </motion.footer>
);
