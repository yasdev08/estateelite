"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=90",
    alt: "Malibu Clifftop Villa",
    location: "Malibu, California",
    price: "$18.5M",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=90",
    alt: "Beverly Hills Estate",
    location: "Beverly Hills, California",
    price: "$24.9M",
  },
  {
    src: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920&q=90",
    alt: "Manhattan Penthouse",
    location: "New York City",
    price: "$32M",
  },
];

const STATS = [
  { value: "1,800+", label: "Properties Sold" },
  { value: "$14B+", label: "In Transactions" },
  { value: "28 yrs", label: "Of Excellence" },
  { value: "98%", label: "Client Retention" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx((i) => {
        setPrevIdx(i);
        return (i + 1) % HERO_IMAGES.length;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentImage = HERO_IMAGES[imgIdx];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero — Estate Elite"
    >
      {/* ── Background images ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <AnimatePresence>
          {/* Outgoing image */}
          {prevIdx !== null && (
            <motion.div
              key={`prev-${prevIdx}`}
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={HERO_IMAGES[prevIdx].src}
                alt={HERO_IMAGES[prevIdx].alt}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          )}
          {/* Incoming image */}
          <motion.div
            key={`curr-${imgIdx}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              priority={imgIdx === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(15,23,42,0.45)] via-[rgba(15,23,42,0.55)] to-[rgba(15,23,42,0.85)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(15,23,42,0.3)] via-transparent to-transparent" />

      {/* ── Content ── */}
      <motion.div
        className="relative z-20 w-full max-w-[1360px] mx-auto px-6 lg:px-8 pt-24 pb-32"
        style={{ opacity }}
      >
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2.5 glass rounded-full pl-3 pr-5 py-2">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
              ].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="advisor"
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full border-2 border-white/20 object-cover object-top"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-[11px] text-white/70 font-medium">4.9 · 600+ reviews</span>
            </div>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent max-w-[160px] hidden sm:block" />
        </motion.div>

        {/* Headline */}
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            <h1 className="text-fluid-7xl font-black text-white leading-[0.95] tracking-[-0.04em] mb-0">
              Where Exceptional
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            <h1 className="text-fluid-7xl font-black leading-[0.95] tracking-[-0.04em] text-gold-gradient mb-0">
              Properties Live.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-fluid-lg text-white/60 mt-7 mb-10 max-w-[520px] leading-relaxed font-normal"
          >
            Curated access to the world&apos;s most extraordinary homes, estates, and investment
            properties. Private. Precise. Unmatched.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/properties"
              className="btn-gold inline-flex items-center gap-2.5 text-white font-semibold text-[15px] px-7 py-3.5 shadow-gold-lg"
            >
              Explore Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="glass inline-flex items-center gap-2.5 text-white font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:bg-white/12 transition-all duration-300"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <Play className="w-3 h-3 fill-white text-white ml-0.5" />
              </div>
              Speak to an Advisor
            </Link>
          </motion.div>
        </div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-20 flex flex-wrap gap-10 lg:gap-16"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <div className={cn(
                "text-3xl font-black text-white tracking-tight",
                i === 0 && "text-gold-shimmer"
              )}>
                {stat.value}
              </div>
              <div className="text-xs text-white/40 font-semibold tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Slide indicators + current property ── */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-4">
        {/* Current property badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl px-4 py-3 flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            <div>
              <div className="text-xs font-bold text-white">{currentImage.price}</div>
              <div className="text-[11px] text-white/50">{currentImage.location}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide dots */}
        <div className="flex gap-1.5">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrevIdx(imgIdx); setImgIdx(i); }}
              className={cn(
                "h-1 rounded-full transition-all duration-400",
                i === imgIdx ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] text-white/30 uppercase">Scroll</span>
        <div className="w-px h-10 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-gold to-transparent"
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
        <ChevronDown className="w-4 h-4 text-white/20" />
      </motion.div>
    </section>
  );
}
