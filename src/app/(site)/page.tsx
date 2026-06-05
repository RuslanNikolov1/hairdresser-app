import type { Metadata } from "next";

import { HomePage, type HomePageModule } from "@/components/home-page/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { resolveSignupContacts } from "@/lib/signup/contacts";
import type { SiteSettingsContacts } from "@/lib/signup/types";
import { buildHomeJsonLd } from "@/lib/site/home-json-ld";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_LOCALE,
  SITE_NAME,
} from "@/lib/site/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { MODULES_INDEX_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/",
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default async function HomeRoute() {
  const [{ data: modules }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: MODULES_INDEX_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);

  const contacts = resolveSignupContacts(siteSettings as SiteSettingsContacts | null);
  const moduleList = (modules || []) as HomePageModule[];

  return (
    <>
      <JsonLd data={buildHomeJsonLd({ modules: moduleList, contacts })} />
      <HomePage modules={moduleList} contacts={contacts} />
    </>
  );
}
