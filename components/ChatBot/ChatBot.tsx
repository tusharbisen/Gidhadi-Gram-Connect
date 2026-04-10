"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

type SupportedLang = "hi" | "mr" | "en";

// ── Language Detection ────────────────────────────────────────────────────────
function detectLanguage(text: string): SupportedLang {
  const devanagari = /[\u0900-\u097F]/;
  if (!devanagari.test(text)) return "en";
  const marathiMarkers =
    /\b(आहे|नाही|आणि|करा|मला|तुम्ही|काय|कसे|कुठे|येथे|आम्ही|माझ्या|त्यांना|सांगा|द्या|मिळेल|हवे|असेल|होते|झाले|करतो|बघा|पाहिजे|आहेत)\b/i;
  return marathiMarkers.test(text) ? "mr" : "hi";
}

function getLangInstruction(lang: SupportedLang): string {
  if (lang === "mr")
    return "The user is writing in Marathi. Respond ONLY in simple Marathi (मराठी). Do NOT mix Hindi or English words.";
  if (lang === "hi")
    return "The user is writing in Hindi. Respond ONLY in simple Hindi (हिन्दी). Do NOT mix Marathi or English words.";
  return "The user is writing in English. Respond in clear, friendly English.";
}

// ── localStorage helpers ──────────────────────────────────────────────────────
const STORAGE_KEY = "gram_sahayak_conversations";
const MAX_STORED_CONVERSATIONS = 30;

function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveConversations(convs: Conversation[]): void {
  try {
    // Keep only the most recent N conversations
    const trimmed = [...convs]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, MAX_STORED_CONVERSATIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage quota exceeded — silently fail
  }
}

function generateId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function makeTitle(firstUserMessage: string): string {
  return firstUserMessage.trim().slice(0, 40) + (firstUserMessage.length > 40 ? "…" : "");
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (mins < 1) return "अभी";
  if (mins < 60) return `${mins}m पहले`;
  if (hours < 24) return `${hours}h पहले`;
  if (days === 1) return "कल";
  return `${days} दिन पहले`;
}

// ── Quick prompts ─────────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { label: "PM-KISAN की जानकारी", emoji: "🌾" },
  { label: "राशन कार्ड कैसे बनाएं?", emoji: "📋" },
  { label: "आज का मौसम कैसा है?", emoji: "🌤️" },
  { label: "ग्राम पंचायत शिकायत", emoji: "📝" },
  { label: "खेती की सलाह दो", emoji: "🚜" },
  { label: "स्वास्थ्य योजनाएँ", emoji: "🏥" },
];

// ── Connection error by language ──────────────────────────────────────────────
const ERROR_MSG: Record<SupportedLang, string> = {
  hi: "⚠️ कनेक्शन में समस्या है। कृपया पुनः प्रयास करें।",
  mr: "⚠️ कनेक्शन समस्या आहे. कृपया पुन्हा प्रयत्न करा.",
  en: "⚠️ Connection error. Please try again.",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function GramSahayakChat() {
  const [open, setOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationLang, setConversationLang] = useState<SupportedLang>("hi");

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ── Load from localStorage on mount ───────────────────────────────────────
  useEffect(() => {
    const stored = loadConversations();
    setConversations(stored);

    const hasSeenChat = localStorage.getItem("chat_seen");
    if (!hasSeenChat) {
      setTimeout(() => {
        setOpen(true);
        localStorage.setItem("chat_seen", "true");
      }, 1500);
    }
  }, []);

  // ── Sync messages → conversations in localStorage ─────────────────────────
  useEffect(() => {
    if (!activeConvId || messages.length === 0) return;
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              messages,
              title: makeTitle(
                messages.find((m) => m.role === "user")?.content ?? c.title
              ),
              updatedAt: Date.now(),
            }
          : c
      );
      saveConversations(updated);
      return updated;
    });
  }, [messages, activeConvId]);

  // ── Lock body scroll on mobile when open ──────────────────────────────────
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
      setShowHistory(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [messages, loading]);

  // ── New conversation ──────────────────────────────────────────────────────
  const startNewConversation = useCallback(() => {
    setMessages([]);
    setActiveConvId(null);
    setConversationLang("hi");
    setInput("");
    setShowHistory(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // ── Load existing conversation ────────────────────────────────────────────
  const loadConversation = useCallback((conv: Conversation) => {
    setMessages(conv.messages);
    setActiveConvId(conv.id);
    setShowHistory(false);
    // Infer language from last user message
    const lastUser = [...conv.messages].reverse().find((m) => m.role === "user");
    if (lastUser) setConversationLang(detectLanguage(lastUser.content));
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // ── Delete conversation ────────────────────────────────────────────────────
  const deleteConversation = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setConversations((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        saveConversations(updated);
        return updated;
      });
      if (activeConvId === id) startNewConversation();
    },
    [activeConvId, startNewConversation]
  );

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;

      const detectedLang = detectLanguage(content);
      const isFirstUserMsg = messages.filter((m) => m.role === "user").length === 0;
      const activeLang = isFirstUserMsg ? detectedLang : conversationLang;
      if (isFirstUserMsg) setConversationLang(detectedLang);

      setInput("");

      // Create conversation record if first message
      let convId = activeConvId;
      if (!convId) {
        convId = generateId();
        const newConv: Conversation = {
          id: convId,
          title: makeTitle(content),
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setActiveConvId(convId);
        setConversations((prev) => {
          const updated = [newConv, ...prev];
          saveConversations(updated);
          return updated;
        });
      }

      const newMessages: Message[] = [
        ...messages,
        { role: "user", content, timestamp: Date.now() },
      ];
      setMessages(newMessages);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.map(({ role, content }) => ({ role, content })),
            langInstruction: getLangInstruction(activeLang),
          }),
        });

        const data = await res.json();
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: data.message ?? ERROR_MSG[activeLang],
            timestamp: Date.now(),
          },
        ]);
      } catch {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: ERROR_MSG[activeLang],
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, conversationLang, activeConvId]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const placeholder =
    conversationLang === "mr"
      ? "काहीही विचारा..."
      : conversationLang === "en"
      ? "Ask me anything..."
      : "कुछ भी पूछें...";

  const hasConversations = conversations.length > 0;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 sm:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed z-50 transition-all duration-300 ${
          open
            ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6"
            : "bottom-5 right-5 sm:bottom-6 sm:right-6"
        }`}
      >
        {/* ══════════ CHAT WINDOW ══════════ */}
        <div
          role="dialog"
          aria-label="ग्राम सहायक चैट"
          aria-modal="true"
          className={`flex overflow-hidden bg-white transition-all duration-300 ease-out origin-bottom-right
            ${
              open
                ? "opacity-100 scale-100 pointer-events-auto h-full w-full sm:h-[640px] sm:w-[420px] sm:rounded-3xl sm:shadow-[0_32px_80px_rgba(0,0,0,0.22)] sm:border sm:border-gray-100"
                : "opacity-0 scale-90 pointer-events-none h-0 w-0"
            }`}
          style={{ fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif" }}
        >
          {/* ── HISTORY SIDEBAR ── */}
          <div
            className={`absolute inset-0 sm:relative flex-shrink-0 flex flex-col bg-[#0f4c81] transition-all duration-300 z-10
              ${showHistory ? "w-full sm:w-64 translate-x-0" : "w-0 sm:w-0 -translate-x-full sm:-translate-x-full"}`}
            style={{ overflow: "hidden" }}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <p className="text-white font-bold text-sm tracking-wide">चैट इतिहास</p>
              <button
                onClick={() => setShowHistory(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                aria-label="बंद करें"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* New chat button */}
            <button
              onClick={startNewConversation}
              className="mx-3 mt-3 mb-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors text-white text-sm font-medium border border-white/15"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              नई चैट शुरू करें
            </button>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto py-1 px-2 space-y-0.5" style={{ WebkitOverflowScrolling: "touch" }}>
              {!hasConversations && (
                <p className="text-white/40 text-xs text-center mt-6 px-4 leading-relaxed">
                  अभी कोई पुरानी चैट नहीं है।
                </p>
              )}
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => loadConversation(conv)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all group flex items-start gap-2
                    ${activeConvId === conv.id ? "bg-white/20" : "hover:bg-white/10"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white/50 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate leading-tight">{conv.title}</p>
                    <p className="text-white/40 text-[10px] mt-0.5">{formatRelativeTime(conv.updatedAt)}</p>
                  </div>
                  {/* Delete button */}
                  <button
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-white/20 transition-all flex-shrink-0"
                    aria-label="हटाएं"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </button>
              ))}
            </div>
          </div>

          {/* ── MAIN CHAT PANEL ── */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* HEADER */}
            <div
              className="relative flex-shrink-0 flex items-center gap-3 px-4 py-4 sm:py-3.5 text-white overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0f4c81 0%, #1a6fb5 55%, #2196d3 100%)" }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

              {/* History toggle */}
              <button
                type="button"
                onClick={() => setShowHistory((s) => !s)}
                title="चैट इतिहास"
                className="flex-shrink-0 p-2 rounded-xl hover:bg-white/15 active:bg-white/25 transition-colors text-white/80 hover:text-white relative"
                aria-label="चैट इतिहास"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {hasConversations && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
                )}
              </button>

              {/* Avatar + Title */}
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="ग्राम सहायक"
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      if (img.parentElement) img.parentElement.textContent = "🏛️";
                    }}
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f4c81]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">ग्राम सहायक</p>
                <p className="text-blue-200 text-[10px] font-medium mt-0.5 truncate">
                  Gidhadi Gram Connect • ऑनलाइन
                </p>
              </div>

              {/* New chat + close */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={startNewConversation}
                  title="नई चैट"
                  className="p-2 rounded-xl hover:bg-white/15 active:bg-white/25 transition-colors text-white/80 hover:text-white"
                  aria-label="नई चैट"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  title="बंद करें"
                  className="p-2 rounded-xl hover:bg-white/15 active:bg-white/25 transition-colors"
                  aria-label="चैट बंद करें"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 space-y-3"
              style={{
                background: "linear-gradient(180deg, #f0f7ff 0%, #fafcff 60%, #ffffff 100%)",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Empty state */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full py-4 space-y-4 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md"
                    style={{ background: "linear-gradient(135deg, #e8f4ff, #c7e4ff)" }}
                  >
                    🏛️
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-800 font-bold text-base">ग्राम सहायक</p>
                    <p className="text-gray-500 text-xs leading-relaxed max-w-[220px] mx-auto">
                      कुछ भी पूछें — सरकारी योजना, खेती, स्वास्थ्य, या कोई भी सवाल!
                    </p>
                  </div>
                  {/* Quick prompts grid */}
                  <div className="grid grid-cols-2 gap-1.5 w-full max-w-[300px]">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q.label}
                        type="button"
                        onClick={() => sendMessage(q.label)}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white border border-blue-100 text-blue-700 text-xs font-medium shadow-sm hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all text-left"
                      >
                        <span className="text-sm flex-shrink-0">{q.emoji}</span>
                        <span className="leading-tight line-clamp-2">{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bubbles */}
              {messages.map((m, i) => (
                <div
                  key={`${m.timestamp}-${i}`}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-[#0f4c81] to-[#2196d3] flex items-center justify-center text-xs shadow-md mb-0.5 select-none">
                      🏛️
                    </div>
                  )}
                  <div
                    className={`relative px-3.5 py-2.5 text-sm leading-relaxed max-w-[82%] whitespace-pre-wrap break-words
                      ${m.role === "user"
                        ? "text-white rounded-3xl rounded-br-lg shadow-md"
                        : "text-gray-800 rounded-3xl rounded-bl-lg bg-white shadow-sm border border-gray-100"
                      }`}
                    style={
                      m.role === "user"
                        ? { background: "linear-gradient(135deg, #1565c0, #1e88e5)" }
                        : {}
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-[#0f4c81] to-[#2196d3] flex items-center justify-center text-xs shadow-md select-none">
                    🏛️
                  </div>
                  <div className="bg-white border border-gray-100 px-4 py-3.5 rounded-3xl rounded-bl-lg flex gap-1.5 shadow-sm">
                    {[0, 160, 320].map((d) => (
                      <span
                        key={d}
                        className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay: `${d}ms`, animationDuration: "1s" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} className="h-1" />
            </div>

            {/* INPUT AREA */}
            <div
              className="flex-shrink-0 px-3 py-3 bg-white border-t border-gray-100"
              style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
            >
              {/* Quick chips (after first message) */}
              {messages.length > 0 && (
                <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q.label}
                      type="button"
                      onClick={() => sendMessage(q.label)}
                      className="flex-shrink-0 text-xs px-2.5 py-1.5 rounded-full border border-blue-100 text-blue-700 bg-blue-50 hover:bg-blue-100 active:scale-95 transition-all whitespace-nowrap font-medium"
                    >
                      {q.emoji} {q.label.split(" ").slice(0, 2).join(" ")}
                    </button>
                  ))}
                </div>
              )}

              {/* Text input */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-1 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-300 transition-all shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 text-sm bg-transparent outline-none py-2.5 text-gray-800 placeholder-gray-400 min-w-0"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  inputMode="text"
                  enterKeyHint="send"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  aria-label="भेजें"
                  className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200
                    ${input.trim() && !loading
                      ? "bg-gradient-to-br from-[#1565c0] to-[#2196d3] shadow-md active:scale-90"
                      : "bg-gray-200 cursor-not-allowed"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-3.5 h-3.5 ${input.trim() && !loading ? "text-white" : "text-gray-400"}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </div>

              <p className="text-center text-gray-400 text-[10px] mt-1.5 leading-none">
                Powered by{" "}
                <span className="font-semibold text-blue-400">Gidhadi Gram Connect</span>
              </p>
            </div>
          </div>
        </div>

        {/* ══════════ FAB ══════════ */}
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="ग्राम सहायक खोलें"
            className="group relative w-16 h-16 rounded-2xl text-white flex items-center justify-center shadow-2xl active:scale-90 hover:scale-105 transition-all duration-200 border-2 border-white/30"
            style={{
              background: "linear-gradient(135deg, #0f4c81 0%, #1a6fb5 55%, #2196d3 100%)",
              boxShadow: "0 8px 32px rgba(21, 101, 192, 0.45)",
            }}
          >
            <span className="absolute inset-0 rounded-2xl animate-ping bg-blue-400 opacity-20 pointer-events-none" />
            {hasConversations && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f4c81] z-10" />
            )}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              ग्राम सहायक
            </span>
          </button>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </>
  );
}