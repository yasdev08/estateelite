import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingButtons } from "@/components/ui/floating-buttons";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://estateelite.com"),
  title: {
    default: "Estate Elite — World-Class Luxury Real Estate",
    template: "%s | Estate Elite",
  },
  description:
    "Curated access to the world's most extraordinary homes, estates, and investment properties. Luxury real estate advisory with a 28-year track record of exceptional results.",
  keywords: [
    "luxury real estate", "luxury homes", "ultra-luxury properties",
    "Beverly Hills real estate", "Malibu villas", "NYC penthouses",
    "estate agency", "property advisory", "high-end homes",
  ],
  authors: [{ name: "Estate Elite", url: "https://estateelite.com" }],
  creator: "Estate Elite",
  publisher: "Estate Elite",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Estate Elite",
    title: "Estate Elite — World-Class Luxury Real Estate",
    description:
      "Curated access to the world's most extraordinary homes, estates, and investment properties.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Estate Elite" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@estateelite",
    creator: "@estateelite",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingButtons />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
