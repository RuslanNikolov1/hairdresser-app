import { revalidatePath } from "next/cache";

type ModuleRevalidatePayload = {
  _type?: string;
  slug?: string | null;
};

export function revalidateModuleContent(payload: ModuleRevalidatePayload) {
  revalidatePath("/sitemap.xml");
  revalidatePath("/");

  if (payload.slug) {
    revalidatePath(`/modules/${payload.slug}`);
    return [`/sitemap.xml`, `/`, `/modules/${payload.slug}`];
  }

  revalidatePath("/modules/[slug]", "page");
  return [`/sitemap.xml`, `/`, "/modules/[slug]"];
}
