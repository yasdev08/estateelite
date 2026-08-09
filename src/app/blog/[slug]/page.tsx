import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import { SectionReveal } from "@/components/ui/section-reveal";
import { formatDateShort } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 3);

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />

        <div className="absolute inset-0 flex items-end pb-14 px-6 lg:px-8">
          <div className="max-w-[800px] mx-auto w-full">
            <SectionReveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Intelligence
              </Link>
              <span className="badge-gold mb-4 inline-block">{post.category}</span>
              <h1 className="text-fluid-5xl font-black text-white tracking-tight leading-[1.05] text-balance">
                {post.title}
              </h1>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Author + meta bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover object-top"
            />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{post.author.name}</div>
              <div className="text-xs text-slate-400">{post.author.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDateShort(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[800px] mx-auto px-6 lg:px-8 py-16">
        {/* Excerpt / lead */}
        <SectionReveal>
          <p className="text-fluid-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed border-l-4 border-gold pl-6 mb-12">
            {post.excerpt}
          </p>
        </SectionReveal>

        {/* Content */}
        <SectionReveal delay={0.1}>
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-black prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              prose-ul:space-y-1"
            dangerouslySetInnerHTML={{ __html: post.content
              .split("\n\n")
              .map((para) => {
                if (para.startsWith("**") && para.endsWith("**")) {
                  return `<h2>${para.slice(2, -2)}</h2>`;
                }
                return `<p>${para
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\n/g, "<br/>")}</p>`;
              })
              .join("")
            }}
          />
        </SectionReveal>

        {/* Tags */}
        <SectionReveal delay={0.2} className="mt-14 pt-10 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3.5 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </SectionReveal>

        {/* Author bio card */}
        <SectionReveal delay={0.25} className="mt-10">
          <div className="flex gap-5 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-2xl object-cover object-top shrink-0"
            />
            <div>
              <div className="text-xs font-bold tracking-widest text-gold uppercase mb-1">Written by</div>
              <div className="font-black text-slate-900 dark:text-white text-base">{post.author.name}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{post.author.role} at Estate Elite</div>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-slate-100 dark:border-slate-800 py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
            <SectionReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="section-label mb-2">Continue Reading</div>
                  <h2 className="text-fluid-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Related Articles
                  </h2>
                </div>
                <Link href="/blog" className="text-sm font-semibold text-gold flex items-center gap-1 hover:text-gold-dark group">
                  All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {related.map((rel, i) => (
                <SectionReveal key={rel.id} delay={i * 0.07}>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-bold text-gold uppercase tracking-widest">{rel.category}</span>
                      <h3 className="font-black text-slate-900 dark:text-white text-sm leading-snug mt-2 group-hover:text-gold transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <div className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {rel.readTime} min
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
