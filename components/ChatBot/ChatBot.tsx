"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  { label: "PM-KISAN", emoji: "🌾" },
  { label: "सरकारी योजनाएँ", emoji: "📋" },
  { label: "शिकायत दर्ज करें", emoji: "📝" },
  { label: "ग्राम पंचायत", emoji: "🏘️" },
];

export default function GramSahayakChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const hasSeenChat = localStorage.getItem("chat_seen");
    if (!hasSeenChat) {
      setTimeout(() => {
        setOpen(true);
        setMessages([
          {
            role: "assistant",
            content:
              "🙏 नमस्ते! मैं ग्राम सहायक हूँ। आप सरकारी योजना, ग्राम पंचायत या शिकायत से जुड़ा सवाल पूछ सकते हैं।",
          },
        ]);
        localStorage.setItem("chat_seen", "true");
      }, 1500);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      if (isMobile) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open, isMobile]);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.message ?? "माफ करें, कुछ गड़बड़ हुई।",
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ कनेक्शन में समस्या है। कृपया पुनः प्रयास करें।",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Backdrop (mobile only) ── */}
      {open && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`
          fixed z-50 transition-all duration-300
          ${open
            ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6"
            : "bottom-5 right-5 sm:bottom-6 sm:right-6"
          }
        `}
      >
        {/* ══════════════ CHAT WINDOW ══════════════ */}
        <div
          role="dialog"
          aria-label="ग्राम सहायक चैट"
          aria-modal="true"
          className={`
            flex flex-col overflow-hidden bg-white
            transition-all duration-300 ease-out origin-bottom-right
            ${open
              ? "opacity-100 scale-100 pointer-events-auto h-full w-full sm:h-[600px] sm:w-[400px] sm:rounded-3xl sm:shadow-[0_32px_80px_rgba(0,0,0,0.22)] sm:border sm:border-gray-100"
              : "opacity-0 scale-90 pointer-events-none h-0 w-0"
            }
          `}
          style={{ fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif" }}
        >
          {/* ── HEADER ── */}
          <div
            className="relative flex-shrink-0 flex items-center gap-3 px-4 py-4 sm:py-3.5 text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f4c81 0%, #1a6fb5 55%, #2196d3 100%)",
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center overflow-hidden shadow-inner">
                <img
                  src="/logo.png"
                  alt="ग्राम सहायक"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.innerText = "🏛️";
                  }}
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0f4c81] shadow" />
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-base leading-tight tracking-wide">ग्राम सहायक</p>
              <p className="text-blue-200 text-xs font-medium mt-0.5 truncate">
                Gidhadi Gram Connect • ऑनलाइन
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setInput("");
                }}
                title="चैट साफ करें"
                className="p-2 rounded-xl hover:bg-white/15 active:bg-white/25 transition-colors text-white/80 hover:text-white"
                aria-label="चैट साफ करें"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

          {/* ── MESSAGES ── */}
          <div
            ref={messagesRef}
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-4"
            style={{
              background: "linear-gradient(180deg, #f0f7ff 0%, #fafcff 60%, #ffffff 100%)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Empty state */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full py-6 space-y-5 text-center">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg"
                  style={{ background: "linear-gradient(135deg, #e8f4ff, #c7e4ff)" }}
                >
                  🙏
                </div>
                <div className="space-y-1.5">
                  <p className="text-gray-800 font-bold text-base">नमस्ते! कैसे मदद करूँ?</p>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[240px] mx-auto">
                    नीचे दिए विषयों में से कोई चुनें या अपना सवाल लिखें।
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full max-w-[280px]">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q.label}
                      type="button"
                      onClick={() => sendMessage(q.label)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-white border border-blue-100 text-blue-700 text-sm font-medium shadow-sm hover:bg-blue-50 hover:border-blue-300 active:scale-95 transition-all text-left"
                    >
                      <span className="text-base flex-shrink-0">{q.emoji}</span>
                      <span className="leading-tight truncate">{q.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((m, i) => (
              <div
                key={`${i}-${m.role}`}
                className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Bot avatar */}
                {m.role === "assistant" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-[#0f4c81] to-[#2196d3] flex items-center justify-center text-xs shadow-md mb-0.5">
                    🏛️
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`
                    relative px-4 py-3 text-sm leading-relaxed max-w-[78%]
                    ${m.role === "user"
                      ? "text-white rounded-3xl rounded-br-lg shadow-md"
                      : "text-gray-800 rounded-3xl rounded-bl-lg bg-white shadow-sm border border-gray-100"
                    }
                  `}
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
                <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-[#0f4c81] to-[#2196d3] flex items-center justify-center text-xs shadow-md">
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

          {/* ── INPUT AREA ── */}
          <div
            className="flex-shrink-0 px-3 py-3 bg-white border-t border-gray-100"
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
          >
            {/* Quick prompts row (visible after first message) */}
            {messages.length > 0 && (
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => sendMessage(q.label)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-blue-100 text-blue-700 bg-blue-50 hover:bg-blue-100 active:scale-95 transition-all whitespace-nowrap font-medium"
                  >
                    {q.emoji} {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Text field */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-1 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-300 transition-all shadow-sm">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 text-sm sm:text-sm bg-transparent outline-none py-2.5 text-gray-800 placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="यहाँ लिखें..."
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                inputMode="text"
                enterKeyHint="send"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                aria-label="भेजें"
                className={`
                  flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                  transition-all duration-200
                  ${input.trim() && !loading
                    ? "bg-gradient-to-br from-[#1565c0] to-[#2196d3] shadow-md active:scale-90 hover:shadow-lg"
                    : "bg-gray-200 cursor-not-allowed"
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 transition-colors ${input.trim() && !loading ? "text-white" : "text-gray-400"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>

            {/* Footer branding */}
            <p className="text-center text-gray-400 text-[10px] mt-2 leading-none">
              Powered by <span className="font-semibold text-blue-400">Gidhadi Gram Connect</span>
            </p>
          </div>
        </div>

        {/* ══════════════ FAB BUTTON ══════════════ */}
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
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-2xl animate-ping bg-blue-400 opacity-20 pointer-events-none" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                clipRule="evenodd"
              />
            </svg>
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              ग्राम सहायक
            </span>
          </button>
        )}
      </div>

      {/* Hide scrollbar utility */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}