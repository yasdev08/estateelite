import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MortgageParams, MortgageResult, PropertyFilters } from "@/types";
import { PROPERTIES } from "@/data/properties";

// ─── TAILWIND MERGE ──────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── FORMATTING ──────────────────────────────────────────────────────────────

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceShort(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString()} ft²`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── MORTGAGE CALCULATOR ─────────────────────────────────────────────────────

export function calculateMortgage(params: MortgageParams): MortgageResult {
  const { price, downPaymentPercent, interestRate, termYears } = params;
  const downPayment = price * (downPaymentPercent / 100);
  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPayment = loanAmount / numPayments;
  }

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - loanAmount;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    loanAmount,
    downPayment,
  };
}

// ─── PROPERTY HELPERS ────────────────────────────────────────────────────────

export function filterProperties(filters: Partial<PropertyFilters>) {
  return PROPERTIES.filter((p) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !p.title.toLowerCase().includes(q) &&
        !p.city.toLowerCase().includes(q) &&
        !p.address.toLowerCase().includes(q) &&
        !p.type.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    if (filters.type && filters.type !== "All" && p.type !== filters.type) return false;
    if (filters.status && filters.status !== "All" && p.status !== filters.status) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.minBeds && p.bedrooms < filters.minBeds) return false;
    if (filters.minBaths && p.bathrooms < filters.minBaths) return false;
    if (filters.minSize && p.size < filters.minSize) return false;
    if (filters.maxSize && p.size > filters.maxSize) return false;
    if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    return true;
  });
}

// ─── STRING HELPERS ──────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural ?? singular + "s"}`;
}

// ─── URL HELPERS ─────────────────────────────────────────────────────────────

export function getPropertyUrl(slug: string): string {
  return `/properties/${slug}`;
}

export function getAgentUrl(id: string): string {
  return `/agents/${id}`;
}

export function getBlogUrl(slug: string): string {
  return `/blog/${slug}`;
}

// ─── MISC ────────────────────────────────────────────────────────────────────

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
