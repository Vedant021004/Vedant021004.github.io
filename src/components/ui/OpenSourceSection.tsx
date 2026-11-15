import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Star, GitFork, ArrowUpRight, ExternalLink } from "lucide-react";
import { Github } from "./BrandIcons";

interface RepoItem {
  id: string | number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  demoUrl?: string;
}

const CURATED_REPOS: RepoItem[] = [
  {
    id: "gen-ai-langchain",
    name: "GEN-AI--Langchain-",
    description: "Production RAG PDF Chatbot leveraging LangChain, vector embeddings, and Streamlit for real-time document QA.",
    language: "Python",
    stars: 2,
    forks: 1,
    url: "https://github.com/Vedant021004/GEN-AI--Langchain-",
    demoUrl: "https://genniacqcxj6xbjrk9niak.streamlit.app/",
  },
  {
    id: "lanngraph",
    name: "LANNGRAPH",
    description: "Multi-agent orchestration experiments with cyclical StateGraphs, supervisor nodes, and conditional tool routing.",
    language: "Python",
    stars: 2,
    forks: 0,
    url: "https://github.com/Vedant021004/LANNGRAPH",
  },
  {
    id: "ai-interview-ui",
    name: "ai-interview-ui",
    description: "Interactive real-time interview evaluation interface with speech transcription and contextual AI feedback generation.",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/Vedant021004/ai-interview-ui",
  },
  {
    id: "open-knowledge-format",
    name: "open-knowledge-format",
    description: "Standardized document representation schemas for cross-system RAG chunking and vector serialization.",
    language: "Python",
    stars: 1,
    forks: 0,
    url: "https://github.com/Vedant021004/open-knowledge-format",
  },
  {
    id: "ml-journey",
    name: "ML-JOURNEY",
    description: "Comprehensive implementation of machine learning models from scratch, neural networks, and mathematical foundations.",
    language: "Jupyter Notebook",
    stars: 1,
    forks: 0,
    url: "https://github.com/Vedant021004/ML-JOURNEY",
    demoUrl: "https://mymodelone.streamlit.app/",
  },
  {
    id: "numpy-internals",
    name: "Numpy",
    description: "Low-level tensor manipulations, memory striding, and vectorized numerical operations benchmarking.",
    language: "Python",
    stars: 1,
    forks: 0,
    url: "https://github.com/Vedant021004/Numpy",
  },
];

export const OpenSourceSection = () => {
  const [repos, setRepos] = useState<RepoItem[]>(CURATED_REPOS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLiveRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/Vedant021004/repos?sort=updated&per_page=20");
        if (res.ok) {
          const liveData = await res.json();
          const valid = liveData
            .filter((r: any) => 
              r.description && 
              r.description.trim().length > 10 && 
              !r.fork && 
              !r.name.includes(".github.io") &&
              !r.name.toLowerCase().includes("portfolio")
            )
            .map((r: any) => ({
              id: r.id,
              name: r.name,
              description: r.description,
              language: r.language || "Python",
              stars: r.stargazers_count,
              forks: r.forks_count,
              url: r.html_url,
              demoUrl: r.homepage || undefined,
            }))
            .slice(0, 6);

          if (valid.length >= 3) {
            setRepos(valid);
          }
        }
      } catch (e) {
        // Fallback to curated repos
      }
    };

    fetchLiveRepos();
  }, []);

  return (
    <section id="open-source" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/[0.08]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-mono-tech uppercase tracking-wider mb-4 border border-[#7C5CFF]/25">
            <Code2 className="w-3.5 h-3.5" />
            <span>PUBLIC CODE REPOSITORIES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
            OPEN SOURCE
          </h2>
          <p className="mt-3 text-base text-[#9CA3AF] max-w-xl font-mono-tech">
            Curated repositories highlighting code architecture, clean modular design, and technical experiments.
          </p>
        </div>

        <a
          href="https://github.com/Vedant021004"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#101216] border border-white/[0.1] hover:border-white/25 text-xs font-mono-tech text-white transition-all w-fit"
        >
          <Github className="w-4 h-4" />
          <span>VIEW GITHUB PROFILE</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#7C5CFF]" />
        </a>
      </div>

      {/* Repositories Grid (Max 6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, idx) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            className="p-6 rounded-3xl bg-[#101216] border border-white/[0.08] hover:border-[#7C5CFF]/40 transition-all duration-300 card-glow flex flex-col justify-between group"
          >
            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-tech text-[#7C5CFF] font-bold">
                  {repo.language}
                </span>

                <div className="flex items-center gap-3 text-xs font-mono-tech text-white/40">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white font-mono-tech group-hover:text-[#7C5CFF] transition-colors mb-2.5 break-all">
                {repo.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-3 font-sans">
                {repo.description}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-tech">
              {repo.demoUrl ? (
                <a
                  href={repo.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live App</span>
                </a>
              ) : (
                <span className="text-white/30 text-[11px]">Repository</span>
              )}

              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#08090B] border border-white/[0.08] text-white/70 hover:text-white hover:border-[#7C5CFF]/40 flex items-center gap-1.5 transition-all text-[11px]"
              >
                <span>Code</span>
                <ArrowUpRight className="w-3 h-3 text-[#7C5CFF]" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
