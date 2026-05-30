"use client";
import { useState, useRef, useEffect } from "react";
import { Brain, Send, User, Zap, Dumbbell, Apple, Heart, RotateCcw, Sparkles } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
};

const quickReplies = [
  { label: "Create workout plan", icon: Dumbbell },
  { label: "Best diet for weight loss", icon: Apple },
  { label: "How to improve cardio?", icon: Heart },
  { label: "Beginner gym routine", icon: Zap },
];

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hey! I'm your medIt AI Coach 👋\n\nI'm powered by Grok and trained on sports science, nutrition, and fitness data to give you personalised guidance.\n\nWhat would you like help with today?",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now(), role: "user", text, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const history = [...messages, userMsg].map(({ role, text }) => ({ role, content: text }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      const reply = res.ok
        ? (data.reply ?? "Sorry, I didn't get a response. Please try again.")
        : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", text: reply, time: formatTime() }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1, role: "assistant",
        text: "Network error — please check your connection and try again.",
        time: formatTime(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }

  function clearChat() {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text: "Chat cleared! How can I help you with your fitness journey today?",
        time: formatTime(),
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col">
      {/* Header */}
      <div className="bg-[#0D1117] border-b border-[#374151] py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center pulse-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">medIt AI Coach</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] inline-block" />
                  Online
                </span>
              </div>
              <p className="text-[#9CA3AF] text-sm">Powered by Grok · Synced with your health data</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-all"
            title="Clear chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "assistant" ? "bg-gradient-to-br from-[#34D399] to-[#10B981]" : "bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]"}`}>
                {msg.role === "assistant" ? <Sparkles className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
              </div>
              <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-[#8B5CF6] text-white rounded-tr-sm" : "bg-[#1F2937] text-[#E5E7EB] border border-[#374151] rounded-tl-sm"}`}>
                  {msg.text}
                </div>
                <span className="text-xs text-[#6B7280] px-1">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1F2937] border border-[#374151]">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] inline-block"
                      style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick replies + Input */}
      <div className="sticky bottom-0 bg-[#111827] border-t border-[#374151] py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickReplies.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => sendMessage(label)}
                disabled={isTyping}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F2937] border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6]/50 text-xs transition-all disabled:opacity-40"
              >
                <Icon className="w-3 h-3 text-[#8B5CF6]" />
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              placeholder="Ask about workouts, nutrition, recovery..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#1F2937] border border-[#374151] text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6] transition-colors text-sm"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/25"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
