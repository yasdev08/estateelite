// ─── SITE ──────────────────────────────────────────────────────────────────────

export const SITE_NAME = "Estate Elite";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://estateelite.com";
export const SITE_DESCRIPTION =
  "Curated access to the world's most extraordinary homes, estates, and investment properties.";

// ─── PROPERTY ─────────────────────────────────────────────────────────────────

export const PRICE_RANGE = {
  MIN: 1_000_000,
  MAX: 50_000_000,
  STEP: 500_000,
} as const;

export const BED_OPTIONS = [0, 3, 4, 5, 6, 7, 8] as const;

export const PROPERTY_TYPES = [
  "All",
  "Villa",
  "Estate",
  "Penthouse",
  "Compound",
  "Chalet",
  "Apartment",
  "Townhouse",
  "Land",
  "Commercial",
] as const;

export const SORT_OPTIONS = [
  { value: "featured",   label: "Featured First" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "newest",     label: "Newest First" },
  { value: "size-desc",  label: "Largest First" },
  { value: "beds-desc",  label: "Most Bedrooms" },
] as const;

export const AMENITY_OPTIONS = [
  "Pool",
  "Gym",
  "Spa",
  "Home Theater",
  "Wine Cellar",
  "Smart Home",
  "Ocean View",
  "Mountain Views",
  "Private Beach",
  "Tennis Court",
  "Guest House",
  "Elevator",
  "Ski-in/Ski-out",
  "Private Dock",
] as const;

// ─── MORTGAGE ─────────────────────────────────────────────────────────────────

export const MORTGAGE_DEFAULTS = {
  DOWN_PAYMENT_PCT: 20,
  INTEREST_RATE: 6.5,
  TERM_YEARS: 30,
} as const;

// ─── NAV ──────────────────────────────────────────────────────────────────────

export const NAV_HEIGHT = 72;

// ─── ANIMATION ────────────────────────────────────────────────────────────────

export const SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
};

export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_SNAP    = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING  = [0.34, 1.56, 0.64, 1] as const;

// ─── GRID ─────────────────────────────────────────────────────────────────────

export const PROPERTIES_PER_PAGE = 12;
export const BLOG_PER_PAGE = 9;

// ─── CONTACT ──────────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = "13105550100";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// ─── COLORS ───────────────────────────────────────────────────────────────────

export const COLORS = {
  gold:    "#C9A227",
  primary: "#0F172A",
  secondary: "#1E293B",
} as const;
