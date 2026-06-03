import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Настройки на сайта",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "notificationEmail",
      title: "Имейл за заявки от формата",
      type: "string",
      description:
        "На този адрес се изпращат новите записвания (по подразбиране ruslannikolov1@gmail.com).",
      validation: (rule) => rule.required().email(),
      initialValue: "ruslannikolov1@gmail.com",
    }),
    defineField({
      name: "contactEmail",
      title: "Публичен имейл за контакти",
      type: "string",
      validation: (rule) => rule.required().email(),
      initialValue: "ruslannikolov1@gmail.com",
    }),
    defineField({
      name: "contactPhone",
      title: "Телефон",
      type: "string",
      initialValue: "+359 88 123 4567",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "facebookLabel",
      title: "Facebook етикет",
      type: "string",
      initialValue: "Aura & Bloom",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "instagramLabel",
      title: "Instagram етикет",
      type: "string",
      initialValue: "@aurabloom",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Настройки на сайта" };
    },
  },
});
