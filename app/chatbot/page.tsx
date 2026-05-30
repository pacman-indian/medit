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

const botResponses: Record<string, string> = {
  default: "That's a great question! Based on your profile and fitness goals, I'd recommend starting with a balanced approach. Would you like me to create a personalized plan?",
  "workout plan": "I'll create a customized 5-day workout plan for you:\n\n**Day 1 – Push (Chest, Shoulders, Triceps)**\n• Bench Press: 4×8\n• Overhead Press: 3×10\n• Incline Dumbbell Press: 3×12\n• Tricep Dips: 3×12\n\n**Day 2 – Pull (Back, Biceps)**\n• Deadlifts: 4×5\n• Pull-ups: 3×8\n• Barbell Rows: 3×10\n• Bicep Curls: 3×12\n\n**Day 3 – Rest/Active Recovery**\n\n**Day 4 – Legs**\n• Squats: 4×8\n• Romanian Deadlifts: 3×10\n• Leg Press: 3×12\n• Calf Raises: 4×15\n\n**Day 5 – Full Body Cardio + Core**\n• 20 min HIIT\n• Plank: 3×60s\n• Russian Twists: 3×20\n\nWant me to adjust this based on your available equipment?",
  "weight loss": "For weight loss, here's a science-backed approach:\n\n**Nutrition (80% of the battle):**\n• Create a 300-500 calorie deficit daily\n• Prioritize protein: 1.6-2g per kg body weight\n• Eat whole foods, minimize processed carbs\n\n**Exercise:**\n• 3-4 days of strength training (preserves muscle)\n• 2-3 days of cardio (HIIT is most effective)\n• 7,000-10,000 steps daily\n\n**Key habits:**\n• Sleep 7-9 hours (crucial for fat loss)\n• Drink 3L+ water daily\n• Track food in the medIt nutrition tracker\n\nBased on your current stats, you could safely lose 0.5-1kg per week. Want me to create a meal plan?",
  "cardio": "Great goal! Here's how to systematically improve your cardiovascular fitness:\n\n**Week 1-2: Base Building**\n• 20-30 min moderate pace, 3x/week\n• Target: 60-70% max heart rate\n\n**Week 3-4: Introduce Intervals**\n• 5 min warmup\n• 8×1 min hard / 2 min easy\n• 5 min cooldown\n\n**Week 5-6: Increase Volume**\n• One long slow run (40-50 min)\n• Two interval sessions\n\n**Week 7+: Mix Modalities**\n• Cycling, swimming, rowing — reduces injury risk\n\nYour Strava data shows you've been averaging 3.2km per session. This plan will get you to 8km in 8 weeks!",
  "beginner": "Welcome to your fitness journey! Here's the perfect beginner routine:\n\n**3 Days/Week (Mon, Wed, Fri)**\n\n**Full Body Circuit (40 min):**\n1. Bodyweight Squats: 3×15\n2. Push-ups (modified if needed): 3×10\n3. Dumbbell Rows: 3×12 each arm\n4. Lunges: 3×10 each leg\n5. Plank: 3×30s\n6. Glute Bridges: 3×15\n\n**Key tips for beginners:**\n• Focus on form over weight\n• Rest 60-90s between sets\n• Progressive overload: add reps before weight\n• Track sessions in medIt to see progress\n\nAfter 4 weeks, we'll advance you to a 4-day push/pull split. You've got this! 💪",
};

function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("workout") || lower.includes("plan") || lower.includes("routine")) {
    return botResponses["workout plan"];
  }
  if (lower.includes("weight loss") || lower.includes("diet") || lower.includes("lose")) {
    return botResponses["weight loss"];
  }
  if (lower.includes("cardio") || lower.includes("running") || lower.includes("endurance")) {
    return botResponses["cardio"];
  }
  if (lower.includes("beginner") || lower.includes("start")) {
    return botResponses["beginner"];
  }
  return botResponses["default"];
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hey! I'm your medIt AI Coach 👋\n\nI'm trained on sports science, nutrition, and fitness data to give you personalized guidance. I also have access to your Strava activity data and health records.\n\nWhat would you like help with today?",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getBotResponse(text),
        time: formatTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  }

  function clearChat() {
    setMessages([
      {
        id: 1,
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
              <p className="text-[#9CA3AF] text-sm">Powered by medIt AI · Synced with your health data</p>
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
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-[#34D399] to-[#10B981]"
                    : "bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Sparkles className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Bubble */}
              <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#8B5CF6] text-white rounded-tr-sm"
                      : "bg-[#1F2937] text-[#E5E7EB] border border-[#374151] rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-[#6B7280] px-1">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#34D399] to-[#10B981] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1F2937] border border-[#374151]">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] inline-block"
                      style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }}
                    />
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
          {/* Quick replies */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickReplies.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => sendMessage(label)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F2937] border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6]/50 text-xs transition-all"
              >
                <Icon className="w-3 h-3 text-[#8B5CF6]" />
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
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
