import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// ─── Types ───────────────────────────────────────────────────────────────────

interface ResumeChunk {
  text: string;
  index: number;
}

interface RAGCache {
  chunks: ResumeChunk[];
  fetchedAt: number;
}

// ─── Cache ───────────────────────────────────────────────────────────────────

let cache: RAGCache | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// ─── PDF Extraction ──────────────────────────────────────────────────────────

async function extractTextFromPDF(url: string): Promise<string> {
  const loadingTask = pdfjsLib.getDocument(url);
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

export async function getResumeChunks(): Promise<ResumeChunk[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return cache.chunks;
  }

  let text = '';
  try {
    const resumeUrl = `${window.location.origin}/resume.pdf`;
    text = await extractTextFromPDF(resumeUrl);
  } catch (e1) {
    try {
      text = await extractTextFromPDF('https://vedant021004.github.io/resume.pdf');
    } catch (e2) {
      console.warn('Could not extract PDF resume, using fallback profile data:', e2);
      text = `Vedant Kapil - AI Engineer and Systems Developer. 
Specializes in LLM Systems, LangChain, Retrieval-Augmented Generation (RAG), Python, Streamlit, Machine Learning, Deep Learning, Transformers, and Neural Networks.
Built PDF Chatbot with LangChain and Streamlit, Agentic AI Coding Assistant, Amazon Product RAG with ChromaDB, and modern web applications.
Holds certifications in Supervised Machine Learning, Harvard CS50, Google, J.P. Morgan, Deloitte, and Data Science.`;
    }
  }

  const chunks = chunkText(text);
  cache = { chunks, fetchedAt: Date.now() };
  return chunks;
}

export function findRelevantChunks(query: string, chunks: ResumeChunk[]): string {
  const relevant = computeTFIDF(query, chunks);
  return relevant.map(c => c.text).join('\n\n');
}

export async function generateResponse(
  query: string,
  context: string,
  apiKey: string,
  onChunk: (text: string) => void
): Promise<void> {
  const systemPrompt = `You are Vedant Kapil's personal AI assistant on his portfolio website. 
Answer questions about Vedant based ONLY on the resume context provided below.
Be conversational, concise, and professional. Use first person when speaking as the assistant ("Vedant has..." or "He...").
If the answer isn't in the resume context, say so honestly.
Keep responses under 150 words unless the user asks for detail.

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

export function clearCache() {
  cache = null;
}
