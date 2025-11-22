import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
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
      { reply: "❌ Backend not reachable. Make sure FastAPI is running." },
      { status: 500 }
    );
  }
}
