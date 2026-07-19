import { motion } from "framer-motion";
import { ArrowRight, Brain, Code, Cpu, Download, GitBranch, Layers, Rocket, Shield, Sparkles } from "lucide-react";
import { useTyping } from "../hooks/useTyping";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { useCountUp } from "../hooks/useCountUp";
import { Button } from "../components/ui/Button";
import { TechCard } from "../components/ui/TechCard";
import { useMemo } from "react";
import dataJson from "../data.json";

const roles = [
  "AI Systems Architect",
  "Deep Learning Engineer",
  "LLM Systems Designer",
  "ML Infrastructure Lead",
  "Autonomous AI Developer",
];

const expertise = [
  { title: "Neural Networks", icon: Brain, description: "Designing architectures for optimal inference." },
  { title: "Transformers", icon: Layers, description: "Attention mechanisms and large scale models." },
  { title: "LLMs", icon: Sparkles, description: "Prompt engineering, fine-tuning, and deployment." },
  { title: "RAG Systems", icon: Rocket, description: "Retrieval-augmented generation pipelines." },
  { title: "System Design", icon: Shield, description: "Building scalable, fault-tolerant infrastructure." },
  { title: "Cloud Native", icon: Code, description: "Kubernetes, Docker, and serverless compute." },
];

export const Home = () => {
  const typingText = useTyping(roles);
  const { repos } = useGithubRepos("Vedant021004");

  const totalStars = useMemo(() => repos.reduce((sum, repo) => sum + repo.stargazers_count, 0), [repos]);
  const starsCounter = useCountUp(totalStars);
  const repoCounter = useCountUp(repos.length);

  return (
    <div className="relative">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-black to-black" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">
                Available for new opportunities
              </span>
            </div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-4"
              >
                {dataJson.global?.heroTitle || "Vedant Kapil"}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-12 md:h-16"
              >
                <h2 className="text-xl md:text-3xl text-gray-400 font-light">
                  {typingText}
                  <span className="animate-pulse text-white">|</span>
                </h2>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl text-lg text-gray-400 leading-relaxed font-light"
            >
              {dataJson.global?.heroDescription || "Crafting production-grade AI systems and highly scalable ML infrastructure. Bridging the gap between cutting-edge research and real-world deployment."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button label="View Projects" href="/projects" icon={ArrowRight} />
              <Button label="GitHub" href="https://github.com/Vedant021004" icon={GitBranch} variant="secondary" />
              <Button label="Resume" href="/resume.pdf" icon={Download} variant="secondary" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full translate-y-8" />
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <img 
                src={dataJson.global?.profileImage || "/me.png"} 
                alt={dataJson.global?.heroTitle || "Vedant Kapil"} 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Quick View */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-6xl border-y border-white/5 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-4xl font-display text-white" ref={starsCounter.ref}>
                {starsCounter.value}+
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-widest">Total Stars</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-4xl font-display text-white" ref={repoCounter.ref}>
                {repoCounter.value}
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-widest">Repositories</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-4xl font-display text-white">4+</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest">Years Exp.</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-4xl font-display text-white">100%</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest">Dedication</span>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Bento Grid */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-4xl tracking-tight text-white mb-4">Core Expertise</h2>
            <p className="text-gray-400 max-w-xl text-lg">
              Specialized in the full lifecycle of machine learning models, from dataset preparation to deployment at scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
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
