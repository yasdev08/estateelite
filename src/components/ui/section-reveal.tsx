"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.55,
  once = true,
  threshold = 0.15,
}: SectionRevealProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: once });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
    x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
    scale: direction === "none" ? 0.96 : 1,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
