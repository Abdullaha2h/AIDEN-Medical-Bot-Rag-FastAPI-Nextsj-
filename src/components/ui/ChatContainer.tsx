"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import {
  Stethoscope,
  Pill,
  Salad,
  Ambulance,
  FileText,
  MessageCircle,
  Plus,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // ⭐ Updated sendMessage supports hidden messages
  async function sendMessage(
    msg: string,
    systemPrompt?: string,
    hideInUI: boolean = false
  ) {
    if (!conversationStarted) setConversationStarted(true);

    // push to UI only if NOT hidden
    if (msg && !hideInUI) {
      setMessages((prev) => [...prev, { role: "user", content: msg }]);
    }

    setIsTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg || "",
          history: messages,
          systemPrompt,
        }),
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

  const mainButtons = [
    {
      label: "Symptoms Checker",
      icon: <Stethoscope className="w-5 h-5" />,
      prompt:
        "I want to check my symptoms. Ask me my symptoms one by one and guide me.",
    },
    {
      label: "Medicine Help",
      icon: <Pill className="w-5 h-5" />,
      prompt:
        "I want help with a medicine. Ask me medicine name, dose, and what issue I want to treat.",
    },
    {
      label: "Diet & Nutrition",
      icon: <Salad className="w-5 h-5" />,
      prompt:
        "I want a personalized diet plan. Ask my age, weight, height, health conditions, and goal.",
    },
    {
      label: "First Aid Help",
      icon: <Ambulance className="w-5 h-5" />,
      prompt:
        "I need first aid help. Ask me what happened and guide me step by step safely.",
    },
  ];

  const optionalButtons = [
    {
      label: "Lab Report",
      icon: <FileText className="w-5 h-5" />,
      prompt: "Help me understand a lab report. Ask me to paste the values.",
    },
    {
      label: "Mental Health",
      icon: <MessageCircle className="w-5 h-5" />,
      prompt:
        "I need mental health support. Ask me what I'm feeling and guide empathetically.",
    },
  ];

  return (
    <div className="max-w-3xl  mx-auto h-[80vh] flex flex-col rounded-2xl border bg-background/60 backdrop-blur-xl shadow-xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Welcome & Buttons */}
        {!conversationStarted && (
          <div className="text-center mb-6 pt-20">
            <h1 className="text-3xl font-bold text-foreground">Aiden</h1>
            <p className="text-muted-foreground mt-1">
              How can I help you today?
            </p>

            {/* Main buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {mainButtons.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(btn.prompt, undefined, true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border bg-card hover:bg-accent transition"
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                </button>
              ))}

              {/* Show More Options */}
              {!showMoreOptions && optionalButtons.length > 0 && (
                <button
                  onClick={() => setShowMoreOptions(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border bg-card hover:bg-accent transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>More Options</span>
                </button>
              )}
            </div>

            {/* Extra options */}
            {showMoreOptions && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {optionalButtons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(btn.prompt, undefined, true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border bg-card hover:bg-accent transition"
                  >
                    {btn.icon}
                    <span>{btn.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat messages */}
        {conversationStarted &&
          messages.map((m, i) => (
            <ChatMessage key={i} role={m.role as any} content={m.content} />
          ))}

        {isTyping && <TypingIndicator />}
      </div>

      <ChatInput onSend={(msg) => sendMessage(msg)} />
    </div>
  );
}
