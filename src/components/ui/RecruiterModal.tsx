import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, FileText, Mail, CheckCircle2, ArrowUpRight, Terminal, Sparkles, MapPin } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterModal = ({ isOpen, onClose }: RecruiterModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        
        {/* Background Click dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[#101216] border border-[#7C5CFF]/40 w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(124,92,255,0.25)] z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top Bar */}
          <div className="p-6 bg-[#15171D] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-[#7C5CFF]/20 text-[#7C5CFF]">
                <Zap className="w-4 h-4 fill-[#7C5CFF]" />
              </span>
              <div>
                <h3 className="text-sm font-mono-tech font-bold text-white tracking-wider">
                  20-SECOND RECRUITER EXECUTIVE SUMMARY
                </h3>
                <p className="text-[11px] font-mono-tech text-[#9CA3AF]">
                  Everything you need to evaluate Vedant Kapil in under 20 seconds
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#08090B] hover:bg-white/[0.1] text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* High-Density Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 font-mono-tech">
            
            {/* Identity & Target Role */}
            <div className="p-4 rounded-2xl bg-[#08090B] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#7C5CFF] font-bold">CANDIDATE</div>
                <h4 className="text-2xl font-black text-white font-sans">VEDANT KAPIL</h4>
                <div className="text-xs text-emerald-400 font-bold mt-0.5">TARGET ROLE: AI / GENAI ENGINEER</div>
              </div>

              <div className="text-right sm:text-right text-xs text-[#9CA3AF] space-y-1">
                <div className="flex items-center sm:justify-end gap-1.5 text-white/80">
                  <MapPin className="w-3.5 h-3.5 text-[#7C5CFF]" />
                  <span>Mumbai · Navi Mumbai · Remote</span>
                </div>
                <div className="text-[11px] text-emerald-400">● Open for Immediate Internships</div>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>01 CORE SPECIALIZATIONS</span>
                <span className="text-[11px] text-[#7C5CFF]">ENGINEERING STACK</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Python", "LLMs", "RAG", "LangGraph", "Model Context Protocol (MCP)", "pgvector", "FastAPI", "Docker", "PyTorch", "BM25 Hybrid Search"].map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs rounded-md bg-[#15171D] border border-white/[0.08] text-white font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Flagship Systems */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>02 FLAGSHIP SYSTEMS BUILT</span>
                <span className="text-[11px] text-[#7C5CFF]">VERIFIED ARCHITECTURES</span>
              </div>
              
              <div className="space-y-2 text-xs">
                
                <div className="p-3 rounded-xl bg-[#15171D] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Enterprise Hybrid RAG Platform</div>
                    <div className="text-[11px] text-[#9CA3AF] font-sans">
                      pgvector + BM25 + Reciprocal Rank Fusion + Cross-Encoder Reranking
                    </div>
                  </div>
                  <a
                    href="https://github.com/Vedant021004/GEN-AI--Langchain-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C5CFF] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Code</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#15171D] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Agentic AI Operations Platform</div>
                    <div className="text-[11px] text-[#9CA3AF] font-sans">
                      LangGraph Supervisor + MCP Tool Server + Postgres Checkpointing + HITL
                    </div>
                  </div>
                  <a
                    href="https://github.com/Vedant021004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C5CFF] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Architecture</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#15171D] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Live PDF Document QA Chatbot</div>
                    <div className="text-[11px] text-[#9CA3AF] font-sans">
                      Real-time LangChain document retrieval with Streamlit UI
                    </div>
                  </div>
                  <a
                    href="https://genniacqcxj6xbjrk9niak.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Live App</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>

            {/* Achievement Validation */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-bold text-white">CODEWAR 24H HACKATHON: 5TH RANK</span>
              </div>
              <span className="text-amber-400 text-[11px]">Validated Execution</span>
            </div>

            {/* 1-Click Action Buttons */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#7C5CFF] hover:bg-[#9074FF] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,92,255,0.3)] text-center"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </a>

              <a
                href="https://github.com/Vedant021004"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#15171D] hover:bg-white/[0.1] text-white border border-white/[0.1] text-xs flex items-center justify-center gap-2 transition-all text-center"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/vedant021004"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#15171D] hover:bg-white/[0.1] text-white border border-white/[0.1] text-xs flex items-center justify-center gap-2 transition-all text-center"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#7C5CFF]" />
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:vedantkp79@gmail.com"
                className="p-3 rounded-xl bg-[#15171D] hover:bg-white/[0.1] text-white border border-white/[0.1] text-xs flex items-center justify-center gap-2 transition-all text-center"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email</span>
              </a>

            </div>

          </div>

          {/* Footer note */}
          <div className="p-4 bg-[#08090B] border-t border-white/[0.06] text-center text-[10px] font-mono-tech text-white/40">
            Press ESC or click outside to return to portfolio
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
