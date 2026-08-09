import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Stats } from "@/components/sections/stats";
import { SectionReveal } from "@/components/ui/section-reveal";

export const metadata: Metadata = {
  title: "About Estate Elite — A 28-Year Legacy of Exceptional Real Estate",
  description:
    "Founded in 1996 on the principle that extraordinary clients deserve extraordinary advisors. $14B+ in lifetime transactions across the world's most coveted addresses.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  { year: "1996", title: "Founded in Los Angeles", body: "Two architects with a shared conviction: that the world's most discerning buyers deserved advisors who matched their standards in every regard." },
  { year: "2004", title: "First $10M Transaction", body: "A landmark Beverly Hills sale cemented our position in the ultra-luxury segment and established the advisory model we still use today." },
  { year: "2008", title: "Through the Crisis", body: "While others contracted, we doubled down on client relationships. 100% of our client base stayed with us through the financial crisis—a testament to trust built over years." },
  { year: "2012", title: "Global Expansion", body: "Opened international affiliate offices in London, Dubai, and Singapore, forming the nucleus of our 200+ partner global network." },
  { year: "2019", title: "Proprietary Intelligence Platform", body: "Launched our real-time market data platform, giving clients unprecedented visibility into micro-market dynamics before making acquisition decisions." },
  { year: "2024", title: "$14 Billion Milestone", body: "A milestone reached through relationships, not volume. Every transaction still personally supervised by a senior advisor from first call to closing." },
];

const VALUES = [
  { title: "Integrity Before Commission", body: "We advise clients to walk away from deals that don't serve their long-term interests—even when it costs us the fee. Our reputation is measured in decades, not transactions." },
  { title: "Access Over Volume", body: "We maintain a deliberately selective portfolio so every property receives the positioning and attention it deserves. We would rather represent ten great properties than a hundred average ones." },
  { title: "Relationships Across Lifetimes", body: "78% of our business comes through referrals from existing clients. Our advisors are partners across decades, not one-time facilitators. We measure success in lifelong trust." },
  { title: "Transparent Counsel Always", body: "We share our honest market assessment, even when it contradicts what a client hopes to hear. Candor in the short term protects relationships for the long term." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* ── Hero ── */}
      <div className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85"
          alt="Estate Elite office"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/85" />
        <div className="absolute inset-0 flex items-end pb-20 px-6 lg:px-8 pt-24">
          <div className="max-w-[1360px] mx-auto w-full">
            <SectionReveal>
              <div className="section-label mb-4">Est. 1996</div>
              <h1 className="text-fluid-6xl font-black text-white tracking-tight leading-[1.0] max-w-3xl">
                Thirty Years of<br />Exceptional Judgment
              </h1>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* ── Mission ── */}
      <section className="py-28">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <SectionReveal>
              <div className="section-label mb-4">Our Mission</div>
              <h2 className="text-fluid-4xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                We don&apos;t sell properties.
                We make introductions.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-5">
                Estate Elite was founded on a contrarian premise: that the world&apos;s most discerning buyers don&apos;t need more listings—they need a trusted advisor who understands their vision and has the access to realize it.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-5">
                Every relationship begins with listening. We learn what a client is truly seeking before we ever recommend a property. That philosophy—maintained across every advisor and every transaction since 1996—is why 78% of our business comes through referrals.
              </p>
              <ul className="space-y-2.5 mt-8">
                {[
                  "Personal advisor assigned from day one",
                  "No cold calls, no mass marketing",
                  "Strict confidentiality on every engagement",
                  "Flat-fee advisory option for qualified buyers",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-gold shrink-0 fill-gold/10" />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal direction="left">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85"
                  alt="Luxury property exterior"
                  width={600}
                  height={700}
                  className="w-full rounded-3xl object-cover"
                  style={{ aspectRatio: "5/6" }}
                />
                {/* Gold card overlay */}
                <div className="absolute -bottom-6 -left-6 bg-gold-gradient rounded-2xl p-6 shadow-gold-lg">
                  <div className="text-white text-4xl font-black">$14B+</div>
                  <div className="text-white/80 text-sm font-semibold mt-1">Lifetime Transactions</div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <Stats />

      {/* ── Timeline ── */}
      <section className="py-28 bg-white dark:bg-slate-950">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="section-label mb-3">History</div>
              <h2 className="text-fluid-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Our Journey
              </h2>
            </div>
          </SectionReveal>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[20px] top-2 bottom-2 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent" />

            <div className="space-y-10 pl-14">
              {TIMELINE.map((item, i) => (
                <SectionReveal key={item.year} delay={i * 0.07}>
                  <div className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[46px] top-1.5 w-5 h-5 rounded-full bg-gold-gradient border-4 border-white dark:border-slate-950 shadow-gold" />
                    <div className="text-xs font-bold text-gold tracking-widest uppercase mb-1">{item.year}</div>
                    <div className="text-lg font-black text-slate-900 dark:text-white mb-2">{item.title}</div>
                    <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.body}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-14">
              <div className="section-label mb-3">Principles</div>
              <h2 className="text-fluid-4xl font-black text-slate-900 dark:text-white tracking-tight">
                What We Stand For
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.08}>
                <div className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-gold/30 transition-all duration-400">
                  <div className="w-1 h-12 rounded-full bg-gold-gradient mb-6" />
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">{v.title}</h3>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">{v.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#07111F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <SectionReveal>
            <div className="section-label mb-4">Begin Your Journey</div>
            <h2 className="text-fluid-4xl font-black text-white tracking-tight mb-5">
              Let&apos;s have a<br />
              <span className="text-gold-gradient">conversation</span>
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed mb-10 max-w-lg mx-auto">
              Whether you&apos;re beginning to explore or ready to move, our advisors are available for a confidential, no-obligation consultation.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-gold px-8 py-3.5 text-white font-bold inline-flex items-center gap-2">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/properties" className="glass px-8 py-3.5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2">
                View Properties
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
