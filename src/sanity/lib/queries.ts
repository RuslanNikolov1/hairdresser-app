import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    notificationEmail,
    contactEmail,
    contactPhone,
    facebookUrl,
    facebookLabel,
    instagramUrl,
    instagramLabel
  }
`);

export const MODULE_SLUGS_QUERY = defineQuery(`
  *[_type == "module" && coalesce(status, "live") == "live" && defined(slug.current)] {
    "slug": slug.current,
    "_updatedAt": _updatedAt
  }
`);

export const MODULES_INDEX_QUERY = defineQuery(`
  *[_type == "module" && coalesce(status, "live") == "live" && defined(slug.current)]
  | order(startAt asc) {
    _id,
    title,
    "slug": slug.current,
    targetAudience,
    startAt,
    price,
    backgroundImage {
      alt,
      asset->{ _id, url, metadata { lqip, dimensions } },
      crop,
      hotspot
    }
  }
`);

export const MODULE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "module" && slug.current == $slug && coalesce(status, "live") == "live"][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    backgroundImage {
      alt,
      asset->{ _id, url, metadata { lqip, dimensions } },
      crop,
      hotspot
    },
    targetAudience,
    theory,
    practice,
    startAt,
    "duration": coalesce(
      duration,
      select(defined(durationMinutes) => string(durationMinutes) + " минути")
    ),
    format,
    price,
    processImages[] {
      _key,
      alt,
      asset->{ _id, url, metadata { lqip, dimensions } },
      crop,
      hotspot
    },
    beforeAfterImages[] {
      _key,
      alt,
      asset->{ _id, url, metadata { lqip, dimensions } },
      crop,
      hotspot
    },
    certificateImage {
      alt,
      asset->{ _id, url, metadata { lqip, dimensions } },
      crop,
      hotspot
    },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, ""),
      "image": coalesce(seo.image, backgroundImage),
      "noIndex": seo.noIndex == true
    }
  }
`);
