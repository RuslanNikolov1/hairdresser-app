import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

import type { SanityImageValue } from "./types";

type SanityImageProps = {
  image?: SanityImageValue;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes: string;
  fallbackAlt: string;
};

export function SanityImage({
  image,
  className,
  fill = false,
  priority = false,
  sizes,
  fallbackAlt,
}: SanityImageProps) {
  if (!image?.asset) {
    return null;
  }

  const width = image.asset.metadata?.dimensions?.width || 1600;
  const height = image.asset.metadata?.dimensions?.height || 1000;
  const src = urlFor(image).width(width).height(height).fit("crop").url();

  return (
    <Image
      src={src}
      alt={image.alt || fallbackAlt}
      {...(fill
        ? { fill: true }
        : {
            width,
            height,
          })}
      className={className}
      priority={priority}
      sizes={sizes}
      placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={image.asset.metadata?.lqip}
    />
  );
}
