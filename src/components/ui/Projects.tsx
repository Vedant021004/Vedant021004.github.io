import { motion } from "framer-motion";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { BrainCircuit, Database } from "lucide-react";

export const Projects = () => {
  const data = usePortfolioData();
  const caseStudies = data.caseStudies || [];

  // Helper to map an icon and background color to each project
  const getProjectVisual = (index: number) => {
    const visuals = [
      { bg: "bg-[#000000]", icon: <Database className="w-32 h-32 text-white" /> },
      { bg: "bg-[#0d99ff]", icon: <BrainCircuit className="w-32 h-32 text-white" /> }
    ];
    return visuals[index % visuals.length];
  };

  return (
    <section id="projects" className="py-16 md:py-24 px-6 md:px-10 max-w-[1600px] mx-auto bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {caseStudies.map((project, index) => {
          const visual = getProjectVisual(index);
          
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group flex flex-col"
            >
              {/* Massive Solid Color Image Cover */}
              <div className={`w-full aspect-[4/3] rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 ${visual.bg} transition-transform duration-500 group-hover:-translate-y-2`}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {visual.icon}
                </motion.div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-black dark:text-white mb-4 transition-colors">
                {project.title.split(":")[0]}
              </h2>

              {/* Metadata Row */}
              <div className="flex justify-between items-center text-xs md:text-base text-gray-500 font-medium mb-4 md:mb-6 uppercase tracking-wider">
                <span>{project.tech.slice(0, 2).join(" | ")}</span>
                <span>Live Demo</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-xl leading-relaxed mb-6 md:mb-8 font-medium transition-colors">
                {project.approach}
              </p>

              {/* View Project Button */}
              <div className="mt-auto flex flex-col md:flex-row gap-3 md:gap-4">
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#333333] hover:bg-black text-white rounded-full font-semibold transition-colors"
                >
                  View Project
                </a>
                <a 
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-black hover:bg-black hover:text-white text-black rounded-full font-semibold transition-colors"
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
