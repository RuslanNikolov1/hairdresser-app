import type { PortableTextBlock } from "@portabletext/react";

type PortableTextChild = {
  text?: string;
};

export function portableTextToPlainText(
  blocks?: PortableTextBlock[],
  maxLength = 160,
): string {
  if (!blocks?.length) {
    return "";
  }

  const text = blocks
    .flatMap((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) {
        return [];
      }

      return (block.children as PortableTextChild[]).map(
        (child) => child.text || "",
      );
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text || text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}
