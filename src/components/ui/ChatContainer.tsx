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
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // If typing, scroll to bottom to show typing indicator
    if (isTyping) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      return;
    }

    const lastMsg = messages[messages.length - 1];
    if (!lastMsg) return;

    if (lastMsg.role === "user") {
      // User sent a message, scroll to bottom
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      // Assistant replied. If it's a long message, we want to see the start.
      // 'block: "start"' attempts to align the top of the element with the top of the container.
      // If the message is short, it will just be visible.
      // If it's long, this ensures the user starts reading from the top.
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
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
    <div className="max-w-3xl mx-auto h-full flex flex-col rounded-2xl border bg-background/60 backdrop-blur-xl shadow-xl overflow-hidden relative">



      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth">
        {/* Welcome & Buttons */}
        {!conversationStarted && (
          <div className="text-center mb-6 pt-10 md:pt-20">
            <h1 className="text-3xl font-bold text-foreground">Aiden</h1>
            <p className="text-muted-foreground mt-1 px-4">
              How can I help you today?
            </p>

            {/* Main buttons */}
            <div className="grid grid-cols-2 gap-3 mt-8 px-2">
              {mainButtons.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(btn.prompt, undefined, true)}
                  className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm rounded-xl border bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group text-left shadow-sm hover:shadow-md"
                >
                  <div className="p-1.5 md:p-2 rounded-lg bg-background group-hover:bg-primary/20 transition-colors shrink-0">
                    {btn.icon}
                  </div>
                  <span className="font-medium leading-tight">{btn.label}</span>
                </button>
              ))}

              {/* Show More Options */}
              {!showMoreOptions && optionalButtons.length > 0 && (
                <button
                  onClick={() => setShowMoreOptions(true)}
                  className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm rounded-xl border bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group text-left shadow-sm hover:shadow-md dashed border-dashed"
                >
                  <div className="p-1.5 md:p-2 rounded-lg bg-background group-hover:bg-primary/20 transition-colors shrink-0">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-medium leading-tight">More Options</span>
                </button>
              )}
            </div>

            {/* Extra options */}
            {showMoreOptions && (
              <div className="grid grid-cols-2 gap-3 mt-3 px-2">
                {optionalButtons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(btn.prompt, undefined, true)}
                    className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm rounded-xl border bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group text-left shadow-sm hover:shadow-md"
                  >
                    <div className="p-1.5 md:p-2 rounded-lg bg-background group-hover:bg-primary/20 transition-colors shrink-0">
                      {btn.icon}
                    </div>
                    <span className="font-medium leading-tight">{btn.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat messages */}
        {conversationStarted &&
          messages.map((m, i) => (
            <div
              key={i}
              ref={i === messages.length - 1 ? lastMessageRef : null}
            >
              <ChatMessage role={m.role as any} content={m.content} />
            </div>
          ))}

        {isTyping && <TypingIndicator />}

        {/* Invisible div to scroll to */}
        <div className="h-4" />
      </div>

      <ChatInput onSend={(msg) => sendMessage(msg)} />
    </div>
  );
}
