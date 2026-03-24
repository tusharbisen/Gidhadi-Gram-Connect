import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

// Next.js auto-serves this at /sitemap.xml
// Submit the URL to Google Search Console after deploying

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now  = new Date();

  return [
    {
      url:              base,
      lastModified:     now,
      changeFrequency:  "daily",
      priority:         1.0,
    },
    {
      url:              `${base}/about`,
      lastModified:     now,
      changeFrequency:  "monthly",
      priority:         0.8,
    },
    {
      url:              `${base}/schemes`,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         0.9,
    },
    {
      url:              `${base}/news`,
      lastModified:     now,
      changeFrequency:  "daily",
      priority:         0.9,
    },
    {
      url:              `${base}/grievance`,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         0.8,
    },
    {
      url:              `${base}/gallery`,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         0.7,
    },
    {
      url:              `${base}/documents`,
      lastModified:     now,
      changeFrequency:  "monthly",
      priority:         0.7,
    },
    {
      url:              `${base}/village-info`,
      lastModified:     now,
      changeFrequency:  "monthly",
      priority:         0.8,
    },
  ];
}
