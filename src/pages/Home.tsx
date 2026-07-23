import { motion } from "framer-motion";
import { ArrowRight, Brain, Code, Cpu, Download, GitBranch, Layers, Rocket, Shield, Sparkles } from "lucide-react";
import { useTyping } from "../hooks/useTyping";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { useCountUp } from "../hooks/useCountUp";
import { Button } from "../components/ui/Button";
import { TechCard } from "../components/ui/TechCard";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useMemo, Suspense } from "react";
import Spline from '@splinetool/react-spline';
import { useTheme } from "../hooks/useTheme";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";

// Map string icon names to actual Lucide components
const IconMap: Record<string, any> = {
  Brain, Layers, Sparkles, Rocket, Shield, Code, Cpu
};

export const Home = () => {
  const dataJson = usePortfolioData();
  const { theme } = useTheme();
  
  const roles = dataJson.global?.roles || [
    "AI Systems Architect",
    "Deep Learning Engineer",
    "LLM Systems Designer"
  ];
  
  const expertise = dataJson.global?.expertise || [];
  const typedExpertise = expertise.map((item: any) => ({
    ...item,
    icon: IconMap[item.icon] || Code
  }));

  const typingText = useTyping(roles);
  const { repos } = useGithubRepos("Vedant021004");

  const totalStars = useMemo(() => repos.reduce((sum, repo) => sum + repo.stargazers_count, 0), [repos]);
  const starsCounter = useCountUp(totalStars);
  const repoCounter = useCountUp(repos.length);

  return (
    <div className="relative">
      {/* Aurora Mesh Background */}
      <div className="fixed inset-0 pointer-events-none transition-colors duration-500 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-500 aurora-orb" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600 aurora-orb" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-fuchsia-500 aurora-orb" style={{ animationDelay: '-10s' }} />
        <div className="absolute inset-0 bg-[var(--bg-color)] opacity-[0.85] dark:opacity-[0.95]" />
      </div>

      <section className="relative min-h-screen flex items-center px-6 pt-32 pb-20 overflow-hidden z-10">
        <div className="mx-auto w-full max-w-7xl flex flex-col items-start justify-center min-h-[70vh]">
          
          <div className="w-full flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start gap-4"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-black/20 dark:border-white/20 px-5 py-2 backdrop-blur-md mix-blend-difference">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                <span className="text-xs font-semibold text-white tracking-[0.2em] uppercase mix-blend-difference">
                  Available for new opportunities
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-md text-right text-sm md:text-base text-gray-800 dark:text-gray-300 uppercase tracking-widest font-medium leading-relaxed mix-blend-difference opacity-80"
            >
              {dataJson.global?.heroDescription || "Crafting production-grade AI systems and highly scalable ML infrastructure."}
            </motion.p>
          </div>

          <div className="w-full relative">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter text-black dark:text-white uppercase mix-blend-difference z-20 relative"
            >
              Vedant
            </motion.h1>
            
            {/* The 3D Element floating asymmetrically */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] pointer-events-auto z-10 hidden md:block"
            >
              <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                  <Spline scene="https://prod.spline.design/qW-O414ZgY-i5L7O/scene.splinecode" className="w-full h-full scale-[1.2]" />
                </Suspense>
              </ErrorBoundary>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex items-center gap-6"
            >
              <h1 className="font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter text-black dark:text-white uppercase italic mix-blend-difference z-20 relative pr-4">
                Kapil
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full mt-12 flex justify-between items-end border-t border-black/10 dark:border-white/10 pt-8"
          >
            <h2 className="text-xl md:text-3xl font-mono text-black dark:text-white font-light tracking-tight mix-blend-difference">
              {typingText}
              <span className="animate-pulse">_</span>
            </h2>

            <div className="flex gap-4">
              <Button label="Case Studies" href="/projects" icon={ArrowRight} />
              <Button label="Resume" href="/resume.pdf" icon={Download} variant="secondary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Quick View - Brutalist minimal */}
      <section className="relative px-6 pb-32 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl border-y border-black/10 dark:border-white/10 py-16 transition-colors duration-500"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 px-4 md:px-12">
            <div className="flex flex-col items-start gap-4">
              <span className="text-6xl md:text-7xl font-display text-black dark:text-white transition-colors tracking-tighter" ref={starsCounter.ref}>
                {starsCounter.value}+
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Total Stars</span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="text-6xl md:text-7xl font-display text-black dark:text-white transition-colors tracking-tighter" ref={repoCounter.ref}>
                {repoCounter.value}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Repositories</span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="text-6xl md:text-7xl font-display text-black dark:text-white transition-colors tracking-tighter">4+</span>
              <span className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Years Exp.</span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="text-6xl md:text-7xl font-display text-black dark:text-white transition-colors tracking-tighter">100%</span>
              <span className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Dedication</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Expertise - Minimalist Grid */}
      <section className="relative px-6 pb-32 z-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <h2 className="font-display text-6xl md:text-7xl tracking-tighter text-black dark:text-white uppercase">Core<br /><span className="italic">Expertise</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm text-sm uppercase tracking-widest leading-relaxed">
              Specialized in the full lifecycle of machine learning models, from dataset preparation to deployment at scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10">
            {typedExpertise.map((item: any, idx: number) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-[var(--bg-color)] p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500"
              >
                <div className="mb-8 p-4 bg-black/5 dark:bg-white/5 rounded-full inline-block">
                  <item.icon className="w-6 h-6 text-black dark:text-white" />
                </div>
                <h3 className="text-2xl font-display tracking-tight text-black dark:text-white mb-4">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
