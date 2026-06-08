export const PRODUCTION_SITE_URL = "https://drdbeautystudio.com";

export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return new URL(configured.endsWith("/") ? configured : `${configured}/`);
  }

  if (process.env.VERCEL_ENV === "production") {
    return new URL(`${PRODUCTION_SITE_URL}/`);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return new URL(`https://${vercel.replace(/\/$/, "")}/`);
  }

  if (process.env.NODE_ENV === "production") {
    return new URL(`${PRODUCTION_SITE_URL}/`);
  }

  return new URL("http://localhost:3000/");
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}
