import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { MODULE_SLUGS_QUERY } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/site/url";

// Refreshed on publish via /api/revalidate; daily fallback if webhook misses.
export const revalidate = 86_400;

type ModuleSlug = {
  slug?: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl().origin;

  let moduleSlugs: ModuleSlug[] = [];

  try {
    moduleSlugs = await client.fetch<ModuleSlug[]>(
      MODULE_SLUGS_QUERY,
      {},
      { perspective: "published", useCdn: true, stega: false },
    );
  } catch {
    moduleSlugs = [];
  }

  const moduleEntries: MetadataRoute.Sitemap = moduleSlugs
    .filter((entry): entry is { slug: string; _updatedAt?: string } =>
      Boolean(entry.slug),
    )
    .map((entry) => ({
      url: `${baseUrl}/modules/${entry.slug}`,
      lastModified: entry._updatedAt ? new Date(entry._updatedAt) : undefined,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...moduleEntries,
  ];
}
