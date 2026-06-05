import { DocumentIcon } from "@sanity/icons";
import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

import { AutoSlugInput } from "../components/AutoSlugInput";
import { ForceLiveStatusInput } from "../components/ForceLiveStatusInput";
import { ProcessImagesInput } from "../components/ProcessImagesInput";
import { slugifyFromTitle } from "../lib/slugifyFromTitle";

export const moduleType = defineType({
  name: "module",
  title: "Модул",
  type: "document",
  icon: DocumentIcon,
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "title",
      title: "Заглавие",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Страница",
      type: "slug",
      description: "Генерира се автоматично от заглавието.",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => slugifyFromTitle(input, 96),
      },
      components: {
        input: AutoSlugInput,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      initialValue: "live",
      hidden: true,
      readOnly: true,
      components: {
        input: ForceLiveStatusInput,
      },
    }),
    defineField({
      name: "backgroundImage",
      title: "Фонова снимка",
      type: "imageWithAutoAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "targetAudience",
      title: "За кого е този курс",
      type: "string",
      initialValue: "both",
      options: {
        list: [
          { title: "За начинаещи", value: "beginners" },
          { title: "За напреднали", value: "advanced" },
          {
            title: "За начинаещи и за напреднали",
            value: "both",
          },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "theory",
      title: "Теория",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "practice",
      title: "Практика",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Място",
      type: "string",
      initialValue: "Патриарх Евтимий 44",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startAt",
      title: "Старт",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "durationMinutes",
      title: "Продължителност",
      type: "number",
      description: "Минути (напр. 120).",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "format",
      title: "Групово или индивидуално",
      type: "string",
      initialValue: "group",
      options: {
        list: [
          { title: "Групово", value: "group" },
          { title: "Индивидуално", value: "individual" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Цена",
      type: "number",
      description: "Цена в EUR.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "processImages",
      title: "Снимки процес",
      type: "array",
      of: [
        defineArrayMember({ type: "imageWithAutoAlt" }),
        defineArrayMember({ type: "imageWithAlt" }),
      ],
      options: {
        layout: "grid",
      },
      components: {
        input: ProcessImagesInput,
      },
    }),
    defineField({
      name: "beforeAfterImages",
      title: "Снимки преди/след",
      type: "array",
      of: [
        defineArrayMember({ type: "imageWithAutoAlt" }),
        defineArrayMember({ type: "imageWithAlt" }),
      ],
      validation: (rule) =>
        rule.max(2).custom((images) => {
          if (!images?.length || images.length === 2) {
            return true;
          }

          return "Добавете и двете снимки (преди и след) или оставете полето празно.";
        }),
    }),
    defineField({
      name: "certificateImage",
      title: "Сертификат",
      type: "imageWithAlt",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "backgroundImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Модул без заглавие",
        subtitle: subtitle || undefined,
        media,
      };
    },
  },
});
