import { motion } from "framer-motion";
import { ArrowRight, Brain, Code, Cpu, Download, GitBranch, Layers, Rocket, Shield, Sparkles } from "lucide-react";
import { useTyping } from "../hooks/useTyping";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { useCountUp } from "../hooks/useCountUp";
import { Button } from "../components/ui/Button";
import { TechCard } from "../components/ui/TechCard";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useMemo, Suspense, useCallback } from "react";
import Spline from '@splinetool/react-spline';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { useTheme } from "../hooks/useTheme";

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

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none transition-colors duration-500 z-0">
        <div className="absolute inset-0 bg-[var(--bg-color)] opacity-95" />
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
              },
              modes: {
                grab: { distance: 140, links: { opacity: 0.5 } },
              },
            },
            particles: {
              color: { value: theme === 'dark' ? "#6366f1" : "#4f46e5" },
              links: {
                color: theme === 'dark' ? "#6366f1" : "#4f46e5",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 0.8,
                straight: false,
              },
              number: { density: { enable: true, width: 800 }, value: 60 },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 2 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0"
        />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/[0.05] blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/[0.05] blur-[120px]" />
      </div>

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden z-10">
        <div className="mx-auto w-full max-w-6xl flex flex-col-reverse lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-start gap-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-black/10 dark:border-white/10 glass px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wide uppercase">
                Available for new opportunities
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-black dark:text-white transition-colors duration-500 drop-shadow-sm"
              >
                {dataJson.global?.heroTitle || "Vedant Kapil"}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-12 md:h-16 mt-2"
              >
                <h2 className="text-xl md:text-3xl font-mono text-indigo-600 dark:text-indigo-400 font-light transition-colors duration-500">
                  {typingText}
                  <span className="animate-pulse text-indigo-500">|</span>
                </h2>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light transition-colors duration-500"
            >
              {dataJson.global?.heroDescription || "Crafting production-grade AI systems and highly scalable ML infrastructure. Bridging the gap between cutting-edge research and real-world deployment."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button label="View Case Studies" href="/projects" icon={ArrowRight} />
              <Button label="GitHub" href="https://github.com/Vedant021004" icon={GitBranch} variant="secondary" />
              <Button label="Resume" href="/resume.pdf" icon={Download} variant="secondary" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-auto overflow-visible">
              <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full translate-y-12 transition-colors duration-500" />
              <Suspense fallback={<div className="w-full h-full animate-pulse bg-black/5 dark:bg-white/5 rounded-full" />}>
                <Spline scene="https://prod.spline.design/qW-O414ZgY-i5L7O/scene.splinecode" className="w-full h-full drop-shadow-2xl z-20 scale-[1.2]" />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Quick View */}
      <section className="relative px-6 pb-32 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl border border-black/10 dark:border-white/5 py-12 transition-colors duration-500 glass rounded-3xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-4xl font-display text-black dark:text-white transition-colors" ref={starsCounter.ref}>
                {starsCounter.value}+
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">Total Stars</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-4xl font-display text-black dark:text-white transition-colors" ref={repoCounter.ref}>
                {repoCounter.value}
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">Repositories</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-4xl font-display text-black dark:text-white transition-colors">4+</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">Years Exp.</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-4xl font-display text-black dark:text-white transition-colors">100%</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">Dedication</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Expertise Bento Grid */}
      <section className="relative px-6 pb-32 z-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-black dark:text-white mb-4 transition-colors">Core Expertise</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg transition-colors">
              Specialized in the full lifecycle of machine learning models, from dataset preparation to deployment at scale. Building systems that reason, retrieve, and execute autonomously.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {typedExpertise.map((item: any, idx: number) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <TechCard {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
