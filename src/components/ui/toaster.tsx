"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons = { success: CheckCircle2, error: XCircle, info: Info };
  const colors = {
    success: "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    error: "border-red-500/30 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400",
    info: "border-gold/30 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <div
        className="fixed bottom-6 left-6 z-[300] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -32, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -32, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={cn(
                  "pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-card backdrop-blur-sm",
                  colors[t.type]
                )}
                role="alert"
              >
                <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium flex-1 leading-snug">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
