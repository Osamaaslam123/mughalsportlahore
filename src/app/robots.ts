import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: "https://mughalsportlahore-ap8u.vercel.app/sitemap.xml",
    host:    "https://mughalsportlahore-ap8u.vercel.app",
  };
}
