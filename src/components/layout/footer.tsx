import Link from "next/link";
import { Building2, MapPin, Phone, Mail, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/ui/newsletter-form";

const FOOTER_LINKS = {
  Properties: [
    { label: "All Listings", href: "/properties" },
    { label: "Villas & Estates", href: "/properties?type=Villa" },
    { label: "Penthouses", href: "/properties?type=Penthouse" },
    { label: "Beachfront", href: "/properties?badge=Waterfront" },
    { label: "New Listings", href: "/properties?sort=newest" },
    { label: "Featured", href: "/properties?featured=true" },
  ],
  Services: [
    { label: "Buying", href: "/services#buying" },
    { label: "Selling", href: "/services#selling" },
    { label: "Renting", href: "/services#renting" },
    { label: "Investment Advisory", href: "/services#investment" },
    { label: "Property Valuation", href: "/services#valuation" },
    { label: "Property Management", href: "/services#management" },
  ],
  Company: [
    { label: "About Estate Elite", href: "/about" },
    { label: "Our Advisors", href: "/agents" },
    { label: "Market Intelligence", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
};

const OFFICES = [
  { city: "Beverly Hills", address: "9777 Wilshire Blvd, Suite 400", phone: "+1 (310) 555-0100" },
  { city: "New York", address: "432 Park Ave, Floor 62", phone: "+1 (212) 555-0100" },
  { city: "Miami", address: "1111 Brickell Ave, Suite 2800", phone: "+1 (305) 555-0100" },
];

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const AWARDS = [
  "Forbes Top 100 Real Estate Companies 2024",
  "Wall Street Journal Luxury Agency of the Year 2023",
  "Architectural Digest Partners Network Member",
];

export function Footer() {
  return (
    <footer className="bg-[#060C18] text-white/60 relative overflow-hidden">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A227, transparent 70%)" }}
      />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-8">

        {/* Top — Newsletter CTA */}
        <div className="py-16 border-b border-white/[0.06] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-4">Private Briefings</div>
            <h3 className="text-fluid-3xl font-black text-white tracking-tight leading-tight mb-3">
              Stay ahead of the<br />
              <span className="text-gold-gradient">private market</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Weekly intelligence on off-market opportunities, price movements, architectural
              highlights, and investment analysis—delivered exclusively to subscribers.
            </p>
          </div>
          <div>
            <NewsletterForm dark />
            <p className="text-xs text-white/30 mt-3">
              No spam. Unsubscribe at any time. Read by 40,000+ discerning subscribers.
            </p>
          </div>
        </div>

        {/* Middle — links grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-lg transition-transform duration-300 group-hover:scale-105">
                <Building2 className="w-5 h-5 text-white" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-lg font-black tracking-[0.04em] text-white leading-none">ESTATE</div>
                <div className="text-[9px] font-bold tracking-[0.3em] text-gold leading-none mt-0.5">ELITE</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/45 max-w-[260px] mb-8">
              The world's most extraordinary properties, matched to the world's most discerning clients since 1996.
            </p>

            {/* Offices */}
            <div className="space-y-4">
              {OFFICES.map((office) => (
                <div key={office.city} className="flex gap-3">
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-semibold text-white/70 mb-0.5">{office.city}</div>
                    <div className="text-xs text-white/35 leading-relaxed">{office.address}</div>
                    <a href={`tel:${office.phone}`} className="text-xs text-white/35 hover:text-gold transition-colors">
                      {office.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="col-span-1">
              <div className="text-[11px] font-bold tracking-[0.18em] text-gold/80 uppercase mb-5">
                {group}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Awards */}
        <div className="py-10 border-b border-white/[0.06]">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {AWARDS.map((award) => (
                <div
                  key={award}
                  className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-xs text-white/40 font-medium">{award}</span>
                </div>
              ))}
            </div>
            {/* Social */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div>
            © {new Date().getFullYear()} Estate Elite LLC. All rights reserved. DRE#01234567
          </div>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
              <Link key={item} href="#" className="hover:text-white/60 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
