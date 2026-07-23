import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Star, GitFork, ArrowUpRight } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export const GitHubRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Vedant021004/repos?sort=updated&per_page=6");
        if (response.ok) {
          const data = await response.json();
          // Filter out the portfolio repo itself if desired, or keep it.
          const filtered = data.filter((repo: Repo) => repo.name !== "Vedant021004.github.io").slice(0, 6);
          setRepos(filtered);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-24 px-6 md:px-10 max-w-[1600px] mx-auto bg-white border-t border-gray-100">
      
      {/* Section Header */}
      <div className="mb-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Code2 className="w-10 h-10 text-black" />
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-black">
            Open Source
          </h2>
        </div>
        <a 
          href="https://github.com/Vedant021004" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#f5f5f5] hover:bg-[#e5e5e5] text-black font-bold rounded-full transition-colors"
        >
          View all <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block p-8 bg-white border-2 border-black/10 rounded-3xl hover:border-black transition-colors"
            >
              <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-[#0d99ff] transition-colors line-clamp-1">
                {repo.name}
              </h3>
              
              <p className="text-gray-600 mb-8 line-clamp-2 h-12">
                {repo.description || "No description available."}
              </p>

              <div className="flex items-center justify-between text-sm font-semibold">
                {/* Language Pill */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff3b30]" />
                  <span className="text-black">{repo.language || "Markdown"}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};
