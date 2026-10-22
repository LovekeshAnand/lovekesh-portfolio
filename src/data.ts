export const site = {
  name: "Lovekesh Anand",
  url: "https://lovekesh-builds.vercel.app",
  email: "lovekeshanand6@gmail.com",
  github: "https://github.com/LovekeshAnand",
  linkedin: "https://www.linkedin.com/in/lovekesh-anand-443138318/",
  x: "https://x.com/LovekeshAnand07",
  medium: "https://medium.com/@lovekeshanand6",
  resume: "/resume.pdf",
};

/** A node in an architecture drawing. Coordinates live in a 1000-wide viewBox. */
export type DNode = { id: string; x: number; y: number; label: string; sub?: string; tone?: "accent" | "ghost"; w?: number };
export type DEdge = [from: string, to: string, label?: string];

export type Project = {
  name: string;
  kind: string;
  line: string;
  stamp?: string;
  problem: string;
  design: string;
  result: string;
  stack: string[];
  github: string;
  live?: string;
  diagram: { h: number; nodes: DNode[]; edges: DEdge[] };
};

export const projects: Project[] = [
  {
    name: "Kairos",
    kind: "Agency operations engine",
    line: "Your code is the engine. Notion is the interface.",
    stamp: "Winner · Automate India",
    problem: "Agency work is scattered across WhatsApp, Gmail and Meet, and someone has to turn it all into tasks by hand.",
    design: "An event pipeline structures every message with an LLM router, waits for approval in Notion, then executes it.",
    result: "1st place, Notion track, Automate India at Microsoft. Built in 8 hours.",
    stack: ["Node.js", "Express", "Notion API", "OpenRouter", "WhatsApp", "Gmail OAuth"],
    github: "https://github.com/LovekeshAnand/Kairos",
    live: "https://kairos-amber-three.vercel.app",
    diagram: {
      h: 440,
      nodes: [
        { id: "gm", x: 10, y: 20, label: "Gmail", sub: "OAuth stream", w: 170 },
        { id: "wa", x: 10, y: 180, label: "WhatsApp", sub: "gateway", w: 170 },
        { id: "mt", x: 10, y: 340, label: "Meet + Docs", sub: "transcripts", w: 170 },
        { id: "in", x: 260, y: 180, label: "Ingest", sub: "noise filter" },
        { id: "ai", x: 530, y: 20, label: "LLM router", sub: "4-key failover" },
        { id: "no", x: 530, y: 180, label: "Notion · 8 DBs", sub: "human approval", tone: "accent" },
        { id: "po", x: 530, y: 340, label: "State poller", sub: "every 15 s" },
        { id: "ex", x: 800, y: 340, label: "Executors", sub: "send · assign · bill" },
        { id: "au", x: 800, y: 180, label: "Audit log", sub: "immutable" },
      ],
      edges: [
        ["gm", "in"],
        ["wa", "in"],
        ["mt", "in"],
        ["in", "ai"],
        ["ai", "no", "structured"],
        ["no", "po", "approved"],
        ["po", "ex"],
        ["ex", "au"],
      ],
    },
  },
  {
    name: "Nyxen Memory",
    kind: "LLM memory research",
    line: "My AI doesn't forget anymore.",
    problem: "LLMs forget once the context window fills, and RAG wastes tokens re-pasting old text.",
    design: "Conversations become a knowledge graph, and relevant facts are injected straight into the model's attention as KV-cache.",
    result: "Recalls decisions from hours earlier with zero extra prompt tokens, fully local.",
    stack: ["Python", "PyTorch", "CUDA", "Knowledge graphs", "KV-cache"],
    github: "https://github.com/LovekeshAnand/Nyxen-Memory",
    diagram: {
      h: 440,
      nodes: [
        { id: "cv", x: 10, y: 180, label: "Conversation", sub: "every turn", w: 180 },
        { id: "tx", x: 260, y: 180, label: "Triple extractor", sub: "(s, p, o)" },
        { id: "kg", x: 530, y: 180, label: "Knowledge graph", sub: "negations · updates", tone: "accent" },
        { id: "rt", x: 530, y: 340, label: "Graph retriever", sub: "relevant facts" },
        { id: "kv", x: 800, y: 340, label: "KV projector", sub: "facts → K, V" },
        { id: "lm", x: 800, y: 180, label: "Local LLM", sub: "attention layers" },
        { id: "pr", x: 800, y: 20, label: "Prompt", sub: "left untouched", tone: "ghost" },
      ],
      edges: [
        ["cv", "tx"],
        ["tx", "kg"],
        ["kg", "rt"],
        ["rt", "kv"],
        ["kv", "lm", "inject"],
        ["pr", "lm"],
      ],
    },
  },
  {
    name: "Epsilon IDE",
    kind: "Local AI coding engine",
    line: "Three local models, routed by how hard the task is.",
    problem: "A real multi-model coding assistant normally needs a server, not a laptop GPU.",
    design: "Prompts are scored 1–10 and routed to a 1.5B, 7B or 33B model. A six-agent pipeline pulls context with TF-IDF + sqlite-vec search.",
    result: "30–80 tok/s fully offline, using flash attention, an INT8 KV cache and sparse top-64.",
    stack: ["Python", "CUDA", "llama.cpp", "FastAPI", "sqlite-vec", "TF-IDF"],
    github: "https://github.com/LovekeshAnand/epsilon-ide",
    diagram: {
      h: 440,
      nodes: [
        { id: "ed", x: 10, y: 180, label: "Prompt", sub: "from the editor", w: 170 },
        { id: "rt", x: 260, y: 180, label: "Router", sub: "complexity 1–10", tone: "accent" },
        { id: "fs", x: 530, y: 20, label: "Fast 1.5B", sub: "simple edits" },
        { id: "bl", x: 530, y: 180, label: "Balanced 7B", sub: "most tasks" },
        { id: "dp", x: 530, y: 340, label: "Deep 33B", sub: "hard reasoning" },
        { id: "cs", x: 800, y: 100, label: "Code search", sub: "TF-IDF + sqlite-vec" },
        { id: "ag", x: 800, y: 340, label: "6 agents", sub: "plan · write · check" },
      ],
      edges: [
        ["ed", "rt"],
        ["rt", "fs"],
        ["rt", "bl"],
        ["rt", "dp"],
        ["cs", "bl", "context"],
        ["dp", "ag"],
      ],
    },
  },
  {
    name: "StockSentinel",
    kind: "Self-learning browser agent",
    line: "Let the agent watch and reason. A human makes the final call.",
    stamp: "2nd · SLAB Hackathon",
    problem: "Fully autonomous trading bots remove human judgement, which is risky when LLMs hallucinate.",
    design: "A browser agent learns each site's DOM, a local Qwen 2.5 7B reasons over the signals, and every trade needs Telegram approval.",
    result: "2nd place at the SLAB Hackathon (webcmd, MAIT).",
    stack: ["Python", "Browser agents", "Scrapling", "Qwen 2.5 7B", "Telegram"],
    github: "https://github.com/LovekeshAnand/stocksentinel",
    diagram: {
      h: 440,
      nodes: [
        { id: "ch", x: 10, y: 20, label: "Live charts", w: 170 },
        { id: "nw", x: 10, y: 180, label: "Market news", w: 170 },
        { id: "ag", x: 260, y: 100, label: "Browser agent", sub: "learns the DOM", tone: "accent" },
        { id: "me", x: 260, y: 300, label: "Memory", sub: "signal correlation" },
        { id: "lm", x: 530, y: 100, label: "Qwen 2.5 7B", sub: "local reasoning" },
        { id: "tg", x: 800, y: 100, label: "Telegram", sub: "human approves", tone: "accent" },
        { id: "px", x: 800, y: 300, label: "Paper trade", sub: "supervised" },
      ],
      edges: [
        ["ch", "ag"],
        ["nw", "ag"],
        ["ag", "me"],
        ["ag", "lm"],
        ["me", "lm"],
        ["lm", "tg", "signal"],
        ["tg", "px", "approve"],
      ],
    },
  },
  {
    name: "Kelados",
    kind: "On-device voice AI",
    line: "Speak. It's written.",
    stamp: "Part of HOL Guard",
    problem: "Hosted voice AI charges per character, uploads your audio and caps your usage.",
    design: "Speech-to-text and text-to-speech run on your own device, with a cleanup layer that follows spoken commands.",
    result: "Unlimited, private, $0 server cost. Now part of the HOL Guard ecosystem.",
    stack: ["TypeScript", "WebGPU", "Whisper", "Moonshine", "npm SDK"],
    github: "https://github.com/LovekeshAnand/Kelados",
    live: "https://kelados.in",
    diagram: {
      h: 400,
      nodes: [
        { id: "mc", x: 10, y: 20, label: "Microphone", w: 170 },
        { id: "st", x: 260, y: 20, label: "On-device STT", sub: "Moonshine · Whisper", tone: "accent" },
        { id: "cl", x: 530, y: 20, label: "Cleanup", sub: "fillers · commands" },
        { id: "ap", x: 800, y: 20, label: "Any app", sub: "types as you talk" },
        { id: "sv", x: 530, y: 160, label: "Cloud server", sub: "$0 · not needed", tone: "ghost" },
        { id: "tx", x: 10, y: 300, label: "Selected text", w: 170 },
        { id: "ts", x: 260, y: 300, label: "On-device TTS", sub: "28 voices", tone: "accent" },
        { id: "sp", x: 530, y: 300, label: "Speaker / file" },
        { id: "sd", x: 800, y: 300, label: "npm SDK", sub: "for developers" },
      ],
      edges: [
        ["mc", "st"],
        ["st", "cl"],
        ["cl", "ap"],
        ["tx", "ts"],
        ["ts", "sp"],
        ["sp", "sd"],
      ],
    },
  },
  {
    name: "NyayaAI",
    kind: "Offline legal AI",
    line: "Indian legal drafting that never leaves your machine.",
    stamp: "2nd · Matrix 3.0",
    problem: "Law firms can't send client files to cloud AI, and the IPC-to-BNS switch broke older references.",
    design: "A fully local pipeline: OCR, then a llama.cpp model grounded in an IPC→BNS map and precedent search.",
    result: "2nd place at Matrix 3.0 (36 hours). Court-ready drafts on a 4 GB laptop.",
    stack: ["Python", "FastAPI", "llama.cpp", "SQLite", "Tesseract", "React"],
    github: "https://github.com/LovekeshAnand/nyaya-ai",
    diagram: {
      h: 440,
      nodes: [
        { id: "pd", x: 10, y: 20, label: "Scanned PDF", w: 170 },
        { id: "oc", x: 260, y: 20, label: "OCR", sub: "Tesseract · PyMuPDF" },
        { id: "pa", x: 530, y: 20, label: "Parser", sub: "facts · sections" },
        { id: "fa", x: 10, y: 180, label: "Case facts", w: 170 },
        { id: "lm", x: 530, y: 180, label: "Local LLM", sub: "llama.cpp · 4 GB", tone: "accent" },
        { id: "mp", x: 260, y: 340, label: "IPC → BNS map" },
        { id: "pr", x: 530, y: 340, label: "Precedents", sub: "SQLite search" },
        { id: "dr", x: 800, y: 180, label: "Court-ready draft" },
      ],
      edges: [
        ["pd", "oc"],
        ["oc", "pa"],
        ["pa", "lm"],
        ["fa", "lm"],
        ["mp", "lm"],
        ["pr", "lm"],
        ["lm", "dr"],
      ],
    },
  },
];

export const appendix = [
  { name: "ServiceFlow", kind: "Feedback platform · REST, JWT, MongoDB", url: "https://serviceflow-five.vercel.app" },
  { name: "AgentOS", kind: "Local agents for Windows + Android", url: "https://github.com/LovekeshAnand/AgentOS" },
  { name: "Backend Project", kind: "Video platform API · Express, Zod, Cloudinary", url: "https://github.com/LovekeshAnand/Backend-Project" },
  { name: "love-authentication", kind: "Drop-in JWT auth package on npm", url: "https://www.npmjs.com/package/love-authentication" },
  { name: "NewsTrace", kind: "Media intelligence · headless scraping", url: "https://news-trace-sigma.vercel.app" },
  { name: "VocaBrawl", kind: "Real-time multiplayer · Socket.io", url: "https://vocabrawl.vercel.app" },
];

export const wins = [
  { fig: 1, place: "1st", event: "Automate India", where: "HackBriven · Microsoft, Noida", note: "Notion track winner. Built Kairos in 8 hours.", image: "/wins/automate.jpg", focus: "72% 30%" },
  { fig: 2, place: "3rd", event: "Ctrl Alt Hack", where: "HackBriven · Microsoft, Noida", note: "Podium with Dua Saeed.", image: "/wins/ctrlalt.jpg", focus: "50% 28%" },
  { fig: 3, place: "2nd", event: "SLAB Hackathon", where: "webcmd · MAIT, Delhi", note: "StockSentinel, a human-gated trading agent.", image: "/wins/slab-1.jpg", focus: "78% 35%" },
  { fig: 4, place: "2nd", event: "Matrix 3.0", where: "IITM Janakpuri · 36 hrs", note: "NyayaAI, offline legal AI.", image: "/wins/matrix-1.jpg", focus: "50% 50%" },
];

export const stats: [string, string][] = [
  ["7+", "Hackathons entered"],
  ["4", "Podium finishes"],
  ["1st", "Automate India @ Microsoft"],
  ["40+", "Open-source repos"],
];

export const bom = [
  { item: "Backend", parts: "Node.js, Express, FastAPI, PostgreSQL, MongoDB, Prisma, WebSockets, JWT, RBAC" },
  { item: "AI infrastructure", parts: "llama.cpp, CUDA, RAG, KV-cache, agents, Whisper, local inference" },
  { item: "Cloud & DevOps", parts: "AWS EC2, VPC, Jenkins CI/CD, PM2, Docker, Nginx, OpenVPN, Linux" },
  { item: "Interfaces", parts: "Next.js, React, TypeScript, Tailwind" },
];

export const revisions = [
  { rev: "C", role: "IT Intern", org: "EaseInfra · Dec 2025 – now", note: "AWS EC2/VPC, OpenVPN, PM2, Jenkins CI/CD, and production debugging." },
  { rev: "B", role: "Technical Head", org: "Nexturn", note: "Ran the tech side of the internship cell." },
  { rev: "A", role: "B.Tech, Computer Science", org: "MDU · Class of 2027", note: "Aug 2023 – May 2027." },
];

export const notes = [
  { date: "Oct 2026", title: "My AI Doesn't Forget Anymore.", url: "https://medium.com/@lovekeshanand6/my-ai-doesnt-forget-anymore-31c5bce0f70f" },
  { date: "Oct 2026", title: "What If an AI Could Build Its Own Index?", url: "https://medium.com/@lovekeshanand6/what-if-an-ai-could-build-its-own-index-4c3dd5821907" },
  { date: "Feb 2026", title: "Building My First Real Staging Environment", url: "https://medium.com/@lovekeshanand6/building-my-first-real-staging-environment-and-everything-that-went-wrong-ef3ca5b77eac" },
];
