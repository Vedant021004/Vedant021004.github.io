import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, GitBranch, Globe, Terminal, Database, Code2, Layout, Binary, ExternalLink, ChevronRight } from "lucide-react";
import { useGithubRepos, Repo } from "../hooks/useGithubRepos";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Button } from "../components/ui/Button";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getLanguageConfig = (lang: string) => {
  switch (lang?.toLowerCase()) {
    case 'python':
      return { icon: Terminal, gradient: "from-blue-500/20 to-yellow-500/20", color: "text-blue-500" };
    case 'jupyter notebook':
      return { icon: Database, gradient: "from-orange-500/20 to-red-500/20", color: "text-orange-500" };
    case 'typescript':
    case 'javascript':
      return { icon: Code2, gradient: "from-blue-500/20 to-cyan-500/20", color: "text-blue-500" };
    case 'html':
    case 'css':
      return { icon: Layout, gradient: "from-pink-500/20 to-purple-500/20", color: "text-pink-500" };
    default:
      return { icon: Binary, gradient: "from-gray-500/20 to-gray-400/20", color: "text-gray-500" };
  }
};

export const Projects = () => {
  const { repos, loading, error } = useGithubRepos("Vedant021004");
  const dataJson = usePortfolioData();
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [activeRepo, setActiveRepo] = useState<Repo | null>(null);

  const caseStudies = (dataJson as any).caseStudies || [];

  const languages = useMemo(() => {
    const values = new Set(repos.map((repo) => repo.language).filter(Boolean));
    return ["All", ...Array.from(values).sort()];
  }, [repos]);

  const filtered = useMemo(() => {
    let data = [...repos];
    if (dataJson.hiddenRepos && dataJson.hiddenRepos.length > 0) {
      const hidden = dataJson.hiddenRepos.map(name => name.toLowerCase().trim());
      data = data.filter((r) => !hidden.includes(r.name.toLowerCase().trim()));
    }
    if (search) data = data.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
    if (language !== "All") data = data.filter((r) => r.language === language);
    return data.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }, [repos, search, language, dataJson]);

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-black dark:text-white mb-6">
            Featured Work
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
            A deep dive into the engineering behind production AI systems. Here is a look at the challenges, architectures, and results.
          </p>
        </motion.div>

        {/* Featured Case Studies */}
        {caseStudies.length > 0 && (
          <div className="flex flex-col gap-12 mb-32">
            {caseStudies.map((study: any, idx: number) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-10 transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
              >
                <div className="flex-1 w-full rounded-2xl overflow-hidden bg-black/10 dark:bg-white/10 aspect-video relative">
                  {study.image ? (
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div className="flex gap-4">
                      {study.demoUrl && (
                        <Button label="Live Demo" href={study.demoUrl} icon={ExternalLink} variant="primary" className="!px-4 !py-2 !text-xs" />
                      )}
                      {study.repoUrl && (
                        <Button label="Source" href={study.repoUrl} icon={GitBranch} variant="secondary" className="!px-4 !py-2 !text-xs bg-black/50 border-white/20 text-white" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-6 w-full">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-medium text-black dark:text-white mb-2">{study.title}</h2>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{study.subtitle}</p>
                  </div>
                  <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
                    <div>
                      <strong className="text-black dark:text-white block mb-1">The Problem:</strong>
                      <p className="text-sm leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <strong className="text-black dark:text-white block mb-1">The Approach:</strong>
                      <p className="text-sm leading-relaxed">{study.approach}</p>
                    </div>
                    <div>
                      <strong className="text-black dark:text-white block mb-1">The Results:</strong>
                      <p className="text-sm leading-relaxed">{study.results}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.tech.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs text-gray-600 dark:text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Open Source Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full h-px bg-black/10 dark:bg-white/10 mb-20 relative"
        >
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-gray-50 dark:bg-[var(--bg-color)] px-4 text-sm tracking-widest uppercase text-gray-400">
            Open Source Repositories
          </span>
        </motion.div>

        {/* Filtering */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative flex items-center w-full md:w-auto">
            <Search className="absolute left-4 h-4 w-4 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search repositories..."
              className="w-full md:w-80 rounded-full border border-black/10 dark:border-white/10 bg-transparent py-3 pl-12 pr-4 text-sm text-black dark:text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500"
            />
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-auto rounded-full border border-black/10 dark:border-white/10 bg-transparent py-3 pl-6 pr-10 text-sm text-gray-700 dark:text-gray-300 outline-none transition-colors focus:border-indigo-500 appearance-none"
          >
            {languages.map((l) => (
              <option key={l} value={l} className="bg-white dark:bg-gray-900">
                {l}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 mb-8">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse" />
              ))
            : filtered.map((repo, idx) => (
                <motion.button
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveRepo(repo)}
                  className="group flex flex-col items-start justify-between rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden text-left transition-all hover:bg-black/5 dark:hover:bg-white/5 hover:border-indigo-500/50"
                >
                  <div className="w-full p-8 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      {(() => {
                        const Config = getLanguageConfig(repo.language);
                        const Icon = Config.icon;
                        return <Icon className={`w-8 h-8 ${Config.color} opacity-80`} />;
                      })()}
                      <div className="flex gap-2 text-xs font-medium">
                        {repo.language && (
                          <span className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-medium text-black dark:text-white mb-3 line-clamp-1">
                      {repo.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                      {repo.description || "No description provided."}
                    </p>
                  </div>
                  
                  <div className="flex w-full items-center justify-between px-8 py-5 border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">⭐ {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1">🍴 {repo.forks_count}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
                  </div>
                </motion.button>
              ))}
        </div>

        {/* Repo Detail Modal */}
        <AnimatePresence>
          {activeRepo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRepo(null)}
              className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 dark:bg-black/80 backdrop-blur-md p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-[2rem] border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-8 md:p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display text-2xl font-medium text-black dark:text-white break-all pr-8">
                      {activeRepo.name}
                    </h3>
                    <button
                      onClick={() => setActiveRepo(null)}
                      className="absolute right-0 top-0 rounded-full p-2 text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                    {activeRepo.description || "No description provided."}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-4">
                      <span className="block text-xs text-gray-500 mb-1">Language</span>
                      <span className="text-black dark:text-white font-medium">{activeRepo.language || "N/A"}</span>
                    </div>
                    <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-4">
                      <span className="block text-xs text-gray-500 mb-1">Last Updated</span>
                      <span className="text-black dark:text-white font-medium">{formatDate(activeRepo.updated_at)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {(dataJson as any).projectLinks?.[activeRepo.name] && (
                      <a
                        href={(dataJson as any).projectLinks[activeRepo.name]}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-4 font-medium transition-all hover:scale-[1.02] hover:bg-indigo-700"
                      >
                        <Globe className="h-5 w-5" />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={activeRepo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white px-6 py-4 font-medium transition-all hover:bg-black/10 dark:hover:bg-white/20"
                    >
                      <GitBranch className="h-5 w-5" />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
