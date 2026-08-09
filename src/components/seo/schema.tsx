import type { Property } from "@/types";

interface OrganizationSchemaProps {
  url?: string;
}

export function OrganizationSchema({ url = "https://estateelite.com" }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Estate Elite",
    description:
      "World-class luxury real estate advisory with 28 years of excellence. Curated access to the world's most extraordinary properties.",
    url,
    logo: `${url}/logo.png`,
    foundingDate: "1996",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9777 Wilshire Blvd, Suite 400",
      addressLocality: "Beverly Hills",
      addressRegion: "CA",
      postalCode: "90212",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-310-555-0100",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["English", "French", "Spanish", "German", "Mandarin", "Portuguese"],
      },
    ],
    sameAs: [
      "https://instagram.com/estateelite",
      "https://twitter.com/estateelite",
      "https://linkedin.com/company/estateelite",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "618",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface PropertySchemaProps {
  property: Property;
  url: string;
}

export function PropertySchema({ property, url }: PropertySchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url,
    image: property.images,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.zipCode,
      addressCountry: property.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.coordinates.lat,
      longitude: property.coordinates.lng,
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.size,
      unitCode: "FTK",
    },
    yearBuilt: property.yearBuilt,
    amenityFeature: property.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; href: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://estateelite.com${item.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
