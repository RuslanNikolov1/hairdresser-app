import { SanityLive } from "@/sanity/lib/live";
import { handleSanityLiveError } from "@/sanity/components/sanity-live-error-handler";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SanityLive
        action="refresh"
        onError={handleSanityLiveError}
        onWelcome={false}
      />
    </>
  );
}
