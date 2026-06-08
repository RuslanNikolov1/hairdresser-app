import type { SiteSettingsContacts } from "./types";

const DEFAULT_CONTACT_EMAIL = "dilqna_dacheva@abv.bg";
const DEFAULT_NOTIFICATION_EMAIL = "ruslannikolov1@gmail.com";

export type SignupContacts = ReturnType<typeof resolveSignupContacts>;

export function resolveSignupContacts(
  settings: SiteSettingsContacts | null | undefined,
) {
  const contactEmail =
    settings?.contactEmail?.trim() || DEFAULT_CONTACT_EMAIL;
  const phone =
    settings?.contactPhone?.trim() || "+359892201057";
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneHref = phoneDigits ? `tel:+${phoneDigits}` : `tel:${phone}`;

  return {
    email: contactEmail,
    emailHref: `mailto:${contactEmail}`,
    phone,
    phoneHref,
    facebook:
      settings?.facebookUrl?.trim() ||
      "https://www.facebook.com/profile.php?id=100063462193608",
    facebookLabel: settings?.facebookLabel?.trim() || "DR & D",
    instagram:
      settings?.instagramUrl?.trim() ||
      "https://www.instagram.com/drdbeautystudio.bg/",
    instagramLabel:
      settings?.instagramLabel?.trim() || "@drdbeautystudio.bg",
    notificationEmail:
      settings?.notificationEmail?.trim() || DEFAULT_NOTIFICATION_EMAIL,
  };
}
