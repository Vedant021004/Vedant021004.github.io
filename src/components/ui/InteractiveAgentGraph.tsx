import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Bot, Database, Search, Terminal, Wrench, ShieldAlert, CheckCircle2, ArrowDown, ArrowRight, CornerDownRight, RefreshCw, Key } from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  type: string;
  description: string;
  stateKeys: string[];
  routingCondition: string;
  tradeoff: string;
  icon: any;
}

const AGENT_NODES: Record<string, AgentNode> = {
  supervisor: {
    id: "supervisor",
    name: "LANGGRAPH SUPERVISOR",
    type: "Orchestration Root",
    description: "Evaluates current global StateGraph. Decides whether to route to a specialized worker agent or synthesize the final answer if all sub-tasks are marked DONE.",
    stateKeys: ["messages", "current_agent", "plan_steps", "completed_steps"],
    routingCondition: "Routes via conditional edges based on JSON output: next_agent ∈ ['research', 'rag', 'sql', 'tool', 'FINISH']",
    tradeoff: "Supervisor adds one LLM turn latency (~350ms) per step, but prevents sub-agents from going down hallucinated rabbit holes.",
    icon: Cpu,
  },
  research: {
    id: "research",
    name: "RESEARCH AGENT",
    type: "Information Synthesis Worker",
    description: "Specialized worker equipped with web search and documentation parsers. Summarizes external findings into structured bullets.",
    stateKeys: ["research_queries", "synthesized_notes"],
    routingCondition: "Invoked when problem context requires real-time facts or external package documentation.",
    tradeoff: "Constrained to read-only tools to guarantee zero state mutation risk.",
    icon: Search,
  },
  rag: {
    id: "rag",
    name: "RAG AGENT",
    type: "Contextual Knowledge Worker",
    description: "Performs dense semantic vector search and sparse BM25 retrieval against internal enterprise documentation with reciprocal rank fusion.",
    stateKeys: ["retrieved_chunks", "citation_ids"],
    routingCondition: "Triggered whenever queries reference private files, past logs, or internal repositories.",
    tradeoff: "Passes only top 5 deduplicated chunks back to supervisor to avoid context bloat.",
    icon: Database,
  },
  sql: {
    id: "sql",
    name: "SQL AGENT",
    type: "Deterministic Data Worker",
    description: "Translates natural language questions into safe SQL queries, validates syntax against schema dialect, and executes read queries.",
    stateKeys: ["generated_sql", "query_results", "sql_error"],
    routingCondition: "Triggered for aggregations, metric questions, and tabular database lookups.",
    tradeoff: "Hard-constrained to SELECT queries with EXPLAIN limits to prevent slow full-table scans.",
    icon: Terminal,
  },
  tool: {
    id: "tool",
    name: "MCP TOOL AGENT",
    type: "Protocol Execution Worker",
    description: "Interfaces with Model Context Protocol (MCP) servers. Dispatches standardized function calls to external third-party APIs.",
    stateKeys: ["tool_call_id", "tool_payload", "tool_response"],
    routingCondition: "Dispatched when an action requires external system communication or computation.",
    tradeoff: "Strict Pydantic payload verification before executing network RPC.",
    icon: Wrench,
  },
  checkpoint: {
    id: "checkpoint",
    name: "POSTGRES CHECKPOINTER",
    type: "State Persistence",
    description: "Persists the complete StateGraph snapshot to PostgreSQL after every transition. Enables session recovery, time travel, and async resumption.",
    stateKeys: ["thread_id", "checkpoint_id", "parent_id", "state_bytes"],
    routingCondition: "Executes automatically on every graph edge traversal.",
    tradeoff: "Slight database I/O overhead on state save, but guarantees 100% fault-tolerant graph recovery.",
    icon: RefreshCw,
  },
  hitl: {
    id: "hitl",
    name: "HUMAN-IN-THE-LOOP (HITL)",
    type: "Safety Governance Gate",
    description: "Interrupts graph execution when high-stakes write operations are detected. Awaits manual confirmation via UI/Slack before resuming.",
    stateKeys: ["requires_approval", "action_summary", "approver_id"],
    routingCondition: "Triggered if action_type in ['DB_WRITE', 'PAYMENT', 'SEND_EMAIL', 'DELETE'].",
    tradeoff: "Pauses synchronous execution in exchange for zero unauthorized catastrophic operations.",
    icon: ShieldAlert,
  },
  verification: {
    id: "verification",
    name: "VERIFICATION & GUARDRAILS",
    type: "Output Quality Gate",
    description: "Final verification node asserting that all citations are valid, schema matches requested format, and no sensitive PII was leaked.",
    stateKeys: ["validation_passed", "guardrail_violations"],
    routingCondition: "Supervisor routes to verification before emitting final response to client.",
    tradeoff: "Rejection triggers an internal correction cycle instead of delivering erroneous outputs to the user.",
    icon: CheckCircle2,
  },
};

export const InteractiveAgentGraph = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("supervisor");
  const active = AGENT_NODES[selectedNodeId] || AGENT_NODES.supervisor;
  const ActiveIcon = active.icon;

  return (
    <div className="w-full bg-[#101216] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" />
          <h4 className="text-sm font-mono-tech font-bold uppercase tracking-wider text-white">
            LANGGRAPH MULTI-AGENT SUPERVISOR GRAPH
          </h4>
        </div>
        <span className="text-xs font-mono-tech text-white/40">
          Click any agent node to inspect state keys & routing logic
        </span>
      </div>

      {/* Visual Graph Layout */}
      <div className="flex flex-col items-center gap-3">
        
        {/* Supervisor Card */}
        <button
          onClick={() => setSelectedNodeId("supervisor")}
          data-cursor="INSPECT"
          className={`w-full max-w-md p-4 rounded-xl border font-mono-tech flex items-center justify-between transition-all duration-200 ${
            selectedNodeId === "supervisor"
              ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_25px_rgba(124,92,255,0.3)] text-white"
              : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-[#7C5CFF]" />
            <div className="text-left">
              <div className="text-xs font-bold text-white tracking-wider">LANGGRAPH SUPERVISOR</div>
              <div className="text-[10px] text-[#7C5CFF]">Central Intent Routing & StateGraph Controller</div>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#7C5CFF]/15 text-[#7C5CFF] font-medium border border-[#7C5CFF]/30">
            ROOT NODE
          </span>
        </button>

        {/* Dynamic Branching Connector */}
        <div className="w-full max-w-2xl flex items-center justify-center my-0.5">
          <ArrowDown className="w-4 h-4 text-[#7C5CFF]/60" />
        </div>

        {/* 4 Specialized Sub-Agents Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 w-full max-w-3xl">
          {[
            { id: "research", label: "RESEARCH AGENT", sub: "Web & Docs", icon: Search },
            { id: "rag", label: "RAG AGENT", sub: "Internal Knowledge", icon: Database },
            { id: "sql", label: "SQL AGENT", sub: "Deterministic SQL", icon: Terminal },
            { id: "tool", label: "MCP TOOL AGENT", sub: "Anthropic MCP", icon: Wrench },
          ].map((sub) => {
            const isSubSelected = selectedNodeId === sub.id;
            const Icon = sub.icon;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedNodeId(sub.id)}
                data-cursor="INSPECT"
                className={`p-3 rounded-xl border text-left font-mono-tech flex flex-col justify-between h-24 transition-all duration-200 ${
                  isSubSelected
                    ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_20px_rgba(124,92,255,0.25)] text-white"
                    : "bg-[#08090B]/60 border-white/[0.08] text-[#9CA3AF] hover:border-white/20 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-3.5 h-3.5 ${isSubSelected ? "text-[#7C5CFF]" : "text-white/30"}`} />
                  <span className="text-[9px] text-[#7C5CFF] font-semibold">WORKER</span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">{sub.label}</div>
                  <div className="text-[9px] text-white/40">{sub.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Lower Connector */}
        <div className="w-full max-w-2xl flex items-center justify-center my-0.5">
          <ArrowDown className="w-4 h-4 text-[#7C5CFF]/60" />
        </div>

        {/* Safety & Persistence Tier (Checkpoint & HITL) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
          
          <button
            onClick={() => setSelectedNodeId("checkpoint")}
            data-cursor="INSPECT"
            className={`p-3 rounded-xl border font-mono-tech flex items-center justify-between transition-all duration-200 ${
              selectedNodeId === "checkpoint"
                ? "bg-[#15171D] border-[#7C5CFF] shadow-[0_0_20px_rgba(124,92,255,0.25)] text-white"
                : "bg-[#08090B]/60 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-[#7C5CFF]" />
              <div className="text-left">
                <div className="text-xs font-bold text-white">POSTGRES CHECKPOINT</div>
                <div className="text-[9px] text-white/40">State Persistence & Replay</div>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.05] text-white/50">RESILIENT</span>
          </button>

          <button
            onClick={() => setSelectedNodeId("hitl")}
            data-cursor="INSPECT"
            className={`p-3 rounded-xl border font-mono-tech flex items-center justify-between transition-all duration-200 ${
              selectedNodeId === "hitl"
                ? "bg-[#15171D] border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)] text-white"
                : "bg-[#08090B]/60 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="text-xs font-bold text-white">HITL SAFETY GATE</div>
                <div className="text-[9px] text-amber-400/80">Human-in-the-Loop Intercept</div>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              GOVERNANCE
            </span>
          </button>

        </div>

        {/* Final Connector */}
        <div className="w-full max-w-2xl flex items-center justify-center my-0.5">
          <ArrowDown className="w-4 h-4 text-[#7C5CFF]/60" />
        </div>

        {/* Verification Node */}
        <button
          onClick={() => setSelectedNodeId("verification")}
          data-cursor="INSPECT"
          className={`w-full max-w-md p-3 rounded-xl border font-mono-tech flex items-center justify-between transition-all duration-200 ${
            selectedNodeId === "verification"
              ? "bg-[#15171D] border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-white"
              : "bg-[#08090B]/80 border-white/[0.08] text-[#9CA3AF] hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-xs font-bold text-emerald-400">07 VERIFICATION & GUARDRAILS</div>
              <div className="text-[9px] text-white/40">Citation Validation & Constraint Checking</div>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono-tech">OUTPUT READY</span>
        </button>

      </div>

      {/* Inspector Details Panel */}
      <div className="bg-[#15171D] border border-white/[0.1] rounded-xl p-5 md:p-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#7C5CFF]/15 text-[#7C5CFF] border border-[#7C5CFF]/30">
                  <ActiveIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm sm:text-base font-bold text-white font-mono-tech">
                    {active.name}
                  </h5>
                  <span className="text-xs text-[#9CA3AF] font-mono-tech">{active.type}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#F5F5F5] font-sans leading-relaxed">
              {active.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-tech pt-2">
              <div className="p-3.5 rounded-lg bg-[#08090B]/60 border border-white/[0.06] space-y-1.5">
                <span className="text-[#7C5CFF] font-bold block uppercase tracking-wider text-[11px]">
                  STATE KEYS MUTATED / ACCESSED
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {active.stateKeys.map((k) => (
                    <span key={k} className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-white/80 text-[10px]">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#08090B]/60 border border-white/[0.06] space-y-1.5">
                <span className="text-white font-bold block uppercase tracking-wider text-[11px]">
                  CONDITIONAL ROUTING LOGIC
                </span>
                <p className="text-[#9CA3AF] text-[11px] leading-relaxed">
                  {active.routingCondition}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#08090B]/60 border border-amber-500/20 text-xs font-mono-tech">
              <span className="text-amber-400 font-bold block uppercase tracking-wider text-[11px] mb-1">
                ENGINEERING TRADEOFF & SAFETY CONSTRAINT
              </span>
              <p className="text-[#9CA3AF] text-[11px] leading-relaxed font-sans">
                {active.tradeoff}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
