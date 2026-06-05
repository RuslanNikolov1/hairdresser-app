import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

import { ModulePage } from "@/components/module-page/ModulePage";
import type { ModulePageData } from "@/components/module-page/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { resolveSignupContacts } from "@/lib/signup/contacts";
import type { SiteSettingsContacts } from "@/lib/signup/types";
import { buildModuleJsonLd } from "@/lib/site/module-json-ld";
import { buildModuleMetadata } from "@/lib/site/module-seo";
import { client } from "@/sanity/lib/client";
import { MODULE_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getModule(slug: string) {
  noStore();

  try {
    return await client.fetch<ModulePageData | null>(
      MODULE_BY_SLUG_QUERY,
      { slug: decodeURIComponent(slug) },
      {
        perspective: "published",
        useCdn: false,
        stega: false,
      },
    );
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const courseModule = await getModule(slug);

  if (!courseModule) {
    return {};
  }

  return buildModuleMetadata(courseModule, slug);
}

export default async function ModuleRoute({ params }: RouteProps) {
  const { slug } = await params;
  const courseModule = await getModule(slug);

  if (!courseModule) {
    notFound();
  }

  const siteSettings = await client.fetch<SiteSettingsContacts | null>(
    SITE_SETTINGS_QUERY,
    {},
    { perspective: "published", useCdn: false, stega: false },
  );

  return (
    <>
      <JsonLd data={buildModuleJsonLd(courseModule, slug)} />
      <ModulePage
        module={courseModule}
        signupContacts={resolveSignupContacts(siteSettings)}
      />
    </>
  );
}
