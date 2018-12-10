module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  globals: {
    URL: false
  },
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        specialLink: ["to"]
      }
    ],
    "no-unused-expressions": [
      "error",
      {
        allowTaggedTemplates: true
      }
    ]
  }
};
