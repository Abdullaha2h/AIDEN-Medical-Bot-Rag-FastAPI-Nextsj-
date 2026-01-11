"use client";

import { useState } from "react";
import { Ambulance, X } from "lucide-react";

export default function ApiDisclaimer() {
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    if (!showDisclaimer) return null;

    return (
        <div className="w-full max-w-3xl mx-auto mb-4 p-0 rounded-4xl border dark:bg-primary/5 bg-white dark:border-primary/10 flex items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 backdrop-blur-md">
            <div className="flex items-center gap-3 text-primary/90 text-xs md:text-sm">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                    <Ambulance className="w-4 h-4" />
                </div>
                <div>
                    <span className="font-bold inline">Notice:</span>{" "}
                    <span className="opacity-90">
                        Primary API down, backup API is running. Response quality may vary.
                    </span>
                </div>
            </div>
            <button
                onClick={() => setShowDisclaimer(false)}
                className="text-primary/60 hover:text-primary transition-colors p-1.5 hover:bg-primary/10 rounded-full shrink-0 flex items-center justify-center"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
