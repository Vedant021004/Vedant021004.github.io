import { motion } from "framer-motion";
import { Code, Cpu, Database, Network } from "lucide-react";

const principles = [
  {
    title: "First Principles Thinking",
    description: "Breaking down complex ML architectures into fundamental truths before building up solutions.",
    icon: Brain,
  },
  {
    title: "Performance First",
    description: "Optimizing at the hardware level. GPUs are expensive; efficient code is paramount.",
    icon: Cpu,
  },
  {
    title: "Robust Infrastructure",
    description: "A model is only as good as the system serving it. Reliability and scale are built-in from day one.",
    icon: Network,
  },
];

import { Brain } from "lucide-react";

export const About = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/[0.02] via-black to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-white mb-8">
            Engineering <br /> Intelligence.
          </h1>
          <div className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed">
            <p>
              I am an AI Systems Engineer focused on bridging the gap between theoretical machine learning and robust production environments. My work revolves around training, fine-tuning, and deploying large-scale language models (LLMs) and computer vision systems.
            </p>
            <p className="mt-6">
              I believe that the future of software isn't just about writing code; it's about orchestrating intelligence. This requires a deep understanding of both distributed systems and neural architectures.
            </p>
          </div>
        </motion.div>

        <div className="space-y-24">
          <section>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-3xl text-white tracking-tight mb-12"
            >
              Core Principles
            </motion.h2>
            <div className="grid gap-8">
              {principles.map((p, idx) => (
                <motion.div 
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">{p.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
