import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Cpu, Database, Wrench, HardDrive, Sparkles, CheckCircle2, ArrowDown } from "lucide-react";

interface NodeInfo {
  id: string;
  name: string;
  category: string;
  role: string;
  latency: string;
  tech: string;
  icon: any;
}

const NODES: Record<string, NodeInfo> = {
  user: {
    id: "user",
    name: "USER QUERY",
    category: "INPUT TIER",
    role: "Natural language intent and conversational task payload",
    latency: "< 1ms",
    tech: "FastAPI / Client Gateway",
    icon: User,
  },
  orchestration: {
    id: "orchestration",
    name: "ORCHESTRATION",
    category: "AGENT SUPERVISOR",
    role: "StateGraph supervisor dynamically planning steps, routing intents & invoking tools",
    latency: "12ms",
    tech: "LangGraph StateGraph / MCP",
    icon: Cpu,
  },
  retrieval: {
    id: "retrieval",
    name: "RETRIEVAL",
    category: "CONTEXT ENGINE",
    role: "Hybrid search: dense vector similarity + sparse BM25 unified via RRF & Reranker",
    latency: "28ms",
    tech: "pgvector + BM25 + BGE",
    icon: Database,
  },
  tools: {
    id: "tools",
    name: "TOOLS (MCP)",
    category: "EXECUTION LAYER",
    role: "Standardized Model Context Protocol servers for deterministic APIs, SQL & code execution",
    latency: "45ms",
    tech: "Anthropic MCP / Pydantic",
    icon: Wrench,
  },
  memory: {
    id: "memory",
    name: "MEMORY",
    category: "STATE PERSISTENCE",
    role: "PostgreSQL checkpointing for session memory, thread history, and HITL state recovery",
    latency: "8ms",
    tech: "PostgresSaver / Checkpoints",
    icon: HardDrive,
  },
  llm: {
    id: "llm",
    name: "LLM REASONING",
    category: "INFERENCE TIER",
    role: "Constrained synthesis with strict attribution grounding, citations & structured validation",
    latency: "380ms",
    tech: "Claude 3.5 / GPT-4o",
    icon: Sparkles,
  },
  response: {
    id: "response",
    name: "VERIFIED RESPONSE",
    category: "OUTPUT GATEWAY",
    role: "Guardrail verified, schema validated output with paragraph-level provenance citations",
    latency: "3ms",
    tech: "Pydantic / DeepEval Guard",
    icon: CheckCircle2,
  },
};

export const HeroArchitectureDiagram = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>("orchestration");
  const activeNode = NODES[activeNodeId] || NODES.orchestration;

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* Visual System Frame */}
      <div className="w-full max-w-xl mx-auto p-6 md:p-8 rounded-3xl bg-[#101216]/90 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#7C5CFF]/15 blur-3xl pointer-events-none rounded-full" />
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.06] text-xs font-mono-tech">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-pulse" />
            <span className="text-[#9CA3AF] tracking-wider uppercase font-semibold">AI System Pipeline</span>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <span className="text-[11px]">STATE: ACTIVE</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-[#7C5CFF] border border-[#7C5CFF]/20">
              GRAPH ROUTE
            </span>
          </div>
        </div>

        {/* Diagram Nodes Stack */}
        <div className="flex flex-col items-center gap-3 relative z-10 w-full">
          
          {/* Node 1: USER */}
          <button
            onClick={() => setActiveNodeId("user")}
            onMouseEnter={() => setActiveNodeId("user")}
            data-cursor="INSPECT"
            className={`w-full max-w-sm py-2.5 px-4 rounded-xl border text-xs font-mono-tech flex items-center justify-between transition-all duration-300 ${
              activeNodeId === "user"
                ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_20px_rgba(124,92,255,0.2)] text-white"
                : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User className={`w-3.5 h-3.5 ${activeNodeId === "user" ? "text-[#7C5CFF]" : "text-white/40"}`} />
              <span className="tracking-wider font-semibold">01 USER QUERY</span>
            </div>
            <span className="text-[10px] text-white/40 font-normal">INPUT</span>
          </button>

          {/* Flow Indicator */}
          <div className="flex items-center justify-center my-0.5">
            <ArrowDown className="w-3.5 h-3.5 text-[#7C5CFF]/60 animate-bounce" />
          </div>

          {/* Node 2: ORCHESTRATION */}
          <button
            onClick={() => setActiveNodeId("orchestration")}
            onMouseEnter={() => setActiveNodeId("orchestration")}
            data-cursor="INSPECT"
            className={`w-full max-w-sm py-3 px-4 rounded-xl border text-xs font-mono-tech flex items-center justify-between transition-all duration-300 ${
              activeNodeId === "orchestration"
                ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_25px_rgba(124,92,255,0.3)] text-white"
                : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Cpu className={`w-4 h-4 ${activeNodeId === "orchestration" ? "text-[#7C5CFF]" : "text-white/40"}`} />
              <div className="text-left">
                <div className="tracking-wider font-bold text-white">02 ORCHESTRATION</div>
                <div className="text-[10px] text-[#7C5CFF]/80">LangGraph Supervisor Node</div>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#7C5CFF]/15 text-[#7C5CFF] font-medium border border-[#7C5CFF]/30">
              CORE
            </span>
          </button>

          {/* Flow Connector Tree */}
          <div className="w-full max-w-sm flex items-center justify-center my-1 relative">
            <div className="w-[80%] h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/40 to-transparent" />
          </div>

          {/* Middle Triad: RETRIEVAL --- TOOLS --- MEMORY */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
            {/* Retrieval Node */}
            <button
              onClick={() => setActiveNodeId("retrieval")}
              onMouseEnter={() => setActiveNodeId("retrieval")}
              data-cursor="INSPECT"
              className={`p-2.5 rounded-xl border text-[11px] font-mono-tech flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 ${
                activeNodeId === "retrieval"
                  ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_20px_rgba(124,92,255,0.25)] text-white"
                  : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
              }`}
            >
              <Database className={`w-3.5 h-3.5 ${activeNodeId === "retrieval" ? "text-[#7C5CFF]" : "text-white/40"}`} />
              <span className="font-semibold tracking-wide">RETRIEVAL</span>
              <span className="text-[9px] text-white/40">pgvector + BM25</span>
            </button>

            {/* Tools Node */}
            <button
              onClick={() => setActiveNodeId("tools")}
              onMouseEnter={() => setActiveNodeId("tools")}
              data-cursor="INSPECT"
              className={`p-2.5 rounded-xl border text-[11px] font-mono-tech flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 ${
                activeNodeId === "tools"
                  ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_20px_rgba(124,92,255,0.25)] text-white"
                  : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
              }`}
            >
              <Wrench className={`w-3.5 h-3.5 ${activeNodeId === "tools" ? "text-[#7C5CFF]" : "text-white/40"}`} />
              <span className="font-semibold tracking-wide">TOOLS</span>
              <span className="text-[9px] text-[#7C5CFF]/90">MCP Protocol</span>
            </button>

            {/* Memory Node */}
            <button
              onClick={() => setActiveNodeId("memory")}
              onMouseEnter={() => setActiveNodeId("memory")}
              data-cursor="INSPECT"
              className={`p-2.5 rounded-xl border text-[11px] font-mono-tech flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 ${
                activeNodeId === "memory"
                  ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_20px_rgba(124,92,255,0.25)] text-white"
                  : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
              }`}
            >
              <HardDrive className={`w-3.5 h-3.5 ${activeNodeId === "memory" ? "text-[#7C5CFF]" : "text-white/40"}`} />
              <span className="font-semibold tracking-wide">MEMORY</span>
              <span className="text-[9px] text-white/40">Checkpoint</span>
            </button>
          </div>

          {/* Flow Connector */}
          <div className="flex items-center justify-center my-0.5">
            <ArrowDown className="w-3.5 h-3.5 text-[#7C5CFF]/60" />
          </div>

          {/* Node 4: LLM REASONING */}
          <button
            onClick={() => setActiveNodeId("llm")}
            onMouseEnter={() => setActiveNodeId("llm")}
            data-cursor="INSPECT"
            className={`w-full max-w-sm py-3 px-4 rounded-xl border text-xs font-mono-tech flex items-center justify-between transition-all duration-300 ${
              activeNodeId === "llm"
                ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_25px_rgba(124,92,255,0.3)] text-white"
                : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className={`w-4 h-4 ${activeNodeId === "llm" ? "text-[#7C5CFF]" : "text-white/40"}`} />
              <div className="text-left">
                <div className="tracking-wider font-bold text-white">04 LLM REASONING</div>
                <div className="text-[10px] text-white/40">Attributed Grounded Synthesis</div>
              </div>
            </div>
            <span className="text-[10px] text-white/50">INFERENCE</span>
          </button>

          {/* Flow Connector */}
          <div className="flex items-center justify-center my-0.5">
            <ArrowDown className="w-3.5 h-3.5 text-[#7C5CFF]/60" />
          </div>

          {/* Node 5: VERIFIED RESPONSE */}
          <button
            onClick={() => setActiveNodeId("response")}
            onMouseEnter={() => setActiveNodeId("response")}
            data-cursor="INSPECT"
            className={`w-full max-w-sm py-2.5 px-4 rounded-xl border text-xs font-mono-tech flex items-center justify-between transition-all duration-300 ${
              activeNodeId === "response"
                ? "bg-[#15171D] border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-white"
                : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${activeNodeId === "response" ? "text-emerald-400" : "text-white/40"}`} />
              <span className="tracking-wider font-semibold text-emerald-400">05 VERIFIED RESPONSE</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 font-mono-tech">CITATIONS ATTACHED</span>
          </button>

        </div>

        {/* Dynamic Telemetry Box on Node Hover/Click */}
        <div className="mt-6 pt-5 border-t border-white/[0.06]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 font-mono-tech"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-bold tracking-wider">{activeNode.name}</span>
                <span className="text-[11px] text-[#7C5CFF] bg-[#7C5CFF]/10 px-2 py-0.5 rounded border border-[#7C5CFF]/20">
                  {activeNode.tech}
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                {activeNode.role}
              </p>
              <div className="flex items-center gap-4 text-[10px] text-white/40 pt-1">
                <span>LATENCY: <strong className="text-white/70">{activeNode.latency}</strong></span>
                <span>TIER: <strong className="text-white/70">{activeNode.category}</strong></span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="text-center mt-3 text-[11px] font-mono-tech text-white/40">
        Hover or tap any architectural node to inspect data flow telemetry
      </div>
    </div>
  );
};
