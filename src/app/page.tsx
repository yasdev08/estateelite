import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Globe, Key, TrendingUp, Users } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PropertyCard } from "@/components/ui/property-card";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getFeaturedProperties } from "@/data/properties";
import { BLOG_POSTS } from "@/data/blog";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Estate Elite — World-Class Luxury Real Estate",
  description:
    "Curated access to the world's most extraordinary homes, estates, and investment properties. Luxury real estate advisory with a 28-year track record.",
  alternates: { canonical: "/" },
};

const WHY_CHOOSE = [
  {
    icon: Key,
    title: "Exclusive Off-Market Access",
    body: "Over 40% of our properties never appear publicly. Our network gives clients first access to trophy assets before they ever reach the market.",
  },
  {
    icon: Globe,
    title: "Global Affiliate Network",
    body: "200+ partner agencies across 45 countries. Whether acquiring in Monaco or selling in Manhattan, our reach is unparalleled.",
  },
  {
    icon: TrendingUp,
    title: "Proprietary Market Intelligence",
    body: "Our data platform tracks micro-market dynamics in real time, ensuring every transaction is backed by the deepest available intelligence.",
  },
  {
    icon: Users,
    title: "One Advisor, End to End",
    body: "Your dedicated advisor manages every element of your transaction personally. No handoffs. No teams of strangers. One trusted relationship.",
  },
];

const SERVICES = [
  { title: "Acquisition Advisory", desc: "End-to-end buyer representation with access to the full market, including off-market." },
  { title: "Discreet Sales", desc: "Confidential marketing strategies that maximize value while protecting your privacy." },
  { title: "Investment Portfolios", desc: "Multi-asset acquisition, structuring, and disposition for family offices and private investors." },
  { title: "Property Valuation", desc: "Precise, market-supported valuations for insurance, estate planning, or sale preparation." },
  { title: "New Development", desc: "Preferred access to significant residential and mixed-use development pre-releases." },
  { title: "Property Management", desc: "White-glove stewardship of your property portfolio whether you occupy it or not." },
];

export default function HomePage() {
  const featured = getFeaturedProperties(6);
  const blogs = BLOG_POSTS.slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Search Bar strip ── */}
      <div className="bg-white dark:bg-slate-950 py-0">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl -mt-8 relative z-10 shadow-property border border-slate-100 dark:border-slate-800 p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              {/* Location */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <svg className="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <input
                  type="text"
                  placeholder="City, neighborhood, or address"
                  className="bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 w-full"
                />
              </div>
              {/* Type pills */}
              <div className="flex gap-2 shrink-0">
                {["Buy", "Rent", "Sell"].map((t, i) => (
                  <button
                    key={t}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${i === 0 ? "btn-gold text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-gold"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Link
                href="/properties"
                className="btn-gold flex items-center justify-center gap-2 text-white font-semibold text-sm px-7 py-3 shrink-0"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Properties ── */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
              <div>
                <div className="section-label mb-3">Curated Selection</div>
                <h2 className="text-fluid-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  Featured Properties
                </h2>
              </div>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors group"
              >
                View All
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </SectionReveal>

          {/* Type filters */}
          <SectionReveal delay={0.1}>
            <div className="flex gap-2 flex-wrap mb-10">
              {["All", "Villa", "Estate", "Penthouse", "Chalet", "Compound"].map((type) => (
                <button
                  key={type}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    type === "All"
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-gold/40 hover:text-gold"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {featured.map((property, i) => (
              <SectionReveal key={property.id} delay={i * 0.07}>
                <PropertyCard property={property} priority={i < 3} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <Stats />

      {/* ── Why Choose Us ── */}
      <section className="py-28 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-80 h-80 -translate-y-1/2 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <SectionReveal>
              <div className="section-label mb-4">Our Advantage</div>
              <h2 className="text-fluid-4xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                Why discerning buyers choose
                <span className="text-gold-gradient"> Estate Elite</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-10 max-w-md">
                We built this firm on a single premise: that the world&apos;s most extraordinary clients
                deserve advisors who match their standards in every regard.
              </p>
              <ul className="space-y-3">
                {[
                  "Off-market access to the rarest properties",
                  "Dedicated advisor throughout every transaction",
                  "Global network across 45+ countries",
                  "Proprietary market intelligence platform",
                  "Strict confidentiality on every engagement",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-gold shrink-0 fill-gold/10" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/about" className="btn-ghost inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Our Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_CHOOSE.map((item, i) => (
                <SectionReveal key={item.title} delay={i * 0.08}>
                  <div className="group p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-gold/30 dark:hover:border-gold/30 transition-all duration-400 hover:shadow-gold cursor-default">
                    <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-[14px] mb-2 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.body}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-14">
              <div className="section-label mb-3">What We Do</div>
              <h2 className="text-fluid-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Our Services
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <SectionReveal key={svc.title} delay={i * 0.06}>
                <div className="group relative p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-gold/40 transition-all duration-400 hover:-translate-y-1 hover:shadow-card-hover cursor-default overflow-hidden">
                  <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gold-gradient transition-all duration-600" />
                  <div className="text-xl font-bold text-slate-900 dark:text-white mb-3">{svc.title}</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{svc.desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── Blog Preview ── */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
              <div>
                <div className="section-label mb-3">Market Intelligence</div>
                <h2 className="text-fluid-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  Latest Insights
                </h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark group">
                All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {blogs.map((post, i) => (
              <SectionReveal key={post.id} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-card-hover transition-all duration-400"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 badge-gold">{post.category}</span>
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image src={post.author.image} alt={post.author.name} width={24} height={24} className="w-6 h-6 rounded-full object-cover object-top" />
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{post.author.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{post.readTime} min</span>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 bg-[#060C18] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="relative max-w-[640px] mx-auto px-6 lg:px-8 text-center">
          <SectionReveal>
            <div className="section-label mb-4">Private Briefings</div>
            <h2 className="text-fluid-4xl font-black text-white tracking-tight leading-tight mb-4">
              The inner circle,<br />
              <span className="text-gold-gradient">every week</span>
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed mb-10">
              Off-market opportunities, price intelligence, and architectural highlights—
              delivered to 40,000+ subscribers every Monday morning.
            </p>
            <NewsletterForm dark />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
