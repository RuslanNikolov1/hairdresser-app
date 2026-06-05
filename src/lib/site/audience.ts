export const audienceLabels: Record<string, string> = {
  beginners: "За начинаещи фризьори",
  advanced: "За напреднали фризьори",
  both: "За начинаещи и напреднали фризьори",
};

export function getAudienceLabel(value?: string, fallback = "За всички нива") {
  if (!value) {
    return fallback;
  }

  return audienceLabels[value] || value;
}

export const formatLabels: Record<string, string> = {
  group: "групов формат",
  individual: "индивидуален формат",
};

export function getFormatLabel(value?: string) {
  if (!value) {
    return "";
  }

  return formatLabels[value] || value;
}
