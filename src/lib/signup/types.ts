export type SiteSettingsContacts = {
  notificationEmail?: string;
  contactEmail?: string;
  contactPhone?: string;
  facebookUrl?: string;
  facebookLabel?: string;
  instagramUrl?: string;
  instagramLabel?: string;
};

export type SignupFormPayload = {
  name: string;
  phone: string;
  email: string;
  moduleSlug: string;
  moduleTitle: string;
};
