import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { BLOG_POSTS } from "@/data/blog";
import { formatDateShort } from "@/lib/utils";
import type { BlogCategory } from "@/types";

export const metadata: Metadata = {
  title: "Market Intelligence — Luxury Real Estate Insights & Analysis",
  description:
    "Expert analysis on luxury real estate markets, architecture, investment strategy, and lifestyle—written by Estate Elite's senior advisors.",
  alternates: { canonical: "/blog" },
};

const CATEGORIES: Array<BlogCategory | "All"> = [
  "All", "Market Intelligence", "Architecture", "Investments", "Design", "Legal", "Lifestyle",
];

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Header */}
      <div className="bg-[#07111F] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A227 1px, transparent 0)`, backgroundSize: "48px 48px" }}
        />
        <div className="relative max-w-[1360px] mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="section-label mb-4">Intelligence</div>
            <h1 className="text-fluid-6xl font-black text-white tracking-tight leading-none mb-5">
              Market Intelligence
            </h1>
            <p className="text-white/50 text-[15px] max-w-lg leading-relaxed">
              Original analysis on luxury real estate, architecture, investment strategy, and the
              cultural forces shaping the world&apos;s finest properties.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-16">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                cat === "All"
                  ? "bg-gold/10 border-gold text-gold"
                  : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-gold/40 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured article */}
        <SectionReveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-card-hover transition-all duration-400 mb-12 bg-white dark:bg-slate-900"
          >
            <div className="relative h-72 lg:h-auto overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 dark:to-slate-900/20" />
              <span className="absolute top-5 left-5 badge-gold">{featured.category}</span>
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <Image
                  src={featured.author.image}
                  alt={featured.author.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover object-top"
                />
                <div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{featured.author.name}</div>
                  <div className="text-xs text-slate-400">{featured.author.role}</div>
                </div>
              </div>
              <h2 className="text-fluid-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-4 group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{formatDateShort(featured.publishedAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime} min read</span>
                </div>
                <span className="text-sm font-semibold text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </SectionReveal>

        {/* Rest of articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map((post, i) => (
            <SectionReveal key={post.id} delay={i * 0.07}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400 h-full"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 badge-gold">{post.category}</span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover object-top"
                      />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{post.author.name}</span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime} min
                    </span>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
