import type { SiteSettingsContacts } from "./types";

const DEFAULT_NOTIFICATION_EMAIL = "ruslannikolov1@gmail.com";

export type SignupContacts = ReturnType<typeof resolveSignupContacts>;

export function resolveSignupContacts(
  settings: SiteSettingsContacts | null | undefined,
) {
  const contactEmail =
    settings?.contactEmail?.trim() || DEFAULT_NOTIFICATION_EMAIL;
  const phone =
    settings?.contactPhone?.trim() || "+359 88 123 4567";
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneHref = phoneDigits ? `tel:+${phoneDigits}` : `tel:${phone}`;

  return {
    email: contactEmail,
    emailHref: `mailto:${contactEmail}`,
    phone,
    phoneHref,
    facebook:
      settings?.facebookUrl?.trim() ||
      "https://www.facebook.com/aurabloom",
    facebookLabel: settings?.facebookLabel?.trim() || "DR & D",
    instagram:
      settings?.instagramUrl?.trim() ||
      "https://www.instagram.com/aurabloom",
    instagramLabel: settings?.instagramLabel?.trim() || "@aurabloom",
    notificationEmail:
      settings?.notificationEmail?.trim() || DEFAULT_NOTIFICATION_EMAIL,
  };
}
