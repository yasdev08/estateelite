import type { Metadata } from "next";
import Link from "next/link";
import {
  Key, TrendingUp, Users, Building2, BarChart3,
  Globe, Shield, Home, ArrowRight, CheckCircle2,
} from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";

export const metadata: Metadata = {
  title: "Services — Luxury Real Estate Advisory Services",
  description:
    "From discreet acquisition to investment portfolio management, Estate Elite provides a full spectrum of luxury real estate services for the world's most discerning clients.",
};

const SERVICES = [
  {
    id: "buying",
    icon: Key,
    title: "Acquisition Advisory",
    tagline: "Find what others can't access.",
    description:
      "We represent buyers with the same care we'd apply to our own acquisitions. Our process begins with deep listening—understanding not just your specifications but the life you intend to live—and ends only when you have the keys to the right property at the right terms.",
    features: [
      "Access to off-market inventory unavailable elsewhere",
      "Proprietary market analysis for every candidate property",
      "Full legal and due diligence coordination",
      "Negotiation strategy developed by our senior team",
      "Post-acquisition transition support",
    ],
  },
  {
    id: "selling",
    icon: TrendingUp,
    title: "Discreet Sales",
    tagline: "Maximum value. Minimum exposure.",
    description:
      "We create bespoke marketing strategies for each property—ranging from fully private placements to targeted digital campaigns reaching qualified buyers in over 45 countries. Our average list-to-sale ratio over the past five years is 98.4%.",
    features: [
      "Confidential off-market pre-marketing phase",
      "Professional photography, video, and virtual tour production",
      "International buyer outreach through our affiliate network",
      "Strategic pricing backed by proprietary comparable data",
      "White-glove offer management and negotiation",
    ],
  },
  {
    id: "investment",
    icon: BarChart3,
    title: "Investment Advisory",
    tagline: "Portfolios built to outperform.",
    description:
      "For family offices, private investors, and institutions seeking trophy asset exposure, we provide full-cycle investment advisory: acquisition sourcing, portfolio structuring, tax-optimized disposition, and 1031 exchange coordination across all major US markets.",
    features: [
      "Market analysis and acquisition targeting",
      "Portfolio structuring and stress-testing",
      "1031 exchange strategy and execution",
      "Cap rate and yield analysis",
      "Exit strategy planning and disposition",
    ],
  },
  {
    id: "valuation",
    icon: Globe,
    title: "Property Valuation",
    tagline: "Know exactly what you own.",
    description:
      "Our valuation service produces defensible, market-grounded assessments backed by our proprietary comparable transaction database. Used by clients for estate planning, insurance coverage, lending, charitable gift planning, and pre-listing pricing strategy.",
    features: [
      "Full written valuation report",
      "Comparable transaction analysis",
      "Adjustment methodology documentation",
      "Expert testimony available",
      "Turnaround within 5 business days",
    ],
  },
  {
    id: "renting",
    icon: Home,
    title: "Luxury Rentals",
    tagline: "The right home, exactly when you need it.",
    description:
      "Whether you need a six-month occupancy during a relocation, a seasonal residence in Aspen or the Hamptons, or a corporate retreat for an executive team, our rental advisory service secures exceptional properties with the same care we bring to sales.",
    features: [
      "Curated short and long-term luxury inventory",
      "Pre-screened qualified tenant representation",
      "Lease negotiation and review",
      "Property management referrals",
      "Seasonal availability tracking",
    ],
  },
  {
    id: "management",
    icon: Shield,
    title: "Property Management",
    tagline: "White-glove stewardship, always.",
    description:
      "For clients who own properties they don't occupy year-round, our property management service provides 24/7 oversight, vendor coordination, preventive maintenance, emergency response, and detailed financial reporting—treating every home as if it were our own.",
    features: [
      "24/7 emergency response and monitoring",
      "Trusted vendor network for all trades",
      "Monthly financial and condition reporting",
      "Seasonal opening and closing protocols",
      "Rental income management if applicable",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Header */}
      <div className="bg-[#07111F] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A227 1px, transparent 0)`, backgroundSize: "48px 48px" }}
        />
        <div className="relative max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="section-label mb-4">What We Do</div>
            <h1 className="text-fluid-6xl font-black text-white tracking-tight leading-none mb-5">
              Our Services
            </h1>
            <p className="text-white/50 text-[15px] max-w-xl leading-relaxed">
              A full spectrum of luxury real estate advisory services,
              each delivered with the same commitment to exceptional outcomes.
            </p>
          </SectionReveal>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-20">
        <div className="space-y-6">
          {SERVICES.map((svc, i) => (
            <SectionReveal key={svc.id} delay={i * 0.05}>
              <div
                id={svc.id}
                className="group grid grid-cols-1 lg:grid-cols-[64px_1fr_320px] gap-8 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-gold/20 hover:shadow-card-hover transition-all duration-500 items-start"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/15 transition-colors shrink-0">
                  <svc.icon className="w-6 h-6 text-gold" />
                </div>

                {/* Content */}
                <div>
                  <div className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{svc.tagline}</div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">{svc.title}</h2>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                    {svc.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">Includes</div>
                  <ul className="space-y-2">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5 fill-gold/10" />
                        <span className="text-slate-600 dark:text-slate-400">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionReveal>
            <div className="section-label mb-3">Get Started</div>
            <h2 className="text-fluid-4xl font-black text-slate-900 dark:text-white tracking-tight mb-5">
              Ready to begin?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-8">
              All engagements begin with a confidential, obligation-free consultation.
              Tell us what you&apos;re looking for—we&apos;ll tell you honestly whether we can help.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-gold px-8 py-3.5 text-white font-bold rounded-xl inline-flex items-center gap-2">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/properties" className="px-8 py-3.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:border-gold/40 hover:text-gold transition-all inline-flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Browse Properties
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
