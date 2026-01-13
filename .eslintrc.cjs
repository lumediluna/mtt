/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // можно и обычный "espree", но с TS-тестами удобнее этот
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: [
    "cit-structure", // наш локальный плагин
  ],
  rules: {
    "cit-structure/structure-cit-tests": "error",
  },
};