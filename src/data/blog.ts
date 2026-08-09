import type { BlogPost, Testimonial } from "@/types";
import { AGENTS } from "./agents";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "anatomy-of-a-trophy-property-2025",
    title: "The New Anatomy of a Trophy Property",
    excerpt:
      "What separates a $20M listing from a $40M one is no longer square footage. We unpack the invisible attributes commanding record premiums in today's ultra-luxury market.",
    content: `
The trophy property market has always operated by its own logic—one largely invisible to outsiders. But in 2025, the gap between a $20M listing and a $40M one is defined less by marble and more by meaning.

**Provenance is the new square footage.** Who designed it, who lived there, what story does it carry? A spec home in Beverly Hills with a Pritzker-laureate credit commands 28% premium over an equivalent spec build by an unknown developer. The Rolodex of the architect has become a line item in the appraisal.

**Privacy infrastructure commands a price.** In a world of satellite imagery and public records, buyers at the highest register are paying extraordinary premiums for properties that offer genuine concealment: gated compounds with bermed landscaping, recorded lot-line consolidations, and documented history of no street-level photography. We tracked a dozen transactions in 2024 where privacy-related attributes added between $2M and $7M to the final price.

**The biophilic premium is real and measurable.** Properties with mature, established trees—particularly specimen oaks over 100 years old—trade at a measurable premium in every coastal market we track. A Bel Air estate sold for $4.2M above comparable recent comps was attributed by the buyer's advisor almost entirely to its grove of 150-year-old live oaks.

The implications are significant for developers, sellers, and acquisition advisors alike. Maximizing value at the trophy tier now requires thinking less about finishes and more about story, infrastructure, and ecological heritage.
    `,
    category: "Market Intelligence",
    tags: ["Trophy Properties", "Market Analysis", "Luxury Trends"],
    author: {
      name: AGENTS[0].name,
      image: AGENTS[0].image,
      role: AGENTS[0].role,
    },
    publishedAt: "2025-07-28T00:00:00Z",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
    featured: true,
    seo: {
      metaTitle: "The New Anatomy of a Trophy Property | Estate Elite",
      metaDescription:
        "What separates a $20M listing from a $40M one? We unpack the invisible attributes commanding record premiums in today's ultra-luxury market.",
    },
  },
  {
    id: "2",
    slug: "designing-for-air-minimal-luxury",
    title: "Designing for Air: Inside the Minimal Luxury Movement",
    excerpt:
      "A conversation with three award-winning architects about how restraint became the defining aesthetic of ultra-high-end residential design in the post-pandemic era.",
    content: `
There is a moment in every site visit to a truly exceptional contemporary home when the architecture stops announcing itself and simply... breathes.

That quality—of designed restraint, of space that feels curated rather than filled—has become the defining characteristic of the most coveted residential architecture of the last five years. We spoke with three architects responsible for some of the decade's most celebrated luxury homes to understand how we arrived here.

**The reaction to excess.** "The 2000s were about demonstrating wealth through surface," says one architect whose Malibu compound sold for $38M last year. "Now our clients want the opposite—they want a house that makes them feel calm, not impressed. Calm is the new luxury."

**Material honesty as status signal.** In this new paradigm, the most expensive material is often the one that looks most like itself. Raw concrete that has been hand-formed and intentionally finished. Sawn limestone left with its natural face. White oak used in structural dimensions rather than veneer thickness. The message is: we didn't need to simulate anything.

**Volume over square footage.** The shift from maximizing square footage to curating volumetric experience has been dramatic. "I have clients spending $35M who are buying 6,000 square feet," notes another architect. "Five years ago that would have been unthinkable. Now they want one great room with 20-foot ceilings rather than twelve rooms with eight."
    `,
    category: "Architecture",
    tags: ["Architecture", "Design", "Minimal Luxury", "Interiors"],
    author: {
      name: "Elena Vasquez",
      image: AGENTS[2].image,
      role: "Residential & Lifestyle Expert",
    },
    publishedAt: "2025-07-15T00:00:00Z",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
    featured: false,
    seo: {
      metaTitle: "Designing for Air: Minimal Luxury Architecture | Estate Elite",
      metaDescription:
        "How restraint became the defining aesthetic of ultra-high-end residential design. Insights from the world's leading luxury architects.",
    },
  },
  {
    id: "3",
    slug: "private-islands-2025-investment-guide",
    title: "Private Islands: The Last True Escape",
    excerpt:
      "From the Bahamas to the Croatian Adriatic, we map the most compelling private island opportunities of 2025, with analysis of infrastructure, legal frameworks, and lifestyle.",
    content: `
The private island market has transformed from a curiosity of the ultra-wealthy into a structured asset class with its own investment logic, legal complexity, and lifestyle calculus.

**Bahamas: The most liquid market.** The Abacos and Exumas continue to offer the most accessible entry point for first-time island buyers. Freehold ownership is available to non-Bahamian nationals, permitting processes have become more predictable, and proximity to Florida makes logistics manageable. Expect $3M–$45M for developed islands; $500K–$5M for raw land.

**Croatia: The European opportunity.** Adriatic islands represent the best infrastructure-to-price ratio in Europe. Croatian law permits EU and non-EU nationals to purchase with minimal restriction, and the combination of UNESCO-listed coastline, established marina infrastructure, and proximity to major European cities makes the Croatian Adriatic compelling. The 2024 regulatory changes streamlined foreign ownership further.

**Infrastructure is everything.** The single most important variable in private island valuation is water: freshwater availability, desalination capacity, and cistern infrastructure. An island without a reliable freshwater solution is an island with an expensive problem. Solar and battery systems have matured to the point where grid-independence is achievable without compromise for most residential uses.
    `,
    category: "Investments",
    tags: ["Private Islands", "International", "Investment"],
    author: {
      name: AGENTS[1].name,
      image: AGENTS[1].image,
      role: AGENTS[1].role,
    },
    publishedAt: "2025-07-03T00:00:00Z",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85",
    featured: false,
    seo: {
      metaTitle: "Private Islands Investment Guide 2025 | Estate Elite",
      metaDescription:
        "The most compelling private island opportunities of 2025. Infrastructure, legal frameworks, and investment analysis.",
    },
  },
  {
    id: "4",
    slug: "art-of-the-off-market-transaction",
    title: "The Art of the Off-Market Transaction",
    excerpt:
      "Nearly 40% of trophy home sales in 2024 never appeared on the MLS. Understanding how off-market deals work—and how to access them—is the single greatest advantage a luxury buyer can have.",
    content: `
The most extraordinary homes rarely appear on Zillow. In markets above $10M, the off-market transaction has become the dominant mode—not the exception.

Understanding this parallel market, how it operates, and how to access it is now the single most important edge available to luxury buyers.
    `,
    category: "Market Intelligence",
    tags: ["Off-Market", "Strategy", "Buying"],
    author: {
      name: AGENTS[0].name,
      image: AGENTS[0].image,
      role: AGENTS[0].role,
    },
    publishedAt: "2025-06-20T00:00:00Z",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
    featured: false,
    seo: {
      metaTitle: "The Art of the Off-Market Transaction | Estate Elite",
      metaDescription:
        "40% of trophy home sales never appear on the MLS. How off-market deals work and how to access them.",
    },
  },
  {
    id: "5",
    slug: "wellness-real-estate-next-frontier",
    title: "Wellness Real Estate: The Next Frontier",
    excerpt:
      "Dedicated cold plunge rooms, circadian lighting systems, EMF shielding—wellness infrastructure has moved from amenity to essential feature in the world's most sought-after homes.",
    content: `
Five years ago, a home gym was a luxury differentiator. Today, a gym without a recovery suite is considered incomplete in any transaction above $8M.

The velocity of wellness infrastructure adoption in high-end residential real estate is unprecedented—and the trajectory suggests it is not slowing.
    `,
    category: "Design",
    tags: ["Wellness", "Design", "Trends", "Luxury"],
    author: {
      name: AGENTS[2].name,
      image: AGENTS[2].image,
      role: AGENTS[2].role,
    },
    publishedAt: "2025-06-05T00:00:00Z",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85",
    featured: false,
    seo: {
      metaTitle: "Wellness Real Estate: The Next Frontier | Estate Elite",
      metaDescription:
        "Circadian lighting, cold plunge rooms, EMF shielding—wellness infrastructure has become essential in ultra-luxury homes.",
    },
  },
  {
    id: "6",
    slug: "understanding-1031-exchanges-luxury",
    title: "1031 Exchanges in the Luxury Tier: What Changes Above $5M",
    excerpt:
      "The mechanics of 1031 exchanges are well understood. But the strategy shifts considerably when applied to trophy assets—here's what sophisticated investors need to know.",
    content: `
The 1031 exchange has long been one of the most powerful tools in the real estate investor's arsenal. But its application to the ultra-luxury tier introduces complexities that require a different strategic framework entirely.
    `,
    category: "Legal",
    tags: ["1031 Exchange", "Tax", "Investment", "Legal"],
    author: {
      name: AGENTS[1].name,
      image: AGENTS[1].image,
      role: AGENTS[1].role,
    },
    publishedAt: "2025-05-22T00:00:00Z",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85",
    featured: false,
    seo: {
      metaTitle: "1031 Exchanges in Luxury Real Estate | Estate Elite",
      metaDescription:
        "How 1031 exchange strategy changes above $5M. Essential reading for sophisticated real estate investors.",
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "James & Claire Whitmore",
    role: "Acquired Malibu Clifftop Villa",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&q=80",
    text: "Estate Elite found us our forever home in under three weeks. Sophia understood exactly what we were seeking—not just the specification, but the feeling. Every property she showed was precisely on brief. The entire experience felt effortless in a way that only deep expertise can produce.",
    rating: 5,
    propertyTitle: "Malibu Clifftop Villa",
    location: "Malibu, CA",
  },
  {
    id: "2",
    name: "Renata Okonkwo",
    role: "Investment Portfolio, New York City",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80",
    text: "Marcus structured a four-property Manhattan acquisition that has outperformed every projection we modeled going in. His market intelligence is genuinely unmatched. He thinks like an investor, not a salesperson—which meant his advice occasionally pointed us away from a deal, and was always right when it did.",
    rating: 5,
    location: "New York, NY",
  },
  {
    id: "3",
    name: "David Hartley",
    role: "Sold Aspen Chalet at Record Price",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    text: "They listed my Red Mountain chalet on a Thursday and had eleven qualified offers by Monday morning. We closed at twenty-two percent above the asking price with no contingencies. I have worked with leading agencies in London, Dubai, and Geneva. Estate Elite operates at a different tier.",
    rating: 5,
    propertyTitle: "Aspen Red Mountain Chalet",
    location: "Aspen, CO",
  },
  {
    id: "4",
    name: "The Nakamura Family",
    role: "Purchased Greenwich Manor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    text: "Relocating from Tokyo with specific requirements around privacy, school access, and proximity to the city, we needed an advisor who could think in our terms. James navigated every nuance—legal, logistical, and personal—with a patience and precision we had not found elsewhere after two years of searching.",
    rating: 5,
    propertyTitle: "Greenwich Back Country Manor",
    location: "Greenwich, CT",
  },
];
