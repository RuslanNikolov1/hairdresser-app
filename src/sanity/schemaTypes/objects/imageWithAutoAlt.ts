import { defineField, defineType } from "sanity";

import { AutoAltField } from "../../components/AutoAltField";

export const imageWithAutoAlt = defineType({
  name: "imageWithAutoAlt",
  title: "Изображение",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt текст",
      type: "string",
      description: "Генерира се автоматично от името на файла при качване.",
      hidden: true,
      components: {
        input: AutoAltField,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
