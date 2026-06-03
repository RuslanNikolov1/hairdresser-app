import { CogIcon, DocumentIcon, EnvelopeIcon } from "@sanity/icons";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { bgLocale } from "./src/sanity/i18n/bgLocale";
import { dataset, projectId } from "./src/sanity/env";
import { resolve } from "./src/sanity/presentation/resolve";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Академия за фризьори",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    bgLocale(),
    structureTool({
      structure: (S) =>
        S.list()
          .title("Съдържание")
          .items([
            S.documentTypeListItem("module")
              .title("Модули")
              .icon(DocumentIcon),
            S.documentTypeListItem("courseSignup")
              .title("Заявки за записване")
              .icon(EnvelopeIcon),
            S.listItem()
              .title("Настройки на сайта")
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),
    presentationTool({
      title: "Преглед",
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
