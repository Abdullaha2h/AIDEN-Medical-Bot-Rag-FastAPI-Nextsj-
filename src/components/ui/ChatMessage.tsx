"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ role, content }: any) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 fade-in ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <img
          src="/face.png"
          alt="Medical Illustration"
          className="h-8 opacity-80 hidden md:block mt-2"
        />
      )}

      <div
        className={`chat-bubble shadow p-2 rounded-xl ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      {isUser && (
        <Avatar className="hidden md:block">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
