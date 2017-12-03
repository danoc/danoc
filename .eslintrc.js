module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["airbnb", "prettier"],
  globals: {
    graphql: false,
    URL: false
  },
  settings: { "import/core-modules": ["tachyons-sass"] },
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        specialLink: ["to"]
      }
    ]
  }
};
