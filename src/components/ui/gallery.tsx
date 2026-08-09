"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  title: string;
}

export function Gallery({ images, title }: GalleryProps) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [direction, setDirection] = useState(1);

  const navigate = useCallback((next: number) => {
    setDirection(next > idx ? 1 : -1);
    setIdx(next);
  }, [idx]);

  const prev = () => navigate((idx - 1 + images.length) % images.length);
  const next = () => navigate((idx + 1) % images.length);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <>
      {/* Main gallery */}
      <div className="space-y-3">
        {/* Hero image */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group" style={{ aspectRatio: "16/9" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={idx}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <Image
                src={images[idx]}
                alt={`${title} — image ${idx + 1}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white dark:hover:bg-slate-800 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white dark:hover:bg-slate-800 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </button>
            </>
          )}

          {/* Counter + expand */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              {idx + 1} / {images.length}
            </div>
            <button
              onClick={() => setLightbox(true)}
              className="bg-black/60 backdrop-blur-sm text-white p-1.5 rounded-lg hover:bg-black/80 transition-colors"
              aria-label="View fullscreen"
            >
              <Expand className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLightbox(true)}
              className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg hover:bg-black/80 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Grid3x3 className="w-3.5 h-3.5" />
              All Photos
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                className={cn(
                  "relative rounded-xl overflow-hidden transition-all duration-200",
                  "aspect-[4/3]",
                  i === idx
                    ? "ring-2 ring-gold ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                    : "opacity-65 hover:opacity-100"
                )}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === idx}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                {i === 4 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm">
                    +{images.length - 5}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={images[idx]}
                  alt={`${title} — image ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Controls */}
              <button
                onClick={() => setLightbox(false)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-7 h-7" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Thumbnail strip */}
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto scrollbar-hide py-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(i)}
                    className={cn(
                      "shrink-0 w-16 h-10 rounded-lg overflow-hidden relative transition-all",
                      i === idx ? "ring-2 ring-gold opacity-100" : "opacity-40 hover:opacity-70"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>

              <p className="text-center text-white/40 text-xs mt-3 font-medium">
                {idx + 1} of {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
