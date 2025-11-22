"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatContainer() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Medical Assistant. How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  async function sendMessage(msg: string) {
    const userMsg = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: msg, history: messages }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Failed to fetch response." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col rounded-2xl border bg-background/60 backdrop-blur-xl shadow-xl">
      {/* Chat messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role as any} content={m.content} />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Chat input */}
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
