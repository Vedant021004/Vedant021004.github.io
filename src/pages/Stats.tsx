import { useMemo } from "react";
import { motion } from "framer-motion";
import { Code, Rocket, Star } from "lucide-react";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { useCountUp } from "../hooks/useCountUp";

export const Stats = () => {
  const user = "Vedant021004";
  const { repos } = useGithubRepos(user);
  
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  const starsCounter = useCountUp(totalStars);
  const forksCounter = useCountUp(totalForks);
  const reposCounter = useCountUp(repos.length);

  const languageStats = useMemo(() => {
    const counts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    const total = Object.values(counts).reduce((s, v) => s + v, 0) || 1;
    return Object.entries(counts)
      .map(([lang, count]) => ({ lang, count, percent: (count / total) * 100 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [repos]);

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-black dark:text-white mb-4 transition-colors">
            GitHub Stats
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors">Live contribution metrics and language breakdown.</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-8 transition-colors"
          >
            <h2 className="text-lg font-medium text-black dark:text-white mb-8 transition-colors">Contributions</h2>
            <div className="overflow-x-auto rounded-xl bg-white/[0.02] p-4 border border-black/5 dark:border-white/5 invert-0 dark:invert hue-rotate-0 dark:hue-rotate-180 brightness-100 dark:brightness-90 saturate-100 dark:saturate-0 transition-all">
              <img
                src={`https://ghchart.rshah.org/000000/${user}`}
                alt="GitHub contribution graph"
                className="w-full min-w-[600px]"
              />
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Stars", counter: starsCounter, icon: Star },
                { label: "Total Forks", counter: forksCounter, icon: Rocket },
                { label: "Repositories", counter: reposCounter, icon: Code },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className={`rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 flex flex-col justify-between transition-colors ${idx === 2 ? "col-span-2" : ""}`}
                >
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 mb-6 transition-colors">
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="font-display text-4xl text-black dark:text-white transition-colors" ref={item.counter.ref}>
                    {item.counter.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Language Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-8 flex-1 transition-colors"
            >
              <h2 className="text-lg font-medium text-black dark:text-white mb-8 transition-colors">Languages</h2>
              <div className="space-y-6">
                {languageStats.map((item, idx) => (
                  <div key={item.lang}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 dark:text-gray-300 transition-colors">{item.lang}</span>
                      <span className="text-gray-500">{item.percent.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/5 transition-colors">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-black dark:bg-white transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
