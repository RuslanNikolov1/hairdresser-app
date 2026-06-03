import { defineArrayMember, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Форматиран текст",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Нормален", value: "normal" }],
      lists: [
        { title: "Маркиран списък", value: "bullet" },
        { title: "Номериран списък", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Удебелен", value: "strong" },
          { title: "Курсив", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Връзка",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
  ],
});
