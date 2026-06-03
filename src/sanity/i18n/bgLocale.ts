import { defineLocale, definePlugin } from "sanity";

import { presentationResources } from "./bg/presentation";
import { studioResources } from "./bg/studio";
import { structureResources } from "./bg/structure";

const locale = defineLocale({
  id: "bg-BG",
  title: "Български",
  weekInfo: {
    firstDay: 1,
    weekend: [6, 7],
  },
  bundles: [
    { namespace: "studio", resources: studioResources },
    { namespace: "structure", resources: structureResources },
    { namespace: "presentation", resources: presentationResources },
  ],
});

export const bgLocale = definePlugin(() => ({
  name: "@sanity/locale-bg-bg",
  i18n: {
    locales: [locale],
  },
}));
