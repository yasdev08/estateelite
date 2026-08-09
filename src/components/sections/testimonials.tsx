"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/components/providers/theme-provider";
import { TESTIMONIALS } from "@/data/blog";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const goto = useCallback((next: number) => {
    setDirection(next > idx ? 1 : -1);
    setIdx(next);
  }, [idx]);

  const prev = () => goto((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goto((idx + 1) % TESTIMONIALS.length);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  };

  const t = TESTIMONIALS[idx];

  return (
    <section
      ref={ref}
      className={cn(
        "py-28 relative overflow-hidden",
        isDark ? "bg-slate-950" : "bg-slate-50"
      )}
    >
      {/* Decorative quote marks */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-[220px] font-serif font-black leading-none select-none pointer-events-none"
        style={{ color: isDark ? "rgba(201,162,39,0.04)" : "rgba(201,162,39,0.07)" }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4">Client Stories</div>
          <h2 className={cn(
            "text-fluid-4xl font-black tracking-tight leading-none",
            isDark ? "text-white" : "text-slate-900"
          )}>
            Trusted by the elite
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div
            className={cn(
              "relative rounded-3xl p-10 lg:p-14 overflow-hidden border",
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-100 shadow-card"
            )}
          >
            {/* Gold accent top-left */}
            <div className="absolute top-0 left-0 w-32 h-1 bg-gold-gradient rounded-br-full" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={idx}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote
                  className={cn(
                    "text-fluid-xl font-medium leading-relaxed mb-10",
                    isDark ? "text-slate-200" : "text-slate-700"
                  )}
                >
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                        <Quote className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                    </div>
                    <div>
                      <div className={cn("font-bold text-base", isDark ? "text-white" : "text-slate-900")}>
                        {t.name}
                      </div>
                      <div className="text-sm text-slate-400 mt-0.5">{t.role}</div>
                      {t.location && (
                        <div className="text-xs text-gold font-semibold mt-0.5">{t.location}</div>
                      )}
                    </div>
                  </div>

                  {/* Nav arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prev}
                      className={cn(
                        "w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200",
                        isDark
                          ? "border-slate-700 text-slate-400 hover:border-gold/50 hover:text-gold hover:bg-gold/10"
                          : "border-slate-200 text-slate-400 hover:border-gold/50 hover:text-gold hover:bg-gold/5"
                      )}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={next}
                      className={cn(
                        "w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200",
                        isDark
                          ? "border-slate-700 text-slate-400 hover:border-gold/50 hover:text-gold hover:bg-gold/10"
                          : "border-slate-200 text-slate-400 hover:border-gold/50 hover:text-gold hover:bg-gold/5"
                      )}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goto(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-400",
                  i === idx
                    ? "w-8 bg-gold"
                    : isDark
                      ? "w-2 bg-slate-700 hover:bg-slate-600"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
