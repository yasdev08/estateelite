"use client";

import React, { useState, useMemo, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, LayoutGrid, List, MapPin } from "lucide-react";
import { PropertyCard } from "@/components/ui/property-card";
import { SectionReveal } from "@/components/ui/section-reveal";
import { cn, formatPriceShort } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";
import type { Property, PropertyType, SortOption } from "@/types";

const PROPERTY_TYPES: Array<PropertyType | "All"> = [
  "All", "Villa", "Estate", "Penthouse", "Compound", "Chalet", "Apartment",
];

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "featured", label: "Featured First" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "newest", label: "Newest First" },
  { value: "size-desc", label: "Largest First" },
];

interface PropertiesClientProps {
  properties: Property[];
}

export function PropertiesClient({ properties }: PropertiesClientProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [type, setType] = useState<PropertyType | "All">("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState(50_000_000);
  const [minBeds, setMinBeds] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (p.price > maxPrice) return false;
      if (p.bedrooms < minBeds) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          (p.badge?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });

    switch (sort) {
      case "price-asc":   return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":  return [...list].sort((a, b) => b.price - a.price);
      case "newest":      return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "size-desc":   return [...list].sort((a, b) => b.size - a.size);
      case "featured":    return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      default:            return list;
    }
  }, [properties, search, type, sort, maxPrice, minBeds]);

  const clearFilters = () => {
    startTransition(() => {
      setSearch("");
      setType("All");
      setMaxPrice(50_000_000);
      setMinBeds(0);
    });
  };

  const hasActiveFilters = type !== "All" || maxPrice < 50_000_000 || minBeds > 0 || search;

  const bg = isDark ? "bg-slate-950" : "bg-slate-50";
  const cardBg = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const text = isDark ? "text-white" : "text-slate-900";
  const sub = isDark ? "text-slate-400" : "text-slate-500";
  const inputBase = isDark
    ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-gold/60"
    : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-gold/60";

  return (
    <div className={cn("min-h-screen", bg)}>
      {/* ── Page header ── */}
      <div className="bg-[#07111F] pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,162,39,1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="section-label mb-4">Portfolio</div>
            <h1 className="text-fluid-6xl font-black text-white tracking-[-0.04em] leading-none mb-4">
              All Properties
            </h1>
            <p className="text-white/50 text-[15px] max-w-lg leading-relaxed">
              Curated access to the world&apos;s most extraordinary homes, estates, and investment properties across the finest addresses.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-10">
        {/* ── Search & sort bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className={cn("flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200", inputBase)}>
            <Search className="w-4 h-4 text-gold shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city, or type…"
              className="bg-transparent outline-none text-sm w-full"
              aria-label="Search properties"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearch("")}
                  className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200",
              filtersOpen
                ? "bg-gold text-white border-gold"
                : isDark
                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-gold/40 hover:text-gold"
                  : "bg-white border-slate-200 text-slate-600 hover:border-gold/40 hover:text-gold"
            )}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className={cn("w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center",
                filtersOpen ? "bg-white/20 text-white" : "bg-gold text-white"
              )}>!</span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className={cn(
                "appearance-none pl-4 pr-10 py-3 rounded-xl border text-sm font-medium outline-none cursor-pointer transition-all",
                isDark
                  ? "bg-slate-800 border-slate-700 text-slate-300"
                  : "bg-white border-slate-200 text-slate-700"
              )}
              aria-label="Sort properties"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />
          </div>

          {/* View toggle */}
          <div className={cn("flex rounded-xl border overflow-hidden", isDark ? "border-slate-700" : "border-slate-200")}>
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-2 text-sm flex items-center justify-center transition-all duration-200",
                  view === v
                    ? "bg-gold text-white"
                    : isDark ? "bg-slate-800 text-slate-400 hover:text-white" : "bg-white text-slate-400 hover:text-slate-700"
                )}
                aria-label={`${v} view`}
              >
                {v === "grid" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* ── Expandable filters panel ── */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden mb-6"
            >
              <div className={cn("rounded-2xl border p-6 grid grid-cols-1 md:grid-cols-3 gap-8", cardBg)}>
                {/* Property type */}
                <div>
                  <label className={cn("text-xs font-bold tracking-widest uppercase mb-3 block", sub)}>
                    Property Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROPERTY_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200",
                          type === t
                            ? "bg-gold border-gold text-white"
                            : isDark
                              ? "border-slate-700 text-slate-400 hover:border-gold/40 hover:text-gold"
                              : "border-slate-200 text-slate-500 hover:border-gold/40 hover:text-gold"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max price */}
                <div>
                  <label className={cn("text-xs font-bold tracking-widest uppercase mb-3 flex justify-between", sub)}>
                    <span>Max Price</span>
                    <span className="text-gold normal-case font-bold">{formatPriceShort(maxPrice)}</span>
                  </label>
                  <div className="relative h-1.5 rounded-full mt-5 mb-2" style={{ background: isDark ? "#1e293b" : "#e2e8f0" }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-gold-gradient"
                      style={{ width: `${((maxPrice - 5_000_000) / 45_000_000) * 100}%` }}
                    />
                    <input
                      type="range"
                      min={5_000_000}
                      max={50_000_000}
                      step={500_000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                      aria-label="Maximum price"
                    />
                  </div>
                  <div className={cn("flex justify-between text-xs", sub)}>
                    <span>$5M</span>
                    <span>$50M+</span>
                  </div>
                </div>

                {/* Min bedrooms */}
                <div>
                  <label className={cn("text-xs font-bold tracking-widest uppercase mb-3 block", sub)}>
                    Min Bedrooms
                  </label>
                  <div className="flex gap-2">
                    {[0, 3, 5, 6, 8].map((n) => (
                      <button
                        key={n}
                        onClick={() => setMinBeds(n)}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-sm font-bold border transition-all duration-200",
                          minBeds === n
                            ? "bg-gold border-gold text-white"
                            : isDark
                              ? "border-slate-700 text-slate-400 hover:border-gold/40 hover:text-gold"
                              : "border-slate-200 text-slate-500 hover:border-gold/40 hover:text-gold"
                        )}
                      >
                        {n === 0 ? "Any" : `${n}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className={cn("text-sm font-medium flex items-center gap-1.5", isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800")}
                  >
                    <X className="w-3.5 h-3.5" /> Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Type pill tabs ── */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 pb-1">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                type === t
                  ? "bg-gold/10 border-gold text-gold"
                  : isDark
                    ? "border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className={cn("text-sm font-medium", sub)}>
            <span className={cn("font-bold", text)}>{filtered.length}</span> properties
            {type !== "All" && <> · {type}</>}
            {search && <> matching &ldquo;{search}&rdquo;</>}
          </p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-xs text-gold font-semibold hover:text-gold-dark flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* ── Property grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <MapPin className="w-14 h-14 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
              <h3 className={cn("text-xl font-bold mb-2", text)}>No properties found</h3>
              <p className={cn("text-sm mb-6", sub)}>Try adjusting your search or filters.</p>
              <button onClick={clearFilters} className="btn-gold px-6 py-2.5 text-white text-sm font-semibold">
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                view === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7"
                  : "flex flex-col gap-5"
              )}
            >
              {filtered.map((property, i) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  priority={i < 6}
                  variant={view === "list" ? "default" : "default"}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
