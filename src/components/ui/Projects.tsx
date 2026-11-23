import { motion } from "framer-motion";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { BrainCircuit, Database, FolderGit2, Sparkles, ExternalLink } from "lucide-react";

export const Projects = () => {
  const data = usePortfolioData();
  const caseStudies = data.caseStudies || [];

  // Helper to map an icon and background color to each project
  const getProjectVisual = (index: number) => {
    const visuals = [
      { bg: "bg-gradient-to-br from-[#0d99ff] to-[#0066cc]", icon: <BrainCircuit className="w-24 h-24 md:w-28 md:h-28 text-white drop-shadow-md" /> },
      { bg: "bg-gradient-to-br from-[#1c1c1c] to-[#000000]", icon: <Database className="w-24 h-24 md:w-28 md:h-28 text-white drop-shadow-md" /> },
      { bg: "bg-gradient-to-br from-[#ea6b24] to-[#c44e0e]", icon: <Sparkles className="w-24 h-24 md:w-28 md:h-28 text-white drop-shadow-md" /> }
    ];
    return visuals[index % visuals.length];
  };

  return (
    <section id="projects" className="py-16 md:py-24 px-6 md:px-10 max-w-[1600px] mx-auto bg-white dark:bg-[#050505] transition-colors duration-500">
      
      {/* Section Header */}
      <div className="mb-12 md:mb-16 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <FolderGit2 className="w-9 h-9 md:w-10 md:h-10 text-black dark:text-white transition-colors" />
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-black dark:text-white transition-colors">
            Projects
          </h2>
        </div>
        <a
          href="/projects.html"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ea6b24] hover:bg-[#d55b18] text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          title="Open interactive project showcase"
        >
          <span>See Projects</span>
          <span className="text-sm">↗</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
        {caseStudies.map((project, index) => {
          const visual = getProjectVisual(index);
          
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group flex flex-col h-full bg-[#fbfbfb] dark:bg-[#0e0e0e] border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:border-black/30 dark:hover:border-white/30 hover:shadow-xl"
            >
              {/* Project Cover */}
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${project.title} live demo`}
                className={`w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center mb-6 md:mb-8 ${visual.bg} transition-all duration-500 group-hover:shadow-md cursor-pointer relative`}
              >
                <div className="transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center">
                  {visual.icon}
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-black/60 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* Title */}
              <h3 className="text-2xl md:text-4xl font-display font-black tracking-tight text-black dark:text-white mb-3 transition-colors">
                {project.title.split(":")[0]}
              </h3>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.tech && project.tech.map((techName: string) => (
                  <span 
                    key={techName}
                    className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                  >
                    {techName}
                  </span>
                ))}
                <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 flex items-center gap-1.5 pl-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live Demo
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-normal transition-colors flex-grow">
                {project.approach}
              </p>

              {/* Action Buttons Row */}
              <div className="mt-auto pt-4 flex items-center gap-3 md:gap-4 border-t border-black/5 dark:border-white/5">
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-100 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>View Project</span>
                  <span className="ml-1.5 text-xs">↗</span>
                </a>
                <a 
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white text-black dark:text-white rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
