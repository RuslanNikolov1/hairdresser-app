import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const courseSignup = defineType({
  name: "courseSignup",
  title: "Заявка за записване",
  type: "document",
  icon: EnvelopeIcon,
  readOnly: true,
  fields: [
    defineField({
      name: "name",
      title: "Име",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Имейл",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "moduleTitle",
      title: "Модул",
      type: "string",
    }),
    defineField({
      name: "moduleSlug",
      title: "Slug на модула",
      type: "string",
    }),
    defineField({
      name: "submittedAt",
      title: "Изпратено на",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Най-нови",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "moduleTitle",
      email: "email",
      submittedAt: "submittedAt",
    },
    prepare({ title, subtitle, email, submittedAt }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString("bg-BG")
        : "";
      return {
        title: title || "Без име",
        subtitle: [subtitle, email, date].filter(Boolean).join(" · "),
      };
    },
  },
});
