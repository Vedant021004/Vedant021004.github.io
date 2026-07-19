import { motion } from "framer-motion";

export const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="border-t border-white/5 bg-black py-12"
  >
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
      <div className="flex flex-col items-center md:items-start gap-1">
        <p className="font-display text-base font-semibold text-white tracking-wide">
          VEDANT KAPIL
        </p>
        <p className="text-sm text-gray-500">AI Systems Engineer</p>
      </div>
      
      <div className="flex items-center gap-6 text-sm text-gray-400">
        {[
          { label: "GitHub", href: "https://github.com/Vedant021004" },
          { label: "LinkedIn", href: "https://linkedin.com" },
          { label: "Twitter", href: "#" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  </motion.footer>
);
