import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Star, GitFork, ArrowUpRight, Globe } from "lucide-react";
import { usePortfolioData } from "../../hooks/usePortfolioData";

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at?: string;
}

const getLanguageColor = (lang?: string) => {
  if (!lang) return "#9ca3af";
  const colors: Record<string, string> = {
    python: "#3572A5",
    typescript: "#3178C6",
    javascript: "#f7df1e",
    html: "#e34c26",
    css: "#563d7c",
    "c++": "#f34b7d",
    c: "#555555",
    shell: "#89e051",
    jupyter: "#DA5B0B"
  };
  return colors[lang.toLowerCase()] || "#ea6b24";
};

export const GitHubRepos = () => {
  const dataJson = usePortfolioData();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Vedant021004/repos?sort=updated&per_page=30");
        if (response.ok) {
          const data = (await response.json()) as Repo[];
          const hidden = (dataJson.hiddenRepos || []).map((name: string) => name.toLowerCase().trim());
          const filtered = data
            .filter((repo: Repo) => !hidden.includes(repo.name.toLowerCase().trim()))
            .slice(0, 6);
          setRepos(filtered);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [dataJson.hiddenRepos]);

  return (
    <section id="github" className="py-16 md:py-24 px-6 md:px-10 max-w-[1600px] mx-auto bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
      
      {/* Section Header */}
      <div className="mb-12 md:mb-16 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Code2 className="w-9 h-9 md:w-10 md:h-10 text-black dark:text-white transition-colors" />
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-black dark:text-white transition-colors">
            Open Source
          </h2>
        </div>
        <a 
          href="https://github.com/Vedant021004" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f5f5f5] dark:bg-[#1a1a1a] hover:bg-[#e8e8e8] dark:hover:bg-[#252525] text-black dark:text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95 text-sm md:text-base"
        >
          <span>View all on GitHub</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {loading ? (
        /* Smooth Skeleton Grid while loading to eliminate layout shift */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div 
              key={n}
              className="h-[280px] rounded-3xl p-7 bg-[#fbfbfb] dark:bg-[#0d0d0d] border border-black/5 dark:border-white/5 animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/10 rounded-lg mb-4" />
                <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-white/10 rounded" />
              </div>
              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between">
                <div className="h-4 w-20 bg-gray-200 dark:bg-white/10 rounded" />
                <div className="h-4 w-16 bg-gray-200 dark:bg-white/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => {
            const links = (dataJson.projectLinks || {}) as Record<string, string>;
            const matchedKey = Object.keys(links).find(
              k => k.toLowerCase().trim() === repo.name.toLowerCase().trim()
            );
            const demoUrl = matchedKey ? links[matchedKey] : null;

            return (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                className="group flex flex-col justify-between p-7 bg-[#fbfbfb] dark:bg-[#0e0e0e] border border-black/10 dark:border-white/10 rounded-3xl hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-[#0d99ff] transition-colors line-clamp-1 tracking-tight">
                      {repo.name}
                    </h3>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all shrink-0"
                      title="View GitHub Repository"
                    >
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem] transition-colors">
                    {repo.description || "Open source project on GitHub."}
                  </p>
                </div>

                {/* Bottom Actions & Meta */}
                <div className="flex flex-col gap-4 mt-auto">
                  {/* Action Buttons Row */}
                  <div className="flex items-center gap-2">
                    {demoUrl ? (
                      <>
                        <a
                          href={demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#ea6b24] hover:bg-[#d55b18] text-white text-xs font-semibold rounded-full transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white text-xs font-medium rounded-full transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      </>
                    ) : (
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white text-xs font-medium rounded-full transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>View Repository</span>
                      </a>
                    )}
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 pt-3 border-t border-black/5 dark:border-white/5">
                    {/* Language Badge */}
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="text-gray-700 dark:text-gray-300 font-mono text-[11px]">
                        {repo.language || "Code"}
                      </span>
                    </div>

                    {/* Stars and Forks */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1" title={`${repo.stargazers_count} stars`}>
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1" title={`${repo.forks_count} forks`}>
                        <GitFork className="w-3.5 h-3.5 text-gray-400" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};
