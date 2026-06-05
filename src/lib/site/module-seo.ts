import type { Metadata } from "next";

import type { ModulePageData } from "@/components/module-page/types";
import { portableTextToPlainText } from "@/lib/portable-text/plain-text";
import { urlFor } from "@/sanity/lib/image";

import { getAudienceLabel, getFormatLabel } from "./audience";
import { STUDIO_ADDRESS_FULL, STUDIO_CITY } from "./address";
import { SITE_LOCALE, SITE_NAME, SITE_SHORT_NAME } from "./metadata";
import { absoluteUrl } from "./url";

export function buildModuleDescription(module: ModulePageData): string {
  if (module.seo?.description?.trim()) {
    return module.seo.description.trim();
  }

  const audience = getAudienceLabel(module.targetAudience, "");
  const format = getFormatLabel(module.format);
  const theoryExcerpt = portableTextToPlainText(module.theory, 90);
  const parts = [
    `Майсторски клас по ${module.title} в ${SITE_SHORT_NAME} Academy, ${STUDIO_CITY}.`,
    audience,
    format,
    theoryExcerpt,
  ].filter(Boolean);

  const description = parts.join(" ").replace(/\s+/g, " ").trim();

  if (description.length <= 160) {
    return description;
  }

  return `${description.slice(0, 159).trimEnd()}…`;
}

export function buildModuleTitle(module: ModulePageData): string {
  return module.seo?.title?.trim() || `${module.title} — майсторски клас`;
}

export function buildModuleMetadata(
  module: ModulePageData,
  slug: string,
): Metadata {
  const title = buildModuleTitle(module);
  const description = buildModuleDescription(module);
  const canonicalPath = `/modules/${slug}`;
  const imageSource = module.seo?.image || module.backgroundImage;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  if (imageSource) {
    const ogImage = {
      url: urlFor(imageSource).width(1200).height(630).url(),
      width: 1200,
      height: 630,
      alt: imageSource.alt || module.title,
    };

    metadata.openGraph = {
      ...metadata.openGraph,
      images: [ogImage],
    };
    metadata.twitter = {
      ...metadata.twitter,
      images: [ogImage.url],
    };
  }

  if (module.seo?.noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}

export function buildModulePagePath(slug: string) {
  return `/modules/${slug}`;
}

export function buildModulePageUrl(slug: string) {
  return absoluteUrl(buildModulePagePath(slug));
}

export function buildModuleHeroLead(module: ModulePageData): string {
  const audience = getAudienceLabel(module.targetAudience);
  const format = getFormatLabel(module.format);
  const details = [audience, format].filter(Boolean).join(" · ");

  return `Практически курс в ${STUDIO_ADDRESS_FULL}.${details ? ` ${details}.` : ""}`;
}
