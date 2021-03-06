module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "prettier"],
  globals: {
    URL: false,
  },
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        specialLink: ["to"],
      },
    ],
    "no-unused-expressions": [
      "error",
      {
        allowTaggedTemplates: true,
      },
    ],
  },
};
