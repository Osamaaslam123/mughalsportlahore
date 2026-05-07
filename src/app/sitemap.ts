import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mughal-sports-lahore.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/products?category=cricket`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/products?category=football`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/products?category=hockey`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/products?category=badminton`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
