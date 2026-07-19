import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, GitBranch } from "lucide-react";
import { useGithubRepos, Repo } from "../hooks/useGithubRepos";
import dataJson from "../data.json";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const Projects = () => {
  const { repos, loading, error } = useGithubRepos("Vedant021004");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [activeRepo, setActiveRepo] = useState<Repo | null>(null);

  const languages = useMemo(() => {
    const values = new Set(repos.map((repo) => repo.language).filter(Boolean));
    return ["All", ...Array.from(values).sort()];
  }, [repos]);

  const filtered = useMemo(() => {
    let data = [...repos];
    
    // Filter hidden repos
    if (dataJson.hiddenRepos && dataJson.hiddenRepos.length > 0) {
      data = data.filter((r) => !dataJson.hiddenRepos.includes(r.name));
    }

    if (search) data = data.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
    if (language !== "All") data = data.filter((r) => r.language === language);
    return data.sort((a, b) => b.stargazers_count - a.stargazers_count); // Default sort by stars
  }, [repos, search, language]);

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
              Open Source
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Exploring AI research and production systems through code.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-gray-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search repositories..."
                className="w-full sm:w-64 rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-white/30 focus:bg-white/10"
              />
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-full border border-white/10 bg-black py-2 pl-4 pr-8 text-sm text-gray-300 outline-none transition-colors focus:border-white/30"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {error && <p className="text-red-400 mb-8">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
              ))
            : filtered.map((repo, idx) => (
                <motion.button
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveRepo(repo)}
                  className="group flex flex-col items-start justify-between rounded-2xl border border-white/10 bg-white/5 overflow-hidden text-left transition-all hover:bg-white/10 hover:border-white/20"
                >
                  {dataJson.projectImages && (dataJson.projectImages as any)[repo.name] && (
                    <div className="w-full h-40 bg-black overflow-hidden border-b border-white/10">
                      <img 
                        src={(dataJson.projectImages as any)[repo.name]} 
                        alt={repo.name} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  )}
                  <div className="w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-lg font-medium text-white truncate pr-4">
                        {repo.name}
                      </h3>
                      {repo.language && (
                        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-6">
                      {repo.description || "No description provided."}
                    </p>
                  </div>
                  
                  <div className="flex w-full items-center justify-between mt-auto px-6 pb-6 pt-4 border-t border-white/5">
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">⭐ {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1">🍴 {repo.forks_count}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                </motion.button>
              ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeRepo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRepo(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl font-medium text-white break-all">
                    {activeRepo.name}
                  </h3>
                  <button
                    onClick={() => setActiveRepo(null)}
                    className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {dataJson.projectImages && (dataJson.projectImages as any)[activeRepo.name] && (
                  <div className="w-full rounded-xl overflow-hidden mb-6 border border-white/10 bg-black/50">
                    <img 
                      src={(dataJson.projectImages as any)[activeRepo.name]} 
                      alt={activeRepo.name} 
                      className="w-full h-auto max-h-[250px] object-cover"
                    />
                  </div>
                )}

                <p className="text-gray-400 leading-relaxed mb-8">
                  {activeRepo.description || "No description provided."}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <span className="block text-xs text-gray-500 mb-1">Language</span>
                    <span className="text-white font-medium">{activeRepo.language || "N/A"}</span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <span className="block text-xs text-gray-500 mb-1">Last Updated</span>
                    <span className="text-white font-medium">{formatDate(activeRepo.updated_at)}</span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <span className="block text-xs text-gray-500 mb-1">Stars</span>
                    <span className="text-white font-medium">{activeRepo.stargazers_count}</span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <span className="block text-xs text-gray-500 mb-1">Forks</span>
                    <span className="text-white font-medium">{activeRepo.forks_count}</span>
                  </div>
                </div>

                <a
                  href={activeRepo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3 font-medium transition-transform hover:scale-[1.02]"
                >
                  <GitBranch className="h-5 w-5" />
                  View Repository
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
