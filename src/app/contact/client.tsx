"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, CheckCircle2,
  ChevronDown, MessageCircle, ArrowRight, Loader2,
} from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const OFFICES = [
  {
    city: "Beverly Hills",
    country: "USA",
    address: "9777 Wilshire Blvd, Suite 400",
    phone: "+1 (310) 555-0100",
    email: "beverlyhills@estateelite.com",
    hours: { weekdays: "8:00 AM – 8:00 PM", saturday: "9:00 AM – 6:00 PM", sunday: "By Appointment" },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    city: "New York",
    country: "USA",
    address: "432 Park Avenue, Floor 62",
    phone: "+1 (212) 555-0100",
    email: "newyork@estateelite.com",
    hours: { weekdays: "8:00 AM – 8:00 PM", saturday: "9:00 AM – 5:00 PM", sunday: "By Appointment" },
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    city: "Miami",
    country: "USA",
    address: "1111 Brickell Avenue, Suite 2800",
    phone: "+1 (305) 555-0100",
    email: "miami@estateelite.com",
    hours: { weekdays: "8:00 AM – 7:00 PM", saturday: "9:00 AM – 4:00 PM", sunday: "By Appointment" },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
];

const FAQS = [
  {
    q: "How does Estate Elite differ from a traditional real estate agency?",
    a: "We operate as a true advisory firm, not a brokerage focused on transaction volume. Each advisor maintains a limited number of client relationships to ensure undivided attention. Our compensation is aligned with client outcomes, not the number of deals we close.",
  },
  {
    q: "Do you charge for an initial consultation?",
    a: "No. Initial consultations are always confidential and obligation-free. We believe the relationship should earn your trust before it earns a fee.",
  },
  {
    q: "Can you access properties not listed publicly?",
    a: "Yes—this is central to our value proposition. Over 40% of the transactions we facilitated in 2024 involved properties that never appeared on any public listing platform. Our network of owner relationships and affiliate agencies is the primary source of these opportunities.",
  },
  {
    q: "Do you work with international buyers?",
    a: "Extensively. Our advisors are fluent across 8 languages and we have affiliate partners in 45 countries. We regularly facilitate cross-border acquisitions including the legal, tax, and logistics coordination they require.",
  },
  {
    q: "How quickly can an advisor respond to an inquiry?",
    a: "Senior advisors respond to all qualified inquiries within 2 business hours during office hours, and by 9:00 AM the following morning for after-hours contacts.",
  },
];

type Interest = "Buying" | "Selling" | "Renting" | "Investment" | "Valuation" | "Other";

export function ContactClient() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeOffice, setActiveOffice] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    interest: "Buying" as Interest,
    budget: "", message: "",
  });

  const bg = isDark ? "bg-slate-950" : "bg-slate-50";
  const card = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const text = isDark ? "text-white" : "text-slate-900";
  const sub = isDark ? "text-slate-400" : "text-slate-500";
  const inp = cn(
    "w-full rounded-xl px-4 py-3.5 text-sm font-medium outline-none border transition-all duration-200",
    isDark
      ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-gold/60 focus:bg-slate-750"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-gold/60 focus:bg-white"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  const interests: Interest[] = ["Buying", "Selling", "Renting", "Investment", "Valuation", "Other"];

  return (
    <div className={cn("min-h-screen", bg)}>
      {/* Header */}
      <div className="bg-[#07111F] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A227 1px, transparent 0)`, backgroundSize: "48px 48px" }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="section-label mb-4">Reach Us</div>
            <h1 className="text-fluid-6xl font-black text-white tracking-tight leading-none mb-5">
              Begin Your Journey
            </h1>
            <p className="text-white/50 text-[15px] max-w-lg leading-relaxed">
              Every engagement begins with a conversation. Speak with a senior advisor
              at your convenience—no pressure, no obligation.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-16 items-start">

          {/* ══ LEFT ══ */}
          <div className="space-y-10">
            {/* Quick contact cards */}
            <SectionReveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Phone, label: "Call Us", val: "+1 (310) 555-0100", href: "tel:+13105550100", cta: "Call Now" },
                  { icon: Mail, label: "Email Us", val: "advisory@estateelite.com", href: "mailto:advisory@estateelite.com", cta: "Send Email" },
                  { icon: MessageCircle, label: "WhatsApp", val: "Available 7 days", href: "https://wa.me/13105550100", cta: "Chat Now" },
                ].map(({ icon: Icon, label, val, href, cta }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cn(
                      "group flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
                      card
                    )}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className={cn("text-xs font-bold tracking-widest uppercase mb-1", sub)}>{label}</div>
                      <div className={cn("text-sm font-semibold", text)}>{val}</div>
                    </div>
                    <span className="text-xs font-bold text-gold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {cta} <ArrowRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </SectionReveal>

            {/* Office selector */}
            <SectionReveal delay={0.1}>
              <h2 className={cn("text-xl font-black mb-5", text)}>Our Offices</h2>
              {/* Tab pills */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {OFFICES.map((office, i) => (
                  <button
                    key={office.city}
                    onClick={() => setActiveOffice(i)}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200",
                      activeOffice === i
                        ? "bg-gold border-gold text-white"
                        : isDark
                          ? "border-slate-700 text-slate-400 hover:border-gold/40 hover:text-gold"
                          : "border-slate-200 text-slate-500 hover:border-gold/40 hover:text-gold"
                    )}
                  >
                    {office.city}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffice}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={cn("rounded-2xl border overflow-hidden", card)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
                    <div className="relative h-44 sm:h-auto overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={OFFICES[activeOffice].image}
                        alt={`${OFFICES[activeOffice].city} office`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <div className={cn("text-xs font-bold tracking-widest uppercase mb-1 text-gold")}>
                          {OFFICES[activeOffice].city}, {OFFICES[activeOffice].country}
                        </div>
                        <div className={cn("text-sm font-semibold", text)}>{OFFICES[activeOffice].address}</div>
                      </div>
                      <div className="space-y-2.5">
                        <a href={`tel:${OFFICES[activeOffice].phone}`} className={cn("flex items-center gap-2 text-sm", sub, "hover:text-gold transition-colors")}>
                          <Phone className="w-3.5 h-3.5 text-gold" /> {OFFICES[activeOffice].phone}
                        </a>
                        <a href={`mailto:${OFFICES[activeOffice].email}`} className={cn("flex items-center gap-2 text-sm", sub, "hover:text-gold transition-colors")}>
                          <Mail className="w-3.5 h-3.5 text-gold" /> {OFFICES[activeOffice].email}
                        </a>
                      </div>
                      <div>
                        <div className={cn("text-xs font-bold tracking-widest uppercase mb-2", sub)}>
                          <Clock className="w-3.5 h-3.5 inline mr-1" />Hours
                        </div>
                        <div className="space-y-1">
                          {[
                            ["Mon–Fri", OFFICES[activeOffice].hours.weekdays],
                            ["Saturday", OFFICES[activeOffice].hours.saturday],
                            ["Sunday", OFFICES[activeOffice].hours.sunday],
                          ].map(([day, hrs]) => (
                            <div key={day} className={cn("flex justify-between text-xs", sub)}>
                              <span>{day}</span>
                              <span className={cn("font-medium", text)}>{hrs}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </SectionReveal>

            {/* FAQ */}
            <SectionReveal delay={0.15}>
              <h2 className={cn("text-xl font-black mb-5", text)}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className={cn("rounded-2xl border overflow-hidden transition-all duration-300", card)}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className={cn("text-sm font-semibold", text)}>{faq.q}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 shrink-0 text-gold transition-transform duration-300",
                          openFaq === i && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <p className={cn("px-5 pb-5 text-sm leading-relaxed", sub)}>
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* ══ RIGHT — Contact Form ══ */}
          <div className="xl:sticky xl:top-24">
            <SectionReveal direction="left">
              <div className={cn("rounded-3xl border p-8 shadow-card", card)}>
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className={cn("text-2xl font-black mb-3", text)}>Message Received</h3>
                    <p className={cn("text-[15px] leading-relaxed max-w-xs mx-auto", sub)}>
                      A senior advisor will reach out within 2 business hours.
                      We look forward to speaking with you.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 text-sm font-semibold text-gold hover:text-gold-dark"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-7">
                      <div className="section-label mb-2">Send a Message</div>
                      <h2 className={cn("text-2xl font-black", text)}>Let&apos;s Talk</h2>
                      <p className={cn("text-sm mt-1.5", sub)}>
                        Typically respond within 2 business hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={cn("text-xs font-bold tracking-widest uppercase block mb-1.5", sub)}>
                            Full Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="John Smith"
                            className={inp}
                          />
                        </div>
                        <div>
                          <label className={cn("text-xs font-bold tracking-widest uppercase block mb-1.5", sub)}>
                            Email *
                          </label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            placeholder="john@example.com"
                            className={inp}
                          />
                        </div>
                      </div>

                      {/* Phone + Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={cn("text-xs font-bold tracking-widest uppercase block mb-1.5", sub)}>
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                            placeholder="+1 (310) 000-0000"
                            className={inp}
                          />
                        </div>
                        <div>
                          <label className={cn("text-xs font-bold tracking-widest uppercase block mb-1.5", sub)}>
                            Budget Range
                          </label>
                          <select
                            value={form.budget}
                            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                            className={cn(inp, "cursor-pointer")}
                          >
                            <option value="">Select range</option>
                            <option value="5-10M">$5M – $10M</option>
                            <option value="10-20M">$10M – $20M</option>
                            <option value="20-30M">$20M – $30M</option>
                            <option value="30M+">$30M+</option>
                          </select>
                        </div>
                      </div>

                      {/* Interest */}
                      <div>
                        <label className={cn("text-xs font-bold tracking-widest uppercase block mb-2", sub)}>
                          I&apos;m Interested In
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {interests.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setForm((f) => ({ ...f, interest: opt }))}
                              className={cn(
                                "px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200",
                                form.interest === opt
                                  ? "bg-gold border-gold text-white"
                                  : isDark
                                    ? "border-slate-700 text-slate-400 hover:border-gold/40 hover:text-gold"
                                    : "border-slate-200 text-slate-500 hover:border-gold/40 hover:text-gold"
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className={cn("text-xs font-bold tracking-widest uppercase block mb-1.5", sub)}>
                          Message
                        </label>
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          placeholder="Tell us about your ideal property, timeline, or any questions you have…"
                          className={cn(inp, "resize-none")}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-gold w-full py-4 text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className={cn("text-xs text-center", sub)}>
                        Your information is kept strictly confidential. No spam, ever.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
