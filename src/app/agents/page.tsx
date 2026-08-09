import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Star, Languages, Award } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { AGENTS } from "@/data/agents";

export const metadata: Metadata = {
  title: "Advisory Team — Expert Luxury Property Advisors",
  description:
    "Meet Estate Elite's team of world-class luxury real estate advisors. Combined experience exceeding 43 years, 900+ transactions, and fluency across 8 languages.",
  alternates: { canonical: "/agents" },
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Header */}
      <div className="bg-[#07111F] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A227 1px, transparent 0)`, backgroundSize: "48px 48px" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="relative max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="section-label mb-4">Our People</div>
            <h1 className="text-fluid-6xl font-black text-white tracking-tight leading-none mb-5">
              Advisory Team
            </h1>
            <p className="text-white/50 text-[15px] max-w-xl leading-relaxed">
              Each advisor is chosen not for volume, but for depth—deep market knowledge,
              deep relationships, and a deep commitment to each client&apos;s outcome.
            </p>
          </SectionReveal>

          {/* Team stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14">
            {[
              { value: "43+", label: "Combined Years" },
              { value: "880+", label: "Transactions" },
              { value: "8", label: "Languages Spoken" },
              { value: "4.88", label: "Avg. Client Rating" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-xs text-white/40 font-semibold tracking-wider uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agents grid */}
      <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AGENTS.map((agent, i) => (
            <SectionReveal key={agent.id} delay={i * 0.08}>
              <div className="group rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
                <div className="grid grid-cols-[auto_1fr] gap-0">
                  {/* Photo */}
                  <div className="relative w-[220px] overflow-hidden">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      width={220}
                      height={320}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      style={{ minHeight: 320 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 dark:to-slate-900/20" />
                  </div>

                  {/* Info */}
                  <div className="p-7 flex flex-col">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <h2 className="text-xl font-black text-slate-900 dark:text-white">{agent.name}</h2>
                          <p className="text-gold font-semibold text-sm mt-0.5">{agent.role}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Star className="w-4 h-4 fill-gold text-gold" />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{agent.rating}</span>
                          <span className="text-xs text-slate-400">({agent.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-3 line-clamp-3">
                        {agent.bio}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 my-5">
                      {[
                        { label: "Sales", val: `${agent.totalSales}+` },
                        { label: "Experience", val: `${agent.experience}yr` },
                        { label: "Listings", val: agent.activeListings ?? "—" },
                      ].map(({ label, val }) => (
                        <div key={label} className="text-center bg-slate-50 dark:bg-slate-800 rounded-xl py-3">
                          <div className="text-base font-black text-slate-900 dark:text-white">{val}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2 mb-4">
                      <Languages className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="text-xs text-slate-400 font-medium">{agent.languages.join(" · ")}</span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {agent.specialties.map((s) => (
                        <span key={s} className="text-[11px] font-semibold bg-gold/10 text-gold px-2.5 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <a
                        href={`tel:${agent.phone}`}
                        className="btn-gold flex-1 py-2.5 text-white text-xs font-bold text-center rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold text-center rounded-xl hover:border-gold/40 hover:text-gold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" /> Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Awards section */}
        <SectionReveal className="mt-20">
          <div className="text-center mb-10">
            <div className="section-label mb-3">Recognition</div>
            <h2 className="text-fluid-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Industry Awards
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Luxury Agency of the Year", org: "Wall Street Journal Real Estate Awards", year: 2024 },
              { title: "Top 100 Real Estate Companies", org: "Forbes Real Estate Council", year: 2024 },
              { title: "Best Advisor Experience", org: "Luxury Portfolio International", year: 2023 },
            ].map((award) => (
              <div key={award.title} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{award.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{award.org}</div>
                  <div className="text-xs text-gold font-semibold mt-1">{award.year}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
