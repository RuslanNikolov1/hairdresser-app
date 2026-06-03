import getSlug from "speakingurl";

export function slugifyFromTitle(value: string, maxLength = 96) {
  return getSlug(value, {
    truncate: maxLength,
    symbols: true,
  });
}
