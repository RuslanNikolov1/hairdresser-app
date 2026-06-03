import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "sanity.types.ts", "schema.json"],
  },
];

export default eslintConfig;
