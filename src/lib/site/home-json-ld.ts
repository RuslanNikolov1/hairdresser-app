import type { HomePageModule } from "@/components/home-page/HomePage";
import { instructor } from "@/components/home-page/content";
import type { SignupContacts } from "@/lib/signup/contacts";

import { getAudienceLabel } from "./audience";
import { STUDIO_ADDRESS, STUDIO_ADDRESS_MAPS_URL, STUDIO_CITY } from "./address";
import { HOME_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from "./metadata";
import { absoluteUrl } from "./url";

type HomeJsonLdInput = {
  modules: HomePageModule[];
  contacts: SignupContacts;
};

export function buildHomeJsonLd({ modules, contacts }: HomeJsonLdInput) {
  const siteUrl = absoluteUrl("/");
  const organizationId = `${siteUrl}#organization`;

  const sameAs = [contacts.facebook, contacts.instagram].filter(Boolean);

  const courses = modules
    .filter((module) => module.slug && module.title)
    .map((module) => ({
      "@type": "Course" as const,
      "@id": absoluteUrl(`/modules/${module.slug}`),
      name: module.title,
      description: getAudienceLabel(module.targetAudience),
      url: absoluteUrl(`/modules/${module.slug}`),
      provider: { "@id": organizationId },
      ...(typeof module.price === "number"
        ? {
            offers: {
              "@type": "Offer",
              price: module.price,
              priceCurrency: "EUR",
            },
          }
        : {}),
      ...(module.startAt
        ? {
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "onsite",
              startDate: module.startAt,
            },
          }
        : {}),
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        inLanguage: "bg",
        publisher: { "@id": organizationId },
      },
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": organizationId,
        name: SITE_SHORT_NAME,
        legalName: SITE_NAME,
        url: siteUrl,
        description: HOME_DESCRIPTION,
        image: absoluteUrl("/opengraph-image"),
        telephone: contacts.phone,
        email: contacts.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: STUDIO_ADDRESS,
          addressLocality: STUDIO_CITY,
          addressCountry: "BG",
        },
        hasMap: STUDIO_ADDRESS_MAPS_URL,
        sameAs,
        areaServed: {
          "@type": "City",
          name: STUDIO_CITY,
        },
        ...(courses.length > 0
          ? { hasOfferCatalog: { "@type": "OfferCatalog", itemListElement: courses } }
          : {}),
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}#instructor`,
        name: instructor.name,
        jobTitle: instructor.role,
        description: instructor.bio,
        worksFor: { "@id": organizationId },
      },
    ],
  };
}
