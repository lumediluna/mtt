import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import citStructurePlugin from "./eslint-plugin-cit-structure.js";

export default [
  js.configs.recommended,

  {
    files: ["screen/**/*.js", "screen/**/*.ts"], // подставь свои пути
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "cit-structure": citStructurePlugin,
    },
    rules: {
      "cit-structure/structure-cit-tests": "error",
    },
  },
];