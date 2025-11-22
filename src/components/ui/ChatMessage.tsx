"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ role, content }: any) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 items-center fade-in ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <img
          src="/face.png"
          alt="Medical Illustration"
          className="h-8 opacity-80 hidden md:block"
        />
      )}

      <div
        className={`chat-bubble  shadow p-2 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {/* Render Markdown */}
        <div className="prose prose-sm md:prose-base dark:prose-invert text-zinc-800 dark:text-zinc-200">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      {isUser && (
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
