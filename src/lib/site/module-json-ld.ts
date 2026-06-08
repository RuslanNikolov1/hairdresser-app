import type { ModulePageData } from "@/components/module-page/types";

import { getAudienceLabel, getFormatLabel } from "./audience";
import { STUDIO_ADDRESS, STUDIO_ADDRESS_MAPS_URL, STUDIO_CITY } from "./address";
import {
  buildModuleDescription,
  buildModulePageUrl,
} from "./module-seo";
import { SITE_SHORT_NAME } from "./metadata";
import { absoluteUrl } from "./url";

function durationToIso8601(duration?: string): string | undefined {
  const trimmed = duration?.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^\d+$/.test(trimmed)) {
    return `PT${trimmed}M`;
  }

  const minutesMatch = trimmed.match(/^(\d+)\s*мин/i);
  if (minutesMatch) {
    return `PT${minutesMatch[1]}M`;
  }

  return undefined;
}

export function buildModuleJsonLd(module: ModulePageData, slug: string) {
  const pageUrl = buildModulePageUrl(slug);
  const organizationId = `${absoluteUrl("/")}#organization`;
  const courseDuration = durationToIso8601(module.duration);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Начало",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: module.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Course",
        "@id": pageUrl,
        name: module.title,
        description: buildModuleDescription(module),
        url: pageUrl,
        inLanguage: "bg",
        provider: { "@id": organizationId },
        educationalLevel: getAudienceLabel(module.targetAudience),
        courseMode: module.format === "individual" ? "offline" : "offline",
        teaches: module.title,
        locationCreated: {
          "@type": "Place",
          name: `${SITE_SHORT_NAME} Studio`,
          address: {
            "@type": "PostalAddress",
            streetAddress: STUDIO_ADDRESS,
            addressLocality: STUDIO_CITY,
            addressCountry: "BG",
          },
          hasMap: STUDIO_ADDRESS_MAPS_URL,
        },
        ...(getFormatLabel(module.format)
          ? { learningResourceType: getFormatLabel(module.format) }
          : {}),
        ...(typeof module.price === "number"
          ? {
              offers: {
                "@type": "Offer",
                price: module.price,
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                url: `${pageUrl}#signup`,
              },
            }
          : {}),
        ...(module.startAt
          ? {
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "onsite",
                startDate: module.startAt,
                location: {
                  "@type": "Place",
                  name: STUDIO_ADDRESS,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: STUDIO_ADDRESS,
                    addressLocality: STUDIO_CITY,
                    addressCountry: "BG",
                  },
                },
                ...(courseDuration ? { duration: courseDuration } : {}),
              },
            }
          : {}),
      },
    ],
  };
}
