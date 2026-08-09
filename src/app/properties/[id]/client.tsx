"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin, Bed, Bath, Car, Maximize2, CheckCircle2, Calendar,
  Phone, Mail, Share2, Heart, ArrowRight, Star, Zap,
  Home, ChevronRight, Globe, Languages, TrendingUp, Clock,
} from "lucide-react";
import { Gallery } from "@/components/ui/gallery";
import { MortgageCalc } from "@/components/ui/mortgage-calc";
import { PropertyCard } from "@/components/ui/property-card";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useTheme } from "@/components/providers/theme-provider";
import { cn, formatPrice, formatArea } from "@/lib/utils";
import type { Property } from "@/types";

interface Props {
  property: Property;
  related: Property[];
}

export function PropertyDetailClient({ property, related }: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [faved, setFaved] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: `I'm interested in ${property.title}. Please contact me.` });

  const bg = isDark ? "bg-slate-950" : "bg-slate-50";
  const card = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100";
  const text = isDark ? "text-white" : "text-slate-900";
  const sub = isDark ? "text-slate-400" : "text-slate-500";
  const inp = cn(
    "input-luxury w-full",
    "text-sm rounded-xl px-4 py-3 outline-none border transition-all",
    isDark
      ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-gold/60"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-gold/60"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className={cn("min-h-screen pt-20", bg)}>
      <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-10">

        {/* ── Breadcrumb ── */}
        <nav className={cn("flex items-center gap-1.5 text-xs font-medium mb-8", sub)} aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <Link href="/properties" className="hover:text-gold transition-colors">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <span className={cn("truncate max-w-[200px]", text)}>{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12 items-start">

          {/* ══ LEFT COLUMN ══ */}
          <div className="min-w-0">

            {/* Gallery */}
            <SectionReveal>
              <Gallery images={property.images} title={property.title} />
            </SectionReveal>

            {/* Title block */}
            <SectionReveal delay={0.1} className="mt-8">
              <div className="flex flex-wrap gap-3 mb-4">
                {property.badge && (
                  <span className="badge-gold">{property.badge}</span>
                )}
                <span className={cn(
                  "text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border",
                  isDark ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-500"
                )}>
                  {property.type}
                </span>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {property.status}
                </span>
              </div>

              <h1 className={cn("text-fluid-4xl font-black tracking-tight leading-tight mb-3", text)}>
                {property.title}
              </h1>

              <div className="flex items-center gap-2 flex-wrap">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span className={cn("text-sm", sub)}>{property.address}, {property.city}, {property.state}</span>
                {property.daysOnMarket && (
                  <>
                    <span className={cn("text-xs", sub)}>·</span>
                    <span className={cn("text-xs flex items-center gap-1", sub)}>
                      <Clock className="w-3 h-3" /> {property.daysOnMarket} days on market
                    </span>
                  </>
                )}
              </div>
            </SectionReveal>

            {/* Key stats bar */}
            <SectionReveal delay={0.15} className="mt-8">
              <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border", card)}>
                {[
                  { icon: Bed, label: "Bedrooms", value: property.bedrooms },
                  { icon: Bath, label: "Bathrooms", value: property.bathrooms + (property.halfBaths ? ` + ${property.halfBaths} half` : "") },
                  { icon: Car, label: "Garage", value: `${property.garage} cars` },
                  { icon: Maximize2, label: "Living Area", value: formatArea(property.size) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center">
                    <div className={cn("w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center", isDark ? "bg-slate-800" : "bg-slate-100")}>
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div className={cn("text-lg font-black", text)}>{value}</div>
                    <div className={cn("text-xs mt-0.5", sub)}>{label}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Description */}
            <SectionReveal delay={0.2} className="mt-8">
              <div className={cn("rounded-2xl border p-7", card)}>
                <h2 className={cn("text-lg font-bold mb-4", text)}>About This Property</h2>
                <p className={cn("text-[15px] leading-relaxed", sub)}>{property.description}</p>

                {/* Details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  {[
                    ["Property Type", property.type],
                    ["Year Built", property.yearBuilt],
                    ["City", property.city],
                    ["Lot Size", property.lotSize ? formatArea(property.lotSize) : "N/A"],
                    ["Energy Rating", property.energyRating],
                    ["Price/ft²", property.pricePerSqft ? `$${property.pricePerSqft.toLocaleString()}` : "N/A"],
                    ...(property.monthlyHoa ? [["Monthly HOA", `$${property.monthlyHoa.toLocaleString()}`]] : []),
                    ...(property.walkScore ? [["Walk Score", `${property.walkScore}/100`]] : []),
                  ].map(([label, value]) => (
                    <div key={String(label)}>
                      <div className={cn("text-[10px] font-bold tracking-widest uppercase mb-1", sub)}>{label}</div>
                      <div className={cn("text-sm font-bold", text)}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Amenities */}
            <SectionReveal delay={0.25} className="mt-6">
              <div className={cn("rounded-2xl border p-7", card)}>
                <h2 className={cn("text-lg font-bold mb-5", text)}>Amenities & Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-gold" />
                      </div>
                      <span className={cn("text-sm font-medium", text)}>{a}</span>
                    </div>
                  ))}
                </div>

                {property.features.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className={cn("text-xs font-bold tracking-widest uppercase mb-4", sub)}>Finishes & Materials</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm">
                          <Zap className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span className={sub}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionReveal>

            {/* Nearby */}
            {(property.nearbySchools || property.nearbyTransport) && (
              <SectionReveal delay={0.3} className="mt-6">
                <div className={cn("rounded-2xl border p-7", card)}>
                  <h2 className={cn("text-lg font-bold mb-5", text)}>Nearby</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {property.nearbySchools && (
                      <div>
                        <div className={cn("text-xs font-bold tracking-widest uppercase mb-3", sub)}>Schools</div>
                        <div className="space-y-2">
                          {property.nearbySchools.map((s) => (
                            <div key={s.name} className="flex items-center justify-between text-sm">
                              <span className={text}>{s.name}</span>
                              <div className="flex items-center gap-2">
                                {s.rating && <span className="text-xs text-gold font-bold">{s.rating}★</span>}
                                <span className={sub}>{s.distance}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {property.nearbyTransport && (
                      <div>
                        <div className={cn("text-xs font-bold tracking-widest uppercase mb-3", sub)}>Transport</div>
                        <div className="space-y-2">
                          {property.nearbyTransport.map((t) => (
                            <div key={t.name} className="flex items-center justify-between text-sm">
                              <span className={text}>{t.name}</span>
                              <span className={sub}>{t.distance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SectionReveal>
            )}

            {/* Mortgage calculator */}
            <SectionReveal delay={0.35} className="mt-6">
              <MortgageCalc price={property.price} />
            </SectionReveal>
          </div>

          {/* ══ RIGHT SIDEBAR ══ */}
          <div className="xl:sticky xl:top-24 space-y-5">

            {/* Price card */}
            <SectionReveal direction="left">
              <div className={cn("rounded-2xl border p-6", card)}>
                <div className="flex items-start justify-between mb-1">
                  <div className={cn("text-3xl font-black tracking-tight", text)}>
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFaved((f) => !f)}
                      className={cn(
                        "w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200",
                        faved
                          ? "bg-red-500 border-red-500 text-white"
                          : isDark ? "border-slate-700 text-slate-400 hover:border-red-500/50 hover:text-red-400" : "border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-400"
                      )}
                      aria-label={faved ? "Remove from saved" : "Save property"}
                    >
                      <Heart className={cn("w-4 h-4", faved && "fill-white")} />
                    </button>
                    <button
                      onClick={() => navigator.clipboard?.writeText(window.location.href)}
                      className={cn("w-9 h-9 rounded-xl border flex items-center justify-center transition-all", isDark ? "border-slate-700 text-slate-400 hover:text-white hover:border-slate-500" : "border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300")}
                      aria-label="Share property"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {property.pricePerSqft && (
                  <p className={cn("text-sm mb-4", sub)}>${property.pricePerSqft.toLocaleString()}/ft²</p>
                )}
                <div className={cn("flex items-center gap-2 text-xs p-3 rounded-xl mb-4", isDark ? "bg-gold/5 border border-gold/15" : "bg-gold/5 border border-gold/20")}>
                  <TrendingUp className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className={sub}>This property has been viewed 847 times this week</span>
                </div>
                <Link
                  href="#contact-form"
                  className="btn-gold w-full py-3.5 text-center text-white font-bold text-sm block rounded-xl"
                >
                  Schedule a Private Viewing
                </Link>
              </div>
            </SectionReveal>

            {/* Agent card */}
            <SectionReveal direction="left" delay={0.1}>
              <div className={cn("rounded-2xl border overflow-hidden", card)}>
                {/* Gold header */}
                <div className="bg-gold-gradient p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-shine animate-shimmer opacity-50" />
                  <Image
                    src={property.agent.image}
                    alt={property.agent.name}
                    width={72}
                    height={72}
                    className="w-[72px] h-[72px] rounded-full object-cover object-top border-3 border-white/40 mx-auto mb-3"
                  />
                  <div className="text-white font-black text-base">{property.agent.name}</div>
                  <div className="text-white/75 text-xs font-medium mt-0.5">{property.agent.role}</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-white/90 text-white/90" />
                    ))}
                    <span className="text-white/70 text-xs ml-1">({property.agent.reviewCount})</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Sales", value: `${property.agent.totalSales}+` },
                      { label: "Exp", value: `${property.agent.experience}yr` },
                      { label: "Rating", value: property.agent.rating },
                    ].map(({ label, value }) => (
                      <div key={label} className={cn("text-center p-2.5 rounded-xl", isDark ? "bg-slate-800" : "bg-slate-50")}>
                        <div className={cn("text-base font-black", text)}>{value}</div>
                        <div className={cn("text-[10px]", sub)}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-gold shrink-0" />
                    <span className={cn("text-xs", sub)}>{property.agent.languages.join(" · ")}</span>
                  </div>

                  {/* Contact buttons */}
                  <div className="space-y-2">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all group",
                        isDark ? "border-slate-700 text-slate-300 hover:border-gold/40 hover:bg-gold/5" : "border-slate-200 text-slate-700 hover:border-gold/40 hover:bg-gold/5"
                      )}
                    >
                      <Phone className="w-4 h-4 text-gold" />
                      <span>{property.agent.phone}</span>
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all",
                        isDark ? "border-slate-700 text-slate-300 hover:border-gold/40 hover:bg-gold/5" : "border-slate-200 text-slate-700 hover:border-gold/40 hover:bg-gold/5"
                      )}
                    >
                      <Mail className="w-4 h-4 text-gold" />
                      <span className="truncate">{property.agent.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Inquiry form */}
            <SectionReveal direction="left" delay={0.2}>
              <div className={cn("rounded-2xl border p-6", card)} id="contact-form">
                <h3 className={cn("font-bold text-base mb-5", text)}>Send an Inquiry</h3>
                {inquirySent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6 text-gold" />
                    </div>
                    <div className={cn("font-bold", text)}>Inquiry Sent</div>
                    <p className={cn("text-sm mt-1", sub)}>
                      {property.agent.name} will respond within 2 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={inp}
                      aria-label="Your name"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inp}
                      aria-label="Email address"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className={inp}
                      aria-label="Phone number"
                    />
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={cn(inp, "resize-none")}
                      aria-label="Message"
                    />
                    <button type="submit" className="btn-gold w-full py-3.5 text-white font-bold text-sm rounded-xl">
                      Send Inquiry
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "w-full py-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2",
                        isDark ? "border-slate-700 text-slate-300 hover:border-slate-500" : "border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      <Calendar className="w-4 h-4" /> Schedule a Visit
                    </button>
                  </form>
                )}
              </div>
            </SectionReveal>

            {/* Virtual tour placeholder */}
            <SectionReveal direction="left" delay={0.25}>
              <div className={cn("rounded-2xl border p-5 flex items-center gap-4", card)}>
                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-gold" />
                </div>
                <div className="min-w-0">
                  <div className={cn("text-sm font-bold", text)}>Virtual Tour Available</div>
                  <div className={cn("text-xs mt-0.5", sub)}>Explore this property in immersive 3D</div>
                </div>
                <button className={cn("shrink-0 text-xs font-semibold text-gold border border-gold/30 px-3 py-1.5 rounded-lg hover:bg-gold/10 transition-colors")}>
                  View
                </button>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* ── Related properties ── */}
        {related.length > 0 && (
          <section className="mt-24">
            <SectionReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="section-label mb-2">You may also like</div>
                  <h2 className={cn("text-fluid-3xl font-black tracking-tight", text)}>Similar Properties</h2>
                </div>
                <Link href="/properties" className="text-sm font-semibold text-gold flex items-center gap-1 hover:text-gold-dark group">
                  View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {related.map((p, i) => (
                <SectionReveal key={p.id} delay={i * 0.07}>
                  <PropertyCard property={p} />
                </SectionReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
