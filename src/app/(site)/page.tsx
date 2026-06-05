import { HomePage, type HomePageModule } from "@/components/home-page/HomePage";
import { resolveSignupContacts } from "@/lib/signup/contacts";
import type { SiteSettingsContacts } from "@/lib/signup/types";
import { sanityFetch } from "@/sanity/lib/live";
import { MODULES_INDEX_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomeRoute() {
  const [{ data: modules }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: MODULES_INDEX_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);

  return (
    <HomePage
      modules={(modules || []) as HomePageModule[]}
      contacts={resolveSignupContacts(siteSettings as SiteSettingsContacts | null)}
    />
  );
}
