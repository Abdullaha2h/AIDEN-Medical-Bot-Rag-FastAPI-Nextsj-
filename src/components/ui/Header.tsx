"use client";

import { Stethoscope } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  function goHome() {
    router.push("/");      // Navigate to home page
    window.location.reload(); // Force refresh
  }

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur-md py-4 shadow-sm">
      <div className="max-w-5xl md:max-h-6 mx-auto flex items-center gap-3 px-4">
        
        {/* Clickable AIDEN */}
        <div 
          onClick={goHome}
          className="flex items-center gap-3 hover:opacity-80 transition cursor-pointer"
        >
          <Stethoscope className="text-primary" size={28} />
          <h1 className="text-xl font-light">
            <span className="text-primary font-bold">AIDEN</span> Medical Assistant
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <img
            src="/face.png"
            alt="Medical Illustration"
            className="h-12 opacity-80 hidden md:block"
          />
        </div>
      </div>
    </header>
  );
}
