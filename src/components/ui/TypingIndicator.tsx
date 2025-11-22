"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-lg w-max animate-fade-in">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-primary rounded-full"
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
