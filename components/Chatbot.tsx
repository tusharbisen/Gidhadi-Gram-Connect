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
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput("");

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content },
    ];

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

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/* Chat Window */}
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        w-[22rem] sm:w-[26rem] rounded-2xl border border-blue-100 bg-white/95 backdrop-blur-lg shadow-2xl`}
      >

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#1E5F8C] to-[#4FA3D1]">
          <div className="relative">
            <img
              src="/logo.png"
              alt="logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
          </div>

          <div className="flex-1">
            <p className="text-white text-sm font-semibold">ग्राम सहायक</p>
            <p className="text-blue-100 text-xs">Gidhadi Gram Connect</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gradient-to-b from-blue-50 to-white">

          {messages.length === 0 && (
            <div className="text-center space-y-3">
              <p className="text-2xl">🙏</p>
              <p className="text-sm font-semibold">नमस्ते! मैं ग्राम सहायक हूँ।</p>

              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => sendMessage(q.label)}
                    className="text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 bg-white hover:bg-blue-50"
                  >
                    {q.emoji} {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={`${i}-${m.role}`}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[75%]
                ${m.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white border text-gray-800 rounded-bl-sm shadow-sm"}`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center">
              <div className="bg-white border px-4 py-2 rounded-2xl flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2 border-t bg-white">
          <input
            ref={inputRef}
            className="flex-1 text-sm outline-none px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="कुछ पूछें..."
          />

          <button
            type="button"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg disabled:opacity-40"
          >
            ↑
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full text-white text-2xl flex items-center justify-center bg-gradient-to-r from-[#1E5F8C] to-[#4FA3D1] shadow-xl"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}