import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// ─── Types ───────────────────────────────────────────────────────────────────

interface ResumeChunk {
  text: string;
  index: number;
}

interface RAGCache {
  text: string;
  chunks: ResumeChunk[];
  fetchedAt: number;
}

// ─── Cache ───────────────────────────────────────────────────────────────────

let cache: RAGCache | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// ─── PDF Extraction ──────────────────────────────────────────────────────────

async function extractTextFromBuffer(buffer: ArrayBuffer): Promise<string> {
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    pages.push(pageText);
  }

  return pages.join('\n\n');
}

export async function extractTextFromPDF(url: string): Promise<string> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load PDF (${response.status} ${response.statusText})`);
  }
  const buffer = await response.arrayBuffer();
  return extractTextFromBuffer(buffer);
}

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  return extractTextFromBuffer(buffer);
}

// ─── Chunking ────────────────────────────────────────────────────────────────

function chunkText(text: string, chunkSize = 300, overlap = 50): ResumeChunk[] {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const chunks: ResumeChunk[] = [];
  let i = 0;
  let index = 0;

  while (i < words.length) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push({
      text: chunkWords.join(' '),
      index: index++,
    });
    i += chunkSize - overlap;
  }

  return chunks;
}

// ─── TF-IDF Retrieval ────────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'some', 'them',
  'than', 'its', 'over', 'such', 'that', 'this', 'with', 'will', 'each',
  'from', 'they', 'were', 'which', 'their', 'what', 'about', 'would',
  'there', 'could', 'other', 'into', 'more', 'also', 'when', 'who', 'how',
]);

function computeTFIDF(query: string, chunks: ResumeChunk[]): ResumeChunk[] {
  const queryTokens = tokenize(query).filter(t => !STOP_WORDS.has(t));
  if (queryTokens.length === 0) return chunks.slice(0, 3);

  // Document frequency
  const df: Record<string, number> = {};
  const chunkTokenSets = chunks.map(chunk => {
    const tokens = new Set(tokenize(chunk.text));
    tokens.forEach(t => { df[t] = (df[t] || 0) + 1; });
    return tokens;
  });

  const N = chunks.length;

  // Score each chunk
  const scored = chunks.map((chunk, idx) => {
    const tokens = chunkTokenSets[idx];
    let score = 0;
    for (const qt of queryTokens) {
      if (tokens.has(qt)) {
        const idf = Math.log(1 + N / (1 + (df[qt] || 0)));
        score += idf;
      }
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map(s => s.chunk);
}

// ─── Public API ──────────────────────────────────────────────────────────────

const RESUME_TEXT_KEY = 'portfolio_resume_text_cache';
const RESUME_TIME_KEY = 'portfolio_resume_cache_time';

export function updateResumeCache(text: string, timestamp = Date.now()): ResumeChunk[] {
  if (!text || !text.trim()) return [];
  const chunks = chunkText(text);
  cache = { text, chunks, fetchedAt: timestamp };
  try {
    localStorage.setItem(RESUME_TEXT_KEY, text);
    localStorage.setItem(RESUME_TIME_KEY, String(timestamp));
  } catch {
    // ignore quota error
  }
  return chunks;
}

export function clearCache(): void {
  cache = null;
  try {
    localStorage.removeItem(RESUME_TEXT_KEY);
    localStorage.removeItem(RESUME_TIME_KEY);
  } catch {
    // ignore
  }
}

export function getResumeMetadata() {
  return {
    isLoaded: !!cache && cache.chunks.length > 0,
    chunkCount: cache?.chunks.length || 0,
    fetchedAt: cache?.fetchedAt || null,
  };
}

export async function getResumeChunks(
  forceRefresh = false,
  expectedTimestamp?: number
): Promise<ResumeChunk[]> {
  // 1. Check in-memory cache if not forced and still fresh
  if (!forceRefresh && cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
    if (!expectedTimestamp || cache.fetchedAt >= expectedTimestamp) {
      return cache.chunks;
    }
  }

  // 2. Check localStorage cache if it matches expectedTimestamp and not forced
  if (!forceRefresh) {
    try {
      const storedTimeStr = localStorage.getItem(RESUME_TIME_KEY);
      const storedText = localStorage.getItem(RESUME_TEXT_KEY);
      const storedTime = storedTimeStr ? parseInt(storedTimeStr, 10) : 0;

      if (storedText && storedTime > 0) {
        if (!expectedTimestamp || storedTime >= expectedTimestamp) {
          if (Date.now() - storedTime < CACHE_TTL) {
            const chunks = chunkText(storedText);
            cache = { text: storedText, chunks, fetchedAt: storedTime };
            return chunks;
          }
        }
      }
    } catch {
      // ignore
    }
  }

  // 3. Fetch latest resume PDF with cache-busting
  let text = '';
  const now = Date.now();
  const candidateUrls = [
    `${window.location.origin}/resume.pdf?t=${now}`,
    `https://raw.githubusercontent.com/Vedant021004/Vedant021004.github.io/main/public/resume.pdf?t=${now}`,
    `https://vedant021004.github.io/resume.pdf?t=${now}`
  ];

  let extractionSuccess = false;
  for (const url of candidateUrls) {
    try {
      text = await extractTextFromPDF(url);
      if (text && text.trim().length > 50) {
        extractionSuccess = true;
        break;
      }
    } catch {
      // try next candidate
    }
  }

  if (extractionSuccess) {
    return updateResumeCache(text, now);
  }

  // 4. If all network fetches fail, try any previously cached text in localStorage
  try {
    const fallbackStored = localStorage.getItem(RESUME_TEXT_KEY);
    if (fallbackStored && fallbackStored.trim().length > 50) {
      console.info('Using locally cached resume text as network fallback.');
      const chunks = chunkText(fallbackStored);
      cache = { text: fallbackStored, chunks, fetchedAt: now };
      return chunks;
    }
  } catch {
    // ignore
  }

  // 5. Ultimate fallback profile data
  console.warn('Could not extract PDF resume, using fallback profile data.');
  text = `VEDANT KAPIL
AI Engineer | Generative AI & Full-Stack Systems
India | Portfolio | GitHub | LinkedIn | Email

PROFESSIONAL SUMMARY
Impact-focused AI Engineer with proven hands-on experience architecting and deploying end-to-end Generative AI pipelines, Retrieval-Augmented Generation (RAG) architectures, and real-time Computer Vision models. Highly adept at building high-precision semantic search engines, agentic workflows, and local LLM pipelines using Python, LangChain, ChromaDB, and FastAPI.

TECHNICAL SKILLS
- Programming & Core: Python, C, C++, SQL (PostgreSQL/MySQL), TypeScript, JavaScript, HTML5/CSS3
- Generative AI & LLMs: LangChain, LangGraph, LangSmith, Autonomous AI Agents, RAG Architectures, Vector Embeddings, ChromaDB, Sentence Transformers, Ollama, Prompt Engineering
- Machine Learning & Data: Scikit-learn, Supervised & Unsupervised Learning, Feature Engineering, Exploratory Data Analysis (EDA), NumPy, Pandas, Matplotlib
- Computer Vision: YOLO (v8/v11), OpenCV, Roboflow, Video Stream Ingestion, Object Detection & Tracking
- Backend & Web Systems: FastAPI, RESTful APIs, Next.js, React, Tailwind CSS, JSON Schema
- Developer Tools & Cloud: Git, GitHub, Linux/Bash, VS Code, Vercel, Streamlit, Docker (Familiar)

SELECTED TECHNICAL PROJECTS
- Personal Todo AI – Intelligent Task & Knowledge Platform (Python, LangChain, ChromaDB, Next.js, Vercel)
- Enterprise PDF RAG Intelligence Engine (Python, LangChain, ChromaDB, Ollama, Streamlit)
- Real-Time Traffic Detection & Video Analytics System (YOLO, OpenCV, Roboflow, Python)
- Production Client Web Application – Sindhu Construction (Next.js, React, TypeScript, Tailwind CSS, Vercel)
- Automated Dynamic Developer Portfolio & Headless CMS (React, TypeScript, GitHub REST API, Tailwind CSS, GitHub Pages)

HACKATHONS & ACHIEVEMENTS
- Code War Hackathon – AI-Powered Smart Cart & Automated Billing System (5th Place)

EDUCATION
- Bachelor of Engineering in Computer Engineering | St. John College of Engineering and Management (2024 – 2028)
- Higher Secondary Certificate (Class XII) – Science (PCMB) | Motherland Public School (CBSE) – 80% (2022)
- Secondary School Examination (Class X) | Motherland Public School (CBSE) – 76% (2020)

CERTIFICATIONS & VIRTUAL EXPERIENCE
- Machine Learning Specialization – DeepLearning.AI & Stanford University (Coursera)
- Introduction to Large Language Models & Google AI Essentials – Google Cloud / Google
- CS50’s Introduction to Programming with Python – Harvard University
- OpenAI Academy: Agents and Workflows – OpenAI
- Quantitative Research & Data Analytics Virtual Experience – JPMorgan Chase & Co., Deloitte, Tata (Forage)`;

  const chunks = chunkText(text);
  cache = { text, chunks, fetchedAt: now };
  return chunks;
}

export function findRelevantChunks(query: string, chunks: ResumeChunk[]): string {
  // If we have full resume text and it easily fits in context (< 25k chars), return full text
  // so no sections (like Education, Skills, Projects) are accidentally dropped due to spelling mistakes
  if (cache?.text && cache.text.length < 25000) {
    return cache.text;
  }

  const allChunks = chunks.map(c => c.text).join('\n\n');
  if (allChunks.length < 25000) {
    return allChunks;
  }

  const relevant = computeTFIDF(query, chunks);
  return relevant.map(c => c.text).join('\n\n');
}

export async function generateResponse(
  query: string,
  context: string,
  apiKey: string,
  onChunk: (text: string) => void
): Promise<void> {
  const systemPrompt = `You are the executive personal AI assistant representing Vedant Kapil on his official developer portfolio website.
Your mission is to provide the highest-standard, most polite, beautifully structured, and articulate responses to all visitors.

VOICE & ETIQUETTE:
1. EXTREME COURTESY & WARMTH:
   - Always greet visitors with genuine courtesy and warmth ("Hello!", "Good day!", "Welcome! It is an absolute pleasure to assist you.").
   - Always maintain a polite, respectful, articulate, and encouraging tone.
   - Use warm and professional closings (e.g. "Please feel free to ask if you would like more details on any of Vedant's projects, technical skills, or background!").

2. ELEGANT, CLEAR STRUCTURE:
   - Format answers using clean sections with bold headers and bullet points.
   - DO NOT write walls of plain text. Break information down with clean bullet points (•) and bold titles.
   - STRICT RULE: NEVER output markdown tables (do NOT use '| col | col |' syntax). Tables look cramped and unreadable on compact mobile chat screens. ALWAYS use organized bullet lists with bold titles and emojis instead.
   - Use tasteful emojis (🎓, 💼, 🚀, 🛠️, 📚, 🏆) to make answers engaging, readable, and visually appealing.

3. CASUAL & GENERAL QUESTIONS:
   - For greetings ("hi", "hello", "how are you"): Greet the visitor warmly, introduce yourself as Vedant's AI portfolio assistant, and invite them to explore Vedant's work.
   - For simple questions or casual banter (e.g. "what is 2+2?", "tell me a joke", "who made you?"): Answer with polite cheerfulness and accuracy (e.g. "2 + 2 equals 4! 😊 If you have any questions about Vedant's engineering work, AI architectures, or background, I am completely at your service."), then smoothly invite them to explore his portfolio.
   - NEVER output cold, dismissive, or robotic error messages like "That is not in the resume context".

4. ACCURACY ON VEDANT'S RESUME:
   - Ground all details about Vedant in the RESUME CONTEXT below.
   - Be completely resilient to typos in user questions (e.g. "scholing" -> schooling/education, "skils" -> skills, "projct" -> projects).
   - When asked about Education / Schooling:
     • Detail his Bachelor of Engineering (B.E.) in Computer Engineering at St. John College of Engineering and Management (2024 – 2028).
     • Detail his Class XII (Science PCMB) at Motherland Public School (CBSE) with 80% (2022).
     • Detail his Class X at Motherland Public School (CBSE) with 76% (2020).
   - When asked about Skills:
     • Group into Generative AI & LLMs, Programming Languages, Machine Learning, Computer Vision, Backend & Web, and Tools.
   - When asked about Projects:
     • Highlight Personal Todo AI, Enterprise PDF RAG Intelligence Engine, Real-Time Traffic Detection (YOLO v8/v11), Sindhu Construction Web App, and Automated Developer Portfolio.

5. UNLISTED DETAILS:
   - If a visitor asks about personal matters or trivia not listed in his portfolio, reply politely:
     "Vedant hasn't mentioned that on his portfolio, but I would be delighted to share details regarding his AI engineering work, featured projects, technical skillset, or academic journey!"

RESUME CONTEXT:
${context}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query },
      ],
      stream: true,
      temperature: 0.6,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error (${response.status}): ${err}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response stream');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data: ')) continue;
      const data = trimmed.slice(6);
      if (data === '[DONE]') return;

      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) {
          onChunk(delta);
        }
      } catch {
        // skip malformed chunks
      }
    }
  }
}
