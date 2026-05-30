import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are medIt AI Coach, a knowledgeable and encouraging health and fitness assistant built into the medIt platform. You specialise in workouts, nutrition, recovery, and overall wellness.

Guidelines:
- Keep responses concise and practical (under 250 words unless a detailed plan is requested)
- Use bullet points or short numbered lists for structured advice
- Be motivating and supportive
- When creating workout or meal plans, format them clearly
- Reference medIt features (nutrition tracker, gym check-in, health records) where relevant
- If asked something outside health/fitness, politely redirect to your area of expertise`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "XAI_API_KEY is not configured" }, { status: 500 });
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages array is required" }, { status: 400 });
  }

  const grokRes = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-3-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 800,
      temperature: 0.7,
    }),
  });

  if (!grokRes.ok) {
    const err = await grokRes.text();
    console.error("Grok API error:", grokRes.status, err);
    return NextResponse.json({ error: "Upstream API error" }, { status: 502 });
  }

  const data = await grokRes.json();
  const reply = data.choices?.[0]?.message?.content ?? "";
  return NextResponse.json({ reply });
}
