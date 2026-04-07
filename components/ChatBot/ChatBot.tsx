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

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Auto open on first visit
  useEffect(() => {
    const hasSeenChat = localStorage.getItem("chat_seen");

    if (!hasSeenChat) {
      setTimeout(() => {
        setOpen(true);
        setMessages([
          {
            role: "assistant",
            content: "🙏 नमस्ते! मैं ग्राम सहायक हूँ। आप सरकारी योजना, ग्राम पंचायत या शिकायत से जुड़ा सवाल पूछ सकते हैं।",
          },
        ]);
        localStorage.setItem("chat_seen", "true");
      }, 1500);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
      // Prevent body scroll when chat is open on mobile
      if (window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
      setMessages([...newMessages, { role: "assistant", content: data.message ?? "माफ करें, कुछ गड़बड़ हुई।" }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ कनेक्शन में समस्या है। कृपया पुनः प्रयास करें।" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ${open ? "inset-0 sm:inset-auto sm:bottom-5 sm:right-5" : "bottom-5 right-5"}`}>
      
      {/* Chat Window */}
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right shadow-2xl bg-white
        ${open ? "opacity-100 scale-100 h-full w-full sm:h-[32rem] sm:w-[24rem] sm:rounded-2xl border border-blue-100" : "opacity-0 scale-95 pointer-events-none h-0 w-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 sm:py-3 bg-gradient-to-r from-[#1E5F8C] to-[#4FA3D1]">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30 text-xl">
              <img src="/logo.png" alt="logo" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1E5F8C]" />
          </div>

          <div className="flex-1">
            <p className="text-white text-sm font-bold">ग्राम सहायक</p>
            <p className="text-blue-100 text-xs">Gidhadi Gram Connect</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-blue-50 to-white">
          {messages.length === 0 && (
            <div className="text-center py-10 space-y-4">
              <div className="text-4xl animate-bounce">🙏</div>
              <p className="text-sm font-semibold text-gray-600">नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p>
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => sendMessage(q.label)}
                    className="text-xs px-4 py-2 rounded-full border border-blue-200 text-blue-700 bg-white hover:bg-blue-50 shadow-sm active:scale-95 transition-transform"
                  >
                    {q.emoji} {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={`${i}-${m.role}`} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[85%] ${
                m.role === "user" 
                ? "bg-blue-600 text-white rounded-br-none shadow-md" 
                : "bg-white border border-blue-100 text-gray-800 rounded-bl-none shadow-sm"
              }`}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-blue-100 px-4 py-3 rounded-2xl flex gap-1.5 shadow-sm">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 pb-safe">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <input
              ref={inputRef}
              className="flex-1 text-base sm:text-sm bg-transparent outline-none py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="यहाँ लिखें..."
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="text-blue-600 font-bold p-1 disabled:opacity-30"
            >
              🚀
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button (Hidden when open on mobile to save space) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-16 h-16 rounded-full text-white text-3xl flex items-center justify-center bg-gradient-to-br from-[#1E5F8C] to-[#4FA3D1] shadow-2xl active:scale-90 transition-transform border-4 border-white"
        >
          💬
        </button>
      )}
    </div>
  );
}