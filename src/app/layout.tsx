import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
} from "@/lib/site/metadata";
import { getSiteUrl } from "@/lib/site/url";

import "./globals.scss";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1512" },
  ],
};

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
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
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();

  return (
    <html lang="bg" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body>
        {children}
        {draft.isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
