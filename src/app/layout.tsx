import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────
   FULL SEO METADATA  (Google reads all of this)
───────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://mughalsportlahore-ap8u.vercel.app"),

  title: {
    default: "Mughal Sports Lahore | Cricket, Football & Hockey Equipment",
    template: "%s | Mughal Sports Lahore",
  },
  description:
    "Mughal Sports Lahore — Pakistan's trusted sports shop since 2005. Supplying cricket bats, footballs, hockey sticks, badminton rackets & complete school sports kits to schools and clubs across Lahore.",

  keywords: [
    "sports shop Lahore",
    "cricket equipment Lahore",
    "cricket bat Lahore",
    "football gear Pakistan",
    "hockey sticks Lahore",
    "badminton racket Lahore",
    "school sports supplier Lahore",
    "sports kit school Pakistan",
    "Mughal Sports",
    "Mughal Sports Lahore",
    "sports equipment Lahore",
    "basketball equipment Lahore",
    "boxing gloves Lahore",
    "athletics equipment Pakistan",
    "sports shop Punjab Pakistan",
    "bulk sports order schools Lahore",
    "Kashmir willow bat Lahore",
    "football jersey school Pakistan",
  ],

  authors: [{ name: "Mughal Sports Lahore" }],
  creator: "Mughal Sports Lahore",
  publisher: "Mughal Sports Lahore",

  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://mughalsportlahore-ap8u.vercel.app",
    siteName: "Mughal Sports Lahore",
    title: "Mughal Sports Lahore | Premium Sports Equipment",
    description:
      "Lahore's most trusted sports shop — cricket, football, hockey, badminton equipment for schools, clubs & athletes since 2005.",
    images: [
      {
        url: "/logo.svg",
        width: 200,
        height: 200,
        alt: "Mughal Sports Lahore Logo",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Mughal Sports Lahore",
    description: "Premium sports equipment for schools and clubs in Lahore, Pakistan.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },

  verification: {
    google: "google4c45478d4de7c48e",
  },
};

/* ─────────────────────────────────────────
   LOCAL BUSINESS SCHEMA  (Google Maps / local search)
───────────────────────────────────────── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SportsGoodsStore",
  name: "Mughal Sports Lahore",
  description:
    "Pakistan's trusted sports equipment shop supplying cricket, football, hockey, badminton and school sports kits across Lahore since 2005.",
  url: "https://mughalsportlahore-ap8u.vercel.app",
  telephone: "+923002787977",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.5204,
    longitude: 74.3587,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  priceRange: "Rs 500 – Rs 50,000",
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash, Bank Transfer",
  areaServed: ["Lahore","Punjab","Pakistan"],
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Local Business Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
