import type { Metadata } from "next";
import { ContactClient } from "./client";

export const metadata: Metadata = {
  title: "Contact — Begin Your Journey with Estate Elite",
  description:
    "Speak with a senior advisor for a confidential, no-obligation consultation. Available by phone, email, or in person at our Beverly Hills, New York, or Miami offices.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
