"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3" aria-label="Floating actions">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/13105550100?text=Hello%2C%20I%27m%20interested%20in%20a%20property."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg relative group"
        style={{ width: 52, height: 52, background: "#25D366" }}
      >
        <MessageCircle className="w-6 h-6 text-white fill-white" />
        {/* Tooltip */}
        <span className={cn(
          "absolute right-full mr-3 top-1/2 -translate-y-1/2",
          "bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap",
          "opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200",
          "shadow-lg"
        )}>
          Chat with us
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
        </span>
        {/* Pulse */}
        <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-[#25D366]" />
      </motion.a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-13 h-13 rounded-2xl bg-slate-900 dark:bg-slate-800 border border-white/10 flex items-center justify-center shadow-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors group"
            style={{ width: 52, height: 52 }}
          >
            <ArrowUp className="w-5 h-5 text-white" />
            <span className={cn(
              "absolute right-full mr-3 top-1/2 -translate-y-1/2",
              "bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap",
              "opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg"
            )}>
              Back to top
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
