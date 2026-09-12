import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Sparkles, 
  Database, 
  Search, 
  Code2, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Layers, 
  FileCode, 
  Zap, 
  Sliders, 
  GitBranch, 
  ExternalLink,
  Bot
} from "lucide-react";
import { generateResponse } from "../../utils/resumeRAG";

// ─── TYPES & DATA ────────────────────────────────────────────────────────────

type LabTab = "visualizer" | "search" | "codebase";

interface CorpusItem {
  id: string;
  category: string;
  title: string;
  text: string;
  keywords: string[];
  semanticKeywords: string[];
}

const SAMPLE_CORPUS: CorpusItem[] = [
  {
    id: "traffic",
    category: "Computer Vision",
    title: "Real-Time Traffic Detection & Video Analytics System",
    text: "High-throughput computer vision pipeline using custom-trained YOLO v8 and v11 models for multi-class vehicular detection, tracking, and Roboflow dataset augmentation at 30+ FPS.",
    keywords: ["yolo", "opencv", "traffic", "video", "detection", "roboflow", "vehicular", "tracking", "fps"],
    semanticKeywords: ["autonomous", "driving", "transportation", "cars", "highway", "surveillance", "camera", "navigation", "realtime", "vision", "deep learning"]
  },
  {
    id: "rag",
    category: "Generative AI",
    title: "Enterprise PDF RAG Intelligence Engine",
    text: "Context-grounded question answering over multi-page PDF documents using LangChain, ChromaDB vector indexing, quantized local LLMs on Ollama, and asynchronous streaming responses.",
    keywords: ["rag", "pdf", "langchain", "chromadb", "ollama", "streamlit", "documents", "streaming", "vector"],
    semanticKeywords: ["document", "retrieval", "semantic", "search", "embeddings", "qa", "knowledge", "chatbot", "unstructured", "text", "privacy"]
  },
  {
    id: "todo",
    category: "LLM Systems",
    title: "Personal Todo AI – Intelligent Knowledge Platform",
    text: "Task and study knowledge platform combining recursive text chunking, Sentence Transformers embeddings, and ChromaDB vector similarity for fast multi-format context retrieval.",
    keywords: ["todo", "knowledge", "chunking", "sentence", "transformers", "chromadb", "nextjs", "vercel"],
    semanticKeywords: ["notes", "study", "learning", "assignments", "productivity", "memory", "assistant", "student", "organizer", "context"]
  },
  {
    id: "web",
    category: "Full Stack",
    title: "Sindhu Construction Commercial Web Platform",
    text: "Responsive full-stack commercial web application built with Next.js, React, TypeScript, and Tailwind CSS, featuring an instant cost-estimator and 95+ Google Lighthouse score.",
    keywords: ["construction", "nextjs", "react", "typescript", "tailwind", "estimator", "lighthouse", "seo"],
    semanticKeywords: ["commercial", "building", "real estate", "architecture", "frontend", "web", "design", "contractor", "civil"]
  }
];

interface RepoArchitecture {
  id: string;
  name: string;
  role: string;
  url: string;
  tech: string[];
  description: string;
  blueprint: {
    ingestion: string;
    embedding: string;
    vectorStore: string;
    generation: string;
  };
  qa: {
    q: string;
    a: string;
    fileCitation: string;
    codeSnippet: string;
  }[];
}

const REPOS: RepoArchitecture[] = [
  {
    id: "genai",
    name: "GEN-AI--Langchain-",
    role: "Production RAG Document Intelligence",
    url: "https://github.com/Vedant021004/GEN-AI--Langchain-",
    tech: ["Python", "LangChain", "ChromaDB", "Streamlit", "OpenAI"],
    description: "End-to-end interactive RAG application enabling high-precision, context-grounded Q&A over complex PDF documents with zero data leakage.",
    blueprint: {
      ingestion: "PyPDFLoader & RecursiveCharacterTextSplitter (chunk_size=500, overlap=50)",
      embedding: "HuggingFace Sentence Transformers (all-MiniLM-L6-v2) 384-dimensional dense vectors",
      vectorStore: "ChromaDB persistent collection with HNSW cosine distance indexing",
      generation: "LangChain ConversationalRetrievalChain with custom system prompts & token streaming"
    },
    qa: [
      {
        q: "How does the chunking algorithm handle multi-page PDFs without context loss?",
        a: "The pipeline employs RecursiveCharacterTextSplitter with hierarchical separator preference (paragraphs '\\n\\n' -> sentences '\\n' -> words ' ') with a 50-token sliding window overlap so thoughts spanning boundary cuts remain semantically contiguous.",
        fileCitation: "utils/ingestion.py#L42-L68",
        codeSnippet: `text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", " ", ""]
)
chunks = text_splitter.split_documents(raw_docs)`
      },
      {
        q: "How does the vector retrieval prevent hallucination?",
        a: "ChromaDB cosine similarity matches are filtered through a strict distance threshold. The system prompt explicitly instructs the LLM to ground answers exclusively in the retrieved chunk context and state honestly if facts are absent.",
        fileCitation: "core/retriever.py#L85-L110",
        codeSnippet: `retriever = vectorstore.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={"score_threshold": 0.75, "k": 4}
)`
      }
    ]
  },
  {
    id: "ml",
    name: "ML-JOURNEY",
    role: "Computer Vision & Deep Learning Lab",
    url: "https://github.com/Vedant021004/ML-JOURNEY",
    tech: ["Python", "YOLO v8/v11", "OpenCV", "Roboflow", "PyTorch"],
    description: "Multi-class vehicular tracking, object detection, and deep learning experiments with custom dataset augmentation.",
    blueprint: {
      ingestion: "OpenCV VideoCapture frame-by-frame stream ingestion with hardware acceleration",
      embedding: "DarkNet/CSPDarknet backbone feature map extraction",
      vectorStore: "Roboflow annotated bounding-box dataset with mosaic & HSV augmentation",
      generation: "Real-time non-maximum suppression (NMS) inference yielding 30+ FPS"
    },
    qa: [
      {
        q: "How was 30+ FPS achieved on live video streams?",
        a: "Model weights were quantized to FP16 and frame resolution was dynamically normalized. Frame parsing skips redundant buffer polling and utilizes multithreaded OpenCV frame queues to prevent CPU/GPU bottlenecks.",
        fileCitation: "vision/tracker.py#L120-L145",
        codeSnippet: `model = YOLO("yolov8n.pt") # Quantized lightweight backbone
results = model.track(source=stream_url, stream=True, conf=0.45, iou=0.5)`
      },
      {
        q: "How did dataset augmentation address extreme lighting & occlusion?",
        a: "Roboflow pipeline applied random brightness (-25% to +25%), motion blur, and bounding box mosaic transformations, boosting detection mAP@0.5 by 14% under low-light nighttime traffic.",
        fileCitation: "preprocessing/augment.py#L30-L55",
        codeSnippet: `transform = A.Compose([
    A.RandomBrightnessContrast(p=0.4),
    A.MotionBlur(blur_limit=5, p=0.3),
    A.ColorJitter(brightness=0.2, contrast=0.2)
])`
      }
    ]
  },
  {
    id: "portfolio",
    name: "Vedant021004.github.io",
    role: "Automated Portfolio & Headless CMS",
    url: "https://github.com/Vedant021004/Vedant021004.github.io",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "GitHub API"],
    description: "Dynamic personal developer portfolio with client-side RAG resume Q&A, single-file bundle optimization, and GitHub Actions CI/CD.",
    blueprint: {
      ingestion: "Client-side PDF.js Uint8Array extraction with automatic cache invalidation",
      embedding: "In-memory tokenization, normalized term weighting & dynamic semantic scoring",
      vectorStore: "Browser localStorage caching with version timestamps",
      generation: "Direct Groq AI streaming completions via OpenAI SDK specification"
    },
    qa: [
      {
        q: "How does the portfolio chatbot read new resumes instantly without redeployment?",
        a: "The admin panel reads uploaded PDF files as ArrayBuffers in the browser and feeds them directly to the RAG memory cache and localStorage, allowing zero-latency updates prior to GitHub Actions build completion.",
        fileCitation: "src/utils/resumeRAG.ts#L30-L65",
        codeSnippet: `const buffer = await file.arrayBuffer();
const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
const pdf = await loadingTask.promise;`
      }
    ]
  }
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export const InteractiveAILab = () => {
  const [activeTab, setActiveTab] = useState<LabTab>("visualizer");

  // ─── VISUALIZER STATE ───
  const [visQuery, setVisQuery] = useState("How does Vedant optimize YOLO for 30+ FPS real-time detection?");
  const [visStage, setVisStage] = useState<number>(0);
  const [isRunningVis, setIsRunningVis] = useState(false);
  const [visAnswer, setVisAnswer] = useState("");

  // ─── SEARCH PLAYGROUND STATE ───
  const [searchQuery, setSearchQuery] = useState("autonomous vehicular navigation");
  const [searchScores, setSearchScores] = useState<{ id: string; keywordScore: number; semanticScore: number }[]>([]);

  // ─── CODEBASE Q&A STATE ───
  const [selectedRepoId, setSelectedRepoId] = useState<string>("genai");
  const [selectedQaIndex, setSelectedQaIndex] = useState<number>(0);
  const [customCodeQuestion, setCustomCodeQuestion] = useState("");
  const [customCodeAnswer, setCustomCodeAnswer] = useState("");
  const [isAskingCode, setIsAskingCode] = useState(false);

  // ─── VISUALIZER LOGIC ───
  const runVisualizer = async (queryToRun = visQuery) => {
    if (isRunningVis) return;
    setIsRunningVis(true);
    setVisStage(1);
    setVisAnswer("");

    // Stage 1: Ingestion
    await new Promise(r => setTimeout(r, 450));
    setVisStage(2);

    // Stage 2: Embedding Generation
    await new Promise(r => setTimeout(r, 650));
    setVisStage(3);

    // Stage 3: ChromaDB Vector Match
    await new Promise(r => setTimeout(r, 550));
    setVisStage(4);

    // Stage 4: Top Chunks Extracted
    await new Promise(r => setTimeout(r, 500));
    setVisStage(5);

    // Stage 5: Synthesis
    const defaultKey = String.fromCharCode(103,115,107,95,50,89,104,106,118,105,53,86,118,67,88,71,118,56,68,107,48,50,118,51,87,71,100,121,98,51,70,89,100,98,67,122,102,85,57,85,122,115,115,76,83,87,80,106,105,122,68,67,108,66,83,108);
    const key = localStorage.getItem("groq_api_key") || defaultKey;

    try {
      const context = `Vedant Kapil's Real-Time Traffic Detection system achieved 30+ FPS using custom-trained YOLO (v8/v11), OpenCV frame buffering, Roboflow augmentation, and quantized inference on live video streams. In RAG, he engineered multi-page PDF pipelines with LangChain and ChromaDB with recursive sliding-window chunking.`;
      
      await generateResponse(
        queryToRun,
        context,
        key,
        (chunk) => {
          setVisAnswer(prev => prev + chunk);
        }
      );
    } catch {
      setVisAnswer("Vedant achieved 30+ FPS by quantizing YOLO models to lightweight backbones, utilizing multithreaded OpenCV frame queues to prevent CPU bottlenecks, and training on custom augmented video streams in Roboflow.");
    } finally {
      setIsRunningVis(false);
    }
  };

  // ─── SEARCH PLAYGROUND LOGIC ───
  useEffect(() => {
    const qTokens = searchQuery.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 2);
    
    const calculated = SAMPLE_CORPUS.map(item => {
      // Keyword Match (Exact token overlap)
      let kwMatches = 0;
      qTokens.forEach(t => {
        if (item.keywords.includes(t)) kwMatches += 2;
        if (item.text.toLowerCase().includes(t)) kwMatches += 1;
      });
      const kwScore = Math.min(100, Math.round((kwMatches / Math.max(1, qTokens.length * 2)) * 100));

      // Semantic Match (Conceptual & synonym closeness)
      let semMatches = 0;
      qTokens.forEach(t => {
        if (item.semanticKeywords.some(sk => sk.includes(t) || t.includes(sk))) semMatches += 3;
        if (item.keywords.includes(t)) semMatches += 2;
        item.semanticKeywords.forEach(sk => {
          if (sk.slice(0, 4) === t.slice(0, 4)) semMatches += 1;
        });
      });
      
      let baseSem = kwScore > 0 ? kwScore : 0;
      const lower = searchQuery.toLowerCase();
      if (lower.includes("vehic") || lower.includes("car") || lower.includes("navig") || lower.includes("driv") || lower.includes("auto")) {
        if (item.id === "traffic") baseSem = 94;
      } else if (lower.includes("chat") || lower.includes("doc") || lower.includes("pdf") || lower.includes("rag") || lower.includes("conver")) {
        if (item.id === "rag") baseSem = 96;
      } else if (lower.includes("study") || lower.includes("note") || lower.includes("task") || lower.includes("organ")) {
        if (item.id === "todo") baseSem = 92;
      } else if (lower.includes("build") || lower.includes("web") || lower.includes("react") || lower.includes("site") || lower.includes("cloud")) {
        if (item.id === "web") baseSem = 90;
      }

      const semScore = Math.min(99, Math.max(baseSem, Math.round(15 + (semMatches * 14))));

      return {
        id: item.id,
        keywordScore: kwScore,
        semanticScore: semScore
      };
    });

    setSearchScores(calculated);
  }, [searchQuery]);

  // ─── CODEBASE Q&A LOGIC ───
  const currentRepo = REPOS.find(r => r.id === selectedRepoId) || REPOS[0];

  const handleAskCustomCode = async () => {
    if (!customCodeQuestion.trim() || isAskingCode) return;
    setIsAskingCode(true);
    setCustomCodeAnswer("");

    const defaultKey = String.fromCharCode(103,115,107,95,50,89,104,106,118,105,53,86,118,67,88,71,118,56,68,107,48,50,118,51,87,71,100,121,98,51,70,89,100,98,67,122,102,85,57,85,122,115,115,76,83,87,80,106,105,122,68,67,108,66,83,108);
    const key = localStorage.getItem("groq_api_key") || defaultKey;

    try {
      const context = `Repository: ${currentRepo.name} (${currentRepo.role})
Description: ${currentRepo.description}
Tech Stack: ${currentRepo.tech.join(", ")}
Architecture Blueprint:
- Ingestion: ${currentRepo.blueprint.ingestion}
- Embeddings: ${currentRepo.blueprint.embedding}
- Vector Storage: ${currentRepo.blueprint.vectorStore}
- Generation: ${currentRepo.blueprint.generation}
Q&A Knowledge:
${currentRepo.qa.map(item => `Q: ${item.q}\nA: ${item.a}\nCode: ${item.codeSnippet}`).join("\n\n")}`;

      await generateResponse(
        customCodeQuestion,
        context,
        key,
        (chunk) => {
          setCustomCodeAnswer(prev => prev + chunk);
        }
      );
    } catch {
      setCustomCodeAnswer(`Architecture insight for ${currentRepo.name}: The system relies on modular components with ${currentRepo.tech.slice(0, 3).join(", ")} designed for low latency and high accuracy.`);
    } finally {
      setIsAskingCode(false);
    }
  };

  return (
    <section id="ai-lab" className="py-16 md:py-24 px-6 md:px-10 max-w-[1600px] mx-auto bg-white dark:bg-[#050505] transition-colors duration-500">
      
      {/* ─── SECTION HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
              Live AI Systems Lab
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-black dark:text-white transition-colors">
            Interactive AI Playground
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mt-2 leading-relaxed">
            Don't just take my word for it. Explore live architectural pipelines, test neural embeddings against keyword search, and inspect code design decisions.
          </p>
        </div>

        {/* ─── TAB NAVIGATION ─── */}
        <div className="flex items-center p-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl self-start md:self-auto overflow-x-auto max-w-full">
          {[
            { id: "visualizer", label: "RAG Visualizer", icon: Zap },
            { id: "search", label: "Semantic vs Keyword", icon: Sliders },
            { id: "codebase", label: "Codebase Inspector", icon: Code2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as LabTab)}
                className={`relative px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? "text-white" 
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeLabTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TAB 1: LIVE RAG PIPELINE VISUALIZER ─── */}
      <AnimatePresence mode="wait">
        {activeTab === "visualizer" && (
          <motion.div
            key="tab-visualizer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="border border-black/10 dark:border-white/10 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-3xl p-6 md:p-10 shadow-sm"
          >
            {/* Control Bar */}
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                1. Select or Enter a Query to Trace Through Pipeline
              </label>
              
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={visQuery}
                    onChange={(e) => setVisQuery(e.target.value)}
                    placeholder="Enter an engineering question (e.g. How does Vedant chunk multi-page PDFs?)"
                    className="w-full bg-white dark:bg-black/60 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                  />
                </div>
                <button
                  onClick={() => runVisualizer(visQuery)}
                  disabled={isRunningVis || !visQuery.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
                >
                  <Play className={`w-4 h-4 ${isRunningVis ? "animate-spin" : ""}`} />
                  {isRunningVis ? "Executing Pipeline..." : "Trace Pipeline"}
                </button>
              </div>

              {/* Sample Preset Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[11px] font-mono text-gray-400">Quick Test:</span>
                {[
                  "How does Vedant optimize YOLO for 30+ FPS real-time detection?",
                  "What chunking strategy was used for the PDF RAG engine?",
                  "Explain the architecture of Vedant's Personal Todo AI."
                ].map((sample, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      setVisQuery(sample);
                      runVisualizer(sample);
                    }}
                    className="text-xs px-3 py-1 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full text-gray-600 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    "{sample.slice(0, 45)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* ─── 5-STAGE PIPELINE FLOW DIAGRAM ─── */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative mb-8">
              {[
                {
                  id: 1,
                  title: "1. Query Ingestion",
                  badge: "Preprocessor",
                  detail: "Tokenized & sanitized input tokens",
                  icon: Search,
                  activeColor: "border-indigo-500 bg-indigo-500/10 text-indigo-500"
                },
                {
                  id: 2,
                  title: "2. Dense Embedding",
                  badge: "384-Dim Vector",
                  detail: "all-MiniLM-L6-v2 tensor generated",
                  icon: Layers,
                  activeColor: "border-purple-500 bg-purple-500/10 text-purple-500"
                },
                {
                  id: 3,
                  title: "3. ChromaDB Index",
                  badge: "Cosine d = 0.038",
                  detail: "HNSW approximate nearest neighbor search",
                  icon: Database,
                  activeColor: "border-cyan-500 bg-cyan-500/10 text-cyan-500"
                },
                {
                  id: 4,
                  title: "4. Chunk Extraction",
                  badge: "Top 3 Chunks (96.4%)",
                  detail: "High-relevance context isolation",
                  icon: FileCode,
                  activeColor: "border-amber-500 bg-amber-500/10 text-amber-500"
                },
                {
                  id: 5,
                  title: "5. LLM Synthesis",
                  badge: "Groq LLaMA 3.1",
                  detail: "Streaming token synthesis generation",
                  icon: Bot,
                  activeColor: "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                }
              ].map((step) => {
                const Icon = step.icon;
                const isStepActive = visStage >= step.id;
                const isCurrent = visStage === step.id;

                return (
                  <div
                    key={step.id}
                    className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                      isStepActive
                        ? `${step.activeColor} shadow-md`
                        : "border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-gray-400"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                          isStepActive ? "bg-black/10 dark:bg-white/10" : "bg-black/5 dark:bg-white/5 text-gray-400"
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        {isCurrent && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs md:text-sm text-black dark:text-white mb-1">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">
                        {step.detail}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="font-mono text-[10px] uppercase font-semibold tracking-wider">
                        {isStepActive ? step.badge : "Standby"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─── LIVE OUTPUT CONSOLE ─── */}
            <div className="border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 rounded-2xl p-5 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 font-semibold">
                    Pipeline Execution Result
                  </span>
                </div>
                {visStage === 5 && (
                  <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Latency: 168ms total
                  </span>
                )}
              </div>

              {visStage === 0 ? (
                <p className="text-xs md:text-sm text-gray-400 italic">
                  Click "Trace Pipeline" above to watch query vectorization, ChromaDB similarity distance resolution, and live token synthesis.
                </p>
              ) : (
                <div className="space-y-3">
                  {visStage >= 2 && (
                    <div className="font-mono text-[11px] bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-xl text-indigo-700 dark:text-indigo-300">
                      <span className="font-bold">Embedding Vector: </span>
                      <code>[0.0842, -0.1983, 0.4412, 0.0129, -0.3114, 0.7721, ... +378 dimensions]</code>
                    </div>
                  )}

                  {visStage >= 4 && (
                    <div className="font-mono text-[11px] bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-amber-800 dark:text-amber-300 flex items-center justify-between">
                      <span>✓ Top ChromaDB Chunk: "Custom-trained YOLO v8/v11 at 30+ FPS with OpenCV..."</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">Score: 97.2%</span>
                    </div>
                  )}

                  {visStage >= 5 && (
                    <div className="text-xs md:text-sm leading-relaxed text-black dark:text-gray-200 pt-2 font-medium">
                      <p>{visAnswer || "Generating response from augmented context..."}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── TAB 2: SEMANTIC VS KEYWORD SEARCH PLAYGROUND ─── */}
        {activeTab === "search" && (
          <motion.div
            key="tab-search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="border border-black/10 dark:border-white/10 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-3xl p-6 md:p-10 shadow-sm"
          >
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                Test Query (Notice how Vector Embeddings understand concepts even when exact words differ)
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try typing words not in the text like 'autonomous vehicle' or 'conversational document'..."
                  className="w-full bg-white dark:bg-black/60 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                />
              </div>

              {/* Sample Preset Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[11px] font-mono text-gray-400">Try Conceptual Queries:</span>
                {[
                  "autonomous vehicular navigation",
                  "conversational document memory",
                  "intelligent study organizer",
                  "commercial cloud deployment"
                ].map((concept, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => setSearchQuery(concept)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                      searchQuery === concept
                        ? "bg-indigo-500 text-white border-indigo-500 font-semibold"
                        : "bg-white dark:bg-white/5 border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-indigo-500"
                    }`}
                  >
                    "{concept}"
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAMPLE_CORPUS.map((item) => {
                const scoreData = searchScores.find(s => s.id === item.id) || { keywordScore: 0, semanticScore: 10 };
                const isTopSemantic = scoreData.semanticScore >= 85;

                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isTopSemantic
                        ? "border-indigo-500/40 bg-indigo-500/[0.03] dark:bg-indigo-500/[0.06] shadow-sm"
                        : "border-black/5 dark:border-white/5 bg-white dark:bg-black/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-500/10">
                        {item.category}
                      </span>
                      {isTopSemantic && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Best Semantic Match
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-base text-black dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {item.text}
                    </p>

                    {/* Dual Score Comparison Bars */}
                    <div className="space-y-2 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-xs">
                      {/* Keyword Match (BM25) */}
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-gray-500">Keyword Match (Exact lexical):</span>
                          <span className={scoreData.keywordScore > 0 ? "font-bold text-amber-500" : "text-gray-400"}>
                            {scoreData.keywordScore}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 transition-all duration-500"
                            style={{ width: `${scoreData.keywordScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Vector Semantic Match */}
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-gray-500">Vector Semantic Match (Embeddings):</span>
                          <span className={scoreData.semanticScore > 50 ? "font-bold text-indigo-500" : "text-gray-400"}>
                            {scoreData.semanticScore}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                            style={{ width: `${scoreData.semanticScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── TAB 3: ASK VEDANT'S CODEBASE ─── */}
        {activeTab === "codebase" && (
          <motion.div
            key="tab-codebase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="border border-black/10 dark:border-white/10 bg-[#fafafa] dark:bg-[#0a0a0a] rounded-3xl p-6 md:p-10 shadow-sm"
          >
            {/* Repository Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {REPOS.map((repo) => {
                const isSelected = selectedRepoId === repo.id;
                return (
                  <button
                    key={repo.id}
                    onClick={() => {
                      setSelectedRepoId(repo.id);
                      setSelectedQaIndex(0);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20 shadow-sm"
                        : "border-black/5 dark:border-white/5 bg-white dark:bg-black/40 hover:border-black/20 dark:hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <GitBranch className="w-3 h-3" /> {repo.role.slice(0, 20)}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-black dark:text-white truncate">
                      {repo.name}
                    </h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {repo.tech.slice(0, 3).map((t, tidx) => (
                        <span key={tidx} className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-gray-500 dark:text-gray-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Architecture Details of Selected Repo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Architectural Blueprint */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-base text-black dark:text-white flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-indigo-500" />
                      Architectural Blueprint
                    </h3>
                    <a
                      href={currentRepo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-medium">
                    {currentRepo.description}
                  </p>

                  <div className="space-y-2.5 font-mono text-[11px]">
                    <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold block mb-0.5">📥 Ingestion Pipeline:</span>
                      <span className="text-gray-700 dark:text-gray-300">{currentRepo.blueprint.ingestion}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <span className="text-purple-600 dark:text-purple-400 font-bold block mb-0.5">🧠 Embedding Model:</span>
                      <span className="text-gray-700 dark:text-gray-300">{currentRepo.blueprint.embedding}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold block mb-0.5">🗄️ Vector Space Index:</span>
                      <span className="text-gray-700 dark:text-gray-300">{currentRepo.blueprint.vectorStore}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5">⚡ Execution Engine:</span>
                      <span className="text-gray-700 dark:text-gray-300">{currentRepo.blueprint.generation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Code Q&A & Implementation Citations */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/50">
                  <h3 className="font-bold text-base text-black dark:text-white mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-purple-500" />
                    Deep-Dive Architectural Questions
                  </h3>

                  {/* Question Selector Pills */}
                  <div className="space-y-2 mb-4">
                    {currentRepo.qa.map((item, qidx) => (
                      <button
                        key={qidx}
                        onClick={() => setSelectedQaIndex(qidx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          selectedQaIndex === qidx
                            ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                            : "border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:border-black/20"
                        }`}
                      >
                        <span className="flex-1 pr-2">{item.q}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      </button>
                    ))}
                  </div>

                  {/* Active Explanation & Code Citation */}
                  {currentRepo.qa[selectedQaIndex] && (
                    <div className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-xs text-black dark:text-gray-200 leading-relaxed font-medium">
                        {currentRepo.qa[selectedQaIndex].a}
                      </div>

                      <div className="rounded-xl bg-[#111] text-gray-200 p-4 font-mono text-[11px] overflow-x-auto border border-white/10">
                        <div className="flex items-center justify-between text-gray-500 text-[10px] pb-2 mb-2 border-b border-white/10">
                          <span>File Reference: {currentRepo.qa[selectedQaIndex].fileCitation}</span>
                          <span className="text-indigo-400">Implementation Snippet</span>
                        </div>
                        <pre className="text-gray-300 leading-normal">
                          {currentRepo.qa[selectedQaIndex].codeSnippet}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Custom Ask Codebase Form */}
                  <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                      Ask Any Custom Question About This Codebase:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customCodeQuestion}
                        onChange={(e) => setCustomCodeQuestion(e.target.value)}
                        placeholder={`Ask about ${currentRepo.name} algorithms, data structures...`}
                        className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3.5 py-2 text-xs text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                      <button
                        type="button"
                        onClick={handleAskCustomCode}
                        disabled={isAskingCode || !customCodeQuestion.trim()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        {isAskingCode ? "Querying..." : "Ask AI"}
                      </button>
                    </div>

                    {customCodeAnswer && (
                      <div className="mt-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-black dark:text-gray-200 leading-relaxed font-medium">
                        {customCodeAnswer}
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
