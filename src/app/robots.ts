import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site/url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl().origin;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
