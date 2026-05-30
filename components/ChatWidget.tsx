"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Brain, Send, X, Minus, User, Sparkles, RotateCcw,
  Pencil, Check, Dumbbell, Apple, Heart, Zap
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Message = { id: number; role: "user" | "assistant"; text: string; time: string };

const quickReplies = [
  { label: "Create workout plan", icon: Dumbbell },
  { label: "Best diet for weight loss", icon: Apple },
  { label: "How to improve cardio?", icon: Heart },
  { label: "Beginner gym routine", icon: Zap },
];

const botResponses: Record<string, string> = {
  default: "That's a great question! Based on your profile and fitness goals, I'd recommend starting with a balanced approach. Would you like me to create a personalized plan?",
  "workout plan": "Here's a customised 5-day plan:\n\n**Day 1 – Push**\n• Bench Press 4×8\n• Overhead Press 3×10\n• Tricep Dips 3×12\n\n**Day 2 – Pull**\n• Deadlifts 4×5\n• Pull-ups 3×8\n• Bicep Curls 3×12\n\n**Day 3 – Rest**\n\n**Day 4 – Legs**\n• Squats 4×8 • Leg Press 3×12\n\n**Day 5 – Cardio + Core**\n• 20 min HIIT • Plank 3×60s\n\nWant me to adjust for your equipment?",
  "weight loss": "For weight loss:\n\n**Nutrition (80% of the battle)**\n• 300–500 cal deficit daily\n• Protein: 1.6–2g/kg body weight\n\n**Exercise**\n• 3–4 days strength training\n• 2–3 days HIIT cardio\n• 7,000–10,000 steps/day\n\n**Key habits**\n• Sleep 7–9 hours\n• Drink 3L+ water daily\n\nWant a personalised meal plan?",
  cardio: "To improve cardio:\n\n**Week 1–2:** 20–30 min moderate, 3×/week\n**Week 3–4:** Intervals — 8×1 min hard / 2 min easy\n**Week 5–6:** One long slow run (40–50 min) + two interval sessions\n**Week 7+:** Mix cycling, swimming, rowing\n\nSyncing with your Strava data to personalise further!",
  beginner: "Perfect beginner routine:\n\n**3 Days/Week (Mon, Wed, Fri)**\n1. Bodyweight Squats 3×15\n2. Push-ups 3×10\n3. Dumbbell Rows 3×12\n4. Lunges 3×10\n5. Plank 3×30s\n6. Glute Bridges 3×15\n\nFocus on form, rest 60–90s between sets. After 4 weeks we'll progress you to a 4-day split. You've got this!",
};

function getBotResponse(msg: string): string {
  const l = msg.toLowerCase();
  if (l.includes("workout") || l.includes("plan") || l.includes("routine")) return botResponses["workout plan"];
  if (l.includes("weight loss") || l.includes("diet") || l.includes("lose")) return botResponses["weight loss"];
  if (l.includes("cardio") || l.includes("running") || l.includes("endurance")) return botResponses.cardio;
  if (l.includes("beginner") || l.includes("start")) return botResponses.beginner;
  return botResponses.default;
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const DEFAULT_BOT_NAME = "medIt AI Coach";
const STORAGE_KEY_NAME = "medit_coach_name";

export default function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);

  const [botName, setBotName] = useState(DEFAULT_BOT_NAME);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(DEFAULT_BOT_NAME);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Load persisted bot name
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY_NAME);
    if (stored) { setBotName(stored); setNameInput(stored); }
  }, []);

  // Greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting = user
        ? `Hey ${user.name.split(" ")[0]}! I'm your ${botName} 👋\n\nI have access to your health records and Strava data. What can I help you with today?`
        : `Hey! I'm your ${botName} 👋\n\nAsk me anything about workouts, nutrition, or recovery!`;
      setMessages([{ id: 1, role: "assistant", text: greeting, time: formatTime() }]);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function saveName() {
    const name = nameInput.trim() || DEFAULT_BOT_NAME;
    setBotName(name);
    setNameInput(name);
    localStorage.setItem(STORAGE_KEY_NAME, name);
    setEditingName(false);
  }

  function startEditing() {
    setEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 50);
  }

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now(), role: "user", text, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: getBotResponse(text), time: formatTime() },
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 700);
  }, [isTyping]);

  function clearChat() {
    setMessages([{
      id: Date.now(), role: "assistant",
      text: `Chat cleared! How can I help you today, ${user?.name.split(" ")[0] ?? "there"}?`,
      time: formatTime(),
    }]);
  }

  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimised(false); }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center shadow-2xl shadow-[#34D399]/40 hover:scale-110 transition-transform pulse-glow"
          aria-label="Open AI Coach"
        >
          <Brain className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-[#111827] border border-[#374151] rounded-2xl shadow-2xl flex flex-col transition-all duration-200 ${minimised ? "h-14" : "h-[520px]"}`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#374151] flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              {editingName ? (
                <div className="flex items-center gap-1">
                  <input
                    ref={nameInputRef}
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveName(); if (e.key === "Escape") setEditingName(false); }}
                    maxLength={30}
                    className="flex-1 bg-[#1F2937] border border-[#8B5CF6] rounded px-2 py-0.5 text-sm text-[#F9FAFB] focus:outline-none"
                  />
                  <button onClick={saveName} className="p-0.5 rounded text-[#34D399] hover:bg-[#374151] transition-colors">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-[#F9FAFB] truncate">{botName}</span>
                  <button
                    onClick={startEditing}
                    className="p-0.5 rounded text-[#6B7280] hover:text-[#A78BFA] transition-colors flex-shrink-0"
                    title="Rename coach"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] inline-block" />
                <span className="text-[10px] text-[#6B7280]">Online</span>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={clearChat} className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#1F2937] transition-all" title="Clear chat">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setMinimised(!minimised)} className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#1F2937] transition-all" title={minimised ? "Expand" : "Minimise"}>
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#1F2937] transition-all" title="Close">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white ${msg.role === "assistant" ? "bg-gradient-to-br from-[#34D399] to-[#10B981]" : "bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]"}`}>
                      {msg.role === "assistant" ? <Sparkles className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </div>
                    <div className={`max-w-[80%] flex flex-col gap-0.5 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div className={`px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-[#8B5CF6] text-white rounded-tr-sm" : "bg-[#1F2937] text-[#E5E7EB] border border-[#374151] rounded-tl-sm"}`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-[#4B5563] px-1">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <div className="px-3 py-2 rounded-xl rounded-tl-sm bg-[#1F2937] border border-[#374151]">
                      <div className="flex gap-1 items-center h-3">
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

              {/* Quick replies */}
              <div className="px-3 pt-2 flex gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
                {quickReplies.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => sendMessage(label)}
                    disabled={isTyping}
                    className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1F2937] border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6]/50 text-[10px] transition-all disabled:opacity-40"
                  >
                    <Icon className="w-2.5 h-2.5 text-[#8B5CF6]" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-3 py-3 flex gap-2 flex-shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                  placeholder="Ask about workouts, nutrition…"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#1F2937] border border-[#374151] text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#8B5CF6] text-xs transition-colors"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-9 h-9 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
