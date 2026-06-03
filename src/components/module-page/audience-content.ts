import type { LucideIcon } from "lucide-react";
import { Sparkles, University } from "lucide-react";

export type TargetAudienceValue = "beginners" | "advanced" | "both";

export const BEGINNER_AUDIENCE_DESCRIPTION =
  "Основни техники, инструменти и работа в салон — идеален старт за начинаещи в професията.";

export const ADVANCED_AUDIENCE_DESCRIPTION =
  "Задълбочена практика, напреднали техники и професионално развитие за опитни стилисти.";

export const audienceCards = {
  beginners: {
    title: "За начинаещи",
    description: BEGINNER_AUDIENCE_DESCRIPTION,
    Icon: University,
  },
  advanced: {
    title: "За напреднали",
    description: ADVANCED_AUDIENCE_DESCRIPTION,
    Icon: Sparkles,
  },
} satisfies Record<
  Exclude<TargetAudienceValue, "both">,
  { title: string; description: string; Icon: LucideIcon }
>;

function cleanAudienceValue(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

export function normalizeTargetAudience(
  value?: string,
): TargetAudienceValue {
  const cleaned = cleanAudienceValue(value);

  if (
    cleaned === "beginners" ||
    cleaned === "advanced" ||
    cleaned === "both"
  ) {
    return cleaned;
  }

  const normalized = cleaned;

  if (normalized.includes("начинаещи") && normalized.includes("напреднали")) {
    return "both";
  }

  if (normalized.includes("напреднали")) {
    return "advanced";
  }

  return "beginners";
}
