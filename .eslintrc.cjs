module.exports = {
  globals: {
    cy: true,
  },
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:cypress/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  overrides: [
    {
      files: ["**/*.cy.js"],
      env: { "cypress/globals": true },
      plugins: ["cypress"],
      extends: ["plugin:cypress/recommended"],
      rules: {
        "cypress/no-unnecessary-waiting": "off",
        "no-unused-vars": "error",
      },
    },
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "cypress.config.js"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "cypress"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
