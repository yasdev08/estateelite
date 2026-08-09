"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  dark?: boolean;
  className?: string;
}

export function NewsletterForm({ dark = false, className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    if (email.includes("@")) {
      setStatus("success");
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex items-center gap-3 px-5 py-4 rounded-2xl border",
          dark
            ? "bg-gold/10 border-gold/30 text-gold"
            : "bg-emerald-50 border-emerald-200 text-emerald-700",
          className
        )}
      >
        <CheckCircle2 className="w-5 h-5 shrink-0" />
        <div>
          <div className="font-bold text-sm">You're on the list.</div>
          <div className="text-xs opacity-70 mt-0.5">
            Welcome to the inner circle. First issue arrives Monday.
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2.5", className)}>
      <div className="flex-1 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          aria-label="Email address for newsletter"
          className={cn(
            "w-full h-12 rounded-xl px-4 text-sm font-medium outline-none transition-all duration-200 border",
            dark
              ? "bg-white/8 border-white/10 text-white placeholder:text-white/35 focus:border-gold/50 focus:bg-white/10"
              : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-gold/50",
            status === "error" && "border-red-500/60"
          )}
        />
        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-5 left-0 text-xs text-red-400"
            >
              Please enter a valid email address.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gold h-12 px-5 text-white font-semibold text-sm shrink-0 flex items-center gap-2 disabled:opacity-70"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
