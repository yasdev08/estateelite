import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyBySlug, getRelatedProperties } from "@/data/properties";
import { PropertyDetailClient } from "./client";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyBySlug(id);
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} — ${formatPrice(property.price)}`,
    description: property.description.slice(0, 160),
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images.slice(0, 3).map((url) => ({
        url,
        width: 1400,
        height: 900,
        alt: property.title,
      })),
      type: "website",
    },
    other: {
      "property:price:amount": String(property.price),
      "property:price:currency": "USD",
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = getPropertyBySlug(id);
  if (!property) notFound();

  const related = getRelatedProperties(property.id, 3);

  return <PropertyDetailClient property={property} related={related} />;
}
