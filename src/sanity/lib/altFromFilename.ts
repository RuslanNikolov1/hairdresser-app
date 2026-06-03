export function altTextFromFilename(filename: string): string {
  const withoutExtension = filename.replace(/\.[a-z0-9]+$/i, "");

  return withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
