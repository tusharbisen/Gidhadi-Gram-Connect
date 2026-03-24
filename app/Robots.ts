import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

// Next.js auto-serves this at /robots.txt

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow: [
          "/admin/",       // never index admin pages
          "/api/",         // never index API routes
          "/_next/",       // Next.js internals
        ],
      },
    ],
    sitemap:  `${SITE_CONFIG.url}/sitemap.xml`,
    host:     SITE_CONFIG.url,
  };
}
