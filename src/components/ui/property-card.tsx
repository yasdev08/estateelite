"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bed, Bath, Car, Maximize2, Heart, Share2, Eye } from "lucide-react";
import { cn, formatPriceShort, formatPrice, formatArea } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  className?: string;
  priority?: boolean;
  variant?: "default" | "compact" | "horizontal";
}

export function PropertyCard({
  property,
  className,
  priority = false,
  variant = "default",
}: PropertyCardProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [imgIndex, setImgIndex] = useState(0);
  const [isFaved, setIsFaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      await navigator.share({ title: property.title, url: `/properties/${property.slug}` });
    } else {
      await navigator.clipboard.writeText(`${window.location.origin}/properties/${property.slug}`);
      setShowShare(true);
      setTimeout(() => setShowShare(false), 2000);
    }
  };

  if (variant === "compact") {
    return (
      <Link
        href={`/properties/${property.slug}`}
        className={cn(
          "group flex gap-4 p-3 rounded-2xl transition-all duration-300",
          isDark
            ? "hover:bg-slate-800/60"
            : "hover:bg-slate-50",
          className
        )}
      >
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
          <Image src={property.images[0]} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="80px" />
        </div>
        <div className="min-w-0">
          <p className={cn("text-sm font-semibold truncate", isDark ? "text-slate-200" : "text-slate-800")}>{property.title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{property.city}, {property.state}</p>
          <p className="text-sm font-bold text-gold mt-1">{formatPriceShort(property.price)}</p>
        </div>
      </Link>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn("property-card group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setImgIndex(0); }}
    >
      <Link
        href={`/properties/${property.slug}`}
        className={cn(
          "block rounded-2xl overflow-hidden border transition-all duration-500",
          isDark
            ? "bg-slate-900 border-slate-800 hover:border-slate-700"
            : "bg-white border-slate-100 hover:border-slate-200",
          "shadow-card hover:shadow-card-hover"
        )}
        tabIndex={0}
        aria-label={`View ${property.title} — ${formatPrice(property.price)}`}
      >
        {/* ── Image area ── */}
        <div className="relative overflow-hidden" style={{ height: variant === "horizontal" ? 280 : 272 }}>
          {/* Main image */}
          <Image
            src={property.images[imgIndex]}
            alt={property.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="property-card-image"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 overlay-card" />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex gap-2 z-10">
            {property.badge && (
              <span className="badge-gold">{property.badge}</span>
            )}
            {property.daysOnMarket && property.daysOnMarket <= 7 && (
              <span className="badge-outline">New</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {/* Favorite */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFaved((f) => !f); }}
              className={cn(
                "w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center transition-all duration-300",
                isFaved
                  ? "bg-red-500 border-transparent"
                  : "bg-white/90 border border-white/20 hover:bg-white"
              )}
              aria-label={isFaved ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={cn("w-4 h-4 transition-all", isFaved ? "text-white fill-white" : "text-slate-600")}
                strokeWidth={isFaved ? 0 : 1.75}
              />
            </motion.button>

            {/* Share */}
            <div className="relative">
              <AnimatePresence>
                {showShare && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap"
                  >
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleShare}
                className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white transition-all"
                aria-label="Share property"
              >
                <Share2 className="w-4 h-4 text-slate-600" />
              </motion.button>
            </div>
          </div>

          {/* Image dots nav */}
          <AnimatePresence>
            {isHovered && property.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5 z-10"
              >
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setImgIndex(i); }}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      imgIndex === i ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                    )}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price tag */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="text-2xl font-black text-white tracking-tight leading-none drop-shadow-lg">
              {formatPriceShort(property.price)}
            </div>
            {property.pricePerSqft && (
              <div className="text-xs text-white/60 mt-0.5 font-medium">
                ${property.pricePerSqft.toLocaleString()}/ft²
              </div>
            )}
          </div>

          {/* View count on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 right-4 flex items-center gap-1 text-white/60 text-xs z-10"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{Math.floor(Math.random() * 200 + 50)} views</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Content area ── */}
        <div className="p-5">
          {/* Type + Location */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={cn(
                  "text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full",
                  isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                )}>
                  {property.type}
                </span>
                <span className={cn(
                  "text-[11px] font-semibold",
                  property.status === "For Sale" ? "text-emerald-500" : "text-blue-500"
                )}>
                  {property.status}
                </span>
              </div>
              <h3 className={cn(
                "text-base font-bold leading-snug truncate",
                isDark ? "text-slate-100" : "text-slate-900"
              )}>
                {property.title}
              </h3>
              <div className={cn(
                "flex items-center gap-1 mt-1 text-xs",
                isDark ? "text-slate-500" : "text-slate-400"
              )}>
                <MapPin className="w-3 h-3 text-gold shrink-0" />
                <span className="truncate">{property.address}, {property.city}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={cn("h-px mb-4", isDark ? "bg-slate-800" : "bg-slate-100")} />

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Bed, value: property.bedrooms, label: "Beds" },
              { icon: Bath, value: property.bathrooms, label: "Baths" },
              { icon: Car, value: property.garage, label: "Garage" },
              { icon: Maximize2, value: formatArea(property.size), label: "Area" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className={cn(
                  "w-3.5 h-3.5 mx-auto mb-1",
                  isDark ? "text-slate-500" : "text-slate-400"
                )} />
                <div className={cn(
                  "text-[13px] font-bold",
                  isDark ? "text-slate-200" : "text-slate-800"
                )}>
                  {value}
                </div>
                <div className={cn(
                  "text-[10px] font-medium mt-px",
                  isDark ? "text-slate-600" : "text-slate-400"
                )}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Agent */}
          <div className={cn(
            "flex items-center gap-2 mt-4 pt-3.5 border-t",
            isDark ? "border-slate-800" : "border-slate-100"
          )}>
            <Image
              src={property.agent.image}
              alt={property.agent.name}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full object-cover object-top"
            />
            <span className={cn("text-xs font-medium", isDark ? "text-slate-400" : "text-slate-500")}>
              {property.agent.name}
            </span>
            {property.daysOnMarket && (
              <span className={cn("text-xs ml-auto", isDark ? "text-slate-600" : "text-slate-400")}>
                {property.daysOnMarket}d on market
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
