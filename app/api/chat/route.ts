import { NextResponse } from "next/server";

// ── Types ────────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ── Simple in-memory rate limiter ────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const WINDOW_MS = 60_000; // 1 minute
  const MAX_REQUESTS = 20;
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count++;
  return false;
}

// ── Fallback messages ────────────────────────────────────────────────────────
const FALLBACKS = {
  rateLimited:
    "⚠️ आपण खूप जास्त प्रश्न विचारले आहेत.\nकृपया १ मिनिटानंतर पुन्हा प्रयत्न करा.",
  serverBusy:
    "⚠️ सध्या सर्व्हर व्यस्त आहे.\nकृपया थोड्या वेळाने पुन्हा प्रयत्न करा.\n\n(Offline मदत: PM किसान योजना बद्दल माहिती हवी असल्यास सांगा.)",
  noAnswer: "माफ करा, उत्तर मिळाले नाही. कृपया वेगळ्या प्रकारे प्रश्न विचारा.",
  crashed:
    "⚠️ काहीतरी चूक झाली.\nकृपया पुन्हा प्रयत्न करा.\n\n(तुम्ही सरकारी योजना, शेती किंवा ग्राम पंचायत बद्दल प्रश्न विचारू शकता.)",
};

// ── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are "Gram Sahayak" (ग्राम सहायक), an official AI assistant for Gidhadi Gram Panchayat, Maharashtra.

## Your Role
Help village residents with government schemes, Gram Panchayat services, farming, and local issues.

## Language Rules
- ALWAYS reply in simple Hindi or Marathi (match the user's language).
- Use easy, everyday words — avoid bureaucratic or complex terms.
- Keep replies SHORT (3–5 lines max) unless the user needs step-by-step help.

## Topics You Help With
- Central & State government schemes (PM-KISAN, Ujjwala, Awas Yojana, etc.)
- Gram Panchayat services (certificates, complaints, water, roads)
- Agriculture: seeds, fertilizers, MSP, Kisan Credit Card
- Health & education schemes for villagers
- Filing RTI or grievances

## Rules
- Never make up scheme amounts, dates, or eligibility — say "कृपया नजीकच्या CSC केंद्रावर जा" if unsure.
- Never discuss politics, religion, or controversial topics.
- If a question is off-topic, politely redirect: "मी फक्त सरकारी योजना आणि ग्राम पंचायत बद्दल मदत करू शकतो."
- Always end with a helpful next step when possible.`;

// ── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  // 1. Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: FALLBACKS.rateLimited }, { status: 429 });
  }

  try {
    // 2. Parse & validate body
    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { message: "Invalid request format." },
        { status: 400 }
      );
    }

    const messages: ChatMessage[] = body.messages;

    // 3. Sanitize: keep only last 10 messages, strip empty content
    const sanitized = messages
      .filter((m) => m?.content?.trim().length > 0)
      .slice(-10)
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content.trim().slice(0, 1000), // max 1000 chars per message
      }));

    if (sanitized.length === 0) {
      return NextResponse.json(
        { message: "कृपया एक प्रश्न लिहा." },
        { status: 400 }
      );
    }

    // 4. Build final message list
    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...sanitized,
    ];

    // 5. Call OpenRouter with a single retry
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not set");
      return NextResponse.json({ message: FALLBACKS.crashed }, { status: 500 });
    }

    let openRouterRes: Response | null = null;

    for (let attempt = 1; attempt <= 2; attempt++) {
      openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://gidhadi.in",
          "X-Title": "Gram Sahayak",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: chatMessages,
          temperature: 0.5,        // lower = more factual, less hallucination
          max_tokens: 400,
          stream: false,
        }),
      });

      if (openRouterRes.ok) break;

      // Retry only on 5xx errors, not 4xx
      const shouldRetry = openRouterRes.status >= 500 && attempt < 2;
      if (!shouldRetry) break;

      await new Promise((r) => setTimeout(r, 800)); // wait before retry
    }

    // 6. Handle API error
    if (!openRouterRes?.ok) {
      const errorText = await openRouterRes?.text().catch(() => "unknown");
      console.error(`OpenRouter error [${openRouterRes?.status}]:`, errorText);
      return NextResponse.json({ message: FALLBACKS.serverBusy }, { status: 200 });
    }

    // 7. Parse response
    const data = await openRouterRes.json();
    const rawMessage: string =
      data?.choices?.[0]?.message?.content?.trim() ?? "";

    if (!rawMessage) {
      return NextResponse.json({ message: FALLBACKS.noAnswer });
    }

    // 8. Log usage (optional — remove if privacy-sensitive)
    const usage = data?.usage;
    if (usage) {
      console.info(
        `[GramSahayak] tokens — prompt: ${usage.prompt_tokens}, completion: ${usage.completion_tokens}`
      );
    }

    return NextResponse.json({ message: rawMessage });
  } catch (error) {
    console.error("Chat API crash:", error);
    return NextResponse.json({ message: FALLBACKS.crashed }, { status: 500 });
  }
}