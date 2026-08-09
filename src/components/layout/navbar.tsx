"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Menu, X, Search, Moon, Sun, Phone,
  ChevronDown, MapPin, Home, Users, BookOpen, Mail,
} from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Properties",
    href: "/properties",
    icon: Home,
    mega: [
      { label: "All Properties", href: "/properties", desc: "Browse full collection" },
      { label: "Villas & Estates", href: "/properties?type=Villa", desc: "Signature residences" },
      { label: "Penthouses", href: "/properties?type=Penthouse", desc: "Sky-high living" },
      { label: "Chalets & Retreats", href: "/properties?type=Chalet", desc: "Mountain & lake escapes" },
      { label: "Compounds", href: "/properties?type=Compound", desc: "Multi-structure estates" },
      { label: "Map Search", href: "/properties?view=map", desc: "Find by location" },
    ],
  },
  { label: "Agents", href: "/agents", icon: Users },
  { label: "About", href: "/about", icon: Building2 },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isDark = resolvedTheme === "dark";
  const isTransparent = !scrolled && !mobileOpen && pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
  }, [pathname]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const navBg = isTransparent
    ? "bg-transparent"
    : isDark
      ? "bg-slate-950/95 shadow-[0_1px_0_rgba(255,255,255,0.06)]"
      : "bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)]";

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          navBg,
          !isTransparent && "backdrop-blur-xl"
        )}
      >
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <div className="flex items-center h-[72px] gap-8">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group"
              aria-label="Estate Elite — Home"
            >
              <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold transition-transform duration-300 group-hover:scale-105">
                <Building2 className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
              </div>
              <div>
                <div className={cn(
                  "text-[15px] font-black tracking-[0.04em] leading-none transition-colors",
                  isTransparent ? "text-white" : isDark ? "text-white" : "text-slate-900"
                )}>
                  ESTATE
                </div>
                <div className="text-[8px] font-bold tracking-[0.3em] text-gold leading-none mt-0.5">
                  ELITE
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.mega && setMegaOpen(link.label)}
                  onMouseLeave={() => setMegaOpen(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-200",
                      pathname.startsWith(link.href) && link.href !== "/" || pathname === link.href
                        ? "text-gold"
                        : isTransparent
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : isDark
                            ? "text-slate-400 hover:text-white hover:bg-white/5"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                    {link.mega && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          megaOpen === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Mega dropdown */}
                  <AnimatePresence>
                    {link.mega && megaOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className={cn(
                          "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] rounded-2xl p-4",
                          "shadow-property border",
                          isDark
                            ? "bg-slate-900 border-slate-700/50"
                            : "bg-white border-slate-100"
                        )}
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {link.mega.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "group flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all duration-200",
                                isDark
                                  ? "hover:bg-slate-800"
                                  : "hover:bg-slate-50"
                              )}
                            >
                              <span className={cn(
                                "text-sm font-semibold transition-colors",
                                isDark ? "text-slate-200 group-hover:text-gold" : "text-slate-800 group-hover:text-gold"
                              )}>
                                {item.label}
                              </span>
                              <span className={cn(
                                "text-xs",
                                isDark ? "text-slate-500" : "text-slate-400"
                              )}>
                                {item.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className={cn(
                          "mt-3 pt-3 border-t flex items-center gap-2",
                          isDark ? "border-slate-700/50" : "border-slate-100"
                        )}>
                          <MapPin className="w-4 h-4 text-gold shrink-0" />
                          <Link
                            href="/properties?view=map"
                            className={cn(
                              "text-xs font-medium",
                              isDark ? "text-slate-400 hover:text-gold" : "text-slate-500 hover:text-gold"
                            )}
                          >
                            Search properties on the map →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "hidden sm:flex items-center gap-2 h-9 px-3 rounded-xl text-xs font-medium transition-all duration-200 border",
                  isTransparent
                    ? "border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10"
                    : isDark
                      ? "border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800"
                      : "border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 bg-slate-50"
                )}
                aria-label="Open search"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:block">Search</span>
                <kbd className={cn(
                  "hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono",
                  "border",
                  isTransparent ? "border-white/20 text-white/40" : isDark ? "border-slate-600 text-slate-500" : "border-slate-200 text-slate-400"
                )}>
                  ⌘K
                </kbd>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200",
                  isTransparent
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : isDark
                      ? "text-slate-400 hover:text-white hover:bg-slate-800"
                      : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                )}
                aria-label="Toggle theme"
              >
                {isDark
                  ? <Sun className="w-4 h-4" />
                  : <Moon className="w-4 h-4" />}
              </button>

              {/* CTA */}
              <Link
                href="/contact"
                className="hidden md:flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold text-white btn-gold"
              >
                <Phone className="w-3.5 h-3.5" />
                Get in Touch
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className={cn(
                  "lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200",
                  isTransparent
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : isDark
                      ? "text-slate-400 hover:text-white hover:bg-slate-800"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                )}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <X className="w-5 h-5" />
                      </motion.div>
                    : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Menu className="w-5 h-5" />
                      </motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={cn(
                "overflow-hidden border-t lg:hidden",
                isDark ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100"
              )}
            >
              <nav className="px-4 pb-6 pt-3 space-y-0.5">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all",
                        pathname === link.href || pathname.startsWith(link.href + "/")
                          ? "bg-gold/10 text-gold"
                          : isDark
                            ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white btn-gold"
                  >
                    <Phone className="w-4 h-4" />
                    Get in Touch
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={cn(
                "relative w-full max-w-xl rounded-2xl border shadow-property overflow-hidden",
                isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
              )}
            >
              {/* Search input */}
              <div className={cn(
                "flex items-center gap-3 px-5 py-4 border-b",
                isDark ? "border-slate-700" : "border-slate-100"
              )}>
                <Search className="w-5 h-5 text-gold shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search properties, cities, agents…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "flex-1 text-[15px] font-medium outline-none bg-transparent",
                    isDark ? "text-white placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"
                  )}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className={cn(
                    "shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg border",
                    isDark ? "border-slate-700 text-slate-400 hover:text-white" : "border-slate-200 text-slate-400 hover:text-slate-600"
                  )}
                >
                  ESC
                </button>
              </div>

              {/* Quick links */}
              <div className="p-4">
                <p className={cn(
                  "text-xs font-semibold tracking-widest uppercase mb-3",
                  isDark ? "text-slate-500" : "text-slate-400"
                )}>
                  Quick links
                </p>
                <div className="space-y-0.5">
                  {[
                    { label: "Featured Properties", href: "/properties?featured=true" },
                    { label: "Beachfront Homes", href: "/properties?amenities=Beach" },
                    { label: "Penthouses in NYC", href: "/properties?type=Penthouse&city=New+York" },
                    { label: "Malibu Villas", href: "/properties?city=Malibu" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSearchOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                        isDark
                          ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Search className="w-3.5 h-3.5 opacity-40" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
