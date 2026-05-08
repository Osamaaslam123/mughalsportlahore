import { MetadataRoute } from "next";

const BASE = "https://mughalsportlahore-ap8u.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/products`,                      lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/products?category=cricket`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/products?category=football`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/products?category=hockey`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/products?category=badminton`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/products?category=basketball`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/products?category=boxing`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/products?category=athletics`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/about`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
