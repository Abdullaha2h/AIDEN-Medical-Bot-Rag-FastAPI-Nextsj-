import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await fetch("https://aiden-medical-bot-backend-python.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json({ reply: data.reply });
  } catch (error) {
    console.error("FastAPI connection error:", error);

    return NextResponse.json(
      { reply: "❌ Server not reachable. Try again in some time." },
      { status: 500 }
    );
  }
}
