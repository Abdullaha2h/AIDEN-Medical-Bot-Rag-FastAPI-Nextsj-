"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="p-4 border-t rounded-b-2xl bg-background/70 backdrop-blur-md flex gap-3">
      <Input
        className="flex-1 "
        placeholder="Describe your symptoms..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <Button onClick={send}>Send</Button>
    </div>
  );
}
