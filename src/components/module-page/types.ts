import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityImageValue = SanityImageSource & {
  alt?: string;
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

export type ModulePageData = {
  _id: string;
  title: string;
  slug: string;
  backgroundImage?: SanityImageValue;
  targetAudience?: "beginners" | "advanced" | "both" | string;
  theory?: PortableTextBlock[];
  practice?: PortableTextBlock[];
  startAt?: string;
  durationMinutes?: number;
  format?: "group" | "individual";
  price?: number;
  processImages?: Array<SanityImageValue & { _key?: string }>;
  beforeAfterImages?: Array<SanityImageValue & { _key?: string }>;
  certificateImage?: SanityImageValue;
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImageValue;
    noIndex?: boolean;
  };
};
