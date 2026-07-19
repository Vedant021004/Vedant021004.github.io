import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TechCardProps {
  title: string;
  icon: LucideIcon;
  description?: string;
}

export const TechCard = ({ title, icon: Icon, description }: TechCardProps) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-black/10 dark:hover:bg-white/10"
  >
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/10 dark:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors group-hover:bg-black/20 dark:group-hover:bg-white/20 group-hover:text-black dark:group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-display text-lg font-medium text-black dark:text-white tracking-tight transition-colors">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
            {description}
          </p>
        )}
      </div>
    </div>
    {/* Subtle gradient glow effect on hover */}
    <div className="absolute -inset-x-4 -inset-y-4 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent pointer-events-none blur-2xl" />
  </motion.div>
);
