// ─── CORE ENTITIES ──────────────────────────────────────────────────────────

export type PropertyType =
  | "Villa"
  | "Penthouse"
  | "Estate"
  | "Compound"
  | "Chalet"
  | "Apartment"
  | "Townhouse"
  | "Land"
  | "Commercial";

export type PropertyStatus = "For Sale" | "For Rent" | "Sold" | "Under Contract";

export type EnergyRating = "A+" | "A" | "B" | "C" | "D" | "E" | "F";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  languages: string[];
  experience: number;
  totalSales: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  bio: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  activeListings?: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  city: string;
  state: string;
  country: string;
  address: string;
  zipCode: string;
  coordinates: Coordinates;
  images: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  bedrooms: number;
  bathrooms: number;
  halfBaths?: number;
  garage: number;
  size: number;         // sqft
  lotSize?: number;     // sqft
  yearBuilt: number;
  energyRating: EnergyRating;
  amenities: string[];
  features: string[];
  price: number;
  pricePerSqft?: number;
  monthlyHoa?: number;
  propertyTax?: number;
  type: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  badge?: string;
  agent: Agent;
  daysOnMarket?: number;
  floorPlan?: string;
  nearbySchools?: NearbyPlace[];
  nearbyTransport?: NearbyPlace[];
  walkScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface NearbyPlace {
  name: string;
  distance: string;
  rating?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  readTime: number;
  image: string;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export type BlogCategory =
  | "Market Intelligence"
  | "Architecture"
  | "Investments"
  | "Lifestyle"
  | "Design"
  | "Legal";

export interface BlogAuthor {
  name: string;
  image: string;
  role: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
  propertyTitle?: string;
  location?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  coordinates: Coordinates;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

// ─── FILTER / SEARCH ────────────────────────────────────────────────────────

export interface PropertyFilters {
  search: string;
  type: PropertyType | "All";
  status: PropertyStatus | "All";
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minBaths: number;
  minSize: number;
  maxSize: number;
  city: string;
  amenities: string[];
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "size-desc"
  | "beds-desc";

// ─── MORTGAGE CALCULATOR ────────────────────────────────────────────────────

export interface MortgageParams {
  price: number;
  downPaymentPercent: number;
  interestRate: number;
  termYears: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  downPayment: number;
}

// ─── FORMS ──────────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interest: "Buying" | "Selling" | "Renting" | "Investment" | "Valuation";
  budget?: string;
  message: string;
  propertyId?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  preferredDate?: string;
  preferredTime?: string;
}

// ─── UI ─────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Award {
  title: string;
  organization: string;
  year: number;
  icon?: string;
}
