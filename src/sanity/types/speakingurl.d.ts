declare module "speakingurl" {
  type SpeakingUrlOptions = {
    truncate?: number;
    symbols?: boolean;
  };

  export default function getSlug(
    input: string,
    options?: SpeakingUrlOptions,
  ): string;
}
