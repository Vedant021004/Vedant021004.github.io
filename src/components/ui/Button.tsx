import { motion, HTMLMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends HTMLMotionProps<"a"> {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button = ({
  label,
  href,
  icon: Icon,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 backdrop-blur-md";
  const variants = {
    primary:
      "bg-black/10 dark:bg-white/10 text-black dark:text-white border border-black/20 dark:border-white/20 hover:bg-black/20 dark:hover:bg-white/20 hover:border-black/40 dark:hover:border-white/40 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]",
    secondary:
      "bg-transparent text-gray-700 dark:text-gray-300 border border-black/10 dark:border-white/10 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30",
  };

  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
      rel={href.startsWith("http") || href.endsWith(".pdf") ? "noreferrer" : undefined}
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </motion.a>
  );
};
