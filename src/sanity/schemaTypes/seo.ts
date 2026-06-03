import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO заглавие",
      type: "string",
      description:
        "Незадължително заглавие за търсачки и социални мрежи.",
    }),
    defineField({
      name: "description",
      title: "SEO описание",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Социално изображение",
      type: "imageWithAlt",
      description: "Препоръчителен размер: 1200x630.",
    }),
    defineField({
      name: "noIndex",
      title: "Скриване от търсачки",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
