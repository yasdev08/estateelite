import type { Metadata } from "next";
import { PropertiesClient } from "./client";
import { PROPERTIES } from "@/data/properties";

export const metadata: Metadata = {
  title: "Properties — Luxury Real Estate Portfolio",
  description:
    "Browse our curated collection of extraordinary luxury properties—villas, penthouses, estates, and more across the world's most coveted addresses.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "Properties — Estate Elite",
    description: "Browse extraordinary luxury properties across the world's most coveted addresses.",
    images: [{ url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80" }],
  },
};

export default function PropertiesPage() {
  return <PropertiesClient properties={PROPERTIES} />;
}
