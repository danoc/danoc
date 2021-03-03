module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
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
