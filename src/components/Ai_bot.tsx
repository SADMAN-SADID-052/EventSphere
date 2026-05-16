"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function Ai_bot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hi! I'm EventSphere AI. Ask me anything about events in Bangladesh! 🎉",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: data.data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: "Please login first to use the AI chatbot! 🔐" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong. Please try again!" },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-10 right-7 w-80 sm:w-96 z-50 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ background: "#13131a" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b border-white/5"
            style={{ background: "#605DFF15" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
                style={{ background: "#605DFF25" }}
              >
                🤖
              </div>
              <div>
                <p className="text-white font-bold text-sm">EventSphere AI</p>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.role === "user" ? "#605DFF" : "rgba(255,255,255,0.05)",
                    color: "white",
                    borderRadius: msg.role === "user"
                      ? "1rem 1rem 0.25rem 1rem"
                      : "1rem 1rem 1rem 0.25rem",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about events..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50"
                style={{ background: "#605DFF" }}
              >
                ➤
              </button>
            </div>

            {/* Quick Questions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Music events in Dhaka?",
                "Free events?",
                "Tech conferences?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-400 hover:border-[#605DFF] hover:text-[#605DFF] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all hover:scale-110 z-50"
        style={{ background: open ? "#E85D24" : "#605DFF" }}
      >
        <span className="text-2xl">{open ? "X" : "🤖"}</span>
      </button>
    </>
  );
}