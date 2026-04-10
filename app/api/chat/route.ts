import { NextResponse } from "next/server";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  langInstruction?: string;
}

type LangKey = "hi" | "mr" | "en";

// ── Rate Limiter (with auto-cleanup to prevent memory leak) ───────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 25; // slightly more generous for general-purpose use

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 5 * 60_000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX_REQUESTS) return true;
  entry.count++;
  return false;
}

// ── Language utils ────────────────────────────────────────────────────────────
function parseLang(instruction?: string): LangKey {
  if (!instruction) return "hi";
  if (instruction.includes("Marathi")) return "mr";
  if (instruction.includes("English")) return "en";
  return "hi";
}

// ── Fallback messages (all 3 languages) ──────────────────────────────────────
const FALLBACKS: Record<string, Record<LangKey, string>> = {
  rateLimited: {
    hi: "⚠️ आपने बहुत अधिक सवाल पूछे हैं। कृपया 1 मिनट बाद पुनः प्रयास करें।",
    mr: "⚠️ आपण खूप जास्त प्रश्न विचारले आहेत. कृपया १ मिनिटानंतर पुन्हा प्रयत्न करा.",
    en: "⚠️ Too many requests. Please try again in 1 minute.",
  },
  serverBusy: {
    hi: "⚠️ सर्वर अभी व्यस्त है। कृपया थोड़ी देर बाद पुनः प्रयास करें।",
    mr: "⚠️ सध्या सर्व्हर व्यस्त आहे. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.",
    en: "⚠️ Server is busy right now. Please try again shortly.",
  },
  noAnswer: {
    hi: "माफ करें, उत्तर नहीं मिला। कृपया अलग तरीके से सवाल पूछें।",
    mr: "माफ करा, उत्तर मिळाले नाही. कृपया वेगळ्या प्रकारे प्रश्न विचारा.",
    en: "Sorry, I couldn't find an answer. Please rephrase your question.",
  },
  crashed: {
    hi: "⚠️ कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।",
    mr: "⚠️ काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
    en: "⚠️ Something went wrong. Please try again.",
  },
};

function getFallback(key: string, lang: LangKey): string {
  return FALLBACKS[key]?.[lang] ?? FALLBACKS[key]?.hi ?? "Error";
}

// ── System Prompt (general-purpose, like ChatGPT) ─────────────────────────────
const BASE_SYSTEM_PROMPT = `You are "Gram Sahayak" (ग्राम सहायक), a friendly and knowledgeable AI assistant built into the Gidhadi Gram Connect platform.

## Your Personality
- Warm, helpful, and conversational — like a knowledgeable friend from the village
- Honest: say "I don't know" rather than guessing
- Concise: give clear answers, not long essays, unless the user asks for detail
- Encouraging and positive

## CRITICAL Language Rules
- ALWAYS detect the language of the user's message and reply ONLY in that same language
- If the user writes in Hindi (हिन्दी) → reply entirely in Hindi. Do NOT mix Marathi words
- If the user writes in Marathi (मराठी) → reply entirely in Marathi. Do NOT mix Hindi words  
- If the user writes in English → reply in clear, simple English
- NEVER mix languages within a single response
- The "Active Language Instruction" at the bottom of this prompt is your highest-priority rule — follow it strictly
- Use simple, everyday words appropriate for rural users

## What You Can Help With
You are a general-purpose assistant. You can help with ANY topic, including:
- Government schemes (PM-KISAN, Ujjwala, Awas Yojana, Ration Card, Ayushman Bharat, etc.)
- Gram Panchayat services and local issues
- Agriculture, farming advice, weather, seeds, fertilizers, MSP, crop insurance
- Health questions and nearby health schemes
- Education, scholarships, and skill development
- Legal rights, RTI filing, grievances
- General knowledge, science, history, geography
- Math calculations, unit conversions
- Technology help (how to use apps, mobile tips)
- Daily life questions (recipes, home remedies, etc.)
- Current events and news (if you have knowledge of it)

## Rules
- Be factually accurate. If unsure about specific official data (scheme amounts, deadlines), advise the user to verify at the nearest CSC center or official website
- Never make up facts, names, or numbers
- Avoid political opinions or religious topics
- For medical emergencies, always advise calling emergency services
- Never reveal the underlying AI model or company powering you`;

// ── Call OpenRouter with retry ────────────────────────────────────────────────
async function callOpenRouter(messages: object[], apiKey: string): Promise<Response> {
  const body = JSON.stringify({
    model: "meta-llama/llama-3-8b-instruct",
    messages,
    temperature: 0.6,   // slightly higher for general conversation
    max_tokens: 500,
    stream: false,
  });

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://gidhadi.in",
    "X-Title": "Gram Sahayak",
  };

  for (let attempt = 1; attempt <= 2; attempt++) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body,
    });
    if (res.ok) return res;
    if (res.status < 500 || attempt >= 2) return res;
    await new Promise((r) => setTimeout(r, 800));
  }

  throw new Error("Retry loop exited unexpectedly");
}

// ── POST Handler ──────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  // 1. Rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (checkRateLimit(ip)) {
    // Best-effort lang detection for localized error
    let lang: LangKey = "hi";
    try {
      const bodyText = await req.text();
      const parsed = JSON.parse(bodyText) as Partial<RequestBody>;
      lang = parseLang(parsed.langInstruction);
    } catch { /* ignore */ }
    return NextResponse.json({ message: getFallback("rateLimited", lang) }, { status: 429 });
  }

  // 2. Parse body
  let body: RequestBody | null = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON." }, { status: 400 });
  }

  if (!body || !Array.isArray(body.messages)) {
    return NextResponse.json({ message: "messages array is required." }, { status: 400 });
  }

  const lang = parseLang(body.langInstruction);

  // 3. Sanitize messages
  const sanitized: ChatMessage[] = body.messages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        (m.role === "user" || m.role === "assistant")
    )
    .slice(-16) // keep more context for general conversations
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, 1500),
    }));

  if (sanitized.length === 0) {
    const emptyMsg = { hi: "कृपया एक सवाल लिखें।", mr: "कृपया एक प्रश्न लिहा.", en: "Please type a question." };
    return NextResponse.json({ message: emptyMsg[lang] }, { status: 400 });
  }

  // 4. Build system prompt with injected language instruction
  const langSection = body.langInstruction
    ? `\n\n## Active Language Instruction (HIGHEST PRIORITY)\n${body.langInstruction}\nThis overrides everything else. Follow it strictly for every sentence of your response.`
    : "";

  const chatMessages = [
    { role: "system", content: BASE_SYSTEM_PROMPT + langSection },
    ...sanitized,
  ];

  // 5. API key check
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("[GramSahayak] OPENROUTER_API_KEY not set");
    return NextResponse.json({ message: getFallback("crashed", lang) }, { status: 500 });
  }

  // 6. Call API
  let openRouterRes: Response;
  try {
    openRouterRes = await callOpenRouter(chatMessages, apiKey);
  } catch (err) {
    console.error("[GramSahayak] Fetch error:", err);
    return NextResponse.json({ message: getFallback("serverBusy", lang) }, { status: 200 });
  }

  if (!openRouterRes.ok) {
    const errText = await openRouterRes.text().catch(() => "unknown");
    console.error(`[GramSahayak] OpenRouter ${openRouterRes.status}:`, errText);
    return NextResponse.json({ message: getFallback("serverBusy", lang) }, { status: 200 });
  }

  // 7. Parse response
  try {
    const data = await openRouterRes.json();
    const rawMessage: string = data?.choices?.[0]?.message?.content?.trim() ?? "";

    if (!rawMessage) {
      return NextResponse.json({ message: getFallback("noAnswer", lang) });
    }

    const usage = data?.usage;
    if (usage) {
      console.info(`[GramSahayak] tokens — prompt: ${usage.prompt_tokens}, completion: ${usage.completion_tokens}, lang: ${lang}`);
    }

    return NextResponse.json({ message: rawMessage });
  } catch (err) {
    console.error("[GramSahayak] Parse error:", err);
    return NextResponse.json({ message: getFallback("crashed", lang) }, { status: 500 });
  }
}