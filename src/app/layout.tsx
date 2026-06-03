import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import "./globals.scss";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "DR & D Hairdressing Academy",
  description: "CMS-powered module pages for professional hairdresser courses.",
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
