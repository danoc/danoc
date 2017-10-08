module.exports = {
  parserOptions: {
    ecmaVersion: 6,
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
  settings: { "import/core-modules": ["styled-components"] },
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        specialLink: ["to"]
      }
    ]
  }
};
