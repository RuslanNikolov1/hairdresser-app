import { defineField, defineType } from "sanity";



import { AltFromAssetInput } from "../../components/AltFromAssetInput";



export const imageWithAlt = defineType({

  name: "imageWithAlt",

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

      description:

        "Попълва се автоматично от името на файла при качване. Можете да го коригирате при нужда.",

      components: {

        input: AltFromAssetInput,

      },

      validation: (rule) =>

        rule

          .required()

          .warning("Alt текстът подобрява SEO и достъпността."),

    }),

  ],

});

