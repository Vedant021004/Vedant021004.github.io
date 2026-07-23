import { motion, HTMLMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useRef, useState } from "react";

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
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 backdrop-blur-md relative z-10 overflow-hidden group";
  const variants = {
    primary:
      "bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-900 dark:text-indigo-100 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.05)] hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]",
    secondary:
      "bg-transparent text-gray-700 dark:text-gray-300 border border-black/10 dark:border-white/10 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30",
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      href={href}
      target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
      rel={href.startsWith("http") || href.endsWith(".pdf") ? "noreferrer" : undefined}
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 relative z-10" />}
      <span className="relative z-10">{label}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-full" />
      )}
    </motion.a>
  );
};
